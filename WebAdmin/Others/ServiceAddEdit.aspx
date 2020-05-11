<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ServiceAddEdit.aspx.cs" Inherits="WebAdmin_Others_ServiceAddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ServiceAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm dịch vụ mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm dịch vụ mới</span></th>
			</tr>
            <tr class="bg">
                <td class="first" style="width: 172px">
                    <strong>Ngôn ngữ</strong></td>
                <td class="last">
                    <asp:DropDownList ID="ddlLanguage" runat="server">
                    </asp:DropDownList></td>
            </tr>
			<tr class="bg">
				<td class="first" style="width:172px;"><strong>Tên dịch vụ</strong></td>
				<td class="last"><input id="txtServiceName" type="text" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Hình ảnh</strong></td>
				<td class="last">
				    <%if (Convert.ToString(Request.QueryString["Action"]) == "Edit") {%>
                    <img id="ImageService" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Nội dung</strong></td>
				<td class="last"><FCKeditorV2:FCKeditor ID="fckContent" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="540px"></FCKeditorV2:FCKeditor></td>
			</tr>
			<tr>
				<td class="first"><strong>Ngày thêm</strong></td>
				<td class="last"><input id="txtDateAdd" type="text" readonly="readonly" class="text" runat="server" /></td>
			</tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" runat="server" Text="Lưu & Tiếp tục" CssClass="button" OnClick="btnSaveContinue_Click" Width="110px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa dịch vụ" CssClass="button" OnClick="btnDelete_Click" Width="110px" CausesValidation="False" />
                    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
                </td>
			</tr>
		</table>
  </div>
</div>
</asp:Content>

