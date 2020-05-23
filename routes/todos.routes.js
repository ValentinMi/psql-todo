const router = require("express").Router();
const pool = require("../startup/db");
const { Todo, validate } = require("../models/todo.model");

// GET -- Get all todos
router.get("/", async (req, res) => {
  try {
    const { rows: todos } = await pool.query("SELECT * FROM todo");
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

    const newTodo = new Todo(req.body.description);

    // Save in database
    await pool.query(
      "INSERT INTO todo (description, creationDate) VALUES($1, $2)",
      [newTodo.description, newTodo.creationDate]
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
    const { description } = req.body;
    const { id } = req.params;

    // Validate req body
    const { error } = validate(req.body);
    if (error) return res.status(500).send("Bad request");

    // Check if todo exist
    const { rows } = await pool.query(
      `SELECT * FROM todo WHERE todo_id = ${id}`
    );
    const todo = rows[0];
    if (!todo) res.status(404).send("Todo not found");

    // Update todo
    const updatedTodo = { ...todo, description };
    await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      updatedTodo.description,
      id
    ]);

    res.send(updatedTodo);
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE -- Delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Check if todo exist
  const { rows } = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);
  const todo = rows[0];
  if (!todo) res.status(404).send("Todo no found");

  // Delete it
  await pool.query(`DELETE FROM todo WHERE todo_id = ${id}`);

  res.send(todo);
});

module.exports = router;
