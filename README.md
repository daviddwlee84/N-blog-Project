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
* [`express-formidable`](https://www.npmjs.com/package/express-formidable) - Handling form (including document upload)
* `marked` - Analysis markdown
* `moment` - Time format
* [`mongolass`](https://github.com/mongolass/mongolass) - Mongodb driver ([author article](https://zhuanlan.zhihu.com/p/24308524))
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

### ./config - Configuration files

* config.json - Setting port, session, mongodb

### ./lib

* mongo.js - MongoDB setting
  * User Model
  * Article Model
  * Comment Model

### ./middlewares - Custom middlewares

* check.js - Check user log in status

### ./models - Database operating files

* users.js
* posts.js
* comments.js

### ./public - Static files (e.g. CSS, images)

#### ./public/css - Cascading style sheets

* style.css
* 404.css

### ./public/js - Front-end JS code

* 404.js

### ./routes - Routing files

* index.js
* posts.js
* comments.js
* signin.js
* signup.js
* signout.js

### ./strings - String files

* signup.json
* signout.json
* signin.json
* posts.json (create, edit, delete share string in post)
* comments.json

### ./views - Template files

* header.ejs
* footer.ejs

* signup.ejs
* posts.ejs - Main page / User page (Seperate by author in URL)
* post.ejs - Specific article page
* signin.ejs
* create.ejs - Create new post
* edit.ejs

* 404.ejs

#### ./views/components - Reusable template fragments

* nav.ejs
* nav-setting.ejs
* notification.ejs
* post-content.ejs
* comments.ejs

## Function and Router Design
**#TODO: Follow RESTful API Style**

1. Sign up
	* Sign up page: `GET /signup`
	* Sign up (upload profile) : `POST /signup`

2. Sign in
	* Sign in page: `GET /signin`
	* Sign in: `POST /signin`

3. Sign out
	* Sign out: `GET /signout`

4. View Article
	* Main page: `GET /posts`
	* Personal Profile: `GET /posts?author=xxx`
	* View article (include comments): `GET /posts/:postId`

5. Post Article
	* Post article page: `GET /posts/create`
	* Post article: `POST /posts/create`
	
6. Edit Article
	* Edit article page: `GET /posts/:postId/edit`
	* Edit article: `POST /posts/:postId/edit`

7. Delete Article
	* Delete article: `GET /posts/:postId/remove`

8. Comment
	* Create comment: `POST /comments`
	* Delete comment: `GET /comments/:commentId/remove`

## Tools

### Front-End Design

* [jQuery](https://jquery.com) - Simplify the client-side scripting of HTML
* [Semantic UI](https://semantic-ui.com) - UI component framework

### Testing

* `supervisor` - Monitoring and running node.js
* `jest` - Unit testing
* [`supertest`](https://www.npmjs.com/package/supertest) - Work with jest

### Development

* [ESLint](https://eslint.org) - Linting utility for JS
	* Pupular style guide
		* [Google](https://google.github.io/styleguide/javascriptguide.xml)
		* [Airbnb](https://github.com/airbnb/javascript)
		* [Standard](https://standardjs.com/rules-zhtw.html) <- Using this recently

* [EditorConfig](http://editorconfig.org) - Maintain consistent coding style

## TODO

- [ ] Finish all unit test
- [ ] Connect to CI server (Add embedding status image)
- [ ] Build Docker
- [ ] Setup CD and deploy on a cloud server

## Author

* David Lee

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Tom Chang](https://github.com/trylovetom)
* [N-blog](https://github.com/nswbmw/N-blog)
* [404 Page Template](https://codepen.io/Ahmed_B_Hameed/pen/LkqNmp)
