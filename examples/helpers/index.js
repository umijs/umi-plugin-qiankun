export function isIE() {
  return !!window.ActiveXObject || "ActiveXObject" in window
}
