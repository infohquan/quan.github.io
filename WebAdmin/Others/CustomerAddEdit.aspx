<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="CustomerAddEdit.aspx.cs" Inherits="WebAdmin_Others_CustomerAddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="CustomerAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Khách hàng mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Khách hàng mới</span></th>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Tên khách hàng</strong></td>
				<td class="last"><input id="txtCustomerFullName" type="text" class="text" runat="server" style="width: 445px" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtCustomerFullName"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Địa chỉ</strong></td>
				<td class="last"><input id="txtAddress" type="text" class="text" runat="server" style="width: 445px" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtAddress"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Điện thoại</strong></td>
				<td class="last"><input id="txtTel" type="text" class="text" runat="server" style="width: 445px" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Di động</strong></td>
				<td class="last"><input id="txtMobile" type="text" class="text" runat="server" style="width: 445px" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Email</strong></td>
				<td class="last"><input id="txtEmail" type="text" class="text" runat="server" style="width: 445px" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Website</strong></td>
				<td class="last"><input id="txtWebsite" type="text" class="text" runat="server" style="width: 445px" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Fax</strong></td>
				<td class="last"><input id="txtFax" type="text" class="text" runat="server" style="width: 445px" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Giới thiệu về khách hàng</strong></td>
				<td class="last"><FCKeditorV2:FCKeditor ID="fckContent" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="540px"></FCKeditorV2:FCKeditor></td>
			</tr>
			<tr>
				<td class="first"><strong>Hình ảnh logo</strong></td>
				<td class="last">
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <img id="imgCustomer" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" /></td>
			</tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" runat="server" Text="Lưu & Tiếp tục" CssClass="button" OnClick="btnSaveContinue_Click" Width="110px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa Khách hàng" CssClass="button" OnClick="btnDelete_Click" Width="120px" CausesValidation="False" />
                    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
                </td>
			</tr>
		</table>

  </div>
</div>
</asp:Content>

