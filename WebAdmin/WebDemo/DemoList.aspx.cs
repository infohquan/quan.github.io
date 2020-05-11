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

public partial class WebAdmin_WebDemo_DemoList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            LoadGridViewDemoList();
        }
    }
    private void LoadGridViewDemoList()
    {
        try
        {
            WebDemo obj = new WebDemo();
            DataSet ds = obj.GetAllWebDemo("WebDemo", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewDemoList, ds);
        }
        catch { }
    }
    protected void gridViewDemoList_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[3].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[4].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa webdemo này";
                btnDelete.ToolTip = "Xóa webdemo này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa webdemo này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewDemoList_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewDemoList.Rows[e.NewEditIndex];
            Int32 ID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblID")).Text);
            Response.Redirect("AddEdit.aspx?Action=Edit&ID=" + ID);
        }
        catch { }
    }
    protected void gridViewDemoList_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewDemoList.PageIndex = e.NewPageIndex;
        LoadGridViewDemoList();
    }
    protected void gridViewDemoList_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewDemoList.Rows[e.RowIndex];
            Int32 ID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblID")).Text);
            WebDemo obj = new WebDemo();
            DataSet ds = obj.GetWebDemoByID("WebDemo", Globals.AgentCatID, ID);
            Globals.DeleteFile(Convert.ToString(ds.Tables[0].Rows[0]["SmallImage"]), "ImageFiles/WebDemos");
            Globals.DeleteFile(Convert.ToString(ds.Tables[0].Rows[0]["LargeImage"]), "ImageFiles/WebDemos");
            obj.DeleteWebDemo(ID);
            LoadGridViewDemoList();
        }
        catch { }
    }
}
