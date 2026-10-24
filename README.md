# Flexbox Playground

This is a Codex project created for testing purposes.

A responsive Angular and TypeScript app with three colored flex items, live controls for direction, justification, alignment and gap, generated CSS, and clipboard copying. Uses native Angular signals, templates, browser APIs, and CSS. No backend or UI libraries.

## Run

Requires Node.js 22.12+ or 24+ and npm 11 or newer.

```sh
npm ci
npm start
```

Open the URL printed by Angular (usually http://127.0.0.1:4200).

## Production build

```sh
npm run build
```

Static output: `dist/flexbox-playground/browser/`. Serve this directory with a static web server. Clipboard access requires localhost or HTTPS. If browser permissions prevent copying, the app shows a message and the CSS remains selectable.



## Appearance

Use the **Dark mode** button to switch themes. Your choice is saved in this browser. On the first visit, the app follows your system color preference. The toggle also works when browser storage is unavailable.
