function getById(id) {
    return document.getElementById(id);
}
const body = getById("body");
const my_modal_1 = getById("my_modal_1");
const cardContainer = getById("Card-container");
const btnLessonContainer = getById('btn-lesson');
const mainSection = getById("main");
const inputName = getById('name');
const inputPassword = getById('password');
const banner = getById("banner");
const navber = getById("navber");
const modalContent = getById('modal-content')

function handleLogin() {
    if (!inputName.value.length) {
        return alert("Please enter your name");
    }
    if (!inputPassword.value.length || inputPassword.value !== "123456") {
        return alert("Enter correct password");
    }
    banner.classList.add('hidden');
    navber.classList.remove('hidden');
    mainSection.classList.remove('hidden');
    Swal.fire({
        title: "Welcome to English Janala!",
        icon: "success",
        draggable: true
    });
}

async function loadLesson() {
    try {
        const result = await fetch("https://openapi.programming-hero.com/api/levels/all");
        const { data } = await result.json();
        if (!data || !Array.isArray(data)) return;
        btnLessonContainer.innerHTML = data.map(button => `
            <button onclick="lessonCard(${button.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Learn- ${button.level_no}
            </button>
        `).join('');
    } catch (error) {
        console.error("Failed to fetch lessons:", error);
    }
}

function lessonCard(id) {
    if (!id) return;
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(response => response.json())
        .then((data) => displayLesson(data.data, id))
        .catch(error => console.error("Error loading lesson:", error));
}

const displayLesson = (cards, id) => {
    if (!id) {
        cardContainer.classList.remove("grid", "grid-cols-3", "gap-5");
        return cardContainer.innerHTML = `
          <section class="container mx-auto flex flex-col justify-center text-center">
            <div class="bg-[#F8F8F8] rounded-md mt-5 p-10 items-center">
              <p class="hind-siliguri text-[#79716B] py-2 font-semibold">আপনি এখনো কোন Lesson Select করেন নি</p> 
              <p class="text-[#292524] text-3xl font-semibold text-center">একটি Lesson Select করুন।</p>
            </div>
          </section>`;
    }
    
    cardContainer.innerHTML = "";
    
    if (cards.length > 0) {
        cardContainer.classList.add("grid", "grid-cols-3", "gap-5");
        cards.forEach(card => {
            const cardLesson = document.createElement("div");
            cardLesson.innerHTML = `
                <div class="bg-base-100 rounded-lg p-6 shadow-sm">
                    <div class="text-center space-y-6 p-6">
                        <h2 class="text-3xl font-bold">${card.word}</h2>
                        <p class="text-lg">Meaning / Pronunciation</p>
                        <h1 class="text-lg font-medium text-[#18181B]">${card.meaning}</h1>
                    </div>
                    <div class="flex justify-between">
                        <button onclick="myModal(${card.level})">
                            <i class="fa-solid fa-circle-info bg-[#1a91ff1a] p-3 rounded-md"></i>
                        </button>
                        <button onclick="pronounceWord('${card.word}')">
                            <i class="fa-solid fa-volume-high bg-[#1a91ff1a] p-3 rounded-md"></i>
                        </button>
                    </div>
                </div>`;
            cardContainer.append(cardLesson);
        });
    } else {
        cardContainer.classList.remove("grid", "grid-cols-3", "gap-5");
        cardContainer.innerHTML = `
            <div class="w-full flex flex-col justify-center items-center text-center py-10">
                <img src="./assets/alert-error.png" alt="">
                <h2 class="text-lg font-medium">এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি।</h2>
                <h1 class="text-2xl font-semibold mt-2">পরবর্তী Lesson-এ যান।</h1>
            </div>`;
    }
}

const myModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    const { data } = await res.json()
    if (!my_modal_1) {
        console.error("Modal element not found");
        return;
    }
    modalContent.innerHTML = `
   <h3 id="modal-title" class="text-lg font-bold">${data?.word} ${data.pronunciation}</h3>
          <p id="modal-content" class="py-4"></p>

          <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
          
    `
    my_modal_1.showModal();
};
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
  }
displayLesson([]);
loadLesson();
