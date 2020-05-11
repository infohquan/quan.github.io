<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="AboutUsList.aspx.cs" Inherits="WebAdmin_AboutUs_AboutUsList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="AboutUsListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1>Danh sách Giới thiệu</h1>
	</div><br />
  <div class="select-bar">    
    <table class="listing form" cellpadding="0" cellspacing="0">
		<tr>
			<td class="first" style="width:172px;"><strong>Chọn ngôn ngữ:</strong></td>
			<td class="last">
			    <asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged">
                </asp:DropDownList>
            </td>
    </table>
	
	<div class="table">
        <asp:GridView ID="gridViewAboutUs" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
            OnRowEditing="gridViewAboutUs_RowEditing" OnPageIndexChanging="gridViewAboutUs_PageIndexChanging" 
            OnRowDeleting="gridViewAboutUs_RowDeleting" OnRowDataBound="gridViewAboutUs_RowDataBound" PageSize="30">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblArticleID" runat="server" Text='<%# Eval("ArticleID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Hình">
                    <ItemTemplate>
                        <img id="imgAboutUs" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%><%# Eval("ImageURL")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tiêu đề">
                    <ItemTemplate>
                        <asp:Label ID="lblTitle" runat="server" Text='<%# Eval("Title")%>'></asp:Label>                      
                    </ItemTemplate>                    
                    <HeaderStyle Width="380px" />
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày">
                    <ItemTemplate>
                        <asp:Label ID="lblPostDate" Text='<%#Eval("PostDate")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblCateID" runat="server" Text='<%#Eval("CategoryID")%>'></asp:Label>                        
                    </ItemTemplate>
                    <HeaderStyle CssClass="headerGridView" />
                </asp:TemplateField>
                
                <asp:CommandField HeaderText="Sửa" ButtonType="Image" EditImageUrl="~/WebAdmin/images/edit.gif" ShowEditButton="True">
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

