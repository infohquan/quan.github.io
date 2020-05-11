



function Signin()
{
	var act = "act=showformlogin";
	$.get(pathClientAjax + "handler/LogHandler.aspx", act + "&d=" + (new Date()).getTime(),
 			function (data) {
 			    if (data != "") {
 			       
 			        $('#login_box').html(data);
 			        $('#login_box_popup_header').html("Đăng nhập");
 			        $("#login_box").centerInClient();
 			         $('#login_box').show();
 			        
 			       
 			    }
 			    else {
 			        $('#login_box').hide();
 			    }
 			});
}
function Register()
{
	var act = "act=showformsignin";

	$.get(pathClientAjax + "handler/LogHandler.aspx", act + "&d=" + (new Date()).getTime(),
 			function (data) {
 			    if (data != "") {
 			        $('#login_box').html(data);
 			        $("#login_box").centerInClient({ minY: 1 });
 			        $('#login_box').show(); 			       
 			        $('#login_box_popup_header').html("Tạo tài khoản");
 			        
 			    }
 			    else {
 			        $('#login_box').hide();
 			    }
 			});
 }
 function InvitedRegister()
{
	var act = "act=showformsignin";
	var emailInvite = "&emailInvite="+document.getElementById("hdnEmailInvite").value;
	
	$.get(pathClientAjax+"handler/LogHandler.aspx",act+emailInvite+"&d="+(new Date()).getTime(),
 			function(data){
 				if(data!=""){
 				    $('#login_box').html(data);
 				    $('#login_box_popup_header').html("Tạo tài khoản");
 				    $("#login_box").centerInClient({ minY: 1 });
 				    $('#login_box').show();
 				}
 				else
 				{
 					$('#login_box').hide();
 				}
 			});
 }
 function fogotpass()
{
	var act = "act=showformfogotpass";
	
	$.get(pathClientAjax+"handler/LogHandler.aspx",act+"&d="+(new Date()).getTime(),
 			function(data){
 				if(data!=""){
 				    $('#login_box').html(data);
 				    $('#login_box_popup_header').html("Quên mật khẩu?");
 				    $("#login_box").centerInClient();
					$('#login_box').show();
					document.getElementById("forgot_password_email_field").focus();
 				}
 				else
 				{
 					$('#login_box').hide();	
 				}
 			});	
}
function SigninSubmit()
{
	if(document.getElementById("txtnamelogin").value=="")
	{
		alert("Vui lòng nhập tên đăng nhập!");
		document.getElementById("txtnamelogin").focus();	
		return false;
	}
	if(document.getElementById("txtPassword").value=="")
	{
		alert("Vui lòng nhập mật khẩu!");
		document.getElementById("txtPassword").focus();	
		return false;
	}
	Processing();
	var act = "act=submitLogin";
	var username="&username="+document.getElementById("txtnamelogin").value;
	var pass="&pass="+document.getElementById("txtPassword").value;
	var registpass="&registpass=0";
	if(document.getElementById("chkRemember").checked==true)
		registpass="&registpass=1";
	var lnk= "&lnk=";//+document.getElementById("hdredirlnk").value;

	$.get(pathClientAjax + "handler/LogHandler.aspx", act + username + pass + registpass + lnk + "&d=" + (new Date()).getTime(),
 		function (data) {
 			if (data != "") {
 			    $('#phLogin').html(data.split("<==>")[0]);
 			    $('#login_box').hide();
                /* set quyen top agent ve ""*/
//  			    nvgUtils.DataNoteTopAgent = "";
//  			    $('#' + $('#hdfCtlMst').val() + '_ali4').bind('click', function () { });

 			    if (data.split("<==>")[1] != "")
 			        window.location = data.split("<==>")[1];
 			    else if (document.getElementById("hdredirlnk").value != "")
 			        window.location = pathClient + document.getElementById("hdredirlnk").value;
 			    //nvgData.CountEmailAlert();
 			}
 			else {
 			    alert("Vui lòng nhập đúng tên hoặc mật khẩu!");
 			    $('#login_btn').html("<a onclick=\"Signin();return false;\" rel=\"nofollow\"><div>Đăng nhập</div></a>");
 			}
 		});
}

function CheckPWHopLe(str)
{
	var s=true;
	for(var i=0;i<str.length;i++)
	{		
		var aa= str.charAt(i);
		if((aa<'0' || aa>'9') && (aa<'a' || aa>'z') && aa!='_' && aa!='!' && aa!='*') s= false;
	}
	return s;
}

function CheckLength(str)
{
	if(str.length<4) return false;
	return true;
}

function CheckUserNameHopLe(str)
{		
	var s=true;
	for(var i=0;i<str.length;i++)
	{		
		var aa= str.charAt(i);
		if((aa<'0' || aa>'9') && (aa<'a' || aa>'z') && aa!='_' && aa!='@' && aa!='.') s= false;
	}
	return s;
}

function RegisterSubmit()
{
	if(document.getElementById("name_field").value=="")
	{
		alert("Bạn phải nhập Họ Tên!");
		document.getElementById("name_field").focus();	
		return false;
	}
	if(document.getElementById("email_field").value=="")
	{
		alert("Bạn phải nhập Tên đăng nhập!");
		document.getElementById("email_field").focus();	
		return false;
	}
	if(!CheckLength(document.getElementById("email_field").value))
	{
		alert("Tên đăng nhập phải nhiều hơn 4 kí tự");
		document.getElementById("email_field").focus();	
		return false;
	}
	if(!CheckUserNameHopLe(document.getElementById("email_field").value))
	{
		alert("Tên đăng nhập bạn chứa kí tự đặc biệt hoặc viết hoa");
		document.getElementById("email_field").focus();	
		return false;
	}
	
	if(document.getElementById("password_field").value=="")
	{
		alert("Bạn phải nhập Mật khẩu!");
		document.getElementById("password_field").focus();	
		return false;
	}
	if(!CheckLength(document.getElementById("password_field").value))
	{
		alert("Mật khẩu phải nhiều hơn 4 kí tự");
		document.getElementById("password_field").focus();	
		return false;
	}
	if(!CheckPWHopLe(document.getElementById("password_field").value))
	{
		alert("Mật khẩu bạn chứa kí tự đặc biệt hoặc viết hoa");
		document.getElementById("password_field").focus();	
		return false;
	}
	if(document.getElementById("password_verify_field").value=="")
	{
		alert("Bạn phải nhập lại Mật khẩu!");
		document.getElementById("password_verify_field").focus();	
		return false;
	}			
	
	if(document.getElementById("password_verify_field").value!=document.getElementById("password_field").value)
	{
		alert("Mật khẩu nhập lại chưa đúng!");
		document.getElementById("password_verify_field").focus();	
		return false;
	}
	if(document.getElementById("email").value=="")
	{
		alert("Bạn phải nhập Email!");
		document.getElementById("email").focus();	
		return false;
	}
	else
	{
		if(!validateEmailAddr("email"))
		{
			alert("Email không đúng định dạng!");
			document.getElementById("email").focus();	
			return false;
		}
	}
	
	if(document.getElementById("mobilephone").value!="")
	{
		if(!isMobilePhone(document.getElementById("mobilephone").value))
		{
			alert("Điện thoại di động không đúng đầu số hoặc không phải chuổi số hoặc có khoản trắng!");
			document.getElementById("mobilephone").focus();	
			return false;
		}
	}
	Processing();
	var act = "act=submitSignin";
	var name="&name="+encodeURI(document.getElementById("name_field").value);
	var username="&username="+encodeURI(document.getElementById("email_field").value);
	var pass="&pass="+document.getElementById("password_field").value;
	
	var mobilephone="&mobilephone="+document.getElementById("mobilephone").value;
	var email="&email="+document.getElementById("email").value;
	var newsletter="&newsletter=0";
	if(document.getElementById("contact_me_field").checked==true)
		newsletter="&newsletter=1";
	var memforum="&memforum=0";
	if(document.getElementById("memberforum").checked==true)
		memforum="&memforum=1";

	var hdnAgentIdInvite = document.getElementById("hdnAgentIdInvite");
	var hdnTypeInvite = document.getElementById("hdnTypeInvite");
	
	if(hdnAgentIdInvite!=null&&hdnTypeInvite!=null||hdnAgentIdInvite!=undefined&&hdnTypeInvite!=undefined)
	{
		var AgentIdInvite="&AgentIdInvite="+hdnAgentIdInvite.value;
		var TypeInvite="&TypeInvite="+hdnTypeInvite.value;
		
		var al=act+name+username+pass+mobilephone+email+newsletter+memforum+AgentIdInvite+TypeInvite;
	}else
	{
		
		var al=act+name+username+pass+mobilephone+email+newsletter+memforum;
	}	
	
	$.get(pathClientAjax+"handler/LogHandler.aspx",al+"&d="+(new Date()).getTime(),
 			function(data){
 					
 				if(data=="email")
				{
					alert("Địa chỉ email của bạn đã tồn tại trong hệ thống rồi!");
					document.getElementById("email").focus();
					$('#login_btn').html("<a onclick=\"RegisterSubmit();return false;\" rel=\"nofollow\"><div>Tạo tài khoản</div></a>");
				}
				else if(data=="username")
				{
					alert("Tên đăng nhập của bạn đã tồn tại trong hệ thống rồi!");
					document.getElementById("email_field").focus();
					$('#login_btn').html( "<a onclick=\"RegisterSubmit();return false;\" rel=\"nofollow\"><div>Tạo tài khoản</div></a>");
				}
				else if(data=="username1")
				{
					alert("Tên đăng nhập của bạn không được gõ Tiếng Việt và không chứa khoảng trắng!");
					document.getElementById("email_field").focus();
					$('#login_btn').html( "<a onclick=\"RegisterSubmit();return false;\" rel=\"nofollow\"><div>Tạo tài khoản</div></a>");
				}
				else if(data=="pass")
				{
					alert("Mật khẩu của bạn không được gõ Tiếng Việt và không chứa khoản trắng!");
					document.getElementById("password_field").focus();
					$('#login_btn').html( "<a onclick=\"RegisterSubmit();return false;\" rel=\"nofollow\"><div>Tạo tài khoản</div></a>");
				}
				else {
				    $('#login_box').html(data);
					$('#login_box_popup_header').html( "Tạo tài khoản thành công!");
					//$("#login_box").centerInClient();
					$("#login_box").centerInClient({ minY: 1 });
					$('#login_box').show();
				}
	 				
 			});
}
function getpassword()
{
	if(document.getElementById("forgot_password_email_field").value=="")
	{
		alert("Bạn phải nhập Email!");
		document.getElementById("forgot_password_email_field").focus();	
		return false;
	}

	var act = "act=sendemailforgotpass";
	var email="&email="+document.getElementById("forgot_password_email_field").value;
	
	$.get(pathClientAjax+"handler/LogHandler.aspx",act+email+"&d="+(new Date()).getTime(),
 			function(data){
 				if(data!=""){
 					alert("Gửi thành công, bạn kiểm tra lại Email để biết thông tin!");	
 					document.getElementById('login_box').style.display='none';
 					}
 			});
 			
}
function Signout()
{
	var act = "act=submitLogout";
	$.get(pathClientAjax+"handler/LogHandler.aspx",act+"&d="+(new Date()).getTime(),
 			function(data){
 				if(data!=""){
 					CheckLogin();
 					if(window.location.href.indexOf("changeinfo")!=-1|| window.location.href.indexOf("ViewGuestInfo")!=-1||window.location.href.indexOf("MyAlert")!=-1||window.location.href.indexOf("PropertyAsd")!=-1||window.location.href.indexOf("ListAdsGuest")!=-1||window.location.href.indexOf("/users/")!=-1)
						window.location=pathClient;
 				}
 				else
 				{
 					alert("Signout có lỗi!");	
 				}
 			});
}
function CheckLogin(){
	var act = "act=checklogin";
	
	$.get(pathClientAjax+"handler/LogHandler.aspx",act+"&d="+(new Date()).getTime(),
 			function(data){
 				if(data!=""){
 				
					$('#phLogin').html(data.split("<==>")[0]);
 				}
 				else
 				{
 					$('#phLogin').hide(); 					
 				}
 			});
 			
}
function Processing()
{
	$('#login_btn').html( "<span rel=\"nofollow\"><div style=\"background-color:#AAAAAA;\">Đang xử lý..</div></span>");
}
function login_box_close()
{
	document.getElementById('login_box').style.display='none';
	return false;
}
function CheckEnable()
{
	if(document.getElementById("condUse").checked==true) 
	{
		$('#login_btn').html( "<a onclick=\"RegisterSubmit();return false;\" rel=\"nofollow\"><div>Tạo tài khoản</div></a>");
	}
	else
	{
		$('#login_btn').html( "<span rel=\"nofollow\"><div style=\"background-color:#AAAAAA;\">Tạo tài khoản</div></span>");
	}
}
function DangTin() {
    var  guestId = "",	 guestEmail = "",	 guestAccount ="",	 guestName = "",	 guestAgentName ="";

	if(nvgUtils.getCookie('LoginType')!=null&&nvgUtils.getCookie('LoginType')=="user")
	{	
	 guestId =nvgUtils.getCookie('gGstId')!=""?nvgUtils.getCookie('gGstId'):nvgUtils.getCookie('GAgentID');
	 guestEmail = nvgUtils.getCookie('GuestEmail');
	 guestAccount = nvgUtils.getCookie('UserName');
	 guestName = nvgUtils.getCookie('GuestName');
	 guestAgentName = nvgUtils.getCookie('GAgentNameContact');
	 }
	 else{
		guestId = nvgUtils.getCookie('GAgentID');
		guestEmail = nvgUtils.getCookie('GAgentEmail');
		guestAccount = nvgUtils.getCookie('UserName');
		guestName = nvgUtils.getCookie('GuestName');
		guestAgentName = nvgUtils.getCookie('GAgentNameContact');
	 }
		
	if(guestId!=null && guestId!="")
		gId= guestId;
	else
		gId=null;
	if(guestEmail!=null&& guestEmail!="")
		gEmail= guestEmail;
	else if(guestAccount!=null&& guestAccount!="")
		gEmail=guestAccount;
	else
		gEmail=null;
	if(guestName!=null&& guestName!="")gName = guestName;
	else if(guestAgentName!=null&& guestAgentName!="")gName = guestAgentName;
	else gName='';

	if (gId != null && gEmail != null && gId != "" && gEmail != "") {
	    window.location.href = pathClient + 'users/main.aspx@ctl=4&itm=1';  
	    return false;
     }
	else {
	    Signin();
     }
 }

