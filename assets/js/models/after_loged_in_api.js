window.SummaryNodeApi= Backbone.Model.extend({
   // urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_node?token="+localStorage.getItem('token')+'&network_id='+localStorage.getItem('network_id'),
     url: function(){
    return this.instanceUrl;
  },
    initialize:function(props){
        this.instanceUrl = props.url;
    },
    
    defaults:{
        data:{
        total_left:0,
        total_right:0,
        }
    }
});
window.PoinApi= Backbone.Model.extend({
   // urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_node?token="+localStorage.getItem('token')+'&network_id='+localStorage.getItem('network_id'),
     url: function(){
    return this.instanceUrl;
  },
    initialize:function(props){
        this.instanceUrl = props.url;
    },
    
    defaults:{
        data:{
        poin:0,
        period:0,
        }
    }
});
window.KomisiTotalApi= Backbone.Model.extend({
     url: function(){
    return this.instanceUrl;
  },
    initialize:function(props){
        this.instanceUrl = props.url;
    },
//    urlRoot:_API_SERVER_URL+"api_client/ui_interface/call_api/view_summary_bonus?token="+localStorage.getItem('token')+'&network_id='+localStorage.getItem('network_id'),
//    
//    initialize:function(){
//        
//    },
    
    defaults:{
        data:{
        bonus_active_left:0,
        bonus_active_right:0,
        bonus_sponsor_acc:0,
        bonus_sponsor_paid:0,
        bonus_match_acc:0,
        bonus_match_paid:0,
        bonus_gen1_acc:0,
        bonus_gen1_paid:0,
        bonus_gen2_acc:0,
        bonus_gen2_paid:0,
        bonus_gen3_acc:0,
        bonus_gen3_paid:0,
        bonus_gen4_acc:0,
        bonus_gen4_paid:0,
        bonus_gen5_acc:0,
        bonus_gen5_paid:0,
        bonus_gen6_acc:0,
        bonus_gen6_paid:0,
        bonus_gen7_acc:0,
        bonus_gen7_paid:0,
        bonus_gen8_acc:0,
        bonus_gen8_paid:0,
        bonus_gen9_acc:0,
        bonus_gen9_paid:0,
        bonus_gen10_acc:0,
        bonus_gen10_paid:0,
        bonus_viral_acc:0,
        bonus_viral_paid:0,
        bonus_gen_node_acc:0,
        bonus_gen_node_paid:0,
        bonus_ro_viral_acc:0,
        bonus_ro_viral_paid:0,
        bonus_ro_jaringan_acc:0,
        bonus_ro_jaringan_paid:0,
        }
    }
});
window.ProfileApi= Backbone.Model.extend({
      url: function(){
    return this.instanceUrl;
  },
    initialize:function(props){
        this.instanceUrl = props.url;
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
    
    url: function(){
    return this.instanceUrl;
    },
    initialize:function(props){
        this.instanceUrl = props.url;
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
});

window.HistoryBonusApi=Backbone.Model.extend({
    
    url: function(){
    return this.instanceUrl;
    },
    initialize:function(props){
        this.instanceUrl = props.url;
    },
   
    defaults:{
        data:{
        netgrow_network_id:"-",
        bonus_pasangan:0,
        bonus_generasi_1:0,
        bonus_generasi_2:0,
        bonus_generasi_3:0,
        bonus_generasi_4:0,
        bonus_generasi_5:0,
        bonus_generasi_6:0,
        bonus_generasi_7:0,
        bonus_generasi_8:0,
        bonus_generasi_9:0,
        bonus_generasi_10:0,
        date_format:0,
        
        }
    }
});
window.HistoryTransferApi=Backbone.Model.extend({
    
    url: function(){
    return this.instanceUrl;
    },
    initialize:function(props){
        this.instanceUrl = props.url;
    },
   
    defaults:{
        data:{
        transfer_id:"-",
        total_transfer:0,
        keterangan:0,
        transfer_date_format:0,
        index:0,
        }
    }
});

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
