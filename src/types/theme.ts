export type Theme = 'octagonal' | 'cyan'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}
