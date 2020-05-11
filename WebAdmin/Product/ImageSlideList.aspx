<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ImageSlideList.aspx.cs" Inherits="WebAdmin_Product_ImageSlideList" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ImageSlideListContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
	<div class="top-bar">
		<h1><b>Danh sách ảnh slide sản phẩm</b></h1>
	</div><br />
	<div class="clearthis"></div>
	<div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2">Danh sách ảnh slide sản phẩm</th>
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
				<td class="last"><asp:DropDownList ID="ddlProduct" Width="350px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlProduct_SelectedIndexChanged"></asp:DropDownList>
                    <asp:CompareValidator ID="CompareValidator2" runat="server" ControlToValidate="ddlProduct"
                        ErrorMessage="*" Operator="GreaterThan" SetFocusOnError="True" Type="Integer"
                        ValueToCompare="-1"></asp:CompareValidator></td>
			</tr>
		</table>
    </div>
  
    <div class="clearthis"></div>
    <div style="text-align:center;">
		<asp:DataList ID="DataListPhoto" OnItemCommand="ProcessPhoto" RepeatColumns="5" runat="server">
            <ItemTemplate>
                <asp:Label ID="lblProductImageID" Text='<%# Eval("ProductImageID")%>' Visible="false" runat="server"></asp:Label>
                <img id="imgThumbnail" onclick="javascript:ViewImage('ctl00_MainContent_imgLarg','<%=Globals.GetUploadsUrl()%><%# Eval("ProductImageURL")%>')" style="width:120px; height:120px; cursor:pointer;" alt="" src="<%=Globals.GetUploadsUrl()%><%# Eval("ProductImageURL")%>" />
                <div style="text-align:center; margin-top:6px;"> 
                    <a href="javascript:ViewImage('ctl00_MainContent_imgLarg','<%=Globals.GetUploadsUrl()%><%# Eval("ProductImageURL")%>')" class="linkview">Xem</a>&nbsp;&nbsp;&nbsp;
                    <asp:Button ID="btnDeleteImage" CommandName="DeleteImage" Text="Xóa" runat="server" />
                </div>
            </ItemTemplate>
        </asp:DataList>
	</div>
	<div style="text-align:center; margin-top:10px;">
	    <img id="imgLarg" style="display:none;" alt="" src="" runat="server" />
	</div>
</div>
</asp:Content>

