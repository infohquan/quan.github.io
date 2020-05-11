<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="ArticleAddEdit.aspx.cs" Inherits="WebAdmin_SpecialArticle_ArticleAddEdit" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Register Assembly="FUA" Namespace="Subgurim.Controles" TagPrefix="FUA" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="ArticleAddEditContent" ContentPlaceHolderID="MainContent" Runat="Server">
<div id="center-column">
    <div class="top-bar">
		<h1>Danh sách Bài viết</h1>
	</div><br />
  <div class="select-bar">    
    <table class="listing form" cellpadding="0" cellspacing="0">
		<tr>
			<td class="first" style="width:172px;"><strong>Chọn ngôn ngữ:</strong></td>
			<td class="last">
			    <asp:DropDownList ID="ddlLanguageToView" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguageToView_SelectedIndexChanged">
                </asp:DropDownList>
            </td>
		</tr>
    </table>
	
	<div class="table">
        <asp:GridView ID="gridViewArticle" runat="server" AllowPaging="True" AllowSorting="True"
            AutoGenerateColumns="False" CellPadding="3" GridLines="Horizontal" Width="100%" 
            OnRowEditing="gridViewArticle_RowEditing" OnPageIndexChanging="gridViewArticle_PageIndexChanging" 
            OnRowDeleting="gridViewArticle_RowDeleting" OnRowDataBound="gridViewArticle_RowDataBound" PageSize="30">
            <PagerSettings Mode="NumericFirstLast" />
            <RowStyle HorizontalAlign="Center" Height="40px" CssClass="bgRowOfGridView" />
            <HeaderStyle CssClass="headerGridView" />
            <Columns>
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblArticleID" runat="server" Text='<%# Eval("ArticleID")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Hình">
                    <ItemTemplate>
                        <img id="imgArticle" alt="" class="imagetemplate" src="<%=Globals.GetUploadsUrl()%><%# Eval("ImageURL")%>" />
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Tiêu đề">
                    <ItemTemplate>
                        <asp:Label ID="lblTitle" runat="server" Text='<%# Eval("Title")%>'></asp:Label>                      
                    </ItemTemplate>                    
                    <HeaderStyle Width="380px" />
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Ngày">
                    <ItemTemplate>
                        <asp:Label ID="lblPostDate" Text='<%#Eval("PostDate")%>' runat="server"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField Visible="False">
                    <ItemTemplate>
                        <asp:Label ID="lblCateID" Text='<%#Eval("CategoryID")%>' runat="server"></asp:Label>                        
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:CommandField HeaderText="Sửa" ButtonType="Image" EditImageUrl="~/WebAdmin/images/edit.gif" ShowEditButton="True">
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

	<div id="add_special_article" class="top-bar">
		<h1><b><span id="lblTitle1" runat="server">Thêm bài viết mới</span></b></h1>
	</div><br />
	
    <div class="table">
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-left.gif" width="8" height="7" alt="" class="left" />
		<img src="<%=Globals.GetAdminImagesUrl()%>bg-th-right.gif" width="7" height="7" alt="" class="right" />
		<table class="listing form" cellpadding="0" cellspacing="0">
			<tr>
				<th class="full" colspan="2"><span id="lblTitle2" runat="server">Thêm Tin tức mới</span></th>
			</tr>
			<tr>
				<td class="first" style="width:172px;"><strong>Ngôn ngữ</strong></td>
				<td class="last"><asp:DropDownList ID="ddlLanguage" Width="170px" runat="server"></asp:DropDownList></td>
			</tr>
			<tr style="display:none;">
				<td class="first"><strong>Là Tiêu điểm?</strong></td>
				<td class="last"><asp:RadioButtonList ID="rblViewIndex" runat="server" RepeatDirection="Horizontal">
                    <asp:ListItem Selected="True" Value="1">C&#243;</asp:ListItem>
                    <asp:ListItem Value="0">Kh&#244;ng</asp:ListItem>
                </asp:RadioButtonList></td>
			</tr>
			
			<tr class="bg">
				<td class="first">
				    <%if (SpecType == "faq") {%>
				    <strong>Câu hỏi</strong>
				    <%} else  {%>
				    <strong>Tiêu đề</strong>
				    <%} %>
				</td>
				<td class="last">
				    <textarea id="txtTitle" class="text" runat="server" style="width: 445px; height:90px;" ></textarea>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtTitle"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<%if (SpecType != "faq") {%>
			<tr>
				<td class="first"><strong>Trích đoạn</strong></td>
				<td class="last"><textarea id="txtExcerpt" rows="2" cols="20" style="width: 450px; height: 100px" runat="server"></textarea>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtExcerpt"
                        ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
			</tr>
			<%} %>
			<tr class="bg">
				<td class="first">
				    <%if (SpecType == "faq") {%>
				    <strong>Trả lời</strong>
				    <%} else  {%>
				    <strong>Nội dung chính</strong>
				    <%} %>
				</td>
				<td class="last"><FCKeditorV2:FCKeditor ID="fckContent" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="540px"></FCKeditorV2:FCKeditor></td>
			</tr>
			<%if (SpecType != "faq") {%>
			<tr>
				<td class="first"><strong>Hình ảnh</strong></td>
				<td class="last">
				    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <img id="ImageArticle" alt="" src="<%=Globals.GetAdminImagesUrl()%>noimage.gif" runat="server" style="vertical-align:middle;" />
                    <%} %>
                    <FUA:FileUploaderAJAX ID="fileUploadImage" runat="server" /></td>
			</tr>
            <tr class="bg">
                <td class="first">
                    <strong>Mô tả cho hình ảnh</strong></td>
                <td class="last">
                    <input id="txtImageDesc" type="text" class="text" runat="server" /></td>
            </tr>
            <tr>
                <td class="first">
                    <strong>Tác giả</strong></td>
                <td class="last">
                    <input id="txtAuthor" type="text" class="text" runat="server" /></td>
            </tr>
			<tr class="bg">
				<td class="first"><strong>Từ khóa</strong></td>
				<td class="last"><textarea id="txtKeyword" rows="2" cols="20" style="width: 450px; height: 70px" runat="server"></textarea></td>
			</tr>
            <tr>
                <td class="first"><strong>Là tin HOT:</strong></td>
                <td class="last"><asp:CheckBox ID="cbHotArticle" runat="server" Text="Check chọn nếu là Tin HOT!" Checked="True" /></td>
            </tr>
            <%} %>
			<tr class="bg">
				<td class="first"></td>
				<td class="last">
				    <asp:Button ID="btnSave" runat="server" Text="Lưu & Đóng" CssClass="button" OnClick="btnSave_Click" Width="100px" />
                    <%if (Globals.GetStringFromQueryString("Action") == "") {%>
                    <asp:Button ID="btnSaveContinue" Visible="false" runat="server" Text="Lưu & Tiếp tục" CssClass="button" OnClick="btnSaveContinue_Click" Width="110px" />
                    <%} %>
                    <%if (Globals.GetStringFromQueryString("Action") == "Edit") {%>
                    <asp:Button ID="btnDelete" runat="server" Text="Xóa bài viết" CssClass="button" OnClick="btnDelete_Click" Width="110px" CausesValidation="False" />
                    <%} %>
				    <asp:Button ID="btnReset" runat="server" Text="Nhập lại" CssClass="button" OnClick="btnReset_Click" CausesValidation="False" />
				</td>
			</tr>
		</table>

  </div>
</div>
</asp:Content>



