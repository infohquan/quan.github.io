<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AboutUsDetail.ascx.cs" Inherits="CMS_Display_Templates_Articles_Default_AboutUsDetail" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "AboutUs")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div class="about-title"></div>
        <div id="divContent" style="padding-top:8px;" runat="server">
            <div class="div-detail-image" id="div_img_article" runat="server">
                <img id="img" runat="server" />
            </div>
            <div class="div-detail-sumary">
                <div class="div-detail-title"><span id="lblTitle" runat="server"></span></div>
                <div class="div-detail-postdate"><span id="lblPostDate" runat="server"></span></div>
            </div>
            <div class="clear"></div>
            <div class="div-detail-content">
                <span id="lblContent" runat="server"></span>
                <div class="div-detail-authors"><span id="lblAuthors" runat="server"></span></div>
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

<%this.LoadOtherList();%>
