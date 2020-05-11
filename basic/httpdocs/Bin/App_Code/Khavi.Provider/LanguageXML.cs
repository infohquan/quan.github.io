using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using Khavi.Web.Assistant;

namespace Khavi.Provider
{
    /// <summary>
    /// Quản lí đa ngôn ngữ dùng XML.
    /// </summary>
    public class LanguageXML
    {
        protected XmlDataDocument X;

        public LanguageXML() { }

        /// <summary>
        /// Khởi tạo file ngôn ngữ xml
        /// </summary>
        /// <param name="FileName">Nhập tên file(ko có đuôi .xml)</param>
        public LanguageXML(String FileName)
        {
            String Name = Globals.GetPhysicalUploadsUrl() + "/LanguageFiles/" + FileName + ".xml";
            X = new XmlDataDocument();
            X.Load(Name);
        }

        /// <summary>
        /// Lấy thông tin từ file xml
        /// </summary>
        /// <param name="Zone">"Admin": cho phần quản trị site, "Web": cho phần web bên ngoài</param>
        /// <param name="Component">Node cha của các node có tên là Name, VD:"MenuLeft",...</param>
        /// <param name="Name">Tên node chứa giá trị text cần lấy của file xml</param>
        /// <returns></returns>
        public String GetString(String Zone, String Component ,String Name)
        {
            string value = "";
            try
            {
                XmlNode node;
                node = X.SelectSingleNode("//KhaviCMS/" + Zone + "/" + Component + "/" + Name);
                if (node == null) return "";
                else
                {
                    value = node.InnerXml.ToString();
                }
            }
            catch (System.Xml.XPath.XPathException)
            {
                value = "";
            }
            return value;
        }

        /// <summary>
        /// Lấy giá trị củ node trong file xml. Giống method GetString() nhưng method này là static
        /// </summary>
        /// <param name="FileName">Nhập tên file(ko có đuôi .xml)</param>
        /// <param name="Zone">"Admin": cho phần quản trị site, "Web": cho phần web bên ngoài</param>
        /// <param name="Component">Node cha của các node có tên là Name, VD:"MenuLeft",...</param>
        /// <param name="Name">Tên node chứa giá trị text cần lấy của file xml</param>
        /// <returns></returns>
        public static String GetValueNode(String FileName, String Zone, String Component ,String Name)
        {
            XmlDataDocument xmlDataDoc = new XmlDataDocument();
            String XmlFileName = Globals.GetPhysicalUploadsUrl() + "/LanguageFiles/" + FileName + ".xml";
            xmlDataDoc.Load(XmlFileName);
            XmlNode node = xmlDataDoc.SelectSingleNode("//KhaviCMS/" + Zone + "/" + Component + "/" + Name);
            if (node == null) return "";
            else
            {
                string value = node.InnerXml.ToString();
                return value;
            }
        }

        public static String GetValue(String Lang, String Zone, String Component, String Name)
        {
            XmlDataDocument xmlDataDoc = new XmlDataDocument();
            String XmlFileName = Globals.GetPhysicalUploadsUrl() + "/LanguageFiles/Language" + Lang + ".xml";
            xmlDataDoc.Load(XmlFileName);
            XmlNode node = xmlDataDoc.SelectSingleNode("//KhaviCMS/" + Zone + "/" + Component + "/" + Name);
            if (node == null) return "";
            else
            {
                string value = node.InnerXml.ToString();
                return value;
            }
        }
    }
}
