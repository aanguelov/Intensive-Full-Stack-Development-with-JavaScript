# Beauty Salon Website v 1.0.0
This project is a website for a Beauty salon. It provides information for different procedures and allows users to
register and to make an appointment (not implemented yet). Also allows the administrators to manage the procedures and
users. The system will be developed as a Single Page Application (SPA) using React.js and react-router as front-end,
and Node.js + hapi + json-based database as backend technologies.
## Project Configuration
At the moment the project uses json-based database, so you don`t have to do anything about configuring it.
## Running The Demo
In order to start the project install latest Node.js, navigate to the project`s folder in the console and run:
```
npm install
```
This will install the node_modules folder, where are all the dependencies for this project. Next you have to start the
server. Run this command in the console:
```
npm run services
```
This will start the project`s server which will be listening on port 9000. Next you have to start the project`s API.
Open another console and run:
```
npm start
```
The project is now live on localhost:3000
## Project Description and Main Components
Application provides following functionality:

* *Anonymous users* can browse the website and and view information about the different procedures
* *Registered users* can pick a procedure and make an appointment at the salon
* *Beauticians* can edit the procedures info and browse through their appointments
* *Administrators* can edit and delete procedures, edit and delete users and change their role

JavaScript (ECMAScript 6) client part is available in `/app` folder. It uses *Webpack* and *webpack-dev-server*
with HMR (Hot Module Replacement). Configuration is specified in webpack.config.js.

Client side application is developed as *Singe Page Application (SPA)*. The app entry point is `app.js`, which
imports *react-router* configuration specified in `beauty-salon.jsx`. The top-level application component is
`main-view.jsx` (React JSX + ES6).

Server side is implemented using *hapi.js (http://hapijs.com/)* *Node* framework and resides in `/beauty-salon-api`
folder. The Beauty Salon API is proxied by webpack-dev-server configuration to port 9000 (configurable).
Main server class is `server.js`.

Two main features are implemented both on client and server side in this version of the project:
* User management
* Procedures management

The server side implementation is all in the `server.js` file. Future versions will feature diversion of users` and
procedures` routes and handlers into separate files for better usage and performance and code usability.

Client side implementation uses React ES6 components and resides id `/app/componnents/views/users`, and
`/app/componnents/views/procedures` accordingly.





