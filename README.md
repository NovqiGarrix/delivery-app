

# A Backend Server based on RESTfull API using Node.js and Typescript

## Getting Started

### # ENV Variables
1. Create a .env file <br>
Create a .env file in the root directory. See .env.example for variables naming!

2. Generate Public and Private keys <br />
``Public and private key are used to generate JWT Tokens more securely``.
You can easily generate them in here <br />
```https://app.id123.io/free-tools/key-generator/```. <br />
<br>
After that, update .env file's variables values, based on .env.example variables naming!

3. Getting MongoDb URL Connection <br>
If you are using MongoDb in you local computer, the regular url connection is ``mongodb://127.0.0.1:27017/database_name``. You can change ```database_name``` with your project name, for example ``delivery-app``, so the url connection will be ```mongodb://127.0.0.1:27017/delivery-app```. <br />
<br />
But, if you are using MongoDb with Atlas, you can get the url connection from your Atlas dashboard.

### # Install all the dependencies
Open up your terminal, and type <br >

```yarn```, if you are using yarn 
<br />
```npm install```, if you are using npm.

```Easy peazy lemon squeezy!```

### # Run the Server
Open up your terminal, and type <br >

```yarn dev```, if you are using yarn 
<br />
```npm run dev```, if you are using npm.

### # Build the Server
Open up your terminal, and type <br >

```yarn build```, if you are using yarn 
<br />
```npm run build```, if you are using npm.
<br>

## That's it.
If you have any doubts or errors, please post it in issues!. I'd love to read and solve it!.

Thanks, ``Novrii``