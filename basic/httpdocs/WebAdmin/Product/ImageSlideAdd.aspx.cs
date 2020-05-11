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

public partial class WebAdmin_Product_ImageSlideAdd : System.Web.UI.Page
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
            string Action = Globals.GetStringFromQueryString("Action");
            Globals.BindLanguageToDDL(ddlLanguage);
            CommonDropDownList objDDL = new CommonDropDownList();
            objDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---");
        }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        CommonDropDownList objDDL = new CommonDropDownList();
        objDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---");
    }
    protected void ddlCatalog_SelectedIndexChanged(object sender, EventArgs e)
    {
        int CatID = Convert.ToInt32(ddlCatalog.SelectedValue);
        Product obj = new Product();
        DataSet ds = obj.GetProductByCatalogID("ProductCat", ddlLanguage.SelectedValue, CatID);
        DropDownListHelper dlHelper = new DropDownListHelper();
        
        dlHelper.FillData(ddlProduct, ds, "TenGoi", "ID");
        if (ddlLanguage.SelectedValue == "VI")
            ddlProduct.Items.Insert(0, new ListItem("--- Vui lòng chọn ---", "-1"));
        else if (ddlLanguage.SelectedValue == "EN")
            ddlProduct.Items.Insert(0, new ListItem("--- Please Choose ---", "-1"));
        ddlProduct.Attributes.Add("style", "color:Blue;font-size:14px;");
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
                Product obj = new Product();
                int ProductID = Convert.ToInt32(ddlProduct.SelectedValue);
                for (int i = 0; i < 5; i++)
                {
                    if (FileImageName[i] != "")
                        obj.InsertImageSlideOfProduct(ProductID, FileImageName[i], Globals.AgentCatID);
                }
                Response.Redirect("ImageSlideList.aspx?Lang=" + ddlLanguage.SelectedValue + "&CatID=" + ddlCatalog.SelectedValue + "&ProductID=" + ProductID);
                //lblMessage.Visible = true;
                //lblMessage.Text = "Đã thêm hình ảnh thành công!";
            }
        }
        catch { }
    }
}
