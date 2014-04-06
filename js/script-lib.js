
/*$(document).on("pageinit",function(){
  alert("pageinit event fired!")
});*/

$(document).ready(function() {

  //javascript menu library function
  //  enable_menu();

  //javascript owl carousel function
 

}); 


//app javascript
var App = new Object();

App = {
    splashScreenDuration: 3000,
    init: function() {

    $.mobile.loading('show', {theme:"e", text:"Please wait...", textonly:true, textVisible: true});
        
    setTimeout(function() {
      $("#splash").fadeOut(1000);
      $.mobile.loading('hide');
    }, App.splashScreenDuration);
    
    enable_menu();
    
    var owl = $("#slider-info");

    owl.owlCarousel({

      items : 5, //10 items above 1000px browser width
      itemsDesktop : [1000,4], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // 3 items betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0;
      itemsMobile : [400,1] // itemsMobile disabled - inherit from itemsTablet option
      
    });

    // Custom Navigation Events
    $(".next").click(function(){
      owl.trigger('owl.next');
    });
  
    $(".prev").click(function(){
      owl.trigger('owl.prev');
    });
  }
}


$(App.init);

function enable_menu()
{
      $('nav#menu').mmenu({
        slidingSubmenus: true
        });
}