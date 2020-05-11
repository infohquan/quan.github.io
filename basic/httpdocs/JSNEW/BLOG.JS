function vietBlog() {
    
    var is_ie = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0;
    var is_ie_5 = (navigator.appVersion.indexOf("MSIE 5.5") != -1) ? 1 : 0;
    var is_ie_6 = (navigator.appVersion.indexOf("MSIE 6.0") != -1) ? 1 : 0;
    var is_ie_7 = (navigator.appVersion.indexOf("MSIE 7.0") != -1) ? 1 : 0;
    var is_ie_8 = (navigator.appVersion.indexOf("MSIE 8.0") != -1) ? 1 : 0;

    var is_opera = ((navigator.userAgent.indexOf("Opera 6") != -1) || (navigator.userAgent.indexOf("Opera/6") != -1)) ? 1 : 0;
    var is_netscape = (navigator.userAgent.indexOf('Netscape') >= 0) ? 1 : 0;
    var is_safari = (navigator.userAgent.indexOf('safari') >= 0) ? 1 : 0;


    //if IE 6
    var nlink = pathClient + 'Viet-cau-hoi';

    if (is_ie && (is_ie_6 || is_ie_7)) {
        window.location.replace(nlink);
    }
    else //Default goto page (NOT IE 6 and NOT IE 7)
    {
        window.location = nlink;
    }

  
}
function submit_login_form_blog()
{
	if(document.getElementById("login_email_field").value=="")
	{
		alert("Bạn phải nhập UserName!");
		document.getElementById("login_email_field").focus();	
		return false;
	}
	if(document.getElementById("login_password_field").value=="")
	{
		alert("Bạn phải nhập Password!");
		document.getElementById("login_password_field").focus();	
		return false;
	}
	var act = "act=submitLogin";
	var username="&username="+document.getElementById("login_email_field").value;
	var pass="&pass="+document.getElementById("login_password_field").value;
	var registpass="&registpass=0";
	if(document.getElementById("chkRemember").checked==true)
		registpass="&registpass=1";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+username+pass +registpass+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				Element.setInnerHTML("top_blog", transport.responseText);
			}	
			else
			{
				alert("Username hoặc Password của bạn chưa đúng!");	
						
			}
			},
		onFailure: function(e){return false;
		}
		}
	);
}
function submit_register_form_blog()
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
	if(document.getElementById("password_field").value=="")
	{
		alert("Bạn phải nhập Mật khẩu!");
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
	var act = "act=submitSignin";
	var name="&name="+encodeURI(document.getElementById("name_field").value);
	var username="&username="+encodeURI(document.getElementById("email_field").value);
	var pass="&pass="+document.getElementById("password_field").value;
	var loca="&loca="+encodeURI(document.getElementById("location_field").value);
	var namecontact="&namecontact="+encodeURI(document.getElementById("namecontact_field").value);
	var phone="&phone="+document.getElementById("phone").value;
	var mobilephone="&mobilephone="+document.getElementById("mobilephone").value;
	var email="&email="+document.getElementById("email").value;
	var newsletter="&newsletter=0";
	if(document.getElementById("contact_me_field").checked==true)
		newsletter="&newsletter=1";
	var des="&des=0";
	for(i=0;i<document.getElementById("hdNumdescript").value;i++)
	{
		var t=i+1;
		if(document.getElementById("us_"+t).checked==true)
			des="&des="+t;
	}
	var al=act+name+username+pass+loca+namecontact+phone+mobilephone+email+newsletter+des;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ al+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				if(transport.responseText=="email")
				{
					alert("Địa chỉ email của bạn đã tồn tại trong hệ thống rồi!");
					document.getElementById("email").focus();
				}
				if(transport.responseText=="username")
				{
					alert("Tên đăng nhập của bạn đã tồn tại trong hệ thống rồi!");
					document.getElementById("email_field").focus();
				}
				if(transport.responseText=="username1")
				{
					alert("Tên đăng nhập của bạn không được gõ Tiếng Việt và không chứa khoảng trắng!");
					document.getElementById("email_field").focus();
				}
				if(transport.responseText=="pass")
				{
					alert("Mật khẩu của bạn không được gõ Tiếng Việt và không chứa khoảng trắng!");
					document.getElementById("password_field").focus();
				}
			}
			else 
			{
				alert("Bạn tạo tài khoản thành công, hãy đăng nhập để tiếp tục thao tác với các chức năng khác!");
				if(navigator.appName == "Microsoft Internet Explorer")
				{
					toggle_menu(event, 'login_box', 0);
					return false;
				}
				document.getElementById('login_box').style.display='none';
			}	
			},
		onFailure: function(e){return false;
		}
		}
	);
}

function do_logout_blog()
{
	var act = "act=submitLogout";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				//Element.setInnerHTML("top_blog", transport.responseText);
				CheckLoginBlog();
			}	
			else
			{
				alert("Logout không thành công!");	
			}
			},
		onFailure: function(e){return false;
		}
		}
	);
}
function SubmitEditProfile()
{
	if(document.getElementById("name_field").value=="")
	{
	    alert("Bạn phải nhập tên!");
		document.getElementById("name_field").focus();	
		return false;
	}
	if(document.getElementById("email").value=="")
	{
	    alert("Bạn phải nh Email!");
		document.getElementById("email").focus();	
		return false;
	}
	var act = "act=submitEditProfile";
	var name="&name="+encodeURI(document.getElementById("name_field").value);
	var loca="&loca="+encodeURI(document.getElementById("location_field").value);
	var phone="&phone="+document.getElementById("phone").value;
	var mobilephone="&mobilephone="+document.getElementById("mobilephone").value;
	var email="&email="+document.getElementById("email").value;
	var des="&des="+document.getElementById("select_sothich_1").value;
	var linkweb="&linkweb="+document.getElementById("website").value;
	var headline="&headline="+encodeURI(document.getElementById("headline").value);
	var al=act+name+loca+phone+mobilephone+email+des+linkweb+headline;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ al+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if(data=="email")
				{
				    alert("Email này đã có người dùng!");
					document.getElementById("email").focus();
				}
			}
			else 
			{
			    alert("Thông tin của bạn đã được thay đổi!");
				NoEditProfile();
			}	
		}
	);
}
function EditProfile()
{
	var act = "act=editprofile";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#profile_business_card").html(data);
			}	
		}
	);
}
function NoEditProfile()
{
	var act = "act=noeditprofile";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#profile_business_card").html(data);
			}	
		}
	);
}
function EditAboutMe()
{
	var act = "act=editaboutme";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#profile_about_me").html(data);
			}	
		}
	);
}
function NoEditAboutMe()
{
	var act = "act=noeditaboutme";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#profile_about_me").html(data);
			}	
		}
	);
}
function SubmitEditAboutMe()
{
	var act = "act=submiteditaboutme";
	var aboutme="&aboutme="+encodeURI(removecharecterHTML(document.getElementById("text_field").value));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+aboutme+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data == ""){
			    alert("Lưu thành công!");
				NoEditAboutMe();
			}	
		}
	);
}
function ViewEditAboutMe()
{
	if (document.getElementById("text_field").value=="")
	{
		return false;	
	}
	var act = "act=vieweditaboutme";
	var aboutme="&aboutme="+encodeURI(removecharecterHTML(document.getElementById("text_field").value));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+aboutme+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#profile_about_me").html(data);
			}	
		}
	);
}

