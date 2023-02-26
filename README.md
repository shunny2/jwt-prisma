<p align="center">
  <a href="#about-application">About Application</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-run">How to Run</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#routes">Routes</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#project-status">Project Status</a>
</p>

</br>

<p align="center">
<a href="https://img.shields.io/github/stars/shunny2/jwt-prisma?style=social"><img src="https://img.shields.io/github/stars/shunny2/jwt-prisma?style=social" alt="Repo Stars"/></a>
<a href="https://img.shields.io/github/forks/shunny2/jwt-prisma?style=social"><img src="https://img.shields.io/github/forks/shunny2/jwt-prisma?style=social" alt="Repo Forks"/></a>
<a href="https://img.shields.io/github/license/shunny2/jwt-prisma"><img src="https://img.shields.io/github/license/shunny2/jwt-prisma" alt="License"/></a>
</p>

## About Application

An application made with [Nodejs](https://nodejs.org/en/), [Express](https://expressjs.com/), and [Prisma](https://www.prisma.io/) to perform a [JSON Web Token](https://jwt.io/introduction#:~:text=JSON%20Web%20Token%20(JWT)%20is,because%20it%20is%20digitally%20signed.) authentication flow.

API Documentation is available at: [/api/v1/docs](http://localhost:3333/api/v1/docs)

## Technologies

<table>
  <thead>
  </thead>
  <tbody>
    <td>
      <a href="https://nodejs.org/en/" title="NodeJS"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg" alt="Node.js logo image." /></a>
    </td>
    <td>
      <a href="https://expressjs.com/" title="Express"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/express-109.svg" alt="Express javascript logo image." /></a>
    </td>
    <td>
      <a href="https://www.prisma.io/" title="Prisma ORM"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" alt="Prisma ORM logo image." /></a>
    </td>
    <td>
      <a href="https://joi.dev/" title="JOI Validation"><img width="128" height="128" src="https://joi.dev/img/joiLogo.jpg" alt="Joi logo image." /></a>
    </td>
    <td>
      <a href="https://swagger.io/" title="Swagger Documentation"><img width="128" height="128" src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" alt="Swagger logo image." /></a>
    </td>
  </tbody>
</table>

## How to Run

First, start by cloning the repository:
```shell
git clone https://github.com/shunny2/jwt-prisma
```

Open each of the folders and run the command below to install the project's dependencies.
```bash
npm install
```

Run the command to start the server:
```bash
npm run dev
```

To see the database tables and data, run the command:
```bash
npx prisma studio
```

## Routes

The image below describes the routes available by the application.

![jwt-routes](https://user-images.githubusercontent.com/72872854/215277003-bef13fe9-5390-4ccf-a56b-447ee74d02a1.png)

## Project Status

> Status: Completed.

<hr/>

<p align="center">Created by <a href="https://github.com/shunny2"><b>Alexander Davis</b></a>.</p>
