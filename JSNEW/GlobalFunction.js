﻿var sTimeCache = 14400;
var _d = (new Date()).getTime()+ sTimeCache;


function UpdateListingListRV(mode,id){
	var tpl = $.template("<a href='javascript:void(0);' class='LinkSaveProperty' onclick='UpdateListingListRV(${mode},${listingid})'>${text}</a>"); 
	var url = pathClientAjax+"handler/Misc.aspx@act=udslstrv&mode="+ encodeURI(mode) +"&id="+ encodeURI(id);
	$.get(url, {},
	function (data) {
	    if (mode == 0) {
	        if (CheckLoginStatus()) {
	            alert("Ðã thêm BĐS này vào danh sách Bất động sản bạn yêu thích.");
            }
	        else {
	            alert("BĐS này chỉ được lưu tạm thời, để lưu vĩnh viễn xin vui lòng đăng nhập tài khoản");
             }
	        
	        $("#spMyShortListLink_" + id).html(tpl, { mode: "1", listingid: id, text: "Xóa khỏi danh sách" });
	    } else {
	        alert("Ðã xóa khỏi danh sách Bất động sản bạn yêu thích.");
	        $("#spMyShortListLink_" + id).html(tpl, { mode: "0", listingid: id, text: "Lưu BĐS" });
	    }
	    nvgData.DemSoBdsDaLuu();
	});
}
function UpdateListingHistory(mode,id){
	//var tpl = $.template("<a href='javascript:void(0);' class='LinkSaveProperty' onclick='UpdateListingListRV(${mode},${listingid})'>${text}</a>"); 
	var url = pathClientAjax+"handler/Misc.aspx@act=rmvhis&mode="+ encodeURI(mode) +"&id="+ encodeURI(id);
	$.get(url, {},
		function(data){
			window.location.replace(pathClient+"myshortlist.aspx@saved=1");
		}
	);
}
function mjDrawLbPageNew(TotalPages_, CurrentPage_, ElementID_,sGotoPageFunction)
{_CPAGE=CurrentPage_;
if(_CPAGE>TotalPages_)
	_CPAGE=TotalPages_;
_START_PAGE = 1;
_END_PAGE = 1 + (_PART_PAGES - 1);
if(TotalPages_ < _PART_PAGES){_END_PAGE = TotalPages_;}
else
{
	if(CurrentPage_ >= _END_PAGE)
	{
		_START_PAGE += 8;
		if((_END_PAGE + 8) < TotalPages_){_END_PAGE += 8;}
		else{_END_PAGE = TotalPages_;}
		while(CurrentPage_ >= _END_PAGE && CurrentPage_ < TotalPages_)
		{
			_START_PAGE = _END_PAGE - 1;
			if((TotalPages_ - _END_PAGE) < _PART_PAGES){
				if(TotalPages_ - _START_PAGE <= _PART_PAGES)
				{
					_END_PAGE = TotalPages_;
					if((_END_PAGE - _START_PAGE) == _PART_PAGES)
					{_END_PAGE = _START_PAGE + (_PART_PAGES - 1);}
				}
				else{_END_PAGE = _START_PAGE + _PART_PAGES - 1;}
			}
			else{_END_PAGE = _START_PAGE + _PART_PAGES - 1;}
		}
	}
	if(CurrentPage_ == TotalPages_){
		_END_PAGE = TotalPages_;_START_PAGE = parseInt(TotalPages_/8)*8 - 1; 
		if(_START_PAGE > _END_PAGE) _START_PAGE = _START_PAGE - 8;}
};
var theme = "";
//phan chia dau/truoc/tiep/cuoi
var next;
var pre;
if(CurrentPage_==1)
	pre=1;
else pre=CurrentPage_-1;
if(CurrentPage_==TotalPages_)
	next=TotalPages_;
else next=parseInt(CurrentPage_)+1;

theme+= "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>";
theme+= "<td valign=\"middle\"><a href='javascript:"+sGotoPageFunction+"("+ pre +")' ><span class=\"PreNumberpages\"></span></a></td>";
theme+=" <td valign=\"middle\" class=\"Numbers pad_l3\">";
for( var k = _START_PAGE; k <= _END_PAGE; k++){
	if(CurrentPage_ != k)theme+= "<a class=\"LinkNumbers\" href='javascript:"+sGotoPageFunction+"("+ (k) +")' >"+ (k) +"</a>";
	else 
	theme+= "<a class=\"LinkNumbers\" ><font color='red'><b>"+ (k) +"</b></font></a>";
}
theme+= " </td><td valign=\"middle\" class=\"pad_l3\"><a href='javascript:"+sGotoPageFunction+"("+ next +")' ><span class=\"NextNumberpages\"></span></a>";
theme+= "</td></tr></table>";
if (TotalPages_>1) {
	$('#'+ElementID_).show();
	$('#'+ElementID_).html(theme);
	}

}

