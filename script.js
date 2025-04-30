const placesData = {
  sports: [
    {
      name: "Skeittipuisto Purple Park",
      coords: [60.1557, 24.9381],
      description: "Loistava paikka skeittaukseen ja BMX-pyöräilyyn.",
      info: `
        🛹 Ponke's Park (tunnetaan myös nimellä Skeittipuisto) on moderni skeittipuisto Eirassa.
        📍 Osoite: Merisatamanranta 10, 00150 Helsinki.
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
        "images/urheilukeskus1.png",
        "images/urheilukeskus2.jpg"
      ]
    }
  ],
  food: [
    {
      name: "Ravintola Palace",
      address: "Eteläranta 10, 00130 Helsinki",
      coords: [60.1648, 24.9495],
      description: "Rooftop Bar in Helsinki.",
      telephone: "+358 9 1234567",
      webpage: "https://www.ravintolapalace.fi/",
      openingHours: "Ma-Pe 11-22, La 12-22, Su 12-20",
      images: [
        "images/palace.jpg"
      ]
    },
    {
      name: "Ravintola Brasa",
      address: "Aleksanterinkatu 22, 00170 Helsinki",
      coords: [60.173, 24.95],
      description: "Ravintola - Bar - Terassi.",
      telephone: "+358 9 6128 3000",
      webpage: "https://www.brasa.fi/",
      openingHours: "Ma-La 11-22, Su 12-20",
      images: [
        "images/Brasa.jpg"
      ]
    },
    {
      name: "Ravintola Emo",
      address: "Kasarmikatu 44, 00130 Helsinki",
      coords: [60.1634, 24.9481],
      description: "Modern European cuisine with Nordic influences.",
      telephone: "+358 9 6128 3000",
      webpage: "https://www.emo.fi/",
      openingHours: "Ma-La 11-22, Su fermé",
      images: [
        "images/emo.jpg"
      ]
    }
  ],
  culture: [
    {
      name: "Taidemuseo",
      coords: [60.18, 24.95],
      description: "Pysyvä taidenäyttely ja vaihtuvia näyttelyitä.",
      images: ["images/museum1.jpg"]
    }
  ]
};

let userLocation = [60.1711, 24.9427];
let map;
let currentMarkers = [];

window.onload = () => {
  map = L.map("map").setView(userLocation, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  L.marker(userLocation)
    .addTo(map)
    .bindPopup("<strong>Helsingin keskusta</strong>")
    .openPopup();

  document.querySelectorAll("button[data-category]").forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      showPlaces(category);
    });
  });
};

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function showPlaces(category) {
  document.getElementById("back-button").style.display = "inline-block";
  closePanel();

  currentMarkers.forEach(marker => map.removeLayer(marker));
  currentMarkers = [];

  const nearbyPlaces = placesData[category].filter(place =>
    getDistanceKm(userLocation[0], userLocation[1], place.coords[0], place.coords[1]) <= 15
  );

  nearbyPlaces.forEach(place => {
    const marker = L.marker(place.coords).addTo(map);
    marker.bindTooltip(`<strong>${place.name}</strong><br>${place.description}`, {
      permanent: true,
      direction: 'top',
      offset: [0, -15]
    });
    marker.on('click', () => showInfoPanel(place));
    currentMarkers.push(marker);
  });

  if (nearbyPlaces.length) {
    map.setView(nearbyPlaces[0].coords, 13);
    setTimeout(() => map.invalidateSize(), 300);
  }
}

function showInfoPanel(place) {
  const panel = document.getElementById("info-panel");
  const content = document.getElementById("info-content");

  let html = `<h2>${place.name}</h2><p><em>${place.description}</em></p>`;
  if (place.info) {
    html += `<p>${place.info}</p>`;
  }
  if (place.images) {
    html += place.images.map(img => `<img src="${img}" alt="${place.name}" />`).join("");
  }

  content.innerHTML = html;
  panel.classList.add("open");
}

// Функция для закрытия панели с информацией
function closePanel() {
  document.getElementById("info-panel").classList.remove("open");
}

// Назначаем действие кнопке закрытия
document.getElementById("close-panel-btn").addEventListener("click", closePanel);
