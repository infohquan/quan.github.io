<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="DemoList.aspx.cs" Inherits="WebAdmin_WebDemo_DemoList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<asp:Content ID="DemoListContent" ContentPlaceHolderID="MainContent" Runat="Server">
    <div id="center-column">
	    <div class="top-bar">
		    <h1>Danh sách WebDemo</h1>
	    </div><br />
      <div class="select-bar">
	    <div class="table">
            <asp:GridView ID="gridViewDemoList" runat="server" AllowPaging="True" AllowSorting="True"
                AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
                 PageSize="30" OnPageIndexChanging="gridViewDemoList_PageIndexChanging" OnRowDataBound="gridViewDemoList_RowDataBound" OnRowDeleting="gridViewDemoList_RowDeleting" OnRowEditing="gridViewDemoList_RowEditing">
                <PagerSettings Mode="NumericFirstLast" />
                <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
                <HeaderStyle CssClass="headerGridView" />
                <Columns>
                    <asp:TemplateField Visible="False">
                        <ItemTemplate>
                            <asp:Label ID="lblID" runat="server" Text='<%# Eval("ID")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="Hình">
                        <ItemTemplate>
                            <img id="img" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%>ImageFiles/WebDemos/<%# Eval("SmallImage")%>" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="Ngày tạo">
                        <ItemTemplate>
                            <asp:Label ID="lblDateAdd" runat="server" Text='<%#Eval("CreationDate")%>'></asp:Label>
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

