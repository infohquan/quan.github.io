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

/// <summary>
/// Loại giao dịch bất động sản : Cần thuê, cần bán, cần mua, cho thuê...
/// </summary>
public class RealEstateTransactionType
{
    public RealEstateTransactionType() { }

    public int Insert(string Lang, int AgentCatID, string Name, string Order, int ParentID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "INSERT INTO RealEstateTransactionType (Lang, AgentCatID, Name, [Order], ParentID) ";
            Sql += "VALUES (@Lang, @AgentCatID, @Name, @Order, @ParentID)";

            string[] strParaName = new string[5] { "@Lang", "@AgentCatID", "@Name", "@Order", "@ParentID" };
            SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.Int };
            object[] objValue = new object[5] { Lang, AgentCatID, Name, Order, ParentID };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        //catch { }
        return kq;
    }

    public int Update(int ID, string Lang, int AgentCatID, string Name, string Order, int ParentID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "UPDATE RealEstateTransactionType SET Lang=@Lang, Name=@Name, [Order]=@Order, ParentID=@ParentID ";
            Sql += "WHERE ID=@ID AND AgentCatID=@AgentCatID";

            string[] strParaName = new string[6] { "@ID", "@Lang", "@AgentCatID", "@Name", "@Order", "@ParentID" };
            SqlDbType[] sqlDbType = new SqlDbType[6] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.Int };
            object[] objValue = new object[6] { ID, Lang, AgentCatID, Name, Order, ParentID };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        catch { }
        return kq;
    }

    public int Delete(int ID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "DELETE FROM RealEstateTransactionType WHERE ID=@ID";
            kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
        }
        catch { }
        return kq;
    }

    public DataSet GetDetailByID(string DatasetName, int ID, string Lang)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, AgentCatID, ParentID, Lang, Name, [Order], CreationDate ";
            Sql += "FROM RealEstateTransactionType WHERE ID='" + ID + "' AND Lang='" + Lang + "'";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public DataSet GetRealEstateTransactionTypeByParentID(string DatasetName, int AgentCatID, int ParentID, string Lang)
    { 
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, AgentCatID, ParentID, Lang, Name, [Order], CreationDate ";
            Sql += "FROM RealEstateTransactionType WHERE AgentCatID = '" + AgentCatID + "' AND ParentID='" + ParentID + "' AND Lang='" + Lang + "'";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }
}
