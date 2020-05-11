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
    public class AboutUs
    {
        public AboutUs() { }

        public int InsertAboutUsCategory(string Lang, int AgentCatID, string CategoryName, int CategoryOrder, int ParentCategoryID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            int ModuleID = 2; //Giới thiệu
            //try
            {
                string Sql = "INSERT INTO ArticleCategory (Lang, AgentCatID, CategoryName, CategoryOrder, ParentCategoryID, ModuleID) ";
                Sql += "VALUES (@Lang, @AgentCatID, @CategoryName, @CategoryOrder, @ParentCategoryID, @ModuleID)";

                string[] strParaName = new string[6] { "@Lang", "@AgentCatID", "@CategoryName", "@CategoryOrder", "@ParentCategoryID", "@ModuleID" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[6] { Lang, AgentCatID, CategoryName, CategoryOrder, ParentCategoryID, ModuleID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateAboutUsCategory(int AgentCatID, int CategoryID, string Lang, string CategoryName, int CategoryOrder)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE ArticleCategory SET Lang=@Lang, CategoryName=@CategoryName, CategoryOrder=@CategoryOrder ";
                Sql += "WHERE CategoryID=@CategoryID AND AgentCatID=@AgentCatID AND ModuleID='2'";

                string[] strParaName = new string[5] { "@AgentCatID", "@CategoryID", "@Lang", "@CategoryName", "@CategoryOrder" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[5] { AgentCatID, CategoryID, Lang, CategoryName, CategoryOrder };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public bool DeleteAboutUsCategory(int CategoryID)
        {
            bool result = false;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM ArticleCategory WHERE CategoryID='" + CategoryID + "'";
                ca.ExeSql(Sql);
                result = true;
            }
            catch { result = false; }
            return result;
        }

        /// <summary>
        /// Lấy thông tin chuyên mục Giới thiệu
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="CategoryID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetCategoryByCategoryID(string DatasetName, int CategoryID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID, Lang, CategoryName, CategoryOrder, ParentCategoryID, CategoryAddDate, CategoryUpdate, ModuleID ";
                Sql += "FROM ArticleCategory WHERE ModuleID='2' AND CategoryID='" + CategoryID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        
        public DataSet GetCategoryByParentCategoryID(string DatasetName, int ParentCategoryID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID, Lang, CategoryName, CategoryOrder, ParentCategoryID, CategoryAddDate, CategoryUpdate, ModuleID ";
                Sql += "FROM ArticleCategory WHERE ModuleID='2' AND ParentCategoryID='" + ParentCategoryID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetCategoryByParentCategoryID(string DatasetName, int AgentCatID, int ParentCategoryID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID, Lang, CategoryName, CategoryOrder, ParentCategoryID, CategoryAddDate, CategoryUpdate, ModuleID ";
                Sql += "FROM ArticleCategory WHERE ModuleID='2' AND AgentCatID = '" + AgentCatID + "' AND ParentCategoryID='" + ParentCategoryID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int GetParentCategoryIDByCategoryID(int CategoryID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ParentCategoryID FROM ArticleCategory WHERE ModuleID='2' AND CategoryID='" + CategoryID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { kq = -1; }
            return kq;
        }

        public int GetRootCategoryID(int AgentCatID, string Lang)
        {
            DataSet dsRoot = GetCategoryByParentCategoryID("ArticleCategory", AgentCatID, 0, Lang);
            int kq = Convert.ToInt32(dsRoot.Tables[0].Rows[0]["CategoryID"].ToString());
            return kq;
        }

        public string GetCategoryNameByCategoryID(int CateID, string Lang)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryName FROM ArticleCategory WHERE ModuleID='2' AND CategoryID='" + CateID + "' AND Lang = '" + Lang + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public DataSet GetAboutUsByCateID(string DatasetName, int CateID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ModuleID='2' AND CategoryID = '" + CateID + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int GetFirstAboutUsID(int AgentCatID, string Lang)
        {
            int ID = 0; 
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 ArticleID FROM Article WHERE ModuleID='2' AND AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ORDER BY ArticleID ASC";
                ID = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return ID;
        }

        public DataSet GetAboutUsByArticleID(string DatasetName, int ArticleID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ModuleID='2' AND ArticleID = '" + ArticleID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public void UpdateTotalViews(int ArticleID, string Lang)
        {
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Article SET TotalViews = TotalViews + 1 ";
                Sql += "WHERE ModuleID='2' AND ArticleID='" + ArticleID + "' AND Lang='" + Lang + "'";
                ca.ExeSql(Sql);
            }
            //catch { }
        }

        public DataSet GetAllAboutUs(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ModuleID='2' AND AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ORDER By ArticleID ASC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetOtherAboutUs(string DatasetName, int AgentCatID, int ArticleID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ModuleID='2' AND AgentCatID = '" + AgentCatID + "' AND ArticleID != '" + ArticleID + "' AND Lang = '" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public string GetImageURLByArticleID(int ArticleID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ImageURL FROM Article WHERE ArticleID = '" + ArticleID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        //ko cần mã chuyên mục Giới thiệu
        public int InsertArticleAboutUs(int AgentCatID, string Lang, string Title, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                int ModuleID = 2; //Giới thiệu
                string Sql = "INSERT INTO Article (AgentCatID, Lang, Title, [Content], ImageURL, ImageDesc, Authors, Keyword, ModuleID) ";
                Sql += "VALUES (@AgentCatID, @Lang, @Title, @Content, @ImageURL, @ImageDesc, @Authors, @Keyword, @ModuleID)";

                string[] strParaName = new string[9] { "@AgentCatID", "@Lang", "@Title", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword", "@ModuleID" };
                SqlDbType[] sqlDbType = new SqlDbType[9] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[9] { AgentCatID, Lang, Title, Content, ImageURL, ImageDesc, Authors, Keyword, ModuleID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int InsertArticleAboutUs(string Lang, int CategoryID, string Title, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                int ModuleID = 2; //Giới thiệu
                string Sql = "INSERT INTO Article (Lang, CategoryID, Title, [Content], ImageURL, ImageDesc, Authors, Keyword, ModuleID) ";
                Sql += "VALUES (@Lang, @CategoryID, @Title, @Content, @ImageURL, @ImageDesc, @Authors, @Keyword, @ModuleID)";

                string[] strParaName = new string[9] { "@Lang", "@CategoryID", "@Title", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword", "@ModuleID" };
                SqlDbType[] sqlDbType = new SqlDbType[9] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int };
                object[] objValue = new object[9] { Lang, CategoryID, Title, Content, ImageURL, ImageDesc, Authors, Keyword, ModuleID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateArticleAboutUs(int ArticleID, string Lang, string Title, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Article SET Title=@Title, [Content]=@Content, ImageURL=@ImageURL, ImageDesc=@ImageDesc, Authors=@Authors, Keyword=@Keyword ";
                Sql += "WHERE ArticleID=@ArticleID AND Lang=@Lang";

                string[] strParaName = new string[8] { "@ArticleID", "@Lang", "@Title", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[8] { ArticleID, Lang, Title, Content, ImageURL, ImageDesc, Authors, Keyword };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteArticleAboutUs(int ArticleID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Article WHERE ArticleID=@ArticleID";
                kq = ca.ExcuteSql(Sql, "@ArticleID", SqlDbType.Int, ArticleID);
            }
            catch { }
            return kq;
        }

        public int GetLastAboutUsCategoryID(int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID FROM ArticleCategory WHERE AgentCatID = '" + AgentCatID + "' AND ModuleID='2' AND ";
                Sql += "CategoryID >= ALL (Select CategoryID From ArticleCategory WHERE AgentCatID = '" + AgentCatID + "' AND ModuleID='2')";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }

        public int GetCategoryIDByArticleID(int ArticleID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CategoryID FROM ArticleCategory WHERE ArticleID = '" + ArticleID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return kq;
        }
    }
}
