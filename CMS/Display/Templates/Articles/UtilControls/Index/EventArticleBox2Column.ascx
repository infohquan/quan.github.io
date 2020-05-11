<%@ Control Language="C#" AutoEventWireup="true" CodeFile="EventArticleBox2Column.ascx.cs" Inherits="CMS_Display_Templates_Articles_UtilControls_Index_EventArticleBox2Column" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><%=Subject%></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server">
            <!--<div class="hot-article-sidebar">
                <h3>Tiêu đề tin tức</h3>
                <span>Noi dung trich doan Noi dung trich doan Noi dung trich doan Noi dung trich doan Noi dung trich doan Noi dung trich doan Noi dung trich doan </span>
                <a class="view-more" href="#">Chi tiết >></a>
            </div>
            <div class="hot-article-sidepanel">
                <img alt="" src="images/imgads.png" style="width:200px; height:120px; margin-top:5px;" />
                <div class="hot-article-others">
                    <h3>Các tin khác</h3>
                    <a href="#">Tieu de tin tuc Tieu de tin tuc </a>
                    <a href="#">Tieu de tin tuc Tieu de tin tuc </a>
                </div>
            </div>-->
        </div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
