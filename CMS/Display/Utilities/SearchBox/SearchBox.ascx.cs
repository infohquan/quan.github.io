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

public partial class CMS_Display_Utilities_SearchBox_SearchBox : System.Web.UI.UserControl
{
    private string _controlCssClass;
    public string ControlCssClass
    {
        get { return _controlCssClass; }
        set { _controlCssClass = value; }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Lang = Globals.GetLang();
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            string str = langXml.GetString("Web", "Text", "InputText");
            txtSearch.Text = str;
            txtSearch.Attributes.Add("onfocus", "javascript:focusTextBox('ctl00_Header_Search_txtSearch')");
            //txtSearch.Attributes.Add("onblur", "javascript:blurTextBox('ctl00_Header_Search_txtSearch', '" + str + "')");
            btnSearch.Text = langXml.GetString("Web", "Text", "Search");
        }
    }
    protected void btnSearch_Click(object sender, EventArgs e)
    {
        string TextSearch = txtSearch.Text.Trim();
        Response.Redirect("ArticleList.aspx?TypeSearch=All&Text=" + TextSearch + "&Lang=" + Globals.GetLang());
    }
}
