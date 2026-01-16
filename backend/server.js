import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "./helpers.js";

dotenv.config();
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ssl_path = path.join(__dirname, "ssl", "ca.pem");
const caCert = fs.readFileSync(ssl_path);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  ssl: {
    ca: caCert,
    sslmode: verify - ca,
    rejectUnauthorized: true,
  },
});

async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.query("SELECT 1");
    connection.release();
    console.log("Database pool is connected and functional.");
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error.message);
    return false;
  }
}

testDbConnection();

app.post("/test", (req, res) => {
  res.send("Got a POST recipe");
});

app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await getRecipes(pool);
    res.json(recipes);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(pool, id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/recipes", async (req, res) => {
  try {
    const { name, ingredients, instructions, servings, cookTime } = req.body;
    const newRecipeData = {
      name,
      ingredients,
      instructions,
      servings,
      cookTime,
    };
    const newRecipeId = await createRecipe(pool, newRecipeData);
    res.status(201).json({
      message: "Recipe uploaded successfully!",
      id: newRecipeId,
      ...newRecipeData,
    });
  } catch (error) {
    console.error("API recipe creation error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the recipe." });
  }
});

app.put("/api/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRows = await updateRecipe(pool, id, req.body);
    if (updatedRows) {
      res.json({
        message: `Recipe ${id} updated successfully. Rows affected: ${updatedRows}`,
      });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteRecipe(pool, id);
    if (affectedRows > 0) {
      res.json({
        message: `Recipe with ID ${id} deleted successfully`,
        id: id,
      });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.error("Route error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//run port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
