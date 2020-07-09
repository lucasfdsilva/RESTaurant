#!/bin/bash
echo "Stoping Backend Server"
pm2 stop 'restaurant-backend'
sudo rm -r /home/centos/restaurant-management
