<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="CustomerIdea.aspx.cs" Inherits="WebAdmin_Others_CustomerIdea" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="CustomerIdeaContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<%if (Globals.GetStringFromQueryString("Action") == "View") {%>
	<div class="top-bar">
		<h1><b>Xem thông tin Khách hàng liên hệ</b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2">Xem thông tin Khách hàng liên hệ</th>
			</tr>
			<tr class="bg">
				<td class="first" style="width:172px;"><strong>Tiêu đề</strong></td>
				<td class="last" style="font-weight: bold; font-size: 12px; color: blue;"><span id="lblTitle" class="text" runat="server" /></td>
			</tr>
            <tr>
                <td class="first">
                    <strong>Nội dung</strong></td>
                <td class="last" style="font-weight: bold; font-size: 12px; color: blue;">
                    <span id="lblContent" runat="server"></span></td>
            </tr>
			<tr>
				<td class="first"><strong>Họ tên</strong></td>
				<td class="last" style="font-weight: bold; font-size: 12px; color: blue;"><span id="lblFullName" class="text" runat="server" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Địa chỉ</strong></td>
				<td class="last" style="font-weight: bold; font-size: 12px; color: blue;"><span id="lblAddress" class="text" runat="server" /></td>
			</tr>
            <tr>
                <td class="first">
                    <strong>Điện thoại</strong></td>
                <td class="last" style="font-weight: bold; font-size: 12px; color: blue;">
                    <span id="lblTel" class="text" runat="server" /></td>
            </tr>
			<tr class="bg">
				<td class="first"><strong>Email</strong></td>
				<td class="last" style="font-weight: bold; font-size: 12px; color: blue;"><span id="lblEmail" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Ngày gửi</strong></td>
				<td class="last" style="font-weight: bold; font-size: 12px; color: blue;"><span id="lblDateAdd" class="text" runat="server" /></td>
			</tr>
			<%if (t == "ContactProduct") {%>
			<tr>
				<td class="first"><strong>Tên sản phẩm</strong></td>
				<td class="last" style="font-weight: bold; font-size: 12px; color: blue;"><span id="lblProductName" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Hình sản phẩm</strong></td>
				<td class="last" style="font-weight: bold; font-size: 12px; color: blue;"><img id="imgProduct" style="width:400px; height:300px;" runat="server" /></td>
			</tr>
			<%} %>
            <tr class="bg">
                <td class="first">
                </td>
                <td class="last">
                    <%if (Globals.GetStringFromQueryString("Action") == "View") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa ý kiến khách hàng" CssClass="button" OnClick="btnDelete_Click" Width="180px" CausesValidation="False" />
                    <%} %>
                </td>
            </tr>
		</table>
  </div>
    <div class="clearthis"></div>
    <%} %>
    <div class="top-bar">
		<h1><b>Danh sách Ý kiến khách hàng</b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="CustomerIdeaList">
        <asp:GridView ID="gridViewCustomerIdea" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="30" OnPageIndexChanging="gridViewCustomerIdea_PageIndexChanging" OnRowDataBound="gridViewCustomerIdea_RowDataBound" OnRowDeleting="gridViewCustomerIdea_RowDeleting" OnRowEditing="gridViewCustomerIdea_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblContactID" runat="server" Text='<%# Eval("ContactID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tiêu đề">
                    <ItemTemplate>
                        <asp:Label ID="lblTitle" Text='<%# Eval("Title")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Họ tên">
                    <ItemTemplate>
                        <asp:Label ID="lblFullName" runat="server" Text='<%#Eval("FullName")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày gửi">
                    <ItemTemplate>
                        <asp:Label ID="lblPostDate" runat="server" Text='<%#Eval("PostDate")%>'></asp:Label>
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
</asp:Content>

