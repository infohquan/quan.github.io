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

public partial class Controls_Others_Poll : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        if (!IsPostBack)
        {
            lblTextPoll.InnerText = langXml.GetString("Web", "Text", "Poll");
        }
    }

    public void LoadPollHtml()
    {
        string Lang = Globals.GetLang();
        LanguageXML langXml = new LanguageXML("Language" + Lang);
        Poll obj = new Poll();
        DataSet ds = obj.GetPollActive("Poll", Globals.AgentCatID, Lang);
        int i = 0;

        Response.Write("<strong>" + DataObject.GetString(ds, i, "PollQuestion" + Lang) + "</strong>");
        Response.Write("<div class=\"poll-answer-item\">");
        DataSet dsAnswer = obj.GetPollAnswerByPollID("PollAnswer", DataObject.GetInt(ds, i, "PollID"), Lang);
        for (int j = 0; j < dsAnswer.Tables[0].Rows.Count; j++)
        {
            Response.Write("<span>");
            Response.Write("<input type=\"radio\" value=\"" + DataObject.GetInt(dsAnswer, j, "ID") + "\" name=\"poll_answer_value\" />");
            Response.Write("<label>" + DataObject.GetString(dsAnswer, j, "PollAnswer" + Lang) + "</label>");
            Response.Write("</span>");
        }
        Response.Write("</div>");
        Response.Write("<div class=\"poll-answer-action\">");
        Response.Write("<input type=\"button\" value=\"" + langXml.GetString("Web", "Text", "Vote") + "\" onclick=\"pollSubmit(" + DataObject.GetInt(ds, i, "PollID") + ");\" />");
        Response.Write("<a onclick=\"openPollResult(" + DataObject.GetInt(ds, i, "PollID") + ")\">" + langXml.GetString("Web", "Text", "ViewResult") + "</a>");
        Response.Write("</div>");
    }
}
