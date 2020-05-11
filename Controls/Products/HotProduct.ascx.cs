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

public partial class Controls_Products_HotProduct : System.Web.UI.UserControl
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
    private int _nTop;
    public int nTop
    {
        get { return _nTop; }
        set { _nTop = value; }
    }
    private string _imageCssClass;
    public string ImageCssClass
    {
        get { return _imageCssClass; }
        set { _imageCssClass = value; }
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
    private string _linkCssClass;
    public string LinkCssClass
    {
        get { return _linkCssClass; }
        set { _linkCssClass = value; }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
    }
    public void LoadHotProduct()
    {
        string Lang = Globals.GetLang();
        MyTool.Product obj = new MyTool.Product();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        DataSet ds = obj.GetTopHotProduct("ProductCat", _agentCatID, _nTop, Lang);

        Response.Write("<div class=\"title_box\">" + _subject + "</div>");
        Response.Write("<div class=\"border_box\">");
        Response.Write("<div style=\"margin-left:40px;\">");
        Response.Write("<marquee behavior=\"scroll\" direction=\"up\" onmouseover=\"this.stop();\" onmouseout=\"this.start();\" scrollamount=\"2\" height=\"200\">");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string detailUrl = "ProductDetail.aspx?ID=" + DataObject.GetString(ds, i, "ID") + "&CatID=" + DataObject.GetString(ds, i, "GroupID") + "&Lang=" + Lang;
            Response.Write("<div class=\"product_title\"><a class=\"" + _linkCssClass + "\" href=\"" + detailUrl + "\">" + DataObject.GetString(ds, i, "TenGoi") + "</a></div>");
            Response.Write("<div class=\"product_img\"><a href=\"" + detailUrl + "\">");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "Anh")))
                Response.Write("<img src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "\" class=\"" + _imageCssClass + "\" />");
            else
                Response.Write("<img class=\"" + _imageCssClass + "\" src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("</a>");
            Response.Write("<div class=\"prod_price\" style=\"text-align:left; padding-left:15px;\">");
            //<!--<span class="reduce">350$</span>--> 
            Response.Write("<span class=\"price\">" + Globals.FormatStringThousand(DataObject.GetDouble(ds, i, "GiaBan")) + " " + DataObject.GetString(ds, i, "NgoaiTe") + "</span></div>");
            Response.Write("</div>");
        }
        Response.Write("</marquee>");
        Response.Write("</div>");
        Response.Write("</div>");
    }
}
