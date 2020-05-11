using System;
using System.IO;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using Subgurim.Controles;
using MyTool;

namespace Khavi.Web.Assistant
{
    public class Globals
    {
        public static int AgentCatID = Convert.ToInt32(ConfigurationManager.AppSettings["AgentCatID"]);
        public static string DefaultLang = Convert.ToString(ConfigurationManager.AppSettings["DefaultLang"]);
        //Default Image (trong thư mục images của ứng dụng)
        public static string DefaultImage = Globals.ApplicationPath + "images/default_image.jpg";
        
        //Tên thư mục Admin ()
        public static String AdminFolderName = "WebAdmin";     //Dùng cho file này        
        //Tên thư mục Cache
        private const String StoredFolderName = "Cache";
        /// <summary>
        /// Đường dẫn ảo ứng dụng
        /// </summary>
        public static String ApplicationPath
        {
            get
            {
                String url = HttpContext.Current.Request.ApplicationPath;
                if (url.EndsWith("/"))
                    return url;
                else return url + "/";
            }
        }
        public static String PhysicalApplicationPath
        {
            get
            {
                String url = HttpContext.Current.Request.PhysicalApplicationPath;
                if (url.EndsWith("/"))
                    return url;
                else return url + "/";
            }
        }
        public Globals() { }

        /// <summary>
        /// Lấy dường dẫn ảo thư mục Quản trị
        /// </summary>
        /// <returns></returns>
        public static String GetAdminFolderUrl()
        {
            try
            {
                return ApplicationPath + AdminFolderName + "/";
            }
            catch
            {
                return "";
            }
        }

        /// <summary>
        /// Lấy đường dẫn thư mục Images ngoài
        /// </summary>
        /// <returns></returns>
        public static String GetImagesUrl()
        {
            try
            {
                return ApplicationPath + "Images/";
            }
            catch
            {
                return "";
            }
        }
        /// <summary>
        /// Lấy đường dẫn thư mục Images của phần Admin
        /// </summary>
        /// <returns></returns>
        public static String GetAdminImagesUrl()
        {
            try
            {
                return GetAdminFolderUrl() + "Images/";
            }
            catch
            {
                return "";
            }
        }

        /// <summary>
        /// Lấy đường dẫn ảo thư mục Uploads của phần Admin (Version 2: đổi đường dẫn thư mục Uploads)
        /// </summary>
        /// <returns></returns>
        public static String GetUploadsUrl()
        {
            return ApplicationPath + "Cache/Uploads/";
        }

        public static String GetImageUploadsUrl()
        {
            return ApplicationPath + "Cache/Uploads/ImageFiles/";
        }

        /// <summary>
        /// Đường dẫn thực tế thư mục Uploads
        /// </summary>
        /// <returns></returns>
        public static String GetPhysicalUploadsUrl()
        {
            return PhysicalApplicationPath + StoredFolderName + "/Uploads/";
        }

        /// <summary>
        /// Lấy giá trị nguyên của chuỗi truy vấn trên trình duyệt web
        /// </summary>
        /// <param name="key">Chuỗi truy vấn trên trình duyệt web</param>
        /// <returns></returns>
        public static Int32 GetIntFromQueryString(String key)
        {
            Int32 returnValue = -1;
            String queryStringValue = HttpContext.Current.Request.QueryString[key];
            try
            {
                if (queryStringValue == null)
                    return returnValue;
                if (queryStringValue.IndexOf("#") > 0)
                    queryStringValue = queryStringValue.Substring(0, queryStringValue.IndexOf("#"));
                returnValue = Convert.ToInt32(queryStringValue);
            }
            catch
            { }
            return returnValue;
        }

        /// <summary>
        /// Lấy giá trị chuỗi của chuỗi truy vấn trên trình duyệt web
        /// </summary>
        /// <param name="key">Chuỗi truy vấn trên trình duyệt web</param>
        /// <returns></returns>
        public static String GetStringFromQueryString(String key)
        {
            String returnValue = "";
            String queryStringValue = HttpContext.Current.Request.QueryString[key];
            try
            {
                if (queryStringValue == null)
                    return returnValue;
                if (queryStringValue.IndexOf("#") > 0)
                    queryStringValue = queryStringValue.Substring(0, queryStringValue.IndexOf("#"));
                returnValue = (String)queryStringValue;
            }
            catch { }
            return returnValue;
        }

