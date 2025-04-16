const placesData = {
  sports: [
    {
      name: "Skeittipuisto",
      description: "Loistava paikka skeittaukseen ja BMX-pyöräilyyn.",
      coords: [60.192059, 24.945831],
      images: ["images/skeittipuisto1.jpg", "images/skeittipuisto2.jpg"]
    },
    {
      name: "Urheilukeskus",
      description: "Koripallo, lentopallo ja muuta liikuntaa.",
      coords: [60.185, 24.95],
      images: ["images/urheilukeskus1.jpg", "images/urheilukeskus2.jpg"]
    }
  ],
  food: [
    {
      name: "Italialainen ravintola",
      description: "Pasta- ja pizzaherkkuja.",
      coords: [60.17, 24.94],
      images: ["images/italian1.jpg", "images/italian2.jpg"]
    },
    {
      name: "Kahvila ja jälkiruoat",
      description: "Taivas herkkusuille.",
      coords: [60.175, 24.93],
      images: ["images/cafe1.jpg", "images/cafe2.jpg"]
    }
  ],
  culture: [
    {
      name: "Taidemuseo",
      description: "Pysyvä taidenäyttely ja vaihtuvia näyttelyitä.",
      coords: [60.18, 24.95],
      images: ["images/museum1.jpg", "images/museum2.jpg"]
    },
    {
      name: "Teatteri",
      description: "Draamaa ja musiikkiesityksiä.",
      coords: [60.177, 24.96],
      images: ["images/theater1.jpg", "images/theater2.jpg"]
    }
  ]
};

let userLocation = null;
let map;
let currentMarkers = [];

navigator.geolocation.getCurrentPosition(
  position => {
    userLocation = [position.coords.latitude, position.coords.longitude];
    map = L.map("map").setView(userLocation, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(map);

    L.marker(userLocation).addTo(map).bindPopup("Olet tässä").openPopup();
  },
  error => {
    alert("Sijainnin hakeminen epäonnistui.");
  }
);

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
  if (!userLocation) {
    alert("Sijaintia ei ole saatu vielä.");
    return;
  }

  document.getElementById("back-button").style.display = "block";

  currentMarkers.forEach(marker => map.removeLayer(marker));
  currentMarkers = [];

  const places = placesData[category].filter(place => {
    return getDistanceKm(
      userLocation[0], userLocation[1],
      place.coords[0], place.coords[1]
    ) <= 15;
  });

  places.forEach(place => {
    const marker = L.marker(place.coords).addTo(map);
    marker.on("click", () => showInfoPanel(place));
    currentMarkers.push(marker);
  });

  if (places.length) {
    map.setView(places[0].coords, 13);
    setTimeout(() => map.invalidateSize(), 300);
  }
}

function showInfoPanel(place) {
  const panel = document.getElementById("info-panel");
  const content = document.getElementById("info-content");
  content.innerHTML = `
    <h2>${place.name}</h2>
    <p>${place.description}</p>
    ${place.images.map(img => `<img src="${img}" alt="${place.name}" />`).join("")}
  `;
  panel.classList.add("active");
}

function closePanel() {
  document.getElementById("info-panel").classList.remove("active");
}

function goBack() {
  currentMarkers.forEach(marker => map.removeLayer(marker));
  currentMarkers = [];
  document.getElementById("back-button").style.display = "none";
  closePanel();
}
