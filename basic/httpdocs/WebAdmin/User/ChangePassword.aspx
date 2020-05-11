<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ChangePassword.aspx.cs" Inherits="WebAdmin_User_ChangePassword" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ChangePasswordContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Đổi mật khẩu</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Đổi mật khẩu</span></th>
			</tr>
			<tr>
				<td class="first" style="width:155px;"><strong>Mật khẩu cũ</strong></td>
				<td class="last"><input id="txtOldPassword" type="password" class="text" runat="server" />
				<asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtOldPassword"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator>
                    </td>
			</tr>			
			<tr class="bg">
				<td class="first"><strong>Mật khẩu mới</strong></td>
				<td class="last">
                    <input id="txtNewPassword" type="password" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txtNewPassword"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>			
			<tr>
				<td class="first"><strong>Nhập lại mật khẩu mới</strong></td>
				<td class="last"><input id="txtConfirmPassword" type="password" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtConfirmPassword"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator>
                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToCompare="txtNewPassword"
                        ControlToValidate="txtConfirmPassword" ErrorMessage="Hai ô mật khẩu mới không giống nhau!"
                        SetFocusOnError="True"></asp:CompareValidator></td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" /></td>
			</tr>
            <tr class="bg">
                <td class="first">
                </td>
                <td class="last">
                    <asp:Label ID="lblMessage" runat="server" BackColor="#FFFFC0" Font-Bold="True" Font-Size="15px"
                        ForeColor="Red" Text="Label" Visible="False"></asp:Label></td>
            </tr>
		</table>
  </div>
</div>
</asp:Content>

