[![Build Status](https://travis-ci.org/PascalUlor/Maintenance-Tracker-App.svg?branch=develop)](https://travis-ci.org/PascalUlor/Maintenance-Tracker-App) [![Maintainability](https://api.codeclimate.com/v1/badges/5392bd5f66f2c0e1ede5/maintainability)](https://codeclimate.com/github/PascalUlor/Maintenance-Tracker-App/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5392bd5f66f2c0e1ede5/test_coverage)](https://codeclimate.com/github/PascalUlor/Maintenance-Tracker-App/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/PascalUlor/Maintenance-Tracker-App/badge.svg?branch=develop)](https://coveralls.io/github/PascalUlor/Maintenance-Tracker-App?branch=develop)


# Maintenance-Tracker-App

**Maintenance-Tracker-App** is a fullstack javascript web application that provides users with the ability to reachout to the operations or repairs department regarding repair or maintenance requests and monitor the status of their request.

<br />
<br />
<img width="1440" alt="Maintenance-Tracker-App-screenshot" src="/screenshot/homepage.jpg">
<br />


# Table Of Content
1. [Getting Started](#getting-started "Getting Started")
   ..*[prerequisites](#prerequisites "Prerequisites")
   ..*[Installation](#installation "Installation")
2. [Technology Stack](#technology-stack)
   ..* [Dependencies](#dependencies)
2. [Features](#features "Features")
3. [Built With](#built-with "Built With")
4. [Deployment](#deployment "Deployment")
5. [Useful Links](#author "Useful Links")
6. [Acknowledgment](#acknowledgment "Acknowledgment")


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the application on the web (Heroku).

### Prerequisites

To get started with this project you need a basic knowledge of :

```
Javascript (ES6)
NodeJs
SQL (Postgres)
Version Control (Git)
```

### Installation
The follwing instructions will install the project on your local machine

```
1. Install [**Node JS**](https://nodejs.org/en/).
2. Install [**Postgres**](https://www.postgresql.org/) .
3. Clone the [**repository here**](https://github.com/PascalUlor/Maintenance-Tracker-App.git)
4. [**cd**] into the root directory of the project.
5. Run `npm install` on the terminal to install Dependecies and Dev-Dependecies
```

## Technology Stack
**UI & Templates**
1. HTML & CSS
2. Javascript

**Server Side**
1. NodeJS
2. Express

**Client Side**
1. Javascript

### Dependencies
* Postgres
* Node


## Features
The user interface is built for easy navigation and use of the application. It includes the following:

1. The users should be able to make maintenance or repairs request.
3. Users can create an account and log in.
2. The users should be able to make maintenance or repairs request.
4. The admin should be able to view all maintenance/repairs requests on the application
5. The user can view all his/her requests

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- Admin User will br pre-seeded into the application with administrative priviledges


## Deployment
This Application will be deployed on Heroku (https://maintenance-software.herokuapp.com)


## Useful Links

1. [Heroku](https://maintenance-software.herokuapp.com)
2. [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2171599)
3. [Gh-Pages](https://pascalulor.github.io/Maintenance-Tracker-App/UI/index.html)
4. [Github Repo](https://github.com/PascalUlor/Maintenance-Tracker-App)
5. [API-DOCUMENTATION](https://maintenance-software.herokuapp.com/api-docs)


## Acknowledgment
- Andela
- Benny Ogidan
- Kelechi Iheanyichukwu
