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

public partial class WebAdmin_User_UserList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            LoadGridViewUser();
    }

    private void LoadGridViewUser()
    {
        try
        {
            Account obj = new Account();
            DataSet ds = obj.GetAllUser("UserCat", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            if (ds.Tables.Count > 0)
                gvHelper.FillData(gridViewUser, ds);
        }
        catch { }
    }
    protected void gridViewUser_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[6].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[7].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa thông tin người dùng này";
                btnDelete.ToolTip = "Xóa thông tin người dùng này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa người dùng này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewUser_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewUser.Rows[e.NewEditIndex];
            String Username = ((Label)row.Cells[0].FindControl("lblUsername")).Text;
            Response.Redirect("UserAddEdit.aspx?Action=Edit&Username=" + Username);
        }
        catch { }
    }
    protected void gridViewUser_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewUser.PageIndex = e.NewPageIndex;
        LoadGridViewUser();
    }
    protected void gridViewUser_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewUser.Rows[e.RowIndex];
            String Username = ((Label)row.Cells[0].FindControl("lblUsername")).Text;
            Account obj = new Account();
            obj.DeleteUser(Username, Globals.AgentCatID);
            LoadGridViewUser();
        }
        catch { }
    }
}
