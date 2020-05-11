<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ArticleList.aspx.cs" Inherits="ArticleList"%>
<%@ Register Src="CMS/Display/Templates/Articles/UtilControls/Index/ArticleList.ascx" TagName="ArticleList" TagPrefix="web" %>

<asp:Content ID="ArticleListPage" ContentPlaceHolderID="MainContent" Runat="Server">
    <web:ArticleList ID="ArticleListIndex" runat="server" IsAgentCat="true" ControlCssClass="defaultbox" ImageWidth="100" ImageHeight="85" PageSize="10" />
</asp:Content>