        public static String GetStringDateTime(String Lang, DateTime dt)
        {
            String strDate;     //Chuỗi lưu Thứ..Ngày..Tháng..Năm..
            String strDayName;  //Chuỗi lưu Thứ..
            String strDay;      //Chuỗi lưu Ngày..Tháng..Năm..
            strDayName = dt.DayOfWeek.ToString();
            if (Lang == "VI") //Tiếng Việt
            {
                switch (strDayName)
                {
                    case "Monday": strDayName = "Thứ Hai"; break;
                    case "Tuesday": strDayName = "Thứ Ba"; break;
                    case "Wednesday": strDayName = "Thứ Tư"; break;
                    case "Thursday": strDayName = "Thứ Năm"; break;
                    case "Friday": strDayName = "Thứ Sáu"; break;
                    case "Saturday": strDayName = "Thứ Bảy"; break;
                    case "Sunday": strDayName = "Chủ Nhật"; break;
                }
                strDay = "Ngày " + dt.Day + " Tháng " + dt.Month + ", " + dt.Year +", " + dt.Hour + ":" + dt.Minute;
                strDate = strDayName + ", " + strDay;
            }
            else
            {
                strDate = dt.Date.ToLongDateString();
            }
            return strDate;
        }

        public static String GetDate(String Lang)
        {
            String strDate;     //Chuỗi lưu Thứ..Ngày..Tháng..Năm..
            String strDayName;  //Chuỗi lưu Thứ..
            String strDay;      //Chuỗi lưu Ngày..Tháng..Năm..
            strDayName = DateTime.Now.DayOfWeek.ToString();
            if (Lang == "") //Tiếng Việt
            {
                switch (strDayName)
                {
                    case "Monday": strDayName = "Thứ Hai"; break;
                    case "Tuesday": strDayName = "Thứ Ba"; break;
                    case "Wednesday": strDayName = "Thứ Tư"; break;
                    case "Thursday": strDayName = "Thứ Năm"; break;
                    case "Friday": strDayName = "Thứ Sáu"; break;
                    case "Saturday": strDayName = "Thứ Bảy"; break;
                    case "Sunday": strDayName = "Chủ Nhật"; break;
                }
                strDay = "Ngày " + DateTime.Now.Day + " Tháng " + DateTime.Now.Month + ", " + DateTime.Now.Year;
                strDate = strDayName + ", " + strDay;
            }
            else
            {
                strDate = DateTime.Now.Date.ToLongDateString();
            }
            return strDate;
        }

        /// <summary>
        /// Trả về chuỗi gồm Ngày..Tháng..Năm..
        /// </summary>
        /// <returns></returns>
        public static String GetDate2()
        {
            String strDay;      //Chuỗi lưu Ngày..Tháng..Năm..
            if (DateTime.Now.Day < 10)
                strDay = "0" + DateTime.Now.Day.ToString();
            else
                strDay = DateTime.Now.Day.ToString();

            if (DateTime.Now.Month < 10)
                strDay += "/" + "0" + DateTime.Now.Month.ToString();
            else
                strDay += "/" + DateTime.Now.Month.ToString();
            strDay += "/" + DateTime.Now.Year;
            return strDay;
        }

        /// <summary>
        /// Trả về chuỗi gồm Giờ..Phút..Giây..
        /// </summary>
        /// <returns></returns>
        public static String GetTime()
        {
            String strTime;      //Chuỗi lưu Ngày..Tháng..Năm..
            if (DateTime.Now.Hour < 10)
                strTime = "0" + DateTime.Now.Hour.ToString();
            else
                strTime = DateTime.Now.Hour.ToString();

            if (DateTime.Now.Minute < 10)
                strTime += ":" + "0" + DateTime.Now.Minute.ToString();
            else
                strTime += ":" + DateTime.Now.Minute.ToString();
            strTime += ":" + DateTime.Now.Second;
            return strTime;
        }

