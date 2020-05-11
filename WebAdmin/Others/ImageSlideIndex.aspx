<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ImageSlideIndex.aspx.cs" Inherits="WebAdmin_Others_ImageSlideIndex" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ImageSlideIndexContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b>Thêm hình ảnh slide ở Trang chủ</b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2">Thêm hình ảnh slide ở Trang chủ (kích thước: 545 x 300 pixel)</th>
			</tr>
			<tr>
				<td class="first" rowspan="5"><strong>Chọn hình ảnh</strong></td>
				<td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage0" runat="server" />
				</td>
			</tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage1" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage2" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage3" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage4" runat="server" />
                </td>
            </tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />&nbsp;
                </td>
			</tr>
            <tr>
                <td class="first">
                </td>
                <td class="last">
                    <asp:Label ID="lblMessage" runat="server" BackColor="#FFFFC0" Font-Bold="True" Font-Size="15px"
                        ForeColor="Red" Text="Label" Visible="False"></asp:Label></td>
            </tr>
		</table>
    </div>
    
    <div class="clearthis"></div>
    <div class="top-bar">
		<h1><b>Danh sách ảnh slide ở Trang chủ</b></h1>
	</div>
	<div class="clearthis"></div>
    <div style="text-align:center;">
		<asp:DataList ID="DataListImage" Width="100%" RepeatColumns="5" runat="server">
            <ItemTemplate>
                <asp:Label ID="lblImageID" Text='<%# Eval("ImageID")%>' Visible="false" runat="server"></asp:Label>
                <img id="imgThumbnail" onclick="javascript:ViewImage('imgLarg','<%=Globals.GetUploadsUrl()%>ImageFiles/ImageSlideIndexs/<%# Eval("ImageUrl")%>')" style="width:120px; height:120px; cursor:pointer;" alt="" src="<%=Globals.GetUploadsUrl()%>ImageFiles/ImageSlideIndexs/<%# Eval("ImageUrl")%>" />
                <div style="text-align:center; margin-top:6px;"> 
                    <a href="javascript:ViewImage('imgLarg','<%=Globals.GetUploadsUrl()%>ImageFiles/ImageSlideIndexs/<%# Eval("ImageUrl")%>')" class="linkview">Xem</a>&nbsp;&nbsp;&nbsp;
                    <a href="ImageSlideIndex.aspx?Action=DeleteImage&ImageID=<%# Eval("ImageID")%>&ImageUrl=<%# Eval("ImageUrl")%>" class="linkdelete">Xóa</a>
                </div>
            </ItemTemplate>
        </asp:DataList>
	</div>
	<div class="clearthis"></div>
	<div style="text-align:center; margin-top:10px;">
	    <img id="imgLarg" style="display:none;" alt="" src="" />
	</div>
</div>
</asp:Content>

