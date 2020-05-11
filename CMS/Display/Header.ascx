<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Header.ascx.cs" Inherits="CMS_Display_Header" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Register Src="~/CMS/Display/Utilities/Menu/MenuVnExpress/MenuVnExpress.ascx" TagName="MenuVnExpress" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Menu/HorizontalStandard/HorizontalStandard.ascx" TagName="HorizontalStandard" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/FlashIndex/FlashIndex.ascx" TagName="FlashIndex" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Advertisement/AdsHref.ascx" TagName="AdsHref" TagPrefix="web" %>

<center>
<div>
<%--<web:GallerySlide ID="GallerySlide" runat="server" ControlCssClass="" IsAgentCat="true" ImageWidth="160" ImageHeight="180" />--%>
</div>


<div class="">

     <%-- <object width=1000" height="320">
            <param name="movie" value="images/banner.swf" />
            <embed src="images/banner.swf" width="1000" height="320" wmode="transparent" quality="high" bgcolor="#ffffff" type="application/x-shockwave-flash"></embed>
        </object>--%>
       
</div>
</center>



<div><web:HorizontalStandard ID="MenuHorizontalStandard" runat="server" /></div>



