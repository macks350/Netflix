// Каталог фильмов
    const movies = [
      // === Западная классика ===
      {
        title: "Night of the Living Dead (1968)",
        desc: "Классический зомби-хоррор. Публичное достояние.",
        thumb: "https://img.youtube.com/vi/0KAOZg2Qb8s/mqdefault.jpg",
        yt: "0KAOZg2Qb8s",
        cat: "west"
      },
      {
        title: "Nosferatu (1922)",
        desc: "Легендарный немой вампирский фильм. Публичное достояние.",
        thumb: "https://img.youtube.com/vi/FC6jFoYm3xs/mqdefault.jpg",
        yt: "FC6jFoYm3xs",
        cat: "west"
      },
      {
        title: "Charlie Chaplin — The Kid (1921)",
        desc: "Классика немого кино. Публичное достояние.",
        thumb: "https://img.youtube.com/vi/bIUfUeNjVjs/mqdefault.jpg",
        yt: "bIUfUeNjVjs",
        cat: "west"
      },
      {
        title: "Battleship Potemkin (1925)",
        desc: "Шедевр Сергея Эйзенштейна. Публичное достояние.",
        thumb: "https://img.youtube.com/vi/7HrJNWKxqks/mqdefault.jpg",
        yt: "7HrJNWKxqks",
        cat: "ussr"
      },
      // === Советская / российская классика (официально на канале Мосфильма) ===
      {
        title: "Ирония судьбы, или С лёгким паром! (1 серия)",
        desc: "Культовая новогодняя комедия Эльдара Рязанова (1975). Официально от Мосфильма.",
        thumb: "https://img.youtube.com/vi/ms5Ga6kNvHM/mqdefault.jpg",
        yt: "ms5Ga6kNvHM",
        cat: "ussr"
      },
      {
        title: "Ирония судьбы, или С лёгким паром! (2 серия)",
        desc: "Продолжение культовой комедии. Официально от Мосфильма.",
        thumb: "https://img.youtube.com/vi/luHarTc90QA/mqdefault.jpg",
        yt: "luHarTc90QA",
        cat: "ussr"
      },
      {
        title: "Белое солнце пустыни (1969)",
        desc: "Легендарный советский «истерн». Официально от Мосфильма.",
        thumb: "https://img.youtube.com/vi/Auj_u7wEyw8/mqdefault.jpg",
        yt: "Auj_u7wEyw8",
        cat: "ussr"
      },
      {
        title: "Летят журавли (1957)",
        desc: "Единственный советский фильм — обладатель «Золотой пальмовой ветви» Канн. Официально от Мосфильма.",
        thumb: "https://img.youtube.com/vi/2OccZQmxKac/mqdefault.jpg",
        yt: "2OccZQmxKac",
        cat: "ussr"
      },
      {
        title: "The Great Train Robbery (1903)",
        desc: "Один из первых фильмов в истории. Публичное достояние.",
        thumb: "https://img.youtube.com/vi/zuto7qWrplc/mqdefault.jpg",
        yt: "zuto7qWrplc",
        cat: "west"
      },
      {
        title: "The Cabinet of Dr. Caligari (1920)",
        desc: "Шедевр немецкого экспрессионизма. Публичное достояние.",
        thumb: "https://img.youtube.com/vi/IAtkQ0Y5i1M/mqdefault.jpg",
        yt: "IAtkQ0Y5i1M",
        cat: "west"
      },
      // === Рокки + Рэмбо (официальные трейлеры и культовые сцены) ===
      {
        title: "Rocky (1976) — Official Trailer",
        desc: "Оригинальный трейлер первой части. Классика боксёрского кино.",
        thumb: "https://img.youtube.com/vi/3VUblDwae3I/mqdefault.jpg",
        yt: "3VUblDwae3I",
        cat: "rocky"
      },
      {
        title: "Rocky II — Training Montage",
        desc: "Легендарный тренировочный монтаж из второй части.",
        thumb: "https://img.youtube.com/vi/eMhDQFLwrAA/mqdefault.jpg",
        yt: "eMhDQFLwrAA",
        cat: "rocky"
      },
      {
        title: "Rocky III — Eye of the Tiger",
        desc: "Культовая сцена и песня. Третья часть франшизы.",
        thumb: "https://img.youtube.com/vi/btPJPFnesV4/mqdefault.jpg",
        yt: "btPJPFnesV4",
        cat: "rocky"
      },
      {
        title: "Rocky IV — Training in Russia",
        desc: "Тренировка Рокки в СССР против Ивана Драго.",
        thumb: "https://img.youtube.com/vi/1gXk3C4p8qQ/mqdefault.jpg",
        yt: "1gXk3C4p8qQ",
        cat: "rocky"
      },
      {
        title: "Rocky Balboa (2006) — Inspirational Speech",
        desc: "Знаменитая речь Рокки сыну. Шестая часть.",
        thumb: "https://img.youtube.com/vi/vyYDz_A6HO8/mqdefault.jpg",
        yt: "vyYDz_A6HO8",
        cat: "rocky"
      },
      {
        title: "First Blood (Rambo) — Official Trailer",
        desc: "Трейлер первой части «Рэмбо: Первая кровь» (1982).",
        thumb: "https://img.youtube.com/vi/IAqDSBm-S6Y/mqdefault.jpg",
        yt: "IAqDSBm-S6Y",
        cat: "rocky"
      },
      {
        title: "Rambo: First Blood Part II — Trailer",
        desc: "Трейлер второй части с Сильвестром Сталлоне.",
        thumb: "https://img.youtube.com/vi/WQGJAIYtWd4/mqdefault.jpg",
        yt: "WQGJAIYtWd4",
        cat: "rocky"
      }
    ];
