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
using Subgurim.Controles;

public partial class WebAdmin_Article_ArticleList : System.Web.UI.Page
{
    private string Lang;
    private string t;
    protected void Page_Load(object sender, EventArgs e)
    {
        t = Globals.GetStringFromQueryString("t");
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            Lang = ddlLanguage.SelectedValue;
            CommonDropDownList objDDL = new CommonDropDownList();
            objDDL.LoadDropDownListArticleCategory(ddlCategory, Lang, "--- Tất cả ---", t);
            LoadGridViewArticle(Lang, -1);
            LoadText();
            if (t == "bs")
            {
                ddlLanguage.Enabled = false;
            }
        }
    }
    private void LoadText()
    {
        if (t == "news")
            lblTitle1.InnerText = "Danh sách Tin tức";
        else if (t == "real_estate")
            lblTitle1.InnerText = "Danh sách Tin sàn giao dịch";
        else if (t == "project")
            lblTitle1.InnerText = "Danh sách Tin dự án";
        else if (t == "apartment")
            lblTitle1.InnerText = "Danh sách Tin căn hộ chung cư";
    }
    private void LoadGridViewArticle(string Lang, int CateID)
    {
        //try
        {
            Article objNews = new Article();
            ArticleCategory objCate = new ArticleCategory();
            DataSet ds = new DataSet();
            if (CateID != -1)
            {
                string StringCateID = objCate.GetStringCategoryIDByParentCateID(CateID, Globals.AgentCatID, Lang, t);
                ds = objNews.GetArticleByByStringCategoryID("Article", Lang, StringCateID, t);
            }
            else if (CateID == -1) //all
                ds = objNews.GetAllArticle("Article", Globals.AgentCatID, ddlLanguage.SelectedValue, t);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewArticle, ds);
        }
        //catch { }
    }
    protected void gridViewArticle_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[6].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[7].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa tin tức này";
                btnDelete.ToolTip = "Xóa tin tức này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa tin tức này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewArticle_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewArticle.Rows[e.NewEditIndex];
            String CateID = ((Label)row.Cells[5].FindControl("lblCateID")).Text;
            String ArticleID = ((Label)row.Cells[0].FindControl("lblArticleID")).Text;
            Response.Redirect("ArticleAddEdit.aspx?Action=Edit&ArticleID=" + ArticleID + "&CateID=" + CateID + "&Lang=" + ddlLanguage.SelectedValue + "&t=" + t);
        }
        catch { }
    }
    protected void gridViewArticle_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewArticle.PageIndex = e.NewPageIndex;
        LoadGridViewArticle(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCategory.SelectedValue));
    }
    protected void gridViewArticle_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewArticle.Rows[e.RowIndex];
            int ArticleID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblArticleID")).Text);
            Article obj = new Article();
            String imageFileName = obj.GetImageURLByArticleID(ArticleID);
            Globals.DeleteFile(imageFileName, "ImageFiles/Articles");
            //Xóa tin
            obj.DeleteArticle(ArticleID, Globals.AgentCatID, t);
            LoadGridViewArticle(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCategory.SelectedValue));
        }
        catch { }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewArticle(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCategory.SelectedValue));
        CommonDropDownList objDDL = new CommonDropDownList();
        objDDL.LoadDropDownListArticleCategory(ddlCategory, ddlLanguage.SelectedValue, "--- Tất cả ---", t);
    }
    protected void ddlCategory_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewArticle(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCategory.SelectedValue));
    }
    protected void btnSearch_Click(object sender, EventArgs e)
    {
        //try
        //{
        //    string strSearch = txtSearch.Text.Trim();
        //    string Lang = ddlLanguage.SelectedValue;
        //    Article obj = new Article();
        //    DataSet ds = obj.SearchArticleByText("Article", strSearch, Lang, Globals.AgentCatID);
        //    GridViewHelper gvHelper = new GridViewHelper();
        //    gvHelper.FillData(gridViewArticle, ds);
        //}
        //catch { }
    }
}
