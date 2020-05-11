<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CustomerSlideBox.ascx.cs" Inherits="CMS_Display_Utilities_Customer_CustomerSlideBox" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<script type="text/javascript">
$(function() {
	$('.customerslidebox img:gt(0)').hide();
	setInterval(function(){
      $('.customerslidebox :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.customerslidebox');}, 
      2000);
})
</script>
<style type="text/css">
.customerslidebox {position:relative; width:100%; height:157px; cursor:pointer;}
.customerslidebox img {position:absolute;left:0; top:0; padding:3px;}
</style>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "CustomerPartner")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" class="customerslidebox" runat="server"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
