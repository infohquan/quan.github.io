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

public partial class WebAdmin_AboutUs_AboutUsList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                Globals.BindLanguageToDDL(ddlLanguage);
                LoadGridViewAboutUs();
            }
        }
        catch { }
    }

    private void LoadGridViewAboutUs()
    {
        try
        {
            AboutUs obj = new AboutUs();
            DataSet ds = new DataSet();
            ds = obj.GetAllAboutUs("Article", Globals.AgentCatID, ddlLanguage.SelectedValue);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewAboutUs, ds);
        }
        catch { }
    }
    protected void gridViewAboutUs_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa giới thiệu này";
                btnDelete.ToolTip = "Xóa giới thiệu này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa giới thiệu này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewAboutUs_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewAboutUs.Rows[e.NewEditIndex];
            String CateID = ((Label)row.Cells[4].FindControl("lblCateID")).Text;
            String ArticleID = ((Label)row.Cells[0].FindControl("lblArticleID")).Text;
            Response.Redirect("AboutUsAddEdit.aspx?Action=Edit&ArticleID=" + ArticleID + "&CateID=" + CateID + "&Lang=" + ddlLanguage.SelectedValue);
        }
        catch { }
    }
    protected void gridViewAboutUs_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewAboutUs.PageIndex = e.NewPageIndex;
        LoadGridViewAboutUs();
    }
    protected void gridViewAboutUs_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewAboutUs.Rows[e.RowIndex];
            int ArticleID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblArticleID")).Text);
            AboutUs obj = new AboutUs();
            String imageFileName = obj.GetImageURLByArticleID(ArticleID);
            if (imageFileName != "")
                Globals.DeleteFile(imageFileName, "ImageFiles/Articles");
            //Xóa
            int CateID = obj.GetCategoryIDByArticleID(ArticleID);
            obj.DeleteAboutUsCategory(CateID);
            obj.DeleteArticleAboutUs(ArticleID);
            LoadGridViewAboutUs();
        }
        catch { }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewAboutUs(); 
    }
}
