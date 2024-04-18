const recipes = [];
 
 // Récupération des données de l'éléments recipes dans le fichiers JSON
 async function getRecipes() {
    const response = await fetch("data/recipes.json");
    const data = await response.json();
    recipes.push(...data.recipes);
}

function filterRecipes () {
    let _recipes = [...recipes];

    _recipes = filterByIngredients(_recipes);
    _recipes = filterByAppliances(_recipes);
    _recipes = filterByUstensils(_recipes);

    //filterBySearch(_recipes);

    displayRecipes(_recipes);

    extractIngredients(_recipes);
    extractAppliances(_recipes);
    extractUstensils(_recipes);

    displayIngredients();
    displayAppliances();
    displayUstensils();
}

/***** CHAMP DE RECHERCHE 
function filterBySearch() {
}*****/

/***** FONCTIONS GENERALES UTILISEES POUR LES 3 FILTRES *****/
function fillFilterList(prefix, type, data, label, moved) {
    const dropdownContent = document.getElementById(prefix + 'Container');
	dropdownContent.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.className = 'content';
        dropdownContent.appendChild(div);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        div.addEventListener('click', () => {
			moveItemToInsistante(div, moved, type, label);
            createTag(div.textContent, type);
            filterRecipes();
        });
    });
}

function moveItemToInsistante(item, moved, type, label) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!moved.includes(item)) {
        const cloned = item.cloneNode(true);
        cloned.classList.add('contentBis');

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContent' + type);
        insistanteContent.appendChild(cloned);
        const insistanteClose = document.createElement('img');
        insistanteClose.src = 'images/icons/tags_close.svg';
        insistanteClose.classList.add('insistantClose');
        insistanteClose.alt = 'Supprimer l élément';
        cloned.appendChild(insistanteClose);

        insistanteClose.addEventListener('click', () => {
            const tagsContent = document.querySelector('.tagsContent');
            const currentInsistanceElement = Array.from(tagsContent.children).find(item => item.textContent === insistanteContent.textContent);
            tagsContent.removeChild(currentInsistanceElement);
      
            insistanteContent.parentElement.removeChild(insistanteContent);
            filterRecipes();
        });

        // Ajouter l'élément à la liste des déplacés
        moved.push(item);

        // Supprimer l'élément de la liste
        item.remove();

        // Fermer la liste des ingrédients
        const content = document.querySelector('.dropdown-content-' + label);
        content.style.display = "none";
		const vector = document.querySelector('.vector' + type)
        vector.classList.toggle('rotate-180');

        // Ajouter la classe 'filter-close' à filterContainer
        const filterContainer = document.querySelector('.' + label);
        filterContainer.classList.add('filter-close');

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }
    }
}


/***** INGREDIENTS *****/
function filterByIngredients(_recipes) {
    // Récupérer les noms des ingrédients sélectionnés dans insistanteContentIngredient
    const selectedIngredients = Array.from(document.querySelectorAll('#insistanteContentIngredient .content')).map(item => item.textContent.trim().toLocaleLowerCase());
    if (selectedIngredients.length === 0) {
        return(_recipes);
    }

    // Filtrer les recettes
    return _recipes.filter(recipe => {
        // Vérifier si la propriété ingredient est une chaîne de caractères
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLocaleLowerCase());
        return selectedIngredients.every(selectedIngredient => recipeIngredients.includes(selectedIngredient));
    });
}

// Remplir la liste des ingrédients
let dropdownContentIngredient = null;
let vectorIngredients = null;
let movedIngredients = [];
let removedIngredients = [];

function displayIngredients() {
	fillFilterList("ingredient", "Ingredient", ingredients, "ingredients", movedIngredients);
}

function extractIngredients (_recipes) {
    ctx.ingredients = []
}

/***** APPLIANCES *****/
function filterByAppliances(_recipes) {
    // Récupérer les noms des appareils sélectionnés dans insistanteContentAppliance
    const selectedAppliances = Array.from(document.querySelectorAll('#insistanteContentAppliance .content')).map(item => item.textContent.trim().toLocaleLowerCase());
    if (selectedAppliances.length === 0) {
        return _recipes;
    }
    
    // Filtrer les recettes
    return _recipes.filter(recipe => {
        // Vérifier si la propriété appliance est une chaîne de caractères
        const recipeAppliances = Array.isArray(recipe.appliance) ? recipe.appliance.map(a => a.toLowerCase()) : [recipe.appliance.toLowerCase()];
        return selectedAppliances.every(selectedAppliance => recipeAppliances.includes(selectedAppliance));
    });
}

