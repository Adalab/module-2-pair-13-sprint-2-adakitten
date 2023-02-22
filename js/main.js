'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race')
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');

const inputSearchRace = document.querySelector('.js-input-search-race');

//Objetos con cada gatito
// const kittenData_1 = {
//     image: "https://dev.adalab.es/gato-siames.webp",
//     name: "Anastacio",
//     desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
//     race: "Siamés",
// };
// const kittenData_2 = {
//     image: "https://dev.adalab.es/sphynx-gato.webp",
//     name: "Fiona",
//     desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
//     race: "Sphynx",
// };
// const kittenData_3 = {
//     image: "https://dev.adalab.es/maine-coon-cat.webp",
//     name: "Cielo",
//     desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
//     race: "Maine Coon",
// };

// const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];
let kittenDataList = [];
const GITHUB_USER = 'celsrami';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

function getinfoKitten() {
    if (kittenListStored) {
        kittenDataList = kittenListStored;
        renderKittenList(kittenDataList);
    } else {
        fetch(SERVER_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json())
            .then((data) => {
                kittenDataList = data.results;
                console.log(kittenDataList)
                localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
                renderKittenList(kittenDataList);
            })
    }

}
getinfoKitten();

//Completa el código;

//Funciones
function renderKitten(kittenData) {
    const liElement = document.createElement('li');
    liElement.classList.add('card');

    const articleElement = document.createElement('article');
    const imgElement = document.createElement('img');
    const h3ElementName = document.createElement('h3');
    const h3ElementRace = document.createElement('h3');
    const pElement = document.createElement('p');

    imgElement.setAttribute("src", `${kittenData.image}`);
    imgElement.setAttribute("class", "card_img");
    imgElement.setAttribute("alt", "gatito");

    const h3ContentName = document.createTextNode(kittenData.name);
    const h3ContentRace = document.createTextNode(kittenData.race);
    const pContent = document.createTextNode(kittenData.desc);


    h3ElementName.appendChild(h3ContentName);
    h3ElementRace.appendChild(h3ContentRace);
    pElement.appendChild(pContent);

    h3ElementName.setAttribute("class", "card_title");
    h3ElementRace.setAttribute("class", "card_race");
    pElement.setAttribute("class", "card_description");


    articleElement.append(imgElement, h3ElementName, h3ElementRace, pElement);
    // articleElement.appendChild(h3ElementName);
    // articleElement.appendChild(h3ElementRace);
    // articleElement.appendChild(pElement);

    console.log(articleElement);
    liElement.appendChild(articleElement);

    return liElement;
}

function renderKittenList(listado) {
    listElement.innerHTML = "";
    for (const kittenItem of listado) {
        listElement.appendChild(renderKitten(kittenItem));
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}


function resetValue() {
    inputDesc.value = '';
    inputPhoto.value = '';
    inputName.value = '';
    inputRace.value = '';
}



//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    if (valueDesc === "" || valuePhoto === "" || valueName === "") {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    } else {
        if (valueDesc !== "" || valuePhoto !== "" || valueName !== "") {
            labelMessageError.innerHTML = "Mola! Un nuevo gatito en Adalab";
        }
    }
    const newKittenDataObject = {
        image: valuePhoto,
        name: valueName,
        desc: valueDesc,
        race: valueRace,
    };

    fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKittenDataObject),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                //Completa y/o modifica el código:
                //Agrega el nuevo gatito al listado  
                kittenDataList.push(newKittenDataObject);
                //Guarda el listado actualizado en el local stoarge
                localStorage.setItem('listkitten', JSON, stringify(kittenDataList));
                //Visualiza nuevamente el listado de gatitos   

                renderKittenList(kittenDataList);
                //Limpia los valores de cada input
                resetValue()

            } else {
                //muestra un mensaje de error.
            }
        });





    fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKittenDataObject),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                kittenDataList.push(newKittenDataObject);
                localStorage.setItem('kittensList', JSON.stringify(newKittenDataObject));
                renderKittenList(kittenDataList);
                resetValue()
            } else {
                labelMessageError.innerHTML = "no"
            }
        });

}



//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value.toLowerCase();
    const raceSearchValue = inputSearchRace.value.toLowerCase();
    listElement.innerHTML = "";
    console.log(raceSearchValue);

    const filterKitten = kittenDataList
        .filter((kitten) => kitten.desc.toLowerCase().includes(descrSearchText))
        .filter((kitten) => kitten.race.toLowerCase().includes(raceSearchValue));
    renderKittenList(filterKitten);
}

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);