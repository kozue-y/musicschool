// ハンバガーメニュー開閉
$("#hamburger-block").click(function() {
    $(".c-drawer-menu__list").toggle(300);
    $(".c-hamburger").toggleClass("active");
});
// ドロワークリック時にメニューに戻る
$(".c-drawer-menu__list a").click(function() {
    $(".c-drawer-menu__list").hide(300);
    $(".c-hamburger").removeClass("active");
});
