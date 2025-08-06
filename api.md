📡 EchoReads API Spec — Phase 6: Home Content Integration
🔁 Common Notes for All Endpoints
✅ All requests require Bearer Token (JWT) in headers

✅ All endpoints should accept a ?type=magazine|article|digest query param

✅ Errors should follow this format:

json
Copy
Edit
{
  "success": false,
  "message": "Invalid post type",
  "code": 400
}
✅ Success responses should follow:

json
Copy
Edit
{
  "success": true,
  "message": "Content fetched successfully",
  "data": { ... }
}
✅ 1. GET /home
📌 Purpose:
Fetch home screen content sections per post type: featured, trending, recommended, newContent.

🟢 Request:
Method: GET

Query:

type: 'magazine' | 'article' | 'digest' (required)

Example: /home?type=magazine

📤 Request Headers:
http
Copy
Edit
Authorization: Bearer <JWT>
✅ Response (200 OK):
json
Copy
Edit
{
  "success": true,
  "message": "Home content loaded successfully",
  "data": {
    "featured": [ /* Post[] */ ],
    "trending": [ /* Post[] */ ],
    "recommended": [ /* Post[] */ ],
    "newContent": [ /* Post[] */ ]
  }
}
🔁 Post Object Example:
json
Copy
Edit
{
  "id": "post_123",
  "title": "Vogue – Summer Edition",
  "coverImage": "https://cdn.echoreads.com/images/vogue-2025.jpg",
  "description": "Explore the best summer styles...",
  "category": "Fashion",
  "author": "Vogue",
  "publishedAt": "2025-08-01T00:00:00Z",
  "isBookmarked": false
}
❌ Error Response (400 or 401):
json
Copy
Edit
{
  "success": false,
  "message": "Missing or invalid 'type' parameter",
  "code": 400
}
✅ 2. GET /home/categories
📌 Purpose:
Fetch categories by post type (used in CategoryGrid)

🟢 Request:
Method: GET

Query:

type: 'magazine' | 'article' | 'digest' (required)

Example: /home/categories?type=digest

📤 Request Headers:
http
Copy
Edit
Authorization: Bearer <JWT>
✅ Response (200 OK):
json
Copy
Edit
{
  "success": true,
  "message": "Categories loaded successfully",
  "data": [
    {
      "id": "cat_01",
      "name": "Fashion",
      "icon": "shirt-outline",
      "color": "#FF6A2C"
    },
    {
      "id": "cat_02",
      "name": "Politics",
      "icon": "newspaper-outline",
      "color": "#4E9F3D"
    }
  ]
}
❌ Error Response:
json
Copy
Edit
{
  "success": false,
  "message": "Invalid post type or unauthorized",
  "code": 401
}
✅ 3. Optional: POST /home/category-filter
(Optional if you're building category-based filtering later)

📌 Purpose:
Fetch filtered posts by category & post type

🔵 Request:
Method: POST

Body:

json
Copy
Edit
{
  "type": "magazine",
  "categoryId": "cat_01"
}
✅ Response:
json
Copy
Edit
{
  "success": true,
  "message": "Filtered posts loaded successfully",
  "data": [ /* Post[] */ ]
}
✅ Summary for Backend Developer
Endpoint	Method	Description
/home?type=...	GET	Returns all sections: featured, trending, recommended, newContent
/home/categories?type=...	GET	Returns list of categories by post type
/home/category-filter	POST	(Optional) Filter posts by selected category

🛡️ Validations Required
Field	Validation Rule
type	Must be one of: `'magazine'
Authorization	Required JWT header
categoryId	Required for /category-filter, must be valid ID

