# Easy Game Maker Documentation

Documentation portal for Easy Game Maker (EGM), the TypeScript-first 2D game engine.

## Development

```bash
npm install
npm run dev
```

Validate production output with:

```bash
npm run lint
npm run build
npm run preview
```

## Content Source

The public API and command-line interface (CLI) behavior are defined in the sibling SDK project:

- `../easy-game-maker/src/engine/index.ts`
- `../easy-game-maker/src/cli/index.ts`

Keep examples aligned with those files. The portal uses `BrowserRouter`, so the production host must redirect unknown routes to `index.html`.
