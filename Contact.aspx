<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Contact.aspx.cs" Inherits="Contact" %>
<%@ Register Src="CMS/Display/Utilities/Contact/Contact.ascx" TagName="Contact" TagPrefix="web" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
    <web:Contact ID="ContactPage" runat="server" IsAgentCat="true" ControlCssClass="defaultbox" />
</asp:Content>

