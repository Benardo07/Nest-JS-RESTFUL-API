# Project Overview

This project is a simple RESTful API built using the NestJS framework with TypeScript. It is designed to provide a clear and structured approach to developing scalable and maintainable backend services. The API consists of three main modules: `Users`, `Items`, and `Auth`, each encapsulating its own set of functionalities and responsibilities.

## Project Structure and Pattern

The architecture of this project follows a well-defined pattern that separates concerns and promotes reusability and testability. The pattern can be described as follows:

### Validation

Input validation is the first step in processing a request. It ensures that the data received from clients is valid and meets the expected format and constraints. This is achieved using Data Transfer Objects (DTOs) and validation pipes provided by NestJS, which automatically validate incoming data against predefined schemas.

### Controller

The controller layer is responsible for handling incoming HTTP requests and delegating them to the appropriate service methods. Controllers define endpoints and route handlers, which are the entry points for client requests. They are kept lean and focused on request handling, leaving the business logic to the service layer.

### Service

The service layer contains the core business logic of the application. Services are responsible for performing operations such as data processing, business rule validation, and interaction with the repository layer. They encapsulate the application's use cases and provide a clear interface for the controllers.

### Repository

The repository layer abstracts the interaction with the data source (e.g., a database). It provides a collection of methods for accessing and manipulating data, hiding the details of the data storage and retrieval mechanisms. This layer is essential for achieving persistence agnosticism and simplifying data access throughout the application.

## Modules

### Users Module

Manages user-related operations such as registration, profile updates, and user data retrieval. It ensures that user information is handled securely and efficiently.

### Items Module

Handles operations related to items, such as creating, updating, and fetching items. It provides the necessary endpoints for clients to interact with item data.

### Auth Module

Responsible for authentication and authorization functionalities. It implements mechanisms for user login, JWT token generation and validation, and access control to protect endpoints based on user roles or permissions.

## Conclusion

This project exemplifies a structured approach to building a RESTful API with NestJS and TypeScript. By adhering to the validation-controller-service-repository pattern, it achieves a clear separation of concerns, making the codebase more organized, modular, and easier to maintain and test. The modular

## How to Use
Clone the repository 
```bash
$ git clone https://github.com/Benardo07/Nest-JS-RESTFUL-API.git
```

then, go to the root directory
```bash
$ cd Nest-JS-RESTFUL-API
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Benardo]
- Email - [benardo188@gmail.com]

