/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL CONTENT FOR THE PORTFOLIO LIVES IN THIS FILE.
 *  Edit the text below, save, and the site updates. See docs/UPDATING.md.
 *
 *  Sources used: CV (Anas-Mehmood-CV.docx), GitHub repositories and READMEs.
 *  Every claim below is taken from one of those sources. Comments marked
 *  "CONFIRM" point at details that need your confirmation (see README.md).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type {
  Certification,
  Education,
  LanguageItem,
  Project,
  SkillGroup,
} from './types';

import apiDashboard from '../assets/projects/api-allure-dashboard.jpeg';
import apiArchitecture from '../assets/projects/api-architecture.svg';
import olistSales from '../assets/projects/olist-monthly-sales.png';
import olistOrders from '../assets/projects/olist-orders-and-aov.png';
import olistCategories from '../assets/projects/olist-top-categories.png';
import olistStates from '../assets/projects/olist-sales-by-state.png';
import olistLate from '../assets/projects/olist-late-delivery-by-state.png';
import olistReviews from '../assets/projects/olist-review-score-by-delivery.png';

/* ───────────────────────────── Identity & contact ───────────────────────────── */

export const site = {
  name: 'Anas Mehmood',
  /** Title taken from the CV header. */
  title: 'Computer Systems graduate · Applied machine learning & AI systems',
  shortTitle: 'Computer Systems graduate',
  location: 'Riga, Latvia',
  email: 'mehmoodanas90@gmail.com',

  /**
   * PRIVACY: the phone number is in your CV and GitHub README, but it is NOT
   * shown on the website by default (public pages attract spam calls).
   * Set showPhone to true if you want it displayed.
   */
  phone: '+371 22025169',
  showPhone: false,

  github: 'https://github.com/mehmoodanas',
  /**
   * CONFIRM: taken from the LinkedIn link on your GitHub profile. LinkedIn
   * blocks automated checks, so this URL could not be opened to verify it.
   */
  linkedin: 'https://www.linkedin.com/in/anas-mehmood-1a42b422b',

  /** The CV file served by the "Download CV" buttons (file is in /public/cv). */
  cv: {
    href: '/cv/Anas-Mehmood-CV.docx',
    downloadName: 'Anas-Mehmood-CV.docx',
    format: 'DOCX',
  },

  /** Used for page titles and search/social previews. */
  description:
    'Portfolio of Anas Mehmood, a Computer Systems graduate from Riga Technical University building applied machine learning and AI systems: NLP, data analysis and test automation.',
} as const;

/* ─────────────────────────────────── Hero ─────────────────────────────────── */

export const hero = {
  greeting: 'Hello, I’m',
  // CV profile: end-to-end AI systems, thesis with DistilBERT/Sentence-BERT,
  // looking to build on it with LLM, RAG and agentic AI engineering.
  intro:
    'I build end-to-end AI systems, from data preprocessing and transformer fine-tuning to evaluation and deployment. My bachelor’s thesis applied DistilBERT and Sentence-BERT to customer-support automation, and I’m looking to build on that foundation with LLM, RAG and agentic AI engineering.',
  facts: [
    'BSc Computer Systems, Riga Technical University',
    'Python · SQL · Java',
    'Certified in Generative AI and agentic AI',
  ],
};

/* ─────────────────────────────────── About ────────────────────────────────── */

export const about = {
  paragraphs: [
    'I’m a Computer Systems graduate from Riga Technical University with hands-on experience building AI systems end to end: preparing data, fine-tuning transformer models, evaluating them and putting them behind a working service. My bachelor’s thesis compared rule-based, DistilBERT and Sentence-BERT approaches to customer-support automation, benchmarking accuracy, confidence and latency to understand the trade-off between interpretability and precision.',
    'Alongside the machine-learning work I enjoy the engineering that makes results trustworthy. On GitHub that shows up as a Python and Java test-automation framework that runs in CI, and a SQL and Python analysis of about 99,000 e-commerce orders with automated data-validation checks and written limitations.',
    'Next I want to grow into modern LLM, RAG and agentic AI engineering. I hold certifications in Generative AI Fundamentals (Databricks Academy), Agentic AI building (Nebius) and Claude Code (Claude Academy).',
  ],
  strengths: [
    {
      title: 'End-to-end delivery',
      text: 'Data preparation, model fine-tuning, evaluation and a working two-service application in one thesis project.',
    },
    {
      title: 'Evidence over hype',
      text: 'I benchmark approaches against each other and write down what the results do and do not show.',
    },
    {
      title: 'Reliable by design',
      text: 'Automated validation checks, CI pipelines and projects that rebuild from scratch with one command.',
    },
  ],
  interests: [
    'Natural language processing',
    'LLMs, RAG and agentic AI',
    'Data analysis with SQL and Python',
    'Test automation and CI',
  ],
};

