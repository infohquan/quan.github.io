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

public partial class WebAdmin_Others_CustomerAddEdit : System.Web.UI.Page
{ 
    private string Action;
    protected void Page_Load(object sender, EventArgs e)
    {
        Action = Globals.GetStringFromQueryString("Action");

        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật Khách hàng";
                lblTitle2.InnerText = "Cập nhật Khách hàng";
                LoadDataEdit();
            }
        }
    }
    private void LoadDataEdit()
    {
        //try
        {
            int CustomerID = Globals.GetIntFromQueryString("CustomerID");

            Customer obj = new Customer();
            DataSet ds = new DataSet();

            ds = obj.GetCustomerByCustomerID("Customer", Globals.AgentCatID, CustomerID);
            txtAddress.Value = Convert.ToString(ds.Tables[0].Rows[0]["CustomerAddress"]);
            txtCustomerFullName.Value = Convert.ToString(ds.Tables[0].Rows[0]["CustomerFullName"]);
            txtEmail.Value = Convert.ToString(ds.Tables[0].Rows[0]["CustomerEmail"]);
            txtMobile.Value = Convert.ToString(ds.Tables[0].Rows[0]["CustomerMobi"]);
            txtTel.Value = Convert.ToString(ds.Tables[0].Rows[0]["CustomerTel"]);
            txtWebsite.Value = Convert.ToString(ds.Tables[0].Rows[0]["CustomerWebsite"]);            
            fckContent.Value = Convert.ToString(ds.Tables[0].Rows[0]["CustomerContent"]);
            imgCustomer.Src = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["CustomerLogo"]);
            Session["FileImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["CustomerLogo"]);
        }
        //catch { }
    }
    private void Save()
    {
        //try
        {
            Customer obj = new Customer();
            string Address = txtAddress.Value.Trim();
            string CustomerFullName = txtCustomerFullName.Value.Trim();
            string Email = txtEmail.Value.Trim();
            string Mobile = txtMobile.Value.Trim();
            string Tel = txtTel.Value.Trim();
            string Website = txtWebsite.Value.Trim();
            string Fax = txtFax.Value.Trim();
            string Content = fckContent.Value.Trim();

            if (Action == "Edit")
            {
                int CustomerID = Globals.GetIntFromQueryString("CustomerID");
                obj.UpdateCustomer(CustomerID, Email, CustomerFullName, Address, Mobile, Tel, Fax, 1, false, Convert.ToString(Session["FileImageName"]), Website);
            }
            else
                obj.InsertCustomer(Globals.AgentCatID, Email, "", "", CustomerFullName, Address, Mobile, Tel, Fax, 1, false, Convert.ToString(Session["FileImageName"]), Website);
        }
        //catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "Others/CustomerList.aspx");
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "Others/CustomerAddEdit.aspx");
    }
    private void Reset()
    {
        txtAddress.Value = "";
        txtCustomerFullName.Value = "";
        txtEmail.Value = "";
        txtFax.Value = "";
        txtMobile.Value = "";
        txtTel.Value = "";
        txtWebsite.Value = "";
        fckContent.Value = "";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int CustomerID = Globals.GetIntFromQueryString("CustomerID");
            Customer obj = new Customer();
            String imageFileName = obj.GetCustomerLogoByCustomerID(CustomerID);
            Globals.DeleteFile(imageFileName);
            obj.DeleteCustomer(CustomerID);
            Response.Redirect("CustomerList.aspx");
        }
        catch { }
    }
}
