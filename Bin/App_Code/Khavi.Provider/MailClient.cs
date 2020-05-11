using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Khavi.Provider
{
    public class MailClient
    {
        MailAddress mailAddress = null;

        private String mailServerName;
        public MailClient(string MailServerName)
        {
            mailServerName = MailServerName;
        }
        
        private Int32 port;
        public Int32 Port
        {
            set { port = value; }
            get { return port; }
        }
         
        private String errorMessage = "";
        public String ErrorMessage
        {
            set { errorMessage = value; }
            get { return errorMessage; }
        }

        public Boolean SendMail(String emailFrom, String password, String displayName, String emailTo, String subject, String body)
        {
            Boolean sendSucessful = true;
            //try
            {
                MailMessage mailMessage = new MailMessage();
                MailAddress objMailSender = new MailAddress(emailFrom, displayName);
                mailMessage.From = objMailSender;

                mailMessage.To.Add(emailTo);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = MailPriority.High;
                SmtpClient smtpClient = new SmtpClient(mailServerName);
                smtpClient.Credentials = new NetworkCredential(emailFrom, password);
                smtpClient.Send(mailMessage);
            }
            //catch(Exception ex)
            //{
            //    sendSucessful = false;
            //    errorMessage=ex.Message;

            //}
            return sendSucessful;
        }

	    public Boolean SendMail(String emailFrom, String password, String displayName, String emailTo, String emailCC, String subject, String body)
	    {         
            Boolean sendSucessful = true;
            //try
            {
                MailMessage mailMessage = new MailMessage();                
                MailAddress objMailSender = new MailAddress(emailFrom, displayName);
                mailMessage.From = objMailSender;
                
                mailMessage.To.Add(emailTo);
                //if (emailCC != "")
                //    mailMessage.CC.Add(emailCC); 
                mailMessage.Subject = subject;             
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = MailPriority.High;
                SmtpClient smtpClient = new SmtpClient(mailServerName);
                smtpClient.Credentials = new NetworkCredential(emailFrom, password);
                smtpClient.Send(mailMessage);
            }
            //catch(Exception ex)
            //{
            //    sendSucessful = false;
            //    errorMessage=ex.Message;
    	        
            //}
            return sendSucessful;
	    }



        /*public Boolean SendMail(String emailTo, String emailCC, String emailBCC, String subject, String body)
        {       
            Boolean sendSucessful = true;
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = mailAddress;
                mailMessage.To.Add(emailTo);
                mailMessage.Subject = subject;
                if(emailCC != "")
                    mailMessage.CC.Add(emailCC);
                if (emailBCC != "")
                    mailMessage.Bcc.Add(emailBCC);
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = MailPriority.High;
                SmtpClient smtpClient = 
                new SmtpClient(mailServerName);             
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                sendSucessful = false;
                errorMessage = ex.Message;

            }
            return sendSucessful;
        }
        
        public Boolean SendMail(String emailTo, String emailCC, String emailBCC, String subject, 
                                String body, String attachFileName)
        {         
            Boolean sendSucessful = true;
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = mailAddress;
                mailMessage.To.Add(emailTo);
                mailMessage.Subject = subject;
                if(emailCC != "")
                    mailMessage.CC.Add(emailCC);
                if (emailBCC != "")
                    mailMessage.Bcc.Add(emailBCC);
                mailMessage.Body = body;
                if (attachFileName != "")
                {
                    Attachment attachment =
                    new Attachment(attachFileName);
                    mailMessage.Attachments.Add(attachment);
                }
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = MailPriority.High;
                SmtpClient smtpClient = 
                new SmtpClient(mailServerName);             
                smtpClient.Send(mailMessage);                               
            }
            catch (Exception ex)
            {
                sendSucessful = false;
                errorMessage = ex.Message;

            }
            return sendSucessful;
        }
        
        public Boolean SendMail(String emailTo, String emailCC, String emailBCC, String subject,
                                String body, String[] attachFileName)
        {         
            Boolean sendSucessful = true;
            try
            {
               MailMessage mailMessage = new MailMessage();
               mailMessage.From = mailAddress;
                mailMessage.To.Add(emailTo);
                mailMessage.Subject = subject;
                if(emailCC != "")
                    mailMessage.CC.Add(emailCC);
                if (emailBCC != "")
                    mailMessage.Bcc.Add(emailBCC);
                mailMessage.Body = body;
                if (attachFileName != null)
                {
                    foreach(String fileName in attachFileName)
                    {
                        AttachFile(mailMessage, fileName);
                    }                
                }
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = MailPriority.High;
                SmtpClient smtpClient = 
                new SmtpClient(mailServerName);
                smtpClient.Send(mailMessage);  
            }
            catch (Exception ex)
            {
                sendSucessful = false;
                errorMessage = ex.Message;

            }
            return sendSucessful;
        }
        */
        void AttachFile(MailMessage mailMessage, String  attachFileName)
        {
            if (attachFileName != "")
            {
                using (Attachment attachment =
                    new Attachment(attachFileName))
                {                                                
                    mailMessage.Attachments.Add(attachment);
                }            
            }
                      
        }

        public Boolean IsEmail(String inputEmail)
        {
            if (inputEmail == null | inputEmail.Length > 35) return false;
            String strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                @".)+))([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$";
            Regex re = new Regex(strRegex);
            return (re.IsMatch(inputEmail));
        }
    }
}
