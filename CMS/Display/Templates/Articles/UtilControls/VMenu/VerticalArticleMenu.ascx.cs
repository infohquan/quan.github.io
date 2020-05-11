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

public partial class CMS_Display_Templates_Articles_UtilControls_VMenu_VerticalArticleMenu : System.Web.UI.UserControl
{
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
    private string _contentType;
    public string ContentType
    {
        get { return _contentType; }
        set { _contentType = value; }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            LoadArticlesMenu();
    }
    /// <summary>
    /// Load tiêu đề bài viết (tin tức, dịch vụ, ...) vào menu
    /// </summary>
    /// <param name="t"></param>
    private void LoadArticlesMenu()
    {
        try
        {
            string html = "";
            string Lang = Globals.GetLang();
            MyTool.Article obj = new MyTool.Article();
            if (_isAgentCat)
                AgentCatID = Globals.AgentCatID;
            DataSet ds = obj.GetAllArticle("Article", _agentCatID, Lang, _contentType);

            DataSet dsNDTH = obj.GetAllArticle("Article", _agentCatID, Lang, "ndth", "ASC");
            DataSet dsXDTH = obj.GetAllArticle("Article", _agentCatID, Lang, "xdth", "ASC");
            string ArticleID = "";
            string Title = "";
            html += "<div id=\"smoothmenu_vert\" class=\"ddsmoothmenu-v\">";
            html += "<ul>";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                html += "<li>";
                ArticleID = Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]);
                Title = Convert.ToString(ds.Tables[0].Rows[i]["Title"]);
                //string detailUrl = "dich-vu-thiet-ke-web/" + Lang + "/" + Globals.ConvertToVietnameseNotSignature(Title) + "-" + ArticleID + "-" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + ".html";
                string detailUrl = "ArticleDetail.aspx?ID=" + ArticleID + "&CatID=" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + Lang;
                if (i <= 4)
                    html += "<a href=\"" + detailUrl + "\">" + Title + "</a>\n";
                else if (i == 5) //Nhận diện thương hiệu
                {
                    html += "<a href=\"" + detailUrl + "\">" + Title + "</a>\n";
                    html += "<ul>";
                    for (int j = 0; j < dsNDTH.Tables[0].Rows.Count; j++)
                    {
                        //string detailUrl1 = "dich-vu-thiet-ke-web/" + Lang + "/" + Globals.ConvertToVietnameseNotSignature(DataObject.GetString(dsNDTH, j, "Title")) + "-" + DataObject.GetString(dsNDTH, j, "ArticleID") + "-" + DataObject.GetString(dsNDTH, j, "CategoryID") + ".html";
                        string detailUrl1 = "ArticleDetail.aspx?ID=" + DataObject.GetString(dsNDTH, j, "ArticleID") + "&CatID=" + DataObject.GetString(dsNDTH, j, "CategoryID") + "&Lang=" + Lang;
                        html += "<li><a href=\"" + detailUrl1 + "\">" + DataObject.GetString(dsNDTH, j, "Title") + "</a></li>";
                    }
                    html += "</ul>";
                }
                else if (i == 6) //Xây dựng thương hiệu
                {
                    html += "<a href=\"" + detailUrl + "\">" + Title + "</a>\n";
                    html += "<ul>";
                    for (int k = 0; k < dsXDTH.Tables[0].Rows.Count; k++)
                    {
                        //string detailUrl1 = "dich-vu-thiet-ke-web/" + Lang + "/" + Globals.ConvertToVietnameseNotSignature(DataObject.GetString(dsXDTH, k, "Title")) + "-" + DataObject.GetString(dsXDTH, k, "ArticleID") + "-" + DataObject.GetString(dsXDTH, k, "CategoryID") + ".html";
                        string detailUrl1 = "ArticleDetail.aspx?ID=" + DataObject.GetString(dsXDTH, k, "ArticleID") + "&CatID=" + DataObject.GetString(dsXDTH, k, "CategoryID") + "&Lang=" + Lang;
                        html += "<li><a href=\"" + detailUrl1 + "\">" + DataObject.GetString(dsXDTH, k, "Title") + "</a></li>";
                    }
                    html += "</ul>";
                }
                html += "</li>";
            }
            html += "</ul>";
            html += "</div>";
            divContent.InnerHtml = html;
        }
        catch { }
    }
}
