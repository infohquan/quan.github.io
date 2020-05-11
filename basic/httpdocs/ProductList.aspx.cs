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
using Khavi.Web.UIHelper;
using Khavi.Provider;

public partial class ProductList : System.Web.UI.Page
{
    private int PageSize = 12;
    private int PageCount;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            /*string Lang = Globals.GetLang();
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            Catalog objCate = new Catalog();
            Producer objB = new Producer();
            int CatID = Globals.GetIntFromQueryString("CatID");
            int ProducerID = Globals.GetIntFromQueryString("ProducerID");
            if (CatID != -1 && ProducerID != -1) //tìm kiếm
                lblSubject.InnerText = "Kết quả Tìm kiếm";
            else if (CatID != -1) //theo danh mục sp
                lblSubject.InnerText = objCate.GetCatalogNameByCatalogID(CatID);
            else if (ProducerID != -1) //theo nhà sx
                lblSubject.InnerText = objB.GetProducerNameByProducerID(ProducerID);
            else //tất cả
                lblSubject.InnerText = langXml.GetString("Web", "Text", "ListOfAllProduct");

            Page.Title = Page.Title + " - " + lblSubject.InnerText;*/
        }
    }
    public void LoadListProducts()
    {
        string Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        Product obj = new Product();
        Catalog objC = new Catalog();
        int CatID = Globals.GetIntFromQueryString("CatID");
        int ProducerID = Globals.GetIntFromQueryString("ProducerID");
        string Text = Globals.GetStringFromQueryString("Text");
        string StringCatalogID = "";
        if (CatID != -1)
            StringCatalogID = objC.GetStringCatalogIDByParentCatID(CatID, Globals.AgentCatID, Lang);
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
        Response.Write(ProductListHtmlHelper.GetHtml(ds, Lang, FromRow, ToRow + 1));
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