function SubmitViewEditAboutMe()
{
	var act = "act=submiteditaboutme";
	var t=document.getElementById("hdAboutme").value;
	while(t.indexOf("<br>")!=-1)
	{
		t=t.replace('<br>','=|||=');
	}
	var aboutme="&aboutme="+encodeURI(removecharecterHTML(t));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+aboutme+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data == ""){
			    alert("Lưu thành công!");
				NoEditAboutMe();
			}	
		}
	);
}

function WriteBlog(status,content)
{

	var act = "act=submitwriteask";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="Login") 
				{
					document.getElementById("mbnd_qa_answer_login_blog").style.display='block';
					document.getElementById("loginname").focus();
				}
			}
			else
			{
				if(SubmitWriteBlog(status,content)!=false) 
				{
					if(status=='1')
					{
						document.getElementById("post_publish1").style.display='none';
						document.getElementById("post_publish_process").style.display='block';	
					}
					if(status=='3') 
					{
						document.getElementById("post_draft").style.display='none';
						document.getElementById("post_draft_process").style.display='block';	
					}
				}
				
			}
		}
	);
}

function CheckLoginPreviewBlog()
{
	var act = "act=submitwriteask";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="Login") 
				{
					document.getElementById("mbnd_qa_answer_login_blog").style.display='block';
				}
			}
			else
			{
				PreviewBlog();
			}
		}
	);
}
function SubmitWriteBlog(status,content) {
    var CtlMst = document.getElementById('hdfCtlMst').value;
	if(document.getElementById(CtlMst+"_blog_post_title").value=="")
	{
		alert("Bạn phải nhập Tiêu đề!");
		document.getElementById(CtlMst+"_blog_post_title").focus();	
		return false;
	}
	if(document.getElementById(CtlMst+"_blog_categoryId").value=="")
	{
		alert("Bạn phải chọn loại!");
		document.getElementById(CtlMst+"_blog_categoryId").focus();	
		return false;
	}
	
	if(content=="")
	{
		alert("Bạn phải nhập nội dung!");
		document.getElementById(CtlMst+"_blog_txtContentBlog___Frame").focus();	
		return false;
	}

	var url=pathClientAjax+"handler/BlogHandler.aspx@act=postblog";
	$.post(url, {title:removecharecterHTML(document.getElementById(CtlMst+"_blog_post_title").value),category:document.getElementById(CtlMst+"_blog_categoryId").value
	,loca:document.getElementById(CtlMst+"_blog_post_location").value,content:removecharecterHTML(content),allowcom:document.getElementById(CtlMst+"_blog_post_commentsAllowed").checked==true?"1":"0"
	,post_emailAlerts:document.getElementById(CtlMst+"_blog_post_emailAlerts").checked==true?"1":"0",status:status,articleid:document.getElementById(CtlMst+"_blog_hdfArticleID").value
	},
		function(data){
			if (data != ""){
				window.location=data;
			}
	});
}
function removecharecterHTML(content)
{
	var t=content;
	while(t.indexOf("<")!=-1||t.indexOf(">")!=-1||t.indexOf("&")!=-1||t.indexOf("#")!=-1||t.indexOf("?")!=-1||t.indexOf("@")!=-1)
	{
		t=t.replace('<','=||=');
		t=t.replace('>','=|=');
		t=t.replace('&','=$=');
		t=t.replace('#','=$$=');
		t=t.replace('?','=|||||=');
		t=t.replace('@','=||||=');
	}
	return t;
}
function do_removeBlog(articleID)
{
    if (!confirm('Bạn muốn xóa blog này?'))
      return false;
	var act = "act=delarticle";
	var vArticleid="&articleID="+articleID;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+vArticleid+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				alert(data);
			}	
			ListBlog(1);
		}
	);
}

