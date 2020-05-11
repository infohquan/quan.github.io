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
using Khavi.Provider;
using Khavi.Web.UIHelper;

public partial class VideoClip : System.Web.UI.Page
{
    public string FileExt;
    private string FileVideoSrc;
    private string FileVideoImage;
    public int PageCount;
    protected void Page_Load(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        try
        {
            if (!IsPostBack)
            {
                int VideoID = Globals.GetIntFromQueryString("VideoID");
                OtherFunctions obj = new OtherFunctions();
                DataRow dr;
                if (VideoID != -1)
                    dr = obj.GetVideoByVideoID("VideoProduct", VideoID).Tables[0].Rows[0];
                else
                    dr = obj.GetRandomVideo("VideoProduct", Globals.AgentCatID, Lang);

                if (Convert.ToString(dr["VideoName"]) != "")
                    lblTitle.InnerText = " - " + Convert.ToString(dr["VideoName"]);
                FileExt = Convert.ToString(dr["FileExt"]);
                FileVideoSrc = Convert.ToString(dr["VideoSrc"]);
                FileVideoImage = Convert.ToString(dr["VideoImage"]);
                if (FileExt.ToLower() == "wmv") //vì wmv dùng control khác nên chỉ ra file video wmv để play
                    MyVideo.FilePath = Globals.GetUploadsUrl() + "VideoFiles/" + FileVideoSrc;
            }
        }
        catch 
        {
            Response.Redirect("VideoClip.aspx?Lang=" + Lang);
        }
    }
    
    public void LoadVideoList()
    {
        int PageSize = 12;
        string Lang = Globals.GetLang();
        OtherFunctions obj = new OtherFunctions();
        DataSet ds = obj.GetAllVideo("VideoProduct", Globals.AgentCatID, Lang);
        int TotalItems = ds.Tables[0].Rows.Count;
        if (TotalItems % PageSize == 0)
            PageCount = TotalItems / PageSize;
        else
            PageCount = TotalItems / PageSize + 1;

        Int32 Page = Globals.GetIntFromQueryString("Page");
        if (Page == -1) Page = 1;
        int FromRow = (Page - 1) * PageSize;
        int ToRow = Page * PageSize - 1;
        if (ToRow >= TotalItems)
            ToRow = TotalItems - 1;

        for (int i = FromRow; i < ToRow + 1; i++)
        {
            Response.Write("<div class=\"video_item\">");
            Response.Write("<a href=\"VideoClip.aspx?VideoID=" + Convert.ToString(ds.Tables[0].Rows[i]["VideoID"]) + "&Lang=" + Lang + "\">");
            Response.Write("<img class=\"shadow_video\" height=\"71px\" src=\"" + Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["VideoImage"]) + "\" />");
            Response.Write("<span>" + Convert.ToString(ds.Tables[0].Rows[i]["VideoName"]) + "</span>");
            Response.Write("</a>");
            Response.Write("</div>");
        }
    }

    public void LoadSWFVideo()
    {
        Response.Write("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0\" width=\"425px\">");
        Response.Write("<param name=\"movie\" value=\"" + Globals.ApplicationPath + "Cache/Uploads/" + FileVideoSrc + "\" />");
        Response.Write("<param name=\"quality\" value=\"high\" />");
        Response.Write("<embed src=\"" + Globals.ApplicationPath + "Cache/Uploads/" + FileVideoSrc + "\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"425px\"></embed>");
        Response.Write("</object>");
    }
    public void LoadFLVVideo()
    {
        Response.Write("<object id=\"player\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" name=\"player\" width=\"400\" height=\"315\">");
        Response.Write("<param name=\"movie\" value=\"" + Globals.ApplicationPath + "Cache/Resources/PlayFLV/player-viral.swf\" />");
        Response.Write("<param name=\"allowfullscreen\" value=\"true\" />");
        Response.Write("<param name=\"allowscriptaccess\" value=\"always\" />");
        Response.Write("<param name=\"flashvars\" value=\"file=" + Globals.ApplicationPath + "Cache/Uploads/" + FileVideoSrc + "&image=" + Globals.GetUploadsUrl() + FileVideoImage + "\" />");
        Response.Write("<embed type=\"application/x-shockwave-flash\" id=\"player2\" name=\"player2\" ");
        Response.Write("src=\"" + Globals.ApplicationPath + "Cache/Resources/PlayFLV/player-viral.swf\" width=\"400\" height=\"315\" allowscriptaccess=\"always\" allowfullscreen=\"true\" ");
        Response.Write("flashvars=\"autostart=true&file=" + Globals.ApplicationPath + "Cache/Uploads/" + FileVideoSrc + "&image=" + Globals.GetUploadsUrl() + FileVideoImage + "\" />");
        Response.Write("</object>");
    }

    public void LoadFLVVideo(string www)
    {
        Response.Write("<object id=\"player\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" name=\"player\" width=\"400\" height=\"315\">");
        Response.Write("<param name=\"movie\" value=\"" + www + "/Cache/Resources/PlayFLV/player-viral.swf\" />");
        Response.Write("<param name=\"allowfullscreen\" value=\"true\" />");
        Response.Write("<param name=\"allowscriptaccess\" value=\"always\" />");
        Response.Write("<param name=\"flashvars\" value=\"file=" + www + "/Cache/Uploads/" + FileVideoSrc + "&image=" + Globals.GetUploadsUrl() + FileVideoImage + "\" />");
        Response.Write("<embed type=\"application/x-shockwave-flash\" id=\"player2\" name=\"player2\" ");
        Response.Write("src=\"" + www + "/Cache/Resources/PlayFLV/player-viral.swf\" width=\"400\" height=\"315\" allowscriptaccess=\"always\" allowfullscreen=\"true\" ");
        Response.Write("flashvars=\"autostart=true&file=" + www + "/Cache/Uploads/" + FileVideoSrc + "&image=" + Globals.GetUploadsUrl() + FileVideoImage + "\" />");
        Response.Write("</object>");
    }

    /*
    private void LoadListVideo()
    {

        //try
        {
            string Lang = Globals.GetLang();
            string Letter = Globals.GetStringFromQueryString("Letter");
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = new DataSet();
            if (Letter == "")
                ds = obj.GetAllVideo("VideoProduct", Globals.AgentCatID, Lang);
            else if (Letter != "")
                ds = obj.GetVideoByLetter("VideoProduct", Letter, Globals.AgentCatID, Lang);
            if (ds.Tables.Count > 0)
            {
                DataListHelper dlHelper = new DataListHelper();
                dlHelper.FillData(dlVideo, ds);
            }
            else
            {
                LanguageXML myLangXml = new LanguageXML("Language" + Lang);
                lblResult.Visible = true;
                lblResult.Text = myLangXml.GetString("Web", "Text", "NoResult");
            }
        }
        //catch { }
    }*/
}
