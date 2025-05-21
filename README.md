>User Access Management System
A full-stack web application designed to manage software access requests within an organization, featuring role-based access control (RBAC) for different user types: Admin, Manager, and Employee.

>Features
User Authentication: Secure signup and login for different roles.

>Role-Based Access Control (RBAC):

Admin:

Create new software entries with defined access levels (Read, Write, Execute).

View and manage all pending software access requests.

Approve or reject requests.

Employee:

Request access to available software.

View the status of their own submitted requests.

Manager:

(Currently similar to Admin in terms of request management, but can be expanded for specific managerial oversight).

Software Management: Admins can define and list software available in the system.

Request Workflow: A clear process for employees to request access and for administrators to review and act on those requests.

Persistent Data: All user, software, and request data is stored in a MongoDB database.

🚀 Technologies Used
Frontend:

React.js: A JavaScript library for building user interfaces.

React Router DOM: For declarative routing in React applications.

Axios: Promise-based HTTP client for making API requests.

Bootstrap: A powerful, feature-packed frontend toolkit for building responsive, mobile-first sites.

Backend:

Node.js: JavaScript runtime environment.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

MongoDB: A NoSQL document database.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

bcryptjs: For hashing and comparing passwords securely.

jsonwebtoken (JWT): For secure user authentication and authorization.

cors: Node.js package for providing a Connect/Express middleware that can be used to enable CORS.

cookie-parser: Middleware to parse Cookie headers and populate req.cookies.

dotenv: Loads environment variables from a .env file.

🛠️ Setup Instructions
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm (Node Package Manager) or Yarn

MongoDB Community Server (running locally on port 27017)

MongoDB Compass (optional, for easy database management)

1. Clone the Repository
git clone <your-repository-url>
cd <your-project-folder>

2. Backend Setup
Navigate into the backend directory:

cd backend

a. Install Dependencies:

npm install
# or
yarn install

b. Create .env file:

Create a file named .env in the backend directory and add the following environment variables. Replace Anjan1276 with a strong, random string if you prefer.

PORT=5000
MONGO_URI=mongodb://localhost:27017/user-access-db
JWT_SECRET=Anjan1276

Note: Ensure your local MongoDB server is running on localhost:27017.

c. Start the Backend Server:

npm start
# or if you have nodemon installed for auto-reloading during development:
npx nodemon server.js

You should see messages like MongoDB connected and Server running on port 5000 in your console.

3. Frontend Setup
Open a new terminal window and navigate into the frontend directory:

cd ../frontend

a. Install Dependencies:

npm install
# or
yarn install

b. Start the Frontend Development Server:

npm run dev
# or
yarn dev

This will typically start the React app on http://localhost:5173.

🚀 Running the Application
Ensure both your Backend and Frontend servers are running in separate terminal windows.

Open your web browser and go to http://localhost:5173.

🔑 Key Roles and Initial Setup for Demo
To quickly demonstrate the application's features, you can use the following pre-configured user accounts.

Important Note on Security: In a real-world production environment, roles are managed dynamically by administrators, and credentials are never hardcoded or shared. These accounts are provided for demonstration convenience only.

Demo Accounts:
Admin User:

Username: demo_admin

Password: demo_pass

This user has already been configured with the "Admin" role in the database for your convenience.

Employee User:

Username: demo_employee

Password: demo_pass

This user has already been configured with the "Employee" role in the database for your convenience.

How to Use for Demo:
Login as Admin: Use demo_admin / demo_pass to access the "Create Software" and "Manage Requests" functionalities.

Login as Employee: Use demo_employee / demo_pass to "Request Access" and view "My Requests".

Manual Admin Setup (for deeper understanding):
If you wish to manually set up an Admin user to understand the process, here's how:

Sign Up a New User: Go to http://localhost:5173/signup and create a new user (e.g., new_user, password new_pass). This user will default to the Employee role.

Change Role in Database:

Open MongoDB Compass and connect to your user-access-db.

Navigate to the users collection.

Find the new_user document.

Edit the document and change the role field from "Employee" to "Admin". Save the changes.

Now, new_user can log in as an Admin.

💡 Future Enhancements
Manager Role Specifics: Differentiate Manager permissions more clearly from Admin (e.g., Managers can only approve requests for their direct reports, or only for certain software categories).

User Profile Management: Allow users to update their own passwords or other profile details.

Notifications: Implement real-time in-app notifications for request status changes (for employees) or new requests (for managers/admins).

Search and Filtering: Add robust search, sort, and filter options to the request management tables.

Dashboard Analytics: Create simple dashboards showing request trends, approval rates, etc.

Password Reset: Implement "Forgot Password" functionality.

UI/UX Improvements: Further refine the styling, add animations, and improve overall user experience.

Example: Implement a custom modal for confirmations instead of alert(), or add subtle hover effects to table rows.

Error Handling: More user-friendly error messages and visual feedback.