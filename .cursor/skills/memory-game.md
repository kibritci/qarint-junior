# Memory Match Game Component

## Architecture
- `<MemoryMatch>` receives `VocabularyWord[]` props from server component
- Grid: 3 columns mobile, 4 columns desktop (12 cards = 6 pairs)
- Each card has `word` type (shows text) and `image` type (shows OpenMoji SVG)

## State
- `cards: Card[]` - all cards with flip/match state
- `flippedCards: number[]` - indices of currently flipped cards (max 2)
- `isChecking: boolean` - prevents clicks during match check

## Interactions
- Card click → flip card → speak word (Web Speech API)
- 2 cards flipped → check match
- Match → confetti + green border + addXp(10)
- No match → `animate-funny-shake` on both cards → flip back after 900ms
- All matched → game complete → save to Supabase

## OpenMoji Integration
```
<img src={`https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/${hex}.svg`} />
```
