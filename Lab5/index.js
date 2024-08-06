
const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  
    const Lab5 = (app) => {
        app.get("/a5/todos", (req, res) => {
            const { completed } = req.query;
            if (completed !== undefined) {
                const completedBool = completed === "true";
                const completedTodos = todos.filter((t) => t.completed === completedBool);
                res.json(completedTodos);
                return;
    }
    res.json(todos);
        });

        app.post("/a5/todos", (req, res) => {
          const newTodo = { ...req.body,  id: new Date().getTime() };
          todos.push(newTodo);
          res.json(newTodo);
        });
      

        app.get("/a5/todos/:id/delete", (req, res) => {
            const { id } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            const todoIndex = todos.indexOf(todo);
            if (todoIndex !== -1) {
              todos.splice(todoIndex, 1);
            }
            res.json(todos);
        });
        app.put("/a5/todos/:id", (req, res) => {
          const { id } = req.params;
          todos = todos.map((t) => {
            if (t.id === parseInt(id)) {
              return { ...t, ...req.body };
            }
            return t;
          });
          res.sendStatus(200);
        });
      
        app.delete("/a5/todos/:id", (req, res) => {
          const { id } = req.params;
          const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
          todos.splice(todoIndex, 1);
          res.sendStatus(200);
        });
      
        app.get("/a5/todos/:id/title/:title", (req, res) => {
            const { id, title } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            todo.title = title;
            res.json(todos);
        });

        
        app.get("/a5/todos/:id", (req, res) => {
            const { id } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            res.json(todo);
        });
        
        
        app.get("/a5/assignment/title/:newTitle", (req, res) => {
            const { newTitle } = req.params;
            assignment.title = newTitle;
            res.json(assignment);
        });
        
        app.get("/lab5/hello", (req, res) => {
            res.send("hello");
        });

        app.get("/lab5", (req, res) => {
            res.send("welcome eisht a5");
        });
    app.get("/lab5/add/:a/:b", (req, res) => {
            const a = parseInt(req.params.a, 10);
            const b = parseInt(req.params.b, 10);
            const sum = a + b;
            res.send(`The sum of ${sum}`);
    });

    app.get("/lab5/subtract/:a/:b", (req, res) => {
            const { a, b } = req.params;
            const sum = parseInt(a) - parseInt(b);
            res.send(sum.toString());
          });

    app.get("/lab5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
          case "add":
            result = parseInt(a) + parseInt(b);
            break;
          case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
          default:
            result = "Invalid operation";
        }
        res.send(result.toString());
      });
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment.title);
    });
         
    
};

export default Lab5;