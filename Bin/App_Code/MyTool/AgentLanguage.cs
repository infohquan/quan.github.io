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
    public class AgentLanguage
    {
        public AgentLanguage()
        { }

        
        public DataSet GetLanguageByAgentCatID(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, LanguageID, LanguageCode, LanguageName, LanguageOrder ";
                Sql += "FROM AgentLanguage WHERE AgentCatID='" + AgentCatID + "' ORDER By LanguageOrder ASC, ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        
        public int DeleteAgentLanguage(int AgentLanguageID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM AgentLanguage WHERE ID=@AgentLanguageID";
                kq = ca.ExcuteSql(Sql, "@AgentLanguageID", SqlDbType.Int, AgentLanguageID);
            }
            catch { }
            return kq;
        }

        public int DeleteAgentLanguageByAgentCatID(int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM AgentLanguage WHERE AgentCatID=@AgentCatID";
                kq = ca.ExcuteSql(Sql, "@AgentCatID", SqlDbType.Int, AgentCatID);
            }
            catch { }
            return kq;
        }
        
        public int InsertAgentLanguage(int AgentCatID, string LanguageCode, string LanguageName, int LanguageOrder)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO AgentLanguage (AgentCatID, LanguageCode, LanguageName, LanguageOrder) ";
                Sql += "VALUES (@AgentCatID, @LanguageCode, @LanguageName, @LanguageOrder)";

                string[] strParaName = new string[4] { "@AgentCatID", "@LanguageCode", "@LanguageName", "@LanguageOrder" };
                //SqlDbType[] sqlDbType = new SqlDbType[18] { SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.Bit, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[4] { AgentCatID, LanguageCode, LanguageName, LanguageOrder };
                kq = ca.ExcuteSql(Sql, strParaName, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateAgentLanguage(int ID, string LanguageCode, string LanguageName, int LanguageOrder)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE AgentLanguage SET LanguageCode=@LanguageCode, LanguageName=@LanguageName, LanguageOrder=@LanguageOrder WHERE ID=@ID";

                string[] strParaName = new string[4] { "@ID", "@LanguageCode", "@LanguageName", "@LanguageOrder" };
                object[] objValue = new object[4] { ID, LanguageCode, LanguageName, LanguageOrder  };
                kq = ca.ExcuteSql(Sql, strParaName, objValue);
            }
            //catch { }
            return kq;
        }
    }
}
