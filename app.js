// movies loaded from movies.js

    function renderMovies() {
      const rowUssr = document.getElementById('row-ussr');
      const rowRocky = document.getElementById('row-rocky');
      const rowWest = document.getElementById('row-west');
      movies.forEach((m, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openMovie(i);
        card.innerHTML = `
          <img src="${m.thumb}" alt="${m.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="card-fail" style="display:none;">
            <div class="code">404</div>
            <div>Не загрузилось</div>
          </div>
          <div class="card-title">${m.title}</div>
          <div class="card-meta">Смотреть</div>
        `;
        if (m.cat === 'ussr') rowUssr.appendChild(card);
        else if (m.cat === 'rocky') rowRocky.appendChild(card);
        else rowWest.appendChild(card);
      });
    }

    function openMovie(index) {
      const m = movies[index];
      document.getElementById('modal-title').textContent = m.title;
      document.getElementById('modal-desc').textContent = m.desc;
      
      const fallback = document.getElementById('player-fallback');
      const player = document.getElementById('player');
      
      fallback.classList.remove('hidden');
      fallback.innerHTML = '<div class="fallback-code" style="font-size:28px;color:#aaa">…</div><div class="fallback-text">Загрузка</div><div class="fallback-sub">Подождите пожалуйста…</div>';
      
      player.src = 'https://www.youtube.com/embed/' + m.yt + '?autoplay=1&rel=0';
      
      clearTimeout(window._playerTimer);
      window._playerTimer = setTimeout(function() {
        fallback.classList.add('hidden');
      }, 2000);
      
      player.onerror = function() {
        fallback.classList.remove('hidden');
        fallback.innerHTML = '<div class="fallback-code">404</div><div class="fallback-text">Видео не загрузилось</div><div class="fallback-sub">Подождите пожалуйста… или попробуйте ещё раз</div>';
      };
      
      document.getElementById('modal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      clearTimeout(window._playerTimer);
      document.getElementById('modal').classList.remove('active');
      document.getElementById('player').src = '';
      const fallback = document.getElementById('player-fallback');
      fallback.classList.remove('hidden');
      fallback.innerHTML = '<div class="fallback-code">404</div><div class="fallback-text">Видео не загрузилось</div><div class="fallback-sub">Подождите пожалуйста… или попробуйте ещё раз</div>';
      document.body.style.overflow = '';
    }

    // ===== Подписка (только localStorage) =====
    function getSubData() {
      try {
        return JSON.parse(localStorage.getItem('fakeNetflixSub') || 'null');
      } catch {
        return null;
      }
    }

    const START_BALANCE = 125430;
    const SUB_PRICE = 50000;

    function getWallet() {
      const raw = localStorage.getItem('fakeNetflixWallet');
      if (raw === null) return START_BALANCE;
      const n = Number(raw);
      return Number.isFinite(n) ? n : START_BALANCE;
    }
    function setWallet(n) {
      localStorage.setItem('fakeNetflixWallet', String(Math.max(0, n)));
    }

    function activateSub() {
      try {
        const now = new Date();
        let wallet = getWallet();
        if (wallet < SUB_PRICE) {
          alert('Недостаточно средств.\nНужно 50 000 ₽, сейчас: ' + wallet.toLocaleString('ru-RU') + ' ₽.\nНажми «Сбросить».');
          return;
        }
        wallet = wallet - SUB_PRICE;
        setWallet(wallet);

        let data = getSubData() || { history: [] };
        data.active = true;
        data.lastCharge = now.toISOString();
        data.amount = SUB_PRICE;
        data.history = Array.isArray(data.history) ? data.history : [];
        data.history.unshift({
          date: now.toISOString(),
          amount: SUB_PRICE,
          note: 'Еженедельная подписка'
        });
        data.history = data.history.slice(0, 10);
        localStorage.setItem('fakeNetflixSub', JSON.stringify(data));

        updateSubUI();

        // Подсветка баланса
        const walletEl = document.getElementById('wallet-balance');
        if (walletEl) {
          walletEl.style.color = '#e50914';
          walletEl.style.transition = 'color 0.3s';
          setTimeout(() => { walletEl.style.color = '#46d369'; }, 400);
        }

        alert('✅ Списано 50 000 ₽\nОстаток: ' + wallet.toLocaleString('ru-RU') + ' ₽');
      } catch (e) {
        alert('Ошибка списания: ' + e.message);
      }
    }

    function resetSub() {
      localStorage.removeItem('fakeNetflixSub');
      setWallet(START_BALANCE);
      updateSubUI();
      alert('Баланс сброшен: 125 430 ₽');
    }

    function updateSubUI() {
      try {
        const data = getSubData();
        const statusEl = document.getElementById('sub-text');
        const lastEl = document.getElementById('last-charge');
        const histBlock = document.getElementById('history-block');
        const histList = document.getElementById('history-list');
        const walletEl = document.getElementById('wallet-balance');
        const wallet = getWallet();
        if (walletEl) walletEl.textContent = wallet.toLocaleString('ru-RU') + ' ₽';

        if (data && data.active) {
          statusEl.textContent = 'активна';
          statusEl.className = '';
          const d = new Date(data.lastCharge);
          const amt = Number(data.amount) || SUB_PRICE;
          lastEl.textContent = 'Последнее «списание»: ' + d.toLocaleString('ru-RU') + ' — ' + amt.toLocaleString('ru-RU') + ' ₽';
          
          if (data.history && data.history.length) {
            histBlock.style.display = 'block';
            histList.innerHTML = data.history.map(h => {
              const dd = new Date(h.date);
              const ha = Number(h.amount) || SUB_PRICE;
              return '<div class="history-item"><span>' + dd.toLocaleString('ru-RU') + ' — ' + (h.note || 'подписка') + '</span><span class="amount">−' + ha.toLocaleString('ru-RU') + ' ₽</span></div>';
            }).join('');
          }
        } else {
          statusEl.textContent = 'не активна';
          statusEl.className = 'inactive';
          lastEl.textContent = '';
          histBlock.style.display = 'none';
          histList.innerHTML = '';
        }
      } catch (e) {
        console && console.error(e);
      }
    }

    // Закрытие модалки
    document.getElementById('modal').addEventListener('click', (e) => {
      if (e.target.id === 'modal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // ===== Auth (localStorage) =====
    let authMode = 'login'; // login | register

    function getUsers() {
      try { return JSON.parse(localStorage.getItem('fakeNetflixUsers') || '{}'); }
      catch { return {}; }
    }
    function saveUsers(u) {
      localStorage.setItem('fakeNetflixUsers', JSON.stringify(u));
    }
    function getCurrentUser() {
      return localStorage.getItem('fakeNetflixUser') || null;
    }
    function setCurrentUser(name) {
      if (name) localStorage.setItem('fakeNetflixUser', name);
      else localStorage.removeItem('fakeNetflixUser');
    }

    function openAuth(mode) {
      authMode = mode;
      document.getElementById('auth-title').textContent = mode === 'login' ? 'Вход' : 'Регистрация';
      document.getElementById('auth-submit').textContent = mode === 'login' ? 'Войти' : 'Зарегистрироваться';
      document.getElementById('auth-switch').innerHTML = mode === 'login'
        ? 'Нет аккаунта? <a onclick="openAuth(\'register\')">Зарегистрироваться</a>'
        : 'Уже есть аккаунт? <a onclick="openAuth(\'login\')">Войти</a>';
      document.getElementById('auth-error').style.display = 'none';
      document.getElementById('auth-login').value = '';
      document.getElementById('auth-pass').value = '';
      document.getElementById('auth-modal').classList.add('active');
    }

    function closeAuth() {
      document.getElementById('auth-modal').classList.remove('active');
    }

    function submitAuth() {
      const login = document.getElementById('auth-login').value.trim();
      const pass = document.getElementById('auth-pass').value;
      const err = document.getElementById('auth-error');

      if (!login || !pass) {
        err.textContent = 'Заполните все поля';
        err.style.display = 'block';
        return;
      }

      const users = getUsers();

      if (authMode === 'register') {
        if (users[login]) {
          err.textContent = 'Такой логин уже занят';
          err.style.display = 'block';
          return;
        }
        users[login] = pass;
        saveUsers(users);
        setCurrentUser(login);
        closeAuth();
        updateAuthUI();
        alert('Регистрация успешна! Добро пожаловать, ' + login);
      } else {
        if (!users[login] || users[login] !== pass) {
          err.textContent = 'Неверный логин или пароль';
          err.style.display = 'block';
          return;
        }
        setCurrentUser(login);
        closeAuth();
        updateAuthUI();
      }
    }

    function logout() {
      setCurrentUser(null);
      updateAuthUI();
    }

    function updateAuthUI() {
      const area = document.getElementById('user-area');
      const user = getCurrentUser();
      if (user) {
        area.innerHTML = `
          <span class="user-name">${user}</span>
          <div class="avatar" title="Профиль" onclick="document.getElementById('cabinet').scrollIntoView({behavior:'smooth'})">${user[0].toUpperCase()}</div>
          <button class="auth-btn" onclick="logout()">Выйти</button>
        `;
      } else {
        area.innerHTML = `
          <button class="auth-btn" onclick="openAuth('login')">Войти</button>
          <button class="auth-btn primary" onclick="openAuth('register')">Регистрация</button>
        `;
      }
    }

    // Закрытие auth по клику вне
    document.getElementById('auth-modal').addEventListener('click', (e) => {
      if (e.target.id === 'auth-modal') closeAuth();
    });

    // Init
    renderMovies();
    updateSubUI();
    updateAuthUI();
