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

public partial class CMS_Display_Utilities_Contact_Contact : System.Web.UI.UserControl
{
    #region "Properties"
    private string _controlCssClass;
    public string ControlCssClass
    {
        get { return _controlCssClass; }
        set { _controlCssClass = value; }
    }
    private int _agentCatID;
    public int AgentCatID
    {
        get { return _agentCatID; }
        set { _agentCatID = value; }
    }
    private bool _isAgentCat;
    /// <summary>
    /// true: AgentCatID là Globals.AgentCatID, false: user tự thêm vào AgentCatID
    /// </summary>
    public bool IsAgentCat
    {
        get { return _isAgentCat; }
        set { _isAgentCat = value; }
    }
    #endregion
    public LanguageXML langXml;
    protected void Page_Load(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        langXml = new LanguageXML("Language" + Lang);
        if (!IsPostBack)
        {
            string t = Globals.GetStringFromQueryString("t");
            if (t == "CustomerIdea")
                lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "CustomerIdea");
            else if (t == "ContactProduct")
            {
                lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "Contact");
                lblMessage.Text = langXml.GetString("Web", "Text", "AlertOrder");
            }
            OtherFunctions obj = new OtherFunctions();
            DataSet ds = obj.GetContactInfo("Contact", Globals.AgentCatID, Lang);
            if (ds.Tables[0].Rows.Count > 0)
                lblContactInfo.InnerHtml = Convert.ToString(ds.Tables[0].Rows[0]["ContactInfo" + Lang]);
            btnSend.Text = langXml.GetString("Web", "Text", "Send");
            btnReset.Text = langXml.GetString("Web", "Customer", "Reset");
        }
    }
    protected void btnSend_Click(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        MyTool.Contact obj = new MyTool.Contact();
        string FullName = txtFullName.Value.Trim();
        string Address = txtAddress.Value.Trim();
        string Email = txtEmail.Value.Trim();
        string Tel = txtTel.Value.Trim();
        string Title = txtTitle.Value.Trim();
        string Body = txtContent.Value.Trim();
        int kq = -1;
        string ContentType = Globals.GetStringFromQueryString("t");
        int ProductID = Globals.GetIntFromQueryString("ProductID");
        if (ProductID != -1)
            kq = obj.InsertContactProduct(Globals.AgentCatID, FullName, Address, Tel, Email, Title, Body, ProductID, ContentType);
        else
            kq = obj.InsertContact(Globals.AgentCatID, FullName, Address, Tel, Email, Title, Body, ContentType);
        if (kq == 1)
        {
            lblMessage.Text = langXml.GetString("Web", "Text", "MessageOK");
            Reset();
        }
        else
            lblMessage.Text = langXml.GetString("Web", "Text", "MessageError");
    }
    private void Reset()
    {
        txtFullName.Value = "";
        txtAddress.Value = "";
        txtEmail.Value = "";
        txtTel.Value = "";
        txtTitle.Value = "";
        txtContent.Value = "";
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Reset();
    }
}
