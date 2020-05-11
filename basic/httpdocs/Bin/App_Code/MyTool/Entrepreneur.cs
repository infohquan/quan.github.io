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
    public class Entrepreneur
    {
        public Entrepreneur()
        { }

        /// <summary>
        /// Lấy tất cả doanh nhân
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ParentAgentCatID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetAllEntrepreneur(string DatasetName, int ParentAgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, Username, FirstName" + Lang + ", LastName" + Lang + ", Position" + Lang + ", BirthDay, ImageURL, GroupID, Sex, ParentAgentCatID, Visitors, CreationDate, LastUpdate ";
                Sql += "FROM Entrepreneur WHERE ParentAgentCatID='" + ParentAgentCatID + "' ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy DS doanh nhân theo chữ cái đầu của tên
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ParentAgentCatID"></param>
        /// <param name="Letter"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetEntrepreneurByLetter(string DatasetName, int ParentAgentCatID, string Letter, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, Username, FirstName" + Lang + ", LastName" + Lang + ", Position" + Lang + ", BirthDay, ImageURL, GroupID, Sex, ParentAgentCatID, Visitors, CreationDate, LastUpdate ";
                Sql += "FROM Entrepreneur WHERE ParentAgentCatID='" + ParentAgentCatID + "' AND SUBSTRING(LastNameVI,1,1) = N'" + Letter + "' ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetEntrepreneurByLastName(string DatasetName, int ParentAgentCatID, string LastName, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, Username, FirstName" + Lang + ", LastName" + Lang + ", Position" + Lang + ", BirthDay, ImageURL, GroupID, Sex, ParentAgentCatID, Visitors, CreationDate, LastUpdate ";
                Sql += "FROM Entrepreneur WHERE ParentAgentCatID='" + ParentAgentCatID + "' AND (LastNameVI LIKE N'%" + LastName + "%' OR LastNameEN LIKE N'%" + LastName + "%') ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy chi tiết doanh nhân theo Username
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ParentAgentCatID"></param>
        /// <param name="Username"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetEntrepreneurByUsername(string DatasetName, int ParentAgentCatID, string Username, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 ID, AgentCatID, Username, FirstName" + Lang + ", LastName" + Lang + ", Position" + Lang + ", BirthDay, ImageURL, GroupID, Sex, ParentAgentCatID, Visitors, CreationDate, LastUpdate ";
                Sql += "FROM Entrepreneur WHERE ParentAgentCatID='" + ParentAgentCatID + "' AND Username = '" + Username + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        
        /// <summary>
        /// Xóa doanh nhân
        /// </summary>
        /// <param name="EntrepreneurID"></param>
        /// <returns></returns>
        public int DeleteEntrepreneur(int EntrepreneurID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Entrepreneur WHERE ID=@ID";
                kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, EntrepreneurID);
            }
            catch { }
            return kq;
        }
        
        public int InsertEntrepreneur(string Lang, int AgentCatID, string FullName, string Position, DateTime BirthDay, int GroupID, int ParentAgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Entrepreneur (Lang, AgentCatID, FullName" + Lang + ", Position" + Lang + ", GroupID, ParentAgentCatID) ";
                Sql += "VALUES (@Lang, @AgentCatID, @FullName, @Position, BirthDay, GroupID, ParentAgentCatID)";

                string[] strParaName = new string[6] { "@AgentCatID", "@FullName", "@Position", "BirthDay", "GroupID", "ParentAgentCatID" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.DateTime, SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[6] { AgentCatID, FullName, Position, BirthDay, GroupID, ParentAgentCatID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateEntrepreneur(int ID, string Lang, string FullName, string Position, DateTime BirthDay, int GroupID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Entrepreneur SET FullName" + Lang + "=@FullName, Position" + Lang + "=@Position, BirthDay=@BirthDay, GroupID=@GroupID ";
                Sql += "WHERE ID=@ID";

                string[] strParaName = new string[5] { "@ID", "@FullName", "@Position", "BirthDay", "GroupID" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.DateTime, SqlDbType.Int };
                object[] objValue = new object[5] { ID, FullName, Position, BirthDay, GroupID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public DataSet SearchEntrepreneur(string DatasetName, int ParentAgentCatID, string Lang, string Name)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, Username, FirstName" + Lang + ", LastName" + Lang + ", Position" + Lang + ", BirthDay, ImageURL, GroupID, Sex, ParentAgentCatID, Visitors, CreationDate, LastUpdate ";
                Sql += "FROM Entrepreneur WHERE ParentAgentCatID='" + ParentAgentCatID + "' ";
                Sql += "AND (FullNameVI LIKE N'%" + Name + "%' OR FullNameEN LIKE N'%" + Name + "%') ";
                Sql += "ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy số lượng bài viết của doanh nhân
        /// </summary>
        /// <param name="EntrepreneurID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public int GetTotalArticlesOfEntrepreneurID(int EntrepreneurID, string Lang)
        {
            int kq = 0;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Count(*) FROM Article WHERE EntrepreneurID = '" + EntrepreneurID + "' AND Lang = '" + Lang + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { kq = 0; }
            return kq;
        }

        /// <summary>
        /// Lấy số lượng doanh nhân trong nhóm
        /// </summary>
        /// <param name="GroupID"></param>
        /// <returns></returns>
        public int GetTotalMembersInGroupID(int GroupID)
        {
            int kq = 0;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Count(*) FROM Entrepreneur WHERE GroupID = '" + GroupID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { kq = 0; }
            return kq;
        }

        /// <summary>
        /// Lấy số lượng bài viết của nhóm thảo luận
        /// </summary>
        /// <param name="GroupID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public int GetTotalArticlesOfGroupID(int EGroupID, string Lang)
        {
            int kq = 0;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Count(*) FROM Article WHERE EGroupID = '" + EGroupID + "' AND Lang = '" + Lang + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { kq = 0; }
            return kq;
        }

        public int UpdateVisitorsByUsername(string Username)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Entrepreneur SET Visitors = Visitors + 1 WHERE Username=@Username";
                kq = ca.ExcuteSql(Sql, "@Username", SqlDbType.NVarChar, Username);
            }
            //catch { }
            return kq;
        }
    }
}
