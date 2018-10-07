const express = require('express');
const mysql = require('mysql');

const app = express();

//create connection 
const db = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'',
    database:'node_js'
});

//make connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});


//routes creating tables
app.get('/createpoststable', (req, res) => {
    let sql = `CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),
    body VARCHAR(255), PRIMARY KEY(id)
    )`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//add post
app.get('/addpost/:title/:body', (req, res) => {
    let post = {title: `${req.params.title}`, body:`${req.params.body}`};
    let sql  = 'INSERT INTO posts SET ?';
    let query = db.query(sql,post,(err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`post has been added with title: ${req.params.title} and body: ${req.params.body}`);
    })
})


//get all posts
app.get('/getposts', (req, res) => {
    let sql  = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    })
})

//select 1 post
app.get('/getpost/:id', (req, res) => {
    let sql  = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

//update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql  = `UPDATE posts SET title ='${newTitle}'
     WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

//delete post
app.get('/deletepost/:id', (req, res) => {
    let sql  = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})


app.listen('3000', () => {
    console.log('server starting on port 3000');
});

