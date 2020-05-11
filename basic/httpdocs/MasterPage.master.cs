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
using Khavi.Provider;

public partial class MasterPage : System.Web.UI.MasterPage
{    
    protected void Page_Load(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        Page.Title = langXml.GetString("Web", "Text", "CompanyName");
        //HotProduct.Subject = langXml.GetString("Web", "Text", "TopHotProduct");
        //Catalog.Subject = langXml.GetString("Web", "MenuTop", "Product");
        //SupportOnline.Subject = langXml.GetString("Web", "Text", "SupportOnline");
        Ads.Subject = langXml.GetString("Web", "Text", "Ad");
        //AdsLeft.Subject = langXml.GetString("Web", "Text", "Link");
        TopNewArticleNoImage.Subject = langXml.GetString("Web", "Article", "HotNews");
        //AdsRight.Subject = langXml.GetString("Web", "Text", "Link");
        //Counter.Subject = langXml.GetString("Web", "Text", "Statistics");
        //HotNews.Subject = langXml.GetString("Web", "Article", "HotNews");
        //AdsRight.Subject = langXml.GetString("Web", "Text", "Ad");
    }
}
