# Contributing

## Add a prompt

```bash
npm run scaffold -- -c landing-pages -i my-id -t "My Title"
# edit files in prompts/<category>/<id>/
npm run build
```

## Rules

- Follow `AGENTS.md` and `schema/entry.schema.json`
- Keep `prompt.md` short and executable; put depth in `prompt.full.md`
- Replace SVG placeholders with real captures when you have demos
- `experiments/` is for WIP — promote to a main category when `polished`

## AI contributors

Other models should treat `AGENTS.md` as the system brief and `index.json` as the live catalog.
