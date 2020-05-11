<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ProductDetail.ascx.cs" Inherits="CMS_Display_Templates_Products_Default_ProductDetail" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "DisplayProduct", "ProductDetail")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle" runat="server" id="divMid">
        <div class="product-detail-title"><span id="lblProductName" runat="server">Tiêu đề bài viết</span></div>
        <div class="product-detail-sidebar" id="productDetailSidebar" runat="server">
            <img id="img" runat="server" />
        </div>
        <div class="product-detail-sidepanel" id="productDetailSidepanel" runat="server">
            <span style="color:White; font-weight:bold"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "DisplayProduct", "Price")%></span>
            <span id="lblPrice" style="color:Red; font-size:13px;" runat="server"></span>
            <span class="clear"></span>
            <!--<a href="Cart.aspx?Action=Add&ProductID=<%=Globals.GetIntFromQueryString("ID")%>&Lang=<%=Globals.GetLang()%>" style="display:block; font-weight:bold; padding:4px 0; color:Blue;"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "DisplayProduct", "AddToCart")%></a>-->
        </div>
        <div class="clear"></div>
        <div class="div-detail-content">
            <span id="lblThongTin1" style="display:block; padding:2px" runat="server"></span>
            <span id="lblThongTin2" style="display:block; padding:2px" runat="server"></span>
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

<%//this.LoadOtherList();%>


<p><span style="font-size: medium;"><span style="color: rgb(255, 0, 0);">Be friends of Hong Quan, Like me !</span></span></p>
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
                           <div id='shareThisShareEgg' class='shareEgg'></div>
<script type='text/javascript'>stlib.shareEgg.createEgg('shareThisShareEgg', ['sharethis','facebook','twitter','blogger','googleplus','email'], {title:'ShareThis Rocks!!!',url:'http://www.sharethis.com',theme:'shareegg'});</script>

         
                        </td>
                        <td style="width:15%" valign="top"><a class="printview" target="_blank" title="Xem bản in của bài viết" href="<%=Globals.ApplicationPath%>PrintView.aspx?ID=<%=Globals.GetIntFromQueryString("ID")%>&CatID=<%=Globals.GetIntFromQueryString("CatID")%>&Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "PrintView")%></a>&nbsp;&nbsp;&nbsp;</td>
                        <td style="width:15%" valign="top"><a class="goback" title="Trở lại trang trước" href="javascript:history.back()"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "Back")%></a>&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                </table>
            </div>


