const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
require('dotenv').config()

const config = {
    DBPassword: `${process.env.REACT_APP_SQL_PASSWORD }`,
    //TODO: WHY IS THIS undefined
};
console.log(config.DBPassword)

const db = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: config.DBPassword,
        database: 'brit-shalom-database',
        insecureAuth : true
    }
)

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true})); //no need to understand, just include this line on such apps


app.post('/api/members/insert', (req, res) =>
{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    const sqlInsert = "INSERT INTO members (firstName, lastName, phoneNumber) VALUES (?, ?, ?)"
    db.query(sqlInsert, [firstName, lastName, phoneNumber], (err, result) =>
    {
        if(err)
        {
            console.log(err);
        }
        res.json({id: result.insertId})
    })
})

app.post('/api/vows/insert', (req, res) =>
{
    const memberID = req.body.memberID;
    const amount = req.body.amount;
    const date = req.body.date;
    const parasha = req.body.parasha;

    const sqlInsert = "INSERT INTO vows (memberID, amount, date, parasha) VALUES (?, ?, ?, ?)"
    db.query(sqlInsert, [memberID, amount, date, parasha], (err, result) =>
    {
        if(err)
        {
            console.log(err);
        }
    })
})

app.post('/api/payments/insert', (req, res) =>
{
    const memberID = req.body.memberID;
    const amount = req.body.amount;
    const date = req.body.date;
    const method = req.body.method;
    // const receipt = req.body.receipt;
    console.log(memberID, amount, date, method)

    const sqlInsert = "INSERT INTO payments (memberID, amount, date, method, receipt) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlInsert, [memberID, amount, date, method, 0], (err, result) =>
    {
        if(err)
        {
            console.log(err);
        }
    })
})

app.get('/api/members/get', (req, res) =>
{
    const sqlSelect = "SELECT * FROM members";
    db.query(sqlSelect, (err, result) =>
    {
        res.send(result);
    })
})


app.get('/api/vows/get/:id', (req, res) =>
{
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM vows WHERE memberID=?";
    db.query(sqlSelect, id, (err, result) =>
    {
        res.send(result);
    })
})

app.get('/api/members/get/:id', (req, res) =>
{
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM members WHERE id=?";
    db.query(sqlSelect, id, (err, result) =>
    {
        res.send(result);
    })
})

app.get('/api/payments/get/:id', (req, res) =>
{
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM payments WHERE memberID=?";
    db.query(sqlSelect, id, (err, result) =>
    {
        res.send(result);
    })
})

app.get('/api/payments/get', (req, res) =>
{
    const sqlSelect = "SELECT * FROM payments";
    db.query(sqlSelect, (err, result) =>
    {
        res.send(result);
    })
})


app.delete('/api/members/delete/:id', (req, res) =>
{
    const id = req.params.id;
    const sqlDelete = "DELETE FROM members WHERE id= ?"
    db.query(sqlDelete, id, (err, result) =>
    {
        if(err)
        {
            console.log(err);
        } 
    })
})

app.delete('/api/payments/delete/:id', (req, res) =>
{
    const id = req.params.id;
    const sqlDelete = "DELETE FROM payments WHERE id= ?"
    db.query(sqlDelete, id, (err, result) =>
    {
        if(err)
        {
            console.log(err);
        } 
    })
})

app.delete('/api/vows/delete/:id', (req, res) =>
{
    const id = req.params.id;
    const sqlDelete = "DELETE FROM vows WHERE id= ?"
    db.query(sqlDelete, id, (err, result) =>
    {
        if(err)
        {
            console.log(err);
        } 
    })
})

app.put('api/members/update', (req,res) => 
{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const id = req.body.phoneNumber;
    const sqlUpdate = "UPDATE members SET firstName = ?, lastName = ?, phoneNumber= ? WHERE id=?";
    db.query(sqlUpdate, [firstName, lastName, phoneNumber, id], (err, result) =>
    {
        if(err)
        {
            console.log(err);
        } 
    })

}) 
app.listen (3001, () =>
{
    console.log("running on 3001")
})
