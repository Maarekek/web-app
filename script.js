const placesData = {
    sports: [
      {
        name: 'Skeittipuisto',
        description: 'Erinomainen paikka skeittaukseen ja BMX:ään.',
        coords: [60.192059, 24.945831],
        images: ['images/skeittipuisto1.jpg', 'images/skeittipuisto2.jpg']
      },
      {
        name: 'Urheilukeskus',
        description: 'Koripallo ja lentopallo tapahtumia.',
        coords: [60.185, 24.95],
        images: ['images/urheilukeskus1.jpg', 'images/urheilukeskus2.jpg']
      }
    ],
    food: [
      {
        name: 'Italialainen ravintola',
        description: 'Parhaat pastat ja pizzat kaupungissa.',
        coords: [60.17, 24.94],
        images: ['images/italian1.jpg', 'images/italian2.jpg']
      },
      {
        name: 'Kahvila jälkiruoilla',
        description: 'Täydellinen paikka makean ystäville.',
        coords: [60.175, 24.93],
        images: ['images/cafe1.jpg', 'images/cafe2.jpg']
      }
    ],
    culture: [
      {
        name: 'Taidemuseo',
        description: 'Pysyvä näyttely taidemaalauksista.',
        coords: [60.18, 24.95],
        images: ['images/museum1.jpg', 'images/museum2.jpg']
      },
      {
        name: 'Teatteri',
        description: 'Draama- ja musiikkiesityksiä.',
        coords: [60.177, 24.96],
        images: ['images/theater1.jpg', 'images/theater2.jpg']
      }
    ]
  };
  
  const map = L.map('map').setView([60.1699, 24.9384], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);
  
  let currentMarkers = [];
  
  function showPlaces(category) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.style.display = 'none');
  
    const list = document.getElementById('places-list');
    const container = document.getElementById('places-list-container');
    const places = placesData[category];
  
    list.innerHTML = '';
    container.style.display = 'block';
    document.getElementById('back-button').style.display = 'inline-block';
    document.getElementById('map').style.display = 'block';
  
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
  
    places.forEach(place => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${place.name}</strong><br>${place.description}`;
      list.appendChild(li);
  
      let popupContent = `<strong>${place.name}</strong><br>${place.description}<br><br>`;
      place.images.forEach(img => {
        popupContent += `<img src="${img}" alt="${place.name}" style="width:100%; border-radius: 8px; margin-bottom: 10px;">`;
      });
  
      const marker = L.marker(place.coords).addTo(map)
        .bindPopup(popupContent);
      currentMarkers.push(marker);
    });
  
    if (places.length && places[0].coords) {
      map.setView(places[0].coords, 13);
      setTimeout(() => map.invalidateSize(), 300);
    }
  }
  
  function goBack() {
    document.getElementById('places-list').innerHTML = '';
    document.getElementById('places-list-container').style.display = 'none';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('map').style.display = 'none';
  
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
  
    document.querySelectorAll('.tab-button').forEach(btn => btn.style.display = 'inline-block');
  }
  