
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

/* 埋め込み iframe のフォールバック処理 (TimeTree など) */
(() => {
  const iframe = document.getElementById('live-iframe');
  const fallback = document.getElementById('embed-fallback');
  const embedWrap = document.getElementById('live-embed');
  if (!iframe || !fallback || !embedWrap) return;

  // タイムアウト: 3.5秒でフォールバックに切り替える
  const TIMEOUT_MS = 3500;
  let handled = false;

  const showFallback = () => {
    if (handled) return; handled = true;
    iframe.style.display = 'none';
    fallback.style.display = 'block';
    fallback.setAttribute('aria-hidden', 'false');
  };

  // load イベントで成功とみなす
  iframe.addEventListener('load', () => {
    // 一部のサイトは load が発火しても空白になる場合がある。
    // ここでは短い遅延で外観が入るか確認し、入らない場合はフォールバックへ。
    setTimeout(() => {
      if (iframe.clientHeight === 0 || iframe.offsetHeight === 0) showFallback();
      else handled = true;
    }, 300);
  });

  // 一部ブラウザでは error が発生しないこともあるが、あればフォールバック
  iframe.addEventListener('error', () => showFallback());

  // タイムアウトで強制フォールバック
  setTimeout(() => { if (!handled) showFallback(); }, TIMEOUT_MS);
})();