const supabaseUrl = 'https://eafocwqwzdtlkrowsmrn.supabase.co';  // URL вашего проекта
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZm9jd3F3emR0bGtyb3dzbXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTU1MDgsImV4cCI6MjA2Mjc5MTUwOH0.3AmP7DoVxFesUByXK-q_PUlsRgexRRciou6qI7B3C4w';  // Публичный анонимный ключ

// Регистрация
async function signUp(email, password, name, age) {
  const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password
  });

  if (error) {
      console.error("Ошибка регистрации: ", error.message);
      return;
  }

  const { data, error: profileError } = await supabase
      .from('user_profiles')
      .insert([
          {
              user_id: user.id,
              name: name,
              age: age
          }
      ]);

  if (profileError) {
      console.error("Ошибка при добавлении профиля: ", profileError.message);
  } else {
      console.log("Профиль добавлен: ", data);
      window.location.href = 'dashboard.html';  // Перенаправление на страницу после успешной регистрации
  }
}

// Вход
async function signIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
  });

  if (error) {
      console.error("Ошибка входа: ", error.message);
      return;
  }

  console.log("Пользователь вошел: ", user);
  window.location.href = 'dashboard.html';  // Перенаправление на страницу после успешного входа
}

// Обработчик для кнопки регистрации
const signUpBtn = document.getElementById('sign-up-btn');
if (signUpBtn) {
  signUpBtn.addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;

      signUp(email, password, name, age);
  });
}

// Обработчик для кнопки входа
const signInBtn = document.getElementById('sign-in-btn');
if (signInBtn) {
  signInBtn.addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      signIn(email, password);
  });
}
