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

  const biosEl   = document.getElementById('boot-bios');
  const splashEl = document.getElementById('boot-splash');
  const barFill  = document.getElementById('boot-bar-fill');
  let   done     = false;

  /* Lines to type out in the BIOS phase */
  const BIOS_LINES = [
    { text: 'ARYAMAN SYSTEMS BIOS v2.98  (C)1998 Kunsh Corp.', gap: 0   },
    { text: '', gap: 60 },
    { text: 'CPU: Intel Pentium II 450MHz ............ OK',     gap: 180 },
    { text: 'Memory Test: 131072K .................... OK',     gap: 160 },
    { text: '',                                                  gap: 80  },
    { text: 'Detecting Primary IDE .. PORTFOLIO HDD [20.4 GB]', gap: 200 },
    { text: 'Detecting Secondary IDE .. CD-ROM  [DEMO REEL]',   gap: 180 },
    { text: '',                                                  gap: 80  },
    { text: 'PnP devices detected: 7',                          gap: 120 },
    { text: 'Initialising plug-and-play devices ... OK',        gap: 140 },
    { text: '',                                                  gap: 100 },
    { text: 'Loading Windows 98...',                            gap: 220 },
  ];

  /* ── Finish: fade out and reveal desktop ── */
  function finish() {
    if (done) return;
    done = true;
    sessionStorage.setItem('ka_booted', '1');
    screen.style.transition = 'opacity 0.6s ease';
    screen.style.opacity    = '0';
    setTimeout(() => {
      screen.remove();
      if (typeof Sounds !== 'undefined') Sounds.startup();
      const overlay = document.getElementById('intro-overlay');
      if (overlay) overlay.style.display = 'flex';
    }, 600);
  }

  document.addEventListener('keydown', finish, { once: true });
  screen.addEventListener('click', finish);

  /* ── Phase 1: BIOS text ── */
  let elapsed = 0;
  BIOS_LINES.forEach(line => {
    elapsed += line.gap;
    setTimeout(() => {
      if (done) return;
      const p = document.createElement('p');
      p.textContent = line.text;
      biosEl.appendChild(p);
      /* Auto-scroll to bottom */
      biosEl.scrollTop = biosEl.scrollHeight;
    }, elapsed);
  });

  /* ── Phase 2: Win98 splash ── */
  const SPLASH_START = elapsed + 500;

  setTimeout(() => {
    if (done) return;
    biosEl.style.display = 'none';
    splashEl.hidden      = false;

    /* Animate progress bar in uneven steps like a real loader */
    let pct = 0;
    const iv = setInterval(() => {
      if (done) { clearInterval(iv); return; }
      pct += Math.random() * 14 + 3;
      if (pct >= 100) {
        pct = 100;
        barFill.style.width = '100%';
        clearInterval(iv);
        setTimeout(finish, 450);
        return;
      }
      barFill.style.width = Math.min(pct, 100) + '%';
    }, 130);
  }, SPLASH_START);

})();
