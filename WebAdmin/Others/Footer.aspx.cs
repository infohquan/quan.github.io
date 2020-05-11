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
using MyTool;

public partial class WebAdmin_Others_Footer : System.Web.UI.Page
{
    string t;
    private static bool hasRowFooter;
    private static bool hasRowContactInfo;
    protected void Page_Load(object sender, EventArgs e)
    {
        t = Globals.GetStringFromQueryString("t");
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            LoadData();
        }
    }
    private void LoadData()
    {
        OtherFunctions obj = new OtherFunctions();
        DataSet ds = new DataSet();
        if (t == "copyright") //footer
        {
            lblSubject.InnerText = "Nhập nội dung footer của website:";
            ds = obj.GetFooterWebsite("AgentCat", Globals.AgentCatID, ddlLanguage.SelectedValue);
            if (ds.Tables[0].Rows.Count > 0)
            {
                hasRowFooter = true;
                fckContent.Value = Convert.ToString(ds.Tables[0].Rows[0]["FooterWebsite" + ddlLanguage.SelectedValue]);
            }
            else
                hasRowFooter = false;
        }
        else if (t == "") //trang contact
        {
            lblSubject.InnerText = "Nhập nội dung thông tin liên hệ:";
            ds = obj.GetContactInfo("Contact", Globals.AgentCatID, ddlLanguage.SelectedValue);
            if (ds.Tables[0].Rows.Count > 0)
            {
                hasRowContactInfo = true;
                fckContent.Value = Convert.ToString(ds.Tables[0].Rows[0]["ContactInfo" + ddlLanguage.SelectedValue]);
            }
            else
                hasRowFooter = false;
            //MessageBox.Show(hasRowContactInfo.ToString());
        }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        OtherFunctions obj = new OtherFunctions();
        int kq = -1;
        if (t == "copyright") //footer
            kq = obj.UpdateFooterWebsite(Globals.AgentCatID, fckContent.Value, ddlLanguage.SelectedValue);
        else if (t == "") //trang contact
        {
            if (hasRowContactInfo)
                kq = obj.UpdateContactInfo(Globals.AgentCatID, fckContent.Value, ddlLanguage.SelectedValue);
                //MessageBox.Show(hasRowContactInfo.ToString());
            else if (hasRowContactInfo == false)
                kq = obj.InsertContactInfo(Globals.AgentCatID, fckContent.Value, ddlLanguage.SelectedValue);
                //MessageBox.Show(hasRowContactInfo.ToString());
        }
        lblMessage.Visible = true;
        if (kq == 1)
            lblMessage.Text = "Đã cập nhật thông tin thành công!";
        else
            lblMessage.Text = "Không thể cập nhật. Vui lòng thử lại!";
    }
    protected void ddlLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        LoadData();
    }
}
