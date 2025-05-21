import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import credentials from "./credentials.js";

const app = express();
const port = 3000;

// database connection
const db = new pg.Client({
  user: credentials.user,
  host: credentials.host,
  database: credentials.database,
  password: credentials.password,
  port: credentials.port,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// populate items with data from the database

let items = [];

app.get("/", async (req, res) => {
  // get the todo list items from database

  try {
    const itemQuery = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = itemQuery.rows;
    console.log(items);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    }); 
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // items.push({ title: item });

  // add item to database
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    // the reload will update the items variable.
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  // get item info
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  // update item in database and reload page
  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  
  // delete item from database
  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
