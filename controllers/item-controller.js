import fs from "fs";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAll = async (req, res) => {
  const s = req.query.s;

  try {
    const data = await knex("item").where((builder) => {
      if (s) {
        builder
          .where("season", "like", `%${s}%`)
          .orWhere("category", "like", `%${s}%`)
          .orWhere("color", "like", `%${s}%`)
          .orWhere("material", "like", `%${s}%`)
          .orWhere("pattern", "like", `%${s}%`)
          .orWhere("fit", "like", `%${s}%`)
          .orWhere("brand", "like", `%${s}%`)
          .orWhere("tags", "like", `%${s}%`)
          .orWhere("notes", "like", `%${s}%`);
      }
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`Error retrieving items: ${err.message}`);
  }
};

const getOne = async (req, res) => {
  try {
    const itemData = await knex("item").where({ id: req.params.id }).first();

    if (!itemData) {
      return res.status(404).json({
        message: `Item with ID ${req.params.id} not found`,
      });
    }

    res.json(itemData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for item with ID ${req.params.id}`,
    });
  }
};

const addItem = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please provide an image for the item.",
    });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const [newItemId] = await knex("item").insert({
      image: imageUrl,
      season: req.body.season,
      category: req.body.category,
      color: req.body.color,
      material: req.body.material,
      pattern: req.body.pattern,
      style: req.body.style,
      fit: req.body.fit,
      brand: req.body.brand,
      tags: req.body.tags,
      notes: req.body.notes,
    });

    const createdItem = await knex("item").where({ id: newItemId }).first();

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new item: ${error.message}`,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const updateData = {
      season: req.body.season,
      category: req.body.category,
      color: req.body.color,
      material: req.body.material,
      pattern: req.body.pattern,
      style: req.body.style,
      fit: req.body.fit,
      brand: req.body.brand,
      tags: req.body.tags,
      notes: req.body.notes,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const rowsUpdated = await knex("item")
      .where({ id: req.params.id })
      .update(updateData);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Item with ID ${req.params.id} not found`,
      });
    }

    const updatedItem = await knex("item").where({ id: req.params.id });

    res.json(updatedItem[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update item with ID ${req.params.id}: ${error}`,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await knex("item").where({ id: req.params.id }).first();

    fs.unlink(item.image.slice(1), (err) => {
      if (err) {
        console.error(`Error deleting image file: ${err.message}`);
      }
    });

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
      message: `Unable to delete item with ID ${req.params.id}: ${error.message}`,
    });
  }
};

export { getAll, getOne, addItem, updateItem, deleteItem };
