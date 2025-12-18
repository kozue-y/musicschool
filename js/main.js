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
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // SP1枚、PC3枚
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 35,
            centeredSlides: false,
        },
    },

});