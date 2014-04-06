/**
 * storage network_id; token
 *      
//       console.log(localStorage.getItem('network_mid'));
//       console.log(localStorage.getItem('token'));
//       console.log(localStorage.getItem('network_id'));
 **/

var AppRouter = Backbone.Router.extend({
    routes:{
        "":"home",
        "login":"loginForm",
        "logout":"routerDoLogout",
        "profile_detail":"profileDetail", //link:function
        "sponsorisasi":"sponsorisasiFunc",
       "view/:view_id":"viewApi", //link:function
        "view_api/:view_id":"viewApiClient", //link:function
    },
    
    initialize:function(){
        this.menuBeforeLogedInView = new MenuBeforeLogedIn();
    },
    home:function(){
        if(!this.homeAgendaView && !this.homeNewsView)
        {
            this.homeAgendaView=new HomeAgenda();
            this.homeNewsView=new HomeNews();
          //  console.log(this.homeAgendaView.render());
           
        }
        $("#backbone_content").html(this.homeAgendaView.render().el);
        $("#backbone_content").append(this.homeNewsView.render().el);


    },
    profileDetail:function(){
        var profile_api = new ProfileApi();
        profile_api.fetch({success: function(){
                $("#backbone_content").html(new ProfileApiView({model:profile_api}).el);
        },
        error:function(){
                $("#backbone_content").html('error');
        }
        });
    },
    sponsorisasiFunc:function(page){
      var sponsorisasi_api= new SponsorisasiApi();  
      var p = page ? parseInt(page, 10) : 1;

      sponsorisasi_api.fetch({
          success:function(){
              $("#backbone_content").html(new SponsorisasiApiView({model:sponsorisasi_api,page:p}).el);
          },
          error:function(){
                $("#backbone_content").html('error');
         }
      });
    },
    loginForm:function(){
        
        //alert('ok');
        //app.navigate('about');
        if(!this.loginFormView){
            var loginFormModel= new FormModel();

            this.loginFormView=new LoginForm({model:loginFormModel});
        }
        $("#backbone_content").html(this.loginFormView.render().el);
    },
    
    
     // Gets the current route callback function name
    // or current hash fragment
    current : function(route){
        if(route && Backbone.History.started) {
            var AppRouter = this,
                // Get current fragment from Backbone.History
                fragment = Backbone.history.fragment,
                // Get current object of routes and convert to array-pairs
                routes = _.pairs(AppRouter.routes);

            // Loop through array pairs and return
            // array on first truthful match.
            var matched = _.find(routes, function(handler) {
                var route = handler[0];

                // Convert the route to RegExp using the 
                // Backbone Router's internal convert
                // function (if it already isn't a RegExp)
                route = _.isRegExp(route) ? route :  AppRouter._routeToRegExp(route);

                // Test the regexp against the current fragment
                return route.test(fragment);
            });

            // Returns callback name or false if 
            // no matches are found
            return matched ? matched[1] : false;
        } else {
            // Just return current hash fragment in History
            return Backbone.history.fragment
        }
    },
    
});

//utils.loadTemplate(['LoginForm'], function() {
//    app = new AppRouter();
//    Backbone.history.start();
//});
//utils.loadTemplate(['MenuAfterLogedIn','MenuBeforeLogedIn','LoginForm','about','profile_member_view','ProfileApiView'], function() {
/*
 *['MenuAfterLogedIn','MenuBeforeLogedIn','LoginForm','about','profile_member_view','ProfileApiView',
                     'view_poin_view','view_summary_bonus_view','view_history_bonus_view','item_table'
]
 **/
utils.loadTemplate(['MenuBeforeLogedIn','LoginForm','HomeAgenda','HomeNews','ProfileApiView',
                    'SponsorisasiApiView','SponsorisasiApiViewTable',], function() {
    app = new AppRouter();
    Backbone.history.start();
});
//utils.loadTemplate(['about',], function() {
//    app = new AppRouter();
//    Backbone.history.start();
//});

//function load_template_custom(view_id)
//{
//   var deferreds = [];
//        deferreds.push($.get('ui_interface/test_dynamic/'+view_id, function(data) {
//            window['TestDynamic'].prototype.template = _.template(data);
//        }));
//    $.when.apply(null, deferreds).done();
//}