
# Equipify Server

EquiSports is a cutting-edge e-commerce platform designed for sports enthusiasts. It offers a seamless shopping experience for various sports equipment and accessories, combining user-friendly navigation, secure authentication, and responsive design.

## Features

- User authentication and authorization
- Equipment listing, updating, and deletion
- Real-time inventory management
- Secure payment integration
- Comprehensive API for frontend integration

1. Navigate to the project directory:

   ```bash
   cd equipify-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in an existing user

### Equipment
- `GET /api/equipment`: Retrieve all equipment
- `POST /api/equipment`: Add new equipment
- `PUT /api/equipment/:id`: Update equipment details
- `DELETE /api/equipment/:id`: Delete equipment

### Inventory
- `GET /api/inventory`: Get inventory status
- `PuT /api/inventory/:id`: Update inventory

## Technologies Used

- **Node.js** with **Express.js** for the server
- **MongoDB** as the database
- **JWT** for authentication
- **Stripe** for payment integration

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET=your_stripe_secret_key
```

## Running the Server

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Access the API at Local `http://localhost:5000`.
3. Access the API at vercel `https://equipify-server-side.vercel.app/products/`.