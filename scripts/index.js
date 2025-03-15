/**
 * function loadCategories() {
  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then(res => res.json())
    // send data to displayCategories
    .then(data => displayCategories(data.categories))
    .catch(error => console.error("error fetching categories", error)
    )
}

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");
  // loop operation arr of obj
  for (let cat of categories) {
    // console.log(cat);
    // create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
    // append the element
    categoryContainer.append(categoryDiv)
  }
}
 */
function loadLesson() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(Response => Response.json())
        .then(data => displayLesson(data))
}
function displayLesson(lessons) {
    const lessonContainer = document.getElementById("lesson-container");
    for (const lesson of lessons) {
        console.log(lesson);
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
        

        `
    }
}



loadLesson()
displayLesson()