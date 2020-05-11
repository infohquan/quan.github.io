using System;
using System.IO;
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

public partial class WebAdmin_Others_VideoClip_Old : System.Web.UI.Page
{
    private static string FileImageName = "";
    private static string FileVideoSource = "";
    private static string FileExt = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (FileUploadImage.IsPosting)
            FileImageName = Globals.ProcessFileUpload(FileUploadImage, true);
        if (!IsPostBack)
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Globals.BindLanguageToDDL(ddlLanguage);
            Globals.BindLanguageToDDL(ddlLanguage2);

            LoadGridViewVideo(ddlLanguage.SelectedValue);
            if (Action == "Edit")
                LoadDataEdit();
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            lblTitle1.InnerText = "Cập nhật Video Clip sản phẩm";
            lblTitle2.InnerText = "Cập nhật Video Clip sản phẩm";
            string LangEdit = Globals.GetStringFromQueryString("Lang");
            int VideoID = Globals.GetIntFromQueryString("VideoID");
            Product objPro = new Product();
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetVideoByVideoID("VideoProduct", VideoID);
            ddlLanguage.SelectedValue = LangEdit;
            txtVideoName.Text = Convert.ToString(ds.Tables[0].Rows[0]["VideoName"]);
            ImgVideo.Src = Globals.GetImageUploadsUrl() + "Videos/" + Convert.ToString(ds.Tables[0].Rows[0]["VideoImage"]);
            FileImageName = Convert.ToString(ds.Tables[0].Rows[0]["VideoImage"]);
            FileVideoSource = Convert.ToString(ds.Tables[0].Rows[0]["VideoSrc"]);
            FileExt = Convert.ToString(ds.Tables[0].Rows[0]["FileExt"]);
            linkVideo.Visible = true;
            linkVideo.Text = FileVideoSource;
            ImgVideo.Src = Globals.GetUploadsUrl() + FileImageName;
            linkVideo.Target = "_blank";
            linkVideo.NavigateUrl = Globals.ApplicationPath + "VideoClip.aspx?VideoID=" + VideoID + "&Lang=" + LangEdit;
            linkAdd.Visible = true;
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            OtherFunctions obj = new OtherFunctions();
            HttpPostedFile hpf = FileUploadVideo.PostedFile;
            if (FileUploadVideo.HasFile)
                FileVideoSource = hpf.FileName;

            if (FileImageName != "" & FileVideoSource != "")
            {
                FileExt = FileVideoSource.Substring(FileVideoSource.Length - 3);
                hpf.SaveAs(Globals.GetPhysicalUploadsUrl() + FileVideoSource);
                if (FileExt.ToLower() == "wmv" || FileExt.ToLower() == "flv")
                {
                    int ProductID = 0;
                    string VideoName = txtVideoName.Text.Trim();
                    int kq = -1;
                    if (Action == "Edit")
                    {
                        int VideoID = Globals.GetIntFromQueryString("VideoID");
                        kq = obj.UpdateVideoClip(VideoID, Globals.AgentCatID, ddlLanguage.SelectedValue, ProductID, FileImageName, FileVideoSource, VideoName, FileExt);
                        ShowMessage(kq, "cập nhật");
                    }
                    else
                    {
                        kq = obj.InsertVideoClip(Globals.AgentCatID, ddlLanguage.SelectedValue, ProductID, FileImageName, FileVideoSource, VideoName, FileExt);
                        ShowMessage(kq, "thêm");
                    }
                    ddlLanguage2.SelectedValue = ddlLanguage.SelectedValue;
                    Response.Redirect("VideoClip.aspx");
                }
                else
                    MessageBox.Show("Vui lòng chỉ chọn file .flv hoặc .wmv để upload!");
            }
            else if (FileImageName == "")
                MessageBox.Show("Vui lòng chọn file hình ảnh đại diện!");
            else if (FileVideoSource == "")
                MessageBox.Show("Vui lòng chọn file Video Clip!");
        }
        catch (System.IO.IOException)
        {
            MessageBox.Show("Đã tồn tại file có tên này rồi! Vui lòng đổi tên hoặc chọn file khác!");
        }
    }
    private void ShowMessage(int kq, string text)
    {
        lblMessage.Visible = true;
        if (kq != -1)
            lblMessage.Text = "Đã " + text + " Video Clip thành công!";
        else
            lblMessage.Text = "Không thể " + text + " Video Clip!";
    }

    private void LoadGridViewVideo(string Lang)
    {
        try
        {
            OtherFunctions objFunc = new OtherFunctions();
            DataSet ds = objFunc.GetAllVideo("Video", Globals.AgentCatID, Lang);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewVideo, ds);
        }
        catch { }
    }
    protected void gridViewVideo_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
            return;
        else if (e.Row.RowType == DataControlRowType.DataRow)
        {
            ImageButton btnEdit = e.Row.Cells[4].Controls[0] as ImageButton;
            ImageButton btnDelete = e.Row.Cells[5].Controls[0] as ImageButton;
            btnEdit.ToolTip = "Chỉnh sửa Video Clip này";
            btnDelete.ToolTip = "Xóa Video Clip này";
            btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa Video Clip này không?') == false) return false;";
        }
    }
    protected void gridViewVideo_RowEditing(object sender, GridViewEditEventArgs e)
    {
        GridViewRow row = gridViewVideo.Rows[e.NewEditIndex];
        Int32 VideoID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblVideoID")).Text);
        //Int32 ProductID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblProductID")).Text);
        Response.Redirect("VideoClip.aspx?Action=Edit&VideoID=" + VideoID + "&Lang=" + ddlLanguage2.SelectedValue);
    }
    protected void gridViewVideo_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewVideo.PageIndex = e.NewPageIndex;
        LoadGridViewVideo(ddlLanguage2.SelectedValue);
    }
    protected void gridViewVideo_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewVideo.Rows[e.RowIndex];
            Int32 VideoID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblVideoID")).Text);
            OtherFunctions obj = new OtherFunctions();
            DataSet dsVideo = obj.GetVideoByVideoID("VideoProduct", VideoID);
            //xóa file image
            Globals.DeleteFile(Convert.ToString(dsVideo.Tables[0].Rows[0]["VideoImage"]), "ImageFiles/Videos");
            //xóa file video
            string pathFileVideo = Globals.GetPhysicalUploadsUrl() + "VideoFiles/" + Convert.ToString(dsVideo.Tables[0].Rows[0]["VideoSrc"]);
            Globals.DeleteFile(pathFileVideo);
            obj.DeleteVideo(VideoID);
            LoadGridViewVideo(ddlLanguage2.SelectedValue);
        }
        catch { }
    }
    protected void ddlLanguage2_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewVideo(ddlLanguage2.SelectedValue);
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int VideoID = Globals.GetIntFromQueryString("VideoID");
            OtherFunctions obj = new OtherFunctions();
            DataSet dsVideo = obj.GetVideoByVideoID("VideoProduct", VideoID);
            //xóa file image
            Globals.DeleteFile(Convert.ToString(dsVideo.Tables[0].Rows[0]["VideoImage"]), "ImageFiles/Videos");
            //xóa file video
            Globals.DeleteFile(Convert.ToString(dsVideo.Tables[0].Rows[0]["VideoSrc"]), "VideoFiles/");
            obj.DeleteVideo(VideoID);
            //LoadGridViewVideo(ddlLanguage2.SelectedValue);
            Response.Redirect("VideoClip.aspx#VideoClipList");
        }
        catch { }
    }
}
