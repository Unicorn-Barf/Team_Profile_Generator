const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

// Function to generate Manager HTML elements from inquire data
function managerHTML(data) {
  const manager = new Manager(data.name, data.id, data.email, data.officeNum);
  return `<div class="card bg-primary mb-3" id="member-card">
  <div class="card-header bg-primary text-white">
      <h1>${manager.getName()}</h1>
      <h2>${manager.getRole()}</h2>
  </div>
  <div class="card-body bg-light text-black">
      <!-- List Group for card content -->
      <ul class="list-group list-group-flush bg-white">
          <li class="list-group-item">ID: ${manager.getId()}</li>
          <li class="list-group-item">Email: ${manager.getEmail()}</li>
          <li class="list-group-item">Office Number: ${manager.officeNum}</li>
      </ul>
  </div>
</div>`
}

// Function to generate team member HTML elements from inquire data
function teamHTML(teamArr) {
  if (teamArr) {
    let teamEls = '';
    for (member of teamArr) {
      if (member.memberType === 'Engineer') {
        const engineer = new Engineer(member.name, member.id, member.email, member.github);
        teamEls += `<div class="card bg-primary mb-3" id="member-card">
  <div class="card-header bg-primary text-white">
      <h1>${engineer.getName()}</h1>
      <h2>${engineer.getRole()}</h2>
  </div>
  <div class="card-body bg-light text-black">
      <!-- List Group for card content -->
      <ul class="list-group list-group-flush bg-white">
          <li class="list-group-item">ID: ${engineer.getId()}</li>
          <li class="list-group-item">Email: ${engineer.getEmail()}</li>
          <li class="list-group-item">Github: ${engineer.github}</li>
      </ul>
  </div>
</div>\n`
      }
      else {
        const intern = new Intern(member.name, member.id, member.email, member.github);
        teamEls += `<div class="card bg-primary mb-3" id="member-card">
  <div class="card-header bg-primary text-white">
      <h1>${intern.getName()}</h1>
      <h2>${intern.getRole()}</h2>
  </div>
  <div class="card-body bg-light text-black">
      <!-- List Group for card content -->
      <ul class="list-group list-group-flush bg-white">
          <li class="list-group-item">ID: ${intern.getId()}</li>
          <li class="list-group-item">Email: ${intern.getEmail()}</li>
          <li class="list-group-item">School: ${intern.school}</li>
      </ul>
  </div>
</div>\n`
      }
    }
    return teamEls;
  }
  return '';
};


// Function to generate HTML for write to file
function generateHTML(managerAns, teamArr) {
  // get Manager and team member cards HTML
  const manager = managerHTML(managerAns);
  const team = teamHTML(teamArr);
  // create html to return
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- bootstrap CDN css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/style.css">
    <title>Document</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid text-center text-white bg-danger">
      <div class="container">
        <h1 class="display-4">My Team</h1>
        <p class="lead">Meet the people that make it happen!</p>
      </div>
    </div>
    <div id="team-div">    
      ${manager}
      ${team}
    </div>
    <!-- boostrap scripts -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="./assets/js/index.js"></script>
  </body>
</html>`
};
  
module.exports = generateHTML;