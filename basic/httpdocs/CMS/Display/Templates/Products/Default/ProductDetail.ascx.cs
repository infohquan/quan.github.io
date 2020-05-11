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
using Khavi.Web.Data;
using Khavi.Provider;

public partial class CMS_Display_Templates_Products_Default_ProductDetail : System.Web.UI.UserControl
{
    #region "Properties"
    private string _controlCssClass;
    public string ControlCssClass
    {
        get { return _controlCssClass; }
        set { _controlCssClass = value; }
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
    private bool _imageInLeft;
    public bool ImageInLeft
    {
        get { return _imageInLeft; }
        set { _imageInLeft = value; }
    }
    #endregion

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
        lblPrice.InnerText = Globals.FormatStringThousand(Convert.ToString(ds.Tables[0].Rows[0]["GiaBan"])) + " " + Convert.ToString(ds.Tables[0].Rows[0]["NgoaiTe"]);
        //img.Src = Globals.ApplicationPath + "Thumbnail.ashx?width=400&height=300&ImgFilePath=" + Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["Anh"]);
        img.Src = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["Anh"]);
        Page.Title += " - " + lblProductName.InnerText;
        
        if (_imageInLeft)
        {
            productDetailSidebar.Attributes.Add("style", "float:left; width:48%; padding-left:5px;");
            productDetailSidepanel.Attributes.Add("style", "float:right; width:48%; padding-left:5px;");
        }
        else
        {
            productDetailSidepanel.Attributes.Add("style", "float:left; width:48%; padding-left:5px;");
            productDetailSidebar.Attributes.Add("style", "float:right; width:48%; padding-left:5px;");
        }
        //lblTextAddCart.InnerText = langXml.GetString("Web", "DisplayProduct", "AddToCart");
        //lblTextOther.InnerText = langXml.GetString("Web", "Text", "OtherProducts");
        //lblTextBack.InnerText = langXml.GetString("Web", "Text", "Back");
    }

    public void LoadOtherList()
    {
        try
        {
            MyTool.Article obj = new MyTool.Article();
            string Lang = Globals.GetLang();
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            int ID = Globals.GetIntFromQueryString("ID");
            int CatID = Globals.GetIntFromQueryString("CatID");
            DataSet ds = obj.GetArticleByCateID("Article", CatID, ID, Lang);
            string subject = langXml.GetString("Web", "Text", "OtherProducts");
            if (ds.Tables[0].Rows.Count > 0)
            {
                Response.Write("<div class=\"vbox " + _controlCssClass + " " + this.ID + "\">");
                Response.Write("<div class=\"vbox-top\">");
                Response.Write("<div class=\"vbox-top-left\">");
                Response.Write("<div class=\"vbox-top-right\">");
                Response.Write("<div class=\"vbox-top-center\">" + subject + "</div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("<div class=\"vbox-middle\">");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {

                }
                Response.Write("</div>");
                Response.Write("<div class=\"vbox-bottom\">");
                Response.Write("<div class=\"vbox-bottom-left\">");
                Response.Write("<div class=\"vbox-bottom-right\">");
                Response.Write("<div class=\"vbox-bottom-center\"></div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("</div>");
                Response.Write("</div>");
            }
        }
        catch { }
    }
}
