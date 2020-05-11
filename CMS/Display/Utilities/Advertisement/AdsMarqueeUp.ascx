<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AdsMarqueeUp.ascx.cs" Inherits="CMS_Display_Utilities_Advertisement_AdsMarqueeUp" %>
<%@ Register Src="~/CMS/Display/Utilities/Advertisement/AdsHref.ascx" TagName="AdsHref" TagPrefix="web" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=Subject%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" runat="server">
            <marquee height="180" scrollamount="2" scrolldelay="100" onmouseout="this.start();" onmouseover="this.stop();" direction="up" behavior="scroll">
                <web:AdsHref ID="AdsHref" runat="server" IsAgentCat="true" ImageWidth="200" ImageHeight="70" />
            </marquee>
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