import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const all = async (_req, res) => {
  try {
    const data = await knex("item");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving item: ${err}`);
  }
};

export { all };
