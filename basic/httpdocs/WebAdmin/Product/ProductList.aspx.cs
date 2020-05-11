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

public partial class WebAdmin_Product_ProductList : System.Web.UI.Page
{
    private string Lang;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            Lang = ddlLanguage.SelectedValue;
            CommonDropDownList objDDL = new CommonDropDownList();
            objDDL.LoadDropDownListCatalog(ddlCatalog, Lang, "--- Tất cả ---");
            LoadAllProduct(Lang);
        }
    }

    private void LoadAllProduct(string Lang)
    {
        try
        {
            Product obj = new Product();
            Catalog objCat = new Catalog();
            DataSet ds = new DataSet();
            ds = obj.GetAllProduct("ProductCat", Globals.AgentCatID, Lang);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewProduct, ds);
        }
        catch { }
    }
    
    private void LoadGridViewProduct(string Lang, int CatID)
    {
        try
        {
            Product obj = new Product();
            Catalog objCat = new Catalog();
            DataSet ds = new DataSet();
            if (CatID != -1)
            {
                string StringCatID = objCat.GetStringCatalogIDByParentCatID(CatID, Globals.AgentCatID, Lang);
                //ds = obj.SearchProduct("ProductCat", Globals.AgentCatID, Lang, StringCatID, CatID, "Default");
                ds = obj.GetProductByStringCatalogID("ProductCat", Lang, StringCatID);
                //MessageBox.Show(StringCatID);
            }
            else //all
                ds = obj.GetAllProduct("ProductCat", Globals.AgentCatID, Lang);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewProduct, ds);
        }
        catch { }
    }
    protected void gridViewProduct_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        try
        {
            if (e.Row.RowType == DataControlRowType.Header || e.Row.RowType == DataControlRowType.Footer || e.Row.RowType == DataControlRowType.Pager)
                return;
            else if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton btnEdit = e.Row.Cells[7].Controls[0] as ImageButton;
                ImageButton btnDelete = e.Row.Cells[8].Controls[0] as ImageButton;
                btnEdit.ToolTip = "Chỉnh sửa sản phẩm này";
                btnDelete.ToolTip = "Xóa sản phẩm này";
                btnDelete.OnClientClick = "if (confirm('Bạn có chắc là muốn xóa sản phẩm này không?') == false) return false;";
            }
        }
        catch { }
    }
    protected void gridViewProduct_RowEditing(object sender, GridViewEditEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewProduct.Rows[e.NewEditIndex];
            String CatID = ((Label)row.Cells[6].FindControl("lblCatID")).Text;
            String ProductID = ((Label)row.Cells[0].FindControl("lblProductID")).Text;
            Response.Redirect("ProductAddEdit.aspx?Action=Edit&ProductID=" + ProductID + "&CatID=" + CatID + "&Lang=" + ddlLanguage.SelectedValue);
        }
        catch { }
    }
    protected void gridViewProduct_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gridViewProduct.PageIndex = e.NewPageIndex;
        LoadGridViewProduct(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCatalog.SelectedValue));
    }
    protected void gridViewProduct_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            GridViewRow row = gridViewProduct.Rows[e.RowIndex];
            int ProductID = Convert.ToInt32(((Label)row.Cells[0].FindControl("lblProductID")).Text);
            Product obj = new Product();
            String imageFileName = obj.GetImageUrlByProductID(ProductID);
            Globals.DeleteFile(imageFileName, "ImageFiles/Products");
            //Xóa color + size + width của SP
            //obj.DeleteColorByProductID(ProductID);
            //obj.DeleteSizeByProductID(ProductID);
            //obj.DeleteWidthByProductID(ProductID);
            //Xóa SP
            obj.DeleteProduct(ProductID);
            LoadGridViewProduct(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCatalog.SelectedValue));
        }
        catch { }
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        CommonDropDownList objDDL = new CommonDropDownList();
        objDDL.LoadDropDownListCatalog(ddlCatalog, ddlLanguage.SelectedValue, "--- Tất cả ---");
        LoadGridViewProduct(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCatalog.SelectedValue));
    }
    protected void ddlCatalog_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadGridViewProduct(ddlLanguage.SelectedValue, Convert.ToInt32(ddlCatalog.SelectedValue));
    }
}