function PreviewBlog()
{
	if(document.getElementById("blog_post_title").value=="")
	{
	    alert("Bạn phải nhập tiêu đề!");
		document.getElementById("blog_post_title").focus();	
		return false;
	}
	if(document.getElementById("blog_categoryId").value=="")
	{
	    alert("Bạn phải chọn loại!");
		document.getElementById("blog_categoryId").focus();	
		return false;
	}
	var oEditor = FCKeditorAPI.GetInstance('blog_txtContentBlog') ;
	if(oEditor.GetXHTML( true )=="")
	{
	    alert("Bạn phải nhập nội dung!");
		document.getElementById("blog_txtContentBlog___Frame").focus();	
		return false;
	}
	var act = "act=previewblog";
	var title="&title="+encodeURI(document.getElementById("blog_post_title").value);
	var category="&category="+document.getElementById("blog_categoryId").value;
	var loca="&loca="+encodeURI(document.getElementById("blog_post_location").value); 
	var t=removecharecterHTML(oEditor.GetXHTML(true));
	var content="&content="+encodeURI(t);
	var allowcom="&allowcom=0";
	if(document.getElementById("blog_post_commentsAllowed").checked==true)
		allowcom="&allowcom=1";
	var post_emailAlerts="&post_emailAlerts=0";
	if(document.getElementById("blog_post_emailAlerts").checked==true)
		post_emailAlerts="&post_emailAlerts=1";
	var articleid="&articleid="+document.getElementById("blog_hdfArticleID").value;
	var al=title+category+loca+content+allowcom+post_emailAlerts+articleid;
	document.getElementById('left_content_sub1').style.display="none";
	document.getElementById('left_content_sub2').style.display="block";
	document.getElementById('left_content_sub2').innerHTML = "<div style='text-align:center'><IMG alt=''src="+ pathClient + "/Images/loading6.gif></div>";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+al+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#left_content_sub2").html(data);
			}	
		}
	);	
}
function SubmitViewSaveBlog(status)
{
	var act = "act=postblog";
	var title="&title="+encodeURI(document.getElementById("hdtitle").value);
	var category="&category="+document.getElementById("hdcategory").value;
	var loca="&loca="+encodeURI(document.getElementById("hdlocation").value); 
	var t=removecharecterHTML(document.getElementById("hdcontent").value);//oEditor.GetXHTML(true);
	var content="&content="+encodeURI(t);
	var allowcom="&allowcom="+document.getElementById("hdallowcomment").value;
	var post_emailAlerts="&post_emailAlerts="+document.getElementById("hdallowsendmail").value;
	var Status="&status="+status;
	var articleid="&articleid="+document.getElementById("blog_hdfArticleID").value;
	var al=title+category+loca+content+allowcom+post_emailAlerts+Status+articleid;
	var al=al+"&d="+(new Date()).getTime(); 
	var url=pathClientAjax+"handler/BlogHandler.aspx@act=postblog";
	new Ajax.Request(url, {
	method: 'post',parameters: al,
	onSuccess: function(transport) {
	if (transport.responseText != ""){
		window.location=transport.responseText;
	}	 
	},
	onFailure: function(e){ return false;
	}
	}
	);
}
function ViewSubmitWriteBlog(linkEdit,status)
{
	SubmitViewSaveBlog(status);
}
function CheckViewSubmitWriteBlog(linkEdit,status)
{
	var act = "act=submitwriteask";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				if (transport.responseText=="Login") 
				{
					document.getElementById("mbnd_qa_answer_login_blog").style.display='block';alert("asdf");
				}
			}
			else
			{
				//ViewSubmitWriteBlog(linkEdit,status);
				if(SubmitViewSaveBlog(status)!=false)
				{
					if(status=='2')
					{
						document.getElementById("post_publishview").style.display='none';
						document.getElementById("post_publishview_process").style.display='block';	
					}
					if(status=='3') 
					{
						document.getElementById("post_draft1").style.display='none';
						document.getElementById("post_draft_process1").style.display='block';	
					}
				}
				
			}
			},	
		onFailure: function(e){return false;
		}
		}
	);
}
function BackWriteBlog(id)
{
	if (id!="") 
	{
		window.location=pathClientAjax+"Blog.aspx@id="+id;
	}
	else
	{
		document.getElementById('left_content_sub1').style.display="block";
		document.getElementById('left_content_sub2').style.display="none";
	}
}
function SubmitWriteAsk()
{
	var act = "act=submitwriteask";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="Login") 
				{
					document.getElementById("mbnd_qa_answer_login_blog").style.display='block';
				}
			}
			else
			{
				if(InsertAsk()!=false)
				{
					document.getElementById("sendquestion").disabled=true;
					document.getElementById("sendquestion").value="Processing..";
				}
			}
		}
	);
}

