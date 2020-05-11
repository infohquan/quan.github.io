<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="checkdomain.aspx.cs" Inherits="checkdomain" %>

<asp:Content ContentPlaceHolderID="MainContent" Runat="Server">
<div class="vbox abox checkdomainresult">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <h2>Kết quả kiểm tra tên miền</h2>
        <table cellspacing="0" cellpadding="0" width="100%" class="tblResult"> 
            <%this.CheckDomainResults();%>
            <tr style="display:none">
                <td width="100%" class="It" id="cdg.vn" name="cdg.vn">
                    <table cellspacing="0" cellpadding="3" border="0" width="100%">
                        <tr>
                            <td style="display:none" align="center" width="5%"><input type="checkbox" value="cdg.vn|giahan" id="Domain" name="Domain"></td>
                            <td width="30%"><span class="DM">cdg.vn </span> </td>
                            <td align="center" width="5%"><img src="images/fa.gif" width="20" height="20"></td>
                            <td><a onclick="OpenWin('cdg.vn',this);" class="viewinfo" target="_blank"> Xem thông tin</a></td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr style="display:none">
                <td width="100%" class="It" id="agoodweb.vn" name="agoodweb.vn">
                    <table cellspacing="0" cellpadding="3" border="0" width="100%" style="background-color:#F4F4F4;">
                        <tr>
                            <td style="display:none" align="center" width="5%"><input type="checkbox" value="agoodweb.vn|dangky" id="Domain" name="Domain"></td>
                            <td width="30%"><span class="DM_On">agoodweb.vn </span> </td>
                            <td align="center" width="5%"><img src="images/apply.gif" width="20" height="20"></td>
                            <td><a href="Contact.aspx?t=contact&d=agoodweb.vn" class="reg" target="_blank"> Chưa ai đăng ký. Đăng ký ngay!</a></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
</asp:Content>