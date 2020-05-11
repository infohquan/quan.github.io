var sTimeCache = 14400;
var _d = (new Date()).getTime()+ sTimeCache;

function gotoPage(pg){				
	mjLoadEstate(pg);		
}
function initEstate(){
	if(document.location.href.indexOf("#lstda")==-1)
 	{
		mjLoadEstate(1);
	}
}
var init = "default";
function mjLoadEstate(pg){
	//Element.show("loader");	
	$('loader').style.display='';
	//get search condition
	GetListSearchCondition();
	var act = "act=lstes&init="+init;
	//
	var status = "&status="
	$$("#input").each(
		function(e){
			if (e.id.indexOf("cke") != -1) {
				if (e.checked == true) {
					status += e.value + ",";
				}
			}			
		}
	);
	
//code moi cho url
	var vQueryURL=location.pathname.split('/');		
	
//end code moi	
	var vQuery = location.search.replace('?','&');	
	var h = $H(vQuery.toQueryParams());
	var att = "";
	h.each(
		function(e){
			if (e.key == "typeid")
				if(init=="default")
					att = "&att=" + e.value;
				else att = "&att=" + $("#sltEstateType").value;
			if (e.key == "oi")
				att = "&oi=" + e.value;
		}
	);
	if(vQuery=="")
	{
		att = mjGetTypeId(vQueryURL[vQueryURL.length-2]);
	}
	//	
	var page = "&maxpg=10&pindex="+(pg?pg:0);
	var search_text = ($("#cbState")?"&state="+$("#cbState").value:"")+($("#cbSuburb")?"&suburb="+$("#cbSuburb").value:"")+($("#txtName") ? "&name="+encodeURI($("#txtName").value):"");
	
	var url = pathClientAjax+"handler/Misc.aspx?"+ act + att + search_text + page +nocacheAjax();	

 	Element.setInnerHTML("listing", "");
  	Element.setInnerHTML("dvPaging", "");
  	Element.hide("dvPaging");
 
	new Ajax.Request(url, {
		method: 'get',
		onSuccess: function(transport) {
			//Element.hide("loader");
			$('loader').style.display='none';
			Element.setInnerHTML("listing", transport.responseText);			
			if (parseInt($("#hTotalRows").value) == -1) {
				Element.hide("dvSubtitle");	
			}else{
				Element.show("dvSubtitle");
				Element.setInnerHTML("spRs", $("#hTotalRows").value);
				var tps = (parseInt($("#hTotalRows").value)/(10) - parseInt(parseInt($("#hTotalRows").value)/(10)))>0?((parseInt(parseInt($("#hTotalRows").value)/(10)))+1):parseInt(parseInt($("#hTotalRows").value)/(10));			
				mjDrawLbPage(tps, $("#hCurrentPage").value, "dvPaging");
				addRSH("lstda"+(new Date()).getTime(),$("#main").innerHTML);
			}
			},
		onFailure: function(e){ alert(e.responseText);
		}
		}
	)		
}

function GetListSearchCondition()
{
	var search_text = ($("#cbState")?"&state="+$("#cbState").value:"")+($("#cbSuburb")?"&suburb="+$("#cbSuburb").value:"")+($("#sltEstateType")?"&estatetype="+$("#sltEstateType").value:"")+($("#txtName") ? "&name="+encodeURI($("#txtName").value):"");
	var url = pathClientAjax+"handler/Handler.aspx@act=getsearchcondition"+ search_text + nocacheAjax();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {				
			Element.setInnerHTML("dvSeachCondition", transport.responseText);						
			},
		onFailure: function(e){ alert(e.responseText);
		}}
	)		
}

