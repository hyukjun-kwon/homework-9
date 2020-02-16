const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');
const axios = require('axios');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    message: "What is your GitHub username? ",
    name: "username"
  },
  {
    type: "input",
    message: "What is your project's name? ",
    name: "project"
  },
  {
    type: "input",
    message: "Please write a short description of your project ",
    name: "description"
  },
  {
    type: "list",
    message: "What kind of license should your project have? ",
    name: "license",
    choices: [
      "MIT",
      "APACHE 2.0",
      "GPL 3.0",
      "BSD 3",
      "None"
    ]
  },
  {
    type: "input",
    message: "What command should be run to install dependencies? ",
    name: "installCommand",
    default: "npm install"
  },
  {
    type: "input",
    message: "What command should be run to run tests? ",
    name: "testCommand",
    default: "npm test"
  },
  {
    type: "input",
    message: "What does the user need to know about using the repo? ",
    name: "usage"
  },
  {
    type: "input",
    message: "What does the user need to know about contributing to the repo? ",
    name: "contributing"
  }
];

async function writeToFile(fileName, data) {
  try {
    let dir = __dirname + "/output/" + fileName;
  let queryURL = `https://api.github.com/users/${data.username}`;
  let avatarURL = "asdf";

  await axios.get(queryURL)
    .then((response) => { 
      avatarURL = response.data.avatar_url;
    });

  let content =
  `
  # Readme Homework
  
  ## Description

  Creating a Readme by asking users general questions

  ## Table of Contents

    * [Installation](#installation)

    * [Usage](#usage)

    * [License](#license)

    * [Contributing](#contributing)

    * [Tests](#tests)

  ## Installation

  To install necessary dependencies, run the following command:

  \`\`\`
  ${data.installCommand}
  \`\`\`

  ## Usage

  ${data.usage}

  ## License

  This project is licensed under the ${data.license} license.

  ## Contributing

  ${data.contributing}

  ## Tests

  To run tests, run the following command:

  \`\`\`
  ${data.testCommand}
  \`\`\`

  ## User
  Username: ${data.username}

  ![${data.username} Avatar](${avatarURL})
  `;

  await writeFileAsync(dir, content)
    .then(function(res) {
      console.log("success");
    });
  }
  catch(err) {
    if(err) throw err;
  }
}

function init() {
  inquirer
    .prompt(questions)
    .then(function(response) {
      console.log(response);
      writeToFile("README.md", response);
    });

}

init();


// {
//   username: 'hyukjun-kwon',
//   project: 'imbibo',
//   description: 'drink it',
//   license: 'MIT',
//   installCommand: 'npm install',
//   testCommand: 'npm test',
//   usage: 'HTML CSS JS',
//   contributing: 'GitHub Git'
// }