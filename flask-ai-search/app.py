from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sentence_transformers import SentenceTransformer
import json
import os
from datetime import datetime
import sqlite3
import logging
from typing import List, Dict, Any
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Initialize the sentence transformer model for embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

class AISearchEngine:
    def __init__(self, db_path='search_data.db'):
        self.db_path = db_path
        self.init_database()
        
    def init_database(self):
        """Initialize SQLite database for storing embeddings and data"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create tables for reviews and registrations
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                comment TEXT NOT NULL,
                rating INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                embedding BLOB
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS registrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone_no TEXT,
                course TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                embedding BLOB
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                mode TEXT,
                actual_price TEXT,
                discount_price TEXT,
                features TEXT,
                description TEXT,
                embedding BLOB
            )
        ''')
        
        conn.commit()
        conn.close()
        
    def add_review(self, name: str, comment: str, rating: int = None):
        """Add a review with its embedding to the database"""
        # Create text for embedding
        text_for_embedding = f"{name} {comment}"
        embedding = model.encode([text_for_embedding])[0]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO reviews (name, comment, rating, embedding)
            VALUES (?, ?, ?, ?)
        ''', (name, comment, rating, embedding.tobytes()))
        
        conn.commit()
        conn.close()
        
    def add_registration(self, name: str, email: str, phone_no: str = None, course: str = None):
        """Add a registration with its embedding to the database"""
        # Create text for embedding
        text_for_embedding = f"{name} {email} {phone_no or ''} {course or ''}"
        embedding = model.encode([text_for_embedding])[0]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO registrations (name, email, phone_no, course, embedding)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, email, phone_no, course, embedding.tobytes()))
        
        conn.commit()
        conn.close()
        
    def add_course(self, title: str, mode: str = None, actual_price: str = None, 
                   discount_price: str = None, features: List[str] = None, description: str = None):
        """Add a course with its embedding to the database"""
        # Create text for embedding
        features_text = ' '.join(features) if features else ''
        text_for_embedding = f"{title} {mode or ''} {description or ''} {features_text}"
        embedding = model.encode([text_for_embedding])[0]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO courses (title, mode, actual_price, discount_price, features, description, embedding)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (title, mode, actual_price, discount_price, json.dumps(features), description, embedding.tobytes()))
        
        conn.commit()
        conn.close()
        
    def semantic_search(self, query: str, table: str, limit: int = 10, threshold: float = 0.3):
        """Perform semantic search using embeddings"""
        query_embedding = model.encode([query])[0]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get all records with embeddings
        cursor.execute(f'SELECT * FROM {table} WHERE embedding IS NOT NULL')
        records = cursor.fetchall()
        
        results = []
        for record in records:
            # Convert embedding back from bytes
            stored_embedding = np.frombuffer(record[-1], dtype=np.float32)
            
            # Calculate cosine similarity
            similarity = np.dot(query_embedding, stored_embedding) / (
                np.linalg.norm(query_embedding) * np.linalg.norm(stored_embedding)
            )
            
            if similarity >= threshold:
                # Convert record to dict based on table
                if table == 'reviews':
                    record_dict = {
                        'id': record[0],
                        'name': record[1],
                        'comment': record[2],
                        'rating': record[3],
                        'created_at': record[4],
                        'similarity': float(similarity)
                    }
                elif table == 'registrations':
                    record_dict = {
                        'id': record[0],
                        'name': record[1],
                        'email': record[2],
                        'phone_no': record[3],
                        'course': record[4],
                        'created_at': record[5],
                        'similarity': float(similarity)
                    }
                elif table == 'courses':
                    record_dict = {
                        'id': record[0],
                        'title': record[1],
                        'mode': record[2],
                        'actual_price': record[3],
                        'discount_price': record[4],
                        'features': json.loads(record[5]) if record[5] else [],
                        'description': record[6],
                        'similarity': float(similarity)
                    }
                
                results.append(record_dict)
        
        conn.close()
        
        # Sort by similarity score
        results.sort(key=lambda x: x['similarity'], reverse=True)
        return results[:limit]
    
    def hybrid_search(self, query: str, table: str, limit: int = 10):
        """Combine semantic search with keyword matching"""
        # Get semantic search results
        semantic_results = self.semantic_search(query, table, limit * 2)
        
        # Get keyword search results
        keyword_results = self.keyword_search(query, table, limit * 2)
        
        # Combine and deduplicate
        combined_results = {}
        
        # Add semantic results with higher weight
        for result in semantic_results:
            result_id = result['id']
            result['score'] = result['similarity'] * 0.7  # Weight semantic similarity
            combined_results[result_id] = result
        
        # Add keyword results
        for result in keyword_results:
            result_id = result['id']
            if result_id in combined_results:
                # Boost score if found in both
                combined_results[result_id]['score'] += 0.3
            else:
                result['score'] = 0.3  # Lower score for keyword-only matches
                combined_results[result_id] = result
        
        # Sort by combined score
        final_results = list(combined_results.values())
        final_results.sort(key=lambda x: x['score'], reverse=True)
        
        return final_results[:limit]
    
    def keyword_search(self, query: str, table: str, limit: int = 10):
        """Traditional keyword-based search"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        query_words = query.lower().split()
        
        if table == 'reviews':
            search_query = '''
                SELECT id, name, comment, rating, created_at
                FROM reviews
                WHERE LOWER(name) LIKE ? OR LOWER(comment) LIKE ?
                ORDER BY id DESC
                LIMIT ?
            '''
            search_terms = [f'%{" ".join(query_words)}%', f'%{" ".join(query_words)}%', limit]
        elif table == 'registrations':
            search_query = '''
                SELECT id, name, email, phone_no, course, created_at
                FROM registrations
                WHERE LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(course) LIKE ?
                ORDER BY id DESC
                LIMIT ?
            '''
            search_terms = [f'%{" ".join(query_words)}%', f'%{" ".join(query_words)}%', f'%{" ".join(query_words)}%', limit]
        elif table == 'courses':
            search_query = '''
                SELECT id, title, mode, actual_price, discount_price, features, description
                FROM courses
                WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ?
                ORDER BY id DESC
                LIMIT ?
            '''
            search_terms = [f'%{" ".join(query_words)}%', f'%{" ".join(query_words)}%', limit]
        
        cursor.execute(search_query, search_terms)
        records = cursor.fetchall()
        
        results = []
        for record in records:
            if table == 'reviews':
                record_dict = {
                    'id': record[0],
                    'name': record[1],
                    'comment': record[2],
                    'rating': record[3],
                    'created_at': record[4]
                }
            elif table == 'registrations':
                record_dict = {
                    'id': record[0],
                    'name': record[1],
                    'email': record[2],
                    'phone_no': record[3],
                    'course': record[4],
                    'created_at': record[5]
                }
            elif table == 'courses':
                record_dict = {
                    'id': record[0],
                    'title': record[1],
                    'mode': record[2],
                    'actual_price': record[3],
                    'discount_price': record[4],
                    'features': json.loads(record[5]) if record[5] else [],
                    'description': record[6]
                }
            
            results.append(record_dict)
        
        conn.close()
        return results

