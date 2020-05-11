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

public partial class WebAdmin_AboutUs_AboutUsAddEdit : System.Web.UI.Page
{
    private string Lang;
    protected void Page_Load(object sender, EventArgs e)
    {
        string Action = Globals.GetStringFromQueryString("Action");
        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            if (Action == "Edit")
            {
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
        try
        {
            int ArticleID = Globals.GetIntFromQueryString("ArticleID");
            int CateID = Globals.GetIntFromQueryString("CateID");
            string LangEdit = Globals.GetStringFromQueryString("Lang");

            lblTitle1.InnerText = "Cập nhật Giới thiệu";
            lblTitle2.InnerText = "Cập nhật Giới thiệu";
            AboutUs obj = new AboutUs();
            DataSet ds = new DataSet();
            ddlLanguage.SelectedValue = LangEdit;
            txtCategoryName.Value = obj.GetCategoryNameByCategoryID(CateID, LangEdit);

            ds = obj.GetAboutUsByArticleID("Article", ArticleID, LangEdit);
            txtTitle.Value = Convert.ToString(ds.Tables[0].Rows[0]["Title"]);
            txtKeyword.Value = Convert.ToString(ds.Tables[0].Rows[0]["Keyword"]);
            txtImageDesc.Value = Convert.ToString(ds.Tables[0].Rows[0]["ImageDesc"]);
            txtAuthor.Value = Convert.ToString(ds.Tables[0].Rows[0]["Authors"]);
            fckContent.Value = Convert.ToString(ds.Tables[0].Rows[0]["Content"]);
            ImageAboutUs.Src = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["ImageURL"]);
        }
        catch { }
    }
    private void Save()
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            AboutUs obj = new AboutUs();
            int CateID = -1;
            string Title = txtTitle.Value.Trim();
            string Content = fckContent.Value.Trim();
            string ImageURL = Convert.ToString(Session["FileImageName"]);
            string ImageDesc = txtImageDesc.Value.Trim();
            string Authors = txtAuthor.Value.Trim();
            string Keyword = txtKeyword.Value;
            if (Action == "Edit")
            {
                int ArticleID = Globals.GetIntFromQueryString("ArticleID");
                CateID = Globals.GetIntFromQueryString("CateID");
                obj.UpdateArticleAboutUs(ArticleID, ddlLanguage.SelectedValue, Title, Content, ImageURL, ImageDesc, Authors, Keyword);
            }
            else
            {
                obj.InsertArticleAboutUs(Globals.AgentCatID, ddlLanguage.SelectedValue, Title, Content, ImageURL, ImageDesc, Authors, Keyword);
            }
            Session.Remove("FileImageName");
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "AboutUs/AboutUsList.aspx");
    }
    private void Reset()
    {
        txtAuthor.Value = "";
        txtImageDesc.Value = "";
        txtCategoryName.Value = "";
        txtTitle.Value = "";
        fckContent.Value = "";
        txtKeyword.Value = "";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
}
