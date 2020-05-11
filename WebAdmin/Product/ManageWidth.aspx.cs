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

public partial class WebAdmin_Product_ManageWidth : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Globals.BindLanguageToDDL(ddlLanguage);
            Globals.BindLanguageToDDL(ddlLanguage2);
            LoadGridViewWidth();
            if (Action == "Edit")
                LoadDataEdit();
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            lblTitle1.InnerText = "Cập nhật Width(Độ rộng)";
            lblTitle2.InnerText = "Cập nhật Width(Độ rộng)";
            Size obj = new Size();
            int WidthID = Globals.GetIntFromQueryString("WidthID");
            DataSet ds = obj.GetWidthByWidthID("Width", WidthID, Globals.AgentCatID);
            txtWidthName.Value = Convert.ToString(ds.Tables[0].Rows[0]["WidthName"]);
            ddlLanguage.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["Lang"]);
        }
        catch { }
    }

    private void LoadGridViewWidth()
    {
        try
        {
            Size obj = new Size();
            DataSet ds = obj.GetAllListWidth("Width", Globals.AgentCatID, ddlLanguage2.SelectedValue);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewWidth, ds);
        }
        catch { }
    }
    protected void gridViewWidth_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[2].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[3].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa Width(Độ rộng) này";
                btnDelete.ToolTip = "Xóa Width(Độ rộng) này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Width(Độ rộng) này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewWidth_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewWidth.Rows[e.NewEditIndex];
            Int32 WidthID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblWidthID")).Text);
            Response.Redirect("ManageWidth.aspx?Action=Edit&WidthID=" + WidthID + "&Lang=" + ddlLanguage2.SelectedValue);
        }
        catch { }
    }
    protected void gridViewWidth_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewWidth.PageIndex = e.NewPageIndex;
        LoadGridViewWidth();
    }
    protected void gridViewWidth_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewWidth.Rows[e.RowIndex];
            Int32 WidthID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblWidthID")).Text);
            Size obj = new Size();
            obj.DeleteWidth(WidthID);
            LoadGridViewWidth();
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Size obj = new Size();
            string WidthName = txtWidthName.Value.Trim();
            string Lang = ddlLanguage.SelectedValue;
            int kq = -1;
            if (Action == "Edit")
            {
                int WidthID = Globals.GetIntFromQueryString("WidthID");
                kq = obj.UpdateWidth(WidthID, Globals.AgentCatID, Lang, WidthName);
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertWidth(Globals.AgentCatID, Lang, WidthName);
                ShowMessage(kq, "thêm mới");
            }
            LoadGridViewWidth();
        }
        catch { }
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 WidthID = Globals.GetIntFromQueryString("WidthID");
            Size obj = new Size();
            int kq = -1;
            kq = obj.DeleteWidth(WidthID);
            ShowMessage(kq, "xóa");
            LoadGridViewWidth();
        }
        catch { }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Width(Độ rộng) thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Width(Độ rộng)!";
    }
    protected void ddlLanguage2_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewWidth();
    }
}
