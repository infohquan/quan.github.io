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
using Khavi.Web.Data;
using Khavi.Provider;


public partial class CMS_Display_Utilities_Customer_CustomerPage : System.Web.UI.UserControl
{
    #region "Properties"
    private string _controlCssClass;
    public string ControlCssClass
    {
        get { return _controlCssClass; }
        set { _controlCssClass = value; }
    }
    private int _imageWidth;
    public int ImageWidth
    {
        get { return _imageWidth; }
        set { _imageWidth = value; }
    }
    private int _imageHeight;
    public int ImageHeight
    {
        get { return _imageHeight; }
        set { _imageHeight = value; }
    }
    #endregion

    private int PageSize = 12;
    private int PageCount;
    private string Lang;
    protected void Page_Load(object sender, EventArgs e)
    {
        Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        if (!IsPostBack)
        {
            //lblSubject.InnerText = langXml.GetString("Web", "MenuTop", "Customer");
        }
    }

    public void LoadCustomer()
    {
        MyTool.Customer cust = new MyTool.Customer();
        DataSet ds = cust.GetAllCustomer("Customer", Globals.AgentCatID);
        int TotalItems = ds.Tables[0].Rows.Count;
        if (TotalItems % PageSize == 0)
            PageCount = TotalItems / PageSize;
        else
            PageCount = TotalItems / PageSize + 1;

        Int32 Page = Globals.GetIntFromQueryString("Page");
        if (Page == -1) Page = 1;
        int FromRow = (Page - 1) * PageSize;
        int ToRow = Page * PageSize - 1;
        if (ToRow >= TotalItems)
            ToRow = TotalItems - 1;
        string aHrefStart = "";
        string aHrefEnd = "</a>";
        for (int i = FromRow; i <= ToRow; i++)
        {
            string link = Convert.ToString(ds.Tables[0].Rows[i]["CustomerWebsite"]);
            if (link == "" || link == "#")
                aHrefStart += "<a href=\"javascript:;\">";
            else
            {
                if (link.Contains("http://") == false)
                    aHrefStart += "<a target=\"_blank\" href=\"http://" + link + "\">";
                else if (link.Contains("http://") == true)
                    aHrefStart += "<a target=\"_blank\" href=\"" + link + "\">";
            }

            Response.Write("<div class=\"customer-item\">");
            Response.Write("<strong style=\"display:block; width:100%; height:33px; overflow:hidden\">");
            Response.Write(aHrefStart + DataObject.GetString(ds, i, "CustomerFullName") + aHrefEnd);
            Response.Write("</strong>");
            Response.Write(aHrefStart);
            if (Globals.IsFileExistent(Convert.ToString(ds.Tables[0].Rows[i]["CustomerLogo"])))
                Response.Write("<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["CustomerLogo"]) + "\" />");
            else
                Response.Write("<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"" + Globals.DefaultImage + "\" />");
            Response.Write(aHrefEnd);
            //Response.Write("<p style=\"width:100%;\">");
            //Response.Write("<strong style=\"display:block; width:100%;\">" + DataObject.GetString(ds, i, "CustomerFullName") + "</strong>");
            //Response.Write("<span>Website: ");
            
            
            //Response.Write("</a>");
            //Response.Write("</span>");
            //Response.Write("</p>");
            Response.Write("</div>");
        }
    }

    /// <summary>
    /// Hiển thị chuỗi phân trang
    /// </summary>
    protected void DisplayHtmlStringPaging()
    {
        string Lang = Globals.GetLang();
        Int32 CurrentPage = Globals.GetIntFromQueryString("Page");
        if (CurrentPage == -1) CurrentPage = 1;
        LanguageXML myLangXml = new LanguageXML("Language" + Lang);

        string[] strText = new string[4] {  myLangXml.GetString("Web", "Paging", "First"), 
                                            myLangXml.GetString("Web", "Paging", "Previous"),
                                            myLangXml.GetString("Web", "Paging", "Next"),
                                            myLangXml.GetString("Web", "Paging", "Last")};
        if (PageCount > 1)
            Response.Write(Globals.GetHtmlPagingAdvanced(6, CurrentPage, PageCount, Context.Request.RawUrl, strText));
    }
}
