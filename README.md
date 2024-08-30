# Twitter API Integration with NestJS

This project implements a backend service for a Twitter-like application using NestJS, PostgreSQL, TypeORM, and Firebase Authentication. It includes functionality for user management (signup and login), profile updates, and basic Twitter interactions (tweeting, liking tweets, retweeting).

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Node.js
- Yarn
- Firebase project with a service account JSON file

## Initial Setup

### Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/djsreeraj/nestjs-twitter-backend.git

cd nestjs-twitter-backend

````


### Firebase Configuration

- Copy your firebase JSON file to config folder in the root directory
```
./config/firebaseServiceAccountKey.json

````

- Create an **.env** file in the root with
```
POSTGRES_DB=your_database_name
POSTGRES_USER=your_database_user
POSTGRES_PASSWORD=your_database_password 
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

FIREBASE_API_KEY= your_key

````
Add FIREBASE_API_KEY and db details .


## Installation

Run the below command to install dependencies and docker container:

```bash
yarn install

docker-compose up -d
````





## Use the Twitter API App



```bash
yarn start

````
Run the above command  to start the app.

**App:** https://localhost:3000

**API Docs:**  https://localhost:3000/api-docs
