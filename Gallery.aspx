<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Gallery.aspx.cs" Inherits="Gallery" %>
<%@ Register Src="CMS/Display/Utilities/Gallery/GalleryAlbumList.ascx" TagName="GalleryAlbumList" TagPrefix="web" %>

<asp:Content ID="GalleryPage" ContentPlaceHolderID="MainContent" Runat="Server">
    <web:GalleryAlbumList ID="GalleryAlbumList" runat="server" IsAgentCat="true" ControlCssClass="defaultbox" />
</asp:Content>

