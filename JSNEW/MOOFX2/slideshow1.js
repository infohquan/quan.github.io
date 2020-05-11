//jqN(document).ready(function(){});

/**
 * slide_import: Ajax method that handles data from the admin tool rendered xml
 * 
 * @param callback (method to incur after ajax complete)
 * @returns void
 */
function dc() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    var day = currentTime.getDate()
    var mon = currentTime.getMonth()
    var y = currentTime.getFullYear()
    return "&dc=" + day + "." + mon + "-" + y
    //return "&dc=" + seconds+"."+minutes+"-"+hours
}

var slide_import = function (callback) {

	jqN.ajax({


	    url: pathClientAjax + "handler/adsBannerHandler.aspx@type=estate" + dc(),		
		
		error: function(XMLHttpRequest, textStatus, errorThrown){  /* alert(errorThrown);  keep silent */ }, 
		 
		success: function(response){
			rbn  = jqN(response).find("NBCMAINPROMOTE VAR[name=ribbon]");
			
			jqN(response).find("NBCMAINPROMOTE VAR[name=promote_data]").each(function(i, obj){

				var btn_id = "button-"+(i+1);
				var button = jqN("#buttons #"+btn_id);
				var href = jqN(obj).find("VAR[name=show_url]").text().replace("video/@apl=true", ""); 
				jqN("#slideshowest.module .slide #slide-"+(i+1)).css("cursor", "pointer").click(function(){
					window.location = href; 
				});
				var btn_clr = window.schemeObj[btn_id].color = jqN(obj).find("VAR[name=color]").text().toLowerCase(); 
				
				//assign meta data to button objects
				window.schemeObj[btn_id].h2 = jqN(obj).find("VAR[name=title]").text().replace("|", "<br/>");
				window.schemeObj[btn_id].tune_in = jqN(obj).find("VAR[name=show_tune_in]").text().replace("|", "<br/>");
				window.schemeObj[btn_id].description = jqN(obj).find("VAR[name=body_text]").text().replace("|", "<br/>");
				
				//tie related links data to the scheme object
				jqN(obj).find("VAR[name=links] VAR[name=link_promote]").each(function(j){
					
					window.schemeObj[btn_id].links[j] = {};
					window.schemeObj[btn_id].links[j].href = jqN(this).find("VAR[name=link_url]").text();
					window.schemeObj[btn_id].links[j].color = window.schemeObj.colors[btn_clr].rt_lnks;
					//window.schemeObj[btn_id].links[j].color = window.schemeObj.colors[btn_clr].hi_lt;
					window.schemeObj[btn_id].links[j].target = jqN(this).find("VAR[name=link_window]").text();
					window.schemeObj[btn_id].links[j].icon = jqN(this).find("VAR[name=icon]").text();
					window.schemeObj[btn_id].links[j].prefix = jqN(this).find("VAR[name=active_word]").text()
					window.schemeObj[btn_id].links[j].text = jqN(this).find("VAR[name=text]").text(); 
					
					if(i===0) link_render(window.schemeObj[btn_id].links[j]);
				});
				
				//populate copy element with first slide data to start
				if(i===0) {
					//text
					jqN("#slideshowest.module h2").html(window.schemeObj[btn_id].h2);
					jqN("#slideshowest.module #tune-in").html(window.schemeObj[btn_id].tune_in);
					jqN("#slideshowest.module #slide-txt").html(window.schemeObj[btn_id].description);
				}
				
				//4th slide ribbon check and conditional population of all thumbs
				if(i===3 && rbn.length > 0) {
					window.btn_max = 3; 
					var rbnObj = jqN("#slideshowest #ribbon-ad");

					jqN(rbnObj).css({
						display:"block", 
						backgroundImage : "url("+jqN(rbn).find("VAR[name=main_image]").text()+")"
					});

					jqN(rbn).find("VAR[name=links] VAR[name=link_url]").each(function(i){
						var linkId = i+1;
						var link = jqN(this).text();

						jqN(rbnObj).find("#rbn-btn"+linkId).click(function(){
							window.open(link, '_self');//, 'new_tab'
						});

						if(i>0){
							jqN(rbnObj).find("#rbn-btn"+i).removeClass('full');
						}
					});
					
					jqN(button).unbind("mouseover");
					jqN(button).find("span").remove();
					jqN(button).css({ 
						backgroundImage: "url("+jqN(rbn).find("VAR[name=thumb_image]").text()+")", 
						backgroundPosition:"0 0" 
					});
					jqN(button).click(function(){ rbn_mask_open.start(); });
					
				} else {
					jqN("#slide-"+(i+1)).attr("src", jqN(obj).find("VAR[name=main_image]").text()); 
					jqN(button).css("background-image", "url("+jqN(obj).find("VAR[name=thumb_image]").text()+")");
					jqN(button).attr("href", href);
					jqN(button).find(".title").html(jqN(obj).find("VAR[name=thumb_title]").text().replace("|", "<br/>"));
				}
				  
			});
		},
		  
		complete : function(XMLHttpRequest, textStatus) {
			if(textStatus=='success' && typeof(callback)=='function') callback();
		}
	});
}

