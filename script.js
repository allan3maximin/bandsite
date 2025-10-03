
document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニューのチェックボックス要素を取得
  const navToggle = document.getElementById('nav-toggle');
  // ナビゲーション内のすべてのリンク要素を取得
  const navLinks = document.querySelectorAll('.site-header nav a');

  // 各リンクにクリックイベントリスナーを設定
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          // スムーズスクロールが完了した後、チェックボックスの状態を解除（メニューを閉じる）
          // CSSのtransitionを考慮して、少し遅延させて閉じる
          setTimeout(() => {
              navToggle.checked = false;
          }, 100); // 0.5秒後に閉じる
      });
  });
});