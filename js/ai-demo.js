/* One clock makes every scene reversible, including the cursor's product tour. */
(() => {
  "use strict";

  const demo = document.getElementById("ai-demo");
  if (!demo) return;
  const elements = new Map();
  const find = (name) => {
    if (!elements.has(name))
      elements.set(name, demo.querySelector(`[data-ad="${name}"]`));
    return elements.get(name);
  };
  const TOTAL = 112000;
  const PRODUCT_START = 87000;
  const FINALE_START = 108000;
  const prompt = [
    "Разработать ERP: .NET 10, ASP.NET Core API, Blazor WebAssembly.",
    "1. Архитектура: модульный монолит; заказы, склад, аналитика. Контракты OpenAPI, интеграции с учётной системой.",
    "2. RBAC: Admin / Manager / Viewer. Проверка прав на сервере; аудит операций и транзакционное резервирование остатков.",
    "3. Web + мобильные клиенты; общие API и события SignalR.",
    "4. Unit, integration и e2e: роли, конкурентные заказы, критические сценарии.",
    "5. Docker + Kubernetes: probes, лимиты ресурсов, L7 Ingress, HPA.",
    "6. CI/CD: build → tests → image → staging; production после моего ревью.",
    "7. Структурированные логи, OpenTelemetry, метрики и нагрузочные проверки. Сначала согласовать архитектуру и критерии приёмки.",
  ].join("\n");
  const chapters = [
    {
      start: 0,
      inspect: 3500,
      label: "Контекст",
      title: "Сначала — контекст и требования",
      detail:
        "После обсуждения бизнес-процессов создаю проект. В отдельных темах сохранятся требования, решения и история проверок.",
    },
    {
      start: 6000,
      inspect: 15000,
      label: "Техзадание",
      title: "Ставлю инженерную задачу",
      detail:
        "Фиксирую стек .NET 10 и Blazor, границы модулей, права, интеграции, Web и мобильные клиенты. Заранее определяю тесты, поставку и наблюдаемость.",
    },
    {
      start: 18000,
      inspect: 23500,
      label: "Решения",
      title: "Архитектура проходит моё ревью",
      detail:
        "Оркестратор предлагает план и распределяет работу. Я утверждаю границы модулей, читаю изменения и уточняю правила заказов и склада.",
    },
    {
      start: 34000,
      inspect: 39700,
      label: "Сборка",
      title: "Интерфейс собирается поверх бизнес-логики",
      detail:
        "Компоненты Blazor складываются в рабочее пространство: шапка, навигация, аккаунт и модули. Это промежуточный результат, дальше — проверки поведения.",
    },
    {
      start: 42000,
      inspect: 47000,
      label: "Проверки",
      title: "Ошибка → исправление → повторная проверка",
      detail:
        "Интеграционный тест обнаруживает лишние права у Viewer. Я уточняю требование: проверка нужна на сервере. Агент исправляет код и повторяет unit, integration и e2e.",
    },
    {
      start: 57000,
      inspect: 62500,
      label: "Поставка",
      title: "Приложению нужен воспроизводимый запуск",
      detail:
        "Готовим Dockerfile, манифесты Kubernetes и CI/CD: сборка, тесты, образ, тестовый контур. Я проверяю probes, ресурсы и подтверждение перед production.",
    },
    {
      start: 65000,
      inspect: 68000,
      label: "Нагрузка",
      title: "Под капотом — работа для многих пользователей",
      detail:
        "Web и смартфоны работают одновременно. L7 Ingress распределяет запросы между контейнерами .NET; SignalR передаёт события, а метрики показывают нагрузку.",
    },
    {
      start: 80000,
      inspect: 83600,
      label: "Итерации",
      title: "Большая ERP — множество связанных задач",
      detail:
        "Открываем тему мобильных клиентов. Рядом остаются интеграции и мониторинг: у каждой задачи свой контекст и статус. Я сверяю результат с критериями приёмки.",
    },
    {
      start: PRODUCT_START,
      inspect: 90000,
      label: "ERP",
      title: "Результат решений, проверок и итераций",
      detail:
        "Теперь можно пройти рабочие сценарии ERP. Позади остаются темы, ревью, исправления и проверки. Разделы демонстрационного приложения доступны и вручную.",
    },
    {
      start: FINALE_START,
      inspect: TOTAL,
      label: "Итог",
      title: "Человек направляет. Агенты ускоряют.",
      detail:
        "Я определяю требования, контролирую архитектуру и качество, принимаю результат. Агенты ускоряют реализацию, тесты и инфраструктуру — время уходит на полезную работу.",
    },
  ];
  const tour = [
    { at: 88400, page: "dashboard" },
    { at: 90900, page: "shop" },
    { at: 93800, page: "analytics" },
    { at: 96700, page: "bids" },
    { at: 99600, page: "team" },
    { at: 102500, page: "account" },
    { at: 105400, page: "dashboard" },
  ];
  const pageNames = {
    dashboard: "Обзор",
    shop: "Магазин",
    analytics: "Аналитика",
    bids: "Заявки",
    team: "Команда",
    account: "Аккаунт",
  };

  // These are illustrative project artifacts, not test results from this website.
  const gitSets = {
    architecture: {
      count: "+86  −12",
      files: [
        ["MD", "adr-001.md", "+24"],
        ["C#", "Program.cs", "+18"],
        ["API", "openapi.yaml", "+32"],
        ["C#", "Permissions.cs", "+12"],
      ],
      diff: [
        "+ builder.Services",
        "+   .AddOrdersModule()",
        "+   .AddWarehouseModule();",
        "+ app.MapOrderEndpoints();",
      ],
    },
    orders: {
      count: "+214  −18",
      files: [
        ["C#", "OrderService.cs", "+76"],
        ["RZR", "Orders.razor", "+64"],
        ["C#", "OrderTests.cs", "+42"],
        ["API", "openapi.yaml", "+32"],
      ],
      diff: [
        '+ group.MapPost("/orders",',
        "+   CreateOrderAsync);",
        "+ await stock.ReserveAsync(",
        "+   order.Items, ct);",
      ],
    },
    warehouse: {
      count: "+302  −26",
      files: [
        ["C#", "StockService.cs", "+88"],
        ["RZR", "Stock.razor", "+52"],
        ["C#", "StockTests.cs", "+61"],
        ["SQL", "reservations.sql", "+24"],
      ],
      diff: [
        "+ await using var tx = await",
        "+   db.Database",
        "+   .BeginTransactionAsync();",
        "+ await ReserveStockAsync();",
        "+ await tx.CommitAsync();",
      ],
    },
    tests: {
      count: "+58  −4",
      files: [
        ["C#", "AccessTests.cs", "+26"],
        ["C#", "OrderTests.cs", "+18"],
        ["E2E", "orders.spec.ts", "+14"],
        ["C#", "OrderEndpoints.cs", "M"],
      ],
      diff: [
        "+ Assert.Equal(",
        "+   HttpStatusCode.Forbidden,",
        "+   response.StatusCode);",
      ],
    },
    fix: {
      count: "+64  −6",
      files: [
        ["C#", "OrderEndpoints.cs", "+2"],
        ["C#", "Permissions.cs", "+4"],
        ["C#", "AccessTests.cs", "+26"],
        ["E2E", "orders.spec.ts", "+14"],
      ],
      diff: [
        "- .RequireAuthorization();",
        "+ .RequireAuthorization(",
        '+   "Orders.Approve");',
        "+ // проверка на сервере",
      ],
    },
    docker: {
      count: "+112  −8",
      files: [
        ["OCI", "Dockerfile", "+26"],
        ["YML", "deployment.yaml", "+42"],
        ["YML", "ingress.yaml", "+24"],
        ["YML", "ci.yml", "+20"],
      ],
      diff: [
        "+ FROM mcr.microsoft.com/dotnet/aspnet:10.0",
        "+ COPY --from=build /app/publish .",
        '+ ENTRYPOINT ["dotnet",',
        '+   "Pulse.Api.dll"]',
      ],
    },
    kubernetes: {
      count: "+148  −8",
      files: [
        ["YML", "deployment.yaml", "+42"],
        ["YML", "ingress.yaml", "+24"],
        ["YML", "hpa.yaml", "+18"],
        ["YML", "ci.yml", "+38"],
      ],
      diff: [
        "+ replicas: 2",
        "+ readinessProbe:",
        "+   httpGet:",
        "+     path: /health/ready",
        "+     port: 8080",
      ],
    },
    pipeline: {
      count: "+186  −8",
      files: [
        ["YML", "ci.yml", "+38"],
        ["YML", "deployment.yaml", "+42"],
        ["YML", "hpa.yaml", "+18"],
        ["MD", "runbook.md", "+28"],
      ],
      diff: [
        "+ - run: dotnet test",
        "+ - run: npx playwright test",
        "+ - run: docker build -t pulse .",
        "+ - run: helm upgrade pulse ./chart",
        "+ environment: staging",
      ],
    },
    mobile: {
      count: "+126  −14",
      files: [
        ["API", "openapi.yaml", "+28"],
        ["C#", "MobileClient.cs", "+44"],
        ["C#", "EventsHub.cs", "+22"],
        ["E2E", "sync.spec.ts", "+32"],
      ],
      diff: [
        "+ connection.On<OrderEvent>(",
        '+   "OrderUpdated",',
        "+   RefreshOrder);",
        "+ await ReloadAfterReconnect();",
      ],
    },
  };
  const threadNames = {
    architecture: "Архитектура и стек",
    orders: "Модуль заказов",
    warehouse: "Модуль склада",
    tests: "Тесты и покрытие",
    delivery: "CI/CD и Kubernetes",
    scaling: "Масштабирование и нагрузка",
    mobile: "Мобильные клиенты",
  };
  const scenes = [
    {
      at: 18000,
      thread: "architecture",
      status: "Согласование",
      git: "architecture",
      agent:
        "Предлагаю модульный монолит: отдельные границы заказов, склада и доступов. Сначала контракты API и критерии приёмки, затем параллельная работа.",
      label: "ADR-001 · архитектура",
      state: "На ревью",
      tone: "neutral",
      body: "ASP.NET Core API → модули → PostgreSQL\nBlazor WebAssembly + mobile → OpenAPI\nRBAC на сервере · аудит операций",
      humanAt: 22200,
      action: "Я · читаю план и утверждаю",
      human:
        "Границы модулей согласованы. Интеграции — через контракты; права проверяем на API. Сначала тесты критических сценариев.",
    },
    {
      at: 26000,
      thread: "orders",
      status: "Ревью API",
      git: "orders",
      agent:
        "Агенты разделили работу: Blazor-компоненты, бизнес-правила .NET и тестовые сценарии. Изменения заказов готовы к просмотру.",
      label: "Модуль заказов · контракт",
      state: "Изменения",
      tone: "neutral",
      body: "POST /api/orders → резерв склада\nManager → создать / подтвердить\nViewer → только чтение",
      humanAt: 27400,
      action: "Я · читаю diff и уточняю",
      human:
        "Повторный запрос не должен создавать второй заказ. Добавьте ключ идемпотентности и проверку повторной отправки.",
    },
    {
      at: 29000,
      thread: "warehouse",
      status: "Уточнение правил",
      git: "warehouse",
      agent:
        "Добавляю резервирование остатков и интеграционные тесты конкурентных заказов. Заказы и склад сохраняют согласованное состояние.",
      label: "Склад · конкурентный доступ",
      state: "Ревью логики",
      tone: "neutral",
      body: "Один остаток → два запроса\nТранзакция + контроль версии\nПодтверждён только один резерв",
      humanAt: 30700,
      action: "Я · правлю критерий приёмки",
      human:
        "Резерв — атомарный. При конфликте откатываем операцию целиком. Добавьте тест двух одновременных заказов на последний товар.",
    },
    {
      at: 42000,
      thread: "tests",
      status: "Тесты запущены",
      git: "tests",
      agent:
        "Интерфейс собран. Запускаю unit, integration и e2e: права доступа, заказы, склад и пользовательские сценарии.",
      label: "dotnet test · Playwright",
      state: "Выполняются",
      tone: "neutral",
      body: "✓ unit           148 / 148\n… integration     проверка RBAC\n… e2e             сценарий заказа",
      humanAt: 43000,
      action: "Я · проверяю сценарии",
      human:
        "Сверяю проверки с ТЗ. Особое внимание — доступам и резервированию остатков: одного успешного build недостаточно.",
    },
    {
      at: 44400,
      thread: "tests",
      status: "Найден дефект",
      git: "tests",
      agent:
        "Тест выявил дефект: Viewer может подтвердить заказ через API. Кнопка скрыта, но серверная проверка недостаточна. Останавливаю поставку.",
      label: "Integration · ViewerCannotApprove",
      state: "FAIL · 1",
      tone: "failure",
      body: "POST /api/orders/42/approve\nexpected: 403 Forbidden\nactual:   200 OK",
      humanAt: 46000,
      action: "Я · уточняю исправление",
      human:
        "Проверяйте policy Orders.Approve на сервере. Скрытой кнопки недостаточно. Повторите проверку всех ролей и прямого вызова API.",
    },
    {
      at: 49500,
      thread: "tests",
      status: "Исправление",
      git: "fix",
      agent:
        "Добавляю policy на endpoint и регрессионный тест прямого запроса. Manager сохраняет право подтверждения, Viewer получает 403.",
      label: "OrderEndpoints.cs · diff",
      state: "Исправлено",
      tone: "neutral",
      body: '− .RequireAuthorization();\n+ .RequireAuthorization("Orders.Approve");\n+ ViewerCannotApprove() → 403',
      humanAt: 50700,
      action: "Я · ревью исправления",
      human:
        "Policy стоит на серверном endpoint. Решение принято; теперь повторите весь набор тестов, включая положительный сценарий Manager.",
    },
    {
      at: 53200,
      thread: "tests",
      status: "Повторный прогон",
      git: "fix",
      agent:
        "Повторяю весь набор после исправления. Проверяю запрет для Viewer и разрешение для Manager, затем браузерный сценарий заказа.",
      label: "Повторная проверка",
      state: "RUNNING",
      tone: "neutral",
      body: "✓ unit           148 / 148\n✓ integration     36 / 36\n… e2e             11 / 12",
      humanAt: 53200,
      action: "Я · жду завершения проверок",
      human:
        "Переход к поставке — после полного прогона. Исправление доступа не должно сломать рабочие сценарии остальных ролей.",
    },
    {
      at: 55300,
      thread: "tests",
      status: "Проверки пройдены",
      git: "fix",
      agent:
        "Повторный прогон завершён. Проверка прав на сервере и браузерные сценарии проходят. Дальше — упаковка и тестовый контур.",
      label: "Регрессия после исправления",
      state: "PASS",
      tone: "success",
      body: "✓ unit           148 / 148\n✓ integration     36 / 36\n✓ e2e             12 / 12",
      humanAt: 55700,
      action: "Я · принимаю исправление",
      human:
        "Проверки и diff просмотрены. Разрешаю сборку образа для staging; готовность production проверим отдельно.",
    },
    {
      at: 57000,
      thread: "delivery",
      status: "Упаковка",
      git: "docker",
      agent:
        "Готовлю multi-stage Dockerfile: сборка и публикация .NET 10, затем runtime-образ. Конфигурация окружения и секреты передаются отдельно.",
      label: "Dockerfile · .NET 10",
      state: "Образ",
      tone: "neutral",
      body: "sdk:10.0 → dotnet publish\naspnet:10.0 → Pulse.Api.dll\nnon-root · порт 8080 · конфигурация извне",
      humanAt: 58300,
      action: "Я · проверяю запуск",
      human:
        "Секреты не включаем в образ. Проверьте запуск без root, health endpoints и единый образ для staging и production.",
    },
    {
      at: 60000,
      thread: "delivery",
      status: "Манифесты",
      git: "kubernetes",
      agent:
        "Добавляю Deployment, Service, Ingress и HPA. Настраиваю readiness/liveness, requests/limits и завершение запросов при обновлении.",
      label: "deployment.yaml · Kubernetes",
      state: "Ревью",
      tone: "neutral",
      body: "replicas: 2 · rolling update\nreadiness: /health/ready\nHPA: CPU 60% · min 2 / max 6",
      humanAt: 61300,
      action: "Я · согласую инфраструктуру",
      human:
        "Лимиты и probes согласованы. Перед production — проверка миграций, резервных копий и плана отката. Сначала нагрузка на staging.",
    },
    {
      at: 63200,
      thread: "delivery",
      status: "CI/CD",
      git: "pipeline",
      agent:
        "CI/CD собирает код, повторяет тесты и публикует образ в registry. Тестовый контур обновляется автоматически; production ожидает подтверждения.",
      label: ".github/workflows/ci.yml",
      state: "STAGING ✓",
      tone: "success",
      body: "✓ build → unit / integration / e2e\n✓ image → registry → staging\n○ production → ручное подтверждение",
      humanAt: 63200,
      action: "Я · контролирую выпуск",
      human:
        "Тестовый контур готов. Проверяем нагрузку и наблюдаемость; публикацию production подтверждаю после приёмки.",
    },
    {
      at: 65000,
      thread: "scaling",
      status: "Нагрузочный прогон",
      git: "pipeline",
      agent:
        "Проверяю совместную работу Web и мобильных клиентов, балансировку трафика, события SignalR и масштабирование по метрикам CPU.",
      label: "Нагрузочный контур",
      state: "НАБЛЮДЕНИЕ",
      tone: "neutral",
      body: "Web + Smartphone → L7 Ingress\n2 → 4 реплики ASP.NET Core API\nOpenTelemetry · логи · метрики",
      humanAt: 65000,
      action: "Я · оцениваю поведение",
      human:
        "Смотрю задержки, ошибки и события при росте нагрузки. Масштабирование приложения не заменяет проверку запросов к базе.",
    },
    {
      at: 80000,
      thread: "mobile",
      status: "Проверка клиентов",
      git: "mobile",
      agent:
        "Web и мобильный клиент используют общий OpenAPI-контракт. SignalR обновляет статусы; после переподключения клиент перечитывает состояние через API.",
      label: "Совместный сценарий",
      state: "Проверено",
      tone: "success",
      body: "Web: заказ создан → API\nSmartphone: OrderUpdated → новый статус\nReconnect → перечитать актуальные данные",
      humanAt: 81600,
      action: "Я · уточняю поведение клиента",
      human:
        "При потере связи покажите статус соединения. После восстановления синхронизируйте данные: события не заменяют источник истины в API.",
    },
    {
      at: 84200,
      thread: "architecture",
      status: "Приёмка итерации",
      git: "pipeline",
      agent:
        "Итерация собрана: модули, права, контракты клиентов, контейнеры и CI/CD. Решения и проверки сохранены в темах; открытые задачи видны отдельно.",
      label: "Критерии приёмки · итерация",
      state: "Ревью",
      tone: "success",
      body: "✓ API, RBAC и сценарии ERP\n✓ исправление → повторные тесты\n✓ staging, нагрузка и телеметрия",
      humanAt: 84900,
      action: "Я · принимаю результат итерации",
      human:
        "Критерии сверены. Теперь прохожу интерфейс как пользователь. Интеграции и оповещения ведём отдельными задачами следующей итерации.",
    },
    {
      at: PRODUCT_START,
      thread: "architecture",
      status: "Демо готово",
      git: "pipeline",
      agent:
        "Итерация готова к пользовательской проверке. Результат — общий итог требований, ревью, исправлений, тестов и настройки инфраструктуры.",
      label: "История работы",
      state: "Проверено",
      tone: "success",
      body: "9 тем · решения и ревью\nFAIL → fix → PASS\nDocker · Kubernetes · CI/CD",
      humanAt: PRODUCT_START,
      action: "Я · проверяю рабочие сценарии",
      human:
        "Открываю разделы ERP и сверяю поведение с требованиями. Направление, архитектура и качество остаются под моим контролем.",
    },
  ];
  // Manual reduced-motion playback must also expose fixes and rechecks.
  const checkpoints = [
    ...new Set([
      ...chapters.map((chapter) => chapter.inspect),
      27900,
      31800,
      51500,
      54100,
      56200,
      58800,
      64100,
      71600,
      76200,
      85700,
    ]),
  ].sort((a, b) => a - b);

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
  const threads = [...demo.querySelectorAll("[data-ad-thread]")];
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
  let activeScene = -1;
  let activeGit = "";

  function setText(element, text) {
    if (element.textContent !== text) element.textContent = text;
  }
  function paintGit(name) {
    if (activeGit === name) return;
    activeGit = name;
    const git = gitSets[name];
    setText(find("git-count"), git.count);
    find("files").replaceChildren(
      ...git.files.map(([kind, name, count]) => {
        const row = document.createElement("span");
        const icon = document.createElement("i");
        const delta = document.createElement("b");
        icon.textContent = kind;
        delta.textContent = count;
        row.append(icon, document.createTextNode(name), delta);
        return row;
      }),
    );
    find("diff").replaceChildren(
      ...git.diff.map((line) => {
        const row = document.createElement("span");
        row.textContent = line;
        row.classList.toggle("ad-diff-removed", line.startsWith("-"));
        return row;
      }),
    );
  }
  function renderWork() {
    const index = Math.max(
      0,
      scenes.findLastIndex((scene) => time >= scene.at),
    );
    const scene = scenes[index];
    if (activeScene !== index) {
      activeScene = index;
      setText(find("thread-title"), threadNames[scene.thread]);
      setText(find("agent-text"), scene.agent);
      setText(find("artifact-label"), scene.label);
      setText(find("artifact-state"), scene.state);
      setText(find("artifact-body"), scene.body);
      find("artifact").dataset.tone = scene.tone;
      setText(find("human-action"), scene.action);
      setText(find("human-text"), scene.human);
      paintGit(scene.git);
      threads.forEach((thread) =>
        thread.classList.toggle(
          "ad-main-chat",
          thread.dataset.adThread === scene.thread,
        ),
      );
      const delivery =
        scene.thread === "delivery" || scene.thread === "scaling";
      setText(
        find("worker-ui"),
        time >= 42000 ? "Blazor · сценарии готовы" : "Blazor · компоненты",
      );
      setText(
        find("worker-api"),
        scene.git === "fix" ? "RBAC · исправление" : "ASP.NET Core · API",
      );
      setText(
        find("worker-ops"),
        delivery
          ? "Docker · K8s · CI/CD"
          : time >= 55300
            ? "Регрессия · PASS"
            : "Unit · integration · e2e",
      );
      const discussion = find("discussion");
      discussion.classList.remove("ad-chat-enter");
      if (playing && !motionOff && time >= 18000) {
        void discussion.offsetWidth;
        discussion.classList.add("ad-chat-enter");
      }
    }
    if (index === 0 && time >= 18000) {
      const fraction = Math.max(0, Math.min(1, (time - 18500) / 3000));
      setText(
        find("agent-text"),
        scene.agent.slice(0, Math.floor(fraction * scene.agent.length)) || " ",
      );
    }
    setText(find("dev-status"), time >= 18000 ? scene.status : "Новая тема");
    setText(
      find("chat-state"),
      time >= 84200
        ? "✓ Ревью итерации"
        : time >= 26000
          ? "✓ План согласован"
          : time >= 18000
            ? "Архитектурное ревью"
            : "Новая задача",
    );
    setText(
      find("tests-thread-state"),
      time >= 55300
        ? "✓ Повторный прогон"
        : time >= 49500
          ? "Исправление · RBAC"
          : time >= 44400
            ? "Ошибка доступа · FAIL"
            : "Проверки запущены",
    );
    find("human-review").classList.toggle(
      "ad-human-visible",
      time >= scene.humanAt,
    );
  }
  function renderInfrastructure() {
    if (time < 65000 || time >= 80000) return;
    const rising = time >= 70000;
    const scaling = time >= 73500;
    const scaled = time >= 75300;
    const infra = find("infra");
    infra.classList.toggle("ad-load-rising", rising);
    infra.classList.toggle("ad-scaling", scaling);
    infra.classList.toggle("ad-scaled", scaled);
    setText(
      find("user-count"),
      Math.round(
        120 + 1080 * Math.min(1, Math.max(0, (time - 70000) / 3000)),
      ).toLocaleString("ru-RU"),
    );
    setText(
      find("load-label"),
      scaled
        ? "Нагрузка распределена"
        : rising
          ? "Входящий трафик растёт"
          : "Обычная нагрузка",
    );
    setText(
      find("replica-count"),
      scaled ? "4 реплики" : scaling ? "2 → 4 реплики" : "2 реплики",
    );
    setText(
      find("hpa-status"),
      scaled
        ? "4 / 4 готовы · CPU 48%"
        : scaling
          ? "CPU > 60% → добавляем pod"
          : rising
            ? "CPU 78% · растёт нагрузка"
            : "2 / 2 готовы · CPU 32%",
    );
    setText(
      find("infra-state"),
      scaled
        ? "Больше пользователей → больше реплик API"
        : scaling
          ? "HPA добавляет мощность"
          : "Наблюдаем за системой",
    );
    setText(
      find("infra-explanation"),
      scaled
        ? "Kubernetes добавил экземпляры API. Ingress распределяет запросы; база данных остаётся общим источником данных."
        : rising
          ? "Пользователей стало больше. Метрики CPU запускают HPA: добавляем контейнеры приложения, чтобы распределить работу."
          : "Web и смартфоны обращаются к одному API. Входящий трафик распределяется между контейнерами.",
    );
    if (time >= 65000 && time < 80000)
      infra.style.setProperty(
        "--ad-flow",
        motionOff ? 0.5 : (time % 1800) / 1800,
      );
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
      time >= tour[0].at && time < FINALE_START && !motionOff && !userExploring;
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
        : time < 18000
          ? "compose"
          : time < 34000
            ? "working"
            : time < 42000
              ? "building"
              : time < 57000
                ? "verified"
                : time < 65000
                  ? "delivery"
                  : time < 80000
                    ? "infrastructure"
                    : time < PRODUCT_START
                      ? "threads"
                      : time < FINALE_START
                        ? "product"
                        : "finale",
    );
    demo.classList.toggle("ad-has-tools", time >= 19800);
    demo.classList.toggle("ad-many-threads", time >= 80000);
    demo.classList.toggle("ad-verified", time >= 55300);
    demo.classList.toggle("ad-finished", time >= FINALE_START);
    const typing = time >= 6600 && time < 13600;
    demo.classList.toggle("ad-is-typing", typing);
    demo.classList.toggle("ad-brief-ready", time >= 13600 && time < 18000);
    setText(
      find("prompt"),
      time >= 18000
        ? "Уточнить решение или поставить следующую задачу…"
        : time >= 13600
          ? prompt
          : typing
            ? prompt.slice(
                0,
                Math.floor(Math.min(1, (time - 6600) / 6300) * prompt.length),
              ) || " "
            : "Опишите задачу…",
    );
    renderWork();
    renderInfrastructure();
    setText(
      find("detail"),
      time >= 75300 && time < 80000
        ? "Нагрузка выросла со 120 до 1 200 пользователей. HPA увеличил число реплик API с двух до четырёх; Ingress распределяет запросы. Логи и метрики помогают проверить результат. Значения условные."
        : time >= 49500 && time < 55300
          ? "После ревью агент добавляет серверную policy Orders.Approve. Повторно проверяем запрет для Viewer, разрешение для Manager и весь набор unit, integration и e2e."
          : time >= 55300 && time < 57000
            ? "Повторные проверки проходят. Я просматриваю исправление и разрешаю сборку образа для тестового контура. Успешные тесты — этап работы, дальше проверяем поставку и нагрузку."
            : chapters[chapter].detail,
    );
    find("empty").style.opacity = time < 2600 || time >= 6000 ? "0" : "1";
    find("empty").style.transform =
      time < 2600
        ? "translateY(8px)"
        : time >= 6000
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
      time >= 39000
        ? "Рабочая область"
        : time >= 37700
          ? "Навигация и аккаунт"
          : time >= 36400
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
            : "1 мин 52 с · этапы можно выбирать в любой момент. Сценарий, код, проверки и данные ERP — демонстрационные.",
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
      seek(checkpoints.find((position) => position > time) ?? TOTAL);
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
        time = chapters.find(
          (chapter) => chapter.start === PRODUCT_START,
        ).inspect;
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
    time = chapters.find((chapter) => chapter.start === PRODUCT_START).inspect;
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