# Initialize search engine
search_engine = AISearchEngine()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "AI Search Engine"})

@app.route('/api/search/reviews', methods=['GET'])
def search_reviews():
    """Search reviews using AI-powered search"""
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 10))
    search_type = request.args.get('type', 'hybrid')  # semantic, keyword, hybrid
    
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    
    try:
        if search_type == 'semantic':
            results = search_engine.semantic_search(query, 'reviews', limit)
        elif search_type == 'keyword':
            results = search_engine.keyword_search(query, 'reviews', limit)
        else:  # hybrid
            results = search_engine.hybrid_search(query, 'reviews', limit)
        
        return jsonify({
            "query": query,
            "results": results,
            "count": len(results),
            "search_type": search_type
        })
    except Exception as e:
        logger.error(f"Error searching reviews: {str(e)}")
        return jsonify({"error": "Search failed"}), 500

@app.route('/api/search/registrations', methods=['GET'])
def search_registrations():
    """Search registrations using AI-powered search"""
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 10))
    search_type = request.args.get('type', 'hybrid')
    
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    
    try:
        if search_type == 'semantic':
            results = search_engine.semantic_search(query, 'registrations', limit)
        elif search_type == 'keyword':
            results = search_engine.keyword_search(query, 'registrations', limit)
        else:  # hybrid
            results = search_engine.hybrid_search(query, 'registrations', limit)
        
        return jsonify({
            "query": query,
            "results": results,
            "count": len(results),
            "search_type": search_type
        })
    except Exception as e:
        logger.error(f"Error searching registrations: {str(e)}")
        return jsonify({"error": "Search failed"}), 500

