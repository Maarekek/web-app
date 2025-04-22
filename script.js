const placesData = {
  sports: [
    {
      name: "Skeittipuisto Purple Park",
      coords: [60.155687788123835, 24.93813230525286],
      description: "Loistava paikka skeittaukseen ja BMX-pyöräilyyn.",
      info: `
Ponke's Park (tunnetaan myös nimellä Skeittipuisto) on moderni skeittipuisto, joka sijaitsee Helsingin Eiran alueella, Merisatamanranta 10:ssä. Se avattiin uudistettuna heinäkuussa 2023, ja siitä on tullut suosittu paikka skeittareille, scootereille ja muille aktiivisille ulkoilmaurheilijoille.

🛹 Puiston ominaisuudet:
• Suunnittelu ja infrastruktuuri: Puisto on kunnostettu paikallisten skeittareiden toiveiden mukaisesti.  
• Sijainti: Merinäköala, lähellä Sibelius-puistoa ja Meripuistoa.  
• Yhteisö ja tuki: Paikalliset yrittäjät, kuten Makia, tukevat skeittauksen kulttuuria.

📍 Kuinka päästä perille:
Osoite: Merisatamanranta 10, 00150 Helsinki.  
Julka: bussilla, raitiovaunulla tai kävellen nauttien merinäköalasta.
      `,
      images: [
        "images/sport/skeittipuisto1.png",
        "images/sport/skeittipuisto2.png",
        "images/sport/skeittipuisto3.png",
        "images/sport/skeittipuisto4.png"
      ]
    },
    {
      name: "Urheilukeskus",
      coords: [60.185, 24.95],
      description: "Koripallo, lentopallo ja muuta liikuntaa.",
      images: [
        "images/urheilukeskus1.jpg",
        "images/urheilukeskus2.jpg"
      ]
    }
  ],
  food: [
    {
      name: "Italialainen ravintola",
      coords: [60.17, 24.94],
      description: "Pasta- ja pizzaherkkuja.",
      images: [
        "images/italian1.jpg",
        "images/italian2.jpg"
      ]
    },
    {
      name: "Kahvila ja jälkiruoat",
      coords: [60.175, 24.93],
      description: "Taivas herkkusuille.",
      images: [
        "images/cafe1.jpg",
        "images/cafe2.jpg"
      ]
    }
  ],
  culture: [
    {
      name: "Taidemuseo",
      coords: [60.18, 24.95],
      description: "Pysyvä taidenäyttely ja vaihtuvia näyttelyitä.",
      images: [
        "images/museum1.jpg",
        "images/museum2.jpg"
      ]
    },
    {
      name: "Teatteri",
      coords: [60.177, 24.96],
      description: "Draamaa ja musiikkiesityksiä.",
      images: [
        "images/theater1.jpg",
        "images/theater2.jpg"
      ]
    }
  ]
};

let userLocation = [60.171146471348436, 24.942693953733244];
let map;
let currentMarkers = [];

window.onload = () => {
  map = L.map("map").setView(userLocation, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  L.marker(userLocation)
    .addTo(map)
    .bindPopup("Helsingin keskusta")
    .openPopup();
};

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function showPlaces(category) {
  document.getElementById("back-button").style.display = "inline-block";
  closePanel();

  // Удаляем старые маркеры
  currentMarkers.forEach(marker => map.removeLayer(marker));
  currentMarkers = [];

  // Фильтруем места по радиусу 15 км
  const nearbyPlaces = placesData[category].filter(place =>
    getDistanceKm(
      userLocation[0], userLocation[1],
      place.coords[0], place.coords[1]
    ) <= 15
  );

  // Добавляем маркеры с подсказками
  nearbyPlaces.forEach(place => {
    const marker = L.marker(place.coords).addTo(map);
    marker.bindTooltip(`
      <strong>${place.name}</strong><br>
      ${place.description}
    `, { permanent: true, direction: 'top', offset: [0, -15] });

    // Открываем информационную панель при клике на маркер
    marker.on('click', () => showInfoPanel(place));

    currentMarkers.push(marker);
  });

  // Переходим к первому маркеру
  if (nearbyPlaces.length) {
    map.setView(nearbyPlaces[0].coords, 13);
    setTimeout(() => map.invalidateSize(), 300);
  }
}

function showInfoPanel(place) {
  const panel = document.getElementById("info-panel");
  const content = document.getElementById("info-content");

  let html = `
    <h2>${place.name}</h2>
    <p><em>${place.description}</em></p>
  `;

  if (place.info) {
    html += `<div class="info-text">${place.info.trim()}</div>`;
  }

  html += place.images.map(img =>
    `<img src="${img}" alt="${place.name}" />`
  ).join("");

  content.innerHTML = html;
  panel.classList.add("open");
}

function closePanel() {
  document.getElementById("info-panel").classList.remove("open");
}

function goBack() {
  currentMarkers.forEach(marker => map.removeLayer(marker));
  currentMarkers = [];
  document.getElementById("back-button").style.display = "none";
  closePanel();
}