function LoginCheckPermission()
{	
	var  guestId = "",	 guestEmail = "",	 guestAccount ="",	 guestName = "",	 guestAgentName ="";

	if(nvgUtils.getCookie('LoginType')!=null&&nvgUtils.getCookie('LoginType')=="user")
	{	
	 guestId =nvgUtils.getCookie('gGstId')!=""?nvgUtils.getCookie('gGstId'):nvgUtils.getCookie('GAgentID');
	 guestEmail = nvgUtils.getCookie('GuestEmail');
	 guestAccount = nvgUtils.getCookie('UserName');
	 guestName = nvgUtils.getCookie('GuestName');
	 guestAgentName = nvgUtils.getCookie('GAgentNameContact');
	 }
	 else{
		guestId = nvgUtils.getCookie('GAgentID');
		guestEmail = nvgUtils.getCookie('GAgentEmail');
		guestAccount = nvgUtils.getCookie('UserName');
		guestName = nvgUtils.getCookie('GuestName');
		guestAgentName = nvgUtils.getCookie('GAgentNameContact');
	 }
		
	if(guestId!=null && guestId!="")
		gId= guestId;
	else
		gId=null;
	if(guestEmail!=null&& guestEmail!="")
		gEmail= guestEmail;
	else if(guestAccount!=null&& guestAccount!="")
		gEmail=guestAccount;
	else
		gEmail=null;
	if(guestName!=null&& guestName!="")gName = guestName;
	else if(guestAgentName!=null&& guestAgentName!="")gName = guestAgentName;
	else gName='';

	if(gId!=null && gEmail!=null && gId!=""&& gEmail!="")
	{
		str=""
        	
            + " <a href=\"" + pathClient + "users/main.aspx@ctl=4&itm=1\" class=\"bt_post\"><span>Đăng tin</span></a>"
            + "<ul class=\"Membership\">"
            + "<li><a href=\"javascript:void(0);\" onclick=\"Signout();trackPageview(\'../../muabannhadat.com.vn/logout\');\">Thoát</a></li>"
            + "<li><a href=\"" + pathClient + "users/main.aspx@ctl=12&itm=\" >Tài khoản</a></li>"
            + "<li><b>Chào bạn " + convertTounicode(gName) + "</b>&nbsp;&nbsp;</li>"
            + "</ul>"
            
		$('#phLogin').html(str);
	}
	else
	{
	    str = ""
  
        + "<a href=\"javascript:void(0);\" onclick=\"Signin();trackPageview('../../muabannhadat.com.vn/login/openform');\" class=\"bt_post\"><span>Đăng tin</span></a>"
        + "<ul class=\"Membership\">"
        + "<li><a href=\"javascript:void(0);\" onclick=\"Signin();trackPageview('../../muabannhadat.com.vn/login/openform');\">Đăng nhập</a></li>"
        + "<li><a href=\"javascript:void(0);\" onclick=\"Register();trackPageview('../../muabannhadat.com.vn/dangky/openform');\">Đăng ký</a></li>"		
        + "</ul>"
        

		$('#phLogin').html(str);
	}
}
function getCookieForLogin(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}
function convertTounicode(s)
{
	if(s==null||s=="")return "";
	var atemp=new Array();
	var name="";
	atemp=s.split(',');
	for(i=0;i<atemp.length;i++)
		name+=String.fromCharCode(atemp[i]);
	return name;
}

function clickUtility(id)
{
	$('#'+id).toggle();
}
	
function RequestLogin(redlink)
{
	guestId = nvgUtils.getCookie('gGstId');
	guestEmail = nvgUtils.getCookie('GuestEmail');
	guestAccount = nvgUtils.getCookie('UserName');
	guestName = nvgUtils.getCookie('GuestName');
	guestAgentName = nvgUtils.getCookie('GAgentNameContact');
	if(guestId!=null && guestId!="")
		gId= guestId;
	else
		gId=null;
	if(guestEmail!=null&& guestEmail!="")
		gEmail= guestEmail;
	else if(guestAccount!=null&& guestAccount!="")
		gEmail=guestAccount;
	else
		gEmail=null;
	if(guestName!=null&& guestName!="")gName = guestName;
	else if(guestAgentName!=null&& guestAgentName!="")gName = guestAgentName;
	else gName='';
	if(gId!=null && gEmail!=null&& gId!=""&& gEmail!="")
	{
		var  nlik = pathClientAjax +redlink;
			
		var is_ie = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0; 
		var is_ie_5 = (navigator.appVersion.indexOf("MSIE 5.5")!=-1) ? 1 : 0; 
		var is_ie_6 = (navigator.appVersion.indexOf("MSIE 6.0")!=-1) ? 1 : 0; 
		var is_ie_7 = (navigator.appVersion.indexOf("MSIE 7.0")!=-1) ? 1 : 0; 
		var is_ie_8 = (navigator.appVersion.indexOf("MSIE 8.0")!=-1) ? 1 : 0; 

		var is_opera = ((navigator.userAgent.indexOf("Opera 6")!=-1)||(navigator.userAgent.indexOf("Opera/6")!=-1)) ? 1 : 0; 
		var is_netscape = (navigator.userAgent.indexOf('Netscape') >= 0) ? 1 : 0; 
		var is_safari = (navigator.userAgent.indexOf('safari') >= 0) ? 1 : 0; 


		//if IE 6

		if (is_ie && is_ie_6)
		{			
			window.location.replace(nlik);
		}
		else if (is_ie && is_ie_7)//if IE 7
		{ 
			window.location.replace(nlik);
		}
		
		else //Default goto page (NOT IE 6 and NOT IE 7)
		{
			window.location=nlik;
		}
	}
	else
	{
	
		var act = "act=showformlogin"+"&lnk="+redlink;
		$.get(pathClientAjax+"handler/LogHandler.aspx",act+"&d="+(new Date()).getTime(),
 				function(data){
 					if(data!=""){
 						$('#login_box_popup_header').html("Đăng nhập");
 						$('#contentlogin').html(data);
 						$('#login_box').show(); 				
 					}
 					else
 					{
 						$('#login_box').hide();
 					}
 				});
 	}
}

function KeyPressLogin(e, type)
{
	var unicode=e.charCode? e.charCode : e.keyCode;	
	if (unicode == 13)
	{
		switch(type) {
			case "loginhead":
				SigninSubmit();
				break;
			case "fogotpass":
				getpassword();
				break;
		}
	}
}

var _START_PAGE=0;
var _END_PAGE=0;
var _CPAGE=0;
var _ITEMS_PAGES=10;
var _ITEMS_PAGES_Admin=20;
var _PART_PAGES=10;

var nvgPaging={
	mjDrawLbPageListingPiNoAjax:function (TotalPages_, CurrentPage_, ElementID_,sGotoPageFunction,__loai,pPath__)
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
	var theme = "<table border=\"0\"><tr><td>";
	//phan chia dau/truoc/tiep/cuoi
	var next;
	var pre;
	if(CurrentPage_==1)
		pre=1;
	else pre=CurrentPage_-1;
	if(CurrentPage_==TotalPages_)
		next=TotalPages_;
	else next=parseInt(CurrentPage_)+1;
	//kiem tra duoi cua querystring
	var sDuoi="";
	if(__loai!="-1")
		sDuoi=__loai;

	theme+= "<a href='"+pPath__+"/"+sGotoPageFunction+".aspx@pindex="+ pre + sDuoi+"' ><img src=\""+pPath__+"/images/bt_previous.gif\" width=\"19\" height=\"20\" alt=\"\"/></a></td><td class=\"Numbers\">";
	for( var k = _START_PAGE; k <= _END_PAGE; k++){
		if(CurrentPage_ != k)theme+= "<a class=\"LinkNumbers\" href='"+pPath__+"/"+sGotoPageFunction+".aspx@pindex="+ k +sDuoi+"' >"+ (k) +"</a>";
		else theme+= "<a class=\"LinkNumbers\" ><b>"+ (k) +"</b></a>";
	}
	theme+= "</td><td><a href='"+pPath__+"/"+sGotoPageFunction+".aspx@pindex="+ next +sDuoi+"' ><img src=\""+pPath__+"/images/bt_next.gif\" width=\"19\" height=\"20\" alt=\"\"/></a>";
	theme+= "</td></tr></table>";	
	if (TotalPages_>1) {
		$('#'+ElementID_).show();
		$('#'+ElementID_).html(theme);
		}
	},
	mjDrawLbPageListingPiNoAjaxLi:function (TotalPages_, CurrentPage_, ElementID_,sGotoPageFunction,__loai,pPath__)
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
	var theme = "<ul>";
	//phan chia dau/truoc/tiep/cuoi
	var next;
	var pre;
	if(CurrentPage_==1)
		pre=1;
	else pre=CurrentPage_-1;
	if(CurrentPage_==TotalPages_)
		next=TotalPages_;
	else next=parseInt(CurrentPage_)+1;
	//kiem tra duoi cua querystring
	var sDuoi="";
	if(__loai!="-1")
		sDuoi=__loai;

	theme += "<li class=\"PagesPrivious\"><a href='" + pPath__ + "/" + sGotoPageFunction + ".aspx@pindex=" + pre + sDuoi + "' ></a></li>";
	for( var k = _START_PAGE; k <= _END_PAGE; k++){
		if(CurrentPage_ != k)theme+= "<li><a class=\"LinkNumbers\" href='"+pPath__+"/"+sGotoPageFunction+".aspx@pindex="+ k +sDuoi+"' >"+ (k) +"</a></li>";
		else theme += "<li><a class=\"current\" >" + (k) + "</a></li>";
	}
    theme += "<li class=\"PagesNext\"><a href='" + pPath__ + "/" + sGotoPageFunction + ".aspx@pindex=" + next + sDuoi + "' ></a></li>";
	theme+= "</ul>";	
	if (TotalPages_>1) {
		$('#'+ElementID_).show();
		$('#'+ElementID_).html(theme);
		}
	},
	mjDrawLbPageNew:function (TotalPages_, CurrentPage_, ElementID_,sGotoPageFunction)
	{

	_CPAGE=CurrentPage_;
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
	},
	DrawPageListBdsUsers:function (TotalPages_, CurrentPage_, ElementID_,sGotoPageFunction)
	{

	_CPAGE=CurrentPage_;
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

	theme+= "<ul>";
	theme+= "<li class=\"PagesPrivious\"><a href='javascript:"+sGotoPageFunction+"("+ pre +")' ></a></li>";	
	for( var k = _START_PAGE; k <= _END_PAGE; k++){
		if(CurrentPage_ != k)theme+= "<li><a href='javascript:"+sGotoPageFunction+"("+ (k) +")' >"+ (k) +"</a></li>";
		else 
		theme+= "<li><a class=\"current\" >"+ (k) +"</a></li>";
	}
	theme+= "<li class=\"PagesNext\"><a href='javascript:"+sGotoPageFunction+"("+ next +")' ></a></li>";
	theme+= "</ul>";
	if (TotalPages_>1) {
		$('#'+ElementID_).show();
		$('#'+ElementID_).html(theme);
		}
	},
	DrawPageListBdsUsersNoAjax:function (TotalPages_, CurrentPage_, ElementID_,sGotoPageFunction,duoi_,path_)
	{

	_CPAGE=CurrentPage_;
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

	theme+= "<ul>";
	theme+= "<li class=\"PagesPrivious\"><a href=\""+path_+"/"+sGotoPageFunction+".aspx@pindex="+pre+duoi_+" \" ></a></li>";	
	for( var k = _START_PAGE; k <= _END_PAGE; k++){
		if(CurrentPage_ != k)theme+= "<li><a href=\""+path_+"/"+sGotoPageFunction+".aspx@pindex="+k+duoi_+" \" >"+ (k) +"</a></li>";
		else 
		theme+= "<li><a class=\"current\" >"+ (k) +"</a></li>";
	}
	theme+= "<li class=\"PagesNext\"><a href=\""+path_+"/"+sGotoPageFunction+".aspx@pindex="+next+duoi_+" \" ></a></li>";
	theme+= "</ul>";
	if (TotalPages_>1) {
		$('#'+ElementID_).show();
		$('#'+ElementID_).html(theme);
		}
	},
	loadMiddleListBanner:function(soureId,destId)
	{
		$('#'+destId).html($('#'+soureId).html());
	}
}

