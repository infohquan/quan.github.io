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
using System.Text;
using Khavi.Web.Assistant;

public partial class WeatherXml : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (IsPostBack)
            LoadWeatherXml();
    }
    public void LoadWeatherXml()
    {
        int id = Globals.GetIntFromQueryString("id"); //mã tỉnh
        if (id != -1)
        {
            string url = "http://vnexpress.net/ListFile/Weather/";
            switch (id)
            {
                case 1: url += "Sonla.xml";
                    break;
                case 2: url += "Viettri.xml";
                    break;
                case 3: url += "Haiphong.xml";
                    break;
                case 4: url += "Hanoi.xml";
                    break;
                case 5: url += "Vinh.xml";
                    break;
                case 6: url += "Danang.xml";
                    break;
                case 7: url += "Nhatrang.xml";
                    break;
                case 8: url += "Pleicu.xml";
                    break;
                case 9: url += "HCM.xml";
                    break;
                default: url += "Hanoi.xml";
                    break;
            }
            string content = Globals.GetHtmlFromUrl(url);
            Response.ContentType = "text/xml";
            Response.Write(content);
        }
    }
}
