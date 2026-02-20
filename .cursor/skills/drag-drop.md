# Sentence Builder (Drag & Drop) Game Component

## Architecture
- `<SentenceBuilder>` uses tap-to-place mechanics (no external DnD library needed)
- Values-education sentences: "I respect my elders", "We share our food"

## State
- `shuffledWords: string[]` - randomized word pool
- `placedWords: (string | null)[]` - drop zone slots
- `wrongSlots: number[]` - indices that triggered spring-back animation

## Interactions
- Tap word in pool → places in first empty slot
- Tap word in slot → removes it back to pool
- "Check Answer" → validates order against correct sentence
- Correct → confetti + speak full sentence + addXp(20)
- Wrong → `animate-spring-back` on wrong slots → auto-remove after 800ms

## Sentence Data
Stored in component as `SENTENCES` array with `{ words: string[], hint: string }`.
All sentences reinforce family values and positive character traits.
