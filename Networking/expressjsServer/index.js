import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const PORT = 5111;

app.all("/", (req, res) => {
  console.log("request -> ", req);
  console.log("response -> ", res);
  res.send(`I'm UP`);
});

const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];

//read
app.get("/todos", (req, res) => {
  res.json(todos);
});

//create
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json({
    messafe: "new todo added!",
  });
});

//update
app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = req.params.id;

  const todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: todoParamId,
      ...newTodoData,
    };
  }

  res.json({
    message: "Todo updated successfully",
  });
});

//delete
app.delete("/todos/:id", (req, res) => {
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id == todoParamId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }

  res.json({
    message: "todo deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
