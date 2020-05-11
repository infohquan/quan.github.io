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

public partial class CMS_Display_Templates_Products_Default_ProductListV1 : System.Web.UI.UserControl
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
    private int _pageSize;
    public int PageSize
    {
        get { return _pageSize; }
        set { _pageSize = value; }
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
    private bool _isViewLinkDetail = true;
    public bool IsViewLinkDetail
    {
        get { return _isViewLinkDetail; }
        set { _isViewLinkDetail = value; }
    }
    private bool _isViewPrice = true;
    public bool IsViewPrice
    {
        get { return _isViewPrice; }
        set { _isViewPrice = value; }
    }
    private bool _isViewProductDesc = true;
    public bool IsViewProductDesc
    {
        get { return _isViewProductDesc; }
        set { _isViewProductDesc = value; }
    }
    private bool _isViewLinkAddCart = false;
    public bool IsViewLinkAddCart
    {
        get { return _isViewLinkAddCart; }
        set { _isViewLinkAddCart = value; }
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
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        Product obj = new Product();
        Catalog objC = new Catalog();
        int CatID = Globals.GetIntFromQueryString("CatID");
        int ProducerID = Globals.GetIntFromQueryString("ProducerID");
        string Text = Globals.GetStringFromQueryString("Text");
        string StringCatalogID = "";
        string detailUrl = "";
        if (CatID == -1)
            lblSubject.Text = langXml.GetString("Web", "Text", "ListOfAllProduct");
        else if (CatID != -1)
        {
            lblSubject.Text = objC.GetCatalogNameByCatalogID(CatID);
            StringCatalogID = objC.GetStringCatalogIDByParentCatID(CatID, Globals.AgentCatID, Lang);
        }
        DataSet ds = new DataSet();
        ds = obj.SearchProduct("ProductCat", Globals.AgentCatID, Lang, Text, StringCatalogID, ProducerID, "Default");
        
        int PageCount = 0;
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

        /*for (int i = FromRow; i < ToRow + 1; i++)
        {
            if (_isViewLinkDetail)
                detailUrl = "ProductDetail.aspx?ID=" + DataObject.GetString(ds, i, "ID") + "&CatID=" + DataObject.GetString(ds, i, "GroupID") + "&Lang=" + Lang;
            else
                detailUrl = Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh");
            html += "<div class=\"product-item\">";
            html += "<a href=\"" + detailUrl + "\" class=\"product-name\">" + DataObject.GetString(ds, i, "TenGoi") + "</a>";
            if (_isViewLinkDetail)
                html += "<a href=\"" + detailUrl + "\" class=\"product-image\">";
            else
                html += "<a href=\"" + detailUrl + "\" class=\"product-image\" onclick=\"return hs.expand(this)\">";
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "Anh")))
                html += "<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "\" />";
            else
                html += "<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"" + Globals.DefaultImage + "\" />";
            html += "</a>";
            if (_isViewPrice)
                html += "<span class=\"product-price\">" + Globals.FormatStringThousand(DataObject.GetDouble(ds, i, "GiaBan")) + " " + DataObject.GetString(ds, i, "NgoaiTe") + "</span>";
            if (_isViewProductDesc)
                html += "<span class=\"product-excerpt\">" + DataObject.GetString(ds, i, "ThongTin1") + "</span>";
            if (_isViewLinkAddCart)
                html += "html for button add to cart";
            html += "</div>";
        }*/
        divContent.InnerHtml = ProductListHtmlHelper.GetHtmlString(ds, Lang, 0, ds.Tables[0].Rows.Count, _imageWidth, _imageHeight);
        divPaging.InnerHtml = Paging.GetHtmlPaging(Context.Request.RawUrl, PageCount);
    }
}
