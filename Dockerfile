# Chooses an image to use as base for this container
FROM node:latest

# Create a directory to hold the application code inside the image, this will be the working directory for the application
WORKDIR /ldasilva/documents/emteam-board-game-app/backend

COPY . /ldasilva/documents/emteam-board-game-app/backend

RUN npm install

EXPOSE 5000

CMD npm start



