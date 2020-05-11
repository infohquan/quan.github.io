<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CustomerHorizontalMarquee.ascx.cs" Inherits="CMS_Display_Utilities_Customer_CustomerHorizontalMarquee" %>
  
    <div class="jv-footerbox-br">
        <div class="jv-footerbox-bl">
  <div  class="customers" style="background:#ffffff">        
           <div class="content" >
        <marquee scrollamount="4" onmouseout="this.start();" onmouseover="this.stop();" direction="left" behavior="scroll">
            <!--<a href="#"><img alt="" src="images/imgitem.png" /></a>-->
            <%this.LoadData();%>
        </marquee>
    </div>
</div>
        </div>
    </div>