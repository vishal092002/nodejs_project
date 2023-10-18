FROM node:lts 
# Using the LTS version of node for stability
WORKDIR /app
# setting the working directory to /app
COPY package*.json ./ 
# Copying the package.json file to the root of the container
RUN npm install
# Installing the dependencies from the package.json file
COPY . .
# Copying the rest of the files to the root of the container
EXPOSE 3000
# Exposing port 3000
ENTRYPOINT [ "npm", "run" ]
# Setting the entrypoint to npm run
CMD ["dev" ]
# Running the start script in the package.json file by default, but can be overwritten by passing a command to the docker run command
