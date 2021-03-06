const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const fs= require('fs');
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
app.get('/api/addpost/:title/:body', (req, res) => {
    let post = {title: `${req.params.title}`, body:`${req.params.body}`};
    let sql  = 'INSERT INTO posts SET ?';
    let query = db.query(sql,post,(err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`post has been added with title: ${req.params.title} and body: ${req.params.body}`);
    })
})


//get all posts
app.get('/api/getposts', (req, res) => {
    let sql  = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    })
})

//select 1 post
app.get('/api/getpost/:id', (req, res) => {
    let sql  = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

//update post
app.get('/api/updatepost/:id', (req, res) => {
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
app.get('/api/deletepost/:id', (req, res) => {
    let sql  = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})


app.get('/drinks', (req, res) => {
    let content;

    if(fs.existsSync('./drinks.json')){
        content = fs.readFileSync('./drinks.json','utf8');
        JSON.parse(content);
        //res.send(`data exists on file: drinks.json<br>${content}`);
    }else{
        axios.get('https://api.bol.com/catalog/v4/lists/?ids=4268792077&limit=1&apikey=A1588DB3C75F426196E5C3A7A64887A9&MediaEntry=true&includeAttributes=true&format=json')
        .then((response) => {
        content = response.data.products;
        fs.writeFileSync('drinks.json', JSON.stringify(content,null,2));
       // res.send(content);
        })
    }
    //console.log(content[1]);
 
   res.send(`data exists on file: drinks.json<br>${content}`);



})




app.listen('3000', () => {
    console.log('server starting on port 3000');
});