function InsertAsk() {
    var CtlMst = document.getElementById('hdfCtlMst').value;
	if (document.getElementById(CtlMst+"_ucBlogAsk_questionTitle").value=="Post your question here"||document.getElementById(CtlMst+"_ucBlogAsk_questionTitle").value=="") 
	{
		document.getElementById(CtlMst+"_error_questionTitle").className='mbnd_qa_error_blog';
		$("#"+CtlMst+"_error_questionTitle").html("You must enter your question!");
		document.getElementById(CtlMst+"_ucBlogAsk_questionTitle").focus();
		return false;
	}
	if (document.getElementById("questionBody").value=="Post your question detail here"||document.getElementById("questionBody").value=="") 
	{
		document.getElementById("error_questionBody").className='mbnd_qa_error_blog';
		$("#error_questionBody").html("You must enter your question detail!");
		document.getElementById("questionBody").focus();
		return false;
	}
	if (document.getElementById(CtlMst+"_ucBlogAsk_categoryId").value=="") 
	{
		document.getElementById("error_questionCategory").className='mbnd_qa_error_blog';
		$("#error_questionCategory").html("You must select the type of question!");
		document.getElementById(CtlMst+"_ucBlogAsk_categoryId").focus();
		return false;
	}
	if(document.getElementById("questionLocation").value=="Tỉnh/TP, hoặc ZIP") 
		document.getElementById("questionLocation").value="";
	var act = "act=postask";
	var title="&title="+encodeURI(removecharecterHTML(document.getElementById(CtlMst+"_ucBlogAsk_questionTitle").value));
	var category="&category="+document.getElementById(CtlMst+"_ucBlogAsk_categoryId").value;
	var loca="&loca="+encodeURI(document.getElementById("questionLocation").value);
	var content="&content="+encodeURI(removecharecterHTML(document.getElementById("questionBody").value));
	var post_emailAlerts="&post_emailAlerts=0";
	if(document.getElementById("questionEmail").checked==true)
		post_emailAlerts="&post_emailAlerts=1";
	//var al = title + category + loca + content + post_emailAlerts;
	var al = title + category + loca + content + post_emailAlerts + "&catsub=" + document.getElementById("CatIDSub").value;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+al+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				window.location=data;
			}	
		}
	);
}
function SubmitWriteAskLogin()
{
	if(document.getElementById("loginname").value=="")
	{
	    alert("Bạn phải nhập UserName!");
		document.getElementById("loginname").focus();	
		return false;
	}
	if(document.getElementById("Write_login_password").value=="")
	{
	    alert("Bạn phải nhập Password!");
		document.getElementById("Write_login_password").focus();	
		return false;
	}
	Processing_("dangnhap_bt");
	var act = "act=submitLogin";
	var username="&username="+document.getElementById("loginname").value;
	var pass="&pass="+document.getElementById("Write_login_password").value;
	var url = pathClientAjax+"handler/LogHandler.aspx?"+ act+username+pass +"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data!= ""){
				$("#phLogin").html(data.split("<==>")[0]);
				document.getElementById("mbnd_qa_answer_login_blog").style.display='none';
				$("#dangnhap_bt").html("<a onclick=\"SubmitWriteAskLogin();return false;\" rel=\"nofollow\"><div>Login</div></a>");
			}	
			else
			{
			    alert("Username hoặc Password của bạn chưa chính xác!");	
				$("#dangnhap_bt").html( "<a onclick=\"SubmitWriteAskLogin();return false;\" rel=\"nofollow\"><div>Login</div></a>");
			}
		}
	);
}
function SubmitWriteAskSignIn()
{
	if(document.getElementById("hoten").value=="")
	{
		alert("Bạn phải nhập Họ Tên!");
		document.getElementById("hoten").focus();	
		return false;
	}
	if(document.getElementById("tendangnhap").value=="")
	{
		alert("Bạn phải nhập Tên đăng nhập!");
		document.getElementById("tendangnhap").focus();	
		return false;
	}
	if(document.getElementById("matkhau").value=="")
	{
		alert("Bạn phải nhập Mật khẩu!");
		document.getElementById("matkhau").focus();	
		return false;
	}
	if(document.getElementById("nhaplaimatkhau").value=="")
	{
		alert("Bạn phải nhập lại Mật khẩu!");
		document.getElementById("nhaplaimatkhau").focus();	
		return false;
	}
	if(document.getElementById("nhaplaimatkhau").value!=document.getElementById("matkhau").value)
	{
		alert("Mật khẩu nhập lại chưa đúng!");
		document.getElementById("nhaplaimatkhau").focus();	
		return false;
	}
	if(document.getElementById("registerEmail").value=="")
	{
		alert("Bạn phải nhập Email!");
		document.getElementById("registerEmail").focus();	
		return false;
	}
	Processing_("taotaikhoan");
	var act = "act=submitSignin";
	var name="&name="+encodeURI(document.getElementById("hoten").value);
	var username="&username="+encodeURI(document.getElementById("tendangnhap").value);
	var pass="&pass="+document.getElementById("matkhau").value;
	var loca="&loca="+encodeURI(document.getElementById("vitri").value);
	var phone="&phone="+document.getElementById("dienthoai").value;
	var mobilephone="&mobilephone="+document.getElementById("dienthoaiDD").value;
	var email="&email="+document.getElementById("registerEmail").value;
	var newsletter="&newsletter=0";
	if(document.getElementById("cb_contact_me").checked==true)
		newsletter="&newsletter=1";
	var memforum="&memforum=0";
	if(document.getElementById("memberforum").checked==true)
		memforum="&memforum=1";
// 	var des="&des=0";
// 	for(i=0;i<document.getElementById("hdNumdescript").value;i++)
// 	{
// 		var t=i+1;
// 		if(document.getElementById("ask_us_"+t).checked==true)
// 			des="&des="+t;
// 	}
	var al=act+name+username+pass+loca+phone+mobilephone+email+newsletter;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ al+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				if(transport.responseText=="email")
				{
					alert("Địa chỉ email của bạn đã tồn tại trong hệ thống rồi!");
					document.getElementById("registerEmail").focus();
				}
				if(transport.responseText=="username")
				{
					alert("Tên đăng nhập của bạn đã tồn tại trong hệ thống rồi!");
					document.getElementById("tendangnhap").focus();
				}
				if(transport.responseText=="username1")
				{
					alert("Tên đăng nhập của bạn không được gõ Tiếng Việt và không chứa khoảng trắng!");
					document.getElementById("tendangnhap").focus();
				}
				if(transport.responseText=="pass")
				{
					alert("Mật khẩu của bạn không được gõ Tiếng Việt và không chứa khoảng trắng!");
					document.getElementById("matkhau").focus();
				}
			}
			else 
			{
				alert("Bạn tạo tài khoản thành công, hãy đăng nhập để tiếp tục thao tác với các chức năng khác!");
				document.getElementById("mbnd_qa_answer_regis_blog").style.display='none';
				document.getElementById("mbnd_qa_answer_login_blog").style.display='block';
			}	
			},
		onFailure: function(e){return false;
		}
		}
	);
}
function CheckEnable_TTK()
{
	if(document.getElementById("condUse").checked==true) 
	{
		Element.setInnerHTML("taotaikhoan", "<a onclick=\"SubmitWriteAskSignIn();return false;\" rel=\"nofollow\"><div>Tạo tài khoản</div></a>");
	}
	else
	{
		Element.setInnerHTML("taotaikhoan", "<span rel=\"nofollow\"><div style=\"background-color:#AAAAAA;\">Tạo tài khoản</div></span>");
	}
}
function Processing_(id)
{
	$("#"+id).html("<span rel=\"nofollow\"><div style=\"background-color:#AAAAAA;\">Processing..</div></span>");
}
function hidediv(id1,id2)
{
	document.getElementById(id1).style.display='none';
	document.getElementById(id2).style.display='block';
}
function unhidediv(id1,id2)
{
	
	document.getElementById(id1).style.display='block';
	document.getElementById(id2).style.display='none';
	$("#attachfile").html();	
	document.getElementById("answerBody").value="";
	document.getElementById("answerLink").value="";
	document.getElementById("hdAnswerID").value="";
}
function sendAnswer()
{	
	
}
function InsertAnswer() {
    var CtlMst = document.getElementById('hdfCtlMst').value;
	if (getCookieForLogin('GuestName')==null) 
	{
		document.getElementById("mbnd_qa_answer_login_blog").style.display='block';
		return false;
	}
	var tempp="";
	if(document.getElementById("answerBody").style.display=='block')
	{
		if (document.getElementById("answerBody").value=="") 
		{
			document.getElementById("error_answerBody").className='mbnd_qa_error_blog';
			$("#error_answerBody").html("Sorry, you must write answers!");
			document.getElementById("answerBody").focus();
			return false;
		}
		else
		{
			tempp=document.getElementById("answerBody").value;
		}
	}
	else if(document.getElementById("editor").style.display=='block')
	{
		var oEditor = FCKeditorAPI.GetInstance(CtlMst+'_ucBlogAnswer_txtContentAns') ;
		if(oEditor.GetXHTML(true)=="")
		{
			document.getElementById("error_answerBody").className='mbnd_qa_error_blog';
			$("#error_answerBody").html("Sorry, you must write answers!");
			document.getElementById(CtlMst+"_ucBlogAnswer_txtContentAns___Frame").focus();	
			return false;
		}
		else
		{
			tempp=oEditor.GetXHTML(true);
		}
	}
	document.getElementById("postanswer").disabled=true;
	document.getElementById("postanswer").value="Processing..";
	var url = pathClientAjax+"handler/BlogHandler.aspx@act=postanswer";
	$.post(url, {idanswer:document.getElementById("hdAnswerID").value,content:removecharecterHTML(tempp),weblink:removecharecterHTML(document.getElementById("answerLink").value.replace('http://','')),askid:document.getElementById("hdAskID").value,cat:document.getElementById(CtlMst+"_ucBlogAnswer_hdcat").value,title:removecharecterHTML(document.getElementById(CtlMst+"_ucBlogAnswer_hdtitle").value),post_emailAlerts:document.getElementById("questionEmail").checked==true?"1":"0"},
	function(data){
			if (data != ""){
				window.location=data;
			}	
	});
}

