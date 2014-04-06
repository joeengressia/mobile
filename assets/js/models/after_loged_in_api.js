window.ProfileApi= Backbone.Model.extend({
    urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_data_member?token="+localStorage.getItem('token')+'&network_id='+localStorage.getItem('network_id'),
    
    initialize:function(){
        
    },
    
    defaults:{
        data:{
        network_id:null,
        network_mid:"-",
        member_name:"-",
        member_email:"-",
        member_phone:"-",
        member_mobilephone:"-",
        member_image:"-",
        path:"-",
        member_bank_name:"-",
        member_bank_account_name:"-",
        member_bank_account_no:"-"
        }
    }
});

window.SponsorisasiApi=Backbone.Model.extend({
    urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_sponsorisasi?token="+localStorage.getItem('token')+'&network_id='+localStorage.getItem('network_id'),
    initialize:function(){
        
    },
    defaults:{
        data:{
        network_mid:"-",
        member_name:"-",
        member_phone:"-",
        member_mobilephone:"-",
        member_image:"-",
        path:"-",
        member_join_datetime:"-",
        }
    }
})

window.view_poin_api= Backbone.Model.extend({
    urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_poin",
    
    initialize:function(){
        
    },
    
    
});

window.view_summary_bonus_api= Backbone.Model.extend({
    urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_bonus?token="+localStorage.getItem('token')+'&network_id='+localStorage.getItem('network_id'),
    
    initialize:function(){
        
    },
    
    
});
window.view_history_bonus_api= Backbone.Model.extend({
    urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_history_bonus?token="+localStorage.getItem('token')+'&network_id='+localStorage.getItem('network_id'),
    
    initialize:function(){
        
    },
    
    
});
