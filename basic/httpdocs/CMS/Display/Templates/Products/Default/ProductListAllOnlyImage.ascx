<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ProductListAllOnlyImage.ascx.cs" Inherits="CMS_Display_Templates_Products_Default_ProductListAllOnlyImage" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><asp:Label ID="lblSubject" runat="server"></asp:Label></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server"></div>
        <div class="clear"></div>
        <div id="divPaging" runat="server" style="padding-left:10px;"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>