<%@ Page Language="C#" MasterPageFile="~/WebAdmin/MasterPage.master" AutoEventWireup="true" CodeFile="Footer.aspx.cs" Inherits="WebAdmin_Others_Footer" %>
<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>

<asp:Content ID="FooterContent" ContentPlaceHolderID="MainContent" Runat="Server">
    <table>
        <tr>
            <td>
                Chọn ngôn ngữ: <asp:DropDownList ID="ddlLanguage" Width="170px" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged"></asp:DropDownList>
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="lblMessage" Font-Bold="true" ForeColor="red" runat="server" Visible="false"></asp:Label>
            </td>
        </tr>
        <tr>
            <td>
                <b id="lblSubject" runat="server">Nhập nội dung footer của website:</b>
            </td>
        </tr>
        <tr>
            <td><FCKeditorV2:FCKeditor ID="fckContent" runat="server" BasePath="~/FCKeditor/" Width="560px" Height="540px"></FCKeditorV2:FCKeditor></td>
        </tr>
        <tr>
            <td>
                <asp:Button ID="btnSave" runat="server" Text="Lưu" CssClass="button" OnClick="btnSave_Click" Width="100px" />
            </td>
        </tr>
        
    </table>
</asp:Content>

