<%@ WebHandler Language="C#" Class="domain" %>

using System;
using System.Web;
using Khavi.Web.Assistant;

public class domain : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) 
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("False");
        string d = Globals.GetStringFromQueryString("d");
        string e = Globals.GetStringFromQueryString("e");
        string url = "http://www.matbao.net/Domain.ashx?d=" + d + "&e=" + e;
        string text = Globals.GetHtmlFromUrl(url);
        context.Response.Write(text);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}