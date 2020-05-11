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

public partial class CMS_Display_Templates_Articles_Default_AboutUsDetail : System.Web.UI.UserControl
{
    #region "Properties"
    private string _controlCssClass;
    public string ControlCssClass
    {
        get { return _controlCssClass; }
        set { _controlCssClass = value; }
    }
    private int _imageWidth;
    public int ImageWidth
    {
        get { return _imageWidth; }
        set { _imageWidth = value; }
    }
    private int _imageHeight;
    public int ImageHeight
    {
        get { return _imageHeight; }
        set { _imageHeight = value; }
    }
    #endregion
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

            MyTool.AboutUs obj = new MyTool.AboutUs();
            DataSet ds = new DataSet();
            if (ID == -1)
            {
                ID = obj.GetFirstAboutUsID(Globals.AgentCatID, Lang);
                //Response.Redirect("AboutUs.aspx?ID=" + ID + "&Lang=" + Lang);
            }
            //else
            //{
                ds = obj.GetAboutUsByArticleID("Article", ID, Lang);
                Page.Title += " - " + Convert.ToString(ds.Tables[0].Rows[0]["Title"]);
                lblTitle.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Title"]);
                //lblExcerpt.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Excerpt"]);
                lblContent.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["Content"]);
                //lblPostDate.InnerText = Globals.GetStringDateTime(Lang, Convert.ToDateTime(Convert.ToString(ds.Tables[0].Rows[0]["PostDate"])));
                lblAuthors.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Authors"]);
                string ImageURL = Convert.ToString(ds.Tables[0].Rows[0]["ImageURL"]);
                if (Globals.IsFileExistent(ImageURL))
                {
                    img.Width = _imageWidth;
                    img.Height = _imageHeight;
                    img.Src = Globals.GetUploadsUrl() + ImageURL;
                }
                else
                    div_img_article.Attributes.Add("style", "display:none;");
            //}
        }
        catch { }
    }

    public void LoadOtherList()
    {
        try
        {
            MyTool.AboutUs obj = new MyTool.AboutUs();
            string Lang = Globals.GetLang();
            int ID = Globals.GetIntFromQueryString("ID");
            if (ID == -1)
                ID = obj.GetFirstAboutUsID(Globals.AgentCatID, Lang);
            DataSet ds = obj.GetOtherAboutUs("Article", Globals.AgentCatID, ID, Lang);

            if (ds.Tables[0].Rows.Count > 0)
            {
                Response.Write("<div class=\"vbox " + _controlCssClass + " " + this.ID + "\">");
                Response.Write("<div class=\"vbox-top\">");
                Response.Write("<div class=\"vbox-top-left\">");
                Response.Write("<div class=\"vbox-top-right\">");
                Response.Write("<div class=\"vbox-top-center\"></div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("<div class=\"vbox-middle\">");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    //string detailUrl = "AboutUs.aspx?ID=" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "&Lang=" + Lang;
                    string detailUrl = "thiet-ke-web,cong-ty-thiet-ke-web-" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "-" + Lang + ".html";
                    Response.Write("<a class=\"other_item\" href=\"" + detailUrl + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["Title"]) + "</a>");
                }
                Response.Write("</div>");
                Response.Write("<div class=\"vbox-bottom\">");
                Response.Write("<div class=\"vbox-bottom-left\">");
                Response.Write("<div class=\"vbox-bottom-right\">");
                Response.Write("<div class=\"vbox-bottom-center\"></div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("</div>");
            }
        }
        catch { }
    }
}
