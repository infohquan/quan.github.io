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

public partial class WebAdmin_Product_Producer : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            LoadGridViewProducer();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật Nhà sản xuất";
                lblTitle2.InnerText = "Cập nhật Nhà sản xuất";
                LoadDataEdit();
            }
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            Producer obj = new Producer();
            int ProducerID = Globals.GetIntFromQueryString("ProducerID");
            DataSet ds = obj.GetProducerByProducerID("Producer", ProducerID);
            txtContactEmail.Value = Convert.ToString(ds.Tables[0].Rows[0]["ContactEmail"]);
            txtContactName.Value = Convert.ToString(ds.Tables[0].Rows[0]["ContactName"]);
            txtContactTel.Value = Convert.ToString(ds.Tables[0].Rows[0]["ContactTel"]);
            txtNotes.Value = Convert.ToString(ds.Tables[0].Rows[0]["Notes"]);
            txtProducerAddress.Value = Convert.ToString(ds.Tables[0].Rows[0]["ProducerAddress"]);
            txtProducerName.Value = Convert.ToString(ds.Tables[0].Rows[0]["ProducerName"]);
            ImageProducer.Src = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["ProducerImageURL"]);
            Session["FileImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["ProducerImageURL"]);
        }
        catch 
        {
            Response.Redirect("Producer.aspx");
        }
    }

    private void LoadGridViewProducer()
    {
        try
        {
            Producer obj = new Producer();
            DataSet ds = obj.GetAllProducer("Producer", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewProducer, ds);
        }
        catch { }
    }
    protected void gridViewProducer_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa nhà sản xuất này";
                btnDelete.ToolTip = "Xóa nhà sản xuất này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa nhà sản xuất này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewProducer_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewProducer.Rows[e.NewEditIndex];
            Int32 ProducerID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblProducerID")).Text);
            Response.Redirect("Producer.aspx?Action=Edit&ProducerID=" + ProducerID);
        }
        catch { }
    }
    protected void gridViewProducer_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewProducer.PageIndex = e.NewPageIndex;
        LoadGridViewProducer();
    }
    protected void gridViewProducer_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        //try
        {
            GridViewRow row = gridViewProducer.Rows[e.RowIndex];
            Int32 ProducerID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblProducerID")).Text);
            Producer obj = new Producer();
            String imageFileName = obj.GetProducerImageUrlByProducerID(ProducerID);
            Globals.DeleteFile(imageFileName, "ImageFiles/Producers");
            obj.DeleteProducer(ProducerID);
            LoadGridViewProducer();
        }
        //catch
        //{
        //    MessageBox.Show("Vui lòng xóa các sản phẩm của Nhà sản xuất này trước!");
        //}
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        //try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Producer obj = new Producer();
            string ProducerName = txtProducerName.Value.Trim();
            string ProducerAddress = txtProducerAddress.Value.Trim();
            string ContactName = txtContactName.Value.Trim();
            string ContactTel = txtContactTel.Value.Trim();
            string ContactEmail = txtContactEmail.Value.Trim();
            string Notes = txtNotes.Value.Trim();
            int kq = -1;
            if (Action == "Edit")
            {
                int ProducerID = Globals.GetIntFromQueryString("ProducerID");
                kq = obj.UpdateProducer(ProducerID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, Convert.ToString(Session["FileImageName"]), Notes);
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertProducer(Globals.AgentCatID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, Convert.ToString(Session["FileImageName"]), Notes);
                ShowMessage(kq, "thêm mới");
            }
            Session.Remove("FileImageName");
            //LoadGridViewProducer();
            Response.Redirect("Producer.aspx");
        }
        //catch { }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtContactEmail.Value = "";
        txtContactName.Value = "";
        txtContactTel.Value = "";
        txtNotes.Value = "";
        txtProducerAddress.Value = "";
        txtProducerName.Value = "";
        ImageProducer.Src = Globals.GetAdminImagesUrl() + "noimage.gif";
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 ProducerID = Globals.GetIntFromQueryString("ProducerID");
            Producer obj = new Producer();
            String imageFileName = obj.GetProducerImageUrlByProducerID(ProducerID);
            Globals.DeleteFile(imageFileName, "ImageFiles/Producers");
            int kq = -1;
            kq = obj.DeleteProducer(ProducerID);
            ShowMessage(kq, "xóa");
            LoadGridViewProducer();
        }
        catch
        {
            MessageBox.Show("Vui lòng xóa các sản phẩm của Nhà sản xuất này trước!");
        }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " nhà sản xuất thành công!";
        else
            lblMessage.Text = "Không thể " + text + " nhà sản xuất!";
    }
}
