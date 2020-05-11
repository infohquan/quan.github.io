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

public partial class CMS_Display_Templates_Products_UtilControls_VerticalMenu_CatalogMenu : System.Web.UI.UserControl
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
    /*private string _subject;
    public string Subject
    {
        get { return _subject; }
        set { _subject = value; }
    }*/
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
        Catalog obj = new Catalog();
        DataSet dsChild = new DataSet();
        if (_isAgentCat)
            _agentCatID = Globals.AgentCatID;
        DataSet ds = obj.GetCatalogByParentCatID("GroupCat", _agentCatID, 0, Lang);

        html += "<div id=\"smoothmenu_vert\" class=\"ddsmoothmenu-v\">";
        html += "<ul>";
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            int CatID = DataObject.GetInt(ds, i, "ID");
            string detailUrl = "ProductList.aspx?CatID=" + CatID + "&Lang=" + Lang;
            dsChild = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, CatID, Lang);
            html += "<li>";
            if (dsChild.Tables[0].Rows.Count > 0)
            {
                html += "<a class=\"item" + i + "\" href=\"" + detailUrl + "\">" + DataObject.GetString(ds, i, "TenNhom") + "</a>";
                html += "<ul>";
                for (int j = 0; j < dsChild.Tables[0].Rows.Count; j++)
                    html += "<li><a href=\"ProductList.aspx?CatID=" + DataObject.GetString(dsChild, j, "ID") + "&Lang=" + Lang + "\">" + DataObject.GetString(dsChild, j, "TenNhom") + "</a></li>";
                html += "</ul>";
            }
            else
                html += "<a class=\"item" + i + "\" href=\"" + detailUrl + "\">" + DataObject.GetString(ds, i, "TenNhom") + "</a>";
            html += "</li>";
        }
        html += "</ul>";
        html += "</div>";
        divContent.InnerHtml = html;
    }
}
