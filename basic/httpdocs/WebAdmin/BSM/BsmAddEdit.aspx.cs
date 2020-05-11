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
using Khavi.Web.Data;
using MyTool;
using Subgurim.Controles;

public partial class WebAdmin_BSM_BsmAddEdit : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string Action = Globals.GetStringFromQueryString("Action");
        if (fileUploadImage.IsPosting)
            Session["FileImageName"] = Globals.ProcessFileUpload(fileUploadImage, true);
        if (!IsPostBack)
        {
            Globals.BindLanguageToDDL(ddlLanguage);
            LoadText(Action);
            LoadProvince();
            LoadFaculty();
            if (Action == "Edit")
                LoadDataEdit();
        }
    }

    private void LoadFaculty()
    {
        try
        {
            string Lang = Globals.GetLang();
            Faculty obj = new Faculty();
            DataSet ds = obj.GetAllFaculty("Faculty", Globals.AgentCatID, Lang, 3);
            DropDownListHelper ddlHelper = new DropDownListHelper();
            ddlHelper.FillData(ddlFaculty, ds, "FacultyName" + Lang, "FacultyID", "---Chọn Ngành nghề---");
        }
        catch { }
    }

    private void LoadProvince()
    {
        //try
        {
            int _AgentCatID = 15;
            string Lang = Globals.GetLang();
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetAllProvince("Province", _AgentCatID, 1);
            DropDownListHelper ddlHelper = new DropDownListHelper();
            ddlHelper.FillData(ddlProvince, ds, "ProvinceName", "ProvinceID", "---Chọn Tỉnh/Thành phố---");
        }
        //catch { }
    }
    private void LoadText(string Action)
    {
        if (Action == "Edit")
            lblTitle1.InnerText = "Cập nhật Thông tin Doanh nghiệp";
        else if (Action == "")
            lblTitle1.InnerText = "Thêm Doanh nghiệp mới";
        lblTitle2.InnerText = lblTitle1.InnerText;
    }
    
    private void LoadDataEdit()
    {
        try
        {
            int ID = Globals.GetIntFromQueryString("ID");
            int ParentID = Globals.GetIntFromQueryString("ParentID");
            string Lang = Globals.GetStringFromQueryString("Lang");
            AgentCat obj = new AgentCat();
            DataSet ds = obj.GetAgentCatByAgentCatID("AgentCat",ParentID,ID, Lang);
            txtAddress.Value = DataObject.GetString(ds, 0, "Address" + Lang);
            txtAgentCode.Value = DataObject.GetString(ds, 0, "AgentCode");
            txtAgentName.Value = DataObject.GetString(ds, 0, "AgentName" + Lang);
            txtAgentPassword.Value = "";
            txtAgentUsername.Value = DataObject.GetString(ds, 0, "AgentUsername");
            txtContactName.Value = DataObject.GetString(ds, 0, "ContactName");
            txtEmail.Value = DataObject.GetString(ds, 0, "Email");
            txtFax.Value = DataObject.GetString(ds, 0, "Fax");
            txtIntroduction.Value = DataObject.GetString(ds, 0, "Introduction" + Lang);
            txtSkype.Value = DataObject.GetString(ds, 0, "Skype");
            txtTel.Value = DataObject.GetString(ds, 0, "Tel");
            txtWebsite.Value = DataObject.GetString(ds, 0, "Website");
            txtYahoo.Value = DataObject.GetString(ds, 0, "Yahoo");
            imgLogo.Src = Globals.GetUploadsUrl() + DataObject.GetString(ds, 0, "Logo");
            ddlFaculty.SelectedValue = DataObject.GetString(ds, 0, "FacultyID");
            ddlProvince.SelectedValue = DataObject.GetString(ds, 0, "ProvinceID");
            cbIsHot.Checked = DataObject.GetBoolean(ds, 0, "IsHot");
            cbVisible.Checked = DataObject.GetBoolean(ds, 0, "Visible");
            Session["FileImageName"] = Convert.ToString(ds.Tables[0].Rows[0]["Logo"]);
            trAgentCatID.Visible = true;
            lblAgentCatIDView.InnerText = Convert.ToString(ID);
            btnSave.Visible = false;
            AgentLanguage al = new AgentLanguage();
            DataSet dsAL = al.GetLanguageByAgentCatID("AgentLanguage", ID);
            int n = dsAL.Tables[0].Rows.Count;
            if (n >= 1)
            {
                txtLangCode1.Text = DataObject.GetString(dsAL, 0, "LanguageCode");
                txtLangName1.Text = DataObject.GetString(dsAL, 0, "LanguageName");
                txtLangOrder1.Text = DataObject.GetString(dsAL, 0, "LanguageOrder");
            }
            if (n >= 2)
            {
                txtLangCode2.Text = DataObject.GetString(dsAL, 1, "LanguageCode");
                txtLangName2.Text = DataObject.GetString(dsAL, 1, "LanguageName");
                txtLangOrder2.Text = DataObject.GetString(dsAL, 1, "LanguageOrder");
            }
            if (n >= 3)
            {
                txtLangCode3.Text = DataObject.GetString(dsAL, 2, "LanguageCode");
                txtLangName3.Text = DataObject.GetString(dsAL, 2, "LanguageName");
                txtLangOrder3.Text = DataObject.GetString(dsAL, 2, "LanguageOrder");
            }
            if (n >= 4)
            {
                txtLangCode4.Text = DataObject.GetString(dsAL, 3, "LanguageCode");
                txtLangName4.Text = DataObject.GetString(dsAL, 3, "LanguageName");
                txtLangOrder4.Text = DataObject.GetString(dsAL, 3, "LanguageOrder");
            }
            if (n >= 5)
            {
                txtLangCode5.Text = DataObject.GetString(dsAL, 4, "LanguageCode");
                txtLangName5.Text = DataObject.GetString(dsAL, 4, "LanguageName");
                txtLangOrder5.Text = DataObject.GetString(dsAL, 4, "LanguageOrder");
            }
        }
        catch { }
    }

    private void Save()
    {
        //try
        {
            AgentCat obj = new AgentCat();
            string AgentCode = txtAgentCode.Value.Trim();
            string AgentUsername = txtAgentUsername.Value.Trim();
            string AgentPassword = txtAgentPassword.Value.Trim();
            string AgentName = txtAgentName.Value.Trim();
            string ContactName = txtContactName.Value.Trim();
            string Address = txtAddress.Value.Trim();
            string Introduction = txtIntroduction.Value.Trim();
            int ProvinceID = Convert.ToInt32(ddlProvince.SelectedValue);
            string Tel = txtTel.Value.Trim();
            string Fax = txtFax.Value.Trim();
            string Email = txtEmail.Value.Trim();
            string Yahoo = txtYahoo.Value.Trim();
            string Skype = txtSkype.Value.Trim();
            string Website = txtWebsite.Value.Trim();
            string Logo = Convert.ToString(Session["FileImageName"]);
            int ParentID = 184; //agent_id của bsm
            int FacultyID = Convert.ToInt32(ddlFaculty.SelectedValue);
            bool IsHot = cbIsHot.Checked;
            bool Visible = cbVisible.Checked;
            string Keyword = "";
            string AgentNameHidden = "";

            string Action = Globals.GetStringFromQueryString("Action");
            if (Action == "")
                obj.InsertAgentCat(ddlLanguage.SelectedValue,ParentID, AgentCode, AgentUsername, AgentPassword, AgentName, ContactName, Address, Introduction, ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, ParentID, FacultyID, IsHot, Keyword, AgentNameHidden, Visible);
            else
            {
                int AgentCatID = Globals.GetIntFromQueryString("ID");
                obj.UpdateAgentCat(AgentCatID, ddlLanguage.SelectedValue, AgentCode, AgentName, ContactName, Address, ProvinceID, Tel, Fax, Email, Yahoo, Skype, Website, Logo, ParentID, FacultyID, IsHot, Keyword, AgentNameHidden, TypeAgentCat);
            }
            Session.Remove("FileImageName");
            //Ngôn ngữ website
            int LastAgentCatID = obj.GetLastAgentCatID();
            AgentLanguage al = new AgentLanguage();
            
            if (txtLangCode1.Text != "")
            {
                al.InsertAgentLanguage(LastAgentCatID, txtLangCode1.Text.Trim(), txtLangName1.Text.Trim(), 1);
            }
            if (txtLangCode2.Text != "")
            {
                al.InsertAgentLanguage(LastAgentCatID, txtLangCode2.Text.Trim(), txtLangName2.Text.Trim(), 2);
            }
            if (txtLangCode3.Text != "")
            {
                al.InsertAgentLanguage(LastAgentCatID, txtLangCode3.Text.Trim(), txtLangName3.Text.Trim(), 3);
            }
            if (txtLangCode4.Text != "")
            {
                al.InsertAgentLanguage(LastAgentCatID, txtLangCode4.Text.Trim(), txtLangName4.Text.Trim(), 4);
            }
            if (txtLangCode5.Text != "")
            {
                al.InsertAgentLanguage(LastAgentCatID, txtLangCode5.Text.Trim(), txtLangName5.Text.Trim(), 5);
            }
        }
        //catch { }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "BSM/BsmList.aspx");
    }
    protected void btnSaveContinue_Click(object sender, EventArgs e)
    {
        Save();
        Response.Redirect(Globals.GetAdminFolderUrl() + "BSM/BsmList.aspx");
    }
    private void Reset()
    {
        
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
    protected void btnDelete_Click(object sender, EventArgs e)
    {
        try
        {
            int ID = Globals.GetIntFromQueryString("ID");
            AgentCat obj = new AgentCat();
            obj.DeleteAgentCat(ID);
            AgentLanguage al = new AgentLanguage();
            al.DeleteAgentLanguageByAgentCatID(ID);
            Response.Redirect("BsmList.aspx");
        }
        catch { }
    }
}
