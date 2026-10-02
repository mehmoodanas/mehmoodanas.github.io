/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL CONTENT FOR THE PORTFOLIO LIVES IN THIS FILE.
 *  Edit the text below, save, and the site updates. See docs/UPDATING.md.
 *
 *  Sources used: CV (Anas-Mehmood-CV.docx), GitHub repositories and READMEs.
 *  Every claim below is taken from one of those sources. Comments marked
 *  "CONFIRM" point at details that need your confirmation (see
 *  docs/CONTENT-NOTES.md).
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
   * It is shown on the page but deliberately NOT added to the search-engine
   * metadata (JSON-LD) until you confirm it.
   */
  linkedin: 'https://www.linkedin.com/in/anas-mehmood-1a42b422b',

  /** The CV file served by the "Download CV" buttons (file is in /public/cv). */
  cv: {
    href: '/cv/Anas-Mehmood-CV.docx',
    downloadName: 'Anas-Mehmood-CV.docx',
    format: 'DOCX',
  },

  /** Used for page titles and search/social previews (keep under ~160 characters). */
  description:
    'Portfolio of Anas Mehmood, Computer Systems graduate (Riga Technical University): NLP thesis, test automation and SQL/Python data analysis.',
} as const;

/* ─────────────────────────────────── Hero ─────────────────────────────────── */

export const hero = {
  greeting: 'Hello, I’m',
  // CV profile: end-to-end AI systems, thesis with DistilBERT/Sentence-BERT,
  // looking to build on it with LLM, RAG and agentic AI engineering.
  intro:
    'I have hands-on experience building end-to-end AI systems, from data preprocessing and transformer fine-tuning to evaluation and deployment. My bachelor’s thesis applied DistilBERT and Sentence-BERT to customer-support automation, and I’m looking to build on that foundation with LLM, RAG and agentic AI engineering.',
  facts: ['BSc Computer Systems, Riga Technical University', 'Python · SQL · Java'],
};

/* ─────────────────────────────────── About ────────────────────────────────── */

