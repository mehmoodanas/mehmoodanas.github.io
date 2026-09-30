# Content notes: sources, discrepancies and open items

This file records where each part of the site came from, the places where your sources disagree,
and what is still missing. Nothing on the site was invented: every statement comes from your CV or
from your public GitHub repositories and READMEs. The original files are kept in
`_reference-material/` for reference.

## Where each section comes from

| Site section                     | Source                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Hero, About                      | CV "Profile"; project facts from the three featured repositories / thesis description            |
| Skills                           | CV "Technical Skills"; testing tools from the `api-test-automation` repository; data tools from the `olist-ecommerce-analysis` repository |
| Project: thesis                  | CV "Research & Flagship Project"; GitHub profile README (period, PyTorch, Hugging Face tags)      |
| Project: API Test Automation     | `api-test-automation` README, CI workflow file, live Allure dashboard (checked: HTTP 200)         |
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
   and confirm it, or send the correct one.**
2. **Professional title.** CV: "Computer Systems Graduate | Applied Machine Learning & AI Systems"
   (used). GitHub bio: "AI/NLP Engineer & Test Automation Developer". GitHub README and the old
   site: "Final-year B.Sc." / "undergraduate". The old site also said "Available · Summer 2026" and
   "looking for MS Data Science and Summer 2026 internships" — out of date today and not in the
   CV, so not used. Consider aligning your GitHub bio with the CV.
3. **Dates.** The CV has empty date columns for education, projects and the thesis (the right-hand
   tab stops contain no text). The site uses dates from your GitHub README: degree "Feb 2023 – 2026",
   thesis "2024 – 2025", coursework "2024". Please confirm them, and confirm your graduation month.
   Only the Databricks certificate (Aug 2025) has a date in the CV. The old site said IELTS "2024";
   that is not in the CV, so no IELTS date is shown.
4. **Skills that are not in the CV.** Your GitHub README and old site also list C++, JavaScript,
   Bash, NumPy, Hugging Face, Selenium, Apache Spark, MATLAB, VS Code and IntelliJ. No CV line or
   public repository demonstrates them, so they are **not** in the Skills section. PyTorch and
   Hugging Face do appear as technologies on the thesis project, because your README names them
   for it. If you want any others shown, move them into `skills` in `src/data/portfolio.ts`.
5. **Languages.** The old site lists Latvian (Basic); the CV does not. Latvian is left out.
6. **Selenium UI Test Suite "in progress".** Mentioned on your GitHub README and the old site, but
   there is no public repository, so it is not shown.
7. **`sap-o2c-walkthrough` repository.** It contains only a short README and a notes stub. It is
   shown as a small "Learning notes" card with a link. Add content to the repository, or delete
   the entry, if you would rather not send visitors there.

## Missing information (not invented)

- **Employment history.** Your CV lists no jobs or internships, so there is no Experience section.
  Add an `experience` list and a component if you have any.
- **Thesis results and code.** The CV describes the evaluation (accuracy, confidence, latency) but
  gives no numbers, and there is no public thesis repository or report. The thesis page therefore
  has no results or links. Adding one result table or a link to the thesis text would strengthen it.
- **Certificate links.** No credential URLs were provided, so certifications are plain text. Add
  `url: '…'` to an entry in `certifications` to make it a link.
- **Awards, publications, volunteering.** None appear in your sources, so there are no sections.
- **Photo.** None was supplied, and none was invented; the hero uses the 3D decoration instead.
- **Your own domain.** The site is set up for `mehmoodanas.github.io`.

## Decisions made for you

- **Phone number hidden.** It is in your CV and GitHub README, but public websites attract spam,
  so `showPhone` is `false`. Your CV download still contains it.
- **No contact form.** A form needs an external service; a fake "sent" message would be dishonest.
  Email is one click or one copy button. See the README for how to add a real form.
- **CV served as supplied.** The file is the `.docx` you provided, byte for byte. A PDF is easier
  for recruiters to open; export one from Word and follow `docs/UPDATING.md` to switch.
- **Project dates and outcomes** appear only where the project's own write-up states them. The
  Olist figures (+141.1%, 6.77%, 4.29 vs 2.27) are quoted from that repository's findings report,
  with its caveats.
