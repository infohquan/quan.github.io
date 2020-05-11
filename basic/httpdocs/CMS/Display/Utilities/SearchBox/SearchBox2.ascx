<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SearchBox2.ascx.cs" Inherits="CMS_Display_Utilities_SearchBox_SearchBox2" %>

<div class="search-box">
    <asp:TextBox ID="txtSearch" runat="server" CssClass="text-search" Text="Nhập tiếng việt có dấu..."></asp:TextBox>
    <asp:Button ID="btnSearch" Text="Tìm" CssClass="button-search" runat="server" OnClick="btnSearch_Click" />
</div>
