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

public partial class WebAdmin_Product_OrderDetail : System.Web.UI.Page
{
    public bool f;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            LoadGridViewOrderDetail();
            LoadData();
        }
    }

    private void LoadGridViewOrderDetail()
    {
        try
        {
            Order obj = new Order();
            int OrderID = Globals.GetIntFromQueryString("OrderID");
            DataSet ds = obj.GetOrderDetail("OrderDetail", OrderID);
            GridViewHelper gvHelper = new GridViewHelper();
            gvHelper.FillData(gridViewOrderDetail, ds);
        }
        catch { }
    }
    private void LoadData()
    {
        //try
        {
            int OrderID = Globals.GetIntFromQueryString("OrderID");
            Order obj = new Order();
            DataSet dsOrder = obj.GetOrderByOrderID("Order", Globals.AgentCatID, OrderID);
            lblOrderCode.InnerText = Convert.ToString(dsOrder.Tables[0].Rows[0]["OrderCode"]);
            lblSumMoney.InnerText = Convert.ToString(dsOrder.Tables[0].Rows[0]["SumMoney"]) + " USD";
            lblSumMoneyVND.InnerText = Convert.ToString(dsOrder.Tables[0].Rows[0]["SumMoneyVND"]) + " VND";
            //lblSumMoneyVND.InnerText = String.Format("{0:C}", 123456789).Replace("$", "");
            string Actived = Convert.ToString(dsOrder.Tables[0].Rows[0]["Actived"]);
            if (Actived == "True")
                lblActived.InnerHtml = "<b>Khách hàng Đã xác nhận</b>";
            else if (Actived == "False")
                lblActived.InnerHtml = "<b>Khách hàng Chưa xác nhận</b>";

            Customer objCust = new Customer();
            /*int CustomerID = Convert.ToInt32(dsOrder.Tables[0].Rows[0]["CustomerID"].ToString());
            DataSet dsCust = objCust.GetCustomerByCustomerID("Customer", Globals.AgentCatID, CustomerID);
            lblBuyingPersonAddress.InnerText = Convert.ToString(dsCust.Tables[0].Rows[0]["CustomerAddress"]);
            lblBuyingPersonEmail.InnerText = Convert.ToString(dsCust.Tables[0].Rows[0]["CustomerEmail"]);
            lblBuyingPersonMobile.InnerText = Convert.ToString(dsCust.Tables[0].Rows[0]["CustomerMobi"]);
            lblBuyingPersonName.InnerText = Convert.ToString(dsCust.Tables[0].Rows[0]["CustomerFullName"]);
            lblBuyingPersonTel.InnerText = Convert.ToString(dsCust.Tables[0].Rows[0]["CustomerTel"]);
            lblBuyingPersonFax.InnerText = Convert.ToString(dsCust.Tables[0].Rows[0]["CustomerFax"]);
            lblBuyingPersonNotes.InnerText = Convert.ToString(dsOrder.Tables[0].Rows[0]["InforOrder"]);
            rblBuyingPersonGender.SelectedValue = Convert.ToString(dsCust.Tables[0].Rows[0]["CustomerGender"]);
            */
            f = objCust.IsBuyingInfoSameReceivingInfo(OrderID, Globals.AgentCatID);
            if (f == false)
            {
                DataSet dsRecei = objCust.GetReceivingProductAddressByOrderID("ReceivingProductAddress", Globals.AgentCatID, OrderID);
                lblReceivingPersonAddress.InnerText = Convert.ToString(dsRecei.Tables[0].Rows[0]["Address"]);
                lblReceivingPersonEmail.InnerText = Convert.ToString(dsRecei.Tables[0].Rows[0]["Email"]);
                lblReceivingPersonMobile.InnerText = Convert.ToString(dsRecei.Tables[0].Rows[0]["Mobile"]);
                lblReceivingPersonName.InnerText = Convert.ToString(dsRecei.Tables[0].Rows[0]["FullName"]);
                lblReceivingPersonTel.InnerText = Convert.ToString(dsRecei.Tables[0].Rows[0]["Tel"]);
                lblReceivingPersonFax.InnerText = Convert.ToString(dsRecei.Tables[0].Rows[0]["Fax"]);
                rblReceivingPersonGender.SelectedValue = Convert.ToString(dsRecei.Tables[0].Rows[0]["Gender"]);
            }
        }
        //catch { }
    }
    protected void btnDeleteOrder_Click(object sender, EventArgs e)
    {
        try
        {
            int OrderID = Globals.GetIntFromQueryString("OrderID");
            Order obj = new Order();
            DataSet dsOrderDetail = obj.GetOrderDetail("OrderDetail", OrderID);
            for (int i = 0; i < dsOrderDetail.Tables[0].Rows.Count; i++)
            {
                int OrderDetailID = Convert.ToInt32(dsOrderDetail.Tables[0].Rows[i]["ID"].ToString());
                obj.DeleteOrderDetail(OrderDetailID);
            }
            obj.DeleteOrder(OrderID);
            Response.Redirect("ManageOrder.aspx");
        }
        catch { }
    }
}
