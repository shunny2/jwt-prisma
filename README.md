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
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

</br>

<p align="center"><a href="https://nodejs.org/" target="_blank" title="NodeJS"><img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" width="125"></a></p>

<p align="center">
<a href="https://img.shields.io/github/stars/shunny2/jwt-prisma?style=social"><img src="https://img.shields.io/github/stars/shunny2/jwt-prisma?style=social" alt="Repo Stars"/></a>
<a href="https://img.shields.io/github/forks/shunny2/jwt-prisma?style=social"><img src="https://img.shields.io/github/forks/shunny2/jwt-prisma?style=social" alt="Repo Forks"/></a>
<a href="https://img.shields.io/github/license/shunny2/jwt-prisma?style=social"><img src="https://img.shields.io/github/license/shunny2/jwt-prisma?style=social" alt="License"/></a>
</p>

## About Application

<b>JWT Prisma</b> is an application designed to streamline the user authentication process. While initially created for didactic purposes, its robust features make it highly suitable for small and medium-sized projects. The chosen architecture for the project is the [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) (Model-View-Controller) pattern, as it enables us to organize our project efficiently and in a scalable manner.

The application was developed using a carefully curated set of technologies. Notably, [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) provide an agile and versatile environment for development. Integration with [Prisma](https://www.prisma.io/) offers precise and simplified database access control, while [SQLite](https://www.sqlite.org/index.html) ensures reliable data storage.

Furthermore, the implementation of [Swagger](https://swagger.io/) provides clear and automated API documentation, enhancing understanding and collaboration among teams. For security, using [JSON Web Token](https://jwt.io/introduction#:~:text=JSON%20Web%20Token%20(JWT)%20is,because%20it%20is%20digitally%20signed.) (JWT) offers a reliable method for authentication and authorization, bolstering the protection of the application's resources.

In summary, <b>JWT Prisma</b> combines a thoughtfully chosen array of technologies with a well-defined MVC architecture, resulting in an application that offers effective authentication and is primed to evolve efficiently and support growing demands.

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

![jwt-prisma-routes](https://github.com/shunny2/jwt-prisma/assets/72872854/e2a8b6da-6201-49c4-9fb8-86ca0a19ad94)

API Documentation is available at [/api/v1/docs](http://localhost:3333/api/v1/docs)

## Project Status

> Status: Completed.

## License

This project is under an [MIT](https://opensource.org/licenses/MIT) license.

<hr/>

<p align="center">Created by <a href="https://github.com/shunny2"><b>Alexander Davis</b></a>.</p>
