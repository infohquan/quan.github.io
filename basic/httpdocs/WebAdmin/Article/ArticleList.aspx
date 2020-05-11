<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ArticleList.aspx.cs" Inherits="WebAdmin_Article_ArticleList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ArticleListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><span id="lblTitle1" runat="server">Danh sách Tin tức</span></h1>
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
		<tr class="bg">
			<td class="first"><strong>Chọn chuyên mục:</strong></td>
			<td class="last"><asp:DropDownList ID="ddlCategory" Width="240px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlCategory_SelectedIndexChanged"></asp:DropDownList></td>
		</tr>
    </table>
    
    <!--<label><asp:TextBox ID="txtSearch" runat="server" Width="250px"></asp:TextBox></label>
    <label><asp:Button ID="btnSearch" runat="server" OnClick="btnSearch_Click" Text="Tìm kiếm" /></label>-->
	
	<div class="table">
        <asp:GridView ID="gridViewArticle" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
            OnRowEditing="gridViewArticle_RowEditing" OnPageIndexChanging="gridViewArticle_PageIndexChanging" 
            OnRowDeleting="gridViewArticle_RowDeleting" OnRowDataBound="gridViewArticle_RowDataBound" PageSize="30">
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
                        <img id="imgArticle" alt="" class="imagetemplate" src="<%=Globals.ApplicationPath%>Thumbnail.ashx?width=35&height=35&ImgFilePath=<%=Globals.GetUploadsUrl()%><%# Eval("ImageURL")%>" />
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
                        <asp:Label ID="lblCateID" Text='<%#Eval("CategoryID")%>' runat="server"></asp:Label>                        
                    </ItemTemplate>
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

