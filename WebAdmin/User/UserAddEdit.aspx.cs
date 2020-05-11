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

public partial class WebAdmin_User_UserAddEdit : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string Action = Globals.GetStringFromQueryString("Action");
        if (!IsPostBack)
        {
            if (Action == "Edit")
                LoadDataEdit();
        }
    }

    private void LoadDataEdit()
    {
        try
        {
            lblTitle1.InnerText = "Cập nhật Người dùng";
            lblTitle2.InnerText = "Cập nhật Người dùng";
            ImgBtnCheck.Visible = false;
            LinkIsUserExistent.Visible = false;
            string Username = Globals.GetStringFromQueryString("Username");
            Account obj = new Account();
            DataSet ds = obj.GetUserByUsername("UserCat", Username, Globals.AgentCatID);
            txtAddress.Value = Convert.ToString(ds.Tables[0].Rows[0]["Address"]);
            txtEmail.Value = Convert.ToString(ds.Tables[0].Rows[0]["Email"]);
            txtInfo.Value = Convert.ToString(ds.Tables[0].Rows[0]["Info"]);
            txtPassword.Disabled = true;
            txtUsername.Value = Username;
            txtUsername.Disabled = true;
            txtFullName.Value = Convert.ToString(ds.Tables[0].Rows[0]["FullName"]);
            txtTel.Value = Convert.ToString(ds.Tables[0].Rows[0]["Tel"]);
            rblGender.SelectedValue = Convert.ToString(ds.Tables[0].Rows[0]["Gender"]);
            txtDateCreated.Value = Convert.ToString(ds.Tables[0].Rows[0]["DateCreated"]);
            if (Convert.ToString(ds.Tables[0].Rows[0]["BirthDay"]) != "")
            {
                DateTime BirthDay = Convert.ToDateTime(ds.Tables[0].Rows[0]["BirthDay"].ToString());
                ddlDay.SelectedValue = BirthDay.Day.ToString();
                ddlMonth.SelectedValue = BirthDay.Month.ToString();
                txtYear.Value = BirthDay.Year.ToString();
            }
        }
        catch 
        {
            Response.Redirect("UserList.aspx");
        }
    }
    private void Save()
    {
        try
        {
            string Action = Globals.GetStringFromQueryString("Action");
            Account obj = new Account();
            string Username = txtUsername.Value.Trim();
            string Password = Security.PasswordEncoder(txtPassword.Value.Trim());
            string FullName = txtFullName.Value.Trim();
            string Address = txtAddress.Value.Trim();
            string Email = txtEmail.Value.Trim();
            string Tel = txtTel.Value.Trim();
            string Info = txtInfo.Value.Trim();
            int Gender = Convert.ToInt32(rblGender.SelectedValue);
            string BirthDay = "";
            if (ddlDay.SelectedValue != "-1" && ddlMonth.SelectedValue != "-1" && txtYear.Value != "")
                BirthDay = ddlMonth.SelectedValue + "/" + ddlDay.SelectedValue + "/" + txtYear.Value;

            if (Action == "Edit")
            {
                obj.UpdateUser(Globals.AgentCatID, Username, FullName, Address, Email, Tel, Info, BirthDay, Gender);
            }
            else
            {
                if (IsUserExistent() == false)
                    obj.InsertUser(Globals.AgentCatID, Username, Password, FullName, Address, Email, Tel, Info, BirthDay, Gender);
                else
                {
                    lblResult.Visible = true;
                    lblResult.Text = "Tên đăng nhập này đã được dùng!";
                }
            }
        }
        catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "User/UserList.aspx");
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Reset();
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            String Username = Globals.GetStringFromQueryString("Username");
            Account obj = new Account();
            obj.DeleteUser(Username, Globals.AgentCatID);
            Response.Redirect("UserList.aspx");
        }
        catch { }
    }
    private void Reset()
    {
        txtUsername.Value = "";
        txtPassword.Value = "";
        txtFullName.Value = "";
        txtAddress.Value = "";
        txtEmail.Value = "";
        txtTel.Value = "";
        ddlDay.SelectedValue = "-1";
        ddlMonth.SelectedValue = "-1";
        txtYear.Value = "";
        rblGender.SelectedValue = "-1";
        txtInfo.Value = "";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
    private Boolean IsUserExistent()
    {
        Boolean b = false;
        try
        {
            lblResult.Visible = true;
            Account obj = new Account();
            b = obj.IsUserExistent(txtUsername.Value.Trim(), Globals.AgentCatID);
            if (b == true)  //Đã tồn tại User này
                lblResult.Text = "Tên đăng nhập này đã được dùng!";
            else
                lblResult.Text = "Tên đăng nhập này hợp lệ!";
        }
        catch { }
        return b;
    }
    protected void ImgBtnCheck_Click(object sender, ImageClickEventArgs e)
    {
        IsUserExistent();
    }
    protected void LinkIsUserExistent_Click(object sender, EventArgs e)
    {
        IsUserExistent();
    }
}
