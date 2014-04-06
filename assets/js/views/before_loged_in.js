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
        console.log(this.model._previousAttributes.network_mid);
//        this.saveWine();
        this.doLogin();
        
        return false;
    },
    doLogin:function(){
        var self=this;
        
        //self.render();
        $.ajax({
            dataType:'json',
            type:'post',
            url:this.model.urlRoot,
            data:{network_mid:this.model._previousAttributes.network_mid,password:this.model._previousAttributes.password},
            success:function(response){
                if(response['status']!=200)
                {
                   utils.showAlert('', response['message'], 'alert-error'); 
                   //console.log(response['message']);
                }
                else
                {
//                    $.get(_API_SERVER_URL+'api_client/ui_interface/MenuAfterLogedIn',function(menuAfter){
//                      $('.nav-list').html(menuAfter);
//                    });

                    //console.log(response['data']['network_id']);
                    network_id=response['data']['network_id'];
                    network_mid=response['data']['network_mid'];
                    token=response['data']['token'];
                    self.setStorage(network_id,network_mid,token);

                    //app.navigate(link_after_login,true);
                }
            },
            error:function(){
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
    setStorage:function(network_id,network_mid,token){
         localStorage.setItem("network_id", network_id);
         localStorage.setItem("network_mid", network_mid);
         localStorage.setItem("token", token);

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
        $("#menu ul").append(this.template()); 
           
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
//          $(this.el).html(this.template());  
         $('.nav-list').append(this.template()); 
        },
});

window.HomeNews=Backbone.View.extend({
        initialize:function(){
        },
      render: function () {
                    console.log(this.el);

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
