export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1f1f1f" offset="20%" />
      <stop stop-color="#2a2a2a" offset="50%" />
      <stop stop-color="#1f1f1f" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1f1f1f" />
  <rect width="${w}" height="${h}" fill="url(#g)">
    <animate
      attributeName="x"
      from="-${w}"
      to="${w}"
      dur="1.2s"
      repeatCount="indefinite"
    />
  </rect>
</svg>
`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
