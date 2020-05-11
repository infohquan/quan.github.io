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

public partial class WebAdmin_Product_ManageSize : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Globals.BindLanguageToDDL(ddlLanguage);
            LoadListParentCatalog("EN", ddlParentCatalogEN, true);
            LoadListParentCatalog("VI", ddlParentCatalogVI, true);
            LoadListParentCatalog(ddlLanguage.SelectedValue, ddlParentGroupCat, false);
            LoadGridViewSize();
            if (Action == "Edit")
                LoadDataEdit();
        }
    }

    private void LoadListParentCatalog(string Lang, DropDownList ddlCatalog, bool f)
    {
        try
        {
            ddlCatalog.Items.Clear();
            ddlCatalog.Attributes.Add("style", "color:Blue;font-size:14px;");
            if (f == true)
            {
                if (Lang == "VI")
                    ddlCatalog.Items.Insert(0, new ListItem("--- Vui lòng chọn ---", "-1"));
                else if (Lang == "EN")
                    ddlCatalog.Items.Insert(0, new ListItem("--- Please Choose ---", "-1"));
            }
            Catalog obj = new Catalog();
            int RootCatID = obj.GetRootCatalogID(Globals.AgentCatID, Lang);
            DataSet ds = obj.GetCatalogByParentCatID("GroupCat", RootCatID, Lang);

            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ListItem liParent = new ListItem("---- " + Convert.ToString(ds.Tables[0].Rows[i]["TenNhom"]).ToUpper(), Convert.ToString(ds.Tables[0].Rows[i]["ID"]));
                ddlCatalog.Items.Add(liParent);
            }
        }
        catch { }
    }
    private void LoadDataEdit()
    {
        try
        {
            lblTitle1.InnerText = "Cập nhật Size";
            lblTitle2.InnerText = "Cập nhật Size";
            Size obj = new Size();
            int SizeID = Globals.GetIntFromQueryString("SizeID");
            DataSet ds = obj.GetSizeBySizeID("Size", SizeID, Globals.AgentCatID);
            txtSizeName.Value = Convert.ToString(ds.Tables[0].Rows[0]["SizeName"]);
            ddlParentCatalogEN.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["ParentGroupCatID_EN"]);
            ddlParentCatalogVI.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["ParentGroupCatID_VI"]);
        }
        catch { }
    }

    private void LoadGridViewSize()
    {
        try
        {
            Size obj = new Size();
            DataSet ds = obj.GetListSizeByParentCatID("Size", Globals.AgentCatID, Convert.ToInt32(ddlParentGroupCat.SelectedValue), ddlLanguage.SelectedValue);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewSize, ds);
        }
        catch { }
    }
    protected void gridViewSize_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[4].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[5].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa Size này";
                btnDelete.ToolTip = "Xóa Size này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Size này không?') == false) return false;";
            }
            int ParentGroupCatID_EN = Convert.ToInt32(((Label)e.Row.Cells[2].FindControl("lblParentGroupCatID_EN")).Text);
            int ParentGroupCatID_VI = Convert.ToInt32(((Label)e.Row.Cells[2].FindControl("lblParentGroupCatID_VI")).Text);
            Catalog obj = new Catalog();
            ((Label)e.Row.Cells[2].FindControl("lblParentGroupCatName_EN")).Text = obj.GetCatalogNameByCatalogID(ParentGroupCatID_EN);
            ((Label)e.Row.Cells[2].FindControl("lblParentGroupCatName_VI")).Text = obj.GetCatalogNameByCatalogID(ParentGroupCatID_VI);
        }
        catch { }
    }
    protected void gridViewSize_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewSize.Rows[e.NewEditIndex];
            Int32 SizeID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblSizeID")).Text);
            Response.Redirect("ManageSize.aspx?Action=Edit&SizeID=" + SizeID);
        }
        catch { }
    }
    protected void gridViewSize_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewSize.PageIndex = e.NewPageIndex;
        LoadGridViewSize();
    }
    protected void gridViewSize_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewSize.Rows[e.RowIndex];
            Int32 SizeID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblSizeID")).Text);
            Size obj = new Size();
            obj.DeleteSize(SizeID);
            LoadGridViewSize();
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Size obj = new Size();
            string SizeName = txtSizeName.Value.Trim();
            int ParentCatID_EN = Convert.ToInt32(ddlParentCatalogEN.SelectedValue);
            int ParentCatID_VI = Convert.ToInt32(ddlParentCatalogVI.SelectedValue);

            int kq = -1;
            if (Action == "Edit")
            {
                int SizeID = Globals.GetIntFromQueryString("SizeID");
                kq = obj.UpdateSize(SizeID, Globals.AgentCatID, SizeName, ParentCatID_EN, ParentCatID_VI);
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertSize(Globals.AgentCatID, SizeName, ParentCatID_EN, ParentCatID_VI);
                ShowMessage(kq, "thêm mới");
            }
            LoadGridViewSize();
        }
        catch { }
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 SizeID = Globals.GetIntFromQueryString("SizeID");
            Size obj = new Size();
            int kq = -1;
            kq = obj.DeleteSize(SizeID);
            ShowMessage(kq, "xóa");
            LoadGridViewSize();
        }
        catch { }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Size thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Size!";
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadListParentCatalog(ddlLanguage.SelectedValue, ddlParentGroupCat, false);
        LoadGridViewSize();
    }
    protected void ddlParentGroupCat_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewSize();
    }
}
