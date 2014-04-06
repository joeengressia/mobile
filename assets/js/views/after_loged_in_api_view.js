window.ProfileApiView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});    

window.SponsorisasiApiView=Backbone.View.extend({
    initialize:function(){
        this.render();
    },
    render:function(){

//        $(this.el).html(this.template(new SponsorisasiApiViewTable({model:this.model,})));
//        $(this.el).html(this.template(new SponsorisasiApiViewTable({model:this.model,})));
//        return this;
       // var sponsorisasi = this.model;
        sponsorisasi=this.model.toJSON();
        //console.log(sponsorisasi );
        var len = sponsorisasi.data.length?sponsorisasi.data.length:0;
//        var startPos = (this.options.page - 1) * 8;
        var startPos = 0;
        //var endPos = Math.min(startPos + 8, len);
        var endPos = len;

       // $(this.el).html('<ul class="thumbnails"></ul>');
        //console.log(wines);
//        console.log(endPos);
//        for (var i = startPos; i < endPos; i++) {
//            $('table#SponsorisasiApiViewTable > tbody', this.el).append(new SponsorisasiApiViewTable({model: sponsorisasi[i]}).render().el);
//        }
//console.log(length_data.data.length);
//console.log(sponsorisasi);
        $(this.el).html(this.template());
        for(var i=startPos;i<endPos;i++)
        {
            $('table#SponsorisasiApiViewTable > tbody', this.el).append(new SponsorisasiApiViewTable({model: this.model,data_arr:sponsorisasi.data[i]}).render().el);
        }

       // $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.view_poin_view = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        
        var data_arr=this.model.toJSON();
        var title_view='Poin';
        var response_content_start='<div class="breadcrumbs" id="breadcrumbs">'
					+'<ul class="breadcrumb">'
						+'<li>'
							+'<i class="icon-home home-icon"></i>'
                                                       +' <a href="'+_BASE_URL+'">Home</a>'

							+'<span class="divider">'
							+'	<i class="icon-angle-right arrow-icon"></i>'
							+'</span>'
						+'</li>'
                                                
						+'<li class="active">'+title_view+'</li>'
					+'</ul><!--.breadcrumb-->'
                                        +'</div>'
                                        +'<div class="page-content">'
					+'<div class="page-header position-relative">'
					+'	<h1>'
					+title_view
                                                        
					+'	</h1>'
					+'</div><!--/.page-header-->'

					+'<div class="row-fluid">'
						+'<div class="span12">'
							+'<!--PAGE CONTENT BEGINS-->'
                                                        +'<!--							<div class="hr hr-18 hr-double dotted"></div>-->'
							+'<div class="row-fluid">'
                                                        +'<div class="span8">';
         var response_content_end='</div>'
                                +'</div>'
                                +'</div><!--/.span-->'
                                +'</div><!--/.row-fluid-->'
				+'</div><!--/.page-content-->'
                                +'</div><!--/.main-content-->';
        $(this.el).append(response_content_start+'<table class="table table-striped table-bordered table-hover"></table>'+response_content_end);
        if(typeof(data_arr.data.length) != "undefined" && data_arr.data.length>=1)
        {
            var len = data_arr.data.length;
            var startPos = (this.options.page - 1) * 8;
            var endPos = Math.min(startPos + 8, len);
            
            
            
            //console.log(endPos);
            var tr_view='<tr><th style="width:20px;">No</th><th>Poin</th><th>Period</th></tr>';
            $(".table",this.el).append(tr_view);

            var num=1;
            for(var i=startPos; i<endPos;i++)
            {          
                var tr_view='<tr><td >'+num+'</td><td>'+data_arr.data[i].poin+'</td><td>'+data_arr.data[i].period+'</td></tr>';
                $(".table",this.el).append(tr_view);
                num++;
            }
        }
        return this;
    },

});

//summary bonus
window.view_summary_bonus_view = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        
        var data_arr=this.model.toJSON();
