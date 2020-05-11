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

public partial class WebAdmin_MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["Username"] == null)
            Response.Redirect(Globals.GetAdminFolderUrl() + "Login.aspx");
        lblUsername.InnerText = Convert.ToString(Session["Username"]);
    }
    protected void linkLogout_Click(object sender, EventArgs e)
    {
        Session.Remove("Username");
        Response.Redirect(Globals.GetAdminFolderUrl() + "Login.aspx");
    }
}
