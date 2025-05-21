// Инициализация Supabase
const supabaseUrl = 'https://eafocwqwzdtlkrowsmrn.supabase.co'; // URL вашего проекта
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZm9jd3F3emR0bGtyb3dzbXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTU1MDgsImV4cCI6MjA2Mjc5MTUwOH0.3AmP7DoVxFesUByXK-q_PUlsRgexRRciou6qI7B3C4w'; // Публичный анонимный ключ

// Инициализация клиента Supabase
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Функция для регистрации пользователя
async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Проверка на пустые поля
  if (!email || !password) {
    alert("Sähköposti ja salasana ovat pakollisia!");
    return;
  }

  // Регистрация пользователя через Supabase
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  // Обработка ошибок
  if (error) {
    console.error("Virhe rekisteröinnissä: ", error.message);
    alert("Virhe rekisteröinnissä: " + error.message);
    return;
  }

  // Сообщение об успешной регистрации
  console.log("Rekisteröinti onnistui: ", user);
  alert("Rekisteröinti onnistui! Tarkista sähköpostisi tilin vahvistamiseksi.");

  // Перенаправление на страницу входа
  window.location.href = 'sign-in.html';
}

// Добавление обработчика событий для кнопки регистрации
document.getElementById('sign-up-button').addEventListener('click', signUp);
