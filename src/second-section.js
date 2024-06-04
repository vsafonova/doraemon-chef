let windowHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  ),
  lastTop;

window.addEventListener("scroll", function (event) {
  let animation = document.getElementById("animated-section-2"),
    top = animation.getBoundingClientRect().top,
    offset = top - windowHeight;

  if (offset > 0) {
    animation.classList.remove("animation");
    return;
  }

  if (animation.className.indexOf("animation") === -1 && top < lastTop) {
    animation.classList.add("animation");
  }

  lastTop = top;
});
