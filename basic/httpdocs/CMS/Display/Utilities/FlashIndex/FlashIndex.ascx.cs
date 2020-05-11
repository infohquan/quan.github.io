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

public partial class CMS_Display_Utilities_FlashIndex_FlashIndex : System.Web.UI.UserControl
{
    #region "Properties"
    private string _flashSource;
    public string FlashSource
    {
        get { return _flashSource; }
        set { _flashSource = value; }
    }
    private int _flashWidth;
    public int FlashWidth
    {
        get { return _flashWidth; }
        set { _flashWidth = value; }
    }
    private int _flashHeight;
    public int FlashHeight
    {
        get { return _flashHeight; }
        set { _flashHeight = value; }
    }
    #endregion
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            divContent.InnerHtml = Globals.LoadFlashHtml(_flashWidth, _flashHeight, _flashSource);
        }
    }
}