function nocacheAjaxBlog()

{

	var n = 432000000;//60 minutes

	var t = (new Date()).getTime();

	s = parseInt(t/n);

	return "&d="+s;

}
function WriteAskFrom_Answer(content)
{
/*
	var act = "act=tempwritequestion";
	var ques="&ques="+encodeURI(removecharecterHTML(content).replace("Viết câu hỏi của bạn ở đây",""));
	var al= ques+"&d="+(new Date()).getTime();
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+act;
	new Ajax.Request(url, {
	method: 'post',parameters: al,
	onSuccess: function(transport) {
			if (transport.responseText != ""){
				window.location=transport.responseText;
			}	
			},
		onFailure: function(e){return false;
		}
		}
	);
	*/
	var act = "act=tempwritequestion";	
	var ques = "&ques=" + encodeURI(removecharecterHTML(content).replace("Viết câu hỏi của bạn ở đây", ""));
	var al= ques+"&d="+(new Date()).getTime();
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+act;
	$.get(url, 
		function(data) {
			if (data != ""){
				window.location=data;
			}
		}
	);
}
function PostComment()
{
	var act = "act=submitwriteask";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="Login") 
				{
					document.getElementById("mbnd_qa_answer_login_blog").style.display='block';
				}
			}
			else
			{
				if(InsertComment()!=false)
				{
					document.getElementById("post_comment_link").style.display='none';
					document.getElementById("post_comment_process").style.display='block';
				}
			}
		}
	);
}
function InsertComment() {
    var CtlMst = document.getElementById('hdfCtlMst').value;
	if (document.getElementById("mbnd_post_comment_blog").value=="") 
	{
		document.getElementById("error_post_comment").className='mbnd_qa_error_blog';
		$("#error_post_comment").html("Xin lỗi, bạn phải viết thảo luận!");
		document.getElementById("mbnd_post_comment_blog").focus();
		return false;
	}
	
	var act = "act=postcomment";
	var content="&content="+encodeURI(removecharecterHTML(document.getElementById("mbnd_post_comment_blog").value));
	var askid="&askid="+document.getElementById("hdAskID").value;
	var cat="&cat="+document.getElementById(CtlMst+"_ucBlogAddComment_hdcat").value;
	var title="&title="+encodeURI(removecharecterHTML(document.getElementById(CtlMst+"_ucBlogAddComment_hdtitle").value));
	var al=content+askid+cat+title;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+al+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				window.location=data;
			}
		}
	);
}

function ChangeCategory(cat,type)
{
    var temp = '';
    var CtlMst = document.getElementById('hdfCtlMst').value;
	switch(cat) {
	case "1":
		temp=1+'-1-ban-nha';
		break;
	case "2":
		temp=1+'-2-mua-nha';
		break;
	case "3":
		temp=1+'-3-thue-nha';
		break;
	case "4":
		temp=1+'-4-moi-gioi-bat-dong-san';
		break;
	case "5":
		temp=1+'-5-tiep-thi-bat-dong-san';
		break;
	case "6":
		temp=1+'-6-van-phong---mat-bang';
		break;
	case "7":
		temp=1+'-7-du-an---quy-hoach';
		break;
	case "8":
		temp=1+'-8-thi-truong';
		break;
	case "9":
		temp=1+'-9-phap-li';
		break;
	case "10":
		temp=1+'-10-tai-chinh-ngan-hang';
		break;
	case "11":
		temp=1+'-11-thiet-ke-noi-that';
		break;
	case "12":
		temp=1+'-12-thiet-ke-kien-truc';
		break;
	case "13":
		temp=1+'-13-thiet-ke-san-vuon';
		break;
	case "14":
		temp=1+'-14-phong-thuy';
		break;
	case "15":
		temp=1+'-15-kien-thuc-tham-khao';
		break;
	case "16":
		temp=1+'-16-MuabanNhadat-com-vn';
		break;
	case "17":
		temp=1+'-17-khac';
		break;
	case "18":
		temp=1+'-18-tham-dinh-gia';
		break;
	default:temp='1-';
	}
	if(type=="search")
	{
		if(document.getElementById(CtlMst+"_ucBlogDefault_keyword").value==""||document.getElementById(CtlMst+"_ucBlogDefault_keyword").value=="Nhập từ khóa")
		{
		    alert("Bạn chưa nhập từ khóa tìm kiếm!");
			document.getElementById(CtlMst+"_ucBlogDefault_keyword").focus();	
			return false;
		}
	}
	var act = "act=searchkeyword";
	var keyword="&keyword="+encodeURI(removecharecterHTML(document.getElementById(CtlMst+"_ucBlogDefault_keyword").value).replace("Nhập từ khóa",""));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+keyword+"&d="+(new Date()).getTime();
	$.get(url, 
			function(data) {
					if (data != ""){
					if(data!="sucess")
						window.location=(document.getElementById("hdLink").value+temp+"-"+data).replace('--','-');
					else window.location=document.getElementById("hdLink").value+temp;
					}	
				}
		);
}

