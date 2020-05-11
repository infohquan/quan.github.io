<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="OrderDetail.aspx.cs" Inherits="WebAdmin_Product_OrderDetail" %>
<asp:Content ID="OrderDetailContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1>Chi tiết Đơn hàng</h1>
	</div><br />
  <div class="select-bar">    
    <table class="listing form" cellpadding="0" cellspacing="0">
		<tr>
			<td class="first" style="width:172px;"><strong>Mã đơn hàng</strong></td>
			<td class="last"><span id="lblOrderCode" class="infoNavy" runat="server"></span></td>
		</tr>
		<tr class="bg">
			<td class="first"><strong>Tổng tiền(USD)</strong></td>
			<td class="last"><span id="lblSumMoney" class="infoRed" runat="server"></span></td>
		</tr>
		<tr>
			<td class="first"><strong>Tổng tiền(VND)</strong></td>
			<td class="last"><span id="lblSumMoneyVND" class="infoRed" runat="server"></span></td>
		</tr>
        <tr>
            <td class="first"><strong>Tình trạng</strong></td>
            <td class="last"><span id="lblActived" class="infoBlue" runat="server"></span></td>
        </tr>
    </table>
	
	<div class="table">
        <asp:GridView ID="gridViewOrderDetail" runat="server" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" >
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblOrderID" runat="server" Text='<%# Eval("OrderID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên sản phẩm">
                    <ItemTemplate>
                        <asp:Label ID="lblProductName" Font-Bold="true" runat="server" Text='<%# Eval("TenGoi")%>'></asp:Label><br />
                        <span>Color: </span><asp:Label ID="lblColor" runat="server" Text='<%# Eval("Color")%>'></asp:Label><br />
                        <span>Size: </span><asp:Label ID="lblSize" runat="server" Text='<%# Eval("SizeName")%>'></asp:Label>
                    </ItemTemplate>                 
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Giá bán">
                    <ItemTemplate>
                        <asp:Label ID="lblPrice" runat="server" Text='<%# Eval("Price")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Số lượng">
                    <ItemTemplate>
                        <asp:Label ID="lblQuantity" runat="server" Text='<%# Eval("Quantity")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Thành tiền">
                    <ItemTemplate>
                        <asp:Label ID="lblResultMoney" runat="server" Text='<%# Eval("ResultMoney")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tiền tệ">
                    <ItemTemplate>
                        <asp:Label ID="lblCurrency" runat="server" Text='<%# Eval("Currency")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
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
  <div class="clearthis"></div>
	<div id="div_paymentinfo">
	    <table class="listing form" cellpadding="0" cellspacing="0" style="display:none">
		    <tr>
			    <td class="first" colspan="2" style="FONT-SIZE: 14px; HEIGHT: 30px; BACKGROUND-COLOR: #66ccff"><strong>Thông tin Người mua hàng</strong></td>
		    </tr>
		    <tr class="bg">
			    <td class="first" style="width:172px;"><strong>Tên người mua</strong></td>
			    <td class="last"><span id="lblBuyingPersonName" runat="server"></span></td>
		    </tr>
		    <tr>
			    <td class="first"><strong>Địa chỉ người mua</strong></td>
			    <td class="last"><span id="lblBuyingPersonAddress" runat="server"></span></td>
		    </tr>
		    <tr class="bg">
			    <td class="first"><strong>Giới tính</strong></td>
			    <td class="last"><asp:RadioButtonList ID="rblBuyingPersonGender" RepeatDirection="Horizontal" runat="server">
                    <asp:ListItem Value="1">Nam</asp:ListItem>
                    <asp:ListItem Value="2">Nữ</asp:ListItem>
                </asp:RadioButtonList></td>
		    </tr>
		    <tr>
			    <td class="first"><strong>Điện thoại</strong></td>
			    <td class="last"><span id="lblBuyingPersonTel" runat="server"></span></td>
		    </tr>
		    <tr class="bg">
			    <td class="first"><strong>Di động</strong></td>
			    <td class="last"><span id="lblBuyingPersonMobile" runat="server"></span></td>
		    </tr>
            <tr>
                <td class="first"><strong>Fax</strong></td>
                <td class="last"><span id="lblBuyingPersonFax" runat="server"></span></td>
            </tr>
		    <tr class="bg">
			    <td class="first"><strong>Email</strong></td>
			    <td class="last"><span id="lblBuyingPersonEmail" runat="server"></span></td>
		    </tr>
		    <tr>
			    <td class="first"><strong>Ghi chú</strong></td>
			    <td class="last"><span id="lblBuyingPersonNotes" runat="server"></span></td>
		    </tr>
        </table>
        
        <table class="listing form" cellpadding="0" cellspacing="0">
		    <tr>
			    <td class="first" colspan="2" style="FONT-SIZE: 14px; HEIGHT: 30px; BACKGROUND-COLOR: #ccffff"><strong>Thông tin Người nhận hàng</strong>
			    <%if (f == true) {%>
			    (<asp:Label ID="Label1" Font-Bold="true" Font-Size="13px" ForeColor="Red" Text="Giống Người Mua Hàng!" runat="server"></asp:Label>)
			    <%} %>
			    </td>
		    </tr>
		    <%if (f == false) {%>
		    <tr class="bg">
			    <td class="first" style="width:172px;"><strong>Tên người nhận</strong></td>
			    <td class="last"><span id="lblReceivingPersonName" runat="server"></span></td>
		    </tr>
		    <tr>
			    <td class="first"><strong>Địa chỉ người nhận</strong></td>
			    <td class="last"><span id="lblReceivingPersonAddress" runat="server"></span></td>
		    </tr>
		    <tr class="bg">
			    <td class="first"><strong>Giới tính</strong></td>
			    <td class="last"><asp:RadioButtonList ID="rblReceivingPersonGender" RepeatDirection="Horizontal" runat="server">
                    <asp:ListItem Value="1">Nam</asp:ListItem>
                    <asp:ListItem Value="2">Nữ</asp:ListItem>
                </asp:RadioButtonList></td>
		    </tr>
		    <tr>
			    <td class="first"><strong>Điện thoại</strong></td>
			    <td class="last"><span id="lblReceivingPersonTel" runat="server"></span></td>
		    </tr>
		    <tr class="bg">
			    <td class="first"><strong>Di động</strong></td>
			    <td class="last"><span id="lblReceivingPersonMobile" runat="server"></span></td>
		    </tr>
            <tr class="bg">
                <td class="first"><strong>Fax</strong></td>
                <td class="last"><span id="lblReceivingPersonFax" runat="server"></span></td>
            </tr>
		    <tr>
			    <td class="first"><strong>Email</strong></td>
			    <td class="last"><span id="lblReceivingPersonEmail" runat="server"></span></td>
		    </tr>
		    <%} %>
		    <tr>
		        <td class="first" colspan="2" style="FONT-SIZE: 14px; HEIGHT: 30px; BACKGROUND-COLOR:orange; text-align:center;">
		            <asp:Button ID="btnDeleteOrder" Text="Xóa đơn hàng" runat="server" OnClick="btnDeleteOrder_Click" />
		        </td>
		    </tr>
        </table>
    </div>
</div>
</asp:Content>
