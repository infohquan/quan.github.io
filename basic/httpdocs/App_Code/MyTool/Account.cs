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
    /// Account class
    /// </summary>
    public class Account
    {
        public Account() { }

        public DataSet GetAllUser(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, FullName, Username, Password, Tel, Address, Email, Info, DateCreated, IDGroup, BirthDay, Gender, Active, RandomKey, LoginNumber, DisableDate, Expiration ";
                Sql += "FROM UserCat WHERE AgentCatID = '" + AgentCatID + "' ORDER By DateCreated DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        
        public DataSet GetUserByUsername(string DatasetName, string Username, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ID, AgentCatID, FullName, Username, Password, Tel, Address, Email, Info, DateCreated, IDGroup, BirthDay, Gender, Active, RandomKey, LoginNumber, DisableDate, Expiration ";
                Sql += "FROM UserCat WHERE AgentCatID = '" + AgentCatID + " ' AND Username = '" + Username + "' ORDER By DateCreated DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        /// <summary>
        /// Check username login
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="Password"></param>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public bool ValidateUser(string Username, string Password, int AgentCatID)
        {
            bool IsValid = false;
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT Username, Password FROM UserCat WHERE AgentCatID=@AgentCatID AND Username=@Username AND Password=@Password";
                string[] strParaName = new string[3] { "@AgentCatID", "@Username", "@Password" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[3] { AgentCatID, Username, Password };
                ds = ca.SelectData("UserCat", Sql, strParaName, sqlDbType, objValue);
                if (ds.Tables[0].Rows.Count > 0) //có Username này rùi!
                    IsValid = true;
            }
            //catch { IsValid = false; }
            return IsValid;
        }

        public bool IsUserExistent(string Username, int AgentCatID)
        {
            bool IsExistent = false;
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                ds = GetUserByUsername("UserCat", Username, AgentCatID);
                if (ds.Tables[0].Rows.Count > 0) //có Username này rùi!
                    IsExistent = true;
            }
            catch { }
            return IsExistent;
        }
        


        public DataSet GetAllUser(string DatasetName)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, FullName, Username, Password, Tel, Address, Email, Info, DateCreated, IDGroup, BirthDay, Gender, Active, RandomKey, LoginNumber, DisableDate, Expiration ";
                Sql += "FROM UserCat ORDER By DateCreated DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetUserByUsername(string DatasetName, string Username)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, FullName, Username, Password, Tel, Address, Email, Info, DateCreated, IDGroup, BirthDay, Gender, Active, RandomKey, LoginNumber, DisableDate, Expiration ";
                Sql += "FROM UserCat WHERE Username = '" + Username + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public bool ValidateUser(string Username, string Password)
        {
            bool IsValid = false;
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Username, Password FROM UserCat WHERE Username=@Username AND Password=@Password";
                string[] strParaName = new string[2] { "@Username", "@Password" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[2] { Username, Password };
                ds = ca.SelectData("UserCat", Sql);
                if (ds.Tables[0].Rows.Count > 0) //có Username này rùi!
                    IsValid = true;
            }
            catch { IsValid = false; }
            return IsValid;
        }

        public bool IsUserExistent(string Username)
        {
            bool IsExistent = false;
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Username FROM UserCat WHERE Username='" + Username + "'";
                ds = ca.SelectData("UserCat", Sql);
                if (ds.Tables[0].Rows.Count > 0) //có Username này rùi!
                    IsExistent = true;
            }
            catch { }
            return IsExistent;
        }

        public int DeleteUser(string Username, int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM UserCat WHERE Username=@Username AND AgentCatID=@AgentCatID";
                string[] strParaName = new string[2] { "@Username", "@AgentCatID" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.VarChar, SqlDbType.Int };
                object[] objValue = new object[2] { Username, AgentCatID };

                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int InsertUser(int AgentCatID, string Username, string Password, string FullName, string Address, string Email, string Tel, string Info, string BirthDay, int Gender)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO UserCat (AgentCatID, Username, Password, FullName, Address, Email, Tel, Info, BirthDay, Gender) ";
                Sql += "VALUES (@AgentCatID, @Username, @Password, @FullName, @Address, @Email, @Tel, @Info, @BirthDay, @Gender)";
                string[] strParaName = new string[10] { "@AgentCatID", "@Username", "@Password", "@FullName", "@Address", "@Email", "@Tel", "@Info", "@BirthDay", "@Gender" };
                SqlDbType[] sqlDbType = new SqlDbType[10] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.DateTime, SqlDbType.Int };
                object[] objValue = new object[10];
                if (BirthDay != "")
                    objValue = new object[10] { AgentCatID, Username, Password, FullName, Address, Email, Tel, Info, BirthDay, Gender };
                else if (BirthDay == "")
                    objValue = new object[10] { AgentCatID, Username, Password, FullName, Address, Email, Tel, Info, DBNull.Value, Gender };

                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateUser(int AgentCatID, string Username, string FullName, string Address, string Email, string Tel, string Info, string BirthDay, int Gender)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE UserCat SET FullName=@FullName, Address=@Address, Email=@Email, Tel=@Tel, Info=@Info, Gender=@Gender, BirthDay=@BirthDay ";
                Sql += "WHERE AgentCatID=@AgentCatID AND Username=@Username";
                string[] strParaName = new string[9] { "@AgentCatID", "@Username", "@FullName", "@Address", "@Email", "@Tel", "@Info", "@BirthDay", "@Gender" };
                SqlDbType[] sqlDbType = new SqlDbType[9] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.DateTime, SqlDbType.Int };
                object[] objValue = new object[9] ;
                if (BirthDay != "")
                    objValue = new object[9] { AgentCatID, Username, FullName, Address, Email, Tel, Info, BirthDay, Gender };
                else if (BirthDay == "")
                    objValue = new object[9] { AgentCatID, Username, FullName, Address, Email, Tel, Info, DBNull.Value, Gender };

                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int ChangePassword(string Username, string newPassword, int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE UserCat SET Password=@Password WHERE AgentCatID=@AgentCatID AND Username=@Username";
                string[] strParaName = new string[3] { "@AgentCatID", "@Username", "@Password" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[3] { AgentCatID, Username, newPassword };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }
    }
}