function Show_upload_picture()
{
	document.getElementById("uploadimagepopups").style.display="block";
}
function Show_upload_picture1()
{
	document.getElementById("upload1").style.display="block";
	document.getElementById("upload").style.display="none";
	document.getElementById("uploadimagepopups").style.display="block";
}
function UploadImage1()
{
    var CtlMst = document.getElementById('hdfCtlMst').value;
	var mLogo = document.images[CtlMst+"_ucBlogProfile_txtPhoto"].src;
	if (mLogo != "") document.getElementById(CtlMst+"_ucBlogProfile_hdLogo").value = mLogo.substr(mLogo.lastIndexOf('/')+1,mLogo.length - mLogo.lastIndexOf('/'));	
	var act = "act=uploadimageguest";
	var img="&img="+document.getElementById(CtlMst+"_ucBlogProfile_hdLogo").value;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+img+"&d="+(new Date()).getTime();
	$.get(url, 
	function(data) {
		if (data != ""){
			if(data == "success")
			{
				document.images["imgguest"].src=document.images[CtlMst+"_ucBlogProfile_txtPhoto"].src;	
				document.getElementById("uploadimagepopups").style.display="none";
			}
			else
				alert(data);
			}	
		}
	);
}
function UploadImage()
{
    var CtlMst = document.getElementById('hdfCtlMst').value;
	var mLogo = document.images[CtlMst+"_ucBlogProfile_txtPhoto"].src;
	if (mLogo != "") document.getElementById(CtlMst+"_ucBlogProfile_hdLogo").value = mLogo.substr(mLogo.lastIndexOf('/')+1,mLogo.length - mLogo.lastIndexOf('/'));	
	var act = "act=uploadimageguest";
	var img="&img="+document.getElementById(CtlMst+"_ucBlogProfile_hdLogo").value;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+img+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if(data == "success")
				{
					document.images[CtlMst+"_ucBlogProfile_imgguest"].src=document.images[CtlMst+"_ucBlogProfile_txtPhoto"].src;	
					document.getElementById("uploadimagepopups").style.display="none";
				}
				else
					alert(data);
			}	
		}
	);
}
function Displayform(id,blogid,cat,title)
{
	var act = "act=disformeditcomment";
	var articleid="&articleid="+id;
	var idblog="&blogid="+blogid;
	var ca="&cat="+cat;
	var ti="&title="+encodeURI(removecharecterHTML(title));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+idblog+ca+ti+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#"+id).html(data);
			}	
		}
	);
}
function DeleteComment(id,blogid,cat,title)
{
    if (!confirm('Bạn muốn xóa comment này?'))
      return false;
	var act = "act=delcomment";
	var articleid="&articleid="+id;
	var idblog="&blogid="+blogid;
	var ca="&cat="+cat;
	var ti="&title="+encodeURI(removecharecterHTML(title));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+idblog+ca+ti+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				window.location=data;
			}	
		}
	);
}
function SaveEditComment(id,blogid,cat,title)
{
	var act = "act=editcomment";
	var articleid="&articleid="+id;
	if(document.getElementById("post_comment_edit").value=="")
	{
	    alert("Bạn chưa nhập nội dung chỉnh sửa!");
		document.getElementById("post_comment_edit").focus();
		return false;
	}
	var idblog="&blogid="+blogid;
	var ca="&cat="+cat;
	var ti="&title="+encodeURI(removecharecterHTML(title));
	var content="&content="+encodeURI(removecharecterHTML(document.getElementById("post_comment_edit").value));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+content+idblog+ca+ti+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#"+id).html(data);	
			}	
		}
	);
}
function CancelEditComment(id,blogid,cat,title)
{
	var act = "act=editcommentcancel";
	var articleid="&articleid="+id;
	var idblog="&blogid="+blogid;
	var ca="&cat="+cat;
	var ti="&title="+encodeURI(removecharecterHTML(title));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+idblog+ca+ti+"&d="+(new Date()).getTime();
	
	$.get(url,
		    function (transport) {
		        if (transport != "") {
		            $(" "+ id +" ").html(transport);
		        }
		    }
	    );


}
function do_DelAnswer(id,type,askid,cat,title)
{
    if (!confirm('Bạn muốn xóa câu trả lời này?'))
      return false;
	var act = "act=delanswer";
	var articleid="&articleid="+id;
	var idask="&askid="+askid;
	var typedis="&type="+type;
	var catgory="&cat="+cat;
	var ti="&title="+encodeURI(removecharecterHTML(title));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+idask+typedis+catgory+ti+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				window.location=data;
			}	
		}
	);
}
function do_EditAnswer(id,type,askid,t) {

    var CtlMst = document.getElementById('hdfCtlMst').value;
	document.getElementById("hdAnswerID").value=id;
	var act = "act=editanswer";
	var articleid="&articleid="+id;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+"&d="+(new Date()).getTime();
	
	$.get(url, 
		function(data) {
			if (data != ""){
				if(t=="1")
				{
					//hiddenformvip();
					document.getElementById("answerBody").value=data.split("<==>")[0];
				}
				else if(t=="0")
				{
					showformvip();
					document.getElementById("editor").style.display="block";
					FCKeditorAPI.GetInstance(CtlMst+'_ucBlogAnswer_txtContentAns').SetHTML(data.split("<==>")[0]);
				}	
				document.getElementById("answerLink").value=data.split("<==>")[1];
				hidediv('answer_button_container','answer_question');
				$("#attachfile").html("<A class='textlink' onclick='OpenUpload("+id+");'>Sending attachments</A>");
				document.getElementById("answerBody").focus();
			}	
		}
	);
}
function ShowReport(id)
{
	document.getElementById(""+id+"").style.display='block';
}
function ShowFormSendMe(id)
{
	var act = "act=checkloginguest";
	var guestid="&guestid="+document.getElementById("hdGuestID").value;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+guestid+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				Element.setInnerHTML(""+id+"", transport.responseText);	
				document.getElementById(""+id+"").style.display='block';
			}
			else
			{
				alert("Bạn phải đăng nhập vào hệ thống để thực hiện chức năng này!");
			}
				
			},
		onFailure: function(e){return false;
		}
		}
	);	
	
}

