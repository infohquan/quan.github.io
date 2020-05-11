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
    public class Faculty
    {
        public Faculty()
        { }
        /// <summary>
        /// Lấy DS các ngành
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <param name="OrderType">1:mới nhất, 2:cũ nhất, 3:theo tên(ABC)</param>
        /// <returns></returns>
        public DataSet GetAllFaculty(string DatasetName, int AgentCatID, string Lang, int OrderType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT FacultyID, AgentCatID, FacultyName" + Lang + ", ParentID, CreationDate ";
                Sql += "FROM Faculty WHERE AgentCatID = '" + AgentCatID + "' ";
                if (OrderType == 1)
                    Sql += "ORDER BY CreationDate DESC";
                else if (OrderType == 2)
                    Sql += "ORDER BY CreationDate ASC";
                else if (OrderType == 3)
                    Sql += "ORDER BY FacultyName" + Lang + " ASC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }
        
        /// <summary>
        /// Xóa ngành
        /// </summary>
        /// <param name="FacultyID"></param>
        /// <returns></returns>
        public int DeleteFaculty(int FacultyID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Faculty WHERE FacultyID=@FacultyID";
                kq = ca.ExcuteSql(Sql, "@FacultyID", SqlDbType.Int, FacultyID);
            }
            catch { }
            return kq;
        }

        public int InsertFaculty(string Lang, int AgentCatID, string FacultyName, int ParentID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Faculty (AgentCatID, FacultyName" + Lang + ", ParentID) ";
                Sql += "VALUES (@AgentCatID, @FacultyName, @ParentID)";

                string[] strParaName = new string[3] { "@AgentCatID", "@FacultyName", "@ParentID" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[3] { AgentCatID, FacultyName, ParentID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateFaculty(int FacultyID, string Lang, int AgentCatID, string FacultyName, int ParentID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Faculty SET FacultyName" + Lang + "=@FacultyName, ParentID=@ParentID ";
                Sql += "WHERE FacultyID=@FacultyID";

                string[] strParaName = new string[4] { "@FacultyID", "@AgentCatID", "@FacultyName", "@ParentID" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[4] { FacultyID, AgentCatID, FacultyName, ParentID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public string GetFacultyName(int FacultyID, string Lang)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT FacultyName" + Lang + " FROM Faculty WHERE FacultyID = '" + FacultyID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
    }
}
