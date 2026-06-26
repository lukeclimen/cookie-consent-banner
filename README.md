# cookie-consent-banner

A lightweight, zero-dependency cookie consent banner you can drop into any website with a single `<script>` tag.

> **Status:** Pre-v1, actively developed. The configuration API may change before the 1.0.0 release.

## Why

Existing cookie consent products are overpriced for what they actually deliver — you're often paying a recurring SaaS fee just to show a banner on your site. This project offers a genuinely free, self-serve alternative: a single self-contained JavaScript file you can drop into any page with one script tag, no account required, no strings attached.

For teams that need more control, an optional paid add-on enables geo-based rules so you can actively manage which visitors see the banner based on their location — only pay for the features you actually need.

## Usage

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
></script>
```

No framework, no dependencies, no configuration file — just paste the tag and go.

## Configuration

| Attribute            | Default                     | Description                                |
| -------------------- | --------------------------- | ------------------------------------------ |
| `data-message`       | `"This site uses cookies."` | Banner body text                           |
| `data-accept-text`   | `"Accept"`                  | Accept button label                        |
| `data-reject-text`   | `"Reject"`                  | Reject button label                        |
| `data-theme-primary` | `#2563eb`                   | Primary button / accent colour             |
| `data-theme-bg`      | `#ffffff`                   | Banner background colour                   |
| `data-theme-text`    | `#111827`                   | Banner text colour                         |
| `data-position`      | `bottom`                    | `top` or `bottom`                          |
| `data-cookie-name`   | `cc_consent`                | Name of the consent cookie                 |
| `data-cookie-days`   | `365`                       | Cookie expiry in days                      |
| `data-api-key`       | _(empty)_                   | If set, enables paid geo-rules via the API |

## Configurator

Not sure what options to use? Try the **[live configurator](https://lukeclimen.github.io/cookie-consent-banner/)** — pick your colours and button text, see a live preview, and copy the ready-to-paste script tag.

## Roadmap to v1.0

### Phase 1 — Project Foundation

- [x] Establish build tooling with TypeScript support, library output, and a local dev server with hot reload
- [x] Set up a test runner with coverage reporting
- [x] Add biome for linting and formatting
- [x] Add lefthook for autolinting on commits
- [x] Configure CI to run linter and tests automatically on every pull request

### Phase 2 — Core Implementation

- [ ] Parse and validate all `data-*` configuration attributes with sensible defaults
- [ ] Implement cookie read/write/clear with configurable name and expiry
- [ ] Render a fully themeable banner injected into the page with no external dependencies
- [ ] Wire everything into a single auto-initialising entry point that works from a plain script tag

### Phase 3 — Quality & Testing

- [ ] Achieve unit test coverage across all modules
- [ ] Provide a working browser example for manual smoke testing

### Phase 4 — Open Source Hygiene

- [x] Publish a license, contribution guide, and code of conduct
- [x] Add issue and pull request templates to streamline community contributions
- [ ] Automate npm publishing on version tags via CI

### Phase 5 — Docs & Distribution

- [ ] Ship a live configurator (GitHub Pages) so users can preview and copy their script tag
- [ ] Publish v1.0.0 to npm and verify the jsDelivr CDN link resolves correctly

## Development

This project uses [Yarn](https://yarnpkg.com/) and [Vite](https://vitejs.dev/) in library mode.

```bash
# Install dependencies
yarn install

# Start dev server (serves examples/basic.html with hot reload)
yarn dev

# Run tests
yarn test

# Build for production (outputs to dist/)
yarn build
```

## Contributing

Contributions, bug reports, and feature requests are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request or issue. The roadmap above is a good place to look for things to pick up if you want to help.

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## License

[MIT](LICENSE)
