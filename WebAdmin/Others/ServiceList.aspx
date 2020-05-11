<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ServiceList.aspx.cs" Inherits="WebAdmin_Others_ServiceList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ServiceListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1>Danh sách Dịch vụ</h1>
	</div><br />
  <div class="select-bar">    
    <table class="listing form" cellpadding="0" cellspacing="0">
		<tr>
			<td class="first" style="width:172px;"><strong>Chọn ngôn ngữ:</strong></td>
			<td class="last">
			    <asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged">
                </asp:DropDownList>
            </td>
		</tr>
    </table>
    
    <label><asp:TextBox ID="txtSearch" runat="server" Width="250px"></asp:TextBox></label>
    <label><asp:Button ID="btnSearch" runat="server" OnClick="btnSearch_Click" Text="Tìm kiếm" /></label>
	
	<div class="table">
        <asp:GridView ID="gridViewService" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="30" OnPageIndexChanging="gridViewService_PageIndexChanging" OnRowDataBound="gridViewService_RowDataBound" OnRowDeleting="gridViewService_RowDeleting" OnRowEditing="gridViewService_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblServiceID" runat="server" Text='<%# Eval("ServiceID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Hình">
                    <ItemTemplate>
                        <img id="imgService" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%>ImageFiles/Services/<%# Eval("ServiceImageUrl")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên dịch vụ">
                    <ItemTemplate>
                        <asp:Label ID="lblServiceName" Text='<%# Eval("ServiceName")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày tạo">
                    <ItemTemplate>
                        <asp:Label ID="lblDateAdd" runat="server" Text='<%#Eval("ServiceAddDate")%>'></asp:Label>
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
</div>
</asp:Content>

