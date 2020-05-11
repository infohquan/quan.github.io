//change tab

function ChangeTabTGKD(val)
{
	var tdTGKD = document.getElementById("tdTGKD");
	var a1 = document.getElementById("tabTGKD1");
	var a2 = document.getElementById("tabTGKD2");
	var a3 = document.getElementById("tabTGKD3");
	var a4 = document.getElementById("tabTGKD4");
	var a5 = document.getElementById("tabTGKD5");
	var a = document.getElementById("hplViewNext1");
	if ((val == 1 && a1.className == "Tab_1")||(val == 2 && a2.className == "Tab_1")||(val == 3 && a3.className == "Tab_1")||(val == 4 && a4.className == "Tab_1")||(val == 5 && a5.className == "Tab_1")) 
		return;
	//tdTGKD.background = "images/home/content_bg_header_2." + val + ".gif";
	tdTGKD.className = "tab" + val;
	if (val == "1")
	{
		a1.className = "Tab_1";
		a2.className = "Tab_2";
		a3.className = "Tab_2";
		a4.className = "Tab_2";
		a5.className = "Tab_2";
		
		document.getElementById("tblTG1").style.display = "inline";
		document.getElementById("tblTG2").style.display = "none";
		document.getElementById("tblTG3").style.display = "none";
		document.getElementById("tblTG4").style.display = "none";
		document.getElementById("tblTG5").style.display = "none";
	}
	else if (val == "2")
	{
		a1.className = "Tab_2";
		a2.className = "Tab_1";
		a3.className = "Tab_2";
		a4.className = "Tab_2";
		a5.className = "Tab_2";
		a.style.display = "inline";
		
		document.getElementById("tblTG1").style.display = "none";
		document.getElementById("tblTG2").style.display = "inline";
		document.getElementById("tblTG3").style.display = "none";
		document.getElementById("tblTG4").style.display = "none";
		document.getElementById("tblTG5").style.display = "none";
	}
	else if (val == "3")
	{
		a1.className = "Tab_2";
		a2.className = "Tab_2";
		a3.className = "Tab_1";
		a4.className = "Tab_2";
		a5.className = "Tab_2";
		a.style.display = "inline";
		
		document.getElementById("tblTG1").style.display = "none";
		document.getElementById("tblTG2").style.display = "none";
		document.getElementById("tblTG3").style.display = "inline";
		document.getElementById("tblTG4").style.display = "none";
		document.getElementById("tblTG5").style.display = "none";
	}
	else if (val == "4")
	{
		a1.className = "Tab_2";
		a2.className = "Tab_2";
		a3.className = "Tab_2";
		a4.className = "Tab_1";
		a5.className = "Tab_2";
		a.style.display = "inline";
		
		document.getElementById("tblTG1").style.display = "none";
		document.getElementById("tblTG2").style.display = "none";
		document.getElementById("tblTG3").style.display = "none";
		document.getElementById("tblTG4").style.display = "inline";
		document.getElementById("tblTG5").style.display = "none";
	}
	else
	{
		a1.className = "Tab_2";
		a2.className = "Tab_2";
		a3.className = "Tab_2";
		a4.className = "Tab_2";
		a5.className = "Tab_1";				
		a.style.display = "inline";
		
		document.getElementById("tblTG1").style.display = "none";
		document.getElementById("tblTG2").style.display = "none";
		document.getElementById("tblTG3").style.display = "none";
		document.getElementById("tblTG4").style.display = "none";
		document.getElementById("tblTG5").style.display = "inline";
	}
}



//
function embed_flash(swf_card, swf_width, swf_height, id){
	var str = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" ';
		if (swf_width != '') 
			str += 'WIDTH='+swf_width+' ';
		if(swf_height != '')
			str += 'HEIGHT='+swf_height+' ';
		str += 'id="'+id+'">';
		str += '<PARAM NAME=movie VALUE="'+swf_card+'">';
		str += '<PARAM NAME=quality VALUE=high>';
		str += '<PARAM NAME=wmode VALUE="Transparent">';
		str += '<PARAM NAME=bgcolor VALUE="">';
		str += '<PARAM NAME=menu VALUE=false>';
		str += '<EMBED style="CURSOR: hand" src="'+swf_card+'" quality=high ';
		if (swf_width != '') 
			str += 'WIDTH='+swf_width+' ';
		if(swf_height != '')
			str += 'HEIGHT='+swf_height+' ';
		str += 'bgcolor="" menu=false wmode=Transparent TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">';
		str += '</embed>';
		str += '</object>';
	document.write(str);
}

