// load node fs module
const fs = require('fs')

const usersRemove = function(req, res) {
  var dataExp = fs.readFileSync('./data.json', 'utf8')
  var data = JSON.parse(dataExp)

  var delUserID = req.body.id - 0

  var elementFound = function(user) {
    return user.id === delUserID
  }

  var index = data.users.findIndex(elementFound)

  data.users.splice(index, 1)

  dataToFile = JSON.stringify(data)

  fs.writeFile('./data.json', dataToFile, function(err) {
    if (err) throw err;
    console.log('userID removed');
    });

}

module.exports = usersRemove;