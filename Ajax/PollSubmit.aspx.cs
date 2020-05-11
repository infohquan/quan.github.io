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
using Khavi.Web.Data;
using Khavi.Provider;
using MyTool;

public partial class Ajax_PollSubmit : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Poll obj = new Poll();
            int PollAnswerID = Globals.GetIntFromQueryString("PollAnswerID");
            if (PollAnswerID != -1)
                obj.UpdateMark(PollAnswerID);
        }
    }
}
