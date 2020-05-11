<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="AboutUs.aspx.cs" Inherits="AboutUs" %>
<%@ Register Src="CMS/Display/Templates/Articles/Default/AboutUsDetail.ascx" TagName="AboutUsDetail" TagPrefix="web" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
    <web:AboutUsDetail ID="AboutUsDetailPage" runat="server" ControlCssClass="defaultbox" ImageWidth="160" ImageHeight="140" />
</asp:Content>

