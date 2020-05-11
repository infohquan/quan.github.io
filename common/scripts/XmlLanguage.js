//  File:   ReadLanguageXml.js
//  Đọc file xml ngôn ngữ và điền vào javascript các text tương ứng

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
xmlDoc.load(domain + '/Cache/Uploads/LanguageFiles/Language' + getLang() + '.xml');

function GetValueNode(Zone, Component, TagName)
{
    var zone = xmlDoc.getElementsByTagName(Zone)[0]; 
	var component = zone.getElementsByTagName(Component);
	
	var tagname = component[0].getElementsByTagName(TagName);
	var value = '';
	value += tagname[0].firstChild.nodeValue;	
	return value;
}
