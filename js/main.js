// ハンバガーメニュー開閉
$("#hamburger-block").click(function() {
    $("#js-drawer").toggleClass("active");
    $(".c-hamburger").toggleClass("active");
});
// ドロワークリック時にメニューに戻る
$(".c-drawer-menu__list a").click(function() {
    $("#js-drawer").removeClass("active");
    $(".c-hamburger").removeClass("active");
});

// スワイパーを初期化
const swiper = new Swiper(".js-voices-swiper", {
    loop: true,
    speed: 600,
    navigation: {
        nextEl: ".p-voices__next",
        prevEl: ".p-voices__prev",
    },
    // SP1枚、PC3枚
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 35,
            centeredSlides: false,
        },
    },

});

// アコーディオンメニュー
$(function() {
    $('.p-accordion__answer').hide();
    $('.p-accordion__item').on('click', function() {
      $(this).find('.p-accordion__answer').slideToggle(400);
      $(this).toggleClass('is-open');
    });
  });

// // お問合せ・トップへ戻るボタン
// $(function () {
//   let scrollTimer = null;
//   // お問合せボタンが存在しない時のクラス追加
//   if ($("#js-contact-btn").length === 0) {
//     $("body").addClass("no-contact-btn");
//   }

//   // TOPに戻るスムース
//   $("#js-page-top").on("click", function (e) {
//     e.preventDefault();
//     $("html, body").animate({ scrollTop: 0 }, 500, "swing");
//     return false;
//   });

//   function getWinHeight() {
//     // iPhone対策 visualViewport の高さ
//     return window.visualViewport ? window.visualViewport.height : $(window).height();
//   }

//   function updateFloatBtns() {
//     const scrollPos = $(window).scrollTop();
//     const winHeight = getWinHeight();
//     const docHeight = $(document).height();
//     const footerHeight = $(".c-footer").outerHeight() || 0;

//     const $pageTop = $("#js-page-top");
//     const $contactBtn = $("#js-contact-btn");
//     const hasContactBtn = $contactBtn.length > 0;

//     // 100px超えたら表示
//     if (scrollPos > 100) {
//       $pageTop.addClass("is-show");
//       if (hasContactBtn) $contactBtn.addClass("is-show");
//     } else {
//       $pageTop.removeClass("is-show");
//       if (hasContactBtn) $contactBtn.removeClass("is-show");
//     }

//     // Footerで止める
//     const scrollBottom = scrollPos + winHeight;
//     const footerTop = docHeight - footerHeight;

//     if (scrollBottom >= footerTop) {
//       const overlap = scrollBottom - footerTop;
//       const adjustedOverlap = Math.ceil(overlap);

//       // 両方とも同じ値で移動（明示的に設定）
//       $pageTop.css({
//         "transform": `translateY(-${adjustedOverlap}px)`,
//         "transition": "transform 0.1s ease-out"
//       });

//       if (hasContactBtn) {
//         $contactBtn.css({
//           "transform": `translateY(-${adjustedOverlap}px)`,
//           "transition": "transform 0.1s ease-out"
//         });
//       }
//     } else {
//       // 明示的にtransformをリセット
//       $pageTop.css({
//         "transform": "translateY(0)",
//         "transition": "transform 0.1s ease-out"
//       });
      
//       if (hasContactBtn) {
//         $contactBtn.css({
//           "transform": "translateY(0)",
//           "transition": "transform 0.1s ease-out"
//         });
//       }
//     }
//   }
  
//   // scroll で更新
//   $(window).on("scroll", function() {
//     clearTimeout(scrollTimer);
//     scrollTimer = setTimeout(updateFloatBtns, 10);
//   });

//   // iPhone下バー出る・消える用（即座に反映）
//   if (window.visualViewport) {
//     window.visualViewport.addEventListener("resize", updateFloatBtns);
//     window.visualViewport.addEventListener("scroll", updateFloatBtns);
//   }

//   // 初期表示で反映
//   updateFloatBtns();
// });