/**
* onload: tween propogation (tie important tweens to relavent elements)
* 
* @returns void
*/
var tweens_init = function() {

	
	//ribbon tween
	rbn_obj = jqN("#ribbon-ad"); 
	rbn_mask_close = new Tween(rbn_obj.get(0).style, 'width', Tween.strongEaseOut,947,0,window.speed,'px');
	rbn_mask_close.onMotionStarted = function(){ 
		if(window.closeRibbon!==false){ 
			btn_cycle(1); 
			clearTimeout(window.closeRibbon); 
		} 
		window.closeRibbon = false; 
	};
	rbn_mask_close.onMotionFinished = function(){  jqN(rbn_obj).css("display","none");  };
	
	rbn_mask_open = new Tween(rbn_obj.get(0).style, 'width', Tween.strongEaseOut,0,947,window.speed,'px');
	rbn_mask_open.onMotionStarted = function(){ jqN(rbn_obj).css("display","block"); };
	

	//load tween
	lm_obj = jqN("#load-mask"); 
	load_mask = new OpacityTween(lm_obj.get(0),Tween.strongEaseOut,100,0,1);
	load_mask.onMotionFinished = function(){ 
		jqN(lm_obj).css("display","none"); 
		window.closeRibbon = setTimeout(function(){
			rbn_mask_close.start();
		},4000);
	};
	
	//Active Mark move Tween
	activeMark_mc = document.getElementById('active-mark');
	activeMark_t  = new Tween(activeMark_mc.style,'top', Tween.strongEaseOut ,parseInt(activeMark_mc.style.top),'',0.5,'px');

	/* asset tweens */
	assetTweens = new Array();
	jqN("#slideshowest.module .slide img, #slideshowest.module #active-mark img").each(function(i, obj){
		var item = jqN(obj).get(0);
		assetTweens[item.id] = new OpacityTween(item,Tween.strongEaseOut,0,100,window.speed);
	});
	
	/* color tweens */
	colorTweens = new Array(); 
	jqN("#slideshowest, #slides-bg, #ad-space-bar").each(function(i, obj){
		var item = jqN(obj).get(0);
		colorTweens[item.id] = new ColorTween(item.style, 'backgroundColor', Tween.strongEaseOut,'','',window.speed);
	});
	description_mc = jqN("#slide-txt-bg").get(0);
	desc_tween = new ColorTween(description_mc.style, 'backgroundColor', Tween.strongEaseOut,'','',window.speed);
	

	/* blade tweens */
	blades = new Parallel();
	var bladeTweens = new Array();
	jqN("#slideshowest .color-blades span").each(function(i, obj){
		var item = jqN(obj).get(0);
		bladeTweens[i] = new Tween(item.style ,'width', Tween.strongEaseOut ,0,41, window.speed + 0.25 ,'px');
		blades.addChild(bladeTweens[i]);
	});
	
	/* text tweens 
	textNodes = new Parallel(); 
	var textTweens = new Array();
	jqN("#slideshowest h2, #slideshowest .meta div:not(.bg)").each(function(i, obj){
		var item = jqN(obj).get(0);
		var str  = jqN(obj).html().toString()+" ";
		
		textTweens[i] = new Tween(new Object(), 'xyz', Tween.strongEaseOut, 0, str.length, 2.5);
		textTweens[i].onMotionChanged = function(e){  jqN(obj).html( str.substr(0, e.target._pos) ); }; //backwards: .substr(-e.target._pos)
		
		textNodes.addChild(textTweens[i]);
	}); */
};

var btn_timer; 
var btn_count; 
/**
 * btn_cycle: timed event incurrence trigger  
 * - cycles through slides when non-mouseover state exists
 * 
 * @param btn_num
 * @returns void
 */
