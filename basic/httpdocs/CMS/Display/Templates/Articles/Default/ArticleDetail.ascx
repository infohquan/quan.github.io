<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticleDetail.ascx.cs" Inherits="CMS_Display_Templates_Articles_Default_ArticleDetail" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>



<script type="text/javascript">
    $(document).ready(function () {
        $(".download_now").tooltip({ effect: 'slide' });
    });
 </script>
<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><span id="lblSubject" style="color:#e4ab3d; font-weight:bold; font-size:14px;" runat="server">Tin tức</span></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" style="padding-top:8px;">
            <div class="div-detail-image" id="div_img_article" runat="server">
                <img id="img" runat="server" />
            </div>
            <div class="div-detail-sumary" id="divDetailSumary" runat="server">
                <div class="div-detail-title"><span id="lblTitle" runat="server">Tiêu đề bài viết</span></div>
                <div class="div-detail-postdate"><span id="lblPostDate" runat="server"></span></div>
                <div class="div-detail-excerpt"><span id="lblExcerpt" runat="server">Tiêu đề bài viết</span></div>
            </div>
            <div class="clear"></div>
            <div class="div-detail-content">
                <span id="lblContent" runat="server">Nội dung bài viết</span>
                <div class="div-detail-authors"><span id="lblAuthors" runat="server">Tác giả</span></div>
            </div>
            

<p><span style="font-size: medium;"><span style="color: rgb(255, 0, 0);">Please! Like me if this is a good news for you !</span></span></p>
    <head><center>
      <title>Like Hong Quan</title>
    </head>
    <body>
       <iframe src="https://www.facebook.com/plugins/like.php?href=hongquan.bsm.vn"
        scrolling="no" frameborder="0"
        style="border:none; width:450px; height:80px"></iframe>
    </body></center>

<p style="text-align: center;"><span style="color: rgb(0, 0, 255);"><span style="font-size: medium;">Thank you of liking! If you want to send for me a message please:&nbsp;</span></span><span style="color: rgb(255, 255, 255);"><span style="font-size: medium;"><a href="http://hongquan.bsm.vn/Contact.aspx?t=CustomerIdea&amp;Lang=EN" target="_parent"><strong><span style="background-color: rgb(255, 0, 0);"> </span></strong></a></span></span><span style="color: rgb(0, 0, 255);"><span style="font-size: medium;"><a href="http://hongquan.bsm.vn/Contact.aspx?t=CustomerIdea&amp;Lang=EN" target="_parent"><strong><span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(255, 0, 0);">Click here </span></span></strong></a><br />
</span></span></p>
<p style="text-align: center;"><span style="color: rgb(0, 0, 255);"><span style="background-color: rgb(255, 255, 255);">Or : Send me a email : infohquan@gmail.com</span> (infohquan@yahoo.com.vn)</span></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>

		<div class="article-toolbar">
                <table style="width:100%; border:0px;" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="width:30%;"></td>
                        <td style="width:40%;" valign="top">
                            <!-- AddThis Button BEGIN -->
                            <div class="addthis_toolbox addthis_default_style">
                            <a href="http://www.addthis.com/bookmark.php?v=250&amp;username=xa-4beade4e5ad284e9" class="addthis_button_compact"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "Share")%></a>
                            <span class="addthis_separator">|</span>
                            <a class="addthis_button_facebook"></a>
                            <a class="addthis_button_myspace"></a>
                            <a class="addthis_button_google"></a>
                            <a class="addthis_button_twitter"></a>
                            </div>
                            <script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#username=xa-4beade4e5ad284e9"></script>
                            <!-- AddThis Button END -->
                        </td>
                        <td style="width:15%" valign="top"><a class="printview" target="_blank" title="Xem bản in của bài viết" href="<%=Globals.ApplicationPath%>PrintView.aspx?ID=<%=Globals.GetIntFromQueryString("ID")%>&CatID=<%=Globals.GetIntFromQueryString("CatID")%>&Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "PrintView")%></a>&nbsp;&nbsp;&nbsp;</td>
                        <td style="width:15%" valign="top"><a class="goback" title="Trở lại trang trước" href="javascript:history.back()"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "Back")%></a>&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                </table>
            </div>
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
<div class="clear"></div>

</form>
<div class="js-kit-comments" backwards="yes" paginate="10"></div>
<script src="http://js-kit.com/comments.js"></script>

<%this.LoadOtherList();%>
