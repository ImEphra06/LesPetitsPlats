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

function filterBySearch(_recipes) {

}

function filterByIngredients(_recipes) {

}

function filterByAppliances(_recipes) {

}

function filterByUstensils(_recipes) {

}



/**** Remplir la liste des ingrédients *****/
let movedIngredients = [];
let removedIngredients = [];


function displayIngredients() {
    
    const dropdownContent = document.getElementById('ingredientContainer');dropdownContent.innerHTML = '';

    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('div');
        ingredientItem.textContent = ingredient;
        ingredientItem.className = 'content';
        dropdownContent.appendChild(ingredientItem);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        ingredientItem.addEventListener('click', () => {
            moveIngredientToInsistante(ingredientItem);
            createTag(ingredientItem.textContent);
        });
    });
}

function moveIngredientToInsistante(ingredientItem) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!movedIngredients.includes(ingredientItem)) {
        const clonedIngredientItem = ingredientItem.cloneNode(true);

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContentIngredient');
        insistanteContent.appendChild(clonedIngredientItem);

        // Ajouter l'élément à la liste des déplacés
        movedIngredients.push(ingredientItem);

        // Supprimer l'élément de la liste
        ingredientItem.remove();

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }
    }
}

/*function moveInsistanteToIngredient(ingredientItem) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!removedIngredients.includes(ingredientItem)) {
        const clonedIngredientItem = ingredientItem.cloneNode(true);

        // Ajouter le clone à "ingredientContainer"
        dropdownContent.appendChild(clonedIngredientItem);

        // Ajouter l'élément à la liste des déplacés
        removedIngredients.push(ingredientItem);

        // Supprimer l'élément de la liste
        ingredientItem.remove();
    }
}

insistanteContent.addEventListener('click', () => {
    moveInsistanteToIngredient(ingredientItem);
});*/

// Afficher/masquer la liste des ingrédients
function toggleIngredients() {
    const dropdownContent = document.querySelector('.dropdown-content-ingredients');
    dropdownContent.classList.toggle('show');
}

document.getElementById('ingredientBtn').addEventListener('click', () => {
    const vector = document.querySelector('.vectorIngredients');
    toggleIngredients();
    displayIngredients();
    vector.classList.toggle('rotate-180');
});














/***** Remplir la liste des appareils *****/
let movedAppliances = [];
let removedAppliances = [];

function displayAppliances() {
    const dropdownContent = document.getElementById('applianceContainer');
    dropdownContent.innerHTML = '';

    appliances.forEach(appliance => {
        const applianceItem = document.createElement('div');
        applianceItem.textContent = appliance;
        applianceItem.className = 'content';
        dropdownContent.appendChild(applianceItem);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        applianceItem.addEventListener('click', () => {
            moveApplianceToInsistante(applianceItem);
            createTag(applianceItem.textContent);
        });
    });
}

function moveApplianceToInsistante(applianceItem) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!movedAppliances.includes(applianceItem)) {
        const clonedApplianceItem = applianceItem.cloneNode(true);

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContentAppliance');
        insistanteContent.appendChild(clonedApplianceItem);

        // Ajouter l'élément à la liste des déplacés
        movedAppliances.push(applianceItem);

        // Supprimer l'élément de la liste
        applianceItem.remove();

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }
    }
}

// Afficher/masquer la liste des appareils
function toggleAppliances() {
    const dropdownContent = document.querySelector('.dropdown-content-appliances');
    dropdownContent.classList.toggle('show');
}

document.getElementById('applianceBtn').addEventListener('click', () => {
    const vector = document.querySelector('.vectorAppliances');
    toggleAppliances();
    displayAppliances();
    vector.classList.toggle('rotate-180');
});


/***** Remplir la liste des ustensiles *****/
let movedUstencils = [];
let removedUstencils = [];

function displayUstensils() {
    const dropdownContent = document.getElementById('ustensilContainer');
    dropdownContent.innerHTML = '';

    ustensils.forEach(ustensil => {
        const ustensilItem = document.createElement('div');
        ustensilItem.textContent = ustensil;
        ustensilItem.className = 'content';
        dropdownContent.appendChild(ustensilItem);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        ustensilItem.addEventListener('click', () => {
            moveUstensilToInsistante(ustensilItem);
            createTag(ustensilItem.textContent);
        });
    });
}

function moveUstensilToInsistante(ustensilItem) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!movedUstencils.includes(ustensilItem)) {
        const clonedUstensilItem = ustensilItem.cloneNode(true);

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContentUstensil');
        insistanteContent.appendChild(clonedUstensilItem);

        // Ajouter l'élément à la liste des déplacés
        movedUstencils.push(ustensilItem);

        // Supprimer l'élément de la liste
        ustensilItem.remove();

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }
    }
}

// Afficher/masquer la liste des ustensiles
function toggleUstensils() {
    const dropdownContent = document.querySelector('.dropdown-content-ustensils');
    dropdownContent.classList.toggle('show');
}

document.getElementById('ustensilBtn').addEventListener('click', () => {
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