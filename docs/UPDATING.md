# How to update the portfolio

Everything you read on the site comes from **`src/data/portfolio.ts`**. You do not need to touch
the design files for normal updates. After editing, run `npm run dev` to preview, or simply push
to GitHub and the site rebuilds itself.

## Change text

Open `src/data/portfolio.ts`. Sections appear in the same order as on the site:

| Section in the file | Where it appears                                   |
| ------------------- | -------------------------------------------------- |
| `site`              | Name, title, email, links, CV, page description    |
| `hero`              | Introduction and the three small facts under it    |
| `about`             | About paragraphs, three strengths, interests       |
| `skills`            | Skill groups (each group is a card)                |
| `projects`          | Featured projects (with case studies) and the grid |
| `education`         | Degree, dates, coursework                          |
| `certifications`    | Certification list                                 |
| `languages`         | Languages list                                     |
| `contact`           | Heading and sentence above the contact card        |

Text must stay inside quotes. If a sentence contains an apostrophe, either use the curly
apostrophe ’ (recommended) or wrap the text in double quotes.

## Add a project

1. Copy an existing entry in the `projects` array and change every field.
2. `featured: true` gives it a large card **and** its own page at `/projects/<slug>`.
   `featured: false` puts it in the smaller "More projects" grid with an expandable description.
3. `links`: add only links that work. A project with no public link simply shows no link buttons.
   Use `kind: 'live'` for a live demo and it will show up automatically — there is no button
   unless a link exists.
4. `results`: only add numbers that appear in the project's own write-up.
5. Screenshots: put the image in `src/assets/projects/`, `import` it at the top of the data file
   and add it to `figures` with descriptive `alt` text. Use real screenshots only.

## Remove a project or section

Delete its entry (or comment it out with `//`). If you empty a list — for example every item in
`certifications` or `languages` — its card disappears from the Education section. To remove a whole
section, delete its line (for example `<Skills />`) from `src/pages/index.astro` and its link from
the `links` list in `src/components/Header.astro` and `src/components/Footer.astro`.

## Add skills

Add the skill name to the right group's `items` list. Only list skills you can back up with your
CV or a public project. Near the top of the `skills` block there is a comment listing skills that
appear on your GitHub profile but are not in your CV — move them into a group once you have
confirmed you want them shown.

## Replace the CV

Copy the new file over `public/cv/Anas-Mehmood-CV.docx` (keep the same name), or change
`site.cv.href` and `site.cv.downloadName` if you use another name or format, for example a PDF:

```ts
cv: { href: '/cv/Anas-Mehmood-CV.pdf', downloadName: 'Anas-Mehmood-CV.pdf', format: 'PDF' },
```

## Show or hide the phone number

The phone number is hidden on purpose (public pages attract spam). Set `showPhone: true` in
`site` to display it in the Contact section.

## Change your LinkedIn or GitHub address

Edit `site.linkedin` and `site.github`. They are used in the contact section, the footer and the
search-engine metadata.

## Change the accent colour or fonts

Colours are defined once at the top of `src/styles/global.css` (`--accent`, `--accent-strong`,
`--accent-soft`, `--accent-ink`). Keep the contrast high: white text must stay readable on
`--accent`. Fonts are bundled through the `@fontsource-variable` packages imported in
`src/layouts/BaseLayout.astro`.

## Update the social-sharing image

If you change your name or title, edit `scripts/og/template.html` and run `npm run og`.

## Check everything before publishing

```bash
npm run check      # content and code type-check
npm run build      # build the site
npm run verify     # links, anchors, alt text, headings, meta tags, CV file
```

`npm run verify:external` additionally requests every external link. LinkedIn always answers
automated requests with an error, so it is reported as "could not verify" — open that link
yourself once to confirm it.
