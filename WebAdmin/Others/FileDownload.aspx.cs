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

public partial class WebAdmin_Others_FileDownload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (fileUpload.IsPosting)
            Session["FileName"] = Globals.ProcessFileUpload(fileUpload, true);
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            LoadGridViewFileDownload();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật file";
                lblTitle2.InnerText = "Cập nhật file";
                LoadDataEdit();
            }
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            int ID = Globals.GetIntFromQueryString("ID");
            DataSet ds = obj.GetFileDownloadByID("FileDownload", ID);
            txtFileTitle.Text = Convert.ToString(ds.Tables[0].Rows[0]["FileTitle"]);
            linkFileName.Text = Convert.ToString(ds.Tables[0].Rows[0]["FileTitle"]);
            linkFileName.NavigateUrl = Globals.GetUploadsUrl() + "CommonFiles/" + Convert.ToString(ds.Tables[0].Rows[0]["FileName"]);
            linkFileName.Target = "_blank";
            linkFileName.Attributes.Add("style", "text-decoration:underline;");
            Session["FileName"] = Convert.ToString(ds.Tables[0].Rows[0]["FileName"]);
        }
        catch { }
    }

    private void LoadGridViewFileDownload()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetAllFileDownload("FileDownload", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewFileDownload, ds);
        }
        catch { }
    }
    protected void gridViewFileDownload_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[5].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[6].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa file này";
                btnDelete.ToolTip = "Xóa file này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa file này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewFileDownload_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewFileDownload.Rows[e.NewEditIndex];
            Int32 ID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblID")).Text);
            Response.Redirect("FileDownload.aspx?Action=Edit&ID=" + ID);
        }
        catch { }
    }
    protected void gridViewFileDownload_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewFileDownload.PageIndex = e.NewPageIndex;
        LoadGridViewFileDownload();
    }
    protected void gridViewFileDownload_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewFileDownload.Rows[e.RowIndex];
            Int32 ID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblID")).Text);
            OtherFunctions obj = new OtherFunctions();
            String FileName = obj.GetFileNameByID(ID);
            Globals.DeleteFile(FileName);
            obj.DeleteFileDownload(ID);
            LoadGridViewFileDownload();
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            OtherFunctions obj = new OtherFunctions();
            string FileTitle = txtFileTitle.Text.Trim();
            
            int kq = -1;
            if (Action == "Edit")
            {
                Int32 ID = Globals.GetIntFromQueryString("ID");
                kq = obj.UpdateFileDownload(Globals.AgentCatID, ID, FileTitle, Convert.ToString(Session["FileName"]));
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertFileDownload(Globals.AgentCatID, FileTitle, Convert.ToString(Session["FileName"]), "");
                ShowMessage(kq, "thêm mới");
            }
            //LoadGridViewFileDownload();
            Response.Redirect("FileDownload.aspx");
        }
        catch { }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 ID = Globals.GetIntFromQueryString("ID");
            OtherFunctions obj = new OtherFunctions();
            String FileName = obj.GetFileNameByID(ID);
            Globals.DeleteFile(FileName, "CommonFiles");
            int kq = -1;
            kq = obj.DeleteFileDownload(ID);
            ShowMessage(kq, "xóa");
            LoadGridViewFileDownload();
        }
        catch { }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " file thành công!";
        else
            lblMessage.Text = "Không thể " + text + " file!";
    }
}