/* ─────────────────────────────────── Skills ───────────────────────────────── */
/*
 * Only skills stated in the CV or demonstrated in a public project are listed.
 * CONFIRM: your GitHub profile README also lists C++, JavaScript, Bash, NumPy,
 * Hugging Face, Selenium, Apache Spark and MATLAB (the old site also listed
 * these). They are not in the CV and no public repository shows them, so they
 * are left out until you confirm them. Add them to the right group to show them.
 */
export const skills: SkillGroup[] = [
  {
    title: 'Programming',
    evidence: 'CV',
    items: ['Python', 'SQL', 'Java'],
  },
  {
    title: 'Machine learning & NLP',
    evidence: 'CV · thesis',
    items: [
      'NLP',
      'Transformers',
      'BERT',
      'DistilBERT',
      'Sentence-BERT',
      'PyTorch',
      'scikit-learn',
      'Model evaluation',
    ],
  },
  {
    title: 'Data & analysis',
    evidence: 'CV · Olist analysis',
    items: [
      'pandas',
      'MySQL',
      'SQLite',
      'Window functions',
      'Data cleaning & wrangling',
      'Data validation',
      'Jupyter',
      'matplotlib',
    ],
  },
  {
    title: 'Backend & web',
    evidence: 'CV · thesis',
    items: ['Flask', 'Spring Boot', 'REST APIs', 'HTML / JavaScript'],
  },
  {
    title: 'Testing & automation',
    evidence: 'GitHub · API Test Automation',
    items: [
      'Pytest',
      'Playwright',
      'Page Object Model',
      'JSON Schema',
      'JUnit 5',
      'RestAssured',
      'Locust',
      'Allure',
    ],
  },
  {
    title: 'Tools & modelling',
    evidence: 'CV · GitHub',
    items: [
      'Linux',
      'Git',
      'GitHub Actions',
      'Docker',
      'BPMN',
      'EFFBD',
      'Sequence diagrams',
    ],
  },
];

/* ────────────────────────────────── Projects ──────────────────────────────── */

