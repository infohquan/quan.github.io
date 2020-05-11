<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GallerySlide.ascx.cs" Inherits="CMS_Display_Utilities_Gallery_GallerySlide" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<script type="text/javascript">
$(function() {
	$('.neoslideshow img:gt(0)').hide();
	setInterval(function(){
      $('.neoslideshow :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.neoslideshow');}, 
      2000);
})
</script>
<style type="text/css">
.neoslideshow {position:relative; width:100%; height:0px; }
.neoslideshow img {position:absolute;left:50px; top:125px; padding:0px;border:6px solid #f1f1f1;}
</style>

<script type="text/javascript">
    function openGalleryView()
    {
        window.location.href='GalleryView.aspx?Lang=' + getLang();
    }
</script>

<div id="divContent" runat="server" class="neoslideshow"></div>

<%--<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=Khavi.Provider.LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "ImageCompany")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server" class="neoslideshow" onclick="javascript:openGalleryView();"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>--%>