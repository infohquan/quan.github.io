<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ImageSlideAdd.aspx.cs" Inherits="WebAdmin_Product_ImageSlideAdd" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ImageSlideAddContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b>Thêm hình ảnh slide sản phẩm</b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2">Thêm hình ảnh slide sản phẩm</th>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Chọn ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList></td>
			</tr>
			<tr>
				<td class="first"><strong>Chọn nhóm sản phẩm</strong></td>
				<td class="last"><asp:DropDownList ID="ddlCatalog" Width="200px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlCatalog_SelectedIndexChanged"></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlCatalog"
                        ErrorMessage="*" Operator="GreaterThan" SetFocusOnError="True" Type="Integer"
                        ValueToCompare="-1"></asp:CompareValidator></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Chọn sản phẩm</strong></td>
				<td class="last"><asp:DropDownList ID="ddlProduct" Width="350px" runat="server"></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator2" runat="server" ControlToValidate="ddlProduct"
                        ErrorMessage="*" Operator="GreaterThan" SetFocusOnError="True" Type="Integer"
                        ValueToCompare="-1"></asp:CompareValidator></td>
			</tr>
			<tr>
				<td class="first" rowspan="5"><strong>Chọn hình ảnh</strong></td>
				<td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage0" runat="server" />
				</td>
			</tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage1" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage2" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage3" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="last">
				    <FUA:FileUploaderAJAX ID="fileUploadImage4" runat="server" />
                </td>
            </tr>
			<tr>
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" />&nbsp;
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
</div>
</asp:Content>

