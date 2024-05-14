# Shopify

Shopify is an E-commerce web application that is fully responsive and designed to provide a seamless shopping experience. This application allows users to register as buyers or sellers, manage products, and perform secure transactions through an integrated payment gateway.

## Key Features

- **Role Management:** Users can register as buyers or sellers. Each role has distinct functionalities and views.
- **Wishlist & Cart:** Users can add products to their wishlist and cart. They can manage their wishlist and cart, including adding, removing, and updating items.
- **Payment Gateway Integration:** Payment gateway integration enables secure transactions. Users can make payments through the integrated gateway.
- **Seller Features:** Sellers can add, update, and delete products. They can view orders and manage inventory.
- **Buyer Features:** Buyers can browse, add to cart/wishlist, and purchase products.
- **Responsive Design:** The application is fully responsive, providing an optimal user experience on both desktop and mobile devices.
- **Secure Authentication:** User data is protected with secure authentication mechanisms.
- **Product Reviews:** Buyers can leave reviews and ratings for products they have purchased.

## Technologies Used

- **Node.js:** The backend runtime environment providing scalability and efficiency.
- **Express.js:** A robust web application framework for building scalable and maintainable applications.
- **MongoDB:** A NoSQL database for storing user accounts, product data, and transaction information.
- **EJS:** A templating engine to generate dynamic HTML content for enhanced user interfaces.
- **Passport.js:** A middleware for authentication in Node.js applications.
- **Tailwind CSS:** Used for styling and creating a responsive design.
- **FontAwesome:** Icons used throughout the application.
- **Mongoose:** An elegant MongoDB object modeling tool for Node.js.

## Project Structure

The project follows the MVC (Model-View-Controller) architecture for organized and maintainable code.

## Usage

Once the application is running, you can access it. 

### Home Page
- Browse through the products listed on the home page.

### Products Page
- Click on a product to view its details and add it to your cart or wishlist.

### Cart Functionality
- View the items in your cart, adjust quantities, and proceed to checkout.
- Users can add items to the cart, update the quantity of each item, and remove items if needed.
- The total price is dynamically updated based on the items in the cart.

### Login and Signup Page Functionality
- **Signup Page:** New users can create an account by providing their email, username, and password. They can choose to register as either a buyer or a seller.
- **Login Page:** Existing users can log in using their email and password. Successful login redirects users to their respective dashboards based on their roles.

### Online Payment
- Users can make payments through the integrated Stripe payment gateway.
- During checkout, users will be prompted to enter their payment details securely.
- Upon successful payment, the order is processed, and users receive a confirmation email.

## Live Demo

Check out the live demo of the project [here](https://your-live-demo-link.com).

## Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Products Page
![Products Page](screenshots/products.png)

### Login Page
![Login Page](screenshots/login.png)

### Signup Page
![Signup Page](screenshots/signup.png)

### Cart Page
![Cart Page](screenshots/cart.png)

---

Feel free to ask if you need any further changes or additions!
