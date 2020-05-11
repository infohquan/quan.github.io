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

public partial class WebAdmin_Others_District : System.Web.UI.Page
{
    private static string FileImageName = "";
    private int CountryID = 1;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            LoadGridViewItem();
            LoadProvince();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật Quận/Huyện";
                lblTitle2.InnerText = "Cập nhật Quận/Huyện";
                LoadDataEdit();
                linkAdd.Visible = true;
                linkAdd.NavigateUrl = "District.aspx";
            }
        }
    }
    private void LoadProvince()
    {
        OtherFunctions obj = new OtherFunctions();
        DataSet ds = obj.GetAllProvince("Province", Globals.AgentCatID, 1);
        DropDownListHelper ddlHelp = new DropDownListHelper();
        ddlHelp.FillData(ddlProvince, ds, "ProvinceName", "ProvinceID", "Vui lòng chọn...");
        ddlHelp.FillData(ddlProvince2, ds, "ProvinceName", "ProvinceID");
    }
    private void LoadDataEdit()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            int DistrictID = Globals.GetIntFromQueryString("DistrictID");
            DataSet ds = obj.GetDistrictByDistrictID("District", DistrictID);
            txtName.Value = Convert.ToString(ds.Tables[0].Rows[0]["DistrictName"]);
            ddlProvince.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["ProvinceID"]);
        }
        catch
        {
            Response.Redirect("District.aspx");
        }
    }

    private void LoadGridViewItem()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetAllDistrict("District", Globals.AgentCatID, CountryID);
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
                btnEdit.ToolTip = "Chỉnh sửa Quận/Huyện này";
                btnDelete.ToolTip = "Xóa Quận/Huyện này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Quận/Huyện này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewItem_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewItem.Rows[e.NewEditIndex];
            Int32 DistrictID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblDistrictID")).Text);
            Response.Redirect("District.aspx?Action=Edit&DistrictID=" + DistrictID);
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
            Int32 DistrictID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblDistrictID")).Text);
            OtherFunctions obj = new OtherFunctions();
            obj.DeleteDistrict(DistrictID);
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
            int ProvinceID = Convert.ToInt32(ddlProvince.SelectedValue);
            int kq = -1;
            if (Action == "Edit")
            {
                int DistrictID = Globals.GetIntFromQueryString("DistrictID");
                kq = obj.UpdateDistrict(DistrictID, Globals.AgentCatID, Name, ProvinceID, "", "");
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertDistrict(Globals.AgentCatID, Name, ProvinceID, "", "");
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
            Int32 DistrictID = Globals.GetIntFromQueryString("DistrictID");
            OtherFunctions obj = new OtherFunctions();
            obj.DeleteDistrict(DistrictID);
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
            lblMessage.Text = "Đã " + text + " Quận/Huyện thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Quận/Huyện!";
    }
    protected void ddlProvince2_SelectedIndexChanged(object sender, EventArgs e)
    {
        OtherFunctions obj = new OtherFunctions();
        DataSet ds = obj.GetAllDistrict("District", Globals.AgentCatID, Convert.ToInt32(ddlProvince2.SelectedValue));
        GridViewHelper gvHelper = new GridViewHelper();
        gvHelper.FillData(gridViewItem, ds);
    }
}
