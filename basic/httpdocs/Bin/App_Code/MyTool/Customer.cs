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

namespace MyTool
{
    /// <summary>
    /// Khách hàng
    /// </summary>
    public class Customer
    {
        public Customer() { }

        public string GetCustomerUsernameByCustomerID(int CustomerID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerUsername FROM Customer WHERE CustomerID='" + CustomerID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public bool ValidateCustomer(string Username, string Password)
        {
            bool f = false;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerUsername, CustomerPassword FROM Customer WHERE CustomerUsername='" + Username + "' AND CustomerPassword='" + Password + "'";
                DataSet ds = ca.SelectData("Customer", Sql);
                if (ds.Tables[0].Rows.Count > 0)
                    f = true;
            }
            catch { }
            return f;
        }

        public int GetCustomerIDByCustomerUsername(string CustomerUsername)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerID FROM Customer WHERE CustomerUsername='" + CustomerUsername + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }

        public DataSet GetCustomerByCustomerUsername(string DatasetName, int AgentCatID, string CustomerUsername)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerID, CustomerParentID, AgentCatID, CustomerCode, CustomerEmail, CustomerUsername, CustomerPassword, CustomerFullName, CustomerAddress, ";
                Sql += "CustomerIDNumber, CustomerPassport, CustomerDes, CustomerMobi, CustomerTel, CustomerFax, CustomerGender, CustomerUserEmail, CustomerIntroCode, ";
                Sql += "CustomerPercent, CustomerIntroEmail, CustomerAddDate, CustomerUpdate, CustomerContent, IsGetOfferEmail, Stat ";
                Sql += "FROM Customer WHERE CustomerUsername='" + CustomerUsername + "' AND AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }


