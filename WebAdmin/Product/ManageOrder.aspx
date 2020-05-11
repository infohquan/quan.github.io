<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ManageOrder.aspx.cs" Inherits="WebAdmin_Product_ManageOrder" %>
<asp:Content ID="OrderListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1>Danh sách Đơn đặt hàng</h1>
	</div><br />
  <div class="select-bar">        
    <!--<label><input type="text" name="textfield" /></label>
    <label><input type="submit" name="Submit" value="Search" /></label>-->
	
	<div class="table">
        <asp:GridView ID="gridViewOrder" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
            OnRowEditing="gridViewOrder_RowEditing" OnPageIndexChanging="gridViewOrder_PageIndexChanging" 
            OnRowDeleting="gridViewOrder_RowDeleting" OnRowDataBound="gridViewOrder_RowDataBound" PageSize="30">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblOrderID" runat="server" Text='<%# Eval("ID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Mã đơn hàng">
                    <ItemTemplate>
                        <asp:Label ID="lblOrderCode" runat="server" Text='<%# Eval("OrderCode")%>'></asp:Label>                     
                    </ItemTemplate>                    
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tổng tiền USD">
                    <ItemTemplate>
                        <asp:Label ID="lblSumMoney" runat="server" Text='<%#Eval("SumMoney")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tổng tiền VND">
                    <ItemTemplate>
                        <asp:Label ID="lblSumMoneyVND" runat="server" Text='<%#Eval("SumMoneyVND")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên khách hàng" Visible="false">
                    <ItemTemplate>
                        <asp:Label ID="lblCustomerName" runat="server" Text=''></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:CommandField HeaderText="Xem" EditImageUrl="~/WebAdmin/images/EDIT.GIF" ButtonType="Image" ShowEditButton="True">
                    <HeaderStyle CssClass="headerGridView" />
                </asp:CommandField>
                
                <asp:CommandField HeaderText="Xóa" DeleteImageUrl="~/WebAdmin/images/DELETE.GIF" ButtonType="Image" ShowDeleteButton="True">
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

