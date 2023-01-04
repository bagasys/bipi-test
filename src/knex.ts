import Knex from "knex";

// import { Knex as KnexConfig } from "./config";
const knexfile = require("../knexfile");

const knex = Knex(knexfile);

export default knex;
