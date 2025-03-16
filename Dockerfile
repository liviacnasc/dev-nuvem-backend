FROM node:20

# Set the working directory in the container
WORKDIR /src

# Copy the application files into the working directory
COPY . /src

# Install the application dependencies
RUN npm install

EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]
