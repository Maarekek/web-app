const placesData = {
  sports: [
    {
      name: "Skeittipuisto Purple Park",
      coords: [60.1557, 24.9381],
      description: "Loistava paikka skeittaukseen ja BMX-pyöräilyyn.",
      info: `
          Ponke's Park on moderni skeittipuisto Eirassa.
         Osoite: Merisatamanranta 10, 00150 Helsinki.
        Skeittipuisto Purple Park on suosittu ulkoilupuisto skeittaajille ja BMX-harrastajille Helsingissä. 
        Puisto tarjoaa modernit rampit ja esteet kaiken tasoisille käyttäjille. 
        Se sijaitsee meren äärellä Eiranrannassa ja houkuttelee erityisesti nuoria liikkujia. 
        Alueella on myös oleskelutiloja ja hyvä näkyvyys turvallisuuden takaamiseksi. 
        Purple Park tunnetaan yhteisöllisestä ilmapiiristään ja urbaanista tunnelmastaan.
      `,
      images: [
        "images/sport/SKEITTIPUISTO/skeittipuisto1.png",
        "images/sport/SKEITTIPUISTO/skeittipuisto2.png",
        "images/sport/SKEITTIPUISTO/skeittipuisto3.png",
        "images/sport/SKEITTIPUISTO/skeittipuisto4.png"
      ]
    },
    
      {
        name: "Urhea Olympic Training Centre",
        coords: [60.199772986942136, 24.949613799999998],
        description: "Koripallo, lentopallo ja muuta liikuntaa.",
        info: `
          Urhea Olympic Training Centre on moderni huippu-urheilukeskus Kalliossa.
          Osoite: Mäkelänkatu 47, 00550 Helsink
        Urhea Olympiakoulutuskeskus on moderni urheilukeskus Helsingissä, joka tarjoaa huippuluokan valmennus- ja harjoitusmahdollisuuksia. 
        Keskus palvelee olympiaurheilijoita ja muita huippu-urheilijoita eri lajien valmennuksessa. 
        Tilat sisältävät mm. kuntosaleja, uintialtaan ja monipuoliset harjoitustilat. 
        Urhealla on myös edistykselliset urheilulääketieteelliset palvelut ja asiantunteva henkilökunta.
         Se on keskeinen osa Suomen urheilujärjestelmää ja tukee urheilijoiden kansainvälistä menestystä.`,
        images: [
          "images/sport/OLYMPIC/olympic1.png",
          "images/sport/OLYMPIC/olympic2.png",
          "images/sport/OLYMPIC/olympic3.png",
          "images/sport/OLYMPIC/olympic4.png",
          
        ]
      },
    ],
    food: [
      {
        name: "Ravintola Palace",
        coords: [60.1648, 24.9495],
        description: "Rooftop Bar in Helsinki.",
        info: `
          🍽️ Ravintola Palace on yksi Helsingin tunnetuimmista ravintoloista, joka tarjoaa upeita merinäköaloja ja herkullista ruokaa.
          📍 Osoite: Eteläranta 10, 00130 Helsinki.
        `,
        telephone: "+358 9 1234567",
        webpage: "https://www.ravintolapalace.fi/",
        openingHours: "Ma-Pe 11-22, La 12-22, Su 12-20",
        images: [
          "images/food/PALACE/palace1.png",
          "images/food/PALACE/palace2.png",
          "images/food/PALACE/palace3.png",
        ]
      },
      {
        name: "Ravintola Brasa",
        coords: [60.173, 24.95],
        description: "Ravintola - Bar - Terassi.",
        info : `
          🍽️ Ravintola Brasa on tunnettu ravintola Helsingissä, joka tarjoaa herkullista ruokaa ja rentoa tunnelmaa n/.
          📍 Osoite: Aleksanterinkatu 22, 00170 Helsinki.
        `,
        telephone: "+358 9 6128 3000",
        webpage: "https://www.brasa.fi/",
        openingHours: "Ma-La 11-22, Su 12-20",
        images: [
          "images/food/BRASA/brasa1.png",
          "images/food/BRASA/brasa2.png",
          "images/food/BRASA/brasa3.png",
          "images/food/BRASA/brasa4.png",
        ]
      },
      {
        name: "Ravintola Emo",
        coords: [60.1634, 24.9481],
        description: "Modern European cuisine with Nordic influences.",
        info: `
          🍽️ Ravintola Emo on moderni ravintola Helsingissä, joka tarjoaa herkullista eurooppalaista ruokaa pohjoismaisilla vaikutteilla.
          📍 Osoite: Kasarmikatu 44, 00130 Helsinki.
        `,
        telephone: "+358 9 6128 3000",
        webpage: "https://www.emo.fi/",
        openingHours: "Ma-La 11-22, Su fermé",
        images: [
          "images/Food/EMO/emo1.png",
          "images/Food/EMO/emo2.png",
          "images/Food/EMO/emo3.png",
        ]
      },
    ],
    culture: [
      {
        name: "Taidemuseo",
        coords: [60.18, 24.95],
        description: "Pysyvä taidenäyttely ja vaihtuvia näyttelyitä.",
        images: ["images/culture/Brasa1.jpg.png"]
      }
    ]
  };


