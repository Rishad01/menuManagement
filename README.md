# Menu Management API

The Menu Management API is a Node.js and Express-based backend service that allows for the creation, retrieval, updating, and deletion of categories, sub-categories, and items. It is built using MongoDB as the database and follows a structured approach to organizing menu items under categories and sub-categories.

## Features

- **Category Management**: Create, retrieve, update, and delete categories.
- **Sub-Category Management**: Create, retrieve, update, and delete sub-categories under categories.
- **Item Management**: Create, retrieve, update, and delete items under categories or sub-categories.
- **Search Functionality**: Search for items by name.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js
- MongoDB
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/menuManagement.git
cd menuManagement

### 2. Install Dependencies

npm install

### 3. Set Up Environment Variables
Create a .env file in the root directory of your project and add the following environment variables:
MONGO_URI=your_mongodb_connection_string
PORT=5000

### 4. Run the Application
npm start
The server will run at   http://localhost:5000



API Routes
Category Routes
Create Category

Endpoint: POST /api/categories/
Description: Create a new category.
Get All Categories

Endpoint: GET /api/categories/
Description: Retrieve all categories.
Get Category by Name or ID

Endpoint: GET /api/categories/:name
Description: Retrieve a category by its name or ID.
Update Category

Endpoint: PUT /api/categories/update/:identifier
Description: Update a category by its ID or name.
Subcategory Routes
Create Subcategory

Endpoint: POST /api/subcategories/:categoryId
Description: Create a subcategory under a specific category.
Get All Subcategories

Endpoint: GET /api/subcategories/
Description: Retrieve all subcategories.
Get Subcategory by Name or ID

Endpoint: GET /api/subcategories/:identifier
Description: Retrieve a subcategory by its name or ID.
Get Subcategories by Category Identifier

Endpoint: GET /api/subcategories/getBycategory/:identifier
Description: Retrieve all subcategories under a specific category by category name or ID.
Update Subcategory

Endpoint: PUT /api/subcategories/:identifier
Description: Update a subcategory by its ID or name.
Item Routes
Create Item

Endpoint: POST /api/items/:categoryId/:subCategoryId
Description: Create an item under a specific category or subcategory.
Get All Items

Endpoint: GET /api/items/
Description: Retrieve all items.
Get Items by Category

Endpoint: GET /api/items/category/:identifier
Description: Retrieve all items under a specific category by category name or ID.
Get Items by Subcategory

Endpoint: GET /api/items/subcategory/:identifier
Description: Retrieve all items under a specific subcategory by subcategory name or ID.
Get Item by Name or ID

Endpoint: GET /api/items/:identifier
Description: Retrieve an item by its name or ID.
Update Item

Endpoint: PUT /api/items/:identifier
Description: Update an item by its ID or name.
Search Item by Name

Endpoint: GET /api/items/search/:name
Description: Search for an item by its name.
