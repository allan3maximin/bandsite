
// Fix mobile viewport unit issues (iOS Safari / app webviews) by setting --vh
// This provides a reliable fallback to use in CSS when dvh isn't supported.
(function setVhVariable(){
  function setVh(){
    try{
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }catch(e){/* ignore */}
  }
  setVh();
  window.addEventListener('resize', setVh, { passive: true });
  window.addEventListener('orientationchange', setVh);
})();

document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニューのチェックボックス要素を取得
  const navToggle = document.getElementById('nav-toggle');
  // ナビゲーション内のすべてのリンク要素を取得
  const navLinks = document.querySelectorAll('.site-header nav a');

  // 各リンクにクリックイベントリスナーを設定
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          // リンククリック後にモバイルメニューを閉じる（短い遅延で自然な動き）
          setTimeout(() => { navToggle.checked = false; }, 120);
      });
  });
});

/* ページ読み込み時の暗転フェードを制御 */
// window.load を待って body に .is-loaded を付与し、トランジション完了後に .is-ready を付けて overlay を無効化
window.addEventListener('load', () => {
  try {
    const body = document.body;
    // すぐにフェードを許可
    requestAnimationFrame(() => body.classList.add('is-loaded'));

    // トランジション完了後に完全に無効化（900ms と CSS に合わせる）
    const TRANSITION_MS = 900;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      body.classList.add('is-ready');
      return;
    }

    // 安全のためタイムアウトでクラスを追加
    setTimeout(() => {
      body.classList.add('is-ready');
    }, TRANSITION_MS + 60);
  } catch (e) {
    // 失敗しても致命的ではない
    console.warn('load overlay handling failed', e);
  }
});

// Header shrink on scroll
(function(){
  const body = document.body;
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  const THRESHOLD = 48; // px
  let ticking = false;

  function onScroll(){
    lastScroll = window.scrollY || window.pageYOffset;
    if (!ticking){
      window.requestAnimationFrame(() => {
        if (lastScroll > THRESHOLD) body.classList.add('header--small');
        else body.classList.remove('header--small');
        ticking = false;
      });
      ticking = true;
    }
  }

  // respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) window.addEventListener('scroll', onScroll, { passive: true });
})();

// (programmatic page-like snapping removed per user request)