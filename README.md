# A Backend Server based on RESTfull API using Node.js and Typescript

## Getting Started
### # ENV Variables
1. Create a .env file <br>
Create a .env file in the root directory. See .env.example for variables naming!

2. Generate Public and Private keys <br />
``Public and private key are used to generate JWT Tokens more securely``.
You can easily generate them in here <br />
```https://app.id123.io/free-tools/key-generator/```. <br />
<br />
or
<br>
<br>
Open up your terminal and type this: <br />
```openssl genrsa -des3 -out private.pem 2048 && openssl rsa -in private.pem -outform PEM -out public.pem```

3. Getting MongoDb URL Connection <br>
If you are using MongoDb in you local computer, the regular url connection is ``mongodb://127.0.0.1:27017/database_name``. You can change ```database_name``` with your project name, for example ``tiktok-server``, so the url connection will be ```mongodb://127.0.0.1:27017/tiktok-server```. <br />
<br />
But, if you are using MongoDb with Atlas, you can get the url connection from your Atlas account.
Check out this tutorial to do so: https://medium.com/@sergio13prez/connecting-to-mongodb-atlas-d1381f184369

### # Install All The Dependencies
Open up your terminal, and type <br >

```yarn```, if you are using yarn
<br />
<br />
```npm install```, if you are using npm.

## # Run the Server
Open up your terminal, and type <br >

```yarn dev```, if you are using yarn 
<br />
```npm run dev```, if you are using npm.

## # Build the Server
Open up your terminal, and type <br >

```yarn build```, if you are using yarn 
<br />
```npm run build```, if you are using npm.
<br>

## # That's it.
If you have any doubts or errors, please post it in issues!. I'd love to read and solve it!.

Thanks, ``Novrii``