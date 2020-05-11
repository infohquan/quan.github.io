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

public partial class Controls_Products_ShoppingCartBox : System.Web.UI.UserControl
{
    public LanguageXML langXml;
    public bool isEmptyCart = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        langXml = new LanguageXML("Language" + Lang);
        if (Session["ShoppingCart"] != null)
        {
            ShoppingCart cart = new ShoppingCart();
            cart.ShopCart = (DataTable)Session["ShoppingCart"];
            lblQuantity.InnerText = cart.ShopCart.Rows.Count.ToString() + langXml.GetString("Web", "DisplayProduct", "sufProducts");
            if (cart.ShopCart.Rows.Count > 0)
            {
                isEmptyCart = false;
                lblTotalMoney.InnerText = Globals.FormatStringThousand(cart.GetTotalMoney()) + " VND";
            }
            else
                isEmptyCart = true;
        }
        else
            isEmptyCart = true;
    }
}
