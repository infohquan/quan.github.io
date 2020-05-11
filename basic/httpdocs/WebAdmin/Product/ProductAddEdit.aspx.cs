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

public partial class WebAdmin_Product_ProductAddEdit : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (fileUploadImage.IsPosting)
                Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
            if (!IsPostBack)
            {
                string Action = Globals.GetStringFromQueryString("Action");
                Globals.BindLanguageToDDL(ddlLanguage);
                CommonDropDownList objCatDDL = new CommonDropDownList();
                objCatDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---");
                objCatDDL.LoadDropDownListProducer(ddlProducer, ddlLanguage.SelectedValue, false);
                ddlProducer.SelectedIndex = 1;
                ddlCatalog.SelectedIndex = 1;
                if (Action == "Edit")
                    LoadDataEdit();
            }
        }
        catch { }
    }
        
    private void LoadDataEdit()
    {
        try
        {
            string Lang = Globals.GetStringFromQueryString("Lang");
            int ProductID = Globals.GetIntFromQueryString("ProductID");
            int CatID = Globals.GetIntFromQueryString("CatID");
            Product objProduct = new Product();
            DataSet dsProduct = new DataSet();
            lblTitle1.InnerText = "Cập nhật Sản phẩm";
            lblTitle2.InnerText = "Cập nhật Sản phẩm";
            
            ddlLanguage.SelectedItem.Value = Lang;
            ddlCatalog.Enabled = true;
            CommonDropDownList objCatDDL = new CommonDropDownList();
            objCatDDL.LoadDropDownListCatalog(ddlCatalog, Lang, "--- Vui lòng chọn ---");
            ddlCatalog.SelectedValue = CatID.ToString();

            dsProduct = objProduct.GetProductByProductID("ProductCat", ProductID, Lang);
            ddlProducer.SelectedValue = Convert.ToString(dsProduct.Tables[0].Rows[0]["ProducerID"]);
            txtProductName.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["TenGoi"]);
            txtProductCode.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["MaSanPham"]);
            txtPrice.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["GiaBan"]);
            txtPriceAfterSaleOff.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["GiaKhuyenMai"]);
            txtCurrency.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["NgoaiTe"]);
            txtExcerpt.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["ThongTin1"]);
            fckProductDesc.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["ThongTin2"]);
            ImageProduct.Src = Globals.GetUploadsUrl() + Convert.ToString(dsProduct.Tables[0].Rows[0]["Anh"]);
            ImageProduct.Width = 300;
            ImageProduct.Height = 300;
            Session["FileImageName"] = Convert.ToString(dsProduct.Tables[0].Rows[0]["Anh"]);
            txtKeyword.Value = Convert.ToString(dsProduct.Tables[0].Rows[0]["Keyword"]);
            //ddlProducer.SelectedValue = Convert.ToString(dsProduct.Tables[0].Rows[0]["ProducerID"]);
            cbIsNew.Checked = Convert.ToBoolean(dsProduct.Tables[0].Rows[0]["IsNew"].ToString());
            cbIsHot.Checked = Convert.ToBoolean(dsProduct.Tables[0].Rows[0]["IsHot"].ToString());
            cbIsBestSeller.Checked = Convert.ToBoolean(dsProduct.Tables[0].Rows[0]["IsBestSeller"].ToString());
        }
        catch { }
    }

    private void Save()
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            int ProductID = Globals.GetIntFromQueryString("ProductID");
            Product obj = new Product();
            int GroupID = Convert.ToInt32(ddlCatalog.SelectedItem.Value);
            string TenGoi = txtProductName.Value;
            string MaSanPham = txtProductCode.Value;
            string GiaBan = txtPrice.Value;
            string GiaKhuyenMai = txtPriceAfterSaleOff.Value;
            if (txtPriceAfterSaleOff.Value == "")
                GiaKhuyenMai = GiaBan;
            string NgoaiTe = txtCurrency.Value;
            string ThongTin1 = txtExcerpt.Value;
            string ThongTin2 = fckProductDesc.Value;
            string Anh = Convert.ToString(Session["FileImageName"]);
            int ProducerID = Convert.ToInt32(ddlProducer.SelectedValue);
            string Keyword = txtKeyword.Value;
            bool IsNew = cbIsNew.Checked;
            bool IsHot = cbIsHot.Checked;
            bool IsBestSeller = cbIsBestSeller.Checked;

            if (Action == "Edit")
                obj.UpdateProduct(ProductID, ddlLanguage.SelectedValue, GroupID, MaSanPham, TenGoi, NgoaiTe, GiaBan, GiaKhuyenMai, ThongTin1, ThongTin2, Anh, ProducerID, Keyword, IsNew, IsHot, IsBestSeller);
            else
                obj.InsertProduct(Globals.AgentCatID, ddlLanguage.SelectedValue, GroupID, MaSanPham, TenGoi, NgoaiTe, GiaBan, GiaKhuyenMai, ThongTin1, ThongTin2, Anh, ProducerID, Keyword, IsNew, IsHot, IsBestSeller);
        }
        catch { }
    }
    
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "Product/ProductList.aspx");
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "Product/ProductAddEdit.aspx");
    }
    private void Reset()
    {
        txtCurrency.Value = "";
        txtExcerpt.Value = "";
        txtKeyword.Value = "";
        txtPrice.Value = "";
        txtPriceAfterSaleOff.Value = "";
        txtProductCode.Value = "";
        txtProductName.Value = "";
        ddlCatalog.SelectedItem.Value = "-1";
        //ImageProduct.Src = Globals.GetAdminImagesUrl() + "noimage.gif";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
    
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int ProductID = Globals.GetIntFromQueryString("ProductID");
            Product obj = new Product();
            String imageFileName = obj.GetImageUrlByProductID(ProductID);
            Globals.DeleteFile(imageFileName);            
            //Xóa SP
            obj.DeleteProduct(ProductID);
            Response.Redirect("ProductList.aspx");
        }
        catch { }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        CommonDropDownList objCatDDL = new CommonDropDownList();
        objCatDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "--- Vui lòng chọn ---");
    }
}
