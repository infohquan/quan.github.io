var IsIE = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0;
var IsIE5 = (navigator.appVersion.indexOf("MSIE 5.5") != -1) ? 1 : 0;
var IsOpera = ((navigator.userAgent.indexOf("Opera 6") != -1) || (navigator.userAgent.indexOf("Opera/6") != -1)) ? 1 : 0;
var _url = "";
var _subID = "";
var _type = '';
var pg = "";

var urlFind = "";
var state = "";
var suburb = "";
var street = "";
var streetname = "";
var from = "";
var to = "";
var year = "";
var DoFind = "";
var objXmlHttp;
var sTimeCache = 14400;
var _d = (new Date()).getTime() + sTimeCache;
//************************************************
//////////////////////////////////////////////
///GET XML HTTP OBJECT///////////////////////
////////////////////////////////////////////
function _GetXmlHttpObject() {
    //var objXmlHttp = null;
    if (IsIE) {
        var strObjName = (IsIE5) ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP';
        try {
            objXmlHttp = new ActiveXObject(strObjName);
        }
        catch (e) {
            alert('IE detected, but object could not be created. Verify that active scripting and activeX controls are enabled');
            return;
        }
    }
    else if (IsOpera) {
        alert('Opera detected. The page may not behave as expected.');
        return;
    }
    else {
        objXmlHttp = new XMLHttpRequest();
    }
    return objXmlHttp;
}
//************************************************
//////////////////////////////////////////////
///GET SUBURB////////////////////////////////
////////////////////////////////////////////

function do_GetSuburb(suburbfield, stid, sub, showInit, classid) {
    if (stid == "" && sub == "") {
        removeSelectbox('s', showInit);
        removeSelectbox('t', showInit);
        return false;
    }
    if (suburbfield == "t" && document.getElementById("sltYearLP").value == "") {
        alert("Bạn phải chọn năm!");
        document.getElementById("sltYearLP").focus();
        return false;
    }
    var url = '';
    var idname = '';
    if (classid != undefined || classid != null) idname = 'classid';
    else idname = 'stid';
    var year = '';
    year = "&year=" + document.getElementById("sltYearLP").value;
    url = pathClient + "handler/LandPriceHandler.aspx?" + idname + "=" + stid + "&sub=" + sub + year + "&d=" + _d;
    //init list of street 
    if (sub == "" || sub == null) {
        removeSelectbox('t', showInit);
    }
    var objXmlHTTP = _GetXmlHttpObject();
    objXmlHTTP.open("GET", url, true);
    objXmlHTTP.onreadystatechange = function () {
        if (objXmlHTTP.readyState == 4 && objXmlHTTP.status == 200) {

            var lcObjXmlDoc = objXmlHTTP.responseXML;

            var lcNodes = lcObjXmlDoc.getElementsByTagName("*")[0].childNodes;

            if (lcNodes.length > 0) {

                try {
                    var obj_select = document.getElementById(suburbfield);
                    removeSelectbox(suburbfield, showInit);
                    for (var k = 0; k < lcNodes.length; k++) {
                        var options_length = obj_select.length;
                        var option_value = lcNodes[k].childNodes[0];
                        var option_text = lcNodes[k].childNodes[1];
                        obj_select.options[options_length] = new Option(option_text.childNodes[0].nodeValue, option_value.childNodes[0].nodeValue);
                    }
                    if (stid != "") {
                        obj_select.value = $('hdfQhID').value;
                        //do_GetSuburb('t','',$('hdfQhID').value,'Chọn');
                        $('hdfQhID').value = "";
                    }
                    if (sub != "") {
                        obj_select.value = $('hdfStrID').value;
                        $('hdfStrID').value = "";
                    }
                    if (_subID != "") {
                        obj_select.value = _subID;
                    }
                    obj_select.disabled = false;
                } catch (e) {
                    alert(e);
                }
            }
        } else {
            removeSelectbox(suburbfield, showInit);
        }
    }
    objXmlHTTP.send(null);
}

function removeSelectbox(objID, initText) {
    if (initText && initText.indexOf('*') != -1)
        initText = initText.replace('***', 'Chọn');
    var obj_select = document.getElementById(objID);
    //obj_select.disabled = true;
    for (var k = obj_select.options.length - 1; k >= 0; k--) {
        obj_select.options[k] = null;
    }
    if (initText != undefined || initText != null) {
        if (initText != '') obj_select.options[0] = new Option(initText, "");
    }
}

function gotoPage(numberpage) {
    pg = numberpage;

    FindStreet(numberpage);
}

function AssignData() {
    state = document.getElementById('a').value;
    suburb = document.getElementById('s').value;
    street = document.getElementById('t').value;
    streetname = encodeURI(document.getElementById('txtFindStreet').value);
    from = document.getElementById('txtFrom').value;
    to = document.getElementById('txtTo').value;
    year = document.getElementById('sltYearLP').value;
}

