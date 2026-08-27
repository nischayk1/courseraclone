# LearnSpace — Coursera-style learning platform UI

A polished, responsive online-learning website built with plain HTML, CSS and JavaScript.

## Files

- `index.html` — page structure and content
- `style.css` — complete responsive styling
- `script.js` — course filtering, sorting, search, modal details, enrollment demo, dark mode and mobile navigation

## Run locally

Open `index.html` directly in a browser, or use a simple local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and this `README.md`.
3. In GitHub, open **Settings → Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Select the `main` branch and `/root`.
6. Save. GitHub will publish the site.

## Notes

This is a front-end demo, not a production LMS. The login, signup and payment buttons are demo interactions. Course enrollment uses `localStorage` so the demo can remember selected courses in the same browser.

To turn this into a real platform, connect the UI to a backend/auth system, database, payment provider and video/content storage.

The visual language is inspired by modern online-learning platforms, but the branding, layout and content are original to LearnSpace.
