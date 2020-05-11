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
using Khavi.Provider;
using MyTool;

public partial class Controls_Others_VideoClipBoxPRO : System.Web.UI.UserControl
{
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
    private int _widthBox;
    public int WidthBox
    {
        get { return _widthBox; }
        set { _widthBox = value; }
    }
    private int _heightBox;
    public int HeightBox
    {
        get { return _heightBox; }
        set { _heightBox = value; }
    }
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    int PageCount;
    public void LoadVideoClip()
    {
        try
        {
            string FileExt = "";
            string FileVideoSrc = "";
            string FileVideoImage = "";
            string Lang = Globals.GetLang();
            OtherFunctions obj = new OtherFunctions();
            if (_isAgentCat)
                _agentCatID = Globals.AgentCatID;
            //DataSet ds = obj.GetFirstVideo("VideoProduct", _agentCatID, Lang);
            //DataRow dr = ds.Tables[0].Rows[0];
            DataRow dr = obj.GetRandomVideo("VideoProduct", Globals.AgentCatID, Lang);
            
            if (dr != null && dr.Table.Rows.Count > 0)
            {
                FileExt = Convert.ToString(dr["FileExt"]);
                FileVideoSrc = Convert.ToString(dr["VideoSrc"]);
                FileVideoImage = Convert.ToString(dr["VideoImage"]);
                //if (FileExt.ToLower() == "wmv") //vì wmv dùng control khác nên chỉ ra file video wmv để play
                //MyVideo.FilePath = Globals.GetUploadsUrl() + FileVideoSrc;
            }
            Response.Write("<div class=\"hot-video\">");
            Response.Write("<div class=\"video-player\">");
            if (FileExt == "flv")
                Response.Write(VideoHelper.LoadFlvVideo(FileVideoSrc, FileVideoImage, _widthBox, _heightBox));
            Response.Write("</div>");
            Response.Write("</div>");

            /*Response.Write("<div class=\"title_box\">" + _subject + "</div>");
            Response.Write("<div class=\"border_box\">");
            if (FileExt == "flv")
                Response.Write(VideoHelper.LoadFlvVideo(FileVideoSrc, FileVideoImage, _widthBox, _heightBox));
            Response.Write("</div>");*/
        }
        catch { }
    }
    public void LoadVideoList()
    {
        int PageSize = 6;
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
            Response.Write("<div class=\"video_item_default\">");
            Response.Write("<a href=\"javascript:playVideo('" + DataObject.GetString(ds, i, "VideoSrc") + "','" + DataObject.GetString(ds, i, "VideoImage") + "')\">");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "VideoImage")))
                Response.Write("<img class=\"shadow_video_default\" height=\"71px\" src=\"" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "VideoImage") + "\" />");
            else
                Response.Write("<img class=\"shadow_video_default\" height=\"71px\" src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("<span>" + Convert.ToString(ds.Tables[0].Rows[i]["VideoName"]) + "</span>");
            Response.Write("</a>");
            Response.Write("</div>");
        }
    }
    /// <summary>
    /// Hiển thị chuỗi phân trang
    /// </summary>
    protected void DisplayHtmlStringPaging()
    {
        string Lang = Globals.GetLang();
        Int32 CurrentPage = Globals.GetIntFromQueryString("Page");
        if (CurrentPage == -1) CurrentPage = 1;
        LanguageXML myLangXml = new LanguageXML("Language" + Lang);

        string[] strText = new string[4] {  myLangXml.GetString("Web", "Paging", "First"), 
                                            myLangXml.GetString("Web", "Paging", "Previous"),
                                            myLangXml.GetString("Web", "Paging", "Next"),
                                            myLangXml.GetString("Web", "Paging", "Last")};
        if (PageCount > 1)
            Response.Write(Globals.GetHtmlPagingAdvanced(6, CurrentPage, PageCount, Context.Request.RawUrl, strText));
    }
}
