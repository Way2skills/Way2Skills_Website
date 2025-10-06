# Flask AI Search Engine

A complete Flask-based AI search application with semantic search capabilities using sentence transformers.

## Features

- **Semantic Search**: Uses sentence transformers for AI-powered semantic search
- **Hybrid Search**: Combines semantic and keyword-based search for better results
- **Multi-table Search**: Search across reviews, registrations, and courses
- **Real-time Suggestions**: Auto-complete search suggestions
- **REST API**: Complete REST API with CORS support
- **SQLite Database**: Embedded database with vector embeddings storage

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask application:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the service is running

### Search Endpoints
- `GET /api/search/reviews?q=<query>&type=<search_type>&limit=<limit>`
- `GET /api/search/registrations?q=<query>&type=<search_type>&limit=<limit>`
- `GET /api/search/courses?q=<query>&type=<search_type>&limit=<limit>`

**Parameters:**
- `q`: Search query (required)
- `type`: Search type - `semantic`, `keyword`, or `hybrid` (default: hybrid)
- `limit`: Number of results to return (default: 10)

### Data Management
- `POST /api/reviews` - Add a new review
- `POST /api/registrations` - Add a new registration
- `POST /api/courses` - Add a new course

### Suggestions
- `GET /api/suggestions?q=<query>&table=<table>` - Get search suggestions

## Search Types

1. **Semantic Search**: Uses AI embeddings to find semantically similar content
2. **Keyword Search**: Traditional text-based search
3. **Hybrid Search**: Combines both approaches for optimal results

## Example Usage

### Search Reviews
```bash
curl "http://localhost:5000/api/search/reviews?q=great%20teaching&type=hybrid&limit=5"
```

### Add a Review
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "comment": "Excellent course!", "rating": 5}'
```

### Get Suggestions
```bash
curl "http://localhost:5000/api/suggestions?q=joh&table=reviews"
```

## Technology Stack

- **Flask**: Web framework
- **Sentence Transformers**: AI embeddings for semantic search
- **SQLite**: Database with BLOB storage for embeddings
- **NumPy**: Vector operations for similarity calculations
- **CORS**: Cross-origin resource sharing support

## Integration with Frontend

This Flask backend is designed to integrate with the existing React frontend. Update the frontend API calls to use the new AI search endpoints for enhanced search capabilities.