window.ProfileApiView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
//        $(this.el).html(this.template(this.model()));
        return this;
    }
//    ,
//    
//    events: {
//        "change"        : "change"
//       
//    },
//
//    change: function (event) {
//        // Remove any existing alert message
//
//        // Apply the change to the model
//        var target = event.target;
//        var change = {};
//        change[target.name] = target.value;
//        this.model.set(change);
//
//       
//       
//    }

});