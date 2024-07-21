# Real-Time Chat Application

## Overview

This Real-Time Chat Application leverages the MERN stack (MongoDB, Express.js, React.js, Node.js) with added features for real-time communication via Socket.IO and SMS notifications through Twilio. It offers users an interactive chat experience with live messaging and mobile notifications.

## Features

- **Real-Time Messaging**: Engage in live conversations with Socket.IO.
- **User Authentication**: Secure and reliable login and registration system.
- **SMS Notifications**: Receive notifications directly on your mobile device through Twilio.
- **Responsive UI**: An intuitive and dynamic interface built with React.js.
- **Backend API**: Node.js and Express.js handle server-side logic and API requests.
- **Database**: Store user data and chat history with MongoDB.

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (Ensure MongoDB is installed and running)
- npm (Node Package Manager)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install Backend Dependencies:**

    Navigate to the `backend` directory and install dependencies:

    ```bash
    cd backend
    npm install
    ```

3. **Install Frontend Dependencies:**

    Navigate to the `frontend` directory and install dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

4. **Configure Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/chat-app
    JWT_SECRET=your_jwt_secret
    ACCOUNT_SID=your_twilio_account_sid
    AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    ```

    Replace the placeholder values with your actual Twilio credentials and JWT secret.

5. **Start the Application:**

    - **Backend:** Navigate to the `backend` directory and run:

      ```bash
      npm start
      ```

    - **Frontend:** Navigate to the `frontend` directory and run:

      ```bash
      npm start
      ```

    The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:5000](http://localhost:5000).

## Usage

- **Chat Interface:** Join chat rooms and send/receive messages in real-time.
- **SMS Notifications:** Receive SMS notifications for specific events via Twilio.
- **Authentication:** Manage secure login and user sessions.

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit your changes:**

    ```bash
    git commit -am 'Add new feature'
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature
    ```

5. **Open a Pull Request.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **React.js** for the frontend framework.
- **Express.js** for the backend framework.
- **Socket.IO** for real-time communication.
- **Twilio** for SMS notifications.
- **MongoDB** for the database.
- **Node.js** for the server-side runtime.

Feel free to customize this README further based on additional features or specific instructions for your project!
