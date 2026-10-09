/* Progressive enhancement: the full portfolio also works without JavaScript. */
(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionButton = document.getElementById("motion-toggle");
  const motionLabel = document.getElementById("motion-label");
  let motionPreference = "on";
  let motionDisabled = reducedMotion.matches;

  try {
    motionPreference = localStorage.getItem("andrix-motion") || "on";
  } catch {
    /* Storage can be unavailable in private or file:// contexts. */
  }

  function syncMotion() {
    motionDisabled = reducedMotion.matches || motionPreference === "off";
    root.classList.toggle("motion-off", motionDisabled);
    motionButton.setAttribute("aria-pressed", String(!motionDisabled));
    motionLabel.textContent = motionDisabled ? "выкл." : "вкл.";
    motionButton.disabled = reducedMotion.matches;
    motionButton.title = reducedMotion.matches
      ? "Анимации отключены в настройках вашей системы"
      : "Включить или отключить анимации сайта";
    if (motionDisabled) {
      document
        .querySelectorAll(".reveal-ready")
        .forEach((element) => element.classList.add("is-visible"));
    }
    document.dispatchEvent(new Event("portfolio:motionchange"));
  }

  syncMotion();
  motionButton.hidden = false;
  motionButton.addEventListener("click", () => {
    motionPreference = motionDisabled ? "on" : "off";
    try {
      localStorage.setItem("andrix-motion", motionPreference);
    } catch {
      /* Optional preference. */
    }
    syncMotion();
  });
  reducedMotion.addEventListener("change", syncMotion);
  document.getElementById("year").textContent = new Date().getFullYear();

  // Only hide content after a working observer has been created.
  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !motionDisabled) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );
    revealElements.forEach((element) => {
      element.classList.add("reveal-ready");
      revealObserver.observe(element);
    });
    // Keyboard navigation must never land on an invisible control.
    document.addEventListener("focusin", (event) => {
      const element = event.target.closest(".reveal-ready");
      if (element) element.classList.add("is-visible");
    });
  }

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".nav-toggle");
  const navigation = document.getElementById("site-nav");
  const mobileNavigation = window.matchMedia("(max-width: 700px)");

  function closeMenu(restoreFocus = false) {
    header.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  }

  menuButton.hidden = false;
  header.classList.add("nav-enhanced");
  menuButton.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("nav-open"))
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  header.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      if (!header.contains(document.activeElement)) closeMenu();
    });
  });
  mobileNavigation.addEventListener("change", () => closeMenu());

  function revealAnchor(hash) {
    if (!hash || hash === "#") return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    if (target.matches("details")) target.open = true;
    const details = target.closest("details");
    if (details) details.open = true;
    if (target.matches("[data-reveal]")) target.classList.add("is-visible");
  }
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", () => {
      revealAnchor(anchor.hash);
      if (navigation.contains(anchor)) closeMenu();
    });
  });
  window.addEventListener("hashchange", () => revealAnchor(location.hash));
  revealAnchor(location.hash);

  // Reading progress and current section are updated at most once per frame.
  const progress = document.getElementById("reading-progress");
  const navigationTargets = [...navigation.querySelectorAll('a[href^="#"]')]
    .map((anchor) => ({
      anchor,
      section: document.getElementById(anchor.hash.slice(1)),
    }))
    .filter(({ section }) => section);

  // Scroll scenes use document coordinates measured only when layout changes.
  // The page stays native: no scroll interception, pinned spacer or idle loop.
  const hero = document.querySelector("[data-hero]");
  const band = document.querySelector(".kinetic-band");
  const bandTrack = band.querySelector(".kinetic-track");
  const bandSequence = bandTrack.querySelector(".kinetic-sequence");
  let bandTravel = 0;
  const about = document.getElementById("about");
  const approach = document.getElementById("approach");
  const contact = document.getElementById("contact");
  const processFlow = document.querySelector(".process-flow");
  const processSteps = [...document.querySelectorAll("[data-process-step]")];
  const processTitle = document.getElementById("process-title");
  const processOwner = document.getElementById("process-owner");
  const processNumber = document.querySelector(".process-number");
  const processPosition = document.getElementById("process-position");
  const returnCode = document.querySelector(".return-code");
  const returnBehavior = document.querySelector(".return-behavior");
  const scrollPercent = document.getElementById("scroll-percent");
  const storyMedia = [...document.querySelectorAll(".story-media")];
  const sceneBounds = new Map();
  let processCenters = [];
  let activeProcess = -1;
  let lastPercent = -1;
  const clamp = (value) => Math.min(1, Math.max(0, value));
  root.classList.add("scroll-enhanced");

  function fillBand() {
    bandTravel = Math.min(band.clientWidth * 0.28, 360);
    const sequenceWidth = bandSequence.getBoundingClientRect().width;
    if (!sequenceWidth) return;
    // Cover the viewport and the full scroll travel, with one spare repeat.
    // Measure actual text so resizing, zoom and font changes leave no empty tail.
    const copies =
      Math.ceil((band.clientWidth + bandTravel) / sequenceWidth) + 1;
    while (bandTrack.childElementCount < copies)
      bandTrack.appendChild(bandSequence.cloneNode(true));
    while (bandTrack.childElementCount > copies)
      bandTrack.lastElementChild.remove();
  }

  function measureScenes() {
    fillBand();
    [hero, band, about, approach, contact, ...storyMedia].forEach((element) => {
      const rect = element.getBoundingClientRect();
      sceneBounds.set(element, {
        top: rect.top + window.scrollY,
        height: rect.height,
      });
    });
    const flowRect = processFlow.getBoundingClientRect();
    const nodes = processSteps.map((step) => {
      const rect = step.getBoundingClientRect();
      return {
        left: rect.left - flowRect.left,
        right: rect.right - flowRect.left,
        y: rect.top - flowRect.top + rect.height / 2,
      };
    });
    processCenters = nodes.map(
      (node) => node.y + flowRect.top + window.scrollY,
    );
    const connections = processFlow.querySelector("svg");
    connections.setAttribute(
      "viewBox",
      `0 0 ${flowRect.width} ${flowRect.height}`,
    );
    const middle = flowRect.width / 2;
    const spine = `M${middle} ${nodes[0].y}V${nodes[5].y}`;
    connections.querySelector(".flow-spine").setAttribute("d", spine);
    connections.querySelector(".flow-progress").setAttribute("d", spine);
    const laneRight = flowRect.width - 3;
    const radius = Math.min(10, nodes[0].left / 2);
    returnCode.setAttribute(
      "d",
      `M${nodes[3].right} ${nodes[3].y}H${laneRight - radius}Q${laneRight} ${nodes[3].y} ${laneRight} ${nodes[3].y - radius}V${nodes[2].y + radius}Q${laneRight} ${nodes[2].y} ${laneRight - radius} ${nodes[2].y}H${nodes[2].right + 2}`,
    );
    returnBehavior.setAttribute(
      "d",
      `M${nodes[4].left} ${nodes[4].y}H${3 + radius}Q3 ${nodes[4].y} 3 ${nodes[4].y - radius}V${nodes[2].y + radius}Q3 ${nodes[2].y} ${3 + radius} ${nodes[2].y}H${nodes[2].left - 2}`,
    );
  }

  function sceneProgress(element) {
    const bounds = sceneBounds.get(element);
    return clamp(
      (window.scrollY + window.innerHeight - bounds.top) /
        (window.innerHeight + bounds.height),
    );
  }

  function updateScenes(pageRatio) {
    const percent = Math.round(pageRatio * 100);
    if (percent !== lastPercent) {
      scrollPercent.textContent = `${percent}%`;
      lastPercent = percent;
    }
    if (!motionDisabled) {
      root.style.setProperty("--page-turn", `${pageRatio * 720}deg`);
      const heroBounds = sceneBounds.get(hero);
      hero.style.setProperty(
        "--hero-progress",
        clamp(window.scrollY / heroBounds.height).toFixed(4),
      );
      const bandProgress = sceneProgress(band);
      band.style.setProperty("--band-x", `${-bandProgress * bandTravel}px`);
      band.style.setProperty("--star-turn", `${bandProgress * 150}deg`);
      about.style.setProperty("--bio-turn", `${sceneProgress(about) * 140}deg`);
      contact.style.setProperty(
        "--contact-turn",
        `${sceneProgress(contact) * 110 - 55}deg`,
      );
      storyMedia.forEach((element) => {
        const bounds = sceneBounds.get(element);
        if (
          bounds.top > window.scrollY + window.innerHeight ||
          bounds.top + bounds.height < window.scrollY
        )
          return;
        const distance = Math.min(bounds.height * 0.035, 13);
        element.style.setProperty(
          "--image-y",
          `${(sceneProgress(element) * 2 - 1) * distance}px`,
        );
      });
    }

    const readingLine = window.scrollY + window.innerHeight * 0.55;
    let nearest = 0;
    processCenters.forEach((center, index) => {
      if (
        Math.abs(center - readingLine) <
        Math.abs(processCenters[nearest] - readingLine)
      )
        nearest = index;
    });
    const processProgress = clamp(
      (readingLine - processCenters[0]) /
        (processCenters[5] - processCenters[0]),
    );
    approach.style.setProperty(
      "--process-progress",
      processProgress.toFixed(4),
    );
    if (nearest !== activeProcess) {
      activeProcess = nearest;
      processSteps.forEach((step, index) =>
        step.classList.toggle("is-current", index === nearest),
      );
      const current = processSteps[nearest];
      const number = String(nearest + 1).padStart(2, "0");
      processTitle.textContent = current.dataset.title;
      processOwner.textContent = current.dataset.owner;
      processNumber.textContent = number;
      processPosition.textContent = `${number} / 06`;
      returnCode.classList.toggle("is-current", nearest === 3);
      returnBehavior.classList.toggle("is-current", nearest === 4);
    }
  }

  let scrollScheduled = false;
  function updateScrollState() {
    const scrollRange = root.scrollHeight - window.innerHeight;
    const ratio =
      scrollRange > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollRange))
        : 0;
    progress.style.transform = `scaleX(${ratio})`;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
    const boundary = header.offsetHeight + window.innerHeight * 0.3;
    let current = null;
    navigationTargets.forEach(({ anchor, section }) => {
      if (section.getBoundingClientRect().top <= boundary) current = anchor;
    });
    navigationTargets.forEach(({ anchor }) => {
      if (anchor === current) anchor.setAttribute("aria-current", "location");
      else anchor.removeAttribute("aria-current");
    });
    updateScenes(ratio);
    scrollScheduled = false;
  }
  function scheduleScrollState() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(updateScrollState);
  }
  window.addEventListener("scroll", scheduleScrollState, { passive: true });
  function refreshScenes() {
    measureScenes();
    scheduleScrollState();
  }
  window.addEventListener("resize", refreshScenes);
  document.addEventListener("portfolio:motionchange", refreshScenes);
  document
    .querySelectorAll("details")
    .forEach((details) => details.addEventListener("toggle", refreshScenes));
  if ("ResizeObserver" in window) {
    const sceneResizeObserver = new ResizeObserver(refreshScenes);
    sceneResizeObserver.observe(document.body);
    sceneResizeObserver.observe(bandSequence);
  }
  if (document.fonts) document.fonts.ready.then(refreshScenes);
  measureScenes();
  updateScrollState();

  // Short, one-time counters; final values are present in the original HTML.
  if ("IntersectionObserver" in window && !motionDisabled) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          const value = Number(entry.target.dataset.count);
          const start = performance.now();
          function tick(now) {
            const fraction = motionDisabled
              ? 1
              : Math.min((now - start) / 950, 1);
            entry.target.textContent = Math.round(
              value * (1 - (1 - fraction) ** 3),
            );
            if (fraction < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.7 },
    );
    document
      .querySelectorAll("[data-count]")
      .forEach((element) => countObserver.observe(element));
  }

  const toast = document.getElementById("toast");
  let toastTimeout;
  function notify(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 3500);
  }

  const copyButton = document.getElementById("copy-email");
  const emailAddress = document
    .querySelector(".email-link a")
    .getAttribute("href")
    .slice(7);
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copied = true;
      } catch {
        /* Try local-file fallback. */
      }
    }
    if (!copied) {
      const field = document.createElement("textarea");
      field.value = emailAddress;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      document.body.appendChild(field);
      field.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        /* Tell the visitor if copying is blocked. */
      }
      field.remove();
      copyButton.focus({ preventScroll: true });
    }
    notify(
      copied
        ? "Адрес почты скопирован."
        : `Не удалось скопировать. Адрес: ${emailAddress}`,
    );
  });
})();
