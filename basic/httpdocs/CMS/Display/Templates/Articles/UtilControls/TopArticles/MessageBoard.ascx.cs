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

public partial class CMS_Display_Templates_Articles_UtilControls_TopArticles_MessageBoard : System.Web.UI.UserControl
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
        DataSet ds = obj.GetTopNewArticle("Article", _agentCatID, _nTop, Lang, "message");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string detailUrl = Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + DataObject.GetString(ds, i, "ArticleID") + "&CatID=" + DataObject.GetString(ds, i, "CategoryID") + "&Lang=" + Lang;
            //string detailUrl = Globals.ApplicationPath + "thongbao/" + Lang + "/" + DataObject.GetString(ds, i, "ArticleID") + "/" + DataObject.GetString(ds, i, "CategoryID") + "/" + Globals.ConvertToVietnameseNotSignature(DataObject.GetString(ds, i, "Title")) + ".html";
            html += "<a href=\"" + detailUrl + "\">" + DataObject.GetString(ds, i, "Title") + "</a>";
        }
        divContent.InnerHtml = html;
    }
}
