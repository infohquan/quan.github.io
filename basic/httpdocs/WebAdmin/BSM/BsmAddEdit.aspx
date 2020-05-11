<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="BsmAddEdit.aspx.cs" Inherits="WebAdmin_BSM_BsmAddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="fBsmAddEdit" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Thành viên mạng mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Thành viên mạng mới</span></th>
			</tr>
			<tr style="display:none">
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server"></asp:DropDownList></td>
			</tr>
			<tr>
				<td class="first"><strong>Tên doanh nghiệp/công ty</strong></td>
				<td class="last"><input id="txtAgentName" type="text" class="text" runat="server" style="width: 520px" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtAgentName"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr id="trAgentCatID" visible="false" runat="server">
			    <td class="first"><strong>Mã đại lý (AgentCatID)</strong></td>
				<td class="last"><strong id="lblAgentCatIDView" style="font-size:20px;" runat="server"></strong></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Mã doanh nghiệp/công ty</strong></td>
				<td class="last"><input id="txtAgentCode" type="text" class="text" runat="server" style="width: 520px" /></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Giám đốc/Người đại diện</strong></td>
				<td class="last"><input id="txtContactName" style="width: 522px;" runat="server" />
                    </td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Thuộc Ngành nghề</strong></td>
				<td class="last">
				    <asp:DropDownList ID="ddlFaculty" runat="server" Width="200px"></asp:DropDownList>
                </td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Địa chỉ</strong></td>
				<td class="last"><input id="txtAddress" style="width: 522px;" runat="server" /></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Tỉnh/Thành phố</strong></td>
				<td class="last"><asp:DropDownList ID="ddlProvince" runat="server" Width="200px"></asp:DropDownList></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Điện thoại</strong></td>
				<td class="last"><input id="txtTel" style="width: 500px;" runat="server" /></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Fax</strong></td>
				<td class="last"><input id="txtFax" style="width: 500px;" runat="server" /></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Email</strong></td>
				<td class="last">
				    <input id="txtEmail" style="width: 200px;" runat="server" title="Nhập email của doanh nghiệp/công ty" />
                                        
                    <span style="padding-left:30px; font-weight:bold">Website:    </span>
                    <input id="txtWebsite" style="width: 200px;" runat="server" title="Nhập website của doanh nghiệp/công ty" />
                    
                </td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Nick Yahoo</strong></td>
				<td class="last">
				    <input id="txtYahoo" style="width: 200px;" runat="server" title="Nhập nick name Yahoo chat của doanh nghiệp/công ty" />
                    
                    <span style="padding-left:30px; font-weight:bold">Nick Skype:    </span>
                    <input id="txtSkype" style="width: 200px;" runat="server" title="Nhập nick name Skype chat của doanh nghiệp/công ty" />
                    
                </td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Tên đăng nhập</strong></td>
				<td class="last"><input id="txtAgentUsername" style="width: 500px;" runat="server" />
                    </td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Mật khẩu</strong></td>
				<td class="last"><input id="txtAgentPassword" type="password" style="width: 500px;" value="123456" runat="server" /></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Logo</strong></td>
				<td class="last">
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <img id="imgLogo" style="display:none; vertical-align:middle;" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" /></td>
			</tr>
			<tr class="bg" style="display:none">
				<td class="first"><strong>Thông tin Giới thiệu Doanh nghiệp</strong></td>
				<td class="last"><FCKeditorV2:FCKeditor ID="txtIntroduction" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="540px"></FCKeditorV2:FCKeditor></td>
			</tr>
            <tr style="display:none">
                <td class="first"><strong id="lblIsHot" runat="server">Là Doanh nghiệp HOT:</strong></td>
                <td class="last"><asp:CheckBox ID="cbIsHot" runat="server" Text="Check chọn nếu là Doanh nghiệp HOT!" Checked="false" /></td>
            </tr>
            <tr>
                <td class="first">
                    <strong>Ngôn ngữ website:</strong></td>
                <td class="last">
                </td>
            </tr>
            <tr>
                <td class="first" colspan="2">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 100px">
                            </td>
                            <td style="width: 100px">
                                <strong>
                                Mã ngôn ngữ (Vd: VI, EN...)</strong></td>
                            <td style="width: 100px">
                                <strong>Tên ngôn ngữ</strong></td>
                            <td style="width: 100px">
                                <strong>
                                Thứ tự</strong></td>
                        </tr>
                        <tr>
                            <td style="width: 100px">
                                <strong>Ngôn ngữ 1</strong></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangCode1" runat="server">VI</asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangName1" runat="server">Tiếng Việt</asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangOrder1" runat="server" Width="50px"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 100px">
                                <strong>Ngôn ngữ 2</strong></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangCode2" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangName2" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangOrder2" runat="server" Width="50px"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 100px">
                                <strong>Ngôn ngữ 3</strong></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangCode3" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangName3" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangOrder3" runat="server" Width="50px"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 100px">
                                <strong>Ngôn ngữ 4</strong></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangCode4" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangName4" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangOrder4" runat="server" Width="50px"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 100px">
                                <strong>Ngôn ngữ 5</strong></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangCode5" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangName5" runat="server"></asp:TextBox></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="txtLangOrder5" runat="server" Width="50px"></asp:TextBox></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="bg" style="display:none">
				<td class="first"><strong>Hiện/Ẩn</strong></td>
				<td class="last"><asp:CheckBox ID="cbVisible" runat="server" Text="Check chọn để XUẤT HIỆN! Không chọn sẽ ẨN!" Checked="true" /></td>
			</tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" Visible="false" runat="server" Text="Lưu & Tiếp tục" CssClass="button" OnClick="btnSaveContinue_Click" Width="110px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa" CssClass="button" OnClick="btnDelete_Click" Width="80px" CausesValidation="False" />
                    <%} %>
				    <asp:Button ID="btnReset" Visible="false" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
                </td>
			</tr>
		</table>

  </div>
</div>
</asp:Content>

