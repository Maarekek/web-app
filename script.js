const placesData = {
  sports: [
    { name: 'Парк для скейтбординга', description: 'Отличное место для любителей скейтбординга и BMX.' },
    { name: 'Спортивный комплекс', description: 'Здесь проходят соревнования по баскетболу и волейболу.' }
  ],
  food: [
    { name: 'Ресторан итальянской кухни', description: 'Лучшие пасты и пиццы в городе.' },
    { name: 'Кафе с десертами', description: 'Идеально для тех, кто любит сладкое.' }
  ],
  culture: [
    { name: 'Музей искусств', description: 'Музей с постоянной экспозицией картин великих художников.' },
    { name: 'Театр', description: 'Место для наслаждения драматическими и музыкальными постановками.' }
  ]
};

function showPlaces(category) {
  // Скрыть все вкладки
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => {
    button.style.display = 'none';
  });

  // Показать только выбранную вкладку и список мест
  const placesList = document.getElementById('places-list');
  const placesListContainer = document.getElementById('places-list-container');
  placesList.innerHTML = ''; // Очистить список

  // Получаем данные для выбранной категории
  const places = placesData[category];

  // Добавляем каждый элемент в список
  places.forEach(place => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${place.name}</strong>: ${place.description}`;
    placesList.appendChild(li);
  });

  // Показываем заголовок "Места" и список
  placesListContainer.style.display = 'block';

  // Показываем кнопку "Назад"
  document.getElementById('back-button').style.display = 'block';
}

function goBack() {
  // Очистить список и скрыть кнопку "Назад"
  document.getElementById('places-list').innerHTML = '';
  document.getElementById('places-list-container').style.display = 'none';
  document.getElementById('back-button').style.display = 'none';

  // Показать снова все вкладки
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => {
    button.style.display = 'inline-block';
  });
}
