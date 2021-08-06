# Sharp Eye

Sharp Eye is an app that allows you to detect faces in the pictures.

![screenshot](https://github.com/DK194/SharpEye/blob/master/uploads/sharpeye.png)

## Description

Sharp Eye is an app built with React, CSS and Node JS. It uses PostgreSQL database that stores the user data. Sharp Eye is connected to a special Clarifai API that allows face detection. Thanks to it, Sharp Eye can precisely detect even multiple faces in one picture.

## Usage

Sharp Eye is already deployed to Heroku, and you can check the working app [here](https://sharp-eye.herokuapp.com).

In order to test it, you can either register a new user or sign in with the following credentials:

```
Email: testuser@example.com
Password: 123456
```

However, if you want to run the app locally, you need some additional setup.

### How to start

Clone the following [repo](https://github.com/DK194/SharpEye/tree/local). You can do it by running the ```git clone``` command in your terminal:  

```
git clone -b local https://github.com/DK194/SharpEye.git
```
### Env variables

The next step is to set up the .env variables. Go to your ```backend``` directory and create an .env file. Then add the following data:

```
PORT = 3000
CLARIFAI_KEY = Enter your own Clarifai key here
DB_HOST = '127.0.0.1'
DB_USER = Enter your PostgreSQL name
DB_PASSWORD = Enter your PostgreSQL password
DB_NAME = Enter the name of your PostgreSQL database
```

Your own Clarifai key is required in order to connect with the Clarifai API. You can grab your key [here](https://www.clarifai.com).

### PostgreSQL tables

In order to make your database work, you have to create the following tables in your PostgreSQL:

```
CREATE TABLE users (
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL
);
```

```
CREATE TABLE login (
	id serial PRIMARY KEY,
	hash varchar(100) NOT NULL,
	email text UNIQUE NOT NULL
);
```

### Installing dependencies

The last step is to install the required dependencies for both ```backend``` and ```frontend```. You can do it, by going to your ```backend``` and ```frontend``` respective folders, and running the command ```npm install``` in your terminal.

```
cd backend
npm install
cd ..
cd frontend
npm install
``` 
### Running the app

Now you can finally run your copy of a Sharp Eye app locally, by first going to your ```backend``` folder and running the ```npm start``` command, and then going to your ```frontend``` folder and running the same command again in your terminal.
 
```
cd backend
npm start
cd frontend
npm start
```
## Links

Sharp Eye Repo - https://github.com/DK194/SharpEye

Sharp Eye Local Build - https://github.com/DK194/SharpEye/tree/local

Sharp Eye Live Version - https://sharp-eye.herokuapp.com

## Author

**Daniel Kurpiński**

- [GitHub Profile](https://github.com/DK194)
- Email - dnkrp94@gmail.com
