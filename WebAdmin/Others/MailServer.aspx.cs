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
using Khavi.Provider;
using MyTool;

public partial class WebAdmin_Others_MailServer : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            LoadData();
    }

    private void LoadData()
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetMailAdminByAgentCatID("MailAdmin", Globals.AgentCatID);
            if (ds.Tables[0].Rows.Count > 0)
            {
                txtEmail.Value = Convert.ToString(ds.Tables[0].Rows[0]["Email"]);
                txtPassword.Value = Convert.ToString(ds.Tables[0].Rows[0]["Password"]);
                txtMailServer.Value = Convert.ToString(ds.Tables[0].Rows[0]["MailServer"]);
            }
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            OtherFunctions obj = new OtherFunctions();
            Security sec = new Security();
            string Email = txtEmail.Value;
            //string Password = Security.PasswordEncoder(txtPassword.Value);
            string Password = sec.EncodePassword(txtPassword.Value);
            string MailServer = txtMailServer.Value;
            DataSet ds = obj.GetMailAdminByAgentCatID("MailAdmin", Globals.AgentCatID);
            int kq = -1;
            if (ds.Tables[0].Rows.Count > 0) //có MailAdmin rùi, update
            {
                int MailID = Convert.ToInt32(ds.Tables[0].Rows[0]["MailID"].ToString());
                kq = obj.UpdateMailAdmin(MailID, Globals.AgentCatID, Email, Password, MailServer);
            }
            else //chưa có, insert
            {
                kq = obj.InsertMailAdmin(Globals.AgentCatID, Email, Password, MailServer);
            }
            if (kq != -1)
            {
                lblMessage.Visible = true;
                lblMessage.Text = "Đã thiết lập thông tin Mail Server thành công!";
            }
        }
        catch { }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtEmail.Value = "";
        txtMailServer.Value = "";
        txtPassword.Value = "";
    }
}
