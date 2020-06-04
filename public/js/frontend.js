$(".nav-item").on("click", function () {
    $(".navbar").find(".nav-item").each(function () {
        $(this).removeClass("active");
    });
    $(this).addClass("active");
})

$("#filterInput").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".avHeroContHeight").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

$("input:checkbox").on("click", function() {
    $(".avHeroContHeight").hide();
    $("input:checkbox:checked").each(function() {
        $("." + $(this).val()).show();
    });
    let check = $("input:checkbox:checked");
    if (check.length === 0) {
        $(".avHeroContHeight").show();
    }
});

let url;
let heroId;
let whichHeroe = false;


$(".selectHeroe > div").on("click", function() {
    $(".selectHeroe").find(".selectedElement").each(function () {
        $(this).removeClass("selectedElement");
    });
    $(this).addClass("selectedElement");

    let checkHeroeCont = $(this).hasClass("selectMyHeroe");
    
    if (checkHeroeCont) whichHeroe = true;
    else whichHeroe = false;

    heroId = $(this).attr("id");
    
    url = $(this).find(".picUrl").attr("src"); //collect
    $(".targetUrl").attr("src", url);

    let lvl = $(this).find(".lvl").text();
    $(".targetLvl").val(lvl);

    $(".ascSelectWidth > div").find(".selectedElement").each(function () {
        $(this).removeClass("selectedElement");
    });

    let asc = $(this).find(".ascUrl").attr("src");
    $(".ascSelectWidth").find("img[src='" + asc + "']").parent().addClass("selectedElement");

});

$(".ascSelectWidth > div > div").on("click", function() {
    $(".ascSelectWidth > div").find(".selectedElement").each(function () {
        $(this).removeClass("selectedElement");
    });
    $(this).addClass("selectedElement");
});

$(".collectInfo").on("click", function() {
    let lvl = $(".targetLvl").val();

    let src = $(".ascSelectWidth").find(".selectedElement > img").attr("src");
    

    if (url === undefined || url === null) {
        alert("No hero is selected!");
    }
    else {
        $.post( "/saveHero", {url: url, lvl: lvl, src: src, divider: whichHeroe, actualId: heroId} );
        location.reload();
        whichHeroe = false;
    }
    
});