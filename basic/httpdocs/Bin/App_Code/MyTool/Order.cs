using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Connection;

/// <summary>
/// Lớp lưu trữ đơn đặt hàng
/// </summary>
public class Order
{
    //Vì table Order(lưu đơn đặt hàng) trùng với từ khóa Order của Sql Server nên trong code phải dùng [Order] tránh nhầm lẫn
    public Order() { }
    /// <summary>
    /// Thêm 1 đơn đặt hàng
    /// </summary>
    /// <param name="AgentCatID"></param>
    /// <param name="DeliveryDate"></param>
    /// <param name="CustomerID"></param>
    /// <param name="SumMoney"></param>
    /// <param name="SumMoneyVND"></param>
    /// <param name="InforOrder"></param>
    /// <param name="ConfirmString"></param>
    /// <returns></returns>
    public int InsertOrder(string OrderCode, int AgentCatID, DateTime DeliveryDate, int CustomerID, float SumMoney, float SumMoneyVND, string InforOrder, string ConfirmString)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "INSERT INTO [Order] (OrderCode, AgentCatID, DeliveryDate, CustomerID, SumMoney, SumMoneyVND, InforOrder, ConfirmString) ";
            Sql += "VALUES (@OrderCode, @AgentCatID, @DeliveryDate, @CustomerID, @SumMoney, @SumMoneyVND, @InforOrder, @ConfirmString)";

