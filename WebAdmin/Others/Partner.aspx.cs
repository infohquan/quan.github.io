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

public partial class WebAdmin_Others_Partner : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string Action = Globals.GetStringFromQueryString("Action");
        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            LoadGridViewPartner();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật Đối tác";
                lblTitle2.InnerText = "Cập nhật Đối tác";
                LoadDataEdit();
            }
        }
    }

    private void LoadGridViewPartner()
    {
        try
        {
            OtherFunctions objFunc = new OtherFunctions();
            DataSet ds = objFunc.GetAllPartner("Partner", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewPartner, ds);
        }
        catch { }
    }
    private void LoadDataEdit()
    {
        try
        {
            int PartnerID = Globals.GetIntFromQueryString("PartnerID");
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = new DataSet();
            ds = obj.GetPartnerByPartnerID("Partner", PartnerID);
            txtPartnerName.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerName"]);
            txtPartnerDescription.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerDescription"]);
            txtPartnerAddress.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerAddress"]);
            txtPartnerEmail.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerEmail"]);
            txtPartnerTel.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerTel"]);
            txtPartnerFax.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerFax"]);
            txtPartnerWebsite.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerWebsite"]);
            ImagePartner.Src = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["PartnerLogo"]);
            Session["FileImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["PartnerLogo"]);
            txtDateAdd.Value = Convert.ToString(ds.Tables[0].Rows[0]["PartnerAddDate"]);
        }
        catch 
        {
            Response.Redirect("Partner.aspx");
        }
    }
    protected void gridViewPartner_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
            return;
        else if (e.Row.RowType == DataControlRowType.DataRow)
        {
            ImageButton btnEdit = e.Row.Cells[4].Controls[0] as ImageButton;
            ImageButton btnDelete = e.Row.Cells[5].Controls[0] as ImageButton;
            btnEdit.ToolTip = "Chỉnh sửa đối tác này";
            btnDelete.ToolTip = "Xóa đối tác này";
            btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa đối tác này không?') == false) return false;";
        }
    }
    protected void gridViewPartner_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewPartner.Rows[e.NewEditIndex];
            Int32 PartnerID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblPartnerID")).Text);
            Response.Redirect("Partner.aspx?Action=Edit&PartnerID=" + PartnerID);
        }
        catch { }
    }
    protected void gridViewPartner_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewPartner.PageIndex = e.NewPageIndex;
        LoadGridViewPartner();
    }
    protected void gridViewPartner_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewPartner.Rows[e.RowIndex];
            Int32 PartnerID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblPartnerID")).Text);
            OtherFunctions obj = new OtherFunctions();
            String imageFileName = obj.GetPartnerLogoByPartnerID(PartnerID);
            Globals.DeleteFile(imageFileName);
            obj.DeletePartner(PartnerID);
            LoadGridViewPartner();
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            OtherFunctions obj = new OtherFunctions();
            string PartnerName = txtPartnerName.Value.Trim();
            string PartnerLogo = Convert.ToString(Session["FileImageName"]);
            string PartnerDescription = txtPartnerDescription.Value.Trim();
            string PartnerAddress = txtPartnerAddress.Value.Trim();
            string PartnerEmail = txtPartnerEmail.Value.Trim();
            string PartnerTel = txtPartnerTel.Value.Trim();
            string PartnerWebsite = txtPartnerWebsite.Value.Trim();
            string PartnerFax = txtPartnerFax.Value.Trim();
            int kq = -1;
            if (Action == "Edit")
            {
                int PartnerID = Globals.GetIntFromQueryString("PartnerID");
                kq = obj.UpdatePartner(PartnerID, Globals.AgentCatID, PartnerName, PartnerDescription, PartnerLogo, PartnerAddress, PartnerTel, PartnerFax, PartnerWebsite);
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertPartner(Globals.AgentCatID, PartnerName, PartnerDescription, PartnerLogo, PartnerAddress, PartnerTel, PartnerFax, PartnerWebsite);
                ShowMessage(kq, "thêm mới");
            }
            LoadGridViewPartner();
        }
        catch { }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " đối tác thành công!";
        else
            lblMessage.Text = "Không thể " + text + " đối tác!";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtPartnerName.Value = "";
        txtPartnerAddress.Value = "";
        txtPartnerDescription.Value = "";
        txtPartnerEmail.Value = "";
        txtPartnerName.Value = "";
        txtPartnerTel.Value = "";
        txtPartnerWebsite.Value = "";
        txtPartnerFax.Value = "";
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 PartnerID = Globals.GetIntFromQueryString("PartnerID");
            OtherFunctions obj = new OtherFunctions();
            String imageFileName = obj.GetPartnerLogoByPartnerID(PartnerID);
            Globals.DeleteFile(imageFileName);
            obj.DeletePartner(PartnerID);
            LoadGridViewPartner();
        }
        catch { }
    }
}
