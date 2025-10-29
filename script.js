
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

window.addEventListener("load", () => {
  // ロード完了後、まずは2.5秒ロゴを表示
  setTimeout(() => {
    document.body.classList.add("is-loaded");
    // さらに0.9秒後に完全にready（黒幕・ロゴを消す）
    setTimeout(() => {
      document.body.classList.add("is-ready");
    }, 900);
  }, 2500);
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