// dalwe idet baza karti (no delete) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let userLocation = [60.1711, 24.9427];
let map;
let currentMarkers = [];

window.onload = () => {
  map = L.map("map").setView(userLocation, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

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

  const bounds = [];

  nearbyPlaces.forEach(place => {
    const marker = L.marker(place.coords).addTo(map);
    marker.bindTooltip(`<strong>${place.name}</strong><br>${place.description}`, {
      permanent: true,
      direction: 'top',
      offset: [0, -15]
    });
    marker.on('click', () => showInfoPanel(place));
    currentMarkers.push(marker);
    bounds.push(place.coords); // добавляем координаты для fitBounds
  });

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
    setTimeout(() => map.invalidateSize(), 300);
  }
}


function showInfoPanel(place) {
  const panel = document.getElementById("info-panel");
  const content = document.getElementById("info-content");

  // Если панель уже открыта, сначала закрыть её
  if (panel.classList.contains("open")) {
    panel.classList.remove("open");

    // Подождать окончания анимации (должно совпадать с CSS transition-duration)
    setTimeout(() => {
      updatePanelContent(place, content, panel);
    }, 300); // 300 мс как в transition
  } else {
    updatePanelContent(place, content, panel);
  }
}

function updatePanelContent(place, content, panel) {
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
// Флаг для отслеживания состояния панели (открыта или нет)
let isPanelOpen = false;

function updatePanelContent(place, content, panel) {
  let html = `<h2>${place.name}</h2><p><em>${place.description}</em></p>`;
  if (place.info) {
    html += `<p>${place.info}</p>`;
  }
  if (place.images) {
    html += place.images.map(img => `<img src="${img}" alt="${place.name}" />`).join("");
  }

  content.innerHTML = html;
  panel.classList.add("open");
  isPanelOpen = true; // Панель открыта
}

// Закрыть панель
function closePanel() {
  document.getElementById("info-panel").classList.remove("open");
  isPanelOpen = false; // Панель закрыта
}

// Обработчик кликов по документу
document.addEventListener("click", function (event) {
  const panel = document.getElementById("info-panel");
  const isClickInsidePanel = panel.contains(event.target);
  const isClickOnMarker = event.target.closest(".leaflet-marker-icon"); // Проверка клика по маркеру

  // Если панель открыта и клик был не по маркеру и не по панели, закрыть панель
  if (isPanelOpen && !isClickInsidePanel && !isClickOnMarker) {
    closePanel();
  }
});

// Обработчик кликов по маркерам
function showInfoPanel(place) {
  const panel = document.getElementById("info-panel");
  const content = document.getElementById("info-content");

  // Если панель уже открыта, сначала закроем её, а затем откроем снова с новым контентом
  if (panel.classList.contains("open")) {
    closePanel();
    setTimeout(() => {
      updatePanelContent(place, content, panel);
    }, 300); // Задержка для анимации закрытия
  } else {
    updatePanelContent(place, content, panel);
  }
}

// Пример того, как на маркеры добавляются обработчики
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



// Функция для закрытия панели с информацией
function closePanel() {
  document.getElementById("info-panel").classList.remove("open");
}

// Назначаем действие кнопке закрытия
document.getElementById("close-panel-btn").addEventListener("click", closePanel);
