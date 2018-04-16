export var tfocControl = (function () {
    return {
        tfocControl: function () {

                tfocControl.onLoad()

        },
        onLoad: function () {
            $('.map-collapsed').click(function () {
                $(".map-graph-container").css({ "top": "0" });
                $(".map-container").css({ "z-index":"99", "top": "0",  "padding": "0", "height": "100%"});
                $('.map-expanded').fadeIn();
                $('.map-top-strip').fadeOut();
                $('.map-wrapper-tfoc').css({ top: "0", bottom: "0" });
                $('.map-top-strip').fadeOut();
                $('.map-bottom-strip').fadeOut();
                $(this).fadeOut();
            })
            $('.map-expanded').click(function () {
                $(".map-graph-container").css({ "top": "145px" });
                $(".map-container").css({ "top": "0",  "padding": "51px 0 29px 0", "z-index": "1", "height": "50%" });
                $('.map-collapsed').fadeIn();
                $('.map-top-strip').fadeIn();
                $('.map-wrapper-tfoc').css({ "top": "51px", bottom: "29px" });
                $('.map-bottom-strip').fadeIn();
                $(this).fadeOut();
            })
            $('.graph-collapsed').click(function () {
                $(".map-graph-container").css({ "top": "0" });
                $(".graph-container").css({"height": "100%", "z-index": "9"})
                $('.graph-expanded').fadeIn();
                $(this).fadeOut();
            })
            $('.graph-expanded').click(function () {
                $(".map-graph-container").css({ "top": "145px" });
                $(".graph-container").css({ "height": "50%", "z-index": "1" })
                $('.graph-collapsed').fadeIn();
                $(this).fadeOut();
            })
        }
    }
})();
