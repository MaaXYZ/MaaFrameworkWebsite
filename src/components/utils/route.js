export class Router {
  static open(href, isOnBlank = true) {
    if (isOnBlank) {
      window.open(href, "_blank");
    } else {
      window.location.href = href;
    }
  }
}
