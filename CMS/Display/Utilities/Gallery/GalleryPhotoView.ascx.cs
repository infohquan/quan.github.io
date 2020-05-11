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

public partial class CMS_Display_Utilities_Gallery_GalleryPhotoView : System.Web.UI.UserControl
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

    }
    public void LoadPhotoList()
    {
        MyTool.Gallery obj = new MyTool.Gallery();
        int AlbumID = Globals.GetIntFromQueryString("AlbumID");
        DataSet ds = new DataSet();
        if (AlbumID != -1)
            ds = obj.GetPhotoByAlbumID("GalleryPhoto", Globals.AgentCatID, AlbumID);
        else
            ds = obj.GetAllPhoto("GalleryPhoto", Globals.AgentCatID);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string imgSrc = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["PhotoUrl"]);
            Response.Write("<a href=\"" + imgSrc + "\" onclick=\"return hs.expand(this)\" >");
            Response.Write("<img src=\"Thumbnail.ashx?Width=170&Height=150&ImgFilePath=" + imgSrc + "\" />");
            Response.Write("</a>");
        }
    }
}
