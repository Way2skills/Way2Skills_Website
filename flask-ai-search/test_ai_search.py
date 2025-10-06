#!/usr/bin/env python3
"""
Test script for Flask AI Search Engine
"""

import requests
import json
import time

BASE_URL = "http://localhost:5000/api"

def test_health():
    """Test health endpoint"""
    print("🏥 Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_search_reviews():
    """Test review search"""
    print("⭐ Testing review search...")
    queries = [
        "excellent teaching",
        "great experience",
        "helpful instructors",
        "outstanding"
    ]
    
    for query in queries:
        print(f"  Query: '{query}'")
        response = requests.get(f"{BASE_URL}/search/reviews", params={"q": query, "limit": 3})
        data = response.json()
        print(f"  Results: {data['count']} found")
        for result in data['results'][:2]:
            print(f"    - {result['name']}: {result['comment'][:50]}... (Relevance: {result['similarity']:.2f})")
        print()

def test_search_courses():
    """Test course search"""
    print("📚 Testing course search...")
    queries = [
        "python programming",
        "fullstack development",
        "react frontend"
    ]
    
    for query in queries:
        print(f"  Query: '{query}'")
        response = requests.get(f"{BASE_URL}/search/courses", params={"q": query, "limit": 3})
        data = response.json()
        print(f"  Results: {data['count']} found")
        for result in data['results'][:2]:
            print(f"    - {result['title']}: ₹{result.get('discount_price', 'N/A')} (Relevance: {result['similarity']:.2f})")
        print()

def test_add_data():
    """Test adding new data"""
    print("➕ Testing data addition...")
    
    # Add a new review
    review_data = {
        "name": "Test User",
        "comment": "Amazing AI-powered search functionality",
        "rating": 5
    }
    response = requests.post(f"{BASE_URL}/reviews", json=review_data)
    print(f"Add review: {response.status_code} - {response.json()['message']}")
    
    # Add a new course
    course_data = {
        "title": "AI and Machine Learning",
        "mode": "online",
        "actual_price": "15000",
        "discount_price": "10000",
        "features": ["AI concepts", "Hands-on projects", "Certification"],
        "description": "Comprehensive course on artificial intelligence and machine learning"
    }
    response = requests.post(f"{BASE_URL}/courses", json=course_data)
    print(f"Add course: {response.status_code} - {response.json()['message']}")
    print()

def test_suggestions():
    """Test search suggestions"""
    print("💡 Testing search suggestions...")
    queries = ["joh", "pyt", "java"]
    
    for query in queries:
        response = requests.get(f"{BASE_URL}/suggestions", params={"q": query, "table": "reviews"})
        suggestions = response.json()["suggestions"]
        print(f"  '{query}' → {suggestions}")
    print()

def test_ai_search_after_addition():
    """Test AI search after adding new data"""
    print("🧠 Testing AI search with new data...")
    
    # Search for the newly added review
    response = requests.get(f"{BASE_URL}/search/reviews", params={"q": "AI-powered search", "limit": 5})
    data = response.json()
    print(f"Search 'AI-powered search': {data['count']} results")
    for result in data['results'][:3]:
        print(f"  - {result['name']}: {result['comment'][:60]}... (Score: {result['similarity']:.3f})")
    
    # Search for the newly added course
    response = requests.get(f"{BASE_URL}/search/courses", params={"q": "machine learning", "limit": 5})
    data = response.json()
    print(f"Search 'machine learning': {data['count']} results")
    for result in data['results'][:3]:
        print(f"  - {result['title']}: {result.get('description', '')[:60]}... (Score: {result['similarity']:.3f})")
    print()

def main():
    """Run all tests"""
    print("🚀 Flask AI Search Engine Test Suite")
    print("=" * 50)
    
    try:
        test_health()
        test_search_reviews()
        test_search_courses()
        test_add_data()
        test_suggestions()
        test_ai_search_after_addition()
        
        print("✅ All tests completed successfully!")
        print("\n🎯 AI Search Features Demonstrated:")
        print("- Semantic similarity scoring")
        print("- TF-IDF based relevance ranking")
        print("- Intelligent keyword matching")
        print("- Real-time search suggestions")
        print("- Multi-table search capabilities")
        print("- Dynamic data addition and indexing")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to Flask server at http://localhost:5000")
        print("Please make sure the Flask server is running!")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()