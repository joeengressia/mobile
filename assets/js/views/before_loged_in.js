var link_after_login='profile_detail';

window.LoginForm = Backbone.View.extend({
    initialize: function () {
       /// this.render();
    },

    render: function () {
        $(this.el).html(this.template());       
       return this;
    },

    events: {
        "change"        : "change",
        "click .processLogin"   : "beforeSave",
        "click .processLogout"   : "doLogout",
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
      //  console.log(this.model._previousAttributes.network_mid);
//        this.saveWine();
        this.doLogin();
        
        return false;
    },
    doLogin:function(){
        var self=this;
//         $.get(_API_SERVER_URL+'api_client/ui_interface/test_jsonp?jsoncallback=?',function(data){
////                   console.log(data);
//             //     alert(data);
//                console.log(data);
//               },'json');
//        $.ajax({
//            dataType:'jsonp',
//            type:'get',
//          //  url:_API_SERVER_URL+'api_client/ui_interface/test_jsonp?jsoncallback=?&network_mid=GS100001&password=GS100001',
//            //url:_API_SERVER_URL+'api_client/ui_interface/call_api/view_member_login?jsoncallback=?&network_mid='+this.model._previousAttributes.network_mid+'&password='+this.model._previousAttributes.password,
//            url:_API_SERVER_URL+'api_client/ui_interface/call_api/view_member_login?jsoncallback=?&network_mid='+this.model._previousAttributes.network_mid+'&password='+this.model._previousAttributes.password,
//            success:function(response){
//                console.log(response);
//                console.log(this.model.urlRoot);
//                console.log(response['status']);
//            },
//            error:function(response,method,thrown){
//               console.log(method);
//              
//            }
//        });        
//               
               
        $.ajax({
           // contentType : "application/json",
            dataType:'json',
            type:'get',
            //url:this.model.urlRoot,
            url:this.model.urlRoot+'?jsoncallback=?&network_mid='+this.model._previousAttributes.network_mid+'&password='+this.model._previousAttributes.password,
           // data:{network_mid:this.model._previousAttributes.network_mid,password:this.model._previousAttributes.password},
            success:function(response){
                if(response['status']!=200)
                {

                    self.setStorage(0,0,0);
                    utils.showAlert('', response['message'], 'alert-error'); 

                }
                else
                {
//                    $.get(_API_SERVER_URL+'api_client/ui_interface/MenuAfterLogedIn',function(menuAfter){
//                      $('.nav-list').html(menuAfter);
//                    });

                    //console.log(response['data']['network_id']);
                    var network_id=response['data']['network_id'];
                    var network_mid=response['data']['network_mid'];
                    var token=response['data']['token'];
                    self.setStorage(network_id,network_mid,token);
//                    utils.loadTemplate(['HomeAgenda','HomeNews','ProfileApiView',
//                    'SponsorisasiApiView','SponsorisasiApiViewTable','KomisiTotalView', 'SummaryNodeView'], function() {
//    
//    
//                    });
                    app.navigate(_LINK_AFTER_LOGIN,true);
                }
            },
            error:function(response,method,thrown){
              
                utils.showAlert('Error', 'An error occurred while trying to log in', 'alert-error');
            }
        });
        
    },
    doLogout:function(){
        if(confirm('Are you sure want to log out?')){
            $.get(_API_SERVER_URL+'api_client/ui_interface/log_out',function(){
                app.navigate('login',true);
            })
        }
        return false;
    },
    setStorage:function(network_id_value,network_mid_value,token_value){
    //     localStorage.setItem("network_id", network_id);
      //   localStorage.setItem("network_mid", network_mid);
        // localStorage.setItem("token", token);
            //var self=this;
           // var fc = new FormCollection();
           //fc.create({id:1});
//            var save_data = fc.create({
//               // "id": 1,
//                "network_id": network_id_value,
//                "token": token_value,
//                "network_mid": network_mid_value,
//
//           });
           
//           fc.fetch();
//           
//           fc.add({"id": 1,
//                "network_id": network_id_value,
//                "token": token_value,
//                "network_mid": network_mid_value,});
//            fc.fetch();
//
            var post_data={"id": 1,
                "network_id": network_id_value,
                "token": token_value,
                "network_mid": network_mid_value,};
            this.model.save(post_data,{
                success:function(model){
                 //   self.render();
                    //console.log(JSON.stringify(model));
                    //fc.fetch();
                   // new FormCollection({'model':model});
                    //console.log('id: '+model.id);
                    //this.model.fetch();
                    //self.render();
                }
            });
           
    },
    
//    saveWine: function () {
//        var self = this;
//        this.model.save(null, {
//            success: function (model) {
//                self.render();
//                app.navigate('profile', false);
//                utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
//            },
//            error: function () {
//                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
//            }
//        });
//    },


});


window.MenuBeforeLogedIn= Backbone.View.extend({
        initialize:function(){
          this.render();  
        },
        render:function(){
        $("#menu ul").html(this.template()); 
           
        },
        selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }
});
window.MenuAfterLogedIn= Backbone.View.extend({
        initialize:function(){
          this.render();  
        },
        render:function(){
        $("#menu ul").html(this.template()); 
           
        },
        selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }
});

window.HomeNews=Backbone.View.extend({
        initialize:function(){
        },
      render: function () {
       
        $(this.el).html(this.template());       
       return this;
        },
});
window.HomeAgenda=Backbone.View.extend({
        initialize:function(){
        },
      render: function () {
                    console.log(this.el);

        $(this.el).html(this.template());       
       return this;
        },
});

//window.Home=Backbone.View.extend({
//        initialize:function(){
//            this.homeAgendaView=new HomeAgenda();
//            this.homeNewsView=new HomeNews();
//          //  console.log(this.homeAgendaView.render());
//            $("#backbone_content").html(this.homeAgendaView.render().el);
//            $("#backbone_content").append(this.homeNewsView.render().el);
//
//        }
//});
