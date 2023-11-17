# IS 373
Authentication module for IS 373 group project. 
![badge](https://img.shields.io/github/contributors/vishal092002/nodejs_project)
![badge](https://img.shields.io/github/commit-activity/t/vishal092002/nodejs_project)
## Running the project
1. Clone the repository
2. Run watchtower by doing `docker-compose up` in the watchtower directory (this will keep the containers up to date)
```bash
# from the root directory
cd watchtower
docker-compose up -d
```

3. run the prod version of the project by doing `docker-compose up` in the prod_container directory

this will run the project on port 8080
```bash
# from the root directory
cd prod_container
docker-compose up
```
4. run the project 
```bash
# from the root directory
cd project
npm install # if you haven't already
npm run dev # run the dev server
```


### To install prisma cli globally (so that you can run without npx)
allows you to run prisma commands without npx (so like `prisma migrate dev --name name_here` instead of `npx prisma migrate dev --name name_here`)
```bash
npm install -g prisma
```


### Database Migrations
change the schema.prisma file and then run the following command to update the database version control
```bash
npx prisma migrate dev --name name_here # in the project directory
```

### Start the next.js server 
```bash
npm run dev  # in the project directory
```

### Open the site to make sure that server is running
http://localhost:3000

### To see the list of records go to the following: 
http://localhost:3000/prisma


### To generate the prisma client (if you change the schema and need to update the client)
this is needed to run the prisma client (which is used to interact with the database) - Run after changing the schema.prisma file
```bash
npx prisma generate # in the project directory
```



### Add fake data (seeding the database)
run the following command to seed the database with fake data
```bash
npx prisma db seed  # in the project directory
```


### Run the tests for the databases API
run the following command to run the playwright tests
```bash
npm run test # in the project directory
```



### To view the database
a nice GUI to view the database and debug things
```bash
npx prisma studio # in the project directory
```



### Using the @auth0/nextjs-auth0 library to handle authentication in a Next.js API route
Inside project/src/app/api, create new route.js file with folder for authentication and add:
```bash
import { handleAuth } from ‘@auth0/nextjs-auth0’; /* imports the handleAuth function from the @auth0/nextjs-auth0 library */

export const GET = handleAuth(); /* applies the handleAuth middleware to the GET request of API route to take care of authentication-related tasks */
```



### Making a route with a post controller method to insert records and making a test to send the data to the route (pets example)
Create a new file for your API route in project/src/app/api folder, such as project/src/app/api/route.js - Inside the new API route, import the Prisma Client and the NextResponse with:
```bash
let prisma = require(“@/lib/prismaClient”);

import { NextResponse } from "next/server";
```



### Get prisma client to fetch the list of pets from the database and returns a response
Inside the new API route, add:
```bash
export async function GET(request) /* To handle HTTP GET requests to the API route */

const pets = await prisma.pets.findMany(); /* Uses prisma client to query the database and retrieve a list of pets  */ 

return NextResponse.json(pets); /* Creates a JSON response with the list of pets */
```



### To handle HTTP POST requests and create a new pet in the database
Inside the new API route, add:
```bash
export async function POST(request) {
  try {         

/* Parses the JSON data from the request body
    const json = await request.json(); */

const pets = await prisma.pets.create({
      data: json,
    });

// Creates a new pet in the database using Prisma


  } catch (error) {

    // Handles any errors that occur during the process
    
  }
}
```



### To finalize the post function by constructing and returning a appropriate response
```bash
return new NextResponse(JSON.stringify(pets), { status: 201, headers: { "Content-Type": "application/json" } });

/* Creates a response with a status of 201 and sets the Content-Type header to application/json */


 } catch (error) {

    // Handles any errors that occur during the process


return new NextResponse(error.message, { status: 500 });

/* Creates a response with a status of 500 and includes the error message in the response body */
```



