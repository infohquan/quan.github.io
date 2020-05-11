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

public partial class WebAdmin_Article_Category : System.Web.UI.Page
{
    private string Lang;
    private string t; //ContentType
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            t = Globals.GetStringFromQueryString("t");
            btnDelete.OnClientClick = "if (confirm('Nếu xóa chuyên mục này, tất cả tin của chuyên mục này sẽ bị mất hết! Bạn có chắc là muốn xóa hay không?') == false) return false;";
            if (!IsPostBack)
            {
                string Action = Globals.GetStringFromQueryString("Action");
                Globals.BindLanguageToDDL(ddlLanguage);
                Lang = ddlLanguage.SelectedValue;
                Globals.BindLanguageToDDL(ddlLanguage2);
                CommonDropDownList objDDL = new CommonDropDownList();
                objDDL.LoadDropDownListArticleCategory(ddlCategory, Lang, "Root", t);
                LoadTreeViewCategory(TreeViewCategory, Lang);
                if (Action == "Edit")
                {
                    btnSave.Text = "Cập nhật";
                    LoadDataEdit();
                    linkAddCategory.Visible = true;
                    linkAddCategory.NavigateUrl = Globals.GetAdminFolderUrl() + "Article/Category.aspx?t=" + t;
                }
                else
                    btnSave.Text = "Thêm";
                LoadText(Action);
            }
        }
        catch { }
    }
    private void LoadText(string Action)
    {
        if (Action == "Edit")
        {
            if (t == "news")
            {
                lblTitle1.InnerText = "Cập nhật Chuyên mục Tin tức";
                lblTitle2.InnerText = "Cập nhật Chuyên mục Tin tức";
                linkAddCategory.Text = "Thêm mới Chuyên mục tin tức";
            }
            else if (t == "real_estate")
            {
                lblTitle1.InnerText = "Cập nhật Chuyên mục Sàn giao dịch";
                lblTitle2.InnerText = "Cập nhật Chuyên mục Sàn giao dịch";
            }
            else if (t == "apartment")
            {
                lblTitle1.InnerText = "Cập nhật Chuyên mục Căn hộ chung cư";
                lblTitle2.InnerText = "Cập nhật Chuyên mục Căn hộ chung cư";
            }
            else if (t == "service")
            {
                lblTitle1.InnerText = "Cập nhật Chuyên mục Dịch vụ";
                lblTitle2.InnerText = lblTitle1.InnerText;
                linkAddCategory.Text = "Thêm mới Chuyên mục Dịch vụ";
            }
            else if (t == "project")
            {
                lblTitle1.InnerText = "Cập nhật Chuyên mục Dự án";
                lblTitle2.InnerText = lblTitle1.InnerText;
                linkAddCategory.Text = "Thêm mới Chuyên mục Dự án";
            }
        }
        else if (Action == "")
        {
            if (t == "news")
            {
                lblTitle1.InnerText = "Thêm Chuyên mục Tin tức mới";
                lblTitle2.InnerText = "Thêm Chuyên mục Tin tức mới";
                lblTitle3.InnerText = "Danh sách Chuyên mục Tin tức";
            }
            else if (t == "real_estate")
            {
                lblTitle1.InnerText = "Thêm Chuyên mục Sàn giao dịch mới";
                lblTitle2.InnerText = "Thêm Chuyên mục Sàn giao dịch mới";
                lblTitle3.InnerText = "Danh sách Chuyên mục Sàn giao dịch";
            }
            else if (t == "apartment")
            {
                lblTitle1.InnerText = "Thêm Chuyên mục Căn hộ chung cư mới";
                lblTitle2.InnerText = "Thêm Chuyên mục Căn hộ chung cư mới";
                lblTitle3.InnerText = "Danh sách Chuyên mục Căn hộ chung cư";
            }
            else if (t == "service")
            {
                lblTitle1.InnerText = "Thêm Chuyên mục Dịch vụ mới";
                lblTitle2.InnerText = lblTitle1.InnerText;
                lblTitle3.InnerText = "Danh sách Chuyên mục Dịch vụ";
            }
            else if (t == "project")
            {
                lblTitle1.InnerText = "Thêm Chuyên mục Dự án mới";
                lblTitle2.InnerText = lblTitle1.InnerText;
                lblTitle3.InnerText = "Danh sách Chuyên mục Dự án";
            }
        }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        CommonDropDownList objDDL = new CommonDropDownList();
        objDDL.LoadDropDownListArticleCategory(ddlCategory, ddlLanguage.SelectedValue, "Root", t);
    }
    /// <summary>
    /// Load các danh mục chủng loại Tin tức vào TreeViewCategory 
    /// </summary>
    /// <param name="TreeViewCategory"></param>
    /// <param name="Lang"></param>
    public void LoadTreeViewCategory(TreeView TreeViewCategory, string Lang)
    {
        try
        {
            TreeViewCategory.Nodes.Clear();
            ArticleCategory obj = new ArticleCategory();
            DataSet dsParent = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, 0, Lang, t);
            for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
            {
                TreeNode newNode = new TreeNode(Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryName"]), Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryID"]));
                newNode.ToolTip = Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryName"]);
                newNode.NavigateUrl = "Category.aspx?Action=Edit&CateID=" + Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + ddlLanguage2.SelectedValue + "&t=" + t;
                newNode.ExpandAll();
                //RootNode.ChildNodes.Add(newNode);
                TreeViewCategory.Nodes.Add(newNode);
                PopulateCatagoryNode(newNode, Lang);
            }
        }
        catch { }
    }
    /// <summary>
    /// Điền vào node con
    /// </summary>
    /// <param name="n"></param>
    private void PopulateCatagoryNode(TreeNode n, string Lang)
    {
        try
        {
            ArticleCategory obj = new ArticleCategory();
            DataSet dsChild = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, Convert.ToInt32(n.Value), Lang, t);
            if (dsChild.Tables.Count > 0)
            {
                for (int i = 0; i < dsChild.Tables[0].Rows.Count; i++)
                {
                    TreeNode newNode = new TreeNode(Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryName"]), Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryID"]));
                    newNode.Expand();
                    newNode.ToolTip = Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryName"]);
                    newNode.NavigateUrl = "Category.aspx?Action=Edit&CateID=" + Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + ddlLanguage2.SelectedValue + "&t=" + t;
                    n.ChildNodes.Add(newNode);
                    PopulateCatagoryNode(newNode, Lang);
                }
            }
        }
        catch { }
    }
    protected void ddlLanguage2_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadTreeViewCategory(TreeViewCategory, ddlLanguage2.SelectedValue);
    }
    private void LoadDataEdit()
    {
        try
        {
            ArticleCategory obj = new ArticleCategory();
            int CateID = Globals.GetIntFromQueryString("CateID");
            int ParentCateID = obj.GetParentCategoryIDByCategoryID(CateID, t);
            string LangEdit = Globals.GetStringFromQueryString("Lang");
            DataSet ds = obj.GetCategoryByCategoryID("ArticleCategory", CateID, LangEdit);
            ddlLanguage.SelectedValue = LangEdit;
            CommonDropDownList objDDL = new CommonDropDownList();
            objDDL.LoadDropDownListArticleCategory(ddlCategory, LangEdit, "Root", t);
            ddlCategory.SelectedValue = ParentCateID.ToString();
            txtCategoryName.Value = Convert.ToString(ds.Tables[0].Rows[0]["CategoryName"]);
            txtCategoryOrder.Value = Convert.ToString(ds.Tables[0].Rows[0]["CategoryOrder"]);
            //
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            LoadTreeViewCategory(TreeViewCategory, ddlLanguage2.SelectedValue);
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        //try
        {
            ArticleCategory obj = new ArticleCategory();
            string CategoryName = txtCategoryName.Value.Trim();
            int CategoryOrder = Convert.ToInt32(txtCategoryOrder.Value);
            int ParentCategoryID = Convert.ToInt32(ddlCategory.SelectedValue);
            string Action = Globals.GetStringFromQueryString("Action");
            int kq = -1;
            if (Action == "Edit") //Cập nhật
            {
                int CateID = Globals.GetIntFromQueryString("CateID");
                kq = obj.UpdateCategory(CateID, ddlLanguage.SelectedValue, Globals.AgentCatID, CategoryName, CategoryOrder, ParentCategoryID);
                ShowMessage(kq, "cập nhật");
            }
            else //Thêm mới
            {
                kq = obj.InsertCategory(ddlLanguage.SelectedValue, Globals.AgentCatID, CategoryName, CategoryOrder, ParentCategoryID, t);
                ShowMessage(kq, "thêm mới");
            }
            //
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            LoadTreeViewCategory(TreeViewCategory, ddlLanguage2.SelectedValue);
        }
        //catch (FormatException)
        //{
        //    MessageBox.Show("Vui lòng nhập thứ tự ParentCateID là Số Nguyên!");
        //    txtCategoryOrder.Focus();
        //}
    }
    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Nhóm tin tức thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Nhóm tin tức!";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtCategoryName.Value = "";
        txtCategoryOrder.Value = "";
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int CateID = Globals.GetIntFromQueryString("CateID");
            ArticleCategory obj = new ArticleCategory();
            Article objA = new Article();
            int kq = -1;
            DataSet ds = objA.GetArticleByCateID("Article", CateID, ddlLanguage.SelectedValue, t);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                Globals.DeleteFile(Convert.ToString(ds.Tables[0].Rows[i]["ImageURL"]), "ImageFiles/Articles");
                objA.DeleteArticle(Convert.ToInt32(Convert.ToString(ds.Tables[0].Rows[i]["ArticleID"])), Globals.AgentCatID, t);
            }
            kq = obj.DeleteCategory(CateID);
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            LoadTreeViewCategory(TreeViewCategory, ddlLanguage2.SelectedValue);
            ShowMessage(kq, "xóa");
        }
        catch { }
    }
}