var btn_cycle = function (btn_num) {
    
    if (btn_num != null) {
        clearTimeout(btn_timer);
        btn_count = Number(btn_num);

    }
    else {
        btn_count++;
        if (btn_count > window.btn_max) btn_count = 1;
        if (btn_count > 4) {
            for (var li = 0; li < btn_count - 4; li++) {
                var rd = li + 1;
                jqN(ss_m).find("#li-" + rd).css({ display: "none" });
                jqN(ss_m).find("#li-" + btn_count).css({ display: "block" });
            }
        }
        else {

            for (var i = 1; i <= 4; i++) {
                jqN(ss_m).find("#li-" + i).css({ display: "block" });
            }
            for (var j = 0; j < window.btn_max - 4; j++) {
                var rd = j + 5;
                jqN(ss_m).find("#li-" + rd).css({ display: "none" });
            }

        }
        jqN("#button-" + btn_count).triggerHandler("mouseover");
    }
    btn_timer = setTimeout("btn_cycle(" + null + ")", 5000);
};

/**
* mouseover handler (activate tweens and all color & copy transitions)
* 
* @returns void
*/
var button_hover = function () {

    var btn_id = jqN(this).attr("id");
    var actv_id = jqN("#buttons .active").attr("id");

    if (btn_id != actv_id) {

        if (typeof (actv_id) == "undefined") {
            actv_id = "button-1";
            jqN(this).addClass('active');
        }


        var btn_clr = window.schemeObj[btn_id].color;
        var actv_clr = window.schemeObj[actv_id].color;

        var slideCur_id = actv_id.replace("button", "slide");
        var slideNew_id = btn_id.replace("button", "slide");
        var arrowCur_id = "mark-" + actv_clr;
        var arrowNew_id = "mark-" + btn_clr;

        jqN("#slideshowest .color-blades span:not(#cb1) , #slide-thumb-bg , #buttons ul").css("background-color", "#" + window.schemeObj.colors[btn_clr].main);

        /* move active mark */
        var pa = jqN(this).closest("li");
        var btnpos = jqN(pa).position();
        x = Math.round(btnpos.top) + 15;
        activeMark_t.continueTo(x, window.speed);

        /* color settings */
        colorTweens['slides-bg'].fromColor = colorTweens['ad-space-bar'].fromColor = rgb2hex(jqN("#buttons .active").css("background-color"));
        colorTweens['slides-bg'].toColor = colorTweens['ad-space-bar'].toColor = window.schemeObj.colors[btn_clr].dark;

        colorTweens['slideshowest'].fromColor = rgb2hex(jqN("#slideshowest").css("background-color"));
        colorTweens['slideshowest'].toColor = window.schemeObj.colors[btn_clr].main;

        desc_tween.fromColor = window.schemeObj.colors[actv_clr].meta;
        desc_tween.toColor = window.schemeObj.colors[btn_clr].meta;
        //ct.func = eval("Tween.strongEaseOut");

        var cts = new Parallel();
        /* transition color */
        cts.addChild(colorTweens['slides-bg']);
        cts.addChild(colorTweens['slideshowest']);
        cts.addChild(colorTweens['ad-space-bar']);
        cts.addChild(desc_tween);
        /* transition assets */
        cts.addChild(assetTweens[arrowNew_id]);
        /* blades */
        cts.addChild(blades);

        /* listeners */
        cts.onMotionStarted = function () {
            jqN("#" + actv_id).removeClass("active");
            jqN("#" + btn_id).addClass("active").css("background-color", "#" + window.schemeObj.colors[btn_clr].dark);
            jqN("#buttons a:not(#" + btn_id + ")").css("background-color", "#" + window.schemeObj.colors[btn_clr].darkest);

            jqN(ss_m).find("#spotlight-hdr , #spotlight-more , .meta #tune-in , .related-links a span, #spotlight-on-nbc a").css("color", "#" + window.schemeObj.colors[btn_clr].hi_lt);
            jqN("#spotlight-on-nbc img").css({ "border-color": "#" + window.schemeObj.colors[btn_clr].hi_lt });
            //.global-border, #nbc-content a img

            jqN(ss_m).find(".slide img:not(#" + slideNew_id + ", #" + slideCur_id + "), #active-mark img:not(#" + arrowNew_id + ", #" + arrowCur_id + ")").css({ "display": "none" });

            //image transition
            assetTweens[slideNew_id].start();
            //text animate: textNodes.start();

            jqN(ss_m).find("#" + slideNew_id + ", #" + arrowNew_id).css({ display: "block", "z-index": "auto" });
            jqN(ss_m).find(".slide img:not(#" + slideNew_id + "), #active-mark img:not(#" + arrowNew_id + ")").css({ "z-index": "auto" });

            //copy changes
            jqN(ss_m).find("h2").html(window.schemeObj[btn_id].h2);
            jqN(ss_m).find(".meta #tune-in").html(window.schemeObj[btn_id].tune_in);
            jqN(ss_m).find(".meta #slide-txt").html(window.schemeObj[btn_id].description);

            //related links
            jqN("#slideshowest.module .related-links").html("");

            var link_list = window.schemeObj[btn_id].links;
           
            for (var x = 0; x < 3; x++) {
                if (typeof (link_list[x]) != "undefined") {
                    link_render(link_list[x]);
                }
            }
        };
        cts.start();
    }
};

