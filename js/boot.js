/* ============================================================
   BOOT.JS — Win98-style boot sequence
   Plays once per browser session (stored in sessionStorage).
   Click anywhere or press any key to skip.
   ============================================================ */

(function () {
  const screen = document.getElementById('boot-screen');
  if (!screen) return;

  /* Skip boot sequence if already booted this session, but still show intro */
  if (sessionStorage.getItem('ka_booted')) {
    screen.remove();
    const overlay = document.getElementById('intro-overlay');
    if (overlay) overlay.style.display = 'flex';
    return;
  }

  const biosEl = document.getElementById('boot-bios');
  let done = false;

  const BIOS_LINES = [
    { text: 'ARYAMAN SYSTEMS BIOS v2.98  (C)1998 Kunsh Corp.', gap: 0  },
    { text: '',                                                  gap: 20 },
    { text: 'CPU: Intel Pentium II 450MHz ............ OK',     gap: 40 },
    { text: 'Memory Test: 131072K .................... OK',     gap: 35 },
    { text: '',                                                  gap: 25 },
    { text: 'Detecting Primary IDE .. PORTFOLIO HDD [20.4 GB]', gap: 45 },
    { text: 'Detecting Secondary IDE .. CD-ROM  [DEMO REEL]',   gap: 40 },
    { text: '',                                                  gap: 25 },
    { text: 'PnP devices detected: 7',                          gap: 30 },
    { text: 'Initialising plug-and-play devices ... OK',        gap: 35 },
    { text: '',                                                  gap: 25 },
    { text: 'Loading Windows 98...',                            gap: 50 },
  ];

  function finish() {
    if (done) return;
    done = true;
    sessionStorage.setItem('ka_booted', '1');
    screen.style.transition = 'opacity 0.4s ease';
    screen.style.opacity = '0';
    setTimeout(() => {
      screen.remove();
      if (typeof Sounds !== 'undefined') Sounds.startup();
      const overlay = document.getElementById('intro-overlay');
      if (overlay) overlay.style.display = 'flex';
    }, 400);
  }

  document.addEventListener('keydown', finish, { once: true });
  screen.addEventListener('click', finish);

  let elapsed = 0;
  BIOS_LINES.forEach(line => {
    elapsed += line.gap;
    setTimeout(() => {
      if (done) return;
      const p = document.createElement('p');
      p.textContent = line.text;
      biosEl.appendChild(p);
      biosEl.scrollTop = biosEl.scrollHeight;
    }, elapsed);
  });

  /* Show "Welcome to kunsh.exe" then fade out */
  setTimeout(() => {
    if (done) return;
    const p = document.createElement('p');
    p.textContent = 'Welcome to kunsh.exe';
    p.style.color = '#fff';
    p.style.marginTop = '12px';
    biosEl.appendChild(p);
    biosEl.scrollTop = biosEl.scrollHeight;
    setTimeout(finish, 150);
  }, elapsed + 30);

})();
