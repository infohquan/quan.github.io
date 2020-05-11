<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GalleryAlbumList.ascx.cs" Inherits="CMS_Display_Utilities_Gallery_GalleryAlbumList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "AlbumGallery")%></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <%this.LoadAlbumList();%>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
