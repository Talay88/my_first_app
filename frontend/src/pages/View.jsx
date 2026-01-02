import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/read.css";

const View = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };
    fetchRecipe();
  }, [id]);
  return (
    <div className="container">
      <div className="whole-recipe">
        <h1 className="view-title">{recipe.name}</h1>
        <div className="grid-area">
          <div className="cooktime">
            <h3>cook time:</h3>
            <p className="cooktime-p">{recipe.cookTime} minutes</p>
          </div>
          <div className="servings">
            <h3>servings:</h3>
            <p className="servings-p">{recipe.servings}</p>
          </div>
          <div className="ingredients">
            <h3>ingredients:</h3>
            <p className="ingredients-p">{recipe.ingredients}</p>
          </div>
          <div className="instructions">
            <h3>instructions:</h3>
            <p className="instructions-p">{recipe.instructions}</p>
          </div>
        </div>
      </div>
      <Link to="/recipes" className="link-recipes">
        &#8592; Back to Recipes
      </Link>
    </div>
  );
};
export default View;
