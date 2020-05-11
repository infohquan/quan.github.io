<%@ Page Language="C#" MasterPageFile="~/MasterPageCustomer.master" AutoEventWireup="true" CodeFile="WebDemo.aspx.cs" Inherits="WebDemo" %>
<%@ Register Src="~/CMS/Display/Utilities/WebDemo/WebDemoPage.ascx" TagName="WebDemoPage" TagPrefix="web" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
    <web:WebDemoPage ID="WebDemoPage" runat="server" ControlCssClass="abox" ImageWidth="140" ImageHeight="140" />
</asp:Content>