            string[] strParaName = new string[8] { "@OrderCode", "@AgentCatID", "@DeliveryDate", "@CustomerID", "@SumMoney", "@SumMoneyVND", "@InforOrder", "@ConfirmString" };
            SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.DateTime, SqlDbType.Int, SqlDbType.Float, SqlDbType.Float, SqlDbType.NVarChar, SqlDbType.NVarChar };
            object[] objValue = new object[8] { OrderCode, AgentCatID, DeliveryDate, CustomerID, SumMoney, SumMoneyVND, InforOrder, ConfirmString };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        catch { }
        return kq;
    }
    /// <summary>
    /// Thêm đơn hàng (ko cần đăng ký khách hàng)
    /// </summary>
    /// <param name="OrderCode"></param>
    /// <param name="AgentCatID"></param>
    /// <param name="DeliveryDate"></param>
    /// <param name="SumMoney"></param>
    /// <param name="SumMoneyVND"></param>
    /// <param name="InforOrder"></param>
    /// <param name="ConfirmString"></param>
    /// <returns></returns>
    public int InsertOrderNotCustomer(string OrderCode, int AgentCatID, DateTime DeliveryDate, float SumMoney, float SumMoneyVND, string InforOrder, string ConfirmString)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "INSERT INTO [Order] (OrderCode, AgentCatID, DeliveryDate, SumMoney, SumMoneyVND, InforOrder, ConfirmString) ";
            Sql += "VALUES (@OrderCode, @AgentCatID, @DeliveryDate, @SumMoney, @SumMoneyVND, @InforOrder, @ConfirmString)";

            string[] strParaName = new string[7] { "@OrderCode", "@AgentCatID", "@DeliveryDate", "@SumMoney", "@SumMoneyVND", "@InforOrder", "@ConfirmString" };
            SqlDbType[] sqlDbType = new SqlDbType[7] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.DateTime, SqlDbType.Float, SqlDbType.Float, SqlDbType.NVarChar, SqlDbType.NVarChar };
            object[] objValue = new object[7] { OrderCode, AgentCatID, DeliveryDate, SumMoney, SumMoneyVND, InforOrder, ConfirmString };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        catch { }
        return kq;
    }

    public DataSet GetAllOrder(string DatasetName, int AgentCatID)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT o.ID, OrderCode, o.AgentCatID, o.OrderDate, DeliveryDate, o.CustomerID, SumMoney, SumMoneyVND, InforOrder, ConfirmString, Actived ";
            Sql += "FROM [Order] as o WHERE o.AgentCatID = '" + AgentCatID + "' ";
            Sql += "ORDER BY ID DESC";
            ds = ca.SelectData(DatasetName, Sql);

        }
        catch { }
        return ds;
    }

    public int InsertOrderDetail(int OrderID, int ProductID, string Color, string SizeName, float Price, int Quantity, float ResultMoney, string Currency)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "INSERT INTO OrderDetail (OrderID, ProductID, Color, SizeName, Price, Quantity, ResultMoney, Currency) ";
            Sql += "VALUES (@OrderID, @ProductID, @Color, @SizeName, @Price, @Quantity, @ResultMoney, @Currency)";

            string[] strParaName = new string[8] { "@OrderID", "@ProductID", "@Color", "@SizeName", "@Price", "@Quantity", "@ResultMoney", "@Currency" };
            SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Float, SqlDbType.Int, SqlDbType.Float, SqlDbType.NVarChar };
            object[] objValue = new object[8] { OrderID, ProductID, Color, SizeName, Price, Quantity, ResultMoney, Currency };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        //catch { }
        return kq;
    }


    /// <summary>
    /// Cập nhật Actived cho đơn hàng
    /// </summary>
    /// <param name="OrderCode"></param>
    /// <returns></returns>
    public bool ConfirmOrder(string OrderCode, string ActiveCode)
    {
        bool f = false;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "UPDATE [Order] SET Actived = 'True' WHERE OrderCode = '" + OrderCode + "' AND ConfirmString = '" + ActiveCode + "'";
            ca.ExeSql(Sql);
            f = true;
        }
        catch { }
        return f;
    }

    public int GetLastOrderID()
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID FROM [Order] WHERE ID >= ALL (Select ID From [Order])";
            kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
        }
        catch { }
        return kq;
    }

    public int DeleteOrder(int OrderID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "DELETE FROM [Order] WHERE ID=@OrderID";
            kq = ca.ExcuteSql(Sql, "@OrderID", SqlDbType.Int, OrderID);
        }
        catch { }
        return kq;
    }

    public DataSet GetOrderDetail(string DatasetName, int OrderID)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT od.ID, OrderID, ProductID, p.TenGoi, Color, SizeName, Price, Quantity, ResultMoney, Currency ";
            Sql += "FROM OrderDetail as od, ProductCat as p WHERE od.ProductID = p.ID AND OrderID = '" + OrderID + "'";
            ds = ca.SelectData(DatasetName, Sql);

        }
        catch { }
        return ds;
    }

    public DataSet GetOrderByOrderID(string DatasetName, int AgentCatID, int OrderID)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, OrderCode, o.AgentCatID, DeliveryDate, o.CustomerID, SumMoney, SumMoneyVND, InforOrder, ConfirmString, Actived ";
            Sql += "FROM [Order] as o WHERE ID = '" + OrderID + "' AND o.AgentCatID = '" + AgentCatID + "'";
            ds = ca.SelectData(DatasetName, Sql);

        }
        catch { }
        return ds;
    }

    public DataSet GetOrderByCustomerID(string DatasetName, int AgentCatID, int CustomerID)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, OrderCode, o.AgentCatID, o.OrderDate, DeliveryDate, o.CustomerID, c.CustomerFullName, SumMoney, SumMoneyVND, InforOrder, ConfirmString, Actived ";
            Sql += "FROM [Order] as o, Customer as c WHERE o.CustomerID = c.CustomerID AND o.CustomerID = '" + CustomerID + "' AND o.AgentCatID = '" + AgentCatID + "'";
            ds = ca.SelectData(DatasetName, Sql);

        }
        catch { }
        return ds;
    }

    public int DeleteOrderDetail(int OrderDetailID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "DELETE FROM OrderDetail WHERE ID=@OrderDetailID";
            kq = ca.ExcuteSql(Sql, "@OrderDetailID", SqlDbType.Int, OrderDetailID);
        }
        catch { }
        return kq;
    }

    public string GetOrderCodeByOrderID(int OrderID)
    {
        string s = "";
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT OrderCode FROM [Order] WHERE ID = '" + OrderID + "'";
            s = Convert.ToString(ca.ExecuteScalar(Sql));
        }
        catch { }
        return s;
    }
}
