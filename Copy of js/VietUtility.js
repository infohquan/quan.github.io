// JScript File: VietUtility
// Description:  Implement some method in Javascript
// Coder:        David Viet

function GetObjectById(Id)
{
    return document.getElementById(Id);
}
//Lấy tham số trên địa chỉ trang web
function GetURLParam(strParamName)
{
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 )
  {
    var strQueryString = strHref.substr(strHref.indexOf("?"));
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ )
    {
      if (aQueryString[iParam].indexOf(strParamName + "=") > -1 )
      {
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
}
//Làm nổi bật 1 dòng GridView
function ActiveRow(row, highlight)   
{   
   if (highlight)   
   {   
       /* row.style.cursor = "hand";  row.style.backgroundColor = '#87cefa';   */
       row.className = "gvSelectedRow";
   }   
   else   
       row.className = "gvUnSelectedRow";
}
function IsEmail(str) 
{
    var at="@"
    var dot="."
    var lat=str.indexOf(at)
    var lstr=str.length
    var ldot=str.indexOf(dot)
    if (str.indexOf(at)==-1){	   
       return false
    }
    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){	   
       return false
    }
    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){	    
        return false
    }
    if (str.indexOf(at,(lat+1))!=-1){	    
        return false
    }
    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){	    
        return false
    }
    if (str.indexOf(dot,(lat+2))==-1){	    
        return false
    }	
    if (str.indexOf(" ")!=-1){	    
        return false
    }

    return true					
}

function GoToPage(pagename)
{
    var Lang = GetURLParam('Lang');
    window.location.href = pagename + '?Lang=' + Lang;
}
