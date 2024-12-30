
# Task Manager Website

**Live Demo**: [TrackIt - Live Demo](https://trackitbybuland.netlify.app/)

**By**: Buland Choudhary

---

### Overview


The **Task Manager Website** is a robust task management platform designed to help users efficiently organize and track their tasks. With features such as **user authentication**, **task creation and management**, and the ability to **categorize tasks** and set **deadlines**, this application streamlines task handling for individuals and teams.

Built with **modern technologies**, this project demonstrates how to create a scalable and secure web application while maintaining a seamless, responsive design across all devices. It offers a real-world example of how to manage user data, authenticate users, and provide an intuitive interface for managing tasks.

---

### Features

- **User Authentication**: 
  - Sign Up, Log In, and Log Out functionality.
  - Passwords are hashed for secure storage.
  
- **Task Management**: 
  - Add, Edit, Delete tasks.
  - Mark tasks as complete.
  - Assign deadlines to tasks.
  
- **Task Categorization** (optional): 
  - Categorize tasks based on user preferences.
  
- **Mobile Responsiveness**: 
  - Optimized for mobile and desktop views.

---

### Tech Stack

#### **Frontend**:
- **UI**: React.js for a dynamic user interface.
- **Styling**: Tailwind CSS for modern, responsive design.
- **State Management**: React Context API (for simpler state management).
  
#### **Backend**:
- **Node.js** with **Express.js** to serve API requests.
- **Authentication**: Custom JWT-based implementation for secure authentication.
- **Database**: MySQL with **Aiven**.

#### **Deployment**:
- **Frontend**: Hosted on **Netlify** for seamless deployment and continuous integration.
- **Backend**: Deployed on **Render**.
- **Database**: **Aiven** (serverless MySQL database).

---

### API Design

**Authentication Endpoints**:
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in the user and return a JWT token.

**Task Endpoints**:
- `GET /tasks`: Fetch all tasks for the authenticated user.
- `POST /tasks`: Add a new task.
- `PUT /tasks`: Update an existing task.
- `DELETE /tasks`: Delete a specific task.

---

### Database Schema

#### **Users Table**:
- `id` (Primary Key)
- `name`
- `email` (Unique)
- `password` (Hashed)

#### **Tasks Table**:
- `id` (Primary Key)
- `user_id` (Foreign Key, references `Users` table)
- `title`
- `description`
- `status` (Pending / Done)
- `priority` (Low / Medium / High)
- `due_date`
- `created_at`
- `updated_at`

---

### Frontend Architecture

- **Component Structure**:
  - **Auth Components**: Login Form, Register Form
  - **Main Application Components**: Navbar, TaskList, TaskForm, TaskItem

- **State Management**:
  - **authContext**: Stores user info and authentication token.
  - **taskContext**: Manages task list and task-related API interactions.

- **Routing**: 
  - `/login`: Login Page
  - `/register`: Register Page
  - `/tasks`: Task Dashboard (where users can manage their tasks)

---

### Security Considerations

- **Passwords**: All passwords are securely hashed using **bcrypt** before storing in the database.
- **JWT Tokens**: JSON Web Tokens (JWT) are used for secure user authentication. Tokens are validated on every request that requires authentication.
- **Data Validation**: User inputs are sanitized both on the frontend and backend to prevent any malicious data from being processed.
- **CORS**: CORS policies are configured to ensure that requests are only accepted from authorized origins.

---

### Resources

- **Design Inspiration**: Inspiration from platforms like **Dribbble** and **Behance** for UI design ideas.
- **API Testing**: Used **Postman** for API testing and debugging.
- **GitHub**: Version control using **GitHub** for project management and collaboration.

---

### Conclusion

This project showcases a full-stack web application that uses modern technologies such as React.js, Node.js, MySQL, and JWT authentication. It's built with best practices for security and scalability, and it's hosted on popular platforms like **Netlify**, **Render**, and **Aiven**. 

Feel free to explore the live demo and check out the source code to understand how this task manager application works!

--- 

### Contact

For any questions or feedback, feel free to reach out to the project creator: **Buland Choudhary [LinkedIn](https://linkedin.com/in/buland-choudhary)**. 
