/**
 * storage network_id; token
 *      
//       console.log(localStorage.getItem('network_mid'));
//       console.log(localStorage.getItem('token'));
//       console.log(localStorage.getItem('network_id'));
 **/
var responses_content=$("#backbone_content");
var AppRouter = Backbone.Router.extend({
    routes:{
        "":"home",
        "login":"loginForm",
        "logout":"logoutFunc",
        "profile_detail":"profileDetail", //link:function
        "statistik":"statistikFunc", //link:function
        "sponsorisasi/:page":"sponsorisasiFunc",
        "history_bonus/:page":"historyBonusFunc",
        "history_transfer/:page":"historyTransferFunc",
        "komisi_total":"komisiTotalFunc",
        "view_api/:view_id":"viewApiClient", //link:function
    },
    
    initialize:function(){
       // this.menuBeforeLogedInView = new MenuBeforeLogedIn();
        this.authorization();
    },
    home:function(){
        if(!this.homeAgendaView && !this.homeNewsView)
        {
            this.homeNewsView=new HomeNews();
       
        }
        $("#backbone_content").html(this.homeNewsView.render().el);
    },
    logoutFunc:function(){
        
            localStorage.clear();
            this.authorization();
            window.location.href='index.html#login';
    },
    statistikFunc:function(){
        if(!this.statistikView)
        {
            this.statistikView=new StatistikView();
       
        }
        $("#backbone_content").html(this.statistikView.el);
    },
    viewApiClient:function(view_id){
        switch(view_id)
        {
            case 'summary_node':
                
                var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_node?jsoncallback=?&token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
                var summary_node_api=new SummaryNodeApi({url:url_rest});
                summary_node_api.fetch({
                success: function(responses){
                      app.authorization(responses);
                    $("#backbone_content").html(new SummaryNodeView({model:summary_node_api}).el);
                },
                error:function(){
                    $("#backbone_content").html('error');
                }
                });
            break;    
            case 'poin':
                
                var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_poin?jsoncallback=?&token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
                var poin_api=new PoinApi({url:url_rest});
                poin_api.fetch({
                success: function(responses){
                      app.authorization(responses);

                    $("#backbone_content").html(new PoinApiView({model:poin_api}).el);
                },
                error:function(){
                    $("#backbone_content").html('error');
                }
                });
            break;    
        }
    },
    profileDetail:function(){
         $("#backbone_content").html('');
        var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_data_member?jsoncallback=?&token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
        var profile_api = new ProfileApi({url:url_rest});
        profile_api.fetch({success: function(responses){
                app.authorization(responses);
                $("#backbone_content").html(new ProfileApiView({model:profile_api}).el);
        },
        error:function(){
                $("#backbone_content").html('error');
        }
        });
    },
    komisiTotalFunc:function(){
        var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_bonus?jsoncallback=?&token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
        var komisi_total_api = new KomisiTotalApi({url:url_rest});
        komisi_total_api.fetch({success: function(responses){
                app.authorization(responses);
                $("#backbone_content").html(new KomisiTotalView({model:komisi_total_api}).el);
        },
        error:function(){
                $("#backbone_content").html('error');
        }
        });
    },
    sponsorisasiFunc:function(page){
      
      var p = page ? parseInt(page) : 0;   
      var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_sponsorisasi?jsoncallback=?&token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id+'&page='+page;
      var sponsorisasi_api= new SponsorisasiApi({url:url_rest});  
      
      sponsorisasi_api.fetch({
          success:function(responses){
              app.authorization(responses);

              if(p==0)
              {
                    $("#backbone_content").html(new SponsorisasiApiView({model:sponsorisasi_api,page:p}).el);
              }
              else
             {
               $("table#SponsorisasiApiViewTable").append(new SponsorisasiApiView({model:sponsorisasi_api,page:p,tagName:'tbody'}).el);

             } 
          },
          error:function(){
                $("#backbone_content").html('error');
         }
      });
    },
    historyBonusFunc:function(page){
      
      var p = page ? parseInt(page) : 0;   
      var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_history_bonus?jsoncallback=?&token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id+'&page='+page;
      var history_bonus_api= new HistoryBonusApi({url:url_rest});  
      
      history_bonus_api.fetch({
          success:function(responses){
            app.authorization(responses);

            if(p==0)
            {
                $("#backbone_content").html(new HistoryBonusApiView({model:history_bonus_api,page:p}).el);
            }
            else
            {
                $("table#HistoryBonusApiViewTable").append(new HistoryBonusApiView({model:history_bonus_api,page:p,tagName:'tbody'}).el);
            } 
          },
          error:function(){
                $("#backbone_content").html('error');
         }
      });
    },
    historyTransferFunc:function(page){
      
      var p = page ? parseInt(page) : 0;   
      var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_history_transfer?jsoncallback=?&token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id+'&page='+page;
      var history_transfer_api= new HistoryTransferApi({url:url_rest});  
      
      history_transfer_api.fetch({
          success:function(responses){
              app.authorization(responses);

            if(p==0)
            {
                $("#backbone_content").html(new HistoryTransferApiView({model:history_transfer_api,page:p}).el);
            }
            else
            {
                $("table#HistoryTransferApiViewTable").append(new HistoryTransferApiView({model:history_transfer_api,page:p,tagName:'tbody'}).el);
            } 
          },
          error:function(){
                $("#backbone_content").html('error');
         }
      });
    },
    loginForm:function(){
        
       // if(!this.loginFormView){
            var loginFormModel= new FormModel();

            this.loginFormView=new LoginForm({model:loginFormModel});
       // }
        $("#backbone_content").html(this.loginFormView.render().el);
        
       
    },
    data_session_login:function(){
       var loginStorage= JSON.parse(localStorage.getItem('login-1'));
       if(loginStorage==null){
           loginStorage={id: 1, network_id: "0", token: "0", network_mid: "0", password: "0"};
       }
      // console.log(loginStorage.token);
       //console.log(data_session_login[0].network_id);
       return loginStorage;
    },
    //cek athorization. kode 401 atau selain 200 lempar ke halaman login
    authorization:function(responses){
        var html_login='<li id="dock_login"><a href="index.html#login" data-icon="lock">Login</a></li>';
        var html_logout='<li id="dock_logout"><a href="index.html#logout" onclick="return confirm(\'Are you sure want to logout?\');" data-icon="lock">Logout</a></li>';
        //cek if has loged in by local storage
        if(localStorage.getItem('login-1')==null)
        {
            
            this.menuBeforeLogedInView = new MenuBeforeLogedIn();
            this.propertyAuthorize('login');
            if(this.current()!='login')
            {
                window.location.href='index.html#login';
            }

        }
        else
        {
           // console.log($("#dock_login a").text());
            this.propertyAuthorize('logout');
            this.menuAfterLogedInView = new MenuAfterLogedIn();
        }
        
        if(typeof(responses) != "undefined")
        {
            var jsonResponse=responses.toJSON();
            if(typeof(jsonResponse.status)!='undefined')
            {
                switch(jsonResponse.status)
                {
                    //deny access
                    case 401:
                    if(this.current()!='login')
                    {
                        this.menuBeforeLogedInView = new MenuBeforeLogedIn();
                        window.location.href='index.html#login';
                    }
                    break;
                    case 500:
                    if(this.current()!='login')
                    {
                        this.menuBeforeLogedInView = new MenuBeforeLogedIn();
                        window.location.href='index.html#login';
                    }
                    break;
                    case 200:
                        
                    break;    
                }
            }
        }
        
    },
    
    propertyAuthorize:function(action){
        switch(action)
        {
            case 'login':
            $("#dock_login a").text('Login');    
            $("#dock_login a").attr('href','index.html#login');  
            $("#dock_login a").removeAttr('onclick');  
            break;    
            case 'logout':
             $("#dock_login a").text('Logout');    
            $("#dock_login a").attr('href','index.html#logout');    
            $("#dock_login a").attr('onclick','return confirm(\'Are you sure want to logout?\')');   
            break;    
        }
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
utils.loadTemplate(['MenuAfterLogedIn','MenuBeforeLogedIn','LoginForm','HomeNews','ProfileApiView',
                    'SponsorisasiApiView','SponsorisasiApiViewTable','KomisiTotalView', 'SummaryNodeView',
                'PoinApiView','PoinApiViewTable','HistoryBonusApiView','HistoryBonusApiViewTable',
                'HistoryTransferApiView','HistoryTransferApiViewTable','StatistikView',
                ], function() {
                
                    
    
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


               
//            