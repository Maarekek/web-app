const placesData = {
  sports: [
    { name: 'Skeittipuisto', description: 'Erinomainen paikka skeittauksen ja BMX:n harrastajille.' },
    { name: 'Urheilukeskus', description: 'Täällä pidetään koripallon ja lentopallon kilpailuja.' }
  ],
  food: [
    { name: 'Italialainen ravintola', description: 'Parhaat pastat ja pizzat kaupungissa.' },
    { name: 'Kahvila, jossa on jälkiruokia', description: 'Täydellinen paikka makean ystäville.' }
  ],
  culture: [
    { name: 'Taidemuseo', description: 'Museo, jossa on pysyvä taidenäyttely suurten taiteilijoiden maalauksista.' },
    { name: 'Teatteri', description: 'Paikka nauttia draama- ja musiikkiesityksistä.' }
  ]
};

function showPlaces(category) {
  // Piilota kaikki välilehdet
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => {
    button.style.display = 'none';
  });

  // Näytä vain valittu välilehti ja paikkojen lista
  const placesList = document.getElementById('places-list');
  const placesListContainer = document.getElementById('places-list-container');
  placesList.innerHTML = ''; // Tyhjennä lista

  // Hae valitun kategorian tiedot
  const places = placesData[category];

  // Lisää jokainen paikka listalle
  places.forEach(place => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${place.name}</strong>: ${place.description}`;
    placesList.appendChild(li);
  });

  // Näytä otsikko "Paikat" ja lista
  placesListContainer.style.display = 'block';

  // Näytä "Takaisin"-nappi
  document.getElementById('back-button').style.display = 'block';
}

function goBack() {
  // Tyhjennä lista ja piilota "Takaisin"-nappi
  document.getElementById('places-list').innerHTML = '';
  document.getElementById('places-list-container').style.display = 'none';
  document.getElementById('back-button').style.display = 'none';

  // Näytä taas kaikki välilehdet
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => {
    button.style.display = 'inline-block';
  });
}
