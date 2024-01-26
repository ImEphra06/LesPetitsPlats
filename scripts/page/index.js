const recipes = [];
 
 // Récupération des données de l'éléments recipes dans le fichiers JSON
 async function getRecipes() {
    const response = await fetch("data/recipes.json");
    const data = await response.json();
    recipes.push(...data.recipes);
}

function filterRecipes () {
    const _recipes = [...recipes];

    filterByIngredients(_recipes);

    filterByAppliances(_recipes);

    filterByUstensils(_recipes);

    filterBySearch(_recipes);

    displayRecipes(_recipes);

    extractIngredients(_recipes);
    extractAppliances(_recipes);
    extractUstensils(_recipes);

    displayIngredients();
    displayAppliances();
    displayUstensils();
}

function filterByIngredients(_recipes) {

}

function filterByAppliances(_recipes) {

}

function filterByUstensils(_recipes) {

}

function filterBySearch(_recipes) {

}

/**** Remplir la liste des ingrédients *****/
function displayIngredients() {
    const dropdownContent = document.querySelector('.dropdown-content-ingredients');
    dropdownContent.innerHTML = '';

    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('div');
        ingredientItem.textContent = ingredient;
        ingredientItem.className = 'content';
        dropdownContent.appendChild(ingredientItem);
    });
}

// Afficher/masquer la liste des ingrédients
function toggleIngredients() {
    const dropdownContent = document.querySelector('.dropdown-content-ingredients');
    dropdownContent.classList.toggle('show');
}

document.querySelector('.ingredients').addEventListener('click', () => {
    const vector = document.querySelector('.vectorIngredients');
    toggleIngredients();
    displayIngredients();
    vector.classList.toggle('rotate-180');
});


/***** Afficher/masquer la liste des appareils *****/
function displayAppliances() {
    const dropdownContent = document.querySelector('.dropdown-content-appliances');
    dropdownContent.innerHTML = '';

    appliances.forEach(appliance => {
        const applianceItem = document.createElement('div');
        applianceItem.textContent = appliance;
        applianceItem.className = 'content';
        dropdownContent.appendChild(applianceItem);
    });
}

// Afficher/masquer la liste des appareils
function toggleAppliances() {
    const dropdownContent = document.querySelector('.dropdown-content-appliances');
    dropdownContent.classList.toggle('show');
}

document.querySelector('.appliances').addEventListener('click', () => {
    const vector = document.querySelector('.vectorAppliances');
    toggleAppliances();
    displayAppliances();
    vector.classList.toggle('rotate-180');
});


/***** Afficher/masquer la liste des ustensiles *****/
function displayUstensils() {
    const dropdownContent = document.querySelector('.dropdown-content-ustensils');
    dropdownContent.innerHTML = '';

    ustensils.forEach(ustensil => {
        const ustensilItem = document.createElement('div');
        ustensilItem.textContent = ustensil;
        ustensilItem.className = 'content';
        dropdownContent.appendChild(ustensilItem);
    });
}

// Afficher/masquer la liste des ustensiles
function toggleUstensils() {
    const dropdownContent = document.querySelector('.dropdown-content-ustensils');
    dropdownContent.classList.toggle('show');
}

document.querySelector('.ustensils').addEventListener('click', () => {
    const vector = document.querySelector('.vectorUstensils');
    toggleUstensils();
    displayUstensils();
    vector.classList.toggle('rotate-180');
});


// Utilisation des données souhaitées
function recipeTemplate(data) {
    const { image, time, name, description, ingredients, quantity, unit } = data;

    function getRecipeCardDOM() {
        const article = document.createElement("article");
        
        const cardContent = document.createElement("div")
        cardContent.className = 'card-content';

        const recipesImg = document.createElement("img");
        recipesImg.src = image;
        recipesImg.setAttribute('aria-label', 'Recette - ' + name);
        const recipesTime = document.createElement("h2");
        recipesTime.textContent = `${time}min`;
        const recipesName = document.createElement("h1");
        recipesName.textContent = name;
        const recipesSTitle1 = document.createElement("h3");
        recipesSTitle1.textContent = `RECETTE`;
        const recipesDescription = document.createElement("p");
        recipesDescription.textContent = description;
        const recipesSTitle2 = document.createElement("h3");
        recipesSTitle2.textContent = `INGRÉDIENT`;

        const ingredientsList = document.createElement("div");
        ingredientsList.className = 'ingredients-list';
        ingredients.forEach((ingredient) => {
			const div = document.createElement("div");
			div.classList.add("ingredient");
			const ingredientName = document.createElement("h4");
			ingredientName.classList.add("ingredient-name");
			ingredientName.textContent = ingredient.ingredient;
			div.appendChild(ingredientName);
			const ingredientUnit = document.createElement("h5");
			ingredientUnit.textContent = ingredient.quantity + (ingredient.unit? " " + ingredient.unit:"");
			div.appendChild(ingredientUnit);
			ingredientsList.appendChild(div);
		});

        article.appendChild(recipesImg);
        article.appendChild(recipesTime);
        article.appendChild(cardContent);
        cardContent.appendChild(recipesName);
        cardContent.appendChild(recipesSTitle1);
        cardContent.appendChild(recipesDescription);
        cardContent.appendChild(recipesSTitle2);
        cardContent.appendChild(ingredientsList);

        return article;
    }
    return { image, time, name, description, ingredients, quantity, unit, getRecipeCardDOM };
}

async function displayRecipes(_recipes) {
    const recipeCards = document.querySelector(".recipes-cards");

    _recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeCards.appendChild(recipeCardDOM);
    });
}

async function init() {
    await getRecipes();
    filterRecipes();
}

window.onload = async function () {
    await init();
};