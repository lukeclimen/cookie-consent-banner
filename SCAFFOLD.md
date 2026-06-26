# Cookie Consent Banner – Repository Scaffold

## Module Responsibilities

### `src/index.ts`
Entry point. Auto-executes on script load: reads configuration from the hosting `<script>` tag's `data-*` attributes, initialises the banner, and attaches it to the DOM.

### `src/banner.ts`
Creates the banner HTML element tree (container, message text, accept/reject/customise buttons). Exposes `show()`, `hide()`, and `destroy()` methods.

### `src/consent.ts`
Manages the consent cookie: `getConsent()`, `setConsent(value)`, `clearConsent()`. Handles cookie expiry, path, and SameSite attributes.

### `src/config.ts`
Parses configuration from either `data-*` attributes on the script tag or an inline JSON block. Merges with sensible defaults. Validates required fields.

### `src/styles.ts`
Injects a `<style>` element with the banner's CSS. Supports theme overrides (primary colour, font, border-radius, position) via the parsed config.

### `src/types.ts`
Shared interfaces: `BannerConfig`, `ConsentState`, `ThemeOptions`.

## Configuration Contract (Script Tag API)

```html
<script
  src="https://cdn.jsdelivr.net/npm/cookie-consent-banner@latest/dist/cookie-consent-banner.min.js"
  data-message="We use cookies to improve your experience."
  data-accept-text="Accept"
  data-reject-text="Reject"
  data-theme-primary="#2563eb"
  data-theme-bg="#ffffff"
  data-theme-text="#111827"
  data-position="bottom"
  data-cookie-name="cc_consent"
  data-cookie-days="365"
  data-api-key=""
></script>
```

| Attribute | Default | Description |
|---|---|---|
| `data-message` | `"This site uses cookies."` | Banner body text |
| `data-accept-text` | `"Accept"` | Accept button label |
| `data-reject-text` | `"Reject"` | Reject button label |
| `data-theme-primary` | `#2563eb` | Primary button / accent colour |
| `data-theme-bg` | `#ffffff` | Banner background colour |
| `data-theme-text` | `#111827` | Banner text colour |
| `data-position` | `bottom` | `top` or `bottom` |
| `data-cookie-name` | `cc_consent` | Name of the consent cookie |
| `data-cookie-days` | `365` | Cookie expiry in days |
| `data-api-key` | *(empty)* | If set, enables paid geo-rules via the API |

## Build & Publish

- **Build:** `npm run build` → Vite library mode outputs UMD + ESM bundles to `dist/`.
- **Dev:** `npm run dev` → serves `examples/basic.html` with hot reload.
- **Test:** `npm run test` → Vitest.
- **Publish:** Tag a release (`vX.Y.Z`) → GitHub Actions publishes to npm; jsDelivr mirrors automatically.

## GitHub Pages Configurator (`docs/`)

A static single-page app served at `https://lukeclimen.github.io/cookie-consent-banner/`. Users pick colours, button text, and
position via a form, see a live preview of the banner, and copy a ready-to-paste `<script>` tag.