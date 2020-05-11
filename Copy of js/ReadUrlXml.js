

/*****************************************************************************************
FileUrl:        http://localhost:51085/Shoes_Com/Ajax/GetDetailProduct.aspx?ProductID=2
Zone:           "detailproduct"  (rootnode)
Component:      "product"  (node level 1)
TagName:        "id or name,..."  (node level 2)
*****************************************************************************************/
function GetXmlNodeContent(FileUrl, Zone, Component, TagName)
{
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
    xmlDoc.load(FileUrl);
    var zone = xmlDoc.getElementsByTagName(Zone)[0]; 
	var component = zone.getElementsByTagName(Component);
	
	var tagname = component[0].getElementsByTagName(TagName);
	var value = '';
	value += tagname[0].firstChild.nodeValue;	
	return value;
}