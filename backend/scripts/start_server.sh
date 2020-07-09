#!/bin/bash
echo "Starting Backend Server on Port 5000"
pm2 start /home/centos/restaurant-management/backend/src/app.js --name restaurant-backend