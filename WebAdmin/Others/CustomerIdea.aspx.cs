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
using Khavi.Web.Data;
using Khavi.Provider;
using MyTool;

public partial class WebAdmin_Others_CustomerIdea : System.Web.UI.Page
{
    public string t;
    protected void Page_Load(object sender, EventArgs e)
    {
        t = Globals.GetStringFromQueryString("t");
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            LoadGridViewCustomerIdea();
            if (Action == "View")
                LoadDataToView();
        }
    }

    private void LoadDataToView()
    {
        try
        {
            int ContactID = Globals.GetIntFromQueryString("ContactID");
            Contact obj = new Contact();
            DataSet ds = obj.GetContactByContactID("Contact", ContactID, Globals.AgentCatID);
            lblAddress.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Address"]);
            lblContent.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Body"]);
            lblDateAdd.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["PostDate"]);
            lblDateAdd.Disabled = true;
            lblEmail.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Email"]);
            lblFullName.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["FullName"]);
            lblTel.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Tel"]);
            lblTitle.InnerText = Convert.ToString(ds.Tables[0].Rows[0]["Title"]);
            if (t == "ContactProduct")
            {
                int ProductID = DataObject.GetInt(ds, 0, "ProductID");
                Product product = new Product();
                DataSet dsPro = product.GetProductByProductID("ProductCat", ProductID);
                lblProductName.InnerText = DataObject.GetString(dsPro, 0, "TenGoi");
                imgProduct.Src = Globals.GetUploadsUrl() + DataObject.GetString(dsPro, 0, "Anh");
            }
        }
        catch 
        {
            Response.Redirect("CustomerIdea.aspx?t=" + t);
        }
    }

    private void LoadGridViewCustomerIdea()
    {
        try
        {
            Contact obj = new Contact();
            DataSet ds = obj.GetAllContact("Contact", Globals.AgentCatID, t);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewCustomerIdea, ds);
        }
        catch { }
    }
    protected void gridViewCustomerIdea_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewCustomerIdea.Rows[e.NewEditIndex];
            Int32 ContactID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblContactID")).Text);
            Response.Redirect("CustomerIdea.aspx?Action=View&ContactID=" + ContactID + "&t=" + t);
        }
        catch { }
    }
    protected void gridViewCustomerIdea_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
            return;
        else if (e.Row.RowType == DataControlRowType.DataRow)
        {
            ImageButton btnEdit = e.Row.Cells[4].Controls[0] as ImageButton;
            ImageButton btnDelete = e.Row.Cells[5].Controls[0] as ImageButton;
            btnEdit.ToolTip = "Xem thông tin ý kiến khách hàng này";
            btnDelete.ToolTip = "Xóa ý kiến khách hàng này";
            btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa ý kiến khách hàng này không?') == false) return false;";
        }
    }
    protected void gridViewCustomerIdea_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewCustomerIdea.PageIndex = e.NewPageIndex;
        LoadGridViewCustomerIdea();
    }
    protected void gridViewCustomerIdea_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewCustomerIdea.Rows[e.RowIndex];
            Int32 ContactID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblContactID")).Text);
            Contact obj = new Contact();
            obj.DeleteContact(ContactID);
            LoadGridViewCustomerIdea();
        }
        catch { }
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 ContactID = Globals.GetIntFromQueryString("ContactID");
            Contact obj = new Contact();
            obj.DeleteContact(ContactID);
            Response.Redirect("CustomerIdea.aspx");
        }
        catch { }
    }
}
