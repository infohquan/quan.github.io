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

public partial class CMS_Display_Templates_Products_Default_ProductListAllOnlyImage : System.Web.UI.UserControl
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
        if (CatID == -1)
            lblSubject.Text = langXml.GetString("Web", "Text", "ListOfAllProduct");
        else if (CatID != -1)
        {
            lblSubject.Text = objC.GetCatalogNameByCatalogID(CatID);
            StringCatalogID = objC.GetStringCatalogIDByParentCatID(CatID, Globals.AgentCatID, Lang);
        }
        DataSet ds = new DataSet();
        //if (CatID != -1 && ProducerID != -1) //tìm kiếm
        ds = obj.SearchProduct("ProductCat", Globals.AgentCatID, Lang, Text, StringCatalogID, ProducerID, "Default");
        /*else if (CatID != -1) //theo danh mục sp
        {
            string strCatID = objC.GetStringCatalogIDByParentCatID(CatID, Globals.AgentCatID, Lang);
            ds = obj.GetProductByStringCatalogID("ProductCat", Lang, strCatID);
            //ds = obj.GetProductByCatalogID("ProductCat", Lang, CatID);
        }
        else if (ProducerID != -1) //theo nhà sx
            ds = obj.GetProductByProducerID("ProductCat", ProducerID, Lang);
        else //tất cả
            ds = obj.GetAllProduct("ProductCat", Globals.AgentCatID, Lang);
        */
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
        
        for (int i = FromRow; i < ToRow + 1; i++)
        {
            //string detailUrl = "ProductDetail.aspx?ID=" + DataObject.GetString(ds, i, "ID") + "&CatID=" + DataObject.GetString(ds, i, "GroupID") + "&Lang=" + Lang;
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
        divContent.InnerHtml = html;
        divPaging.InnerHtml = Paging.GetHtmlPaging(Context.Request.RawUrl, PageCount);
    }
}
