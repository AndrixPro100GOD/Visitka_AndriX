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
  const TOTAL = 125000;
  const PRODUCT_START = 100000;
  const FINALE_START = 121000;
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
      label: "Правила и код",
      title: "Я задаю правила и редактирую код",
      detail:
        "Фиксирую границы модулей и общий стиль в правилах проекта. Исправляю строковые литералы в diff, проверяю SQL миграции и контракт интеграции. Агенты продолжают по этим правилам.",
    },
    {
      start: 37000,
      inspect: 44000,
      label: "Проверка UI",
      title: "Я проверяю интерфейс и правлю компоненты",
      detail:
        "Открываю промежуточную сборку, проверяю роли и сценарий заказа. Правлю состояние кнопки и ресурсы локализации в Razor-компоненте. Затем проверяю права отдельно на API.",
    },
    {
      start: 46000,
      inspect: 52000,
      label: "Проверки",
      title: "Я дописываю тесты, нахожу причину и исправляю",
      detail:
        "Добавляю негативный тест прямого запроса к API. Получаю 200 вместо 403, останавливаю merge и нахожу пропущенную policy. Вношу правку, затем проверяю diff, повторный прогон и регрессию.",
    },
    {
      start: 65000,
      inspect: 71000,
      label: "CI/CD и выпуск",
      title: "Я настраиваю поставку и условия выпуска",
      detail:
        "Редактирую workflow, задаю зависимости jobs и защиту production в настройках репозитория. Проверяю Docker, миграции и секреты, дополняю runbook откатом. Автоматизация выполняет согласованный порядок.",
    },
    {
      start: 78000,
      inspect: 81000,
      label: "Нагрузка",
      title: "Масштабирование проверяю нагрузочным тестом",
      detail:
        "Web и Phone работают через общий API и L7 Ingress. Я задаю профиль синтетических запросов и сверяю CPU с настроенным HPA. Число посетителей само по себе не определяет потребность в репликах.",
    },
    {
      start: 93000,
      inspect: 96600,
      label: "Итерации",
      title: "Большая ERP — множество связанных задач",
      detail:
        "Проверяю мобильный клиент и сверяю интеграцию с общим контрактом. В темах сохранены правила, мои исправления, миграции и документация. Сопоставляю результат с критериями приёмки.",
    },
    {
      start: PRODUCT_START,
      inspect: 103000,
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
    { at: 101400, page: "dashboard" },
    { at: 103900, page: "shop" },
    { at: 106800, page: "analytics" },
    { at: 109700, page: "bids" },
    { at: 112600, page: "team" },
    { at: 115500, page: "account" },
    { at: 118400, page: "dashboard" },
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
    literals: {
      count: "+28  −16",
      files: [
        ["C#", "OrderPolicies.cs", "+6"],
        ["C#", "OrderQueries.cs", "M"],
        ["RZR", "Orders.razor", "M"],
        ["RES", "Labels.resx", "+8"],
      ],
      diff: [
        '- .RequireAuthorization("Orders.Read");',
        "+ .RequireAuthorization(",
        "+   OrderPolicies.Read);",
      ],
    },
    migrations: {
      count: "+62  −4",
      files: [
        ["SQL", "stock-migration.sql", "M"],
        ["C#", "StockMigration.cs", "+24"],
        ["C#", "MigrationTests.cs", "+18"],
        ["MD", "migration-plan.md", "+16"],
      ],
      diff: [
        "- ALTER TABLE stock",
        "-   DROP COLUMN legacy_qty;",
        "+ ALTER TABLE stock",
        "+   ADD reserved int DEFAULT 0;",
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
    ui: {
      count: "+38  −14",
      files: [
        ["RZR", "Orders.razor", "M"],
        ["RES", "Labels.resx", "+8"],
        ["CSS", "Orders.razor.css", "M"],
        ["E2E", "order-ui.spec.ts", "+16"],
      ],
      diff: [
        "- <button>Approve</button>",
        '+ <button disabled="@(!CanApprove)">',
        "+   @Labels.Orders.Approve",
        "+ </button>",
      ],
    },
    tests: {
      count: "+54  −6",
      files: [
        ["C#", "AccessTests.cs", "+18"],
        ["C#", "ContractTests.cs", "+14"],
        ["C#", "MigrationTests.cs", "+12"],
        ["E2E", "orders.spec.ts", "+10"],
      ],
      diff: [
        "+ Assert.Equal(",
        "+   HttpStatusCode.Forbidden,",
        "+   response.StatusCode);",
      ],
    },
    fix: {
      count: "+60  −8",
      files: [
        ["C#", "OrderEndpoints.cs", "M"],
        ["C#", "OrderPolicies.cs", "M"],
        ["C#", "AccessTests.cs", "+18"],
        ["MD", "access-rules.md", "+6"],
      ],
      diff: [
        "- .RequireAuthorization();",
        "+ .RequireAuthorization(",
        "+   OrderPolicies.Approve);",
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
        "Черновик архитектуры готов. До реализации нужны ваши решения по границам модулей, контрактам и правилам общего репозитория.",
      label: "ADR-001 · архитектурный черновик",
      state: "На рассмотрении",
      tone: "neutral",
      body: "ASP.NET Core → модули → PostgreSQL\nBlazor + Phone → общий контракт API\nРешения и ограничения фиксируются в репозитории",
      humanAt: 19500,
      action: "Я · сопоставляю план с требованиями",
      human:
        "Выбираю границы модулей и правила совместной работы. Дальше работаю с файлами, diff и проверками.",
    },
    {
      at: 21000,
      mode: "editor",
      thread: "architecture",
      status: "Мой редактор",
      git: "rules",
      agent:
        "Агенты читают правила репозитория; изменения проверяются форматтером и архитектурными тестами.",
      label: "AGENTS.md · общие правила",
      state: "Редактирую",
      tone: "neutral",
      before:
        "# Правила проекта\nГраницы модулей и стиль ещё не зафиксированы.",
      body: "# Правила проекта\n+ Модули общаются через контракты.\n+ Policy → OrderPolicies; UI-тексты → Resources.\n+ Деньги → decimal; миграции → SQL review.\n+ Изменение контракта → тест + документация.",
      editAt: 22500,
      humanAt: 21000,
      action: "Я · фиксирую правила проекта",
      human:
        "Записываю единые соглашения в AGENTS.md и .editorconfig. Закрепляю границы модулей архитектурными тестами.",
      caption:
        "Разработчик создаёт правила общего репозитория: границы модулей, именование, ресурсы текстов, миграции и обязательные проверки. Агенты работают в этих рамках.",
    },
    {
      at: 25000,
      mode: "editor",
      thread: "orders",
      status: "Моя правка diff",
      git: "literals",
      agent:
        "По моей правке агенты обновляют остальные вызовы policy и связанные тесты. Итоговый diff я проверяю снова.",
      label: "OrderQueries.cs · diff",
      state: "Ревью литералов",
      tone: "neutral",
      before:
        '- .RequireAuthorization("Orders.Read");\n// Строка повторяется в нескольких модулях.',
      body: '- .RequireAuthorization("Orders.Read");\n+ .RequireAuthorization(OrderPolicies.Read);\n// Определение — в OrderPolicies.cs:\n+ public const string Read = "Orders.Read";',
      editAt: 26600,
      humanAt: 25000,
      action: "Я · исправляю строковые литералы",
      human:
        "Выношу имя policy в общий контракт. Тексты кнопок переношу в Resources, проверяю типы сумм и согласованность именования.",
      caption:
        "В diff агента нахожу повторяющиеся строки. Сам меняю код: имя права хранится в общем контракте, тексты — в ресурсах. Проверяю связанные вызовы и тесты.",
    },
    {
      at: 29000,
      mode: "editor",
      thread: "warehouse",
      status: "SQL review",
      git: "migrations",
      agent:
        "Агент подготавливает backfill и тест миграции по исправленному мной плану. Разрушительное изменение отложено.",
      label: "stock-migration.sql · проверка",
      state: "Риск потери данных",
      tone: "neutral",
      before:
        "- ALTER TABLE stock DROP COLUMN legacy_qty;\n// Старые данные и клиенты ещё используют колонку.",
      body: "- ALTER TABLE stock DROP COLUMN legacy_qty;\n+ ALTER TABLE stock ADD reserved int DEFAULT 0;\n-- Backfill на копии БД → сверка остатков.\n-- Переключение чтения → удаление позже.",
      editAt: 30600,
      humanAt: 29000,
      action: "Я · исправляю план миграции",
      human:
        "Отклоняю раннее удаление колонки. Проверяю SQL на копии данных, планирую обратимую поставку и сверку остатков после переноса.",
      caption:
        "Разработчик замечает потерю совместимости в миграции агента. Меняет план, проверяет SQL и данные на копии базы, задаёт порядок переноса и отката.",
    },
    {
      at: 33000,
      mode: "editor",
      thread: "integrations",
      status: "Проверка контракта",
      git: "integration",
      agent:
        "Агент приводит клиент и contract-тесты к сверенной спецификации интеграции.",
      label: "integration.md · учётная система",
      state: "Моя сверка",
      tone: "neutral",
      body: "OpenAPI v1 → клиент учётной системы\nПовтор события → тот же orderId\nTimeout → retry с backoff\nИзменение схемы → contract test + документация",
      humanAt: 33000,
      action: "Я · сверяю интеграцию и документацию",
      human:
        "Проверяю реальный контракт и ответы тестового контура. Добавляю случай повторной доставки и описываю обработку ошибок.",
      caption:
        "Сверяю интеграцию с внешней системой: контракт, повторную доставку и ошибки. Дописываю проверочные случаи и документацию, затем принимаю изменения клиента.",
    },
    {
      at: 37000,
      mode: "editor",
      thread: "orders",
      status: "Проверяю UI",
      git: "ui",
      agent:
        "Агент обновляет компоненты по общим правилам; я проверяю промежуточный интерфейс и вношу правки в Razor.",
      label: "Orders.razor · мой diff",
      state: "Проверка ролей",
      tone: "neutral",
      body: '- <button>Approve</button>\n+ <button disabled="@(!CanApprove)">\n+   @Labels.Orders.Approve\n+ </button>',
      humanAt: 37000,
      action: "Я · проверяю сценарий и правлю UI",
      human:
        "Прохожу заказ под разными ролями. Исправляю состояние действия и локализацию; серверные права проверяю следующим тестом.",
    },
    {
      at: 46000,
      mode: "editor",
      thread: "tests",
      status: "Мои тест-кейсы",
      git: "tests",
      agent:
        "Агент запускает дополненный мной набор unit, integration и e2e и собирает результаты.",
      label: "AccessTests.cs · негативные случаи",
      state: "Добавляю тест",
      tone: "neutral",
      body: '+ var response = await viewer.PostAsync(\n+   "/api/orders/42/approve", null);\n+ Assert.Equal(HttpStatusCode.Forbidden,\n+   response.StatusCode);',
      humanAt: 46000,
      action: "Я · дописываю недостающие проверки",
      human:
        "Добавляю прямой вызов API под Viewer: скрытая кнопка не проверяет серверную защиту. Сверяю покрытие с контрактами и миграцией.",
      caption:
        "Сам дописываю тест прямого POST к API под Viewer: ожидаю 403. Отдельно проверяю Manager, повтор события и сохранность данных при миграции.",
    },
    {
      at: 49000,
      mode: "editor",
      thread: "tests",
      status: "Merge остановлен",
      git: "tests",
      agent:
        "Новый тест падает. Агент сохраняет воспроизведение; изменения не переходят к поставке.",
      label: "ViewerCannotApprove · результат",
      state: "FAIL · 1",
      tone: "failure",
      body: "POST /api/orders/42/approve\nexpected: 403 Forbidden\nactual:   200 OK\nOrderEndpoints.cs → пропущена policy",
      humanAt: 49000,
      action: "Я · нахожу причину и останавливаю merge",
      human:
        "Воспроизвожу запрос, читаю endpoint и нахожу общую авторизацию без нужного права. Исправление вношу в код, затем проверяю остальные роли.",
      caption:
        "Мой негативный тест обнаруживает 200 вместо 403. Останавливаю merge, воспроизвожу запрос и нахожу пропущенную policy в endpoint. Дальше сам исправляю код.",
    },
    {
      at: 55000,
      mode: "editor",
      thread: "tests",
      status: "Моё исправление",
      git: "fix",
      agent:
        "Агент обновляет связанные проверки и документацию прав. Мой diff остаётся точкой контроля.",
      label: "OrderEndpoints.cs · моя правка",
      state: "Редактирую",
      tone: "neutral",
      before:
        "- .RequireAuthorization();\n// Аутентификация есть, нужное право не проверяется.",
      body: "- .RequireAuthorization();\n+ .RequireAuthorization(OrderPolicies.Approve);\n// Viewer → 403; Manager → разрешено.",
      editAt: 56600,
      humanAt: 55000,
      action: "Я · исправляю серверную policy",
      human:
        "Ставлю OrderPolicies.Approve на endpoint. Просматриваю связанные изменения агента и сохраняю регрессионный тест прямого запроса.",
      caption:
        "Я вношу исправление в endpoint и просматриваю связанные правки агента. Сервер проверяет общее право OrderPolicies.Approve; регрессионный тест остаётся в проекте.",
    },
    {
      at: 59500,
      mode: "editor",
      thread: "tests",
      status: "Повторный прогон",
      git: "fix",
      agent:
        "Агент повторяет весь набор проверок после моей правки, включая сценарии Manager, Viewer, интеграции и миграцию.",
      label: "Проверки после моего diff",
      state: "RUNNING",
      tone: "neutral",
      body: "✓ unit           148 / 148\n✓ integration     36 / 36\n… e2e             11 / 12",
      humanAt: 59500,
      action: "Я · проверяю регрессию и связанные изменения",
      human:
        "Читаю diff и отчёт целиком. Сопоставляю результаты с моими кейсами и проверяю, что исправление не изменило разрешённые действия.",
      caption:
        "После моей правки идёт полный повтор unit, integration и e2e. Я читаю diff, сверяю отчёт с критериями и проверяю соседние сценарии — разрешённые действия должны сохраниться.",
    },
    {
      at: 63000,
      mode: "editor",
      thread: "tests",
      status: "Моё ревью закрыто",
      git: "fix",
      agent:
        "Повторный прогон завершён. Дальнейшие действия выполняются по workflow, который настраивает разработчик.",
      label: "Регрессия после исправления",
      state: "PASS",
      tone: "success",
      body: "✓ unit           148 / 148\n✓ integration     36 / 36\n✓ e2e             12 / 12",
      humanAt: 63000,
      action: "Я · принимаю проверенный diff",
      human:
        "Проверил код, отчёт и обновление документации прав. Закрываю замечания ревью и разрешаю merge в тестовую ветку.",
      caption:
        "Повторные проверки проходят. Я принимаю diff после чтения кода, отчёта и документации. Дальше сам настраиваю поставку и проверяю тестовый контур; production требует отдельного подтверждения.",
    },
    {
      at: 65000,
      mode: "editor",
      thread: "delivery",
      status: "Настраиваю CI/CD",
      git: "pipeline",
      agent:
        "Агент дополняет шаги сборки в заданном мной workflow. Порядок jobs и условия выпуска определяет разработчик.",
      label: ".github/workflows/ci.yml · мой diff",
      state: "Зависимости jobs",
      tone: "neutral",
      before:
        "- deploy:\n-   needs: [build]\n// Тесты и проверка миграции не блокируют выпуск.",
      body: "+ image:\n+   needs: [unit, integration, e2e]\n+ deploy:\n+   needs: [image, migration-check]\n+   environment: staging",
      editAt: 66700,
      humanAt: 65000,
      action: "Я · связываю jobs и блокирую ранний deploy",
      human:
        "Настраиваю обязательные проверки, порядок сборки образа и поставки. Проверяю Dockerfile, health probes и совместимость миграции.",
      caption:
        "Сам редактирую CI/CD: без тестов и проверки миграции deploy недоступен. Проверяю образ Docker, probes и конфигурацию Kubernetes.",
    },
    {
      at: 69000,
      mode: "editor",
      thread: "delivery",
      status: "Настройки репозитория",
      git: "environment",
      agent:
        "Workflow ссылается на production environment. Защита среды и секреты настраиваются разработчиком в репозитории.",
      label: "Settings / Environments / production",
      state: "Моя настройка",
      tone: "neutral",
      body: "✓ Required reviewers → разработчик\n✓ Deployment branches → master\n✓ Secrets → отдельные для среды\nKubernetes: requests CPU 500m · HPA target 60%",
      humanAt: 69000,
      action: "Я · защищаю окружение и доступы",
      human:
        "Включаю подтверждение выпуска в Settings, ограничиваю ветки и секреты среды. Сверяю ресурсные лимиты и параметры HPA с тестовым профилем.",
    },
    {
      at: 73500,
      mode: "editor",
      thread: "delivery",
      status: "Проверка runbook",
      git: "runbook",
      agent:
        "Автоматизация выполняет утверждённый workflow на staging. Production остаётся за подтверждением разработчика.",
      label: "runbook.md · выпуск и откат",
      state: "Дополняю документацию",
      tone: "neutral",
      body: "1. Backup → проверка восстановления\n2. SQL review → миграция на копии БД\n3. Staging → smoke + contract tests\n4. Rollback: образ + совместимая схема\n5. Production: моё подтверждение",
      humanAt: 73500,
      action: "Я · проверяю миграцию и описываю откат",
      human:
        "Уточняю порядок выпуска, проверку резервной копии и совместимость схемы при откате образа. Сверяю runbook с реальными шагами pipeline.",
      caption:
        "До выпуска дополняю документацию: резервная копия, миграция, smoke-проверки и откат. Проверяю, что runbook соответствует настроенному pipeline.",
    },
    {
      at: 78000,
      mode: "editor",
      thread: "scaling",
      status: "Мой нагрузочный профиль",
      git: "environment",
      agent:
        "Инструмент нагрузки генерирует фиксированный профиль запросов. Масштабирование оценивается по метрикам и настройкам HPA.",
      label: "load-profile.md · staging",
      state: "Условный пример",
      tone: "neutral",
      body: "Web + Phone → L7 Ingress → .NET API\nHPA: target CPU 60% от requests 500m\n2 × 78% / 60% → ceil(2.6) = 3 реплики\nНагрузка удерживается 3 мин · время сжато",
      humanAt: 78000,
      action: "Я · задаю нагрузку и проверяю метрики",
      human:
        "Фиксирую смесь запросов, ресурсы pod и длительность прогона. Сверяю CPU, задержки и ошибки, затем оцениваю решение HPA.",
    },
    {
      at: 93000,
      mode: "editor",
      thread: "mobile",
      status: "Сверка клиентов",
      git: "mobile",
      agent:
        "Агент обновляет клиент по общему OpenAPI-контракту и добавляет сценарий переподключения.",
      label: "Контракт Web / Phone · ревью",
      state: "Проверено",
      tone: "success",
      body: "Web: заказ создан → API\nPhone: OrderUpdated → новый статус\nReconnect → перечитать данные из API",
      humanAt: 93000,
      action: "Я · проверяю клиент и документацию API",
      human:
        "Прохожу сценарий потери связи и восстановления. Проверяю, что клиент перечитывает актуальные данные и не создаёт дубликаты.",
    },
    {
      at: 97200,
      mode: "editor",
      thread: "architecture",
      status: "Моя приёмка итерации",
      git: "runbook",
      agent:
        "Результаты собраны для приёмки. Незакрытые задачи остаются в отдельных темах проекта.",
      label: "release-checklist.md · мои отметки",
      state: "Сверено",
      tone: "success",
      body: "✓ Правила, diff и мои исправления\n✓ Миграция, контракты и регрессия\n✓ CI/CD, настройки среды и runbook\n✓ Нагрузка и пользовательские сценарии",
      humanAt: 97200,
      action: "Я · сверяю результат с критериями",
      human:
        "Закрываю только проверенные замечания. Решения, мои правки и инструкции сохранены в репозитории; дальше прохожу ERP как пользователь.",
    },
    {
      at: PRODUCT_START,
      mode: "editor",
      thread: "architecture",
      status: "Пользовательская проверка",
      git: "runbook",
      agent:
        "Агенты ускорили реализацию и проверки в рамках общего проекта. Решения и приёмка оставались за разработчиком.",
      label: "История работы",
      state: "Проверено",
      tone: "success",
      body: "Правила → мои правки → работа агентов\nМиграции → интеграции → регрессия\nCI/CD → runbook → моя приёмка",
      humanAt: PRODUCT_START,
      action: "Я · проверяю рабочие сценарии",
      human:
        "Открываю разделы ERP и сверяю поведение с требованиями. Направление, архитектура и качество остаются под моим контролем.",
    },
  ];
  // Every important edit is reachable without animation and restored on rewind.
  const checkpoints = [
    ...new Set([
      ...chapters.map((chapter) => chapter.inspect),
      23500,
      31200,
      35000,
      48000,
      57500,
      61000,
      64000,
      67500,
      75500,
      85500,
      90500,
      98500,
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
    const editor = scene.mode === "editor" && time >= scene.at;
    const edited = !scene.before || time >= scene.editAt;
    demo.classList.toggle("ad-developer-mode", editor);
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
      setText(
        find("worker-ui"),
        time >= 46000 ? "Blazor · правки по ревью" : "Blazor · по правилам",
      );
      setText(
        find("worker-api"),
        scene.git === "fix"
          ? "RBAC · по моему diff"
          : "API · контракты модулей",
      );
      setText(
        find("worker-ops"),
        delivery
          ? "CI/CD · по моему workflow"
          : time >= 63000
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
      time >= 97200
        ? "✓ Ревью итерации"
        : time >= 22500
          ? "✓ Правила в репозитории"
          : time >= 18000
            ? "Архитектурное ревью"
            : "Новая задача",
    );
    setText(
      find("tests-thread-state"),
      time >= 63000
        ? "✓ Повторный прогон"
        : time >= 55000
          ? "Исправление · RBAC"
          : time >= 49000
            ? "Ошибка доступа · FAIL"
            : "Проверки запущены",
    );
    find("human-review").classList.toggle(
      "ad-human-visible",
      time >= scene.humanAt,
    );
    demo.classList.toggle(
      "ad-ui-review-visible",
      time >= 42500 && time < 46000,
    );
    return scene;
  }
  function renderInfrastructure() {
    if (time < 78000 || time >= 93000) return;
    const rising = time >= 82000;
    const holding = time >= 84500;
    const scaling = time >= 87500;
    const scaled = time >= 89500;
    const ramp = Math.min(1, Math.max(0, (time - 82000) / 2500));
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
          ? "Нагрузку удерживаем 3 мин*"
          : rising
            ? "Повышаем частоту запросов"
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
              ? "building"
              : time < 65000
                ? "verified"
                : time < 78000
                  ? "delivery"
                  : time < 93000
                    ? "infrastructure"
                    : time < PRODUCT_START
                      ? "threads"
                      : time < FINALE_START
                        ? "product"
                        : "finale",
    );
    demo.classList.toggle("ad-has-tools", time >= 21000);
    demo.classList.toggle("ad-many-threads", time >= 33000);
    demo.classList.toggle("ad-verified", time >= 63000);
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
      time >= 89500 && time < 93000
        ? "Условный нагрузочный профиль: 500 → 1 500 запросов/с. После выдержки CPU 78% при цели HPA 60% даёт 2 → 3 реплики; затем CPU 52%. Время сжато. Проверяю также задержки и ошибки."
        : time >= 84500 && time < 89500
          ? "Удерживаю синтетический профиль 3 минуты и наблюдаю CPU относительно requests 500m. HPA рассчитывает ceil(2 × 78 / 60) = 3. Число пользователей не определяет число реплик; время наблюдения сжато."
          : time >= 18000 && time < 78000
            ? (scene.caption ?? chapters[chapter].detail)
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
            : "2 мин 5 с · этапы можно выбирать в любой момент. Сценарий, код, проверки и данные ERP — демонстрационные.",
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
