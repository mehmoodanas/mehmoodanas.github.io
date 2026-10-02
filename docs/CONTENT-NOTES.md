# Content notes: sources, discrepancies and open items

This file records where each part of the site came from, the places where your sources disagree,
and what is still missing. Nothing on the site was invented: every statement comes from your CV or
from your public GitHub repositories and READMEs, and the wording was fact-checked against them
line by line (two independent checkers per section, one of them adversarial). The original files
are kept in `_reference-material/` for reference.

## Where each section comes from

| Site section                     | Source                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Hero, About                      | CV "Profile"; project facts from the three featured repositories / thesis description            |
| Skills                           | CV "Technical Skills"; testing tools from the `api-test-automation` repository; data tools from the `olist-ecommerce-analysis` repository |
| Project: thesis                  | CV "Research & Flagship Project"; GitHub profile README (period)                                  |
| Project: API Test Automation     | `api-test-automation` README, CI workflow file and tests, live Allure dashboard (HTTP 200)        |
| Project: Olist analysis          | `olist-ecommerce-analysis` README and `reports/findings.md`; charts are the repository's own      |
| Coursework and learning projects | CV "Additional Projects"; GitHub profile README (years); `sap-o2c-walkthrough` repository          |
| Education                        | CV "Education"; GitHub profile README (dates)                                                     |
| Certifications, languages        | CV                                                                                                |
| Contact                          | CV and GitHub profile (email, location); LinkedIn address from your GitHub profile's social links |

## Discrepancies to resolve

1. **LinkedIn address.** Your brief gave `https://github.com/mehmoodanas` as the LinkedIn link.
   Your GitHub profile lists `https://www.linkedin.com/in/anas-mehmood-1a42b422b`, so the site uses
   that. LinkedIn refuses automated requests (HTTP 999), so it could not be opened to check, and no
   LinkedIn content (headline, experience, recommendations) could be read. Your GitHub README says
   LinkedIn is "coming soon" and the old portfolio linked to `#`. **Please open the link yourself
   and confirm it, or send the correct one.** It is shown on the page but is not included in the
   search-engine metadata until you confirm it.
2. **The downloadable CV does not match the site.** Your CV (created 22 Sep 2026) lists none of the
   API Test Automation, Olist or SAP projects, and its skills have no Pytest, Playwright, Docker,
   GitHub Actions, JUnit, RestAssured or Locust. The site features two of those projects and a
   Testing skills group, based on your GitHub repositories (the Skills card says "not in CV").
   Recruiters who download the CV will not see them. **Update your CV, then replace
   `public/cv/Anas-Mehmood-CV.docx`.** Your GitHub profile README (May 2026) also omits Olist and SAP.
3. **Professional title.** CV: "Computer Systems Graduate | Applied Machine Learning & AI Systems"
   (used). GitHub bio: "AI/NLP Engineer & Test Automation Developer". GitHub README and the old
   site: "Final-year B.Sc." / "undergraduate". The old site also said "Available · Summer 2026" and
   "looking for MS Data Science and Summer 2026 internships" — out of date today and not in the
   CV, so not used. Consider aligning your GitHub bio with the CV.
4. **Dates.** The CV has empty date columns for education, projects and the thesis (the right-hand
   tab stops contain no text). The site uses dates from your GitHub README: degree "Feb 2023 – 2026",
   thesis "2024 – 2025", coursework "2024". The Olist and SAP years (2026) are the year each GitHub
   repository was created. Please confirm them all, and confirm your graduation month. Only the
   Databricks certificate (Aug 2025) has a date in the CV. The old site said IELTS "2024"; that is
   not in the CV, so no IELTS date is shown.
5. **Skills that are not in the CV.** Your GitHub README and old site also list C++, JavaScript,
   Bash, NumPy, Hugging Face, Selenium, Apache Spark and MATLAB (plus VS Code and IntelliJ). No CV
   line or public repository demonstrates them, so they are **not** shown. "HTML / JS front-end"
   appears under Backend & web only because the CV's thesis line names an HTML/JS front-end. Hugging
   Face is listed for the thesis in your GitHub README but not in the CV, so it is left off the
   thesis technologies too. If you want any of these shown, add them in `src/data/portfolio.ts`.
