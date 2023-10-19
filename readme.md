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
