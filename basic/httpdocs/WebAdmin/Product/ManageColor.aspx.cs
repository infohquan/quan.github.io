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

public partial class WebAdmin_Product_ManageColor : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Globals.BindLanguageToDDL(ddlLanguage);
            Globals.BindLanguageToDDL(ddlLanguage2);

            if (Action == "Edit")
            {
                LoadDataEdit();
                ddlLanguage2.SelectedValue = Globals.GetStringFromQueryString("Lang");
            }
            LoadGridViewColor();
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            lblTitle1.InnerText = "Cập nhật Màu sắc";
            lblTitle2.InnerText = "Cập nhật Màu sắc";
            Size obj = new Size();
            int ColorID = Globals.GetIntFromQueryString("ColorID");
            DataSet ds = obj.GetColorByColorID("Color", ColorID);
            txtColorName.Value = Convert.ToString(ds.Tables[0].Rows[0]["ColorName"]);
            ddlLanguage.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["Lang"]);
        }
        catch { }
    }

    private void LoadGridViewColor()
    {
        try
        {
            Size obj = new Size();
            DataSet ds = obj.GetListColor("Color", ddlLanguage2.SelectedValue);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewColor, ds);
        }
        catch { }
    }
    protected void gridViewColor_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[2].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[3].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa Màu sắc này";
                btnDelete.ToolTip = "Xóa Màu sắc này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Màu sắc này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewColor_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewColor.Rows[e.NewEditIndex];
            Int32 ColorID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblColorID")).Text);
            Response.Redirect("ManageColor.aspx?Action=Edit&ColorID=" + ColorID + "&Lang=" + ddlLanguage2.SelectedValue);
        }
        catch { }
    }
    protected void gridViewColor_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewColor.PageIndex = e.NewPageIndex;
        LoadGridViewColor();
    }
    protected void gridViewColor_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewColor.Rows[e.RowIndex];
            Int32 ColorID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblColorID")).Text);
            Size obj = new Size();
            obj.DeleteColor(ColorID);
            LoadGridViewColor();
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Size obj = new Size();
            string ColorName = txtColorName.Value.Trim();
            string Lang = ddlLanguage.SelectedValue;
            int kq = -1;
            if (Action == "Edit")
            {
                int ColorID = Globals.GetIntFromQueryString("ColorID");
                kq = obj.UpdateColor(ColorID, Lang, ColorName);
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertColor(Lang, ColorName);
                ShowMessage(kq, "thêm mới");
            }
            LoadGridViewColor();
        }
        catch { }
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 ColorID = Globals.GetIntFromQueryString("ColorID");
            Size obj = new Size();
            int kq = -1;
            kq = obj.DeleteColor(ColorID);
            ShowMessage(kq, "xóa");
            LoadGridViewColor();
        }
        catch { }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Màu sắc thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Màu sắc!";
    }
    protected void ddlLanguage2_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewColor();
    }
}