var nvgUtils = {
    IdMenuTopCur: 'aMHome',
    setCookie: function (tenCk, value, expTime) {
        var expiredays = expTime;
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = tenCk + "=" + value + ((expiredays == null || typeof (expiredays) == 'undefined') ? "" : ";expires=" + exdate.toGMTString()) + "; path=/";
    },
    getCookie: function (tenCk) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(tenCk + "=");
            if (c_start != -1) {
                c_start = c_start + tenCk.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    getLoaiGD__: function (loaigd) {
        var tempLoaigd = "";
        switch (loaigd) {
            case "sale":
                tempLoaigd = "1";
                break;
            case "rent":
                tempLoaigd = "0";
                break;
            case "invite":
                tempLoaigd = "2";
                break;
        }
        return tempLoaigd;
    },
    getLoaiBDS__: function (loaibds) {
        var tempLoaibds = "";
        switch (loaibds) {
            case "home":
                tempLoaibds = "0";
                break;
            case "land":
                tempLoaibds = "1";
                break;
            case "com":
                tempLoaibds = "2";
                break;
            case "dev":
                tempLoaibds = "3";
                break;
            case "bus":
                tempLoaibds = "4";
                break;
            case "oghep":
                tempLoaibds = "9";
                break;
            case "phongtro":
                tempLoaibds = "8";
                break;
            case "apartment":
                tempLoaibds = "20";
                break;
            case "office":
                tempLoaibds = "21";
                break;
            case "warehouse":
                tempLoaibds = "22";
                break;
        }
        return tempLoaibds;
    },
    OnBlurInput: function (a, text) {
        if (a.value == '') a.value = text;
    },
    OnFocusInput: function (a, text) {
        if (a.value == text) a.value = '';
    },
    CheckLoginForEachPage: function (_url) {
        var guestId = nvgUtils.getCookie('gGstId');
        var guestEmail = nvgUtils.getCookie('GuestEmail');
        var guestAccount = nvgUtils.getCookie('UserName');
        var guestName = nvgUtils.getCookie('GuestName');
        var guestAgentName = nvgUtils.getCookie('GAgentNameContact');
        //var guestAgentName = getCookieForLogin('GAgentNameContact');
        var gId = null, gEmail = null, gName = "";

        if (guestId != null && guestId != "")
            gId = guestId;
        else
            gId = null;
        if (guestEmail != null && guestEmail != "")
            gEmail = guestEmail;
        else if (guestAccount != null && guestAccount != "")
            gEmail = guestAccount;
        else
            gEmail = null;
        if (guestName != null && guestName != "") gName = guestName;
        else if (guestAgentName != null && guestAgentName != "") gName = guestAgentName;
        else gName = '';

        if (gId != null && gEmail != null && gId != "" && gEmail != "") {
            ;
        }
        else {
            var url__ = pathClient + "loginguest.aspx@url=" + _url;
            window.location.replace(url__);
        }
    },
    RemoveChar22: function (s) {
        var ss = encodeURI(s);
        while (ss.indexOf("%22") != -1) {
            ss = ss.replace("%22", '');
        };
        return decodeURI(ss);
    },
    GetPriceText: function (val, id, loaigia, loaiTien) {
        val = trim(val, ' ').replace(',', '.')
        if (!checkFloat(val)) {
            if (loaigia == "")
                document.getElementById(id).innerHTML = "Vui lòng nhập số!";
            else
                document.getElementById(id).innerHTML = "Nhập giá/m<sup>2</sup> chưa đúng!";
        }
        else {
            var _loaiGia = (loaigia != "" ? "../../" + loaigia : "");
            if (loaiTien == "1") {
                if (val < 1000)
                    document.getElementById(id).innerHTML = val + " Triệu" + _loaiGia;
                else {
                    document.getElementById(id).innerHTML = Math.round((val / 1000) * 100) / 100 + " Tỷ" + _loaiGia;
                }
            }
            else if (loaiTien == "3") {
                document.getElementById(id).innerHTML = val + " L SJC" + _loaiGia;
            }
            else if (loaiTien == "5") {
                document.getElementById(id).innerHTML = val + " USD" + _loaiGia;
            }
        }
    },
    CheckValidWords: function (string_) {
        var act = "act=chkvalidwrd";
        var url = pathClientAjax + "users/usrhandler.aspx?" + act;
        $.post(url, { s: string_ },
			function (data) {
			    if (data == "True") $('#hdfInputWords').val("1");
			    else $('#hdfInputWords').val("0");
			});
    },
    CheckSplitValue: function (strFind_, strSource_, char_) {
        var arr_ = strSource_.split(char_);

        for (var i = 0; i < arr_.length; i++) {
            if (arr_[i] == strFind_) return true;
        }
        return false;
    },
    BuildMainMenu: function () {
        $(".F_MenuMain li.mnuIndex").mouseover(
			function () {
			    $(".F_MenuMain li.mnuIndex").children(".mnuSubIndex").css("display", "none");
			    $(this).children(".mnuSubIndex").css("display", "block");

			    /* active hay deactive menu - current class*/
			    $(".F_MenuMain li.mnuIndex").children(".hrfSubMenu").removeClass("current");
			    $(this).children(".hrfSubMenu").addClass("current");
			}
		).mouseout(
			function () {
			    $(".F_MenuMain li.mnuIndex").children(".mnuSubIndex").css("display", "none");

			    /* clear all current and restore old current*/
			    $(".F_MenuMain li.mnuIndex").children(".hrfSubMenu").removeClass("current");
			    $('#' + nvgUtils.IdMenuTopCur).addClass("current");
			}
		);
    },
    BindDataMenu: function () {
        $('#MHome').html($('#MHome_bot').html());
        $('#MDuAn').html($('#MDuAn_bot').html());
        $('#MDoanhNghiep').html($('#MDoanhNghiep_bot').html());
        $('#MGiaCaTT').html($('#MGiaCaTT_bot').html());
        $('#MTinTuc').html($('#MTinTuc_bot').html());
        $('#MTuVan').html($('#MTuVan_bot').html());
        // $('#MDienDan').html($('#MDienDan_bot').html());//tam thoi an
        $('#MBanDo').html($('#MBanDo_bot').html());
        $('#MTapChi').html($('#MTapChi_bot').html());
        $('#MHoTro').html($('#MHoTro_bot').html());        //tam thoi an
    },
    SetActiveMenu: function () {
        /* sUrlHeader is rawurl*/
        if (sUrlHeader.indexOf("/duan/") != -1) {
            $('#aMDuAn').addClass("current");
            this.IdMenuTopCur = 'aMDuAn';
        }
        else if (sUrlHeader.indexOf("/cong_ty_bat_dong_san/") != -1) {
            $('#aMDoanhNghiep').addClass("current");
            this.IdMenuTopCur = 'aMDoanhNghiep';
        }
        else if (sUrlHeader.indexOf("/bang-gia-bat-dong-san/") != -1 || sUrlHeader.indexOf("/so-do-gia-du-an/") != -1) {
            $('#aMGiaCaTT').addClass("current");
            this.IdMenuTopCur = 'aMGiaCaTT';
        }
        else if (sUrlHeader.indexOf("/tin-tuc-bat-dong-san") != -1 || sUrlHeader.indexOf("/tin_tuc_bat_dong_san") != -1) {
            $('#aMTinTuc').addClass("current");
            this.IdMenuTopCur = 'aMTinTuc';
        }
        else if (sUrlHeader.indexOf("/tu-van-hoi-dap/") != -1) {
            $('#aMTuVan').addClass("current");
            this.IdMenuTopCur = 'aMTuVan';
        }
        else if (sUrlHeader.indexOf("/ddbatdongsan") != -1) {
            $('#aMDienDan').addClass("current");
            this.IdMenuTopCur = 'aMDienDan';
        }
        else if (sUrlHeader.indexOf("/ban-do/") != -1) {
            $('#aMBanDo').addClass("current");
            this.IdMenuTopCur = 'aMBanDo';
        }
        else if (sUrlHeader.indexOf("/tap-chi/") != -1 || sUrlHeader.indexOf("/tapchi.aspx") != -1) {
            $('#aMTapChi').addClass("current");
            this.IdMenuTopCur = 'aMTapChi';
        }
        else if (sUrlHeader.indexOf("/ho-tro/") != -1) {
            $('#aMHoTro').addClass("current");
            this.IdMenuTopCur = 'aMHoTro';
        }
        else $('#aMHome').addClass("current");
    },
    ShowPopupQuangCao: function () {
        if ($.cookie('popupQcFull') == null) {
            document.getElementById('frmPopupQc').src = $('#hdfPopupQUangCao').val();
            //   $('#frmPopupQc').centerInClient();

            var zz = $('#Form1').innerHeight();

            document.getElementById('inman_ad_blocks_interstitial').style.height = zz + "px";
            $('.whiteout').height(zz);

            if ($.cookie('popupQcFull') == null) $.cookie('popupQcFull', '1', { expires: 30, path: '/' });

            $('#inman_ad_blocks_interstitial').show();

            setTimeout("nvgUtils.ClosePopupQuangCao();", "15000");

            $('#inman_ad_blocks_interstitial').bind('click', function () { nvgUtils.ClosePopupQuangCao(); });
        }
        else this.ClosePopupQuangCao();
    },
    ClosePopupQuangCao: function () {
        $('#inman_ad_blocks_interstitial').hide();
    },
    DataNoteTopAgent: "",
    ShowNoteTopAgent: function () {
        // $('#' + $('#hdfCtlMst').val() + '_ali4').bind('click', function () { nvgUtils.ShowNoteTopAgent(); });

        if (this.DataNoteTopAgent != "") {
            $('#popupTopAgentVip').html(this.DataNoteTopAgent);
            $('#popupTopAgentVip').show();
            $('#popupTopAgentVip').centerInClient();
            return false;
        }
        else {
            var act = "act=spopupta";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    if (data != "0") {
			        $('#popupTopAgentVip').html(data);
			        $('#popupTopAgentVip').show();
			        $('#popupTopAgentVip').centerInClient();
			        nvgUtils.DataNoteTopAgent = data;
			        return false;
			    }
			    else return true;
			});
        }
    }
};