export const projects: Project[] = [
  {
    slug: 'customer-service-ai-thesis',
    title: 'AI in Customer Service Automation for CRM Systems',
    kind: 'Bachelor’s thesis',
    // CONFIRM: the period comes from your GitHub profile README; the CV gives no dates.
    period: '2024 – 2025',
    featured: true,
    summary:
      'A transformer-based conversational AI for customer support, compared against a rule-based baseline on accuracy, confidence and latency.',
    purpose:
      'To explore how transformer models can automate customer-service conversations in a CRM setting, and to measure the trade-off between the interpretability of rule-based systems and the precision of transformer models.',
    contribution:
      'I built the conversational AI and its two-service architecture, and ran the comparative evaluation of the three approaches.',
    features: [
      'Intent classification with a fine-tuned DistilBERT model.',
      'Semantic similarity retrieval with Sentence-BERT over a curated customer-support corpus.',
      'Two-service architecture: a Python / Flask ML inference micro-service and a Java / Spring Boot dialogue backend, with an HTML / JavaScript front-end talking to them over REST APIs.',
      'Comparative evaluation of rule-based, DistilBERT and Sentence-BERT approaches, benchmarking accuracy, confidence and latency.',
    ],
    tech: [
      'Python',
      'PyTorch',
      'Hugging Face',
      'DistilBERT',
      'Sentence-BERT',
      'Flask',
      'Java',
      'Spring Boot',
      'REST',
      'HTML / JS',
    ],
    links: [],
  },
  {
    slug: 'api-test-automation',
    title: 'API Test Automation Framework',
    kind: 'Open source',
    period: '2026',
    featured: true,
    summary:
      'A two-layer Python test framework covering REST APIs and browser UIs, run by GitHub Actions on every push with a live Allure test dashboard.',
    purpose:
      'To practise modern QA engineering: contract-checked API tests and Page Object UI tests, containerised with Docker and validated automatically in CI.',
    contribution:
      'I designed and built the framework, its CI pipeline, the Java mirror suite and the load tests.',
    features: [
      'REST API tests with requests and JSON Schema validation of response bodies, including positive, negative and parametrised cases against JSONPlaceholder.',
      'End-to-end UI tests with Playwright using the Page Object Model against Sauce Demo: successful login, locked-out user and wrong password.',
      'A Restful Booker layer with token authentication and full CRUD, adding 14 tests across happy-path, negative and persistence flows.',
      'A parallel Java suite with RestAssured and JUnit 5 that mirrors the Python tests against the same API.',
      'Locust load tests with a weighted read/write mix, run as a headless smoke test in CI.',
      'Pytest markers for selective runs, a response-time assertion on every API test, and a Docker image based on the official Playwright Python image.',
      'GitHub Actions CI that runs the Python, Java and performance jobs and publishes an Allure report to GitHub Pages.',
    ],
    tech: [
      'Python',
      'Pytest',
      'Playwright',
      'requests',
      'JSON Schema',
      'Docker',
      'GitHub Actions',
      'Allure',
      'Java',
      'RestAssured',
      'JUnit 5',
      'Locust',
    ],
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/mehmoodanas/api-test-automation',
        kind: 'repo',
      },
      {
        label: 'Live test dashboard',
        href: 'https://mehmoodanas.github.io/api-test-automation/',
        kind: 'live',
      },
    ],
    figures: [
      {
        src: apiDashboard,
        alt: 'Allure test report dashboard from the project’s CI run, showing the overall results, suites and trends.',
        caption: 'The Allure dashboard published by the CI pipeline.',
      },
      {
        src: apiArchitecture,
        alt: 'Architecture diagram of the framework from the project README.',
        caption: 'Framework architecture, from the project README.',
      },
    ],
  },
  {
    slug: 'olist-ecommerce-analysis',
    title: 'E-commerce Sales and Delivery Analysis',
    kind: 'Data analysis',
    period: '2026',
    featured: true,
    summary:
      'An end-to-end SQL and Python analysis of about 99,000 Brazilian e-commerce orders: cleaning, validated reporting models, business metrics, charts and written findings.',
    purpose:
      'To answer an e-commerce operations manager’s questions: how sales change over time, which categories and regions contribute most, how order value varies, how often customers buy again, where deliveries run late and how delivery timing relates to review scores.',
    contribution:
      'I designed, reviewed and documented the whole project as a learning portfolio project on a public dataset (the Olist dataset on Kaggle).',
    features: [
      'A pipeline that rebuilds everything from the raw CSV files with one command: load, profile, clean, model, validate, analyse and chart.',
      '41 automated validation checks on key uniqueness, required fields, referential integrity, row counts, money totals and timestamp order. The pipeline stops if any check fails.',
      'Documented cleaning rules that flag unusual records instead of deleting rows.',
      '26 commented analysis queries using CTEs and window functions.',
      'Items, payments and reviews aggregated to one row per order before joining, because joining them directly would inflate payment totals by 26.9%.',
      'Clear metric definitions, sample sizes and minimum-volume thresholds, with findings worded as associations rather than causes.',
    ],
    tech: ['Python', 'SQL (SQLite)', 'pandas', 'matplotlib'],
    results: [
      {
        value: '+141.1%',
        label: 'Year-on-year merchandise sales, January–August 2017 to 2018',
        note: 'Growth came from more orders, not larger ones: average order value stayed between 124 and 149.',
      },
      {
        value: '6.77%',
        label: 'of orders arrived after the estimated date',
        note: 'The late rate ranged from 4.04% (PR) to 17.43% (MA) among states with 500+ deliveries.',
      },
      {
        value: '4.29 vs 2.27',
        label: 'Average review score, on-time vs late orders',
        note: 'An association, not proof of cause, and present within every state checked.',
      },
    ],
    limitations: [
      'Historical data only (2016–2018); results describe that period, not Olist today.',
      'Observational data, so comparisons show associations rather than causes.',
      'Currency is not stated in the files and is assumed to be BRL; merchandise value is not company revenue.',
    ],
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/mehmoodanas/olist-ecommerce-analysis',
        kind: 'repo',
      },
      {
        label: 'Read the findings report',
        href: 'https://github.com/mehmoodanas/olist-ecommerce-analysis/blob/main/reports/findings.md',
        kind: 'report',
      },
    ],
    figures: [
      {
        src: olistSales,
        alt: 'Line chart of monthly merchandise sales from the Olist analysis.',
        caption: 'Monthly merchandise sales.',
      },
      {
        src: olistOrders,
        alt: 'Charts of monthly delivered orders and average order value from the Olist analysis.',
        caption: 'Monthly orders and average order value.',
      },
      {
        src: olistStates,
        alt: 'Chart of merchandise sales by Brazilian state from the Olist analysis.',
        caption: 'Sales by state.',
      },
      {
        src: olistCategories,
        alt: 'Chart of the top product categories by sales from the Olist analysis.',
        caption: 'Top categories by sales.',
      },
      {
        src: olistLate,
        alt: 'Chart of late-delivery rate by Brazilian state from the Olist analysis.',
        caption: 'Late-delivery rate by state.',
      },
      {
        src: olistReviews,
        alt: 'Chart of average review score by delivery timing from the Olist analysis.',
        caption: 'Review score by delivery timing.',
      },
    ],
  },

  /* ── Additional projects (shown in the grid, no separate page) ── */
  {
    slug: 'customer-support-ticketing-system',
    title: 'Customer Support Ticketing System',
    kind: 'Coursework · Systems modelling',
    // CONFIRM: the year comes from your GitHub profile README; the CV gives no dates.
    period: '2024',
    featured: false,
    summary:
      'Requirements analysis and full process modelling to structure support-ticket and incident-handling workflows end to end.',
    purpose: '',
    contribution: '',
    features: [
      'Requirements analysis for a customer support ticketing system.',
      'Process models in BPMN, EFFBD and sequence diagrams covering support-ticket and incident-handling workflows.',
    ],
    tech: ['BPMN', 'EFFBD', 'Sequence diagrams'],
    links: [],
  },
  {
    slug: 'database-management-coursework',
    title: 'Database Management Coursework (DMDS)',
    kind: 'Coursework · Databases',
    period: '2024',
    featured: false,
    summary:
      'Normalised relational schemas in MySQL, with analytical SQL across multi-entity datasets.',
    purpose: '',
    contribution: '',
    features: [
      'Normalised relational schemas in MySQL.',
      'Analytical SQL using joins, aggregations and window functions on multi-entity datasets.',
    ],
    tech: ['MySQL', 'SQL', 'Window functions'],
    links: [],
  },
  {
    slug: 'sap-o2c-walkthrough',
    title: 'SAP S/4HANA Order-to-Cash Walkthrough',
    kind: 'Self-directed learning',
    period: '2026',
    featured: false,
    // CONFIRM: this repository currently contains only a short README and a notes
    // folder. Remove this entry (or add content to the repo) if you prefer.
    summary:
      'A hands-on walkthrough of the Order-to-Cash process (BD9) in SAP S/4HANA Cloud, with learning notes.',
    purpose: '',
    contribution: '',
    features: [
      'Hands-on walkthrough of SAP S/4HANA Cloud Order-to-Cash (BD9).',
      'Reference materials and learning notes kept in the repository.',
    ],
    tech: ['SAP S/4HANA Cloud'],
    status: 'Learning notes',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/mehmoodanas/sap-o2c-walkthrough',
        kind: 'repo',
      },
    ],
  },
];

