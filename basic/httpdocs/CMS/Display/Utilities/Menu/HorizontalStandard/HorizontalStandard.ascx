<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HorizontalStandard.ascx.cs" Inherits="CMS_Display_Utilities_Menu_HorizontalStandard_HorizontalStandard" %>
<%@ Register Src="~/CMS/Display/Utilities/SearchBox/SearchBox2.ascx" TagName="SearchBox2" TagPrefix="web" %>
<%@ Import Namespace="Khavi.Provider" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<!--Menu Top:Start-->
<script type="text/javascript">
    ddsmoothmenu.init({
        mainmenuid: "horizontal", //menu DIV id
        orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
        classname: 'ddsmoothmenu', //class added to menu's outer DIV
        //customtheme: ["#1c5a80", "#18374a"],
        contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
    })
</script>

<div class="menutop">
    <div class="menutop-left">
        <div class="menutop-right">
            <div class="menutop-center">
                <div id="horizontal" class="ddsmoothmenu">
                    <ul>
                        <li><a id="top-menu-home" href="Default.aspx?Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Homepage")%></a></li>             
                        <li>
                            <a id="top-menu-about" href="AboutUs.aspx?t=about&Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "AboutUs")%></a>
                            <ul><%LoadAboutUsMenu();%></ul>
                        </li>
                       
                        
                        <li>
                           <a id="top-menu-service" href="ArticleList.aspx?t=service&Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Partner")%></a>
                           <ul><%LoadArticleCategoryMenu("service");%></ul>
                        </li>
                         <li>
                           <a id="top-menu-news" href="ArticleList.aspx?t=news&Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "News")%></a>
                           <ul><%LoadArticleCategoryMenu("news");%></ul>
                        </li>
                         <li>
                           <a id="top-menu-promotion" href="ArticleList.aspx?t=promotion&Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Promotion")%></a>
                        </li>
			<li>
                           <a id="top-menu-product" href="Gallery.aspx?Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Sitemap")%></a>
                          
                        </li>
                         <li>
                           <a id="top-menu-CustomerIdea" href="Contact.aspx?t=CustomerIdea&Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Contact")%></a>
                        </li>
                        
                        <div style="float:right">
                        <asp:TextBox ID="txtSearch" runat="server" CssClass="text-search" Text="Search..."></asp:TextBox>
                        <asp:Button ID="Button1" runat="server" Text="Tìm" onclick="Button1_Click" />
                        </div>
                     
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clear"></div>
<!--MenuTop:End-->
<script type="text/javascript">
    khaviActiveMenuTop();
</script>