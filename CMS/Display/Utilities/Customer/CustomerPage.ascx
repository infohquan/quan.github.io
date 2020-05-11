<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CustomerPage.ascx.cs" Inherits="CMS_Display_Utilities_Customer_CustomerPage" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>
<p><span>**** Would you like to appear here? Please Click the button LIKE above</span></p>
<p><span>**** For those who Like me in Facebook only</span></p>
<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><%//=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "AboutUs")%></div>
            </div>
        </div>
    </div>


<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=209048469228894";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="fb-like" data-href="http://hongquan.bsm.vn" data-send="true" data-width="580" data-show-faces="true" data-font="arial"></div>

    <div class="">
      
        <%this.LoadCustomer();%>
        <div class="clear"></div>
        <div style="padding:10px 0 10px 20px;"><%this.DisplayHtmlStringPaging(); %></div>        
        <div class="clear"></div>
        <div class="customer-page-bottom"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
