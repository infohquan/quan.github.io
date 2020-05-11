<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ProductList.aspx.cs" Inherits="ProductList" %>
<%@ Register Src="~/CMS/Display/Templates/Products/Default/ProductListAllOnlyImage.ascx" TagName="ProductListAllOnlyImage" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Products/Default/ProductListV1.ascx" TagName="ProductListV1" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Products/Default/ProductListV2.ascx" TagName="ProductListV2" TagPrefix="web" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
    <web:ProductListV1 ID="ProductListV1" runat="server" IsAgentCat="true" ControlCssClass="defaultbox" ImageWidth="140" ImageHeight="100" PageSize="12" IsViewLinkDetail="true" IsViewPrice="false" IsViewProductDesc="true" IsViewLinkAddCart="false" />
</asp:Content>