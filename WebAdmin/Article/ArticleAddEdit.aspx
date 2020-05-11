<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ArticleAddEdit.aspx.cs" Inherits="WebAdmin_Article_ArticleAddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ArticleAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Tin tức mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Tin tức mới</span></th>
			</tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList></td>
			</tr>
			<tr class="bg" id="trCategory" runat="server">
				<td class="first"><strong>Thuộc chuyên mục</strong></td>
				<td class="last">
				    <asp:DropDownList ID="ddlCategory" Width="210px" runat="server"></asp:DropDownList>
				    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlCategory"
                        ErrorMessage="*" Operator="GreaterThan" SetFocusOnError="True" Type="Integer"
                        ValueToCompare="-1"></asp:CompareValidator>
				</td>
			</tr>
			<tr>
				<td class="first"><strong>Là Tiêu điểm?</strong></td>
				<td class="last">
				    <asp:RadioButtonList ID="rblViewIndex" runat="server" RepeatDirection="Horizontal">
                        <asp:ListItem Selected="True" Value="1">C&#243;</asp:ListItem>
                        <asp:ListItem Value="0">Kh&#244;ng</asp:ListItem>
                    </asp:RadioButtonList>
                    <b>Chọn "Có" Sẽ xuất hiện ở trang chủ!!</b>
                </td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Tiêu đề</strong></td>
				<td class="last"><input id="txtTitle" type="text" class="text" runat="server" style="width: 520px" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtTitle"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr>
				<td class="first"><strong>Trích đoạn</strong></td>
				<td class="last"><textarea id="txtExcerpt" rows="2" cols="20" style="width: 522px; height: 100px" runat="server"></textarea>
                    <!--<asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtExcerpt"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator>--></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Nội dung chính</strong></td>
				<td class="last"><FCKeditorV2:FCKeditor ID="fckContent" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="540px"></FCKeditorV2:FCKeditor></td>
			</tr>
			<tr>
				<td class="first"><strong>Hình ảnh</strong></td>
				<td class="last">
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <img id="ImageArticle" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" /></td>
			</tr>
            <tr class="bg">
                <td class="first">
                    <strong>Mô tả cho hình ảnh</strong></td>
                <td class="last">
                    <input id="txtImageDesc" type="text" class="text" runat="server" style="width: 520px" /></td>
            </tr>
            <tr>
                <td class="first">
                    <strong>Tác giả</strong></td>
                <td class="last">
                    <input id="txtAuthor" type="text" class="text" runat="server" style="width: 520px" /></td>
            </tr>
			<tr class="bg">
				<td class="first"><strong>Từ khóa</strong></td>
				<td class="last"><textarea id="txtKeyword" rows="2" cols="20" style="width: 522px; height: 70px" runat="server"></textarea></td>
			</tr>
            <tr>
                <td class="first"><strong id="lblIsHot" runat="server">Là tin HOT:</strong></td>
                <td class="last"><asp:CheckBox ID="cbHotArticle" runat="server" Text="Check chọn nếu là Tin HOT!" Checked="true" /></td>
            </tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" runat="server" Text="Lưu & Tiếp tục" CssClass="button" OnClick="btnSaveContinue_Click" Width="110px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa tin tức" CssClass="button" OnClick="btnDelete_Click" Width="110px" CausesValidation="False" />
                    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
                </td>
			</tr>
		</table>

  </div>
</div>
</asp:Content>

