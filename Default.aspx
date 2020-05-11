

<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>
<%@ Register Src="~/CMS/Display/Utilities/FlashIndex/FlashIndex.ascx" TagName="FlashIndex" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Articles/UtilControls/Index/NewArticleBox.ascx" TagName="NewArticleBox" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Articles/UtilControls/Index/SlideArticle.ascx" TagName="SlideArticle" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Articles/UtilControls/TopArticles/MessageBoard.ascx" TagName="MessageBoardArticle" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Products/UtilControls/TopProducts/TopHotProductWithSearch.ascx" TagName="TopHotProductWithSearch" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Customer/CustomerHorizontalMarquee.ascx" TagName="CustomerHorizontalMarquee" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Others/WebPakage.ascx" TagName="WebPakage" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Video/VideoBox.ascx" TagName="VideoBox" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Articles/Default/AboutUsBox.ascx" TagName="AboutUsBox" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/SearchBox/SearchBox2.ascx" TagName="SearchBox2" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Utilities/Customer/CustomerHorizontalMarquee.ascx" TagName="Customer" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Articles/UtilControls/TopArticles/TopNewArticleNoImage.ascx" TagName="TopNewArticleNoImage" TagPrefix="web" %>
<%@ Register Src="~/CMS/Display/Templates/Articles/UtilControls/TopArticles/TopNewPromotionNoImage.ascx" TagName="TopNewPromotionNoImage" TagPrefix="web" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Register Src="~/CMS/Display/Utilities/Gallery/GallerySlide.ascx" TagName="GallerySlide" TagPrefix="web" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">




 
<center>

<%--<p style="text-align: center;"><img width="47" height="34" src="/Cache/Uploads/images.jpg" alt="" /><a href="/music/index.html" target="_blank"><span style="color: rgb(255, 0, 0);"><span style="font-size: medium;"><strong>My Music</strong></span></span></a><span style="font-size: medium;"><img width="38" height="38" src="/Cache/Uploads/calendar.png" alt="" /><a href="/calendar.html" target="_blank"><span style="color: rgb(51, 153, 102);"><span style="font-size: medium;"><strong>My Calendar</strong></span></span></a>             &nbsp; <img width="36" height="36" src="/Cache/Uploads/images(1).jpg" alt="" /><a href="Gallery.aspx?Lang=EN" target="_blank"><span style="color: rgb(255, 0, 255);"><span style="font-size: medium;"><strong> My Gallery</strong></span></span></a>             &nbsp;<img width="30" height="30" src="/Cache/Uploads/images(2).jpg" alt="" /><a href="ProductList.aspx?CatID=3988&amp;Lang=EN" target="_blank"><span style="color: rgb(51, 102, 255);"><span style="font-size: medium;"><strong> My Videos</strong></span></span></a></p>
<p style="text-align: center;"><img width="31" height="31" alt="" src="/Cache/Uploads/video_television.png" /><span style="font-size: medium;"><strong> </strong></span><strong><a target="_parent" href="http://hongquan.bsm.vn/ArticleDetail.aspx?ID=8815&amp;CatID=0&amp;Lang=EN"><span style="font-size: medium;"><span style="color: rgb(255, 0, 0);">Tivi Online</span></span></a><span style="font-size: medium;"> <img width="33" height="33" alt="" src="/Cache/Uploads/multimedia_player.png" /> </span><a target="_parent" href="http://hongquan.bsm.vn/ArticleDetail.aspx?ID=8814&amp;CatID=0&amp;Lang=EN"><span style="font-size: medium;"><span style="color: rgb(51, 153, 102);">Karaoke&nbsp;&nbsp; </span></span></a></strong><span style="font-size: medium;"><strong><img width="39" height="28" alt="" src="/Cache/Uploads/images(5).jpg" /></strong></span><span style="color: rgb(0, 0, 255);"><strong><a target="_parent" href="http://hongquan.bsm.vn/ProductDetail.aspx?ID=13321&CatID=4180&Lang=EN"><span style="font-size: medium;">English online</span></a></strong></span><span style="font-size: medium;"><strong> <img width="27" height="27" alt="" src="/Cache/Uploads/adobe_photoshop.png" /></strong></span><strong><a target="_parent" href="http://hongquan.bsm.vn/ProductDetail.aspx?ID=13353&CatID=4187&Lang=EN"><span style="font-size: medium;"><span style="color: rgb(255, 0, 255);">Photoshop <br />
</span></span></a></strong></p>--%>



</center>



<div class="clear"></div>
   
