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
using MyTool;

public partial class Controls_Articles_AboutUsDefault : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                string Lang = Globals.GetLang();
                AboutUs obj = new AboutUs();
                int AboutUsID = obj.GetFirstAboutUsID(Globals.AgentCatID, Lang);
                DataSet ds = obj.GetAboutUsByArticleID("Article", AboutUsID, Lang);
                lblAboutUs.InnerHtml = DataObject.GetString(ds, 0, "Content");
            }
        }
        catch { }
    }
}
