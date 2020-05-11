<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="BsmList.aspx.cs" Inherits="WebAdmin_BSM_BsmList"%>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="fBSMList" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><span id="lblTitle1" runat="server">Danh sách Đại lý website</span></h1>
	</div><br />
  <div class="select-bar">    
    <table class="listing form" cellpadding="0" cellspacing="0" style="display:none">
		<tr>
			<td class="first" style="width:172px;"><strong>Chọn ngôn ngữ:</strong></td>
			<td class="last">
			    <asp:DropDownList ID="ddlLanguage" Width="170px" runat="server">
                </asp:DropDownList>
            </td>
		</tr>
		<tr class="bg">
			<td class="first"><strong>Chọn Ngành nghề:</strong></td>
			<td class="last"><asp:DropDownList ID="ddlFaculty" Width="240px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlFaculty_SelectedIndexChanged"></asp:DropDownList></td>
		</tr>
		<tr class="bg">
			<td class="first"><strong>Chọn Tỉnh/Thành phố:</strong></td>
			<td class="last"><asp:DropDownList ID="ddlProvince" Width="240px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlProvince_SelectedIndexChanged"></asp:DropDownList></td>
		</tr>
    </table>
	<div class="table">
        <asp:GridView ID="gridViewAgentCat" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
            OnRowEditing="gridViewAgentCat_RowEditing" OnPageIndexChanging="gridViewAgentCat_PageIndexChanging" 
            OnRowDeleting="gridViewAgentCat_RowDeleting" OnRowDataBound="gridViewAgentCat_RowDataBound" PageSize="30">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField HeaderText="Mã đại lý (AgentCatID)">
                    <ItemTemplate>
                        <asp:Label ID="lblID" Font-Bold="true" Font-Size="14px" runat="server" Text='<%# Eval("ID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Logo" Visible="false">
                    <ItemTemplate>
                        <img id="imgLogo" alt="" class="imagetemplate" src="<%=Globals.ApplicationPath%>Thumbnail.ashx?width=35&height=35&ImgFilePath=<%=Globals.GetUploadsUrl()%><%# Eval("Logo")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên doanh nghiệp">
                    <ItemTemplate>
                        <asp:Label ID="lblAgentName" runat="server" Text='<%# Eval("AgentNameVI")%>'></asp:Label>                      
                    </ItemTemplate>                    
                    <HeaderStyle Width="380px" />
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày tham gia">
                    <ItemTemplate>
                        <asp:Label ID="lblCreationDate" Text='<%#Eval("CreationDate")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên truy cập" Visible="false">
                    <ItemTemplate>
                        <asp:Label ID="lblAgentUsername" Text='<%#Eval("AgentUsername")%>' runat="server"></asp:Label>                        
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:CommandField HeaderText="Xem" ButtonType="Image" EditImageUrl="~/WebAdmin/images/edit.gif" ShowEditButton="True">
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

