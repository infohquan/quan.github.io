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

public partial class CMS_Display_Utilities_Menu_MenuVnExpress_DynamicArrMenuJs : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    private DataSet DsGetCategoryByParentCategoryID(string t, string Lang)
    {
        ArticleCategory objCat = new ArticleCategory();
        DataSet dsCategory = objCat.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, 0, Lang, t);
        return dsCategory;
    }

    public void LoadDynamicArrMenuJs()
    {
        string html = "";
        string Lang = Globals.GetLang();
        AboutUs obj = new AboutUs();
        ArticleCategory objCat = new ArticleCategory();
        Catalog objCatalog = new Catalog();
        DataSet dsAboutUs = obj.GetAllAboutUs("Article", Globals.AgentCatID, Lang);
        //DataSet dsCategory = objCat.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, 0, Lang, t);
        DataSet dsNewsCate = DsGetCategoryByParentCategoryID("news", Lang);
        html += "var menu_fid = new Array(";
        html += "1,";		// Trang chu
        html += "2,";		// Gioi thieu
        html += "3,";		// Tin tuc";
        html += "4,";		// San pham";
        html += "5,";		// Hinh anh";
        html += "6";		// Lien he";
        string s = "";
        for (int i = 0; i < dsAboutUs.Tables[0].Rows.Count; i++)
        {
            if (i < 10) s = "0" + i.ToString();
                html += ",2" + s;		// Gioi thieu i
        }
        for (int i = 0; i < dsNewsCate.Tables[0].Rows.Count; i++)
        {
            if (i < 10) s = "0" + i.ToString();
            html += ",3" + s;
        }
        html += ");";

        html += "var menu_pid = new Array(";
        html += "0,0,0,0,0,0"; //6 số 0 ứng với 6 parent menu item
        for (int i = 0; i < dsAboutUs.Tables[0].Rows.Count; i++)
            html += ",2";
        for (int i = 0; i < dsNewsCate.Tables[0].Rows.Count; i++)
            html += ",3";
        html += ");";

        html += "var menu_name = new Array(";
        html += "'Trang chủ',";
        html += "'Giới thiệu',";
        html += "'Tin tức',";
        html += "'Sản phẩm',";
        html += "'Hình ảnh',";
        html += "'Liên hệ'";
        for (int i = 0; i < dsAboutUs.Tables[0].Rows.Count; i++)
            html += ",'" + DataObject.GetString(dsAboutUs, i, "Title") + "'";
        for (int i = 0; i < dsNewsCate.Tables[0].Rows.Count; i++)
            html += ",'" + DataObject.GetString(dsNewsCate, i, "CategoryName") + "'";
        html += ");";


        html += "var menu_path = new Array(";
        html += "'" + Globals.ApplicationPath + "Default.aspx',";
        html += "'" + Globals.ApplicationPath + "AboutUs.aspx',";
        html += "'" + Globals.ApplicationPath + "ArticleList.aspx?t=news',";
        html += "'" + Globals.ApplicationPath + "ProductList.aspx',";
        html += "'" + Globals.ApplicationPath + "Gallery.aspx',";
        html += "'" + Globals.ApplicationPath + "Contact.aspx?t=CustomerIdea'";
        for (int i = 0; i < dsAboutUs.Tables[0].Rows.Count; i++)
            html += ",'" + Globals.ApplicationPath + "AboutUs.aspx?ID=" + DataObject.GetString(dsAboutUs, i, "ArticleID") + "&Lang=" + Lang + "'";
        for (int i = 0; i < dsNewsCate.Tables[0].Rows.Count; i++)
            html += ",'" + Globals.ApplicationPath + "ArticleList.aspx?t=news&CatID=" + DataObject.GetString(dsNewsCate, i, "CategoryID") + "&Lang=" + Lang + "'";
        html += ");";

        html += "var menu_show = new Array(";
        html += "0,0,0,0,0,0";     //menu parent có 6 item
        for (int i = 0; i < dsAboutUs.Tables[0].Rows.Count; i++)
            html += ",0";
        for (int i = 0; i < dsNewsCate.Tables[0].Rows.Count; i++)
            html += ",0";
        html += ");";

        Response.Write(html);
    }
}
