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

public partial class CMS_Display_Utilities_Customer_CustomerSlideBox : System.Web.UI.UserControl
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
        MyTool.Customer obj = new MyTool.Customer();
        DataSet ds = obj.GetAllCustomer("Customer", Globals.AgentCatID);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            //string detailUrl = "GalleryView.aspx?AlbumID=" + DataObject.GetString(ds, i, "AlbumID") + "&Lang=" + Lang;
            string link = DataObject.GetString(ds, i, "CustomerWebsite");
            if (link != "" && link != "#")
            {
                if (link.Contains("http://") == false)
                    link = "http://" + link;
            }
            else
                html += "<a href=\"javascript:;\">";

            html += "<img width='" + _imageWidth + "' height='" + _imageHeight + "' src=\"Thumbnail.ashx?Width=" + _imageWidth + "&Height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "CustomerLogo") + "\" onclick=\"window.open('" + link + "', 'CtrlWindow', 'width=1024,height=700,toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes');\" />";
        }
        divContent.InnerHtml = html;
    }
}