        /// <summary>
        /// Lấy tên file khi upload lên(xử lý cho khỏi trùng tên)
        /// </summary>
        /// <returns></returns>
        public static string GetFileName()
        {
            string strFileName;
            string strDay = "", strMonth = "";
            string strHour = "", strMinute = "", strSecond = "";
            if (DateTime.Now.Day < 10)
                strDay = "0" + DateTime.Now.Day;
            else if (DateTime.Now.Day >= 10)
                strDay = DateTime.Now.Day.ToString();

            if (DateTime.Now.Month < 10)
                strMonth = "0" + DateTime.Now.Month;
            else if (DateTime.Now.Month >= 10)
                strMonth = DateTime.Now.Month.ToString();

            if (DateTime.Now.Hour < 10)
                strHour = "0" + DateTime.Now.Hour;
            else if (DateTime.Now.Hour >= 10)
                strHour = DateTime.Now.Hour.ToString();

            if (DateTime.Now.Minute < 10)
                strMinute = "0" + DateTime.Now.Minute;
            else if (DateTime.Now.Minute >= 10)
                strMinute = DateTime.Now.Minute.ToString();

            if (DateTime.Now.Second < 10)
                strSecond = "0" + DateTime.Now.Second;
            else if (DateTime.Now.Second >= 10)
                strSecond = DateTime.Now.Second.ToString();

            strFileName = DateTime.Now.Year.ToString() + strMonth + strDay + "_" + strHour + strMinute + strSecond;

            return strFileName;
        }
        /// <summary>
        /// Kiểm tra file có tồn tại trong thư mục Uploads không
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static bool IsFileExistent(String fileName)
        {
            if (File.Exists(GetPhysicalUploadsUrl() + fileName))
                return true;
            else
                return false;
        }

        public static bool IsFileExistent(string path, string fileName)
        {
            if (File.Exists(path + fileName))
                return true;
            else
                return false;
        }
        /// <summary>
        /// Xóa file hình ảnh trong thư mục con của ImageFiles/....
        /// </summary>
        /// <param name="fileName">Tên file(có fần mở rộng)</param>
        /// <param name="folderName">Tên thư mục chứa file</param>
        /// <returns></returns>
        public static Int32 DeleteFile(String fileName, String folderName)
        {
            try
            {

                if (File.Exists(GetPhysicalUploadsUrl() + folderName + "/" + fileName))
                {
                    File.Delete(GetPhysicalUploadsUrl() + folderName + "/" + fileName);
                    return 1;
                }
            }
            catch { }
            return 0;
        }

        public static Int32 DeleteFile(string fileName)
        {
            try
            {

                if (File.Exists(GetPhysicalUploadsUrl() + fileName))
                {
                    File.Delete(GetPhysicalUploadsUrl() + fileName);
                    return 1;
                }
            }
            catch { }
            return 0;
        }

        /// <summary>
        /// Ghi nội dung lỗi của web vào file Error.txt
        /// </summary>
        /// <param name="content">Nội dung lỗi</param>
        public static void WriteErrorToFileText(String exMessage, String exSource, String exStackTrace)
        {
            try
            {
                FileStream fs = new FileStream(Globals.PhysicalApplicationPath + "Error.txt", FileMode.Append);
                TextWriter tw = new StreamWriter(fs);
                tw.WriteLine("DateTime: " + DateTime.Now.ToString());
                tw.WriteLine(exMessage);
                tw.WriteLine(exSource);
                tw.WriteLine(exStackTrace);
                tw.WriteLine("------------------------------------------------------------------------------------------------------------------------------------------------");
                tw.Close();
            }
            catch { }
        }

        /// <summary>
        /// Chuyển tiếng việt có dấu thành tiếng việt không dấu (khoảng trắng thay  bằng dấu -)
        /// </summary>
        /// <param name="strVietnamese">tiếng việt có dấu</param>
        /// <returns>tiếng việt không dấu</returns>
        public static string ConvertToVietnameseNotSignature(string strVietnamese)
        {
            const string FindText = "áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ #%&*:|.";
            const string ReplText = "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY-       ";
            int index = -1;
            while ((index = strVietnamese.IndexOfAny(FindText.ToCharArray())) != -1)
            {
                int index2 = FindText.IndexOf(strVietnamese[index]);
                strVietnamese = strVietnamese.Replace(strVietnamese[index], ReplText[index2]);
            }
            return strVietnamese;
        }