function OnCmdSubmitClick(LocationRequest, nameRad, Width, Height)
{
	var chasm = screen.availWidth;
	var mount = screen.availHeight;
	var bIsChecked = false;
	var r = document.getElementsByName(nameRad);
		for(i=0;i<r.length;i++)
		{
			if( r[i].checked )
			{
			window.open('/UserControls/Poll/default.aspx?results='+ r[i].value +'&LID='+LocationRequest,'Poll','left='+ (chasm - Width - 10)* .5+',top='+(mount - Height - 30)* .5+',width='+ Width +',height='+ Height +',toolbar=1,resizable=0');
			bIsChecked = true;
			break;
			}
		}
	if(!bIsChecked ) alert("Hãy chọn ít nhất một mục để bình chọn!");
	return bIsChecked;
}

function OnCmdViewClick(LocationRequest, Width, Height)
{
	var chasm = screen.availWidth;
	var mount = screen.availHeight;
	window.open('/UserControls/Poll/default.aspx?results=-1&LID='+LocationRequest,'Poll','locationbar=no,left='+ (chasm - Width - 10)* .5+',top='+(mount - Height - 30)* .5+',width='+ Width +',height='+ Height +',toolbar=1,resizable=0');
}
function openwin(lin) {
	
	window.open(lin, 'image');
}







/***********************************************
* Image w/ description tooltip- By Dynamic Web Coding (www.dyn-web.com)
* Copyright 2002-2007 by Sharon Paine
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

/* IMPORTANT: Put script after tooltip div or 
	 put tooltip div just before </BODY>. */

var dom = (document.getElementById) ? true : false;
var ns5 = (!document.all && dom || window.opera) ? true: false;
var ie5 = ((navigator.userAgent.indexOf("MSIE")>-1) && dom) ? true : false;
var ie4 = (document.all && !dom) ? true : false;
var nodyn = (!ns5 && !ie4 && !ie5 && !dom) ? true : false;

var origWidth, origHeight;

// avoid error of passing event object in older browsers
if (nodyn) { event = "nope" }

///////////////////////  CUSTOMIZE HERE   ////////////////////
// settings for tooltip 
// Do you want tip to move when mouse moves over link?
var tipFollowMouse= true;	
// Be sure to set tipWidth wide enough for widest image
var tipWidth= 160;
var offX= 20;	// how far from mouse to show tip
var offY= 12; 
var tipFontFamily= "Verdana, arial, helvetica, sans-serif";
var tipFontSize= "8pt";
// set default text color and background color for tooltip here
// individual tooltips can have their own (set in messages arrays)
// but don't have to
var tipFontColor= "#000000";
var tipBgColor= "#DDECFF"; 
var tipBorderColor= "#000000";
var tipBorderWidth= 1;
var tipBorderStyle= "ridge";
var tipPadding= 2;


// to layout image and text, 2-row table, image centered in top cell
// these go in var tip in doTooltip function
// startStr goes before image, midStr goes between image and text
var startStr = '<table width="' + tipWidth + '"><tr><td align="center" width="100%"><img src="';
var midStr = '" border="0"></td></tr><tr><td valign="top">';
var endStr = '</td></tr></table>';

////////////////////////////////////////////////////////////
//  initTip	- initialization for tooltip.
//		Global variables for tooltip. 
//		Set styles
//		Set up mousemove capture if tipFollowMouse set true.
////////////////////////////////////////////////////////////
var tooltip, tipcss;
function initTip() {
	if (nodyn) return;
	tooltip = (ie4)? document.all['tipDiv']: (ie5||ns5)? document.getElementById('tipDiv'): null;
	tipcss = tooltip.style;
	if (ie4||ie5||ns5) {	// ns4 would lose all this on rewrites
		//tipcss.width = tipWidth+"px";
		tipcss.fontFamily = tipFontFamily;
		tipcss.fontSize = tipFontSize;
		tipcss.color = tipFontColor;
		tipcss.backgroundColor = tipBgColor;
		tipcss.borderColor = tipBorderColor;
		tipcss.borderWidth = tipBorderWidth+"px";
		tipcss.padding = tipPadding+"px";
		tipcss.borderStyle = tipBorderStyle;
	}
	if (tooltip&&tipFollowMouse) {
		document.onmousemove = trackMouse;
	}
	
	//change tab random
	var rando = Math.floor(4*Math.random()+1) ;
	var a = document.getElementById("tabTGKD"+rando);
	//ChangeTabTGKD(rando);
	
	//slide ken 14 - cung su kien onload
	initSlideShow();
}


