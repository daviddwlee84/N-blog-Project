# N-blog Project

## Topics

* [Github Flow](https://guides.github.com/introduction/flow/)
* Unit Testing
* CI (Contunuous Integration)
* CD (Continuous Delivery & Continuous Deployment)

## Built With

### Development Tools

* [CircleCI](https://circleci.com) - Continuous Integration
* [AWS](https://aws.amazon.com) - Web server
* [Docker](https://www.docker.com) - Clean and Same development environment
* [Jest](https://facebook.github.io/jest/) - Unit testing

### Web Application

* [Node.js](https://nodejs.org/en/) - JavaScript run-time environment
* [MongoDB](https://www.mongodb.com) - NoSQL Database
* [Express](https://github.com/expressjs/express/) - Web application framework

#### Other Node Packages (Dependencies)

* `express-session` - Session middleware
* `connect-mongo` - Store session in mongodb (work with express-session)
* `connect-flash` - Page information middleware. Based on session
* `ejs` - Template Engine
* `express-formidable` - Middleware of receiving form and document upload
* `config-lite` - Read configure files
* `marked` - Analysis markdown
* `moment` - Time format
* `mongolass` - Mongodb driver
* `objectid-to-timestamp` - Generate time stamp based on ObjectId
* `sha1` - sha1 encoding for password encoding
* `winston` - log
* `express-winston` - Middleware of log

## File Structure - MVC Design Pattern

### Main Directory

* index.js - Main file
* package.json
* README.md
* LICENSE

### ./models - Database operating files

### ./public - Static files (e.g. CSS, images)

### ./routes - Routing files

### ./views - Template files

## Tools

### Testing

* `supervisor` - Monitoring and running node.js

### Development

* [ESLint](https://eslint.org) - Linting utility for JS
* [EditorConfig](http://editorconfig.org) - Maintain consistent coding style

## Author

* David Lee

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Tom Chang](https://github.com/trylovetom)
* [N-blog](https://github.com/nswbmw/N-blog)
