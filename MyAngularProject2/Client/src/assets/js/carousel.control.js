export var carouselControl = (function(){

return{
onLoad: function(){
      //   $("#content-scroll-wrapper").niceScroll("#content-scroll",{cursorcolor:"#596c8b",cursoropacitymax:0.7,boxzoom:true,cursorborder:"1px solid #596c8b",touchbehavior:true}); 
      //  $('[data-toggle="tooltip"]').tooltip()
        $(document).ready(function () {
            $('.owl-carousel-top').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                mouseDrag: false,
                navText: ['<i class="fa  fa-angle-left"></i>', '<i class="fa   fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    768: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 3,
                        nav: true,
                        loop: false
                    },
                    //  1000: {
                    //     items: 4,
                    //     nav: true,
                    //     loop: false
                    // },
                    1360: {
                        items: 4,
                        nav: true,
                        loop: false
                    },
                    1600: {
                        items: 5,
                        nav: true,
                        loop: false
                    }
                }
            }),

            $('.carousel-video-thumb').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                mouseDrag: false,
                navText: ['<i class="fa  fa-angle-left"></i>', '<i class="fa   fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    768: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 2,
                        nav: true,
                        loop: false
                    },
                    //  1000: {
                    //     items: 4,
                    //     nav: true,
                    //     loop: false
                    // },
                    1360: {
                        items: 3,
                        nav: true,
                        loop: false
                    },
                    1600: {
                        items: 4,
                        nav: true,
                        loop: false
                    }
                }
            }),

            $('.owl-carousel-app').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                mouseDrag: false,
                navText: ['<i class="fa  fa-angle-left"></i>', '<i class="fa   fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    768: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 5,
                        nav: true,
                        loop: false
                    },
                    //  1000: {
                    //     items: 4,
                    //     nav: true,
                    //     loop: false
                    // },
                    1360: {
                        items: 7,
                        nav: true,
                        loop: false
                    },
                    1600: {
                        items: 9,
                        nav: true,
                        loop: false
                    }
                }
            })
        });

    }
}
    
})();