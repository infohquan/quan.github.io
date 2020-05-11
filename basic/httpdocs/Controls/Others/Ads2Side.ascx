<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Ads2Side.ascx.cs" Inherits="Controls_Ads2Side" %>
<%@ Import Namespace="Khavi.Web.UIHelper" %>

<style type="text/css">
    .boxads2side img { width: 125px; padding-top:3px; }
</style>
<div style="left: 0px; width: 125px; position: absolute; top: 71px;" id="divAdLeft">
    <!--Phần cho bên trái thứ nhất phần này dùng thật-->
    <div style="float: left; position: relative; padding-top: 5px;">
        <div class="boxads2side">
            <!--<a href="#"><img alt="banner" style="width:125px;" src="http://vtc.vn/media/vtcnews/2010/05/31/HD-banner-tangkenh.gif" /></a>-->
            <%//Response.Write(AdsHelper.LoadAds("left", "ads2side"));%>
        </div>
    </div>
</div>
<div style="left: 1133px; width: 125px; position: absolute; top: 71px;" id="divAdRight">
    <!--Phần cho bên phải thứ nhất phần này dùng thật-->
    <div style="float: left; position: relative; padding-top: 5px;">
        <div class="boxads2side">
            <%//Response.Write(AdsHelper.LoadAds("right", "ads2side"));%>
            <!--<a href="#"><img alt="banner" style="width:125px;" src="http://vtc.vn/media/vtcnews/2010/05/31/HD-banner-tangkenh.gif" /></a>-->
        </div>
    </div>
</div>
<script type="text/javascript" language="javascript">
        var adRWidth = 130;
var adLWidth = 1007;
function FloatTopDiv() {
    startX = document.body.clientWidth - adRWidth, startY = 5;
    var ns = (navigator.appName.indexOf("Netscape") != -1);
    var d = document;

    //if (document.body.clientWidth <= 1024) startX = -adRWidth;


    function ml(id) {
        var el = d.getElementById ? d.getElementById(id) : d.all ? d.all[id] : d.layers[id];
        if (d.layers) el.style = el;
        el.sP = function(x, y) {

            //		this.style.left=x;this.style.top=y;
            this.style.left = x + 'px'; this.style.top = y + 'px';

        };
        el.x = startX;
        el.y = startY;
        return el;
    }

    window.stayTopLeft = function() {

        if (document.body.clientWidth <= 1250) {
            ftlObj.x = -adRWidth; ftlObj.y = 0; ftlObj.sP(ftlObj.x, ftlObj.y);
        }

        else {
            if (document.documentElement && document.documentElement.scrollTop)
                var pY = ns ? pageYOffset : document.documentElement.scrollTop;
            else if (document.body)
                var pY = ns ? pageYOffset : document.body.scrollTop;

            if (document.body.scrollTop > 71) { startY = 3 } else { startY = 71 };

            if (document.body.clientWidth >= 1250) {
                ftlObj.x = document.body.clientWidth - adRWidth;
                ftlObj.y += (pY + startY - ftlObj.y) / 32;
                ftlObj.sP(ftlObj.x, ftlObj.y);
            }
            else {
                ftlObj.x = startX;
                ftlObj.y += (pY + startY - ftlObj.y) / 32;
                ftlObj.sP(ftlObj.x, ftlObj.y);
            }
        }
        setTimeout("stayTopLeft()", 1);
    }
    ftlObj = ml("divAdRight");
    stayTopLeft();
}

function FloatTopDiv2() {
    startX2 = document.body.clientWidth - adLWidth, startY2 = 5;
    var ns2 = (navigator.appName.indexOf("Netscape") != -1);
    var d2 = document;

    //if (document.body.clientWidth <= 1024) startX2 = -adLWidth;


    function ml2(id) {
        var el2 = d2.getElementById ? d2.getElementById(id) : d2.all ? d2.all[id] : d2.layers[id];
        if (d2.layers) el2.style = el2;
        el2.sP = function(x, y) {

            //this.style.left=x;this.style.top=y;
            this.style.left = x + 'px'; this.style.top = y + 'px';

        };
        el2.x = startX2;
        el2.y = startY2;
        return el2;
    }

    window.stayTopLeft2 = function() {
        if (document.body.clientWidth <= 1250) {
            //ftlObj2.x = - 115;ftlObj2.y = 0;	ftlObj2.sP(ftlObj2.x, ftlObj2.y);
        }
        else {

            if (document.documentElement && document.documentElement.scrollTop)
                var pY2 = ns2 ? pageYOffset : document.documentElement.scrollTop;
            else if (document.body)
                var pY2 = ns2 ? pageYOffset : document.body.scrollTop;

            if (document.body.scrollTop > 71) { startY2 = 3 } else { startY2 = 71 };

            if (document.body.clientWidth > 1250) {
                ftlObj2.x = 0;
                ftlObj2.y += (pY2 + startY2 - ftlObj2.y) / 32;
                ftlObj2.sP(ftlObj2.x, ftlObj2.y);

            }
            else {

                ftlObj2.x = startX2;
                ftlObj2.y += (pY2 + startY2 - ftlObj2.y) / 8;
                ftlObj2.sP(ftlObj2.x, ftlObj2.y);
            }
        }
        setTimeout("stayTopLeft2()", 1);
    }

    ftlObj2 = ml2("divAdLeft");
    stayTopLeft2();

}



function ShowAdDiv() {
    var objAdDivRight = document.getElementById("divAdRight");
    var objAdDivLeft = document.getElementById("divAdLeft");

    if (document.body.clientWidth <= 1024) {
        objAdDivRight.style.display = 'none';
        objAdDivLeft.style.display = 'none';
    }
    else {
        objAdDivRight.style.display = '';
        objAdDivLeft.style.display = '';

        objAdDivLeft.style.left = 0;
        objAdDivRight.style.left = document.body.clientWidth - adRWidth;
    }
    FloatTopDiv();
    FloatTopDiv2();
}
ShowAdDiv();
LComplete = 1;
    </script>
