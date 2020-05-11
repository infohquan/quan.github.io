<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Category.aspx.cs" Inherits="WebAdmin_Article_Category"%>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="CategoryContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Chuyên mục tin tức mới</span></b></h1>
	</div><br />	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Chuyên mục tin tức mới</span></th>
			</tr>
			<tr><td style="text-align:right;" colspan="2"><b><asp:HyperLink ID="linkAddCategory" Visible="false" runat="server"></asp:HyperLink></b></td></tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlLanguage"
                    ErrorMessage="Vui lòng chọn ngôn ngữ" Operator="NotEqual" ValueToCompare="0" SetFocusOnError="True"></asp:CompareValidator></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Thuộc Chuyên mục</strong></td>
				<td class="last"><asp:DropDownList ID="ddlCategory" Width="250px" runat="server"></asp:DropDownList></td>
			</tr>
			<tr>
				<td class="first"><strong>Tên chuyên mục</strong></td>
				<td class="last"><input id="txtCategoryName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtCategoryName"
                        ErrorMessage="Vui lòng nhập tên Nhóm tin tức"></asp:RequiredFieldValidator></td>
			</tr>
			<tr class="bg" style="display:none;">
				<td class="first"><strong>Thứ tự</strong></td>
				<td class="last"><input id="txtCategoryOrder" type="text" class="text" runat="server" value="1" />
                    </td>
			</tr>
			<tr>
				<td></td>
				<td>
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
				    <asp:Button ID="btnDelete" runat="server" Text="Xóa" CssClass="button" CausesValidation="False" OnClick="btnDelete_Click" />
				    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" CausesValidation="False" OnClick="btnReset_Click" Visible="False" />
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
		<h1><b><span id="lblTitle3" runat="server">Danh sách Chuyên mục tin tức</span></b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="CategoryList">
        <table cellpadding="0" cellspacing="0" style="width:100%;">
			<tr>
				<td class="first" style="width:172px;">
				    <b>Chọn ngôn ngữ:</b>
				</td>
				<td class="last">
                    <asp:DropDownList ID="ddlLanguage2" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage2_SelectedIndexChanged"></asp:DropDownList>&nbsp;
				</td>
			</tr>
			<tr>
				<td class="first" style="width:172px; vertical-align:middle;">
				    <b>Danh sách:</b>
				</td>
				<td class="last">
                    <asp:TreeView ID="TreeViewCategory" CssClass="treeview" runat="server" ShowLines="True"></asp:TreeView>
				</td>
			</tr>
		</table>
  </div>
</div>
</asp:Content>

