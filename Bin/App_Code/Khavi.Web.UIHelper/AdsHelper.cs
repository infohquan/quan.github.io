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
using MyTool;

namespace Khavi.Web.UIHelper
{
    /// <summary>
    /// Quảng cáo (hình ảnh + flash)
    /// </summary>
    public class AdsHelper
    {
        public AdsHelper() { }

        public static string LoadAllAds(int AgentCatID, string t)
        {
            string html = "";
            AgentCat agent = new AgentCat();
            Link obj = new Link();
            DataSet ds = obj.GetAllLink("AgentLink", AgentCatID, t);
            string link = "";
            string logotype = "";
            string linkname = "";
            string logosource = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                link = Convert.ToString(ds.Tables[0].Rows[i]["Link"]);
                logotype = Convert.ToString(ds.Tables[0].Rows[i]["LogoType"]);
                linkname = Convert.ToString(ds.Tables[0].Rows[i]["LinkName"]);
                logosource = agent.GetUploadHost(AgentCatID) + Convert.ToString(ds.Tables[0].Rows[i]["Logo"]);
                if (link == "" || link == "#")
                    html += "<a href=\"javascript:;\">";
                else
                {
                    if (link.Contains("http://") == false)
                        html += "<a target=\"_blank\" href=\"http://" + link + "\">";
                    else if (link.Contains("http://") == true)
                        html += "<a target=\"_blank\" href=\"" + link + "\">";
                }
                if (logotype == "image")
                    html += "<img src=\"" + logosource + "\" class=\"wid_ads\" alt=\"" + linkname + "\" title=\"" + linkname + "\" />";
                else if (logotype == "flash")
                {
                    int width = Convert.ToInt32(ds.Tables[0].Rows[i]["Width"]);
                    int height = Convert.ToInt32(ds.Tables[0].Rows[i]["Height"]);

                    html += "<object ";
                    if (width > 0)
                        html += "width=\"" + width + "\" ";
                    if (height > 0)
                        html += "height=\"" + height + "\"";

                    html += "><param name=\"movie\" value=\"images/flash.swf\" />";
                    html += "<embed src=\"" + logosource + "\" ";
                    if (width > 0)
                        html += "width=\"" + width + "\" ";
                    if (height > 0)
                        html += "height=\"" + height + "\"";
                    html += "></embed>";
                    html += "</object>";
                }
                html += "</a>";
            }
            return html;
        }

        public static string LoadAds(int AgentCatID, string Position, string t)
        {
            string html = "";
            AgentCat agent = new AgentCat();
            Link obj = new Link();
            DataSet ds = obj.GetLinkByPosition("AgentLink", AgentCatID, Position, t);
            string link = "";
            string logotype = "";
            string linkname = "";
            string logosource = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                link = Convert.ToString(ds.Tables[0].Rows[i]["Link"]);
                logotype = Convert.ToString(ds.Tables[0].Rows[i]["LogoType"]);
                linkname = Convert.ToString(ds.Tables[0].Rows[i]["LinkName"]);
                logosource = agent.GetUploadHost(AgentCatID) + Convert.ToString(ds.Tables[0].Rows[i]["Logo"]);
                //logosource = Globals.GetUploadsUrl() + Convert.ToString(ds.Tables[0].Rows[i]["Logo"]);
                if (link == "" || link == "#")
                    html += "<a href=\"javascript:;\">";
                else
                {
                    if (link.Contains("http://") == false)
                        html += "<a target=\"_blank\" href=\"http://" + link + "\">";
                    else if (link.Contains("http://") == true)
                        html += "<a target=\"_blank\" href=\"" + link + "\">";
                }
                if (logotype == "image")
                    html += "<img src=\"" + logosource + "\" class=\"wid_ads\" alt=\"" + linkname + "\" title=\"" + linkname + "\" />";
                else if (logotype == "flash")
                {
                    int width = Convert.ToInt32(ds.Tables[0].Rows[i]["Width"]);
                    int height = Convert.ToInt32(ds.Tables[0].Rows[i]["Height"]);

                    html += "<object ";
                    if (width > 0)
                        html += "width=\"" + width + "\" ";
                    if (height > 0)
                        html += "height=\"" + height + "\"";

                    html += "><param name=\"movie\" value=\"images/flash.swf\" />";
                    html += "<embed src=\"" + logosource + "\" ";
                    if (width > 0)
                        html += "width=\"" + width + "\" ";
                    if (height > 0)
                        html += "height=\"" + height + "\"";
                    html += "></embed>";
                    html += "</object>";
                }
                html += "</a>";
            }
            return html;
        }
    }
}
