// Shared breakpoints. Written in em so they follow the browser's default font
// size (16px) rather than the html { font-size: 62.5% } rem trick.
//   laptop  ≤ 1200px  dashboard drops to two columns
//   tablet  ≤ 1024px  sidebar becomes a slide-in drawer
//   mobile  ≤  768px  forms stack, tighter padding
//   small   ≤  480px  single column everywhere
export const device = {
  laptop: '(max-width: 75em)',
  tablet: '(max-width: 64em)',
  mobile: '(max-width: 48em)',
  small: '(max-width: 30em)',
};
