<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebLinks.ascx.cs" Inherits="CMS_Display_Utilities_Advertisement_WebLinks" %>
<%@ Import Namespace="Khavi.Provider" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<select name="select" onchange="window.open(this.options[this.selectedIndex].value,'_blank'); select.options[0].selected=true" size="1" class="select-links">
    <option value="http://www.cdg.vn" selected="selected"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "WebLinks")%></option>
    <%this.LoadWebLinks();%>
</select>