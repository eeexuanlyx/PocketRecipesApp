# _Pocket Recipes_

![App Screenshot](/public/app-front.jpg)

![Recipe Modal](/public/Modal.jpg)

## Background Info

**This is the Local Storage Version of my original repository [Pocket Recipes](https://github.com/eeexuanlyx/pocket-recipes) . In this version, saved recipes will be in your local storage browser.**

_Pocket Recipes_ is designed to allows users to search for recipes on the go, even on their tablets and mobile phones. They can even toggle to search by ingredients, where they can input whatever ingredients they would like to have in the recipe. Users may also save the recipes to their favourites for their convenience.

## Technologies Used

- `React Javascript`
- `Node.js`
- `Vite`
- `HTML`
- `CSS`
- `Visual Studio Code`

## Getting Started

1. Ensure [Node.js](https://nodejs.org/en) is installed.

1. Click the **fork** button at the top right of this page.

1. Open your terminal (example gitbash, powershell), and clone to your desired folder.
   `<your-username>` should be your github username.

```
git clone https://github.com/<your-username>/PocketRecipesApp.git
```

3. cd to your new cloned directory:

```
cd pocket-recipes
```

4. Type the following and it will open up in vscode:

```
code .
```

5. In your terminal, run `npm i` .

## Prerequisites

1. Create a `.env` file at the root of the directory with the following:

```
VITE_SERVER=http://localhost:5001

VITE_API_KEY=<your-spoonacular-api-key>

```

2. Sign up for an account on [Spoonacular](https://spoonacular.com/food-api) and replace `<your-spoonacular-api-key>` with your spoonacular api key.

## Running The Application

In your terminal, run `npm run dev`.

Begin searching for recipes! Each favourited recipe will be stored in your local storage browser. In the app under favourites tab, you may view / remove your favourites.

Alternatively, you may also remove it from your local storage in your web browser's dev tools.

## Planning Materials

[Spoonacular API](https://spoonacular.com/food-api/) | [Postman](https://www.postman.com/) | [Image Generator](https://gemini.google.com/app) | [Google Fonts](https://fonts.google.com/selection/embed) | [React Developer Tools](https://react.dev/learn/react-developer-tools) | [React Icons](https://react-icons.github.io/react-icons/) | [Bootstrap](https://getbootstrap.com/)
