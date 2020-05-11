<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CustomerPage.ascx.cs" Inherits="CMS_Display_Utilities_Customer_CustomerPage" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><%//=LanguageXML.GetValue(Globals.GetLang(), "Web", "MenuTop", "AboutUs")%></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div class="customer-page-title"></div>
        <%this.LoadCustomer();%>
        <div class="clear"></div>
        <div style="padding:10px 0 10px 20px;"><%this.DisplayHtmlStringPaging(); %></div>        
        <div class="clear"></div>
        <div class="customer-page-bottom"></div>
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
