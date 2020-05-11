<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GalleryPhotoView.ascx.cs" Inherits="CMS_Display_Utilities_Gallery_GalleryPhotoView" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<p><span style="font-size: medium;"><span style="color: rgb(255, 0, 0);">Thank you for watching my pictures</span></span></p>
    <head><center>
      <title>Like Hong Quan</title>
    </head>
    <body>
       <iframe src="https://www.facebook.com/plugins/like.php?href=hongquan.bsm.vn"
        scrolling="no" frameborder="0"
        style="border:none; width:620px; height:80px"></iframe>
    </body></center>

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


<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "AlbumGallery")%></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="khavigallery">
            <%this.LoadPhotoList();%>
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