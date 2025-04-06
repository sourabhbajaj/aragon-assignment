# What is Sacsify?

Sacsify is a comprehensive collection of ready-to-use frontend and backend components essential for most SaaS applications. With Sacsify, you can accelerate your development process and streamline the creation of your application, freeing up valuable time and resources.

## What is Sacsify Core?

Sacsify Core is where all the configurations of different accounts are stored. All Sacsify Backend SDKs interact directly with Sacsify Core to perform various actions such as:

- Fetch configurations
- Fetch module related information
- Validates requests sent by SDKs with the account configurations
- Perform module specific actions such as Authentication of a user or checking which user is logged in

It also contains all API backends which is used by Sacsify's Backend SDK to interact with Sacsify Core system.

### Core services

- Configuration Management
- Storing information of users and accounts
- Storing payment related information

## What is Sacify's API Suite?

# Models of Sacisify

- Configurations\*
  - Application
  - Subscription
- Application
- APIKey
- Company
- Module\*
- User
- Role\*
- Permission\*

\* Specific to Sacsify users

# Things to be figured out

- Types of authentications to be offered in the first go
- Type of subscription plans which can be offered
- How to manage subscription plans and subscriptions
- What profile information can be stored and what sections to be divide it into

## Entity Definition

# User

A person who signs up either directly on Sacsify or on any application created using Sacsify Infrastructure

# Application

Every user gets an Application at the time of registration on Sacsify. Whereas, a person registering on any application created using Sacsify infrastructure will be associated with the previously created Application in a subscriber role.

**The 'Company' field in the 'Application' collection refers to the company to which the application belongs. However, application field in the company collected refers to the application (which is built on top of the infrastructure of Sacsify) on which the company is registered.**

# Company

A company is an entity attached with business accounts. In this entity, we store information related to the business which is using the services of Sacsify or application developed using Sacsify infrastructure.

**The 'Company' field in the 'Application' collection refers to the company to which the application belongs. However, application field in the company collected refers to the application (which is built on top of the infrastructure of Sacsify) on which the company is registered.**
