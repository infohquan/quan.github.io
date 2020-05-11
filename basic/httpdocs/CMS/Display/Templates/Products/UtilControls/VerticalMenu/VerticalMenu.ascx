<%@ Control Language="C#" AutoEventWireup="true" CodeFile="VerticalMenu.ascx.cs" Inherits="CMS_Display_Templates_Products_UtilControls_VerticalMenu_VerticalMenu" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
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
<style type="text/css">
    .ProductCatalog ul li a { background:url(images/vmenu.png) no-repeat; width:170px; height:26px; color:#219116; line-height:26px; }
    .ProductCatalog h3 { display:block; font-size:12px; background:url(images/icon-home.png) 0 1px no-repeat; height:25px; margin:0px; }
</style>