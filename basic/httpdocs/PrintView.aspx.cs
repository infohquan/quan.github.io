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

public partial class PrintView : System.Web.UI.Page
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
            int ID = Globals.GetIntFromQueryString("ID");

            MyTool.Article obj = new MyTool.Article();
            DataSet ds = obj.GetArticleByArticleID("Article", ID, Lang);
            lblTitle.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Title"]);
            lblExcerpt.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Excerpt"]);
            lblContent.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["Content"]);
            lblPostDate.InnerText = Globals.GetStringDateTime(Lang, Convert.ToDateTime(Convert.ToString(ds.Tables[0].Rows[0]["PostDate"])));
            lblAuthors.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Authors"]);
            if (Globals.IsFileExistent(Convert.ToString(ds.Tables[0].Rows[0]["ImageURL"])))
                img.Src = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["ImageURL"]);
            else
                img.Src = Globals.DefaultImage;
        }
        catch { }
    }
}
