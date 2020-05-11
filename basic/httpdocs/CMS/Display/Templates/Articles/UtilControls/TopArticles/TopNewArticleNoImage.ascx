<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TopNewArticleNoImage.ascx.cs" Inherits="CMS_Display_Templates_Articles_UtilControls_TopArticles_TopNewArticleNoImage" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>" style="margin-top:-20px;">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=Subject%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle" style="border-left:solid 1px #ECE4B0; border-right:solid 1px #ECE4B0; width:178px">
        <div id="divContent" class="content" runat="server"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
