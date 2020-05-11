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

public partial class CMS_Display_Utilities_SupportOnline_SupportOnline : System.Web.UI.UserControl
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
    /// <summary>
    /// true: Icon là image của website, khi đó phải nhập thêm url image icon (yahoo, skype)
    /// false: Icon là image của Yahoo hoặc Skype
    /// </summary>
    private bool _isYourIcon;
    public bool IsYourIcon
    {
        get { return _isYourIcon; }
        set { _isYourIcon = value; }
    }
    /// <summary>
    /// Số (1 - 20) biểu thị cho loại hình icon của Yahoo hoặc Skype, Dùng khi IsYourIcon = false
    /// </summary>
    private int _typeIcon;
    public int TypeIcon
    {
        get { return _typeIcon; }
        set { _typeIcon = value; }
    }
    private string _yahooOnlineIcon;
    public string YahooOnlineIcon
    {
        get { return _yahooOnlineIcon; }
        set { _yahooOnlineIcon = value; }
    }
    private string _yahooOfflineIcon;
    public string YahooOfflineIcon
    {
        get { return _yahooOfflineIcon; }
        set { _yahooOfflineIcon = value; }
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

        OtherFunctions objFunc = new OtherFunctions();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        DataSet ds = objFunc.GetAllSupportOnline("SupportOnline", _agentCatID);
        
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            html += "<a class=\"support\" href=\"ymsgr:SendIM?" + DataObject.GetString(ds, i, "NickNameYM") + "\">";
            html += "<span class=\"support-name\">" + DataObject.GetString(ds, i, "DisplayName") + "</span>";
            if (_isYourIcon == false)
                html += "<img class=\"support-image\" alt=\"" + DataObject.GetString(ds, i, "DisplayName") + "\" src=\"http://opi.yahoo.com/online?m=g&t=" + _typeIcon + "&u=" + DataObject.GetString(ds, i, "NickNameYM") + "\" />";
            html += "</a>";
        }
        //return ("<b>" + title + "</b><br /><script type=\"text/javascript\" src=\"http://download.skype.com/share/skypebuttons/js/skypeCheck.js\"></script><a href=\"skype:" + nick + "?chat\"><img src=\"http://mystatus.skype.com/smallclassic/" + nick + "\" border=\"0\" alt=\"" + title + "\" /></a>");
        divContent.InnerHtml = html;
    }
}
