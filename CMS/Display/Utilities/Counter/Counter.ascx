<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Counter.ascx.cs" Inherits="CMS_Display_Utilities_Counter_Counter" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><%//=LanguageXML.GetValue(Globals.GetLang(), "Web", "Text", "Statistics")%></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div style="float:left; width:55px; background:url(images/icon-counter.png) no-repeat; height:52px;">
            
        </div>
        <div id="divContent" style="float:left; width:120px;" runat="server"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
