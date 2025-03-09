FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /src

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]