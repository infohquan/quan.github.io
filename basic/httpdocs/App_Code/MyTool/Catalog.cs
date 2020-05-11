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
    /// Nhóm danh mục Sản phẩm Class
    /// </summary>
    public class Catalog
    {
        public Catalog() { }

        /// <summary>
        /// Thêm danh mục sản phẩm
        /// </summary>
        /// <param name="Lang"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="MaNhom"></param>
        /// <param name="TenNhom"></param>
        /// <param name="STT"></param>
        /// <param name="Anh_Group"></param>
        /// <param name="ThongTin1_Group"></param>
        /// <param name="ThongTin2_Group"></param>
        /// <param name="ParentCatID"></param>
        /// <returns></returns>
        public int InsertCatalog(string Lang, int AgentCatID, string MaNhom, string TenNhom, int STT, string Anh_Group, string ThongTin1_Group, string ThongTin2_Group, int ParentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO GroupCat (Lang, AgentCatID, MaNhom, TenNhom, ParentCatID, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group) ";
                Sql += "VALUES (@Lang, @AgentCatID, @MaNhom, @TenNhom, @ParentCatID, @STT, @Anh_Group, @ThongTin1_Group, @ThongTin2_Group)";

                string[] strParaName = new string[9] { "@Lang", "@AgentCatID", "@MaNhom", "@TenNhom", "@ParentCatID", "@STT", "@Anh_Group", "@ThongTin1_Group", "@ThongTin2_Group", };
                SqlDbType[] sqlDbType = new SqlDbType[9] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[9] { Lang, AgentCatID, MaNhom, TenNhom, ParentCatID, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }
        /// <summary>
        /// Cập nhật danh mục sản phẩm
        /// </summary>
        /// <param name="CatalogID"></param>
        /// <param name="Lang"></param>
        /// <param name="AgentCatID"></param>
        /// <param name="MaNhom"></param>
        /// <param name="TenNhom"></param>
        /// <param name="STT"></param>
        /// <param name="Anh_Group"></param>
        /// <param name="ThongTin1_Group"></param>
        /// <param name="ThongTin2_Group"></param>
        /// <param name="ParentCatID"></param>
        /// <returns></returns>
        public int UpdateCatalog(int CatalogID, string Lang, int AgentCatID, string MaNhom, string TenNhom, int STT, string Anh_Group, string ThongTin1_Group, string ThongTin2_Group, int ParentCatID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE GroupCat SET Lang=@Lang, MaNhom=@MaNhom, TenNhom=@TenNhom, ParentCatID=@ParentCatID, STT=@STT, Anh_Group=@Anh_Group, ThongTin1_Group=@ThongTin1_Group, ThongTin2_Group=@ThongTin2_Group ";
                Sql += "WHERE ID=@CatalogID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[10] { "@CatalogID", "@AgentCatID", "@Lang", "@MaNhom", "@TenNhom", "@ParentCatID", "@STT", "@Anh_Group", "@ThongTin1_Group", "@ThongTin2_Group", };
                SqlDbType[] sqlDbType = new SqlDbType[10] { SqlDbType.Int, SqlDbType.Int, SqlDbType.VarChar, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
                object[] objValue = new object[10] { CatalogID, AgentCatID, Lang, MaNhom, TenNhom, ParentCatID, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }
        /// <summary>
        /// Xóa danh mục sản phẩm
        /// </summary>
        /// <param name="CatalogID"></param>
        /// <returns></returns>
        public int DeleteCatalog(int CatalogID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM GroupCat WHERE ID=@CatalogID";
                kq = ca.ExcuteSql(Sql, "@CatalogID", SqlDbType.Int, CatalogID);
            }
            catch { }
            return kq;
        }
        //Lấy tất cả DMSP
        public DataSet GetAllCatalog(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, ID_Group, MaNhom, TenNhom, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group, Lang, ParentCatID ";
                Sql += "FROM GroupCat WHERE AgentCatID = '" + AgentCatID + "' AND Lang='" + Lang + "' ORDER BY ID DESC";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        //Lấy thông tin DMSP
        public DataSet GetCatalogByCatalogID(string DatasetName, int CatalogID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, ID_Group, MaNhom, TenNhom, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group, Lang, ParentCatID ";
                Sql += "FROM GroupCat WHERE ID='" + CatalogID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        public string GetCatalogNameByCatalogID(int CatalogID, string Lang)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TenNhom FROM GroupCat WHERE ID = '" + CatalogID + "' AND Lang = '" + Lang + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public string GetCatalogNameByCatalogID(int CatalogID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TenNhom FROM GroupCat WHERE ID = '" + CatalogID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        public DataSet GetTopCatalogByParentCatID(string DatasetName, int AgentCatID, int ParentCatID, int nTop, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT TOP " + nTop + " ID, AgentCatID, ID_Group, MaNhom, TenNhom, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group, Lang, ParentCatID ";
                Sql += "FROM GroupCat WHERE AgentCatID = '" + AgentCatID + "' AND ParentCatID='" + ParentCatID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        //Lấy DMSP theo DM cha
        public DataSet GetCatalogByParentCatID(string DatasetName, int ParentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, ID_Group, MaNhom, TenNhom, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group, Lang, ParentCatID ";
                Sql += "FROM GroupCat WHERE ParentCatID='" + ParentCatID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetCatalogByParentCatID(string DatasetName, int AgentCatID, int ParentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID, AgentCatID, ID_Group, MaNhom, TenNhom, STT, Anh_Group, ThongTin1_Group, ThongTin2_Group, Lang, ParentCatID ";
                Sql += "FROM GroupCat WHERE AgentCatID='" + AgentCatID + "' AND ParentCatID='" + ParentCatID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
        
        public int GetParentCatIDByCatalogID(int CatalogID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ParentCatID FROM GroupCat WHERE ID='" + CatalogID + "'";
                kq = Convert.ToInt32(ca.ExecuteScalar(Sql));
            }
            catch { kq = -1; }
            return kq;
        }

        public int GetRootCatalogID(int AgentCatID, string Lang)
        {
            DataSet dsRoot = GetCatalogByParentCatID("GroupCat", AgentCatID, 0, Lang);
            int kq = Convert.ToInt32(dsRoot.Tables[0].Rows[0]["ID"].ToString());
            return kq;
        }

        public string GetStringCatalogIDByParentCatID(int ParentCatID, int AgentCatID, string Lang)
        {
            string s = "";
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ID FROM GroupCat WHERE AgentCatID='" + AgentCatID + "' AND ParentCatID='" + ParentCatID + "' AND Lang='" + Lang + "'";
                ds = ca.SelectData("GroupCat", Sql);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    s += Convert.ToString(ds.Tables[0].Rows[i]["ID"]);
                    if (i < ds.Tables[0].Rows.Count - 1)
                        s += ",";
                }
                if (s != "")
                    s = ParentCatID + "," + s;
                else if (s == "")
                    s += ParentCatID;
            }
            catch { }
            return s;
        }
    }
}