function PriceItemClick(mode, price, type, id){	
	var vnd = parseFloat($("#hPrcVnd").val());
	var SJC = parseFloat($("#hPrcJsc").val());
	var usd = parseFloat($("#hPrcUsd").val());
	
	var tpl = "~ [%price%] [%unit%] [%m2%]";
	var mText = "";
	var m2 = "";
	var fPrice = 0;
	var prc = 0;
	prc = parseFloat(price);
	fPrice = prc;	
	switch(mode) {
	case 1:{		
		mText = "Lượng SJC";
// 		Element.setInnerHTML("dvSJC"+id,"<font color='#ff6600'>SJC</font>");
// 		Element.setInnerHTML("dvVND"+id,"VND");
// 		Element.setInnerHTML("dvUSD"+id,"USD");		
		$('#dvVND').html("<font color='#ff6600'>VND</font>");
		$('#dvUSD').html("USD");
		$('#dvSJC').html("SJC");	
		switch(type) {
		case 0:
		case 1:{
			fPrice = prc*1000000*SJC/vnd;
			break;			
		}
		case 4:
		case 5:{
			fPrice = prc*SJC;
			break;
		}		
		}
		break;	
	}
	case 2:{			
// 		Element.setInnerHTML("dvUSD"+id,"<font color='#ff6600'>USD</font>");
// 		Element.setInnerHTML("dvVND"+id,"VND");
// 		Element.setInnerHTML("dvSJC"+id,"SJC");	
		$('#dvVND').html("<font color='#ff6600'>VND</font>");
		$('#dvUSD').html("USD");
		$('#dvSJC').html("SJC");
		mText = "USD";	
		switch(type) {
		case 0:
		case 1:{
			fPrice = prc*1000000/vnd;
			break;			
		}
		case 2:
		case 3:{
			fPrice = prc/SJC;
			break;
		}		
		}
		break;		
	}
	default:
	{
		//VND, DO NOT CHANGE
		mText = "Triệu";
// 		Element.setInnerHTML("dvVND"+id,"<font color='#ff6600'>VND</font>");
// 		Element.setInnerHTML("dvUSD"+id,"USD");
// 		Element.setInnerHTML("dvSJC"+id,"SJC");
		$('#dvVND').html("<font color='#ff6600'>VND</font>");
		$('#dvUSD').html("USD");
		$('#dvSJC').html("SJC");
		
		switch(type) {		
		case 2://SJC
		case 3:{
			fPrice = prc*vnd/SJC/1000000;
			break;
		}
		case 4://USD
		case 5:{			
			fPrice = prc*vnd/1000000;
			break;
		}
		}
		break;	
	}
	}
	fPrice = Math.round(fPrice*Math.pow(10,2))/Math.pow(10,2);	
	if(parseInt(type)%2 == 0) m2 = '../../m_3Csup>2</sup>';
		//Element.setInnerHTML("dvShowPrice"+id, new Template(tpl,scriptSyntax).evaluate({price:fPrice, unit:mText, m2:m2}));	
		$('#dvShowPrice'+id).html(new Template(tpl,scriptSyntax).evaluate({price:fPrice, unit:mText, m2:m2}));
}
/*
function mjNumberFormat(num){
	return num;	
}

function showInfo(div, message){
	Element.show("msg");
	Element.show(div);
	Element.setInnerHTML(div, message);		
}
function hideInfo(div){
	Element.hide("msg");
	Element.hide(div);
	Element.setInnerHTML(div, "");
}
*/

