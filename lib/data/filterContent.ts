/**
 * Content filtering for Qarint Junior.
 * Ensures all content is safe and age-appropriate for children.
 */

const BLOCKED_TOPICS = [
  'alcohol', 'beer', 'wine', 'pub', 'bar', 'club',
  'violence', 'fight', 'kill', 'weapon', 'gun', 'knife',
  'ghost', 'witch', 'halloween', 'vampire', 'zombie',
  'boyfriend', 'girlfriend', 'dating', 'kiss',
  'pork', 'ham', 'bacon', 'sausage',
  'gambling', 'casino', 'lottery',
  'cigarette', 'smoke', 'drug',
];

const APPROVED_THEMES = [
  'family', 'respect', 'honesty', 'kindness', 'sharing',
  'nature', 'animals', 'food', 'school', 'home',
  'colors', 'numbers', 'body', 'clothes', 'actions',
  'gratitude', 'patience', 'cooperation', 'generosity',
];

export function isContentSafe(text: string): boolean {
  const lower = text.toLowerCase();
  return !BLOCKED_TOPICS.some((topic) => lower.includes(topic));
}

export function isThemeApproved(theme: string): boolean {
  return APPROVED_THEMES.includes(theme.toLowerCase());
}

export function filterWordList(words: { word: string; category: string }[]): typeof words {
  return words.filter((w) => isContentSafe(w.word) && isContentSafe(w.category));
}
