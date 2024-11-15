
# Book API Documentation

This API allows you to manage books, authors, and categories. You can perform CRUD operations on authors, categories, and books, as well as retrieve books based on categories or authors.

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### Author Endpoints

#### 1. Create Author
- **POST** `/authors`
- **Request Body:**
  ```json
  {
    "name": "Author Name",
    "bio": "Author biography"
  }
  ```
- **Response:**
  ```json
  {
    "id": "author-id",
    "name": "Author Name",
    "bio": "Author biography"
  }
  ```

#### 2. Delete Author
- **DELETE** `/authors/:id`
- **Response:**
  ```json
  {
    "message": "Author deleted successfully"
  }
  ```

#### 3. Get All Authors
- **GET** `/authors`
- **Response:**
  ```json
  {
    "authors": [
      {
        "id": "author-id",
        "name": "Author Name",
        "bio": "Author biography"
      }
    ]
  }
  ```

### Category Endpoints

#### 1. Create Category
- **POST** `/categories`
- **Request Body:**
  ```json
  {
    "name": "Category Name",
    "description": "Category Description"
  }
  ```
- **Response:**
  ```json
  {
    "id": "category-id",
    "name": "Category Name",
    "description": "Category Description"
  }
  ```

  #### 2. Delete Category
- **DELETE** `/categories/:id`
- **Response:**
  ```json
  {
    "message": "Category deleted successfully"
  }
  ```  

#### 3. Get All Categories
- **GET** `/categories`
- **Response:**
  ```json
  {
    "categories": [
      {
        "id": "category-id",
        "name": "Category Name",
        "description": "Category Description"
      }
    ]
  }
  ```



### Book Endpoints

#### 1. Create Book
- **POST** `/books`
- **Request Body:**
  ```json
  {
    "title": "Book Title",
    "description": "Book Description",
    "published_date": "2023-11-15T00:00:00Z",
    "isbn": "123-4567890123",
    "authorId": "author-id",
    "categoryId": "category-id"
  }
  ```
- **Response:**
  ```json
  {
    "id": "book-id",
    "title": "Book Title",
    "description": "Book Description",
    "published_date": "2023-11-15T00:00:00Z",
    "isbn": "123-4567890123",
    "authorId": "author-id",
    "categoryId": "category-id"
  }
  ```

#### 2. Update Book
- **PUT** `/books/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated Book Title",
    "description": "Updated Description",
    "published_date": "2023-11-16T00:00:00Z",
    "isbn": "123-4567890124",
    "authorId": "author-id",
    "categoryId": "category-id"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Book updated successfully"
  }
  ```

#### 3. Delete Book
- **DELETE** `/books/:id`
- **Response:**
  ```json
  {
    "message": "Book deleted successfully"
  }
  ```

#### 4. Get Book by ID
- **GET** `/books/:id`
- **Response:**
  ```json
  {
    "id": "book-id",
    "title": "Book Title",
    "description": "Book Description",
    "published_date": "2023-11-15T00:00:00Z",
    "isbn": "123-4567890123",
    "authorId": "author-id",
    "categoryId": "category-id"
  }
  ```

#### 5. Get Books by Category
- **GET** `/books/category/:id`
- **Response:**
  ```json
  {
    "books": [
      {
        "id": "book-id",
        "title": "Book Title",
        "description": "Book Description",
        "published_date": "2023-11-15T00:00:00Z",
        "isbn": "123-4567890123",
        "authorId": "author-id",
        "categoryId": "category-id"
      }
    ]
  }
  ```

#### 6. Get Books by Author
- **GET** `/books/author/:id`
- **Response:**
  ```json
  {
    "books": [
      {
        "id": "book-id",
        "title": "Book Title",
        "description": "Book Description",
        "published_date": "2023-11-15T00:00:00Z",
        "isbn": "123-4567890123",
        "authorId": "author-id",
        "categoryId": "category-id"
      }
    ]
  }
  ```

#### 7. Get All Books
- **GET** `/books`
- **Response:**
  ```json
  {
    "books": [
      {
        "id": "book-id",
        "title": "Book Title",
        "description": "Book Description",
        "published_date": "2023-11-15T00:00:00Z",
        "isbn": "123-4567890123",
        "authorId": "author-id",
        "categoryId": "category-id"
      }
    ]
  }
  ```

## Error Handling

- **400 Bad Request**: Invalid input, missing or incorrect parameters.
- **404 Not Found**: Resource not found (e.g., author, category, or book does not exist).
- **500 Internal Server Error**: Unexpected server error.

---

## Notes

- Replace the `author-id` and `category-id` with actual IDs from your database.
- Dates should be passed in the `ISO 8601` format (e.g., `"2023-11-15T00:00:00Z"`).
