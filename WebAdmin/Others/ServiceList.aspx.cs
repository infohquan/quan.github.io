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

public partial class WebAdmin_Others_ServiceList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            LoadGridViewService(ddlLanguage.SelectedValue);
        }
    }
    private void LoadGridViewService(string Lang)
    {
        try
        {
            OtherFunctions objFunc = new OtherFunctions();
            DataSet ds = objFunc.GetAllService("Service", Globals.AgentCatID, Lang);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewService, ds);
        }
        catch { }
    }
    protected void gridViewService_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[4].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[5].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa dịch vụ này";
                btnDelete.ToolTip = "Xóa dịch vụ này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa dịch vụ này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewService_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewService.Rows[e.NewEditIndex];
            Int32 ServiceID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblServiceID")).Text);
            Response.Redirect("ServiceAddEdit.aspx?Action=Edit&ServiceID=" + ServiceID + "&Lang=" + ddlLanguage.SelectedValue);
        }
        catch { }
    }
    protected void gridViewService_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewService.PageIndex = e.NewPageIndex;
        LoadGridViewService(ddlLanguage.SelectedValue);
    }
    protected void gridViewService_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewService.Rows[e.RowIndex];
            Int32 ServiceID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblServiceID")).Text);
            OtherFunctions obj = new OtherFunctions();
            String imageFileName = obj.GetServiceImageUrlByServiceID(ServiceID);
            Globals.DeleteFile(imageFileName, "ImageFiles/Services");
            obj.DeleteService(ServiceID);
            LoadGridViewService(ddlLanguage.SelectedValue);
        }
        catch { }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewService(ddlLanguage.SelectedValue);
    }
    protected void btnSearch_Click(object sender, EventArgs e)
    {
        try
        {
            string strSearch = txtSearch.Text.Trim();
            string Lang = ddlLanguage.SelectedValue;
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.SearchServiceByText("Service", strSearch, Lang, Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewService, ds);
        }
        catch { }
    }
}
