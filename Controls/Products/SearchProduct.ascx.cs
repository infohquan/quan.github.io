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
using Khavi.Web.UIHelper;
using Khavi.Provider;
using MyTool;

public partial class Controls_Products_SearchProduct : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        if (!IsPostBack)
        {
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            lblSubject.InnerText = langXml.GetString("Web", "Text", "QuickSearch");
            btnSearch.Text = langXml.GetString("Web", "Text", "Search");
            CommonDropDownList ddl = new CommonDropDownList();
            ddl.LoadDropDownListCatalog(ddlCatalog, Lang, langXml.GetString("Web", "DisplayProduct", "ProductCatalog"));
        }
    }
    protected void btnSearch_Click(object sender, EventArgs e)
    {
        string Text = txtSearch.Value.Trim();
        int CatID = Convert.ToInt32(ddlCatalog.SelectedValue);
        string PageUrl = "ProductList.aspx?Lang=" + Globals.GetLang();
        if (Text != "")
            PageUrl += "&Text=" + Text;
        if (CatID != 0)
            PageUrl += "&CatID=" + CatID;
        Response.Redirect(PageUrl);
    }
}