        /// <summary>
        /// Chuyển tiếng việt có dấu thành tiếng việt không dấu
        /// </summary>
        /// <param name="strVietnamese">tiếng việt có dấu</param>
        /// <returns>tiếng việt không dấu</returns>
        public static string ConvertToVietnameseNotSignature2(string strVietnamese)
        {
            const string FindText = "áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ#%&*:|.";
            const string ReplText = "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY       ";
            int index = -1;
            while ((index = strVietnamese.IndexOfAny(FindText.ToCharArray())) != -1)
            {
                int index2 = FindText.IndexOf(strVietnamese[index]);
                strVietnamese = strVietnamese.Replace(strVietnamese[index], ReplText[index2]);
            }
            return strVietnamese;
        }
        /// <summary>
        /// Lấy chuỗi HTML load file Flash
        /// </summary>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="flashSrc"></param>
        /// <returns></returns>
        public static string LoadFlashHtml(int width, int height, string flashSrc)
        { 
            string html = "";
            html += "<object height=\"" + height + "px\" width=\"" + width + "px\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\">";
            //html += "<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
            html += "<param value=\"" + flashSrc + "\" name=\"movie\">";
            html += "<param value=\"high\" name=\"quality\">";
            html += "<param value=\"transparent\" name=\"wmode\">";
            html += "<embed height=\"" + height + "px\" width=\"" + width + "px\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash\" wmode=\"transparent\" quality=\"high\" src=\"" + flashSrc + "\">";
	        html += "</object>";
            return html;
        }

        /// <summary>  
        /// Lấy chuỗi HTML phân trang
        /// </summary>  
        /// <param name="pagesToOutput">Số trang hiển thị phân trang</param>  
        /// <param name="currentPage">Chỉ số trang hiện tại</param>  
        /// <param name="pageCount">Tổng số trang</param>  
        /// <param name="currentPageUrl">currentPageUrl = Context.Request.RawUrl;</param>  
        /// <param name="strText">Mảng chuỗi {First, Previous, Next, Last}</param>  
        /// <returns></returns>  
        public static string GetHtmlPagingAdvanced(int pagesToOutput, int currentPage, int pageCount, string currentPageUrl, string[] strText)
        {
            //Nếu Số trang hiển thị là số lẻ thì tăng thêm 1 thành chẵn
            if (pagesToOutput % 2 != 0)
            {
                pagesToOutput++;
            }

            //Một nửa số trang để đầu ra, đây là số lượng hai bên.
            int pagesToOutputHalfed = pagesToOutput / 2;

            //Url của trang
            string pageUrl = GetPageUrl(currentPage, currentPageUrl);


            //Trang đầu tiên
            int startPageNumbersFrom = currentPage - pagesToOutputHalfed; ;

            //Trang cuối cùng
            int stopPageNumbersAt = currentPage + pagesToOutputHalfed; ;

            StringBuilder output = new StringBuilder();

            //Nối chuỗi phân trang
            output.Append("<div class=\"paging\">");
            output.Append("<ul>");

            //Link First(Trang đầu) và Previous(Trang trước)
            if (currentPage > 1)
            {
                output.Append("<li class=\"button\"><a title=\"" + strText[0] + "\" href=\"" + string.Format(pageUrl, 1) + "\">&laquo;&laquo;</a></li>");
                output.Append("<li class=\"button\"><a title=\"" + strText[1] + "\" href=\"" + string.Format(pageUrl, currentPage - 1) + "\">&laquo;</a></li>");
            }

            /******************Xác định startPageNumbersFrom & stopPageNumbersAt**********************/
            if (startPageNumbersFrom < 1)
            {
                startPageNumbersFrom = 1;

                //As page numbers are starting at one, output an even number of pages.  
                stopPageNumbersAt = pagesToOutput;
            }

            if (stopPageNumbersAt > pageCount)
            {
                stopPageNumbersAt = pageCount;
            }

            if ((stopPageNumbersAt - startPageNumbersFrom) < pagesToOutput)
            {
                startPageNumbersFrom = stopPageNumbersAt - pagesToOutput;
                if (startPageNumbersFrom < 1)
                {
                    startPageNumbersFrom = 1;
                }
            }
            /******************End: Xác định startPageNumbersFrom & stopPageNumbersAt**********************/

            //Các dấu ... chỉ những trang phía trước  
            if (startPageNumbersFrom > 1)
            {
                output.Append("<li class=\"pagerange\"><a href=\"" + string.Format(GetPageUrl(currentPage - 1, pageUrl), startPageNumbersFrom - 1) + "\">&hellip;</a></li>");
            }

            //Duyệt vòng for hiển thị các trang
            for (int i = startPageNumbersFrom; i <= stopPageNumbersAt; i++)
            {
                if (currentPage == i)
                {
                    output.Append("<li class=\"selected\">" + i.ToString() + "</li>");
                }
                else
                {
                    output.Append("<li><a href=\"" + string.Format(pageUrl, i) + "\">" + i.ToString() + "</a></li>");
                }
            }

            //Các dấu ... chỉ những trang tiếp theo  
            if (stopPageNumbersAt < pageCount)
            {
                output.Append("<li class=\"pagerange\"><a href=\"" + string.Format(pageUrl, stopPageNumbersAt + 1) + "\">&hellip;</a></li>");
            }

            //Link Next(Trang tiếp) và Last(Trang cuối)
            if (currentPage != pageCount)
            {
                output.Append("<li class=\"button\"><a title=\"" + strText[2] + "\" href=\"" + string.Format(pageUrl, currentPage + 1) + "\">&raquo;</a></li>");
                output.Append("<li class=\"button\"><a title=\"" + strText[3] + "\" href=\"" + string.Format(pageUrl, pageCount) + "\">&raquo;&raquo;</a></li>");
            }
            output.Append("</ul>");
            output.Append("</div>");
            return output.ToString();
        }

