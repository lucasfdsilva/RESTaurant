#!/bin/bash
echo "Stopping Backend Server"
pm2 stop
sudo rm -r /home/centos/restaurant-management
