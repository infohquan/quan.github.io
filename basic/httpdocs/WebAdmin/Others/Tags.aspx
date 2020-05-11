<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Tags.aspx.cs" Inherits="WebAdmin_Others_Tags" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<asp:Content ID="TagsContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Cập nhật nội dung tiêu đề, các thẻ meta, tag cho website</span></b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Cập nhật nội dung tiêu đề, các thẻ meta, tag cho website</span></th>
			</tr>
			<tr class="bg">
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList></td>
			</tr>
			<tr>
				<td class="first"><strong>Nội dung Tiêu đề trang web</strong></td>
				<td class="last">
                    <textarea id="txtPageTitle" runat="server" cols="10" rows="2" style="width: 445px;
                        height: 50px"></textarea></td>
			</tr>
            <tr class="bg">
                <td class="first">
                    <strong>Nội dung thẻ meta description</strong></td>
                <td class="last">
                    <textarea id="txtPageDescription" rows="2" cols="10" style="width: 445px; height: 80px" runat="server"></textarea></td>
            </tr>
			<tr>
				<td class="first"><strong>Nội dung thẻ meta keywords</strong></td>
				<td class="last">
                    <textarea id="txtPageKeyword" runat="server" cols="10" rows="2" style="width: 445px;
                        height: 80px"></textarea></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Nội dung thẻ ALT, TITLE</strong></td>
				<td class="last">
                    <textarea id="txtTagContent" runat="server" cols="10" rows="2" style="width: 445px;
                        height: 80px"></textarea></td>
			</tr>
			<tr>
				<td class="first"></td>
				<td>
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" Width="100px" />
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
                </td>
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

