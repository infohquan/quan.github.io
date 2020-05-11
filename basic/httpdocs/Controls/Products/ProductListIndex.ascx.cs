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

public partial class Controls_Products_ProductListIndex : System.Web.UI.UserControl
{
    public bool f;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.RawUrl.ToLower().Contains("default.aspx"))
            f = true;
        else
            f = false;
        if (!IsPostBack)
        {
            string Lang = Globals.GetLang();
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            lblSubject.InnerText = langXml.GetString("Web", "Text", "TopHotProduct");
        }
    }
    public void LoadCycleProduct()
    {
        int i = 0;
        string Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        MyTool.Product obj = new MyTool.Product();
        DataSet ds = obj.GetTopHotProduct("ProductCat", Globals.AgentCatID, 10, Lang);
        int half = ds.Tables[0].Rows.Count / 2;
        string detailUrl = "";
        string strScriptTooltipImage = "";
        Response.Write("<div>");
        for (i = 0; i < half; i++)
        {
            detailUrl = "ProductDetail.aspx?ID=" + DataObject.GetString(ds, i, "ID") + "&CatID=" + DataObject.GetString(ds, i, "GroupID") + "&Lang=" + Lang;
            strScriptTooltipImage = "onmouseout=\"hideTip()\" onmouseover=\"doTooltip(event,'" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "','" + DataObject.GetString(ds, i, "TenGoi") + "','#ffffff','#000000')\"";
            
            Response.Write("<a " + strScriptTooltipImage + " title=\"" + langXml.GetString("Web", "Text", "ClickToAddCart") + DataObject.GetString(ds, i, "TenGoi") + "\" class=\"article-item\" href=\"Contact.aspx?t=ContactProduct&ProductID=" + DataObject.GetString(ds, i, "ID") + "&Lang=" + Lang + "\">");
            Response.Write("<span>" + DataObject.GetString(ds, i, "TenGoi") + "</span>");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "Anh")))
                Response.Write("<img src=\"Thumbnail.ashx?width=140&height=160&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "\" />");
            else
                Response.Write("<img src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("<br />");
            Response.Write("<span style=\"text-align:center; color:Orange\">");
            Response.Write(Globals.FormatStringThousand(DataObject.GetDouble(ds, i, "GiaBan")) + " " + DataObject.GetString(ds, i, "NgoaiTe"));
            Response.Write("</span>");
            Response.Write("</a>");
        }
        Response.Write("</div>");
        /////
        Response.Write("<div>");
        for (i = half; i < ds.Tables[0].Rows.Count; i++)
        {
            detailUrl = "ProductDetail.aspx?ID=" + DataObject.GetString(ds, i, "ID") + "&CatID=" + DataObject.GetString(ds, i, "GroupID") + "&Lang=" + Lang;
            strScriptTooltipImage = "onmouseout=\"hideTip()\" onmouseover=\"doTooltip(event,'" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "','" + DataObject.GetString(ds, i, "TenGoi") + "','#ffffff','#000000')\"";

            Response.Write("<a " + strScriptTooltipImage + " title=\"" + langXml.GetString("Web", "Text", "ClickToAddCart") + DataObject.GetString(ds, i, "TenGoi") + "\" class=\"article-item\" href=\"Contact.aspx?t=ContactProduct&ProductID=" + DataObject.GetString(ds, i, "ID") + "&Lang=" + Lang + "\">");
            Response.Write("<span>" + DataObject.GetString(ds, i, "TenGoi") + "</span>");
            if (Globals.IsFileExistent(DataObject.GetString(ds, i, "Anh")))
                Response.Write("<img src=\"Thumbnail.ashx?width=140&height=160&ImgFilePath=" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "\" />");
            else
                Response.Write("<img src=\"" + Globals.DefaultImage + "\" />");
            Response.Write("<br />");
            Response.Write("<span style=\"text-align:center; color:Orange\">");
            Response.Write(Globals.FormatStringThousand(DataObject.GetDouble(ds, i, "GiaBan")) + " " + DataObject.GetString(ds, i, "NgoaiTe"));
            Response.Write("</span>");
            Response.Write("</a>");
        }
        Response.Write("</div>");
    }
}
