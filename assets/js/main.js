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
        "sponsorisasi/:page":"sponsorisasiFunc",
        "history_bonus/:page":"historyBonusFunc",
        "history_transfer/:page":"historyTransferFunc",
        "komisi_total":"komisiTotalFunc",
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
       
        }
        $("#backbone_content").html(this.homeAgendaView.render().el);
        $("#backbone_content").append(this.homeNewsView.render().el);
        
//        var session_login = new FormCollection();
//        session_login.fetch();
//        var data_session_login=session_login.toJSON()
//        console.log(data_session_login);
//        console.log(localStorage.getItem('login-1'));
//        var data=JSON.parse(localStorage.getItem('login-1'));
       // console.log(this.data_session_login().token);

    },
    viewApiClient:function(view_id){
        switch(view_id)
        {
            case 'summary_node':
                
                var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_node?token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
                var summary_node_api=new SummaryNodeApi({url:url_rest});
                summary_node_api.fetch({
                success: function(){
                    $("#backbone_content").html(new SummaryNodeView({model:summary_node_api}).el);
                },
                error:function(){
                    $("#backbone_content").html('error');
                }
                });
            break;    
            case 'poin':
                
                var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_poin?token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
                var poin_api=new PoinApi({url:url_rest});
                poin_api.fetch({
                success: function(){
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
        var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_data_member?token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
        var profile_api = new ProfileApi({url:url_rest});
        profile_api.fetch({success: function(){
                $("#backbone_content").html(new ProfileApiView({model:profile_api}).el);
        },
        error:function(){
                $("#backbone_content").html('error');
        }
        });
    },
    komisiTotalFunc:function(){
        var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_bonus?token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id;
        var komisi_total_api = new KomisiTotalApi({url:url_rest});
        komisi_total_api.fetch({success: function(){
                $("#backbone_content").html(new KomisiTotalView({model:komisi_total_api}).el);
        },
        error:function(){
                $("#backbone_content").html('error');
        }
        });
    },
    sponsorisasiFunc:function(page){
      
      var p = page ? parseInt(page) : 0;   
      var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_sponsorisasi?token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id+'&page='+page;
      var sponsorisasi_api= new SponsorisasiApi({url:url_rest});  
      
      sponsorisasi_api.fetch({
          success:function(){
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
      var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_history_bonus?token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id+'&page='+page;
      var history_bonus_api= new HistoryBonusApi({url:url_rest});  
      
      history_bonus_api.fetch({
          success:function(){
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
      var url_rest=_API_SERVER_URL+"api_client/ui_interface/call_api/view_history_transfer?token="+this.data_session_login().token+'&network_id='+this.data_session_login().network_id+'&page='+page;
      var history_transfer_api= new HistoryTransferApi({url:url_rest});  
      
      history_transfer_api.fetch({
          success:function(){
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
        
        //alert('ok');
        //app.navigate('about');
        if(!this.loginFormView){
            var loginFormModel= new FormModel();

            this.loginFormView=new LoginForm({model:loginFormModel});
        }
        $("#backbone_content").html(this.loginFormView.render().el);
        
       
    },
    
//    data_session_login:function(){
//       var session_login = new FormCollection();
//        session_login.fetch();
//        var data_session_login=session_login.toJSON()
//       //console.log(data_session_login[0].network_id);
//       return data_session_login[0]
//    },
    data_session_login:function(){
        
       //console.log(data_session_login[0].network_id);
       return JSON.parse(localStorage.getItem('login-1'));
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
                    'SponsorisasiApiView','SponsorisasiApiViewTable','KomisiTotalView', 'SummaryNodeView',
                'PoinApiView','PoinApiViewTable','HistoryBonusApiView','HistoryBonusApiViewTable',
                'HistoryTransferApiView','HistoryTransferApiViewTable',
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