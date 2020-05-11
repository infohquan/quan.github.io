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
using Khavi.Provider;

public partial class ArticleList : System.Web.UI.Page
{
    private int PageSize = 10;
    private int PageCount;
    private string Lang;
    private string t;
    protected void Page_Load(object sender, EventArgs e)
    {
        Lang = Globals.GetLang();
        t = Globals.GetStringFromQueryString("t");
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        if (!IsPostBack)
        { }
    }
    public void LoadListNews()
    {
        MyTool.Article objNews = new MyTool.Article();
        int CatID = Globals.GetIntFromQueryString("CatID");
        string Text = Globals.GetStringFromQueryString("Text");
        string TypeSearch = Globals.GetStringFromQueryString("TypeSearch");
        DataSet ds = new DataSet();
        if (CatID == -1)
        {
            if (Text != "")
            {
                if (TypeSearch == "All")
                    ds = objNews.SearchArticleInAllContentType("Article", Globals.AgentCatID, Lang, Text);
                else
                    ds = objNews.SearchArticleByText("Article", Globals.AgentCatID, Lang, Text, t);
            }
            else
                ds = objNews.GetAllArticle("Article", Globals.AgentCatID, Lang, t);
        }
        else
            ds = objNews.GetArticleByCateID("Article", CatID, Lang, t);
        
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
            //string detailUrl = Globals.ApplicationPath + "cdg-detail/" + Lang + "/" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "/" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "/" + Globals.ConvertToVietnameseNotSignature(Convert.ToString(ds.Tables[0].Rows[i]["Title"])) + ".html";
            string detailUrl = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "&CatID=" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + Lang;

            Response.Write("<div class=\"div_item\">");
            Response.Write("<div class=\"div_image\">");
            Response.Write("<a href=\"" + detailUrl + "\">");
            if (Globals.IsFileExistent(Convert.ToString(ds.Tables[0].Rows[i]["ImageURL"])))
                Response.Write("<img class=\"imgnewslist\" src=\"Thumbnail.ashx?width=100&height=85&ImgFilePath=" + Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["ImageURL"]) + "\" />");
            else
                Response.Write("<img class=\"imgnewslist\" src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("</a>");
            Response.Write("</div>");
            Response.Write("<div class=\"div_excerpt\">");
            Response.Write("<p><a class=\"item_title\" href=\"" + detailUrl + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["Title"]) + "</a>");
            //Response.Write("<span class=\"item_postdate\">Thời gian</span>");
            Response.Write("</p>");
            Response.Write("<a class=\"item_excerpt\" href=\"" + detailUrl + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["Excerpt"]) + "</a>");
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
