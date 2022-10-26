const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "suo",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Read Node
app.get('/pirkejas', (req, res) => {
    const sql = `
        SELECT *
        FROM pirkejas
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//Create Node
app.post('/pirkejas', (req, res) => {
    const sql = `
        INSERT INTO pirkejas
        (id, name, price, color)
        VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [
        req.body.id,
        req.body.name,
        req.body.price,
        req.body.color
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//Update Node
app.put('/pirkejas/:id', (req, res) => {
    const sql = `
        UPDATE pirkejas
        SET id = ?, name = ?, price = ?, color = ?
        WHERE id = ?
    `;
    con.query(sql, [
        req.body.id,
        req.body.name,
        req.body.price,
        req.body.color,
        req.params.id
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//Delete Node
app.delete('/pirkejas/:id', (req, res) => {
    const sql = `
        DELETE FROM pirkejas
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})


//Filter Node
app.get('/pirkejas-filter/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM pirkejas
        WHERE id = ?
    `;
    
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//Search Node
app.get('/pirkejas-key', (req, res) => {
    const sql = `
        SELECT *
        FROM pirkejas
        WHERE name LIKE ?
    `;
    con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});