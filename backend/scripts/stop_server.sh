#!/bin/bash
echo "Stopping Backend Server"
pm2 stop
sudo rm -rf /home/centos/restaurant-management
