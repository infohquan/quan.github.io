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
    public class VideoHelper
    {
        public VideoHelper() { }

        /// <summary>
        /// Lấy HTML load FLV Video
        /// </summary>
        /// <param name="FileVideoSrc"></param>
        /// <param name="FileVideoImage"></param>
        /// <param name="Width"></param>
        /// <param name="Height"></param>
        /// <returns></returns>
        public static string LoadFlvVideo(string FileVideoSrc, string FileVideoImage, int Width, int Height)
        {
            string html = "";
            html += "<object height='" + Height + "' width='" + Width + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0'>";
            html += "<param name='movie' value='flvplayer.swf' />";
            html += "<param name='quality' value='high'>";
            html += "<param name='wmode' value='transparent'>";
            html += "<param name='flashvars' value='file=" + Globals.GetUploadsUrl() + FileVideoSrc + "'>";
            html += "<embed height='" + Height + "' width='" + Width + "' ";
                html += "src='flvplayer.swf' flashvars='file=" + Globals.GetUploadsUrl() + FileVideoSrc + "'";
                html += "quality='high' wmode='transparent' ";
                html += "pluginspage='http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash' type='application/x-shockwave-flash'>";
            html += "</object>";
            return html;
        }
    }
}
