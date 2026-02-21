/** Emoji options for user avatar (child-friendly) */
export const AVATAR_EMOJIS = [
  '🦁', '🦋', '🚀', '🌟', '🤖', '🦊', '🐬', '🦄',
  '🐱', '🐶', '🐻', '🐼', '🦉', '🦁', '🐸', '🦋',
  '⭐', '🌈', '🔥', '💎', '🎯', '🧩', '📖', '✍️',
  '🎨', '🎵', '⚽', '🎮', '🖼️', '🌸', '🌻', '🍀',
  '🎈', // balloon (onboarding)
];

/** Accent colors (Tailwind-compatible class or hex for profile) */
export const ACCENT_COLORS: { id: string; label: string; bg: string; ring: string }[] = [
  { id: 'primary', label: 'Teal', bg: 'bg-primary-500', ring: 'ring-primary-500' },
  { id: 'rose', label: 'Rose', bg: 'bg-rose-500', ring: 'ring-rose-500' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-500', ring: 'ring-amber-500' },
  { id: 'emerald', label: 'Green', bg: 'bg-emerald-500', ring: 'ring-emerald-500' },
  { id: 'sky', label: 'Sky', bg: 'bg-sky-500', ring: 'ring-sky-500' },
  { id: 'violet', label: 'Violet', bg: 'bg-violet-500', ring: 'ring-violet-500' },
  { id: 'orange', label: 'Orange', bg: 'bg-orange-500', ring: 'ring-orange-500' },
  { id: 'pink', label: 'Pink', bg: 'bg-pink-500', ring: 'ring-pink-500' },
];
