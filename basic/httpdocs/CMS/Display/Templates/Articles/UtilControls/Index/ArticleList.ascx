<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticleList.ascx.cs" Inherits="CMS_Display_Templates_Articles_UtilControls_Index_ArticleList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><span id="lblSubject" runat="server">Tin tức</span></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" style="padding-top:8px;" runat="server"></div>
        <div class="clear"></div>
        <div style="padding: 5px 5px 5px 10px;">
            <%this.DisplayHtmlStringPaging();%>
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
       