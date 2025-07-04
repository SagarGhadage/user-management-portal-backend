## User Management Portal - Backend

This is the backend for the User Management Portal, built using NestJS and TypeScript. The application provides a secure user management system with features such as registration, login, OTP verification, role-based access, token renewal, file upload, and an admin,manager, user dashboard for managing users.

### Features

- **User Registration and Login**: Users can register and log in securely using JWT authentication.
- **OTP Verification**: Users receive a 6-digit OTP via email for verification after registration.
- **Role-Based Access Control**: Different roles (Admin, User, Manager) with specific access rights.
- **Token Renewal**: Access and refresh tokens for maintaining user sessions.
- **File Upload**: Users can upload files, which are stored locally.
- **Admin Dashboard**: Admins can manage users, view user details, and filter user lists.
- **API Documentation**: Swagger is integrated for API testing and documentation.

### Technologies Used

- **Backend**: NestJS (Node.js framework)
- **Frontend**: Next.js (React framework)
- **Database**: MongoDB
- **Authentication**: JWT (Access and Refresh Tokens)
- **OTP**: Email-based
- **File Upload**: Local storage
- **API Documentation**: Swagger (OpenAPI)

### Project Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-management-portal/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root of the backend directory and set the necessary environment variables.

4. Run the application:
   ```bash
   npm run start:dev
   ```

### API Documentation

The API documentation is available at `/api` once the server is running. Use Swagger UI to test the endpoints.

### Testing

To run the tests, use the following command:
```bash
npm run test 
```

### License

