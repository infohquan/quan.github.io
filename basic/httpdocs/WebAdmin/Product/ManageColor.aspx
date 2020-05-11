<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ManageColor.aspx.cs" Inherits="WebAdmin_Product_ManageColor" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ManageColorContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Màu sắc mới</span></b></h1>
	</div><br />	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Màu sắc mới</span></th>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="210px" runat="server"></asp:DropDownList>
                    </td>
			</tr>
			<tr>
				<td class="first"><strong>Tên Màu sắc</strong></td>
				<td class="last"><input id="txtColorName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtColorName"
                        ErrorMessage="Vui lòng nhập tên Màu sắc" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
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
		<h1><b>Danh sách Màu sắc</b></h1>
    </div>
    <div class="clearthis"></div>
    
    <table cellpadding="2px" cellspacing="2px" style="width:100%;">
        <tr>
            <td style="width:180px;">Chọn ngôn ngữ:</td>
            <td><asp:DropDownList ID="ddlLanguage2" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage2_SelectedIndexChanged" Width="138px"></asp:DropDownList></td>
        </tr>
    </table>
    <div id="WidthList">
        <asp:GridView ID="gridViewColor" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="60" OnPageIndexChanging="gridViewColor_PageIndexChanging" OnRowDataBound="gridViewColor_RowDataBound" OnRowDeleting="gridViewColor_RowDeleting" OnRowEditing="gridViewColor_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblColorID" runat="server" Text='<%# Eval("ColorID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên màu sắc">
                    <ItemTemplate>
                        <asp:Label ID="lblColorName" Text='<%# Eval("ColorName")%>' runat="server"></asp:Label>
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