function ReportAsk(id,typereportask,typearticle)
{
	var act = "act=report";
	var articleid="&articleid="+id;
	var type="&typereportask="+typereportask;
	var articletype="&typearticle="+typearticle;
	var content="&content="+encodeURI(document.getElementById("reContentask").value.replace("Content",""));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+content+type+articletype+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="success") {
					document.getElementById("reportask").style.display='none';
					$("#q_44187_flag").html("Thanks!");
				}
				else
				{
				    alert("Bạn chưa đăng nhập vào hệ thống!");
					document.getElementById("reportask").style.display='none';
				}
			}	
		}
	);
}
function ReportBlog(id,typereportask,typearticle)
{
	var act = "act=report";
	var articleid="&articleid="+id;
	var type="&typereportask="+typereportask;
	var articletype="&typearticle="+typearticle;
	var content="&content="+encodeURI(document.getElementById("reContentask").value.replace("Nội dung báo cáo",""));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+content+type+articletype+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="success") {
					document.getElementById("reportblog").style.display='none';
					$('#q_44187_flag').html("Thanks!");	
				}
				else
				{
				    alert("bạn chưa đăng nhập vào hệ thống!");
					document.getElementById("reportblog").style.display='none';
				}
			}	
		}
	);
}
function ReportAnswer(id,typereportanswer,typearticle)
{
	var act = "act=report";
	var articleid="&articleid="+id;
	var type="&typereportask="+typereportanswer;
	var articletype="&typearticle="+typearticle;
	var content="&content="+encodeURI(document.getElementById("reContentask"+id).value.replace("Content",""));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+content+type+articletype+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="success") {
					document.getElementById("reportanswer"+id).style.display='none';
					$("#a_272013_flag"+id).html("Thanks!");
				}
				else
				{
				    alert("Bạn chưa đăng nhập vào hệ thống!");
					document.getElementById("reportanswer"+id).style.display='none';
				}
			}	
		}
	);
}
function ReportComment(id,typereportanswer,typearticle)
{
	var act = "act=report";
	var articleid="&articleid="+id;
	var type="&typereportask="+typereportanswer;
	var articletype="&typearticle="+typearticle;
	var content="&content="+encodeURI(document.getElementById("reContentask"+id).value.replace("Content",""));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+content+type+articletype+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="success") {
					document.getElementById("reportcomment"+id).style.display='none';
					$("#a_272013_flag"+id).html("Thanks!");	
				}
				else
				{
				    alert("Bạn chưa đăng nhập vào hệ thống!");
					document.getElementById("reportcomment"+id).style.display='none';
				}
			}	
		}
	);
}
function ReportBlogProfile(id,typereportask,typearticle)
{
	var act = "act=report";
	var articleid="&articleid="+id;
	var type="&typereportask="+typereportask;
	var articletype="&typearticle="+typearticle;
	var content="&content="+encodeURI(document.getElementById("reContentask").value.replace("Content",""));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+content+type+articletype+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="success") {
					document.getElementById("reportprofile").style.display='none';
					$("#p_507957_flag").html("Thanks!");
				}
				else
				{
				    alert("Bạn chưa đăng nhập vào hệ thống!");
					document.getElementById("reportprofile"+id).style.display='none';
				}
			}	
		}
	);
}
function save(id)
{
	var act = "act=savearticle";
	var articleid="&articleid="+id;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+articleid+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="success") {
					$("#q_44187_sv_status").html("Saved!");
					document.getElementById("q_44187_sv_status").className='qa_vote_thanks';	
				}
				else
				{
				    alert("Bạn chưa đăng nhập vào hệ thống!");
				}
			}	
		}
	);
}
function SendFriend(Uc) {
   
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var emailgoi = document.getElementById("emailgui").value;
    var emailnhan = document.getElementById("emailnhan").value;

    if (emailgoi == "" || emailnhan=="")
	{
	    alert("Bạn phải nhập Email của bạn và Email của người nhận !");
		document.getElementById("emailnhan").focus();
		return false;
    }
    if (reg.test(emailgoi) == false || reg.test(emailnhan) == false) 
    {
        alert("Định dạng Email không đúng");
        return false
    }	

    var CtlMst = document.getElementById('hdfCtlMst').value;
	var act = "act=sendfriend";
	var emailgui="&emailgui="+document.getElementById("emailgui").value;
	var emailnhan="&emailnhan="+document.getElementById("emailnhan").value;
	var tengui="&tengui="+document.getElementById("ten").value;
	var noidung="&noidung="+encodeURI(removecharecterHTML(document.getElementById("reContent").value));
	var id="&id="+document.getElementById("hdAskID").value;
	var title = "&title=" + encodeURI(removecharecterHTML(document.getElementById(CtlMst+"_"+Uc + "_hdtitle").value));
	var cat = "&cat=" + document.getElementById(CtlMst + "_" + Uc + "_hdcat").value;
	var type="&type="+Uc;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+emailgui+emailnhan+tengui+noidung+id+title+type+cat+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
				if (data != ""){
				    alert("Gởi thành công!");
				document.getElementById("sendmailfriend").style.display='none';
				}	
			}
		);
}
function SendMailMe()
{
	var act = "act=sendmailme";
	var emailgui="&emailgui="+document.getElementById("hdemailgui").value;
	var emailnhan="&emailnhan="+document.getElementById("hdEmail").value;
	var tengui="&tengui="+document.getElementById("hdnamegui").value;
	var noidung="&noidung="+encodeURI(document.getElementById("reContentemail").value);
	var title="&title="+document.getElementById("titlesendmail").value;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+emailgui+emailnhan+tengui+noidung+title+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
			    alert("Gởi thành công!");
				document.getElementById("sendmailforme").style.display='none';
			}	
		}
	);
}
function a()
{
	document.getElementById("menulogin").style.display='block';
}
function b()
{
	document.getElementById("menulogin").style.display='none';
}
function ShowFormEditAccount()
{
	var act = "act=showformeditaccount";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#editaccount").html(data);
			}	
		}
	);
}
function CancelEditAccount()
{
	var act = "act=cancelformeditaccount";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#editaccount").html(data);
			}	
		}
	);
}
function SubmitEditAccount()
{
	if (document.getElementById("nameaccount").value=="") 
	{
	    alert("Bạn chưa nhập Username!");
		document.getElementById("nameaccount").focus();
		return false;
	}
	if (document.getElementById("passwordaccount").value=="") 
	{
	    alert("Bạn chưa nhập Password!");
		document.getElementById("passwordaccount").focus();
		return false;
	}
	var act = "act=submitformeditaccount";
	var username="&username="+document.getElementById("nameaccount").value;
	var pass="&pass="+document.getElementById("passwordaccount").value;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+username+pass+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				if (data=="success") {
					CancelEditAccount();
				}
				else {
				    alert("Tài khoản này đã có người dùng!");
				}
			}	
		}
	);
}
function send_email_forgot_password()
{
	if(document.getElementById("forgot_password_email_field").value=="")
	{
	    alert("Bạn phải nhập Email!");
		document.getElementById("forgot_password_email_field").focus();	
		return false;
	}
	var act = "act=sendemailforgotpass";
	var email="&email="+document.getElementById("forgot_password_email_field").value;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+email+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
			    alert("Gởi thành công. bạn hãy kiểm tra lại Email để xác nhận thông tin!");	
			}	
		}
	);
}
function DelQuestion(articleID)
{
    if (!confirm('bạn muốn xóa câu hỏi này?'))
		return false;
	var act = "act=delarticle";
	var vArticleid="&articleID="+articleID;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+vArticleid+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				alert(data);
			}	
			ListBlogAsk(1);
		}
	);
}

