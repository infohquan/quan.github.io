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
    /// Summary description for ArticleCategory
    /// </summary>
    public class ArticleCategory
    {
        public ArticleCategory() { }
        
        public int InsertCategory(string Lang, int AgentCatID, string CategoryName, int CategoryOrder, int ParentCategoryID, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO ArticleCategory (Lang, AgentCatID, CategoryName, CategoryOrder, ParentCategoryID, ContentType) ";
                Sql += "VALUES (@Lang, @AgentCatID, @CategoryName, @CategoryOrder, @ParentCategoryID, @ContentType)";

                string[] strParaName = new string[6] { "@Lang", "@AgentCatID", "@CategoryName", "@CategoryOrder", "@ParentCategoryID", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar };
                object[] objValue = new object[6] { Lang, AgentCatID, CategoryName, CategoryOrder, ParentCategoryID, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;  
        }        
        
        public int UpdateCategory(int CategoryID, string Lang, int AgentCatID, string CategoryName, int CategoryOrder, int ParentCategoryID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE ArticleCategory SET Lang=@Lang, CategoryName=@CategoryName, CategoryOrder=@CategoryOrder, ParentCategoryID=@ParentCategoryID ";
                Sql += "WHERE CategoryID=@CategoryID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[6] { "@CategoryID", "@Lang", "@AgentCatID", "@CategoryName", "@CategoryOrder", "@ParentCategoryID" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[6] { CategoryID, Lang, AgentCatID, CategoryName, CategoryOrder, ParentCategoryID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;   
        }
        
        public int DeleteCategory(int CategoryID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM ArticleCategory WHERE CategoryID=@CategoryID";
                kq = ca.ExcuteSql(Sql, "@CategoryID", SqlDbType.Int, CategoryID);
            }
            catch { }
            return kq;
        }

        public DataSet GetAllCategoryNotRoot(string DatasetName, int AgentCatID, string Lang, string ContentType)
        {
            //int RootID = GetRootCategoryID(AgentCatID, Lang, ContentType);
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID, Lang, CategoryName, CategoryOrder, ParentCategoryID, CategoryAddDate, CategoryUpdate ";
                Sql += "FROM ArticleCategory WHERE ContentType='" + ContentType + "' AND AgentCatID = '" + AgentCatID + "' AND ParentCategoryID !='0' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetCategoryByCategoryID(string DatasetName, int CategoryID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID, Lang, CategoryName, CategoryOrder, ParentCategoryID, CategoryAddDate, CategoryUpdate ";
                Sql += "FROM ArticleCategory WHERE CategoryID='" + CategoryID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetCategoryByParentCategoryID(string DatasetName, int AgentCatID, int ParentCategoryID, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID, Lang, CategoryName, CategoryOrder, ParentCategoryID, CategoryAddDate, CategoryUpdate ";
                Sql += "FROM ArticleCategory WHERE ContentType='" + ContentType + "' AND AgentCatID = '" + AgentCatID + "' AND ParentCategoryID='" + ParentCategoryID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopCategoryByParentCategoryID(string DatasetName, int AgentCatID, int nTop, int ParentCategoryID, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " CategoryID, Lang, CategoryName, CategoryOrder, ParentCategoryID, CategoryAddDate, CategoryUpdate ";
                Sql += "FROM ArticleCategory WHERE ContentType='" + ContentType + "' AND AgentCatID = '" + AgentCatID + "' AND ParentCategoryID='" + ParentCategoryID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int GetParentCategoryIDByCategoryID(int CategoryID, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ParentCategoryID FROM ArticleCategory WHERE ContentType='" + ContentType + "' AND CategoryID='" + CategoryID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { kq = -1; }
            return kq;
        }

        public int GetRootCategoryID(int AgentCatID, string Lang, string ContentType)
        {
            DataSet dsRoot = GetCategoryByParentCategoryID("ArticleCategory", AgentCatID, 0, Lang, ContentType);
            int kq = Convert.ToInt32(dsRoot.Tables[0].Rows[0]["CategoryID"].ToString());
            return kq;
        }

        public string GetCategoryNameByCategoryID(int CateID, string Lang, string ContentType)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryName FROM ArticleCategory WHERE ContentType='" + ContentType + "' AND CategoryID='" + CateID + "' AND Lang = '" + Lang + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        /// <summary>
        /// Lấy tên chuyên mục tin tức (Chuẩn)
        /// </summary>
        /// <param name="CateID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public string GetCategoryNameByCategoryID(int CateID, string Lang)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryName FROM ArticleCategory WHERE CategoryID='" + CateID + "' AND Lang = '" + Lang + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public string GetStringCategoryIDByParentCateID(int ParentCateID, int AgentCatID, string Lang, string ContentType)
        {
            string s = "";
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID FROM ArticleCategory WHERE ContentType = '" + ContentType + "' AND AgentCatID='" + AgentCatID + "' AND ParentCategoryID='" + ParentCateID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData("ArticleCategory", Sql);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    s += Convert.ToString(ds.Tables[0].Rows[i]["CategoryID"]);
                    if (i < ds.Tables[0].Rows.Count - 1)
                        s += ",";
                }
                if (s != "")
                    s = ParentCateID + "," + s;
                else if (s == "")
                    s += ParentCateID;
            }
            catch { }
            return s;
        }
    }
}
