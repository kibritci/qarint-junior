# Mad-Libs Stories Game Component

## Architecture
- `<MadLibsGame>` presents stories with blanks to fill
- Focus: slapstick humor for wrong answers (productive failure)

## State
- `currentStory: number` - index in STORIES array
- `currentBlank: number` - which blank is being filled
- `answers: (string | null)[]` - filled answers
- `wrongReaction: { emoji, text } | null` - currently displayed funny reaction

## Story Data
Each story has:
- `template: string[]` - text segments with `_____` placeholders
- `blanks[].correct` - the right answer
- `blanks[].options` - 3 choices (1 correct, 2 funny wrong)
- `blanks[].wrongReaction` - key to WRONG_REACTIONS lookup

## Wrong Answer Reactions (Slapstick)
- "eat" a bridge → 🦷 "He tried to eat the bridge and broke his teeth!"
- "throw" a grandmother → 🤸 "You can't throw a grandmother!"
- "hide" food → 🙈 "If you hide the food, nobody eats!"

## Key Rule: NEVER deduct points for wrong answers
Wrong answers are purely comedic feedback to encourage experimentation.
