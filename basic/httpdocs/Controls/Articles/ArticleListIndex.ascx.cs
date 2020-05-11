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

public partial class Controls_Articles_ArticleListIndex : System.Web.UI.UserControl
{
    private int PageCount;
    public bool f;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.RawUrl.ToLower().Contains("default.aspx"))
            f = true;
        else
            f = false;
        if (!IsPostBack)
        {
            string Lang = Globals.GetLang();
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            lblSubject.InnerText = langXml.GetString("Web", "Text", "TopHotService");
        }
    }
    public void LoadCycleArticle(string t)
    {
        int i = 0;
        string Lang = Globals.GetLang();
        MyTool.Article obj = new MyTool.Article();
        DataSet ds = obj.GetTopHotNews("Article", Globals.AgentCatID, 10, Lang, t);
        int half = ds.Tables[0].Rows.Count / 2;
        string detailUrl = "";
        Response.Write("<div>");
        for (i = 0; i < half; i++)
        {
            detailUrl = "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, i, "ArticleID") + "&CatID=" + DataObject.GetString(ds, i, "CategoryID") + "&Lang=" + Lang;
            Response.Write("<a class=\"article-item\" href=\"" + detailUrl + "\">");
            Response.Write("<span title=\"" + DataObject.GetString(ds, i, "Title") + "\">" + DataObject.GetString(ds, i, "Title") + "</span>");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "ImageURL")))
                Response.Write("<img src=\"Thumbnail.ashx?width=140&height=160&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "ImageURL") + "\" />");
            else
                Response.Write("<img src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("</a>");
        }
        Response.Write("</div>");
        /////
        Response.Write("<div>");
        for (i = half; i < ds.Tables[0].Rows.Count; i++)
        {
            detailUrl = "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, i, "ArticleID") + "&CatID=" + DataObject.GetString(ds, i, "CategoryID") + "&Lang=" + Lang;
            Response.Write("<a class=\"article-item\" href=\"" + detailUrl + "\">");
            Response.Write("<span title=\"" + DataObject.GetString(ds, i, "Title") + "\">" + DataObject.GetString(ds, i, "Title") + "</span>");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "ImageURL")))
                Response.Write("<img src=\"Thumbnail.ashx?width=140&height=160&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "ImageURL") + "\" />");
            else
                Response.Write("<img src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("</a>");
        }
        Response.Write("</div>");
    }

    public void LoadData()
    {
        int PageSize = 8;
        string Lang = Globals.GetLang();
        string t = "service";
        MyTool.Article obj = new MyTool.Article();
        DataSet ds = obj.GetAllArticle("Article", Globals.AgentCatID, Lang, t);

        int TotalNews = ds.Tables[0].Rows.Count;
        if (TotalNews % PageSize == 0)
            PageCount = TotalNews / PageSize;
        else
            PageCount = TotalNews / PageSize + 1;

        Int32 Page = Globals.GetIntFromQueryString("Page");
        if (Page == -1) Page = 1;
        int FromRow = (Page - 1) * PageSize;
        int ToRow = Page * PageSize - 1;
        if (ToRow >= TotalNews)
            ToRow = TotalNews - 1;

        for (int i = FromRow; i <= ToRow; i++)
        {
            string detailUrl = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, i, "ArticleID") + "&CatID=" + DataObject.GetString(ds, i, "CategoryID") + "&Lang=" + Lang;
            Response.Write("<div class=\"list-services-item\">");
            Response.Write("<a class=\"service-name\" href=\"" + detailUrl + "\">" + DataObject.GetString(ds, i, "Title") + "</a>");
            Response.Write("<div class=\"image\">");
            Response.Write("<a href=\"" + detailUrl + "\">");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "ImageURL")))
                Response.Write("<img class=\"img-service-item\" src=\"Thumbnail.ashx?width=104&height=94&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "ImageURL") + "\" />");
            else
                Response.Write("<img class=\"img-service-item\" src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("<a class=\"link-detail\" href=\"" + detailUrl + "\">Chi tiết</a>");
            Response.Write("</div>");
            Response.Write("</div>");
        }
    }

    /// <summary>
    /// Hiển thị chuỗi phân trang
    /// </summary>
    protected void DisplayHtmlStringPaging()
    {
        string Lang = Globals.GetLang();
        Int32 CurrentPage = Globals.GetIntFromQueryString("Page");
        if (CurrentPage == -1) CurrentPage = 1;
        LanguageXML myLangXml = new LanguageXML("Language" + Lang);

        string[] strText = new string[4] {  myLangXml.GetString("Web", "Paging", "First"), 
                                            myLangXml.GetString("Web", "Paging", "Previous"),
                                            myLangXml.GetString("Web", "Paging", "Next"),
                                            myLangXml.GetString("Web", "Paging", "Last")};
        if (PageCount > 1)
            Response.Write(Globals.GetHtmlPagingAdvanced(6, CurrentPage, PageCount, Context.Request.RawUrl, strText));
    }
}
