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
    public class Gallery
    {
        public Gallery() { }

        public int InsertAlbum(int AgentCatID, string AlbumName, string AlbumDescriptions, int ParentID, string AlbumOrder)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO GalleryAlbum (AgentCatID, AlbumName, AlbumDescriptions, ParentID, AlbumOrder) ";
                Sql += "VALUES (@AgentCatID, @AlbumName, @AlbumDescriptions, @ParentID, @AlbumOrder)";

                string[] strParaName = new string[5] { "@AgentCatID", "@AlbumName", "@AlbumDescriptions", "@ParentID", "@AlbumOrder" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar };
                object[] objValue = new object[5] { AgentCatID, AlbumName, AlbumDescriptions, ParentID, AlbumOrder };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateAlbum(int AlbumID, int AgentCatID, string AlbumName, string AlbumDescriptions, int ParentID, string AlbumOrder)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE GalleryAlbum SET AlbumName=@AlbumName, AlbumDescriptions=@AlbumDescriptions, ParentID=@ParentID, AlbumOrder=@AlbumOrder ";
                Sql += "WHERE ID=@AlbumID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[6] { "@AlbumID", "@AgentCatID", "@AlbumName", "@AlbumDescriptions", "@ParentID", "@AlbumOrder" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar };
                object[] objValue = new object[6] { AlbumID, AgentCatID, AlbumName, AlbumDescriptions, ParentID, AlbumOrder };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteAlbum(int AlbumID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM GalleryAlbum WHERE ID=@AlbumID";
                kq = ca.ExcuteSql(Sql, "@AlbumID", SqlDbType.Int, AlbumID);
            }
            catch { }
            return kq;
        }
        
        public DataSet GetAllAlbum(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, AlbumName, AlbumDescriptions, ParentID, AlbumOrder, CreationDate ";
                Sql += "FROM GalleryAlbum WHERE AgentCatID='" + AgentCatID + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetAlbumByAlbumID(string DatasetName, int AlbumID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, AlbumName, AlbumDescriptions, ParentID, AlbumOrder, CreationDate ";
                Sql += "FROM GalleryAlbum WHERE ID='" + AlbumID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }


        public string GetImageOfAlbumID(int AlbumID)
        {
            string img = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP 1 PhotoUrl FROM GalleryAlbum as a, GalleryPhoto as p WHERE a.ID = p.AlbumID AND a.ID='" + AlbumID + "'";
                img = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { img = ""; }
            return img;
        }


        public int InsertPhoto(int AgentCatID, int AlbumID, string PhotoTitle, string PhotoUrl, string PhotoDescriptions, string PhotoOrder)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO GalleryPhoto (AgentCatID, AlbumID, PhotoTitle, PhotoUrl, PhotoDescriptions, PhotoOrder) ";
                Sql += "VALUES (@AgentCatID, @AlbumID, @PhotoTitle, @PhotoUrl, @PhotoDescriptions, @PhotoOrder)";

                string[] strParaName = new string[6] { "@AgentCatID", "@AlbumID", "@PhotoTitle", "@PhotoUrl", "@PhotoDescriptions", "@PhotoOrder" };
                SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[6] { AgentCatID, AlbumID, PhotoTitle, PhotoUrl, PhotoDescriptions, PhotoOrder };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdatePhoto(int PhotoID, int AgentCatID, int AlbumID, string PhotoTitle, string PhotoUrl, string PhotoDescriptions, string PhotoOrder)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE GalleryAlbum SET AlbumID=@AlbumID, PhotoTitle=@PhotoTitle, PhotoUrl=@PhotoUrl, PhotoDescriptions=@PhotoDescriptions, PhotoOrder=@PhotoOrder ";
                Sql += "WHERE ID=@PhotoID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[7] { "@PhotoID", "@AgentCatID", "@AlbumID", "@PhotoTitle", "@PhotoUrl", "@PhotoDescriptions", "@PhotoOrder" };
                SqlDbType[] sqlDbType = new SqlDbType[7] { SqlDbType.Int, SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[7] { PhotoID, AgentCatID, AlbumID, PhotoTitle, PhotoUrl, PhotoDescriptions, PhotoOrder };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeletePhoto(int PhotoID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM GalleryPhoto WHERE ID=@PhotoID";
                kq = ca.ExcuteSql(Sql, "@PhotoID", SqlDbType.Int, PhotoID);
            }
            catch { }
            return kq;
        }

        public DataSet GetAllPhoto(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, AlbumID, PhotoTitle, PhotoUrl, PhotoDescriptions, PhotoOrder, CreationDate ";
                Sql += "FROM GalleryPhoto WHERE AgentCatID='" + AgentCatID + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetPhotoByAlbumID(string DatasetName, int AgentCatID, int AlbumID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, AlbumID, PhotoTitle, PhotoUrl, PhotoDescriptions, PhotoOrder, CreationDate ";
                Sql += "FROM GalleryPhoto WHERE AgentCatID='" + AgentCatID + "' AND AlbumID = '" + AlbumID + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetPhotoByPhotoID(string DatasetName, int PhotoID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, AlbumID, PhotoTitle, PhotoUrl, PhotoDescriptions, PhotoOrder, CreationDate ";
                Sql += "FROM GalleryPhoto WHERE ID='" + PhotoID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
    }
}