$(function () {

  // お問合せボタンが無いページの場合、bodyにクラスを付与
  if ($("#js-contact-btn").length === 0) {
    $("body").addClass("no-contact-btn");
  }

  // TOPへ戻るボタンのスムーススクロール
  $("#js-page-top").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 500, "swing");
  });

  // 画面高さ取得（iPhoneの下バー対策）
  function getWinHeight() {
    return window.visualViewport
      ? window.visualViewport.height
      : $(window).height();
  }

  // ボタンの表示制御とフッター手前停止処理
  function updateFloatBtns() {

    const scrollPos = $(window).scrollTop();   // 現在のスクロール位置
    const winHeight = getWinHeight();          // 表示領域の高さ
    const docHeight = $(document).height();    // ページ全体の高さ
    const footerHeight = $(".c-footer").outerHeight() || 0;

    const $pageTop = $("#js-page-top");
    const $contactBtn = $("#js-contact-btn");
    const hasContactBtn = $contactBtn.length > 0;

    // 100px以上スクロールで表示
    const show = scrollPos > 100;
    $pageTop.toggleClass("is-show", show);
    if (hasContactBtn) $contactBtn.toggleClass("is-show", show);

    // フッター手前で止める処理
    const scrollBottom = scrollPos + winHeight;
    const footerTop = docHeight - footerHeight;
    const overlap = Math.max(0, scrollBottom - footerTop);

    $pageTop.css("transform", `translateY(-${overlap}px)`);
    if (hasContactBtn) {
      $contactBtn.css("transform", `translateY(-${overlap}px)`);
    }
  }

  // 描画タイミングに合わせて処理を実行（滑らか制御）
  let rafId = 0;

  function requestUpdate() {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      rafId = 0;
      updateFloatBtns();
    });
  }

  // スクロール・リサイズ時に更新
  $(window).on("scroll resize", requestUpdate);

  // iPhone下バーの表示・非表示にも対応
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", requestUpdate);
    window.visualViewport.addEventListener("scroll", requestUpdate);
  }

  // 初期表示時にも実行
  updateFloatBtns();
});


// スクロールバー
$(function() {
    const $wrap = $(".p-plan-table__scroll-area");
    const $track = $(".p-plan-table__scrollbar-track");
    const $thumb = $(".p-plan-table__scrollbar-thumb");

    if (!$wrap.length || !$track.length || !$thumb.length) return;

    function updateThumb() {
        const cw = $wrap[0].clientWidth;
        const sw = $wrap[0].scrollWidth;
        const trackW = $track.width();
        const thumbW = $thumb.outerWidth();
        const maxThumbX = Math.max(0, trackW - thumbW);
        const maxScroll = sw - cw;
        const x = (maxScroll <= 0 || maxThumbX === 0)
        ? 0 
        : ($wrap.scrollLeft() / maxScroll) * maxThumbX;

        $thumb.css("left", Math.max(0, Math.min(maxThumbX, x)) + "px");
    }
    $wrap.on("scroll", updateThumb);
    $(window).on("resize", updateThumb);

    let dragging = false;
    let startX = 0;
    let startLeft =0;

    $thumb.on("mousedown touchstart", function(e) {
        dragging = true;
        const pageX = e.pageX ?? e.originalEvent.touches?.[0]?.pageX ?? 0;
        startX = pageX;
        startLeft = parseFloat($thumb.css("left")) || 0;

        e.preventDefault();
    });

    $(document).on("mousemove touchmove", function(e) {
        if(!dragging) return;
        const pageX = e.pageX ?? e.originalEvent.touches?.[0]?.pageX ?? 0;
        const trackW = $track.width();
        const thumbW = $thumb.outerWidth();
        const maxThumbX = Math.max(0, trackW - thumbW);

        const dx = pageX - startX;
        const newLeft = Math.max(0, Math.min(maxThumbX, startLeft + dx));
        $thumb.css("left", newLeft + "px");

        const maxScroll = $wrap[0].scrollWidth - $wrap[0].clientWidth;
        if (maxThumbX > 0 && maxScroll > 0) {
            $wrap.scrollLeft((newLeft / maxThumbX) * maxScroll);
        }
    });

    $(document).on("mouseup touchend touchcancel", function() {
        dragging = false;
    });

    updateThumb();
});