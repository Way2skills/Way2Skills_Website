# Flask AI Search Engine - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
No authentication required for this version.

## Rate Limiting
Currently no rate limiting implemented.

## Response Format
All responses are in JSON format with the following structure:

### Success Response
```json
{
  "query": "search term",
  "results": [...],
  "count": 10,
  "search_type": "hybrid"
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

## Endpoints

### Health Check
**GET** `/health`

Check if the API service is running.

**Response:**
```json
{
  "status": "healthy",
  "service": "Simple AI Search Engine"
}
```

---

### Search Reviews
**GET** `/search/reviews`

Search through reviews using AI-powered algorithms.

**Parameters:**
- `q` (required): Search query string
- `type` (optional): Search type - `hybrid`, `semantic`, or `keyword`. Default: `hybrid`
- `limit` (optional): Number of results to return. Default: `10`

**Example:**
```
GET /api/search/reviews?q=excellent%20teaching&type=hybrid&limit=5
```

**Response:**
```json
{
  "query": "excellent teaching",
  "results": [
    {
      "id": 1,
      "name": "John Doe",
      "comment": "Great course content and excellent teaching methodology",
      "rating": 5,
      "created_at": "2025-07-06 15:33:15",
      "similarity": 0.76,
      "score": 7.6
    }
  ],
  "count": 1,
  "search_type": "hybrid"
}
```

---

### Search Registrations
**GET** `/search/registrations`

Search through course registrations.

**Parameters:**
- `q` (required): Search query string
- `type` (optional): Search type. Default: `hybrid`
- `limit` (optional): Number of results. Default: `10`

**Example:**
```
GET /api/search/registrations?q=python&limit=5
```

**Response:**
```json
{
  "query": "python",
  "results": [
    {
      "id": 1,
      "name": "Alice Brown",
      "email": "alice@example.com",
      "phone_no": "1234567890",
      "course": "Python",
      "created_at": "2025-07-06 15:33:16",
      "similarity": 0.85
    }
  ],
  "count": 1,
  "search_type": "hybrid"
}
```

---

### Search Courses
**GET** `/search/courses`

Search through available courses.

**Parameters:**
- `q` (required): Search query string
- `type` (optional): Search type. Default: `hybrid`
- `limit` (optional): Number of results. Default: `10`

**Example:**
```
GET /api/search/courses?q=python%20programming
```

**Response:**
```json
{
  "query": "python programming",
  "results": [
    {
      "id": 1,
      "title": "Python Programming",
      "mode": "online",
      "actual_price": "7000",
      "discount_price": "4000",
      "features": ["Course videos", "Resources", "Exercises", "Certification"],
      "description": "Comprehensive Python programming course for beginners",
      "similarity": 1.0
    }
  ],
  "count": 1,
  "search_type": "hybrid"
}
```

---

### Add Review
**POST** `/reviews`

Add a new review to the database.

**Request Body:**
```json
{
  "name": "John Doe",
  "comment": "Excellent course with great content",
  "rating": 5
}
```

**Response:**
```json
{
  "message": "Review added successfully"
}
```

---

### Add Registration
**POST** `/registrations`

Add a new course registration.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone_no": "0987654321",
  "course": "React Development"
}
```

**Response:**
```json
{
  "message": "Registration added successfully"
}
```

---

### Add Course
**POST** `/courses`

Add a new course to the catalog.

**Request Body:**
```json
{
  "title": "Advanced JavaScript",
  "mode": "online",
  "actual_price": "8000",
  "discount_price": "5000",
  "features": ["Video lectures", "Projects", "Certification"],
  "description": "Advanced JavaScript concepts and modern frameworks"
}
```

**Response:**
```json
{
  "message": "Course added successfully"
}
```

---

### Get Suggestions
**GET** `/suggestions`

Get search suggestions based on partial query.

**Parameters:**
- `q` (required): Partial search query (minimum 2 characters)
- `table` (optional): Table to search in - `reviews`, `registrations`, or `courses`. Default: `reviews`

**Example:**
```
GET /api/suggestions?q=joh&table=reviews
```

**Response:**
```json
{
  "suggestions": ["John Doe", "John Smith"]
}
```

## Search Types Explained

### Hybrid Search (Recommended)
Combines semantic understanding with keyword matching for optimal results. Uses weighted scoring to balance AI-powered similarity with traditional text matching.

### Semantic Search
Pure AI-based search that understands context and meaning. Great for finding conceptually similar content even when exact keywords don't match.

### Keyword Search
Traditional text-based search using SQL LIKE queries. Fast and reliable for exact term matching.

## Relevance Scoring

All search results include a `similarity` score between 0 and 1:
- **0.8-1.0**: Highly relevant results
- **0.5-0.8**: Moderately relevant results
- **0.3-0.5**: Somewhat relevant results
- **0.1-0.3**: Low relevance results

Results are automatically sorted by relevance score in descending order.

## Error Codes

- **400 Bad Request**: Missing required parameters or invalid input
- **500 Internal Server Error**: Server-side processing error

## Examples

### Python
```python
import requests

# Search for reviews
response = requests.get(
    'http://localhost:5000/api/search/reviews',
    params={'q': 'excellent teaching', 'type': 'hybrid', 'limit': 5}
)
data = response.json()
print(f"Found {data['count']} results")

# Add a new review
response = requests.post(
    'http://localhost:5000/api/reviews',
    json={
        'name': 'Alice Johnson',
        'comment': 'Outstanding course content and delivery',
        'rating': 5
    }
)
print(response.json()['message'])
```

### JavaScript
```javascript
// Search for courses
const searchCourses = async (query) => {
  const response = await fetch(
    `http://localhost:5000/api/search/courses?q=${encodeURIComponent(query)}&type=hybrid`
  );
  const data = await response.json();
  return data.results;
};

// Add a new course
const addCourse = async (courseData) => {
  const response = await fetch('http://localhost:5000/api/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData)
  });
  return response.json();
};
```

### cURL
```bash
# Search reviews
curl "http://localhost:5000/api/search/reviews?q=great%20experience&type=hybrid&limit=3"

# Add a review
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","comment":"Amazing course!","rating":5}'

# Get suggestions
curl "http://localhost:5000/api/suggestions?q=py&table=courses"
```