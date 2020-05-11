<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Footer.ascx.cs" Inherits="CMS_Display_Footer" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>
<%@ Register Src="~/CMS/Display/Utilities/Advertisement/WebLinks.ascx" TagName="WebLinks" TagPrefix="web" %>

<div class="page-footer">

    <span class="address" id="lblFooterInfo" runat="server"></span>
     <%--<a class="link-poweredby" target="_blank" href="http://cdg.vn"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "PoweredBy2")%><span class="cdgvn">CDG</span></a>--%>

</div>
