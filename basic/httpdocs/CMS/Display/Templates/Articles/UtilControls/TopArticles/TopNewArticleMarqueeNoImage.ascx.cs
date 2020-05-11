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
using Khavi.Web.Data;
using Khavi.Provider;
using MyTool;

public partial class CMS_Display_Templates_Articles_UtilControls_TopArticles_TopNewArticleMarqueeNoImage : System.Web.UI.UserControl
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
    private string _imageCssClass;
    public string ImageCssClass
    {
        get { return _imageCssClass; }
        set { _imageCssClass = value; }
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
    private string _linkCssClass;
    public string LinkCssClass
    {
        get { return _linkCssClass; }
        set { _linkCssClass = value; }
    }
    private bool _isLinkViewAll;
    public bool IsLinkViewAll
    {
        get { return _isLinkViewAll; }
        set { _isLinkViewAll = value; }
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
        Article obj = new Article();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        string styleImg = "width: " + _imageWidth + ", height: " + _imageHeight;
        DataSet ds = obj.GetTopHotNews("Article", _agentCatID, _nTop, Lang, _contentType);

        html += "<marquee height=\"180\" scrollamount=\"2\" onmouseout=\"this.start();\" onmouseover=\"this.stop();\" direction=\"up\" behavior=\"scroll\">";
        html += "<table cellpadding=\"1\" cellspacing=\"1\" style=\"width:100%; padding:0 2px;\">";
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string detailUrl = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, i, "ArticleID") + "&CatID=" + DataObject.GetString(ds, i, "CategoryID") + "&Lang=" + Lang;
            html += "<tr>";
            /*html += "<td style=\"vertical-align:top\">";
            html += "<a href=\"" + detailUrl + "\">";
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "ImageURL")))
                html += "<img style=\"" + styleImg + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "ImageURL") + "\" />";
            else
                html += "<img style=\"" + styleImg + "\" src=\"" + Globals.DefaultImage + "\" />";
            html += "</a>";
            html += "</td>";*/
            html += "<td align=\"left\" valign=\"top\"><a href=\"" + detailUrl + "\">" + DataObject.GetString(ds, i, "Title") + "</a></td>";
            html += "</tr>";
        }
        html += "</table>";
        html += "</marquee>";
        divContent.InnerHtml = html;
    }
}
