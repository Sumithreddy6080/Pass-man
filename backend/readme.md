# Passman Backend API

This is the backend API for the Passman application, which provides user authentication and data management functionalities. Below is a guide to help frontend developers and others interact with the API.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. **User Registration**
- **URL:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "email": "your_email",
    "password": "your_password"
  }
  ```
- **Response:**
  - Success:  Returns a JWT token.
  - Failure: `400 Bad Request`

### 2. **User Login**
- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "email": "your_email",
    "password": "your_password"
  }
  ```
- **Response:**
  - Success: Returns a JWT token.
  - Failure: `401 Unauthorized`

### 3. **Get User Data**
- **URL:** `/user/data`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <your_token>`
- **Response:**
  - Success: Returns user data.
  - Failure: `404 Not Found` or `401 Unauthorized`

### 4. **Add Data**
- **URL:** `/user/data`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <your_token>`
- **Request Body:**
  ```json
  {
    "website": "example.com",
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  - Success: `201 Created`
  - Failure: `400 Bad Request`

### 5. **Update Data**
- **URL:** `/user/data`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer <your_token>`
- **Request Body:**
  ```json
  {
    "id": "data_id",
    "website": "updated_website.com",
    "username": "updated_username",
    "password": "updated_password"
  }
  ```
- **Response:**
  - Success: `200 OK`
  - Failure: `404 Not Found` or `400 Bad Request`

### 6. **Delete Data**
- **URL:** `/user/data`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer <your_token>`
- **Request Body:**
  ```json
  {
    "id": "data_id"
  }
  ```
- **Response:**
  - Success: `200 OK`
  - Failure: `404 Not Found` or `400 Bad Request`

## Notes for Frontend Developers
1. Always include the `Authorization` header with the JWT token for protected routes.
2. Handle error responses gracefully and display appropriate messages to users.
3. Validate user inputs before sending requests to the API.

## Running the Backend Locally
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. The server will run on `http://localhost:3000`.
