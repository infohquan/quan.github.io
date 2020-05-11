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

public partial class CMS_Display_Templates_Articles_UtilControls_Index_EventArticleBox : System.Web.UI.UserControl
{
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
    private int _nTop;
    public int nTop
    {
        get { return _nTop; }
        set { _nTop = value; }
    }
    /// <summary>
    /// Chiều rộng image của tin số 1
    /// </summary>
    private int _imageWidthItem1;
    public int ImageWidthItem1
    {
        get { return _imageWidthItem1; }
        set { _imageWidthItem1 = value; }
    }
    /// <summary>
    /// Chiều cao image của tin số 1
    /// </summary>
    private int _imageHeightItem1;
    public int ImageHeightItem1
    {
        get { return _imageHeightItem1; }
        set { _imageHeightItem1 = value; }
    }
    #endregion
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //string Lang = Globals.GetLang();
            //LanguageXML langXml = new LanguageXML("Language" + Lang);
            //lblSubject.InnerText = langXml.GetString("Web", "Article", "HotNews");
        }
    }

    public void LoadData()
    {
        try
        {
            string Lang = Globals.GetLang();
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            MyTool.Article obj = new MyTool.Article();
            if (_isAgentCat)
                _agentCatID = Globals.AgentCatID;
            DataSet ds = obj.GetTopNewsEvent("Article", _agentCatID, _nTop, Lang, _contentType);
            string detailUrl0 = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, 0, "ArticleID") + "&CatID=" + DataObject.GetString(ds, 0, "CategoryID") + "&Lang=" + Lang;

            Response.Write("<div class=\"hotnews-no1\">");
            Response.Write("<div class=\"div_image\">");
            Response.Write("<a href=\"" + detailUrl0 + "\"");
            if (Globals.IsFileExistent(DataObject.GetString(ds, 0, "ImageURL")))
                Response.Write("<img width=\"" + _imageWidthItem1 + "\" height=\"" + _imageHeightItem1 + "\" src=\"Thumbnail.ashx?width=" + _imageWidthItem1 + "&height=" + _imageHeightItem1 + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, 0, "ImageURL") + "\" />");
            else
                Response.Write("<img width=\"" + _imageWidthItem1 + "\" height=\"" + _imageHeightItem1 + "\" src=\"" + Globals.DefaultImage + "\" />");

            Response.Write("</a>");
            Response.Write("</div>");
            Response.Write("<div class=\"div_excerpt\">");
            Response.Write("<a href=\"" + detailUrl0 + "\"><span class=\"hotnews-no1-title\">" + DataObject.GetString(ds, 0, "Title") + "</span></a>");
            Response.Write("<span class=\"hotnews-no1-excerpt\">" + DataObject.GetString(ds, 0, "Excerpt") + "</span>");
            Response.Write("</div>");
            Response.Write("<div style=\"float:right; padding-right:30px;\"><a class=\"view-more\" href=\"" + detailUrl0 + "\">" + langXml.GetString("Web", "Text", "ViewMore") + "</a></div>");
            Response.Write("<div class=\"clear\"></div>");
            Response.Write("<div class=\"seperator\"></div>");
            Response.Write("<div class=\"clear\"></div>");

            Response.Write("<div class=\"othernews\">");
            Response.Write("<span>" + langXml.GetString("Web", "Article", "OtherNews") + "</span>");
            for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
            {
                string detailUrl = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, i, "ArticleID") + "&CatID=" + DataObject.GetString(ds, i, "CategoryID") + "&Lang=" + Lang;
                Response.Write("<a href=\"" + detailUrl + "\">" + DataObject.GetString(ds, i, "Title") + "</a>");
            }
            Response.Write("</div>");

            Response.Write("</div>");
        }
        catch { }
    }
}
