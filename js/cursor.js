/* Custom pixel crosshair cursor */
(function () {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mouseX = -100, mouseY = -100;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function update() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    rafId = requestAnimationFrame(update);
  }
  update();

  /* Grow cursor on hoverable elements */
  const hoverTargets = 'a, button, .project-card, .filter-btn, .win95-btns span, .btn-pixel';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('hovering');
    }
  });

  /* Hide cursor when it leaves the window */
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
})();
