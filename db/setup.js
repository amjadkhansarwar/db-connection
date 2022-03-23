
const {PromisedDatabase} =require("promised-sqlite3")
const db = new PromisedDatabase()

async function createTable(){
    try{
    await db.open('./db/products.db')
    const query = await db.exec(
        `
            DROP TABLE IF EXISTS category;
            CREATE TABLE category (
            category_id   INTEGER PRIMARY KEY,
            name TEXT NOT NULL
            );
            
            DROP TABLE IF EXISTS product;
            CREATE TABLE  product (
            id   INTEGER PRIMARY KEY,
            name TEXT    NOT NULL,
            price INTEGER NOT NULL,
            category_id  INTEGER NOT NULL,
            FOREIGN KEY(category_id)
            REFERENCES category(category_id)
            );

            DROP TABLE IF EXISTS product_category;
            CREATE TABLE  product_category(
            product_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY(product_id)
            REFERENCES product(product_id)
            FOREIGN KEY(category_id)
            REFERENCES category(category_id)
            );
        ` )
        console.log('db is created')
    }
      catch(err){
    return err
    } 
    await db.close()
}

createTable()