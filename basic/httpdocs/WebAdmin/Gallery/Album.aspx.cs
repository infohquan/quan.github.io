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

public partial class WebAdmin_Gallery_Album : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            LoadGridViewAlbum();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật Album";
                lblTitle2.InnerText = "Cập nhật Album";
                LoadDataEdit();
                linkAdd.Visible = true;
                linkAdd.NavigateUrl = Globals.GetAdminFolderUrl() + "Gallery/Album.aspx";
            }
        }
    }

    private void LoadDataEdit()
    {
        //try
        {
            Gallery obj = new Gallery();
            int AlbumID = Globals.GetIntFromQueryString("AlbumID");
            DataSet ds = obj.GetAlbumByAlbumID("GalleryAlbum", AlbumID);
            txtAlbumName.Value = Convert.ToString(ds.Tables[0].Rows[0]["AlbumName"]);
            txtAlbumDescription.Value = Convert.ToString(ds.Tables[0].Rows[0]["AlbumDescriptions"]);
        }
        //catch
        //{
        //    Response.Redirect("Album.aspx");
        //}
    }

    private void LoadGridViewAlbum()
    {
        //try
        {
            Gallery obj = new Gallery();
            DataSet ds = obj.GetAllAlbum("GalleryAlbum", Globals.AgentCatID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewAlbum, ds);
        }
        //catch { }
    }
    protected void gridViewAlbum_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[3].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[4].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa Album này";
                btnDelete.ToolTip = "Xóa Album này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Album này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewAlbum_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewAlbum.Rows[e.NewEditIndex];
            Int32 AlbumID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblAlbumID")).Text);
            Response.Redirect("Album.aspx?Action=Edit&AlbumID=" + AlbumID);
        }
        catch { }
    }
    protected void gridViewAlbum_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewAlbum.PageIndex = e.NewPageIndex;
        LoadGridViewAlbum();
    }
    protected void gridViewAlbum_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewAlbum.Rows[e.RowIndex];
            Int32 AlbumID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblAlbumID")).Text);
            Gallery obj = new Gallery();
            obj.DeleteAlbum(AlbumID);
            LoadGridViewAlbum();
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Gallery obj = new Gallery();
            string AlbumName = txtAlbumName.Value;
            string AlbumDescriptions = txtAlbumDescription.Value;
            int kq = -1;
            if (Action == "Edit")
            {
                int AlbumID = Globals.GetIntFromQueryString("AlbumID");
                kq = obj.UpdateAlbum(AlbumID, Globals.AgentCatID, AlbumName, AlbumDescriptions, 0, "");
                ShowMessage(kq, "cập nhật");
            }
            else
            {
                kq = obj.InsertAlbum(Globals.AgentCatID, AlbumName, AlbumDescriptions, 0, "");
                ShowMessage(kq, "thêm mới");
            }
            LoadGridViewAlbum();
        }
        catch { }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtAlbumDescription.Value = "";
        txtAlbumName.Value = "";
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 AlbumID = Globals.GetIntFromQueryString("AlbumID");
            Gallery obj = new Gallery();
            int kq = -1;
            kq = obj.DeleteAlbum(AlbumID);
            ShowMessage(kq, "xóa");
            LoadGridViewAlbum();
        }
        catch { }
    }

    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Album thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Album!";
    }
}
