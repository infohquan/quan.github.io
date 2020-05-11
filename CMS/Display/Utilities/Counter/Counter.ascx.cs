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

public partial class CMS_Display_Utilities_Counter_Counter : System.Web.UI.UserControl
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
        OtherFunctions objF = new OtherFunctions();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;

        html += "<div>";
        html += "<b class=\"counter_label\">" + langXml.GetString("Web", "Text", "Visitors") + "</b>";
        html += "<b class=\"counter_value\">" + objF.GetVisitors("AgentCat", _agentCatID) + "</b>";
        html += "</div>";
        html += "<div>";
        html += "<b class=\"counter_label\">" + langXml.GetString("Web", "Text", "OnlineNow") + "</b>";
        html += "<b class=\"counter_value\">" + Application["OnlineUsers"].ToString() + "</b>";
        html += "</div>";
        divContent.InnerHtml = html;
    }
}
