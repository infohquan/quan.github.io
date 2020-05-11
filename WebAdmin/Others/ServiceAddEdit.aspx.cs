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

public partial class WebAdmin_Others_ServiceAddEdit : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string Action = Globals.GetStringFromQueryString("Action");
        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            if (Action == "Edit")
                LoadDataEdit();
        }
    }
    private void LoadDataEdit()
    {
        try
        {
            int ServiceID = Globals.GetIntFromQueryString("ServiceID");
            string LangEdit = Globals.GetStringFromQueryString("Lang");
            lblTitle1.InnerText = "Cập nhật Dịch vụ";
            lblTitle2.InnerText = "Cập nhật Dịch vụ";

            OtherFunctions obj = new OtherFunctions();
            DataSet ds = new DataSet();
            ddlLanguage.SelectedItem.Value = LangEdit;

            ds = obj.GetServiceByServiceID("Service", ServiceID, LangEdit);
            txtServiceName.Value = Convert.ToString(ds.Tables[0].Rows[0]["ServiceName"]);
            fckContent.Value = Convert.ToString(ds.Tables[0].Rows[0]["ServiceContent"]);
            ImageService.Src = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[0]["ServiceImageUrl"]);
            Session["FileImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["ServiceImageUrl"]);
            txtDateAdd.Value = Convert.ToString(ds.Tables[0].Rows[0]["ServiceAddDate"]);
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect("ServiceList.aspx");
    }

    private void Save()
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            string Lang = Globals.GetStringFromQueryString("Lang");
            OtherFunctions obj = new OtherFunctions();
            string ServiceName = txtServiceName.Value.Trim();
            string ServiceImageUrl = Convert.ToString(Session["FileImageName"]);
            string ServiceContent = fckContent.Value.Trim();

            if (Action == "Edit")
            {
                int ServiceID = Globals.GetIntFromQueryString("ServiceID");
                obj.UpdateService(ServiceID, Globals.AgentCatID, Lang, ServiceName, ServiceImageUrl, ServiceContent);
            }
            else
                obj.InsertService(Globals.AgentCatID, ddlLanguage.SelectedValue, ServiceName, ServiceImageUrl, ServiceContent);
        }
        catch { }
    }
    private void Reset()
    {
        txtServiceName.Value = "";
        fckContent.Value = "";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Reset();
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            Int32 ServiceID = Globals.GetIntFromQueryString("ServiceID");
            OtherFunctions obj = new OtherFunctions();
            String imageFileName = obj.GetServiceImageUrlByServiceID(ServiceID);
            Globals.DeleteFile(imageFileName);
            obj.DeleteService(ServiceID);
            Response.Redirect("ServiceList.aspx");
        }
        catch { }
    }
}
