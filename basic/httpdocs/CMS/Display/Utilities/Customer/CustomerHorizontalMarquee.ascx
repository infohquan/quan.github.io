<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CustomerHorizontalMarquee.ascx.cs" Inherits="CMS_Display_Utilities_Customer_CustomerHorizontalMarquee" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><%//=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Customer")%></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" class="content" style="overflow:hidden; height:95px">
            <%LoadData();%>
            <!--<marquee scrollamount="4" onmouseout="this.start();" onmouseover="this.stop();" direction="left" behavior="scroll">
            </marquee>-->
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
