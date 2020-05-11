<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AboutUsBox.ascx.cs" Inherits="CMS_Display_Templates_Articles_Default_AboutUsBox" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="aboutbox">
    <div class="top"></div>
    <div class="middle">
        <div class="about-title-<%=Globals.GetLang()%>"></div>
        <span id="lblAbout" class="about-content" runat="server"></span>
        <a class="view-detail" href="AboutUs.aspx?Lang=<%=Globals.GetLang()%>"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "MoreDetail")%></a>
    </div>
    <div class="bottom"></div>
</div>