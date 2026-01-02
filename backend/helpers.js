export async function getRecipes(pool) {
  try {
    const [rows] = await pool.query("SELECT * FROM recipes");
    return rows;
  } catch (error) {
    console.error("Failed to retrieve recipes:", error);
    throw new Error("Could not retrieve recipes due to a database error.");
  }
}

export async function getRecipeById(pool, id) {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM recipes WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error(`Database error in getRecipeById for ID ${id}:`, error);
    throw error;
  }
}

export async function createRecipe(pool, recipe) {
  try {
    const { name, ingredients, instructions, servings, cookTime } = recipe;
    const [result] = await pool.query(
      `INSERT INTO recipes (name, ingredients, instructions, servings, cookTime) VALUES (?, ?, ?, ?, ?)`,
      [name, ingredients, instructions, servings, cookTime]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    throw error;
  }
}

export async function updateRecipe(pool, id, recipe) {
  try {
    const { name, ingredients, instructions, servings, cookTime } = recipe;
    const [result] = await pool.execute(
      `UPDATE recipes SET name = ?, ingredients = ?, instructions = ?, servings = ?, cookTime = ? WHERE id = ?`,
      [name, ingredients, instructions, servings, cookTime, id]
    );
    if (result.affectedRows === 0) {
      console.warn(`No recipe found with ID ${id} or no changes made`);
    }
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating recipe:", error.message);
    throw error;
  }
}

export async function deleteRecipe(pool, id) {
  try {
    const [result] = await pool.execute(`DELETE FROM recipes WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting recipe:", error.message);
    throw error;
  }
}
