using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Khavi.Web.Assistant;
using Khavi.Web.UIHelper;
using Khavi.Web.Data;
using MyTool;
using Connection;

public partial class CMS_Display_Utilities_Menu_MenuPro_cdgcontrol_item_why : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            LoadAgentCat();
    }

    private void LoadAgentCat()
    {
        try
        {
            string Lang = "VI";
            AgentCat obj = new AgentCat();
            DataSet ds = obj.GetAllAgentCat("AgentCat");
            DropDownListHelper ddlHelper = new DropDownListHelper();
            ddlHelper.FillData(ddlAgentCat, ds, "AgentNameVI", "ID", "---Chọn công ty---");
        }
        catch { }
    }
    protected void btnAction_Click(object sender, EventArgs e)
    {
        string c = ddlChoice.SelectedValue;
        string tblname = txtTableName.Text.Trim();
        DataSet ds = new DataSet();
        Article art = new Article();
        Product pro = new Product();
        int AgentCatID = Convert.ToInt32(ddlAgentCat.SelectedValue);
        lblAgentCatID.Text = ddlAgentCat.SelectedValue;
        if (c == "SELECT")
        {
            if (tblname == "Article")
            {
                ds = art.GetAllArticle("Article", AgentCatID);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    Response.Write(DataObject.GetString(ds, i, "ArticleID") + "======" + DataObject.GetString(ds, i, "Title") + "<br />");
                }
            }
            else if (tblname == "ProductCat")
            {
                ds = pro.GetAllProduct("ProductCat", AgentCatID, "VI");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    Response.Write(DataObject.GetString(ds, i, "ID") + "======" + DataObject.GetString(ds, i, "TenGoi") + "<br />");
                }
            }
            
        }
        else if (c == "DELETE")
        {
            string sql = txtSql.Text;
            MyConnection ca = new MyConnection();
            ca.ExeSql(sql);
        }
    }
}
