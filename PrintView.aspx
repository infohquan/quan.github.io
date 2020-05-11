<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PrintView.aspx.cs" Inherits="PrintView" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Print View</title>
    <style type="text/css">
        body { font-family:Arial; font-size:12px; }
        .title { font-size:20px; font-weight:bold; padding:5px 0; }
        .content { font-family:Arial; }
        .clear { clear:both; }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div style="width:800px; margin:auto;">
        <!--<div><img alt="logo" src="images/logo.jpg" /></div>-->
        <div><span id="lblPostDate" runat="server">01/02/2010</span></div>
        <div><span id="lblTitle" class="title" runat="Server">Title</span></div>
        <div style="padding-top:5px; float:left;">
            <div style="float:left; width:200px;"><img id="img" alt="" src="" style="width:190px;" runat="server" /></div>
            <div style="float:left; width:600px;"><span id="lblExcerpt" runat="server">Excerpt</span></div>
        </div>
        <div class="clear"></div>
        <div style="float:left; padding-top:5px;"><span id="lblContent" class="content" runat="server">Content</span></div>
        <div class="clear"></div>
        <div><span id="lblAuthors" style="font-weight:bold" runat="server">Authors</span></div>
        <div class="clear"></div>
        <div style="padding:5px 0;"><a href="javascript:window.print()"><img alt="print" src="common/images/btn-print.gif" style="border:0px;" /></a></div>				
        <div class="clear"></div>
	    <hr />
	    Copyright © 2010
    </div>
    </form>
</body>
</html>
