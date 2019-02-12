const knex = require('knex');
const bookshelf = require('bookshelf');

ORM = bookshelf(knex({
  client: 'sqlite',
  connection: {
    filename: `${__dirname}/data/db.sqlite`
  },
  useNullAsDefault: true,
}));

ORM.plugin('pagination');

module.exports = ORM;