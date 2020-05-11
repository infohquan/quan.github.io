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
using Khavi.Provider;
using Khavi.Web.Assistant;
using Khavi.Web.Data;

public partial class ArticleDetail : System.Web.UI.Page
//public partial class ArticleDetail : BasePage
{
    public LanguageXML langXml;
    protected void Page_Load(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        langXml = new LanguageXML("Language" + Lang);
        if (!IsPostBack)
            LoadData();
    }

    private void LoadData()
    {
        try
        {
            /*string Lang = Globals.GetLang();
            int ID = Globals.GetIntFromQueryString("ID");
            int CatID = Globals.GetIntFromQueryString("CatID");
            MyTool.Article obj = new MyTool.Article();
            ArticleCategory objC = new ArticleCategory();
            DataSet ds = obj.GetArticleByArticleID("Article", ID, Lang);
            lblSubject.InnerText = objC.GetCategoryNameByCategoryID(CatID, Lang);
            Page.Title += " - " + Convert.ToString(ds.Tables[0].Rows[0]["Title"]);
            lblTitle.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Title"]);
            lblExcerpt.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Excerpt"]);
            lblContent.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["Content"]);
            lblPostDate.InnerText = Globals.GetStringDateTime(Lang, Convert.ToDateTime(Convert.ToString(ds.Tables[0].Rows[0]["PostDate"])));
            lblAuthors.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Authors"]);
            string ImageURL = Convert.ToString(ds.Tables[0].Rows[0]["ImageURL"]);
            if (Globals.IsFileExistent(ImageURL))
                img.Src = "Thumbnail.ashx?width=160&height=140&ImgFilePath=" + Globals.GetUploadsUrl() + ImageURL;
            else
                div_img_article.Attributes.Add("style", "display:none;");*/
        }
        catch { }
    }
    public void LoadOtherList()
    {
        try
        {
            MyTool.Article obj = new MyTool.Article();
            string Lang = Globals.GetLang();
            int ID = Globals.GetIntFromQueryString("ID");
            int CatID = Globals.GetIntFromQueryString("CatID");
            DataSet ds = obj.GetArticleByCateID("Article", CatID, ID, Lang);
            string subject = "";
            string t = DataObject.GetString(ds, 0, "ContentType");
            if (t == "news")
                subject = "Các tin tức khác";
            else if (t == "agent")
                subject = "Các tin tức khác";
            else if (t == "promotion")
                subject = "Các tin tức khác";
            else if (t == "service")
                subject = "Các dịch vụ khác";
            else if (t == "showroom")
                subject = "Hệ thống phân phối";
            else if (t == "job")
                subject = "Các tuyển dụng khác";
            else if (t == "text")
                subject = "Các văn bản khác";
            if (ds.Tables[0].Rows.Count > 0)
            {
                Response.Write("<div class=\"wrapper-box\">");
                //Response.Write("<div class=\"top\"><h3><span>" + subject + "</span></h3></div>");
                Response.Write("<div class=\"top\"></div>");
                Response.Write("<div class=\"content\">");
                Response.Write("<h3><span>" + subject + "</span></h3>");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    string detailUrl = "ArticleDetail.aspx?ID=" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "&CatID=" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "&t=" + t + "&Lang=" + Lang;
                    Response.Write("<a class=\"other_item\" href=\"" + detailUrl + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["Title"]) + "</a>");
                }
                Response.Write("</div>");
                Response.Write("<div class=\"bottom\"></div>");
                Response.Write("</div>");
            }
        }
        catch { }
    }
}
