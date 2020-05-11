<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShoppingCartBox.ascx.cs" Inherits="Controls_Products_ShoppingCartBox" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<div class="shopping_cart">
    <div class="cart_title"><a href="Cart.aspx?Lang=<%=Globals.GetLang()%>"><%=langXml.GetString("Web", "Header", "MyCart")%></a></div>
    <%if (isEmptyCart == false) {%>
    <div class="cart_details">
    <%=langXml.GetString("Web", "DisplayProduct", "Quantity")%> <span id="lblQuantity" style="color:Red" runat="server"></span><br />
    <span class="border_cart"></span>
    <%=langXml.GetString("Web", "DisplayProduct", "Total")%> <span id="lblTotalMoney" runat="server" class="price"></span>
    </div>                    
    <div class="cart_icon"><a href="Cart.aspx?Lang=<%=Globals.GetLang()%>" title="Xem giỏ hàng"><img src="images/shoppingcart.png" alt="" title="" width="48" height="48" border="0" /></a></div>
    <div style="padding:3px;"><a href="CheckOut.aspx?Lang=<%=Globals.GetLang()%>"><%=langXml.GetString("Web", "DisplayProduct", "Payment")%></a></div>
    <%} else { %>
        <div><%=langXml.GetString("Web", "DisplayProduct", "EmptyCart")%></div>
    <%} %>
</div>
