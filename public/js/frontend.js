$(".nav-item").click(function() {
    $(".navbar").find(".nav-item").each(function() {
        $(this).removeClass("active");
    });
    $(this).addClass("active");
})


/* $.post("/test", function( data ) {
    alert( "Data Loaded: " + data );
}); */

var posting = $.post( "/test", {name: "Attila"} );