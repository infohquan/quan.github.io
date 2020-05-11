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
using Khavi.Provider;
using Khavi.Web.Data;
using MyTool;

public partial class CMS_Display_Utilities_Customer_CustomerHorizontalMarquee : System.Web.UI.UserControl
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
    public void LoadData()
    {
        Customer obj = new Customer();
        DataSet ds = obj.GetAllCustomer("Customer", Globals.AgentCatID);
        string html = "";
        //for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        for (int i = 0; i < 5; i++)
        {
            string link = DataObject.GetString(ds, i, "CustomerWebsite");
            string linkname = DataObject.GetString(ds, i, "CustomerFullName");
            if (link == "" || link == "#")
                html += "<a href=\"javascript:;\">";
            else
            {
                if (link.Contains("http://") == false)
                    html += "<a target=\"_blank\" href=\"http://" + link + "\">";
                else if (link.Contains("http://") == true)
                    html += "<a target=\"_blank\" href=\"" + link + "\">";
            }
            if (_imageWidth == -1)
                html += "<img height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "CustomerLogo") + "\" alt=\"" + linkname + "\" title=\"" + linkname + "\" />";
            else
                html += "<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "CustomerLogo") + "\" alt=\"" + linkname + "\" title=\"" + linkname + "\" />";
            html += "</a>";
        }
        Response.Write(html);
    }
}
