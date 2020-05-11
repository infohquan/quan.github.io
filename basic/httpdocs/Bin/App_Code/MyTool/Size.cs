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
    /// Size class: kích thước và màu sắc của sản phẩm (phân loại theo danh mục SP)
    /// </summary>
    public class Size
    {
        public Size()
        {}

        public DataSet GetAllSize(string DatasetName, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT SizeID, AgentCatID, SizeName, ParentGroupCatID_EN, ParentGroupCatID_VI ";
                Sql += "FROM Size WHERE AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetSizeBySizeID(string DatasetName, int SizeID, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT SizeID, AgentCatID, SizeName, ParentGroupCatID_EN, ParentGroupCatID_VI ";
                Sql += "FROM Size WHERE SizeID = '" + SizeID + "' AND AgentCatID = '" + AgentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);

            }
            catch { }
            return ds;
        }

        public DataSet GetListSizeByParentCatID(string DatasetName, int ParentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT SizeID, SizeName, ChildSizeTypeID, ParentGroupCatID_" + Lang + ", ChildSizeTypeName_" + Lang + " ";
                Sql += "FROM Size WHERE ParentGroupCatID_" + Lang + "='" + ParentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetListSizeByParentCatID(string DatasetName, int AgentCatID, int ParentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT * ";
                Sql += "FROM Size WHERE AgentCatID = '" + AgentCatID + "' AND ParentGroupCatID_" + Lang + "='" + ParentCatID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetListSizeByChildSizeTypeID(string DatasetName, int ChildSizeTypeID, string Lang)
        { 
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT SizeID, SizeName, ChildSizeTypeID, ParentGroupCatID_" + Lang + ", ChildSizeTypeName_" + Lang + " ";
                Sql += "FROM Size WHERE ChildSizeTypeID='" + ChildSizeTypeID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;

        }
        public string GetChildTypeSizeName(string Lang, int ParentCatID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ChildSizeTypeName_" + Lang + " FROM Size WHERE ParentCatID='" + ParentCatID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }
        public DataSet GetListColor(string DatasetName, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ColorID, ColorName FROM Color WHERE Lang='" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetListSizeByProductID(string DatasetName, int ProductID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT s.SizeID, SizeName FROM Size as s, ProductCat as p, Product_Size as ps ";
                Sql += "WHERE ps.SizeID = s.SizeID AND ps.ProductID = p.ID AND p.ID = '" + ProductID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetAllListWidth(string DatasetName, string Lang)
        { 
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT WidthID, Lang, WidthName FROM Width ";
                Sql += "WHERE Lang = '" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public DataSet GetAllListWidth(string DatasetName, int AgentCatID, string Lang)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT WidthID, Lang, WidthName FROM Width ";
                Sql += "WHERE AgentCatID = '" + AgentCatID + "' AND Lang = '" + Lang + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public string GetSizeNameBySizeID(int SizeID)
        {
            string s = "";
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT SizeName FROM Size WHERE SizeID = '" + SizeID + "'";
                s = Convert.ToString(ca.ExecuteScalar(Sql));
            }
            catch { }
            return s;
        }

        public DataSet GetListWidthByProductID(string DatasetName, int ProductID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT w.WidthID, WidthName FROM Width as w, ProductCat as p, Product_Width as pw ";
                Sql += "WHERE pw.WidthID = w.WidthID AND pw.ProductID = p.ID AND p.ID = '" + ProductID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int DeleteSize(int SizeID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Size WHERE SizeID=@SizeID";
                kq = ca.ExcuteSql(Sql, "@SizeID", SqlDbType.Int, SizeID);
            }
            catch { }
            return kq;
        }

        public int InsertSize(int AgentCatID, string SizeName, int ParentGroupCatID_EN, int ParentGroupCatID_VI)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "INSERT INTO Size (AgentCatID, SizeName, ParentGroupCatID_EN, ParentGroupCatID_VI) ";
                Sql += "VALUES (@AgentCatID, @SizeName, @ParentGroupCatID_EN, @ParentGroupCatID_VI)";

                string[] strParaName = new string[4] { "@AgentCatID", "@SizeName", "@ParentGroupCatID_EN", "@ParentGroupCatID_VI" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[4] { AgentCatID, SizeName, ParentGroupCatID_EN, ParentGroupCatID_VI };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public int UpdateSize(int SizeID, int AgentCatID, string SizeName, int ParentGroupCatID_EN, int ParentGroupCatID_VI)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            //try
            {
                string Sql = "UPDATE Size SET SizeName=@SizeName, ParentGroupCatID_EN=@ParentGroupCatID_EN, ParentGroupCatID_VI=@ParentGroupCatID_VI ";
                Sql += "WHERE SizeID=@SizeID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[5] { "@SizeID", "@AgentCatID", "@SizeName", "@ParentGroupCatID_EN", "@ParentGroupCatID_VI" };
                SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.Int, SqlDbType.Int };
                object[] objValue = new object[5] { SizeID, AgentCatID, SizeName, ParentGroupCatID_EN, ParentGroupCatID_VI };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            //catch { }
            return kq;
        }

        public DataSet GetWidthByWidthID(string DatasetName, int WidthID, int AgentCatID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT WidthID, Lang, WidthName FROM Width ";
                Sql += "WHERE AgentCatID = '" + AgentCatID + "' AND WidthID = '" + WidthID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }

        public int DeleteWidth(int WidthID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Width WHERE WidthID=@WidthID";
                kq = ca.ExcuteSql(Sql, "@WidthID", SqlDbType.Int, WidthID);
            }
            catch { }
            return kq;
        }

        public int InsertWidth(int AgentCatID, string Lang, string WidthName)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Width (AgentCatID, Lang, WidthName) ";
                Sql += "VALUES (@AgentCatID, @Lang, @WidthName)";

                string[] strParaName = new string[3] { "@AgentCatID", "@Lang", "@WidthName" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[3] { AgentCatID, Lang, WidthName };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateWidth(int WidthID, int AgentCatID, string Lang, string WidthName)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE Width SET Lang=@Lang, WidthName=@WidthName ";
                Sql += "WHERE WidthID=@WidthID AND AgentCatID=@AgentCatID";

                string[] strParaName = new string[4] { "@WidthID", "@Lang", "@AgentCatID", "@WidthName" };
                SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar };
                object[] objValue = new object[4] { WidthID, Lang, AgentCatID, WidthName };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int InsertColor(string Lang, string ColorName)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "INSERT INTO Color (Lang, ColorName) ";
                Sql += "VALUES (@Lang, @ColorName)";

                string[] strParaName = new string[2] { "@Lang", "@ColorName" };
                SqlDbType[] sqlDbType = new SqlDbType[2] { SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[2] { Lang, ColorName };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int UpdateColor(int ColorID, string Lang, string ColorName)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "UPDATE Color SET Lang=@Lang, ColorName=@ColorName ";
                Sql += "WHERE ColorID=@ColorID";

                string[] strParaName = new string[3] { "@ColorID", "@Lang", "@ColorName" };
                SqlDbType[] sqlDbType = new SqlDbType[3] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar };
                object[] objValue = new object[3] { ColorID, Lang, ColorName };
                kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public int DeleteColor(int ColorID)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "DELETE FROM Color WHERE ColorID=@ColorID";
                kq = ca.ExcuteSql(Sql, "@ColorID", SqlDbType.Int, ColorID);
            }
            catch { }
            return kq;
        }

        public DataSet GetColorByColorID(string DatasetName, int ColorID)
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();
            try
            {
                string Sql = "SELECT ColorID, Lang, ColorName FROM Color ";
                Sql += "WHERE ColorID = '" + ColorID + "'";
                ds = ca.SelectData(DatasetName, Sql);
            }
            catch { }
            return ds;
        }
    }
}
