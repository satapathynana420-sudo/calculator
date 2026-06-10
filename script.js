const form = document.getElementById("form")
const btn = document.getElementById("btn")
const inp = document.getElementById("inp")
const recipeContainer = document.querySelector(".recipe-container")
const recipeDetailsContent=document.querySelector(".recipe-details-content")
const recipeClosebtn=document.querySelector(".recipe-close-btn")
const cross=document.querySelector("#cross")



//fetch function
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>fetching recipies...</h2>"
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const res = await data.json()

    recipeContainer.innerHTML = ''
    res.meals.forEach(meal => {
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="" />
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span>Dish</p>
        <p>Belongs to<span>${meal.strCategory}</span>category</p>

        `
        const button = document.createElement('button')
        button.innerText = "view Recipe"
        recipeDiv.appendChild(button)


        //adding eventlistener to button
        button.addEventListener('click', () => {
            openRecipePopup(meal)
        })

        recipeContainer.appendChild(recipeDiv);


        console.log(meal)
    });

    } catch (error) {
         recipeContainer.innerHTML = `<h2>Error in fetching recipies...</h2>`
    }


}



btn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchInput = inp.value.trim()
    if (!searchInput) {
        recipeContainer.innerHTML=`<h2>Type a meal in searchbox</h2>`
        return;
    }
    fetchRecipes(searchInput)
})

//fetch ingridients

const fetchIngridients=(meal)=>{
    let ingridientList=""
    for (let i = 1; i <=20; i++) {
        const ingridient=meal[`strIngredient${i}`]
        if (ingridient) {
            const measure=meal[`strMeasure${i}`]
            ingridientList += `<li>${measure} ${ingridient}</li>`
        }
        else{
            break;
        }
      
    }
    return ingridientList;
}

const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=
    `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingridients:</h3>
    <ul class="ingredientList">${fetchIngridients(meal)}</ul>
    <div class="instructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display ="block"
}

cross.addEventListener('click',()=>{
 recipeDetailsContent.parentElement.style.display ="none"
})