        /// <summary>
        /// Phân trang, nhảy tới một neo ID nào đó
        /// </summary>
        /// <param name="pagesToOutput"></param>
        /// <param name="currentPage"></param>
        /// <param name="pageCount"></param>
        /// <param name="currentPageUrl"></param>
        /// <param name="strText"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string GetHtmlPagingAdvancedGoToID(int pagesToOutput, int currentPage, int pageCount, string currentPageUrl, string[] strText, string id)
        {
            //Nếu Số trang hiển thị là số lẻ thì tăng thêm 1 thành chẵn
            if (pagesToOutput % 2 != 0)
            {
                pagesToOutput++;
            }

            //Một nửa số trang để đầu ra, đây là số lượng hai bên.
            int pagesToOutputHalfed = pagesToOutput / 2;

            //Url của trang
            string pageUrl = GetPageUrl(currentPage, currentPageUrl);


            //Trang đầu tiên
            int startPageNumbersFrom = currentPage - pagesToOutputHalfed; ;

            //Trang cuối cùng
            int stopPageNumbersAt = currentPage + pagesToOutputHalfed; ;

            StringBuilder output = new StringBuilder();

            //Nối chuỗi phân trang
            output.Append("<div class=\"paging\">");
            output.Append("<ul>");

            //Link First(Trang đầu) và Previous(Trang trước)
            if (currentPage > 1)
            {
                output.Append("<li class=\"button\"><a title=\"" + strText[0] + "\" href=\"" + string.Format(pageUrl, 1) + "#" + id + "\">&laquo;&laquo;</a></li>");
                output.Append("<li class=\"button\"><a title=\"" + strText[1] + "\" href=\"" + string.Format(pageUrl, currentPage - 1) + "#" + id + "\">&laquo;</a></li>");
            }

            /******************Xác định startPageNumbersFrom & stopPageNumbersAt**********************/
            if (startPageNumbersFrom < 1)
            {
                startPageNumbersFrom = 1;

                //As page numbers are starting at one, output an even number of pages.  
                stopPageNumbersAt = pagesToOutput;
            }

            if (stopPageNumbersAt > pageCount)
            {
                stopPageNumbersAt = pageCount;
            }

            if ((stopPageNumbersAt - startPageNumbersFrom) < pagesToOutput)
            {
                startPageNumbersFrom = stopPageNumbersAt - pagesToOutput;
                if (startPageNumbersFrom < 1)
                {
                    startPageNumbersFrom = 1;
                }
            }
            /******************End: Xác định startPageNumbersFrom & stopPageNumbersAt**********************/

            //Các dấu ... chỉ những trang phía trước  
            if (startPageNumbersFrom > 1)
            {
                output.Append("<li class=\"pagerange\"><a href=\"" + string.Format(GetPageUrl(currentPage - 1, pageUrl), startPageNumbersFrom - 1) + "#" + id + "\">&hellip;</a></li>");
            }

            //Duyệt vòng for hiển thị các trang
            for (int i = startPageNumbersFrom; i <= stopPageNumbersAt; i++)
            {
                if (currentPage == i)
                {
                    output.Append("<li class=\"selected\">" + i.ToString() + "</li>");
                }
                else
                {
                    output.Append("<li><a href=\"" + string.Format(pageUrl, i) + "#" + id + "\">" + i.ToString() + "</a></li>");
                }
            }

            //Các dấu ... chỉ những trang tiếp theo  
            if (stopPageNumbersAt < pageCount)
            {
                output.Append("<li class=\"pagerange\"><a href=\"" + string.Format(pageUrl, stopPageNumbersAt + 1) + "#" + id + "\">&hellip;</a></li>");
            }

            //Link Next(Trang tiếp) và Last(Trang cuối)
            if (currentPage != pageCount)
            {
                output.Append("<li class=\"button\"><a title=\"" + strText[2] + "\" href=\"" + string.Format(pageUrl, currentPage + 1) + "#" + id + "\">&raquo;</a></li>");
                output.Append("<li class=\"button\"><a title=\"" + strText[3] + "\" href=\"" + string.Format(pageUrl, pageCount) + "#" + id + "\">&raquo;&raquo;</a></li>");
            }
            output.Append("</ul>");
            output.Append("</div>");
            return output.ToString();
        }

