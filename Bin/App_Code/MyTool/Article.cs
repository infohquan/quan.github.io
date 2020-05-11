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
    /// Summary description for Article
    /// </summary>
    public class Article
    {
        public Article()
        { }
        /// <summary>
        /// Lấy tất cả danh sách bài viết phân theo loại ContentType
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType">news: tin tức, real_estate: sàn giao dịch, apartment: căn hộ chung cư</param>
        /// <returns></returns>
        public DataSet GetAllArticle(string DatasetName, int AgentCatID, string Lang, string ContentType, string OrderBy)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ";
                Sql += "ORDER By ArticleID " + OrderBy;
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetAllArticle(string DatasetName, int AgentCatID, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' ";
                Sql += "ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy DS bài viết nổi bật theo ContentType
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetTopNewsEvent(string DatasetName, int AgentCatID, int nTop, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND AgentCatID = '" + AgentCatID + "' AND ViewIndex='1' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy top DS bài viết theo chuỗi CategoryID
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="StringCategoryID"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetTopArticleByByStringCategoryID(string DatasetName, int nTop, string Lang, string StringCategoryID, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND CategoryID IN (" + StringCategoryID + ") AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy DS bài viết theo CategoryID
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="CategoryID"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetTopArticleByCateID(string DatasetName, int nTop, string Lang, int CategoryID, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND CategoryID = '" + CategoryID + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy top tin theo chuyên mục nhưng bỏ ra tin ArticleID
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="CategoryID"></param>
        /// <param name="ArticleID"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetTopArticleByCateID(string DatasetName, int nTop, string Lang, int CategoryID, int ArticleID, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND ArticleID != '" + ArticleID + "' AND CategoryID = '" + CategoryID + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopArticleByContentType(string DatasetName, int nTop, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy top tin hot theo chuyên mục
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="CategoryID"></param>
        /// <param name="ArticleID"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetTopHotArticleByCateID(string DatasetName, int nTop, string Lang, int CategoryID, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE IsHot=1 AND ContentType='" + ContentType + "' AND CategoryID = '" + CategoryID + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy Top danh sách bài viết HOT theo ContentType
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetTopHotNews(string DatasetName, int AgentCatID, int nTop, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE AgentCatID ='" + AgentCatID + "' AND ContentType='" + ContentType + "' AND IsHot='1' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopNewArticle(string DatasetName, int AgentCatID, int nTop, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE AgentCatID ='" + AgentCatID + "' AND ContentType='" + ContentType + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy Top danh sách bài viết xem nhiều nhất theo ContentType
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="nTop"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetTopViewedMostNews(string DatasetName, int AgentCatID, int nTop, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop.ToString() + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE AgentCatID = '" + AgentCatID + "' AND ContentType='" + ContentType + "' AND Lang='" + Lang + "' ORDER By TotalViews DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy danh sách bài viết đặc biệt
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <param name="SpecType"></param>
        /// <returns></returns>
        public DataSet GetSpecialArticle(string DatasetName, int AgentCatID, string Lang, string SpecType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE AgentCatID = '" + AgentCatID + "' AND SpecType = '" + SpecType + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetFirstSpecialArticle(string DatasetName, int AgentCatID, string Lang, string SpecType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE AgentCatID = '" + AgentCatID + "' AND SpecType = '" + SpecType + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopSpecialArticle(string DatasetName, int AgentCatID, string Lang, int nTop, string SpecType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE AgentCatID = '" + AgentCatID + "' AND SpecType = '" + SpecType + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetArticleByCateID(string DatasetName, int CateID, int ArticleID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex, ContentType ";
                Sql += "FROM Article WHERE CategoryID='" + CateID + "' AND ArticleID != '" + ArticleID + "' AND Lang='" + Lang + "' ORDER By TotalViews DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        /// <summary>
        /// Lấy DS tất cả bài viết theo chuyên mục
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="CateID"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetArticleByCateID(string DatasetName, int CateID, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND CategoryID='" + CateID + "' AND Lang='" + Lang + "' ORDER By TotalViews DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        /// <summary>
        /// Lấy DS tất cả bài viết theo chuyên mục trừ tin có mã ArticleID
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="CateID"></param>
        /// <param name="ArticleID"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetArticleByCateID(string DatasetName, int CateID, int ArticleID, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND ArticleID != '" + ArticleID + "' AND CategoryID = '" + CateID + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetArticleByCateID(string DatasetName, int AgentCatID, int CateID, int ArticleID, string Lang, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE AgentCatID='" + AgentCatID + "' AND ContentType='" + ContentType + "' AND ArticleID != '" + ArticleID + "' AND CategoryID = '" + CateID + "' AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Lấy thông tin chi tiết bài viết
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="ArticleID"></param>
        /// <param name="Lang"></param>
        /// <returns></returns>
        public DataSet GetArticleByArticleID(string DatasetName, int ArticleID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex, IsHot ";
                Sql += "FROM Article WHERE ArticleID='" + ArticleID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public DataSet GetSpecialArticleByArticleID(string DatasetName, int ArticleID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex, IsHot ";
                Sql += "FROM Article WHERE ArticleID='" + ArticleID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        /// <summary>
        /// Cập nhật số người xem tin
        /// </summary>
        /// <param name="ArticleID"></param>
        /// <param name="Lang"></param>
        /// <param name="ContentType"></param>
        public void UpdateTotalViews(int ArticleID, string Lang, string ContentType)
        {
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Article SET TotalViews = TotalViews + 1 ";
                Sql += "WHERE ContentType='" + ContentType + "' AND ArticleID='" + ArticleID + "' AND Lang='" + Lang + "'";
                ca.ExeSql(Sql);
            }
            //catch { }
        }
        /// <summary>
        /// Lấy DS tất cả bài viết theo chuỗi StringCategoryID
        /// </summary>
        /// <param name="DatasetName"></param>
        /// <param name="Lang"></param>
        /// <param name="StringCategoryID"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public DataSet GetArticleByByStringCategoryID(string DatasetName, string Lang, string StringCategoryID, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ArticleID, CategoryID, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                Sql += "FROM Article WHERE ContentType='" + ContentType + "' AND CategoryID IN (" + StringCategoryID + ") AND Lang='" + Lang + "' ORDER By ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);

            }
            //catch { }
            return ds;
        }
        //test
        public string LaySQL(string DatasetName, string Lang, string StringCateID, int CateID)
        {
            MyConnection ca = new MyConnection();
            string Sql = "";
            try
            {
                Sql = "SELECT ArticleID, a.CategoryID, c.CategoryName, Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, ";
                Sql += "Authors, PostDate, LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex ";
                string strFrom = "FROM Article as a, ArticleCategory as c ";
                string strWhere = "WHERE ModuleID='1' AND a.CategoryID = c.CategoryID AND p.Lang='" + Lang + "' ";

                if (CateID != -1)
                {
                    if (StringCateID != "")
                        strWhere += "AND a.CategoryID IN (" + StringCateID + ") ";
                    else if (StringCateID == "")
                        strWhere += "AND a.CategoryID = '" + CateID + "' ";
                }
                Sql += strFrom + strWhere + " ORDER BY PostDate DESC, ArticleID DESC";
            }
            catch { }
            return Sql;
        }

        public int GetFirstArticleID(int AgentCatID, string Lang, string ContentType, string OrderBy)
        {
            int ArticleID = 0;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 ArticleID FROM Article WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "' AND ContentType = '" + ContentType + "' ";
                Sql += "ORDER BY ArticleID " + OrderBy;
                ArticleID = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { }
            return ArticleID;
        }

        /// <summary>
        /// Lấy ImageURL của bài viết
        /// </summary>
        /// <param name="ArticleID"></param>
        /// <returns></returns>
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
        public int DeleteArticle(int ArticleID)
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

        public int DeleteArticle(int ArticleID, int AgentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Article WHERE ArticleID=@ArticleID AND AgentCatID=@AgentCatID";
                string[] strParaName = new string[2] { "@ArticleID", "@AgentCatID" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[2] { ArticleID, AgentCatID };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }
        /// <summary>
        /// Xóa bài viết
        /// </summary>
        /// <param name="ArticleID"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public int DeleteArticle(int ArticleID, int AgentCatID, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Article WHERE ArticleID=@ArticleID AND AgentCatID=@AgentCatID AND ContentType=@ContentType";
                string[] strParaName = new string[3] { "@ArticleID", "@AgentCatID", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar };
                object[] objValue = new object[3] { ArticleID, AgentCatID, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }
        /// <summary>
        /// Thêm bài viết mới
        /// </summary>
        /// <param name="AgentCatID"></param>
        /// <param name="Lang"></param>
        /// <param name="CategoryID"></param>
        /// <param name="Title"></param>
        /// <param name="Excerpt"></param>
        /// <param name="Content"></param>
        /// <param name="ImageURL"></param>
        /// <param name="ImageDesc"></param>
        /// <param name="Authors"></param>
        /// <param name="Keyword"></param>
        /// <param name="ViewIndex"></param>
        /// <param name="IsHot"></param>
        /// <param name="ContentType"></param>
        /// <returns></returns>
        public int InsertArticle(int AgentCatID, string Lang, int CategoryID, string Title, string Excerpt, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword, int ViewIndex, bool IsHot, string ContentType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Article (AgentCatID, Lang, CategoryID, Title, Excerpt, [Content], ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot, ContentType) ";
                Sql += "VALUES (@AgentCatID, @Lang, @CategoryID, @Title, @Excerpt, @Content, @ImageURL, @ImageDesc, @Authors, @Keyword, @ViewIndex, @IsHot, @ContentType)";

                string[] strParaName = new string[13] { "@AgentCatID", "@Lang", "@CategoryID", "@Title", "@Excerpt", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword", "@ViewIndex", "@IsHot", "@ContentType" };
                SqlDbType[] sqlDbType = new SqlDbType[13] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Bit, SqlDbType.VarChar };
                object[] objValue = new object[13] { AgentCatID, Lang, CategoryID, Title, Excerpt, Content, ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot, ContentType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }
        
        public int UpdateArticle(int ArticleID, int CategoryID, string Lang, string Title, string Excerpt, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword, int ViewIndex, bool IsHot)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Article SET Lang=@Lang, CategoryID=@CategoryID, Title=@Title, Excerpt=@Excerpt, [Content]=@Content, ImageURL=@ImageURL, ImageDesc=@ImageDesc, Authors=@Authors, Keyword=@Keyword, ViewIndex=@ViewIndex, IsHot=@IsHot, PostDate=GetDate() ";
                Sql += "WHERE ArticleID=@ArticleID";

                string[] strParaName = new string[12] { "@ArticleID", "@CategoryID", "@Lang", "@Title", "@Excerpt", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword", "@ViewIndex", "@IsHot" };
                SqlDbType[] sqlDbType = new SqlDbType[12] { SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Bit };
                object[] objValue = new object[12] { ArticleID, CategoryID, Lang, Title, Excerpt, Content, ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int InsertSpecialArticle(int AgentCatID, string Lang, string Title, string Excerpt, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword, int ViewIndex, bool IsHot, string SpecType)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Article (AgentCatID, Lang, Title, Excerpt, [Content], ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot, SpecType) ";
                Sql += "VALUES (@AgentCatID, @Lang, @Title, @Excerpt, @Content, @ImageURL, @ImageDesc, @Authors, @Keyword, @ViewIndex, @IsHot, @SpecType)";

                string[] strParaName = new string[12] { "@AgentCatID", "@Lang", "@Title", "@Excerpt", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword", "@ViewIndex", "@IsHot", "@SpecType" };
                SqlDbType[] sqlDbType = new SqlDbType[12] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Bit, SqlDbType.VarChar };
                object[] objValue = new object[12] { AgentCatID, Lang, Title, Excerpt, Content, ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot, SpecType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int InsertSpecialArticle2(int AgentCatID, string Lang, string Title, string Excerpt, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword, int ViewIndex, bool IsHot, string SpecType)
        { 
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Article (AgentCatID, Lang, Title, Excerpt, [Content], ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot, SpecType) ";
                Sql += "VALUES (@AgentCatID, @Lang, @Title, @Excerpt, @Content, @ImageURL, @ImageDesc, @Authors, @Keyword, @ViewIndex, @IsHot, @SpecType)";

                string[] strParaName = new string[12] { "@AgentCatID", "@Lang", "@Title", "@Excerpt", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword", "@ViewIndex", "@IsHot", "@SpecType" };
                SqlDbType[] sqlDbType = new SqlDbType[12] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Bit, SqlDbType.VarChar };
                object[] objValue = new object[12] { AgentCatID, Lang, Title, Excerpt, Content, ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot, SpecType };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateSpecialArticle(int ArticleID, string Lang, string Title, string Excerpt, string Content, string ImageURL, string ImageDesc, string Authors, string Keyword, int ViewIndex, bool IsHot)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Article SET Title=@Title, Excerpt=@Excerpt, [Content]=@Content, ImageURL=@ImageURL, ImageDesc=@ImageDesc, Authors=@Authors, Keyword=@Keyword, ViewIndex=@ViewIndex, IsHot=@IsHot ";
                Sql += "WHERE ArticleID=@ArticleID";

                string[] strParaName = new string[11] { "@ArticleID", "@Lang", "@Title", "@Excerpt", "@Content", "@ImageURL", "@ImageDesc", "@Authors", "@Keyword", "@ViewIndex", "@IsHot" };
                SqlDbType[] sqlDbType = new SqlDbType[11] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Bit };
                object[] objValue = new object[11] { ArticleID, Lang, Title, Excerpt, Content, ImageURL, ImageDesc, Authors, Keyword, ViewIndex, IsHot };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }


        public DataSet SearchArticleByText(string DatasetName, int AgentCatID, string Lang, string strSearch, string ContentType)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ArticleID, a.CategoryID, a.AgentCatID, a.Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, Authors, PostDate, ";
                Sql += "LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex, IsHot, a.ModuleID, a.SpecType, a.ContentType ";
                Sql += "FROM Article as a ";
                Sql += "WHERE a.AgentCatID = '" + AgentCatID + "' AND a.Lang = '" + Lang + "' AND a.ContentType = '" + ContentType + "' ";
                Sql += "AND (Title LIKE N'%" + strSearch + "%' OR Excerpt LIKE N'%" + strSearch + "%' OR [Content] LIKE N'%" + strSearch + "%') ";
                Sql += "ORDER BY ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }

        public DataSet SearchArticleInAllContentType(string DatasetName, int AgentCatID, string Lang, string strSearch)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT ArticleID, a.CategoryID, a.AgentCatID, a.Lang, Title, Excerpt, [Content], ImageURL, ImageWidth, ImageHeight, ImageDesc, Authors, PostDate, ";
                Sql += "LastModificationDate, TotalViews, TotalRates, ArticleMark, Status, UserName, Keyword, ViewIndex, IsHot, a.ModuleID, a.SpecType, a.ContentType ";
                Sql += "FROM Article as a ";
                Sql += "WHERE a.AgentCatID = '" + AgentCatID + "' AND a.Lang = '" + Lang + "' ";
                Sql += "AND (Title LIKE N'%" + strSearch + "%' OR Excerpt LIKE N'%" + strSearch + "%' OR [Content] LIKE N'%" + strSearch + "%') ";
                Sql += "ORDER BY ArticleID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            //catch { }
            return ds;
        }
    }
}
