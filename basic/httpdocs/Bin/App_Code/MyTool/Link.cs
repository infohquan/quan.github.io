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
    /// Summary description for Link
    /// </summary>
    public class Link
    {
        public Link()
        { }

        public DataSet GetAllLink(string DatasetName)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, Logo, Link, LinkName, LinkAddDate, LinkUpdate ";
                Sql += "FROM AgentLink ORDER BY LinkUpdate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public DataSet GetAllLink(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, Logo, Link, LinkName, LinkAddDate, LinkUpdate ";
                Sql += "FROM AgentLink WHERE AgentCatID='" + AgentCatID + "' ORDER BY LinkUpdate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public DataSet GetAllLink(string DatasetName, int AgentCatID, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM AgentLink WHERE AgentCatID='" + AgentCatID + "' AND ContentType = '" + ContentType + "' ORDER BY LinkUpdate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetLinkByLinkID(string DatasetName, int LinkID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM AgentLink WHERE ID='" + LinkID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy DS quảng cáo theo vị trí
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Position">"left":Banner cột trái, "right":Banner cột phải</param>
        /// <returns></returns>
        public DataSet GetLinkByPosition(string DatasetName, int AgentCatID, string Position, string t)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM AgentLink WHERE AgentCatID='" + AgentCatID + "' AND Position='" + Position + "' AND ContentType = '" + t + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public string GetLinkImageUrlByLinkID(int LinkID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Logo FROM AgentLink WHERE ID='" + LinkID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public int DeleteLink(int LinkID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM AgentLink WHERE ID=@LinkID";
                kq = ca.ExcuteSql(Sql, "@LinkID", SqlDbType.Int, LinkID);
            }
            catch { }
            return kq;
        }

        public int InsertLink(int AgentCatID, string Logo, string LogoType, int Width, int Height, string Link, string LinkName, string Target, string Position, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO AgentLink (AgentCatID, Logo, LogoType, Width, Height, Link, LinkName, Target, Position, ContentType) ";
                Sql += "VALUES (@AgentCatID, @Logo, @LogoType, @Width, @Height, @Link, @LinkName, @Target, @Position, @ContentType)";

                string[] strParaName = new string[10] { "@AgentCatID", "@Logo", "@LogoType", "@Width", "@Height", "@Link", "@LinkName", "@Target", "@Position", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[10] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[10] { AgentCatID, Logo, LogoType, Width, Height, Link, LinkName, Target, Position, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateLink(int LinkID, int AgentCatID, string Logo, string LogoType, int Width, int Height, string Link, string LinkName, string Target, string Position, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE AgentLink SET Logo=@Logo, LogoType=@LogoType, Width=@Width, Height=@Height, Link=@Link, LinkName=@LinkName, Target=@Target, Position=@Position, ContentType=@ContentType ";
                Sql += "WHERE ID=@LinkID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[11] { "@LinkID", "@AgentCatID", "@Logo", "@LogoType", "@Width", "@Height", "@Link", "@LinkName", "@Target", "@Position", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[11] { SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar };
                object[] objValue = new object[11] { LinkID, AgentCatID, Logo, LogoType, Width, Height, Link, LinkName, Target, Position, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }
    }
}
