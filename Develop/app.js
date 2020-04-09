const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
newMember()
const employees = []

function newMember() {

    inquirer
        .prompt([{
            type: "list",
            name: "role",
            message: "Who would you like to add to your team?",
            choices: ["Manager", "Intern", "Engineer", "Team is Complete"]
        }
        ])

        .then(function (response) {


            if (response.role === "Manager") {
                inquirer
                    .prompt([{
                        type: "input",
                        name: "name",
                        message: "What is their name?"
                    }, {
                        type: "input",
                        name: "id",
                        message: "What is their id?"
                    }, {
                        type: "input",
                        name: "email",
                        message: "What is their email?"
                    }, {
                        type: "input",
                        name: "officeNumber",
                        message: "What is their office number?"
                    }]).then(function (answers) {
                        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber, "Manager");
                        employees.push(newManager);
                        newMember()
                    })
            }
            else if (response.role === "Engineer") {
                inquirer
                    .prompt([{
                        type: "input",
                        name: "name",
                        message: "What is their name?"
                    }, {
                        type: "input",
                        name: "id",
                        message: "What is their id?"
                    }, {
                        type: "input",
                        name: "email",
                        message: "What is their email?"
                    }, {
                        type: "input",
                        name: "github",
                        message: "What is their github username?"
                    }]).then(function (answers) {
                        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github, "Engineer");
                        employees.push(newEngineer);
                        newMember()
                    })
            }

            else if (response.role === "Intern") {
                inquirer
                    .prompt([{
                        type: "input",
                        name: "name",
                        message: "What is their name?"
                    }, {
                        type: "input",
                        name: "id",
                        message: "What is their id?"
                    }, {
                        type: "input",
                        name: "email",
                        message: "What is their email?"
                    }, {
                        type: "input",
                        name: "school",
                        message: "What school are they attending?"
                    }]).then(function (answers) {
                        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school, "Manager");
                        employees.push(newIntern);

                        newMember()
                    })
            }
            else {
                fs.writeFile(outputPath,render(employees),function(err){
                    if (err){throw err};
                    console.log("success")
                })
                
            }


        }).catch(error => {
            console.log("Error")
        });

}
