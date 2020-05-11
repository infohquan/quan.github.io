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

public partial class WebAdmin_WebDemo_AddEdit : System.Web.UI.Page
{
    private string Action;
    protected void Page_Load(object sender, EventArgs e)
    {
        Action = Globals.GetStringFromQueryString("Action");
        if (fileUploadSmallImage.IsPosting)
            Session["SmallImageName"] = Globals.ProcessFileUpload(fileUploadSmallImage, true);
        if (fileUploadLargeImage.IsPosting)
            Session["LargeImageName"] = Globals.ProcessFileUpload(fileUploadLargeImage, true);
        if (!IsPostBack)
        {
            LoadWebDemoGroup();
            if (Action == "Edit")
            {
                lblTitle1.InnerText = "Cập nhật WebDemo";
                lblTitle2.InnerText = "Cập nhật WebDemo";
                LoadDataEdit();
            }
        }
    }

    private void LoadWebDemoGroup()
    {
        WebDemo obj = new WebDemo();
        int RootID = obj.GetRootID(Globals.AgentCatID);
        DataSet ds = obj.GetWebDemoGroupByParentID("WebDemoGroup", Globals.AgentCatID, RootID);
        DropDownListHelper ddlHelp = new DropDownListHelper();
        ddlHelp.FillData(ddlCategory, ds, "Name", "ID", "---Chọn chuyên mục WebDemo---");
    }
    private void LoadDataEdit()
    {
        //try
        //{
        //    int ID = Globals.GetIntFromQueryString("ID");
        //    int GroupID = Globals.GetIntFromQueryString("GroupID");
        //    WebDemo obj = new WebDemo();
        //    DataSet ds = obj.GetWebDemoByID("WebDemo", Globals.AgentCatID, ID);
        //    ddlCategory.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["GroupID"]);
        //    Session["SmallImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["SmallImage"]);
        //    Session["LargeImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["LargeImage"]);
        //    imgSmall.Src = Globals.GetImageUploadsUrl() + "WebDemos/" + SmallImageName;
        //    imgLarge.Src = Globals.GetImageUploadsUrl() + "WebDemos/" + LargeImageName;
        //    txtLink.Value = Convert.ToString(ds.Tables[0].Rows[0]["Link"]);
        //}
        //catch { }
    }
    private void Save()
    {
        try
        {
            WebDemo obj = new WebDemo();
            int GroupID = Convert.ToInt32(ddlCategory.SelectedValue);
            string Link = txtLink.Value.Trim();
            if (Action == "Edit")
            {
                int ID = Globals.GetIntFromQueryString("ID");
                obj.UpdateWebDemo(ID, Globals.AgentCatID, GroupID, Convert.ToString(Session["SmallImageName"]), Convert.ToString(Session["LargeImageName"]), "", "", Link);
            }
            else
                obj.InsertWebDemo(Globals.AgentCatID, GroupID, Convert.ToString(Session["SmallImageName"]), Convert.ToString(Session["LargeImageName"]), "", "", Link);
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "WebDemo/DemoList.aspx");
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "WebDemo/AddEdit.aspx");
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int ID = Globals.GetIntFromQueryString("ID");
            WebDemo obj = new WebDemo();
            DataSet ds = obj.GetWebDemoByID("WebDemo", Globals.AgentCatID, ID);
            Globals.DeleteFile(Convert.ToString(ds.Tables[0].Rows[0]["SmallImage"]), "ImageFiles/WebDemos");
            Globals.DeleteFile(Convert.ToString(ds.Tables[0].Rows[0]["LargeImage"]), "ImageFiles/WebDemos");
            obj.DeleteWebDemo(ID);
            Response.Redirect("DemoList.aspx");
        }
        catch { }
    }
}
