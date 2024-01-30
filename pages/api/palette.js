import knex from "../../clients/knex";

export default async (req, res) => {
  if (req.method === "GET") {
    const palettes = await knex("palettes").select("*");
    res.status(200).json(palettes);
  } else if (req.method === "POST") {
    const newPalette = await knex("palettes").insert(req.body).returning("*");
    res.status(201).json(newPalette);
  } else if (req.method === "PUT") {
    const updatedPalette = await knex("palettes")
      .where({ id: req.body.id })
      .update(req.body)
      .returning("*");
    res.status(200).json(updatedPalette);
  } else if (req.method === "DELETE") {
    await knex("palettes").where({ id: req.body.id }).del();
    res.status(204).send();
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
