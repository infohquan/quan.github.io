<%@ Application Language="C#" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="MyTool" %>

<script runat="server">
    void Application_BeginRequest(Object sender, EventArgs e)
    {
        //URLRewriter.Rewriter.Process();
    }
    
    void Application_Start(object sender, EventArgs e) 
    {
        Application["FCKeditor:UserFilesPath"] = Globals.GetUploadsUrl();
        Application["OnlineUsers"] = 0;
    }
    
    
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown
    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs
    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started
        if (Session["Visitors"] == null)
        {
            OtherFunctions obj = new OtherFunctions();
            obj.UpdateVisitors(Globals.AgentCatID);
            Session["Visitors"] = "Visitors";
        }
        //Code user online
        Application.Lock();
        Application["OnlineUsers"] = (int)Application["OnlineUsers"] + 1;
        Application.UnLock(); 
    }

    void Session_End(object sender, EventArgs e) 
    {
        Session.RemoveAll();
        Application.Lock();
        Application["OnlineUsers"] = (int)Application["OnlineUsers"] - 1;
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.
    }       
</script>
