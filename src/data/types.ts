import type { ImageMetadata } from 'astro';

/** A button or link shown on the site. */
export interface LinkItem {
  label: string;
  href: string;
  /** Used to pick an icon and the wording of the button. */
  kind: 'repo' | 'live' | 'report' | 'other';
}

export interface Figure {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export interface ResultItem {
  /** The big number or short phrase, e.g. "+141.1%". */
  value: string;
  /** What the number measures. */
  label: string;
  /** Optional caveat shown in smaller text. */
  note?: string;
}

export interface Project {
  /** Used in the URL of the case-study page: /projects/<slug> */
  slug: string;
  title: string;
  /** e.g. "Bachelor's thesis", "Open source", "Data analysis", "Coursework". */
  kind: string;
  /** Free text, e.g. "2024 – 2025". Leave empty if unknown. */
  period?: string;
  /** Featured projects get a large card and their own case-study page. */
  featured: boolean;
  /** One or two sentences shown on the card. */
  summary: string;
  /** Why the project exists. */
  purpose: string;
  /** What I personally did. */
  contribution: string;
  /** Short bullet list of what it does. */
  features: string[];
  /** Technologies used in this project (not necessarily core skills). */
  tech: string[];
  /** Documented outcomes that appear in the project's own write-up. */
  results?: ResultItem[];
  /** Honest caveats from the project's own documentation. */
  limitations?: string[];
  /** Verified links only. Leave the list empty if nothing is public. */
  links: LinkItem[];
  /** Real images from the project. Never add mock-ups. */
  figures?: Figure[];
  /** Heading above the figures on the case-study page. Default: "Figures". */
  figuresTitle?: string;
  /** One sentence shown above the results. Default: "Results stated in the project's own documentation." */
  resultsNote?: string;
}

export interface SkillGroup {
  title: string;
  /** Where this group is evidenced, shown as a small caption. */
  evidence?: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  /** Leave empty when the date is unknown. */
  date?: string;
  /** Add a credential/verification URL here once you have one. */
  url?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  coursework: string[];
  /** Slug of the project to link to, e.g. the thesis. */
  thesisSlug?: string;
}
