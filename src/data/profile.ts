// Identity and contact facts: the single source (docs/03-architecture/content-and-data-model.md).
// Email, LinkedIn, summary and availability arrive with owner answers Q2/Q3.
export const profile = {
  name: 'Afran Anas',
  role: 'Software Engineer',
  specialties: 'Backend · AI · Full-Stack',
  focusAreas: ['Backend systems', 'AI/ML', 'Computer vision', 'Video analytics', 'GenAI/RAG'],
  links: {
    github: 'https://github.com/afrananas',
    source: 'https://github.com/afrananas/afrananas_portfolio',
  },
} as const;

/** Canonical positioning line (docs/00-foundation/product-vision.md). */
export const positioning = `${profile.role} — ${profile.specialties}`;
