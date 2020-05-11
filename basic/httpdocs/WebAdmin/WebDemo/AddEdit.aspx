<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="AddEdit.aspx.cs" Inherits="WebAdmin_WebDemo_AddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="WebDemoAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm WebDemo mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm WebDemo mới</span></th>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Thuộc Chuyên mục WebDemo</strong></td>
				<td class="last">
				    <asp:DropDownList ID="ddlCategory" Width="210px" runat="server"></asp:DropDownList>
				    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlCategory"
                        ErrorMessage="*" Operator="GreaterThan" SetFocusOnError="True" Type="Integer"
                        ValueToCompare="-1"></asp:CompareValidator>
				</td>
			</tr>
			<tr>
				<td class="first"><strong>Hình ảnh nhỏ (145 x ?)</strong></td>
				<td class="last">
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <img id="imgSmall" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadSmallImage" runat="server" /></td>
			</tr>
            <tr>
				<td class="first"><strong>Hình ảnh Layout lớn (435 x ?)</strong></td>
				<td class="last">
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <img id="imgLarge" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadLargeImage" runat="server" /></td>
			</tr>
			<tr>
			    <td class="first">Liên kết</td>
			    <td class="last"><input id="txtLink" type="text" runat="server" style="width:300px" /></td>
			</tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" runat="server" Text="Lưu & Tiếp tục" CssClass="button" OnClick="btnSaveContinue_Click" Width="110px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa WebDemo" CssClass="button" OnClick="btnDelete_Click" Width="110px" CausesValidation="False" />&nbsp;<%} %>
                </td>
			</tr>
		</table>
  </div>
</div>
</asp:Content>

