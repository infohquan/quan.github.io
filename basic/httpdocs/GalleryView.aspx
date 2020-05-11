<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="GalleryView.aspx.cs" Inherits="GalleryView" %>
<%@ Register Src="CMS/Display/Utilities/Gallery/GalleryPhotoView.ascx" TagName="GalleryPhotoView" TagPrefix="web" %>

<asp:Content ID="GalleryViewPage" ContentPlaceHolderID="MainContent" Runat="Server">
    <web:GalleryPhotoView ID="GalleryPhotoView" runat="server" IsAgentCat="true" ControlCssClass="defaultbox" ImageWidth="170" ImageHeight="150" />
    
   <%--<div class="wrapper-box">
        <div class="top"></div>
        <div class="content">
            <h3><span id="lblSubject" runat="server">Album ảnh</span></h3>    
            <div id="khavigallery">
                //this.LoadPhotoList();
            </div>
        </div>
        <div class="bottom"></div>
    </div>--%>
</asp:Content>

