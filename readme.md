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
### Start the next.js server 
```bash
npm run dev  # in the project directory
```

### Open the site to make sure that server is running
[here](http://localhost:3000)

### To see the list of records go to the following: 
[here](http://localhost:3000/prisma)

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

### Database Migrations
change the schema.prisma file and then run the following command to update the database version control
```bash
npx prisma migrate dev --name name_here # in the project directory
```

### To install prisma (so that you can run without npx)
allows you to run prisma commands without npx (so like `prisma migrate dev --name name_here` instead of `npx prisma migrate dev --name name_here`)
```bash
npm install prisma -g
```

### To view the database
a nice GUI to view the database and debug things
```bash
npx prisma studio # in the project directory
```

### To generate the prisma client (if you change the schema and need to update the client)
this is needed to run the prisma client (which is used to interact with the database)
```bash
npx prisma generate # in the project directory
```

### To push the database schema to the database
this is needed to run the prisma client (which is used to interact with the database)
```bash
npx prisma db push # in the project directory
```