function SubmitAboutMemberVip(content)
{
    var CtlMst = document.getElementById('hdfCtlMst').value;
	if(content=="")
	{
	    alert("Bạn phải nhập nội dung!");
		document.getElementById(CtlMst+"_ucBlogProfile_txtContentBlog___Frame").focus();	
		return false;
	}
	var url=pathClientAjax+"handler/BlogHandler.aspx@act=aboutmembervip";
	$.post(url, {content:removecharecterHTML(content)},
	function(data){
		if (data != ""){
			alert(data);
		}
	});
}
function removefile(id)
{
    if (!confirm('Bạn muốn xóa file này?'))
	return false;
	var act = "act=delfile";
	var vfileid="&fileid="+id;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+vfileid+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				document.getElementById("sf"+id).style.display='none';
			}	
		}
	);
}

function OpenUpload(id)
{
	window.open(pathClientAjax+'BlogUploadFile.aspx@id='+id,'_blank','scrollbars=yes,width=400,height=300,top=200,left=200');
	return;
}
function WriteCommentFocus()
{
	document.getElementById("mbnd_post_comment_blog").focus();
}
function showformvip()
{
	document.getElementById("answerBody").style.display="none";
	document.getElementById("answerBody").value='';
	document.getElementById("editor").style.display="block";
	document.getElementById("showformvip").style.display="none";
	document.getElementById("hiddenformvip").style.display="inline";
}
function hiddenformvip()
{
    var CtlMst = document.getElementById('hdfCtlMst').value;
    document.getElementById("answerBody").style.display="block";
	document.getElementById("editor").style.display="none";
	document.getElementById(CtlMst+"_ucBlogAnswer_txtContentAns").value='';
	document.getElementById("showformvip").style.display="inline";
	document.getElementById("hiddenformvip").style.display="none";
}
function do_vote(id,vote)
{
	var act = "act=vote";
	var idarticle="&id="+id;
	var v="&vote="+vote;
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+idarticle+v+"&d="+(new Date()).getTime();
	$.get(url, 
		function(data) {
			if (data != ""){
				$("#vote_"+id).html("1");
				$("#vote_thank_"+id).html("Thanks!");
			}	
		}
	);
}
function SearchKeyWord() {
    var CtlMst = document.getElementById('hdfCtlMst').value;
	if(document.getElementById(CtlMst+"_ucBlogDefault_keyword").value==""||document.getElementById(CtlMst+"_ucBlogDefault_keyword").value=="Nhập từ khóa")
	{
		alert("Bạn phải nhập từ khóa cần tìm!");
		document.getElementById(CtlMst+"_ucBlogDefault_keyword").focus();	
		return false;
	}

	var act = "act=searchkeyword";
	var keyword="&keyword="+encodeURI(removecharecterHTML(document.getElementById(CtlMst+"_ucBlogDefault_keyword").value));
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+keyword+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				window.location=document.getElementById("hdLink").value+"1_";
			}	
			},
		onFailure: function(e){return false;
		}
		}
	);
}
function KeyPressBlog(e, type)
{
    var unicode = e.charCode ? e.charCode : e.keyCode;
    var CtlMst = document.getElementById('hdfCtlMst').value
	if (unicode == 13)
	{
		switch(type) {
		case "search":
			ChangeCategory(document.getElementById(CtlMst+'_ucBlogDefault_searchCategoryId').value,'search');
			break;
		case "question":
			SubmitWriteAsk();
			break;
		case "blog":
			var oEditor = FCKeditorAPI.GetInstance('blog_txtContentBlog') ;
			WriteBlog(1,oEditor.GetXHTML( true ));
			break;
		case "login":
			SubmitWriteAskLogin();
			break;
		case "loginhead":
			submit_login_form_blog('login_form', '', false);
			return false;
			break;
		case "register":
			SubmitWriteAskSignIn();
			break;
		case "registerhead":
			submit_register_form_blog('register_form', '', false);
			return false;
			break;
		case "fogotpass":
			send_email_forgot_password();
			return false;
			break;
		case "answer":
			sendAnswer();
			break;
		}
	}
}
function CheckLoginBlog(){
	var act = "act=checklogin";
	var url = pathClientAjax+"handler/BlogHandler.aspx?"+ act+"&d="+(new Date()).getTime();
	new Ajax.Request(url, {   
		method: 'get',					
		onSuccess: function(transport) {
			if (transport.responseText != ""){
				Element.setInnerHTML("top_blog", transport.responseText);
			}	
			else
				Element.hide('top_blog');			
			},
		onFailure: function(e){return false;
		}
		}
	);
}

//Event.observe(window, 'load', CheckLoginBlog, false);

//////// cac ham Truong viet them sau nay

function loadCatSub(idcat, IdCatSub) {
    var url = pathClientAjax + "handler/BlogHandler.aspx@act=loadCatSub";
    $.post(url, { idcat: idcat },
	    function (data) {
	        if (data.XMLDocument != "") {
	            var lcObjXmlDoc = data;
	            var lcNodes = lcObjXmlDoc.getElementsByTagName("*")[0].childNodes;
	            if (lcNodes.length > 0) {
	                try {
	                    removeSelectbox(IdCatSub, 'chá»n');
	                    var obj_select = document.getElementById(IdCatSub);
	                    for (var i_ = obj_select.length - 1; i_ >= 0; i_--) {
	                        obj_select.options[i_] = null;
	                    }
	                    for (var k = 1; k < lcNodes.length; k++) {
	                        var options_length = obj_select.length;
	                        var option_value = lcNodes[k].childNodes[0];
	                        var option_text = lcNodes[k].childNodes[1];
	                        while (option_text.childNodes[0].nodeValue.indexOf("|") != -1) {
	                            option_text.childNodes[0].nodeValue = option_text.childNodes[0].nodeValue.replace("|", "&").replace("$", "N'");
	                        }
	                        if (k == 0)
	                            obj_select.options[options_length] = new Option("Chá»n", "");
	                        else
	                            obj_select.options[options_length] = new Option(option_text.childNodes[0].nodeValue, option_value.childNodes[0].nodeValue);

	                        document.getElementById(IdCatSub).disabled = false;
	                    }
	                } catch (e) {
	                    //alert(e);					
	                }
	            }
	        }
	        else {
	            removeSelectbox(IdCatSub, 'Loading...');
	        }
	    });
}
function removeSelectbox(objID, initText) {
    if (initText && initText.indexOf('*') != -1)
        initText = initText.replace('***', 'Chá»n');
    var obj_select = document.getElementById(objID);
    obj_select.disabled = true;
    for (var k = obj_select.options.length - 1; k >= 0; k--) {
        obj_select.options[k] = null;
    }
    if (initText != undefined || initText != null) {
        if (initText != '') obj_select.options[0] = new Option(initText, "");
    }
}