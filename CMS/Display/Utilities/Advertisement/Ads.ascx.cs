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
using Khavi.Web.Data;
using MyTool;

public partial class CMS_Display_Utilities_Advertisement_Ads : System.Web.UI.UserControl
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
    private string _position;
    public string Position
    {
        get { return _position; }
        set { _position = value; }
    }
    private string _contentType;
    public string ContentType
    {
        get { return _contentType; }
        set { _contentType = value; }
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
            OtherFunctions objFunc = new OtherFunctions();
            if (_isAgentCat)
                _agentCatID = Globals.AgentCatID;

            string html = "";
            AgentCat agent = new AgentCat();
            Link obj = new Link();
            DataSet ds = new DataSet();
            if (_position == "All")
                ds = obj.GetAllLink("AgentLink", _agentCatID, _contentType);
            else
                ds = obj.GetLinkByPosition("AgentLink", _agentCatID, _position, _contentType);
            string link = "";
            string logotype = "";
            string linkname = "";
            string logosource = "";
            string styleImg = "width: " + _imageWidth + ", height: " + _imageHeight;
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                link = DataObject.GetString(ds, i, "Link");
                logotype = DataObject.GetString(ds, i, "LogoType");
                linkname = DataObject.GetString(ds, i, "LinkName");
                logosource = Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Logo");

                if (link == "" || link == "#")
                    html += "<a href=\"javascript:;\">";
                else
                {
                    if (link.Contains("http://") == false)
                        html += "<a target=\"_blank\" href=\"http://" + link + "\">";
                    else if (link.Contains("http://") == true)
                        html += "<a target=\"_blank\" href=\"" + link + "\">";
                }
                if (logotype == "image")
                    html += "<img style=\"" + styleImg + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + logosource + "\" alt=\"" + linkname + "\" title=\"" + linkname + "\" />";
                else if (logotype == "flash")
                {
                    int width = Convert.ToInt32(ds.Tables[0].Rows[i]["Width"]);
                    int height = Convert.ToInt32(ds.Tables[0].Rows[i]["Height"]);

                    html += "<object ";
                    if (width > 0)
                        html += "width=\"" + width + "\" ";
                    if (height > 0)
                        html += "height=\"" + height + "\"";

                    html += "><param name=\"movie\" value=\"" + logosource + "\" />";
                    html += "<embed src=\"" + logosource + "\" ";
                    if (width > 0)
                        html += "width=\"" + width + "\" ";
                    if (height > 0)
                        html += "height=\"" + height + "\"";
                    html += "></embed>";
                    html += "</object>";
                }
                html += "</a>";
            }
            divContent.InnerHtml = html;
        }
        catch { }
    }
}
