using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using Khavi.Web.UIHelper;
using Khavi.Web.Assistant;

public partial class ImageCaptcha : System.Web.UI.Page
{
    private void Page_Load(object sender, System.EventArgs e)
    {
        // Create a CAPTCHA image using the text stored in the Session object.
        //CaptchaImage ci = new CaptchaImage(Convert.ToString(Session["CaptchaImageText"]), 150, 30, "Verdana");
        CaptchaImage ci = new CaptchaImage(Convert.ToString(Session["CaptchaImageText"]), 120, 26, "Verdana");
        
        // Change the response headers to output a JPEG image.
        this.Response.Clear();
        this.Response.ContentType = "image/jpeg";

        // Write the image to the response stream in JPEG format.
        ci.Image.Save(this.Response.OutputStream, ImageFormat.Jpeg);

        // Dispose of the CAPTCHA image object.
        ci.Dispose();
    }
}
