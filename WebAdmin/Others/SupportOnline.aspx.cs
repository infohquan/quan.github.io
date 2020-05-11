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
using MyTool;
public partial class WebAdmin_Others_SupportOnline : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            string Action = Globals.GetStringFromQueryString("Action");
            LoadSupportGroup();
            LoadSupportOnlineList();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật quảng cáo";
                lblTitle2.InnerText = "Cập nhật quảng cáo";
                LoadDataEdit();
            }
        }
    }
    private void LoadSupportOnlineList()
    {
        //try
        {
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetAllSupportOnline("SupportOnline", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewSupportOnline, ds);
        }
        //catch { }
    }
    private void LoadSupportGroup()
    {
        OtherFunctions obj = new OtherFunctions();
        DataSet ds = obj.GetAllSupportGroup("SupportGroup", Globals.AgentCatID, ddlLanguage.SelectedValue);
        DropDownListHelper dlHelp = new DropDownListHelper();
        dlHelp.FillData(ddlSupportGroup, ds, "SupportGroupName" + ddlLanguage.SelectedValue, "SupportGroupID", "--- Chọn nhóm ---");
    }
    private void LoadDataEdit()
    {
        //try
        {
            lblTitle1.InnerText = "Cập nhật Nick chat hỗ trợ trực tuyến";
            lblTitle2.InnerText = "Cập nhật Nick chat hỗ trợ trực tuyến";
            
            int NickID = Globals.GetIntFromQueryString("NickID");
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetSupportOnlineDetail("SupportOnline", NickID);
            ddlSupportGroup.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["GroupID"]);
            
            txtDisplayName.Text = Convert.ToString(ds.Tables[0].Rows[0]["DisplayName"]);
            txtEmail.Text = Convert.ToString(ds.Tables[0].Rows[0]["Email"]);
            txtFullName.Text = Convert.ToString(ds.Tables[0].Rows[0]["FullName"]);
            txtNickSkype.Text = Convert.ToString(ds.Tables[0].Rows[0]["NickNameSkype"]);
            txtNickYahoo.Text = Convert.ToString(ds.Tables[0].Rows[0]["NickNameYM"]);
            txtTel.Text = Convert.ToString(ds.Tables[0].Rows[0]["Tel"]);
        }
        //catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        //try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            OtherFunctions obj = new OtherFunctions();
            string NickNameYM = txtNickYahoo.Text.Trim();
            string NickNameSkype = txtNickSkype.Text.Trim();
            string FullName = txtFullName.Text.Trim();
            string DisplayName = txtDisplayName.Text.Trim();
            string Email = txtEmail.Text.Trim();
            string Tel = txtTel.Text.Trim();
            int GroupID = Convert.ToInt32(ddlSupportGroup.SelectedValue);
            int kq = -1;
            if (Action == "Edit")
            {
                int NickID = Globals.GetIntFromQueryString("NickID");
                kq = obj.UpdateSupportOnline(NickID, Globals.AgentCatID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID);
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertSupportOnline(Globals.AgentCatID, NickNameYM, NickNameSkype, FullName, DisplayName, Email, Tel, GroupID);
                ShowMessage(kq, "thêm mới");
            }
            LoadSupportOnlineList();
        }
        //catch { }
    }
    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Nick chat hỗ trợ trực tuyến thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Nick chat hỗ trợ trực tuyến!";
    }
    protected void gridViewSupportOnline_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
            return;
        else if (e.Row.RowType == DataControlRowType.DataRow)
        {
            ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
            ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
            btnEdit.ToolTip = "Chỉnh sửa Nick chat hỗ trợ trực tuyến này";
            btnDelete.ToolTip = "Xóa Nick chat hỗ trợ trực tuyến này";
            btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Nick chat hỗ trợ trực tuyến này không?') == false) return false;";
        }
    }
    protected void gridViewSupportOnline_RowEditing(object sender, GridViewEditEventArgs e)
    {
        GridViewRow row = gridViewSupportOnline.Rows[e.NewEditIndex];
        Int32 NickID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblNickID")).Text);
        Response.Redirect("SupportOnline.aspx?Action=Edit&NickID=" + NickID);
    }
    protected void gridViewSupportOnline_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewSupportOnline.PageIndex = e.NewPageIndex;
        LoadSupportOnlineList();
    }
    protected void gridViewSupportOnline_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewSupportOnline.Rows[e.RowIndex];
            Int32 NickID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblNickID")).Text);
            OtherFunctions obj = new OtherFunctions();            
            obj.DeleteSupportOnline(NickID);
            LoadSupportOnlineList();
        }
        catch { }
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 NickID = Globals.GetIntFromQueryString("NickID");
            OtherFunctions obj = new OtherFunctions();
            int kq = -1;
            kq = obj.DeleteSupportOnline(NickID);
            ShowMessage(kq, "xóa");
            LoadSupportOnlineList();
        }
        catch { }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadSupportGroup();
    }
}
