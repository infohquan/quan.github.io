<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="VideoClip.aspx.cs" Inherits="WebAdmin_Others_VideoClip" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="VideoClipContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Video Clip</span></b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Video Clip</span></th>
			</tr>
            <tr class="bg">
                <td class="last" colspan="2" style="text-align:right">
                    <b><asp:HyperLink ID="linkAdd" Visible="false" Text="Thêm Video Clip mới" NavigateUrl="~/WebAdmin/Others/videoClip.aspx" runat="server"></asp:HyperLink></b>
                </td>
            </tr>
			<tr class="bg">
				<td class="first"><strong>Chọn ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server"></asp:DropDownList></td>
			</tr>
            <tr>
                <td class="first"><strong>Tiêu đề Video Clip</strong></td>
                <td class="last"><asp:TextBox ID="txtVideoName" runat="server" Width="450px"></asp:TextBox></td>
            </tr>
			<tr>
				<td class="first"><strong>Nhúng mã video (từ YouTube, Zing...)</strong></td>
				<td class="last">
				    <asp:HyperLink ID="linkVideo" Target="_blank" ToolTip="Xem Video Clip này!" ForeColor="Blue" Font-Size="12px" Visible="false" runat="server"></asp:HyperLink>
                    <FCKeditorV2:FCKeditor ID="txtVideoEmbedCode" runat="server" BasePath="~/FCKeditor/" Width="500px" Height="500px" ToolbarSet="Default"></FCKeditorV2:FCKeditor>
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
		<h1><b>Danh sách Video Clip</b></h1>
    </div>
    <div class="clearthis"></div>
    <div>Chọn ngôn ngữ: <asp:DropDownList ID="ddlLanguage2" runat="server" Enabled="true" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage2_SelectedIndexChanged" Width="138px"></asp:DropDownList></div>
    <div class="clearthis"></div>
    <div id="VideoClipList">
        <asp:GridView ID="gridViewVideo" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="30" OnPageIndexChanging="gridViewVideo_PageIndexChanging" OnRowDataBound="gridViewVideo_RowDataBound" OnRowDeleting="gridViewVideo_RowDeleting" OnRowEditing="gridViewVideo_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblVideoID" runat="server" Text='<%# Eval("VideoID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="H&#236;nh" Visible="False">
                    <ItemTemplate>
                        <img id="imgVideo" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%><%# Eval("VideoImage")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="T&#234;n video">
                    <ItemTemplate>
                        <asp:Label ID="lblVideoClipName" Text='<%# Eval("VideoName")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Lượt xem" Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblTotalViews" runat="server" Text='<%#Eval("TotalViews")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:CommandField HeaderText="Sửa" ButtonType="Image" EditImageUrl="~/WebAdmin/images/EDIT.GIF" ShowEditButton="True">
                    <HeaderStyle CssClass="headerGridView" />
                </asp:CommandField>
                
                <asp:CommandField HeaderText="X&#243;a" ButtonType="Image" DeleteImageUrl="~/WebAdmin/images/DELETE.GIF" ShowDeleteButton="True">
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

