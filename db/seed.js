const { PromisedDatabase } = require("promised-sqlite3")
const db = new PromisedDatabase()

async function seed(){
    try{
        await db.open('./db/products.db')
        const data = await db.exec(
            `
            INSERT INTO category (name)
            VALUES('Convenience goods'), ('Shopping goods'), ('Specialty goods'),('Unsought goods');
            `
        )
        await db.close()
        console.log('Data is inserted')
    }
    catch (err){
        return err
    }
}

seed()