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

public partial class GalleryView : System.Web.UI.Page
{
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
