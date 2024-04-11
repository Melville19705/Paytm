# Paytm-Like Application

This project is a Paytm-like application with a simple user interface, allowing users to sign up, view a dashboard of signed-up users, send money, and search for recipients.

## Features

1. **Signup Authentication**: Users can sign up securely with authentication.
2. **Dashboard**: Displays a list of signed-up users.
3. **Send Money**: Users can transfer amounts in rupees to recipients.
4. **Search Functionality**: Users can search for recipients on the dashboard page.

## Technologies Used

- **Backend**: Express.js
- **Frontend**: React
- **Input Validation**: Zod
- **Authorization**: JSON Web Token (jsonwebtoken)
- **Password Encryption**: bcryptjs
- **Database**: MongoDB with Mongoose

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables for database connection and JWT secret.
4. Run the backend server using `npm run dev`.
5. Run the frontend using `npm start`.

## Usage

1. Sign up for an account.
2. Log in to access the dashboard.
3. View and search for recipients on the dashboard.
4. Click on "Send Money" to transfer amounts.
5. Log out when done.

## Contributing

Contributions are welcome. Please follow the guidelines in CONTRIBUTING.md.

## License

This project is licensed under the [MIT License](LICENSE).
