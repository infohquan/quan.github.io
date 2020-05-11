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

public partial class WebAdmin_Others_CustomerList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            LoadGridViewCustomer();
            string Action = Globals.GetStringFromQueryString("Action");
            if (Action == "View")
                LoadDataToView();
        }
    }

    private void LoadGridViewCustomer()
    {
        try
        {
            Customer obj = new Customer();
            DataSet ds = obj.GetAllCustomer("Customer", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewCustomer, ds);
        }
        catch { }
    }
    private void LoadDataToView()
    {
        try
        {
            int CustomerID = Globals.GetIntFromQueryString("CustomerID");
            Customer obj = new Customer();
            DataSet ds = obj.GetCustomerByCustomerID("Customer", Globals.AgentCatID, CustomerID);
            lblAddress.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["CustomerAddress"]);
            lblEmail.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["CustomerEmail"]);
            lblFax.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["CustomerFax"]);
            lblFullName.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["CustomerFullName"]);

            string g = Convert.ToString(ds.Tables[0].Rows[0]["CustomerGender"]);
            if (g == "1")
                lblGender.InnerText = "Nam";
            else if (g == "2")
                lblGender.InnerText = "Nữ";
            lblMobile.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["CustomerMobi"]);
            lblTel.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["CustomerTel"]);
            lblUsername.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["CustomerUsername"]);
        }
        catch 
        {
            Response.Redirect("CustomerList.aspx");
        }
    }
    protected void gridViewCustomer_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewCustomer.Rows[e.NewEditIndex];
            String CustomerID = ((Label)row.Cells[0].FindControl("lblCustomerID")).Text;
            //Response.Redirect("CustomerList.aspx?Action=View&CustomerID=" + CustomerID);
            Response.Redirect("CustomerAddEdit.aspx?Action=Edit&CustomerID=" + CustomerID);
        }
        catch { }
    }
    protected void gridViewCustomer_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewCustomer.PageIndex = e.NewPageIndex;
        LoadGridViewCustomer();
    }
    protected void gridViewCustomer_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
            return;
        else if (e.Row.RowType == DataControlRowType.DataRow)
        {
            ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
            ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
            btnEdit.ToolTip = "Xem khách hàng này";
            btnDelete.ToolTip = "Xóa khách hàng này";
            btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa khách hàng này không?') == false) return false;";
        }
    }
    protected void gridViewCustomer_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewCustomer.Rows[e.RowIndex];
            int CustomerID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblCustomerID")).Text);
            Customer obj = new Customer();
            obj.DeleteCustomer(CustomerID);
            LoadGridViewCustomer();
        }
        catch { }
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int CustomerID = Globals.GetIntFromQueryString("CustomerID");
            Customer obj = new Customer();
            obj.DeleteCustomer(CustomerID);
            Response.Redirect("CustomerList.aspx");
        }
        catch { }
    }
}
