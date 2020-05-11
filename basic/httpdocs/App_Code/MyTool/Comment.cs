using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Connection;

namespace MyTool
{
    public class Comment
    {
        public int InsertComment(int AgentCatID, int ProductID, int ArticleID, int CustomerID, string FullName, string Email, string Title, string Comment)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Comment (AgentCatID, ProductID, ArticleID, CustomerID, FullName, Email, Title, Comment) ";
                Sql += "VALUES (@AgentCatID, @ProductID, @ArticleID, @CustomerID, @FullName, @Email, @Title, @Comment)";

                string[] strParaName = new string[8] { "@AgentCatID", "@ProductID", "@ArticleID", "@CustomerID", "@FullName", "@Email", "@Title", "@Comment" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.Int, SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[8] { AgentCatID, ProductID, ArticleID, CustomerID, FullName, Email, Title, Comment };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int DeleteComment(int CommentID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Comment WHERE CommentID=@CommentID";
                kq = ca.ExcuteSql(Sql, "@CommentID", SqlDbType.Int, CommentID);
            }
            catch { }
            return kq;
        }

        public DataSet GetAllComment(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT CommentID, AgentCatID, ProductID, ArticleID, CustomerID, FullName, Email, Title, Comment, DatePost, IsApproved ";
                Sql += "FROM Comment WHERE AgentCatID = '" + AgentCatID + "' ORDER By CommentID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
    }
}
