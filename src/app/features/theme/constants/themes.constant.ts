export const THEME_LIST: { [key: string]: { dark: string; light: string } } = {
  primeng: {
    dark: 'assets/primeng-theme/dark.css',
    light: 'assets/primeng-theme/light.css',
  },
  material: {
    dark: 'assets/material-theme/pink-bluegrey.css',
    light: 'assets/material-theme/deeppurple-amber.css',
  },
  highlightJs: {
    dark: 'assets/highlightjs-theme/atom-one-dark.min.css',
    light: 'assets/highlightjs-theme/atom-one-light.min.css',
  },
} as const;
