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

public partial class WebAdmin_AboutUs_AboutUsCategory : System.Web.UI.Page
{
    private string Lang; 
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //Globals.BindLanguageToDDL(ddlLanguage);
            //Lang = ddlLanguage.SelectedValue;
            //Globals.BindLanguageToDDL(ddlLanguage2);
            //LoadTreeViewAboutUsCategory(TreeViewAboutUsCategory, Lang);
            //if (Globals.GetStringFromQueryString("Action") == "Edit")
            //    LoadDataEdit();
        }
    }
    /// <summary>
    /// Load các danh mục chủng loại sản phẩm vào TreeViewAboutUsCategory 
    /// </summary>
    /// <param name="TreeViewAboutUsCategory"></param>
    /// <param name="Lang"></param>
    public void LoadTreeViewAboutUsCategory(TreeView TreeViewAboutUsCategory, string Lang)
    {
        try
        {
            TreeViewAboutUsCategory.Nodes.Clear();
            TreeNode RootNode = new TreeNode();
            if (Lang == "VN")
                RootNode = new TreeNode("NHÓM GIỚI THIỆU", "0");
            else
                RootNode = new TreeNode("ABOUT US CATEGORY", "0");
            RootNode.ToolTip = "Click vào đây để về Trang Thêm mới Chuyên mục Giới thiệu!";
            RootNode.NavigateUrl = "AboutUsAboutUsCategory.aspx";
            TreeViewAboutUsCategory.Nodes.Add(RootNode);
            RootNode.ExpandAll();
            AboutUs obj = new AboutUs();
            DataSet dsParent = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, 0, Lang);
            for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
            {
                TreeNode newNode = new TreeNode(Convert.ToString(dsParent.Tables[0].Rows[i]["CatagoryName"]), Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryID"]));
                newNode.ToolTip = Convert.ToString(dsParent.Tables[0].Rows[i]["CatagoryName"]);
                newNode.NavigateUrl = "AboutUsCategory.aspx?Action=Edit&CateID=" + Convert.ToString(dsParent.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + ddlLanguage2.SelectedValue;
                newNode.ExpandAll();
                RootNode.ChildNodes.Add(newNode);
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
            AboutUs obj = new AboutUs();
            DataSet dsChild = obj.GetCategoryByParentCategoryID("ArticleCategory", Globals.AgentCatID, Convert.ToInt32(n.Value), Lang);
            if (dsChild.Tables.Count > 0)
            {
                for (int i = 0; i < dsChild.Tables[0].Rows.Count; i++)
                {
                    TreeNode newNode = new TreeNode(Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryName"]), Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryID"]));
                    newNode.Collapse();
                    newNode.ToolTip = Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryName"]);
                    newNode.NavigateUrl = "AboutUsCategory.aspx?Action=Edit&CateID=" + Convert.ToString(dsChild.Tables[0].Rows[i]["CategoryID"]) + "&Lang=" + ddlLanguage2.SelectedValue;
                    n.ChildNodes.Add(newNode);
                    PopulateCatagoryNode(newNode, Lang);
                }
            }
        }
        catch { }
    }
    protected void ddlLanguage2_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadTreeViewAboutUsCategory(TreeViewAboutUsCategory, ddlLanguage2.SelectedValue);
    }
    private void LoadDataEdit()
    {
        AboutUs obj = new AboutUs();
        int CateID = Globals.GetIntFromQueryString("CateID");
        string LangEdit = Globals.GetStringFromQueryString("Lang");
        DataSet ds = obj.GetCategoryByCategoryID("ArticleCategory", CateID, LangEdit);
        ddlLanguage.SelectedItem.Value = LangEdit;
        txtAboutUsCategoryName.Value = Convert.ToString(ds.Tables[0].Rows[0]["CategoryName"]);
        txtAboutUsCategoryOrder.Value = Convert.ToString(ds.Tables[0].Rows[0]["CategoryOrder"]);
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        AboutUs obj = new AboutUs();
        string CategoryName = txtAboutUsCategoryName.Value.Trim();
        int CategoryOrder = Convert.ToInt32(txtAboutUsCategoryOrder.Value);
        int ModuleID = 2;
        string Action = Globals.GetStringFromQueryString("Action");
        if (Action == "Edit") //Cập nhật
        {
            int CateID = Globals.GetIntFromQueryString("CateID");
            obj.UpdateAboutUsCategory(Globals.AgentCatID, CateID, Lang, CategoryName, CategoryOrder);
        }
        else //Thêm mới
            obj.InsertAboutUsCategory(Lang, Globals.AgentCatID, CategoryName, CategoryOrder, ModuleID);
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtAboutUsCategoryName.Value = "";
        txtAboutUsCategoryOrder.Value = "";
    }
}
