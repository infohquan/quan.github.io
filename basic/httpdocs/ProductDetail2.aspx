<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ProductDetail2.aspx.cs" Inherits="ProductDetail2" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
<div class="center_content">
   	<div class="center_title_bar"><span id="lblProductName" runat="server"></span></div>
    
	<div class="prod_box_big">
    	<div class="top_prod_box_big"></div>
        <div class="center_prod_box_big">
            <div class="product_img_big" style="width:90%;">
                <img id="imgProduct" runat="server" alt="" style="width:400px; height:300px;" />
            </div>
            <div class="clear"></div>
            <div style="padding:5px;">
                <b>Giá bán: <span id="lblPrice" style="color:Red; font-size:12px;" runat="server"></span></b>
            </div>
            <div style="text-align:center; margin-left:220px">
                <a style="display:block; line-height:28px; font-size:14px; font-weight:bold; background-color:Orange; width:100px;" href="javascript:;" onclick="addToCartRidirect(<%=Globals.GetIntFromQueryString("ID")%>)">
                    <span id="lblTextAddCart" runat="server">Đặt hàng</span>
                </a>
            </div>
            <div class="clear"></div>
            <div class="box_content">
                <span id="lblThongTin1" style="display:block; padding:2px" runat="server"></span>
                <span id="lblThongTin2" style="display:block; padding:2px" runat="server"></span>
            </div>
            <div class="clear"></div>
            <div style="float:right;"><a title="Trở lại trang trước" href="javascript:history.back()"><img alt="back" src="images/icon_back.gif" style="vertical-align: middle" /><span id="lblTextBack" runat="server"></span></a>&nbsp;&nbsp;&nbsp;</div>
        </div>
        <div class="bottom_prod_box_big"></div>                                
    </div>
    
    <div class="center_title_bar"><span id="lblTextOther" runat="server">Sản phẩm khác</span></div>
    <%this.LoadTopOtherProducts();%>
</div>   
</asp:Content>

