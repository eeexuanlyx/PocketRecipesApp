import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RecipeModal.module.css";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { LuVegan } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import RecipeInfo from "./RecipeInfo";
import LoadingSpinner from "./LoadingSpinner";

const OverLay = (props) => {
  const [recipeData, setRecipeData] = useState({});
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [favouritedRecipes, setFavouritedRecipes] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("favouritedRecipes"));
    return saved || [];
  });

  useEffect(() => {
    const URL = `https://api.spoonacular.com/recipes/${props.foodId}/information?`;
    const apiKey = import.meta.env.VITE_API_KEY;
    const getRecipeData = async () => {
      try {
        const res = await fetch(`${URL}apiKey=${apiKey}`);

        if (!res.ok) {
          throw new Error("getting data error");
        }

        const data = await res.json();
        setRecipeData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (props.foodId) {
      //if there is foodId( to ensure already passed down), get the data,
      getRecipeData();
      setIsLoadingRecipe(false);
    }
  }, [props.foodId]); //when user click view recipe
  //food id passes down to the url to getRecipeData to fetch from API

  const handleFavourite = () => {
    // Check if the recipe is already favorited
    const sameId = favouritedRecipes.filter(
      (recipe) => recipe.recipeId === props.foodId
    );

    if (sameId.length === 0) {
      // If not already saved, add the recipe
      const newRecipe = {
        recipeId: recipeData.id,
        title: recipeData.title,
        servings: recipeData.servings,
        image: recipeData.image,
        minutes: recipeData.readyInMinutes,
        vegetarian: recipeData.vegetarian,
        vegan: recipeData.vegan,
        ingredients: recipeData.extendedIngredients
          .map((item) => `${item.amount} ${item.unit} ${item.name}`)
          .join(", "),
        instructions: recipeData.analyzedInstructions[0].steps
          .map((item) => item.step)
          .join("|"),
      };

      addRecipe(newRecipe);
      setIsSaved(true);
    } else {
      setIsSaved(true); // Recipe is already saved
    }
  };

  // Save new recipe to localStorage
  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...favouritedRecipes, newRecipe];
    setFavouritedRecipes(updatedRecipes);
    localStorage.setItem("favouritedRecipes", JSON.stringify(updatedRecipes));
  };

  // Retrieve saved recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes =
      JSON.parse(localStorage.getItem("favouritedRecipes")) || [];
    setFavouritedRecipes(savedRecipes);
  }, []);

  // Check if recipe is already favorited when data is loaded
  useEffect(() => {
    if (favouritedRecipes.length > 0 && props.foodId) {
      favourited();
    }
  }, [favouritedRecipes, props.foodId]);

  const favourited = () => {
    const sameId = favouritedRecipes.filter(
      (recipe) => recipe.recipeId === props.foodId
    );
    setIsSaved(sameId.length > 0);
  };

  return (
    <>
      {isLoadingRecipe ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <h2>{recipeData.title}</h2>
              <div className={styles.recipeTop}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.image}
                    src={recipeData.image}
                    alt={recipeData.title}
                  />
                </div>
                <div className={styles.miscs}>
                  <div className={styles.buttonGap}>
                    {isSaved ? (
                      <button className={styles.favButton} disabled={true}>
                        Favourited
                      </button>
                    ) : (
                      <button
                        className={styles.favButton}
                        onClick={handleFavourite}
                      >
                        Favourite
                      </button>
                    )}
                    <button onClick={() => props.setShowRecipeModal(false)}>
                      Close
                    </button>
                  </div>
                  <div className={styles.miscs2}>
                    <p>
                      <GiMeal />
                      Servings: {recipeData.servings}
                    </p>
                    <p>
                      <IoTimerOutline />
                      Prep Time: {recipeData.readyInMinutes} Mins
                      {console.log(recipeData)};
                    </p>
                    {recipeData.vegetarian ? (
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
                    {recipeData.vegan && (
                      <p>
                        <LuVegan /> Vegan
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.list}>
                  <RecipeInfo recipeData={recipeData} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const RecipeModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          foodId={props.foodId}
          setShowRecipeModal={props.setShowRecipeModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default RecipeModal;