<table width="620" cellspacing="0" cellpadding="0" border="0">
    <tbody>
        <tr>
            <td>
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing"><span style="color: rgb(255, 0, 0);"><b style="mso-bidi-font-weight:
            normal"><span style="font-size: 18pt; font-family: &quot;Arial Narrow&quot;,&quot;sans-serif&quot;;">Good   Day!</span></b></span></p>
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing"><b style="mso-bidi-font-weight:normal"><span style="font-family:&quot;Arial Narrow&quot;,&quot;sans-serif&quot;;
            mso-fareast-font-family:Dotum;color:#0070C0">&nbsp;</span></b></p>
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing">&nbsp;</p>
            <span style="font-size: medium;">
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing"><b style="mso-bidi-font-weight:normal"><span style="font-family: &quot;Arial Narrow&quot;,&quot;sans-serif&quot;; color: rgb(0, 112, 192);">Thank you for visiting my   website! </span></b></p>
            </span>
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing">&nbsp;</p>
            <span style="font-size: medium;">
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing"><b style="mso-bidi-font-weight:normal"><span style="font-family: &quot;Arial Narrow&quot;,&quot;sans-serif&quot;; color: rgb(0, 112, 192);">I hope this will be a good site   for you to find more information. </span></b></p>
            </span>
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing"><span style="font-size: medium;"><b style="mso-bidi-font-weight:normal"><span style="font-family: &quot;Arial Narrow&quot;,&quot;sans-serif&quot;; color: rgb(0, 112, 192);">Just contact me or leave your   messages in my site if you want.</span></b></span></p>
            <p style="margin:0in;margin-bottom:.0001pt" class="MsoNoSpacing">&nbsp;</p>
            <p><span style="font-size: medium;">             </span></p>
            
	<table width="412" height="155" cellspacing="0" cellpadding="0" border="0">
    <tbody>
        <tr>
            <td><span style="color: rgb(51, 102, 255);"><strong><span style="font-size: medium;">Graduation Day:</span></strong></span></td>
            <td><iframe width="210" height="48" frameborder="0" src="http://free.timeanddate.com/countdown/i3ko9tcc/n145/cf12/cm0/cu5/ct0/cs1/ca0/co0/cr0/ss0/cac009/cpcf00/pct/tcfff/fn2/fs100/szw576/szh243/iso2013-04-08T06:30:50"></iframe> </td>
        </tr>
        <tr>
            <td><strong><span style="color: rgb(51, 102, 255);"><span style="font-size: medium;">Flying to Manila:</span></span></strong></td>
            <td><iframe width="210" height="48" frameborder="0" src="http://free.timeanddate.com/countdown/i3ko9tcc/n145/cf12/cm0/cu5/ct0/cs1/ca0/co0/cr0/ss0/cac009/cpcf00/pct/tcfff/fn2/fs100/szw576/szh243/iso2013-05-12T14:25:50"></iframe> </td>
        </tr>
        <tr>
            <td><span style="color: rgb(51, 102, 255);"><strong><span style="font-size: medium;">Good Bye Philippines:</span></strong></span></td>
            <td><iframe width="210" height="48" frameborder="0" src="http://free.timeanddate.com/countdown/i3ko9tcc/n145/cf12/cm0/cu5/ct0/cs1/ca0/co0/cr0/ss0/cac009/cpcf00/pct/tcfff/fn2/fs100/szw576/szh243/iso2013-05-18T12:51:50"></iframe> </td>
        </tr>
    </tbody>
</table>
            </td>
            <td>
            <p>&nbsp;</p>
            <p><img height="231" width="200" src="/Cache/Uploads/q.jpg" alt="" /></p>
            </td>
        </tr>
    </tbody>
</table>
<marquee scrollamount=3 direction=left scrolldelay=60 onmouseover='this.stop()' onmouseout='this.start()'><B>I know the past isn’t the past with you, it’s just an empty wave , it’ll dry when the sun shines. And I know I am just a long wave to you too, it’ll evaporate and fly away in your heart when another man come and replace me and warm you…Sunshine is still bright in the morning often and the afternoon is nice in blue sunset… but there’s  something different … and I know …. I lost you already , It’s truth, isn’t it ? What can I do as the days pass by, the sun still rises, birds still sing,the wind still blows, the clouds still drift but I already lost you in my life. You don’t belong to me now, just in my dream you belong to another, even in the morning you don’t get up with me. Beside you, he share many things. What can I do when the love I gave is still there, as if you never hurt me. What can I do when I still miss you so much . What can I do … ? What must I do ..? I can’t pull myself back to the old times, and I hope he can’t lose you like me, because he loves you so much, so when he loses you he’ll be like me. It’s lonely in the windy season, and shivering in the coming winter, he’ll be very sad when you’re not there to warm him, he’ll weep missing you … How can I do that ? With you I am not the present but I hope you miss me .. Remember me as a memory, where you and me sit side by side. Where there are tears, I cry because of happiness unnamed. The place we live together and now it became a memory .. the past to insipid unnamed.. However I’ll still loving you, love you in the dreamland and this life, love you the same me unknow you before… I trully lost you, didn’t  I ?....                  (Copyright by Hong Quan) </B></marquee>

<web:TopNewArticleNoImage Visible="true" ID="TopNewArticleNoImage" runat="server" ControlCssClass="hot-news-box" IsAgentCat="true" ContentType="news" nTop="12" Subject="HOT NEWS" />

<%--<web:CustomerHorizontalMarquee ID="CustomerHorizontalMarquee" runat="server" ControlCssClass="redBox" IsAgentCat="true" ImageWidth="-1" ImageHeight="150" /> --%>




</asp:Content>

