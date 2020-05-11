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
    public class EGroup
    {
        public EGroup()
        { }

        /// <summary>
        /// Lấy tất cả doanh nhân
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ParentAgentCatID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetAllEGroup(string DatasetName, int ParentAgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, GroupName" + Lang + ", ImageURL, Marks, BirthDay, ParentAgentCatID ";
                Sql += "FROM EGroup WHERE ParentAgentCatID='" + ParentAgentCatID + "' ORDER By Marks DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Xóa nhóm diễn đàn thảo luận
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int DeleteEGroup(int ID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM EGroup WHERE ID=@ID";
                kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
            }
            catch { }
            return kq;
        }
        
        public int InsertEGroup(string Lang, string GroupName, string ImageURL, int ParentAgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO EGroup (GroupName" + Lang + ", ImageURL, ParentAgentCatID) ";
                Sql += "VALUES (@GroupName, @ImageURL, @ParentAgentCatID)";

                string[] strParaName = new string[3] { "@GroupName", "@ImageURL", "@ParentAgentCatID" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.Int };
                object[] objValue = new object[3] { GroupName, ImageURL, ParentAgentCatID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateEGroup(int ID, string Lang, string GroupName, string ImageURL, DateTime BirthDay)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE EGroup SET GroupName" + Lang + "=@GroupName, ImageURL=@ImageURL, BirthDay=@BirthDay ";
                Sql += "WHERE ID=@ID";

                string[] strParaName = new string[4] { "@ID", "@GroupName", "@ImageURL", "BirthDay" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.DateTime };
                object[] objValue = new object[4] { ID, GroupName, ImageURL, BirthDay };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public string GetGroupNameByUsername(string Username, string Lang)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT GroupName" + Lang + " FROM EGroup as eg, Entrepreneur as e ";
                Sql += "WHERE eg.ID = e.GroupID AND e.Username = '" + Username + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public string GetImageURLByGroupID(int GroupID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ImageURL FROM EGroup WHERE ID = '" + GroupID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public string GetGroupNameByGroupID(int GroupID, string Lang)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT GroupName" + Lang + " FROM EGroup WHERE ID = '" + GroupID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        /// <summary>
        /// Lấy ngày sinh nhật của nhóm
        /// </summary>
        /// <param name="GroupID"></param>
        /// <returns></returns>
        public DateTime GetBirthDay(int GroupID)
        {
            DateTime dt = DateTime.Now;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT BirthDay FROM EGroup WHERE ID = '" + GroupID + "'";
                dt = Convert.ToDateTime(ca.ExecuteScalar(Sql));
            }
            catch { }
            return dt;
        }

        
    }
}
