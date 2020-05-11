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

public partial class CMS_Display_Utilities_Gallery_GalleryAlbumList : System.Web.UI.UserControl
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

    public void LoadAlbumList()
    {
        MyTool.Gallery obj = new MyTool.Gallery();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        DataSet ds = obj.GetAllAlbum("GalleryAlbum", _agentCatID);
        string detailUrl = "";
        int AlbumID = 0;
        string img = "";
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            AlbumID = Convert.ToInt32(Convert.ToString(ds.Tables[0].Rows[i]["ID"]));
            detailUrl = "GalleryView.aspx?AlbumID=" + AlbumID;
            img = obj.GetImageOfAlbumID(AlbumID);
            Response.Write("<div class=\"album_item\">");
            Response.Write("<a href=\"" + detailUrl + "\">");
            if (Globals.IsFileExistent(img))
                Response.Write("<img class=\"imgalbum\" src=\"Thumbnail.ashx?Width=170&Height=150&ImgFilePath=" + Globals.GetUploadsUrl() + img + "\" />");
            else
                Response.Write("<img class=\"imgalbum\" src=\"" + Globals.DefaultImage + "\" />");

            Response.Write("</a>");
            Response.Write("<div class=\"album_name\"><a href=\"" + detailUrl + "\">" + Convert.ToString(ds.Tables[0].Rows[i]["AlbumName"]) + "</a></div>");
            Response.Write("</div>");
        }
    }
}
