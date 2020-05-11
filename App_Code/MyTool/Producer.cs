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
    /// Summary description for Producer
    /// </summary>
    public class Producer
    {
        public Producer()
        {}

        public DataSet GetAllProducer(string DatasetName)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProducerID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, ProducerImageURL, ProducerAddDate, ProducerUpdate, Notes ";
                Sql += "FROM Producer ORDER BY ProducerUpdate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public DataSet GetAllProducer(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProducerID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, ProducerImageURL, ProducerAddDate, ProducerUpdate, Notes ";
                Sql += "FROM Producer WHERE AgentCatID='" + AgentCatID + "' ORDER BY ProducerUpdate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopProducerHot(string DatasetName, int nTop)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ProducerID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, ProducerImageURL, ProducerAddDate, ProducerUpdate, Notes ";
                Sql += "FROM Producer ORDER BY ProducerUpdate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public string GetProducerNameByProducerID(int ProducerID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProducerName FROM Producer WHERE ProducerID='" + ProducerID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public DataSet GetProducerByProducerID(string DatasetName, int ProducerID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProducerID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, ProducerImageURL, ProducerAddDate, ProducerUpdate, Notes ";
                Sql += "FROM Producer WHERE ProducerID='" + ProducerID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public string GetProducerImageUrlByProducerID(int ProducerID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProducerImageURL FROM Producer WHERE ProducerID='" + ProducerID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public int GetProducerIDByProductID(int ProductID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ProducerID FROM ProductCat WHERE ID='" + ProductID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }

        public int DeleteProducer(int ProducerID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Producer WHERE ProducerID=@ProducerID";
                kq = ca.ExcuteSql(Sql, "@ProducerID", SqlDbType.Int, ProducerID);
            }
            catch { }
            return kq;
        }

        public int InsertProducer(int AgentCatID, string ProducerName, string ProducerAddress, string ContactName, string ContactTel, string ContactEmail, string ProducerImageURL, string Notes)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Producer (AgentCatID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, ProducerImageURL, Notes) ";
                Sql += "VALUES (@AgentCatID, @ProducerName, @ProducerAddress, @ContactName, @ContactTel, @ContactEmail, @ProducerImageURL, @Notes)";

                string[] strParaName = new string[8] { "AgentCatID", "@ProducerName", "@ProducerAddress", "@ContactName", "@ContactTel", "@ContactEmail", "@ProducerImageURL", "@Notes" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[8] { AgentCatID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, ProducerImageURL, Notes };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateProducer(int ProducerID, string ProducerName, string ProducerAddress, string ContactName, string ContactTel, string ContactEmail, string ProducerImageURL, string Notes)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Producer SET ProducerName=@ProducerName, ProducerAddress=@ProducerAddress, ContactName=@ContactName, ContactTel=@ContactTel, ContactEmail=@ContactEmail, ProducerImageURL=@ProducerImageURL, Notes=@Notes ";
                Sql += "WHERE ProducerID=@ProducerID";

                string[] strParaName = new string[8] { "@ProducerID", "@ProducerName", "@ProducerAddress", "@ContactName", "@ContactTel", "@ContactEmail", "@ProducerImageURL", "@Notes" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[8] { ProducerID, ProducerName, ProducerAddress, ContactName, ContactTel, ContactEmail, ProducerImageURL, Notes };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }
    }
}
