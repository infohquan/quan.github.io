<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Util.aspx.cs" Inherits="Util" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <% string type = Khavi.Web.Assistant.Globals.GetStringFromQueryString("type"); %>
    <div>
        <% if (type == "tygia") { %>
        <div style="padding:10px; font-weight:bold; font-size:16px; font-family:Arial;">Thông tin Ngoại tệ</div>
        <iframe scrolling="auto" height="275px" frameborder="0" width="100%" src="http://www.eximbank.com.vn/WebsiteExRate1/exchange_vietstock.aspx" marginheight="0" marginwidth="0"></iframe>
        <div style="padding:10px; font-weight:bold; font-size:16px; font-family:Arial;">Thông tin Tỷ giá vàng</div>
        <iframe scrolling="no" height="90px" frameborder="0" align="center" width="240px" src="http://www.eximbank.com.vn/WebsiteExRate1/gold_vdsc.aspx" marginheight="0" marginwidth="0"></iframe>
        <%} else if (type == "xoso") {%>
        <iframe title="ketqua" src="http://xoso.anhsaoxanh.net/load.html" width="570" height="550" frameborder="0" scrolling="no"></iframe>
        <%} else if (type == "thoitiet") {%>
        <iframe scrolling="auto" height="375px" frameborder="0" width="100%" src="WeatherInfo.aspx" marginheight="0" marginwidth="0"></iframe>
        <%} %>
    </div>
    </form>
</body>
</html>
