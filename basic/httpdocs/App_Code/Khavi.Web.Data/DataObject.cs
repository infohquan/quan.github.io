using System;
using System.Data;
using System.Configuration;
using System.Web;
using Connection;

namespace Khavi.Web.Data
{
    public class DataObject
    {
        public DataObject() { }

        public int UpdateData(string[] strParaName, SqlDbType[] sqlDbType, object[] objValue, string strSql)
        {
            int kq = -1;
            MyConnection ca = new MyConnection();
            try
            {
                kq = ca.ExcuteSql(strSql, strParaName, sqlDbType, objValue);
            }
            catch { }
            return kq;
        }

        public DataSet GetDataSet()
        {
            DataSet ds = new DataSet();
            MyConnection ca = new MyConnection();

            return ds;
        }
        public static int GetRowCount(DataSet ds)
        {
            return ds.Tables[0].Rows.Count;
        }
        /// <summary>
        /// Kiểm tra xem DataSet có row hay không
        /// </summary>
        /// <param name="ds"></param>
        /// <returns></returns>
        public static bool HasRow(DataSet ds)
        {
            if (ds.Tables[0].Rows.Count > 0)
                return true;
            else return false;
        }

        public static string GetString(DataSet ds, int iRow, string ColumnName)
        {
            return Convert.ToString(ds.Tables[0].Rows[iRow][ColumnName]);
        }
        
        public static int GetInt(DataSet ds, int iRow, string ColumnName)
        {
            return Convert.ToInt32(ds.Tables[0].Rows[iRow][ColumnName]);
        }

        public static double GetDouble(DataSet ds, int iRow, string ColumnName)
        {
            return Convert.ToDouble(ds.Tables[0].Rows[iRow][ColumnName]);
        }

        public static DateTime GetDate(DataSet ds, int iRow, string ColumnName)
        {
            return Convert.ToDateTime(ds.Tables[0].Rows[iRow][ColumnName]);
        }

        public static Boolean GetBoolean(DataSet ds, int iRow, string ColumnName)
        {
            return Convert.ToBoolean(ds.Tables[0].Rows[iRow][ColumnName]);
        }
    }
}
