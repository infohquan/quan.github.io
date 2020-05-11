<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ProductAddEdit.aspx.cs" Inherits="WebAdmin_Product_ProductAddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ProductAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm Sản phẩm mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Sản phẩm mới</span></th>
			</tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Thuộc Nhóm sản phẩm</strong></td>
				<td class="last"><asp:DropDownList ID="ddlCatalog" Width="210px" runat="server" ></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="ddlCatalog"
                        ErrorMessage="*" Operator="GreaterThan" SetFocusOnError="True" Type="Integer"
                        ValueToCompare="0"></asp:CompareValidator></td>
			</tr>
            <tr class="bg" style="display:none">
                <td class="first">
                    <strong>Nhà sản xuất</strong></td>
                <td class="last">
                    <asp:DropDownList ID="ddlProducer" Width="210px" runat="server" >
                    </asp:DropDownList>
                </td>
            </tr>
			<tr>
				<td class="first"><strong>Tên sản phẩm</strong></td>
				<td class="last"><input id="txtProductName" type="text" class="text" runat="server" style="width: 520px" value="" />
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtProductName"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<tr class="bg" style="display:none;">
				<td class="first"><strong>Mã sản phẩm</strong></td>
				<td class="last"><input id="txtProductCode" type="text" class="text" runat="server" /></td>
			</tr>
			<tr style="display:;">
				<td class="first"><strong>Giá bán</strong></td>
				<td class="last"><input id="txtPrice" title="Nhập số nguyên" type="text" class="text" runat="server" style="width: 95px" />
				    <strong>Nhập số nguyên, Ví dụ: 100000</strong></td>
			</tr>
            
			<tr class="bg" style="display:none;">
				<td class="first"><strong>Giá khuyến mãi</strong></td>
				<td class="last" valign="middle">
                    <br />
                    <input id="txtPriceAfterSaleOff" type="text" class="text" runat="server" style="width: 95px" />
                    &nbsp; &nbsp; &nbsp;&nbsp; -
                    <b>Nếu có khuyến mãi, nhập giá khuyến mãi nhỏ hơn giá bán!<br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -
                    Nếu không khuyến mãi, không nhập hoặc nhập bằng giá bán!</b></td>
			</tr>
			<tr style="display:">
				<td class="first"><strong>Tiền tệ</strong></td>
				<td class="last">
                    <input id="txtCurrency" type="text" value="VND" class="text" runat="server" style="width: 95px" />
				    <span style="display:none;">Giá bán và Giá khuyến mãi phải cùng ngoại tệ</span>
				</td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Mô tả ngắn</strong></td>
				<td class="last">
				    <FCKeditorV2:FCKeditor ID="txtExcerpt" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="350px"></FCKeditorV2:FCKeditor>    
                </td>
			</tr>
			<tr>
				<td class="first"><strong>Mô tả chi tiết</strong></td>
				<td class="last"><FCKeditorV2:FCKeditor ID="fckProductDesc" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="400px"></FCKeditorV2:FCKeditor></td>
			</tr>
			<tr class="bg">
				<td class="first"><strong>Hình ảnh</strong></td>
				<td class="last">
                    <%if (Convert.ToString(Request.QueryString["Action"]) == "Edit") {%>
                    <img id="ImageProduct" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />&nbsp;
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" />
                    </td>
			</tr>
			<!--<tr id="selectcolor">
				<td class="first"><strong>Màu sắc</strong></td>
				<td class="last">
				    <div id="list_ddlColor"><asp:CheckBoxList ID="cblColor" runat="server" RepeatDirection="Horizontal" RepeatColumns="8"></asp:CheckBoxList>&nbsp;</div>
				</td>
			</tr>
			<tr id="selectsize" class="bg">
				<td class="first"><strong>Size</strong></td>
				<td class="last">
				    <div id="list_ddlSize">
				        <asp:CheckBoxList ID="cblSize" runat="server" RepeatDirection="Horizontal" RepeatColumns="8"></asp:CheckBoxList>				        
				    </div>
				</td>
			</tr>
			<tr id="selectwidth">
				<td class="first"><strong>Độ rộng Sản phẩm</strong></td>
				<td class="last">
				    <div id="list_ddlWidth">
				        <asp:CheckBoxList ID="cblWidth" runat="server" RepeatDirection="Horizontal" RepeatColumns="8"></asp:CheckBoxList>
				    </div>
				</td>
			</tr>-->
            <tr class="bg">
                <td class="first">
                    <strong style="color:Red; font-size:12px;">Sản phẩm là:</strong></td>
                <td class="last" style="font-size:12px; font-weight:bold;">
                    <asp:CheckBox ID="cbIsNew" Visible="false" runat="server" BackColor="#80FF80" Checked="True" Text="Sản phẩm mới" />&nbsp;
                    <asp:CheckBox ID="cbIsHot" runat="server" BackColor="#FFC080" Checked="True" Text="Sản phẩm nổi bật(HOT)" />
                    <asp:CheckBox ID="cbIsBestSeller" Visible="false" runat="server" BackColor="#FFC0C0" Checked="True" Text="Sản phẩm bán chạy" /></td>
            </tr>
            <tr style="display:none">
				<td class="first"><strong>Từ khóa</strong></td>
				<td class="last"><textarea id="txtKeyword" rows="2" cols="20" style="width: 522px; height: 70px" runat="server"></textarea></td>
			</tr>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" runat="server" Text="Lưu & Tiếp tục" CssClass="button" OnClick="btnSaveContinue_Click" Width="110px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa sản phẩm" CssClass="button" OnClick="btnDelete_Click" Width="110px" />
                    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" />
                </td>
			</tr>
		</table>
  </div>
</div>
</asp:Content>

