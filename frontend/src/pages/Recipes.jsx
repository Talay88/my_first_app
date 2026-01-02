import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}`);
      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  return (
    <div className="container">
      <div className="recipe-list">
        <h1 className="recipes-title">Recipes</h1>
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h2 className="recipe-name">{recipe.name}</h2>
              <div className="recipe-details">
                <p>
                  <span className="sub-title block">Cook Time:</span>{" "}
                  {recipe.cookTime} minutes
                </p>
                <p>
                  <span className="sub-title">Serves:</span> {recipe.servings}
                </p>
              </div>
              <div className="recipe-actions">
                <Link to={`/view/${recipe.id}`} className="view btn">
                  View
                </Link>
                <Link to={`/edit/${recipe.id}`} className="edit btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="delete btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link to="/" className="home-link">
          &#43; New Recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipes;