@app.route('/api/search/courses', methods=['GET'])
def search_courses():
    """Search courses using AI-powered search"""
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 10))
    search_type = request.args.get('type', 'hybrid')
    
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    
    try:
        if search_type == 'semantic':
            results = search_engine.semantic_search(query, 'courses', limit)
        elif search_type == 'keyword':
            results = search_engine.keyword_search(query, 'courses', limit)
        else:  # hybrid
            results = search_engine.hybrid_search(query, 'courses', limit)
        
        return jsonify({
            "query": query,
            "results": results,
            "count": len(results),
            "search_type": search_type
        })
    except Exception as e:
        logger.error(f"Error searching courses: {str(e)}")
        return jsonify({"error": "Search failed"}), 500

@app.route('/api/reviews', methods=['POST'])
def add_review():
    """Add a new review"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'comment' not in data:
        return jsonify({"error": "Name and comment are required"}), 400
    
    try:
        search_engine.add_review(
            name=data['name'],
            comment=data['comment'],
            rating=data.get('rating')
        )
        return jsonify({"message": "Review added successfully"}), 201
    except Exception as e:
        logger.error(f"Error adding review: {str(e)}")
        return jsonify({"error": "Failed to add review"}), 500

@app.route('/api/registrations', methods=['POST'])
def add_registration():
    """Add a new registration"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({"error": "Name and email are required"}), 400
    
    try:
        search_engine.add_registration(
            name=data['name'],
            email=data['email'],
            phone_no=data.get('phone_no'),
            course=data.get('course')
        )
        return jsonify({"message": "Registration added successfully"}), 201
    except Exception as e:
        logger.error(f"Error adding registration: {str(e)}")
        return jsonify({"error": "Failed to add registration"}), 500

@app.route('/api/courses', methods=['POST'])
def add_course():
    """Add a new course"""
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    
    try:
        search_engine.add_course(
            title=data['title'],
            mode=data.get('mode'),
            actual_price=data.get('actual_price'),
            discount_price=data.get('discount_price'),
            features=data.get('features', []),
            description=data.get('description')
        )
        return jsonify({"message": "Course added successfully"}), 201
    except Exception as e:
        logger.error(f"Error adding course: {str(e)}")
        return jsonify({"error": "Failed to add course"}), 500

@app.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    """Get search suggestions based on partial query"""
    query = request.args.get('q', '')
    table = request.args.get('table', 'reviews')
    
    if len(query) < 2:
        return jsonify({"suggestions": []})
    
    try:
        # Get partial matches from the database
        conn = sqlite3.connect(search_engine.db_path)
        cursor = conn.cursor()
        
        if table == 'reviews':
            cursor.execute('''
                SELECT DISTINCT name FROM reviews 
                WHERE LOWER(name) LIKE ? 
                LIMIT 5
            ''', (f'%{query.lower()}%',))
        elif table == 'registrations':
            cursor.execute('''
                SELECT DISTINCT name FROM registrations 
                WHERE LOWER(name) LIKE ? OR LOWER(course) LIKE ?
                LIMIT 5
            ''', (f'%{query.lower()}%', f'%{query.lower()}%'))
        elif table == 'courses':
            cursor.execute('''
                SELECT DISTINCT title FROM courses 
                WHERE LOWER(title) LIKE ?
                LIMIT 5
            ''', (f'%{query.lower()}%',))
        
        suggestions = [row[0] for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({"suggestions": suggestions})
    except Exception as e:
        logger.error(f"Error getting suggestions: {str(e)}")
        return jsonify({"suggestions": []})

if __name__ == '__main__':
    # Initialize with some sample data
    try:
        # Add sample reviews
        search_engine.add_review("John Doe", "Great course content and excellent teaching methodology", 5)
        search_engine.add_review("Jane Smith", "Very helpful instructors and comprehensive materials", 4)
        search_engine.add_review("Mike Johnson", "Good practical examples and hands-on experience", 5)
        
        # Add sample registrations
        search_engine.add_registration("Alice Brown", "alice@example.com", "1234567890", "Python")
        search_engine.add_registration("Bob Wilson", "bob@example.com", "0987654321", "Java Fullstack")
        
        # Add sample courses
        search_engine.add_course(
            title="Python Programming",
            mode="online",
            actual_price="7000",
            discount_price="4000",
            features=["Course videos", "Resources", "Exercises", "Certification"],
            description="Comprehensive Python programming course for beginners and intermediate learners"
        )
        
        search_engine.add_course(
            title="Java Fullstack Development",
            mode="online",
            actual_price="32000",
            discount_price="20000",
            features=["Course videos", "Resources", "Projects", "Certification"],
            description="Complete Java fullstack development course with Spring Boot and React"
        )
        
        logger.info("Sample data initialized")
    except Exception as e:
        logger.error(f"Error initializing sample data: {str(e)}")
    
    app.run(debug=True, host='0.0.0.0', port=5000)