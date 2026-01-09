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
    $('.p-accordion__question').on('click', function() {
      $(this).next('.p-accordion__answer').slideToggle(300);
      $(this).parent('.p-accordion__item').toggleClass('is-open');
    });
  });

// お問合せ・トップへ戻るボタン
// TOPに戻るスムーススクロール
$(function() {
    $('#js-page-top').on('click', function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0}, 500, "swing");
        return false;
    });
});

$(window).on("scroll", function() {
    const scrollPos = $(this).scrollTop();
    const winHeight = $(window).height();
    const docHeight = $(document).height();
    const fvHeight = $(".p-fv").outerHeight() || 0;
    const footerHeight = $(".c-footer").outerHeight() || 0;

    const $pageTop = $("#js-page-top");
    const $contactBtn = $("#js-contact-btn");

    // FV超えたらの指示
    if (scrollPos > fvHeight) {
        $pageTop.addClass("is-show");
        $contactBtn.addClass("is-show");
    } else {
        $pageTop.removeClass("is-show");
        $contactBtn.removeClass("is-show");
    }
    // Footerで止める指示
    const scrollBottom = scrollPos + winHeight;
    const footerTop = docHeight - footerHeight;

    if(scrollBottom > footerTop) {
        const overlap = scrollBottom - footerTop;
        // 上にずらす
        $pageTop.css("transform", `translateY(-${overlap}px)`);
        $contactBtn.css("transform", `translateY(-${overlap -1}px)`);
    } else {
        $pageTop.css("transform", `translateY(0)`);
        $contactBtn.css("transform", `translateY(0)`);
    }

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
        // //スクロールが必要ない状態の時に表示・非表示
        // if (sw <= cw) {
        //     $track.closest(".p-plan-table__scrollbar").hide();
        //     return;
        // }
        // $track.closest(".p-plan-table__scrollbar").show();

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