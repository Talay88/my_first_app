import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    servings: "",
    cookTime: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/recipes", formData);
      console.log("Recipe added successfully:", response.data);
      navigate("/recipes");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };
  return (
    <div className="container">
      <div className="recipe-container">
        <h1 className="title">Add a New Recipe</h1>
        <form onSubmit={handleSubmit} className="recipe-form">
          <label htmlFor="name">Name of Recipe:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Grandma's Apple Pie"
          />
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="2 cups of flour..."
            rows="3"
          ></textarea>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="cook eggs over medium heat for.."
            rows="4"
          ></textarea>
          <label htmlFor="servings">Number of Servings:</label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            placeholder="3"
          />
          <label htmlFor="cookTime">
            Cooking Time <small>(minutes)</small>:
          </label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            placeholder="30"
          />
          <button
            type="submit"
            value="submit"
            aria-label="Submit recipe"
            className="submit-btn"
          >
            Submit
          </button>
        </form>
        <Link to="/recipes" className="recipes-link">
          View All Recipes &#8594;
        </Link>
      </div>
    </div>
  );
};

export default Form;
