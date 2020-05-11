<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CatalogMenu.ascx.cs" Inherits="CMS_Display_Templates_Products_UtilControls_VerticalMenu_CatalogMenu" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<link type="text/css" rel="Stylesheet" href="Styles/menuverticalsmooth.css" />
<link type="text/css" rel="Stylesheet" href="Styles/productcatalogmenu.css" />
<div class="vbox <%=ControlCssClass%> <%=this.ID%>" style="border:solid 1px #ECE4B0">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Product")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    ddsmoothmenu.init({
        mainmenuid: "smoothmenu_vert", //Menu DIV id
        orientation: 'v', //Horizontal or vertical menu: Set to "h" or "v"
        classname: 'ddsmoothmenu-v', //class added to menu's outer DIV
        //customtheme: ["#804000", "#482400"],
        contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
    })
</script>
