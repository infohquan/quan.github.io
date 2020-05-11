<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="SupportOnline.aspx.cs" Inherits="WebAdmin_Others_SupportOnline" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="SupportOnlineContent" ContentPlaceHolderID="MainContent" Runat="Server">
    <div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Nick Chat Hỗ trợ trực tuyến</span></b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Nick Chat Hỗ trợ trực tuyến</span></th>
			</tr>
			<tr style="display:none;">
				<td class="first"><strong>Chọn ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" runat="server" Width="170px" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList></td>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Chọn nhóm</strong></td>
				<td class="last"><asp:DropDownList ID="ddlSupportGroup" runat="server" Width="170px"></asp:DropDownList>
                </td>
			</tr>
            <tr>
                <td class="first">
                    <strong>Nick Yahoo</strong></td>
                <td class="last">
                    <asp:TextBox ID="txtNickYahoo" runat="server" Width="343px"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="*"
                        SetFocusOnError="True" ControlToValidate="txtNickYahoo"></asp:RequiredFieldValidator></td>
            </tr>
			<tr style="display:none">
				<td class="first"><strong>Nick Skype</strong></td>
				<td class="last"><asp:TextBox ID="txtNickSkype" runat="server" Width="343px"></asp:TextBox></td>
			</tr>
			<tr>
				<td class="first"><strong>Họ tên</strong></td>
				<td class="last"><asp:TextBox ID="txtFullName" runat="server" Width="343px"></asp:TextBox></td>
			</tr>
			<tr>
				<td class="first"><strong>Tên hiển thị</strong></td>
				<td class="last">
				    <asp:TextBox ID="txtDisplayName" runat="server" Width="343px"></asp:TextBox>
				    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ErrorMessage="*"
                        SetFocusOnError="True" ControlToValidate="txtDisplayName"></asp:RequiredFieldValidator>
				    <span>Ví dụ: A.Đoàn, C.Nga</span>				
				</td>
			</tr>
			<tr>
				<td class="first"><strong>Email</strong></td>
				<td class="last"><asp:TextBox ID="txtEmail" runat="server" Width="343px"></asp:TextBox>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="*"
                        SetFocusOnError="True" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ControlToValidate="txtEmail"></asp:RegularExpressionValidator></td>
			</tr>
			<tr>
				<td class="first"><strong>Điện thoại</strong></td>
				<td class="last"><asp:TextBox ID="txtTel" runat="server" Width="343px"></asp:TextBox>
				</td>
			</tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
                    &nbsp;<asp:Label ID="lblMessage" runat="server" BackColor="#FFFFC0" Font-Bold="True" Font-Size="15px"
                        ForeColor="Red" Text="Label" Visible="False"></asp:Label></td>
			</tr>
            <tr>
                <td class="first">
                </td>
                <td class="last">                    
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa" CssClass="button" OnClick="btnDelete_Click" />
                    <%} %>
                </td>
            </tr>
		</table>
  </div>
  
  <div class="clearthis"></div>
    <div class="top-bar">
		<h1><b>Danh sách Nick Chat Hỗ trợ trực tuyến</b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="SupportOnlineList">
        <asp:GridView ID="gridViewSupportOnline" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="30" OnPageIndexChanging="gridViewSupportOnline_PageIndexChanging" OnRowDataBound="gridViewSupportOnline_RowDataBound" OnRowDeleting="gridViewSupportOnline_RowDeleting" OnRowEditing="gridViewSupportOnline_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblNickID" runat="server" Text='<%# Eval("NickID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Nick Yahoo">
                    <ItemTemplate>
                        <asp:Label ID="lblNickNameYM" Text='<%# Eval("NickNameYM")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Nick Skype">
                    <ItemTemplate>
                        <asp:Label ID="lblNickNameSkype" Text='<%# Eval("NickNameSkype")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Họ tên">
                    <ItemTemplate>
                        <asp:Label ID="lblFullName" runat="server" Text='<%#Eval("FullName")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Email">
                    <ItemTemplate>
                        <asp:Label ID="lblEmail" runat="server" Text='<%#Eval("Email")%>'></asp:Label>
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

