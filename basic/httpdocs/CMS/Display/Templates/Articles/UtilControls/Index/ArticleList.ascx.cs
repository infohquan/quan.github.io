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

public partial class CMS_Display_Templates_Articles_UtilControls_Index_ArticleList : System.Web.UI.UserControl
{
    private int PageCount;
    private string Lang;
    #region "Properties"
    private string _controlCssClass;
    public string ControlCssClass
    {
        get { return _controlCssClass; }
        set { _controlCssClass = value; }
    }
    private int _agentCatID;
    public int AgentCatID
    {
        get { return _agentCatID; }
        set { _agentCatID = value; }
    }
    private bool _isAgentCat;
    /// <summary>
    /// true: AgentCatID là Globals.AgentCatID, false: user tự thêm vào AgentCatID
    /// </summary>
    public bool IsAgentCat
    {
        get { return _isAgentCat; }
        set { _isAgentCat = value; }
    }
    private string _contentType;
    public string ContentType
    {
        get { return _contentType; }
        set { _contentType = value; }
    }
    private string _subject;
    public string Subject
    {
        get { return _subject; }
        set { _subject = value; }
    }
    private int _pageSize;
    public int PageSize
    {
        get { return _pageSize; }
        set { _pageSize = value; }
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
        Lang = Globals.GetLang();
        string t = Globals.GetStringFromQueryString("t");
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        if (!IsPostBack)
        {
            ArticleCategory objCate = new ArticleCategory();
            int CatID = Globals.GetIntFromQueryString("CatID");
            string Text = Globals.GetStringFromQueryString("Text");
            if (CatID == -1)
            {
                if (Text != "")
                    lblSubject.InnerText = "Kết quả tìm kiếm";
                if (t == "news")
                    lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "News");
                else if (t == "agent")
                    lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "Agent");
                else if (t == "promotion")
                    lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "Promotion");
                else if (t == "service")
                    lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "Service");
                else if (t == "project")
                    lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "Project");
                else if (t == "showroom")
                    lblSubject.InnerText = "Hệ thống phân phối";
                else if (t == "job")
                    lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "Employment");
                else if (t == "text")
                    lblSubject.InnerText = "Văn bản";
                else if (t == "menu")
                    lblSubject.InnerText = "Thực đơn";
                else if (t == "medicine")
                    lblSubject.InnerText = "Y học - Nghiên cứu";
                else if (t == "music")
                    lblSubject.InnerText = "Âm nhạc";
                else if (t == "blog")
                    lblSubject.InnerText = "Khoảnh khắc";
                else if (t == "fun")
                    lblSubject.InnerText = "Góc giải trí";
                else if (t == "guestbook")
                    lblSubject.InnerText = "Lưu bút";
            }
            else //theo CatID
            {
                lblSubject.InnerText = objCate.GetCategoryNameByCategoryID(CatID, Lang);
            }
            Page.Title += " - " + lblSubject.InnerText;
            LoadListNews(t);
        }
    }

    private void LoadListNews(string t)
    {
        string html = "";
        MyTool.Article objNews = new MyTool.Article();
        int CatID = Globals.GetIntFromQueryString("CatID");
        string Text = Globals.GetStringFromQueryString("Text");
        string TypeSearch = Globals.GetStringFromQueryString("TypeSearch");
        DataSet ds = new DataSet();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        if (CatID == -1)
        {
            if (Text != "")
            {
                if (TypeSearch == "All")
                    ds = objNews.SearchArticleInAllContentType("Article", _agentCatID, Lang, Text);
                else
                    ds = objNews.SearchArticleByText("Article", _agentCatID, Lang, Text, t);
            }
            else
                ds = objNews.GetAllArticle("Article", _agentCatID, Lang, t);
        }
        else
            ds = objNews.GetArticleByCateID("Article", CatID, Lang, t);

        int TotalItems = ds.Tables[0].Rows.Count;
        if (TotalItems % PageSize == 0)
            PageCount = TotalItems / PageSize;
        else
            PageCount = TotalItems / PageSize + 1;

        Int32 Page = Globals.GetIntFromQueryString("Page");
        if (Page == -1) Page = 1;
        int FromRow = (Page - 1) * PageSize;
        int ToRow = Page * PageSize - 1;
        if (ToRow >= TotalItems)
            ToRow = TotalItems - 1;

        for (int i = FromRow; i <= ToRow; i++)
        {
            //string detailUrl = Globals.ApplicationPath + "cdg-detail/" + Lang + "/" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "/" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "/" + Globals.ConvertToVietnameseNotSignature(Convert.ToString(ds.Tables[0].Rows[i]["Title"])) + ".html";
            string detailUrl = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]) + "&CatID=" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + Lang;

            html += "<div class=\"div_item\">";
            html += "<div class=\"div_image\">";
            html += "<a href=\"" + detailUrl + "\">";
            if (Globals.IsFileExistent(Convert.ToString(ds.Tables[0].Rows[i]["ImageURL"])))
                html += "<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["ImageURL"]) + "\" />";
            else
                html += "<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"" + Globals.DefaultImage + "\" />";
            html += "</a>";
            html += "</div>";
            html += "<div class=\"div_excerpt\">";
            html += "<p><a class=\"item_title\" href=\"" + detailUrl + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["Title"]) + "</a>";
            //html += "<span class=\"item_postdate\">Thời gian</span>";
            html += "</p>";
            html += "<a class=\"item_excerpt\" href=\"" + detailUrl + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["Excerpt"]) + "</a>";
            html += "</div>";
            html += "</div>";
        }
        divContent.InnerHtml = html;
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
