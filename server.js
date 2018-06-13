var app = require('express')();
var uuidv4 = require('uuid/v4');
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var port = process.env.PORT || 5000;

var todoPool = []

/* Routing */
app.post('/todos', function (req, res) {
  var isSuccess;
  var result;
  var params = req.body;
  console.log('params', params)
  if (params.title && typeof params.done === 'boolean') {
    var todo = {
      uid: uuidv4(),
      title: params.title,
      done: params.done
    }

    todoPool.push(todo)  
    
    isSuccess = true;
    result = todo;
  } else {
    isSuccess = false;
    result = 'params error';
  }

  res.send({
    success: isSuccess,
    result: result
  });
});

app.get('/todos', function (req, res) {
  res.send({
    success: true,
    result: todoPool
  });
});

app.delete('/todos/:uid', function (req, res) {
  var isSuccess;
  var result;
  var uid = req.params.uid;
  const index = todoPool.findIndex(todo => todo.uid === uid);
  
  if (index > -1) {
    todoPool.splice(index, 1);
    isSuccess = true;
    result = 'success';
  } else {
    isSuccess = false;
    result = 'todo not found';
  }

  res.send({
    success: isSuccess,
    result: result
  });
});

app.put('/todos/:uid', function (req, res) {
  var isSuccess;
  var result;
  var params = req.body;
  var uid = req.params.uid;
  const index = todoPool.findIndex(todo => todo.uid === uid);

  if (index > -1 && params.title && typeof params.done === 'boolean') {
    todoPool[index].title = params.title;
    todoPool[index].done = params.done;
    isSuccess = true;
    result = 'success';
  } else {
    isSuccess = false;
    result = 'todo not found or wrong params';
  }

  res.send({
    success: isSuccess,
    result: result
  });
});

app.listen(port, function () {
  console.log('Starting server on port ' + port);
});