        /// <summary>  
        /// Trả về Url trang
        /// </summary>  
        /// <param name="currentPage"></param>  
        /// <param name="pageUrl">pageUrl = Context.Request.RawUrl;</param>  
        /// <returns></returns>  
        private static string GetPageUrl(int currentPage, string pageUrl)
        {
            pageUrl = Regex.Replace(pageUrl, "(\\?|\\&)*" + "Page=" + currentPage, "");
            if (pageUrl.IndexOf("?") > 0)
            {
                pageUrl += "&Page={0}";
            }
            else
            {
                pageUrl += "?Page={0}";
            }
            return pageUrl;
        }

        /// <summary>
        /// Lấy chuỗi phân trang Top Product
        /// </summary>
        /// <param name="ShowID">=3:Top SP hot</param>
        /// <param name="PagesToOutput">Số trang hiển thị trong chuỗi phân trang</param>
        /// <param name="CurrentPage">Trang hiện tại</param>
        /// <param name="PageCount">Tổng số trang khi phân trang</param>
        /// <param name="PageSize">Kích thước số SP trong 1 trang</param>
        /// <param name="strText">Chuỗi "First, Previous, Next Last"</param>
        /// <returns></returns>
        public static string GetHtmlPagingForAjaxTopProduct(int ShowID, int PagesToOutput, int CurrentPage, int PageCount, int PageSize, string[] strText, string Lang)
        {
            //Nếu Số trang hiển thị là số lẻ thì tăng thêm 1 thành chẵn
            if (PagesToOutput % 2 != 0)
            {
                PagesToOutput++;
            }

            //Một nửa số trang để đầu ra, đây là số lượng hai bên.
            int PagesToOutputHalfed = PagesToOutput / 2;

            //Trang đầu tiên
            int startPageNumbersFrom = CurrentPage - PagesToOutputHalfed;
            //Trang cuối cùng
            int stopPageNumbersAt = CurrentPage + PagesToOutputHalfed;

            StringBuilder output = new StringBuilder();

            //Nối chuỗi phân trang
            output.Append("<div class=\"paging\">");
            output.Append("<ul>");

            //Link First(Trang đầu) và Previous(Trang trước)
            if (CurrentPage > 1)
            {
                output.Append("<li class=\"button\"><a title=\"" + strText[0] + "\" href=\"" + "javascript:AjaxPagingTopProduct(" + ShowID + ", " + PageSize + ", 1, " + PagesToOutput + ", " + PageCount + ", '" + Lang + "')" + "\">&laquo;&laquo;</a></li>");
                output.Append("<li class=\"button\"><a title=\"" + strText[1] + "\" href=\"" + "javascript:AjaxPagingTopProduct(" + ShowID + ", " + PageSize + ", " + Convert.ToString(CurrentPage - 1) + ", " + PagesToOutput + ", " + PageCount + ", '" + Lang + "')" + "\">&laquo;</a></li>");
            }

            /******************Xác định startPageNumbersFrom & stopPageNumbersAt**********************/
            if (startPageNumbersFrom < 1)
            {
                startPageNumbersFrom = 1;
                stopPageNumbersAt = PagesToOutput;
            }

            if (stopPageNumbersAt > PageCount)
            {
                stopPageNumbersAt = PageCount;
            }

            if ((stopPageNumbersAt - startPageNumbersFrom) < PagesToOutput)
            {
                startPageNumbersFrom = stopPageNumbersAt - PagesToOutput;
                if (startPageNumbersFrom < 1)
                {
                    startPageNumbersFrom = 1;
                }
            }
            /******************End: Xác định startPageNumbersFrom & stopPageNumbersAt**********************/

            //Duyệt vòng for hiển thị các trang
            for (int i = startPageNumbersFrom; i <= stopPageNumbersAt; i++)
            {
                if (CurrentPage == i)
                {
                    output.Append("<li class=\"selected\">" + i.ToString() + "</li>");
                }
                else
                {
                    output.Append("<li><a href=\"" + "javascript:AjaxPagingTopProduct(" + ShowID + ", " + PageSize + ", " + i + ", " + PagesToOutput + ", " + PageCount + ", '" + Lang + "')" + "\">" + i.ToString() + "</a></li>");
                }
            }

            //Link Next(Trang tiếp) và Last(Trang cuối)
            if (CurrentPage != PageCount)
            {
                output.Append("<li class=\"button\"><a title=\"" + strText[2] + "\" href=\"" + "javascript:AjaxPagingTopProduct(" + ShowID + ", " + PageSize + ", " + Convert.ToString(CurrentPage + 1) + ", " + PagesToOutput + ", " + PageCount + ", '" + Lang + "')" + "\">&raquo;</a></li>");
                output.Append("<li class=\"button\"><a title=\"" + strText[3] + "\" href=\"" + "javascript:AjaxPagingTopProduct(" + ShowID + ", " + PageSize + ", " + PageCount + ", " + PagesToOutput + ", " + PageCount + ", '" + Lang + "')" + "\">&raquo;&raquo;</a></li>");
            }
            output.Append("</ul>");
            output.Append("</div>");
            return output.ToString();
        }

