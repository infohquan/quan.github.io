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
using Khavi.Web.Data;
using MyTool;

namespace Khavi.Web.UIHelper
{
    /// <summary>
    /// HTML cho trang Danh sách Sản phẩm
    /// </summary>
    public class ProductListHtmlHelper
    {
        public ProductListHtmlHelper() { }

        /// <summary>
        /// Lấy chuỗi HTML danh sách sản phẩm
        /// </summary>
        /// <param name="ds"></param>
        /// <param name="Lang"></param>
        /// <param name="Start">0, FromRow</param>
        /// <param name="End">ds.Tables[0].Rows.Count, ToRow + 1</param>
        /// <returns></returns>
        public static string GetHtmlString(DataSet ds, string Lang, int Start, int End, int ImgProductWidth, int ImgProductHeight)
        {
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            string html = "";
            Product obj = new Product();
            Producer objB = new Producer();
            Catalog objC = new Catalog();
            string detailUrl = "";
            for (int i = Start; i < End; i++)
            {
                detailUrl = "ProductDetail.aspx?ID=" + DataObject.GetString(ds, i, "ID") + "&CatID=" + DataObject.GetString(ds, i, "GroupID") + "&Lang=" + Lang;
                //detailUrl = Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh");
                html += "<div class=\"product-item\">";
                html += "<a href=\"" + detailUrl + "\" class=\"product-name\">" + DataObject.GetString(ds, i, "TenGoi") + "</a>";
                //html += "<a href=\"" + detailUrl + "\" class=\"product-image\" onclick=\"return hs.expand(this)\">";
                html += "<a href=\"" + detailUrl + "\" class=\"product-image\">";
                if (Globals.IsFileExistent(DataObject.GetString(ds, i, "Anh")))
                {
                    html += "<center>";
                    html += "<img class=\"download_now\" width=\"" + ImgProductWidth + "\" height=\"" + ImgProductHeight + "\" src=\"" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "\" />";
                    html += " <div class=\"tooltip\">";
                    html += "<img src=\"" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "\" alt=\"Flying screens\"" + "width=\"" + ImgProductWidth * 3 + "\" height=\"" + ImgProductHeight * 3 + "\"" + ">";
                    html += "</div>";
                    html += "</center>";
                }
                else
                {
                    html += "<img id=\"download_now\" width=\"" + ImgProductWidth + "\" height=\"" + ImgProductHeight + "\" src=\"" + Globals.DefaultImage + "\" />";
                    html += " <div class=\"tooltip\" style=\"position: absolute; left: 174.5px; opacity: 0; top: 17px; display: none; \">";
                    html += "<img src=\"img/eye.png\" alt=\"Flying screens\" style=\"float:left;margin:0 15px 20px 0\">";
                    html += "</div>";
                }
                html += "</a>";
                //html += "<span class=\"product-price\">" + Globals.FormatStringThousand(DataObject.GetDouble(ds, i, "GiaBan")) + " " + DataObject.GetString(ds, i, "NgoaiTe") + "</span>";
                html += "<div class=\"product-click\">";
                html += "<a href=\"" + detailUrl + "\">" + langXml.GetString("Web", "DisplayProduct", "Detail") + "</a>";
                html += "<span class=\"sep\">|</span>";
                html += "<a href=\"Contact.aspx?t=ContactProduct&ProductID=" + DataObject.GetString(ds, i, "ID") + "&Lang=" + Globals.GetLang() + "\">" + langXml.GetString("Web", "MenuTop", "Contact") + "</a>";
                html += "</div>";

                html += "</div>";
            }
            return html;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ds"></param>
        /// <param name="Lang"></param>
        /// <param name="Start">0, FromRow</param>
        /// <param name="End">ds.Tables[0].Rows.Count, ToRow + 1</param>
        /// <returns></returns>
        public static string GetHtml(DataSet ds, string Lang, int Start, int End)
        {
            LanguageXML langXml = new LanguageXML("Language" + Lang);
            string html = "";
            Product obj = new Product();
            Producer objB = new Producer();
            Catalog objC = new Catalog();
            string detailUrl = "";
            for (int i = Start; i < End; i++)
            {
                detailUrl = "ProductDetail.aspx?ID=" + Convert.ToString(ds.Tables[0].Rows[i]["ID"]) + "&CatID=" + Convert.ToString(ds.Tables[0].Rows[i]["GroupID"]) + "&Lang=" + Lang;
                html += "<div class=\"prod_box\">";
                html += "<div class=\"top_prod_box\"></div>";
                html += "<div class=\"center_prod_box\">";
                html += "<div class=\"product_title\">";
                html += "<a href=\"javascript:;\">";
                html += Convert.ToString(ds.Tables[0].Rows[i]["TenGoi"]);
                html += "</a></div>";
                html += "<div class=\"product_img\">";
                html += "<a href=\"javascript:;\" onmouseout=\"hideTip()\" onmouseover=\"doTooltip(event,'" + Globals.GetUploadsUrl() + DataObject.GetString(ds, i, "Anh") + "','" + DataObject.GetString(ds, i, "TenGoi") + "','#ffffff','#000000')\">";
                if (Globals.IsFileExistent(Convert.ToString(ds.Tables[0].Rows[i]["Anh"])))
                    html += "<img class=\"imgproduct\" src=\"Thumbnail.ashx?width=162&height=120&ImgFilePath=" + Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["Anh"]) + "\" />";
                else
                    html += "<img class=\"imgproduct\" src=\"" + Globals.DefaultImage + "\" />";
                html += "</a></div>";
                //html += "<div>Hãng sản xuất: " + objB.GetProducerNameByProducerID(Convert.ToInt32(ds.Tables[0].Rows[i]["ProducerID"])) + "</div>";
                //html += "<div>Loại xe: " + objC.GetCatalogNameByCatalogID(Convert.ToInt32(ds.Tables[0].Rows[i]["GroupID"])) + "</div>";
                //html += "<div class=\"prod_price\"><a class=\"aprice\" href=\"" + detailUrl + "\">" + langXml.GetString("Web", "Text", "ViewMore") + "</a></div>";
                html += "<div class=\"prod_price\"><span class=\"price\" style=\"color:Orange;\">" + Globals.FormatStringThousand(DataObject.GetDouble(ds, i, "GiaBan")) + " " + DataObject.GetString(ds, i, "NgoaiTe") + "</span></div>";
                html += "</div>";
                html += "<div class=\"bottom_prod_box\"></div>";
                html += "<div class=\"prod_details_tab\">";
                //html += "<a href=\"javascript:;\" onclick=\"addToCartRidirect(" + DataObject.GetString(ds, i, "ID") + ")\" class=\"addcart\">" + langXml.GetString("Web", "DisplayProduct", "AddToCart") + "</a>";
                html += "<a href=\"Contact.aspx?t=ContactProduct&ProductID=" + Convert.ToString(ds.Tables[0].Rows[i]["ID"]) + "&Lang=" + Lang + "\" onclick=\"addToCartRidirect(" + DataObject.GetString(ds, i, "ID") + ")\" class=\"addcart\">" + langXml.GetString("Web", "DisplayProduct", "AddToCart") + "</a>";
                html += "</div>";
                html += "</div>";
            }
            return html;
        }
    }
}
