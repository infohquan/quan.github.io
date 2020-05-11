<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MenuVnExpress.ascx.cs" Inherits="CMS_Display_Utilities_Menu_MenuVnExpress_MenuVnExpress" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<link rel="stylesheet" href="<%=Globals.ApplicationPath%>CMS/Display/Utilities/Menu/MenuVnExpress/menuvnexpress.css" type="text/css" />
<script type="text/javascript" language="javascript" src="<%=Globals.ApplicationPath%>CMS/Display/Utilities/Menu/MenuVnExpress/Library.js"></script>
<script type="text/javascript" language="javascript" src="<%=Globals.ApplicationPath%>CMS/Display/Utilities/Menu/MenuVnExpress/DynamicArrMenuJs.aspx"></script>
<script type="text/javascript" language="javascript" src="<%=Globals.ApplicationPath%>CMS/Display/Utilities/Menu/MenuVnExpress/Menu.js"></script>
<script type="text/javascript" language="javaScript">
	var PAGE_SITE=0;
	var PAGE_FOLDER=1;	
	var PAGE_ID=1;	
	var DOMESTIC_IP=1;	
	setTypingMode(1);			
</script>

<div id="topmenu">                
			<div class="parent-menu" id="parent-menu"></div>

			<div class="sub-menu">
				<!--<div class="fl"><img src="http://demo.minhloi.net/vnexpressmenu/vnexpress_files/site2.gif" alt=""></div>
				<div class="drss fl"><a class="link-rss" href="http://vnexpress_files.net/GL/RSS/">RSS <img class="img-rss" alt="" src="http://demo.minhloi.net/vnexpressmenu/vnexpress_files/rss.gif"></a></div>-->
				<div class="smenu-content fl" id="submenu" onmouseover="clear_delayhide();activeMenuParent();" onmouseout="resetit();">&nbsp;</div>
				<!--<div class="fl"><img src="http://demo.minhloi.net/vnexpressmenu/vnexpress_files/sep-search.gif" alt=""></div>
				<div class="search fr" id="mn-search">
					<script type="text/javascript" language="javascript">ShowSearch();</script>                   
				</div>-->
			</div>

		</div>		
        
    	<script type="text/javascript" language="javascript">
		    menuobj=document.getElementById? document.getElementById("submenu") : document.all? document.all.submenu : document.layers? document.dep1.document.dep2 : ""
		    Active(); writeParentMenu(); reWriteMenu();
		</script>
