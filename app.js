const express = require('express')
const app = express()

const { PromisedDatabase } = require("promised-sqlite3")

const db = new PromisedDatabase()

app.use(express.static('public'))
app.use( express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get ('/', async (req,res)=>{
    try {
        await db.open("./db/products.db"); 
        const categorys = await db.all(`SELECT * FROM category`)
        db.close()
        res.render('index', {categorys})
        }catch(err) {
        console.error(err);
        }
})
app.listen(8000)
