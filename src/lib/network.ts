export const getImageQuality = () => {
  if (typeof navigator === "undefined") return 80;

  // @ts-ignore
  const conn = navigator.connection || navigator.mozConnection;
  if (!conn) return 80;

  if (conn.effectiveType === "4g") return 80;
  if (conn.effectiveType === "3g") return 60;
  return 40;
};
