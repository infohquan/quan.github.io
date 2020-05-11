using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Xml;

namespace Khavi.Provider
{
    public class XmlReader
    {
        /// <summary>
        /// Lấy giá trị của 1 thuộc tính trong file xml, Đọc file xml có format như http://www.vietcombank.com.vn/ExchangeRates/ExrateXML.aspx
        /// </summary>
        /// <param name="url">Url file xml</param>
        /// <param name="nameToCompare">Tên của thuộc tính so sánh</param>
        /// <param name="valueToCompare">Giá trị thuộc tính so sánh</param>
        /// <param name="nameToGetValue">Tên của thuộc tính cần lấy giá trị</param>
        public string ReadXmlFromUrl(string url, string nameToCompare, string valueToCompare, string nameToGetValue)
        {
            XmlTextReader reader = new XmlTextReader(url);
            int i = 0;
            string sReturn = "";
            while (reader.Read())
            {
                if (reader[nameToCompare] == valueToCompare)
                {
                    sReturn = reader[nameToGetValue];
                    break;
                }
                i++;
                
            }
            reader.Close();
            return sReturn;
        }

        /// <summary>
        /// Đọc giá trị của 1 thuộc tính trong file xml dạng http://www.vietcombank.com.vn/ExchangeRates/ExrateXML.aspx
        /// </summary>
        /// <param name="url">Url file xml</param>
        /// <param name="tagName">Tên tag xml cần đọc</param>
        /// <param name="attributeName">Attribute cần lấy giá trị</param>
        /// <param name="i">Thứ tự của hàng có tagName trong file xml(tính từ 0)</param>
        /// <returns></returns>
        public string ReadValueOfAttribute(string url, string tagName, string attributeName, int i)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(url);
            XmlNodeList nodeList = doc.GetElementsByTagName(tagName);
            string s = nodeList[i].Attributes[attributeName].Value;
            return s;
        }
    }
}
