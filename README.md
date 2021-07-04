# Git Tracker
[![CodeFactor](https://www.codefactor.io/repository/github/abdelhajou/git-tracker/badge?s=c2fab56035afe9d10f74187f6174e607cb49216c)](https://www.codefactor.io/repository/github/abdelhajou/git-tracker)

Git Tracker is a web application where you can search GitHub users and get an overview of projects they contribute to, programming languages they use and more. This is mostly a hobby project, but the aim is to provide recruiters with an easy way to find developers that fit their needs. 

Git Tracker is build on the MERN stack. The front-end is built using ReactJS. All user information is retrieved from the [public GitHub API](https://docs.github.com/en/rest), and it uses an ExpressJS back-end to store tracking information (like profile views) in a MongoDB database.

## Requirements
* NodeJS 14.x
* MongoDB 4.x

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `node server/server.js`

Starts the ExpressJS API. The API will listen on localhost:8080.
