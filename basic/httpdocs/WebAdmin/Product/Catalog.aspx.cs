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

public partial class WebAdmin_Product_Catalog : System.Web.UI.Page
{
    private string Lang;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Globals.BindLanguageToDDL(ddlLanguage);
            Lang = ddlLanguage.SelectedValue;
            Globals.BindLanguageToDDL(ddlLanguage2);
            CommonDropDownList objDDL = new CommonDropDownList();
            objDDL.LoadDropDownListCatalog(ddlCatalog, Lang, "Root");
            LoadTreeViewCatalog(TreeViewCatalog, Lang);
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật Danh mục Sản phẩm";
                lblTitle2.InnerText = "Cập nhật Danh mục Sản phẩm";
                LoadDataEdit();
                linkAdd.Visible = true;
            }
        }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        CommonDropDownList objDDL = new CommonDropDownList();
        objDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "Root");
    }
    /// <summary>
    /// Load các danh mục chủng loại sản phẩm vào TreeViewCatalog 
    /// </summary>
    /// <param name="TreeViewCatalog"></param>
    /// <param name="Lang"></param>
    public void LoadTreeViewCatalog(TreeView TreeViewCatalog, string Lang)
    {
        try
        {
            TreeViewCatalog.Nodes.Clear();
            Catalog obj = new Catalog();
            DataSet dsParent = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, 0, Lang);
            for (int i = 0; i < dsParent.Tables[0].Rows.Count; i++)
            {
                TreeNode newNode = new TreeNode(Convert.ToString(dsParent.Tables[0].Rows[i]["TenNhom"]), Convert.ToString(dsParent.Tables[0].Rows[i]["ID"]));
                newNode.ToolTip = Convert.ToString(dsParent.Tables[0].Rows[i]["TenNhom"]);
                newNode.NavigateUrl = "Catalog.aspx?Action=Edit&CatID=" + Convert.ToString(dsParent.Tables[0].Rows[i]["ID"]) + "&Lang=" + ddlLanguage2.SelectedValue;
                newNode.ExpandAll();
                //RootNode.ChildNodes.Add(newNode);
                TreeViewCatalog.Nodes.Add(newNode);
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
            Catalog obj = new Catalog();
            DataSet dsChild = obj.GetCatalogByParentCatID("GroupCat", Globals.AgentCatID, Convert.ToInt32(n.Value), Lang);
            if (dsChild.Tables.Count > 0)
            {
                for (int i = 0; i < dsChild.Tables[0].Rows.Count; i++)
                {
                    TreeNode newNode = new TreeNode(Convert.ToString(dsChild.Tables[0].Rows[i]["TenNhom"]), Convert.ToString(dsChild.Tables[0].Rows[i]["ID"]));
                    //newNode.Collapse();
                    newNode.Expand();
                    newNode.ToolTip = Convert.ToString(dsChild.Tables[0].Rows[i]["TenNhom"]);
                    newNode.NavigateUrl = "Catalog.aspx?Action=Edit&CatID=" + Convert.ToString(dsChild.Tables[0].Rows[i]["ID"]) + "&Lang=" + ddlLanguage2.SelectedValue;
                    n.ChildNodes.Add(newNode);
                    PopulateCatagoryNode(newNode, Lang);
                }
            }
        }
        catch { }
    }
    protected void ddlLanguage2_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadTreeViewCatalog(TreeViewCatalog, ddlLanguage2.SelectedValue);
    }
    private void LoadDataEdit()
    {
        try
        {
            Catalog obj = new Catalog();
            int CatID = Globals.GetIntFromQueryString("CatID");
            int ParentCatID = obj.GetParentCatIDByCatalogID(CatID);
            string LangEdit = Globals.GetStringFromQueryString("Lang");
            DataSet ds = obj.GetCatalogByCatalogID("GroupCat", CatID, LangEdit);
            ddlLanguage.SelectedValue = LangEdit;
            CommonDropDownList objDDL = new CommonDropDownList();
            objDDL.LoadDropDownListCatalog(ddlCatalog, LangEdit, "Root");
            ddlCatalog.SelectedValue = ParentCatID.ToString();
            txtCatalogName.Value = Convert.ToString(ds.Tables[0].Rows[0]["TenNhom"]);
            txtCatalogOrder.Value = Convert.ToString(ds.Tables[0].Rows[0]["STT"]);
            
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            LoadTreeViewCatalog(TreeViewCatalog, ddlLanguage2.SelectedValue);
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            Catalog obj = new Catalog();
            string MaNhom = "";
            string TenNhom = txtCatalogName.Value.Trim();
            int STT = Convert.ToInt32(txtCatalogOrder.Value);
            string Anh_Group = "";
            string ThongTin1_Group = "";
            string ThongTin2_Group = "";
            int ParentCatID = Convert.ToInt32(ddlCatalog.SelectedValue);
            string Action = Globals.GetStringFromQueryString("Action");
            int kq = -1;
            if (Action == "Edit") //Cập nhật
            {
                int CatID = Globals.GetIntFromQueryString("CatID");
                kq = obj.UpdateCatalog(CatID, ddlLanguage.SelectedValue, Globals.AgentCatID, MaNhom, TenNhom, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group, ParentCatID);
                ShowMessage(kq, "cập nhật");
            }
            else //Thêm mới
            {
                kq = obj.InsertCatalog(ddlLanguage.SelectedValue, Globals.AgentCatID, MaNhom, TenNhom, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group, ParentCatID);
                ShowMessage(kq, "thêm mới");
            }
            //
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            LoadTreeViewCatalog(TreeViewCatalog, ddlLanguage2.SelectedValue);
        }
        catch (FormatException)
        {
            MessageBox.Show("Vui lòng nhập thứ tự Nhóm sản phẩm là Số Nguyên!");
            txtCatalogOrder.Focus();
        }
    }
    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " danh mục sản phẩm thành công!";
        else
            lblMessage.Text = "Không thể " + text + " danh mục sản phẩm!";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtCatalogName.Value = "";
        txtCatalogOrder.Value = "";
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int CatID = Globals.GetIntFromQueryString("CatID");
            Catalog obj = new Catalog();
            int kq = -1;
            kq = obj.DeleteCatalog(CatID);
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            LoadTreeViewCatalog(TreeViewCatalog, ddlLanguage2.SelectedValue);
            ShowMessage(kq, "xóa");
        }
        catch { }
    }
}
