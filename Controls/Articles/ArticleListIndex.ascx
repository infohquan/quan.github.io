<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticleListIndex.ascx.cs" Inherits="Controls_Articles_ArticleListIndex" %>

<%--<div class="box list-services">
    <div class="top"><strong>Dịch vụ</strong></div>
    <div class="middle">
        <div class="tool">
            <input id="text_search" type="text" />
            <a onclick="toolSearch('service')" href="javascript:;">Tìm kiếm</a>
        </div>
        <div class="clear"></div>
        <%this.LoadData();%>
        <div class="clear"></div>
        <%this.DisplayHtmlStringPaging();%>        
    </div>
    <div class="bottom"></div>
</div>--%>

<%if (f == true) {%>
<script type="text/javascript" language="javascript">
    $(document).ready(function() {
        $('#services-list').cycle({
            fx: 'fade',
            speed: 5000
        });
    });
</script>
<div class="page-services">
    <div class="top"><h3><span id="lblSubject" runat="server">Dịch vụ nổi bật</span></h3></div>
    <div id="services-list" class="content">
        <%this.LoadCycleArticle("service");%>
        <!--<div>
            <a class="article-item" href="#">
                <span>Tieu de dich vu</span>
                <img src="images/img_news_1.jpg" />
            </a>
        </div>
        
        <div>
            <a class="article-item" href="#">
                <span>Tieu de dich vu</span>
                <img src="images/img_news_1.jpg" />
            </a>
        </div>-->        
    </div>
</div>
<div class="clear"></div>
<%} %>