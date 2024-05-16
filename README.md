# Pokedex

Welcome to the Pokedex project! This repository contains a frontend application built with Angular and Jest, and a backend application built with NestJS. The entire project is containerized using Docker Compose.

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started) (for Docker option)
- [Docker Compose](https://docs.docker.com/compose/install/) (for Docker option)
- [Node.js and npm](https://nodejs.org/) (for manual setup option)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Option 1: Using Docker Compose

#### Step 1: Clone the Repository

Clone this repository to your local machine using the following command:

```sh
git clone https://github.com/your-username/pokedex.git
cd pokedex
docker-compose up -d --build
````
It will execute in the localhost port 80

### Option 2: Manual Setup without Docker

#### Step 1: Clone the Repository
Clone this repository to your local machine using the following command:

```sh
git clone https://github.com/your-username/pokedex.git
cd pokedex
docker-compose up -d --build
````

#### Step 2: Setup the backend
Navigate to the backend application directory and install the dependencies:
```sh
cd pokeapi-bff
npm install
````
Start the backend server:
```sh
npm start
````

#### Step 3: Setup the frontend
Navigate to the frontend application directory and install the dependencies:
```sh
cd angular-jest
npm install
````
Start the frontend application:
```sh
npm start
````

Open the web browser and navigate to:
```sh
http://localhost:4200
```
