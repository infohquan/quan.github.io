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
/// Loại địa ốc bất động sản : Nhà phố, Biệt thự..., Và các thông tin liên quan khác như Tình trạng Pháp lý của BĐS, Hướng nhà của tài sản
/// </summary>
public class RealEstateType
{
    public RealEstateType() { }

    public DataSet SearchRealEstate(string DatasetName, int AgentCatID, string Lang, int DistrictID, int TransactionTypeID, int RealEstateTypeID, double MinPrice, double MaxPrice, double MinPriceUSD, double MaxPriceUSD, double MinPriceSJC, double MaxPriceSJC)
    { 
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "SELECT * FROM RealEstate WHERE AgentCatID='" + AgentCatID + "' AND Lang='" + Lang + "' ";
            if (DistrictID != -1)
                Sql += " AND DistrictID='" + DistrictID + "'";
            if (TransactionTypeID != -1)
                Sql += " AND TransactionTypeID='" + TransactionTypeID + "'";
            if (RealEstateTypeID != -1)
                Sql += " AND RealEstateTypeID='" + RealEstateTypeID + "'";
            
            if (MinPrice != 0 || MaxPrice != 0)
            {
                if (MinPrice != -1 && MaxPrice != -1)
                {
                    Sql += " AND ";
                    Sql += " (Currency='VND' AND Price >= " + MinPrice + " AND Price <= " + MaxPrice + ")";
                    Sql += " OR (Currency='USD' AND Price >= " + MinPriceUSD + " AND Price <= " + MaxPriceUSD + ")";
                    Sql += " OR (Currency='SJC' AND Price >= " + MinPriceSJC + " AND Price <= " + MaxPriceSJC + ")";
                }
            }
            Sql += " ORDER BY IsHot DESC, ID DESC";
            ds = ca.SelectData(DatasetName, Sql);
        }
        //catch { }
        return ds;
    }

    public DataSet GetRealEstateDetails(string DatasetName, int ID, string Lang)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT * FROM RealEstate WHERE ID='" + ID + "' AND Lang='" + Lang + "'";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public DataSet GetTopHotRealEstate(string DatasetName, int AgentCatID, int nTop, string Lang)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "SELECT TOP " + nTop + " * FROM RealEstate WHERE AgentCatID='" + AgentCatID + "' AND Lang='" + Lang + "' AND IsHot=1 ORDER BY ID DESC";
            ds = ca.SelectData(DatasetName, Sql);
        }
        //catch { }
        return ds;
    }

    public int Insert(string Lang, int AgentCatID, string Name, string Order, int ParentID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "INSERT INTO RealEstateType (Lang, AgentCatID, Name, [Order], ParentID) ";
            Sql += "VALUES (@Lang, @AgentCatID, @Name, @Order, @ParentID)";

            string[] strParaName = new string[5] { "@Lang", "@AgentCatID", "@Name", "@Order", "@ParentID" };
            //SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar, SqlDbType.Int };
            object[] objValue = new object[5] { Lang, AgentCatID, Name, Order, ParentID };
            //kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
            kq = ca.ExcuteSql(Sql, strParaName, objValue);
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
            string Sql = "UPDATE RealEstateType SET Lang=@Lang, Name=@Name, [Order]=@Order, ParentID=@ParentID ";
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
            string Sql = "DELETE FROM RealEstateType WHERE ID=@ID";
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
            Sql += "FROM RealEstateType WHERE ID='" + ID + "' AND Lang='" + Lang + "'";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public DataSet GetRealEstateTypeByParentID(string DatasetName, int AgentCatID, int ParentID, string Lang)
    { 
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, AgentCatID, ParentID, Lang, Name, [Order], CreationDate ";
            Sql += "FROM RealEstateType WHERE AgentCatID = '" + AgentCatID + "' AND ParentID='" + ParentID + "' AND Lang='" + Lang + "'";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public DataSet GetAllRealEstateLegalStatus(string DatasetName, int AgentCatID, string Lang)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, AgentCatID, Lang, RealEstateLegalStatusName, RealEstateLegalStatusOrder, CreationDate ";
            Sql += "FROM RealEstateLegalStatus WHERE AgentCatID = '" + AgentCatID + "' AND Lang='" + Lang + "' ORDER BY RealEstateLegalStatusOrder ASC, CreationDate ASC";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public DataSet GetRealEstateLegalStatusByID(string DatasetName, int ID, string Lang)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, AgentCatID, Lang, RealEstateLegalStatusName, RealEstateLegalStatusOrder, CreationDate ";
            Sql += "FROM RealEstateLegalStatus WHERE ID = '" + ID + "' AND Lang='" + Lang + "' ORDER BY RealEstateLegalStatusOrder ASC";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public int DeleteRealEstateLegalStatus(int ID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "DELETE FROM RealEstateLegalStatus WHERE ID=@ID";
            kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
        }
        catch { }
        return kq;
    }

    public int InsertRealEstateLegalStatus(int AgentCatID, string Lang, string RealEstateLegalStatusName, string RealEstateLegalStatusOrder)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "INSERT INTO RealEstateLegalStatus (Lang, AgentCatID, RealEstateLegalStatusName, RealEstateLegalStatusOrder) ";
            Sql += "VALUES (@Lang, @AgentCatID, @RealEstateLegalStatusName, @RealEstateLegalStatusOrder)";

            string[] strParaName = new string[4] { "@Lang", "@AgentCatID", "@RealEstateLegalStatusName", "@RealEstateLegalStatusOrder" };
            SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar };
            object[] objValue = new object[4] { Lang, AgentCatID, RealEstateLegalStatusName, RealEstateLegalStatusOrder };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        //catch { }
        return kq;
    }

    public int UpdateRealEstateLegalStatus(int ID, string Lang, int AgentCatID, string RealEstateLegalStatusName, string RealEstateLegalStatusOrder)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "UPDATE RealEstateLegalStatus SET Lang=@Lang, RealEstateLegalStatusName=@RealEstateLegalStatusName, RealEstateLegalStatusOrder=@RealEstateLegalStatusOrder ";
            Sql += "WHERE ID=@ID AND AgentCatID=@AgentCatID";

            string[] strParaName = new string[5] { "@ID", "@Lang", "@AgentCatID", "@RealEstateLegalStatusName", "@RealEstateLegalStatusOrder" };
            SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar };
            object[] objValue = new object[5] { ID, Lang, AgentCatID, RealEstateLegalStatusName, RealEstateLegalStatusOrder };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        catch { }
        return kq;
    }


    public DataSet GetAllRealEstatePosition(string DatasetName, int AgentCatID, string Lang)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, AgentCatID, Lang, RealEstatePositionName, RealEstatePositionOrder, CreationDate ";
            Sql += "FROM RealEstatePosition WHERE AgentCatID = '" + AgentCatID + "' AND Lang='" + Lang + "' ORDER BY RealEstatePositionOrder ASC, CreationDate ASC";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public DataSet GetRealEstatePositionByID(string DatasetName, int ID, string Lang)
    {
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "SELECT ID, AgentCatID, Lang, RealEstatePositionName, RealEstatePositionOrder, CreationDate ";
            Sql += "FROM RealEstatePosition WHERE ID = '" + ID + "' AND Lang='" + Lang + "' ORDER BY RealEstatePositionOrder ASC";
            ds = ca.SelectData(DatasetName, Sql);
        }
        catch { }
        return ds;
    }

    public int DeleteRealEstatePosition(int ID)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "DELETE FROM RealEstatePosition WHERE ID=@ID";
            kq = ca.ExcuteSql(Sql, "@ID", SqlDbType.Int, ID);
        }
        catch { }
        return kq;
    }

    public int InsertRealEstatePosition(int AgentCatID, string Lang, string RealEstatePositionName, string RealEstatePositionOrder)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "INSERT INTO RealEstatePosition (Lang, AgentCatID, RealEstatePositionName, RealEstatePositionOrder) ";
            Sql += "VALUES (@Lang, @AgentCatID, @RealEstatePositionName, @RealEstatePositionOrder)";

            string[] strParaName = new string[4] { "@Lang", "@AgentCatID", "@RealEstatePositionName", "@RealEstatePositionOrder" };
            SqlDbType[] sqlDbType = new SqlDbType[4] { SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar };
            object[] objValue = new object[4] { Lang, AgentCatID, RealEstatePositionName, RealEstatePositionOrder };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        //catch { }
        return kq;
    }

    public int UpdateRealEstatePosition(int ID, string Lang, int AgentCatID, string RealEstatePositionName, string RealEstatePositionOrder)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        try
        {
            string Sql = "UPDATE RealEstatePosition SET Lang=@Lang, RealEstatePositionName=@RealEstatePositionName, RealEstatePositionOrder=@RealEstatePositionOrder ";
            Sql += "WHERE ID=@ID AND AgentCatID=@AgentCatID";

            string[] strParaName = new string[5] { "@ID", "@Lang", "@AgentCatID", "@RealEstatePositionName", "@RealEstatePositionOrder" };
            SqlDbType[] sqlDbType = new SqlDbType[5] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.Int, SqlDbType.NVarChar, SqlDbType.VarChar };
            object[] objValue = new object[5] { ID, Lang, AgentCatID, RealEstatePositionName, RealEstatePositionOrder };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        catch { }
        return kq;
    }
}
