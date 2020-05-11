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

public partial class checkdomainresult : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    public void LoadData()
    {
        string d = Globals.GetStringFromQueryString("d");
        string e = Globals.GetStringFromQueryString("e");
        string url = "http://www.matbao.net/Domain.ashx?d=" + d + "&e=" + e;
        string text = Globals.GetHtmlFromUrl(url);
        Response.Write(text);
    }
}
