## Clone/Download repo

git clone https://github.com/IrayOblivion/MERN_Project.git

or

 wget https://github.com/IrayOblivion/MERN_Project/archive/master.zip
 unzip master.zip

## Creating connection to db

username@host:/home/user/MERN_Project-master$ cd backend
username@host:/home/user/MERN_Project-master/backend$ touch ormconfig.json

example:
{
   "type": "postgres",
   "host": "database host",
   "port": 5432,
   "username": "database name",
   "password": "database pass",
   "database": "database ",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

## Creating file with variable for security

username@host:/home/user/MERN_Project-master/backend$ touch .env

TOKEN_KEY=secret_token
ADMIN_KEY=secret_admin_token 

## Installing required packages
# Install node package manager
sudo apt-get install npm

# Backend
username@host:/home/user/MERN_Project-master/backend$ npm install

# Frontend
username@host:/home/user/MERN_Project-master/frontend$ npm install

## Running

# Backend
username@host:/home/user/MERN_Project-master/backend$ npm run start

# Frontend
username@host:/home/user/MERN_Project-master/frontend$ npm run start

Wait for the server to start, then go to your browser and enter the address http://localhost:3000/

## If Gitary page nothing shows then
username@host:/home/user/MERN_Project-master/backend$ npm run fill 

If problem occurs, contact: piotr.lach@pollub.edu.pl
Pls, remember that project isn't ended and have bugs