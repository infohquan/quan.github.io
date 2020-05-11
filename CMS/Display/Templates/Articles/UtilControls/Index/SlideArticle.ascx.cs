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

public partial class CMS_Display_Templates_Articles_UtilControls_Index_SlideArticle : System.Web.UI.UserControl
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
        string html = "";
        string Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        MyTool.Article obj = new MyTool.Article();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        DataSet ds = obj.GetTopHotNews("Article", _agentCatID, _nTop, Lang, _contentType);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            html += "<div id=\"news" + Convert.ToString(i + 1) + "\" class='news_style' rel=\" " + DataObject.GetString(ds, i, "Title") + "\">";            
            html +="<table class='mytable'>";
            html +="<tr>";
            html +="<td>";
            string detailUrl = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, i, "ArticleID") + "&CatID=" + DataObject.GetString(ds, i, "CategoryID") + "&Lang=" + Lang;
            html +="<a href=\"" + detailUrl + "\">";
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "ImageURL")))
                html += "<img align=\"left\" width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "ImageURL") + "\" />";
            else
                html += "<img align=\"left\" width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"" + Globals.DefaultImage + "\" />";
            
            html +="<span class=\"title\">" + DataObject.GetString(ds, i, "Title") + "</span><br />";
            html += DataObject.GetString(ds, i, "Excerpt");
            html +="</a>";
            html +="</td>";
            html +="</tr>";              
            html +="</table>";
            html +="</div>";
        }
        divListNews.InnerHtml = html;
    }
}
