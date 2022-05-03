# CONTRIBUTING.md
A Markdown document exclusively dedicated to how others might contribute to the Ranked project. This document is essentially a contract agreed-upon by all Ranked developers and contributors.

## Team Values:
1. Be Kind <3
2. Be Semi-On-Time
   1. Communicate when you cannot attend.
3. If a developer needs help, ask for help in the help channel in the Ranked discord server. 
4. If a conflict between two developers arises, attempt to resolve the conflict in the help channel. If that doesn’t resolve the issue, the two developers in question will both propose their sides of the issue and hold a best-of-three rock-paper-scissors match. The winning developer gets to proceed with their proposal. 
5. If a developer is being blocked by another developer, tag them in the help channel and outline what needs to be done in order for the first developer to be unblocked.

## Sprint Cadence
* 2 Weeks

## Daily Standups
1. Mondays and Wednesdays directly after lecture for 5 minutes.
2. The group will meet in person. If any developer cannot attend in-person, they can dial in through Discord. 
3. Members will not cover for other members who do not participate. 
4. A member who makes no progress on a task for two standups or more in a row will be reported to management.


## Coding Standards
1. Designate a code editor and code linter all team members will use to standardize code formatting.
2. Don't over-engineer. Write minimum code to get things working end to end, only then iterate to improve. - Code for each task and spike must be peer-reviewed and pass tests before merging into the main branch of code.
3. Always push working code, if you break the pipeline/build then fix it.
4. Make granular and small commits, per feature or per bug fix.
5. Provide descriptive commit messages.
6. Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
7. Don't leave dead/commented out code behind. If you see such code, delete it.
8. Write automated tests to cover critical integration points and functionality (once you learn how to do that).

## Git Workflow
1. All in-progress work must be done off of the main branch. After it has been checked and linted, it can be merged with the main branch.
2. Resolve all pull requests by the next group check in.

## Rules on Contributing
1. All developers must complete their designated story by the next group meeting.
2. If 2 meetings have elapsed since a developer was assigned a story, they must reach out and explain the obstacles they are running into in the help Discord channel. Failure to do so will result in being reported to management. 

## Instructions for Setting up Local Development Environment
### In the Back-end Directory
1. Run `npm install` to install all dependencies listed in `package.json` onto your local machine. This is necessary before running our app, as the 3rd-party dependency code is excluded from version control by the `.gitignore` git settings file.
2. Run `npm install -g nodemon` to install nodemon globally on your machine. Notice that the server will restart when you make changes, since nodemon handles stopping and restarting the server with each code change.
3. Create a `.env` file and save it in the current directory. To ensure this file is configured with the correct environmental variables, please contact our Ranked developers for more information, as those data are sensitive and not allowed to be publicly shared on GitHub.

### In the Front-end Directory
1. Run `npm install` to install all dependencies listed in `package.json` onto your local machine. This is necessary before running our app, as the 3rd-party dependency code is excluded from version control by the `.gitignore` git settings file.
2. Create a `.env` file and save it in the current directory. To ensure this file is configured with the correct environmental variables, please contact our Ranked developers for more information, as those data are sensitive and not allowed to be publicly shared on GitHub.

## Instructions for Building and Testing the Project
### In the Back-end Directory
1. Run `nodemon server` to start the back-end. In your terminal, the initial few lines of output should contain: 
      > Server running on port: {port} <br>
      > Connected to MongoDB

### In the Front-end Directory
1. Run `npm start` to start the front-end.
2. Open [http://localhost:3000](http://localhost:3000) to view our app in your browser. The page will reload when you make changes, and you may also see any lint errors in the console.

### Unit Testing
* Our back-end directory includes unit tests built with [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/) assertion library, while combining with [chai-http](https://www.chaijs.com/plugins/chai-http/) plugin to simplify testing for back-end routes. Code coverage analysis is provided by the `nyc` module.
* To run unit tests, `cd` to the `back-end` directory and `npm test`. Once the script is finished running, you will be able to see all the test results and the overall code coverage analysis in the console.