function FindStreetBox() {
    AssignData();
    DoFind = 'box';
    urlFind = pathClient + "handler/LandPriceHandler.aspx@DoFind='box'&state=" + state + "&suburb=" + suburb + "&street=" + street + "&pg=" + pg + "&streetname=&from=&to=&d=" + _d;
    FindStreet();
}
function FindStreetName() {
    AssignData();
    if (streetname == "") {
        alert("Vui lòng nhập tên đường để tìm!!");
        document.getElementById('txtFindStreet').focus();
        return false;
    }
    else {
        DoFind = 'street';
        urlFind = pathClient + "handler/LandPriceHandler.aspx@DoFind='street'&state=" + state + "&suburb=" + suburb + "&street=&pg=" + pg + "&streetname=" + streetname + "&from=&to=&d=" + _d;
        FindStreet();
    }

}
function FindStreetPrice() {
    AssignData();

    if (document.getElementById('txtFrom').value != "" && document.getElementById('txtTo').value != "") {
        if (!ischeckNumber(document.getElementById('txtFrom').value)) {
            alert("Giá phải là kiểu số");
            document.getElementById('txtFrom').focus();
            return false;
        }
        if (!ischeckNumber(document.getElementById('txtTo').value)) {
            alert("Giá phải là kiểu số");
            document.getElementById('txtTo').focus();
            return false;
        }
        DoFind = 'price';
        urlFind = pathClient + "handler/LandPriceHandler.aspx@DoFind='price'&state=" + state + "&suburb=" + suburb + "&street=&pg=" + pg + "&streetname=&from=" + from + "&to=" + to + "&d=" + _d;
        FindStreet();
    }
    else {
        alert("Vui lòng nhập giá để tìm kiếm");
        return false;
    }
}
function FindStreet(spage) {
    AssignData();
    if (state == "") {
        alert("Tỉnh/thành phố không được rỗng!!");
        document.getElementById('a').focus();
        return false;
    }
    if (year == "") {
        alert("Vui lòng chọn năm!!");
        document.getElementById('sltYearLP').focus();
        return false;
    }

    //check price is number
    if (document.getElementById('txtFrom').value != "" || document.getElementById('txtTo').value != "") {
        if (!ischeckNumber(document.getElementById('txtFrom').value) || document.getElementById('txtFrom').value == "") {
            alert("Giá từ phải là kiểu số");
            document.getElementById('txtFrom').focus();
            return false;
        }
        if (!ischeckNumber(document.getElementById('txtTo').value) || document.getElementById('txtTo').value == "") {
            alert("Giá đến phải là kiểu số");
            document.getElementById('txtTo').focus();
            return false;
        }
    }


    window.location.replace(pathClient + "landprice.aspx@y=" + year + "&st=" + state + "&sb=" + suburb + "&stid=" + street +
		"&stn=" + streetname + "&fr=" + from + "&t=" + to + "&pindex=1");

}

//enter key press
function EnterKeyPress(event) {
    if (event.keyCode == 13) {
        document.getElementById("btnSearch").click();
    }
}
//lay link nhanh cho gia dat o cac tinh thanh
function GetQuickLinksLandPriceOfState() {
    document.getElementById('divTinhThanh').innerHTML = "<div style='text-align:center'><IMG alt='' src='" + pathClient + "images/loading6.gif'></div>";
    //year=document.getElementById('sltYearLP').value;
    var url = pathClient + "handler/LandPriceHandler.aspx@type=default&d=" + _d;

    $.get(url, {},
		function (data) {
		    $("#divTinhThanh").html(data);
		});
}
//lay gia dat o tinh thanh
var __state = "";
function GetLandPriceOfState(state, spage) {
    __state = state;
    year = document.getElementById('sltYearLP').value;
    var urlFind = pathClient + "handler/LandPriceHandler.aspx@y=" + year + "&state=" + state + "&suburb=&street=&pg=" + spage + "&streetname=&from=&to=&d=" + _d;
    new Ajax.Request(urlFind, {
        method: 'get',
        onSuccess: function (transport) {
            var str = transport.responseText;
            document.getElementById('txtHint').innerHTML = str.split("<-||->")[0];
            var tps = (parseInt($("hTotalRows1").value) / parseInt($("hdfRecordCount").value) - parseInt(parseInt($("hTotalRows1").value) / parseInt($("hdfRecordCount").value))) > 0 ? ((parseInt(parseInt($("hTotalRows1").value) / parseInt($("hdfRecordCount").value))) + 1) : parseInt(parseInt($("hTotalRows1").value) / parseInt($("hdfRecordCount").value));
            if (tps < $("hCurrentPage1").value)
                $("hCurrentPage1").value = 1;
            mjDrawLbPageNew(tps, $("hCurrentPage1").value, "dvPaging", "gotoPageQL");
            $("dvFileLandPrice").innerHTML = str.split("<-||->")[1];
        },
        onFailure: function (e) {
            alert(e.responseText);
        }
    }
	)
}
function gotoPageQL(numberpage) {
    GetLandPriceOfState(__state, numberpage);
}
$(function () { GetQuickLinksLandPriceOfState(); });

function mjDecription(value) {
    var metas = document.getElementsByTagName('meta');
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].name == "description") {
            metas[i].setAttribute('content', value)
            break;
        }
    }
}
