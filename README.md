# My Tiny Jesus

> A framework-free, archive-informed recreation of the **MyTinyJesus** Flash widget.

This project recreates the visual language of a small late-2000s web widget: a tiny Jesus figure sits at the edge of a bright upper field and black reflective floor, while short speech bubbles rotate overhead. The composition is intentionally spare and avoids adding modern application chrome.

The historical site can still be inspected through an [Internet Archive capture (5 February 2009)](https://web.archive.org/web/20090205063029/http://mytinyjesus.com/).

## Important provenance note

The **200 messages** in this project are **original fictional writing**, created in the playful, period-appropriate voice of the concept. They are not recovered posts from an original `@mytinyjesus` account. The archive did not provide a complete historical tweet corpus, so the project labels the message collection as fictional in the interface and source code.

## Implementation

The runtime is deliberately small and uses **no React or other browser framework**.

| Area               | Location           | Purpose                                                                 |
| ------------------ | ------------------ | ----------------------------------------------------------------------- |
| Page structure     | `index.html`       | The full widget markup and page entry point.                            |
| Visual styling     | `css/styles.css`   | Horizon, speech bubble, responsive layout, and reflection mask.         |
| Widget behaviour   | `js/app.js`        | Message shuffling, 9-second rotation, and click-to-advance interaction. |
| Message collection | `js/messages.js`   | The 200 original fictional messages as an ES module.                    |
| Figure assets      | `images/jesus.png` | Transparent sprite of Jesus.                                            |

### Behaviour

The speech bubble cycles through a shuffled message pool every nine seconds. Clicking the bubble immediately advances to another message. The Jesus figure and vertically inverted reflection are anchored on the right side of the viewport; the mobile layout offsets the bubble so its tail remains pointed at the figure.

## License and attribution

This repository is a non-affiliated recreation for preservation and experimentation. It does not claim to be the original MyTinyJesus project or an archive of its original social-media output.

## References

- [1] [Internet Archive capture of MyTinyJesus.com (5 February 2009)](https://web.archive.org/web/20090205063029/http://mytinyjesus.com/)
