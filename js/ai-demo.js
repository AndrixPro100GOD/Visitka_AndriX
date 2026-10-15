/* One clock makes every scene reversible, including the cursor's product tour. */
(() => {
  "use strict";

  const demo = document.getElementById("ai-demo");
  if (!demo) return;
  const find = (name) => demo.querySelector(`[data-ad="${name}"]`);
  const TOTAL = 63000;
  const PRODUCT_START = 39500;
  const prompt =
    "Создай ERP для бизнеса: продажи, заявки, аналитика и команда. Всё — в одном понятном интерфейсе.";
  const agentReply =
    "Разделяю задачу между агентами. Соберу модули в единую систему.";
  const chapters = [
    {
      start: 0,
      inspect: 3100,
      label: "Задача",
      title: "У каждой задачи — своя тема",
      detail:
        "После обсуждения вашей идеи я создаю новую тему в проекте. Здесь будет весь путь: от требований до результата.",
    },
    {
      start: 4200,
      inspect: 5400,
      label: "Контекст",
      title: "Сначала — ясная цель",
      detail:
        "Пустое окно становится отправной точкой. Я определяю, кому нужно приложение, какую проблему оно решает и что считаем готовым результатом.",
    },
    {
      start: 6200,
      inspect: 11200,
      label: "Запрос",
      title: "Перевожу идею в задачу для агента",
      detail:
        "Описываю нужные разделы, пользовательские сценарии и ограничения. У агента появляется конкретный план действий.",
    },
    {
      start: 11800,
      inspect: 18800,
      label: "Команда",
      title: "Агенты работают одной командой",
      detail:
        "Ведущий агент координирует работу. Другие агенты параллельно создают интерфейс, логику и тесты. Я направляю процесс и проверяю решения.",
    },
    {
      start: 20500,
      inspect: 27600,
      label: "Сборка",
      title: "Из деталей складывается приложение",
      detail:
        "Шапка, нижняя панель, навигация и рабочая область собираются в единый интерфейс. У каждой детали есть своя роль.",
    },
    {
      start: 29000,
      inspect: 32900,
      label: "Проверка",
      title: "Готово — значит проверено",
      detail:
        "Агенты собирают приложение и запускают тесты. Вместе проверяем рабочие сценарии. Я принимаю результат и решаю, что готово к использованию.",
    },
    {
      start: 34000,
      inspect: 38800,
      label: "Развитие",
      title: "Большая система. Понятные задачи.",
      detail:
        "Продажи, аналитика, заявки, доступы — у каждого модуля своя тема. Так приложение растёт последовательно, а контекст каждой задачи сохраняется.",
    },
    {
      start: PRODUCT_START,
      inspect: 41500,
      label: "Продукт",
      title: "Теперь это ваш рабочий инструмент",
      detail:
        "На переднем плане — готовое приложение. Продажи, аналитика, заявки и команда связаны между собой. Разделы можно переключать самостоятельно.",
    },
    {
      start: 58500,
      inspect: TOTAL,
      label: "Результат",
      title: "В центре — ваша задача и результат",
      detail:
        "Понимание пользователей, инженерный опыт и скорость ИИ работают вместе. Чтобы ваше время превращалось в полезный продукт.",
    },
  ];
  const tour = [
    { at: 40800, page: "dashboard" },
    { at: 43300, page: "shop" },
    { at: 46100, page: "analytics" },
    { at: 48900, page: "bids" },
    { at: 51700, page: "team" },
    { at: 54500, page: "account" },
    { at: 57200, page: "dashboard" },
  ];
  const pageNames = {
    dashboard: "Обзор",
    shop: "Магазин",
    analytics: "Аналитика",
    bids: "Заявки",
    team: "Команда",
    account: "Аккаунт",
  };

  function heading(eyebrow, title, detail, tag) {
    return `<div class="ad-page-heading"><div><span class="ad-page-eyebrow">${eyebrow}</span><h4>${title}</h4><p>${detail}</p></div><span class="ad-date-tag">${tag}</span></div>`;
  }
  function metrics(items) {
    return `<div class="ad-metrics">${items.map(([label, value, change]) => `<div><span>${label}</span><strong>${value}</strong><em>${change}</em></div>`).join("")}</div>`;
  }
  function product(art, category, title, price) {
    return `<div class="ad-product-card"><div class="ad-product-art"><svg viewBox="0 0 100 90" aria-hidden="true">${art}</svg></div><span>${category}</span><strong>${title}</strong><div class="ad-product-price">${price} ₽<span>В наличии</span></div></div>`;
  }
  const pages = {
    shop:
      heading(
        "От каталога до продажи",
        "Магазин",
        "Товары, остатки и заказы в одном месте.",
        "24 товара",
      ) +
      `<div class="ad-product-grid">` +
      product(
        '<ellipse cx="50" cy="81" rx="29" ry="4" fill="#dddcd3"/><path d="m30 49-4 29m43-29 5 29" stroke="#8b8e7b" stroke-width="3"/><rect x="29" y="8" width="42" height="45" rx="12" fill="#a7ad96"/><path d="M23 51c0-8 54-8 54 0v5H23Z" fill="#858e76"/><path d="M21 37v16m58-16v16" stroke="#727e68" stroke-width="3" stroke-linecap="round"/>',
        "Рабочее пространство",
        "Кресло Forma",
        "18 900",
      ) +
      product(
        '<ellipse cx="50" cy="81" rx="27" ry="4" fill="#dedbe9"/><path d="M47 74V40l17-20" fill="none" stroke="#a49ab9" stroke-width="4"/><ellipse cx="47" cy="75" rx="21" ry="5" fill="#a69bbc"/><path d="M52 20q20-10 27 13L52 39q-7-10 0-19" fill="#b6aacb"/><path d="m56 38 21-5" stroke="#d9d0e8" stroke-width="3"/>',
        "Освещение",
        "Лампа Line",
        "6 400",
      ) +
      product(
        '<ellipse cx="50" cy="81" rx="36" ry="4" fill="#dce6dd"/><path d="m22 43-4 35m60-35 4 35" stroke="#8eab94" stroke-width="3"/><path d="M11 35h78v9H11z" fill="#a4bea5"/><path d="M17 29h66v8H17z" fill="#c2d1b9"/><path d="M27 44v16h46V44" fill="#b1c8ae"/><circle cx="50" cy="52" r="2" fill="#819e85"/>',
        "Мебель",
        "Стол Work",
        "24 500",
      ) +
      `</div><p class="ad-page-note">Остатки связаны с заказами. Команда видит актуальные данные.</p>`,
    analytics:
      heading(
        "Данные помогают решать",
        "Аналитика",
        "Показатели бизнеса без ручных отчётов.",
        "Этот месяц ⌄",
      ) +
      metrics([
        ["Выручка", "2,45 <small>млн ₽</small>", "↗ 18,6%"],
        ["Конверсия", "4,8<small>%</small>", "↗ 1,2%"],
        ["Средний чек", "16 608 <small>₽</small>", "↗ 6,4%"],
      ]) +
      `<div class="ad-analytics-grid"><div class="ad-chart-card"><div class="ad-card-heading"><strong>Продажи по неделям</strong><span>План выполнен на 112%</span></div><div class="ad-bar-chart">${[35, 49, 42, 62, 56, 77, 68, 93].map((height) => `<span style="--bar:${height}%"></span>`).join("")}</div><div class="ad-chart-x"><span>Сентябрь</span><span>Октябрь</span></div></div><div class="ad-chart-card"><div class="ad-card-heading"><strong>Источники продаж</strong></div>${[
        ["Сайт", 64],
        ["Менеджеры", 28],
        ["Партнёры", 8],
      ]
        .map(
          ([name, value]) =>
            `<div class="ad-channel" style="--bar:${value}%"><span>${name}</span><b>${value}%</b><i></i></div>`,
        )
        .join("")}</div></div>`,
    bids:
      heading(
        "Ни одна задача не потеряется",
        "Заявки",
        "От первого обращения до выполненного заказа.",
        "12 активных",
      ) +
      `<div class="ad-table-wrap"><table class="ad-table"><thead><tr><th>Заявка</th><th>Клиент</th><th>Сумма</th><th>Статус</th></tr></thead><tbody><tr><td>#1042</td><td>ООО «Вектор»</td><td>48 500 ₽</td><td><span class="ad-status">Выполнена</span></td></tr><tr><td>#1043</td><td>Студия «Среда»</td><td>126 000 ₽</td><td><span class="ad-status is-progress">В работе</span></td></tr><tr><td>#1044</td><td>ИП Соколов</td><td>32 800 ₽</td><td><span class="ad-status is-pending">На согласовании</span></td></tr><tr><td>#1045</td><td>ООО «Горизонт»</td><td>89 200 ₽</td><td><span class="ad-status is-progress">В работе</span></td></tr><tr><td>#1046</td><td>Бюро «Форма»</td><td>64 700 ₽</td><td><span class="ad-status">Выполнена</span></td></tr></tbody></table></div><p class="ad-page-note">Статус, клиент и история действий — в каждой заявке.</p>`,
    team:
      heading(
        "У каждого — своя роль",
        "Команда",
        "Общее пространство и понятные права доступа.",
        "3 участника",
      ) +
      `<div class="ad-team-grid"><div class="ad-person"><span>АК</span><strong>Андрей Кайденко</strong><small>Управление системой</small><em>Администратор</em></div><div class="ad-person"><span>МС</span><strong>Мария Смирнова</strong><small>Заказы и клиенты</small><em>Продажи</em></div><div class="ad-person"><span>ДВ</span><strong>Дмитрий Волков</strong><small>Показатели и отчёты</small><em>Аналитика</em></div></div><p class="ad-page-note">Каждый видит нужные инструменты. Доступы остаются под контролем.</p>`,
    account:
      heading(
        "Система подстраивается под вас",
        "Аккаунт",
        "Ваш профиль, рабочее пространство и уведомления.",
        "Профиль",
      ) +
      `<div class="ad-account-card"><div class="ad-account-profile"><span>АК</span><div><strong>Андрей Кайденко</strong><small>Администратор · Пульс ERP</small></div></div><div class="ad-account-fields"><div><span>Имя</span><p>Андрей Кайденко</p></div><div><span>Рабочее пространство</span><p>Пульс · Основная команда</p></div><div><span>Язык интерфейса</span><p>Русский</p></div><div><span>Часовой пояс</span><p>Екатеринбург · UTC+5</p></div></div><div class="ad-account-bottom"><span>Уведомления о новых заявках</span><span class="ad-visual-switch" role="img" aria-label="Включены"></span></div></div><p class="ad-page-note">Настройки показаны как пример интерфейса.</p>`,
  };
  for (const [name, content] of Object.entries(pages)) {
    const panel = document.createElement("div");
    panel.className = "ad-page";
    panel.dataset.adView = name;
    panel.hidden = true;
    panel.innerHTML = content;
    find("erp").querySelector(".ad-erp-content").append(panel);
  }

  const stage = find("stage");
  const erp = find("erp");
  const cursor = find("cursor");
  const playButton = find("play");
  const pageButtons = [...demo.querySelectorAll("[data-ad-page]")];
  pageButtons.forEach((button) => {
    button.disabled = false;
  });
  const panels = [...demo.querySelectorAll("[data-ad-view]")];
  const reveals = [
    ...demo.querySelectorAll("[data-ad-reveal], [data-ad-build]"),
  ].map((element) => ({
    element,
    at: Number(element.dataset.adReveal ?? element.dataset.adBuild),
    shown: null,
  }));
  const chapterButtons = chapters.map((chapter, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><span>${chapter.label}</span>`;
    button.setAttribute("aria-label", `${index + 1}. ${chapter.title}`);
    button.addEventListener("click", () => seek(chapter.inspect));
    find("chapters").append(button);
    return button;
  });

  let time = 0;
  let playing = false;
  let started = false;
  let inView = false;
  let motionOff =
    document.documentElement.classList.contains("motion-off") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  let lastFrame = null;
  let lastChapter = -1;
  let lastSecond = -1;
  let phase = "";
  let activePage = "dashboard";
  let cursorIndex = -1;
  let clickedIndex = -1;
  let userExploring = false;
  let cursorTarget = null;
  let cursorNeedsMeasure = true;
  let visibleProduct = false;

  function setText(element, text) {
    if (element.textContent !== text) element.textContent = text;
  }
  function showPage(name, animate = true) {
    if (activePage === name) return;
    activePage = name;
    panels.forEach((panel) => {
      const active = panel.dataset.adView === name;
      panel.hidden = !active;
      panel.classList.toggle("ad-view-enter", active && animate && !motionOff);
    });
    pageButtons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.adPage === name),
      ),
    );
    find("breadcrumb").textContent = pageNames[name];
    erp.querySelector(".ad-erp-content").scrollTop = 0;
  }
  function setPhase(nextPhase) {
    if (phase === nextPhase) return;
    phase = nextPhase;
    stage.dataset.phase = phase;
    cursorNeedsMeasure = true;
    const canExplore = phase === "product" || phase === "finale";
    erp.inert = !canExplore;
    erp.setAttribute("aria-hidden", String(!canExplore));
    visibleProduct = canExplore;
  }
  function moveCursor() {
    if (!cursorTarget || !visibleProduct || motionOff || userExploring) return;
    const target = cursorTarget.getBoundingClientRect();
    const scene = stage.getBoundingClientRect();
    cursor.style.transform = `translate(${Math.round(target.left - scene.left + target.width * 0.61)}px, ${Math.round(target.top - scene.top + target.height * 0.55)}px)`;
    cursorNeedsMeasure = false;
  }
  function renderTour() {
    const touring =
      time >= tour[0].at && time < 58500 && !motionOff && !userExploring;
    cursor.style.opacity = touring ? "1" : "0";
    if (userExploring) return;
    const index = tour.findLastIndex((item) => time >= item.at);
    const clicked = tour.findLastIndex((item) => time >= item.at + 850);
    if (index !== cursorIndex) {
      cursorIndex = index;
      cursorTarget =
        index >= 0
          ? pageButtons.find(
              (button) => button.dataset.adPage === tour[index].page,
            )
          : null;
      cursorNeedsMeasure = true;
    }
    if (cursorNeedsMeasure) moveCursor();
    if (clicked !== clickedIndex) {
      clickedIndex = clicked;
      showPage(clicked >= 0 ? tour[clicked].page : "dashboard", playing);
      cursor.classList.remove("ad-clicking");
      if (touring && playing) {
        // A fresh class starts the small click ring; it never drives application state.
        void cursor.offsetWidth;
        cursor.classList.add("ad-clicking");
      }
    }
  }
  function render() {
    const chapter = chapters.findLastIndex((item) => time >= item.start);
    if (chapter !== lastChapter) {
      find("number").textContent = String(chapter + 1).padStart(2, "0");
      find("title").textContent = chapters[chapter].title;
      find("detail").textContent = chapters[chapter].detail;
      chapterButtons.forEach((button, index) => {
        if (index === chapter) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      lastChapter = chapter;
    }
    setPhase(
      time < 900
        ? "opening"
        : time < 11800
          ? "compose"
          : time < 20500
            ? "working"
            : time < 29000
              ? "building"
              : time < 34000
                ? "verified"
                : time < PRODUCT_START
                  ? "threads"
                  : time < 58500
                    ? "product"
                    : "finale",
    );
    demo.classList.toggle("ad-has-tools", time >= 14200);
    demo.classList.toggle("ad-verified", time >= 29000);
    demo.classList.toggle("ad-finished", time >= 58500);
    const typing = time >= 6600 && time < 11800;
    demo.classList.toggle("ad-is-typing", typing);
    setText(
      find("prompt"),
      time >= 11800
        ? "Следующая задача…"
        : typing
          ? prompt.slice(
              0,
              Math.floor(Math.min(1, (time - 6600) / 4200) * prompt.length),
            ) || " "
          : "Опишите задачу…",
    );
    setText(
      find("agent-text"),
      time >= 29000
        ? "Модули связаны, изменения проверены. Приложение готово к проверке в работе."
        : agentReply.slice(
            0,
            Math.floor(
              Math.max(0, Math.min(1, (time - 12800) / 3500)) *
                agentReply.length,
            ),
          ),
    );
    setText(
      find("chat-state"),
      time >= 29000
        ? "✓ Готово"
        : time >= 11800
          ? "В работе · 3 агента"
          : "Новая задача",
    );
    setText(
      find("dev-status"),
      time >= 29000
        ? "Проверено ✓"
        : time >= 11800
          ? "Агенты работают"
          : "Новая тема",
    );
    find("empty").style.opacity = time < 2600 || time >= 11800 ? "0" : "1";
    find("empty").style.transform =
      time < 2600
        ? "translateY(8px)"
        : time >= 11800
          ? "translateY(-8px)"
          : "none";
    reveals.forEach((item) => {
      const shown = time >= item.at;
      if (item.shown !== shown) {
        item.element.classList.toggle("ad-visible", shown);
        item.shown = shown;
      }
    });
    setText(
      find("build-label"),
      time >= 24700
        ? "Рабочая область"
        : time >= 23500
          ? "Навигация и аккаунт"
          : time >= 22500
            ? "Нижняя панель"
            : "Шапка интерфейса",
    );
    const second = Math.floor(time / 1000);
    if (second !== lastSecond) {
      find("elapsed").textContent =
        `${String(Math.floor(second / 60)).padStart(2, "0")}:${String(second % 60).padStart(2, "0")}`;
      lastSecond = second;
    }
    find("progress").style.transform = `scaleX(${time / TOTAL})`;
    renderTour();
  }
  function syncControls() {
    const label =
      time >= TOTAL
        ? "Заново"
        : motionOff
          ? "Далее"
          : playing
            ? "Пауза"
            : started
              ? "Продолжить"
              : "Смотреть";
    setText(find("play-label"), label);
    setText(
      find("play-icon"),
      time >= TOTAL ? "↻" : motionOff ? "→" : playing ? "Ⅱ" : "▶",
    );
    playButton.setAttribute(
      "aria-label",
      time >= TOTAL
        ? "Смотреть презентацию заново"
        : motionOff
          ? "Перейти к следующему этапу"
          : playing
            ? "Приостановить презентацию"
            : started
              ? "Продолжить презентацию"
              : "Смотреть презентацию",
    );
    setText(
      find("playback-note"),
      motionOff
        ? "Движение отключено. Проходите историю кнопкой «Далее» или выбирайте этап. Интерфейс и данные — демонстрационные."
        : userExploring
          ? "Вы изучаете пример приложения. Нажмите «Продолжить», чтобы вернуться к презентации."
          : playing && (!inView || document.hidden)
            ? "Презентация на паузе, пока окно вне экрана. Продолжится с того же места."
            : "Около минуты · пауза и переходы по этапам доступны в любой момент. Интерфейс и данные — демонстрационные.",
    );
    setText(
      find("stage-note"),
      userExploring
        ? `Вы открыли раздел «${pageNames[activePage]}». Попробуйте другие.`
        : "Готовое приложение. Попробуйте переключить разделы.",
    );
  }
  function stopFrame() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = null;
  }
  function schedule() {
    if (playing && inView && !document.hidden && !motionOff && !frame)
      frame = requestAnimationFrame(tick);
  }
  function tick(now) {
    frame = 0;
    if (!playing || !inView || document.hidden || motionOff) {
      lastFrame = null;
      return;
    }
    if (lastFrame !== null)
      time = Math.min(TOTAL, time + Math.min(now - lastFrame, 100));
    lastFrame = now;
    render();
    if (time >= TOTAL) {
      playing = false;
      lastFrame = null;
      syncControls();
    }
    schedule();
  }
  function seek(position) {
    stopFrame();
    playing = false;
    started = true;
    userExploring = false;
    time = Math.min(TOTAL, Math.max(0, position));
    cursorIndex = -2;
    clickedIndex = -2;
    render();
    syncControls();
  }
  function restart(autoplay) {
    seek(motionOff ? chapters[0].inspect : 0);
    started = autoplay;
    playing = autoplay && !motionOff;
    syncControls();
    schedule();
  }
  playButton.addEventListener("click", () => {
    if (time >= TOTAL) {
      restart(!motionOff);
      return;
    }
    if (motionOff) {
      seek(
        chapters.find((chapter) => chapter.inspect > time)?.inspect ?? TOTAL,
      );
      return;
    }
    if (userExploring) {
      userExploring = false;
      clickedIndex = -2;
    }
    started = true;
    playing = !playing;
    stopFrame();
    render();
    syncControls();
    schedule();
  });
  find("restart").addEventListener("click", () => restart(!motionOff));
  pageButtons.forEach((button) =>
    button.addEventListener("click", () => {
      if (!visibleProduct) return;
      stopFrame();
      playing = false;
      started = true;
      userExploring = true;
      cursor.style.opacity = "0";
      showPage(button.dataset.adPage);
      syncControls();
    }),
  );
  document.addEventListener("portfolio:motionchange", () => {
    motionOff = document.documentElement.classList.contains("motion-off");
    if (motionOff) {
      stopFrame();
      playing = false;
      if (!started) {
        time = chapters[7].inspect;
        started = true;
      }
    }
    render();
    syncControls();
  });
  document.addEventListener("visibilitychange", () => {
    stopFrame();
    syncControls();
    schedule();
  });
  erp.addEventListener("transitionend", (event) => {
    if (event.target === erp) {
      cursorNeedsMeasure = true;
      moveCursor();
    }
  });
  if ("ResizeObserver" in window)
    new ResizeObserver(() => {
      cursorNeedsMeasure = true;
      moveCursor();
    }).observe(stage);
  else
    window.addEventListener(
      "resize",
      () => {
        cursorNeedsMeasure = true;
        moveCursor();
      },
      { passive: true },
    );

  demo.classList.add("ad-enhanced");
  find("controls").hidden = false;
  find("timeline").hidden = false;
  // With reduced motion, open a useful static product; the entire story remains selectable.
  if (motionOff) {
    time = chapters[7].inspect;
    started = true;
  }
  render();
  syncControls();
  requestAnimationFrame(() =>
    requestAnimationFrame(() => demo.classList.add("ad-ready")),
  );
  if ("IntersectionObserver" in window)
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        stopFrame();
        if (!started && !motionOff && entry.intersectionRatio >= 0.35) {
          started = true;
          playing = true;
        }
        syncControls();
        schedule();
      },
      { threshold: [0, 0.1, 0.35] },
    ).observe(stage);
  else {
    inView = true;
  }
})();
