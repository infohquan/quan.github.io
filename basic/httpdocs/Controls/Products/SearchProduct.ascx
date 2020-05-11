<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SearchProduct.ascx.cs" Inherits="Controls_Products_SearchProduct" %>

<div class="title_box"><span id="lblSubject" runat="server"></span></div>  
<div class="border_box">
    <input id="txtSearch" runat="server" onblur="" type="text" class="text_search" value="Nhập từ khóa tìm kiếm" />
    <asp:DropDownList ID="ddlCatalog" runat="server" CssClass="ddlCatalog"></asp:DropDownList>
    <asp:Button ID="btnSearch" runat="server" Text="Tìm" OnClick="btnSearch_Click" />
</div>  
