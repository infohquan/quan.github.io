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
    public class WebDemo
    {
        public WebDemo()
        { }

        public int InsertWebDemo(int AgentCatID, int GroupID, string SmallImage, string LargeImage, string Intro, string Details, string Link)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO WebDemo (AgentCatID, GroupID, SmallImage, LargeImage, Intro, Details, Link) ";
                Sql += "VALUES (@AgentCatID, @GroupID, @SmallImage, @LargeImage, @Intro, @Details, @Link)";

                string[] strParaName = new string[7] { "@AgentCatID", "@GroupID", "@SmallImage", "@LargeImage", "@Intro", "@Details", "@Link" };
                SqlDbType[] sqlDbType = new SqlDbType[7] { SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[7] { AgentCatID, GroupID, SmallImage, LargeImage, Intro, Details, Link };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateWebDemo(int ID, int AgentCatID, int GroupID, string SmallImage, string LargeImage, string Intro, string Details, string Link)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE WebDemo SET GroupID=@GroupID, SmallImage=@SmallImage, LargeImage=@LargeImage, Intro=@Intro, Details=@Details, Link=@Link ";
                Sql += "WHERE ID=@ID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[8] { "@ID", "AgentCatID", "@GroupID", "@SmallImage", "@LargeImage", "@Intro", "@Details", "@Link" };
                SqlDbType[] sqlDbType = new SqlDbType[8] { SqlDbType.Int, SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.VarChar };
                object[] objValue = new object[8] { ID, AgentCatID, GroupID, SmallImage, LargeImage, Intro, Details, Link };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteWebDemo(int ID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM WebDemo WHERE ID=@ID";
                kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
            }
            catch { }
            return kq;
        }

        public DataSet GetAllWebDemo(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, GroupID, SmallImage, LargeImage, Link, Intro, Details, CreationDate, TotalViews ";
                Sql += "FROM WebDemo WHERE AgentCatID = '" + AgentCatID + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetTopWebDemo(string DatasetName, int AgentCatID, int nTop)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " ID, AgentCatID, GroupID, SmallImage, LargeImage, Link, Intro, Details, CreationDate, TotalViews ";
                Sql += "FROM WebDemo WHERE AgentCatID = '" + AgentCatID + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetWebDemoByID(string DatasetName, int AgentCatID, int ID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, GroupID, SmallImage, LargeImage, Link, Intro, Details, CreationDate, TotalViews ";
                Sql += "FROM WebDemo WHERE AgentCatID = '" + AgentCatID + "' AND ID = '" + ID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetWebDemoByGroupID(string DatasetName, int AgentCatID, int GroupID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, GroupID, SmallImage, LargeImage, Link, Intro, Details, CreationDate, TotalViews ";
                Sql += "FROM WebDemo WHERE AgentCatID = '" + AgentCatID + "' AND GroupID = '" + GroupID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet SearchWebDemo(string DatasetName, int AgentCatID, int GroupID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, GroupID, SmallImage, LargeImage, Link, Intro, Details, CreationDate, TotalViews ";
                Sql += "FROM WebDemo WHERE AgentCatID = '" + AgentCatID + "' ";
                if (GroupID != -1)
                    Sql += "AND GroupID = '" + GroupID + "'";
                Sql += " ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int InsertWebDemoGroup(int AgentCatID, string Name, int ParentID, string Order)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO WebDemoGroup (AgentCatID, Name, ParentID, [Order]) ";
                Sql += "VALUES (@AgentCatID, @Name, @ParentID, @Order)";

                string[] strParaName = new string[4] { "@AgentCatID", "@Name", "@ParentID", "@Order" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar };
                object[] objValue = new object[4] { AgentCatID, Name, ParentID, Order };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateWebDemoGroup(int ID, int AgentCatID, string Name, int ParentID, string Order)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE WebDemoGroup SET Name=@Name, ParentID=@ParentID, [Order]=@Order ";
                Sql += "WHERE ID=@ID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[5] { "@ID", "@AgentCatID", "@Name", "@ParentID", "@Order" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.VarChar };
                object[] objValue = new object[5] { ID, AgentCatID, Name, ParentID, Order };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int DeleteWebDemoGroup(int ID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM WebDemoGroup WHERE ID=@ID";
                kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
            }
            catch { }
            return kq;
        }

        public DataSet GetAllWebDemoGroup(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, ParentID, Name, [Order], CreationDate ";
                Sql += "FROM WebDemoGroup WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetWebDemoGroupByID(string DatasetName, int AgentCatID, int ID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, ParentID, Name, [Order], CreationDate ";
                Sql += "FROM WebDemoGroup WHERE AgentCatID = '" + AgentCatID + "' AND ID = '" + ID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetWebDemoGroupByParentID(string DatasetName, int AgentCatID, int ParentID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, ParentID, Name, [Order], CreationDate ";
                Sql += "FROM WebDemoGroup WHERE AgentCatID = '" + AgentCatID + "' AND ParentID = '" + ParentID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int GetRootID(int AgentCatID)
        {
            DataSet dsRoot = GetWebDemoGroupByParentID("WebDemoGroup", AgentCatID, 0);
            int kq = Convert.ToInt32(dsRoot.Tables[0].Rows[0]["ID"].ToString());
            return kq;
        }

        public string GetWebDemoGroupNameByID(int AgentCatID, int ID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "SELECT Name FROM WebDemoGroup WHERE AgentCatID = '" + AgentCatID + "' AND ID = '" + ID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            //catch { }
            return s;
        }
    }
}
