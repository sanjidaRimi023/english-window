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
const modalContent = getById('modal-content');

const showloader = () => {
    document.getElementById("loader").classList.remove("hidden");
    cardContainer.classList.add("hidden")
}
const hideloader = () => {
    document.getElementById("loader").classList.add("hidden");
    cardContainer.classList.remove("hidden")
}
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
            <button id="btn-${button.id}" onclick="lessonCard(${button.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Learn- ${button.level_no}
            </button>
        `).join('');
    } catch (error) {
        console.error("Failed to fetch lessons:", error);
    }
}


function lessonCard(id) {
    showloader();
    if (!id) return;
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(response => response.json())
        .then((data) => {
            const clickbtn = document.getElementById(`btn-${id}`)
            console.log(clickbtn);
            displayLesson(data.data, id)
        })
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
            <div class="bg-base-100 rounded-lg p-6 shadow-sm ">
                <div class="rounded-md p-5 hover:bg-blue-100">
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
                </div>

            </div>
            
            `;
            cardContainer.append(cardLesson);
        });
        hideloader()
    } else {
        cardContainer.classList.remove("grid", "grid-cols-3", "gap-5");
        cardContainer.innerHTML = `
            <div class="w-full flex flex-col justify-center items-center text-center py-10">
                <img src="./assets/alert-error.png" alt="">
                <h2 class="text-lg font-medium">এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি।</h2>
                <h1 class="text-2xl font-semibold mt-2">পরবর্তী Lesson-এ যান।</h1>
            </div>`;
    }
    hideloader()
}

const myModal = async (id) => {
    console.log(id);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
        console.log(res);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const { data } = await res.json();

        const { word, pronunciation, meaning, sentence, synonyms } = data;

        if (!my_modal_1) {
            console.error("Modal element not found");
            return;
        }
        const modalContent = document.createElement('div');
        modalContent.innerHTML = `
            <div class="modal-box w-full hover:bg-slate-50">
                <h3 class="text-2xl font-bold text-left">${word} 
                    (<i class="fa-solid fa-microphone-lines"></i>: ${pronunciation})</h3>
                <h3 class="text-xm font-bold text-left pt-4">Meaning <br> 
                    <span class="font-light">${meaning ? meaning : "অর্থ পাওয়া যায়নি"}</span></h3>
                <h3 class="text-xm font-bold text-left pt-4">Example <br> 
                    <span class="font-light">${sentence ? sentence : "বাক্য পাওয়া যায়নি"}</span></h3>
                <h3 class="text-xm font-bold text-left pt-4">সমার্থক শব্দ গুলো <br> 
                    <span class="font-light">${synonyms ? synonyms : "সমার্থক শব্দ পাওয়া যায়নি"}</span></h3>
                <div class="modal-action flex justify-start">
                    <form method="dialog">
                        <button class="btn w-full text-[#422AD5] border-[#422AD5] hover:bg-[#422AD5] hover:text-white">
                            Complete Learning
                        </button>
                    </form>
                </div>
            </div>
        `;
        my_modal_1.innerHTML = '';
        my_modal_1.append(modalContent);

        if (my_modal_1 instanceof HTMLDialogElement) {
            my_modal_1.showModal();
        } else {
            console.error("my_modal_1 is not a valid modal element");
        }
    } catch (error) {
        console.error("Error fetching word data:", error);
    }
};

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN';
    window.speechSynthesis.speak(utterance);
  }
displayLesson([]);
loadLesson();
