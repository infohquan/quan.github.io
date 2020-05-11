<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ManageSize.aspx.cs" Inherits="WebAdmin_Product_ManageSize" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ManageSizeContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Size mới</span></b></h1>
	</div><br />	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Size mới</span></th>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Nhóm sản phẩm (Tiếng Anh)</strong></td>
				<td class="last"><asp:DropDownList ID="ddlParentCatalogEN" Width="210px" runat="server"></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator2" runat="server" ControlToValidate="ddlParentCatalogEN"
                        ErrorMessage="Vui lòng chọn Nhóm sản phẩm Tiếng Anh" Operator="GreaterThan" SetFocusOnError="True"
                        ValueToCompare="-1"></asp:CompareValidator></td>
			</tr>
            <tr>
                <td class="first"><strong>Nhóm sản phẩm (Tiếng Việt)</strong></td>
				<td class="last"><asp:DropDownList ID="ddlParentCatalogVI" Width="210px" runat="server"></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlParentCatalogVI"
                        ErrorMessage="Vui lòng chọn Nhóm sản phẩm Tiếng Việt" Operator="GreaterThan" SetFocusOnError="True"
                        ValueToCompare="-1"></asp:CompareValidator></td>
            </tr>
			<tr class="bg">
				<td class="first"><strong>Tên Size</strong></td>
				<td class="last"><input id="txtSizeName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtSizeName"
                        ErrorMessage="Vui lòng nhập tên Nhóm sản phẩm" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
				    <asp:Button ID="btnDelete" runat="server" Text="Xóa" CssClass="button" CausesValidation="False" OnClick="btnDelete_Click" />&nbsp;<%} %>
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
		<h1><b>Danh sách Size(kích thước)</b></h1>
    </div>
    <div class="clearthis"></div>
    
    <table cellpadding="2px" cellspacing="2px" style="width:100%;">
        <tr>
            <td style="width:180px;">Chọn ngôn ngữ:</td>
            <td><asp:DropDownList ID="ddlLanguage" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged" Width="138px"></asp:DropDownList></td>
        </tr>
        <tr>
            <td>Chọn nhóm sản phẩm:</td>
            <td><asp:DropDownList ID="ddlParentGroupCat" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlParentGroupCat_SelectedIndexChanged" Width="180px"></asp:DropDownList></td>
        </tr>
    </table>
    <div id="SizeList">
        <asp:GridView ID="gridViewSize" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="60" OnPageIndexChanging="gridViewSize_PageIndexChanging" OnRowDataBound="gridViewSize_RowDataBound" OnRowDeleting="gridViewSize_RowDeleting" OnRowEditing="gridViewSize_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblSizeID" runat="server" Text='<%# Eval("SizeID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên Size">
                    <ItemTemplate>
                        <asp:Label ID="lblSizeName" Text='<%# Eval("SizeName")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Nhóm sản phẩm (English)">
                    <ItemTemplate>
                        <asp:Label ID="lblParentGroupCatID_EN" Visible="false" Text='<%# Eval("ParentGroupCatID_EN")%>' runat="server"></asp:Label>
                        <asp:Label ID="lblParentGroupCatName_EN" runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Nhóm sản phẩm (Tiếng Việt)">
                    <ItemTemplate>
                        <asp:Label ID="lblParentGroupCatID_VI" Visible="false" Text='<%# Eval("ParentGroupCatID_VI")%>' runat="server"></asp:Label>
                        <asp:Label ID="lblParentGroupCatName_VI" runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:CommandField HeaderText="Sửa" ButtonType="Image" EditImageUrl="~/WebAdmin/images/EDIT.GIF" ShowEditButton="True">
                    <HeaderStyle CssClass="headerGridView" />
                </asp:CommandField>
                
                <asp:CommandField HeaderText="Xóa" ButtonType="Image" DeleteImageUrl="~/WebAdmin/images/DELETE.GIF" ShowDeleteButton="True">
                    <HeaderStyle CssClass="headerGridView" />
                </asp:CommandField>
            </Columns>
            <EmptyDataTemplate>
                <table style="width:300px; text-align:center;" border="1">
                    <tr>
                        <td style="height:60px; background-color:#ffffcc" align="center">
                            <div id="EmptyData"><asp:Label ID="lblNoData" Text="Không có dữ liệu..." runat="server"></asp:Label></div>
                        </td>   
                    </tr>
                </table>
            </EmptyDataTemplate>
        </asp:GridView>
    </div>
</div>
</asp:Content>

