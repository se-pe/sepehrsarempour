# Editing this site — cheat sheet

Everything you need to add photos and change text, without touching design or code.

**Live site:** https://se-pe.github.io/sepehrsarempour/

---

## 1. How to publish anything

Same 4 steps for every change (photo or text):

1. Make the change (drop an image into `images/`, or edit text in a file).
2. Open **GitHub Desktop** — your change appears in the left panel.
3. Type a short note in the Summary box (e.g. "add poster 2 photos").
4. Click **Commit to main**, then **Push origin** (top bar).

Wait ~1 minute → it's live. If you don't see it, hard refresh: **Cmd + Shift + R**.

> **Undo anything:** In GitHub Desktop, right-click a changed file → **Discard Changes**. Already pushed? Ask Claude to revert it — nothing is ever truly lost, every version is saved.

---

## 2. Adding photos — no code needed

Drop the file into the `images/` folder with **exactly** the filename below. That's it — the page picks it up automatically. Wrong name = nothing shows.

### Work page thumbnails (the grid cards)

| Filename | Where it shows |
|---|---|
| `work-01.jpg` | Project One card (+ Home page card 1) |
| `work-02.jpg` | Project Two card (+ Home page card 2) |
| `work-03.jpg` | Project Three card (+ Home page card 3) |
| `work-04.jpg` | Project Four card |
| `work-05.jpg` | Project Five card |
| `poster-01.jpg` … `poster-04.jpg` | Poster cards 1–4 |
| `ai-01.jpg` … `ai-03.jpg` | AI cards 1–3 |

> `work-01/02/03.jpg` are used **twice** — Work page *and* Home page. That's intentional.

### Inside the detail pages

| Filename pattern | Where it shows | Clickable? |
|---|---|---|
| `poster-01.jpg` | Poster One — the big poster image | No (main image) |
| `poster-01-detail-1.jpg`, `-detail-2.jpg` | Poster One — close-up shots | Yes |
| `ai-01.jpg` | AI One — the lead image | No (main image) |
| `ai-01-02.jpg` … `ai-01-07.jpg` | AI One — gallery frames | Yes |
| `project-01-01.jpg` | Project One — the lead image | No (main image) |
| `project-01-02.jpg`, `-03`, `-04` | Project One — gallery | Yes |

Swap the number for other pages: `ai-02-03.jpg` = AI **Two**, gallery frame 3. `project-04-02.jpg` = Project **Four**, gallery image 2.

### Photo specs

- **Format:** JPG
- **Size:** ~1600–1920px on the long edge is plenty
- **Weight:** aim under ~400KB each (your hero is 288KB for reference)
- Grid cards are cropped to fit — keep the subject roughly centred
- Empty/missing images show as a clean grey box, so a half-finished page never looks broken

---

## 3. Changing text

Open the file, find the line, change **only the words** — leave anything in `< >` alone.

**Easiest way:** on GitHub.com, open the file → click the pencil ✏️ → edit → **Commit changes**. Publishes itself, no GitHub Desktop needed.

> Line numbers shift as you edit. If a number looks wrong, use **Cmd + F** to search for the text instead.

### `index.html` — Home

| What you see | Line | Look for |
|---|---|---|
| "Portfolio / Selected Work" | 65 | `hero-kicker` |
| Big hero paragraph | 67 | `hero-description` |
| "Design that feels sharp…" | 84 | `big-copy` |
| Card titles (Brand World, etc.) | 100, 109, 118 | `work-title` |
| Card subtitles | 101, 110, 119 | `work-meta` |
| "Make it clear / bold / stick." | 133 | `statement-title` |
| Paragraph under that | 142 | `statement-copy` |
| The 3 expertise cards | 158–181 | `info-title`, `info-description` |
| "Let's build something that lasts." | 192 | `cta-title` |

### `about.html` — About

| What you see | Line | Look for |
|---|---|---|
| "I'm Sepehr" | 64 | `hero-title` |
| "a graphic designer" | 69 | `hero-kicker` |
| Hero paragraph | 71 | `hero-description` |
| "I shape ideas into…" | 88 | `big-copy` |
| **Your background paragraph** | 100 | `body-copy` |
| **← Add your story here** | 104 | the `<!-- comment -->` marks the spot |
| "Direction is not decoration." | 117 | `statement-title` |
| Focus / Strengths / Tools tags | 137–159 | `<span class="pill">` |

### `work.html` — Work

| What you see | Line | Look for |
|---|---|---|
| Project card titles | 88, 97, 106, 115, 124 | `work-title` |
| Project card subtitles | 89, 98, 107, 116, 125 | `work-meta` |
| Poster intro paragraph | 138 | `big-copy` |
| Poster card titles | 148, 157, 166, 175 | `work-title` |
| AI intro paragraph | 190 | `big-copy` |
| AI card titles | 200, 209, 218 | `work-title` |

> Card titles use `<br>` to force a line break: `Project<br>One` shows as two lines.

### `contact.html` — Contact

| What you see | Line | Note |
|---|---|---|
| Email address | **83 and 85** | ⚠️ Change it in **both** — line 83 is the click-to-email link, 85 is the visible text |
| Phone number | **88 and 90** | ⚠️ Both — line 88 is the copy-to-clipboard value, 90 is visible |
| Instagram handle | 93, 95 | Link + visible text |
| "Available For" tags | 109+ | `<span class="pill">` |

### Detail pages (`project-01.html`, `poster-02.html`, `ai-03.html` …)

All 12 follow the same layout:

| What you see | Roughly line | Look for |
|---|---|---|
| Page title in browser tab | 7 | `<title>` |
| Big page heading | 62 | `hero-title` |
| One-line intro | 71 | `hero-description` |
| Main description | 90 | `body-copy` |
| Date / Category / Client / Tools tags | 104+ | `<span class="pill">` |

Projects also have **The Challenge / The Approach / The Outcome** paragraphs further down — search for those words.

---

## 4. Rules & gotchas

**Safe to change:** any plain words between tags — `<p class="body-copy">CHANGE THIS</p>`

**Don't touch:**
- Anything inside `< >` — the tags and `class="..."` names control the design
- `css/style.css` and `js/main.js` — that's the design system and the lightbox
- File names of the pages themselves (`work.html` etc.) — links would break

**Watch out for:**
- **Don't write text in TextEdit/Word and paste it in.** They convert quotes into characters that can break things. Type directly into GitHub.com's editor, or use a plain-text editor.
- **Apostrophes:** the site uses the curly `’` (as in `weren’t`). Copy an existing one if you need it — a straight `'` also works fine, it just looks slightly different.
- **`&` in text** must be written as `&amp;` — e.g. "Brand &amp; Identity".
- **Don't delete a whole `<div>` block** to remove something. Deleting half a pair breaks the layout. Ask Claude to remove sections properly.

**Removing a card you don't have work for:** don't leave an empty one. Ask Claude to remove it — the grid is sized so the rows tile evenly, and deleting a card by hand will leave a gap.

---

## 5. Two things to know

**Sharing links:** the Home/About/Work/Contact pages preview with your hero image when pasted into Instagram, WhatsApp, etc. The **detail pages** point at their own images — so they'll show no preview picture until you add the real photos.

**When you add a new photo, that's it** — no HTML change needed, as long as the filename matches the table above.
