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
/// Summary description for AspxPageInfo
/// </summary>
public class AspxPageInfo
{
    public AspxPageInfo() { }

    public int InsertPageInfo(int AgentCatID, string Lang, string PageTitle, string PageDescription, string PageContent, string PageKeyword, string TagContent)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "INSERT INTO AspxPageInfo (AgentCatID, Lang, PageTitle, PageDescription, PageContent, PageKeyword, TagContent) ";
            Sql += "VALUES (@AgentCatID, @Lang, @PageTitle, @PageDescription, @PageContent, @PageKeyword, @TagContent)";

            string[] strParaName = new string[7] { "@AgentCatID", "@Lang", "@PageTitle", "@PageDescription", "@PageContent", "@PageKeyword", "@TagContent" };
            SqlDbType[] sqlDbType = new SqlDbType[7] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
            object[] objValue = new object[7] { AgentCatID, Lang, PageTitle, PageDescription, PageContent, PageKeyword, TagContent };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        //catch { }
        return kq;
    }

    public int UpdatePageInfo(int AgentCatID, string Lang, string PageTitle, string PageDescription, string PageContent, string PageKeyword, string TagContent)
    {
        int kq = -1;
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "UPDATE AspxPageInfo SET PageTitle=@PageTitle, PageDescription=@PageDescription, PageContent=@PageContent, PageKeyword=@PageKeyword, TagContent=@TagContent ";
            Sql += "WHERE AgentCatID=@AgentCatID AND Lang=@Lang";
            string[] strParaName = new string[7] { "@AgentCatID", "@Lang", "@PageTitle", "@PageDescription", "@PageContent", "@PageKeyword", "@TagContent" };
            SqlDbType[] sqlDbType = new SqlDbType[7] { SqlDbType.Int, SqlDbType.VarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar, SqlDbType.NVarChar };
            object[] objValue = new object[7] { AgentCatID, Lang, PageTitle, PageDescription, PageContent, PageKeyword, TagContent };
            kq = ca.ExcuteSql(Sql, strParaName, sqlDbType, objValue);
        }
        //catch { }
        return kq;
    }

    public DataSet GetAspxPageInfo(string DatasetName, int AgentCatID, string Lang)
    {  
        DataSet ds = new DataSet();
        MyConnection ca = new MyConnection();
        //try
        {
            string Sql = "SELECT ID, AgentCatID, Lang, PageTitle, PageDescription, PageContent, PageKeyword, TagContent ";
            Sql += "FROM AspxPageInfo WHERE AgentCatID='" + AgentCatID + "' AND Lang='" + Lang + "'";
            ds = ca.SelectData(DatasetName, Sql);
        }
        //catch { }
        return ds;
    }
}
