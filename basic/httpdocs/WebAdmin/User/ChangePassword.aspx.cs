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

public partial class WebAdmin_User_ChangePassword : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            int kq = -1;
            Account obj = new Account();
            String Username = Convert.ToString(Session["Username"]);
            DataSet ds = obj.GetUserByUsername("UserCat", Username, Globals.AgentCatID);
            String oldPassword = Convert.ToString(ds.Tables[0].Rows[0]["Password"]);
            if (oldPassword == Security.PasswordEncoder(txtOldPassword.Value.Trim()))
            {
                String newPassword = Security.PasswordEncoder(txtNewPassword.Value.Trim());
                kq = obj.ChangePassword(Username, newPassword, Globals.AgentCatID);
                lblMessage.Visible = true;
                if (kq != -1)
                    lblMessage.Text = "Đã đổi mật khẩu thành công!";
                else
                    lblMessage.Text = "Không thể đổi mật khẩu!";
            }
            else
            {
                lblMessage.Visible = true;
                lblMessage.Text = "Mật khẩu cũ không chính xác!";
            }
        }
        catch { }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        txtConfirmPassword.Value = "";
        txtNewPassword.Value = "";
        txtOldPassword.Value = "";
    }
}
