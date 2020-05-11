//  File:   ReadLanguageXml.js
//  Đọc file xml ngôn ngữ và điền vào javascript các text tương ứng

//var domain = 'http://localhost/Shoes_Com';         //sau này là http://www.yoursite.com
var domain = 'http://raovatso.vn';

var xmlDoc;
if (window.ActiveXObject)   //IE
{
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
}
else if (document.implementation && document.implementation.createDocument)     //FireFox
{
    xmlDoc = document.implementation.createDocument("","doc",null);
}

xmlDoc.async=false;
//Biến LangCode đã khai báo trong script của file Default.aspx(Trang chủ) & AdminControlPanel.aspx(phần Admin)
//xmlDoc.load("Cache/Uploads/LanguageFiles/Language" + LangCode + ".xml");
xmlDoc.load(domain + '/Cache/Uploads/LanguageFiles/Language' + LangCode + '.xml');

function GetValueNode(Zone, Component, TagName)
{
    var zone = xmlDoc.getElementsByTagName(Zone)[0]; 
	var component = zone.getElementsByTagName(Component);
	
	var tagname = component[0].getElementsByTagName(TagName);
	var value = '';
	value += tagname[0].firstChild.nodeValue;	
	return value;
}
