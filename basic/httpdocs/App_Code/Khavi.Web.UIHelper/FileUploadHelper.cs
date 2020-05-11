using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Khavi.Web.Assistant;

namespace Khavi.Web.UIHelper
{
    public class FileUploadHelper
    {
        private String strImagePath = "";

        /// <summary>
        /// Khởi tạo đường dẫn để lưu file lên server
        /// </summary>
        /// <param name="ActionUpload"></param>
        private void Init(String ActionUpload)
        {
            if (ActionUpload == "Products")
            {
                strImagePath = Globals.GetPhysicalUploadsUrl() + "ImageFiles/Products/";
            }
            else if (ActionUpload == "Producers")
            {
                strImagePath = Globals.GetPhysicalUploadsUrl() + "ImageFiles/Producers/";
            }
            else if (ActionUpload == "ProductCatalogs")
            {
                strImagePath = Globals.GetPhysicalUploadsUrl() + "ImageFiles/ProductCatalogs/";
            }
            else if (ActionUpload == "Languages")
            {
                strImagePath = Globals.GetPhysicalUploadsUrl() + "ImageFiles/Languages/";
            }
            else if (ActionUpload == "Links")
            {
                strImagePath = Globals.GetPhysicalUploadsUrl() + "ImageFiles/Links/";
            }
        }

        /// <summary>
        /// Xử lý upload hình ảnh
        /// </summary>
        /// <param name="fileupload"></param>
        /// <param name="ActionUpload"></param>
        /// <returns>Trả về tên file ảnh có đuôi mở rộng</returns>
        public String Process(FileUpload fileupload, String ActionUpload)
        {
            String fileSaveServer = "";
            Init(ActionUpload);

            HttpPostedFile myFile = fileupload.PostedFile;
            double nFileLength = myFile.ContentLength;
            nFileLength = nFileLength / 1024f;
            try
            {
                if (nFileLength < 300 && nFileLength > 0)
                {
                    fileSaveServer = Globals.GetFileName();
                    //lấy chuỗi mở rộng của file
                    String strExtension = System.IO.Path.GetExtension(myFile.FileName);
                    fileSaveServer = fileSaveServer + strExtension;

                    //save file len server
                    fileupload.PostedFile.SaveAs(strImagePath + fileSaveServer);
                }
                else if (nFileLength == 0)
                {
                    MessageBox.Show("Bạn chưa chọn hình để upload!");
                }
            }
            catch
            {
                MessageBox.Show("Vui lòng chọn hình có dung lượng < 300KB để upload!");
            }
            return fileSaveServer;
        }

        /// <summary>
        /// Xử lý upload nhiều hình ảnh cùng lúc
        /// </summary>
        /// <param name="fileupload"></param>
        /// <param name="ActionUpload"></param>
        /// <param name="Choice">1:Tên file up lên giống như tên file chọn, 2:Tự động đặt tên file up lên theo thời gian</param>
        /// <returns></returns>
        public String Process(FileUpload fileupload, String ActionUpload, Int32 Choice)
        {
            String fileSaveServer = "";
            Init(ActionUpload);
            HttpPostedFile myFile = fileupload.PostedFile;
            double nFileLength = myFile.ContentLength;
            nFileLength = nFileLength / 1024f;
            try
            {
                if (nFileLength < 300 && nFileLength > 0)
                {
                    //Không lấy tên file theo ngày giờ, mà lấy đúng tên file up lên(có luôn đuôi mở rộng)
                    if (Choice == 1)
                        fileSaveServer = System.IO.Path.GetFileName(myFile.FileName);
                    else if (Choice == 2)
                    {
                        fileSaveServer = Globals.GetFileName();
                        //lấy chuỗi mở rộng của file
                        String strExtension = System.IO.Path.GetExtension(myFile.FileName);
                        fileSaveServer = fileSaveServer + strExtension;
                    }
                    //save file len server
                    fileupload.PostedFile.SaveAs(strImagePath + fileSaveServer);
                }
            }
            catch
            {
                MessageBox.Show("Vui lòng chọn hình có dung lượng < 300KB để upload!");
            }
            return fileSaveServer;
        }
    }
}
