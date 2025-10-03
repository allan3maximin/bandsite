document.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if(window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  document.querySelectorAll(".section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      sec.classList.add("active");
    }
  });
});

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