export const about = {
  title: 'Applied NLP, test automation and data analysis',
  paragraphs: [
    'I’m a Computer Systems graduate from Riga Technical University with hands-on experience building end-to-end AI systems, including data preprocessing, transformer fine-tuning, evaluation and deployment. My bachelor’s thesis compared rule-based, DistilBERT and Sentence-BERT approaches to customer-support automation, benchmarking accuracy, confidence and latency to understand the trade-off between interpretability and precision.',
    'Alongside the thesis, my public GitHub projects cover test automation and data analysis: a Python test-automation framework with a smaller Java suite, run by GitHub Actions, and a SQL and Python learning project on about 99,000 historical e-commerce orders, with 41 automated validation checks and written limitations. Next I want to grow into modern LLM, RAG and agentic AI engineering.',
  ],
  strengths: [
    {
      title: 'End-to-end thesis project',
      text: 'A transformer-based customer-support assistant: DistilBERT intent classification, Sentence-BERT retrieval, a Flask inference service and a Spring Boot dialogue backend, evaluated against a rule-based approach.',
    },
    {
      title: 'Measured comparisons',
      text: 'In my thesis I compared three approaches on accuracy, confidence and latency. In my Olist analysis I worded findings as associations and listed the limitations.',
    },
    {
      title: 'Checks built in',
      text: 'My Olist analysis runs 41 automated data-validation checks and stops if any fails, and my API test framework runs in GitHub Actions CI.',
    },
  ],
  focusAreas: [
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
 * Hugging Face, Selenium and Apache Spark, and the old site also listed MATLAB.
 * None of these is in the CV and no public repository shows them, so they are
 * left out until you confirm them. (The CV does mention an "HTML/JS front-end"
 * for the thesis, which is why that appears under Backend & web.)
 * Add a skill to the right group to show it.
 */
export const skills: SkillGroup[] = [
  {
    title: 'Programming',
    evidence: 'CV',
    items: ['Python', 'SQL', 'Java'],
  },
  {
    title: 'Machine learning & NLP',
    evidence: 'CV',
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
    evidence: 'CV · Olist analysis repo',
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
    items: ['Flask', 'Spring Boot', 'REST APIs', 'HTML / JS front-end'],
  },
  {
    title: 'Testing & automation',
    evidence: 'GitHub · API Test Automation repo (not in CV)',
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
      'A transformer-based conversational AI for customer support, with a comparative evaluation of rule-based, DistilBERT and Sentence-BERT approaches on accuracy, confidence and latency.',
    purpose:
      'To apply DistilBERT and Sentence-BERT to customer-service automation for CRM systems, and to benchmark rule-based, DistilBERT and Sentence-BERT approaches on accuracy, confidence and latency in order to quantify the trade-off between interpretability and precision.',
    contribution:
      'I built a transformer-based conversational AI, using DistilBERT for intent classification and Sentence-BERT for semantic similarity retrieval, and benchmarked the rule-based, DistilBERT and Sentence-BERT approaches on accuracy, confidence and latency.',
    features: [
      'Intent classification with a fine-tuned DistilBERT model.',
      'Semantic similarity retrieval with Sentence-BERT over a curated customer-support corpus.',
      'Two-service architecture: a Python / Flask ML inference micro-service and a Java / Spring Boot dialogue backend, plus an HTML / JavaScript front-end, using REST APIs.',
      'Comparative evaluation of rule-based, DistilBERT and Sentence-BERT approaches, benchmarking accuracy, confidence and latency.',
    ],
    // CONFIRM: your GitHub README also lists Hugging Face for this project. It is not in the
    // CV, so it is left out until you confirm it.
    tech: [
      'Python',
      'PyTorch',
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
    kind: 'Personal project',
    period: '2026',
    featured: true,
    summary:
      'A Python test framework with an API layer and a browser-UI layer, run by GitHub Actions on pushes and pull requests to main, with a live Allure test dashboard.',
    purpose:
      'To practise QA engineering: schema-checked API tests and Page Object UI tests, with a Dockerfile for local runs and a GitHub Actions workflow that runs the suites on pushes and pull requests to main.',
    contribution:
      'I built the framework, its GitHub Actions workflow, the Java suite and the Locust tests, as part of preparing for a test-automation internship.',
    features: [
      'REST API tests with requests, including JSON Schema validation of response bodies, plus positive, negative and parametrised cases against JSONPlaceholder.',
      'Playwright browser tests of the Sauce Demo login flow using the Page Object Model: successful login, locked-out user and wrong password.',
      'A Restful Booker layer with token authentication and full CRUD, adding 14 tests across happy-path, negative and persistence flows.',
      'A smaller Java suite with RestAssured and JUnit 5 that repeats checks from the Python JSONPlaceholder tests.',
      'Locust performance tests with a weighted read/write mix; CI runs a 5-user, 20-second headless smoke run.',
      'Pytest markers for selective runs, response-time assertions on the API tests, and a Docker image based on the official Playwright Python image.',
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
    results: [
      {
        value: '27 tests',
        label: 'All passing in the Allure report from the CI run on 30 April 2026',
        note: 'Two suites: tests (23) and tests_ui (4). Taken from the dashboard screenshot below; the live dashboard may have changed since.',
      },
    ],
    resultsNote: 'From the published Allure dashboard.',
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
    figuresTitle: 'Test dashboard',
    figures: [
      {
        src: apiDashboard,
        alt: 'Allure report overview from a CI run on 30 April 2026: 27 test cases, 100% passed, in two suites (tests and tests_ui), with a trend chart and environment details.',
        caption: 'Allure report overview from the CI run on 30 April 2026 (screenshot).',
      },
    ],
  },
  {
    slug: 'olist-ecommerce-analysis',
    title: 'E-commerce Sales and Delivery Analysis',
    kind: 'Data analysis',
    // CONFIRM: the year is the repository's creation year; the project documents no dates.
    period: '2026',
    featured: true,
    summary:
      'An end-to-end SQL and Python analysis of about 99,000 Brazilian e-commerce orders: cleaning, validated reporting models, business metrics, charts and written findings.',
    purpose:
      'Framed as a scenario in which I act as an analyst supporting an e-commerce operations manager, answering: how sales change over time, which categories and regions contribute most, how order value varies, how often customers buy again, where deliveries run late and how delivery timing relates to review scores.',
    contribution:
      'I designed, reviewed and documented this project as a learning portfolio project on a public dataset (the Olist dataset on Kaggle). It has no connection with Olist.',
    features: [
      'A pipeline that rebuilds everything from the raw CSV files with one command: load, profile, clean, model, validate, analyse and chart (the Kaggle CSV files are downloaded separately).',
      '41 automated validation checks on key uniqueness, required fields, referential integrity, row counts, money totals and timestamp order. The pipeline stops if any check fails.',
      'Documented cleaning rules that flag unusual records instead of deleting rows.',
      '26 commented analysis queries in 7 SQL files, written with CTEs and window functions.',
      'Items, payments and reviews aggregated to one row per order before joining, because joining them directly would inflate payment totals by 26.9%.',
      'Written metric definitions, reported sample sizes and minimum-volume thresholds, with the link between late delivery and review scores worded as an association rather than a cause.',
    ],
    tech: ['Python', 'SQL (SQLite)', 'pandas', 'matplotlib'],
    results: [
      {
        value: '+141.1%',
        label: 'Year-on-year merchandise sales of delivered orders, January–August 2017 to 2018',
        note: 'Growth came from more orders, not larger ones: average order value stayed between 124 and 149 in every complete month.',
      },
      {
        value: '6.77%',
        label: 'of delivered orders arrived after the estimated date (6,534 of 96,470 with a valid delivery date)',
        note: 'The late rate ranged from 4.04% (PR) to 17.43% (MA) among states with 500+ deliveries.',
      },
      {
        value: '4.29 vs 2.27',
        label: 'Average review score, on-time vs late orders',
        note: 'An association, not proof of cause. The gap appears within each of the 14 states with at least 100 reviewed late orders.',
      },
      {
        value: '3.00%',
        label: 'of customers placed a second delivered order in the data period',
        note: 'Only 1.92% came back within 180 days, and 829 of the 2,801 repeat customers ordered twice on the same day.',
      },
    ],
    resultsNote:
      'Taken from the project’s own findings report. They describe the dataset studied (2016–2018), not the marketplace today.',
    limitations: [
      'Historical data only (2016–2018); results describe that period, not Olist today.',
      'Observational data, so comparisons show associations rather than causes.',
      'Currency is not stated in the files and is assumed to be BRL; merchandise value is not company revenue.',
      '610 products (1.29% of delivered sales) have no category, and repeat purchasing is measured only inside the data window.',
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
    figuresTitle: 'Charts from the analysis',
    figures: [
      {
        src: olistSales,
        alt: 'Line chart of monthly merchandise sales from the Olist analysis.',
        caption: 'Monthly merchandise sales.',
      },
      {
        src: olistLate,
        alt: 'Bar chart of late-delivery rate by customer state for states with at least 500 deliveries, from 4.0% in PR to 17.4% in MA.',
        caption: 'Late-delivery rate by state (states with 500+ deliveries).',
      },
      {
        src: olistReviews,
        alt: 'Chart of average review score by delivery timing from the Olist analysis.',
        caption: 'Review score by delivery timing.',
      },
      {
        src: olistOrders,
        alt: 'Charts of monthly delivered orders and average order value from the Olist analysis.',
        caption: 'Monthly orders and average order value.',
      },
      {
        src: olistStates,
        alt: 'Bar chart of merchandise sales share by customer state for delivered orders, led by São Paulo at 38.3%.',
        caption: 'Merchandise sales by state.',
      },
      {
        src: olistCategories,
        alt: 'Chart of the top product categories by share of sales from the Olist analysis.',
        caption: 'Top categories by sales.',
      },
    ],
  },

  /* ── Additional projects (shown in the grid, no separate page) ── */
  {
    slug: 'customer-support-ticketing-system',
    title: 'Customer Support Ticketing System',
    kind: 'Systems modelling',
    // CONFIRM: the year comes from your GitHub profile README; the CV gives no dates.
    period: '2024',
    featured: false,
    summary:
      'A modelling project: requirements analysis and process models in BPMN, EFFBD and sequence diagrams for support-ticket and incident-handling workflows.',
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
    title: 'SAP S/4HANA Cloud Order-to-Cash Walkthrough',
    kind: 'Self-directed learning',
    // CONFIRM: the year is the repository's creation year.
    period: '2026',
    featured: false,
    // CONFIRM: this repository currently contains only a short README and a notes
    // placeholder. Remove this entry (or add content to the repo) if you prefer.
    summary:
      'A self-directed, hands-on walkthrough of the Order-to-Cash process (BD9) in SAP S/4HANA Cloud. The repository currently holds a short README and a notes folder.',
    purpose: '',
    contribution: '',
    features: [
      'Hands-on walkthrough of SAP S/4HANA Cloud Order-to-Cash (BD9).',
      'A notes folder set up in the repository for reference materials and learning notes (none published yet).',
    ],
    tech: [],
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
    issuer: 'English proficiency',
  },
];

/** Languages as listed in your CV (Latvian appears in the later CV version of 22 Sep 2026). */
export const languages: LanguageItem[] = [
  { name: 'Urdu', level: 'Native' },
  { name: 'English', level: 'B2 (IELTS)' },
  { name: 'Punjabi', level: 'Fluent' },
  { name: 'Russian', level: 'Elementary' },
  { name: 'Latvian', level: 'Basic' },
];

/* ─────────────────────────────────── Contact ──────────────────────────────── */

export const contact = {
  heading: 'Let’s talk',
  text: 'I’m happy to talk about machine learning, AI engineering (LLMs, RAG and agentic AI), data analysis and test automation. The quickest way to reach me is by email.',
};

/* ─────────────────────────────────── Helpers ──────────────────────────────── */

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
