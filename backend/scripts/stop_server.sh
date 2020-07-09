#!/bin/bash
echo "Stopping Backend Server"
pm2 stop
sudo rm -r -f /home/centos/restaurant-management/