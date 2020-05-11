﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TopHotProductWithSearch.ascx.cs" Inherits="CMS_Display_Templates_Products_UtilControls_TopProducts_TopHotProductWithSearch" %>
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
                <div class="vbox-top-center"><h3><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "TopHotProduct")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
    
        <div class="search-box" style="display:none">
            <input id="text-search-product" class="text-search" type="text" />
            <a class="button-search" href="javascript:;" onclick="searchProductByText()"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "Search")%></a>
        </div>
        <div id="divContent" runat="server">            
            
            <!--<div class="product-item">
                <a href="#" class="product-name">Tên sản phẩm</a>
                <a href="#" class="product-image">
                    <img src="images/imgproduct.png" width="138" height="100" />
                </a>
               
            </div>-->
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

