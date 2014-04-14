window.FormModel = Backbone.Model.extend({

    urlRoot: _API_SERVER_URL+"api_client/ui_interface/call_api/view_member_login",

    initialize: function () {
        
        this.validators = {};

        this.validators.network_mid = function (value) {
            return (typeof(value) != "undefined" && value.length > 0) ? {isValid: true} : {isValid: false, message: "You must enter a mid"};
        };

        this.validators.password = function (value) {
            return (typeof(value) != "undefined" && value.length > 0) > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };
        
        
    },
    idAttribute: "id",
    defaults:{
       // data:{
            'id':1,
            'network_id':0,
            'token':0,
            'network_mid':0,
        //
       
        //title:'blank'
  },
    sync: function(method, model, options) {
            options || (options = {});
            switch(method) {
            case 'create':
                var key = 'login-' + model.id;
                localStorage.setItem(key, JSON.stringify(model)); 
            break;
            case 'read':
                var key = 'login-' + model.id;
                var result = localStorage.getItem(key);
                if (result) {
                result = JSON.parse(result);
                options.success && options.success(result);
                } else if (options.error) {
                options.error('Could not find login id=' + model.id);
                } 
            break;
            case 'update':
                var key = 'login-' + model.id;
                localStorage.setItem(key, JSON.stringify(model)); 
//                console.log('update');
            break;
            case 'delete':
                var key = 'login-' + model.id;
                localStorage.removeItem(key); 
            break;
            }
        },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },
    
});


 var FormCollection = Backbone.Collection.extend({

  url: _API_SERVER_URL+"api_client/ui_interface/call_api/view_member_login",
  model: FormModel,
  localStorage: new Backbone.LocalStorage("FormCollection"),

});