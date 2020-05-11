<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="CustomerList.aspx.cs" Inherits="WebAdmin_Others_CustomerList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="CustomerListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
    <%if (Globals.GetStringFromQueryString("Action") == "View") {%>
    <div class="top-bar">
		<h1>Thông tin Chi tiết Khách hàng</h1>
	</div><br />
	<div class="select-bar">    
	    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2">
                    Thông tin chi tiết khách hàng</th>
			</tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Họ tên khách hàng</strong></td>
				<td class="last" style="font-weight: bold; font-size: 13px; color: blue"><span id="lblFullName" runat="server"></span></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Tên truy cập</strong></td>
				<td class="last" style="font-weight: bold; font-size: 13px; color: blue"><span id="lblUsername" runat="server"></span></td>
			</tr>
			<tr>
				<td class="first"><strong>Địa chỉ</strong></td>
				<td class="last" style="font-weight: bold; font-size: 13px; color: blue"><span id="lblAddress" runat="server"></span></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Email</strong></td>
				<td class="last" style="font-weight: bold; font-size: 13px; color: blue"><span id="lblEmail" runat="server"></span></td>
			</tr>
			<tr>
				<td class="first"><strong>Điện thoại</strong></td>
				<td class="last" style="font-weight: bold; font-size: 13px; color: blue"><span id="lblTel" runat="server"></span></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Di động</strong></td>
				<td class="last" style="font-weight: bold; font-size: 13px; color: blue"><span id="lblMobile" runat="server"></span></td>
			</tr>
			<tr>
				<td class="first"><strong>Fax</strong></td>
				<td class="last" style="font-weight: bold; font-size: 13px; color: blue">
				    <span id="lblFax" runat="server"></span>
				</td>
			</tr>
            <tr class="bg" style="display:none">
                <td class="first">
                    <strong>Giới tính</strong></td>
                <td class="last" style="font-weight: bold; font-size: 13px; color: blue">
                    <span id="lblGender" runat="server"></span></td>
            </tr>
            <tr>
                <td class="first">
                </td>
                <td class="last">
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa khách hàng" CssClass="button" OnClick="btnDelete_Click" Width="130px" CausesValidation="False" />
                </td>
            </tr>
		</table>

  </div>
    </div>
    <%} %>
	<div class="top-bar">
		<h1>Danh sách Khách hàng</h1>
	</div><br />
    <div class="select-bar">    
	    <div class="table">
            <asp:GridView ID="gridViewCustomer" runat="server" AllowPaging="True" AllowSorting="True"
                AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
                OnRowEditing="gridViewCustomer_RowEditing" OnPageIndexChanging="gridViewCustomer_PageIndexChanging" PageSize="30" OnRowDataBound="gridViewCustomer_RowDataBound" OnRowDeleting="gridViewCustomer_RowDeleting">
                <PagerSettings Mode="NumericFirstLast" />
                <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
                <HeaderStyle CssClass="headerGridView" />
                <Columns>
                    <asp:TemplateField Visible="False">
                        <ItemTemplate>
                            <asp:Label ID="lblCustomerID" runat="server" Text='<%# Eval("CustomerID")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="Tên khách hàng">
                        <ItemTemplate>
                            <asp:Label ID="lblCustomerFullName" runat="server" Text='<%# Eval("CustomerFullName")%>'></asp:Label>
                        </ItemTemplate>               
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="Username">
                        <ItemTemplate>
                            <asp:Label ID="lblCustomerUsername" runat="server" Text='<%# Eval("CustomerUsername")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="Email">
                        <ItemTemplate>
                            <asp:Label ID="lblCustomerEmail" runat="server" Text='<%# Eval("CustomerEmail")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="Điện thoại">
                        <ItemTemplate>
                            <asp:Label ID="lblCustomerTel" runat="server" Text='<%# Eval("CustomerTel")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:CommandField HeaderText="Xem" ButtonType="Image" EditImageUrl="~/WebAdmin/images/EDIT.GIF" ShowEditButton="True">
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