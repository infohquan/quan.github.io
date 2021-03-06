﻿using System;
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

public partial class Controls_Others_VideoClipBox : System.Web.UI.UserControl
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
            DataSet ds = obj.GetFirstVideo("VideoProduct", _agentCatID, Lang);
            //DataRow dr = obj.GetRandomVideo("VideoProduct", Globals.AgentCatID, Lang);
            DataRow dr = ds.Tables[0].Rows[0];
            if (dr != null && dr.Table.Rows.Count > 0)
            {
                FileExt = Convert.ToString(dr["FileExt"]);
                FileVideoSrc = Convert.ToString(dr["VideoSrc"]);
                FileVideoImage = Convert.ToString(dr["VideoImage"]);
                //if (FileExt.ToLower() == "wmv") //vì wmv dùng control khác nên chỉ ra file video wmv để play
                //MyVideo.FilePath = Globals.GetUploadsUrl() + FileVideoSrc;
            }
            //Response.Write("<div class=\"title_box\">" + _subject + "</div>");
            //Response.Write("<div class=\"border_box\">");
            if (FileExt == "flv")
                Response.Write(VideoHelper.LoadFlvVideo(FileVideoSrc, FileVideoImage, _widthBox, _heightBox));
            //Response.Write("</div>");
        }
        catch { }
    }
}
