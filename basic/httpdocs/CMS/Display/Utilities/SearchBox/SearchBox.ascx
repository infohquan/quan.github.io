<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SearchBox.ascx.cs" Inherits="CMS_Display_Utilities_SearchBox_SearchBox" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "Search")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div class="search-box">
            <asp:TextBox ID="txtSearch" runat="server" CssClass="text-search" Text="Nhập tiếng việt có dấu..."></asp:TextBox>
            <asp:Button ID="btnSearch" Text="Tìm kiếm" CssClass="button-search" runat="server" OnClick="btnSearch_Click" />
        </div>
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
    .SearchBox h3 { display:block; font-size:12px; background:url(images/icon-search.png) 0 1px no-repeat; height:27px; margin:0px; }
    .search-box { width:100%; display:inline-block; }
    .text-search { width:150px; padding:3px; height:14px; color:#1c9222; margin-left:4px;}
    .button-search { display:block; background:url(images/button-search.png) no-repeat; width:64px; height:20px; cursor:pointer; border:0px; margin:5px 5px 5px 70px; }
</style>
