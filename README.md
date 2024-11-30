# Flight Booking System

This is a full-stack flight booking system built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application allows users to search for flights, view available options, make bookings, and manage user profiles.

## Features

- **User Authentication**: Register, login, and logout using JWT authentication.
- **Flight Search**: Search flights by origin, destination, and travel date.
- **Flight Details**: View detailed information about available flights.
- **Booking System**: Make, view, and manage flight bookings.
- **Admin Dashboard**: Admin can add, update, delete flights, and view bookings.
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly experience.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Redux/Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flight-booking-system.git
cd flight-booking-system

### 2. Set up Environment Variables
SERVER_PORT = <your_server_port>

RATE_LIMIT_WINDOW = <your_RATE_LIMIT_WINDOW>
RATE_LIMIT_MAX = <your_RATE_LIMIT_MAX>

MONGOOSE_ATLAS_URL = <your_server_port>

JWT_SECRET_KEY = <your_JWT_SECRET_KEY>
JWT_ACCESS_KEY = <your_JWT_ACCESS_KEY>
JWT_REFRESH_KEY = <your_JWT_REFRESH_KEY>
JWT_RESET_PASWORD_KEY = <your_JWT_RESET_PASWORD_KEY>

CLIENT_URI = <your_CLIENT_URI>

SMTP_USERNAME = <your_SMTP_USERNAME>
SMTP_PASSWORD = <your_SMTP_PASSWORD>
```
