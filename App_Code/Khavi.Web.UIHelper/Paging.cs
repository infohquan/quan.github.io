using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Khavi.Web.Assistant;
using Khavi.Provider;
using MyTool;

namespace Khavi.Web.UIHelper
{
    public class Paging
    {
        public Paging() { }

        /// <summary>
        /// Lấy chuỗi HTML phân trang
        /// </summary>
        /// <param name="CurrentPageUrl">Context.Request.RawUrl</param>
        /// <param name="PageCount"></param>
        /// <returns></returns>
        public static string GetHtmlPaging(string CurrentPageUrl, int PageCount)
        {
            string html = "";
            string Lang = Globals.GetLang();
            int CurrentPage = Globals.GetIntFromQueryString("Page");
            if (CurrentPage == -1) CurrentPage = 1;
            LanguageXML myLangXml = new LanguageXML("Language" + Lang);

            string[] strText = new string[4] {  myLangXml.GetString("Web", "Paging", "First"), 
                                            myLangXml.GetString("Web", "Paging", "Previous"),
                                            myLangXml.GetString("Web", "Paging", "Next"),
                                            myLangXml.GetString("Web", "Paging", "Last")};
            if (PageCount > 1)
                html = Globals.GetHtmlPagingAdvanced(6, CurrentPage, PageCount, CurrentPageUrl, strText);
            return html;
        }

        public static string GetHtmlPagingGoToID(string CurrentPageUrl, int PageCount)
        {
            string html = "";
            string Lang = Globals.GetLang();
            int CurrentPage = Globals.GetIntFromQueryString("Page");
            if (CurrentPage == -1) CurrentPage = 1;
            LanguageXML myLangXml = new LanguageXML("Language" + Lang);

            string[] strText = new string[4] {  myLangXml.GetString("Web", "Paging", "First"), 
                                            myLangXml.GetString("Web", "Paging", "Previous"),
                                            myLangXml.GetString("Web", "Paging", "Next"),
                                            myLangXml.GetString("Web", "Paging", "Last")};
            if (PageCount > 1)
                html = Globals.GetHtmlPagingAdvancedGoToID(6, CurrentPage, PageCount, CurrentPageUrl, strText, "webpakage");
            return html;
        }
    }
}
