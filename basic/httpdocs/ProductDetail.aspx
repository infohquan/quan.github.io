<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ProductDetail.aspx.cs" Inherits="ProductDetail" %>
<%@ Register Src="CMS/Display/Templates/Products/Default/ProductDetail.ascx" TagName="ProductDetail" TagPrefix="web" %>
<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
    <web:ProductDetail ID="ProductDetail1" runat="server" ControlCssClass="defaultbox" ImageInLeft="true" />
</asp:Content>

