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

public partial class WebAdmin_Gallery_Photo : System.Web.UI.Page
{
    private static string[] FileImageName = new string[5] { "", "", "", "", "" };
    protected void Page_Load(object sender, EventArgs e)
    {
        if (fileUploadImage0.IsPosting)
            FileImageName[0] = Globals.ProcessFileUpload(fileUploadImage0, true);
        if (fileUploadImage1.IsPosting)
            FileImageName[1] = Globals.ProcessFileUpload(fileUploadImage1, true);
        if (fileUploadImage2.IsPosting)
            FileImageName[2] = Globals.ProcessFileUpload(fileUploadImage2, true);
        if (fileUploadImage3.IsPosting)
            FileImageName[3] = Globals.ProcessFileUpload(fileUploadImage3, true);
        if (fileUploadImage4.IsPosting)
            FileImageName[4] = Globals.ProcessFileUpload(fileUploadImage4, true);

        if (!IsPostBack)
        {
            LoadAlbum();
            LoadPhotoList();
        }
        //ddlAlbum.SelectedIndex = 1;
        //ddlAlbum.Enabled = false;
    }

    private void LoadAlbum()
    {
        Gallery obj = new Gallery();
        DataSet ds = obj.GetAllAlbum("GalleryAlbum", Globals.AgentCatID);
        if (ds.Tables[0].Rows.Count > 0)
        {
            DropDownListHelper ddlHelp = new DropDownListHelper();
            ddlHelp.FillData(ddlAlbum, ds, "AlbumName", "ID", "---Vui lòng chọn Album---");
        }
    }
    private void LoadPhotoList()
    {
        try
        {
            Gallery obj = new Gallery();
            DataSet ds = obj.GetAllPhoto("GalleryPhoto", Globals.AgentCatID);
            if (ds.Tables.Count > 0)
            {
                DataListHelper dlHelper = new DataListHelper();
                dlHelper.FillData(DataListPhoto, ds);
            }
        }
        catch { }
    }
    protected void ProcessPhoto(object sender, DataListCommandEventArgs e)
    {
        try
        {
            Gallery obj = new Gallery();
            int PhotoID = Convert.ToInt32(((Label)e.Item.Controls[0].FindControl("lblPhotoID")).Text);
            DataSet ds = obj.GetPhotoByPhotoID("GalleryPhoto", PhotoID);
            string PhotoUrl = Convert.ToString(ds.Tables[0].Rows[0]["PhotoUrl"]);
            //if (e.CommandName == "ViewImage")
            //{
            //    DataSet ds = obj.GetProductImageByProductImageID("ProductImage", ProductImageID);
            //    imgView.Visible = true;
            //    imgView.ImageUrl = Globals.GetImageUploadsUrl() + "PhotoGallerys/" + Convert.ToString(ds.Tables[0].Rows[0]["ProductImageURL"]);
            //}
            if (e.CommandName == "DeleteImage")
            {
                imgLarg.Visible = false;
                Globals.DeleteFile(PhotoUrl, "ImageFiles/PhotoGallerys");
                obj.DeletePhoto(PhotoID);
                LoadPhotoList();
            }
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            if (FileImageName[0] == "" && FileImageName[1] == "" && FileImageName[2] == "" &&
               FileImageName[3] == "" && FileImageName[4] == "")
            {
                lblMessage.Visible = true;
                lblMessage.Text = "Vui lòng chọn ít nhất 1 hình ảnh!";
            }
            else
            {
                Gallery obj = new Gallery();
                int AlbumID = Convert.ToInt32(ddlAlbum.SelectedValue);
                string PhotoTitle = txtTitle.Value;
                string PhotoDescriptions = txtDescriptions.Value;
                for (int i = 0; i < 5; i++)
                {
                    if (FileImageName[i] != "")
                        obj.InsertPhoto(Globals.AgentCatID, AlbumID, "", FileImageName[i], "", "");
                }
                Response.Redirect("Photo.aspx");
                //lblMessage.Visible = true;
                //lblMessage.Text = "Đã thêm hình ảnh thành công!";
            }
        }
        catch { }
    }
    protected void ddlAlbum_SelectedIndexChanged(object sender, EventArgs e)
    {
        try
        {
            Gallery obj = new Gallery();
            int AlbumID = Convert.ToInt32(ddlAlbum.SelectedValue);
            if (AlbumID != 0)
            {
                DataSet ds = obj.GetPhotoByAlbumID("GalleryPhoto", Globals.AgentCatID, AlbumID);
                if (ds.Tables.Count > 0)
                {
                    DataListHelper dlHelper = new DataListHelper();
                    dlHelper.FillData(DataListPhoto, ds);
                }
            }
            else
                LoadPhotoList();
        }
        catch { }
    }
}
