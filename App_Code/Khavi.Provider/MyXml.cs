using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Xml;

namespace Khavi.Provider
{
    public class MyXml
    {
        private const String FileExtension = ".xml";
        //private String Path = Globals.GetPhysicalUploadsUrl() + "XmlFiles/Products/";
        private String Path = "XmlFiles/Products/";
        /// <summary>
        /// Tạo file xml
        /// </summary>
        /// <param name="FileName">Tên file (không có phần mở rộng)</param>
        /// <param name="Element">Mảng tên các node (Chính là các field trong Database)</param>
        /// <param name="Value">Mảng các giá trị tương ứng cho mảng Element. Hai mảng Element và Value phải cùng kích thước</param>
        /// <param name="Action">Tùy theo tạo file xml cho chức năng nào: Product, Article, ProductCatalog...</param>
        public void CreateFile(string FileName, string[] Element, string[] Value, string Action)
        {            
            XmlDocument xmlDoc = new XmlDocument();
            try
            {
                string FileUrl = Path + FileName + FileExtension;
                int ElementSize = Element.Length;
                try
                {
                    xmlDoc.Load(FileUrl);
                }
                catch (System.IO.FileNotFoundException)
                {
                    XmlTextWriter xmlWriter = new XmlTextWriter(FileUrl, System.Text.Encoding.UTF8);
                    xmlWriter.Formatting = Formatting.Indented;
                    xmlWriter.WriteProcessingInstruction("xml", "version='1.0' encoding='UTF-8'");
                    xmlWriter.WriteStartElement("Root");

                    xmlWriter.Close();
                    xmlDoc.Load(FileUrl);
                }
                XmlNode root = xmlDoc.DocumentElement;                
                XmlElement[] xmlElement = new XmlElement[ElementSize];
                XmlText[] textNode = new XmlText[ElementSize];

                //ActionNode là node Product, Article, ProductCatalog... trong file .xml
                XmlElement ActionNode = xmlDoc.CreateElement(Action);
                root.AppendChild(ActionNode);
                for (int i = 0; i < ElementSize; i++)
                {
                    xmlElement[i] = xmlDoc.CreateElement(Element[i]);
                    textNode[i] = xmlDoc.CreateTextNode(Value[i]);
                    ActionNode.AppendChild(xmlElement[i]);
                    xmlElement[i].AppendChild(textNode[i]);
                }
                xmlDoc.Save(FileUrl);
            }
            catch { }
        }
    }
}
