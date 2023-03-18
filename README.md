# NoSQL Challenge: Social Network API

## Description

This project is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The project is built using Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Installation

To use this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running the following command:

```
npm install
```

3. Ensure that you have MongoDB installed and running on your machine.

## Usage

**Starting the server**

To start the server, run the following command:

```
npm start
```

The server will start and the Mongoose models will be synced to the MongoDB database.

## Routes

The following routes are available:

**/api/users**

* **GET /api/users** - Get all users
* **GET /api/users/:id** - Get a single user by ID
* **POST /api/users** - Create a new user
* **PUT /api/users/:id** - Update a user by ID
* **DELETE /api/users/:id** - Delete a user by ID

**/api/users/:userId/friends/:friendId**

* **POST /api/users/:userId/friends/:friendId** - Add a friend to a user's friend list
* **DELETE /api/users/:userId/friends/:friendId** - Remove a friend from a user's friend list

**/api/thoughts**

* **GET /api/thoughts** - Get all thoughts
* **GET /api/thoughts/:id** - Get a single thought by ID
* **POST /api/thoughts** - Create a new thought
* **PUT /api/thoughts/:id** - Update a thought by ID
* **DELETE /api/thoughts/:id** - Delete a thought by ID

**/api/thoughts/:thoughtId/reactions**

* **POST /api/thoughts/:thoughtId/reactions** - Add a reaction to a thought
* **DELETE /api/thoughts/:thoughtId/reactions/:reactionId** - Remove a reaction from a thought

## Walkthrough Video

A walkthrough video that demonstrates the functionality of the API can be found at [here](https://drive.google.com/file/d/1cobPDo6Vl5SooWmHFkaaZmpYQu24tlEj/view?usp=sharing ).

## Credits

This project was created by [Monica](https://github.com/monicapong)
