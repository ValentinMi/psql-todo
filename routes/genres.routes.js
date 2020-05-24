const router = require("express").Router();
const { Genre, validate } = require("../models/genre.model");
const pool = require("../startup/db");

// GET -- Get all genres
router.get("/", async (req, res) => {
  try {
    const { rows: genres } = await pool.query("SELECT * FROM genres");
    if (!genres || genres.length === 0)
      return res.status(404).send("Genres not found");

    res.send(genres);
  } catch (error) {
    console.log(error.message);
  }
});

// POST -- Post a genre
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(500).send("Bad request");

    const newGenre = new Genre(req.body);

    await pool.query("INSERT INTO genres (name) VALUES($1)", [newGenre.name]);

    res.send(newGenre);
  } catch (error) {
    console.log(error.message);
  }
});

// PUT -- Update a genre
router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(500).send("Bad request");

    const { id } = req.params.id;
    const { name } = req.body;

    const { rows } = await pool.query(
      `SELECT * FROM genres WHERE genre_id = ${id}`
    );
    const genre = rows[0];
    if (!genre) res.status("404").send("Genre not found");

    const updatedGenre = { ...genre, name };
    await pool.query("UPDATE genres SET name = $1 WHERE genre_id = $2", [
      name,
      id
    ]);

    res.send(updatedGenre);
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE -- Delete a genre
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM genres WHERE genre_id = ${id}`
    );
    const genre = rows[0];
    if (!genre) res.status(404).send("Genre not found");

    await pool.query(`DELETE FROM genres WHERE genre_id = ${id}`);
  } catch (error) {
    console.log(error.message);
  }
  res.send(genre);
});

module.exports = router;
