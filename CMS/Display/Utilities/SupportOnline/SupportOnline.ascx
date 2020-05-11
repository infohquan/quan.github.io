<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SupportOnline.ascx.cs" Inherits="CMS_Display_Utilities_SupportOnline_SupportOnline" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3 style="display:none"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "SupportOnline")%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div class="yahoo-chat"></div>
        <div class="hotline-number"></div>
        <div class="clear"></div>
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