<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Catalog.aspx.cs" Inherits="WebAdmin_WebDemo_Catalog" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="WebDemoCatalogContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Chuyên mục WebDemo mới</span></b></h1>
	</div><br />	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Chuyên mục WebDemo mới</span></th>
			</tr>
			<tr>
				<td class="first"><strong>Tên Chuyên mục WebDemo</strong></td>
				<td class="last"><input id="txtCategoryName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtCategoryName"
                        ErrorMessage="Vui lòng nhập tên Chuyên mục WebDemo"></asp:RequiredFieldValidator></td>
			</tr>
			<tr class="bg" style="display:none;">
				<td class="first"><strong>Thứ tự</strong></td>
				<td class="last"><input id="txtCategoryOrder" type="text" class="text" runat="server" />
                    </td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
				    <asp:Button ID="btnDelete" runat="server" Text="Xóa" CssClass="button" CausesValidation="False" OnClick="btnDelete_Click" />
				    <%} %>
				    <asp:Button ID="btnReset" Visible="false" runat="server" Text="Nhập lại" CssClass="button" CausesValidation="False" OnClick="btnReset_Click" />
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
		<h1><b>Danh sách Chuyên mục WebDemo</b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="CategoryList">
        <table cellpadding="0" cellspacing="0" style="width:100%;">
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

