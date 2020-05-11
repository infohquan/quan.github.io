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

public partial class WebAdmin_Product_ManageOrder : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            LoadGridViewOrder();
    }

    private void LoadGridViewOrder()
    {
        //try
        {
            Order obj = new Order();
            DataSet ds = obj.GetAllOrder("Order", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewOrder, ds);
        }
        //catch { }
    }
    protected void gridViewOrder_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Xem đơn đặt hàng này";
                btnDelete.ToolTip = "Xóa đơn đặt hàng này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa đơn đặt hàng này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewOrder_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewOrder.Rows[e.NewEditIndex];
            String OrderID = ((Label)row.Cells[0].FindControl("lblOrderID")).Text;
            Response.Redirect("OrderDetail.aspx?OrderID=" + OrderID);
        }
        catch { }
    }
    protected void gridViewOrder_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewOrder.PageIndex = e.NewPageIndex;
        LoadGridViewOrder();
    }
    protected void gridViewOrder_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewOrder.Rows[e.RowIndex];
            int OrderID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblOrderID")).Text);
            Order obj = new Order();
            DataSet dsOrderDetail = obj.GetOrderDetail("OrderDetail", OrderID);
            for (int i = 0; i < dsOrderDetail.Tables[0].Rows.Count; i++)
            {
                int OrderDetailID = Convert.ToInt32(dsOrderDetail.Tables[0].Rows[i]["ID"].ToString());
                obj.DeleteOrderDetail(OrderDetailID);
            }
            obj.DeleteOrder(OrderID);
            LoadGridViewOrder();
        }
        catch { }
    }
}
