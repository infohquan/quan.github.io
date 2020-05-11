using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Security.Cryptography;

namespace Khavi.Provider
{
    public class Security
    {
        private String keyValue = "CMS";
        public Security() { }   //Constructor
        public String Key
        {
            set { keyValue = value; }
            get { return keyValue; }
        }
        /// <summary>
        /// Mã hóa mật khẩu
        /// </summary>
        /// <param name="password">Mật khẩu</param>
        /// <returns>Trả về 1 chuỗi mật khẩu đã được mã hóa</returns>
        public String EncodePassword(String password)
        {
            String encryptPassword = password + keyValue;
            byte[] passwordBytes = Encoding.UTF8.GetBytes(encryptPassword);

            HashAlgorithm hash = new MD5CryptoServiceProvider();
            byte[] hashBytes = hash.ComputeHash(passwordBytes);

            encryptPassword = Convert.ToBase64String(passwordBytes);
            
            return encryptPassword;
        }
        /// <summary>
        /// Giải mả mật khẩu
        /// </summary>
        /// <param name="password">Chuỗi mật khẩu cần giải mã</param>
        /// <returns>Mật khẩu ban đầu</returns>
        public String DecodePassword(String password)
        {
            String originalPassword = "";   //Mật khẩu ban đầu
            byte[] inputByteArray = Convert.FromBase64String(password);

            originalPassword = Encoding.UTF8.GetString(inputByteArray);
            //Bỏ key value đi
            originalPassword = originalPassword.Substring(0,originalPassword.Length - keyValue.Length);
            return originalPassword;
        }
        /// <summary>
        /// Phương thức này vừa mã hóa, vừa giải mã mật khẩu luôn (sử dụng trong web CMS này)
        /// </summary>
        /// <param name="password">Mật khẩu</param>
        /// <returns></returns>
        public static String PasswordEncoder(String password)
        {
            return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(password, "MD5");
        }
    }
}
