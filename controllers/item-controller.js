import isImage from "is-image";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAll = async (_req, res) => {
  try {
    const data = await knex("item");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving items: ${err}`);
  }
};

const getOne = async (req, res) => {
  try {
    const itemFound = await knex("item").where({ id: req.params.id });

    if (itemFound.length === 0) {
      return res.status(404).json({
        message: `Item with ID ${req.params.id} not found`,
      });
    }

    const itemData = itemFound[0];
    res.json(itemData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for item with ID ${req.params.id}`,
    });
  }
};

const addItem = async (req, res) => {
  if (!req.body.image) {
    return res.status(400).json({
      message: "Please provide an image for the item in the request",
    });
  }

  if (!isImage(req.body.image)) {
    return res.status(400).json({
      message: "The image provided is not valid",
    });
  }

  try {
    const result = await knex("item").insert(req.body);

    const newItemId = result[0];
    const createdItem = await knex("item").where({ id: newItemId });

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new item: ${error}`,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const rowsUpdated = await knex("item")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Item with ID ${req.params.id} not found`,
      });
    }

    const updatedItem = await knex("item").where({
      id: req.params.id,
    });

    res.json(updatedItem[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update item with ID ${req.params.id}: ${error}`,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const rowsDeleted = await knex("item")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Item with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete item: ${error}`,
    });
  }
};

export { getAll, getOne, addItem, updateItem, deleteItem };
