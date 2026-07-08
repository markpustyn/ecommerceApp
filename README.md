# Secure Ecommerce Application

## Project Purpose

The goal of this project was to develop a secure ecommerce web application using modern web technologies and security best practices while providing a complete shopping workflow. The application allows users to create an account, securely sign in, browse products, add items to a shopping cart, and place orders.

A primary focus of this application was implementing security by following the OWASP Top 10 recommendations, including:

- Protecting user credentials
- Preventing SQL injection attacks
- Enforcing authentication
- Restricting unauthorized access
- Using HTTPS for secure communication

---

# Application Architecture

The application was developed using **Next.js (React)** with the **App Router** and API routes.

## Frontend

- Home Page
- Products Page
- Shopping Cart
- User Sign Up
- User Sign In
- Checkout Page
- Admin Dashboard

Users interact with the frontend to browse products, manage their shopping cart, and authenticate their accounts.

---

## Backend

- Auth.js Authentication
- Session Management
- Password Verification
- REST API Routes

The backend communicates with a PostgreSQL database through an ORM to perform secure database operations.

---

## Database

The PostgreSQL database stores:

- Users
- Products
- Orders

Primary and foreign keys connect the users, products, and orders tables.

---

# User Registration Workflow

1. User enters:
   - Name
   - Email
   - Password

2. Password is hashed using **bcrypt**

3. User information is stored in PostgreSQL

4. User signs in

5. Password hash is verified

6. Auth.js creates a secure session

7. Session information authenticates the user and protects application routes

---

# Shopping Workflow

1. User signs in
2. Browse products
3. Add products to cart
4. Place order
5. Order status is updated to **Submitted**

---

# Role Allocation

This project was completed individually.

---

# Protection Tests

## Password Hashing

Passwords are hashed during user registration using **bcrypt** before being stored in PostgreSQL.

During login, the entered password is compared against the stored hash.

This protects user credentials even if the database were compromised.

<img width="790" height="375" alt="Screenshot 2026-07-07 141642" src="https://github.com/user-attachments/assets/61b3de93-8131-4805-b38e-de07c30bbfcd" />


---

## HTTPS Protection

The application is hosted over **HTTPS**, establishing a TLS connection before authentication occurs.

This protects sensitive information such as:

- Email addresses
- Passwords
- User sessions

from interception during transmission.

<img width="582" height="216" alt="Screenshot 2026-07-07 142121" src="https://github.com/user-attachments/assets/1a7ad45d-366f-4236-9279-4b532b4fa90d" />


---

## SQL Injection Prevention

Database operations are performed through **Drizzle ORM**, which uses parameterized queries.

Parameterized queries treat user input as data instead of executable SQL, preventing SQL injection attacks.

<img width="803" height="541" alt="Screenshot 2026-07-07 142523" src="https://github.com/user-attachments/assets/31bf86b1-aaf1-4c3f-b401-ae9bc8375cb8" />


---

## Cross Site Scripting (XSS)

The application uses **React**, which automatically escapes user generated content before rendering.

This prevents malicious JavaScript from being executed within the application.


<img width="847" height="726" alt="Screenshot 2026-07-07 143738" src="https://github.com/user-attachments/assets/5cfa4a06-31ff-4181-abd6-934cbcb5f3dd" />
<img width="1041" height="853" alt="Screenshot 2026-07-07 142855" src="https://github.com/user-attachments/assets/84ac3c82-e900-4802-b8f7-ae2a03fa5f07" />

---

## Role Based Access Control (RBAC)

Protected routes such as `/admin` are accessible only to authenticated users with the appropriate role.

The application checks the user's session role before granting access.

Unauthorized users are redirected back to the homepage.

---

## Parameter Validation

User credentials are validated using **Zod**.

Validation includes:

- Valid email format
- Required fields
- Minimum password length
- Password confirmation

This helps prevent invalid or weak user credentials from entering the system.

<img width="847" height="726" alt="Screenshot 2026-07-07 143738" src="https://github.com/user-attachments/assets/03f87c8b-26ea-4046-8731-1ef276d1dae9" />


---

# Challenges and Limitations

One of the biggest challenges in implementing this web application was connecting the PostgreSQL database to the ORM, requiring the database schema to be properly designed with primary and foreign keys.

Another challenge was retrieving the authenticated user session from Auth.js and including the user's role within the session to properly protect restricted routes.

---

# Future Improvements

Future improvements include:

- Google OAuth authentication
- GitHub OAuth authentication
- User order history page
- Additional admin dashboard functionality
  - Edit users
  - Delete users
  - Manage products
  - Manage orders

---

# Conclusion

This project demonstrates the development of a secure ecommerce web application using modern web technologies and security best practices.

Security features including:

- Password hashing
- HTTPS
- Parameterized database queries
- Session management
- Input validation
- Role based authorization

work together to provide a secure and reliable ecommerce platform with protection against common web application attacks.

---

# References

- https://nextjs.org/docs
- https://authjs.dev/
- https://orm.drizzle.team/docs/overview
- https://supabase.com/docs
- https://www.npmjs.com/package/bcrypt
