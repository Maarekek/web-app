const placesData = {
    sports: [
      "Парк для активных видов спорта",
      "Спортивный комплекс 'Звезда'",
      "Городской велотрек",
      "Фитнес-клуб 'Power'",
      "Боулинг-центр",
      "Скалодром 'Высота'",
      "Площадка для мини-футбола",
      "Теннисный клуб",
      "Городской бассейн",
      "Прокат роликов и скейтбордов"
    ],
    culture: [
      "Государственная художественная галерея",
      "Музей истории города",
      "Театр 'Сцена'",
      "Концертный зал",
      "Исторический центр",
      "Выставочный зал 'Творчество'",
      "Оперный театр",
      "Кинотеатр 'Ретро'",
      "Галерея современного искусства",
      "Культурный центр 'Палитра'"
    ],
    food: [
      "Ресторан 'Гурман'",
      "Кафе 'Уют'",
      "Бистро 'Гриль'",
      "Пекарня 'Лавка хлеба'",
      "Ресторан с панорамным видом",
      "Кафе-кондитерская 'Сладкая жизнь'",
      "Суши-бар 'Морской уголок'",
      "Бургерная 'Вкусно и точка'",
      "Вегетарианский ресторан 'Зелёная поляна'",
      "Кофейня 'Ароматный момент'"
    ]
  };
  
  // Функция для отображения вкладок
  function showPlaces(category) {
    const tabs = document.getElementById('tabs');
    const content = document.getElementById('content');
    const placesList = document.getElementById('places-list');
    const backButton = document.getElementById('back-button');
  
    // Скрыть вкладки
    tabs.style.display = 'none';
  
    // Показать кнопку "Назад"
    backButton.style.display = 'inline-block';
  
    // Очистить предыдущий список мест
    placesList.innerHTML = '';
  
    // Получить места по категории
    const places = placesData[category];
  
    // Создать элементы списка для отображения
    places.forEach(place => {
      const listItem = document.createElement('li');
      listItem.textContent = place;
      placesList.appendChild(listItem);
    });
  
    // Показать контент с местами
    content.style.display = 'block';
  }
  
  // Функция для возврата назад
  function goBack() {
    const tabs = document.getElementById('tabs');
    const content = document.getElementById('content');
    const backButton = document.getElementById('back-button');
    const placesList = document.getElementById('places-list');
  
    // Показать вкладки
    tabs.style.display = 'block';
  
    // Скрыть кнопку "Назад"
    backButton.style.display = 'none';
  
    // Очистить список мест
    placesList.innerHTML = '';
  
    // Скрыть контент с местами
    content.style.display = 'none';
  }
  
  // Показать начальный список мест (например, спортивные места) по умолчанию
  window.onload = () => showPlaces('sports');
  
