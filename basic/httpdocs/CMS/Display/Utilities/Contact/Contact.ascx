<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Contact.ascx.cs" Inherits="CMS_Display_Utilities_Contact_Contact" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><span id="lblSubject" runat="server">Tin tức</span></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div class="contact_info">
            <span id="lblContactInfo" runat="server"></span>
        </div>
        <div style="padding:10px 10px 10px 20px">
            <asp:Label ID="lblMessage" runat="server" Font-Bold="True" Font-Size="13px" ForeColor="Blue" Text=""></asp:Label>
        </div>
      	<div class="contact_form">
            <div class="form_row">
                <label class="contact"><strong><%=langXml.GetString("Web", "Customer", "FullName")%></strong></label>
                <input id="txtFullName" type="text" class="contact_input" runat="server" />
            </div>  

            <div class="form_row">
                <label class="contact"><strong><%=langXml.GetString("Web", "Customer", "Address")%></strong></label>
                <input id="txtAddress" type="text" class="contact_input" runat="server" />
            </div>


            <div class="form_row">
                <label class="contact"><strong><%=langXml.GetString("Web", "Customer", "Email")%></strong></label>
                <input id="txtEmail" type="text" class="contact_input" runat="server" />
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtEmail" ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtEmail" ErrorMessage="*" SetFocusOnError="True" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
            </div>
            
            <div class="form_row">
                <label class="contact"><strong><%=langXml.GetString("Web", "Customer", "Tel")%></strong></label>
                <input id="txtTel" type="text" class="contact_input" runat="server" />
            </div>
            
            <div class="form_row">
                <label class="contact"><strong><%=langXml.GetString("Web", "Customer", "Title")%></strong></label>
                <input id="txtTitle" type="text" class="contact_input" style="width:300px" runat="server" />
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtTitle" ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator>
            </div>

            <div class="form_row">
                <label class="contact"><strong><%=langXml.GetString("Web", "Customer", "Content")%></strong></label>
                <textarea id="txtContent" class="contact_textarea" runat="server"></textarea>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txtContent" ErrorMessage="*" SetFocusOnError="True"></asp:RequiredFieldValidator>
            </div>
            
            <div class="form_row" style="text-align:center">
                <asp:Button ID="btnSend" runat="server" CssClass="button_action" Text="Gửi" OnClick="btnSend_Click" />
                <asp:Button ID="btnReset" runat="server" CssClass="button_action" Text="Nhập lại" OnClick="btnReset_Click" CausesValidation="False" />
            </div>
            
        </div>        
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
