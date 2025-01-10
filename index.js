const loadingImage = document.getElementById('loadingImage')
const cardContainer = document.getElementById('card-container')
const loadAllPets = async () => {
    loadingImage.classList.remove('hidden')
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    loadingImage.classList.add('hidden')
    displayPets(data.pets)
}
const displayPets = (pets) => {
    cardContainer.innerHTML = ''
    if (pets.length === 0) {
        cardContainer.innerHTML = `
        <div class="flex items-center justify-center flex-col text-center col-span-3">
                            <img src="./images/error.webp" alt="">
                            <h1 class="text-3xl font-bold">No Information Available!!</h1>
                            <p class="w-2/3 mx-auto mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
                        </div>
        `
        return;
    }
    pets.forEach(pet => {
        const { petId, breed, category, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = pet
        const div = document.createElement('div')
        div.classList.add('card', 'bg-base-100', 'border', 'md:p-4', 'hover:shadow-xl')
        div.innerHTML = `
            <figure class="">
                <img src=${pet?.image ? pet?.image : "Not Available"}
                    alt="Shoes" class="rounded-xl w-full" />
            </figure>
            <div class="card-body gap-1 text-gray-600 font-semibold p-4">
                <h1 class="text-xl font-extrabold">${pet?.pet_name ? pet?.pet_name : "Not Available"}</h1>
                <p class="flex gap-2"><span><i class="fa-solid fa-th-large"></i></span>Breed: ${pet?.breed ? pet?.breed : "Not Available"}</p>
                <p class="flex gap-2"><span><i class="fa-solid fa-calendar-days"></i></span>Birth: ${pet?.date_of_birth ? pet?.date_of_birth : "Not Available"}</p>
                <p class="flex gap-2"><span>${pet?.gender === 'Female' ? '<i class="fa-solid fa-venus"></i>' : '<i class="fa-solid fa-mars"></i>'}</span>Gender: ${pet?.gender ? pet?.gender : "Not Available"}</p>
                <p class="flex gap-2"><span><i class="fa-solid fa-dollar-sign"></i></span>Price: ${pet?.price ? pet?.price : "Not Available"}$</p >
            </div >
    <hr class="py-2">
        <div class="flex items-center justify-between">
            <button onclick="handleLikePet('${image}')" class="btn">
                <i class="fa-solid fa-thumbs-up"></i>
            </button>
            <button id="adoptCount${petId}" onclick="handleCountModal('${petId}')" class="text-[#0E7A81] bg-transparent border btn ">Adopt</button>
            <button onclick="petDetails(${petId})" class="text-[#0E7A81] bg-transparent border btn">Details</button>
        </div>
        `
        cardContainer.appendChild(div)

    });
}
const handleLikePet = (img) => {
    const pitLikeOutput = document.getElementById('pitLikeOutput')
    document.getElementById('hiddenPetTitle').classList.add('hidden')
    pitLikeOutput.innerHTML += `
        <img class="w-[150px] h-[100px] object-cover rounded-lg" src=${img} alt="">
            `
}
const handleCountModal = (id) => {
    let countNumber = 3
    const interval = setInterval(() => {
        countNumber = countNumber - 1
        if (countNumber < 1) {
            clearInterval(interval)
            const adoptId = document.getElementById(`adoptCount${id}`)
            adoptId.setAttribute('disabled', true)
            adoptId.innerHTML = 'Adopted'
            countDown.close()
            return
        }
        document.getElementById('count-number').innerText = countNumber;
    }, 1000);
    const countDownContainer = document.getElementById('countDownContainer')
    countDownContainer.innerHTML = `
     <dialog id="countDown" class="modal">
            <div class="modal-box">
                <div class="text-center flex flex-col items-center justify-center">
                    <h1 class="text-4xl font-bold">Congratulation..!!</h1>
                    <h1 class="text-xl my-5">Please Wait ,Your Adoption Process of Pets will start soon..!</h1>
                    <p id="count-number" class="text-7xl font-bold">${countNumber}</p>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn hidden">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    `
    countDown.showModal()
}

const loaCategoryBtn = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json()
    const categories = data.categories;
    const categoriesBtnContainer = document.getElementById('categories-btn-container')
    categories.forEach(categoryItem => {
        const { id, category, category_icon } = categoryItem
        const div = document.createElement('div')
        div.innerHTML = `
            <button id="${category}" onclick="handleCategoryBtn('${category}')"
                class="categoryBtn flex items-center justify-center border rounded-full px-10 py-3 md:gap-5 gap-2">
                <img class="w-10 h-10 object-cover" src=${category_icon} alt="">
                    <span class="text-xl font-semibold">${category}</span>
            </button>
            `
        categoriesBtnContainer.appendChild(div)
    });
}

const handleCategoryBtn = async (name) => {
    loadingImage.classList.remove('hidden')
    cardContainer.innerHTML = ''
    const categoryBtn = document.getElementsByClassName('categoryBtn')
    for (const category of categoryBtn) {
        category.classList.remove('active-btn')
    }
    const getPetId = document.getElementById(`${name}`)
    getPetId.classList.add('active-btn')
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
    const data = await res.json()
    loadingImage.classList.add('hidden')
    displayPets(data.data)
}

loaCategoryBtn()
loadingImage.classList.remove('hidden')
loadAllPets()

// sort by price section 
const handleSort = async () => {
    loadingImage.classList.remove('hidden')
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    loadingImage.classList.add('hidden');
    const sort = data.pets.sort(function (a, b) { return b.price - a.price })
    displayPets(sort)
}