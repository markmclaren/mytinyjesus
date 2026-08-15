# Archive Findings — MyTinyJesus

## Confirmed page structure

The Internet Archive replay of **5 February 2009** is available at:

<https://web.archive.org/web/20090205063029/http://mytinyjesus.com/>

The original HTML embeds `resources/swf/tinyjesus.swf` at **100% width** and a fixed **600px height**, using a black Flash stage background. The host page CSS sets the body background to black.

The original no-Flash fallback uses `bg_noflash.gif`, a 4 × 330px repeating vertical strip. Examination shows the upper portion white and the lower portion black. Together with the user’s recollection, this supports a **bright upper area above a black reflective floor**, rather than a fully black roaming-character composition.

The available live archive replay invokes Ruffle but remains on its old loading sequence. Its preloader shows a blue upper panel above a black lower panel; this is only a loading screen, not the final stage. The static SWF contains no large bitmap background besides the Jesus JPEG; its stage layout is consequently vector/programmatic.

## Design conclusion

The recreation should use a stationary, centered Jesus figure at the boundary of a white upper field and a black lower reflective field. His reflection belongs below the boundary, vertically inverted, faded, and softly masked into the black. Speech bubbles should appear above him in the bright area.
