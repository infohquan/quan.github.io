<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ArticleDetail.aspx.cs" Inherits="ArticleDetail" %>
<%@ Register Src="CMS/Display/Templates/Articles/Default/ArticleDetail.ascx" TagName="ArticleDetail" TagPrefix="web" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
    <web:ArticleDetail ID="ArticleDetailPage" runat="server" ControlCssClass="defaultbox" ImageWidth="160" ImageHeight="140" />
</asp:Content>

