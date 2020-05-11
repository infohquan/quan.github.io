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
using MyTool;
using Khavi.Web.Assistant;
using Khavi.Web.Data;
using Khavi.Provider;

public partial class CMS_Display_Templates_Articles_Default_AboutUsBox : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            LoadData();
    }
    private void LoadData()
    {
        try
        {
            string Lang = Globals.GetLang();
            MyTool.AboutUs obj = new MyTool.AboutUs();
            int ID = obj.GetFirstAboutUsID(Globals.AgentCatID, Lang);
            DataSet ds = obj.GetAboutUsByArticleID("Article", ID, Lang);
            lblAbout.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["Content"]);
        }
        catch { }
    }
}