        /// <summary>
        /// Trả về 6 ký tự ngẫu nhiên
        /// </summary>
        /// <returns></returns>
        public static string GenerateRandomCode()
        {
            Random random = new Random();
            string s = "";
            for (int i = 0; i < 6; i++)
                s = String.Concat(s, random.Next(10).ToString());
            return s;
        }

        public static string GetLang()
        {
            string Lang = GetStringFromQueryString("Lang");
            OtherFunctions obj = new OtherFunctions();
            if (obj.IsHaveLanguage(Lang, AgentCatID) == false)
                Lang = DefaultLang;
            return Lang;
        }

        public static void BindLanguageToDDL(DropDownList ddlLanguage)
        {
            ddlLanguage.Items.Insert(0, new ListItem("Tiếng Việt", "VI"));
            ddlLanguage.Items.Insert(1, new ListItem("Tiếng Anh", "EN"));
            //ddlLanguage.Items.Insert(2, new ListItem("Tiếng Trung", "ZH"));
            ddlLanguage.Items.Insert(2, new ListItem("Tiếng Thổ Nhĩ Kỳ", "TR"));
            ddlLanguage.SelectedValue = DefaultLang;
            //ddlLanguage.Enabled = false;
        }

        /// <summary>
        /// Quản lý File Upload (mọi loại file)
        /// </summary>
        /// <param name="fileUpload">FileUploaderAJAX object</param>
        /// <param name="f">true: Đổi tên file theo thời gian upload, false: lấy tên file gốc</param>
        /// <returns></returns>
        public static string ProcessFileUpload(FileUploaderAJAX fileUpload, bool f)
        {
            string FileName = "";
            try
            {
                HttpPostedFileAJAX pf = fileUpload.PostedFile;
                int index = pf.ContentType.IndexOf("/");
                string strExtension = pf.ContentType.Substring(index + 1);
                if (strExtension == "pjpeg" || strExtension == "jpeg" || strExtension == "jpg")
                    strExtension = "jpg";
                if (f == false)
                    FileName = pf.FileName;
                else if (f == true)
                    FileName = Globals.GetFileName() + "." + strExtension;
                fileUpload.SaveAs(Globals.GetUploadsUrl() + FileName);
            }
            catch { }
            return FileName;
        }