// Remplir la liste des appareils
let dropdownContentAppliances = null;
let vectorAppliances = null;
let movedAppliances = [];
let removedAppliances = [];

function displayAppliances() {
	fillFilterList("appliance", "Appliance", appliances, "appliances", movedAppliances);
}


/***** USTENSILS *****/
function filterByUstensils(_recipes) {
    // Récupérer les noms des ustensiles sélectionnés dans insistanteContentUstensil
    const selectedUstensils = Array.from(document.querySelectorAll('#insistanteContentUstensil .content')).map(item => item.textContent.trim().toLocaleLowerCase());
    if (selectedUstensils.length === 0) {
        return _recipes;
    }
    
    // Filtrer les recettes
    return _recipes.filter(recipe => {
        // Vérifier si la propriété Ustensil est une chaîne de caractères
        const recipeUstensils = Array.isArray(recipe.ustensils) ? recipe.ustensils.map(a => a.toLowerCase()) : [recipe.ustensils.toLowerCase()];
        return selectedUstensils.every(selectedUstensil => recipeUstensils.includes(selectedUstensil));
    });
}

// Remplir la liste des ustensiles
let dropdownContentUstensils = null;
let vectorUstensils = null;
let movedUstensils = [];
let removedUstensils = [];

function displayUstensils() {
	fillFilterList("ustensil", "Ustensil", ustensils, "ustensils", movedUstensils);
}


/***** AFFICHAGE NOMBRE DE RECETTES *****/
function nbRecette() {
    const nbRecetteElement = document.querySelector('.nbRecette');
    const nbRecipesDisplayed = document.querySelectorAll('.card').length;
    nbRecetteElement.textContent = `${nbRecipesDisplayed} recettes`;
}


/***** Utilisation des données souhaitées *****/ 
function recipeTemplate(data) {
    const { image, time, name, description, ingredients, quantity, unit } = data;

    function getRecipeCardDOM() {
        const article = document.createElement("article");
        article.className = 'card';
        
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

function displayRecipes(_recipes) {
    const recipeCards = document.querySelector(".recipes-cards");
	recipeCards.innerHTML = "";

    _recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeCards.appendChild(recipeCardDOM);
    });

	nbRecette();
}

function initReferences() {
    dropdownContentIngredient = document.querySelector('.dropdown-content-ingredients');
    vectorIngredients = document.querySelector('.vectorIngredient');
    dropdownContentAppliances = document.querySelector('.dropdown-content-appliances');
    vectorAppliances = document.querySelector('.vectorAppliance');
    dropdownContentUstensils = document.querySelector('.dropdown-content-ustensils');
    vectorUstensils = document.querySelector('.vectorUstensil');

    // Recherche des recettes via la barre de recherche principale
    document.querySelector('.search-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();
    
        if (inputValue.length >= 3) {
            const filteredRecipes = recipes.filter(recipe => {
                const titleMatch = recipe.name.toLowerCase().includes(inputValue);
                const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue));
                const descriptionMatch = recipe.description.toLowerCase().includes(inputValue);
                return titleMatch || ingredientsMatch || descriptionMatch;
            });
    
            displayRecipes(filteredRecipes);
        } else {
            displayRecipes(recipes);
        }
    });

    // Recherche des ingrédients, appareils et ustensiles via la barre de recherche du menu déroulant
    document.querySelector('.search-ingredient-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();

        if (inputValue.length >= 3) {
            const filteredIngredients = ctx.ingredients.filter(ingredient => {
                return ingredient.toLowerCase().startsWith(inputValue);
            });

            fillFilterList("ingredient", "Ingredient", filteredIngredients, "ingredients", movedIngredients);
        } else {
            displayIngredients();
        }
    });

    document.querySelector('.search-appliance-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();

        if (inputValue.length >= 3) {
            const filteredAppliances = appliances.filter(appliance => {
                return appliance.toLowerCase().startsWith(inputValue);
            });

            fillFilterList("appliance", "Appliance", filteredAppliances, "appliances", movedAppliances);
        } else {
            displayAppliances();
        }
    });

    document.querySelector('.search-ustensil-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();

        if (inputValue.length >= 3) {
            const filteredUstensils = ustensils.filter(ustensil => {
                return ustensil.toLowerCase().startsWith(inputValue);
            });

            fillFilterList("ustensil", "Ustensil", filteredUstensils, "ustensils", movedUstensils);
        } else {
            displayUstensils();
        }
    });
}
