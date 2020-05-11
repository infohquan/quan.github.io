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
using Khavi.Web.Data;
using Khavi.Provider;
using MyTool;

public partial class CMS_Display_Utilities_Advertisement_WebLinks : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    public void LoadWebLinks()
    {
        Link obj = new Link();
        DataSet ds = obj.GetAllLink("AgentLink", Globals.AgentCatID, "weblink");
        string link = "";
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            link = Convert.ToString(ds.Tables[0].Rows[i]["Link"]);
            if (link.Contains("http://") == false)
                Response.Write("<option value=\"http://" + link + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["LinkName"]) + "</option>");
            else
                Response.Write("<option value=\"" + link + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["LinkName"]) + "</option>");
        }
    }
}
