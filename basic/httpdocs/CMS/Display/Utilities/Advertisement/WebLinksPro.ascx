<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebLinksPro.ascx.cs" Inherits="CMS_Display_Utilities_Advertisement_WebLinksPro" %>
<%@ Register Src="~/CMS/Display/Utilities/Advertisement/WebLinks.ascx" TagName="WebLinks" TagPrefix="web" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>" style="margin-top:5px">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div id="divContent" style="padding:8px" runat="server">
            <web:WebLinks ID="WebLinks" runat="server" />
            <div class="title"></div>
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
