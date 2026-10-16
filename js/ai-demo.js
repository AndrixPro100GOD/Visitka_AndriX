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
  const TOTAL = 133000;
  const PRODUCT_START = 108000;
  const FINALE_START = 129000;
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
      inspect: 27500,
      label: "Ревью и правила",
      title: "Проверяю изменения агентов и задаю правила",
      detail:
        "Открываю HTML-отчёт прямо в чате: сравниваю поведение до и после изменений, проверяю замечания. Фиксирую соглашения в AGENTS.md, настройки форматирования и правила для литералов и ресурсов.",
    },
    {
      start: 37000,
      inspect: 44000,
      label: "Миграция",
      title: "Проверяю миграцию на копии данных",
      detail:
        "Просматриваю SQL, применяю миграцию к обезличенной копии БД и сравниваю заказы до и после. Сверяю количество, суммы и статусы, открываю старый заказ в новой версии.",
    },
    {
      start: 46000,
      inspect: 54000,
      label: "Pipeline",
      title: "Настраиваю порядок поставки и защиту окружений",
      detail:
        "Связываю тесты, сборку образа и staging в workflow. В настройках production включаю подтверждение, ограничиваю ветки и секреты среды. Сверяю инструкцию выпуска и отката.",
    },
    {
      start: 60000,
      inspect: 68500,
      label: "Тесты → релиз",
      title: "Пишу тест, фиксирую код и проверяю выпуск в Actions",
      detail:
        "Добавляю проверку повторного резервирования и отправляю коммит. В Actions читаю ошибку, исправляю код и отправляю новый коммит. Проверяю новый прогон и staging, затем подтверждаю публикацию версии.",
    },
    {
      start: 86000,
      inspect: 89000,
      label: "Нагрузка",
      title: "Масштабирование проверяю нагрузочным тестом",
      detail:
        "Web и Phone работают через общий API и L7 Ingress. Я задаю профиль синтетических запросов и сверяю CPU с настроенным HPA. Число посетителей само по себе не определяет потребность в репликах.",
    },
    {
      start: 101000,
      inspect: 104600,
      label: "Итерации",
      title: "Сверяю результат нескольких итераций",
      detail:
        "Проверяю мобильный клиент и сверяю интеграцию с общим контрактом. В темах сохранены правила, мои исправления, миграции и документация. Сопоставляю результат с критериями приёмки.",
    },
    {
      start: PRODUCT_START,
      inspect: 111000,
      label: "ERP",
      title: "Прохожу рабочие сценарии ERP",
      detail:
        "Открываю разделы ERP и проверяю поведение после выпуска. Позади остаются темы, отчёты ревью, миграция, коммиты и проверки. Разделы демонстрационного приложения можно переключать вручную.",
    },
    {
      start: FINALE_START,
      inspect: TOTAL,
      label: "Итог",
      title: "Задаю направление. Проверяю качество.",
      detail:
        "Я определяю требования, контролирую архитектуру и качество, принимаю результат. Агенты ускоряют реализацию, тесты и инфраструктуру — время уходит на полезную работу.",
    },
  ];
  const tour = [
    { at: 109400, page: "dashboard" },
    { at: 111900, page: "shop" },
    { at: 114800, page: "analytics" },
    { at: 117700, page: "bids" },
    { at: 120600, page: "team" },
    { at: 123500, page: "account" },
    { at: 126400, page: "dashboard" },
  ];
  const pageNames = {
    dashboard: "Обзор",
    shop: "Магазин",
    analytics: "Аналитика",
    bids: "Заявки",
    team: "Команда",
    account: "Аккаунт",
  };

  // These are illustrative artifacts from the ERP example, not this site's code or test results.
  const gitSets = {
    review: {
      count: "+46  −12",
      files: [
        ["C#", "OrderEndpoints.cs", "M"],
        ["RES", "Labels.resx", "M"],
        ["API", "erp.openapi.yaml", "M"],
        ["HTML", "review.html", "+1"],
      ],
      diff: [
        '- { message: "Ошибка" }',
        '+ { code: "stock.insufficient",',
        "+   available: 0 }",
        "+ UI → Labels.StockUnavailable",
      ],
    },
    reservation: {
      count: "+32  −9",
      files: [
        ["C#", "StockRepository.cs", "M"],
        ["C#", "ReservationTests.cs", "M"],
        ["API", "erp.openapi.yaml", "M"],
        ["MD", "release-notes.md", "M"],
      ],
      diff: [
        "+ UPDATE stock",
        "+ SET available = available - @qty",
        "+ WHERE sku = @sku",
        "+   AND available >= @qty;",
        "+ # affectedRows == 0 → 409",
      ],
    },
    rules: {
      count: "+42  −8",
      files: [
        ["MD", "AGENTS.md", "+18"],
        ["CFG", ".editorconfig", "+8"],
        ["MD", "adr-001.md", "+12"],
        ["C#", "ArchitectureTests.cs", "+4"],
      ],
      diff: [
        "+ # Правила проекта",
        "+ Policy → OrderPolicies",
        "+ UI-тексты → Resources",
        "+ Контракт → тест + документация",
      ],
    },
    migrations: {
      count: "+62  −4",
      files: [
        ["SQL", "AddExternalRef.sql", "M"],
        ["C#", "AddExternalRef.cs", "+24"],
        ["C#", "MigrationTests.cs", "+18"],
        ["MD", "migration-plan.md", "+16"],
      ],
      diff: [
        "+ ALTER TABLE orders",
        "+   ADD COLUMN external_ref",
        "+   text NULL;",
        "+ # сверка старых заказов",
      ],
    },
    integration: {
      count: "+84  −12",
      files: [
        ["API", "erp.openapi.yaml", "M"],
        ["C#", "AccountingClient.cs", "+32"],
        ["C#", "ContractTests.cs", "+24"],
        ["MD", "integration.md", "+16"],
      ],
      diff: [
        "+ Idempotency-Key: required",
        "+ duplicate: same orderId",
        "+ retry: exponential backoff",
        "+ contractVersion: v1",
      ],
    },
    tests: {
      count: "+54  −6",
      files: [
        ["C#", "ReservationTests.cs", "+18"],
        ["YML", "release.yml", "M"],
      ],
      diff: [
        "+ Assert.Equal(",
        "+   HttpStatusCode.Conflict,",
        "+   second.StatusCode);",
      ],
    },
    pipeline: {
      count: "+76  −10",
      files: [
        ["YML", "ci.yml", "M"],
        ["OCI", "Dockerfile", "M"],
        ["YML", "deployment.yaml", "M"],
        ["MD", "release-checklist.md", "+12"],
      ],
      diff: [
        "+ image:",
        "+   needs: [unit, integration, e2e]",
        "+ deploy:",
        "+   needs: [image, migration-check]",
        "+   environment: staging",
      ],
    },
    environment: {
      count: "+98  −14",
      files: [
        ["YML", "release.yml", "M"],
        ["YML", "deployment.yaml", "M"],
        ["YML", "hpa.yaml", "+18"],
        ["OCI", "Dockerfile", "M"],
      ],
      diff: [
        "+ environment: production",
        "+ resources:",
        "+   requests: { cpu: 500m }",
        "+   limits: { cpu: '1' }",
        "+ # reviewers: в Settings",
      ],
    },
    runbook: {
      count: "+124  −14",
      files: [
        ["MD", "runbook.md", "M"],
        ["MD", "migration-plan.md", "M"],
        ["MD", "integration.md", "M"],
        ["YML", "release.yml", "M"],
      ],
      diff: [
        "+ ## Перед выпуском",
        "+ Backup → проверка восстановления",
        "+ SQL review → staging → smoke",
        "+ Rollback: образ + совместимая схема",
      ],
    },
    mobile: {
      count: "+126  −14",
      files: [
        ["API", "erp.openapi.yaml", "M"],
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
    architecture: "Архитектура и правила",
    orders: "Ревью кода заказов",
    warehouse: "Склад и миграции",
    integrations: "Контракты интеграций",
    tests: "Тесты и исправления",
    delivery: "CI/CD и документация",
    scaling: "Нагрузочный тест",
    mobile: "Мобильные клиенты",
  };
  const scenes = [
    {
      at: 18000,
      mode: "chat",
      thread: "architecture",
      status: "Черновик плана",
      git: "rules",
      agent:
        "Подготовил черновик. До реализации нужны ваши решения по границам модулей и общим соглашениям.",
      label: "ADR-001 · архитектурный черновик",
      state: "На рассмотрении",
      body: "ASP.NET Core → модули → PostgreSQL\nBlazor + Phone → общий API\nРешения и ограничения → в репозиторий",
      humanAt: 19500,
      action: "Я · сопоставляю план с требованиями",
      human:
        "Выбираю границы модулей и критерии приёмки. Дальше проверяю изменения и отчёты в отдельных темах.",
    },
    {
      at: 21000,
      mode: "report",
      thread: "architecture",
      status: "Мои правила",
      git: "rules",
      agent:
        "Собрал HTML-отчёт по изменениям. Замечания привязаны к файлам и правилам репозитория.",
      action: "Я · задаю правила и открываю отчёт",
      human:
        "Фиксирую соглашения в AGENTS.md и .editorconfig: форматирование, строковые литералы, ресурсы текстов и тесты контрактов.",
      caption:
        "Задаю правила общего репозитория. Открываю HTML-отчёт внутри чата: здесь сравниваю поведение, замечания и результаты проверок, а рядом просматриваю Git-diff.",
    },
    {
      at: 25000,
      mode: "report",
      thread: "orders",
      status: "Моё ревью",
      git: "review",
      agent:
        "В отчёте выделен ответ API при нехватке товара. Остальные замечания сгруппированы по файлам.",
      action: "Я · проверяю поведение и оставляю замечание",
      human:
        "В ответе 409 вижу только «Ошибка». Прошу сохранить код stock.insufficient и доступный остаток; текст интерфейса — в Resources.",
      caption:
        "В отчёте сравниваю ответ API и понятность сообщения. Оставляю замечание к diff: стабильный код ошибки, данные остатка и локализованный текст должны согласоваться.",
    },
    {
      at: 30000,
      mode: "report",
      thread: "orders",
      status: "Проверяю доработку",
      git: "review",
      agent:
        "Обновил контракт ответа, ресурсы интерфейса и проверку схемы. Отчёт связан с новым diff.",
      action: "Я · сверяю доработку с замечанием",
      human:
        "Повторно читаю diff и проверяю контракт ответа. Закрываю замечание после сверки кода, ресурсов и отчёта.",
      caption:
        "Сверяю новый diff с моим замечанием и закрываю его после проверки. В отчёте остаются сравнение «было → стало» и история решений.",
    },
    {
      at: 33000,
      mode: "report",
      thread: "integrations",
      status: "Контракт и документация",
      git: "integration",
      agent:
        "Добавил описание stock.insufficient в OpenAPI и документацию клиентской интеграции.",
      action: "Я · сверяю общий контракт",
      human:
        "Проверяю, что Web и Phone получают одинаковый код ошибки, а изменение отражено в OpenAPI и документации.",
    },
    {
      at: 37000,
      panel: "migration",
      thread: "warehouse",
      status: "Копия базы данных",
      git: "migrations",
      action: "Я · просматриваю SQL миграции",
      human:
        "Добавляю nullable external_ref для интеграции. Проверяю совместимость схемы и применяю миграцию к обезличенной копии БД.",
      caption:
        "Просматриваю SQL и проверяю добавление external_ref: старые заказы должны остаться доступными. Перед запуском сверяю резервную копию и совместимость схемы.",
    },
    {
      at: 40500,
      panel: "migration",
      thread: "warehouse",
      status: "Миграция на копии БД",
      git: "migrations",
      action: "Я · применяю миграцию и сравниваю данные",
      human:
        "Сверяю количество заказов, суммы и статусы до и после изменения. Значения старых полей должны совпасть.",
      caption:
        "Применяю миграцию к копии БД. Сравниваю 2 184 заказа до и после: количество, суммы и статусы должны сохраниться. В таблицах показаны три примера.",
    },
    {
      at: 43500,
      panel: "migration",
      thread: "warehouse",
      status: "Данные сверены",
      git: "migrations",
      action: "Я · открываю старый заказ в новой версии",
      human:
        "Проверяю заказ #1042 через обновлённое API. Сохраняю отчёт сверки и результат проверки совместимости.",
      caption:
        "Сверка проходит: количество и суммы совпадают, старые заказы открываются через обновлённое API. Сохраняю отчёт миграции для следующего этапа поставки.",
    },
    {
      at: 46000,
      panel: "pipeline",
      thread: "delivery",
      status: "Настройка workflow",
      git: "pipeline",
      action: "Я · задаю зависимости jobs",
      human:
        "Связываю unit, integration, e2e, сборку образа и staging. Проверка миграции обязательна до поставки.",
      caption:
        "Настраиваю workflow: обязательные проверки → образ Docker → staging. Сверяю зависимости jobs и проверку миграции до поставки.",
    },
    {
      at: 51000,
      panel: "pipeline",
      thread: "delivery",
      status: "Защита production",
      git: "environment",
      action: "Я · настраиваю окружения",
      human:
        "В Settings / Environments включаю моё подтверждение production, ограничение ветки и отдельные секреты среды.",
      caption:
        "В настройках репозитория защищаю production: задаю подтверждение выпуска, разрешённую ветку и секреты окружения. Проверяю, что workflow ссылается на нужную среду.",
    },
    {
      at: 55500,
      panel: "pipeline",
      thread: "delivery",
      status: "Проверка порядка выпуска",
      git: "runbook",
      action: "Я · сверяю workflow с runbook",
      human:
        "Проверяю backup, SQL review, smoke-проверки и откат на совместимую схему. Сохраняю конфигурацию перед запуском.",
      caption:
        "Сверяю схему поставки с инструкцией: резервная копия, проверка SQL, staging, smoke и откат. Подтверждаю настройки; дальше фиксирую тесты и запускаю workflow коммитом.",
    },
    {
      at: 60000,
      panel: "release",
      thread: "tests",
      status: "Пишу интеграционный тест",
      git: "tests",
      action: "Я · добавляю сценарий второго резервирования",
      human:
        "Задаю остаток 1, резервирую его первым заказом и ожидаю 409 для второго. Проверяю поведение через API.",
      caption:
        "Сам дописываю интеграционный тест: при остатке 1 только один заказ получает резерв. Для второго ожидаю 409 и stock.insufficient. Затем фиксирую тест в Git.",
    },
    {
      at: 63800,
      panel: "release",
      thread: "tests",
      status: "Commit → push",
      git: "tests",
      action: "Я · фиксирую тест и отправляю коммит",
      human:
        "Просматриваю staged diff, создаю коммит и отправляю ветку. Push запускает workflow для конкретной версии кода.",
      caption:
        "Просматриваю staged diff и отправляю коммит a41c9e2 с тестом. GitHub Actions запускает run #184 на этом коммите; по нему можно проверить состав кода и результаты.",
    },
    {
      at: 66300,
      panel: "release",
      thread: "tests",
      status: "Actions · run #184",
      git: "tests",
      action: "Я · открываю прогон в Actions",
      human:
        "Слежу за jobs и читаю лог интеграционных тестов. Образ и поставка зависят от их результата.",
    },
    {
      at: 68200,
      panel: "release",
      thread: "tests",
      status: "Integration · FAIL",
      git: "tests",
      tone: "failure",
      action: "Я · читаю ошибку и останавливаю выпуск",
      human:
        "Второй заказ получил 200 вместо 409. Открываю резервирование: списание не проверяет доступный остаток.",
      caption:
        "В Actions вижу падение моего теста: второй заказ получает 200 вместо 409. Поставка заблокирована. Нахожу списание без проверки остатка и готовлю исправление.",
    },
    {
      at: 70700,
      panel: "release",
      thread: "orders",
      status: "Моя правка · резервирование",
      git: "reservation",
      action: "Я · защищаю списание остатка",
      human:
        "Объединяю проверку остатка и списание в одну операцию. Ноль изменённых строк означает 409; тест остаётся в регрессии.",
      caption:
        "Исправляю резервирование: условное UPDATE проверяет available и уменьшает остаток одной операцией. При нуле изменённых строк возвращаю 409. Просматриваю связанные изменения и сохраняю тест.",
    },
    {
      at: 73000,
      panel: "release",
      thread: "orders",
      status: "Новый commit → новый run",
      git: "reservation",
      action: "Я · принимаю исправление и объединяю в master",
      human:
        "Проверяю diff и объединяю тест с исправлением в master. Коммит b72d8f0 запускает отдельный run #185.",
      caption:
        "После ревью объединяю тест и исправление в master. Новый коммит b72d8f0 запускает run #185: проверяется исправленный код, затем собирается новый образ.",
    },
    {
      at: 74500,
      panel: "release",
      thread: "delivery",
      status: "Actions · run #185",
      git: "reservation",
      action: "Я · сверяю повторные проверки",
      human:
        "Проверяю unit, integration, e2e и миграцию на новом коммите. Читаю отчёт перед переходом к staging.",
      caption:
        "На новом коммите проверяю полный прогон unit, integration, e2e и миграции. После успешных jobs workflow собирает образ с привязкой к b72d8f0.",
    },
    {
      at: 77300,
      panel: "release",
      thread: "delivery",
      status: "Проверяю staging",
      git: "runbook",
      action: "Я · проверяю сборку на staging",
      human:
        "Сверяю версию образа, открываю заказ и проверяю резервирование. Читаю smoke-отчёт и результаты миграции.",
      caption:
        "Открываю сборку на staging, проверяю старые заказы и повторное резервирование. Сверяю smoke-отчёт, миграцию и версию образа перед подтверждением production.",
    },
    {
      at: 79800,
      panel: "release",
      thread: "delivery",
      status: "Ожидается моё подтверждение",
      git: "runbook",
      action: "Я · подтверждаю проверенный выпуск",
      human:
        "Сверяю commit, образ и инструкцию отката. Подтверждаю production в защищённом окружении.",
      caption:
        "После проверки staging сверяю commit b72d8f0, образ и инструкцию отката. Подтверждаю deployment в production через защищённое окружение.",
    },
    {
      at: 81500,
      panel: "release",
      thread: "delivery",
      status: "Публикация новой версии",
      git: "runbook",
      action: "Я · наблюдаю за публикацией",
      human:
        "Проверяю готовность pod, smoke-проверку и версию приложения после rollout.",
      caption:
        "Наблюдаю за rollout: проверяю readiness новых pod, smoke-проверку и версию приложения. Сохраняю связь выпуска с коммитом и результатами Actions.",
    },
    {
      at: 84000,
      panel: "release",
      thread: "delivery",
      status: "Версия v0.8.4 опубликована",
      git: "runbook",
      tone: "success",
      action: "Я · проверяю опубликованную версию",
      human:
        "Сверяю v0.8.4 с коммитом b72d8f0 и открываю приложение после выпуска.",
      caption:
        "Проверяю опубликованную v0.8.4: commit b72d8f0, готовность приложения и smoke-отчёт совпадают. Дальше проверяю систему нагрузкой.",
    },
    {
      at: 86000,
      thread: "scaling",
      status: "Мой нагрузочный профиль",
      git: "environment",
      agent:
        "Инструмент нагрузки генерирует заданный профиль. HPA использует метрики CPU и настройки ресурсов.",
      label: "load-profile.md · staging",
      state: "Условный пример",
      body: "Web + Phone → L7 Ingress → .NET API\nHPA: target CPU 60% от requests 500m\nceil(2 × 78 / 60) = 3 реплики\nПрофиль: 3 мин · время сжато",
      action: "Я · задаю нагрузку и проверяю метрики",
      human:
        "Фиксирую смесь запросов и ресурсы pod. Сверяю CPU, задержки и ошибки, затем оцениваю решение HPA.",
    },
    {
      at: 101000,
      thread: "mobile",
      status: "Сверка клиентов",
      git: "mobile",
      agent: "Обновил клиент по OpenAPI и добавил сценарий переподключения.",
      label: "Контракт Web / Phone · ревью",
      state: "Проверено",
      tone: "success",
      body: "Web: заказ создан → API\nPhone: OrderUpdated → новый статус\nReconnect → перечитать данные из API",
      action: "Я · проверяю клиент и документацию API",
      human:
        "Прохожу сценарий потери связи и восстановления. Проверяю актуальность данных и отсутствие дубликатов.",
    },
    {
      at: 105200,
      thread: "architecture",
      status: "Моя приёмка итерации",
      git: "runbook",
      agent:
        "Собрал отчёты для приёмки. Открытые задачи сохранены в отдельных темах.",
      label: "release-checklist.md · мои отметки",
      state: "Сверено",
      tone: "success",
      body: "✓ Правила, HTML-ревью и доработки\n✓ Миграция и сохранность данных\n✓ Тесты, коммиты и Actions\n✓ Staging, выпуск и нагрузка",
      action: "Я · сверяю результат с критериями",
      human:
        "Закрываю проверенные замечания. Решения, отчёты и инструкция выпуска сохранены; дальше прохожу ERP как пользователь.",
    },
    {
      at: PRODUCT_START,
      thread: "architecture",
      status: "Пользовательская проверка",
      git: "runbook",
      agent:
        "Реализация и проверки завершены в рамках утверждённых правил и ревью.",
      label: "История работы",
      state: "Проверено",
      tone: "success",
      body: "Правила → HTML-отчёт → моё ревью\nМиграция → тест → исправление\nGit → Actions → моя приёмка",
      action: "Я · проверяю рабочие сценарии",
      human:
        "Открываю разделы ERP и сверяю поведение с требованиями. Контролирую архитектуру и качество после выпуска.",
    },
  ].map((scene) => ({
    mode: "editor",
    tone: "neutral",
    agent: "",
    label: "",
    state: "",
    body: "",
    humanAt: scene.at,
    ...scene,
  }));

  // Every consequential state is reachable with reduced motion and restored on rewind.
  const checkpoints = [
    ...new Set([
      ...chapters.map((chapter) => chapter.inspect),
      22500,
      31000,
      35000,
      39000,
      42000,
      48000,
      57500,
      61500,
      65000,
      67500,
      71500,
      73500,
      75500,
      78500,
      80500,
      82500,
      85000,
      93500,
      98500,
      106500,
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
  let activeArtifact = "";

  function setText(element, text) {
    if (element.textContent !== text) element.textContent = text;
  }
  function codeLines(lines) {
    return lines.map((line) => {
      const row = document.createElement("span");
      row.textContent = line || " ";
      row.classList.toggle("ad-line-added", line.startsWith("+"));
      row.classList.toggle("ad-line-removed", line.startsWith("-"));
      return row;
    });
  }
  function paintGit(name, before) {
    const key = `${name}:${before ?? ""}`;
    if (activeGit === key) return;
    activeGit = key;
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
      ...(before ? before.split("\n").slice(0, 4) : git.diff).map((line) => {
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
    const editor = scene.mode !== "chat" && time >= scene.at;
    const edited = !scene.before || time >= scene.editAt;
    demo.classList.toggle("ad-developer-mode", editor);
    demo.classList.toggle("ad-report-mode", scene.mode === "report");
    if (activeScene !== index) {
      activeScene = index;
      setText(find("thread-title"), threadNames[scene.thread]);
      setText(find("agent-text"), scene.agent);
      setText(find("artifact-label"), scene.label);
      find("artifact").dataset.tone = scene.tone;
      setText(find("human-action"), scene.action);
      setText(find("human-text"), scene.human);
      threads.forEach((thread) =>
        thread.classList.toggle(
          "ad-main-chat",
          thread.dataset.adThread === scene.thread,
        ),
      );
      const delivery =
        scene.thread === "delivery" || scene.thread === "scaling";
      setText(find("worker-ui"), "Blazor · контракт и ресурсы");
      setText(
        find("worker-api"),
        scene.git === "reservation"
          ? "Резервирование · мой diff"
          : "API · контракты модулей",
      );
      setText(
        find("worker-ops"),
        delivery
          ? "CI/CD · по моему workflow"
          : time >= 76500
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
    const artifactKey = `${index}:${edited}`;
    if (activeArtifact !== artifactKey) {
      activeArtifact = artifactKey;
      find("artifact-body").replaceChildren(
        ...codeLines((edited ? scene.body : scene.before).split("\n")),
      );
      setText(
        find("artifact-state"),
        scene.before && edited ? "Моя правка сохранена ✓" : scene.state,
      );
      setText(
        find("editor-tab"),
        scene.before ? "Изменения" : "Файл / проверка",
      );
      find("artifact").classList.toggle(
        "ad-edit-saved",
        Boolean(scene.before && edited),
      );
      paintGit(scene.git, edited ? null : scene.before);
    }
    if (index === 0 && time >= 18000) {
      const fraction = Math.max(0, Math.min(1, (time - 18100) / 1300));
      setText(
        find("agent-text"),
        scene.agent.slice(0, Math.floor(fraction * scene.agent.length)) || " ",
      );
    }
    setText(find("dev-status"), time >= 18000 ? scene.status : "Новая тема");
    setText(
      find("chat-state"),
      time >= 105200
        ? "✓ Ревью итерации"
        : time >= 22500
          ? "✓ Правила в репозитории"
          : time >= 18000
            ? "Архитектурное ревью"
            : "Новая задача",
    );
    setText(
      find("tests-thread-state"),
      time >= 76500
        ? "✓ Повторный прогон"
        : time >= 73000
          ? "Новый commit · повтор"
          : time >= 68200
            ? "Резервирование · FAIL"
            : "Проверки запущены",
    );
    find("human-review").classList.toggle(
      "ad-human-visible",
      time >= scene.humanAt,
    );
    renderReport();
    renderEngineering(scene);
    return scene;
  }
  let reportState = "";
  let engineeringState = "";
  const releaseJobs = [...demo.querySelectorAll("[data-ad-job]")];

  function renderReport() {
    if (time < 21000 || time >= 37000) return;
    const state =
      time < 25000 ? "rules" : time < 30000 ? "finding" : "reviewed";
    if (reportState === state) return;
    reportState = state;
    find("review-report").dataset.review = state;
    const reviewed = state === "reviewed";
    setText(find("report-badge"), reviewed ? "Принято ✓" : "На ревью");
    setText(find("report-contract"), reviewed ? "✓ Сверен" : "На ревью");
    setText(
      find("report-after-label"),
      reviewed
        ? "Стало · проверенный контракт"
        : "Предлагаю · ожидаемый контракт",
    );
    setText(
      find("report-test"),
      reviewed ? "✓ Diff проверен" : "Ожидаю доработку",
    );
    setText(
      find("report-comment"),
      reviewed
        ? "Повторно сверяю контракт, Resources и тест с новым diff. Закрываю замечание."
        : state === "finding"
          ? "Оставляю замечание: сохраняю код ошибки и available; текст интерфейса — в Resources."
          : "Сверяю HTML-отчёт с Git-diff и правилами проекта. Приёмку выполняю после проверки.",
    );
  }

  function renderEngineering(scene) {
    if (!scene.panel) return;
    const panel = scene.panel;
    let state =
      panel === "migration"
        ? time < 40500
          ? "review"
          : time < 42500
            ? "running"
            : time < 43500
              ? "matched"
              : "verified"
        : panel === "pipeline"
          ? time < 51000
            ? "jobs"
            : time < 55500
              ? "environment"
              : "ready"
          : time < 63800
            ? "test"
            : time < 66300
              ? "commit"
              : time < 68200
                ? "running"
                : time < 70700
                  ? "failed"
                  : time < 73000
                    ? "fix"
                    : time < 74500
                      ? "pushed"
                      : time < 77300
                        ? "verify"
                        : time < 79800
                          ? "staging"
                          : time < 81500
                            ? "approval"
                            : time < 84000
                              ? "deploy"
                              : "published";
    if (panel === "release") {
      demo
        .querySelectorAll(".ad-test-editor pre > span")
        .forEach((line, index) =>
          line.classList.toggle("ad-line-visible", time >= 60000 + index * 150),
        );
    }
    const key =
      panel +
      ":" +
      state +
      ":" +
      scene.at +
      ":" +
      (time >= 76000) +
      ":" +
      (time >= 67500);
    if (engineeringState === key) return;
    engineeringState = key;
    const engineering = find("engineering");
    engineering.dataset.panel = panel;
    engineering.dataset.state = state;
    ["migration", "pipeline", "release"].forEach((name) => {
      find(name + "-panel").hidden = name !== panel;
    });
    setText(
      find("engineering-brand"),
      {
        migration: "Проверка миграции",
        pipeline: "Workflow · настройки поставки",
        release: "Git → Actions → выпуск",
      }[panel],
    );
    setText(
      find("engineering-location"),
      panel === "migration"
        ? "Копия БД"
        : panel === "pipeline"
          ? "release.yml"
          : "v0.8.4",
    );
    setText(find("engineering-action"), scene.action);
    setText(find("engineering-human"), scene.human);
    if (panel === "migration") {
      const matched = time >= 42500;
      setText(find("migration-count"), matched ? "2 184 → 2 184" : "2 184 → …");
      setText(
        find("migration-status"),
        {
          review: "Мой SQL review",
          running: "Применяю на копии…",
          matched: "Сверка пройдена ✓",
          verified: "Проверяю старый заказ ✓",
        }[state],
      );
      setText(
        find("migration-match"),
        matched
          ? "Суммы и статусы совпали ✓"
          : time >= 40500
            ? "Сверяю…"
            : "Ожидаю запуск",
      );
      setText(
        find("migration-order"),
        time >= 43500 ? "Открывается · 48 500 ₽ ✓" : "Проверю после миграции",
      );
      return;
    }
    if (panel === "pipeline") {
      setText(
        find("pipeline-ready"),
        state === "ready"
          ? "Настройки сохранены ✓"
          : state === "environment"
            ? "Защищаю production"
            : "Связываю jobs",
      );
      return;
    }
    const nextRun = time >= 73000;
    const failed = !nextRun && time >= 68200;
    setText(
      find("commit-label"),
      time >= 63800 ? "Commit & push ✓" : "Просматриваю изменения",
    );
    setText(
      find("commit-command"),
      time >= 63800
        ? '$ git commit -m "test: second reservation"\n[feature/reservation a41c9e2]\n$ git push origin feature/reservation'
        : "$ git diff --staged\n+ ReservationTests.cs\n+ release.yml",
    );
    setText(
      find("actions-title"),
      nextRun ? "Release v0.8.4 #185" : "Reservation checks #184",
    );
    setText(
      find("actions-trigger"),
      nextRun
        ? "release.yml · push · master"
        : "release.yml · push · feature/reservation",
    );
    setText(
      find("actions-commit"),
      nextRun
        ? "b72d8f0 · fix: guard stock reservation"
        : "a41c9e2 · test: prevent a second reservation",
    );
    setText(
      find("actions-status"),
      failed
        ? "Failure"
        : state === "published"
          ? "Success"
          : state === "approval"
            ? "Waiting for review"
            : "In progress",
    );
    find("actions-status").dataset.result = failed
      ? "failed"
      : state === "published"
        ? "success"
        : "running";
    setText(
      find("actions-run-id"),
      nextRun ? "run #185 · b72d8f0" : "run #184 · a41c9e2",
    );
    const statuses = !nextRun
      ? {
          unit: time >= 67500 ? "success" : "running",
          integration: failed ? "failed" : "running",
          e2e: time >= 67500 ? "success" : "running",
          image: failed ? "skipped" : "queued",
          staging: failed ? "skipped" : "queued",
          production: failed ? "skipped" : "queued",
        }
      : {
          unit: time >= 74500 ? "success" : "running",
          integration:
            time >= 76000 ? "success" : time >= 74500 ? "running" : "queued",
          e2e: time >= 76000 ? "success" : time >= 74500 ? "running" : "queued",
          image:
            time >= 77300 ? "success" : time >= 76000 ? "running" : "queued",
          staging:
            time >= 79800 ? "success" : time >= 77300 ? "running" : "queued",
          production:
            time >= 84000
              ? "success"
              : time >= 81500
                ? "running"
                : time >= 79800
                  ? "waiting"
                  : "queued",
        };
    const names = {
      success: "Passed",
      running: "Running",
      failed: "Failed",
      queued: "Queued",
      skipped: "Skipped",
      waiting: "Review",
    };
    const symbols = {
      success: "✓",
      running: "◌",
      failed: "×",
      queued: "○",
      skipped: "−",
      waiting: "◇",
    };
    releaseJobs.forEach((job) => {
      const status = statuses[job.dataset.adJob];
      job.dataset.status = status;
      setText(job.querySelector("i"), symbols[status]);
      setText(job.querySelector("b"), names[status]);
    });
    setText(
      find("deployment-approval"),
      time >= 81500 ? "Мной подтверждено ✓" : "Подтверждаю после staging",
    );
    setText(
      find("actions-log-title"),
      failed
        ? "Integration · ошибка теста"
        : time >= 84000
          ? "Production · проверка версии"
          : time >= 81500
            ? "Production · rollout"
            : time >= 79800
              ? "Production · protected environment"
              : time >= 77300
                ? "Staging · smoke"
                : "Checks · live log",
    );
    const log = failed
      ? "FAIL CannotReserveTwice\nexpected: 409 Conflict\nactual:   200 OK\n\nImage / deploy: skipped\nОткрываю StockRepository.cs"
      : time >= 84000
        ? "✓ rollout complete\n✓ /health/ready → 200\n✓ smoke passed\nversion: v0.8.4\ncommit: b72d8f0"
        : time >= 81500
          ? "✓ environment approved by АК\n→ rollout image:b72d8f0\n→ readiness probes\n→ smoke production"
          : time >= 79800
            ? "✓ staging smoke passed\n✓ migration check passed\nimage: b72d8f0\n\nWaiting for environment review"
            : time >= 77300
              ? "✓ image:b72d8f0 published\n→ deploy staging\n✓ orders preserved\n→ reservation smoke checks"
              : time >= 76000
                ? "✓ unit          148 / 148\n✓ integration    36 / 36\n✓ e2e            12 / 12\n✓ migration check\n→ build Docker image:b72d8f0"
                : nextRun
                  ? "push → master @ b72d8f0\n→ новый run #185\n→ dotnet test\n→ integration + e2e\n→ migration check"
                  : "checkout a41c9e2\n→ dotnet test\n✓ unit checks\n→ CannotReserveTwice\n→ проверяю отчёт";
    setText(find("actions-log"), log);
  }

  function renderInfrastructure() {
    if (time < 86000 || time >= 101000) return;
    const rising = time >= 90000;
    const holding = time >= 92500;
    const scaling = time >= 95500;
    const scaled = time >= 97500;
    const ramp = Math.min(1, Math.max(0, (time - 90000) / 2500));
    const infra = find("infra");
    infra.classList.toggle("ad-load-rising", rising);
    infra.classList.toggle("ad-scaling", scaling);
    infra.classList.toggle("ad-scaled", scaled);
    setText(
      find("request-rate"),
      Math.round(500 + 1000 * ramp).toLocaleString("ru-RU"),
    );
    setText(
      find("load-label"),
      scaled
        ? "Тот же профиль · CPU 52%"
        : holding
          ? "Удерживаю нагрузку 3 мин*"
          : rising
            ? "Повышаю частоту запросов"
            : "Базовый профиль · CPU 26%",
    );
    setText(
      find("replica-count"),
      scaled ? "3 реплики" : scaling ? "2 → 3 реплики" : "2 реплики",
    );
    setText(
      find("hpa-status"),
      scaled
        ? "3 / 3 готовы · CPU 52%"
        : scaling
          ? "ceil(2 × 78 / 60) = 3"
          : holding
            ? "CPU 78% · target 60%"
            : rising
              ? `CPU ${Math.round(26 + 52 * ramp)}% · target 60%`
              : "2 / 2 готовы · target 60%",
    );
    setText(
      find("infra-state"),
      scaled
        ? "Проверяю CPU, задержки и ошибки"
        : scaling
          ? "HPA добавляет 1 pod API"
          : "CPU относительно requests 500m",
    );
    setText(
      find("infra-explanation"),
      scaled
        ? "При том же профиле CPU снизился до 52%. Проверяю задержки и ошибки. Реплик API стало три; база данных остаётся общей."
        : scaling
          ? "Средний CPU 78% при цели 60%: HPA рассчитывает 3 реплики. Ingress распределяет запросы между готовыми pod."
          : holding
            ? "Удерживаю профиль 3 минуты и наблюдаю CPU. Время теста сжато; числа показывают принцип, это не бенчмарк."
            : "Задаю смесь синтетических запросов Web / Phone и ресурсы pod. Проверяю метрики; количество людей не служит сигналом HPA.",
    );
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
          : time < 37000
            ? "working"
            : time < 46000
              ? "migration"
              : time < 60000
                ? "pipeline"
                : time < 86000
                  ? "release"
                  : time < 101000
                    ? "infrastructure"
                    : time < PRODUCT_START
                      ? "threads"
                      : time < FINALE_START
                        ? "product"
                        : "finale",
    );
    demo.classList.toggle("ad-has-tools", time >= 21000);
    demo.classList.toggle("ad-many-threads", time >= 33000);
    demo.classList.toggle("ad-verified", time >= 76500);
    demo.classList.toggle("ad-finished", time >= FINALE_START);
    const typing = time >= 6600 && time < 13600;
    demo.classList.toggle("ad-is-typing", typing);
    demo.classList.toggle("ad-brief-sent", time >= 18000);
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
    const scene = renderWork();
    renderInfrastructure();
    setText(
      find("detail"),
      time >= 97500 && time < 101000
        ? "Условный нагрузочный профиль: 500 → 1 500 запросов/с. После выдержки CPU 78% при цели HPA 60% даёт 2 → 3 реплики; затем CPU 52%. Время сжато. Проверяю также задержки и ошибки."
        : time >= 92500 && time < 97500
          ? "Удерживаю синтетический профиль 3 минуты и наблюдаю CPU относительно requests 500m. HPA рассчитывает ceil(2 × 78 / 60) = 3. Число пользователей не определяет число реплик; время наблюдения сжато."
          : time >= 18000 && time < 86000
            ? (scene.caption ?? scene.human ?? chapters[chapter].detail)
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
      time >= 41900
        ? "Рабочая область"
        : time >= 40600
          ? "Навигация и аккаунт"
          : time >= 39300
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
            : "2 мин 13 с · этапы можно выбирать в любой момент. Сценарий, код, проверки и данные ERP — демонстрационные.",
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
