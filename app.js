const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const http = require("http");
const port = 3000;

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());



const createUsers = require('./modules/createUsers')
const createBlogs = require('./modules/createBlogs')

const removeUsers = require('./modules/removeUsers')
const removeBlogs = require('./modules/removeBlogs')

const queryBlogs = require('./modules/queryBlogs')

// define the routes
app.get('/', (req, res) => {
  res.send('Hello, this is the Blog Home Page.')
})


// Add Users
app.post('/createusers', (req, res) => {
  createUsers(req, res)
  res.send('User has been added successfully.')
})

// Add Blogs
app.post('/createblogs', (req, res) => {
  createBlogs(req, res)
  res.send('Blog has been added successfully.')
})

// Remove Users
app.post('/removeusers', (req, res) => {
  removeUsers(req, res)
  res.send('User has been successfully removed.')
})

// Remove Blogs
app.post('/removeblogs', (req, res) => {
  removeBlogs(req, res)
  res.send('Blog has been successfully removed.')
})

// Query API
app.get('/blog/:year?/:month?/:day?', (req, res) => {

  url = req.url
  year = req.params.year
  month = req.params.month
  day = req.params.day

  var allBlogs = queryBlogs.queryAllBlogs()

    if (url == '/blog') {
      if (allBlogs.length == 0) {
        res.send('no post found')
      } else {
        res.send(allBlogs)
      }
    }

    else if (url == '/blog/'+year) {

      const blogsYear = queryBlogs.queryBlogsYear(allBlogs)

      if(blogsYear.length == 0) {
        res.send('no post found for this year')
      } else {
        res.send(blogsYear)
      }

    }

    else if (url == '/blog/'+year+'/'+month) {

      const blogsYearMonth = queryBlogs.queryBlogsYearMonth(allBlogs)

      if(blogsYearMonth.length == 0) {
        res.send('no post found for this year and month')
      } else {
        res.send(blogsYearMonth)
      }

    }

    else if (url == '/blog/'+year+'/'+month+'/'+day) {

      const blogsYearMonthDay = queryBlogs.queryBlogsYearMonthDay(allBlogs)

      if(blogsYearMonthDay.length == 0) {
        res.send('no post found for this year and month and day')
      } else {
        res.send(blogsYearMonthDay)
      }

    }

    else {
      res.status(404).send('Not Found')
    }

})

const server = http.createServer(app); // Create the server

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
