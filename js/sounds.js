/* ============================================================
   SOUNDS.JS — Web Audio API synthesized sound effects
   All sounds are generated in-browser, no audio files needed.
   ============================================================ */

const Sounds = (function () {
  let _ctx    = null;
  let _enabled = true;

  /* Get or create AudioContext (requires prior user gesture) */
  function ac() {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  }

  /* Play a single synthesised tone */
  function tone(freq, type, startOffset, dur, vol) {
    try {
      const ctx  = ac();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startOffset);
      gain.gain.setValueAtTime(0.001, ctx.currentTime + startOffset);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + startOffset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startOffset + dur);
      osc.start(ctx.currentTime + startOffset);
      osc.stop(ctx.currentTime + startOffset + dur + 0.05);
    } catch (e) { /* silently ignore if AudioContext unavailable */ }
  }

  return {
    get enabled() { return _enabled; },

    toggle() {
      _enabled = !_enabled;
      return _enabled;
    },

    /* Ascending chord — plays when desktop appears after boot */
    startup() {
      if (!_enabled) return;
      tone(523.25, 'sine', 0.00, 0.50, 0.16); // C5
      tone(659.25, 'sine', 0.18, 0.50, 0.16); // E5
      tone(783.99, 'sine', 0.34, 0.50, 0.16); // G5
      tone(1046.5,  'sine', 0.52, 0.75, 0.20); // C6
      tone(783.99,  'sine', 0.52, 0.75, 0.10); // G5 (harmony)
    },

    /* Quick ascending 2-tone blip */
    open() {
      if (!_enabled) return;
      tone(880,  'sine', 0.00, 0.10, 0.12);
      tone(1320, 'sine', 0.07, 0.09, 0.10);
    },

    /* Quick descending 2-tone blip */
    close() {
      if (!_enabled) return;
      tone(660, 'sine', 0.00, 0.09, 0.10);
      tone(440, 'sine', 0.06, 0.11, 0.08);
    },

    /* Soft single tone for minimize */
    minimize() {
      if (!_enabled) return;
      tone(520, 'sine', 0, 0.13, 0.10);
    },

    /* Buzzy double-beep for errors */
    error() {
      if (!_enabled) return;
      tone(220, 'square', 0.00, 0.10, 0.18);
      tone(185, 'square', 0.13, 0.10, 0.18);
    },

    /* Tiny tick for selections */
    select() {
      if (!_enabled) return;
      tone(1100, 'sine', 0, 0.035, 0.06);
    },
  };
})();
