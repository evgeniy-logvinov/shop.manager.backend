# shop.manager.backend
Shop manager backend
Backend for shop manager project. 

## Table of contents

-   [Getting Started](#getting-started)
-   [Elements](#elements)
    -   [MongoDb](#mongodb)
    -   [Mongoose](#mongoose)
    -   [Keystonejs](#keystonejs)
-   [Error with node-sass](#error-with-node-sass)

## Getting started
First install shop.manager.backend

```sh
git clone https://github.com/evgeniy-logvinov/shop.manager.backend.git
npm install
```
Second run with pm2 for dev mode

```sh
pm2 start ecosystem.config.js
```

or for prod mode

```sh
pm2 start ecosystem.config.js --production
```

## Elements

### MongoDB
Uses [mongoDB](https://docs.mongodb.com/) to contains data

### Mongoose
[Mongoose](https://mongoosejs.com/) to manage data. 

### Keystonejs
[Keystone js](http://keystonejs.com/) provide Admin UI


## error with node-sass
```sh
npm i -g npm-check-updates
npm-check-updates -u
npm install
```