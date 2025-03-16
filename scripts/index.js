function getById(id) {
    return document.getElementById(id);
}
const cardContainer = getById("Card-container");
const btnLessonContainer = getById('btn-lesson');
const mainSection = getById("main");
const inputName = getById('name');
const inputPassword = getById('password');
const banner = getById("banner");
const navber = getById("navber");
function handleLogin() {
    if (!inputName.value.length) {
        return alert("Please enter your name");

    }
    if (!inputPassword.value.length || inputPassword.value !== "123456") {
        return alert("Enter correct password")
    }
    banner.classList.add('hidden')
    navber.classList.remove('hidden')
    mainSection.classList.remove('hidden')
    Swal.fire({
        title: "Drag me!",
        icon: "success",
        draggable: true
    });
}

async function loadLesson() {
    const result = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const { data } = await result.json();

    if (!data || !Array.isArray(data)) {
        console.error("Invalid data format");
        return;
    }
    btnLessonContainer.innerHTML = data.map(button => `
        <button onclick="lessonCard(${button.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Learn- ${button.level_no}
        </button>
    `).join('');
}
function lessonCard(id) {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(Response => Response.json())
        .then((data) => displayLesson(data.data,id))
    // .then(data=>console.log(data.data))
}
const displayLesson = (cards, id) => {
    // console.log(cards.length);
    if (!id) {
        return cardContainer.innerHTML = `
          <section class="container mx-auto">
        <div
          class="bg-[#F8F8F8] rounded-md mt-5 flex flex-col items-center p-20">
          <h1 class="hind-siliguri text-[#79716B] py-2 font-semibold">
            আপনি এখনো কোন Lesson Select করেন নি
          </h1>
          <h1 class="text-[#292524] text-3xl font-semibold">
            একটি Lesson Select করুন।
          </h1>
        </div>
      </section>  
            `
    }
    cardContainer.innerHTML = "";

    cards.length>0?
        cards.forEach(card => {
            console.log(card);
            const cardLesson = document.createElement("div");
            cardLesson.innerHTML = `
         <div class="bg-base-100 rounded-lg p-6 shadow-sm">
            <div class="text-center space-y-6 p-6">
              <h2 class="text-3xl font-bold">${card.word}</h2>
              <p class="text-lg">Meaning /Pronounciation</p>
              <h1 class="text-lg font-medium text-[#18181B]">${card.meaning}</h1>
            </div>
            <div class="flex justify-between">
              
<label for="my_modal_${id}"><i class="fa-solid fa-circle-info bg-[#1a91ff1a] p-3 rounded-md"></i></label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my_modal_${id}" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">This modal works with a hidden checkbox!</p>
    <div class="modal-action">
      <label for="my_modal_${id}" class="btn">Close!</label>
    </div>
  </div>
</div>
              <button><i class="fa-solid fa-volume-high bg-[#1a91ff1a] p-3 rounded-md"></i></button>
            </div>
          </div>
        `
            cardContainer.append(cardLesson)
        }) : cardContainer.innerHTML = `
         <div class="w-full flex flex-col justify-center items-center text-center py-10">
                    <img src="./assets/alert-error.png" alt="">
                  <h2 class="text-lg font-medium">
                    এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি।
                  </h2>
                  <h1 class="text-2xl font-semibold mt-2">
                    পরবর্তী Lesson-এ যান।
                  </h1>
                </div>
       

        `
    
}

displayLesson([])
loadLesson()
