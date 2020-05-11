<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="UserAddEdit.aspx.cs" Inherits="WebAdmin_User_UserAddEdit" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="UserAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Người dùng mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm người dùng mới</span></th>
			</tr>
			<tr>
				<td class="first" style="width:155px;"><strong>Tên đăng nhập</strong></td>
				<td class="last"><input id="txtUsername" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtUsername"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator><asp:ImageButton
                            ID="ImgBtnCheck" runat="server" CausesValidation="False" ImageAlign="AbsMiddle"
                            ImageUrl="~/WebAdmin/images/USER.GIF" OnClick="ImgBtnCheck_Click" ToolTip="Kiểm tra Tên đăng nhập có hợp lệ không?" />
                    <asp:LinkButton ID="LinkIsUserExistent" runat="server" CausesValidation="False" Font-Bold="True"
                        Font-Underline="True" ForeColor="Blue" OnClick="LinkIsUserExistent_Click" ToolTip="Kiểm tra Tên đăng nhập có hợp lệ không?">Có hợp lệ?</asp:LinkButton>
                    <asp:Label ID="lblResult" runat="server" Font-Bold="true" ForeColor="Red" Text="Label"
                        Visible="False"></asp:Label></td>
			</tr>
			<%if (Globals.GetStringFromQueryString("Action") == "") {%>
			<tr class="bg">
				<td class="first"><strong>Mật khẩu</strong></td>
				<td class="last">
                    <input id="txtPassword" type="password" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txtPassword"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<%} %>
			<tr>
				<td class="first"><strong>Họ tên</strong></td>
				<td class="last"><input id="txtFullName" type="text" class="text" runat="server" />
                </td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Địa chỉ</strong></td>
				<td class="last"><input id="txtAddress" type="text" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Email</strong></td>
				<td class="last"><input id="txtEmail" type="text" class="text" runat="server" />
                </td>
			</tr>
            
			<tr class="bg">
				<td class="first"><strong>Điện thoại</strong></td>
				<td class="last" valign="middle">
                    <input id="txtTel" type="text" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Ngày sinh</strong></td>
				<td class="last">
                    <asp:DropDownList ID="ddlDay" runat="server">
                        <asp:ListItem Value="-1">--- Ng&#224;y ---</asp:ListItem>
                        <asp:ListItem>1</asp:ListItem>
                        <asp:ListItem>2</asp:ListItem>
                        <asp:ListItem>3</asp:ListItem>
                        <asp:ListItem>4</asp:ListItem>
                        <asp:ListItem>5</asp:ListItem>
                        <asp:ListItem>6</asp:ListItem>
                        <asp:ListItem>7</asp:ListItem>
                        <asp:ListItem>8</asp:ListItem>
                        <asp:ListItem>9</asp:ListItem>
                        <asp:ListItem>10</asp:ListItem>
                        <asp:ListItem>11</asp:ListItem>
                        <asp:ListItem>12</asp:ListItem>
                        <asp:ListItem>13</asp:ListItem>
                        <asp:ListItem>14</asp:ListItem>
                        <asp:ListItem>15</asp:ListItem>
                        <asp:ListItem>16</asp:ListItem>
                        <asp:ListItem>17</asp:ListItem>
                        <asp:ListItem>18</asp:ListItem>
                        <asp:ListItem>19</asp:ListItem>
                        <asp:ListItem>20</asp:ListItem>
                        <asp:ListItem>21</asp:ListItem>
                        <asp:ListItem>22</asp:ListItem>
                        <asp:ListItem>23</asp:ListItem>
                        <asp:ListItem>24</asp:ListItem>
                        <asp:ListItem>25</asp:ListItem>
                        <asp:ListItem>26</asp:ListItem>
                        <asp:ListItem>27</asp:ListItem>
                        <asp:ListItem>28</asp:ListItem>
                        <asp:ListItem>29</asp:ListItem>
                        <asp:ListItem>30</asp:ListItem>
                        <asp:ListItem>31</asp:ListItem>
                    </asp:DropDownList>
                    <asp:DropDownList ID="ddlMonth" runat="server">
                        <asp:ListItem Value="-1">--- Th&#225;ng ---</asp:ListItem>
                        <asp:ListItem>1</asp:ListItem>
                        <asp:ListItem>2</asp:ListItem>
                        <asp:ListItem>3</asp:ListItem>
                        <asp:ListItem>4</asp:ListItem>
                        <asp:ListItem>5</asp:ListItem>
                        <asp:ListItem>6</asp:ListItem>
                        <asp:ListItem>7</asp:ListItem>
                        <asp:ListItem>8</asp:ListItem>
                        <asp:ListItem>9</asp:ListItem>
                        <asp:ListItem>10</asp:ListItem>
                        <asp:ListItem>11</asp:ListItem>
                        <asp:ListItem>12</asp:ListItem>
                    </asp:DropDownList>
                    <input id="txtYear" type="text" class="text" runat="server" style="width: 79px" title="Nhập năm sinh (Ví dụ: 1985)" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Giới tính</strong></td>
				<td class="last">
                    <asp:RadioButtonList ID="rblGender" runat="server" RepeatDirection="Horizontal">
                        <asp:ListItem Selected="True" Value="1">Nam</asp:ListItem>
                        <asp:ListItem Value="2">Nữ</asp:ListItem>
                    </asp:RadioButtonList></td>
			</tr>
			<tr>
				<td class="first"><strong>Thông tin bổ sung</strong></td>
				<td class="last"><textarea id="txtInfo" rows="2" cols="20" style="width: 450px; height: 100px" runat="server"></textarea></td>
			</tr>
			<%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
            <tr class="bg">
                <td class="first">
                    <strong>Ngày tạo</strong></td>
                <td class="last"><input id="txtDateCreated" type="text" class="text" disabled="disabled" runat="server" /></td>
            </tr>
            <%} %>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CausesValidation="true" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" runat="server" Text="Lưu & Tiếp tục" CausesValidation="true" CssClass="button" OnClick="btnSaveContinue_Click" Width="120px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa người dùng" CssClass="button" OnClick="btnDelete_Click" Width="120px" CausesValidation="False" />
                    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
                </td>
			</tr>
		</table>
  </div>
</div>
</asp:Content>

