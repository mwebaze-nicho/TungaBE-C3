const express = require("express");

//creating express instance
const app = express();
const fs = require("fs");
const port = 3000;

app.use(express.json());

//Simple data set example
// const users = [
//   {
//     username: "Nicholas",
//     age: 20,
//     class: "backend",
//   },
//   {
//     username: "Nicholas1",
//     age: 24,
//     class: "backend",
//   },
// ];

//getting data from a file
app.get("/", (req, res) => {
  //Reading the file data.json
  const users = fs.readFileSync("./data.json", "utf8");
  const userData = JSON.parse(users);

  //Sending response to the client with appropriate status code
  res.status(200).json({
    message: "Hello",
    data: userData,
  });
});

//addinig data to a file
app.post("/users", (req, res) => {
  const users = fs.readFileSync("./data.json", "utf8");

  const userData = JSON.parse(users);

  const newUser = {
    userId: 1,
    id: 7,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  };

  //push the new user to the users list
  userData.push(newUser);

  const newUserData = JSON.stringify(userData, "utf8", 2);

  //write the new user to the file
  fs.writeFile("./data.json", newUserData, "utf8", (err) => {
    if (err) {
      res.status(400).json({
        message: "Unable to add new user",
      });
      return;
    }

    res.status(201).json({
      message: "Successfully added user",
    });
  });
});

//getting a specific user
app.get("/users/:id", (req, res) => {
  const users = fs.readFileSync("./data.json", "utf8");

  const userData = JSON.parse(users);

  //get the use id
  const id = req.params.id * 1;

  //Filter data to get a specific user with matching id
  const user = userData.filter((userInfo) => userInfo.id === id);

  //Sending user info in response to the client
  res.status(200).json({ user });
});

app.post("/users", (req, res) => {
  const users = req.body.users;

  res.json({
    message: "Post data",
    data: users,
  });
});

app.patch("/users", (req, res) => {
  // const users = req.body.users;

  res.json({
    message: "Patch data",
    //   data: users,
  });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
