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

