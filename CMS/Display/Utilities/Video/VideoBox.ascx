<%@ Control Language="C#" AutoEventWireup="true" CodeFile="VideoBox.ascx.cs" Inherits="CMS_Display_Utilities_Video_VideoBox" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>" style="border:solid 1px #ECE4B0">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><b style="font-weight:bold"><%=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "Video")%></b></div>
            </div>
        </div>
    </div>
       <div class="vbox-middle">
        <!--<div id="divContent" runat="server"></div>-->
        <DIV style="width:160px; text-align: center;"><embed type="application/x-shockwave-flash" wmode="transparent" src="http://w882.photobucket.com/pbwidget.swf?pbwurl=http%3A%2F%2Fw882.photobucket.com%2Falbums%2Fac25%2Fhongquan8x%2Fquan%2F9b1ec4d6.pbw" height="70" width="495"><a href="http://photobucket.com/slideshows" target="_blank"><style="float:left;border-width: 0;" ></a><a href="http://s882.photobucket.com/albums/ac25/hongquan8x/quan/?action=view&amp;current=9b1ec4d6.pbw" target="_blank"><style="float:left;border-width: 0;" ></a></DIV></center>

<object width="160" height="150"><param name="movie" value="http://www.nhaccuatui.com/l/jNgfhRY25ZZf" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="flashvars" value="&autostart=true" /><embed src="http://www.nhaccuatui.com/l/jNgfhRY25ZZf" quality="high" wmode="transparent" type="application/x-shockwave-flash" flashvars="&autostart=true" width="495" height="150"></embed></object>


    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>