<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Header.ascx.cs" Inherits="CMS_Display_Header" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Register Src="~/CMS/Display/Utilities/Menu/MenuVnExpress/MenuVnExpress.ascx" TagName="MenuVnExpress" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Menu/HorizontalStandard/HorizontalStandard.ascx" TagName="HorizontalStandard" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/FlashIndex/FlashIndex.ascx" TagName="FlashIndex" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Advertisement/AdsHref.ascx" TagName="AdsHref" TagPrefix="web" %>

<center>
<div class="">

        <%--<object width=1000" height="155">
            <param name="movie" value="images/banner1.swf" />
            <embed src="images/banner1.swf" width="1000" height="155" wmode="transparent" quality="high" bgcolor="#ffffff" type="application/x-shockwave-flash"></embed>
        </object>--%>

        
</div>
</center>
<img src="images/banner.png" width="1000" height="120" />
<div><web:HorizontalStandard ID="MenuHorizontalStandard" runat="server" /></div>




