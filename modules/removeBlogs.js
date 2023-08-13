// load node fs module
const fs = require('fs')

const blogsRemove = function(req, res) {
  var dataExp = fs.readFileSync('./data.json', 'utf8')
  var data = JSON.parse(dataExp)

  var delBlogID = req.body.id - 0

  var elementFound = function(blog) {
    return blog.id === delBlogID
  }

  var index = data.blogs.findIndex(elementFound)

  data.blogs.splice(index, 1)

  dataToFile = JSON.stringify(data)

  fs.writeFile('./data.json', dataToFile, function(err) {
    if (err) throw err;
    console.log('blogID removed');
    });
}

module.exports = blogsRemove;