        #region "Receiving Product Address"
        /// <summary>
        /// Thêm thông tin người nhận hàng (Thông tin này trùng với thông tin khách hàng luôn)
        /// </summary>
        /// <param name="OrderID"></param>
        /// <param name="CustomerID"></param>
        /// <returns></returns>
        public int InsertReceivingProductAddressSameCustomer(int OrderID, Int32 CustomerID)
        {  
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO ReceivingProductAddress (OrderID, CustomerID) ";
                Sql += "VALUES (@OrderID, @CustomerID)";

                string[] strParaName = new String[2] { "@OrderID", "@CustomerID" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new Object[2] { OrderID, CustomerID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        /// <summary>
        /// /// Thêm thông tin người nhận hàng (Thông tin này KHÁC với thông tin khách hàng)
        /// </summary>
        /// <param name="OrderID"></param>
        /// <param name="FullName"></param>
        /// <param name="Gender"></param>
        /// <param name="Address"></param>
        /// <param name="Email"></param>
        /// <param name="Tel"></param>
        /// <param name="Mobile"></param>
        /// <param name="Fax"></param>
        /// <param name="Notes"></param>
        /// <returns></returns>
        public int InsertReceivingProductAddressNOTSameCustomer(int AgentCatID, int OrderID, string FullName, int Gender, string Address, string Email, string Tel, string Mobile, string Fax, string Notes)
        { 
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO ReceivingProductAddress (AgentCatID, OrderID, FullName, Gender, Address, Email, Tel, Mobile, Fax, Notes) ";
                Sql += "VALUES (@AgentCatID, @OrderID, @FullName, @Gender, @Address, @Email, @Tel, @Mobile, @Fax, @Notes)";

                string[] strParaName = new String[10] { "@AgentCatID", "@OrderID", "@FullName", "@Gender", "@Address", "@Email", "@Tel", "@Mobile", "@Fax", "@Notes" };
                SqlDbType[] sqlDbType = new SqlDbType[10] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new Object[10] { AgentCatID, OrderID, FullName, Gender, Address, Email, Tel, Mobile, Fax, Notes };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }
        /// <summary>
        /// Kiểm tra thông tin Người mua và Người nhận hàng có Giống nhau không
        /// </summary>
        /// <param name="OrderID"></param>
        /// <param name="AgentCatID"></param>
        /// <returns>true:Giống nhau, false:Khác nhau</returns>
        public bool IsBuyingInfoSameReceivingInfo(int OrderID, int AgentCatID)
        {
            bool f = false;
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerID ";
                Sql += "FROM ReceivingProductAddress WHERE CustomerID IS NOT NULL AND OrderID='" + OrderID + "' AND AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData("ReceivingProductAddress", Sql);
                if (ds.Tables[0].Rows.Count > 0) //Tồn tại CustomerID khác NULL --> Thông tin Người mua và Người nhận GIỐNG nhau
                    f = true;
            }
            catch { }
            return f;
        }
        public DataSet GetReceivingProductAddressByOrderID(string DatasetName, int AgentCatID, int OrderID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT OrderID, CustomerID, FullName, Gender, Address, Email, Tel, Mobile, Fax, Notes ";
                Sql += "FROM ReceivingProductAddress WHERE OrderID='" + OrderID + "' AND AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }
        #endregion

        public string GetCustomerFullNameByCustomerUsername(string CustomerUsername)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerFullName FROM Customer WHERE CustomerUsername='" + CustomerUsername + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public string GetCustomerLogoByCustomerID(int CustomerID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerLogo FROM Customer WHERE CustomerID='" + CustomerID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public DataSet GetCustomerByCustomerID(string DatasetName, int AgentCatID, int CustomerID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM Customer WHERE CustomerID='" + CustomerID + "' AND AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetAllCustomer(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM Customer WHERE AgentCatID = '" + AgentCatID + "' ORDER BY CustomerID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public int InsertCustomer(int AgentCatID, string CustomerEmail, string CustomerUsername, string CustomerPassword, string CustomerFullName, string CustomerAddress, string CustomerMobi, string CustomerTel, string CustomerFax, int CustomerGender, bool IsGetOfferEmail, string CustomerLogo, string CustomerWebsite)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Customer (AgentCatID, CustomerEmail, CustomerUsername, CustomerPassword, CustomerFullName, CustomerAddress, CustomerMobi, CustomerTel, CustomerFax, CustomerGender, IsGetOfferEmail, CustomerLogo, CustomerWebsite) ";
                Sql += "VALUES (@AgentCatID, @CustomerEmail, @CustomerUsername, @CustomerPassword, @CustomerFullName, @CustomerAddress, @CustomerMobi, @CustomerTel, @CustomerFax, @CustomerGender, @IsGetOfferEmail, @CustomerLogo, @CustomerWebsite)";

                string[] strParaName = new String[13] { "@AgentCatID", "@CustomerEmail", "@CustomerUsername", "@CustomerPassword", "@CustomerFullName", "@CustomerAddress", "@CustomerMobi", "@CustomerTel", "@CustomerFax", "@CustomerGender", "@IsGetOfferEmail", "@CustomerLogo", "@CustomerWebsite" };
                SqlDbType[] sqlDbType = new SqlDbType[13] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new Object[13] { AgentCatID, CustomerEmail, CustomerUsername, CustomerPassword, CustomerFullName, CustomerAddress, CustomerMobi, CustomerTel, CustomerFax, CustomerGender, IsGetOfferEmail, CustomerLogo, CustomerWebsite };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public bool IsExistCustomer(string Username)
        {
            DataSet dsUser = new DataSet();
            bool f = false;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerUsername FROM Customer WHERE CustomerUsername='" + Username + "'";
                dsUser = ca.SelectData("Customer", Sql);
                if (dsUser.Tables[0].Rows.Count > 0)
                    f = true;
            }
            catch { }
            return f;
        }

        public int UpdateCustomer(int AgentCatID, string CustomerEmail, string CustomerUsername, string CustomerFullName, string CustomerAddress, string CustomerMobi, string CustomerTel, string CustomerFax, int CustomerGender, bool IsGetOfferEmail)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE Customer SET AgentCatID=@AgentCatID, CustomerEmail=@CustomerEmail, CustomerFullName=@CustomerFullName, CustomerAddress=@CustomerAddress, CustomerMobi=@CustomerMobi, CustomerTel=@CustomerTel, CustomerFax=@CustomerFax, CustomerGender=@CustomerGender, IsGetOfferEmail=@IsGetOfferEmail ";
                Sql += "WHERE CustomerUsername=@CustomerUsername";
                string[] strParaName = new String[10] { "@AgentCatID", "@CustomerEmail", "@CustomerUsername", "@CustomerFullName", "@CustomerAddress", "@CustomerMobi", "@CustomerTel", "@CustomerFax", "@CustomerGender", "@IsGetOfferEmail" };
                SqlDbType[] sqlDbType = new SqlDbType[10] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.Bit, SqlDbType.Bit };
                object[] objValue = new Object[10] { AgentCatID, CustomerEmail, CustomerUsername, CustomerFullName, CustomerAddress, CustomerMobi, CustomerTel, CustomerFax, CustomerGender, IsGetOfferEmail };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateCustomer(int CustomerID, string CustomerEmail, string CustomerFullName, string CustomerAddress, string CustomerMobi, string CustomerTel, string CustomerFax, int CustomerGender, bool IsGetOfferEmail, string CustomerLogo, string CustomerWebsite)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE Customer SET CustomerEmail=@CustomerEmail, CustomerFullName=@CustomerFullName, CustomerAddress=@CustomerAddress, CustomerMobi=@CustomerMobi, CustomerTel=@CustomerTel, CustomerFax=@CustomerFax, CustomerGender=@CustomerGender, IsGetOfferEmail=@IsGetOfferEmail, CustomerLogo=@CustomerLogo, CustomerWebsite=@CustomerWebsite ";
                Sql += "WHERE CustomerID=@CustomerID";
                string[] strParaName = new String[11] { "@CustomerID", "@CustomerEmail", "@CustomerFullName", "@CustomerAddress", "@CustomerMobi", "@CustomerTel", "@CustomerFax", "@CustomerGender", "@IsGetOfferEmail", "@CustomerLogo", "@CustomerWebsite" };
                SqlDbType[] sqlDbType = new SqlDbType[11] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.Bit, SqlDbType.Bit, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new Object[11] { CustomerID, CustomerEmail, CustomerFullName, CustomerAddress, CustomerMobi, CustomerTel, CustomerFax, CustomerGender, IsGetOfferEmail, CustomerLogo, CustomerWebsite };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public string GetCustomerPasswordByCustomerUsername(string Username)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CustomerPassword FROM Customer WHERE CustomerUsername='" + Username + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public int ChangePassword(string Username, string NewPassword)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE Customer SET CustomerPassword=@CustomerPassword WHERE CustomerUsername=@CustomerUsername";
                string[] strParaName = new String[2] { "@CustomerPassword", "@CustomerUsername" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new Object[2] { NewPassword, Username };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int DeleteCustomer(int CustomerID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Customer WHERE CustomerID=@CustomerID";
                kq = ca.ExcuteSql(Sql, "@CustomerID", SqlDbType.Int, CustomerID);
            }
            catch { }
            return kq;
        }
    }
}
