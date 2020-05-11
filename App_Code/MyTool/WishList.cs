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
    public class WishList
    {
        public WishList() { }

        public DataSet GetWishListByCustomerUsername(string DatasetName, string CustomerUsername)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT WishListID, ProductID, SizeID, SizeName, Notes ";
                Sql += "FROM WishList WHERE CustomerUsername='" + CustomerUsername + "' ORDER BY WishListID ASC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public int DeleteWishList(string CustomerUsername, int ProductID, int SizeID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM WishList WHERE CustomerUsername=@CustomerUsername AND ProductID=@ProductID AND SizeID=@SizeID";
                string[] strParaName = new string[3] { "@CustomerUsername", "@ProductID", "@SizeID" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[3] { CustomerUsername, ProductID, SizeID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int InsertWishList(string CustomerUsername, int ProductID, int SizeID, string SizeName)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO WishList (CustomerUsername, ProductID, SizeID, SizeName) ";
                Sql += "VALUES (@CustomerUsername, @ProductID, @SizeID, @SizeName)";

                string[] strParaName = new string[4] { "@CustomerUsername", "@ProductID", "@SizeID", "@SizeName" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar };
                object[] objValue = new object[4] { CustomerUsername, ProductID, SizeID, SizeName };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }
    }
}