var nvgUrlRewriter =
{
	chkRedirectToSearchNormal: function()
	{
		var sSear="";
		if(nvgUtils.getCookie("TPTYPE")!=null&&nvgUtils.getCookie("TPTYPE")!="")
		{
			sSear=nvgUtils.getCookie("TPTYPE").split('#');	
			
			if(nvgUtils.getCookie("defSch")!=null&&nvgUtils.getCookie("defSch")!=""
				&&nvgUtils.getCookie("ttqtam")!=""&&nvgUtils.getCookie("ttqtam")!=null)
			{
				var dk=nvgUtils.getCookie("defSch").split('#');
				if(sSear[0]=="res")
					window.location.replace(this.getSearchNormalUrlRewrite(sSear[1],sSear[2],dk[0],dk[1],"_"+dk[2]));
				else 
					window.location.replace(this.getNormalComSearchURLRewrite(sSear[1],sSear[2],dk[0],dk[1],"_"+dk[2]));
			}
			else 
			{
				if(sSear[0]=="res")
					window.location.replace(this.getSearchNormalUrlRewrite(sSear[1],sSear[2],"3","59","_TP_Ho_Chi_Minh"));
				else 
					window.location.replace(this.getNormalComSearchURLRewrite(sSear[1],sSear[2],"3","59","_TP_Ho_Chi_Minh"));
			}
		}
	},
	getNormalComSearchURLRewrite: function (tType, pType,rRegion,sStateID,sSuffix)
	{
		var vRessearchLink="";
		
		if(rRegion=="1")
		{
			if(tType == "sale")
			{
				if(pType=="com")
				{
					vRessearchLink = "tim_ban_mat_bang/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="bus")
				{
					vRessearchLink = "tim_ban_cong_ty/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_ban_du_an/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else if(tType=="rent")
			{
				if(pType=="com")
				{
					vRessearchLink = "tim_thue_van_phong/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_dat_trien_khai_du_an/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else
			{
				if(pType=="bus")
				{
					vRessearchLink = "tim_dau_tu_doanh_nghiep/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_du_an_moi_dau_tu/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
		}
		if(rRegion=="2")
		{
			if(tType == "sale")
			{
				if(pType=="com")
				{
					vRessearchLink = "tim_ban_mat_bang/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="bus")
				{
					vRessearchLink = "tim_ban_cong_ty/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_ban_du_an/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else if(tType=="rent")
			{
				if(pType=="com")
				{
					vRessearchLink = "tim_thue_van_phong/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_dat_trien_khai_du_an/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else
			{
				if(pType=="bus")
				{
					vRessearchLink = "tim_dau_tu_doanh_nghiep/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_du_an_moi_dau_tu/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
		}
		if(rRegion=="3")
		{
			if(tType == "sale")
			{
				if(pType=="com")
				{
					vRessearchLink = "tim_ban_mat_bang/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="bus")
				{
					vRessearchLink = "tim_ban_cong_ty/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_ban_du_an/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else if(tType=="rent")
			{
				if(pType=="com")
				{
					vRessearchLink = "tim_thue_van_phong/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_dat_trien_khai_du_an/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else
			{
				if(pType=="bus")
				{
					vRessearchLink = "tim_dau_tu_doanh_nghiep/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="dev")
				{
					vRessearchLink = "tim_du_an_moi_dau_tu/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
		}
		
		return pathClient+vRessearchLink;
	},
	getSearchNormalUrlRewrite: function (tType, pType,rRegion,sStateID,sSuffix)
	{
		var vRessearchLink="";
		if(rRegion=="1")
		{
			if(tType == "sale")
			{
				if(pType=="home")
				{
					vRessearchLink = "tim_nha_ban/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="land")
				{
					vRessearchLink = "tim_dat_ban/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else
			{
				if(pType=="home")
				{
					vRessearchLink = "tim_nha_cho_thue/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="land")
				{
					vRessearchLink = "tim_dat_cho_thue/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="phongtro")
				{
					vRessearchLink = "tim_phong_tro_cho_thue/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="oghep")
				{
					vRessearchLink = "tim_phong_tro_o_ghep/mienbac/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
		}
		if(rRegion=="2")
		{
			if(tType == "sale")
			{
				if(pType=="home")
				{
					vRessearchLink = "tim_nha_ban/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="land")
				{
					vRessearchLink = "tim_dat_ban/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else
			{
				if(pType=="home")
				{
					vRessearchLink = "tim_nha_cho_thue/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="land")
				{
					vRessearchLink = "tim_dat_cho_thue/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="phongtro")
				{
					vRessearchLink = "tim_phong_tro_cho_thue/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="oghep")
				{
					vRessearchLink = "tim_phong_tro_o_ghep/mientrung/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
		}
		if(rRegion=="3")
		{
			if(tType == "sale")
			{
				if(pType=="home")
				{
					vRessearchLink = "tim_nha_ban/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="land")
				{
					vRessearchLink = "tim_dat_ban/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
			else
			{
				if(pType=="home")
				{
					vRessearchLink = "tim_nha_cho_thue/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="land")
				{
					vRessearchLink = "tim_dat_cho_thue/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="phongtro")
				{
					vRessearchLink = "tim_phong_tro_cho_thue/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
				if(pType=="oghep")
				{
					vRessearchLink = "tim_phong_tro_o_ghep/miennam/t"+sStateID+sSuffix+"../../default.htm";
				}
			}
		}
		return pathClient+vRessearchLink;
	}
};

var nvgData = {
    registerNewsletter: function (id) {
        if (!isEmail($('#' + id).val())) {
            alert("Email chưa đúng, vui lòng nhập email!!");
            return;
        }
        var act = "act=regnlt";
        var url = pathClientAjax + "handler/handler.aspx?" + act + "&d=" + (new Date()).getTime();
        $.post(url, { e: $('#' + id).val() },
			function (data) {
			    alert(data);
			});
    },
    ListPropertyNewest: function (st_, sb_) {
        var url = pathClientAjax + "handler/Handler.aspx@act=newestpi&d=" + (new Date()).getTime();
        $('ListPiNewest').html("<li><img alt=''src=" + pathClient + "/images/loading.gif></li>");
        $.post(url, { st: st_, sb: sb_ },
                function (data) {
                    if (data != "") {
                        $('#ListPiNewest').html(data.split('###')[0]);
                        $('#bds24h').html(data.split('###')[1]);
                    }
                    else {
                        $('#ListPiNewest').html("");
                    }
                }
            );
    },
    saveSearchClick: function (condi) {
        var act = "act=savs";
        var url = pathClientAjax + "handler/Misc.aspx?" + act;
        $.post(url, { condi: condi },
			function (data) {
			    if (data == "0") Signin();
			    else alert(data);
			});
    },
    saveSearchClickNormal: function (proclass, transclass, stateid) {
        var sDk = SetDataForSearchNrm();
        var f_ = "";
        var t_ = "";
        if (proclass != 'com' && proclass != 'bus' && proclass != 'dev') {
            f_ = "res-" + transclass + "-" + proclass;
            t_ = "res#" + transclass + "#" + proclass;
        }
        else {
            f_ = "com-" + transclass + "-" + proclass;
            t_ = "com#" + transclass + "#" + proclass;
        }

        var s_ = "tck=" + f_ + "&state=" + stateid + sDk;
        nvgData.saveSearchClick(t_ + "#" + s_);
    },
    saveSearchClickAdv: function (proclass, transclass, stateid) {
        var sDk = SetDataForSearchAdv();
        var f_ = "";
        var t_ = "";
        if (proclass != 'com' && proclass != 'bus' && proclass != 'dev') {
            f_ = "res-" + transclass + "-" + proclass;
            t_ = "res#" + transclass + "#" + proclass;
        }
        else {
            f_ = "com-" + transclass + "-" + proclass;
            t_ = "com#" + transclass + "#" + proclass;
        }

        var s_ = "tck=" + f_ + "&state=" + stateid + sDk;
        nvgData.saveSearchClick(t_ + "#" + s_);
    },
    submitAlertNrm: function () {
        if ($("#txtCEAlert_FormSearch").val() > 9) {
            alert("Số tin thư báo phải nhỏ hơn 10, vui lòng xóa bớt!")
            return false;
        }

        if (trim(document.getElementById("txtMinTyping").value, ' ') != "" && !checkFloat(trim(document.getElementById("txtMinTyping").value, ' '))) {
            alert("Giá từ phải là kiểu số!");
            document.getElementById("txtMinTyping").focus();
            return false;
        }
        if (trim(document.getElementById("txtMaxTyping").value, ' ') != "" && !checkFloat(trim(document.getElementById("txtMaxTyping").value, ' '))) {
            alert("Giá tới phải là kiểu số!");
            document.getElementById("txtMaxTyping").focus();
            return false;
        }
        if (parseFloat(document.getElementById("txtMinTyping").value) != 0 &&
			parseFloat(document.getElementById("txtMinTyping").value) > parseFloat(document.getElementById("txtMaxTyping").value)) {
            alert("Giá từ phải nhỏ hơn giá tới!");
            document.getElementById("txtMinTyping").focus();
            return false;
        }

        var param = {
            state: $("#txtStateID").val()
			, suburb: $("#txtSuburb").val()
			, pclass: nvgUtils.getLoaiBDS__($("#txtProClass").val())
			, tran: nvgUtils.getLoaiGD__($("#txtTranClass").val())
			, min: $("#txtMinTyping").val()
			, max: $("#txtMaxTyping").val()
			, kieubds: $("#txtPropertyType").val()
			, duan: $("#txtEstate").val()
			, tenthubao: 'Tìm Bđs'
			, phuongthuc: 0
			, ppublic: 0
        };
        $.post(pathClientAjax + "handler/Post.aspx?", param,
 			function (data) {
 			    if (data != "0")
 			        alert("Bạn đã lưu tìm kiếm dạng thư báo thành công");
 			    else Signin();
 			});
    },
    submitAlertAdv: function () {
        if ($("#txtCEAlert_FormSearch").val() > 9) {
            alert("Số tin thư báo phải nhỏ hơn 10, vui lòng xóa bớt!")
            return false;
        }

        if (trim(document.getElementById("txtMinTyping").value, ' ') != "" && !checkFloat(trim(document.getElementById("txtMinTyping").value, ' '))) {
            alert("Giá từ phải là kiểu số!");
            document.getElementById("txtMinTyping").focus();
            return false;
        }
        if (trim(document.getElementById("txtMaxTyping").value, ' ') != "" && !checkFloat(trim(document.getElementById("txtMaxTyping").value, ' '))) {
            alert("Giá tới phải là kiểu số!");
            document.getElementById("txtMaxTyping").focus();
            return false;
        }
        if (parseFloat(document.getElementById("txtMinTyping").value) != 0 &&
			parseFloat(document.getElementById("txtMinTyping").value) > parseFloat(document.getElementById("txtMaxTyping").value)) {
            alert("Giá từ phải nhỏ hơn giá tới!");
            document.getElementById("txtMinTyping").focus();
            return false;
        }
        if (!checkFloat(trim(document.getElementById("txtDientich").value, ' '))) {
            alert("Diện tích phải là kiểu số!");
            document.getElementById("txtDientich").focus();
            return false;
        }

        // 	if(!isAllDigit(document.getElementById("txtSpn").value))
        // 	{
        // 		alert("Bedroom must a number!!");
        // 		document.getElementById("txtSpn").focus();
        // 		return false;
        // 	}
        // 	if(!isAllDigit(document.getElementById("txtSpt").value))
        // 	{
        // 		alert("Bathroom must a number!!");
        // 		document.getElementById("txtSpt").focus();
        // 		return false;
        // 	}
        if (!checkFloat(trim(document.getElementById("txtDientichSD").value, ' '))) {
            alert("Diện tích sử dụng phải là kiểu số!");
            document.getElementById("txtDientichSD").focus();
            return false;
        }
        if (!checkFloat(trim(document.getElementById("txtMinStreet").value, ' '))) {
            alert("Đường trước nhà phải là kiểu số!");
            document.getElementById("txtMinStreet").focus();
            return false;
        }
        if (!checkFloat(trim(document.getElementById("txtMinfront").value, ' '))) {
            alert("Mặt tiền phải là kiểu số!");
            document.getElementById("txtMinfront").focus();
            return false;
        }
        var param = {
            state: $("#txtStateID").val()
			, suburb: $("#txtSuburb").val()
			, pclass: nvgUtils.getLoaiBDS__($("#txtProClass").val())
			, tran: nvgUtils.getLoaiGD__($("#txtTranClass").val())
			, min: $("#txtMinTyping").val()
			, max: $("#txtMaxTyping").val()
			, kieubds: $("#txtPropertyType").val()
			, huong: $("#txtHuong").val()
			, phuong: $("#sltPhuong").val()
			, duong: $("#sltDuong").val()
			, duan: $("#txtEstate").val()
			, phaply: $("#FormSearch_cbOwnerType").val()
			, dientich: $("#txtDientich").val()
			, mattien: $("#txtMinfront").val()
			, dientichSD: $("#txtDientichSD").val()
			, phongngu: ''
			, tenthubao: 'Tìm Bđs'
			, motakhac: ''
			, phuongthuc: 0
			, ppublic: 0
        };

        $.post(pathClientAjax + "handler/Post.aspx?", param,
 			function (data) {
 			    if (data != "0")
 			        alert("Bạn đã lưu tìm kiếm dạng thư báo thành công");
 			    else Signin();
 			});
    },
    CountEmailAlert: function () {
        $.post(pathClientAjax + "handler/handler.aspx@act=cealert", '',
 			function (data) {
 			    if (document.getElementById('txtCEAlert_FormSearch') != null)
 			        document.getElementById('txtCEAlert_FormSearch').value = data;
 			});
    },
    Signin: function (url_) {
        var act = "act=showformlogin";
        $.get(pathClientAjax + "handler/LogHandler.aspx", act + "&d=" + (new Date()).getTime() + "&lnk=" + url_,
 			function (data) {
 			    if (data != "") {
 			        $('#login_box').html(data);
 			        $('#login_box_popup_header').html("Đăng nhập");
 			        $('#login_box').show();
 			        $('#divLoginMes').show();
 			    }
 			    else {
 			        $('#login_box').hide();
 			    }
 			});
    },
    LoadTtqt: function () {
        var _cke = nvgUtils.getCookie("ttqt");

        if (_cke != "") {
            if (!nvgUtils.CheckSplitValue(_cke.split("#")[0], TopProvinces, ',')) {
                var _url = pathClient + _cke.split("#")[1] + "-t" + _cke.split("#")[0] + "/";

                var act = "act=getstatename";
                var url = pathClientAjax + "handler/handler.aspx?" + act;
                $.post(url, { st: _cke.split("#")[0] },
			        function (data) {
			            if (data != "") {
			                $("#liIdxTTQT").html("<a href=\"" + _url + "\">" + data + "</a>");
			                $("#liIdxTTQT").show();

			                $("#liIdxTTQTFST").html("<a href=\"" + _url + "\">" + data + "</a>");
			                $("#liIdxTTQTFST").show();

			                $('#iptState').val(data);
			            }
			        });
            }
            else if (!nvgUtils.CheckSplitValue(_cke.split("#")[0], "59,28,31", ',')) {
                var _url = pathClient + _cke.split("#")[1] + "-t" + _cke.split("#")[0] + "/";

                var act = "act=getstatename";
                var url = pathClientAjax + "handler/handler.aspx?" + act;
                $.post(url, { st: _cke.split("#")[0] },
			    function (data) {
			        if (data != "") {
			            // 			            $("#liIdxTTQT").html("<a href=\"" + _url + "\">" + data + "</a>");
			            // 			            $("#liIdxTTQT").show();

			            $("#liIdxTTQTFST").html("<a href=\"" + _url + "\">" + data + "</a>");
			            $("#liIdxTTQTFST").show();

			            $('#iptState').val(data);
			        }
			    });
            }
            else {
                $("#liIdxTTQTFST_" + _cke.split("#")[0]).addClass("highlight");
            }
        }
    },
    DemBDSTheoLoai: function () {
        if (NvgDataMainMnu.LoaiBDS.length == 0) {
            var act = "act=dembdstloai";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.LoaiBDS = data.lst;
			    if (data != "") {
			        for (var i = 0; i < NvgDataMainMnu.LoaiBDS.length; i++) {
			            var dem_ = NvgDataMainMnu.LoaiBDS[i].s1;
			            var pt_ = NvgDataMainMnu.LoaiBDS[i].s2;
			            var tt_ = NvgDataMainMnu.LoaiBDS[i].s3;

			            if ($('#spBDS_' + pt_ + '_' + tt_) != undefined) {
			                $("#spBDS_" + pt_ + '_' + tt_).html("(" + dem_ + ")");
			            }
			        }
			    }
			}, 'json');
        }
        else {
            for (var i = 0; i < NvgDataMainMnu.LoaiBDS.length; i++) {
                var dem_ = NvgDataMainMnu.LoaiBDS[i].s1;
                var pt_ = NvgDataMainMnu.LoaiBDS[i].s2;
                var tt_ = NvgDataMainMnu.LoaiBDS[i].s3;

                if ($('#spBDS_' + pt_ + '_' + tt_) != undefined) {
                    $("#spBDS_" + pt_ + '_' + tt_).html("(" + dem_ + ")");
                }
            }
        }
    },
    LoadDuAnVipMnu: function () {
        if (NvgDataMainMnu.DuAnVip == "") {
            var act = "act=loaddavipmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			    function (data) {
			        NvgDataMainMnu.DuAnVip = data;
			        if (data != "0")
			            $('#ulDaVipMainMnu').html(NvgDataMainMnu.DuAnVip);
			    });
        }
        else {
            if (NvgDataMainMnu.DuAnVip != "0")
                $('#ulDaVipMainMnu').html(NvgDataMainMnu.DuAnVip);
        }
    },
    LoadDNVipMnu: function () {
        if (NvgDataMainMnu.DoanhNghiepVip == "") {
            var act = "act=loaddnvipmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.DoanhNghiepVip = data;
			    if (data != "0")
			        $('#ulDNVipMainMnu').html(NvgDataMainMnu.DoanhNghiepVip);
			});
        }
        else {
            if (NvgDataMainMnu.DoanhNghiepVip != "0")
                $('#ulDNVipMainMnu').html(NvgDataMainMnu.DoanhNghiepVip);
        }
    },
    LoadTapChiMnu: function () {
        if (NvgDataMainMnu.TapChi == "") {
            var act = "act=loadtcmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TapChi = data;
			    if (data != "0")
			        $('#ulListTapChiMnu').html(NvgDataMainMnu.TapChi);
			});
        }
        else {
            if (NvgDataMainMnu.TapChi != "0")
                $('#ulListTapChiMnu').html(NvgDataMainMnu.TapChi);
        }
    },
    LoadTinTucNoiBatMnu: function () {
        if (NvgDataMainMnu.TinTucNoiBat == "") {
            var act = "act=loadtinnoibatmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TinTucNoiBat = data;
			    $('#divTinTucNoiBatMnu').html(NvgDataMainMnu.TinTucNoiBat);
			});
        }
        else {
            $('#divTinTucNoiBatMnu').html(NvgDataMainMnu.TinTucNoiBat);
        }
        nvgData.LoadNewsTopicMnu();
    },
    LoadNewsTopicMnu: function () {
        if (NvgDataMainMnu.NewsTopic == "") {
            var act = "act=loadnewstopic";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.NewsTopic = data;
			    $('#ulNewsTopicMainMnu').html(NvgDataMainMnu.NewsTopic);
			});
        }
        else {
            $('#ulNewsTopicMainMnu').html(NvgDataMainMnu.NewsTopic);
        }
    },
    LoadTuVanPhongThuyMnu: function () {
        if (NvgDataMainMnu.TuVanPhongThuy == "") {
            var act = "act=loadtuvanphongthuy";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TuVanPhongThuy = data;
			    $('#ulTuVanPhongthuyMainMnu').html(NvgDataMainMnu.TuVanPhongThuy);
			});
        }
        else {
            $('#ulTuVanPhongthuyMainMnu').html(NvgDataMainMnu.TuVanPhongThuy);
        }
        nvgData.LoadTuVanPhapLyMnu();
    },
    LoadTuVanPhapLyMnu: function () {
        if (NvgDataMainMnu.TuVanPhapLy == "") {
            var act = "act=loadtuvanphaply";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TuVanPhapLy = data;
			    $('#ulTuVanPhapLyMainMnu').html(NvgDataMainMnu.TuVanPhapLy);
			});
        }
        else {
            $('#ulTuVanPhapLyMainMnu').html(NvgDataMainMnu.TuVanPhapLy);
        }
    },
    LoadBanDoQuyHoachMnu: function () {
        if (NvgDataMainMnu.BanDoQuyHoach == "") {
            var act = "act=loadbandoquyhoach";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.BanDoQuyHoach = data;
			    $('#divbdquyhoach').html(NvgDataMainMnu.BanDoQuyHoach);
			});
        }
        else {
            $('#divbdquyhoach').html(NvgDataMainMnu.BanDoQuyHoach);
        }
    },
    LoadChuyenGiaTVanMnu: function () {
        if (NvgDataMainMnu.ChuyenGiaTVan == "") {
            var act = "act=loadcgtvmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.ChuyenGiaTVan = data;
			    $('#divChuyenGiaTVMnu').html(NvgDataMainMnu.ChuyenGiaTVan);
			});
        }
        else {
            $('#divChuyenGiaTVMnu').html(NvgDataMainMnu.ChuyenGiaTVan);
        }
    },
    LoadTinhThanhDAMnu: function () {
        if (NvgDataMainMnu.TThanhDuAn == "") {
            var act = "act=loadttdamnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TThanhDuAn = data;
			    $('#lstState').html(NvgDataMainMnu.TThanhDuAn);
			    $('#ttpopup').show();
			});
        }
        else {
            $('#lstState').html(NvgDataMainMnu.TThanhDuAn);
            $('#ttpopup').show();
        }
    },
    LoadTinhThanhDNMnu: function () {
        if (NvgDataMainMnu.TThanhDoanhNghiep == "") {
            var act = "act=loadttdnmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TThanhDoanhNghiep = data;
			    $('#lstState').html(NvgDataMainMnu.TThanhDoanhNghiep);
			    $('#ttpopup').show();
			});

        }
        else {
            $('#lstState').html(NvgDataMainMnu.TThanhDoanhNghiep);
            $('#ttpopup').show();
        }
    },
    LoadTinhThanhTTMnu: function () {
        if (NvgDataMainMnu.TThanhTinTuc == "") {
            var act = "act=loadttttmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TThanhTinTuc = data;
			    $('#lstState').html(NvgDataMainMnu.TThanhTinTuc);
			    $('#ttpopup').show();
			});
        }
        else {
            $('#lstState').html(NvgDataMainMnu.TThanhTinTuc);
            $('#ttpopup').show();
        }
    },
    LoadTinhThanhBDMnu: function () {
        if (NvgDataMainMnu.TThanhBanDo == "") {
            var act = "act=loadttbdmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TThanhBanDo = data;
			    $('#lstState').html(NvgDataMainMnu.TThanhBanDo);
			    $('#ttpopup').show();
			});
        }
        else {
            $('#lstState').html(NvgDataMainMnu.TThanhBanDo);
            $('#ttpopup').show();
        }
    },
    LoadQuanHuyenBDMnu: function () {
        if (NvgDataMainMnu.QHBanDo == "") {
            var act = "act=loadqhbdmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.QHBanDo = data;
			    $('#lstSuburbs').html(NvgDataMainMnu.QHBanDo);
			    $('#qhpopup').show();
			});
        }
        else {
            $('#lstSuburbs').html(NvgDataMainMnu.QHBanDo);
            $('#qhpopup').show();
        }
    },
    LoadQuanHuyenTinTTMnu: function () {
        if (NvgDataMainMnu.QHTinTT == "") {
            var act = "act=loadqhtinttmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.QHTinTT = data;
			    $('#lstSuburbs').html(NvgDataMainMnu.QHTinTT);
			    $('#qhpopup').show();
			});
        }
        else {
            $('#lstSuburbs').html(NvgDataMainMnu.QHTinTT);
            $('#qhpopup').show();
        }
    },
    LoadTinhThanhLeftMnu: function () {
        if (NvgDataMainMnu.TThanhLeftMenu == "") {
            var act = "act=loadttleftmnu";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    NvgDataMainMnu.TThanhLeftMenu = data;
			    $('#lstState').html(NvgDataMainMnu.TThanhLeftMenu);
			    $("#ttpopup").centerInClient({ minY: 1 });
			    $('#ttpopup').show();
			});
        }
        else {
            $('#lstState').html(NvgDataMainMnu.TThanhLeftMenu);
            $("#ttpopup").centerInClient({ minY: 1 });
            $('#ttpopup').show();
        }
    },
    LoadTinhThanhLeftMnuDM: function (lbds_, lbdsn_, lgd_, lgdn_, kbds_, kbdsn_) {
        if (NvgDataMainMnu.TThanhLeftMenuDM == "") {
            var act = "act=loadttleftmnudm";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, { lbds: lbds_, lbdsn: lbdsn_, lgd: lgd_, lgdn: lgdn_, kbds: kbds_, kbdsn: kbdsn_ },
			function (data) {
			    NvgDataMainMnu.TThanhLeftMenuDM = data;
			    $('#lstState').html(NvgDataMainMnu.TThanhLeftMenuDM);
			    $("#ttpopup").centerInClient({ minY: 1 });
			    $('#ttpopup').show();
			});
        }
        else {
            $('#lstState').html(NvgDataMainMnu.TThanhLeftMenuDM);
            $("#ttpopup").centerInClient({ minY: 1 });
            $('#ttpopup').show();
        }
    },
    LoadTinhThanhEstCenter: function (catid) {
        // if (NvgDataMainMnu.TThanhEstCenter == "") {
        var act = "act=loadttestcenter";
        var url = pathClientAjax + "handler/handler.aspx?" + act;
        $.post(url, { cid: catid },
			function (data) {
			    //  NvgDataMainMnu.TThanhEstCenter = data;
			    $('#lstState').html(data);
			    $("#ttpopup").centerInClient({ minY: 1 });
			    $('#ttpopup').show();
			});
        //         }
        //         else {
        //             $('#lstState').html(NvgDataMainMnu.TThanhEstCenter);
        //             $("#ttpopup").centerInClient({ minY: 1 });
        //             $('#ttpopup').show();
        //         }
    },
    DemSoBdsDaLuu: function () {

        var guestEmail = nvgUtils.getCookie('GuestEmail');
        var guestAccount = nvgUtils.getCookie('UserName');
        if (guestEmail != "" && guestAccount != "") {
            var act = "act=countbdsdaluu";
            var url = pathClientAjax + "handler/PropertyHandler.aspx?" + act;
            $.post(url, {},
			function (data) {
			    if (data != "0") {
			        $('#spnCountBDSDaLuu').html(data + " BĐS");
			        $('#divDemSoBdsDaLuu').show();
			    }
			    else {
			        $('#spnCountBDSDaLuu').html("0 BĐS");
			    }
			});
        }
        else {
            if (nvgUtils.getCookie('BDSfavorite').split('=')[1] != "") {
                var arrBDS_ = uniqueArr(trim(nvgUtils.getCookie('BDSfavorite').split('=')[1], ',').split(','));
                if (arrBDS_ != "" && arrBDS_.length > 0) {
                    $('#spnCountBDSDaLuu').html(arrBDS_.length + " BĐS");
                    $('#divDemSoBdsDaLuu').show();
                }
            }
            else {
                $('#divDemSoBdsDaLuu').hide();
            }
            if (nvgUtils.getCookie('ShortList').split('=')[1] != "") {
                nvgUtils.setCookie('ShortList', '', 1);
            }
        }
    },
    ShowBdsDaLuuQ: function () {
        var act = "act=lbdsdaluu";
        var url = pathClientAjax + "handler/PropertyHandler.aspx?" + act;
        $.post(url, {},
			function (data) {
			    $('#ulListBDSDaLuuQ').html("");
			    var obj = data.l;

			    var li_ = $.template("<li><div class=\"bullet_3\"></div><a href=\"${eUrl}\"><span>${eSuburb}:</span> ${eTitle} ${eGia}</a></li>");
			    for (var i = 0; i < obj.length; i++) {
			        var url_ = obj[i].s5;
			        var sub_ = obj[i].s2;
			        var gia_ = obj[i].s4;
			        var til_ = obj[i].s3;
			        if (gia_ != "") gia_ = "(<font class=\"ColorStyle_1\">" + gia_ + "</font>)";
			        $('#ulListBDSDaLuuQ').append(li_, { eUrl: url_, eSuburb: sub_, eGia: gia_, eTitle: til_ });
			    }
                /*
                 *	kiem tra user
                 */
			    if ($.cookie("LoginType") != null && $.cookie("LoginType") != "") {
			        $('#ulListBDSDaLuuQ').append($.template("<li id=\"liXemTatCaBDSLuu\" class=\"lastLiBDSLuu\"><a href=\"${eUrl}\">${eTitle}</a></li>")
                    , { eUrl: pathClient + "users/main.aspx@ctl=6&itm=5", eTitle: "Xem tất cả" });
			    }
			    /* set scroll cho ul*/
			    var maxHeight = 200;
			    if ($('#ulListBDSDaLuuQ').innerHeight() > maxHeight) {
			        document.getElementById('ulListBDSDaLuuQ').style.overflowY = "scroll";
			        document.getElementById('ulListBDSDaLuuQ').style.height = maxHeight + "px";
			    }
			    /*
			    *	end
			    */
			    $('#divListBDSDaLuuQ').show();
			}, 'json');
    },
    OpenCloseBDSSaved: function (status_) {
        if (status_ == "mo") {
            $('.bt_up_2').hide();
            $('.bt_down_2').show();
            nvgData.ShowBdsDaLuuQ();
            $('#divListBDSDaLuuQ').show();

            document.getElementById('divOpClQuickSaveBds').onclick = function () {
                nvgData.OpenCloseBDSSaved("dong");
            };
        }
        else {
            $('.bt_up_2').show();
            $('.bt_down_2').hide();
            $('#divListBDSDaLuuQ').hide();

            document.getElementById('divOpClQuickSaveBds').onclick = function () {
                nvgData.OpenCloseBDSSaved("mo");
            };
        }
    },
    AdsSavedClicks: function (adsId, adsName, companyName) {
        var act = "act=InsertAdsStatic";
        var param = "&adsId=" + adsId + "&adsName=" + encodeURI(adsName) + "&companyName=" + encodeURI(companyName);

        $.get(pathClientAjax + "handler/AdsHandler.aspx", act + param,
 			function (data) {
 			});

    }
};
/* cac bien data ajax cho main menu*/
var NvgDataMainMnu = {
    LoaiBDS: [],
    DuAnVip: "",
    DoanhNghiepVip: "",
    TapChi: "",
    TinTucNoiBat:"",
    TThanhDuAn:"",
    TThanhDoanhNghiep:"",
    TThanhTinTuc:"",
    TThanhBanDo:"",
    TThanhLeftMenu: "",
    TThanhLeftMenuDM: "",
    TThanhEstCenter:"",
    NewsTopic:"",
    TuVanPhongThuy:"",
    TuVanPhapLy:"",
    QHBanDo:"",
    QHTinTT:"",
    BanDoQuyHoach:"",
    ChuyenGiaTVan:""
};

function Notify()
{
	var act = "act=notify";
	$.get(pathClientAjax+"handler/LogHandler.aspx",act,
 			function(data){
 				if(data!=""){
 					$('#login_box_popup_header').html("Notify");
 					$('#contentlogin').html(data);
 					$("#login_box").centerInClient();
	 				$('#login_box').show(); 
 				}
 				else
 				{
 					$('#login_box').hide();
 				}
 			});
 			
}
function showdangtin()
{
	document.getElementById("uldangtin").style.display="block";
}
function hiddendangtin()
{
	document.getElementById("uldangtin").style.display="none";
}

function doiTinhThanh(_objSelectName,_id,val_)
{
	if(_id!="")
	{
		$.post(pathClient+"handler/StateGet.aspx@suburb=json&stateid="+_id,{},
		function(data){				
			var obj = data.lst;
			var obj_select = document.getElementById(_objSelectName);
			removeSelectbox(_objSelectName,"Chọn");
			if(obj.length > 0){	
				for(var k = 0; k < obj.length; k++){
					var options_length = obj_select.length;
					var option_value = obj[k].s1;
					var option_text  = obj[k].s2;
					obj_select.options[options_length] = new Option(option_text,option_value);
				}
				obj_select.disabled = false;
				if(val_!=undefined) 
				{
					obj_select.value=val_;				
				}
			}
			
		},'json');
	}	
	else 		removeSelectbox(_objSelectName,"Chọn");
}
function removeSelectbox(objID,initText){
			if(initText && initText.indexOf('*') != -1)
				initText = initText.replace('***','Chọn');
			var obj_select = document.getElementById(objID);
			obj_select.disabled = true;
			for(var k = obj_select.options.length-1; k >=0 ; k--){
				obj_select.options[k] = null;
			}
			if (initText != undefined || initText != null) {
				if(initText!='')obj_select.options[0] = new Option(initText,"");
			}
		}
function removeSelectboxEnable(objID,initText){
			if(initText && initText.indexOf('*') != -1)
				initText = initText.replace('***','Chọn');
			var obj_select = document.getElementById(objID);
			for(var k = obj_select.options.length-1; k >=0 ; k--){
				obj_select.options[k] = null;
			}
			if (initText != undefined || initText != null) {
				if(initText!='')obj_select.options[0] = new Option(initText,"");
			}
		}
function validateEmailAddr(email_Id) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   var address = document.getElementById(email_Id).value;
   if(reg.test(address) == false) {
      return false;
   }
   return true;
}
function LayDuAnTheoQuanHuyen(id,select)
{
	if(id!="")
	{
		removeSelectbox(select,"Loading...");	
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
 
 var msg_txtbox='Please enter data for the required field(s).';
 var msg_select='Please choose data for the required field(s).';

 function  isEmailYahoo(s)
 {
    if(!isEmail(s)) return false ;
	var ar_=  s.split("@");
	
	if( ar_[1]!='yahoo.com' )
	 return false ;
	 
	 return true ;
	
	
 }
function isEmail (s)
{   
	if (isEmpty(s)) 
		if (isEmail.arguments.length == 1) return false;
		else return (isEmail.arguments[1] == true);
		
  if (isWhitespace(s)) return false;
  
  var i = 1;
  var sLength = s.length;

  while ((i < sLength) && (s.charAt(i) != "@"))
  { i++
  }

  if ((i >= sLength) || (s.charAt(i) != "@")) return false;
  else i += 2;

  while ((i < sLength) && (s.charAt(i) != "."))
  { i++
  }
  		
	/*if ((s.indexOf(".com")<5)&&(s.indexOf(".org")<5)
		&&(s.indexOf(".gov")<5)&&(s.indexOf(".net")<5)
		&&(s.indexOf(".mil")<5)&&(s.indexOf(".edu")<5))
	{
		return false;
	}*/

  if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
  else return true;
}

function isWhitespace (s)
{   
	var whitespace = " \t\n\r";
	var i;

  if (isEmpty(s)) return true;
  for (i = 0; i < s.length; i++)
  {   
    var c = s.charAt(i);
    if (whitespace.indexOf(c) == -1) return false;
  }
  return true;
}

function isDigit (c)
{	return ((c >= "0") && (c <= "9"))
}

function isAllDigit (s)
{   
  var i;
  if (isEmpty(s)) 
     if (isAllDigit.arguments.length == 1) return false;
     else return (isDigital.arguments[1] == true);
  for (i = 0; i < s.length; i++)
  {   
    var c = s.charAt(i);
    if (isDigit(c)==false)
    return false;
  }
  return true;
}

function isEmpty(s)
{   
	return ((s == null) || (s.length == 0))
}

function isStateCode(s)
{
	if (s.length !=2) return false;
	s = s.toUpperCase();
	var USStateCodeDelimiter = "|";
	var USStateCodes = "AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|AE|AA|AE|AE|AP"
	if (isEmpty(s)) 
		if (isStateCode.arguments.length == 1) return false;
    else return (isStateCode.arguments[1] == true);
	return ((USStateCodes.indexOf(s) != -1) && (s.indexOf(USStateCodeDelimiter) == -1))
}


function isPhone(s)
{
	if ( s.indexOf("+")>=0 && s.indexOf("+")!=0 ){
		return false;
	}
	var temp1 = s.split("(")
	var temp2 = s.split(")")
	var temp3 = s.split("-")
	var temp4 = s.split(".")
	if ( temp1.length >=3 || temp2.length>=3){
		return false
	}
/*	if (temp3.length+ temp4.length >=4){
		return false
	}*/
	if ( temp1.length != temp2.length ){
		return false;
	}
	if ( s.indexOf("(")>= 0 && s.indexOf(")")>=0 && s.indexOf(")") <= s.indexOf("(") ){
		return false;
	}
	if ( s.indexOf (")") >=0 && s.indexOf("-")>=0 && s.indexOf("-") <= s.indexOf(")") )
	{
		return false;
	}
	if ( s.indexOf (")") >=0 && s.indexOf(".")>=0 && s.indexOf(".") <= s.indexOf(")") )
	{
		return false;
	}
	for (var i=0;i < s.length;i++){
		var c= s.charAt(i);
		if (!isDigit(c) && c!="+"&& c!="("&& c!=")"&& c!="."&& c!="-"&& c!=" "){
			return false
		}
	}
	return true;
}

function checkDate(strdate,type)
  
  // TestDate(StringdateToChange,TypeOfFormat,StringOut)
  // StringdateToChange : Ngay muon kiem tra hop le
  // TypeOfFormat : Dang truyen vao cua ngay muon kiem tra hop le:
  // TypeOfFormat =1 : Truyen vao dd/mm/yyyy
  // TypeOfFormat =2 : Truyen vao mm/dd/yyyy
  // Tri tra ve cua ham 1: Ngay hop le
  //		      0: Ngay khong hop le rterretret
  {  
	var m,d,y;

	var t=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
	var s, pos1,pos2;
	var s = strdate;	
	if (s.length==0) return false;
	pos1=s.indexOf("/",0);
	pos2=s.indexOf("/",pos1+1);
	if ((pos1<0)||(pos2<0))
	{		
		return false;
	}
	d=parseInt(s.substr(0,pos1),10);
	m=parseInt(s.substr(pos1+1,pos2-pos1-1),10);
	y=parseInt(s.substr(pos2+1,s.length-pos2-1),10);
	var y1=s.substr(pos2+1,s.length-pos2-1);
	if (y1.length!=4) 
	 {	 
	   return false;
	 }
	if (y%4==0){
		if ((y%100) ==0 && (y%400) != 0){
			t[2]=28;
		}
		//Nam nhuan
		else{
			t[2]=29;
		    }
		}
	if (type == 1) {
		if ( (t[m]<d)||(d<1) || (m<1) || (m>12)){		
			return false;
		}
		}	
	if (type == 2){
		if ((t[d]<m)||(m<1) || (d<1) || (d>12)){		
			return false;
		}
		}
	return true;	
   }// end Testday
function checkNumber(str){
	var a, st;
	st= str;
	for (var i=0;i< st.length; i++){
		if (st.charAt(i) < '0' || st.charAt(i)>'9'){
			if (st.charAt(i) != '.') {
				return false;
			} 
		}
	}
	return true;
}
//chuoi dua vao la ki tu so
function ischeckNumber(str){
	var a, st;
	st= str;
	for (var i=0;i< st.length; i++){
		if (st.charAt(i) < '0' || st.charAt(i)>'9')
		{
				return false;
		}
	}
	return true;
}
function checkFloat(str){
	var a, st;
	st= str;
	var numi=0;
	for (var i=0;i< st.length; i++){
		if (st.charAt(i) < '0' || st.charAt(i)>'9'){
			if (st.charAt(i) != '.') 
			{
				return false;
			} 
			else
			{
				if(i==0) return false;
				numi += 1;
			}
		}//End If
	}
	if(numi>1) return false;
	return true;
}
function checkFloatKeyPress(event) {
    var st = event.keyCode ? event.keyCode : event.charCode;    
   
    // 46 : '.' - 48: '0' - 57 : '9'
    if ((st >= 48 && st <= 57) || (st==46) ) {
        return true;
    }   
    return false;    
}
function webdialog_(url,width_,height_){
	var cSearchValue=showModalDialog(url,0,"dialogWidth:width_;dialogHeight:height_");
	
	if (cSearchValue == -1 || cSearchValue == null)
        {
	   alert('You clicked cancel or the close box');	
	}
	else if (cSearchValue=="")
        {
	   alert('You did not enter a value');
	}
	else
	{
	   alert('You want to search for ' + cSearchValue);
	}
}
//10 digit -- 090 091 098 095
function isMobilePhone(s)
{
  
	if( s.length !=11 && s.length !=10)
	{
	 return false ;
	}
	var head_ =	s.substr(0,3) ;
	//alert(s);
	//alert(head_);
	if ( !((head_ =='090')||(head_ =='091')||(head_ =='098')||(head_ =='095')||(head_ =='012')||(head_ =='094')||(head_ =='093')||(head_ =='092')||(head_ =='016')||(head_ =='096')||(head_ =='097')||(head_ =='098')||(head_ =='019')) ) 
	{
		return false ;
	}
	if(  ischeckNumber(s) == false)
	{
		return false ;
	}
	return true ;

}
// template : 08-7535841 or 066-753584
function checkPhoneNumber_( phone_)
{

  //08-222441232

	  if(phone_.length != 10)
	  return false ;

	
	if (! ((phone_.indexOf("-") ==2) ||(phone_.indexOf("-") ==3) )  )
	{
	  return false ;
	}
	var array_ = phone_.split("-");
	for( var i = 0 ; i <array_.length  ; i++)
	{

	 if( ischeckNumber(array_[i])  == false)
	 {
	  return false ;
	 }
	}
	
	return true ;

}

function checkDate_1(day,month,year)
{
   var monthLength = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var dateExists = true;	
	var day = parseInt(day);
	var month = parseInt(month);
	var year = parseInt(year);
	if(day < 0 || day > 31)
	{
		
		return false;
	}
	if(month < 0 || month > 12){
		
		return false ;
	}
	if(year < 1900 || year > 2099){
		
		return false ;
	}
	if (!day || !month || !year)
	{
		
		return false ;
	}

	if (year/4 == parseInt(year/4))
		monthLength[1] = 29;		
	
	if (day > monthLength[month-1])
		dateExists = false;		

	monthLength[1] = 28;
	if (!dateExists) 
	{
		
		return false;
	}else
	{	
	   return	true;
	}
	
}
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
// xxx xu ly chuoi
function Trim(TRIM_VALUE)
{
  if(TRIM_VALUE.length < 1)
  {
   return"";
  }
TRIM_VALUE = RTrim(TRIM_VALUE);
TRIM_VALUE = LTrim(TRIM_VALUE);
if(TRIM_VALUE=="")
{
 return "";
}
  else
  {
   return TRIM_VALUE;
   }
} //End Function

function RTrim(VALUE){
var w_space = String.fromCharCode(32);
var v_length = VALUE.length;
var strTemp = "";
if(v_length < 0){
return"";
}
var iTemp = v_length -1;

while(iTemp > -1){
if(VALUE.charAt(iTemp) == w_space){
}
else{
strTemp = VALUE.substring(0,iTemp +1);
break;
}
iTemp = iTemp-1;

} //End While
return strTemp;

} //End Function

function LTrim(VALUE){
var w_space = String.fromCharCode(32);
if(v_length < 1){
return"";
}
var v_length = VALUE.length;
var strTemp = "";

var iTemp = 0;

while(iTemp < v_length){
if(VALUE.charAt(iTemp) == w_space){
}
else{
strTemp = VALUE.substring(iTemp,v_length);
break;
}
iTemp = iTemp + 1;
} //End While
return strTemp;
} //End Function

function Replace(value)
{	
	return Trim(value);
}

function search_()
{
	var txt = document.form_a.Header1_Search1_txtPropertyID.value;
	if(Trim(txt).length==0 || txt == 'Enter Property ID')
		{
			location = path + '/property/managelist.aspx';
			return false;
		}
	if(!isAllDigit(txt))
		{
			alert('Property ID must be a number.Please enter again!');
			return false;
		}
	location = path + '/property/managelist.aspx?id='+txt;
	return false;
}

function focus_search()
{
	var txt = document.form_a.Header1_Search1_txtPropertyID.value;
	if(txt == 'Enter Property ID')
	{
		document.form_a.Header1_Search1_txtPropertyID.value = '';
	}
}
function blur_search()
{
	var txt = Trim(document.form_a.Header1_Search1_txtPropertyID.value);
	if(txt.length == 0)
	{
		document.form_a.Header1_Search1_txtPropertyID.value = 'Enter Property ID';
	}
}

function addproperty()
{
	
	location = path + '/property/step1.aspx';
}

function CheckSemiColor(st)
{
	for (var i=0;i< st.length; i++)
	{
		if (st.charAt(i) == "\'")
		{
			return false;
		}
	}	
	return true;
}
function KiemTraChuoiSo(so) 	
{	
	for(var i=0;i<so.length;i++)
	{
		if((so.charAt(i)>='0'&&so.charAt(i)<='9')||so.charAt(i)=='.'||so.charAt(i)==','){}
		else return false;
	}
	return true;
}

function validateEmailAddress(email_Id) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   var address = document.getElementById(email_Id).value;
   if(reg.test(address) == false) {
      return false;
   }
   return true;
}

function LoginRequest(redlink)
{
	 if(nvgUtils.getCookie('LoginType')!=null && nvgUtils.getCookie('LoginType')!="" 
		&& nvgUtils.getCookie('GAgentID')!=null && nvgUtils.getCookie('GAgentID')!=""
		&& nvgUtils.getCookie('GuestEmail')!=null && nvgUtils.getCookie('GuestEmail')!=""
		&& nvgUtils.getCookie('UserName')!=null && nvgUtils.getCookie('UserName')!="" )
	 {
		var  nlik = pathClientAjax +redlink;
			
		var is_ie = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0; 
		var is_ie_5 = (navigator.appVersion.indexOf("MSIE 5.5")!=-1) ? 1 : 0; 
		var is_ie_6 = (navigator.appVersion.indexOf("MSIE 6.0")!=-1) ? 1 : 0; 
		var is_ie_7 = (navigator.appVersion.indexOf("MSIE 7.0")!=-1) ? 1 : 0; 
		var is_ie_8 = (navigator.appVersion.indexOf("MSIE 8.0")!=-1) ? 1 : 0; 

		var is_opera = ((navigator.userAgent.indexOf("Opera 6")!=-1)||(navigator.userAgent.indexOf("Opera/6")!=-1)) ? 1 : 0; 
		var is_netscape = (navigator.userAgent.indexOf('Netscape') >= 0) ? 1 : 0; 
		var is_safari = (navigator.userAgent.indexOf('safari') >= 0) ? 1 : 0; 

		if (is_ie && is_ie_6)
		{			
			window.location.replace(nlik);
		}
		else if (is_ie && is_ie_7)//if IE 7
		{ 
			window.location.replace(nlik);
		}
		
		else //Default goto page (NOT IE 6 and NOT IE 7)
		{
			window.location=nlik;
		}
	 }
	 else
	 {
		var act = "act=showformlogin"+"&lnk="+redlink;
		$.get(pathClientAjax+"handler/LogHandler.aspx",act+"&d="+(new Date()).getTime(),
 				function(data){
 					if(data!=""){		
 					    $('#login_box').html(data);
 					    $('#login_box_popup_header').html("Đăng nhập");
 					    $("#login_box").centerInClient();
 					    $('#login_box').show(); 	
 					}
 					else
 					{
 						$('#login_box').hide();
 					}
 				});
	 }
}

function VisibleDetailLoginForm()
{	
	if(document.getElementById("hdnVisibleDetail").value == 1) 
	{
		document.getElementById('divDetail').style.display='block';
		document.getElementById('textDetail').innerHTML = "Ẩn";
	}
	else
	{
		document.getElementById('divDetail').style.display='none'; 
		document.getElementById('textDetail').innerHTML = "Click vào đây";
	}
		
	if(document.getElementById("hdnVisibleDetail").value == 1) 
		document.getElementById("hdnVisibleDetail").value = -1;
	else
		document.getElementById("hdnVisibleDetail").value = 1;

}

/*  json  3 params truyen vao in SetUp function when start this
TotalDiv: tong so div tao ra 
ClassDiv: class cua tung dic dc tao ra
PrefixDiv: tien to ten cua moi div 

using slider next previous in one uc in one page
*/
var NvgSliderNoAmt = {
    Block: 0,
    TotalDiv: 0,
    ClassDiv: "",
    PrefixDiv: "",
    SetUp: function (_config) {        
        this.TotalDiv = _config.TotalDiv;
        this.ClassDiv = _config.ClassDiv;
        this.PrefixDiv = _config.PrefixDiv;
        $('#' + this.PrefixDiv + this.Block).show();
    },
    Next: function () {
        this.Block++;
        if (this.Block < parseInt(this.TotalDiv)) {
            $('.' + this.ClassDiv).hide();
            $('#' + this.PrefixDiv + this.Block).show();
        }
        else this.Block = parseInt(this.TotalDiv - 1);
    },
    Previous: function () {
        this.Block--;
        if (this.Block >= 0) {
            $('.' + this.ClassDiv).hide();
            $('#' + this.PrefixDiv + this.Block).show();
        }
        else this.Block = 0;
    }
};
/* json  4 params truyen vao in SetUp function when start this
Block: bat dau tu 0
TotalDiv: tong so div tao ra 
ClassDiv: class cua tung div dc tao ra
PrefixDiv: tien to ten cua moi div 
IdLiNext : id cua li next
IdLiPrevious : id cua li previous
ClassLiName: class cua li curent
Speed: toc do fadein (neu co gia tri thi lam, ko truyen thi ko lam)

using slider next previous in ucs in one page

var SlidrBinhLuanRgt = { Block: 0, TotalDiv: $('#hdfDemBlkUlBinhLuan').val(), ClassDiv: 'blogBLuanRight'
            , PrefixDiv: 'ulBinhLuanBl_', IdLiNext: 'spnDownBLR', IdLiPrevious: 'spnUpBLR', ClassLiName: 'current'
        };
NvgSliderNoAmtCom.SetUp(SlidrBinhLuanRgt);

*/
var NvgSliderNoAmtCom = {
    SetUp: function (this_) {
        $('#' + this_.PrefixDiv + this_.Block).show();
        this.SetCssNextPre(this_);
    },
    Next: function (this_) {
        this_.Block++;
        if (this_.Block < parseInt(this_.TotalDiv)) {
            $('.' + this_.ClassDiv).hide();
            if (this_.Speed!=undefined)
                $('#' + this_.PrefixDiv + this_.Block).fadeIn(this_.Speed);
            else $('#' + this_.PrefixDiv + this_.Block).show();
        }
        else this_.Block = parseInt(this_.TotalDiv - 1);
        this.SetCssNextPre(this_);
    },
    Previous: function (this_) {
        this_.Block--;
        if (this_.Block >= 0) {
            $('.' + this_.ClassDiv).hide();
            if (this_.Speed != undefined)
                $('#' + this_.PrefixDiv + this_.Block).fadeIn(this_.Speed);
            else $('#' + this_.PrefixDiv + this_.Block).show();
        }
        else this_.Block = 0;
        this.SetCssNextPre(this_);
    },
    SetCssNextPre: function (this_) {
        if (this_.IdLiNext != "" && this_.IdLiPrevious != "") {
            if (this_.Block == 0) {
                $('#' + this_.IdLiNext).addClass(this_.ClassLiName);
                $('#' + this_.IdLiPrevious).removeClass(this_.ClassLiName);
            }
            else if (this_.Block == this_.TotalDiv-1) {
                $('#' + this_.IdLiNext).removeClass(this_.ClassLiName);
                $('#' + this_.IdLiPrevious).addClass(this_.ClassLiName);
            }
            else {
                $('#' + this_.IdLiNext).addClass(this_.ClassLiName);
                $('#' + this_.IdLiPrevious).addClass(this_.ClassLiName);
            }
        }
    }
};



///---------------------------
$.fn.centerInClient = function (options) {
    /// <summary>Centers the selected items in the browser window. Takes into account scroll position.
    /// Ideally the selected set should only match a single element.
    /// </summary>    
    /// <param name="fn" type="Function">Optional function called when centering is complete. Passed DOM element as parameter</param>    
    /// <param name="forceAbsolute" type="Boolean">if true forces the element to be removed from the document flow 
    ///  and attached to the body element to ensure proper absolute positioning. 
    /// Be aware that this may cause ID hierachy for CSS styles to be affected.
    /// </param>
    /// <returns type="jQuery" />
    var opt = { forceAbsolute: false,
        container: window,    // selector of element to center in
        completeHandler: null,
        minY: 0
    };
    $.extend(opt, options);

    return this.each(function (i) {
        var el = $(this);
        var jWin = $(opt.container);
        var isWin = opt.container == window;

        // force to the top of document to ENSURE that 
        // document absolute positioning is available
        if (opt.forceAbsolute) {
            if (isWin)
                el.remove().appendTo("body");
            else
                el.remove().appendTo(jWin.get(0));
        }

        // have to make absolute
        el.css("position", "absolute");

        // height is off a bit so fudge it
        var heightFudge = isWin ? 3.0 : 2.8;
        //x:382, y:313.5
        var x = (isWin ? jWin.width() : jWin.outerWidth()) / 2 - el.outerWidth() / 2;
        var y = (isWin ? jWin.height() : jWin.outerHeight()) / heightFudge - el.outerHeight() / 2;


        el.css("left", x + jWin.scrollLeft());
        if (opt.minY > 0) {
            el.css("top",jWin.scrollTop()+50);
         }
        else {
            el.css("top", y + jWin.scrollTop());
        }

        // if specified make callback and pass element
        if (opt.completeHandler)
            opt.completeHandler(this);
    });
}

/* json params truyen vao in SetUp function when start this
Block: bat dau tu 0
TotalDiv: tong so div tao ra 
ClassDiv: class cua tung div dc tao ra
PrefixDiv: tien to ten cua moi div 
IdLiNext : id cua li next
IdLiPrevious : id cua li previous
ClassLiName: class cua li curent
Speed: toc do fadein (neu co gia tri thi lam, ko truyen thi ko lam)
TimeAuto: 10000,
KeyAuto:'up',
TimeoutKey:null // always
using slider next previous in ucs in one page

var SlidrBinhLuanRgt = { Block: 0, TotalDiv: $('#hdfDemBlkUlBinhLuan').val(), ClassDiv: 'blogBLuanRight'
, PrefixDiv: 'ulBinhLuanBl_', IdLiNext: 'spnDownBLR', IdLiPrevious: 'spnUpBLR', ClassLiName: 'current', TimeAuto: 10000,KeyAuto:'up'
};
NvgSliderAuto.SetUp(SlidrBinhLuanRgt);

*/
var NvgSliderAuto = {
    SetUp: function (this_) {
        $('#' + this_.PrefixDiv + this_.Block).show();
        //this.SetCssNextPre(this_);
        this.SlidrAuto(this_);
    },
    Next: function (this_, click_) {
        if (this_.TimeoutKey != undefined) {
            if (click_ != undefined && this_.TimeoutKey != null) {
                clearTimeout(this_.TimeoutKey);
            }
        }
        $('.' + this_.ClassDiv).hide();
        if (this_.Block <= parseInt(this_.TotalDiv) && this_.Block >= 0) {
            if (this_.Speed != undefined)
                $('#' + this_.PrefixDiv + this_.Block).fadeIn(this_.Speed);
            else $('#' + this_.PrefixDiv + this_.Block).show();
            this_.Block++;
            this_.KeyAuto = "up";
        }
        else {
            this_.Block = parseInt(this_.TotalDiv);
            $('#' + this_.PrefixDiv + this_.Block).show();
            this_.KeyAuto = "down";
            this_.Block--;
        }

        this.SlidrAuto(this_);
        //NvgSliderAuto.BindClickLi(this_, click_);

    },
    Previous: function (this_, click_) {
        if (this_.TimeoutKey != undefined) {
            if (click_ != undefined && this_.TimeoutKey != null) {
                clearTimeout(this_.TimeoutKey);
            }
        }
        $('.' + this_.ClassDiv).hide();
        if (this_.Block >= 0 && this_.Block <= parseInt(this_.TotalDiv)) {
            if (this_.Speed != undefined)
                $('#' + this_.PrefixDiv + this_.Block).fadeIn(this_.Speed);
            else $('#' + this_.PrefixDiv + this_.Block).show();
            this_.Block--;
            this_.KeyAuto = "down";
        }
        else {
            this_.Block = 0;
            $('#' + this_.PrefixDiv + this_.Block).show();
            this_.Block++;
            this_.KeyAuto = "up";
        }

        this.SlidrAuto(this_);
        //NvgSliderAuto.BindClickLi(this_, click_);
        // this.SetCssNextPre(this_);
    },
    SetCssNextPre: function (this_) {
        if (this_.IdLiNext != "" && this_.IdLiPrevious != "") {
            if (this_.Block == 0) {
                $('#' + this_.IdLiNext).addClass(this_.ClassLiName);
                $('#' + this_.IdLiPrevious).removeClass(this_.ClassLiName);
            }
            else if (this_.Block == this_.TotalDiv - 1) {
                $('#' + this_.IdLiNext).removeClass(this_.ClassLiName);
                $('#' + this_.IdLiPrevious).addClass(this_.ClassLiName);
            }
            else {
                $('#' + this_.IdLiNext).addClass(this_.ClassLiName);
                $('#' + this_.IdLiPrevious).addClass(this_.ClassLiName);
            }
        }
    },
    SlidrAuto: function (this_) {
        if (this_.KeyAuto == "up") {
            this_.TimeoutKey = setTimeout(function () {
                NvgSliderAuto.Next(this_);
            }, this_.TimeAuto);
        }
        //else if (this_.KeyAuto == "down") {
        else {
            this_.TimeoutKey = setTimeout(function () {
                NvgSliderAuto.Previous(this_);
            }, this_.TimeAuto);
        }
        // else {
        //             this_.TimeoutKey = setTimeout(function () {
        //                 NvgSliderAuto.SlidrAuto(this_);
        //             }, this_.TimeAuto);
        // }
        this.BindClickLi(this_);
        this.SetCssNextPre(this_);
    },
    BindClickLi: function (this_, click_) {
        if (this_.IdLiNext != "" && this_.IdLiPrevious != "") {
            $('#' + this_.IdLiNext).unbind('click');
            $('#' + this_.IdLiPrevious).unbind('click');

            //if (click_ != undefined) {
            $('#' + this_.IdLiNext).bind('click', function () { NvgSliderAuto.Next(this_, ''); });
            $('#' + this_.IdLiPrevious).bind('click', function () { NvgSliderAuto.Previous(this_, ''); });
            //         }
            //         else {
            //             $('#' + this_.IdLiNext).bind('click', function () { NvgSliderAuto.Next(this_); });
            //             $('#' + this_.IdLiPrevious).bind('click', function () { NvgSliderAuto.Previous(this_); });
            //         }
        }
    }
};


function updateNumVisit() {
    var url = pathClientAjax + "handler/PropertyHandler.aspx@act=updateNumvisit&d=" + (new Date()).getTime();
    $.post(url, { id: $('#hdpi').val() },
			function (data) { }
			);
}
function insPiViewed() {
//Tam thoi disable ham nay
   /* var url = pathClientAjax + "handler/misc.aspx@act=insbdsdaxem&d=" + (new Date()).getTime();

    $.post(url, { id: $('#hdpi').val() },
			function (data) { }
			);
            */
}

//ucHeader

function BlurInput(ss) {
    if ($('#proSearchID').val() == '') $('#proSearchID').val(ss);
}
function FocusInput(ss) {
    if ($('#proSearchID').val() == ss) $('#proSearchID').val('');
}
function changeTypeSearch() {
    if (document.getElementById("searchTopHeader").value == "1") {
        $('#proSearchID').val("Nhập từ khóa hoặc mã BĐS");
        document.getElementById("proSearchID").onblur = function () {
            BlurInput('Nhập từ khóa hoặc mã BĐS');
        }
        document.getElementById("proSearchID").onfocus = function () {
            FocusInput('Nhập từ khóa hoặc mã BĐS');
        }
    }
    else {
        $('#proSearchID').val("Nhập từ khóa");
        document.getElementById("proSearchID").onblur = function () {
            BlurInput('Nhập từ khóa');
        }
        document.getElementById("proSearchID").onfocus = function () {
            FocusInput('Nhập từ khóa');
        }
    }
}
function ValidateTopHeader() {
    if (document.getElementById("proSearchID").value == 'Nhập từ khóa' || document.getElementById("proSearchID").value == '') {
        alert("Bạn phải phập từ khóa hoặc mã BĐS!");
        document.getElementById("proSearchID").focus();
        return false;
    }
    return true;
}
function SearchTopHeader(key_) {
    if (!ValidateTopHeader()) return;
    if (key_ == "1") {
        //         if (document.getElementById("proSearchID").value == 'Nhập từ khóa' || document.getElementById("proSearchID").value == '') {
        //             alert("Bạn phải phập từ khóa hoặc mã BĐS!");
        //             document.getElementById("proSearchID").focus();
        //             return;
        //         }
        if (isAllDigit(document.getElementById('proSearchID').value))
            window.location = pathClient + document.getElementById('proSearchID').value + '.aspx';
        else
            window.location = pathClient + "ressearch.aspx@tab=rv&kw=" + nvgUtils.RemoveChar22(document.getElementById('proSearchID').value);
    }
    if (key_ == "2") {
        //         if (document.getElementById("proSearchID").value == 'Nhập từ khóa' || document.getElementById("proSearchID").value == '') {
        //             alert("Bạn phải phập từ khóa!");
        //             document.getElementById("proSearchID").focus();
        //             return;
        //         }
        window.location = pathClient + "newslist.aspx@kw=" + nvgUtils.RemoveChar22(document.getElementById("proSearchID").value);
    }
    if (key_ == "3") {
        //         if (document.getElementById("proSearchID").value == 'Nhập từ khóa' || document.getElementById("proSearchID").value == '') {
        //             alert("Bạn phải phập từ khóa!");
        //             document.getElementById("proSearchID").focus();
        //             return;
        //         }
        window.location = pathClient + "estatelist.aspx@namekw=" + nvgUtils.RemoveChar22(document.getElementById("proSearchID").value);
    }
    if (key_ == "4") {
        //         if (document.getElementById("proSearchID").value == 'Nhập từ khóa' || document.getElementById("proSearchID").value == '') {
        //             alert("Bạn phải phập từ khóa!");
        //             document.getElementById("proSearchID").focus();
        //             return;
        //         }
        window.location = pathClient + "agent.aspx@n=" + nvgUtils.RemoveChar22(document.getElementById("proSearchID").value);
    }
}

function KeyPressSearchTopHeader(e) {
    var u11 = e.charCode ? e.charCode : e.keyCode;
    if (u11 == 13) {
        // SearchTopHeader();
        if (ValidateTopHeader())
            $('#divSearchTop_').show();
        return false;
    }
}
//Adds new uniqueArr values to temp array
function uniqueArr(a) {
    temp = new Array();
    for (i = 0; i < a.length; i++) {
        if (!contains(temp, a[i])) {
            temp.length += 1;
            temp[temp.length - 1] = a[i];
        }
    }
    return temp;
}
//Will check for the Uniqueness
function contains(a, e) {
    for (j = 0; j < a.length; j++) if (a[j] == e) return true;
    return false;
}
//end ucHeader

/////// Box Gop Y left
function InitGopYLeft(width) {

    $("#divPopupGopYLeft").hide();
    $("#hfnFlagGopY").val(1);
    if ($(window).width() < width)
        $("#divGopYLeft").hide();
    else {        
        $("#divGopYLeft").show();
    }
}

function ShowPopupGopY() {
    var url = pathClientAjax + "handler/Handler.aspx@act=SetEmailGopYLeft" + "&d=" + (new Date()).getTime();
    $.get(url, {},
		function (data) {
		    if (data != "")
		        $('#txtEmail').val(data);
            else
                $('#txtEmail').val("Nhập email của bạn");
		});
         if ($("#hfnFlagGopY").val() == 1) {         
            $("#divPopupGopYLeft").show('slow');
            $("#hfnFlagGopY").val(0);
        }
        else {
       
            $("#divPopupGopYLeft").hide('slow');
            $("#hfnFlagGopY").val(1);
        }
        $('#txtNoiDung').val("Cho chúng tôi biết bạn nghĩ gì?");
}

function ClosePopupGopY() {
    $("#divPopupGopYLeft").hide('slow');
    $("#hfnFlagGopY").val(1);
}


function GetValueOfDrop(id, text) {
    $('#hfnVaLuaDrop').val(id);
    $('#txtTittleDrop').html(text + "<span class='bt_dropdown'></span>");
    $("#divContentDrop").hide();
}

function ShowContentDrop() {
    $("#divContentDrop").show();
}

function CloseContentDrop() {
    $("#divContentDrop").hide();
}

function SendGopYLeft() {
    var email = $("#txtEmail").val();
    //var chude = $("#hfnVaLuaDrop").val();
    var noidung = $("#txtNoiDung").val();

    if (email == "") {
        alert(" Bạn chưa nhập email ");
        return false;
    }
    if (!isEmail(email)) {
        alert(" Định dạng email không hợp lệ ");
        return false;
    }   
    if (noidung == "" || noidung == "Cho chúng tôi biết bạn nghĩ gì?") {
        alert(" Bạn chưa nhập nội dung góp ý ");
        return false;
    }
    var url = pathClientAjax + "handler/Handler.aspx@act=SendGopYLeft" + "&d=" + (new Date()).getTime();
    $.post(url, { email: email, noidung: noidung },
		        function (data) {
		            if (data != "") {
		                alert("Cảm ơn ý kiến đóng góp của bạn. Chúng tôi đã ghi nhận những ý kiến đóng góp quý báu của bạn! ");
		            }
		            else {
		                alert("Có sự cố xảy ra. Bạn vui lòng thử lại");
		            }
		        }
	        );

  //  $('#hfnVaLuaDrop').val("");
   // $('#txtTittleDrop').html("Chủ đề cần góp ý <span class='bt_dropdown'></span>");
    $('#txtEmail').val("Nhập email của bạn");
    $('#txtNoiDung').val("Cho chúng tôi biết bạn nghĩ gì?");
    $("#hfnFlagGopY").val(1);
    $("#divPopupGopYLeft").hide('slow');
}


function ClearText(ctrId) {    
    var text = $("#" + ctrId ).val();   
    if (text == "Nhập email của bạn" || text == "Cho chúng tôi biết bạn nghĩ gì?")
        $("#" + ctrId).val("");
}


////   End  Box Gop Y left

function CheckLoginStatus() {
    var guestId = "", guestEmail = "", guestAccount = "", guestName = "", guestAgentName = "";

    if (nvgUtils.getCookie('LoginType') != null && nvgUtils.getCookie('LoginType') == "user") {
        guestId = nvgUtils.getCookie('gGstId') != "" ? nvgUtils.getCookie('gGstId') : nvgUtils.getCookie('GAgentID');
        guestEmail = nvgUtils.getCookie('GuestEmail');
        guestAccount = nvgUtils.getCookie('UserName');
        guestName = nvgUtils.getCookie('GuestName');
        guestAgentName = nvgUtils.getCookie('GAgentNameContact');
    }
    else {
        guestId = nvgUtils.getCookie('GAgentID');
        guestEmail = nvgUtils.getCookie('GAgentEmail');
        guestAccount = nvgUtils.getCookie('UserName');
        guestName = nvgUtils.getCookie('GuestName');
        guestAgentName = nvgUtils.getCookie('GAgentNameContact');
    }

    if (guestId != null && guestId != "")
        gId = guestId;
    else
        gId = null;
    if (guestEmail != null && guestEmail != "")
        gEmail = guestEmail;
    else if (guestAccount != null && guestAccount != "")
        gEmail = guestAccount;
    else
        gEmail = null;
    if (guestName != null && guestName != "") gName = guestName;
    else if (guestAgentName != null && guestAgentName != "") gName = guestAgentName;
    else gName = '';

    if (gId != null && gEmail != null && gId != "" && gEmail != "") { return true; }
    else {return false; }
    
}
/* can tich hop gia tri khoi tao overlay tu bando moi chay dc
    show bandoquihoach cho cac trang co tich hop bando mini vao website
*/
var NvgQuiHoachMap = {
    Lay4GocBanDo: function (map) {
        this.latNW = map.getBounds().getNorthEast().lat();
        this.latSE = map.getBounds().getSouthWest().lat();
        this.lngNW = map.getBounds().getSouthWest().lng();
        this.lngSE = map.getBounds().getNorthEast().lng();
    },
    latNW: '',
    latSE: '',
    lngNW: '',
    lngSE: '',
    tileLayerOverlay: null,
    tileLayerOverlay1: null,
    /* mien nam*/
    tileLayerOverlay11: null,
    /* mien trung*/
    tileLayerOverlay12: null,
    arTileOverlay: [],
    flag1 :false,
    addTileOverlay: function (map, tpl, opa) {
        var overl = null;
        overl = new GTileLayerOverlay(
		    new GTileLayer(null, null, null, {
		        tileUrlTemplate: tpl,
		        isPng: true,
		        opacity: opa
		    })
	    );
        /*arTileOverlay.push(tileLayerOverlay);*/
        map.addOverlay(overl);

        return overl;
    },
    check4GocChoTile: function (map) {
        this.Lay4GocBanDo(map);
       
        if (!this.flag1) {
            for (var i = 0; i < tile_overlay_0.length; i++) {
                var late = tile_overlay_0[i].late;
                var latw = tile_overlay_0[i].latw;
                var lngw = tile_overlay_0[i].lngw;
                var lnge = tile_overlay_0[i].lnge;
                var tileGroup = tile_overlay_0[i].tileGroup;

                var boundTile = new GLatLngBounds(new GLatLng(parseFloat(latw), parseFloat(lngw)), new GLatLng(parseFloat(late), parseFloat(lnge)));

                if (map.getBounds().containsLatLng(new GLatLng(parseFloat(late), parseFloat(lngw)))
			    || map.getBounds().containsLatLng(new GLatLng(parseFloat(late), parseFloat(lnge)))
			    || map.getBounds().containsLatLng(new GLatLng(parseFloat(latw), parseFloat(lngw)))
			    || map.getBounds().containsLatLng(new GLatLng(parseFloat(latw), parseFloat(lnge)))
                /*hoac 4 goc map nam trong tile*/
			    || boundTile.containsLatLng(new GLatLng(parseFloat(this.latSE), parseFloat(this.lngNW)))
			    || boundTile.containsLatLng(new GLatLng(parseFloat(this.latSE), parseFloat(this.lngSE)))
			    || boundTile.containsLatLng(new GLatLng(parseFloat(this.latNW), parseFloat(this.lngNW)))
			    || boundTile.containsLatLng(new GLatLng(parseFloat(this.latNW), parseFloat(this.lngSE)))
                /*hoac cat nhau kieu chu thap*/
			    || (parseFloat(map.getBounds().getNorthEast().lng()) >= parseFloat(lnge) && parseFloat(map.getBounds().getSouthWest().lng()) <= parseFloat(lnge)
			    && parseFloat(map.getBounds().getNorthEast().lat()) <= parseFloat(late) && parseFloat(map.getBounds().getNorthEast().lat()) >= parseFloat(latw))
			    || (parseFloat(map.getBounds().getNorthEast().lng()) >= parseFloat(lngw) && parseFloat(map.getBounds().getNorthEast().lng()) <= parseFloat(lnge)
			    && parseFloat(map.getBounds().getSouthWest().lat()) <= parseFloat(late) && parseFloat(map.getBounds().getNorthEast().lat()) >= parseFloat(late))
		    ) {
                    this.flag1 = true;
                }
            } 
        }
        if (this.flag1) {           
            if (this.tileLayerOverlay1 == null && this.tileLayerOverlay11 == null) {
                this.tileLayerOverlay1 = this.addTileOverlay(map, pathClientUploadFileViewPhoToMap + 'final_1/{Z}_{X}_{Y}.png', 1.0);
                this.tileLayerOverlay11 = this.addTileOverlay(map, pathClientUploadFileViewPhoToMap + 'final_11/{Z}_{X}_{Y}.png', 1.0);
                this.tileLayerOverlay12 = this.addTileOverlay(map, pathClientUploadFileViewPhoToMap + 'final_12/{Z}_{X}_{Y}.png', 1.0);
            }
            if (this.tileLayerOverlay1 != null && this.tileLayerOverlay11 != null && this.tileLayerOverlay12 != null) {
                this.tileLayerOverlay1.show();
                this.tileLayerOverlay11.show();
                this.tileLayerOverlay12.show();
            }
        }
    }
};