//enter key press
function EnterKeyPress(event)
{
	if (event.keyCode==13) {
		document.getElementById("button1").click();
	}
}
//enter key press
function FindAgentEnterKeyPress(event)
{
	if (event.keyCode==13) {
		document.getElementById("btnFindAgent").click();
	}
}
/*********load cac combo box phuong/duong/duan***********/
function Change_State_Suburb(loai,s,select)
{
	if($('#PhLeftQuickFind1_sltQuan').value!="")
	{		
		XoaSelect(select,"Loading...");
		var url=pathClientAjax+"handler/handler.aspx@act="+loai+"&sbid="+s+"&d="+(new Date()).getTime();		
		$.get(url, 
			function(data) {
				
				var lcNodes     = data.getElementsByTagName("*")[0].childNodes;				
				if(lcNodes.length > 0)
				{									
					try
					{
						var obj_select = document.getElementById(select);
						document.getElementById(select).disabled = false;
 						for(var i_=obj_select.length-1; i_>=0; i_--)
 							obj_select.options[i_] = null;
						for(var k = 0; k < lcNodes.length; k++)
						{
							var options_length = obj_select.length;														
							var option_value = lcNodes[k].childNodes[0].childNodes[0].nodeValue;
							var option_text  = lcNodes[k].childNodes[1].childNodes[0].nodeValue;
							obj_select.options[options_length] = new Option(option_text,option_value);
						}
					}catch(e){
						//alert(e);
					}
				}
				document.getElementById(select).disabled=false;
			}
		);
	}
}
function Change_State_Suburb_common(loai,s,select)
{
	
	XoaSelect(select,"Loading...");
	var url=pathClientAjax+"handler/handler.aspx@act="+loai+"&sbid="+s+"&d="+(new Date()).getTime();		
	$.get(url, 
			function(data) {
				
			var lcNodes     = data.getElementsByTagName("*")[0].childNodes;		
				if(lcNodes.length > 0)
				{									
					try
					{
						var obj_select = document.getElementById(select);
						document.getElementById(select).disabled = false;
 						for(var i_=obj_select.length-1; i_>=0; i_--)
 							obj_select.options[i_] = null;
						for(var k = 0; k < lcNodes.length; k++)
						{
							var options_length = obj_select.length;														
							var option_value = lcNodes[k].childNodes[0].childNodes[0].nodeValue;
							var option_text  = lcNodes[k].childNodes[1].childNodes[0].nodeValue;
							obj_select.options[options_length] = new Option(option_text,option_value);
							
						}
					}catch(e){
						//alert(e);					
					}
				}
				document.getElementById(select).disabled=false;
			}
		);
}
function Change_State_Suburb_selected(loai,s,select,_valueID)
{
	if(s!="")
	{
		XoaSelect(select,"Loading...");
		var url=pathClientAjax+"handler/handler.aspx@act="+loai+"&sbid="+s+"&d="+(new Date()).getTime();		
		$.get(url, 
			function(data) {
				var lcNodes     = data.getElementsByTagName("*")[0].childNodes;					
				if(lcNodes.length > 0)
				{									
					try
					{
						var obj_select = document.getElementById(select);
						document.getElementById(select).disabled = false;
 						for(var i_=obj_select.length-1; i_>=0; i_--)
 							obj_select.options[i_] = null;
						for(var k = 0; k < lcNodes.length; k++)
						{
							var options_length = obj_select.length;														
							var option_value = lcNodes[k].childNodes[0].childNodes[0].nodeValue;
							var option_text  = lcNodes[k].childNodes[1].childNodes[0].nodeValue;
							obj_select.options[options_length] = new Option(option_text,option_value);						
						}
						document.getElementById(select).value=_valueID;
					}catch(e){
						//alert(e);					
					}
				}
				document.getElementById(select).disabled=false;
			}
		);
	}
}
function LayDuAnTheoQuanHuyen(id,select)
{
	if(id!="")
	{
		XoaSelect(select,"Loading...");	
		var url=pathClientAjax+"handler/handler.aspx@act=ldatqh&id="+id+"&d="+(new Date()).getTime();
		$.get(url, 
			function(data) {
				var lcNodes     = data.getElementsByTagName("*")[0].childNodes;		
				if(lcNodes.length>0)
				{					
					var obj_select = document.getElementById(select);					
					
					document.getElementById(select).disabled = false;
 					for(var i_=obj_select.length-1; i_>=0; i_--)					
 						obj_select.options[i_] = null;					
					for(var k = 0; k < lcNodes.length; k++)
					{									
						var options_length = obj_select.length;
						var option_value = lcNodes[k].childNodes[0];
						var option_text  = lcNodes[k].childNodes[1];						
						obj_select.options[options_length] = new Option(option_text.childNodes[0].nodeValue,option_value.childNodes[0].nodeValue);
					}
				}
				document.getElementById(select).disabled=false;			
			}
		);
	}

}
function LayDuAnTheoQuanHuyen_selected(id,select,_valueID)
{
	if(id!="")
	{
		XoaSelect(select,"Loading...");	
		var url=pathClientAjax+"handler/handler.aspx@act=ldatqh&id="+id+"&d="+(new Date()).getTime();
		
		$.get(url, 
			function(data) {
				var lcNodes     = data.getElementsByTagName("*")[0].childNodes;		
				if(lcNodes.length>0)
				{					
					var obj_select = document.getElementById(select);					
					
					document.getElementById(select).disabled = false;
 					for(var i_=obj_select.length-1; i_>=0; i_--)					
 						obj_select.options[i_] = null;					
					for(var k = 0; k < lcNodes.length; k++)
					{									
						var options_length = obj_select.length;
						var option_value = lcNodes[k].childNodes[0];
						var option_text  = lcNodes[k].childNodes[1];						
						obj_select.options[options_length] = new Option(option_text.childNodes[0].nodeValue,option_value.childNodes[0].nodeValue);
					}
					document.getElementById(select).value=_valueID;
				}							
				document.getElementById(select).disabled=false;
			}
		);
	}

}
function LayMGTheoQuanHuyen(id,select)
{
	if(id!="")
	{
		XoaSelect(select,"Loading...");	
		var url=pathClientAjax+"handler/handler.aspx@act=lmgtqh&id="+id+"&d="+(new Date()).getTime();
		$.get(url, 
			function(data) {
				var lcNodes     = data.getElementsByTagName("*")[0].childNodes;		
				if(lcNodes.length>0)
				{					
					var obj_select = document.getElementById(select);					
					
					$(select).disabled = false;
 					for(var i_=obj_select.length-1; i_>=0; i_--)					
 						obj_select.options[i_] = null;					
					for(var k = 0; k < lcNodes.length; k++)
					{									
						var options_length = obj_select.length;
						var option_value = lcNodes[k].childNodes[0];
						var option_text  = lcNodes[k].childNodes[1];						
						obj_select.options[options_length] = new Option(option_text.childNodes[0].nodeValue,option_value.childNodes[0].nodeValue);
					}
				}
				document.getElementById(select).disabled=false;
			}
		);	
	}

}
function XoaSelect(select,initText)
{
	document.getElementById(select).disabled = true;		
	for(var i_=document.getElementById(select).length-1; i_>=0; i_--)	
		document.getElementById(select).options[i_] = null;	
	document.getElementById(select).options[0] = new Option(initText,"");	
}
/**********end load combo*********/

