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

public partial class WebAdmin_Product_ImageSlideList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            CommonDropDownList objDDL = new CommonDropDownList();
            objDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---");

            string Lang = Globals.GetStringFromQueryString("Lang");
            int CatID = Globals.GetIntFromQueryString("CatID");
            int ProductID = Globals.GetIntFromQueryString("ProductID");
            ddlLanguage.SelectedValue = Lang;
            ddlCatalog.SelectedValue = CatID.ToString();
            LoadProductListByCatID(Lang, CatID);
            ddlProduct.SelectedValue = ProductID.ToString();
            LoadPhotoList(Lang, ProductID);
        }
    }
    private void LoadProductListByCatID(string Lang, int CatID)
    {
        try
        {
            Product obj = new Product();
            DataSet ds = obj.GetProductByCatalogID("ProductCat", Lang, CatID);
            DropDownListHelper dlHelper = new DropDownListHelper();

            dlHelper.FillData(ddlProduct, ds, "TenGoi", "ID");
            if (ddlLanguage.SelectedValue == "VI")
                ddlProduct.Items.Insert(0, new ListItem("--- Vui lòng chọn ---", "-1"));
            else if (ddlLanguage.SelectedValue == "EN")
                ddlProduct.Items.Insert(0, new ListItem("--- Please Choose ---", "-1"));
            ddlProduct.Attributes.Add("style", "color:Blue;font-size:14px;");
        }
        catch { }
    }
    private void LoadPhotoList(string Lang, int ProductID)
    {
        try
        {
            Product obj = new Product();
            DataSet ds = obj.GetImageListOfProduct("ProductImage", ProductID, Globals.AgentCatID);
            DataListHelper dlHelper = new DataListHelper();
            if (ds.Tables.Count > 0)
                dlHelper.FillData(DataListPhoto, ds);
        }
        catch { }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        CommonDropDownList objDDL = new CommonDropDownList();
        objDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---");
    }
    protected void ddlCatalog_SelectedIndexChanged(object sender, EventArgs e)
    {
        try
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
        catch { }
    }
    protected void ddlProduct_SelectedIndexChanged(object sender, EventArgs e)
    {
        //Response.Redirect("ImageSlideList.aspx?Lang=" + ddlLanguage.SelectedValue + "&CatID=" + ddlCatalog.SelectedValue + "&ProductID=" + ddlProduct.SelectedValue);
        LoadPhotoList(ddlLanguage.SelectedValue, Convert.ToInt32(ddlProduct.SelectedValue));
    }
    protected void ProcessPhoto(object sender, DataListCommandEventArgs e)
    {
        try
        {
            Product obj = new Product();
            int ProductImageID = Convert.ToInt32(((Label)e.Item.Controls[0].FindControl("lblProductImageID")).Text);
            DataSet dsImg = obj.GetProductImageByProductImageID("ProductImage", ProductImageID);
            string ProductImageURL = Convert.ToString(dsImg.Tables[0].Rows[0]["ProductImageURL"]);
            //if (e.CommandName == "ViewImage")
            //{
            //    DataSet ds = obj.GetProductImageByProductImageID("ProductImage", ProductImageID);
            //    imgView.Visible = true;
            //    imgView.ImageUrl = Globals.GetImageUploadsUrl() + "ProductImageSlides/" + Convert.ToString(ds.Tables[0].Rows[0]["ProductImageURL"]);
            //}
            if (e.CommandName == "DeleteImage")
            {
                imgLarg.Visible = false;
                Globals.DeleteFile(ProductImageURL, "ImageFiles/ProductImageSlides");
                obj.DeleteProductImage(ProductImageID);
                LoadPhotoList(ddlLanguage.SelectedValue, Convert.ToInt32(ddlProduct.SelectedValue));
            }
        }
        catch { }
    }
}
