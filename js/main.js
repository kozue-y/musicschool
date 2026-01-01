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
$(window).on("scroll", function() {
    const scrollPos = $(this).scrollTop();
    const winHeight = $(window).height();
    const docHeight = $(document).height();
    const footerHeight = $(".c-footer").outerHeight();

    const $pageTop = $("#js-page-top");
    const $contactBtn = $("#js-contact-btn");

    // FV超えたらの指示
    if (scrollPos > winHeight) {
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
        $contactBtn.css("transform", `translateY(-${overlap}px)`);
    } else {
        $pageTop.css("transform", `translateY(0)`);
        $contactBtn.css("transform", `translateY(0)`);
    }

});