/* ─────────────────────── Education, certifications, languages ─────────────── */

export const education: Education[] = [
  {
    degree: 'BSc in Computer Systems',
    institution: 'Riga Technical University',
    location: 'Riga, Latvia',
    // CONFIRM: dates come from your GitHub profile README; the CV gives none.
    period: 'Feb 2023 – 2026',
    coursework: [
      'Data Structures & Algorithms',
      'Database Management (MySQL/SQL)',
      'Probability & Statistics',
      'Artificial Intelligence',
      'Data Management & Analysis',
      'Systems Modelling (BPMN/EFFBD)',
      'Software Engineering',
      'Object-Oriented Programming',
    ],
    thesisSlug: 'customer-service-ai-thesis',
  },
];

export const certifications: Certification[] = [
  {
    title: 'Generative AI Fundamentals',
    issuer: 'Databricks Academy',
    date: 'Aug 2025',
  },
  {
    title: 'Agentic AI Builder Certification',
    issuer: 'Nebius',
  },
  {
    title: 'Claude Code 101',
    issuer: 'Claude Academy',
  },
  {
    title: 'IELTS Academic',
    issuer: 'English proficiency certified (B2)',
  },
];

/**
 * CONFIRM: the old portfolio site also listed Latvian (Basic). It is not in
 * your CV, so it is not shown here.
 */
export const languages: LanguageItem[] = [
  { name: 'Urdu', level: 'Native' },
  { name: 'English', level: 'B2 (IELTS)' },
  { name: 'Punjabi', level: 'Fluent' },
  { name: 'Russian', level: 'Elementary' },
];

/* ─────────────────────────────────── Contact ──────────────────────────────── */

export const contact = {
  heading: 'Let’s talk',
  text: 'I’m open to conversations about machine learning, AI engineering, data and test-automation roles. The quickest way to reach me is by email.',
};

/* ─────────────────────────────────── Helpers ──────────────────────────────── */

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
