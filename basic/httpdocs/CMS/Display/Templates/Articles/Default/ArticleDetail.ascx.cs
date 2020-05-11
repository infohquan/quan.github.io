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

public partial class CMS_Display_Templates_Articles_Default_ArticleDetail : System.Web.UI.UserControl
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
            {
                img.Width = _imageWidth;
                img.Height = _imageHeight;
                img.Src = Globals.ApplicationPath + "Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + ImageURL;
            }
            else
            {
                div_img_article.Attributes.Add("style", "display:none;");
                divDetailSumary.Attributes.Add("style", "width:90%;");
            }
        }
        catch 
        {
            //Response.Redirect(Globals.ApplicationPath);
        }
    }
    public void LoadOtherList()
    {
        try
        {
            MyTool.Article obj = new MyTool.Article();
            string Lang = Globals.GetLang();
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            int ID = Globals.GetIntFromQueryString("ID");
            int CatID = Globals.GetIntFromQueryString("CatID");
            DataSet ds = obj.GetArticleByCateID("Article", CatID, ID, Lang);
            string subject = langXml.GetString("Web", "Text", "RelatedArticles");
            string t = DataObject.GetString(ds, 0, "ContentType");
            /*if (t == "news")
                subject = langXml.GetString("Web", "Article", "OtherNews");
            else if (t == "agent")
                subject = langXml.GetString("Web", "Article", "OtherNews");
            else if (t == "promotion")
                subject = "Các tin tức khác";
            else if (t == "service")
                subject = "Các dịch vụ khác";
            else if (t == "showroom")
                subject = "Hệ thống phân phối";
            else if (t == "job")
                subject = "Các tuyển dụng khác";
            else if (t == "text")
                subject = "Các văn bản khác";*/
            if (ds.Tables[0].Rows.Count > 0)
            {
                Response.Write("<div class=\"vbox " + _controlCssClass + " " + this.ID + "\">");
                Response.Write("<div class=\"vbox-top\">");
                Response.Write("<div class=\"vbox-top-left\">");
                Response.Write("<div class=\"vbox-top-right\">");
                Response.Write("<div class=\"vbox-top-center\"><h3>" + subject + "</h3></div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("<div class=\"vbox-middle\">");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    string detailUrl = "ArticleDetail.aspx?ID=" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "&CatID=" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "&t=" + t + "&Lang=" + Lang;
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
