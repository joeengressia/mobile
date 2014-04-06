window.ProfileApi= Backbone.Model.extend({
    urlRoot:_BASE_URL+"api_client/ui_interface/call_api/view_data_member",
    
    initialize:function(){
        
    },
    
    defaults:{
        network_id:null,
        "ID Member":"-",
        "Nama Member":"-",
        "Email":"-",
        "Telepon":"-",
        "Handphone":"-",
        "Foto":"-",
        "path":"-",
        "Bank":"-",
        "A/N Rekening":"-",
        "Nomor Rekening":"-"
    }
});

window.ProfileCollection= Backbone.Collection.extend({
   model:ProfileApi,
   url:_BASE_URL+"api_client/ui_interface/call_api/view_data_member"
});