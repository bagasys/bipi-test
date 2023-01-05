import Knex from "knex";

const knexfile = require("../knexfile");

const knex = Knex(knexfile);

export default knex;
