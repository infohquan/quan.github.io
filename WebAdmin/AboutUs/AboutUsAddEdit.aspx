<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="AboutUsAddEdit.aspx.cs" Inherits="WebAdmin_AboutUs_AboutUsAddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="AboutusAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Giới thiệu mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Giới thiệu mới</span></th>
			</tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server"></asp:DropDownList></td>
			</tr>
			<tr class="bg" style="display:none;">
				<td class="first"><strong>Tên &nbsp;Nhóm Giới thiệu</strong></td>
				<td class="last">
                    <input id="txtCategoryName" type="text" class="text" runat="server" />
                    (Sẽ xuất hiện trên Menu website mục About Us/ Giới thiệu)</td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Tiêu đề</strong></td>
				<td class="last"><input id="txtTitle" type="text" class="text" runat="server" style="width: 445px" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Nội dung chính</strong></td>
				<td class="last"><FCKeditorV2:FCKeditor ID="fckContent" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="540px"></FCKeditorV2:FCKeditor></td>
			</tr>
			<tr>
				<td class="first"><strong>Hình ảnh</strong></td>
				<td class="last">
				    <%if (Convert.ToString(Request.QueryString["Action"]) == "Edit") {%>
                    <img id="ImageAboutUs" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" /></td>
			</tr>
            <tr class="bg">
                <td class="first">
                    <strong>Mô tả cho hình ảnh</strong></td>
                <td class="last">
                    <input id="txtImageDesc" type="text" class="text" runat="server" /></td>
            </tr>
            <tr>
                <td class="first">
                    <strong>Tác giả</strong></td>
                <td class="last">
                    <input id="txtAuthor" type="text" class="text" runat="server" /></td>
            </tr>
			<tr class="bg">
				<td class="first"><strong>Từ khóa</strong></td>
				<td class="last"><textarea id="txtKeyword" rows="2" cols="20" style="width: 450px; height: 70px" runat="server"></textarea></td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" CausesValidation="False" OnClick="btnReset_Click" />
                </td>
			</tr>
		</table>

  </div>
</div>
</asp:Content>

