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
using MyTool;

public partial class ProductDetail2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            LoadData();
        }
    }

    private void LoadData()
    {
        Product obj = new Product();
        Catalog objC = new Catalog();
        Producer objB = new Producer();
        string Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        int ID = Globals.GetIntFromQueryString("ID");
        int CatID = Globals.GetIntFromQueryString("CatID");
        DataSet ds = obj.GetProductByProductID("ProductCat", ID, Lang);
        lblProductName.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["TenGoi"]);
        lblThongTin1.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["ThongTin1"]);
        lblThongTin2.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["ThongTin2"]);
        lblPrice.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["GiaBan"]) + " " + Convert.ToString(ds.Tables[0].Rows[0]["NgoaiTe"]);
        imgProduct.Src = "Thumbnail.ashx?width=400&height=300&ImgFilePath=" + Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["Anh"]);
        Title += " - " + lblProductName.InnerText;
        lblTextAddCart.InnerText = langXml.GetString("Web", "DisplayProduct", "AddToCart");
        lblTextOther.InnerText = langXml.GetString("Web", "Text", "OtherProducts");
        lblTextBack.InnerText = langXml.GetString("Web", "Text", "Back");
    }
    public void LoadTopOtherProducts()
    {
        string Lang = Globals.GetLang();
        Product obj = new Product();
        DataSet ds = obj.GetTopProductSameCatalog("ProductCat", 6, Globals.GetIntFromQueryString("ID"), Globals.GetIntFromQueryString("CatID"), Lang);
        string html = ProductListHtmlHelper.GetHtml(ds, Lang, 0, ds.Tables[0].Rows.Count);
        Response.Write(html);
    }
    public void LoadProductGallery()
    {
        Product obj = new Product();
        int ID = Globals.GetIntFromQueryString("ID");
        DataSet ds = obj.GetImageListOfProduct("ProductImage", ID, Globals.AgentCatID);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string ImageUrl = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["ProductImageURL"]);
            Response.Write("<div class=\"listPhotoProduct\">");
            Response.Write("<center><a onclick=\"return hs.expand(this)\" href=\"" + ImageUrl + "\"><img class=\"imgphoto\" src=\"" + ImageUrl + "\" /></a></center>");
            Response.Write("</div>");
        }
    }
}
