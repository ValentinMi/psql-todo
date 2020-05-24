const router = require("express").Router();
const pool = require("../startup/db");
const { Todo, validate } = require("../models/todo.model");

// GET -- Get all todos
router.get("/", async (req, res) => {
  try {
    const { rows: todos } = await pool.query("SELECT * FROM todos");
    // If no todo
    if (!todos) return res.status(404).send("Todos not found");

    res.send(todos);
  } catch (error) {
    console.log(error.message);
  }
});

// POST -- Post a new todo
router.post("/", async (req, res) => {
  try {
    // Validate todo
    const { error } = validate(req.body);
    if (error) res.status(500).send("Bad request");

    const newTodo = new Todo(req.body.description, req.body.genre_id);

    // Save in database
    await pool.query(
      "INSERT INTO todos (description, creationDate, genre_id) VALUES($1, $2, $3)",
      [newTodo.description, newTodo.creationDate, newTodo.genre_id]
    );

    res.send(newTodo);
  } catch (error) {
    console.log(error.message);
  }
});

// PUT -- Update a todo
router.put("/:id", async (req, res) => {
  try {
    // Destructure
    const { description, genre_id } = req.body;
    const { id } = req.params;

    // Validate req body
    const { error } = validate(req.body);
    if (error) return res.status(500).send("Bad request");

    // Check if todo exist
    const { rows } = await pool.query(
      `SELECT * FROM todos WHERE todo_id = ${id}`
    );
    const todo = rows[0];
    if (!todo) res.status(404).send("Todo not found");

    // Update todo
    const updatedTodo = { ...todo, description, genre_id };
    await pool.query(
      "UPDATE todos SET (description, genre_id) VALUES($1, $2) WHERE todo_id = $3",
      [updatedTodo.description, updatedTodo.genre_id, id]
    );

    res.send(updatedTodo);
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE -- Delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Check if todo exist
  const { rows } = await pool.query(
    `SELECT * FROM todos WHERE todo_id = ${id}`
  );
  const todo = rows[0];
  if (!todo) res.status(404).send("Todo no found");

  // Delete it
  await pool.query(`DELETE FROM todos WHERE todo_id = ${id}`);

  res.send(todo);
});

module.exports = router;
