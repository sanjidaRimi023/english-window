function getById(id) {
    return document.getElementById(id);
}
const btnLessonContainer = getById('btn-lesson');

const inputName = getById('name');
const inputPassword = getById('password');
const banner = getById("banner");
const navber = getById("navber");
function handleLogin() {
    if (!inputName.value.length) {
     return alert("input name is not correct");

    }
    if (!inputPassword.value.length || inputPassword.value !== "123456") {
       return alert("password wrong")
    }
    banner.classList.add('hidden')
    navber.classList.remove('hidden')
    
}

async function loadLesson() {
    const result = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const { data } = await result.json();

    if (!data || !Array.isArray(data)) {
        console.error("Invalid data format");
        return;
    }
    btnLessonContainer.innerHTML = data.map(button => `
        <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Learn- ${button.level_no}
        </button>
    `).join('');
}

loadLesson()