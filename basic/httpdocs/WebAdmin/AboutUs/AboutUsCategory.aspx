<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="AboutUsCategory.aspx.cs" Inherits="WebAdmin_AboutUs_AboutUsCategory"%>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="CategoryContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b>Thêm Nhóm Giới thiệu mới</b></h1>
	</div><br />	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2">Thêm Nhóm Giới thiệu mới</th>
			</tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server"></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlLanguage"
                    ErrorMessage="Vui lòng chọn ngôn ngữ" Operator="NotEqual" ValueToCompare="0" SetFocusOnError="True"></asp:CompareValidator></td>
			</tr>
			<tr>
				<td class="first"><strong>Tên Nhóm Giới thiệu</strong></td>
				<td class="last"><input id="txtAboutUsCategoryName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtAboutUsCategoryName"
                        ErrorMessage="Vui lòng nhập tên Nhóm Giới thiệu"></asp:RequiredFieldValidator></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Thứ tự</strong></td>
				<td class="last"><input id="txtAboutUsCategoryOrder" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtAboutUsCategoryOrder"
                        ErrorMessage="Vui lòng nhập thứ tự Nhóm Giới thiệu"></asp:RequiredFieldValidator></td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" />
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" CausesValidation="False" />
                </td>
			</tr>
		</table>
  </div>
    <div class="clearthis"></div>
    <div class="top-bar">
		<h1><b>Danh sách Nhóm Giới thiệu</b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="AboutUsCategoryList">
        <table cellpadding="0" cellspacing="0" style="width:100%;">
			<tr>
				<td class="first" style="width:172px;">
				    <b>Chọn ngôn ngữ:</b>
				</td>
				<td class="last">
                    <asp:DropDownList ID="ddlLanguage2" Width="170px" runat="server" AutoPostBack="True"></asp:DropDownList>&nbsp;
				</td>
			</tr>
			<tr>
				<td class="first" style="width:172px; vertical-align:middle;">
				    <b>Danh sách:</b>
				</td>
				<td class="last">
                    <asp:TreeView ID="TreeViewAboutUsCategory" CssClass="treeview" runat="server" ShowLines="True">
                        <Nodes>
                            <asp:TreeNode Text="New Node" Value="New Node">
                                <asp:TreeNode Text="New Node" Value="New Node"></asp:TreeNode>
                                <asp:TreeNode Text="New Node" Value="New Node"></asp:TreeNode>
                            </asp:TreeNode>
                            <asp:TreeNode Text="New Node" Value="New Node">
                                <asp:TreeNode Text="New Node" Value="New Node"></asp:TreeNode>
                                <asp:TreeNode Text="New Node" Value="New Node"></asp:TreeNode>
                            </asp:TreeNode>
                            <asp:TreeNode Text="New Node" Value="New Node"></asp:TreeNode>
                        </Nodes>
                    </asp:TreeView>
				</td>
			</tr>
		</table>
  </div>
</div>
</asp:Content>

