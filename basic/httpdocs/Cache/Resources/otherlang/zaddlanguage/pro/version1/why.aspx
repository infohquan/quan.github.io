<%@ Page Language="C#" AutoEventWireup="true" CodeFile="why.aspx.cs" Inherits="CMS_Display_Utilities_Menu_MenuPro_cdgcontrol_item_why" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <center>
            <asp:DropDownList ID="ddlAgentCat" runat="server"></asp:DropDownList><br />
            AgentCatID: <asp:Label ID="lblAgentCatID" runat="server"></asp:Label><br />
            <asp:TextBox ID="txtTableName" runat="server" Text="Article" Width="200px"></asp:TextBox>(Article, ProductCat, AgentCat...)<br />
            <asp:DropDownList ID="ddlChoice" runat="server">
                <asp:ListItem Text="Lệnh SELECT" Value="SELECT"></asp:ListItem>
                <asp:ListItem Text="Lệnh DELETE" Value="DELETE"></asp:ListItem>
            </asp:DropDownList><br />
            <asp:TextBox ID="txtSql" runat="server" Height="200px" TextMode="MultiLine" Width="600px"></asp:TextBox><br />
            <asp:Button ID="btnAction" runat="server" Text="Action" OnClick="btnAction_Click" /><br />
            
            <span>
                Ex:<br />
                Delete From Article Where AgentCatID=1<br />
                Delete From ProductCat Where AgentCatID=1
            </span>
        </center>
    </div>
    </form>
</body>
</html>
