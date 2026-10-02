# How to update the portfolio

Everything you read on the site comes from **`src/data/portfolio.ts`**. You do not need to touch
the design files for normal updates. After editing, run `npm run dev` to preview, or simply push
to GitHub and the site rebuilds itself.

## Change text

Open `src/data/portfolio.ts`. Sections appear in the same order as on the site:

| Section in the file | Where it appears                                               |
| ------------------- | -------------------------------------------------------------- |
| `site`              | Name, title, email, links, CV, page description                |
| `hero`              | Introduction and the small facts under it                      |
| `about`             | About heading, paragraphs, three strengths, focus areas        |
| `skills`            | Skill groups (each group is a card)                            |
| `projects`          | Featured projects (with case studies) and the grid             |
| `education`         | Degree, dates, coursework                                      |
| `certifications`    | Certification list                                             |
| `languages`         | Languages (shown in the About "quick facts" card)              |
| `contact`           | Heading and sentence above the contact card                    |

Text must stay inside quotes. If a sentence contains an apostrophe, either use the curly
apostrophe ’ (recommended) or wrap the text in double quotes.

## Add a project

1. Copy an existing entry in the `projects` array and change every field.
   - `slug`: lowercase letters, digits and hyphens; must be unique (it becomes the page address).
2. `featured: true` gives it a large card **and** its own page at `/projects/<slug>`.
   `featured: false` puts it in the smaller "More projects" grid with an expandable description.
   Featured projects look best with at least one real figure (a screenshot or chart).
3. `links`: add only links that work. A project with no public link simply shows no link buttons.
   Use `kind: 'live'` for a live demo; there is no demo button unless a link exists.
4. `results`: only add numbers that appear in the project's own write-up, and set `resultsNote`
   to say where they come from.
5. Screenshots: put the image in `src/assets/projects/`, `import` it at the top of the data file
   and add it to `figures`. Each figure needs `src`, `alt` (what the image shows) and `caption`.
   `figuresTitle` sets the heading above them. Use real screenshots only, never mock-ups.
6. `purpose` and `contribution` are optional: leave them empty and those sections are skipped.

## Remove a project or section

Delete its entry (or comment it out with `//`). If you empty a list — for example every item in
`certifications` — its card disappears from the Education section. To remove a whole section,
delete its line (for example `<Skills />`) from `src/pages/index.astro` and its link from the
`links` list in `src/components/Header.astro` and `src/components/Footer.astro`.

## Add skills

Add the skill name to the right group's `items` list. Only list skills you can back up with your
CV or a public project. Above the `skills` block there is a comment listing skills that appear on
your GitHub profile but are not in your CV — move them into a group once you have confirmed you
want them shown. The grey "Source:" line on each card says where that group comes from; edit it
if you change what is in the group.

## Replace the CV

Copy the new file over `public/cv/Anas-Mehmood-CV.docx` (keep the same name). To switch to another
format, for example a PDF, add the new file, **delete the old one from `public/cv/`**, and change
`site.cv`:

```ts
cv: { href: '/cv/Anas-Mehmood-CV.pdf', downloadName: 'Anas-Mehmood-CV.pdf', format: 'PDF' },
```

`npm run verify` checks that every download button points at a real, valid `.docx` or `.pdf`.

## Show or hide the phone number

The phone number is hidden on purpose (public pages attract spam). Set `showPhone: true` in
`site` to display it in the Contact section. The downloadable CV still contains it.

## Change your LinkedIn or GitHub address

Edit `site.linkedin` and `site.github`. The contact section, the footer and the page text all
follow. The LinkedIn address is deliberately not included in the search-engine metadata
(`sameAs` in `src/pages/index.astro`) until you have confirmed it; add `site.linkedin` there once
you have.

## Change the accent colour or fonts

Colours are defined once at the top of `src/styles/global.css`: `--accent`, `--accent-strong`,
`--accent-soft`, `--accent-ink`, `--accent-light` and `--accent-rgb` (the same colour as "r g b"
numbers, used for translucent tints). Keep the contrast high: white text must stay readable on
`--accent`. `public/favicon.svg` and `scripts/og/template.html` contain the colour too; after
changing it run `npm run icons` and `npm run og`. Fonts are bundled through the
`@fontsource-variable` packages imported in `src/layouts/BaseLayout.astro`.

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
