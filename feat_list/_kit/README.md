# Demo kit

Every feature demo in `feat_list/<feature>/html/` links this kit, so all demos share the same phone frame, side panel, colours and controls. A demo file then holds only its own feature markup, styles and logic, which makes it easy to read when implementing in Flutter.

## Skeleton

```html
<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ফিচারের নাম — ডেমো ১ · দিকনির্দেশনার নাম</title>
<link rel="stylesheet" href="../../_kit/kit.css">
<style>
  /* feature-only styles; use the kit tokens (var(--primary), var(--card) ...) */
</style>
</head>
<body>
<main class="kit-stage">
  <div class="phone">
    <div class="viewport">
      <section class="screen" data-screen="list">
        <header class="appbar"><button class="icon-btn" aria-label="পেছনে">…</button><h1>সহিহ বুখারি</h1></header>
        <div class="scroll"> … </div>
      </section>
      <section class="screen" data-screen="detail" data-status="light"> … </section>

      <div class="sheet" id="sheet-x" role="dialog" aria-label="…">
        <div class="sheet-head"><h2>শিরোনাম</h2><button class="icon-btn" data-close aria-label="বন্ধ করুন">…</button></div>
        <div class="sheet-body">…</div>
        <div class="sheet-foot"><button class="btn text" data-close>বাতিল</button><button class="btn" data-close data-snack="সেভ করা হয়েছে">ঠিক আছে</button></div>
      </div>
    </div>
  </div>
</main>
<script src="../../_kit/kit.js"></script>
<script>
  Kit.init({ demo: 1, name: 'দিকনির্দেশনার নাম', screens: [
    { id: 'list', label: 'লিস্ট' },
    { id: 'detail', label: 'বিস্তারিত' },
  ]});
</script>
</body>
</html>
```

## What the kit gives you

- **Shell:** `Kit.init` builds a side panel to the right of the phone (demo name, screen list, light/dark toggle), the status bar, a scrim and a snackbar.
- **Layout:** the page never scrolls; only the phone does. The phone takes the full window height. A wide tablet frame (`.phone.tab` / `.phone.tablet` with its own width and height) is scaled down to fit. On a phone-sized window the side panel moves to a strip on top. Do not add CSS for `.kit-side`, `.kit-stage`, `body` or page scrolling.
- **Navigation:** `?screen=<id>` and `?theme=dark` in the URL open a screen or theme directly. A parent page can do the same with `postMessage({type:'screen', id})` and `{type:'theme', id}`.
- **Inside the viewer:** with `?embed=1` the side panel is hidden and the kit posts `{type:'kit-ready', demo, name, screens}` and `{type:'kit-screen', id}` to the parent, which shows the screen list itself.
- **Declarative attributes:** these work without writing any JS.

  | Attribute | Does |
  |---|---|
  | `data-go="<screen>"` | switches screen |
  | `data-open="<sheet or dialog id>"` | opens it |
  | `data-close` / `data-close="<id>"` | closes the enclosing (or named) sheet or dialog |
  | `data-snack="লেখা"` | shows a snackbar |

- **JS API:** `Kit.show(id)`, `Kit.open(id)`, `Kit.close(id)`, `Kit.snack(text, {label, onClick})`, `Kit.bn(123)` (Bangla digits), `Kit.icons.*` (SVG strings: `back close search more check plus chevron down sort filter mic share copy link info play pause book edit trash clock home grid user sun bookmarkFilled folder pin menuCollection`), and `Kit.onScreen(fn)`.
- **Classes:**

  | Area | Classes |
  |---|---|
  | App bar | `appbar` (`.flat` = scaffold-coloured), `icon-btn` |
  | Cards and hadith | `card`, `section-title`, `hadith-head`, `book-badge`, `hadith-meta`, `grade`, `arabic`, `translation`, `narrator` |
  | Buttons and chips | `btn` (`.tonal .outline .text .danger .block`), `chip`, `chip-row` |
  | Form controls | `field`, `switch` (`aria-checked`), `progress > i` |
  | Lists and empty states | `list-row`, `muted`, `empty` |
  | Overlays | `sheet` with `sheet-head`, `sheet-body` and `sheet-foot`; `dialog` with `actions` |
  | Navigation | `bottom-nav` |

- **Grade colours** come from `var(--grade-sahih|--grade-undetermined|--grade-weak|--grade-other)`. In hadith UI, green, orange and red mean grade only, so never use them for any other status.