function mjGetTypeId(typename)
{

	if( typename =="khuthuongmai")
	{
			if(init=="default"){
				att = "&att=0";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="chungcucaocap")
	{
			if(init=="default"){
				att = "&att=1";
			}
			else
			{
				 att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="caoocvanphong")
	{
			if(init=="default"){
				att = "&att=2";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="biethu")
	{
			if(init=="default"){
				att = "&att=3";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="nhapho")
	{
			if(init=="default"){
				att = "&att=4";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="khucongnghiep")
	{
			if(init=="default"){
				att = "&att=5";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="khudancu")
	{
			if(init=="default"){
				att = "&att=6";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
			
	}
	if( typename =="moidautu")
	{
			if(init=="default"){
				att = "&att=7";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="khachsan")
	{
			if(init=="default"){
				att = "&att=8";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="resort_dulich")
	{
			if(init=="default"){
				att = "&att=9";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="bdskhac")
	{
			if(init=="default"){
				att = "&att=10";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="datphanlo")
	{
			if(init=="default"){
				att = "&att=11";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
			
	}
	if( typename =="taidinhcu")
	{
			if(init=="default"){
				att = "&att=12";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="sangolf")
	{
			if(init=="default"){
				att = "&att=21";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="khukebien")
	{
			if(init=="default"){
				att = "&att=22";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="gansongho")
	{
			if(init=="default"){
				att = "&att=23";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="Penhouses")
	{
			if(init=="default"){
				att = "&att=24";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="khuchuyengia")
	{
			if(init=="default"){
				att = "&att=25";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="khutrungtam")
	{
			if(init=="default"){
				att = "&att=26";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	if( typename =="dothimoi")
	{
			if(init=="default"){
				att = "&att=27";
			}
			else
			{
				att = "&att=" + $("#sltEstateType").value;
			}
	}
	
	return att;
}

function searchClick(){
	init = "search";
	mjLoadEstate(1);
}
function searchEstateClick(_maxPage){
	var __query="att="+$('#sltEstateType').val()+"&sstate="+$('#cbState').val()+"&ssuburb="+$('#cbSuburb').val()+"&name="+nvgUtils.RemoveChar22($('#txtName').val())+"&pindex=1&mp="+_maxPage;
	
	window.location=pathClient+"estatelist.aspx?"+__query;
}
function initSuburb(){	
	if ($("#cbState") && $("#cbState").val() != "")
	{		
		do_GetSuburb('cbSuburb',$("#cbState").val(),'***','hdfSuburb');		
	}
}
function do_GetSuburb(suburb_obj_id, state_value, init_text,hdfsuburb){
	var u = pathClientAjax+"handler/StateGet.aspx@suburb=json&stateid="+ state_value;	
	
	for (var k = document.getElementById(suburb_obj_id).options.length-1; k > 0; k--)
		document.getElementById(suburb_obj_id).options[k] = null;
	if ($("#cbState").val() == "" ||$("#cbState").val()+"" =="undefined") return;
	document.getElementById(suburb_obj_id).options[0] = new Option("Loading...", "");
	$.post(u, {},
		function(data){				
			var obj = data.lst;
			var obj_select = document.getElementById(suburb_obj_id);
			if(obj.length > 0){	
				removeSelectbox(suburb_obj_id,"Chọn");
				for(var k = 0; k < obj.length; k++){
					var options_length = obj_select.length;
					var option_value = obj[k].s1;
					var option_text  = obj[k].s2;
					obj_select.options[options_length] = new Option(option_text,option_value);
				}
				obj_select.disabled = false;
			}
		},'json');
}

function GetQuickSuburb(state,estatetype)
{
	var act = "act=getSuburbByStateForEstate";
	var url = pathClientAjax+"handler/Handler.aspx?"+act+"&state="+state+"&typeid="+estatetype;	

	$.get(url, {},
		function(data){
			$("#lstEstateQuickLinks").html(data);
	});
}
function mjEstateInitKey13Press(e)
{
	var unicode=e.charCode? e.charCode : e.keyCode;	
	if (unicode == 13)
	{
		searchEstateClick(20);
	}
}

//Event.observe(window, "load", initEstate, false);
//Event.observe(window, 'load', initSuburb, false);
frm____func = "Estate";
//Event.observe(window, 'load', mjInitKey13Press, false);
//Event.observe(window, 'load', mjInitSelPress, false);
