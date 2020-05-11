<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="UserList.aspx.cs" Inherits="WebAdmin_User_UserList" %>
<asp:Content ID="UserListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1>Danh sách Người dùng</h1>
	</div><br />
	<div class="select-bar">
	    <asp:GridView ID="gridViewUser" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
            OnRowEditing="gridViewUser_RowEditing" OnPageIndexChanging="gridViewUser_PageIndexChanging" 
            OnRowDeleting="gridViewUser_RowDeleting" OnRowDataBound="gridViewUser_RowDataBound" PageSize="30">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblID" runat="server" Text='<%# Eval("ID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Họ tên">
                    <ItemTemplate>
                        <asp:Label ID="lblFullName" runat="server" Text='<%# Eval("FullName")%>'></asp:Label>
                    </ItemTemplate>              
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên đăng nhập">
                    <ItemTemplate>
                        <asp:Label ID="lblUsername" runat="server" Text='<%# Eval("Username")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Email">
                    <ItemTemplate>
                        <asp:Label ID="lblEmail" runat="server" Text='<%# Eval("Email")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Điện thoại">
                    <ItemTemplate>
                        <asp:Label ID="lblTel" runat="server" Text='<%# Eval("Tel")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày tạo">
                    <ItemTemplate>
                        <asp:Label ID="lblNgayTao" runat="server" Text='<%# Eval("DateCreated")%>'></asp:Label>                        
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
</asp:Content>

