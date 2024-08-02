let searchBar = document.querySelector(".search-bar > input");
let searchBTN = document.querySelector("#search-btn");
let recipeContainer = document.querySelector(".recipe-container");
let info = document.querySelector(".info");
let recipeDetails = document.querySelector(".recipe-details");
let recipeContent = document.querySelector(".recipe-content");
let buttons = []

const getIngredients = (meal) => {
  let i = 1;
  let lists = '<ul class="lists">';
  console.log(meal);

  while(meal[`strIngredient${i}`]) {
    lists += `<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    i++;
  }
  lists += '</ul>';
  return lists;
}

const getDetails = (e,meals) => {
  recipeDetails.style.display = "block"
  let index = e.target.id;
  let elem = meals[index]

  recipeContent.innerHTML = 
  `<div class='content'>
  <h1>${elem.strMeal}</h1>
  <h2>Ingredients :</h2>
  ${getIngredients(meals[index])}
  <h2>Instructions: </h2>
  <p>${elem.strInstructions}</p>
  </div>`;
}

const populateRecipes = (data) => {
  let meals = data.meals;
  console.log(meals)
  if (meals !== null) {
    let clutter = "";
    meals.forEach((element,index) => {
      clutter += `<div class="recipe-card">
                             <div class="recipe-img">
                                 <img src="${element.strMealThumb}" alt="">
                             </div>
                             <div class="recipe-content">
                                <h2 class="recipe-name">${element.strMeal}</h2>
                                <p class="dishArea"><strong>${element.strArea}</strong> Dish</p>
                                <p class="dishCategory">Belongs to this <strong>${element.strCategory}</strong> Category</p>
                                 <button style="color:white !important;" type="submit" class="primary-btn viewRecipe" id=${index}>View Recipe</button>
                             </div>
                         </div>`;
    });
    recipeContainer.innerHTML = clutter;
    buttons = document.querySelectorAll(".viewRecipe")

    buttons.forEach(element => {
      element.addEventListener(("click"),(e)=> {
        getDetails(e,meals)
      })
    });

  }
  else {
      recipeContainer.innerHTML = ""
      recipeContainer.innerHTML = "<h2 class='info'>No Recipies Found!!!</h2>";
  }
};

const getRecipes = async (query) => {
  info.innerText = "Fetching Recipies...."
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    response = await response.json();
    populateRecipes(response);
    info.innerText = "Finding Recipies Wait....";
  } catch (error) {
    console.log(error);
  }
};

searchBTN.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = searchBar.value.trim();
  if (searchInput != "") {
    getRecipes(searchInput);
  } else {
    console.log("The Input is Empty!!!!");
  }
});

document.querySelector(".cross").addEventListener(("click"),()=>{
  recipeDetails.style.display = "none"
})
