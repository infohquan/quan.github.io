<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TopHotProductMarquee.ascx.cs" Inherits="CMS_Display_Templates_Products_UtilControls_TopProducts_TopHotProductMarquee" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "TopHotProduct")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
<style type="text/css">
    .TopHotProductMarquee h3 { display:block; font-size:12px; background:url(images/icon-hot-product.png) 0 1px no-repeat; height:28px; margin:0px; padding-left:15px; }
    .TopHotProductMarquee img { border: solid 1px #ECE4B0; }
    .TopHotProductMarquee a { color:Blue; }
    .TopHotProductMarquee a:hover { color:Red; }
</style>
