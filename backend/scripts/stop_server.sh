#!/bin/bash
echo "Stopping Backend Server"
pm2 stop

file="/home/centos/restaurant-management"
if [ -f $file ] ; then
    sudo rm -r $file
