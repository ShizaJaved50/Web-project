const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/cakes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cakes.html'));
});
app.get('/newarrivals', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newarrivals.html'));
});
app.get('/receipe', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'receipe.html'));
});
app.get('/receipe2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'receipe2.html'));
});
app.get('/receipe3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'receipe3.html'));
});
app.get('/receipe4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'receipe4.html'));
});
app.get('/receipetemplate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'receipetemplate.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });
// const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const app = express();
// const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies


// Serve static files (like index.html)
app.use(express.static('public'));

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'mydatabase'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to Database');
});

// sign up
app.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  // Handle form submission
  app.post('/signup', (req, res) => {
    const {email, password } = req.body;
   // Log the received data for debugging
    if (!email || !password) {
      return res.status(400).send(' email, and password are required.');
    }
  
  
    db.query('INSERT INTO users (email, password) VALUES (?,?)', [ email, password], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while registering the user.');
      }
      console.log('User sign-up with ID:', results.insertId);
      res.send('User sign-up successfully!');
    });
  });
  

  // app.js
// app.js
// const express = require('express');
const session = require('express-session');
// const path = require('path');
// const cors = require("cors");
// const bcrypt = require("bcrypt");

const PORT = 3000;


// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'mydatabase'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
// Serve static files from the public directory

// Define the path to the public directory
// const Path = path.resolve(__dirname, 'public');
// app.use(express.static(Path));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// app.get('/', (req, res) => {
//   res.redirect('/login');
// });

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname.toString, 'public', 'index.html'));
});
// app.get('/login', (req, res) => {
//   res.render(path.join(__dirname, 'public', 'login'));;
// });
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  connection.query("SELECT * FROM users WHERE email = ?;",
  [email],
  (err, results)  => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }
    // if (results.length > 0) {
    //   req.session.user = results[0];
    //   res.redirect('/dashboard');
    // } else {
    //   res.send('Invalid email or password');
    // }
    if (results.length > 0) {
      const user = results[0];

      // Compare the provided password with the stored password
      if (password === user.password) {
        // Passwords match, set user session
        req.session.user = user;
        // console.log('Session user set:', req.session.user);
        res.redirect('/dashboard');
      } else {
        // Passwords do not match
        res.send({ message: 'Wrong email/password combination!' });
      }
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    // res.sendFile(path.join('dashboard.html','dashboard', { email: req.session.user.user }));
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    // res.sendFile(path.resolve('dashboard', { email: req.session.user.user }));
    console.log('User login to dashboard successfully!');
    console.log({email: req.session.user.email});
  } else {
    res.redirect('/login');
  }
});

// Endpoint to provide user info as JSON
app.get('/user-info', (req, res, next) => {
  if (req.session.user && req.session.user.email) {
      res.json({ email: req.session.user.email });
  } else {
      const err = new Error('Unauthorized');
      err.status = 401;
      next(err); // Pass error to the error handling middleware
  }
});



app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.send('Error logging out');
      return;
    }
    console.log("Logout");
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