function makeJsonTypeFromUrl(s)
{
	var ar  =s.split('&');
	
	/*
	var ss={};
	for(var t =0;t<ar.length;t++)
	{
		var ss1 = ar[t].split('=')[0];
		var ss2 = ar[t].split('=')[1];
		//ss[t].ss1 =  "'"+ss1 + "':'" + ss2 + "'";
		ss.push("asdsd");
	}	
	*/	
	
	var ss='{';
	for(var t =0;t<ar.length;t++)
	{
		var ss1 = ar[t].split('=')[0];
		var ss2 = ar[t].split('=')[1];
		ss += '"'+ss1 + '":"' + ss2 + '",';
	}
	ss = ss.substring(0,ss.length-1);
	ss+='}';
	return ss;	
}

function getEstateURLRewriteListForPageIndex(type__,pIndex)
{
		var sLnk="";
		
		if(type__.indexOf("ssuburb")!=-1)
		{
			type = type__.split('&')[2].split('=')[1];
		}
		else if(type__.indexOf("sstate")!=-1)
		{
			type = type__.split('&')[1].split('=')[1];
		}
		else
		{
			type = type__.split('=')[1];
		}
		
		if(type=="0")
		{
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/khuthuongmai/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/khuthuongmai/";
			}
		}
		if(type=="1")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/chungcucaocap/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/chungcucaocap/";
			}
		}
		if(type=="2")
		{
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/caoocvanphong/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/caoocvanphong/";
			}
		}
		if(type=="3")
		{
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/biethu/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/biethu/";
			}
		}
		if(type=="4")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/nhapho/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/nhapho/";
			}
		}
		if(type=="5")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/khucongnghiep/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/khucongnghiep/";
			}
		}
		if(type=="6")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/khudancu/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/khudancu/";
			}
		}
		if(type=="8")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/khachsan/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/khachsan/";
			}
		}
		if(type=="9")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/resort_dulich/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/resort_dulich/";
			}
		}
		if(type=="10")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/bdskhac/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/bdskhac/";
			}
		}
		if(type=="11")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/datphanlo/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/datphanlo/";
			}
		}
		if(type=="12")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/taidinhcu/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/taidinhcu/";
			}
		}
		if(type=="21")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/sangolf/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/sangolf/";
			}
		}
		if(type=="22")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/khukebien/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/khukebien/";
			}
		}
		if(type=="23")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/gansongho/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/gansongho/";
			}
		}
		if(type=="24")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/Penhouses/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/Penhouses/";
			}
		}
		if(type=="25")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/khuchuyengia/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/khuchuyengia/";
			}
		}
		if(type=="26")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/khutrungtam/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/khutrungtam/";
			}
		}
		if(type=="27")
		{	
			if(pIndex!="1" && pIndex!="")
			{
				sLnk = "duan/dothimoi/p"+pIndex+"../../default.htm";
			}
			else
			{
				sLnk = "duan/dothimoi/";
			}
		}
		return pathClient + sLnk;
}
function getEstateURLRewriteForSearchPageIndexNoName(type__,pIndex,mStateName,mSurburbName)
{
	var sLnk="";
	
	if(mSurburbName!="")
	{
		mSurburbName = "../../"+mSurburbName;
	}
	
	if(type__.indexOf("ssuburb")!=-1)
	{
		type = type__.split('&')[2].split('=')[1];
	}
	else if(type__.indexOf("sstate")!=-1)
	{
		type = type__.split('&')[1].split('=')[1];
	}
	else
	{
		type = type__.split('=')[1];
	}
		
	if(type=="0")
	{
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/khuthuongmai/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/khuthuongmai/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="1")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/chungcucaocap/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/chungcucaocap/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="2")
	{
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/caoocvanphong/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/caoocvanphong/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="3")
	{
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/biethu/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/biethu/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="4")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/nhapho/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/nhapho/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="5")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/khucongnghiep/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/khucongnghiep/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="6")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/khudancu/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/khudancu/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="8")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/khachsan/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/khachsan/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="9")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/resort_dulich/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/resort_dulich/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="10")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/bdskhac/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/bdskhac/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="11")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/datphanlo/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/datphanlo/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="12")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/taidinhcu/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/taidinhcu/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="21")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/sangolf/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/sangolf/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="22")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/khukebien/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/khukebien/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="23")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/gansongho/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/gansongho/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="24")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/Penhouses/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/Penhouses/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="25")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/khuchuyengia/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/khuchuyengia/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="26")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/khutrungtam/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/khutrungtam/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	if(type=="27")
	{	
		if(pIndex!="1" && pIndex!="")
		{
			sLnk = "duan/dothimoi/"+mStateName+mSurburbName+"/p"+pIndex+"../../default.htm";
		}
		else
		{
			sLnk = "duan/dothimoi/"+mStateName+mSurburbName+"../../default.htm";
		}
	}
	return pathClient + sLnk;
}
function getLawDocURLRewrite(pIndex)
{

	if(pIndex!="1" && pIndex!="")	
		vLawDocLink = "van_ban_luat_bat_dong_san/p"+pIndex+"../../default.htm";
	else
		vLawDocLink = "van_ban_luat_bat_dong_san/";
	return pathClient +vLawDocLink;
}
function getFormDocURLRewrite(pIndex)
{

	if(pIndex!="1" && pIndex!="")	
		vLawDocLink = "bieu_mau_bat_dong_san/p"+pIndex+"../../default.htm";
	else
		vLawDocLink = "bieu_mau_bat_dong_san/";
	return pathClient +vLawDocLink;
}
/* ket thuc */

