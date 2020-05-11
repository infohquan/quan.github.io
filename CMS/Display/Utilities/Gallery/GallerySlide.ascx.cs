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

public partial class CMS_Display_Utilities_Gallery_GallerySlide : System.Web.UI.UserControl
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
        MyTool.Gallery obj = new MyTool.Gallery();
        DataSet ds = obj.GetAllPhoto("GalleryPhoto", Globals.AgentCatID);
        string styleImg = "width: " + _imageWidth + ", height: " + _imageHeight;
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string detailUrl = "GalleryView.aspx?AlbumID=" + DataObject.GetString(ds, i, "AlbumID") + "&Lang=" + Lang;
            html += "<img style=\"" + styleImg + "\" src=\"Thumbnail.ashx?Width=" + _imageWidth + "&Height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "PhotoUrl") + "\" />";
        }
        divContent.InnerHtml = html;
    }
}
