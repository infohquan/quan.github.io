<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HorizontalStandardImage.ascx.cs" Inherits="CMS_Display_Utilities_Menu_HorizontalStandard_HorizontalStandardImage" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<script type="text/javascript">
    ddsmoothmenu.init({
	    mainmenuid: "horizontal", //menu DIV id
	    orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	    classname: 'ddsmoothmenu', //class added to menu's outer DIV
	    //customtheme: ["#1c5a80", "#18374a"],
	    contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
    })
</script>
<!--Override vài style-->
<style type="text/css">
    .ddsmoothmenu { background:none; display:inline-block; padding: 2px 0 0 170px; width:auto; }
    .ddsmoothmenu ul li a { display: block; background:none; padding:0px; padding-right:20px; border-right:none; text-decoration: none; }
    .ddsmoothmenu ul li a:hover { background:#fc9753; }
    .ddsmoothmenu ul li a.home { background:url(images/mnu_home.png) no-repeat transparent; width:104px; height:35px; }
    .ddsmoothmenu ul li a.about { background:url(images/mnu_aboutus.png) no-repeat; width:104px; height:35px; }
    .ddsmoothmenu ul li a.news { background:url(images/mnu_news.png) no-repeat; width:104px; height:35px; }
    .ddsmoothmenu ul li a.product { background:url(images/mnu_product.png) no-repeat; width:104px; height:35px; }
    .ddsmoothmenu ul li a.service { background:url(images/mnu_service.png) no-repeat; width:104px; height:35px; }
    .ddsmoothmenu ul li a.contact { background:url(images/mnu_contact.png) no-repeat; width:104px; height:35px; }
</style>

<div id="horizontal" class="ddsmoothmenu">
    <ul>
         <li><a class="home" href="Default.aspx?Lang=<%=Globals.GetLang()%>"></a></li>             
         <li>
            <a class="about" href="AboutUs.aspx?Lang=<%=Globals.GetLang()%>"></a>
            <ul><%LoadAboutUsMenu();%></ul>
         </li>
         <li>
            <a class="article" href="ArticleList.aspx?t=news&Lang=<%=Globals.GetLang()%>"></a>
            <ul><%LoadArticleCategoryMenu("news");%></ul>
         </li>
         <li>
            <a class="product" href="ProductList.aspx?Lang=<%=Globals.GetLang()%>"></a>
            <ul><%LoadProductCatalogMenu();%></ul>
         </li>
         <li>
            <a class="service" href="ArticleList.aspx?t=service&Lang=<%=Globals.GetLang()%>"></a>
            <ul><%LoadArticlesMenu("service");%></ul>
         </li>
         <li>
            <a class="contact" href="Contact.aspx?t=CustomerIdea&Lang=<%=Globals.GetLang()%>"></a>
         </li>
    </ul>
</div>
<div class="clear"></div>