//lay 1 so random tu 1 -> n
function getRnd(n)
{
	var rnd=Math.ceil(Math.random()*n);
	return rnd;
}

// function Send_Mail_VpMoigioi()
// {
// 	if($("txtName").value.blank()){alert("Chưa nhập Tên của bạn !");$("txtName").focus();return false;}
// 	if($("txtEmail").value.blank()){alert("Chưa nhập Email của bạn !");$("txtEmail").focus();return false;}
// 	if(!mjIsEmailvp($("txtEmail"))){alert("Email của bạn không đúng định dạng !");$("txtEmail").focus();return false;}
// 	if($("txtPhone").value.blank()||(!$("txtPhone").value.blank() && !CheckPhoneNumbervp($("txtPhone").value))){alert("Chưa nhập Số điện thoại của bạn !");$("txtPhone").focus();return false;}
// 	if($("txtSubject").value.blank()){alert("Chưa nhập chủ đề cần liên hệ!");$("txtSubject").focus();return false;}
// 	if($("Message").value.blank()){alert("Chưa nhập Nội dung bạn muốn gửi !");$("Message").focus();return false;}
// 	$("btnSendvpmg").disabled = false;			
// 	var act = "act=sendVpmg";
// 	var fto = "&to="+encodeURI($("hEmail").value);
// 	var fn = "&name="+encodeURI($("txtName").value);
// 	var ffrom = "&from="+encodeURI($("txtEmail").value);
// 	var ftel = "&phone="+encodeURI($("txtPhone").value);
// 	var ftitle = "&subject="+encodeURI($("txtSubject").value);
// 	var fbody = "&body="+encodeURI($("Message").value);
// 	var params = fto + ffrom + fn + ftel + ftitle +fbody;
// 	var url = pathClientAjax+"handler/Misc.aspx?"+ act + params +nocacheAjax();				
// 	new Ajax.Request(url, {   
// 		method: 'get',					
// 		onSuccess: function(transport) {
// 			if (transport.responseText == "")
// 			{ 
// 				alert("Thư của bạn đã được gửi thành công!");
// 			}
// 			else 
// 			{	
// 				alert("Có lỗi xảy ra trong lúc gửi. Xin mời bạn thử lại sau !");
// 				$("btnSendvpmg").disabled = true;				
// 			}
// 		},
// 		onFailure: function(e){ alert(e.responseText); $("btnSendvpmg").disabled = true;}
// 		}
// 	)		
// 	
// }
function CheckPhoneNumbervp(phoneNumber)
{
	var phoneRegex = /^(\d{7}|\d{8}|\d{9}|\d{10}|\d{11}|\d{12}|\d{13}|\d{14})$/;
	if( !phoneNumber.match( phoneRegex ) ) return false;
	return true;
}
function mjIsEmailvp(obj){
	var mailRegxp =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;			
	if(obj)
		return mailRegxp.test(obj.value);
	else
		return true;
}


