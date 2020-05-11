
var IsIE = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0; 
var IsIE5 = (navigator.appVersion.indexOf("MSIE 5.5")!=-1) ? 1 : 0; 
var IsOpera = ((navigator.userAgent.indexOf("Opera 6")!=-1)||(navigator.userAgent.indexOf("Opera/6")!=-1)) ? 1 : 0;
var _url       = "";
var _subID = "";
var _type='';
var pg="";

var urlFind="";
var state="";
var suburb="";
var street="";
var streetname="";
var from="";
var to="";
var year="";
var DoFind="";
var objXmlHttp;
var sTimeCache = 14400;
var _d = (new Date()).getTime()+ sTimeCache;
//************************************************
//////////////////////////////////////////////
///GET XML HTTP OBJECT///////////////////////
////////////////////////////////////////////
function _GetXmlHttpObject() {

	if (IsIE){ 
		var strObjName = (IsIE5) ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'; 
		try{
			objXmlHttp = new ActiveXObject(strObjName); 					
		} 
		catch(e){ 
			alert('IE detected, but object could not be created. Verify that active scripting and activeX controls are enabled'); 
			return; 
		} 
	} 
	else if (IsOpera){ 
		alert('Opera detected. The page may not behave as expected.'); 
		return; 
	} 
	else{ 				
		objXmlHttp = new XMLHttpRequest(); 			
	} 
	return objXmlHttp; 
}

function gotoPage(numberpage)
{			
	pg = numberpage;

	FindForm(numberpage);
}
function AssignData()
{
    var CtlMst = document.getElementById('hdfCtlMst').value
	 Formtype=document.getElementById(CtlMst+'_a').value;
	 Keyword=encodeURI(document.getElementById(CtlMst+'_txt_Keyword').value);
	 path = document.getElementById(CtlMst+'_hdpath').value;
	 act="form";
}
function FindForm(spage)
{
	AssignData();
	window.location = pathClientAjax + "Document/FormList.aspx@cat=" + Formtype + "&act=" + act + "&kw=" + Keyword;

}

//enter key press
function EnterKeyPress(event)
{
	if (event.keyCode==13) {
		document.getElementById("btnSearch").click();
	}
}
function OpenSend(id,type)
{
 
    var act = "act=ShowFormSendMailFriend_form";
    act += "&fid=" + id;
    act += "&type=" + type;
    var url = pathClientAjax + "handler/Misc.aspx?" + act;
    $.get(url,
			function (data) {
			    $("#login_box").centerInClient();
			    $('#login_box').html(data);
			    $('#login_box').show();
			}
		);
}
function ShowLawFormToFriend(id,type)
{
 
    var act = "act=ShowFormSendMailFriend_form";
    act += "&fid=" + id;
    act += "&type=" + type;
    var url = pathClientAjax + "handler/Misc.aspx?" + act;
    $.get(url,
			function (data) {
			    $("#login_box").centerInClient();
			    $('#login_box').html(data);
			    $('#login_box').show();
			}
		);
}
function SendLawFormToFriend(id,type) {
    if ($("#txtName").val() == "") {
        alert("Bạn phải nhập tên người gửi vào.");
        return false;
    }
    else if ($('#txtEmailFrom').val() == "" || ($('#txtEmailFrom').val() != "" && !isEmail($('#txtEmailFrom').val()))) {
        alert("Email của người gửi đang rỗng hoặc không đúng định dạng. Xin vui lòng nhập cho đúng");
        return false;
    }
    else if ($('#txtEmailTo').val() == "" || ($('#txtEmailTo').val() != "" && !isEmail($('#txtEmailTo').val()))) {
        alert("Email của người nhận đang rỗng hoặc không đúng định dạng. Xin vui lòng nhập cho đúng");
        return false;
    }
    else if ($('#txtMessage').val() == "") {
        alert("Bạn phải nhập nội dung cần gửi vào!");
        return false;
    }
    var _____url = pathClient + "SendLawFormToFriend.aspx@id=" + id + "&type=" + type ;

    $.post(_____url, { from: $('#txtEmailFrom').val(), to: $('#txtEmailTo').val(), content: encodeURI($('#txtMessage').val()),name: $('#txtName').val()},
			function (data) {
                if(data=="failed")
                {
                     alert("Gửi Email không thành công!");
                }
                else
                {
			        alert("Gửi Email thành công!");
			        $('#login_box').hide();
                }
			}); 

    
}
//------- Law Document----------
function gotoPageD(numberpage)
{			
	pg = numberpage;

	FindDocumentLaw(numberpage);
}
function AssignDataD() {

     var CtlMst = document.getElementById('hdfCtlMst').value
	 Documenttype=document.getElementById(CtlMst+'_a').value;
	 ValidStatus=document.getElementById(CtlMst+'_t').value;
	 Keyword=encodeURI(document.getElementById(CtlMst+'_txt_Keyword').value);
	 EnforceWhere=encodeURI(document.getElementById(CtlMst+'_txtWhereEnforce').value);
	 path = document.getElementById(CtlMst+'_hdpath').value;
	 act="DLaw";
}
function FindDocumentLaw(spage)
{
	AssignDataD();
	window.location = pathClientAjax+"document/LawDocumentList.aspx@cat="+ Documenttype +"&vs="+ValidStatus+"&ew="+EnforceWhere+"&act="+ act +"&kw="+Keyword;

}