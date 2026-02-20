# Splat Word Hunt Game Component

## Architecture
- `<SplatGame>` uses `requestAnimationFrame` for bubble movement
- Bubbles float from bottom to top with random speed and x-position
- Categories: Family, Nature (expandable)

## State
- `bubbles: Bubble[]` - active bubbles on screen
- `timeLeft: number` - 60 second countdown
- `score: number` - points earned
- `isPlaying/isGameOver: boolean` - game state

## Bubble Mechanics
- Spawn every 1200ms with `isCorrect: boolean`
- Move upward at `0.3-0.7` units per frame
- Correct tap → pop + confetti + addXp(10)
- Wrong tap → `animate-funny-shake` + red border (NO point deduction)
- Bubbles auto-remove when y < -10

## Visual
- Round white bubbles with OpenMoji icon + word label
- Blue gradient game area background
- 60-second timer with progress bar
