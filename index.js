import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Array to store submitted posts
let submittedPosts = [];
let postIdCounter = 1; // Counter to assign unique IDs to posts

app.set('view engine', 'ejs'); // Set EJS as the view engine

app.get('/', (req, res) => {
  // Render the home page with submitted posts
  res.render('index.ejs', { posts: submittedPosts });
});

app.post('/submit', (req, res) => {
  const formData = req.body;

  // Create a new post object with a unique ID
  const newPost = {
    id: postIdCounter++,
    title: formData.title,
    content: formData.content,
  };

  // Store the submitted post in the array
  submittedPosts.push(newPost);

  // Log the data for demonstration purposes
//   console.log('Submitted Post:', newPost);

  // Redirect to the home page to display the updated list of posts
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);

  // Find the post with the specified ID
  const postToEdit = submittedPosts.find(post => post.id === postId);

  if (postToEdit) {
    // Render the edit page with the post data
    res.render('edit.ejs', { post: postToEdit });
  } else {
    // Redirect to the home page if the post is not found
    res.redirect('/');
  }
});
app.post('/update/:id', (req, res) => {
    const postId = parseInt(req.params.id);
  
    // Find the index of the post with the specified ID
    const postIndex = submittedPosts.findIndex(post => post.id === postId);
  
    if (postIndex !== -1) {
      // Update the post with the new data
      submittedPosts[postIndex].title = req.body.title;
      submittedPosts[postIndex].content = req.body.content;
  
      // Redirect to the home page after updating
      res.redirect('/');
    } else {
      // Redirect to the home page if the post is not found
      res.redirect('/');
    }
  });
  
  app.get('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
  
    // Filter out the post with the specified ID
    submittedPosts = submittedPosts.filter(post => post.id !== postId);
  
    // Redirect to the home page after deleting
    res.redirect('/');
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
