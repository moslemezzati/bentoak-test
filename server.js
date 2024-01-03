var express = require("express");
var cors = require('cors')
const axios = require("axios");
var app = express();

app.use(cors())

app.get('/', async function(request, response) {
  const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const {data: posts} = postResponse;
  const requests = posts.map(async post => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    return {name: `PostId ${post.id}`, comments: res.data.length}
  })
  const comments = await Promise.all(requests)
  response.send(comments)
});

var port = process.env.PORT || 5000;

app.listen(port, function()
{
  console.log("Listening on " + port);
});