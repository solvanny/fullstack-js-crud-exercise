const QB = require('./orm').knex;
const User = require('./models/employee');
const userData = require('./data/employees.json');

QB.schema
  .dropTableIfExists('employees')
  .createTable('employees', table => {
    table.increments(),
    table.string('name'),
    table.string('code'),
    table.string('profession'),
    table.string('color'),
    table.string('city'),
    table.string('branch'),
    table.boolean('assigned')
  }).then( async () => {
    console.log(await User.collection(userData).invokeThen('save'));
    process.exit(0);
  });