using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Data.SqlClient;


namespace Connection
{
    public class MyConnection
    { 
     
     //public string m_Con = "server=DEDI94209;uid=raovatso;pwd=~@~agtadiem;database=raovatso";
        public string m_Con = "server=112.213.94.209;uid=cdgvn;pwd=cdgvn1985;database=cdgvn";

       public MyConnection()
        { }

        public SqlConnection ConnectionSql()
        {
            SqlConnection Connection = new SqlConnection(m_Con);
            try
            {
                Connection.Open();

                return Connection;
            }
            finally
            {
                Connection.Close();
            }
        }

        /// <summary>
        /// Lấy dữ liệu
        /// </summary>
        /// <param name="DatasetName">Tên table</param>
        /// <param name="Sql">Câu lệnh Sql</param>
        /// <returns></returns>
        public DataSet SelectData(string DatasetName, string Sql)
        {
            SqlConnection Connection = new SqlConnection(m_Con);
            Connection = ConnectionSql();

            SqlCommand mCommand = new SqlCommand(Sql, Connection);
            mCommand.Connection = Connection;
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = mCommand;
            DataSet ds = new DataSet();
            da.Fill(ds, DatasetName);
            return ds;
        }

        public DataSet SelectData(string DatasetName, string Sql, string[] strParaName, SqlDbType[] sqlDbType, object[] objValue)
        {
            SqlConnection Connection = new SqlConnection(m_Con);
            Connection = ConnectionSql();
            SqlCommand mCommand = new SqlCommand(Sql, Connection);
            mCommand.Connection = Connection;

            SqlParameter sqlPara;
            for (int i = 0; i < strParaName.Length; i++)
            {
                sqlPara = new SqlParameter();
                sqlPara.ParameterName = strParaName[i];
                sqlPara.SqlDbType = sqlDbType[i];
                sqlPara.Value = objValue[i];
                mCommand.Parameters.Add(sqlPara);
            }
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = mCommand;

            DataSet ds = new DataSet();
            da.Fill(ds, DatasetName);
            return ds;
        }

        public DataSet SelectData(string DatasetName, string Sql, int nPage, int nPageSize)
        {
            SqlConnection Connection = new SqlConnection(m_Con);
            Connection = ConnectionSql();

            SqlCommand mCommand = new SqlCommand(Sql, Connection);
            mCommand.Connection = Connection;
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = mCommand;
            DataSet ds = new DataSet();
            da.Fill(ds, (nPage -1) * nPageSize, nPageSize, DatasetName);
            return ds;
        }

        /// <summary>
        /// Thưc thi câu lệnh Sql
        /// </summary>
        /// <param name="Sql"></param>
        public void ExeSql(string Sql)
        {
            SqlConnection Connection = new SqlConnection(m_Con);
            DataSet ds = new DataSet();
            Connection.Open();
            SqlCommand mCommand = new SqlCommand(Sql, Connection);

            mCommand.Connection = Connection;
            mCommand.ExecuteNonQuery();
            mCommand.Clone();
        }

        public int ExcuteSql(string Sql, string strParaName, SqlDbType sqlDbType, object objValue)
        {
            int kq = 0;
            SqlConnection Connection = new SqlConnection(m_Con);
            Connection.Open();
            SqlCommand mCommand = new SqlCommand();
            mCommand.Connection = Connection;
            mCommand.CommandText = Sql;
            mCommand.CommandType = CommandType.Text;

            SqlParameter sqlPara;
            sqlPara = new SqlParameter();
            sqlPara.ParameterName = strParaName;
            sqlPara.SqlDbType = sqlDbType;
            sqlPara.Value = objValue;
            mCommand.Parameters.Add(sqlPara);
            kq = mCommand.ExecuteNonQuery();
            mCommand.Clone();
            return kq;
        }

        public int ExcuteSql(string Sql, string[] strParaName, SqlDbType[] sqlDbType, object[] objValue)
        {
            int kq = 0;
            SqlConnection Connection = new SqlConnection(m_Con);
            Connection.Open();
            SqlCommand mCommand = new SqlCommand();            
            mCommand.Connection = Connection;
            mCommand.CommandText = Sql;
            mCommand.CommandType = CommandType.Text;

            SqlParameter sqlPara;
            for (int i = 0; i < strParaName.Length; i++)
            {
                sqlPara = new SqlParameter();
                sqlPara.ParameterName = strParaName[i];
                sqlPara.SqlDbType = sqlDbType[i];
                sqlPara.Value = objValue[i];
                mCommand.Parameters.Add(sqlPara);
            }
            kq = mCommand.ExecuteNonQuery();
            mCommand.Clone();
            return kq;
        }

        /// <summary>
        /// Thực thi Sql (ko cần SqlDbType)
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="strParaName"></param>
        /// <param name="objValue"></param>
        /// <returns></returns>
        public int ExcuteSql(string Sql, string[] strParaName, object[] objValue)
        {
            int kq = 0;
            SqlConnection Connection = new SqlConnection(m_Con);
            Connection.Open();
            SqlCommand mCommand = new SqlCommand();
            mCommand.Connection = Connection;
            mCommand.CommandText = Sql;
            mCommand.CommandType = CommandType.Text;

            SqlParameter sqlPara;
            for (int i = 0; i < strParaName.Length; i++)
            {
                sqlPara = new SqlParameter();
                sqlPara.ParameterName = strParaName[i];
                sqlPara.Value = objValue[i];
                mCommand.Parameters.Add(sqlPara);
            }
            kq = mCommand.ExecuteNonQuery();
            mCommand.Clone();
            return kq;
        }

        /// <summary>
        /// Lấy giá trị của cột đầu tiên và hàng đấu tiên trong câu lệnh Sql (chỉ Select 1 giá trị trong table)
        /// </summary>
        /// <param name="Sql"></param>
        /// <returns></returns>
        public object ExecuteScalar(string Sql)
        {
            SqlConnection Connection = new SqlConnection(m_Con);
            DataSet ds = new DataSet();
            Connection.Open();
            SqlCommand mCommand = new SqlCommand(Sql, Connection);

            mCommand.Connection = Connection;
            return mCommand.ExecuteScalar();
        }

        //public int ExecuteData(string[] strParaName, object[] objValue, string typeSql)
        //{ 

        //}
    }
}