// window onload right here -- tich hop luon tab select + slide kenh 14 vao initTip;hoho
//////////////////////////
////////////////////////
window.onload = initTip;



/////////////////////////////////////////////////
//  doTooltip function
//			Assembles content for tooltip and writes 
//			it to tipDiv
/////////////////////////////////////////////////
var t1,t2;	// for setTimeouts
var tipOn = false;	// check if over tooltip link
function doTooltip(evt,image, text, bgcolor, color) {
	if (!tooltip) return;
	if (t1) clearTimeout(t1);	if (t2) clearTimeout(t2);
	tipOn = true;
	// set colors if included in messages array
	if (bgcolor)	var curBgColor = bgcolor;
	else curBgColor = tipBgColor;
	if (color)	var curFontColor = color;
	else curFontColor = tipFontColor;
	if (ie4||ie5||ns5) {
		var tip = startStr + image + midStr + '<span style="font-family:' + tipFontFamily + '; font-weight: bold; font-size:' + tipFontSize + '; color:' + curFontColor + ';">' + text + '</span>' + endStr;
		tipcss.backgroundColor = curBgColor;
	 	tooltip.innerHTML = tip;
	}
	if (!tipFollowMouse) positionTip(evt);
	else t1=setTimeout("tipcss.visibility='visible'",500);
}


var mouseX, mouseY;
function trackMouse(evt) {
	standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes
	mouseX = (ns5)? evt.pageX: window.event.clientX + standardbody.scrollLeft;
	mouseY = (ns5)? evt.pageY: window.event.clientY + standardbody.scrollTop;
	if (tipOn) positionTip(evt);
}

/////////////////////////////////////////////////////////////
//  positionTip function
//		If tipFollowMouse set false, so trackMouse function
//		not being used, get position of mouseover event.
//		Calculations use mouseover event position, 
//		offset amounts and tooltip width to position
//		tooltip within window.
/////////////////////////////////////////////////////////////
function positionTip(evt) {
	if (!tipFollowMouse) {
		mouseX = (ns5)? evt.pageX: window.event.clientX + standardbody.scrollLeft;
		mouseY = (ns5)? evt.pageY: window.event.clientY + standardbody.scrollTop;
	}
	// tooltip width and height
	var tpWd = (ie4||ie5)? tooltip.clientWidth: tooltip.offsetWidth;
	var tpHt = (ie4||ie5)? tooltip.clientHeight: tooltip.offsetHeight;
	// document area in view (subtract scrollbar width for ns)
	var winWd = (ns5)? window.innerWidth-20+window.pageXOffset: standardbody.clientWidth+standardbody.scrollLeft;
	var winHt = (ns5)? window.innerHeight-20+window.pageYOffset: standardbody.clientHeight+standardbody.scrollTop;
	// check mouse position against tip and window dimensions
	// and position the tooltip 
	if ((mouseX+offX+tpWd)>winWd) 
		tipcss.left = mouseX-(tpWd+offX)+"px";
	else tipcss.left = mouseX+offX+"px";
	if ((mouseY+offY+tpHt)>winHt) 
		tipcss.top = winHt-(tpHt+offY)+"px";
	else tipcss.top = mouseY+offY+"px";
	if (!tipFollowMouse) t1=setTimeout("tipcss.visibility='visible'",500);
}

function hideTip() {
	if (!tooltip) return;
	t2=setTimeout("tipcss.visibility='hidden'",500);
	tipOn = false;
}

document.write('<div id="tipDiv" style="position:absolute; visibility:hidden; z-index:100"></div>');



