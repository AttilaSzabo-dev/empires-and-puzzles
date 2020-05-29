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

/* $.post("/test", function( data ) {
    alert( "Data Loaded: " + data );
}); */

/* var posting = $.post( "/test", {name: "Attila"} ); */