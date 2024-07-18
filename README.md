# Booking System Documentation

## Table of Contents
- [Introduction](#1-introduction)
- [Installation](#2-installation)
- [Usage](#3-usage)
- [Configuration](#4-configuration)
- [API Reference](#5-api-reference)
- [Contributing](#6-contributing)
- [License](#7-license)

## 1. Introduction
Welcome to the Booking System documentation! This document provides a comprehensive guide on how to install, configure, and use the Booking System project.

## 2. Installation
To install the Booking System, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/booking-system.git
    ```

2. Navigate to the project directory:
    ```sh
    cd booking-system
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Set up the environment variables:
    ```sh
    npm run env:dev
    ```

5. Set up the database:
    Follow the instructions [here](./database-setup.md)

6. Configure the environment variables:
    Follow the instructions [here](./env-setup.md)

7. Start the application:
    ```sh
    npm run dev
    ```

## Scripts

Here are the available scripts in the `package.json`:

- `test`: Runs the tests using Jest.
    ```sh
    npm run test
    ```

- `env:dev`: Generates the environment variables file (`.env`) using `devEnvGenerator.sh`.
    ```sh
    npm run env:dev
    ```

- `dev`: Starts the development server using Nodemon and TypeScript.
    ```sh
    npm run dev
    ```

- `dev:docker`: Builds and starts the application using Docker Compose.
    ```sh
    npm run dev:docker
    ```

- `dev:gitignore`: Generates the `.gitignore` file using `gitignoreGenerator.sh`.
    ```sh
    npm run dev:gitignore
    ```

- `jest`: Runs Jest with the specified configuration.
    ```sh
    npm run jest
    ```

- `build`: Compiles the TypeScript code to JavaScript.
    ```sh
    npm run build
    ```

- `docker:purge:images`: Removes all Docker images.
    ```sh
    npm run docker:purge:images
    ```

- `docker:purge:containers`: Removes all Docker containers.
    ```sh
    npm run docker:purge:containers
    ```

- `docker:purge:networks`: Removes all Docker networks.
    ```sh
    npm run docker:purge:networks
    ```

- `docker:purge:volumes`: Removes all Docker volumes.
    ```sh
    npm run docker:purge:volumes
    ```

- `docker:purge:all`: Performs a complete Docker system prune.
    ```sh
    npm run docker:purge:all
    ```

## 3. Usage
Once the Booking System is installed, you can use it to manage bookings for your business. Here are the main features and functionalities:
- User registration and authentication
- Booking creation, modification, and cancellation
- Availability management
- Reporting and analytics

## 4. Configuration
The Booking System can be configured using environment variables. Here are the available configuration options:
- `DATABASE_URL`: The URL of the database
- `SECRET_KEY`: The secret key used for authentication
- `SMTP_HOST`: The SMTP server host for sending email notifications
- `SMTP_PORT`: The SMTP server port
- `SMTP_USERNAME`: The username for SMTP authentication
- `SMTP_PASSWORD`: The password for SMTP authentication

- `devEnvGenerator.sh`: Use this file to generate the necessary .env file for the whole project

# Development Environment Setup Script

This Bash script automates the creation of a `.env` file containing environment variables for a development environment. Additionally, it ensures that the `.env` file and the script itself (`devEnvGenerator.sh`) are included in the `.gitignore` file to prevent them from being tracked by version control. The script uses ANSI color codes to enhance the readability of its output messages.

- usage: 
- run the file: `npm run env:dev`


# `.gitignore` Generator Script

This script automates the creation and updating of a `.gitignore` file for your project. It includes a comprehensive list of files and directories to be ignored, generated from various sources such as Node.js, macOS, Windows, Linux, and Visual Studio.

## Table of Contents

- [Overview](#overview)
- [File Name](#file-name)
- [Functionality](#functionality)
- [Steps](#steps)
- [Detailed Script Explanation](#detailed-script-explanation)
- [Usage](#usage)

## Overview

This script helps in setting up and maintaining a `.gitignore` file for your project by:
1. Defining a comprehensive list of files and directories to be ignored.
2. Checking if the `.gitignore` file exists and creating it if it does not.
3. Appending any missing ignore patterns to the existing `.gitignore` file.

## File Name

`gitignoreGenerator.sh`

## Functionality

1. **Define ANSI color codes**: The script defines several ANSI color codes for colored output in the terminal.
2. **Define the `.gitignore` content**: The script includes a comprehensive list of ignore patterns for various platforms and tools.
3. **Check if the `.gitignore` file exists**: If the file exists, the script appends any missing patterns. If it does not exist, the script creates it with the full list of patterns.
4. **Initialize counters**: Counters for new and existing entries in the `.gitignore` file are initialized.
5. **Summary messages**: The script prints summary messages indicating the number of new and existing entries in the `.gitignore` file.

## Usage
- run: `npm run dev:gitignore` to generate your `.gitignore` file

## 5. API Reference
The Booking System API provides endpoints to manage users, properties, reservations, conversations, and more. The application is built with Express and TypeScript, and it leverages MongoDB for storing conversations and PostgreSQL for relational data.

## Routes

### Migrations

**Base URL**: `/migrations`

This route handles database migrations.

- **`GET /migrations/list`**: Fetch the list of all migrations.
- **`GET /migrations/up`**: Run new migrations.
- **`GET /migrations/rollback`**: Rollback each migration.

### Login

**Base URL**: `/login`

This route handles user authentication.

- **POST /login**: Authenticate a user and return a JWT token.
  - **Request Body**:
    - `phone_nember`: User's phone number to generate Brearer_Token.
  - **Response**: 
    - `token`: JWT token for authenticated user.
  - **response example**:
      ```
      {
        "type": "Request Successful",
        "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYjJmYmRhLTc2YTgtNDYwYy05N2Y5LTIwM2QyOTYyNzBlNyIsInJvbGUiOiJndWVzdCIsImlhdCI6MTcyMTI1NzkxMywiZXhwIjoxNzIyNTUzOTEzfQ.z9IQ-yxd2pjJGuC1m5IGt7RB0ZpW1iyu420pXbXpG0s"
      }
      ```

### Users

**Base URL**: `/users`

This route manages user related operations.

- **GET /users**: Retrieve a list of all users.
- **GET /users/:id**: Retrieve a specific user by their ID.
- **GET /users//phone/:phoneNumber**: Retrieve a specific user by their phone number.
- **POST /users**: Create a new user.
  - **Request Body**:
    - `name`: User's name.
    - `phone_number`: User's phone number.
    - `role`: User's role (e.g., guest, property_owner). User role can come from the frontend based on frontend logic or it can be either be chosen by some factors like which URL the request is coming from so that URL is only used for Guests or Property Owners for instance, or there can be many more related ways to manage the User Roles, here I decided to have set by the frontend logic, hence the existance in the body.
- **PUT /users/:id**: Update an existing user.
  - **Request Body**:
    - Any updatable user fields (e.g.`name`,`phone_number`).
- **DELETE /users/:id**: Delete a user by their ID.

### Property

**Base URL**: `/property`

This route manages property related operations.

**Note**: This route only works if you have a `property_owner` role in order to represent user management based on roles.

- **GET /property**: Retrieve a list of all properties.
- **GET /property/:id**: Retrieve a specific property by its ID.
- **GET /property/owner/:ownerId**: Retrieve a specific property by its Owner ID.
- **POST /property**: Create a new property.
  - **Request Body**:
    - `name`: Property name.
  - **property creation constrain**: The user should only have the property owner role in order to register a property.
- **PUT /property/:id**: Update an existing property.
  - **Request Body**:
    - Any updatable property fields (e.g., `name`, `owner_id`).
- **DELETE /property/:id**: Delete a property by its ID.

### Reservations

**Base URL**: `/reservations`

This route manages reservation related operations.

- **GET /reservations**: Retrieve a list of all reservations.
- **GET /reservations/:id**: Retrieve a specific reservation by its ID.
- **POST /reservations**: Create a new reservation.
  - **Request Body**:
    - `property_id`: ID of the property being reserved.
    - `guest_id`: ID of the guest making the reservation.
    - `start_date`: Reservation start date.
    - `end_date`: Reservation end date.
- **PUT /reservations/:id**: Update an existing reservation.
  - **Request Body**:
    - Any updatable reservation fields (e.g., `property_id`, `guest_id`, `start_date`, `end_date`).
- **DELETE /reservations/:id**: Cancel a reservation by its ID.

### Conversation

**Base URL**: `/conversation`

This route manages conversation related operations.

- **GET /conversation**: Retrieve a list of all conversations.
- **GET /conversation/:id**: Retrieve a specific conversation by its ID.
- **POST /conversation**: Create a new conversation.
  - **Request Body**:
    - `sender_id`: ID of the user sending the message.
    - `receiver_id`: ID of the user receiving the message.
    - `body`: Message body.
    - `correlation_id` (optional): ID for threading replies.
  - **How it works**: When you create a conversation there's an array of messages correlated to the conversation looking like a thread of messages and replies, since the frontend can manage the sessions and the user_id representation on each end here you have to exchange the place of sender_id and receiver_id in order to represent a real message/reply between guests and property owners as shown below:

  ```Message:
  {
    "sender_id": "6bc9db94-a25a-4615-963a-b52f744e4d60",
    "receiver_id": **"22b2fbda-76a8-460c-97f9-203d296270e7"**,
    "body": "Greate!",
    "correlation_id": "b0696609-3656-43ad-9fb6-253edb334366"
  }
  ```

    ```Reply:
  {
    "sender_id": **"22b2fbda-76a8-460c-97f9-203d296270e7"**,
    "receiver_id": "6bc9db94-a25a-4615-963a-b52f744e4d60",
    "body": "Greate!",
    "correlation_id": "b0696609-3656-43ad-9fb6-253edb334366"
  }
  ```
  as you can see the sender_id and receiver_id are exchanged as sender and receiver position changes _(on reply receiver becomes sender)_.
  
  There is a unique UUID type id designed for the conversations to stick the messages to its replys and so on which is called `correlation_id` this ID will be a unique ID based on UUID which will represent the conversation and its thread like message/reply behaiviour here. Example of a conversation represented below:

  ```Conversation
  {
    "type": "Request Successful",
    "response": {
        "_id": "66984649300c3136c188d835",
        "messages": [
            {
                "message_id": "288fcaa2-bdc4-4c0e-81dc-019a24308144",
                "sender_id": "22b2fbda-76a8-460c-97f9-203d296270e7",
                "receiver_id": "6bc9db94-a25a-4615-963a-b52f744e4d60",
                "body": "Hi when is our transport arriving at the Airport?",
                "correlation_id": "b0696609-3656-43ad-9fb6-253edb334366",
                "created_at": "2024-07-17T22:31:37.297Z",
                "_id": "66984649300c3136c188d833",
                "__v": 0
            },
            {
                "message_id": "2e58e258-3dd8-4822-a2bd-a0bf7d79d0a4",
                "sender_id": "6bc9db94-a25a-4615-963a-b52f744e4d60",
                "receiver_id": "22b2fbda-76a8-460c-97f9-203d296270e7",
                "body": "it's comming at 12:25 about 2 minutes later! Sorry to keep you waiting it's a busy city. We offer a spa to proof our senciere apologies on us! Hope you enjoy it as soon as you arrive!",
                "correlation_id": "b0696609-3656-43ad-9fb6-253edb334366",
                "created_at": "2024-07-17T22:34:18.292Z",
                "_id": "669846ea300c3136c188d838",
                "__v": 0
            },
            {
                "message_id": "00551ba0-1958-4e0e-bf44-8518d6526cb1",
                "sender_id": "22b2fbda-76a8-460c-97f9-203d296270e7",
                "receiver_id": "6bc9db94-a25a-4615-963a-b52f744e4d60",
                "body": "Ah! Brelliant! No worries at all, and thanks for the kindness and the good will.",
                "correlation_id": "b0696609-3656-43ad-9fb6-253edb334366",
                "created_at": "2024-07-17T22:35:39.092Z",
                "_id": "6698473b300c3136c188d83e",
                "__v": 0
            },
            {
                "message_id": "8f69a188-7611-432a-b356-d823ad9c8c4e",
                "sender_id": "6bc9db94-a25a-4615-963a-b52f744e4d60",
                "receiver_id": "22b2fbda-76a8-460c-97f9-203d296270e7",
                "body": "Hope you'll like it! can't wait to see you guys. Sincerely Iron Resort Customer Support",
                "correlation_id": "b0696609-3656-43ad-9fb6-253edb334366",
                "created_at": "2024-07-17T22:37:30.820Z",
                "_id": "669847aa300c3136c188d845",
                "__v": 0
            }
        ],
        "conversation_id": "85d82251-7331-4a43-ba69-a1952a70c32c",
        "updated_at": "2024-07-17T22:39:38.914Z",
        "__v": 0
    }
  }
  ```

  - **Repository Architecture**: The messages and conversations are stored in a MongoDB database to utilize the document based benefit of this DB to read and write as fast as possible since we're dealing with conversations and need it to read and write as fast as possible and the conversation_id is stored in a postgres alongside with sender_id and receiver_id for just a reference of the conversations in PostgreSQL if in the future there's gonna be any relations between messages and offers, deals, reservations etc.

- **PUT /conversation/:id**: Update a specific message in a conversation.
  - **Request Body**:
    - `body`: Updated message body.
- **DELETE /conversation/:id**: Delete a conversation by its ID.


## 6. Contributing
We welcome contributions to the Booking System project. If you would like to contribute, please follow the guidelines outlined in the [CONTRIBUTING.md](/CONTRIBUTING.md) file.

## 7. License
The Booking System is released under the [MIT License](https://opensource.org/licenses/MIT). Please refer to the [LICENSE](/LICENSE) file for more details.
