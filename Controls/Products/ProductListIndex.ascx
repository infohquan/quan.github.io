<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ProductListIndex.ascx.cs" Inherits="Controls_Products_ProductListIndex" %>

<%if (f == true) {%>
<script type="text/javascript" language="javascript">
    $(document).ready(function() {
        $('#product-list').cycle({
            fx: 'fade',
            speed: 5000
        });
    });
</script>
<div class="page-services page-products">
    <div class="top"><h3><span id="lblSubject" runat="server">Sản phẩm nổi bật</span></h3></div>
    <div id="product-list" class="content">
        <%this.LoadCycleProduct();%>   
    </div>
</div>
<div class="clear"></div>
<%} %>
