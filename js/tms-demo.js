/* A single clock drives the physical scene, incoming signals and the TMS record. */
(() => {
  "use strict";

  const demo = document.getElementById("tms-demo");
  if (!demo) return;
  const find = (name) => demo.querySelector(`[data-tms="${name}"]`);
  const TOTAL = 62500;
  const RATE = 1200;
  const chapters = [
    {
      start: 0,
      inspect: 3500,
      title: "Грузовик прибывает на терминал",
      detail:
        "КПП передаёт номер автомобиля. TMS фиксирует его прибытие в заявке.",
    },
    {
      start: 6000,
      inspect: 12400,
      title: "Камера узнаёт контейнер",
      detail:
        "Ричстакер принимает контейнер с автомобиля. Номер, тип и операция появляются в TMS.",
    },
    {
      start: 13500,
      inspect: 21000,
      title: "У каждого контейнера — своё место",
      detail:
        "Ричстакер ставит контейнер в Stock. Система сохраняет координаты X1 · Y1 · Z1.",
    },
    {
      start: 21500,
      inspect: 31000,
      title: "Хранение учитывается по дням",
      detail:
        "Контейнер остаётся на месте. Каждые сутки увеличивают срок хранения и сумму в заявке.",
    },
    {
      start: 32000,
      inspect: 36500,
      title: "Прибыл автомобиль за контейнером",
      detail:
        "Сигнал с КПП привязывает второй автомобиль к выдаче. TMS ожидает погрузку.",
    },
    {
      start: 38000,
      inspect: 44900,
      title: "Со стока — к автомобилю",
      detail:
        "Ричстакер снимает контейнер с места хранения. TMS фиксирует перемещение по площадке.",
    },
    {
      start: 45500,
      inspect: 53200,
      title: "Контейнер выдан и покидает терминал",
      detail:
        "Погрузка подтверждена. Автомобиль уезжает, а в заявке остаётся ожидание оплаты.",
    },
    {
      start: 53500,
      inspect: TOTAL,
      title: "Оплата завершает весь цикл",
      detail:
        "Внешняя платёжная система подтверждает оплату счёта. TMS закрывает заявку автоматически.",
    },
  ];
  const events = [
    {
      at: 3400,
      time: "День 1 · 09:00",
      source: "КПП",
      text: "Автомобиль А123АА 196 прибыл",
      patch: {
        inbound: "А123АА 196",
        status: "Автомобиль прибыл",
        location: "Зона приёма",
      },
      fields: ["inbound", "status", "location"],
    },
    {
      at: 9100,
      time: "День 1 · 09:02",
      source: "Камера",
      text: "Распознан MOGU 133767 · 40 ft · 45G0",
      patch: {
        container: "MOGU 133767",
        type: "40 ft / ISO 45G0",
        status: "Приём контейнера",
        location: "На автомобиле",
      },
      fields: ["container", "type", "status", "location"],
    },
    {
      at: 12200,
      time: "День 1 · 09:04",
      source: "Ричстакер",
      text: "Контейнер снят с автомобиля и принят",
      patch: { status: "Контейнер принят", location: "На ричстакере" },
      fields: ["status", "location"],
    },
    {
      at: 20700,
      time: "День 1 · 09:07",
      source: "Ричстакер",
      text: "Установлен в Stock · X1 Y1 Z1",
      patch: { status: "На хранении", location: "Stock · X1 Y1 Z1" },
      fields: ["status", "location"],
    },
    {
      at: 24500,
      time: "День 2 · 09:07",
      source: "Учёт хранения",
      text: "1 сутки хранения · +1 200 ₽",
      patch: { days: 1 },
      fields: ["storage", "amount"],
    },
    {
      at: 27500,
      time: "День 3 · 09:07",
      source: "Учёт хранения",
      text: "2 суток хранения · ещё +1 200 ₽",
      patch: { days: 2 },
      fields: ["storage", "amount"],
    },
    {
      at: 30500,
      time: "День 4 · 09:07",
      source: "Учёт хранения",
      text: "3 суток хранения · ещё +1 200 ₽",
      patch: { days: 3 },
      fields: ["storage", "amount"],
    },
    {
      at: 36000,
      time: "День 4 · 10:00",
      source: "КПП",
      text: "В456ВВ 196 прибыл за контейнером",
      patch: { outbound: "В456ВВ 196", status: "Ожидает выдачи" },
      fields: ["outbound", "status"],
    },
    {
      at: 41200,
      time: "День 4 · 10:03",
      source: "Ричстакер",
      text: "Снят со стока · перемещение к автомобилю",
      patch: { status: "Перемещение", location: "На ричстакере → автомобиль" },
      fields: ["status", "location"],
    },
    {
      at: 48500,
      time: "День 4 · 10:06",
      source: "Ричстакер",
      text: "Установлен на автомобиль · контейнер выдан",
      patch: {
        status: "Контейнер выдан",
        location: "На автомобиле В456ВВ 196",
      },
      fields: ["status", "location"],
    },
    {
      at: 53000,
      time: "День 4 · 10:08",
      source: "КПП",
      text: "Автомобиль с контейнером покинул терминал",
      patch: {
        status: "Ожидает оплаты",
        location: "Выдан · за пределами терминала",
        payment: "Ожидается · счёт № 1042",
      },
      fields: ["status", "location", "payment"],
    },
    {
      at: 58000,
      time: "День 4 · 10:15",
      source: "Платёжная система",
      text: "Получена оплата счёта · 3 600 ₽",
      patch: { status: "Оплачена", payment: "Оплачено · 3 600 ₽" },
      fields: ["status", "payment"],
    },
    {
      at: 60200,
      time: "День 4 · 10:15",
      source: "TMS · автоматически",
      text: "Все операции выполнены. Заявка закрыта",
      patch: { status: "Закрыта автоматически", closed: true },
      fields: ["status"],
    },
  ];
  const initial = {
    inbound: "Ожидается",
    outbound: "Пока не прибыл",
    container: "Ожидает распознавания",
    type: "—",
    status: "Ожидает прибытия",
    location: "—",
    days: 0,
    payment: "Счёт ещё не выставлен",
    closed: false,
  };
  const money = (value) => `${value.toLocaleString("ru-RU")} ₽`;
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const progress = (time, start, end) => clamp((time - start) / (end - start));
  const ease = (v) => v * v * (3 - 2 * v);
  const between = (time, start, end, from, to) =>
    from + (to - from) * ease(progress(time, start, end));
  const translate = (node, x, y) =>
    node.setAttribute(
      "transform",
      `translate(${x.toFixed(2)} ${y.toFixed(2)})`,
    );

  const mainButton = find("play");
  const nextButton = find("next");
  const restartButton = find("restart");
  const speedButton = find("speed");
  const chapterButtons = [...demo.querySelectorAll("[data-tms-chapter]")];
  const truck = find("truck");
  const container = find("cargo");
  const stacker = find("stacker");
  const boom = find("boom");
  const ram = find("ram");
  const spreader = find("spreader");
  const wheels = [...demo.querySelectorAll("[data-tms-wheel]")];
  let time = 0;
  let speed = 1;
  let playing = false;
  let started = false;
  let inView = true;
  let frame = 0;
  let lastFrame = null;
  let lastEvent = -2;
  let lastChapter = -2;
  let lastSecond = -1;
  let motionOff = document.documentElement.classList.contains("motion-off");

  function stateAt(position) {
    const state = { ...initial };
    const received = events.filter((event) => event.at <= position);
    received.forEach((event) => Object.assign(state, event.patch));
    return { state, received };
  }

  function drawScene(position) {
    // Geometry in SVG units. The container is attached to exactly one carrier.
    let truckX;
    if (position < 13500) truckX = between(position, 0, 3200, -330, 20);
    else if (position < 32000)
      truckX = between(position, 13700, 17200, 20, 790);
    else if (position < 49000)
      truckX = between(position, 32700, 35500, -330, 20);
    else truckX = between(position, 49300, 53000, 20, 790);
    if (!started) truckX = 20;

    let cargoX = 58;
    let cargoY = 247;
    let rsX = 575;
    let rsY = 345;
    let attached = false;
    if (position < 10300) {
      cargoX = truckX + 38;
      rsX = between(position, 6500, 8500, 575, 320);
    } else if (position < 13500) {
      cargoY = between(position, 10300, 12200, 247, 177);
      rsX = 320;
      attached = true;
    } else if (position < 20700) {
      cargoX = between(position, 13900, 18500, 58, 408);
      cargoY =
        position < 18500
          ? between(position, 13900, 18500, 177, 86)
          : between(position, 18900, 20500, 86, 156);
      rsX = between(position, 13900, 18500, 320, 635);
      rsY = between(position, 13900, 18500, 345, 268);
      attached = true;
    } else if (position < 39100) {
      cargoX = 408;
      cargoY = 156;
      rsX = between(position, 21500, 23300, 635, 950);
      rsY = between(position, 21500, 23300, 268, 345);
      if (position >= 38000) {
        rsX = between(position, 38000, 39100, 950, 635);
        rsY = between(position, 38000, 39100, 345, 268);
      }
    } else if (position < 45500) {
      cargoX = between(position, 41400, 45000, 408, 58);
      cargoY =
        position < 41400
          ? between(position, 39300, 41100, 156, 86)
          : between(position, 41400, 45000, 86, 177);
      rsX = between(position, 41400, 45000, 635, 320);
      rsY = between(position, 41400, 45000, 268, 345);
      attached = true;
    } else if (position < 48800) {
      cargoY = between(position, 45900, 48300, 177, 247);
      rsX = 320;
      attached = true;
    } else {
      cargoX = truckX + 38;
      rsX = between(position, 48800, 51500, 320, 575);
    }
    translate(truck, truckX, 345);
    translate(container, cargoX, cargoY);
    translate(stacker, rsX, rsY);
    find("plate").textContent = position < 32000 ? "А123АА 196" : "В456ВВ 196";
    // The boom reaches the top spreader, never forks through the container.
    let reach = attached ? 1 : 0;
    if (position >= 8500 && position < 10300)
      reach = progress(position, 8500, 10300);
    if (position >= 20700 && position < 21500)
      reach = 1 - progress(position, 20700, 21500);
    if (position >= 38000 && position < 39100)
      reach = progress(position, 38000, 39100);
    if (position >= 48800 && position < 49300)
      reach = 1 - progress(position, 48800, 49300);
    const tipX = -82 + (cargoX + 98 - rsX + 82) * reach;
    const tipY = -136 + (cargoY - 9 - rsY + 136) * reach;
    boom.setAttribute("d", `M10 -47L${tipX} ${tipY}`);
    ram.setAttribute("d", `M38 -43L${tipX * 0.65} ${tipY * 0.65 - 17}`);
    translate(spreader, tipX, tipY);
    const scanning = position >= 8500 && position < 10500;
    find("scan").style.opacity = scanning ? "1" : "0";
    find("scan-line").setAttribute(
      "y",
      String(5 + progress(position, 8500, 10500) * 64),
    );
    demo.classList.toggle("is-storing", position >= 21500 && position < 32000);
    demo.classList.toggle("has-stock", position >= 20500 && position < 41100);
    const dayProgress = progress(position, 21500, 30500);
    find("clock-hand").setAttribute(
      "transform",
      `rotate(${dayProgress * 1080} 27 27)`,
    );
    const day = Math.min(
      3,
      events.filter((event) => event.patch.days && event.at <= position).length,
    );
    find("day").textContent = `${day} ${day === 1 ? "сутки" : "суток"}`;
    const today = events
      .filter((event) => event.patch.days && event.at <= position)
      .at(-1);
    const feeProgress = today
      ? progress(position, today.at, today.at + 1800)
      : 1;
    const fee = find("daily-fee");
    fee.style.opacity =
      today && feeProgress < 1 ? String(1 - feeProgress) : "0";
    fee.style.transform = `translateY(${-feeProgress * 22}px)`;
    wheels.forEach((wheel) =>
      wheel.setAttribute("transform", `rotate(${truckX * 1.4})`),
    );
  }

  function updateRecord(received, state, announce) {
    [
      "inbound",
      "outbound",
      "container",
      "type",
      "status",
      "location",
      "payment",
    ].forEach((name) => {
      find(name).textContent = state[name];
    });
    find("storage").textContent =
      `${state.days} ${state.days === 1 ? "сутки" : "суток"} × ${money(RATE)}`;
    find("amount").textContent = money(state.days * RATE);
    find("event-count").textContent = String(received.length).padStart(2, "0");
    const log = find("events");
    log.replaceChildren(
      ...received.map((event) => {
        const item = document.createElement("li");
        const stamp = document.createElement("span");
        stamp.className = "tms-event-source";
        stamp.textContent = `${event.time} / ${event.source}`;
        const text = document.createElement("span");
        text.textContent = event.text;
        item.append(stamp, text);
        return item;
      }),
    );
    log.scrollTop = log.scrollHeight;
    find("empty-log").hidden = received.length > 0;
    demo
      .querySelectorAll(".tms-field-updated")
      .forEach((node) => node.classList.remove("tms-field-updated"));
    const latest = received.at(-1);
    if (latest) {
      latest.fields.forEach((name) =>
        find(name).classList.add("tms-field-updated"),
      );
      find("signal-source").textContent = latest.source;
      find("signal-text").textContent = latest.text;
      find("record-source").textContent = `Получено: ${latest.source}`;
      if (announce)
        find("announcement").textContent =
          `${latest.source}. ${latest.text}. Статус заявки: ${state.status}.`;
    } else {
      find("signal-source").textContent = "Площадка";
      find("signal-text").textContent = "Здесь появятся сигналы с терминала";
      find("record-source").textContent = "Ожидание событий";
      find("announcement").textContent =
        "Начало истории. Заявка ожидает прибытия автомобиля.";
    }
    demo.classList.toggle("is-paid", state.payment.startsWith("Оплачено"));
    demo.classList.toggle("is-closed", state.closed);
    find("finale").hidden = !state.closed;
  }

  function render(announce = true) {
    const chapter = chapters.findLastIndex((item) => time >= item.start);
    const { received, state } = stateAt(time);
    if (lastEvent !== received.length) {
      updateRecord(received, state, announce);
      lastEvent = received.length;
    }
    if (chapter !== lastChapter) {
      find("chapter-title").textContent = chapters[chapter].title;
      find("chapter-detail").textContent = chapters[chapter].detail;
      find("chapter-number").textContent = String(chapter + 1).padStart(2, "0");
      chapterButtons.forEach((button, index) => {
        if (index === chapter) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
        button.classList.toggle("is-complete", index < chapter);
      });
      lastChapter = chapter;
    }
    const settling = time >= 53500;
    if (settling && !demo.classList.contains("is-settling")) {
      // Fade a stable scene while its grid column folds away; don't squash it.
      demo.style.setProperty(
        "--tms-yard-width",
        `${find("yard").clientWidth}px`,
      );
    }
    demo.classList.toggle("is-settling", settling);
    find("yard").setAttribute("aria-hidden", String(settling));
    find("payment-signal").hidden = time < 53500;
    find("payment-source").textContent =
      time >= 58000
        ? "Платёжная система → TMS"
        : "Счёт отправлен · ожидание оплаты";
    find("payment-message").textContent =
      time >= 58000
        ? "Оплата получена: 3 600 ₽"
        : "Все операции завершены. Ожидается внешний сигнал об оплате.";
    const latest = received.at(-1);
    const signalProgress = latest
      ? progress(time, latest.at, latest.at + 900)
      : 0;
    demo.style.setProperty("--tms-signal-progress", signalProgress);
    demo.style.setProperty("--tms-progress", time / TOTAL);
    const second =
      time >= TOTAL ? Math.ceil(TOTAL / 1000) : Math.floor(time / 1000);
    if (second !== lastSecond) {
      find("elapsed").textContent =
        `${String(Math.floor(second / 60)).padStart(2, "0")}:${String(second % 60).padStart(2, "0")}`;
      lastSecond = second;
    }
    drawScene(time);
    nextButton.disabled = time >= TOTAL;
    syncControls();
  }

  function syncControls() {
    mainButton.textContent =
      time >= TOTAL
        ? "↻ Смотреть заново"
        : motionOff
          ? started
            ? "Следующее событие →"
            : "Пройти по событиям →"
          : playing
            ? "Ⅱ Пауза"
            : started
              ? "▶ Продолжить"
              : "▶ Смотреть историю";
    mainButton.setAttribute(
      "aria-label",
      mainButton.textContent.replace(/^[^А-Я]+/, ""),
    );
    speedButton.hidden = motionOff;
    find("playback-note").textContent = motionOff
      ? "Без движения · события по нажатию"
      : playing && (!inView || document.hidden)
        ? "Пауза, пока демо вне экрана"
        : "Около минуты · можно выбрать этап";
    demo.classList.toggle("is-playing", playing && inView && !document.hidden);
  }

  function stopFrame() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = null;
  }
  function tick(now) {
    frame = 0;
    if (!playing || !inView || document.hidden) {
      lastFrame = null;
      return;
    }
    if (lastFrame !== null)
      time = Math.min(TOTAL, time + Math.min(now - lastFrame, 100) * speed);
    lastFrame = now;
    if (time >= TOTAL) playing = false;
    render();
    schedule();
  }
  function schedule() {
    if (playing && inView && !document.hidden && !frame)
      frame = requestAnimationFrame(tick);
  }
  function seek(position) {
    stopFrame();
    playing = false;
    started = true;
    time = Math.min(TOTAL, Math.max(0, position));
    render();
  }
  function reset(autoplay = false) {
    stopFrame();
    time = 0;
    started = autoplay;
    playing = autoplay && !motionOff;
    lastEvent = -2;
    lastChapter = -2;
    render();
    schedule();
  }
  mainButton.addEventListener("click", () => {
    if (time >= TOTAL) {
      reset(!motionOff);
      return;
    }
    if (motionOff) {
      seek(events.find((event) => event.at > time)?.at ?? TOTAL);
      if (time >= events.at(-1).at) seek(TOTAL);
      return;
    }
    started = true;
    playing = !playing;
    stopFrame();
    render(false);
    schedule();
  });
  restartButton.addEventListener("click", () => reset(false));
  find("replay").addEventListener("click", () => {
    // The replay button disappears with the final panel; keep keyboard focus.
    mainButton.focus({ preventScroll: true });
    reset(!motionOff);
    demo.scrollIntoView({
      behavior: motionOff ? "instant" : "smooth",
      block: "start",
    });
  });
  nextButton.addEventListener("click", () =>
    seek(
      chapters.find((chapter) => chapter.inspect > time + 1)?.inspect ?? TOTAL,
    ),
  );
  chapterButtons.forEach((button, index) =>
    button.addEventListener("click", () => seek(chapters[index].inspect)),
  );
  speedButton.addEventListener("click", () => {
    speed = speed === 1 ? 2 : 1;
    speedButton.textContent = `${speed}×`;
    speedButton.setAttribute(
      "aria-label",
      `Скорость ${speed}×. Переключить на ${speed === 1 ? 2 : 1}×`,
    );
  });
  document.addEventListener("portfolio:motionchange", () => {
    motionOff = document.documentElement.classList.contains("motion-off");
    if (motionOff) {
      playing = false;
      stopFrame();
    }
    render(false);
  });
  document.addEventListener("visibilitychange", () => {
    stopFrame();
    syncControls();
    schedule();
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        stopFrame();
        syncControls();
        schedule();
      },
      { threshold: 0.08 },
    ).observe(demo);

  find("controls").hidden = false;
  find("chapters").hidden = false;
  render(false);
})();
