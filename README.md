# RESTaurant - Management System
This is an application built to be used as a platform to demonstrate to customers how AWS services can be used in modern applications.

## How it works
The application is composed of a NodeJS/Express REST backend which serves the ReactJS frontend via HTTP calls. 
The website front-end has two main components. The customer area, where customers can see the Menu, create account, login and Book Slots for attending the Pub/Restaurant.
There's also an admin panel where the restaurant administration can manage bookings, users, menu items and slots available.

## How to Install
    #general
    sudo yum -y update
    sudo yum -y install epel-release 
    sudo yum -y install git vim-enhanced ruby wget

    #Installing the CodeDeploy agent on EC2
    cd /home/ec2-user/
    wget https://aws-codedeploy-eu-west-1.s3.eu-west-1.amazonaws.com/latest/install
    sudo chmod +x ./install
    sudo ./install auto
    sudo service codedeploy-agent status

    #nodejs
    curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
    sudo yum install -y nodejs

    #restaurant-management
    cd /home/ec2-user/
    sudo git clone https://github.com/lucasfdsilva/restaurant-management.git
    cd /home/ec2-user/restaurant-management/backend
    sudo npm install

    #DB migrations
    cd /home/ec2-user/restaurant-management/backend
    sudo npx knex migrate:latest

    #pm2
    sudo npm install -g pm2@latest
    sudo pm2 start /home/ec2-user/restaurant-management/backend/src/app.js --name restaurant-backend

    #web-deployment
    cd /home/ec2-user/restaurant-management/web
    sudo npm install -g serve
    sudo npm install
    sudo npm run build
    sudo pm2 start /home/ec2-user/restaurant-management/web/app.config.json
    sudo pm2 startup
    sudo pm2 save

## Functionality Requirements Development
- [x]  Customer
    - [x]  General
        - [x]  Visit Home Page
        - [x]  Navigation Menu (Not logged in customer)
        - [x]  Navigation Menu (Logged in customer)
        - [x]  View Restaurant Menu
    - [x]  Session
        - [x]  Can Register (Create an account)
        - [x]  Can Login
        - [x]  Can logout
        - [x]  View Profile
        - [x]  Edit Profile
        - [x]  Delete Account
        - [ ]  Can Reset Password
        - [x]  Can Verify Email address
    - [x]  Bookings
        - [x]  View Previous Bookings
        - [x]  Check Slots Availability
        - [x]  Book Slot for visiting the restaurant
        - [ ]  User Receives Confirmation Email after placing booking
- [x]  Restaurant Management
    - [x]  Separate Login Middleware to verify Admin Status
    - [x]  Manage Menu Items
    - [x]  Manage Time Slots
    - [x]  Manage Customers Accounts
    - [x]  Manage Staff Accounts
    - [x]  Manage Existing Bookings
    - [ ]  Receives Email Notification for new Bookings
    - [ ]  General Site Configuration Management

## CI/CD Pipeline Configuration Tasks
- [x]  Configure a Launch Template to be used by the EC2 Auto Scaling Group
    - [x]  Name: RESTaurant-AWS-Linux
    - [x]  AMI: Amazon Linux 2
    - [x]  Instance Type: t2.micro
    - [x]  Networking Platform: EC2-Classic
    - [x]  Instance Profile: RESTaurantDevInstances
    - [x]  User Data
        - [x]  Install Updates
        - [x]  Install CodeDeploy Agent
        - [x]  Install NodeJS
        - [x]  Install PM2
        - [x]  Install Serve
        - [x]  Install Git, VIM, Epel, Ruby and Wget
        - [x]  Clone RESTaurant-management Repo from Lucas' GitHub
        - [x]  Build React App
        - [x]  Run backend using PM2
        - [x]  Run Serve on Frontend using PM2
- [x]  Configure Load Balancer
    - [x]  Name: RESTaurant-ClassicLB
- [x]  Configure Auto Scaling Group
    - [x]  Name: RESTaurant
    - [x]  Template: RESTaurant-AWS-Linux
    - [x]  Networking: Default VPC - 3 default subnets included
    - [x]  Scaling Policy: CPU > 80%
    - [x]  New Instance Warm up time: 300 seconds
- [x]  Configure CodeDeploy
    - [x]  CodeDeploy Agent Installation included as part of Launch Template
    - [x]  Configure CodeDeploy Deployment Group to EC2 Instances = Tag Name = RESTaurant-dev
- [x]  Configure CodePipeline
    - [x]  Create CodePipeline Application
    - [x]  Connect CP App with GitHub Repo (Master only so far)
    - [x]  Have CodePipeline to deploy to Code Deploy deployment group

## To-do
- [x]  Build Queue System for sending out User Email Verification upon Registration
- [ ]  Display user details on the Bookings section of admin panel
- [ ]  Demonstrate the other deployment types (Blue-Green, Rolling)
- [ ]  Demonstrate Rollback process (Database Migration Executed, but deployment failed??)
- [ ]  Take Database Snapshots
- [ ]  Implement a few tests
- [ ]  Build separate environments (Dev, Test, Q&A, Prod) and the promote process between these stages