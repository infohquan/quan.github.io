<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Advertisement.aspx.cs" Inherits="WebAdmin_Others_Advertisement" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="AdvertisementContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm quảng cáo mới</span></b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm quảng cáo mới</span></th>
			</tr>
			<tr><td colspan="2" style="text-align:right"><b><asp:HyperLink ID="linkAdd" Visible="false" Text="Thêm quảng cáo mới" NavigateUrl="~/WebAdmin/Others/Advertisement.aspx" runat="server"></asp:HyperLink></b></td></tr>
			<tr class="bg">
				<td class="first" style="width:172px"><strong>Tiêu đề</strong></td>
				<td class="last"><input id="txtLinkName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtLinkName"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<%if (t != "weblink") {%>
			<tr>
				<td class="first"><strong>Hình ảnh / Flash</strong></td>
				<td class="last">
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <!--<img id="ImageLink" alt="" src="" runat="server" style="vertical-align:middle;" />-->
                    <asp:HyperLink ID="link" runat="server"></asp:HyperLink>
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" />
                </td>
			</tr>
			<tr>
				<td class="first"><strong>Định dạng</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLogoType" runat="server">
                    <asp:ListItem Value="image">H&#236;nh ảnh</asp:ListItem>
                    <asp:ListItem Value="flash">Flash</asp:ListItem>
                </asp:DropDownList></td>
			</tr>
			<tr>
                <td class="first"><strong>Vị trí</strong></td>
                <td class="last"><asp:DropDownList ID="ddlPosition" runat="server">
                    <asp:ListItem Value="left">Banner cột tr&#225;i (194 x ?)</asp:ListItem>
                    <asp:ListItem Value="right">Banner cột phải (194 x ?)</asp:ListItem>
                    <asp:ListItem Value="topbanner">Banner top (240 x 70)</asp:ListItem>
                    <asp:ListItem Value="bottombanner">Banner bottom (200 x 70)</asp:ListItem>
                </asp:DropDownList></td>
            </tr>
            <tr>
                <td class="first"><strong>Hiển thị</strong></td>
                <td class="last"><asp:DropDownList ID="ddlTarget" runat="server">
                    <asp:ListItem Value="_blank">Hiển thị trang mới</asp:ListItem>
                    <asp:ListItem Value="_self">Hiển thị trong cùng trang</asp:ListItem>
                </asp:DropDownList></td>
            </tr>
            <tr>
				<td class="first"><strong>Chiều rộng (Flash)</strong></td>
				<td class="last"><input id="txtWidth" type="text" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Chiều cao (Flash)</strong></td>
				<td class="last"><input id="txtHeight" type="text" class="text" runat="server" /></td>
			</tr>
			<%} %>
            
			<tr class="bg">
				<td class="first"><strong>Liên kết</strong></td>
				<td class="last"><input id="txtLinkWeb" type="text" class="text" runat="server" />
				    <strong>Ví dụ: www.google.com.vn, google.com.vn ( không cần ghi "http://" )</strong>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtLinkWeb"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
				    <asp:Button ID="btnDelete" runat="server" Text="Xóa" CssClass="button" OnClick="btnDelete_Click" ToolTip="Xóa quảng cáo này" CausesValidation="False" />
				    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
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
    <div id="AdList" class="top-bar">
		<h1><b>Danh sách quảng cáo</b></h1>
    </div>
    <table class="listing form" cellpadding="0" cellspacing="0">
		<tr class="bg">
			<td class="first"><strong>Vị trí banner:</strong></td>
			<td class="last">
			    <asp:DropDownList ID="ddlPosition2" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlPosition2_SelectedIndexChanged">
                    <asp:ListItem Value="all" Selected="True">Tất cả</asp:ListItem>
                    <asp:ListItem Value="left">Banner cột trái</asp:ListItem>
                    <asp:ListItem Value="right">Banner cột phải</asp:ListItem>
                    <asp:ListItem Value="topbanner">Banner top</asp:ListItem>
                    <asp:ListItem Value="bottombanner">Banner bottom</asp:ListItem>
                </asp:DropDownList>
			</td>
		</tr>
    </table>
    <div class="clearthis"></div>
    <div>
        <asp:GridView ID="gridViewLink" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="30" OnPageIndexChanging="gridViewLink_PageIndexChanging" OnRowDataBound="gridViewLink_RowDataBound" OnRowDeleting="gridViewLink_RowDeleting" OnRowEditing="gridViewLink_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblLinkID" runat="server" Text='<%# Eval("ID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Logo">
                    <ItemTemplate>
                        <img id="imgLink" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%><%# Eval("Logo")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tiêu đề">
                    <ItemTemplate>
                        <asp:Label ID="lblLinkName" Text='<%# Eval("LinkName")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Liên kết web">
                    <ItemTemplate>
                        <asp:Label ID="lblLink" runat="server" Text='<%#Eval("Link")%>'></asp:Label>
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
