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
using Khavi.Provider;
using Khavi.Web.Data;
using MyTool;

public partial class CMS_Display_Templates_Products_UtilControls_TopProducts_TopHotProductWithSearch : System.Web.UI.UserControl
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
    private int _nTop;
    public int nTop
    {
        get { return _nTop; }
        set { _nTop = value; }
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
        MyTool.Product obj = new MyTool.Product();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        DataSet ds = obj.GetTopHotProduct("ProductCat", _agentCatID, _nTop, Lang);
        divContent.InnerHtml = ProductListHtmlHelper.GetHtmlString(ds, Lang, 0, ds.Tables[0].Rows.Count, 150, _imageHeight);

        /*for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            //detailUrl = "ProductDetail.aspx?ID=" + DataObject.GetString(ds, i, "ID") + "&CatID=" + DataObject.GetString(ds, i, "GroupID") + "&Lang=" + Lang;
            string detailUrl = Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh");
            html += "<div class=\"product-item\">";
            //html += "<a href=\"" + detailUrl + "\" class=\"product-name\">" + DataObject.GetString(ds, i, "TenGoi") + "</a>";
            html += "<a href=\"" + detailUrl + "\" class=\"product-image\" onclick=\"return hs.expand(this)\">";
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "Anh")))
                html += "<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "\" />";
            else
                html += "<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"" + Globals.DefaultImage + "\" />";
            html += "</a>";
            //html += "<span class=\"product-price\">" + Globals.FormatStringThousand(DataObject.GetDouble(ds, i, "GiaBan")) + " " + DataObject.GetString(ds, i, "NgoaiTe") + "</span>";
            html += "</div>";
        }
        divContent.InnerHtml = html;*/
    }
}
