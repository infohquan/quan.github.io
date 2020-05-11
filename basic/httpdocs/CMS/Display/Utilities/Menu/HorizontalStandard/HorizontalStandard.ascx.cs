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

public partial class CMS_Display_Utilities_Menu_HorizontalStandard_HorizontalStandard : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    /// <summary>
    /// Load tên danh mục sản phẩm vào menu
    /// </summary>
    public void LoadProductCatalogMenu()
    {
        try
        {
            string Lang = Globals.GetLang();
            Catalog objCat = new Catalog();
            DataSet ds = objCat.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, 0, Lang);
            string CatID = "";
            string CatName = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                CatID = Convert.ToString(ds.Tables[0].Rows[i]["ID"]);
                CatName = Convert.ToString(ds.Tables[0].Rows[i]["TenNhom"]);
                Response.Write("<li><a href=\"" + Globals.ApplicationPath + "ProductList.aspx?CatID=" + CatID + "&Lang=" + Lang + "\">" + CatName + "</a>\n");
                //Response.Write("<li><a href=\"" + Globals.ApplicationPath + "cdg/" + Lang + "/" + CatID + "/" + t + "/" + Globals.ConvertToVietnameseNotSignature(CategoryName) + ".html\">" + CategoryName + "</a>\n");
                Response.Write("</li>\n");
            }
        }
        catch { }
    }
    /// <summary>
    /// Load tên chuyên mục tin tức vào menu
    /// </summary>
    /// <param name="t"></param>
    public void LoadArticleCategoryMenu(string t)
    {
        try
        {
            string Lang = Globals.GetLang();
            ArticleCategory objCat = new ArticleCategory();
            DataSet ds = objCat.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, 0, Lang, t);
            string CatID = "";
            string CategoryName = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                CatID = Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]);
                CategoryName = Convert.ToString(ds.Tables[0].Rows[i]["CategoryName"]);
                Response.Write("<li><a href=\"" + Globals.ApplicationPath + "ArticleList.aspx?CatID=" + CatID + "&t=" + t + "&Lang=" + Lang + "\">" + CategoryName + "</a>\n");
                //Response.Write("<li><a href=\"" + Globals.ApplicationPath + "cdg/" + Lang + "/" + CatID + "/" + t + "/" + Globals.ConvertToVietnameseNotSignature(CategoryName) + ".html\">" + CategoryName + "</a>\n");
                Response.Write("</li>\n");
            }
        }
        catch { }
    }
    /// <summary>
    /// Load tiêu đề bài viết giới thiệu vào menu
    /// </summary>
    public void LoadAboutUsMenu()
    {
        try
        {
            string Lang = Globals.GetLang();
            AboutUs obj = new AboutUs();
            DataSet dsAboutUs = obj.GetAllAboutUs("Article", Globals.AgentCatID, Lang);
            string ArticleID = "";
            string Title = "";
            for (int i = 0; i < dsAboutUs.Tables[0].Rows.Count; i++)
            {
                ArticleID = Convert.ToString(dsAboutUs.Tables[0].Rows[i]["ArticleID"]);
                Title = Convert.ToString(dsAboutUs.Tables[0].Rows[i]["Title"]);
                Response.Write("<li><a href=\"" + Globals.ApplicationPath + "AboutUs.aspx?ID=" + ArticleID + "&Lang=" + Lang + "\">" + Title + "</a>\n");
                //Response.Write("<li><a href=\"" + Globals.ApplicationPath + "gioi-thieu/" + Lang + "/" + ArticleID + "/" + Globals.ConvertToVietnameseNotSignature(Title) +  ".html\">" + Title + "</a>\n");
                Response.Write("</li>\n");
            }
        }
        catch { }
    }

    /// <summary>
    /// Load tiêu đề bài viết (tin tức, dịch vụ, ...) vào menu
    /// </summary>
    /// <param name="t"></param>
    public void LoadArticlesMenu(string t)
    {
        try
        {
            string Lang = Globals.GetLang();
            MyTool.Article obj = new MyTool.Article();
            DataSet ds = obj.GetAllArticle("Article", Globals.AgentCatID, Lang, t);
            string ArticleID = "";
            string Title = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ArticleID = Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"]);
                Title = Convert.ToString(ds.Tables[0].Rows[i]["Title"]);
                Response.Write("<li><a href=\"" + Globals.ApplicationPath + "ArticleDetail.aspx?ID=" + ArticleID + "&CatID=" + Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + Lang + "\">" + Title + "</a>\n");
                Response.Write("</li>\n");
            }
        }
        catch { }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
     //   string TextSearch = txtSearch.Text.Trim();
       // Response.Redirect("ArticleList.aspx?TypeSearch=All&Text=" + TextSearch + "&Lang=" + Globals.GetLang());
    }
}
