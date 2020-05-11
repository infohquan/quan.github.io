<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Partner.aspx.cs" Inherits="WebAdmin_Others_Partner" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="PartnerContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm đối tác mới</span></b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm đối tác mới</span></th>
			</tr>
			<tr class="bg">
				<td class="first" style="width:172px;"><strong>Tên đối tác</strong></td>
				<td class="last"><input id="txtPartnerName" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtPartnerName"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
            <tr>
                <td class="first">
                    <strong>Thông tin mô tả</strong></td>
                <td class="last">
                    <textarea id="txtPartnerDescription" rows="2" cols="10" style="width: 445px; height: 150px" runat="server"></textarea></td>
            </tr>
			<tr>
				<td class="first"><strong>Địa chỉ</strong></td>
				<td class="last"><input id="txtPartnerAddress" type="text" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Điện thoại</strong></td>
				<td class="last"><input id="txtPartnerTel" type="text" class="text" runat="server" /></td>
			</tr>
            <tr class="bg">
                <td class="first">
                    <strong>Fax</strong></td>
                <td class="last">
                    <input id="txtPartnerFax" type="text" class="text" runat="server" /></td>
            </tr>
			<tr class="bg">
				<td class="first"><strong>Email</strong></td>
				<td class="last"><input id="txtPartnerEmail" type="text" class="text" runat="server" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtPartnerEmail"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtPartnerEmail"
                        ErrorMessage="*" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Website</strong></td>
				<td class="last"><input id="txtPartnerWebsite" type="text" class="text" runat="server" /></td>
			</tr>
			<tr>
				<td class="first"><strong>Logo</strong></td>
				<td class="last">
				    <%if (Convert.ToString(Request.QueryString["Action"]) == "Edit") {%>
                    <img id="ImagePartner" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" /></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Ngày thêm</strong></td>
				<td class="last"><input id="txtDateAdd" type="text" class="text" runat="server" disabled="disabled" /></td>
			</tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa đối tác" CssClass="button" OnClick="btnDelete_Click" Width="110px" CausesValidation="False" />
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
    <div class="top-bar">
		<h1><b>Danh sách đối tác</b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="PartnerList">
        <asp:GridView ID="gridViewPartner" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="30" OnPageIndexChanging="gridViewPartner_PageIndexChanging" OnRowDataBound="gridViewPartner_RowDataBound" OnRowDeleting="gridViewPartner_RowDeleting" OnRowEditing="gridViewPartner_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblPartnerID" runat="server" Text='<%# Eval("PartnerID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Hình">
                    <ItemTemplate>
                        <img id="imgPartner" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%>ImageFiles/Partners/<%# Eval("PartnerLogo")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tên đối tác">
                    <ItemTemplate>
                        <asp:Label ID="lblPartnerName" Text='<%# Eval("PartnerName")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Địa chỉ">
                    <ItemTemplate>
                        <asp:Label ID="lblPartnerAddress" runat="server" Text='<%#Eval("PartnerAddress")%>'></asp:Label>
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