        /// <summary>
        /// Đổi sang chuỗi tiền việt (vd: 30 tỷ, 350 triệu)
        /// </summary>
        /// <param name="Price">số tiền</param>
        /// <param name="Currency">tiền tệ (VND, USD, SJC)</param>
        /// <param name="PriceType">PriceType=PriceByM2: có chữ "/m2"(mét vuông)</param>
        /// <returns></returns>
        public static string ConvertToStringVND(double Price, string Currency, double RateUSD, double RateSJC, string PriceType)
        {
            string strPriceVND = "";
            double PriceVND = 0;
            if (Currency == "VND")
                PriceVND = Price;
            else if (Currency == "USD")
                PriceVND = Price * RateUSD;
            else if (Currency == "SJC")
                PriceVND = Price * RateSJC;

            double n = PriceVND / 1000000000;
            if (n < 1) //tức là chưa đến 1 tỷ VND đó mà!
            {
                n = Math.Round(PriceVND / 1000000, 2);
                if (PriceType == "PriceByM2")
                    strPriceVND = String.Format("{0:0,0}", n) + " triệu/m<sup>2</sup>";
                else
                    strPriceVND = String.Format("{0:0,0}", n) + " triệu";
            }
            else
            {
                n = Math.Round(n, 2);
                if (PriceType == "PriceByM2")
                    strPriceVND = n.ToString() + " tỷ/m<sup>2</sup>";
                else
                    strPriceVND = n.ToString() + " tỷ";
            }
            return strPriceVND;
        }

        public static string ConvertToStringUSD(double Price, string Currency, double RateUSD, double RateSJC, string PriceType)
        {
            string strPriceUSD = "";
            double PriceUSD = 0;
            if (Currency == "VND")
                PriceUSD = Price / RateUSD;
            else if (Currency == "USD")
                PriceUSD = Price;
            else if (Currency == "SJC")
                PriceUSD = (Price * RateSJC) / RateUSD;

            strPriceUSD = String.Format("{0:0,0}", Math.Round(PriceUSD, 2)) + " USD";
            if (PriceType == "PriceByM2")
                strPriceUSD += "/m<sup>2</sup>";
            return strPriceUSD;
        }

        public static string ConvertToStringSJC(double Price, string Currency, double RateUSD, double RateSJC, string PriceType)
        {
            RateSJC = RateSJC * 1000;
            string strPriceSJC = "";
            double PriceSJC = 0;
            if (Currency == "VND")
                PriceSJC = Price / RateSJC;
            else if (Currency == "USD")
                PriceSJC = (Price * RateUSD) / RateSJC;
            else if (Currency == "SJC")
                PriceSJC = Price;

            strPriceSJC = String.Format("{0:0,0.00}", Math.Round(PriceSJC, 2)) + " lượng";
            if (PriceType == "PriceByM2")
                strPriceSJC += "/m<sup>2</sup>";
            return strPriceSJC;
        }

        public static string FormatStringThousand(object obj)
        {
            return String.Format("{0:0,0}", obj);
        }

        /// <summary>
        /// Lấy thông tin HTML từ 1 website
        /// </summary>
        /// <param name="url">Địa chỉ web cần lấy HTML (http://www.sacombank-sbj.com/service/tygiatrongnuoc.ashx?d=2010-05-21)</param>
        /// <returns></returns>
        public static string GetHtmlFromUrl(string url)
        {
            if (string.IsNullOrEmpty(url))
                throw new ArgumentNullException("url", "Parameter is null or empty");

            string html = "";
            //HttpWebRequest request = GenerateHttpWebRequest(url);
            WebRequest request = WebRequest.Create(url);
            // If required by the server, set the credentials.
            //request.Credentials = CredentialCache.DefaultCredentials;
            //request.Timeout = 8000;
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusDescription == "OK")
                {
                    Stream responseStream = response.GetResponseStream();
                    using (StreamReader reader = new StreamReader(responseStream, Encoding.UTF8))
                    {
                        html = reader.ReadToEnd();
                    }
                }
                else
                {
                    html = "error";
                }
            }
            catch
            {
                // Response.Write("Xin lỗi hiện tại hệ thống không kết nối được với máy chủ cung cấp tin tức.");
            }
            return html;
        }//Get code html
    }
}
