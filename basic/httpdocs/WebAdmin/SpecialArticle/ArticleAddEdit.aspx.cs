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

public partial class WebAdmin_SpecialArticle_ArticleAddEdit : System.Web.UI.Page
{
    private string Lang;
    private string Action;
    public string SpecType;
    protected void Page_Load(object sender, EventArgs e)
    {
        Action = Globals.GetStringFromQueryString("Action");
        SpecType = Globals.GetStringFromQueryString("Type");

        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            Globals.BindLanguageToDDL(ddlLanguageToView);
            CommonDropDownList objDDL = new CommonDropDownList();
            LoadSpecialArticle(ddlLanguageToView.SelectedValue, SpecType);
            if (Action == "Edit")
            {
                Lang = Globals.GetStringFromQueryString("Lang");
                lblTitle1.InnerText = "Cập nhật Tin tức";
                lblTitle2.InnerText = "Cập nhật Tin tức";
                LoadDataEdit();
            }
            else
            {
                Lang = ddlLanguage.SelectedValue;
            }
        }
    }
    private void LoadDataEdit()
    {
        //try
        {
            int ArticleID = Globals.GetIntFromQueryString("ArticleID");
            string LangEdit = Globals.GetStringFromQueryString("Lang");

            Article objNews = new Article();
            DataSet dsNews = new DataSet();
            ddlLanguage.SelectedValue = LangEdit;

            dsNews = objNews.GetSpecialArticleByArticleID("Article", ArticleID, LangEdit);
            txtTitle.Value = Convert.ToString(dsNews.Tables[0].Rows[0]["Title"]);
            txtKeyword.Value = Convert.ToString(dsNews.Tables[0].Rows[0]["Keyword"]);
            txtExcerpt.Value = Convert.ToString(dsNews.Tables[0].Rows[0]["Excerpt"]);
            txtImageDesc.Value = Convert.ToString(dsNews.Tables[0].Rows[0]["ImageDesc"]);
            txtAuthor.Value = Convert.ToString(dsNews.Tables[0].Rows[0]["Authors"]);
            fckContent.Value = Convert.ToString(dsNews.Tables[0].Rows[0]["Content"]);
            ImageArticle.Src = Globals.GetUploadsUrl() + Convert.ToString(dsNews.Tables[0].Rows[0]["ImageURL"]);
            rblViewIndex.SelectedValue = Convert.ToString(dsNews.Tables[0].Rows[0]["ViewIndex"]);
            cbHotArticle.Checked = Convert.ToBoolean(dsNews.Tables[0].Rows[0]["IsHot"]);
            Session["FileImageName"] = Convert.ToString(dsNews.Tables[0].Rows[0]["ImageURL"]);
        }
        //catch { }
    }
    private void Save()
    {
        //try
        {
            Article obj = new Article();
            
            string Title = txtTitle.Value.Trim();
            string Excerpt = txtExcerpt.Value.Trim();
            string Content = fckContent.Value.Trim();
            string ImageDesc = txtImageDesc.Value.Trim();
            string Authors = txtAuthor.Value.Trim();
            string Keyword = txtKeyword.Value;
            int ViewIndex = Convert.ToInt32(rblViewIndex.SelectedValue);
            bool IsHot = cbHotArticle.Checked;
            string SpecType = Globals.GetStringFromQueryString("Type");
            if (Action == "Edit")
            {
                int ArticleID = Globals.GetIntFromQueryString("ArticleID");
                obj.UpdateSpecialArticle(ArticleID, ddlLanguage.SelectedValue, Title, Excerpt, Content, Convert.ToString(Session["FileImageName"]), ImageDesc, Authors, Keyword, ViewIndex, IsHot);
            }
            else
                obj.InsertSpecialArticle(Globals.AgentCatID, ddlLanguage.SelectedValue, Title, Excerpt, Content, Convert.ToString(Session["FileImageName"]), ImageDesc, Authors, Keyword, ViewIndex, IsHot, SpecType);
            Session.Remove("FileImageName");
        }
        //catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "SpecialArticle/ArticleAddEdit.aspx?type=" + SpecType);
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "SpecialArticle/ArticleAddEdit.aspx?type=" + SpecType);
    }
    private void Reset()
    {
        txtAuthor.Value = "";
        txtImageDesc.Value = "";
        txtTitle.Value = "";
        txtExcerpt.Value = "";
        fckContent.Value = "";
        txtKeyword.Value = "";
        cbHotArticle.Checked = true;
        //ImageArticle.Src = Globals.GetAdminImagesUrl() + "noimage.gif";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int ArticleID = Globals.GetIntFromQueryString("ArticleID");
            Article obj = new Article();
            String imageFileName = obj.GetImageURLByArticleID(ArticleID);
            Globals.DeleteFile(imageFileName, "ImageFiles/Articles");
            //Xóa tin
            obj.DeleteArticle(ArticleID, Globals.AgentCatID);
            Response.Redirect("ArticleAddEdit.aspx?Type=" + SpecType);
        }
        catch { }
    }

    private void LoadSpecialArticle(string Lang, string SpecType)
    {
        //try
        {
            Article objNews = new Article();
            ArticleCategory objCate = new ArticleCategory();
            DataSet ds = new DataSet();
            ds = objNews.GetSpecialArticle("Article", Globals.AgentCatID, Lang, SpecType);
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
                ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
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
            Response.Redirect("ArticleAddEdit.aspx?Action=Edit&ArticleID=" + ArticleID + "&CateID=" + CateID + "&Type=" + SpecType + "&Lang=" + ddlLanguageToView.SelectedValue + "#add_special_article");
        }
        catch { }
    }
    protected void gridViewArticle_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewArticle.PageIndex = e.NewPageIndex;
        LoadSpecialArticle(ddlLanguage.SelectedValue, SpecType);
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
            obj.DeleteArticle(ArticleID, Globals.AgentCatID);
            Response.Redirect("ArticleAddEdit.aspx?Type=" + SpecType);
        }
        catch { }
    }
    protected void ddlLanguageToView_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadSpecialArticle(ddlLanguageToView.SelectedValue, SpecType);
    }
}
