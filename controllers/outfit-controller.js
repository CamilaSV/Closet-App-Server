import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAll = async (req, res) => {
  // const s = req.query.s;

  try {
    const data = await knex("item").where((builder) => {
      if (s) {
        builder.where("", "like", `%${s}%`).orWhere("", "like", `%${s}%`);
      }
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`Error retrieving items: ${err.message}`);
  }
};

export { getAll };
