<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ProductList.aspx.cs" Inherits="WebAdmin_Product_ProductList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ProductListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1>Danh sách Sản phẩm</h1>
	</div><br />
  <div class="select-bar">
    <div id="search-box">
        <table class="listing form" cellpadding="0" cellspacing="0">
		    <tr>
			    <td class="first" style="width:172px;"><strong>Chọn ngôn ngữ:</strong></td>
			    <td class="last">
			        <asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged">
                    </asp:DropDownList>
                </td>
		    </tr>
		    <tr>
			    <td class="first"><strong>Chọn Nhóm sản phẩm:</strong></td>
			    <td class="last"><asp:DropDownList ID="ddlCatalog" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlCatalog_SelectedIndexChanged"></asp:DropDownList></td>
		    </tr>
        </table>
	</div>
	<div class="table">
        <asp:GridView ID="gridViewProduct" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
            OnRowEditing="gridViewProduct_RowEditing" OnPageIndexChanging="gridViewProduct_PageIndexChanging" 
            OnRowDeleting="gridViewProduct_RowDeleting" OnRowDataBound="gridViewProduct_RowDataBound" PageSize="30">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblProductID" runat="server" Text='<%# Eval("ID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Hình">
                    <ItemTemplate>
                        <img id="imgProduct" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%><%# Eval("Anh")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên sản phẩm">
                    <ItemTemplate>
                        <asp:Label ID="lblProductName" runat="server" Text='<%# Eval("TenGoi")%>'></asp:Label>
                    </ItemTemplate>                    
                    <HeaderStyle Width="450px" />
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày tạo">
                    <ItemTemplate>
                        <asp:Label ID="lblDateCreated" runat="server" Text='<%# Eval("DateCreated")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblCatID" runat="server" Text='<%# Eval("GroupID")%>'></asp:Label>                        
                    </ItemTemplate>
                    <HeaderStyle CssClass="headerGridView" />
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
</div>
</asp:Content>

