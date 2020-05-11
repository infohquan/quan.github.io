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

public partial class WebAdmin_Others_ImageSlideIndex : System.Web.UI.Page
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

        LoadPhotoList();
        string Action = Globals.GetStringFromQueryString("Action");
        if (Action == "DeleteImage")
        {
            OtherFunctions obj = new OtherFunctions();
            int ImageID = Globals.GetIntFromQueryString("ImageID");
            string ImageUrl = Globals.GetStringFromQueryString("ImageUrl");
            Globals.DeleteFile(ImageUrl, "ImageFiles/ImageSlideIndexs");
            obj.DeleteImageSlideIndex(ImageID);
            Session["DeleteImage"] = true;
            Response.Redirect("ImageSlideIndex.aspx");
        }
        if (Session["DeleteImage"] != null)
        {
            lblMessage.Visible = true;
            lblMessage.Text = "Đã xóa hình ảnh thành công!";
            Session.Remove("DeleteImage");
        }
    }
    private void LoadPhotoList()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetImageListSlideIndex("ImageSlideIndex", Globals.AgentCatID);
            DataListHelper dlHelper = new DataListHelper();
            if (ds.Tables.Count > 0)
                dlHelper.FillData(DataListImage, ds);
        }
        catch { }
    }
    protected void ProcessImage(object sender, DataListCommandEventArgs e)
    {
        //try
        //{
        //    OtherFunctions obj = new OtherFunctions();
        //    int ImageID = Convert.ToInt32(((Label)e.Item.Controls[0].FindControl("lblImageID")).Text);

        //    if (e.CommandName == "ViewImage")
        //    {
        //        MessageBox.Show("View");
        //        DataSet ds = obj.GetImageSlideIndexByImageID("ImageSlideIndex", ImageID);
        //        imgView1.Visible = true;
        //        imgView1.ImageUrl = Globals.GetImageUploadsUrl() + "ImageSlideIndexs/" + Convert.ToString(ds.Tables[0].Rows[0]["ImageUrl"]);
        //    }
        //    else if (e.CommandName == "DeleteImage")
        //    {
        //        imgView1.Visible = false;
        //        obj.DeleteImageSlideIndex(ImageID);
        //        LoadPhotoList();
        //    }
        //}
        //catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        //try
        {
            if (FileImageName[0] == "" && FileImageName[1] == "" && FileImageName[2] == "" &&
               FileImageName[3] == "" && FileImageName[4] == "")
            {
                lblMessage.Visible = true;
                lblMessage.Text = "Vui lòng chọn ít nhất 1 hình ảnh!";
            }
            else
            {
                OtherFunctions obj = new OtherFunctions();
                for (int i = 0; i < 5; i++)
                {
                    if (FileImageName[i] != "")
                        obj.InsertImageSlideIndex(Globals.AgentCatID, FileImageName[i], "", "");
                }
                lblMessage.Visible = true;
                lblMessage.Text = "Đã thêm hình ảnh thành công!";
                LoadPhotoList();
            }
        }
        //catch { }
    }
}
