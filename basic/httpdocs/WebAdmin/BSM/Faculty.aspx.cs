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
using Khavi.Web.Data;
using Khavi.Provider;
using MyTool;
using Subgurim.Controles;

public partial class WebAdmin_BSM_Faculty : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //try
        {
            if (fileUploadImage.IsPosting)
                Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
            btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa ngành nghề này hay không?') == false) return false;";
            if (!IsPostBack)
            {
                string Action = Globals.GetStringFromQueryString("Action");
                Globals.BindLanguageToDDL(ddlLanguage);
                Globals.BindLanguageToDDL(ddlLanguage2);
                CommonDropDownList objDDL = new CommonDropDownList();
                objDDL.LoadDropDownListFaculty(ddlFaculty, ddlLanguage.SelectedValue, "Root");
                LoadTreeViewFaculty(TreeViewFaculty, ddlLanguage2.SelectedValue);
                if (Action == "Edit")
                {
                    btnSave.Text = "Cập nhật";
                    LoadDataEdit();
                    linkAddCategory.Visible = true;
                    linkAddCategory.Text = "Thêm ngành nghề mới";
                    linkAddCategory.NavigateUrl = "Faculty.aspx";
                }
                else
                    btnSave.Text = "Thêm";
                LoadText(Action);
            }
        }
        //catch { }
    }
    private void LoadText(string Action)
    {
        if (Action == "Edit")
        {
            lblTitle1.InnerText = "Cập nhật Ngành nghề";
            lblTitle2.InnerText = "Cập nhật Ngành nghề";
            //lblTitle3.InnerText = "Danh sách Ngành nghề";
        }
        else if (Action == "")
        {
            lblTitle1.InnerText = "Thêm Ngành nghề mới";
            lblTitle2.InnerText = "Thêm Ngành nghề mới";
        }
    }
    
    public void LoadTreeViewFaculty(TreeView TreeViewFaculty, string Lang)
    {
        try
        {
            TreeViewFaculty.Nodes.Clear();
            Faculty obj = new Faculty();
            DataSet ds = obj.GetFacultyByParentFacultyID("Faculty", Globals.AgentCatID, 0, Lang);
            //MessageBox.Show(ds.Tables[0].Rows.Count.ToString());
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TreeNode newNode = new TreeNode(Convert.ToString(ds.Tables[0].Rows[i]["FacultyName" + Lang]), Convert.ToString(ds.Tables[0].Rows[i]["FacultyID"]));
                newNode.ToolTip = Convert.ToString(ds.Tables[0].Rows[i]["FacultyName" + Lang]);
                newNode.NavigateUrl = "Faculty.aspx?Action=Edit&ID=" + Convert.ToString(ds.Tables[0].Rows[i]["FacultyID"]) + "&Lang=" + ddlLanguage2.SelectedValue;
                newNode.ExpandAll();
                //RootNode.ChildNodes.Add(newNode);
                TreeViewFaculty.Nodes.Add(newNode);
                //PopulateFacultyNode(newNode, Lang);
            }
        }
        catch { }
    }
    /// <summary>
    /// Điền vào node con
    /// </summary>
    /// <param name="n"></param>
    private void PopulateFacultyNode(TreeNode n, string Lang)
    {
        //try
        {
            Faculty obj = new Faculty();
            DataSet dsChild = obj.GetFacultyByParentFacultyID("Faculty", Globals.AgentCatID, Convert.ToInt32(n.Value), Lang);
            //MessageBox.Show(n.Value);
            if (dsChild.Tables.Count > 0)
            {
                for (int i = 0; i < dsChild.Tables[0].Rows.Count; i++)
                {
                    TreeNode newNode = new TreeNode(Convert.ToString(dsChild.Tables[0].Rows[i]["FacultyName"]), Convert.ToString(dsChild.Tables[0].Rows[i]["FacultyID"]));
                    newNode.Expand();
                    newNode.ToolTip = Convert.ToString(dsChild.Tables[0].Rows[i]["FacultyName"]);
                    newNode.NavigateUrl = "Faculty.aspx?Action=Edit&ID=" + Convert.ToString(dsChild.Tables[0].Rows[i]["FacultyID"]) + "&Lang=" + ddlLanguage2.SelectedValue;
                    n.ChildNodes.Add(newNode);
                    PopulateFacultyNode(newNode, Lang);
                }
            }
        }
        //catch { }
    }
    protected void ddlLanguage2_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadTreeViewFaculty(TreeViewFaculty, ddlLanguage2.SelectedValue);
    }
    private void LoadDataEdit()
    {
        //try
        {
            string Lang = Globals.GetLang();
            int FacultyID = Globals.GetIntFromQueryString("ID");
            Faculty obj = new Faculty();
            DataSet ds = obj.GetDetailFaculty("Faculty", FacultyID, Lang);
            ddlFaculty.SelectedValue = DataObject.GetString(ds, 0, "ParentID");
            txtFacultyName.Value = DataObject.GetString(ds, 0, "FacultyName" + Lang);
            imgIcon.Src = Globals.GetUploadsUrl() + DataObject.GetString(ds, 0, "Icon");
        }
        //catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        //try
        {
            Faculty obj = new Faculty();
            string FacultyName = txtFacultyName.Value.Trim();
            int OrderNumber = Convert.ToInt32(txtOrderNumber.Value);
            string Action = Globals.GetStringFromQueryString("Action");
            int ParentFacultyID = Convert.ToInt32(ddlFaculty.SelectedValue);
            string Icon = Convert.ToString(Session["FileImageName"]);
            int kq = -1;
            if (Action == "Edit") //Cập nhật
            {
                int CateID = Globals.GetIntFromQueryString("CateID");
                //kq = obj.UpdateCategory(CateID, ddlLanguage.SelectedValue, Globals.AgentCatID, FacultyName, CategoryOrder, ParentCategoryID);
                ShowMessage(kq, "cập nhật");
            }
            else //Thêm mới
            {
                kq = obj.InsertFaculty(ddlLanguage.SelectedValue, Globals.AgentCatID, FacultyName, Icon, OrderNumber, ParentFacultyID);
                //ShowMessage(kq, "thêm mới");
            }
            //
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            Response.Redirect("Faculty.aspx");
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
            lblMessage.Text = "Đã " + text + " Ngành nghề thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Ngành nghề!";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtFacultyName.Value = "";
        txtOrderNumber.Value = "";
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            string Lang = Globals.GetLang();
            int ID = Globals.GetIntFromQueryString("ID");
            Faculty obj = new Faculty();
            int kq = -1;
            DataSet ds = obj.GetDetailFaculty("Faculty", ID, Lang);
            kq = obj.DeleteFaculty(ID);
            ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
            LoadTreeViewFaculty(TreeViewFaculty, ddlLanguage2.SelectedValue);
            ShowMessage(kq, "xóa");
        }
        catch { }
    }
}
