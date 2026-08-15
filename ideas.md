# MyTinyJesus — Design Document

## Three Approaches (sampled)

| Theme | Intro | Probability |
|---|---|---|
| **Faithful Replica** | Pixel-faithful recreation of the original Flash widget: black stage, white speech bubbles, Arial text, the exact palette and layout of the 2007–2011 original. | 0.08 |
| **Nostalgic Web 2.0** | Warm parchment tones, soft drop-shadows, rounded corners, and a subtle linen texture — the aesthetic of a mid-2000s blog sidebar widget. | 0.05 |
| **Ethereal Glow** | Deep midnight-blue sky, soft golden halos, hand-lettered serif typography, and luminous bubble animations — a reverent, slightly mystical mood. | 0.03 |

## Chosen Approach: Faithful Replica

The original widget's charm came entirely from its fidelity to the Twitter era aesthetic and its deadpan simplicity. The right move is to honour that exactly.

### Design Movement
Late-2000s Flash widget / Web 2.0 sidebar gadget

### Core Principles
1. Black stage background — the original used `SetBackgroundColor(0,0,0)`
2. White rounded speech bubbles with a subtle drop shadow and a triangular tail
3. Arial / sans-serif body text at small sizes, exactly as the original
4. The Jesus sprite is the only visual focal point — everything else is minimal

### Color Philosophy
- Stage: `#000000` (pure black)
- Bubbles: `#ffffff` fill, `#cccccc` border, soft `box-shadow`
- Bubble text: `#333333`
- Author link: `#0084b4` (classic Twitter blue, 2009 era)
- Confess button: `#e8e8e8` with `#999` text

### Layout Paradigm
Full-viewport stage with a bright upper field and a black reflective floor. Jesus is stationary at the horizon line; bubbles appear above him, while a vertically inverted, fading reflection occupies the floor.

### Signature Elements
1. A hard bright-field / black-floor horizon line
2. A vertically inverted, masked reflection of Jesus below the line
3. Speech bubble slide-open animation (panel_mc style)

### Interaction Philosophy
Passive observation. The user watches the fixed reflection composition and reads one message at a time. Clicking a bubble advances the message. The confess button is a small secondary affordance.

### Animation
- Jesus remains fixed at the horizon, matching the archive-informed composition
- Bubble entrance: scale from 0.95 + opacity 0 → 1 over 300ms ease-out
- Bubble exit: fade + scale down over 200ms
- Bubbles drift slightly upward over their lifetime

### Typography System
- Body: Arial, 11px (matching original `DefineFont3` / Arial embed)
- Author name: bold 11px
- Screen name: `#0084b4`, 10px

### Brand Essence
A tiny omnipresent Jesus tweets at you from your browser. For the devout, the nostalgic, and the delightfully confused.
Personality: **deadpan**, **reverent**, **nostalgic**

### Brand Voice
- "What would Jesus tweet?"
- "He's watching. He's tweeting."

### Wordmark & Logo
The Jesus sprite itself is the logo. No wordmark needed.

### Signature Brand Color
`#0084b4` — classic Twitter blue, 2009.

## Style Decisions
- Bubble tail points downward toward Jesus's head
- Max 3 simultaneous bubbles on screen
- Tweet cycle: new tweet every 6 seconds, bubble lives for 12 seconds
- Stage is full viewport, no scroll
