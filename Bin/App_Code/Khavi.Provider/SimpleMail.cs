using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mail;
//using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Khavi.Provider
{
    /// <summary>
    /// Summary description for SimpleMail
    /// </summary>
    public class SimpleMail
    {
        public SimpleMail()
        { }
        public bool SendMail(string emailTo, string subject, string content)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To = emailTo;
                
                mail.BodyFormat = MailFormat.Html;
                mail.BodyEncoding = System.Text.UTF8Encoding.UTF8;
                mail.Subject = subject;
                mail.Body = content;
                //string EmailAccount = "quocviet.hcmute@gmail.com";
                //string EmailPassword = "khanhviet";
                //string EmailServer = "mail.google.com";

                string EmailAccount = "tropicaltour@tropicaltour.vn";
                string EmailPassword = "asd@987#dsa";
                string EmailServer = "mail.tropicaltour.vn";
                mail.From = EmailAccount;
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1");
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserverport", "25");
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", EmailAccount);
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", EmailPassword);

                SmtpMail.SmtpServer = EmailServer;
                SmtpMail.Send(mail);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
