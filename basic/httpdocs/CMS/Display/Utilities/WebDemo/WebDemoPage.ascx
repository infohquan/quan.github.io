<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebDemoPage.ascx.cs" Inherits="CMS_Display_Utilities_WebDemo_WebDemoPage" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div class="web-demo-title"></div>
        <div style="line-height:30px;">
            <span style="padding:0 20px; color:Yellow;">Danh mục:</span>
            <asp:DropDownList ID="ddlGroup" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlGroup_SelectedIndexChanged"></asp:DropDownList>
        </div>
        <div class="clear"></div>
        <%this.LoadWebDemo();%>
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