/**
 * link_render: updates related links in the bottom left corner
 * 
 * @param linkObj
 * @returns void
 */
function link_render(linkObj) {
   	jqN("#slideshowest.module .related-links").append("<a href='"+ linkObj.href +"' target='_"+ linkObj.target +"' style='background-image:url("+ linkObj.icon +")'><span style='color:#"+ linkObj.color +"'>"+ linkObj.prefix +"</span> "+ linkObj.text +"</a>");
}

/**
 * Convert RGB to HEX if needed 
 * 
 * @param color
 * @returns (Hexidecimal color Code)
 */
function rgb2hex(color) {
	 rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	 function hex(x) {
		 return ("0" + parseInt(x).toString(16)).slice(-2);
	 }
	 return (rgb===null)? color.replace("#","") : hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/*  just in case:
	var t;  jqN("#buttons li a").mouseover(function(){  var btnObj = jqN(this);  clearTimeout(t);  t = setTimeout(function(){ button_hover(btnObj); }, 200); });
*/





/**
 * INITIATE #slideshowest PROMOTE
 */
window.speed = 0.75;  

tweens_init();

ss_m = jqN("#slideshowest.module"); 

jqN("#buttons li a").bind("mouseover", button_hover);
jqN("#slideshowest #ribbon-ad .ribbon-close").click(function(){
	rbn_mask_close.start();
});

slide_import(function(){
	jqN("#slides-bg").css("visibility","visible");
	jqN("#button-1").triggerHandler("mouseover");
	
	setTimeout("load_mask.start()", 500);
});

jqN("#buttons li a").hover(function(){ clearTimeout(btn_timer); }, function(){ 
	//reset button cycle
	btn_cycle(jqN(this).attr("id").replace("button-",""));
});

var btn_next = 0;
jqN("#upselect").css("cursor", "pointer").click(function () {
    clearTimeout(btn_timer);

    var actv_id = jqN("#buttons .active").attr("id");   
    var actv_Next = parseInt(actv_id.replace("button-", "")) + 1;

    if (actv_Next > window.btn_max) actv_Next = 1;
    if (actv_Next > 4) {
        for (var li = 0; li < actv_Next - 4; li++) {
                var rd = li + 1;
                jqN(ss_m).find("#li-" + rd).css({ display: "none" });
                jqN(ss_m).find("#li-" + actv_Next).css({ display: "block" });
            }
        }
        else {

            for (var i = 1; i <= 4; i++) {
                jqN(ss_m).find("#li-" + i).css({ display: "block" });
            }
            for (var j = 0; j < window.btn_max - 4; j++) {
                var rd = j + 5;
                jqN(ss_m).find("#li-" + rd).css({ display: "none" });
            }

        }
        jqN("#button-" + actv_Next).triggerHandler("mouseover");

        btn_timer = setTimeout("btn_cycle(" + null + ")", 5000);

    });

jqN("#downselect").css("cursor", "pointer").click(function () {
        clearTimeout(btn_timer);
    var actv_id = jqN("#buttons .active").attr("id");
    var actv_Pre = parseInt(actv_id.replace("button-", ""));
    if (actv_Pre > 1) {
        actv_Pre--
    }
    if (actv_Pre > 4) {
        for (var li = 0; li < actv_Pre - 4; li++) {
            var rd = li + 1;
            jqN(ss_m).find("#li-" + rd).css({ display: "none" });
            jqN(ss_m).find("#li-" + actv_Pre).css({ display: "block" });
        }
    }
    else {

        for (var i = 1; i <= 4; i++) {
            jqN(ss_m).find("#li-" + i).css({ display: "block" });
        }
        for (var j = 0; j < window.btn_max - 4; j++) {
            var rd = j + 5;
            jqN(ss_m).find("#li-" + rd).css({ display: "none" });
        }

    }
    jqN("#button-" + actv_Pre).triggerHandler("mouseover");
    btn_timer = setTimeout("btn_cycle(" + null + ")", 5000);
});