import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { LuVegan } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import styles from "./SavedRecipes.module.css";
import LoadingSpinner from "./LoadingSpinner";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [dataByTitle, setDataByTitle] = useState([]);
  const [selection, setSelection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("favouritedRecipes")) || [];
    setSavedRecipes(recipes);
    if (recipes.length > 0) {
      setSelection(recipes[0].title); // Set selection to the most recent recipe title
    }
  }, []);

  // Fetch recipes with the selected title
  useEffect(() => {
    if (selection) {
      const filteredRecipes = savedRecipes.filter(
        (recipe) => recipe.title === selection
      );
      setDataByTitle(filteredRecipes);
    }
  }, [selection, savedRecipes]);

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  const removeRecipe = (recipeId) => {
    const updatedRecipes = savedRecipes.filter(
      (recipe) => recipe.recipeId !== recipeId
    );
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("favouritedRecipes", JSON.stringify(updatedRecipes));
    setSelection("");
    navigate("/saved-recipes");
    window.location.reload();
  };

  return (
    <div>
      <div className={styles.bodycontainer}>
        <section>
          <label className={styles.rs} htmlFor="selection">
            Select from your Favourites:
          </label>
          <div className="row">
            <select
              id="selection"
              className="col-md-12"
              onChange={handleSelectionChange}
              value={selection}
            >
              {savedRecipes.length && //display titles of saved recipes in drop down selection
                savedRecipes.map((recipe, idx) => (
                  <option key={idx} value={recipe.title}>
                    {recipe.title}
                  </option>
                ))}
            </select>
          </div>
          <br></br>
          <h3 className={styles.rs2}>Recently Favourited:</h3>
        </section>
        <br />
        <section>
          {!isLoading &&
            dataByTitle && ( //data not loading and data is not null,
              <div>
                {dataByTitle.map((recipe) => {
                  return (
                    <div key={recipe.recipeId}>
                      <div>
                        <div>
                          <div className={styles.buttonContainer}>
                            <h2 className={styles.h2}>{recipe.title}</h2>
                            <button
                              onClick={() => {
                                //for deleting recipe by id
                                removeRecipe(recipe.recipeId);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                          <div className={styles.imgContainer}>
                            <img
                              className={styles.img}
                              src={recipe.image}
                              alt={recipe.title}
                            />
                          </div>
                          <div>
                            <div className={styles.miscs}>
                              <p>
                                <GiMeal />
                                Servings: {recipe.servings}
                              </p>
                              <p>
                                <IoTimerOutline />
                                Prep Time: {recipe.minutes} Mins
                              </p>
                              {recipe.vegetarian ? (
                                <p>
                                  <FaLeaf />
                                  Vegetarian
                                </p>
                              ) : (
                                <p>
                                  <TbMeat />
                                  Non-Vegetarian
                                </p>
                              )}
                              {recipe.vegan && (
                                <p>
                                  <LuVegan /> Vegan
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div>
                              <h2>Ingredients</h2>
                              <ul className={styles.list}>
                                {recipe.ingredients &&
                                  recipe.ingredients
                                    .split(",")
                                    .map((ingredient, idx) => (
                                      <li key={idx}>{ingredient.trim()}</li>
                                    ))}
                              </ul>
                            </div>
                            <div>
                              <h2>Instructions</h2>
                              <ol>
                                {recipe.instructions &&
                                  recipe.instructions
                                    .split("|")
                                    .map((step, idx) => (
                                      <li key={idx}>{step.trim()}</li>
                                    ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}

          {isLoading && error && <p>{error}</p>}
        </section>
      </div>
    </div>
  );
};

export default SavedRecipes;
