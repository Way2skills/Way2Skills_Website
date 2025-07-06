from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import sqlite3
import logging
from datetime import datetime
import re
import math
from collections import Counter

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

class SimpleAISearchEngine:
    def __init__(self, db_path='search_data.db'):
        self.db_path = db_path
        self.init_database()
        # Simple word importance weights
        self.stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
        }
        
    def init_database(self):
        """Initialize SQLite database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create tables
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                comment TEXT NOT NULL,
                rating INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS registrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone_no TEXT,
                course TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
                description TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        
    def preprocess_text(self, text):
        """Simple text preprocessing"""
        if not text:
            return []
        # Convert to lowercase and extract words
        words = re.findall(r'\b\w+\b', text.lower())
        # Remove stop words
        return [word for word in words if word not in self.stop_words and len(word) > 2]
    
    def calculate_tf_idf_score(self, query_words, document_text, boost_factor=1.0):
        """Simple TF-IDF like scoring"""
        if not document_text:
            return 0.0
            
        doc_words = self.preprocess_text(document_text)
        if not doc_words:
            return 0.0
            
        # Term frequency calculation
        doc_word_count = Counter(doc_words)
        total_words = len(doc_words)
        
        score = 0.0
        for query_word in query_words:
            if query_word in doc_word_count:
                tf = doc_word_count[query_word] / total_words
                # Simple IDF approximation (boost rare words)
                idf = math.log(total_words / (doc_word_count[query_word] + 1)) + 1
                score += tf * idf * boost_factor
                
        # Add exact phrase bonus
        if ' '.join(query_words) in document_text.lower():
            score += 2.0 * boost_factor
            
        # Add partial match bonus
        query_text = ' '.join(query_words)
        for word in query_words:
            if word in document_text.lower():
                score += 0.5 * boost_factor
                
        return score
    
    def semantic_similarity(self, query, text):
        """Simple semantic similarity using word overlap and synonyms"""
        if not query or not text:
            return 0.0
            
        query_words = set(self.preprocess_text(query))
        text_words = set(self.preprocess_text(text))
        
        if not query_words or not text_words:
            return 0.0
            
        # Basic word overlap
        overlap = len(query_words.intersection(text_words))
        union = len(query_words.union(text_words))
        
        if union == 0:
            return 0.0
            
        # Jaccard similarity
        jaccard = overlap / union
        
        # Boost for similar length texts
        length_similarity = 1 - abs(len(query_words) - len(text_words)) / max(len(query_words), len(text_words))
        
        return (jaccard * 0.7 + length_similarity * 0.3)
    
    def intelligent_search(self, query, table, limit=10):
        """AI-like search combining multiple techniques"""
        query_words = self.preprocess_text(query)
        if not query_words:
            return []
            
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get all records
        if table == 'reviews':
            cursor.execute('SELECT id, name, comment, rating, created_at FROM reviews')
            columns = ['id', 'name', 'comment', 'rating', 'created_at']
            search_fields = ['name', 'comment']
        elif table == 'registrations':
            cursor.execute('SELECT id, name, email, phone_no, course, created_at FROM registrations')
            columns = ['id', 'name', 'email', 'phone_no', 'course', 'created_at']
            search_fields = ['name', 'email', 'course']
        elif table == 'courses':
            cursor.execute('SELECT id, title, mode, actual_price, discount_price, features, description FROM courses')
            columns = ['id', 'title', 'mode', 'actual_price', 'discount_price', 'features', 'description']
            search_fields = ['title', 'description']
        
        records = cursor.fetchall()
        conn.close()
        
        scored_results = []
        
        for record in records:
            # Convert record to dict
            record_dict = dict(zip(columns, record))
            
            # Calculate combined score
            total_score = 0.0
            
            for field in search_fields:
                if field in record_dict and record_dict[field]:
                    field_text = str(record_dict[field])
                    
                    # TF-IDF score
                    tf_idf_score = self.calculate_tf_idf_score(query_words, field_text, boost_factor=2.0 if field == 'name' or field == 'title' else 1.0)
                    
                    # Semantic similarity
                    semantic_score = self.semantic_similarity(query, field_text) * 3.0
                    
                    # Keyword matching bonus
                    keyword_bonus = 0.0
                    for word in query_words:
                        if word in field_text.lower():
                            keyword_bonus += 1.0
                    
                    total_score += tf_idf_score + semantic_score + keyword_bonus
            
            # Add the score to the record
            if total_score > 0.1:  # Minimum threshold
                record_dict['similarity'] = min(total_score / 10.0, 1.0)  # Normalize to 0-1
                record_dict['score'] = total_score
                
                # Handle features field for courses
                if table == 'courses' and 'features' in record_dict and record_dict['features']:
                    try:
                        record_dict['features'] = json.loads(record_dict['features'])
                    except:
                        record_dict['features'] = record_dict['features'].split(',') if record_dict['features'] else []
                
                scored_results.append(record_dict)
        
        # Sort by score
        scored_results.sort(key=lambda x: x['score'], reverse=True)
        
        return scored_results[:limit]
    
    def add_review(self, name, comment, rating=None):
        """Add a review"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO reviews (name, comment, rating)
            VALUES (?, ?, ?)
        ''', (name, comment, rating))
        conn.commit()
        conn.close()
        
    def add_registration(self, name, email, phone_no=None, course=None):
        """Add a registration"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO registrations (name, email, phone_no, course)
            VALUES (?, ?, ?, ?)
        ''', (name, email, phone_no, course))
        conn.commit()
        conn.close()
        
    def add_course(self, title, mode=None, actual_price=None, discount_price=None, features=None, description=None):
        """Add a course"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO courses (title, mode, actual_price, discount_price, features, description)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (title, mode, actual_price, discount_price, json.dumps(features) if features else None, description))
        conn.commit()
        conn.close()
    
    def get_suggestions(self, query, table):
        """Get search suggestions"""
        if len(query) < 2:
            return []
            
        conn = sqlite3.connect(self.db_path)
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
        return suggestions

# Initialize search engine
search_engine = SimpleAISearchEngine()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "Simple AI Search Engine"})

@app.route('/api/search/reviews', methods=['GET'])
def search_reviews():
    """Search reviews using AI-powered search"""
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 10))
    
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    
    try:
        results = search_engine.intelligent_search(query, 'reviews', limit)
        return jsonify({
            "query": query,
            "results": results,
            "count": len(results),
            "search_type": "intelligent"
        })
    except Exception as e:
        logger.error(f"Error searching reviews: {str(e)}")
        return jsonify({"error": "Search failed"}), 500

@app.route('/api/search/registrations', methods=['GET'])
def search_registrations():
    """Search registrations using AI-powered search"""
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 10))
    
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    
    try:
        results = search_engine.intelligent_search(query, 'registrations', limit)
        return jsonify({
            "query": query,
            "results": results,
            "count": len(results),
            "search_type": "intelligent"
        })
    except Exception as e:
        logger.error(f"Error searching registrations: {str(e)}")
        return jsonify({"error": "Search failed"}), 500

@app.route('/api/search/courses', methods=['GET'])
def search_courses():
    """Search courses using AI-powered search"""
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 10))
    
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    
    try:
        results = search_engine.intelligent_search(query, 'courses', limit)
        return jsonify({
            "query": query,
            "results": results,
            "count": len(results),
            "search_type": "intelligent"
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
        suggestions = search_engine.get_suggestions(query, table)
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
        search_engine.add_review("Sarah Wilson", "Outstanding explanation of complex concepts", 5)
        search_engine.add_review("David Brown", "Perfect for beginners, easy to understand", 4)
        
        # Add sample registrations
        search_engine.add_registration("Alice Brown", "alice@example.com", "1234567890", "Python")
        search_engine.add_registration("Bob Wilson", "bob@example.com", "0987654321", "Java Fullstack")
        search_engine.add_registration("Charlie Davis", "charlie@example.com", "5555555555", "ReactJS")
        
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
        
        search_engine.add_course(
            title="ReactJS Frontend Development",
            mode="online",
            actual_price="25000",
            discount_price="15000",
            features=["Course videos", "Live projects", "Portfolio building", "Certification"],
            description="Modern React development with hooks, state management, and best practices"
        )
        
        logger.info("Sample data initialized")
    except Exception as e:
        logger.error(f"Error initializing sample data: {str(e)}")
    
    app.run(debug=True, host='0.0.0.0', port=5000)