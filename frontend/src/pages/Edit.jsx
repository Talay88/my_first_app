import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../css/edit.css";

const Edit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
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
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/recipes/${id}`, formData);
      console.log("Recipe updated successfully:", response.data);
      navigate(`/view/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  //play around with route as /api/edit or /recipes/edit

  return (
    <div className="container">
      <div className="edit-container">
        <h1 className="title">Edit Your Recipe</h1>
        <form onSubmit={handleSubmit} className="edit-form">
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
            placeholder="add 2 eggs.."
          ></textarea>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="cook eggs over medium heat for.."
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
          <label htmlFor="cookTime">Cooking Time (minutes):</label>
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
            Update
          </button>
        </form>
        <Link to="/recipes" className="recipes-link">
          &#8592; Back to Recipes
        </Link>
      </div>
    </div>
  );
};
export default Edit;
