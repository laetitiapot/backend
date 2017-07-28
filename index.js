const express = require('express');
const uuidv4 = require('uuid/v4');
const sha1 = require('sha1');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const users = [
 {
   id: '08d9c9af-9839-4c35-8704-de0186b087ff',
   username: 'gulian',
   password: '6e88c65125d8f7f8d81d2d70114d12f216fb25d1',
 },
 {
   id: '0a0806b8-ce8e-41e2-b520-5803f327eee8',
   username: 'laetitia',
   password: '6c3a92f4872e4a78ac36e72b78f5d89b011e21bc',
 }
]

app.get('/users/', function (req, res) {
 res.send(users);
});

app.get('/users/:id', function (req, res) {
  function foo (element) {
    return element.id === req.params.id;
  }
  const user = users.find(foo);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.send(user);
});

app.post('/users/', function (req, res) {
  // Creation users
  const newUser = req.body;
  sha1Password = sha1(newUser.password);
  const userInfo = {
    id: uuidv4(),
    username: newUser.username,
    password: sha1Password,
  };
  const existing = users.find(function(el) {
    return el.username === userInfo.username;
  });
  if (!existing) {
    users.push(userInfo);
    res.send(userInfo);
  } else {
    res.sendStatus(418);
  }
});

app.delete('/users/:id', function (req, res) {
  const userIndex = users.findIndex((u)=>  u.id === req.params.id);
  if(userIndex >= 0){
    users.splice(userIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
// curl -H "Content-Type: application/json" -X PUT -d '{"password":"xadazdazdyz"}' http://localhost:3000/users/08d9c9af-9839-4c35-8704-de0186b087ff
app.put('/users/:id', function (req, res) {
  const userIndex = users.findIndex((u)=>  u.id === req.params.id);
  if(userIndex >= 0){
    users[userIndex].password = sha1(req.body.password);
    res.send(users[userIndex]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
