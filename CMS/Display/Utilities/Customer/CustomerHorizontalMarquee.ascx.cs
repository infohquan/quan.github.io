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
using Khavi.Web.UIHelper;
using Khavi.Provider;
using Khavi.Web.Data;
using MyTool;

public partial class CMS_Display_Utilities_Customer_CustomerHorizontalMarquee : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    public void LoadData()
    {
        Customer obj = new Customer();
        DataSet ds = obj.GetAllCustomer("Customer", Globals.AgentCatID);
        string html = "";
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string link = DataObject.GetString(ds, i, "CustomerWebsite");
            string linkname = DataObject.GetString(ds, i, "CustomerFullName");
            if (link == "" || link == "#")
                html += "<a href=\"javascript:;\">";
            else
            {
                if (link.Contains("http://") == false)
                    html += "<a target=\"_blank\" href=\"http://" + link + "\">";
                else if (link.Contains("http://") == true)
                    html += "<a target=\"_blank\" href=\"" + link + "\">";
            }
            //<a href="#"><img alt="" src="images/imgitem.png" /></a>
            html += "<img src=\"" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "CustomerLogo") + "\" alt=\"" + linkname + "\" title=\"" + linkname + "\" width='150' height='170' />";
            html += "</a>";
        }
        Response.Write(html);
    }

}
