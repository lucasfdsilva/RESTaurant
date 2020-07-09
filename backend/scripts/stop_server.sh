#!/bin/bash
echo "Stoping Backend Server"
pm2 stop 'restaurant-backend'
rm -r /home/centos/restaurant-management