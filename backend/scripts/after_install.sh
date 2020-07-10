#!/bin/bash
echo "Installing NPM Dependencies"
sudo npm install --prefix /home/ec2-user/restaurant-management/backend/
sudo npm install --prefix /home/ec2-user/restaurant-management/web/
sudo npm run build --prefix /home/ec2-user/restaurant-management/web/
