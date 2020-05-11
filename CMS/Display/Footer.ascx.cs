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
using Khavi.Provider;
using MyTool;

public partial class CMS_Display_Footer : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            string Lang = Globals.GetLang();
            if (!IsPostBack)
            {
                OtherFunctions obj = new OtherFunctions();
                DataSet ds = obj.GetFooterWebsite("AgentCat", Globals.AgentCatID, Lang);
                lblFooterInfo.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["FooterWebsite" + Lang]);
            }
        }
        catch { }
    }
}
