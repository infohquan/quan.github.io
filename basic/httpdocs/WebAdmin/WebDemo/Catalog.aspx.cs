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

public partial class WebAdmin_WebDemo_Catalog : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                string Action = Globals.GetStringFromQueryString("Action");
                //objDDL.LoadDropDownListArticleCategory(ddlCategory, Lang, false);
                LoadTreeViewCategory(TreeViewCategory);
                if (Action == "Edit")
                {
                    lblTitle1.InnerText = "Cập nhật WebDemo";
                    lblTitle2.InnerText = "Cập nhật WebDemo";
                    LoadDataEdit();
                }
            }
        }
        catch { }
    }
    /// <summary>
    /// Load các danh mục chủng loại WebDemo vào TreeViewCategory 
    /// </summary>
    /// <param name="TreeViewCategory"></param>
    /// <param name="Lang"></param>
    public void LoadTreeViewCategory(TreeView TreeViewCategory)
    {
        try
        {
            TreeViewCategory.Nodes.Clear();
            WebDemo obj = new WebDemo();
            int RootID = obj.GetRootID(Globals.AgentCatID);
            DataSet dsParent = obj.GetWebDemoGroupByParentID("WebDemoGroup", Globals.AgentCatID, RootID);
            for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
            {
                TreeNode newNode = new TreeNode(Convert.ToString(dsParent.Tables[0].Rows[i]["Name"]), Convert.ToString(dsParent.Tables[0].Rows[i]["ID"]));
                newNode.ToolTip = Convert.ToString(dsParent.Tables[0].Rows[i]["Name"]);
                newNode.NavigateUrl = "Catalog.aspx?Action=Edit&ID=" + Convert.ToString(dsParent.Tables[0].Rows[i]["ID"]);
                newNode.ExpandAll();
                //RootNode.ChildNodes.Add(newNode);
                TreeViewCategory.Nodes.Add(newNode);
            }
        }
        catch { }
    }
    private void LoadDataEdit()
    {
        try
        {
            WebDemo obj = new WebDemo();
            int ID = Globals.GetIntFromQueryString("ID");
            DataSet ds = obj.GetWebDemoGroupByID("WebDemoGroup", Globals.AgentCatID, ID);
            txtCategoryName.Value = Convert.ToString(ds.Tables[0].Rows[0]["Name"]);
            txtCategoryOrder.Value = Convert.ToString(ds.Tables[0].Rows[0]["Order"]);
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            WebDemo obj = new WebDemo();
            int ParentID = obj.GetRootID(Globals.AgentCatID);
            string Name = txtCategoryName.Value.Trim();
            string Order = txtCategoryOrder.Value.Trim();
            string Action = Globals.GetStringFromQueryString("Action");
            int kq = -1;
            if (Action == "Edit") //Cập nhật
            {
                int ID = Globals.GetIntFromQueryString("ID");
                kq = obj.UpdateWebDemoGroup(ID, Globals.AgentCatID, Name, ParentID, Order);
                ShowMessage(kq, "cập nhật");
            }
            else //Thêm mới
            {
                kq = obj.InsertWebDemoGroup(Globals.AgentCatID, Name, ParentID, Order);
                ShowMessage(kq, "thêm mới");
            }
            LoadTreeViewCategory(TreeViewCategory);
        }
        catch (FormatException)
        {
            MessageBox.Show("Vui lòng nhập thứ tự là Số Nguyên!");
            txtCategoryOrder.Focus();
        }
    }
    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Nhóm WebDemo thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Nhóm WebDemo!";
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
            int ID = Globals.GetIntFromQueryString("ID");
            WebDemo obj = new WebDemo();
            int kq = -1;
            kq = obj.DeleteWebDemoGroup(ID);
            LoadTreeViewCategory(TreeViewCategory);
            ShowMessage(kq, "xóa");
        }
        catch { }
    }
}
