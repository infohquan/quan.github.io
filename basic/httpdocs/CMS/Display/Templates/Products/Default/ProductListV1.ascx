<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ProductListV1.ascx.cs" Inherits="CMS_Display_Templates_Products_Default_ProductListV1" %>
<!--ProductListV1: Danh sách sản phẩm, theo thứ tự từ trên xuống: tên SP, hình SP, thông tin SP -->
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
                <div class="vbox-top-center"><h3><asp:Label ID="lblSubject" runat="server"></asp:Label></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server"></div>
        <div class="clear"></div>
        <div id="divPaging" runat="server" style="padding-left:10px;"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
