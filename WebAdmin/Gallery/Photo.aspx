<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Photo.aspx.cs" Inherits="WebAdmin_Gallery_Photo" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="PhotoContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Hình ảnh mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Hình ảnh mới</span></th>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Chọn Album</strong></td>
				<td class="last">
				    <asp:DropDownList ID="ddlAlbum" Width="210px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlAlbum_SelectedIndexChanged"></asp:DropDownList>
				    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlAlbum"
                        ErrorMessage="*" Operator="GreaterThan" SetFocusOnError="True" Type="Integer"
                        ValueToCompare="0"></asp:CompareValidator>
				</td>
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
			
			
			<tr class="bg">
				<td class="first"><strong>Tiêu đề</strong></td>
				<td class="last"><input id="txtTitle" type="text" class="text" runat="server" style="width: 445px" />
                    </td>
			</tr>
			<tr>
				<td class="first"><strong>Mô tả cho hình ảnh</strong></td>
				<td class="last"><textarea id="txtDescriptions" rows="2" cols="20" style="width: 450px; height: 100px" runat="server"></textarea>
                    </td>
			</tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
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
    <div style="text-align:center;">
		<asp:DataList ID="DataListPhoto" OnItemCommand="ProcessPhoto" RepeatColumns="5" runat="server">
            <ItemTemplate>
                <div style="padding-left:20px">
                    <asp:Label ID="lblPhotoID" Text='<%# Eval("ID")%>' Visible="false" runat="server"></asp:Label>
                    <img id="imgThumbnail" onclick="javascript:ViewImage('ctl00_MainContent_imgLarg','<%=Globals.GetUploadsUrl()%><%# Eval("PhotoUrl")%>')" style="width:120px; height:120px; cursor:pointer;" alt="" src="<%=Globals.GetUploadsUrl()%><%# Eval("PhotoUrl")%>" />
                    <div style="text-align:center; margin-top:6px;"> 
                        <a href="javascript:ViewImage('ctl00_MainContent_imgLarg','<%=Globals.GetUploadsUrl()%><%# Eval("PhotoUrl")%>')" class="linkview">Xem</a>&nbsp;&nbsp;&nbsp;
                        <asp:Button ID="btnDeleteImage" CommandName="DeleteImage" Text="Xóa" CausesValidation="false" runat="server" />
                    </div>
                </div>
            </ItemTemplate>
        </asp:DataList>
	</div>
	<div style="text-align:center; margin-top:10px;">
	    <img id="imgLarg" style="display:none;" alt="" src="" runat="server" />
	</div>
</div>
</asp:Content>

