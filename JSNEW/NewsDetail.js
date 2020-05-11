var GetPrice="";
var mText = "";
var sTimeCache = 14400;
var _d = (new Date()).getTime()+ sTimeCache;
function ShowFormSendMailFriend(id)
{
	var act = "act=ShowFormSendMailFriend_NewsDetail";
	act+="&id="+id;
	var url = pathClientAjax+"handler/Misc.aspx?"+ act ;
	$.get(url, 
			function(data) {
			    $('#login_box').html(data);
			    $("#login_box").centerInClient();
				$('#login_box').show();
				}
		);
}
function SendNewsToFriend(id)
{
	if($("#From").val()=="" || ($("#From").val()!="" && !isEmail($("#From").val())))
	{
		alert("Email người gửi không được rỗng hoặc sai định dạng!");
		$("#From").focus();
		return false;	
	}
	else if($("#To").val()=="" || ($("#To").val()!="" && !isEmail($("#To").val())))
	{
		alert("Email người nhận không được rỗng hoặc sai định dạng!");
		$("#To").focus();
		return false;	
	}
	else if($("#Content").val()=="")
	{
		alert("Vui lòng nhập nội dung!");
		$("#Content").focus();
		return false;
	}
	var _____url=pathClient+"SendNewsToFriend.aspx@id="+id+"&from="+$('#From').val()+"&to="+$('#To').val()+"&content="+encodeURI($('#Content').val());
	$.get(_____url, 
			function(data) {
				alert("Gửi Email thành công!");
				$('#login_box').hide();
				}
		);
}
function isWhitespace (s)
{   
	var whitespace = " \t\n\r";
	var i;

  if (isEmpty(s)) return true;
  for (i = 0; i < s.length; i++)
  {   
    var c = s.charAt(i);
    if (whitespace.indexOf(c) == -1) return false;
  }
  return true;
}

function isEmpty(s)
{   
	return ((s == null) || (s.length == 0))
}

function isEmail (s)
{   
	if (isEmpty(s)) 
		if (isEmail.arguments.length == 1) return false;
		else return (isEmail.arguments[1] == true);
		
  if (isWhitespace(s)) return false;
  
  var i = 1;
  var sLength = s.length;

  while ((i < sLength) && (s.charAt(i) != "@"))
  { i++
  }

  if ((i >= sLength) || (s.charAt(i) != "@")) return false;
  else i += 2;

  while ((i < sLength) && (s.charAt(i) != "."))
  { i++
  }
  		
	/*if ((s.indexOf(".com")<5)&&(s.indexOf(".org")<5)
		&&(s.indexOf(".gov")<5)&&(s.indexOf(".net")<5)
		&&(s.indexOf(".mil")<5)&&(s.indexOf(".edu")<5))
	{
		return false;
	}*/

  if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
  else return true;
}