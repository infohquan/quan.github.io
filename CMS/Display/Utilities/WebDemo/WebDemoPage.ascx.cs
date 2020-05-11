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
using Khavi.Web.UIHelper;

public partial class CMS_Display_Utilities_WebDemo_WebDemoPage : System.Web.UI.UserControl
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
            Page.Title += " - " + langXml.GetString("Web", "Text", "WebLayout");
            LoadGroup();
        }
    }

    private void LoadGroup()
    {
        MyTool.WebDemo gr = new MyTool.WebDemo();
        int RootID = gr.GetRootID(Globals.AgentCatID);
        DataSet ds = gr.GetWebDemoGroupByParentID("WebDemoGroup", Globals.AgentCatID, RootID);
        DropDownListHelper ddlHelper = new DropDownListHelper();
        ddlHelper.FillData(ddlGroup, ds, "Name", "ID", "---Xem tất cả---");
    }

    public void LoadWebDemo()
    {
        MyTool.WebDemo obj = new MyTool.WebDemo();
        DataSet ds = new DataSet();
        int GroupID = Globals.GetIntFromQueryString("gid");
        if (ddlGroup.SelectedIndex == 0)
            ds = obj.GetAllWebDemo("WebDemo", Globals.AgentCatID);
        else
            ds = obj.SearchWebDemo("WebDemo", Globals.AgentCatID, GroupID);
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
        for (int i = FromRow; i <= ToRow; i++)
        {
            Response.Write("<div class=\"customer-item\">");
            Response.Write("<div class='mtool' style='line-height:18px; padding-bottom:4px; height:54px; overflow:hidden;'>");
            Response.Write("Web " + obj.GetWebDemoGroupNameByID(Globals.AgentCatID, DataObject.GetInt(ds, i, "GroupID")));
            Response.Write("<br />");
            Response.Write("<b>Mã số: " + DataObject.GetString(ds, i, "ID") + "</b>");
            Response.Write("</div>");
            Response.Write("<a href='" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "LargeImage") + "' onclick='return hs.expand(this)'>");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "LargeImage")))
                Response.Write("<img title='Click để xem ảnh lớn!' width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"Thumbnail.ashx?width=" + _imageWidth + "&height=" + _imageHeight + "&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "LargeImage") + "\" />");
            else
                Response.Write("<img width=\"" + _imageWidth + "\" height=\"" + _imageHeight + "\" src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("</a>");
            Response.Write("<div class='mtool'>");
            //Response.Write("<a href='" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "LargeImage") + "' onclick='return hs.expand(this)'>Ảnh lớn</a>|");
            string title = "Đặt hàng giao diện mẫu website " + obj.GetWebDemoGroupNameByID(Globals.AgentCatID, DataObject.GetInt(ds, i, "GroupID")) + " - Mã số: " + DataObject.GetString(ds, i, "ID");
            Response.Write("<a href='Contact.aspx?t=contact&ProductID=" + DataObject.GetString(ds, i, "ID") + "&title=" + title + "'>Đặt hàng</a>|");
            Response.Write("<a target='_blank' href='" + DataObject.GetString(ds, i, "Link") + "'>Demo</a>");
            Response.Write("</div>");
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

    protected void ddlGroup_SelectedIndexChanged(object sender, EventArgs e)
    {
        Response.Redirect("WebDemo.aspx?t=web&gid=" + ddlGroup.SelectedValue);
    }
}