function saveSearchClick(condi){
	var act = "act=savs";
	var url = pathClientAjax+"handler/Misc.aspx?"+act;
	$.post(url, {condi:condi},
		function(data){
			if(data=="0") Signin();
			else alert(data);
	});
}

/* cac ham cua ds bds */
function doiDuLieu(sPre, kieu_, _loai, vle)
{
	var qs = location.search;
	var vQuery = qs.replace('?','');
	if(qs.indexOf("?")==-1) vQuery=$('#idQs').val();

	if (vQuery.indexOf(_loai) != -1) {
	    var ar = vQuery.split('&');
	    for (var t = 0; t < ar.length; t++) {
	        var ss1 = ar[t].split('=')[0];
	        var ss2 = ar[t].split('=')[1];

	        if (ss1 == "pindex" && vQuery.indexOf("maxpg") != -1)
	            vQuery = vQuery.replace(ss1 + "=" + ss2, ss1 + "=1");
	        if (ss1 == _loai) {
	            vQuery = vQuery.replace(ss1 + "=" + ss2, ss1 + "=" + vle);
	        }
	    }
	}
 	else {
//if (vle != "") {
// 	    // dac tinh quang cao va sap xep chi dc 1 trong 2 xuat hien        	    
// 	    if (vQuery.indexOf("&orderby=") != -1 && _loai == "dtqc") vQuery = vQuery.replace("&orderby=" + $('#' + _ctrRes + 'hdOderBy').val(), "&dtqc=2");
// 	    else if (vQuery.indexOf("&dtqc=") != -1 && _loai == "orderby") vQuery = vQuery.replace("&dtqc=2", "&orderby=" + vle);
	    vQuery = vQuery + "&" + _loai + "=" + vle;
	}

	window.location= pathClient+ "ressearch.aspx?"+vQuery;
}
function doiDuLieuMyShortList(idCbo,_loai)
{
	var vle=$('#'+idCbo).val();	
	var qs = location.search;
	var vQuery = qs.replace('?','');
	if(qs.indexOf("?")==-1) vQuery=$('#idQs').val();
	
	if(vQuery.indexOf(_loai)!=-1)
	{
		var ar  =vQuery.split('&');	
		for(var t =0;t<ar.length;t++)
		{
			var ss1 = ar[t].split('=')[0];
			var ss2 = ar[t].split('=')[1];			
			
			if(ss1=="pindex"&&vQuery.indexOf("maxpg")!=-1)
 				vQuery=vQuery.replace(ss1+"="+ss2,ss1+"=1");
			if (ss1 == _loai)
			{
				vQuery=vQuery.replace(ss1+"="+ss2,ss1+"="+vle);
			}
		}
	}
	else if(vle!="") vQuery=vQuery+"&"+_loai+"="+vle;	
	window.location= pathClient+ "myshortlist.aspx?"+vQuery;
}
function SetLstSearch(ctk)
{
	var url = pathClientAjax+"handler/misc.aspx@act=setlstsch&d="+(new Date()).getTime();
	$.post(url, {ctk:ctk},
		function(data) {}
		);
}