6. **Languages.** Latvian (Basic) appears in the later CV version (saved 22 Sep 2026) and on the old
   site, so it is shown. The CV file the site offers for download (`public/cv/`) is the earlier
   version without it.
7. **Selenium UI Test Suite "in progress".** Mentioned on your GitHub README and the old site, but
   there is no public repository, so it is not shown.
8. **`sap-o2c-walkthrough` repository.** It contains only a short README and a notes stub. It is
   shown as a small card that says so. Add content to the repository, or delete the entry, if you
   would rather not send visitors there.
9. **API test framework README versus its code.** The README says every API test asserts a
   2-second response time. The code uses 5 seconds (JSONPlaceholder tests) and 10 seconds, and in the
   Restful Booker tests only one of the 14 checks timing. The site says "response-time assertions
   on the API tests". The README also says "every push"; the workflow runs on pushes and pull
   requests to `main` (and manually). The Allure screenshot shows 4 UI tests where the README
   describes 3 scenarios.
10. **The architecture diagram in that README is not on the site.** It says CI "runs on push / PR /
    nightly" (there is no schedule), draws GitHub Actions → Docker → tests (the CI jobs run without
    Docker), labels the Java suite "CRUD" and calls the UI tests "cross-browser ready". Those
    statements do not match your workflow and code, so the diagram was left out. Consider
    correcting it in the repository.
11. **No licence file.** The API test README shows an MIT badge, but the repository has no
    `LICENSE` file, so GitHub reports no licence. The site calls it a "Personal project" rather than
    "open source". Add a `LICENSE` file if you want it to be open source.

## Missing information (not invented)

- **Employment history.** Your CV lists no jobs or internships, so there is no Experience section.
  Add an `experience` list and a component if you have any.
- **Thesis results and code.** The CV describes the evaluation (accuracy, confidence, latency) but
  gives no numbers, and there is no public thesis repository or report. The thesis page therefore
  has no results or links. Adding one result table or a link to the thesis text would strengthen it.
- **Certificate links.** No credential URLs were provided, so certifications are plain text. Add
  `url: '…'` to an entry in `certifications` to make it a link. There are no dates for the Nebius,
  Claude Code 101 or IELTS entries, and no IELTS band score.
- **Awards, publications, volunteering.** None appear in your sources, so there are no sections.
- **Photo.** None was supplied, and none was invented; the hero uses the 3D decoration instead.
- **Your own domain.** The site is published at `https://mehmoodanas.github.io/`. A copy also
  publishes at `https://mehmoodanas.github.io/portfolio/` from the `portfolio` repository.
- **Master's degree.** Your GitHub README should list a master's degree, but none appears in your
  CV or any other source, so none is shown on the site. Send the programme, university and dates
  (or whether it is planned or in progress) and it will be added.

## Decisions made for you

- **Phone number hidden.** It is in your CV and GitHub README, but public websites attract spam,
  so `showPhone` is `false`. Your CV download still contains it.
- **No contact form.** A form needs an external service; a fake "sent" message would be dishonest.
  Email is one click or one copy button. See the README for how to add a real form.
- **CV served as supplied.** The file is the `.docx` you provided, byte for byte. A PDF is easier
  for recruiters to open; export one from Word and follow `docs/UPDATING.md` to switch.
- **Careful wording.** The site says "certificates" rather than "certified", "a learning project"
  for Olist, and describes the Olist manager as a scenario ("framed as a scenario in which I act as
  an analyst"), because that is how its README describes it. The thesis contribution is worded
  from the CV bullets; it does not claim the application was deployed or demonstrated, since no
  source says so.
- **Project dates and outcomes** appear only where the project's own write-up states them. The
  Olist figures (+141.1%, 6.77%, 4.29 vs 2.27, 3.00%) are quoted from that repository's findings
  report, with its caveats. The "27 tests" figure is read from the Allure screenshot dated
  30 April 2026.
- **Motion.** The hero decoration floats for five seconds and then rests, so nothing on the page
  moves forever.
