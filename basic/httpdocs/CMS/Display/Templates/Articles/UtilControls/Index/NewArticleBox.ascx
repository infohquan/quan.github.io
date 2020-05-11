<%@ Control Language="C#" AutoEventWireup="true" CodeFile="NewArticleBox.ascx.cs" Inherits="CMS_Display_Templates_Articles_UtilControls_Index_NewArticleBox" %>
<!--Top 1 article và những bài viết khác mới nhất ()-->
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=Subject%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server">
            <!--<div class="hotnews-no1">
                <a class="hotnews-no1-title" href="#">LỄ SƠ KẾT 06 THÁNG ĐẦU NĂM 2010</a>
                <span class="hotnews-no1-postdate">Ngày 14 tháng 7 năm 2010</span>
                <img alt="" src="images/imgads.png" style="float:left; padding-left:15px; width:110px; height:95px;" />
                <span class="hotnews-no1-excerpt">Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn Phần dành cho trích dẫn </span>
            </div>
            <div class="clear"></div>
            <div class="othernews">
                <span>Các tin liên quan khác</span>
                <a href="#">Tin liên quan 1</a>
                <a href="#">Tin liên quan 1</a>
                <a href="#">Tin liên quan 1</a>
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
