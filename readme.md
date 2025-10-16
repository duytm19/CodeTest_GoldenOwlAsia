
This is code test for  web developer intern assignment at Golden Owl Asia.


## 🚀 Getting Started



### AT BACKEND FOLDER

We need to create .env file contain environment varibles:
```sh
DATABASE_URL="postgresql://mypostgre:mypostgrepassword@localhost:5433/code_test"
NODE_ENV=development
PORT=3000
```
### 🔧 Install Dependencies of Backend
```sh
npm install
```

Then we open docker, and build docker image:
```sh
docker compose up --build
```
### Set up Database Management Tools (ex: Navicat)

We should config 
```
POSTGRES_USER: mypostgre
POSTGRES_PASSWORD: mypostgrepassword
PORT: 5433
```
### Prisma
If we want to generate prisma we should do
```
npx prisma generate
```
If we config schema.prisma, we should do
```
npx prisma migrate dev --name 'name_migration'
```
### 🏃 Run Development Mode

```sh
npm run dev
```
### AT FRONTEND 
We need to create .env file contain environment varibles:
```sh
PORT=8080
REACT_APP_API_URL=http://localhost:3000/api
```
### 🔧 Install Dependencies of Frontend
```sh
npm install
```