//        console.log(data_arr);
        var title_view='Bonus';
        var response_content_start='<div class="breadcrumbs" id="breadcrumbs">'
					+'<ul class="breadcrumb">'
						+'<li>'
							+'<i class="icon-home home-icon"></i>'
                                                       +' <a href="'+_BASE_URL+'">Home</a>'

							+'<span class="divider">'
							+'	<i class="icon-angle-right arrow-icon"></i>'
							+'</span>'
						+'</li>'
                                                
						+'<li class="active">'+title_view+'</li>'
					+'</ul><!--.breadcrumb-->'
                                        +'</div>'
                                        +'<div class="page-content">'
					+'<div class="page-header position-relative">'
					+'	<h1>'
					+title_view
                                                        
					+'	</h1>'
					+'</div><!--/.page-header-->'

					+'<div class="row-fluid">'
						+'<div class="span12">'
							+'<!--PAGE CONTENT BEGINS-->'
                                                        +'<!--							<div class="hr hr-18 hr-double dotted"></div>-->'
							+'<div class="row-fluid">'
                                                        +'<div class="span8">';
         var response_content_end='</div>'
                                +'</div>'
                                +'</div><!--/.span-->'
                                +'</div><!--/.row-fluid-->'
				+'</div><!--/.page-content-->'
                                +'</div><!--/.main-content-->';
        $(this.el).append(response_content_start+'<table class="table table-striped table-bordered table-hover"></table>'+response_content_end);
      
        var tr_view='<tr><th style="width:20px;">bonus_active_left</th><td>Rp '+data_arr.data.bonus_active_left+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">bonus_active_right</th><td>Rp '+data_arr.data.bonus_active_right+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">sponsor</th><td>Rp '+(data_arr.data.bonus_sponsor_acc-data_arr.data.bonus_sponsor_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">pasangan</th><td>Rp '+(data_arr.data.bonus_match_acc-data_arr.data.bonus_match_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 1</th><td>Rp '+(data_arr.data.bonus_gen1_acc-data_arr.data.bonus_gen1_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 2</th><td>Rp '+(data_arr.data.bonus_gen2_acc-data_arr.data.bonus_gen2_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 3</th><td>Rp '+(data_arr.data.bonus_gen3_acc-data_arr.data.bonus_gen3_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 4</th><td>Rp '+(data_arr.data.bonus_gen4_acc-data_arr.data.bonus_gen4_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 5</th><td>Rp '+(data_arr.data.bonus_gen5_acc-data_arr.data.bonus_gen5_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 6</th><td>Rp '+(data_arr.data.bonus_gen6_acc-data_arr.data.bonus_gen6_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 7</th><td>Rp '+(data_arr.data.bonus_gen7_acc-data_arr.data.bonus_gen7_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 8</th><td>Rp '+(data_arr.data.bonus_gen8_acc-data_arr.data.bonus_gen8_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 9</th><td>Rp '+(data_arr.data.bonus_gen9_acc-data_arr.data.bonus_gen9_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen 10</th><td>Rp '+(data_arr.data.bonus_gen10_acc-data_arr.data.bonus_gen10_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">viral</th><td>Rp '+(data_arr.data.bonus_viral_acc-data_arr.data.bonus_viral_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">gen node</th><td>Rp '+(data_arr.data.bonus_gen_node_acc-data_arr.data.bonus_gen_node_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">ro viral</th><td>Rp '+(data_arr.data.bonus_ro_viral_acc-data_arr.data.bonus_ro_viral_paid)+'</td></tr>';
         tr_view+='<tr><th style="width:20px;">ro jaringan</th><td>Rp '+(data_arr.data.bonus_ro_jaringan_acc-data_arr.data.bonus_ro_jaringan_paid)+'</td></tr>';
        $(".table",this.el).append(tr_view);

        //var tr_view='<tr><td >'+num+'</td><td>'+data_arr.data[i].poin+'</td><td>'+data_arr.data[i].period+'</td></tr>';
//                $(".table",this.el).append(tr_view);

        
        return this;
    },
    
    

});


//history transfer
window.view_history_bonus_view=Backbone.View.extend({
    initialize:function(){
      this.render();  
    },
    render:function(){
       
        var hb=this.model._previousAttributes.data;
//        console.log(hb);
        var len=hb.length;
//                    console.log(len);

        var startPos=(this.options.page-1)*8;
        var endPos=Math.min(startPos+8,len);
        
        var title_view='History Bonus';
        var response_content_start='<div class="breadcrumbs" id="breadcrumbs">'
					+'<ul class="breadcrumb">'
						+'<li>'
							+'<i class="icon-home home-icon"></i>'
                                                       +' <a href="'+_BASE_URL+'">Home</a>'

							+'<span class="divider">'
							+'	<i class="icon-angle-right arrow-icon"></i>'
							+'</span>'
						+'</li>'
                                                
						+'<li class="active">'+title_view+'</li>'
					+'</ul><!--.breadcrumb-->'
                                        +'</div>'
                                        +'<div class="page-content">'
					+'<div class="page-header position-relative">'
					+'	<h1>'
					+title_view
                                                        
					+'	</h1>'
					+'</div><!--/.page-header-->'

					+'<div class="row-fluid">'
						+'<div class="span12">'
							+'<!--PAGE CONTENT BEGINS-->'
                                                        +'<!--							<div class="hr hr-18 hr-double dotted"></div>-->'
							+'<div class="row-fluid">'
                                                        +'<div class="span12">';
         var response_content_end='</div>'
                                +'</div>'
                                +'</div><!--/.span-->'
                                +'</div><!--/.row-fluid-->'
				+'</div><!--/.page-content-->'
                                +'</div><!--/.main-content-->';
        $(this.el).append(response_content_start+'<table class="table table-striped table-bordered table-hover"></table>'+response_content_end);
        var tr_view='<tr><th style="width:20px;">No</th><th>Tgl</th><th>Pasangan</th>'
                    +'<th>Gen 1</th><th>Gen 2</th><th>Gen 3</th>'
                    +'<th>Gen 4</th><th>Gen 5</th><th>Gen 6</th>'
                    +'<th>Gen 7</th><th>Gen 8</th><th>Gen 9</th>'
                    +'<th>Gen 10</th>'
                    +'</tr>';
            $(".table",this.el).append(tr_view);
         var no=1;   
         for (var i = 0; i < len; i++) {
        //    tr_view+=; 
            bonus_view='<tr><td>'+no+'</td><td>'+hb[i].date_format+'</td><td>'+hb[i].bonus_pasangan+'</td>'
                +'<td>'+hb[i].bonus_generasi_1+'</td><td>'+hb[i].bonus_generasi_2+'</td><td>'+hb[i].bonus_generasi_3+'</td>'
                +'<td>'+hb[i].bonus_generasi_4+'</td><td>'+hb[i].bonus_generasi_5+'</td><td>'+hb[i].bonus_generasi_6+'</td>'
                +'<td>'+hb[i].bonus_generasi_7+'</td><td>'+hb[i].bonus_generasi_8+'</td><td>'+hb[i].bonus_generasi_9+'</td>'
                +'<td>'+hb[i].bonus_generasi_10+'</td>'
                +'</tr>';
            $('.table', this.el).append(bonus_view);
            no++;
        }
        
        return this;

        
    },
});

window.SponsorisasiApiViewTable = Backbone.View.extend({
    
    tagName: "tr",

    className: "",
    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
        this.render();
    },

    render: function () {
      $(this.el).html(this.template({data_arr:this.options.data_arr}));
      return this;
    }

});