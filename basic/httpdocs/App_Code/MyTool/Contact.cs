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
    public class Contact
    {
        public Contact() { }

        public int InsertContact(int AgentCatID, string Fullname, string Address, string Tel, string Email, string Title, string Body)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Contact (AgentCatID, Fullname, Address, Tel, Email, Title, Body) ";
                Sql += "VALUES (@AgentCatID, @Fullname, @Address, @Tel, @Email, @Title, @Body)";

                string[] strParaName = new string[7] { "@AgentCatID", "@Fullname", "@Address", "@Tel", "@Email", "@Title", "@Body" };
                SqlDbType[] sqlDbType = new SqlDbType[7] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[7] { AgentCatID, Fullname, Address, Tel, Email, Title, Body };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int InsertContact(int AgentCatID, string Fullname, string Address, string Tel, string Email, string Title, string Body, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Contact (AgentCatID, Fullname, Address, Tel, Email, Title, Body, ContentType) ";
                Sql += "VALUES (@AgentCatID, @Fullname, @Address, @Tel, @Email, @Title, @Body, @ContentType)";

                string[] strParaName = new string[8] { "@AgentCatID", "@Fullname", "@Address", "@Tel", "@Email", "@Title", "@Body", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[8] { AgentCatID, Fullname, Address, Tel, Email, Title, Body, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int InsertContactProduct(int AgentCatID, string Fullname, string Address, string Tel, string Email, string Title, string Body, int ProductID, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Contact (AgentCatID, Fullname, Address, Tel, Email, Title, Body, ProductID, ContentType) ";
                Sql += "VALUES (@AgentCatID, @Fullname, @Address, @Tel, @Email, @Title, @Body, @ProductID, @ContentType)";

                string[] strParaName = new string[9] { "@AgentCatID", "@Fullname", "@Address", "@Tel", "@Email", "@Title", "@Body", "@ProductID", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[9] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar };
                object[] objValue = new object[9] { AgentCatID, Fullname, Address, Tel, Email, Title, Body, ProductID, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public DataSet GetAllContact(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ContactID, AgentCatID, Fullname, Address, Tel, Email, Title, Body, PostDate ";
                Sql += "FROM Contact WHERE AgentCatID = '" + AgentCatID + "' ORDER BY ContactID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy DS liên hệ (hoặc ý kiến khách hàng thông qua ContentType)
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetAllContact(string DatasetName, int AgentCatID, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ContactID, AgentCatID, Fullname, Address, Tel, Email, Title, Body, PostDate ";
                Sql += "FROM Contact WHERE AgentCatID = '" + AgentCatID + "' AND ContentType = '" + ContentType + "' ORDER BY ContactID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int DeleteContact(int ContactID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Contact WHERE ContactID=@ContactID";
                kq = ca.ExcuteSql(Sql, "@ContactID", SqlDbType.Int, ContactID);
            }
            catch { }
            return kq;
        }

        public DataSet GetContactByContactID(string DatasetName, int ContactID, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ContactID, AgentCatID, Fullname, Address, Tel, Email, Title, Body, PostDate, ProductID ";
                Sql += "FROM Contact WHERE ContactID = '" + ContactID + "' AND AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
    }
}
