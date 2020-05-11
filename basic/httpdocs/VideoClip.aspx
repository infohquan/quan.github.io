<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="VideoClip.aspx.cs" Inherits="VideoClip" Title="Video Clips" %>
<%@ Register Assembly="WebVideo" Namespace="WebVideo" TagPrefix="cc" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Web.UIHelper" %>

<asp:Content ID="VideoClipPage" ContentPlaceHolderID="MainContent" Runat="Server">
    <div class="box hotnews">
        <div class="top"><strong><span>Video Clip</span><span id="lblTitle" runat="server"></span></strong></div>
        <div class="middle">
            <table cellpadding="3px" cellspacing="3px" style="width:80%; text-align:center" align="center">
                <tr>
                    <td>                            
                        <%
                            try
                            {
                            if (FileExt.ToLower() == "wmv") {%>
                                <cc:WVC ID="MyVideo" BackColor="Black" BorderStyle="Ridge" Height="344px" ShowControls="False" ShowPositionControls="False" ShowStatusBar="False" ShowTracker="False" Width="425px" runat="server" />
                            <%} else if (FileExt.ToLower() == "swf") {%>
                                <%this.LoadSWFVideo();%>
                            <%} else if (FileExt.ToLower() == "flv") { %>
                                <%this.LoadFLVVideo();%>
                            <%} 
                            }
                            catch{}
                            %>
                    </td>
                </tr>
            </table>
            <div style="padding-left:50px; font-weight:bold; color:Red;"><asp:Label ID="lblResult" runat="server" Text="AA" Visible="false"></asp:Label></div>
        </div>
        <div class="bottom"></div>
    </div>
    
    <div class="box hotnews">
        <div class="top"><strong><span>Các video clip khác</span></strong></div>
        <div class="middle">
            <div style="padding-left:8px;">
                <%this.LoadVideoList();%>
            </div>
            <div class="clear"></div>
            <div style="padding-left:12px;">
                <%Response.Write(Paging.GetHtmlPaging(Context.Request.RawUrl, PageCount));%>
            </div>           
        </div>
        <div class="bottom"></div>
    </div>    
</asp:Content>

