<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Customer.aspx.cs" Inherits="Customer" %>
<%@ Register Src="CMS/Display/Utilities/Customer/CustomerPage.ascx" TagName="CustomerPage" TagPrefix="web" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
    <web:CustomerPage id="CustomerPage" ControlCssClass="abox" ImageWidth="125" ImageHeight="105" runat="server" />
</asp:Content>