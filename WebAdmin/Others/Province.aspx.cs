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

public partial class WebAdmin_Others_Province : System.Web.UI.Page
{
    private static string FileImageName = "";
    private int CountryID = 1;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            LoadGridViewItem();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật tỉnh thành";
                lblTitle2.InnerText = "Cập nhật tỉnh thành";
                LoadDataEdit();
                linkAdd.Visible = true;
                linkAdd.NavigateUrl = "Province.aspx";
            }
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            int ProvinceID = Globals.GetIntFromQueryString("ProvinceID");
            DataSet ds = obj.GetProvinceByProvinceID("Province", ProvinceID);
            txtName.Value = Convert.ToString(ds.Tables[0].Rows[0]["ProvinceName"]);
        }
        catch
        {
            Response.Redirect("Province.aspx");
        }
    }

    private void LoadGridViewItem()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetAllProvince("Province", Globals.AgentCatID, CountryID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewItem, ds);
        }
        catch { }
    }
    protected void gridViewItem_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[2].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[3].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa tỉnh thành này";
                btnDelete.ToolTip = "Xóa tỉnh thành này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa tỉnh thành này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewItem_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewItem.Rows[e.NewEditIndex];
            Int32 ProvinceID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblProvinceID")).Text);
            Response.Redirect("Province.aspx?Action=Edit&ProvinceID=" + ProvinceID);
        }
        catch { }
    }
    protected void gridViewItem_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewItem.PageIndex = e.NewPageIndex;
        LoadGridViewItem();
    }
    protected void gridViewItem_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewItem.Rows[e.RowIndex];
            Int32 ProvinceID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblProvinceID")).Text);
            OtherFunctions obj = new OtherFunctions();
            obj.DeleteProvince(ProvinceID);
            LoadGridViewItem();
        }
        catch
        {

        }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            OtherFunctions obj = new OtherFunctions();
            string Name = txtName.Value.Trim();
            int kq = -1;
            if (Action == "Edit")
            {
                int ProvinceID = Globals.GetIntFromQueryString("ProvinceID");
                kq = obj.UpdateProvince(ProvinceID, Globals.AgentCatID, Name, "", "");
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertProvince(Globals.AgentCatID, Name, CountryID, "", "");
                ShowMessage(kq, "thêm mới");
            }
            LoadGridViewItem();
        }
        catch { }
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 ProvinceID = Globals.GetIntFromQueryString("ProvinceID");
            OtherFunctions obj = new OtherFunctions();
            obj.DeleteProvince(ProvinceID);
            LoadGridViewItem();
        }
        catch
        {

        }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " tỉnh thành thành công!";
        else
            lblMessage.Text = "Không thể " + text + " tỉnh thành!";
    }
}
