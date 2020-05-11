<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="FileDownload.aspx.cs" Inherits="WebAdmin_Others_FileDownload" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<asp:Content ID="FileDownloadContent" ContentPlaceHolderID="MainContent" Runat="Server">
    <div id="center-column">
	<div class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm File download</span></b></h1>
	</div><br />
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm File download</span></th>
			</tr>
			<tr style="display:none">
				<td class="first"><strong>Chọn nhóm</strong></td>
				<td class="last"><asp:DropDownList ID="ddlSupportGroup" runat="server" Width="170px"></asp:DropDownList>
                    <!--<asp:CompareValidator ID="CompareValidator1" runat="server"
                        ErrorMessage="*" SetFocusOnError="True" Type="Integer" ValueToCompare="0" ControlToValidate="ddlSupportGroup" Operator="GreaterThan">
                    </asp:CompareValidator>--></td>
			</tr>
            <tr>
                <td class="first">
                    <strong>Tiêu đề</strong></td>
                <td class="last">
                    <asp:TextBox ID="txtFileTitle" runat="server" Width="343px"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="*"
                        SetFocusOnError="True" ControlToValidate="txtFileTitle"></asp:RequiredFieldValidator></td>
            </tr>
			<tr>
				<td class="first"><strong>File</strong></td>
				<td class="last">
				    <FUA:FileUploaderAJAX ID="fileUpload" runat="server" />
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
				    <asp:HyperLink id="linkFileName" runat="server"></asp:HyperLink>
				    <%} %>
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
		<h1><b>Danh sách File download</b></h1>
    </div>
    <div class="clearthis"></div>
    <div id="SupportOnlineList">
        <asp:GridView ID="gridViewFileDownload" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
             PageSize="30" OnPageIndexChanging="gridViewFileDownload_PageIndexChanging" OnRowDataBound="gridViewFileDownload_RowDataBound" OnRowDeleting="gridViewFileDownload_RowDeleting" OnRowEditing="gridViewFileDownload_RowEditing">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblID" runat="server" Text='<%# Eval("ID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tiêu đề">
                    <ItemTemplate>
                        <asp:Label ID="lblFileTitle" Text='<%# Eval("FileTitle")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày tạo">
                    <ItemTemplate>
                        <asp:Label ID="lblDatePost" Text='<%# Eval("DatePost")%>' runat="server"></asp:Label>
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

