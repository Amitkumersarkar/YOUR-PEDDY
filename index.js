// fetch all categories
// create load All Pets
const loadAllPets = () => {

    // fetch data
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
        .catch(error => console.log(error))

}

// create an display pets data

const displayAllPets = (pets) => {

    // add data in html
    // console.log(pets);
    pets.forEach(item => {
        console.log(item);
        // create a btn
        
    })

}

// function call here
loadAllPets();
