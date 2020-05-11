using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Khavi.Web.Assistant;

public partial class checkdomain : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    public void CheckDomainResults()
    {
        string f = "";
        string d = Globals.GetStringFromQueryString("d");
        string ext = Globals.GetStringFromQueryString("ext");
        
        string[] extArray = new string[31] { 
                                ".com", ".biz", ".net", ".info", ".mobi", ".org", ".tel",
                                ".asia", ".com.tw", ".eu", ".cc", ".net.tw", ".us", ".tw",
                                ".org.tw", ".me", ".tv", ".ws", ".vn", ".com.vn", ".biz.vn",
                                ".edu.vn", ".gov.vn", ".net.vn", ".org.vn", ".int.vn", ".ac.vn",
                                ".pro.vn", ".info.vn", ".health.vn", ".name.vn" };
        if (ext != "All")
            extArray = new string[1] { ext };
        for (int i = 0; i < extArray.Length; i++)
        {
            string fulldomainname = d + extArray[i];
            Response.Write("<tr>");
            Response.Write("<td width='100%' class='It' id='" + fulldomainname + "' name='" + fulldomainname + "'>");
            //jscript
            /*Response.Write("<script language='javascript' text='text/javascript'>");
            Response.Write("GetContent('" + fulldomainname + "', '" + extArray[i] + "', document.getElementById('" + fulldomainname + "'));");
            Response.Write("</script>");*/
            //
            string url = "http://www.matbao.net/Domain.ashx?d=" + fulldomainname + "&e=" + extArray[i];
            string text = Globals.GetHtmlFromUrl(url);
            //MessageBox.Show(url + "---" + text);
            if (text == "False")
            {
                f = "";
                f += "<table cellspacing='0' cellpadding='3' border='0' width='100%' style='background-color:#F4F4F4;'>";
                f += "<tr>";
                f += "<td style='display:none' align='center' width='5%'><input type='checkbox' value='agoodweb.vn|dangky' id='Domain' name='Domain'></td>";
                f += "<td width='30%'><span class='DM_On'>" + fulldomainname + " </span> </td>";
                f += "<td align='center' width='5%'><img src='images/apply.gif' width='20' height='20'></td>";
                f += "<td><a href='Contact.aspx?t=contact&d=" + fulldomainname + "' class='reg' target='_blank'> Chưa ai đăng ký. Đăng ký ngay!</a></td>";
                f += "</tr>";
                f += "</table>";
            }
            else if (text == "True")
            {
                f = "";
                f += "<table cellspacing='0' cellpadding='3' border='0' width='100%'>";
                f += "<tr>";
                f += "<td style='display:none' align='center' width='5%'><input type='checkbox' value='cdg.vn|dangky' id='Domain' name='Domain'></td>";
                f += "<td width='30%'><span class='DM'>" + fulldomainname + " </span> </td>";
                f += "<td align='center' width='5%'><img src='images/fa.gif' width='20' height='20'></td>";
                f += "<td><a onclick='OpenWin('" + fulldomainname + "',this);' class='viewinfo' target='_blank'> Xem thông tin</a></td>";
                f += "</tr>";
                f += "</table>";
            }
            //
            Response.Write(f);
            Response.Write("</td>");
            Response.Write("</tr>");
        }
    }

    public void CheckDomainResults2()
    {
        //http://www.matbao.net/Domain.ashx?d=agoodweb.com&e=.com
        string Domain = Globals.GetStringFromQueryString("Domain");
        string ext = Globals.GetStringFromQueryString("ext");
        string urlCheckDomain = "";
        bool f = false;
        string[] extArray = new string[31] { 
                                ".com", ".biz", ".net", ".info", ".mobi", ".org", ".tel",
                                ".asia", ".com.tw", ".eu", ".cc", ".net.tw", ".us", ".tw",
                                ".org.tw", ".me", ".tv", ".ws", ".vn", ".com.vn", ".biz.vn",
                                ".edu.vn", ".gov.vn", ".net.vn", ".org.vn", ".int.vn", ".ac.vn",
                                ".pro.vn", ".info.vn", ".health.vn", ".name.vn" };
        if (ext != "All")
            extArray = new string[1] { ext };
        Response.Write("<table class=\"tbldomain\" cellpadding=\"0\" cellspacing=\"0\">");

        for (int i = 0; i < extArray.Length; i++)
        {
            urlCheckDomain = "http://www.matbao.net/Domain.ashx?d=" + Domain + extArray[i] + "&e=" + extArray[i];
            f = Convert.ToBoolean(Globals.GetHtmlFromUrl(urlCheckDomain));
            if (f) //domain đã được đăng ký
            {
                Response.Write("<tr class=\"trWhite\">");
                Response.Write("<td class=\"td2\" style=\"width:35%;\"><span style=\"color:Gray\">" + Domain + extArray[i] + "</span></td>");
                Response.Write("<td class=\"td1\" style=\"width:5%;\" align=\"center\"><img src=\"images/already.gif\" /></td>");
                Response.Write("<td class=\"td2\"><a onclick=\"DisplayWhois('" + Domain + extArray[i] + "');\" class=\"info\" target=\"_blank\">Xem thông tin</a></td>");
                Response.Write("</tr>");
            }
            else
            {
                Response.Write("<tr>");
                Response.Write("<td class=\"td2\" style=\"width:35%;\"><span style=\"color:Black\">" + Domain + extArray[i] + "</span></td>");
                Response.Write("<td class=\"td1\" style=\"width:5%;\" align=\"center\"><img src=\"images/ok.gif\" /></td>");
                Response.Write("<td class=\"td2\">Chưa có ai đăng ký. <a class=\"reg\" href=\"Contact.aspx?t=contact&Lang=" + Globals.GetLang() + "\">Đăng ký ngay!</a></td>");
                Response.Write("</tr>");
            }
        }
        /*if (ext == "All")
        {
            
        }
        else
        {
            urlCheckDomain += Domain + ext + "&e=." + ext;
            Response.Write(Globals.GetHtmlFromUrl(urlCheckDomain));
        }*/
        Response.Write("</table>");
    }
}
