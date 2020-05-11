<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="WebAdmin_Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>::CDG.VN| Adminstration::</title>
    <link href="css/Rounded.css" rel="stylesheet" type="text/css" />
    <link href="css/LoginStyle.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript">
        function LoginClick()
        {
            var url = "";
            var u = document.getElementById('txtUsername').value;
            var p = document.getElementById('txtPassword').value;
            //window.location.href = "Login2.aspx?UserName=" + u + "&Password=" + p;
            window.location.href = "Default.aspx";
        }
    </script>
</head>
<body>
    <form id="frmLogin" runat="server">
    <div id="border-top" class="header">
		<div>
			<div>
				<span class="title"></span>
			</div>
		</div>

	</div>
	<div id="content-box">
		<div class="padding">
			<div id="element-box" class="login">
				<div class="t">
					<div class="t">
						<div class="t"></div>
					</div>
				</div>

				<div class="m">
					<h1><span style="color:Blue;">C</span><span style="color:Red;">D</span><span style="color:Green;">G</span>
					<span style="color:Brown;">Administrator</span><span style="color:Blue;">!</span>
					    <span id="lblTextLoginSystem" runat="server"></span>
					</h1>					
					<%if (fError) {%>
                    <div id="system-message">                        
                        <ul><li>Username and password do not match!</li></ul>
                    </div>
                    <%} %>
                    <div id="section-box">
			            <div class="t">
				            <div class="t">
					            <div class="t"></div>
		 		            </div>
	 		            </div>	 		            
			            <div class="m">
		                    <dl>
                                <dt class="label"><span id="lblTextUserName" runat="server">Username:</span></dt>
                                <dd><input id="txtUsername" type="text" class="inputbox" size="15" style="width:165px;" runat="server" /></dd>
                                
                                <dt class="label"><span id="lblTextPassword" runat="server">Password:</span></dt>                                
                                <dd><input id="txtPassword" type="password" class="inputbox" size="15" style="width:165px;" runat="server" /></dd>
                                
                            </dl>
	                        <div style="padding-left:125px;"><asp:Button ID="btnLogin" CssClass="btnLogin" Text="Login!" runat="server" OnClick="btnLogin_Click" /></div>
	                        
	                        <div class="clr"></div>	            
				            
			            </div>
			            <div class="b">
				            <div class="b">
		 			            <div class="b"></div>
				            </div>
			            </div>
		            </div>
            		
		            <p style="padding-left:50px;">
			            <a href="http://www.cdg.vn/"><span id="lblTextHomepage" runat="server"></span></a>
		            </p>
		            <div id="lock"></div>
		            <div class="clr"></div>
                </div>
	            <div class="b">
		            <div class="b">
			            <div class="b"></div>
		            </div>
	            </div>
			</div>
            <noscript>Warning! JavaScript must be enabled for proper operation of the Administrator back-end.</noscript>
            <div class="clr"></div>
		</div>
	</div>
    <div id="border-bottom"><div><div></div></div></div>
    <div id="footer">
	    <p class="copyright">
		    <a href="http://www.cdg.vn" target="_blank">Powered by cdg.vn</a>
        </p>
    </div>
    </form>
</body>
</html>
