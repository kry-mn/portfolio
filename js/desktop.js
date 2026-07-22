/* ============================================================
   DESKTOP.JS — Win98 Window Manager
   ============================================================ */

(function () {

  /* ── State ── */
  let zTop = 10;
  const winState = {}; // id → { min, max, prevRect }

  /* ── Clock ── */
  function updateClock() {
    const el = document.getElementById('tb-clock');
    if (!el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    el.textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 10000);

  /* ── Scanline Aberrations ── */
  const scanlines = document.getElementById('scanlines');
  if (scanlines) {
    setInterval(() => {
      if (Math.random() > 0.72) {
        scanlines.classList.add('aberrating');
        setTimeout(() => scanlines.classList.remove('aberrating'), 130);
      }
    }, 4000);
  }

  /* ── Window helpers ── */
  function getWin(id) { return document.getElementById('win-' + id); }

  function bringToFront(win) {
    zTop += 1;
    win.style.zIndex = zTop;
    // Mark all inactive, this one active
    document.querySelectorAll('.os-window').forEach(w => w.classList.add('inactive'));
    win.classList.remove('inactive');
    // Highlight matching taskbar button
    document.querySelectorAll('.tb-taskwin').forEach(b => {
      b.classList.toggle('active', b.dataset.win === win.id.replace('win-', ''));
    });
  }

  function openWindow(id) {
    const win = getWin(id);
    if (!win) return;
    /* Close all other open windows first (one window at a time) */
    document.querySelectorAll('.os-window.win-open').forEach(w => {
      const wid = w.id.replace('win-', '');
      if (wid !== id) closeWindow(wid);
    });
    if (!winState[id]) winState[id] = { min: false, max: false, prevRect: null };
    winState[id].min = false;
    win.classList.remove('maximized'); // clear any stuck maximized state
    win.classList.add('win-open');
    bringToFront(win);
    if (typeof Sounds !== 'undefined') Sounds.open();
    addTaskbarButton(id);
    if (!window._poppingState) {
      try { history.pushState(null, '', '#' + id); } catch(e) { window.location.hash = id; }
    }
    // Apply default rect unless the user has manually moved/resized this window
    if (!win.dataset.userMoved && !win.dataset.userResized) {
      const r = defaultWinRect();
      win.style.left   = r.left   + 'px';
      win.style.top    = r.top    + 'px';
      win.style.width  = r.width  + 'px';
      win.style.height = r.height + 'px';
    }
    // Select the desktop icon
    document.querySelectorAll('.d-icon').forEach(ic => {
      ic.classList.toggle('selected', ic.dataset.win === id);
    });
  }

  function closeWindow(id) {
    const win = getWin(id);
    if (!win) return;
    win.classList.remove('win-open');
    winState[id] = null;
    /* Reset windows to their default view when closed */
    if (id === 'projects' && typeof window._resetProjects === 'function') {
      window._resetProjects();
    }
    if (id === 'blogs' && typeof window._resetBlogsToList === 'function') {
      window._resetBlogsToList();
    }
    delete win.dataset.placed;
    delete win.dataset.userMoved;
    delete win.dataset.userResized;
    if (typeof Sounds !== 'undefined') Sounds.close();
    removeTaskbarButton(id);
    deselectIcon(id);
    if (!window._poppingState) {
      try { history.replaceState(null, '', window.location.pathname); } catch(e) {}
    }
  }

  function minimizeWindow(id) {
    const win = getWin(id);
    if (!win) return;
    if (!winState[id]) winState[id] = {};
    winState[id].min = true;
    if (typeof Sounds !== 'undefined') Sounds.minimize();
    win.classList.remove('win-open');
    markTaskbarButton(id, true);
    deselectIcon(id);
  }

  function restoreWindow(id) {
    const win = getWin(id);
    if (!win) return;
    if (!winState[id]) winState[id] = {};
    if (winState[id].wasMax) {
      win.classList.add('maximized');
    }
    winState[id].min = false;
    win.classList.add('win-open');
    bringToFront(win);
    markTaskbarButton(id, false);
  }

  function toggleMaximize(id) {
    const win = getWin(id);
    if (!win) return;
    if (!winState[id]) winState[id] = {};
    if (win.classList.contains('maximized')) {
      win.classList.remove('maximized');
      // Restore previous size/position
      const pr = winState[id].prevRect;
      if (pr) {
        win.style.left   = pr.left;
        win.style.top    = pr.top;
        win.style.width  = pr.width;
        win.style.height = pr.height;
      }
      winState[id].wasMax = false;
    } else {
      // Save current rect
      winState[id].prevRect = {
        left: win.style.left, top: win.style.top,
        width: win.style.width, height: win.style.height
      };
      win.classList.add('maximized');
      winState[id].wasMax = true;
    }
    bringToFront(win);
  }

  /* ── Taskbar window buttons ── */
  function addTaskbarButton(id) {
    if (document.querySelector(`.tb-taskwin[data-win="${id}"]`)) return;
    const strip = document.getElementById('taskbar-windows');
    const btn = document.createElement('button');
    btn.className = 'tb-btn tb-taskwin';
    btn.dataset.win = id;
    const win = getWin(id);
    const title = win ? win.querySelector('.os-titlebar h2')?.textContent || id : id;
    const icon = win ? win.querySelector('.os-titlebar-icon')?.textContent || '' : '';
    btn.innerHTML = `<span class="btn-icon">${icon}</span> ${title}`;
    btn.addEventListener('click', () => {
      if (winState[id]?.min) {
        restoreWindow(id);
      } else {
        const w = getWin(id);
        if (w && w.classList.contains('win-open')) {
          if (w.classList.contains('inactive')) {
            bringToFront(w);
          } else {
            minimizeWindow(id);
          }
        } else {
          openWindow(id);
        }
      }
    });
    strip.appendChild(btn);
  }

  function removeTaskbarButton(id) {
    document.querySelector(`.tb-taskwin[data-win="${id}"]`)?.remove();
  }

  function markTaskbarButton(id, active) {
    const btn = document.querySelector(`.tb-taskwin[data-win="${id}"]`);
    if (btn) btn.classList.toggle('active', active);
  }

  function deselectIcon(id) {
    document.querySelectorAll('.d-icon').forEach(ic => {
      if (ic.dataset.win === id) ic.classList.remove('selected');
    });
  }

  /* ── Drag ── */
  function makeDraggable(win) {
    const bar = win.querySelector('.os-titlebar');
    if (!bar) return;
    let dragging = false, ox = 0, oy = 0;

    bar.addEventListener('mousedown', e => {
      if (e.target.closest('.os-titlebar-btns')) return;
      if (win.classList.contains('maximized')) return;
      dragging = true;
      ox = e.clientX - win.offsetLeft;
      oy = e.clientY - win.offsetTop;
      bringToFront(win);
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      win.dataset.userMoved = '1';
      const desktopH = window.innerHeight - 36;
      const newLeft = Math.max(0, Math.min(e.clientX - ox, window.innerWidth - 100));
      const newTop  = Math.max(0, Math.min(e.clientY - oy, desktopH - 20));
      win.style.left = newLeft + 'px';
      win.style.top  = newTop  + 'px';
    });

    document.addEventListener('mouseup', () => { dragging = false; });
  }

  /* ── Resize ── */
  function makeResizable(win) {
    const handle = win.querySelector('.os-resize');
    if (!handle) return;
    let resizing = false, startX = 0, startY = 0, startW = 0, startH = 0;

    handle.addEventListener('mousedown', e => {
      resizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startW = win.offsetWidth;
      startH = win.offsetHeight;
      bringToFront(win);
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!resizing) return;
      win.dataset.userResized = '1';
      const maxH  = window.innerHeight - win.offsetTop - 36;
      const newW  = Math.max(280, startW + e.clientX - startX);
      const newH  = Math.max(180, Math.min(startH + e.clientY - startY, maxH));
      win.style.width  = newW + 'px';
      win.style.height = newH + 'px';
    });

    document.addEventListener('mouseup', () => { resizing = false; });
  }

  /* ── Wire up all windows ── */
  document.querySelectorAll('.os-window').forEach(win => {
    const id = win.id.replace('win-', '');
    makeDraggable(win);
    makeResizable(win);

    // Click to focus
    win.addEventListener('mousedown', () => bringToFront(win));

    // Titlebar buttons
    win.querySelector('[data-action="close"]')    ?.addEventListener('click', () => closeWindow(id));
    win.querySelector('[data-action="minimize"]') ?.addEventListener('click', () => minimizeWindow(id));
    // Double-click titlebar = maximize (disabled)
    win.querySelector('.os-titlebar')?.addEventListener('dblclick', e => {
      if (!e.target.closest('.os-titlebar-btns')) return;
    });
  });

  /* ── Desktop icons ── */
  document.querySelectorAll('.d-icon').forEach(icon => {
    let lastClick = 0;
    icon.addEventListener('click', e => {
      const now = Date.now();
      const id = icon.dataset.win;
      if (!id) return;

      if (now - lastClick < 400) {
        // Double-click → open (and reset projects to grid if already open)
        openWindow(id);
        if (id === 'projects' && typeof window._resetProjects === 'function') {
          window._resetProjects();
        }
        lastClick = 0;
      } else {
        // Single click → select
        document.querySelectorAll('.d-icon').forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
        lastClick = now;
      }
    });
  });

  // Deselect icons when clicking empty desktop
  document.getElementById('desktop')?.addEventListener('click', e => {
    if (!e.target.closest('.d-icon') && !e.target.closest('.os-window')) {
      document.querySelectorAll('.d-icon').forEach(i => i.classList.remove('selected'));
    }
  });

  /* ── Icon right-click context menu ── */
  const iconCtxMenu = document.getElementById('icon-ctx-menu');
  let   iconCtxTarget = null; // which icon was right-clicked

  document.querySelectorAll('.d-icon').forEach(icon => {
    icon.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation(); // don't bubble to the desktop ctx handler

      iconCtxTarget = icon;

      // Position menu near cursor, keep it on-screen
      const mx = Math.min(e.clientX, window.innerWidth  - 180);
      const my = Math.min(e.clientY, window.innerHeight - 100);
      iconCtxMenu.style.left = mx + 'px';
      iconCtxMenu.style.top  = my + 'px';
      iconCtxMenu.classList.add('open');
    });
  });

  document.getElementById('icon-ctx-open')?.addEventListener('click', () => {
    if (!iconCtxTarget) return;
    iconCtxMenu.classList.remove('open');
    openWindow(iconCtxTarget.dataset.win);
    iconCtxTarget = null;
  });

  // Close icon ctx menu on any click outside
  document.addEventListener('click', e => {
    if (!e.target.closest('#icon-ctx-menu')) {
      iconCtxMenu?.classList.remove('open');
    }
  });

  /* ── Sound toggle button ── */
  document.getElementById('tb-sound')?.addEventListener('click', () => {
    const on = (typeof Sounds !== 'undefined') ? Sounds.toggle() : false;
    const btn = document.getElementById('tb-sound');
    if (btn) btn.textContent = on ? '♪' : '🔇';
  });

  /* ── Desktop sticky note ── */
  (function () {
    const sticky = document.getElementById('desktop-sticky');
    if (!sticky) return;

    // Close button
    document.getElementById('sticky-close')?.addEventListener('click', e => {
      e.stopPropagation();
      sticky.style.display = 'none';
    });

    // Click body → open Demo Reel (not close button)
    sticky.addEventListener('click', e => {
      if (e.target.closest('.sticky-close-btn')) return;
      openWindow('reel');
    });
    sticky.addEventListener('dblclick', e => {
      if (e.target.closest('.sticky-close-btn')) return;
      openWindow('reel');
    });

    // Make it draggable around the desktop
    let dragging = false, ox = 0, oy = 0;
    sticky.addEventListener('mousedown', e => {
      dragging = true;
      ox = e.clientX - sticky.offsetLeft;
      oy = e.clientY - sticky.offsetTop;
      sticky.style.transform = 'rotate(0deg)';
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      const tbH    = 42; // taskbar height buffer
      const pad    = 10;
      const maxX   = window.innerWidth  - sticky.offsetWidth  - pad;
      const maxY   = window.innerHeight - sticky.offsetHeight - tbH;
      const newX   = Math.max(pad, Math.min(e.clientX - ox, maxX));
      const newY   = Math.max(pad, Math.min(e.clientY - oy, maxY));
      sticky.style.left  = newX + 'px';
      sticky.style.top   = newY + 'px';
      sticky.style.right = 'auto';
    });
    document.addEventListener('mouseup', () => {
      if (dragging) {
        dragging = false;
        sticky.style.transform = 'rotate(-1.8deg)';
      }
    });
  })();

  /* ── Guide sticky close / restore ── */
  (function() {
    const guide   = document.getElementById('guide-sticky');
    const restoreTab = document.getElementById('guide-restore-tab');
    if (!guide) return;

    document.getElementById('guide-close')?.addEventListener('click', e => {
      e.stopPropagation();
      guide.style.display = 'none';
      if (restoreTab) restoreTab.style.display = 'block';
    });

    restoreTab?.addEventListener('click', () => {
      guide.style.display = 'block';
      restoreTab.style.display = 'none';
    });
  })();

  /* ── Taskbar left buttons ── */
  document.getElementById('tb-home')?.addEventListener('click', () => {
    // Close all windows properly (clears state + dataset flags)
    document.querySelectorAll('.os-window').forEach(win => {
      const id = win.id.replace('win-', '');
      closeWindow(id);
    });
    document.querySelectorAll('.d-icon').forEach(i => i.classList.remove('selected'));
  });

  document.getElementById('tb-about')?.addEventListener('click', () => {
    openWindow('about');
  });

  /* ── Background presets ── */
  const BG_PRESETS = [
    { name: 'Teal',        color: '#008080' },
    { name: 'Midnight',    color: '#0d0d2b' },
    { name: 'Dark',        color: '#111111' },
    { name: 'Purple',      color: '#1a0030' },
    { name: 'Forest',      color: '#0d2010' },
    { name: 'Navy',        color: '#001040' },
  ];

  // Build display properties window presets
  const presetGrid = document.querySelector('.bg-presets');
  if (presetGrid) {
    BG_PRESETS.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'bg-preset-btn';
      btn.style.background = p.color;
      btn.textContent = p.name;
      btn.addEventListener('click', () => {
        document.getElementById('desktop').style.background = p.color;
        document.documentElement.style.setProperty('--desktop-bg', p.color);
        // Persist to localStorage
        localStorage.setItem('bg', p.color);
      });
      presetGrid.appendChild(btn);
    });
  }

  // Restore saved background
  const savedBg = localStorage.getItem('bg');
  if (savedBg) {
    document.getElementById('desktop').style.background = savedBg;
    document.documentElement.style.setProperty('--desktop-bg', savedBg);
  }

  /* ── Context menu (right-click desktop) ── */
  const ctxMenu = document.getElementById('ctx-menu');

  document.getElementById('desktop')?.addEventListener('contextmenu', e => {
    if (e.target.closest('.os-window') || e.target.closest('#taskbar') || e.target.closest('.d-icon')) return;
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth  - 200);
    const y = Math.min(e.clientY, window.innerHeight - 200);
    ctxMenu.style.left = x + 'px';
    ctxMenu.style.top  = y + 'px';
    ctxMenu.classList.add('open');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#ctx-menu')) ctxMenu.classList.remove('open');
  });

  document.getElementById('ctx-display-props')?.addEventListener('click', () => {
    ctxMenu.classList.remove('open');
    openWindow('display');
  });

  /* ── Search ── */
  const searchInput  = document.getElementById('search-input');
  const searchResult = document.getElementById('search-results');

  function doSearch(q) {
    if (!q.trim()) { searchResult.classList.remove('open'); return; }
    const lq = q.toLowerCase();
    const matches = [];

    // Search projects
    if (typeof PROJECTS !== 'undefined') {
      PROJECTS.forEach((p, i) => {
        const contentText = (p.content || [])
          .filter(c => c.type === 'text' || c.text)
          .map(c => c.value || c.text || '')
          .join(' ');
        const haystack = [
          p.title, p.category, p.blurb, p.description,
          contentText, ...(p.tags || [])
        ].join(' ').toLowerCase();
        if (haystack.includes(lq)) {
          matches.push({ type: 'PROJECT', label: p.title, idx: i, win: 'projects' });
        }
      });
    }

    // Search blogs
    if (typeof BLOGS !== 'undefined') {
      BLOGS.forEach((b, i) => {
        const haystack = [b.title, b.excerpt, ...(b.tags || [])].join(' ').toLowerCase();
        if (haystack.includes(lq)) {
          matches.push({ type: 'BLOG', label: b.title, idx: i, win: 'blogs' });
        }
      });
    }

    searchResult.innerHTML = '';
    if (!matches.length) {
      searchResult.innerHTML = '<div class="search-no-results">No results found.</div>';
    } else {
      matches.forEach(m => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `<span class="search-result-type">[${m.type}]</span>
                         <span class="search-result-label">${m.label}</span>`;
        div.addEventListener('click', () => {
          openWindow(m.win);
          searchResult.classList.remove('open');
          searchInput.value = '';
          /* Navigate directly into project / blog detail */
          if (m.type === 'PROJECT' && m.idx !== undefined) {
            setTimeout(() => {
              if (typeof window._openProjectDetail === 'function') {
                window._openProjectDetail(m.idx);
              }
            }, 80);
          }
        });
        searchResult.appendChild(div);
      });
    }
    searchResult.classList.add('open');
  }

  searchInput?.addEventListener('input',  e => doSearch(e.target.value));
  searchInput?.addEventListener('keydown', e => { if (e.key === 'Escape') { searchResult.classList.remove('open'); searchInput.value = ''; } });
  document.addEventListener('click', e => {
    if (!e.target.closest('.tb-search-wrap') && !e.target.closest('#search-results')) {
      searchResult.classList.remove('open');
    }
  });

  /* ── Refit windows on viewport resize ── */
  function defaultWinRect() {
    const iconColW = 108, padR = 10, padT = 6, tbH = 36;
    return {
      left:   iconColW,
      top:    padT,
      width:  window.innerWidth  - iconColW - padR,
      height: window.innerHeight - tbH - padT * 2
    };
  }

  function refitOpenWindows() {
    document.querySelectorAll('.os-window.win-open').forEach(win => {
      if (win.dataset.userMoved || win.dataset.userResized) return;
      if (win.classList.contains('maximized')) return;
      const r = defaultWinRect();
      win.style.left   = r.left   + 'px';
      win.style.top    = r.top    + 'px';
      win.style.width  = r.width  + 'px';
      win.style.height = r.height + 'px';
    });
  }

  /* ── Intro overlay visibility ── */
  function syncIntroOverlay() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;
    const anyOpen = Object.values(winState).some(s => s !== null);
    overlay.style.display = anyOpen ? 'none' : 'flex';
  }

  function syncShowcaseVideo(id, opening) {
    if (id !== 'about') return;
    const v = document.querySelector('.about-showcase-video');
    if (!v) return;
    if (opening) v.play().catch(() => {});
    else v.pause();
  }

  const _origOpen  = openWindow;
  const _origClose = closeWindow;
  openWindow  = function(id) { _origOpen(id);  syncShowcaseVideo(id, true);  syncIntroOverlay(); if (window._bgEnsurePlaying) window._bgEnsurePlaying(); };
  closeWindow = function(id) { _origClose(id); syncShowcaseVideo(id, false); syncIntroOverlay(); if (window._bgEnsurePlaying) window._bgEnsurePlaying(); };

  /* Expose for hash router */
  window._openWindow  = openWindow;
  window._closeWindow = closeWindow;

  // window.resize fires on true browser resize
  window.addEventListener('resize', refitOpenWindows);

  // ResizeObserver catches preview panel / iframe resizes that window.resize misses
  const _ro = new ResizeObserver(refitOpenWindows);
  _ro.observe(document.documentElement);

  /* ── Background video crossfade loop ── */
  (function () {
    const FADE_S = 1.5;  // seconds — must match CSS transition duration
    const LEAD_S = 2.0;  // seconds before end to start the crossfade

    const vidA = document.getElementById('bg-video-a');
    const vidB = document.getElementById('bg-video-b');
    if (!vidA || !vidB) return;

    let active           = vidA;
    let inactive         = vidB;
    let fading           = false;
    let intentionalPause = false;
    let lastTime         = -1;
    let stuckCount       = 0;

    function ensurePlaying() {
      if (intentionalPause) return;
      if (active.ended || (active.duration > 0 && active.currentTime >= active.duration - 0.1)) {
        if (!fading) crossfade();
        return;
      }
      if (active.paused) {
        active.play().catch(() => {});
        return;
      }
      /* Stall detection: video thinks it's playing but currentTime isn't advancing */
      if (active.currentTime === lastTime && active.currentTime > 0) {
        stuckCount++;
        if (stuckCount >= 2) {
          stuckCount = 0;
          active.currentTime += 0.001; // micro-seek to unblock decoder
          active.play().catch(() => {});
        }
      } else {
        stuckCount = 0;
      }
      lastTime = active.currentTime;
    }

    function crossfade() {
      if (fading) return;
      fading = true;
      intentionalPause = true; // block pause guard for the entire fade
      lastTime = -1; stuckCount = 0; // reset stall tracker after swap

      inactive.currentTime = 0;
      inactive.play().catch(() => {});
      inactive.style.opacity = '0.6';
      active.style.opacity   = '0';

      setTimeout(() => {
        active.pause();
        active.currentTime = 0;
        [active, inactive] = [inactive, active];
        fading = false;
        setTimeout(() => { intentionalPause = false; }, 200);
      }, (FADE_S + 0.15) * 1000);
    }

    function checkNearEnd() {
      if (fading || !active.duration) return;
      if (active.duration - active.currentTime <= LEAD_S) crossfade();
    }

    // If a video ends without timeupdate triggering crossfade (e.g. tab backgrounded),
    // force a crossfade immediately on the ended event.
    [vidA, vidB].forEach(v => {
      v.addEventListener('ended', () => {
        if (v === active && !fading) crossfade();
      });
    });

    // Heartbeat: catch any stall, ended state, or browser throttle
    setInterval(ensurePlaying, 800);

    // Re-play immediately when the tab becomes visible again
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) ensurePlaying();
    });
    window.addEventListener('focus', ensurePlaying);

    // pause-event guard as an extra layer
    [vidA, vidB].forEach(v => {
      v.addEventListener('pause', () => { if (!intentionalPause) v.play().catch(() => {}); });
    });

    vidA.addEventListener('timeupdate', checkNearEnd);
    vidB.addEventListener('timeupdate', checkNearEnd);

    window._bgEnsurePlaying = ensurePlaying;
  })();

  /* ── Draggable desktop icons ── */
  (function () {
    const TASKBAR_H = 36;
    const container = document.getElementById('desktop-icons');
    if (!container) return;

    /* Measure each icon's current position relative to the desktop,
       then switch the container to a full-area overlay so icons can
       be positioned freely within it. */
    const desktop  = document.getElementById('desktop');
    const deskRect = desktop.getBoundingClientRect();
    const icons    = Array.from(container.querySelectorAll('.d-icon'));

    const initPositions = icons.map(icon => {
      const r = icon.getBoundingClientRect();
      return { left: r.left - deskRect.left, top: r.top - deskRect.top };
    });

    /* Switch container layout */
    container.style.display  = 'block';
    container.style.position = 'absolute';
    container.style.inset    = '0';
    container.style.width    = '100%';
    container.style.height   = `calc(100% - ${TASKBAR_H}px)`;
    container.style.pointerEvents = 'none';

    icons.forEach((icon, i) => {
      icon.style.position      = 'absolute';
      icon.style.left          = initPositions[i].left + 'px';
      icon.style.top           = initPositions[i].top  + 'px';
      icon.style.pointerEvents = 'auto';

      let dragging = false, hasMoved = false;
      let ox = 0, oy = 0, startX = 0, startY = 0;

      icon.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        dragging = true;
        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        ox = e.clientX - icon.offsetLeft;
        oy = e.clientY - icon.offsetTop;
        e.stopPropagation();
      });

      document.addEventListener('mousemove', e => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!hasMoved && Math.hypot(dx, dy) < 5) return;
        hasMoved = true;
        const maxLeft = container.offsetWidth  - icon.offsetWidth;
        const maxTop  = container.offsetHeight - icon.offsetHeight;
        icon.style.left = Math.max(0, Math.min(e.clientX - ox, maxLeft)) + 'px';
        icon.style.top  = Math.max(0, Math.min(e.clientY - oy, maxTop))  + 'px';
      });

      document.addEventListener('mouseup', () => { dragging = false; });
    });
  })();

})();
