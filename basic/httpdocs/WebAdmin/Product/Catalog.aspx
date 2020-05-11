<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Catalog.aspx.cs" Inherits="WebAdmin_Product_Catalog" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="CatalogContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Danh mục sản phẩm mới</span></b></h1>
	</div><br />	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Danh mục sản phẩm mới</span></th>
			</tr>
            <tr>
                <td style="text-align:right" class="last" colspan="2"><b><asp:HyperLink ID="linkAdd" Visible="false" Text="Thêm danh mục sản phẩm mới" NavigateUrl="~/WebAdmin/Product/Catalog.aspx" runat="server"></asp:HyperLink></b></td>
            </tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList>
                    </td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Thuộc Danh mục sản phẩm</strong></td>
				<td class="last"><asp:DropDownList ID="ddlCatalog" Width="210px" runat="server"></asp:DropDownList>
                    </td>
			</tr>
			<tr>
				<td class="first"><strong>Tên Danh mục sản phẩm</strong></td>
				<td class="last"><input id="txtCatalogName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtCatalogName"
                        ErrorMessage="Vui lòng nhập tên Danh mục sản phẩm" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr class="bg" style="display:none;">
				<td class="first"><strong>Thứ tự</strong></td>
				<td class="last"><input id="txtCatalogOrder" type="text" class="text" value="1" runat="server" />
                    </td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
				    <asp:Button ID="btnDelete" runat="server" Text="Xóa" CssClass="button" CausesValidation="False" OnClick="btnDelete_Click" />
				    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" CausesValidation="False" OnClick="btnReset_Click" />
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
		<h1><b>Danh sách Danh mục sản phẩm</b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="CatalogList">
        <table cellpadding="0" cellspacing="0" style="width:100%;">
			<tr>
				<td class="first" style="width:172px; padding-left: 10px;">
				    <b>Chọn ngôn ngữ:</b>
				</td>
				<td class="last">
                    <asp:DropDownList ID="ddlLanguage2" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage2_SelectedIndexChanged"></asp:DropDownList>&nbsp;
				</td>
			</tr>
			<tr>
				<td class="first" style="width:172px; vertical-align:middle; padding-left: 10px;">
				    <b>Danh sách:</b>
				</td>
				<td class="last">
                    <asp:TreeView ID="TreeViewCatalog" CssClass="treeview" runat="server" ShowLines="True"></asp:TreeView>
				</td>
			</tr>
		</table>
  </div>
</div>
</asp:Content>

