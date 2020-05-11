<%@ Control Language="C#" AutoEventWireup="true" CodeFile="VerticalArticleMenu.ascx.cs" Inherits="CMS_Display_Templates_Articles_UtilControls_VMenu_VerticalArticleMenu" %>

<div class="vbox servicebox ServiceVMenu">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"></div>
            </div>
        </div>

    </div>
    <div class="vbox-middle">
        <div id="divContent" style="padding-top:5px;" runat="server">
            <!--<a href="#">Thiết kế website</a>
            <a href="#">Chăm sóc website</a>
            <a href="#">Lưu trữ website</a>
            <a href="#">Tên miền</a>
            <a href="#">Quảng bá website</a>
            <a href="#">Email doanh nghiệp</a>
            <a href="#">Thiết kế đồ họa</a>-->
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
<script type="text/javascript">
    ddsmoothmenu.init({
        mainmenuid: "smoothmenu_vert", //Menu DIV id
        orientation: 'v', //Horizontal or vertical menu: Set to "h" or "v"
        classname: 'ddsmoothmenu-v', //class added to menu's outer DIV
        //customtheme: ["#804000", "#482400"],
        contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
    })
</script>
