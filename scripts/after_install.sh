#!/bin/bash
echo "Installing NPM Dependencies"
sudo npm install /home/ec2-user/restaurant-management/backend/
sudo npm install /home/ec2-user/restaurant-management/web/
cd /home/ec2-user/restaurant-management/web/
sudo npm run build
