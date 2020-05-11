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
using MyTool;

public partial class WebAdmin_Others_Tags : System.Web.UI.Page
{
    private static bool flag;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            LoadData();
        }
    }

    private void LoadData()
    {
        //try
        {
            string Lang = ddlLanguage.SelectedValue;
            AspxPageInfo obj = new AspxPageInfo();
            DataSet ds = obj.GetAspxPageInfo("AspxPageInfo", Globals.AgentCatID, Lang);
            if (ds.Tables[0].Rows.Count > 0)
            {
                flag = true;
                txtPageDescription.Value = Convert.ToString(ds.Tables[0].Rows[0]["PageDescription"]);
                txtPageTitle.Value = Convert.ToString(ds.Tables[0].Rows[0]["PageTitle"]);
                txtPageKeyword.Value = Convert.ToString(ds.Tables[0].Rows[0]["PageKeyword"]);
                txtTagContent.Value = Convert.ToString(ds.Tables[0].Rows[0]["TagContent"]);
            }
            else
            {
                flag = false;
                txtPageDescription.Value = "";
                txtPageTitle.Value = "";
                txtPageKeyword.Value = "";
                txtTagContent.Value = "";
            }
            //MessageBox.Show(flag.ToString());
        }
        //catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        string PageDescription = txtPageDescription.Value.Trim();
        string PageTitle = txtPageTitle.Value.Trim();
        string PageKeyword = txtPageKeyword.Value.Trim();
        string TagContent = txtTagContent.Value.Trim();
        AspxPageInfo obj = new AspxPageInfo();
        int kq = -1;
        if (flag) //update
        kq = obj.UpdatePageInfo(Globals.AgentCatID, ddlLanguage.SelectedValue, PageTitle, PageDescription, PageDescription, PageKeyword, TagContent);
        
        else //insert
            kq = obj.InsertPageInfo(Globals.AgentCatID, ddlLanguage.SelectedValue, PageTitle, PageDescription, PageDescription, PageKeyword, TagContent);
            //MessageBox.Show("insert");
        //MessageBox.Show(flag.ToString());
        lblMessage.Visible = true;
        if (kq != -1)
        {
            if (flag)
                lblMessage.Text = "Đã cập nhật thông tin thành công!";
            else
                lblMessage.Text = "Đã thêm mới thông tin thành công!";
        }
        else
        {
            if (flag)
                lblMessage.Text = "Không thể cập nhật thông tin thành công!";
            else
                lblMessage.Text = "Không thể thêm mới thông tin thành công!";
        }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtPageDescription.Value = "";
        txtPageKeyword.Value = "";
        txtPageTitle.Value = "";
        txtTagContent.Value = "";
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadData();
    }
}
