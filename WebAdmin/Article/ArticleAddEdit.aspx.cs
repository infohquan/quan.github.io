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

public partial class WebAdmin_Article_ArticleAddEdit : System.Web.UI.Page
{
    private string t;
    protected void Page_Load(object sender, EventArgs e)
    {
        string Action = Globals.GetStringFromQueryString("Action");
        t = Globals.GetStringFromQueryString("t");
        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            CommonDropDownList objCateDDL = new CommonDropDownList();
            objCateDDL.LoadDropDownListArticleCategory(ddlCategory, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---", t);
            
            if (Action == "Edit")
                LoadDataEdit();
            LoadText(Action);
            if (t == "service" || t == "ssg" || t == "ssf" || t == "pt" || t == "job" || t == "text" || t == "agent" || t == "promotion" || t == "ndth" || t == "xdth")
            {
                //ddlCategory.SelectedIndex = 1;
                //ddlCategory.Enabled = false;
                trCategory.Visible = false;
            }
        }
    }
    private void LoadText(string Action)
    {
        if (Action == "Edit")
        {
            if (t == "news")
            {
                lblTitle1.InnerText = "Cập nhật Tin tức";
                lblTitle2.InnerText = "Cập nhật Tin tức";
            }
            else if (t == "service")
            {
                lblTitle1.InnerText = "Cập nhật Dịch vụ";
                lblTitle2.InnerText = "Cập nhật Dịch vụ";
            }
            else if (t == "showroom")
            {
                lblTitle1.InnerText = "Cập nhật Hệ thống phân phối";
                lblTitle2.InnerText = "Cập nhật Hệ thống phân phối";
            }
            else if (t == "real_estate")
            {
                lblTitle1.InnerText = "Cập nhật Tin sàn giao dịch";
                lblTitle2.InnerText = "Cập nhật Tin sàn giao dịch";
            }
            else if (t == "project")
            {
                lblTitle1.InnerText = "Cập nhật Tin dự án";
                lblTitle2.InnerText = "Cập nhật Tin dự án";
            }
            else if (t == "apartment")
            {
                lblTitle1.InnerText = "Cập nhật Tin căn hộ chung cư";
                lblTitle2.InnerText = "Cập nhật Tin căn hộ chung cư";
            }
            else if (t == "job")
            {
                lblTitle1.InnerText = "Cập nhật Tin tuyển dụng";
                lblTitle2.InnerText = "Cập nhật Tin tuyển dụng";
            }
            else if (t == "text")
            {
                lblTitle1.InnerText = "Cập nhật Văn bản";
                lblTitle2.InnerText = "Cập nhật Văn bản";
            }
            else if (t == "guestbook")
            {
                lblTitle1.InnerText = "Cập nhật Lưu bút";
            }
            else if (t == "ssg")
                lblTitle1.InnerText = "Cập nhật bài viết Hướng dẫn làm bánh";
            else if (t == "ssf")
                lblTitle1.InnerText = "Cập nhật bài viết Hương vị & Nguyên liệu";
            else if (t == "pt")
                lblTitle1.InnerText = "Cập nhật bài viết Bảng giá sản phẩm";
            lblTitle2.InnerText = lblTitle1.InnerText;
        }
        else if (Action == "")
        {
            if (t == "news")
            {
                lblTitle1.InnerText = "Thêm Tin tức mới";
                lblTitle2.InnerText = "Thêm Tin tức mới";
            }
            else if (t == "service")
            {
                lblTitle1.InnerText = "Thêm Dịch vụ mới";
                lblTitle2.InnerText = "Thêm Dịch vụ mới";
            }
            else if (t == "showroom")
            {
                lblTitle1.InnerText = "Thêm Hệ thống phân phối mới";
                lblTitle2.InnerText = "Thêm Hệ thống phân phối mới";
            }
            else if (t == "real_estate")
            {
                lblTitle1.InnerText = "Thêm Tin sàn giao dịch mới";
                lblTitle2.InnerText = "Thêm Tin sàn giao dịch mới";
            }
            else if (t == "project")
            {
                lblTitle1.InnerText = "Thêm Tin dự án";
                lblTitle2.InnerText = "Thêm Tin dự án";
            }
            else if (t == "apartment")
            {
                lblTitle1.InnerText = "Thêm Tin căn hộ chung cư mới";
                lblTitle2.InnerText = "Thêm Tin căn hộ chung cư mới";
            }
            else if (t == "job")
            {
                lblTitle1.InnerText = "Thêm Tin tuyển dụng mới";
                lblTitle2.InnerText = "Thêm Tin tuyển dụng mới";
            }
            else if (t == "text")
            {
                lblTitle1.InnerText = "Thêm Văn bản mới";
                lblTitle2.InnerText = "Thêm Văn bản mới";
            }
            else if (t == "ssg")
                lblTitle1.InnerText = "Thêm bài viết Hướng dẫn làm bánh";
            else if (t == "ssf")
                lblTitle1.InnerText = "Thêm bài viết Hương vị & Nguyên liệu";
            else if (t == "pt")
                lblTitle1.InnerText = "Thêm bài viết Bảng giá sản phẩm";
            lblTitle2.InnerText = lblTitle1.InnerText;
        }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        CommonDropDownList objCateDDL = new CommonDropDownList();
        objCateDDL.LoadDropDownListArticleCategory(ddlCategory, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---", t);
        if (t == "agent" || t == "promotion" || t == "service" || t == "job" || t == "text" || t == "ndth" || t == "xdth")
        {
            ddlCategory.SelectedIndex = 1;
            ddlCategory.Enabled = false;
        }
    }
    private void LoadDataEdit()
    {
        try
        {
            int ArticleID = Globals.GetIntFromQueryString("ArticleID");
            int CateID = Globals.GetIntFromQueryString("CateID");
            string LangEdit = Globals.GetStringFromQueryString("Lang");

            Article objNews = new Article();
            DataSet dsNews = new DataSet();
            ddlLanguage.SelectedValue = LangEdit;
            CommonDropDownList objCateDDL = new CommonDropDownList();
            objCateDDL.LoadDropDownListArticleCategory(ddlCategory, LangEdit, "--- Vui lòng chọn ---", t);
            ddlCategory.SelectedValue = CateID.ToString();

            dsNews = objNews.GetArticleByArticleID("Article", ArticleID, LangEdit);
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
        catch { }
    }
    private void Save()
    {
        try
        {
            Article obj = new Article();
            int CategoryID = Convert.ToInt32(ddlCategory.SelectedValue);
            string Title = txtTitle.Value.Trim();
            string Excerpt = txtExcerpt.Value.Trim();
            string Content = fckContent.Value.Trim();
            string ImageDesc = txtImageDesc.Value.Trim();
            string Authors = txtAuthor.Value.Trim();
            string Keyword = txtKeyword.Value;
            int ViewIndex = Convert.ToInt32(rblViewIndex.SelectedValue);
            bool IsHot = cbHotArticle.Checked;
            string Action = Globals.GetStringFromQueryString("Action");
            if (Action == "Edit")
            {
                int ArticleID = Globals.GetIntFromQueryString("ArticleID");
                obj.UpdateArticle(ArticleID, CategoryID, ddlLanguage.SelectedValue, Title, Excerpt, Content, Convert.ToString(Session["FileImageName"]), ImageDesc, Authors, Keyword, ViewIndex, IsHot);
            }
            else
            {
                obj.InsertArticle(Globals.AgentCatID, ddlLanguage.SelectedValue, CategoryID, Title, Excerpt, Content, Convert.ToString(Session["FileImageName"]), ImageDesc, Authors, Keyword, ViewIndex, IsHot, t);
            }
            Session.Remove("FileImageName");
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "Article/ArticleList.aspx?t=" + t);
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "Article/ArticleAddEdit.aspx?t=" + t);
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
        ddlCategory.SelectedValue = "-1";
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
            obj.DeleteArticle(ArticleID, Globals.AgentCatID, t);
            Response.Redirect("ArticleList.aspx?t=" + t);
        }
        catch { }
    }
}
