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
    public class AgentCat
    {
        public AgentCat()
        { }

        /// <summary>
        /// Lấy tất cả công ty
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ParentID">126</param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetAllAgentCat(string DatasetName, int ParentID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, FooterWebsite" + Lang + ", Visitors, ParentID, FacultyID, IsHot, CreationDate ";
                Sql += "FROM AgentCat WHERE ParentID='" + ParentID + "' ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy top công ty
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="ParentID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetTopAgentCat(string DatasetName, int nTop, int ParentID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " ID, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, FooterWebsite" + Lang + ", Visitors, ParentID, FacultyID, IsHot, CreationDate ";
                Sql += "FROM AgentCat WHERE ParentID='" + ParentID + "' ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy DS Cty theo ngành
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="FacultyID"></param>
        /// <param name="ParentID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetAgentCatByFacultyID(string DatasetName, int FacultyID, int ParentID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, FooterWebsite" + Lang + ", Visitors, ParentID, FacultyID, IsHot, CreationDate ";
                Sql += "FROM AgentCat WHERE ParentID='" + ParentID + "' AND FacultyID = '" + FacultyID + "' ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy thông tin chi tiết công ty
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="ParentID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetAgentCatByAgentCatID(string DatasetName, int AgentCatID, int ParentID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 ID, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, FooterWebsite" + Lang + ", Visitors, ParentID, FacultyID, IsHot, CreationDate ";
                Sql += "FROM AgentCat WHERE ParentID='" + ParentID + "' AND ID = '" + AgentCatID + "' ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy logo cty
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public string GetLogo(int AgentCatID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Logo FROM AgentCat WHERE ID = '" + AgentCatID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public string GetWebsite(int AgentCatID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT Website FROM AgentCat WHERE ID = '" + AgentCatID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        /// <summary>
        /// Lấy path thư mục Upload trên host
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public string GetUploadHost(int AgentCatID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT UploadHost FROM AgentCat WHERE ID = '" + AgentCatID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        /// <summary>
        /// Lấy tên cty
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public string GetAgentName(int AgentCatID, string Lang)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT AgentName" + Lang + " FROM AgentCat WHERE ID = '" + AgentCatID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        /// <summary>
        /// Xóa công ty
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <returns></returns>
        public int DeleteAgentCat(int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM AgentCat WHERE ID=@AgentCatID";
                kq = ca.ExcuteSql(Sql, "@AgentCatID", SqlDbType.Int, AgentCatID);
            }
            catch { }
            return kq;
        }
        /// <summary>
        /// Thêm công ty
        /// </summary>
        /// <param name="Lang"></param>
        /// <param name="AgentCode"></param>
        /// <param name="AgentName"></param>
        /// <param name="ContactName"></param>
        /// <param name="Address"></param>
        /// <param name="ProvinceID"></param>
        /// <param name="Tel"></param>
        /// <param name="Fax"></param>
        /// <param name="Email"></param>
        /// <param name="Yahoo"></param>
        /// <param name="Skype"></param>
        /// <param name="Website"></param>
        /// <param name="Logo"></param>
        /// <param name="ParentID"></param>
        /// <param name="FacultyID"></param>
        /// <param name="IsHot"></param>
        /// <returns></returns>
        public int InsertAgentCat(string Lang, string AgentCode, string AgentName, string ContactName, string Address, int ProvinceID, string Tel, string Fax,
                                   string Email, string Yahoo, string Skype, string Website, string Logo, int ParentID, int FacultyID, bool IsHot, string Keyword, string AgentNameHidden)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO AgentCat (Lang, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, ParentID, FacultyID, IsHot) ";
                Sql += "VALUES (@Lang, @AgentCode, @AgentName, @ContactName, @Address, @ProvinceID, @Tel, @Fax, @Email, @Yahoo, @Skype, @Website, @Logo, @ParentID, @FacultyID, @IsHot, @Keyword, @AgentNameHidden)";

                string[] strParaName = new string[18] { "@Lang", "@AgentCode", "@AgentName", "@ContactName", "@Address", "@ProvinceID", "@Tel", "@Fax", "@Email", "@Yahoo", "@Skype", "@Website", "@Logo", "@ParentID", "@FacultyID", "@IsHot", "@Keyword", "@AgentNameHidden" };
                SqlDbType[] sqlDbType = new SqlDbType[18] { SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.Bit, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[18] { Lang, AgentCode, AgentName, ContactName, Address, ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, ParentID, FacultyID, IsHot, Keyword, AgentNameHidden };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateAgentCat(int AgentCatID, string Lang, string AgentCode, string AgentName, string ContactName, string Address, int ProvinceID, string Tel, string Fax,
                                   string Email, string Yahoo, string Skype, string Website, string Logo, int ParentID, int FacultyID, bool IsHot, string Keyword, string AgentNameHidden)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE AgentCat SET AgentCode=@AgentCode, AgentName" + Lang + "=@AgentName, ContactName=@ContactName, Address" + Lang + "=@Address, ProvinceID=@ProvinceID, ";
                Sql += "Tel=@Tel, Fax=@Fax, Email=@Email, Yahoo=@Yahoo, Skype=@Skype, Website=@Website, Logo=@Logo, ParentID=@ParentID, FacultyID=@FacultyID, IsHot=@IsHot, Keyword=@Keyword, AgentNameHidden=@AgentNameHidden ";
                Sql += "WHERE ID=@AgentCatID";

                string[] strParaName = new string[19] { "@AgentCatID", "@Lang", "@AgentCode", "@AgentName", "@ContactName", "@Address", "@ProvinceID", "@Tel", "@Fax", "@Email", "@Yahoo", "@Skype", "@Website", "@Logo", "@ParentID", "@FacultyID", "@IsHot", "@Keyword", "@AgentNameHidden" };
                SqlDbType[] sqlDbType = new SqlDbType[19] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.Bit, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[19] { AgentCatID, Lang, AgentCode, AgentName, ContactName, Address, ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, ParentID, FacultyID, IsHot, Keyword, AgentNameHidden };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public DataSet SearchAgentCat(string DatasetName, int ParentID, string Lang, string Name, bool IsAddress, int FacultyID, int ProvinceID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, FooterWebsite" + Lang + ", Visitors, ParentID, FacultyID, IsHot, CreationDate ";
                Sql += "FROM AgentCat WHERE ParentID='" + ParentID + "' ";
                Sql += "AND (AgentName" + Lang + " LIKE N'%" + Name + "%' OR AgentNameHidden LIKE N'%" + Name + "%') ";
                if (IsAddress)
                    Sql += "OR (Address" + Lang + " LIKE N'%" + Name + "%' OR Keyword LIKE N'%" + Name + "%') ";
                if (FacultyID != 0)
                    Sql += "AND FacultyID = '" + FacultyID + "' ";
                if (ProvinceID != 0)
                    Sql += "AND ProvinceID = '" + ProvinceID + "' ";
                Sql += "ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy top cty nổi bật (HOT)
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="ParentID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetTopHotAgentCat(string DatasetName, int nTop, int ParentID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " ID, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, FooterWebsite" + Lang + ", Visitors, ParentID, FacultyID, IsHot, CreationDate ";
                Sql += "FROM AgentCat WHERE ParentID='" + ParentID + "' AND IsHot=1 AND [Order] is not null ORDER BY [Order] ASC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public string GetSQLSearchAgentCat(string DatasetName, int ParentID, string Lang, string Name, bool IsAddress, int FacultyID, int ProvinceID)
        {
            string Sql = "SELECT ID, AgentCode, AgentName" + Lang + ", ContactName, Address" + Lang + ", ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, FooterWebsite" + Lang + ", Visitors, ParentID, FacultyID, IsHot, CreationDate ";
            Sql += "FROM AgentCat WHERE ParentID='" + ParentID + "' ";
            Sql += "AND AgentName" + Lang + " LIKE N'%" + Name + "%' OR AgentNameHidden LIKE N'%" + Name + "%' ";
            if (IsAddress)
                Sql += "OR Address" + Lang + " LIKE N'%" + Name + "%' OR Keyword LIKE N'%" + Name + "%' ";
            if (FacultyID != 0)
                Sql += "AND FacultyID = '" + FacultyID + "' ";
            if (ProvinceID != 0)
                Sql += "AND ProvinceID = '" + ProvinceID + "' ";
            Sql += "ORDER By CreationDate DESC";
            return Sql;
        }

        /// <summary>
        /// update
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <param name="AgentNameHidden">ten cty tieng viet khong dau</param>
        /// <param name="Keyword">dia chi cty tieng viet ko dau</param>
        /// <returns></returns>
        public int UpdateInfo(int AgentCatID, string AgentNameHidden, string Keyword)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE AgentCat SET AgentNameHidden=@AgentNameHidden, Keyword=@Keyword WHERE ID=@AgentCatID";
                string[] strParaName = new string[3] { "@AgentNameHidden", "@Keyword", "@AgentCatID" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[3] { AgentNameHidden, Keyword, AgentCatID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }
        public DataSet GetAllAgentCat2(string DatasetName, int ParentID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * FROM AgentCat WHERE ParentID='" + ParentID + "' ORDER By CreationDate DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
    }
}
