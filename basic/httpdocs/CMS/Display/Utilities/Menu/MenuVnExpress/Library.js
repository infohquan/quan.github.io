var fBrw=(navigator.userAgent.indexOf('MSIE')!= -1 && navigator.userAgent.indexOf('Windows')!= -1);
var RefVal0 = new Array(); var RefVal1 = new Array(); var RefVal2 = new Array(); var RefVal3 = new Array(); 
var RefVal4 = new Array(); var RefVal5 = new Array(); var RefVal6 = new Array(); var RefVal7 = new Array(); 
var RefVal8 = new Array(); var RefVal9 = new Array(); var RefVal10 = new Array(); var RefVal11 = new Array(); 
var RefVal12 = new Array(); var RefVal13 = new Array(); var RefVal14 = new Array(); var RefVal15 = new Array(); 
var RefVal16 = new Array(); var RefVal17 = new Array(); var RefVal18 = new Array(); var RefVal19 = new Array();

if (typeof(PageHost) == 'undefined') var PageHost = '';

function toUpper(sInput){
	sInput=sInput.toUpperCase()
	var sOutput='',sTemp;
	var i=0, j=0;
	for (var i=0;i<sInput.length;i++){
		if (sInput.charAt(i)+sInput.charAt(i+1)=='&#'){
			sTemp=sInput.substring(i+2,sInput.length);
			j=sTemp.indexOf(';');
			if (j>4){
				sOutput+=sInput.charAt(i);					
			}
			else{
				sTemp=sTemp.substring(0,j)
				switch(sTemp){
					case '225': {sOutput+='&#193;';break;}		//a'
					case '224': {sOutput+='&#192;';break;}		//a`
					case '7843': {sOutput+='&#7842;';break;}	//a?
					case '227': {sOutput+='&#195;';break;}		//a~
					case '7841': {sOutput+='&#7840;';break;}	//a.
					case '226': {sOutput+='&#194;';break;}		//a^
					case '7845': {sOutput+='&#7844;';break;}	//a^'
					case '7847': {sOutput+='&#7846;';break;}	//a^`
					case '7849': {sOutput+='&#7848;';break;}	//a^?
					case '7851': {sOutput+='&#7850;';break;}	//a^~
					case '7853': {sOutput+='&#7852;';break;}	//a^.
					case '259': {sOutput+='&#258;';break;}		//a(
					case '7855': {sOutput+='&#7854;';break;}	//a('
					case '7857': {sOutput+='&#7856;';break;}	//a(`
					case '7859': {sOutput+='&#7858;';break;}	//a(?
					case '7861': {sOutput+='&#7860;';break;}	//a(~
					case '7863': {sOutput+='&#7862;';break;}	//a(.
					case '273': {sOutput+='&#272;';break;}		//dd
					case '233': {sOutput+='&#201;';break;}		//e'
					case '232': {sOutput+='&#200;';break;}		//e`
					case '7867': {sOutput+='&#7866;';break;}	//e?
					case '7869': {sOutput+='&#7868;';break;}	//e~
					case '7865': {sOutput+='&#7864;';break;}	//e.
					case '234': {sOutput+='&#202;';break;}		//e^
					case '7871': {sOutput+='&#7870;';break;}	//e^'
					case '7873': {sOutput+='&#7872;';break;}	//e^`
					case '7875': {sOutput+='&#7874;';break;}	//e^?
					case '7877': {sOutput+='&#7876;';break;}	//e^~
					case '7879': {sOutput+='&#7878;';break;}	//e^.
					case '237': {sOutput+='&#205;';break;}		//i'
					case '236': {sOutput+='&#204;';break;}		//i`
					case '7881': {sOutput+='&#7880;';break;}	//i?
					case '297': {sOutput+='&#296;';break;}		//i~
					case '7883': {sOutput+='&#7882;';break;}	//i.
					case '243': {sOutput+='&#211;';break;}		//o'
					case '242': {sOutput+='&#210;';break;}		//i`
					case '7887': {sOutput+='&#7886;';break;}	//o?
					case '245': {sOutput+='&#213;';break;}		//o~
					case '7885': {sOutput+='&#7884;';break;}	//o.
					case '244': {sOutput+='&#212;';break;}		//o^
					case '7889': {sOutput+='&#7888;';break;}	//o^'
					case '7891': {sOutput+='&#7890;';break;}	//o^`
					case '7893': {sOutput+='&#7892;';break;}	//o^?
					case '7895': {sOutput+='&#7894;';break;}	//o^~
					case '7897': {sOutput+='&#7896;';break;}	//o^.
					case '417': {sOutput+='&#416;';break;}		//o*
					case '7899': {sOutput+='&#7898;';break;}	//o*'
					case '7901': {sOutput+='&#7900;';break;}	//o*`
					case '7903': {sOutput+='&#7902;';break;}	//o*?
					case '7905': {sOutput+='&#7904;';break;}	//o*~
					case '7907': {sOutput+='&#7906;';break;}	//o*.
					case '250': {sOutput+='&#218;';break;}		//u'
					case '249': {sOutput+='&#217;';break;}		//u`
					case '7911': {sOutput+='&#7910;';break;}	//u?
					case '361': {sOutput+='&#360;';break;}		//u~
					case '7909': {sOutput+='&#7908;';break;}	//u.
					case '432': {sOutput+='&#431;';break;}		//u*
					case '7913': {sOutput+='&#7912;';break;}	//u*'
					case '7915': {sOutput+='&#7914;';break;}	//u*`
					case '7917': {sOutput+='&#7916;';break;}	//u*?
					case '7919': {sOutput+='&#7918;';break;}	//u*~
					case '7921': {sOutput+='&#7920;';break;}	//u*.
					case '253': {sOutput+='&#221;';break;}		//y'
					case '7923': {sOutput+='&#7922;';break;}	//y`
					case '7927': {sOutput+='&#7926;';break;}	//y?
					case '7929': {sOutput+='&#7928;';break;}	//y~
					case '7925': {sOutput+='&#7924;';break;}	//y.
					default: {sOutput+='&#'+sTemp+';';break;}
				}
				i+=j+2;
			}
		}
		else{
			sOutput+=sInput.charAt(i);
		}
	}
	return sOutput;
}

function setCookie(Name, Path, Expires, Value)
{
	var cstr = Name.concat('=').concat(Value);	
	if(Path=='')
		Path = '/';
	cstr=cstr.concat(';path=').concat(Path);
	if(Expires=='')
		Expires=(new Date(2020,11,14)).toGMTString();
	document.cookie=cstr.concat(';expires=').concat(Expires);
}

function getCookie(Name, Default)
{
	var cookie = document.cookie;
	var ir = 0, ie = 0, sf = '', i = 0, j = 0;
	Name = Name.toLowerCase();
	if (typeof(Default) == 'undefined')
		Default = '';
	if (cookie.length == 0)
		return Default;
	if ((ir = Name.indexOf('.')) == -1)
	{
		if (cookie.substr(0, Name.length + 1).toLowerCase() == Name.concat('='))
		{
			if ((ie = cookie.indexOf(';')) != -1)
			{
				cookie = cookie.substr(0, ie);
			}
		}
		else
		{
			if ((ie = cookie.toLowerCase().indexOf('; '.concat(Name).concat('='))) == -1)
				return Default;
			cookie = cookie.substr(ie + 2);
			if ((ie = cookie.indexOf(';')) != -1)
			{
				cookie = cookie.substr(0, ie);
			}
		}
		sf = ';';
	}
	else
	{
		if ((i=cookie.toLowerCase().indexOf(Name.concat('='))) != -1)
		{
			if ((j = cookie.indexOf(';', i)) > i + Name.length + 1)
			{
				return ReplaceAll(unescape(cookie.substr(i + Name.length + 1, j - i - Name.length - 1)), '+', ' ');
			}
			else
			{
				j = cookie.length;
				return ReplaceAll(unescape(cookie.substr(i + Name.length + 1, j - i - Name.length - 1)), '+', ' ');
			}
		}

		var Root = Name.substr(0, ir);
		Name = Name.substr(ir + 1);
		if (cookie.substr(0, Root.length + 1).toLowerCase() == Root.concat('='))
		{
			if ((ie = cookie.indexOf(';')) != -1)
			{
				cookie = cookie.substr(0, ie);
			}
		}
		else
		{
			if ((ie = cookie.toLowerCase().indexOf('; '.concat(Root).concat('='))) == -1)
				return Default;

			cookie = cookie.substr(ie + 2);

			if ((ie = cookie.indexOf(';')) != -1)
			{
				cookie = cookie.substr(0, ie);
			}
		}
		cookie = cookie.substr(Root.length + 1);
		sf = '&';
	}

	if (cookie.substr(0, Name.length + 1).toLowerCase() == Name.concat('='))
	{
		ir = Name.length + 1;
	}
	else
	{
		if ((ir = cookie.toLowerCase().indexOf('&'.concat(Name).concat('='))) == -1)
			return Default;
		ir+=Name.length + 2;
	}
	if ((ie=cookie.indexOf(sf, ir)) == -1)
	{
		return ReplaceAll(unescape(cookie.substr(ir)), '+', ' ');
	}
	else
	{
		return ReplaceAll(unescape(cookie.substring(ir, ie)), '+', ' ');
	}
}
//================================
function checkCookie()
{
if(!(getCookie1('fl')!=null && getCookie1('fl')!="")){
	setCookie1('fl',0,365);
}

fl=parseInt(getCookie1('fl')) + 1;
if (fl!=null && fl!="")
  {
  //alert(fl);
  setCookie1('fl',fl,365);
  } 
}
function getCookie1(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1; 
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}

function setCookie1(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//================================
function CharReplace(iStr)
{
	var	r1=/%26/g;
	var	r2=/%20/g;
	var	r3=/%22/g;
	iStr	=iStr.replace(r1, '&');
	iStr	=iStr.replace(r2, ' ');
	iStr	=iStr.replace(r3, '"');
	return iStr;
}

function SearchOnFocus(field)
{
	if(field.value=='Từ khóa tìm kiếm'){ field.value = ''; }
}

function SearchOnBlur(field)
{
	if(field.value==''){ field.value='Từ khóa tìm kiếm';}
}

function Trim(iStr)
{
	while (iStr.charCodeAt(0) <= 32)
	{
		iStr=iStr.substr(1);
	}

	while (iStr.charCodeAt(iStr.length - 1) <= 32)
	{
		iStr=iStr.substr(0, iStr.length - 1);
	}

	return iStr;
}

function Left(str, n)
{
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function Right(str, n)
{
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function numberFormat(num,decimalNum,bolLeadingZero,bolParens,bolCommas){ 
	if (isNaN(parseInt(num))) return "0";

	var tmpNum = num;
	var iSign = num < 0 ? -1 : 1; 

	tmpNum *= Math.pow(10,decimalNum);
	tmpNum = Math.round(Math.abs(tmpNum))
	tmpNum /= Math.pow(10,decimalNum);
	tmpNum *= iSign;

	var tmpNumStr = new String(tmpNum);

	if (!bolLeadingZero && num < 1 && num > -1 && num != 0)
		if (num > 0)
			tmpNumStr = tmpNumStr.substring(1,tmpNumStr.length);
		else
			tmpNumStr = "-" + tmpNumStr.substring(2,tmpNumStr.length);
				
	if (bolCommas && (num >= 1000 || num <= -1000)) {
		var iStart = tmpNumStr.indexOf(".");
		if (iStart < 0)
			iStart = tmpNumStr.length;

		iStart -= 3;
		while (iStart >= 1) {
			tmpNumStr = tmpNumStr.substring(0,iStart) + "," + tmpNumStr.substring(iStart,tmpNumStr.length)
			iStart -= 3;
		}                       
	}
	if (bolParens && num < 0)
				tmpNumStr = "(" + tmpNumStr.substring(1,tmpNumStr.length) + ")";
	return tmpNumStr;
}


function IPTV() {
	var sHTML = '';	
	sHTML = sHTML.concat('<Select name="cboIPTV" class="Image" style="width:225px;height:20px;font:11px arial;" onchange="changeChannel(this);">');
	sHTML = sHTML.concat('	<Option value=1 selected>VTV1</Option>');
	sHTML = sHTML.concat('	<Option value=2>VTV2</Option>');
	sHTML = sHTML.concat('	<Option value=3>VTV3</Option>');	
	sHTML = sHTML.concat('	<Option value=4>VTV4</Option>');
	sHTML = sHTML.concat('	<Option value=5>VTV6</Option>');	
	sHTML = sHTML.concat('	<Option value=6>HTV1</Option>');
	sHTML = sHTML.concat('	<Option value=7>HTV2</Option>');
	sHTML = sHTML.concat('	<Option value=8>HTV3</Option>');
	sHTML = sHTML.concat('	<Option value=9>HTV4</Option>');		
	sHTML = sHTML.concat('	<Option value=10>HTV7</Option>');	
	sHTML = sHTML.concat('	<Option value=11>HTV9</Option>');	
	sHTML = sHTML.concat('	<Option value=12>HTVC - Thu&#7847;n Vi&#7879;t</Option>');
	sHTML = sHTML.concat('	<Option value=13>HTVC - MUSIC</Option>');
	sHTML = sHTML.concat('	<Option value=14>HTVC - MOVIE</Option>');
	sHTML = sHTML.concat('	<Option value=15>Vietnam Net</Option>');	
	sHTML = sHTML.concat('	<Option value=16>HanoiTV</Option>');
	sHTML = sHTML.concat('	<Option value=17>CNBC</Option>');
	sHTML = sHTML.concat('	<Option value=18>ANIMAX</Option>');	
	sHTML = sHTML.concat('	<Option value=19>Du l&#7883;ch v&#224; Cu&#7897;c s&#7889;ng</Option>');
	sHTML = sHTML.concat('	<Option value=20>IMV</Option>');	
	sHTML = sHTML.concat('	<Option value=21>Star World</Option>');
	sHTML = sHTML.concat('	<Option value=22>Star Movies</Option>');	
	sHTML = sHTML.concat('	<Option value=23>CNN</Option>');
	sHTML = sHTML.concat('	<Option value=25>TCM</Option>');
	sHTML = sHTML.concat('	<Option value=26>BBC World</Option>');
	sHTML = sHTML.concat('	<Option value=27>Fashion TV</Option>');
	sHTML = sHTML.concat('	<Option value=28>Reality TV</Option>');	
	sHTML = sHTML.concat('	<Option value=29>Discovery</Option>');	
	sHTML = sHTML.concat('	<Option value=30>National Geographic</Option>');	
	sHTML = sHTML.concat('	<Option value=31>MGM</Option>');	
	sHTML = sHTML.concat('	<Option value=33>ESPN</Option>');	
	sHTML = sHTML.concat('	<Option value=34>True Sport 1</Option>');		
	sHTML = sHTML.concat('	<Option value=36>MOVAsia</Option>');	
	sHTML = sHTML.concat('	<Option value=37>MTVAsia</Option>');
	sHTML = sHTML.concat('	<Option value=38>Boomerang</Option>');
	sHTML = sHTML.concat('	<Option value=39>MATV</Option>');
	sHTML = sHTML.concat('	<Option value=41>&#272;&#7891;ng Nai 1</Option>');
	sHTML = sHTML.concat('	<Option value=42>&#272;&#7891;ng Nai 2</Option>');	
	sHTML = sHTML.concat('	<Option value=43>BTV1</Option>');
	sHTML = sHTML.concat('	<Option value=44>BTV2</Option>');
	sHTML = sHTML.concat('	<Option value=46>TVB</Option>');
	sHTML = sHTML.concat('	<Option value=47>CnC</Option>');
	sHTML = sHTML.concat('	<Option value=51>VTV9</Option>');
	sHTML = sHTML.concat('</Select>');	
	document.write(sHTML);
}

function ShowNextFolderItem(LastDate)
{
	if (PAGE_FOLDER < 1000 )
	{
		location.href = SetParameter(location.href + 'Default.Asp', 'd', escape(LastDate));
	}
	else
	{
		location.href = SetParameter(location.href, 'd', escape(LastDate));
	}	
}

function SetParameter(pFile, pName, pVal)
{
	if ((cPost=pFile.indexOf('&'.concat(pName).concat('=')))==-1)
		cPost=pFile.indexOf('?'.concat(pName).concat('='));

	if (cPost >= 0)
	{
		if ((pPost=pFile.indexOf('&', cPost + 1))==-1)
		{
			pFile=pFile.substring(0, cPost + pName.length + 2).concat(pVal);
		}
		else
		{
			pFile=pFile.substring(0, cPost + pName.length + 2).concat(pVal).concat(pFile.substr(pPost));
		}
	}
	else
	{
		if (pFile.indexOf('?')==-1)
		{
			pFile=pFile.concat('?').concat(pName).concat('=').concat(pVal);
		}
		else
		{
			pFile=pFile.concat('&').concat(pName).concat('=').concat(pVal);
		}
	}

	return pFile;
}

function CheckThisVote(field)
{
	form = field.form;		
	if (field.checked)
	{
		form.fvotefor.value = field.value;
	}
	else
	{
		form.fvotefor.value = '';		
		return;
	}

	for (i=0; i < form.elements.length; i++)
	{
		if(form.elements[i].type=='checkbox')
			if(form.name == 'Frm_267525551'){
				if(field.value != '1' && field.value != '2'){
					if (form.elements[i] != field)
						if (form.elements[i].checked)
							form.elements[i].checked = false;
				}
				else {
					field.checked = false;					
				}
			}
			else{
				if (form.elements[i] != field)
					if (form.elements[i].checked)
						form.elements[i].checked = false;
			}			
	}	
}

function ReplaceAll(iStr, v1, v2)
{
	var i = 0, oStr = '', j = v1.length;

	while (i < iStr.length)
	{
		if (iStr.substr(i, j) == v1)
		{
			oStr+=v2;
			i+=j
		}
		else
		{
			oStr+=iStr.charAt(i);
			i++;
		}
	}

	return oStr;
}

function ShowExpand(sobj1, sobj2)
{
	sobj1.style.display = 'none';
	sobj2.style.display = '';
}

function SubmitVote(sform, saction)
{
	if (saction==0)
	{
		if (sform.fvotefor.value=='')
		{
			alert('Hay chon mot trong cac muc truoc khi bieu quyet.');
			return false;
		}
	}

	var form = sform;
	var j = 0
	for (i=0; i < form.elements.length - 2; i++)
		{
			if(form.elements[i].type=='checkbox'){
				j = j + 1
			}
		}
	var sheight = (j * 40) + 50;
	if (sheight < 250){
		sheight = 250;
	}
	open('', sform.name, 'scrollbars=yes,resizeable=no,locationbar=no,width=500,height='+sheight+',left='.concat((screen.width - 500)/2).concat(',top=').concat((screen.height - 250)/2));
	sform.faction.value = saction;
	sform.action = 'http://vnexpress.net/Service/Vote/Default.Asp' ;
	sform.submit();
}

function AddVote(SubjectID, PageID, VoteID, Align, VoteTitle, Color, BgColor, Width, NumItem, ItemArray, Description, Column)
{	
	document.writeln('	<table width="', Width, '" cellspacing="0" cellpadding="0" ', (PAGE_FOLDER==1) ? 'height="100%"' : '', ' border="0" ', (Align=='') ? '' : ' align='.concat(Align), '>');
	document.writeln('<form method="POST" target="Frm_', VoteID, '" name="Frm_', VoteID, '">');
	document.writeln('		<tr style="vertical-align:top">');
	document.writeln('			<td colspan="2" style="height:3px;background:#ffffff url(/images/vote/bg-top.gif) repeat-x top;"><img src="/images/vote/left-top.gif" /></td>');	
	document.writeln('			<td class="txtr" style="height:3px;background:#ffffff url(/images/vote/bg-top.gif) repeat-x top;"><img src="/images/vote/right-top.gif" /></td>');
	document.writeln('		</tr>');
	document.writeln('		<tr style="vertical-align:top">');
	document.writeln('			<td style="width:4px; height:21px;background:#ffffff url(/images/vote/bg-left.gif) repeat-y top;"></td>');
	document.writeln('			<td style="height:21px; vertical-align: top;padding-left: 8px; padding-top: 1px;padding-bottom: 2px; background-color: #ffffff;">');
	document.writeln('				<label class="link-folder">Th&#259;m d&#242; &#253; ki&#7871;n</label>');
	document.writeln('			</td>');
	document.writeln('			<td style="width:4px; height:21px;background:#ffffff url(/images/vote/bg-right.gif) repeat-y top;"></td>');
	document.writeln('		</tr>');
	document.writeln('		<tr>');
	document.writeln('	<td width:4px; style="background:#ffffff url(/images/vote/bg-left-c.gif) repeat-y top;"></td>');
	document.writeln('	<td valign="top" style="background-color:#eeeedd;">');
	document.writeln('		<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" valign="top">');
	document.writeln('			<tr>');
	document.writeln('				<td width="100%" valign="top">');
	document.writeln('					<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" valgin="top">');
	if (VoteTitle!='')
	{
		document.writeln('					<tr valign="top">');
		document.writeln('						<td style="padding:10px 0px 10px 8px; background-color: #eeeedd;">');
		document.writeln('							<label style="font:bold 12px arial; color:#4d4d4d;">',VoteTitle,'</label>');
		document.writeln('						</td>');
		document.writeln('					</tr>');

	}
	if (typeof(Description)=='undefined')
	{
		Description = '';
	}
	if (typeof(Column)=='undefined')
	{
		Column = 1;
	}
	document.writeln('						<tr valign="top" height="100%">');
	document.writeln('							<td valign="top" style=" height:100%; padding-left:7px;background-color:#eeeedd;">');
	document.writeln('							<input type="hidden" name="fsubjectid" value=', SubjectID, '>');
	document.writeln('							<input type="hidden" name="fpageid" value=', PageID, '>');
	document.writeln('							<input type="hidden" name="fvoteid" value=', VoteID, '>');
	document.writeln('							<input type="hidden" name="fvotetitle" value="', ReplaceAll(VoteTitle, '"', '&quot;'), '">');
	document.writeln('							<input type="hidden" name="fvotefor" value="">');
	document.writeln('							<input type="hidden" name="faction" value="0">');
	document.writeln('							<input type="hidden" name="fDescription" value="', ReplaceAll(Description, '"', '&quot;'), '">');
	document.writeln('							<input type="hidden" name="fnumitem" value=', NumItem, '>');
	document.writeln('							<table width="100%" height="100%" cellspacing=0 cellpadding=0 border=0>');
	var i, j, k;
	for (i=0; i < NumItem; )
	{
		document.writeln('<tr>');
		for (j=0; j < Column && i < NumItem; j++, i++)
		{
			document.writeln('<input type="hidden" name="fT_', i, '" value="', ReplaceAll(ItemArray[i][0], '"', '&quot;'), '">');
			document.writeln('<input type="hidden" name="fI_', i, '" value="', ItemArray[i][1], '">');
			document.writeln('<input type="hidden" name="fN_', i, '" value="', ItemArray[i][2], '">');
			document.writeln('<td valign=top width=20px align=right><input type="checkbox" name="fC_', i, '" value=', ItemArray[i][2], ' style="font:12px arial;color:#000000;" onClick="CheckThisVote(this)"></td>');
			if (i + 1 < NumItem || Column==1)
			{
				document.writeln('<td valign=top><label style="font:12px arial; color: #000000; margin-left:2px; margin-right:2px">', ItemArray[i][0], '</label></td>');
			}
			else
			{
				document.writeln('<td colspan=', (Column - j - 1)*2,'><p  style="font:12px arial; color: #000000; margin-left: 2; margin-right: 2">', ItemArray[i][0], '</p></td>');
			}
		}		
		document.writeln('</tr>');
	}
	document.writeln('</table>');
	document.writeln('								</td>');
	document.writeln('							</tr>');
	document.writeln('							<tr valign="top" height="10px"><td valign="top" align="center" style="background-color:#eeeedd;text-align:right;">');	
	document.writeln('							</td></tr>');
	document.writeln('						</table>');
	document.writeln('					</td>');
	document.writeln('				</tr>');
	document.writeln('			</table>');
	document.writeln('		</td>');
	document.writeln('		<td style=" width:4px; background:#ffffff url(/images/vote/bg-right-c.gif) repeat-y top;"></td>');
	document.writeln('	</tr>');
	document.writeln('	<tr>');
	document.writeln('		<td style="width:4px; height:25px;background:#ffffff url(/images/vote/bg-left.gif) repeat-y top;"></td>');
	document.writeln('		<td style="height:25px; padding:5px 5px 0px;background-color: #ffffff;" nowrap>');
	document.writeln('			<input type="image" border="0" onclick="return SubmitVote(this.form, 0)" style="cursor: pointer;" src="/Images/Vote/submit.gif">&nbsp;&nbsp;<input type="image" border="0" onclick="return SubmitVote(this.form, 1)" style="cursor: pointer;" src="/Images/Vote/view.gif">');
	document.writeln('		</td>');
	document.writeln('		<td style="height:25px; background: url(/images/vote/bg-right.gif);background-position:top;background-repeat:repeat-y; width:4; height:25;"></td>');
	document.writeln('	</tr>');
	document.writeln('	<tr>');
	document.writeln('		<td style="width:4px; height:5px; background:#ffffff url(/images/vote/left-bottom.gif) no-repeat bottom;"></td>');
	document.writeln('		<td style="height:5px; background:#ffffff url(/images/vote/bg-bottom.gif) repeat-x bottom;font-size:1px">&nbsp;</td>');
	document.writeln('		<td style="width:4px; height:5px; background:#ffffff url(/images/vote/right-bottom.gif) no-repeat bottom;"></td>');
	document.writeln('	</tr>');
	document.writeln('</form>');	
	document.writeln('</table>')
	
}

function ShowTopicJS(vFolderID, vItemCount, vType1, vType2, vCustomTitle, vPageCheck, vObjectID, vShowHeader, vSubjectID){
	var sId, sTitle, sType, sPath, iCount=0, iMaxItem=10;
	var arItem = new Array();
	var sLink = '/XML/'.concat(parseInt(vFolderID/100)).concat('/').concat(vFolderID).concat('.xml');
	var sHTML;
	
	AjaxRequest.get(
		{
	    'url':sLink
	    ,'onSuccess':function(req){
	    	if (req.responseXML.getElementsByTagName('Topic').length>0){
	    		with(req.responseXML.getElementsByTagName('Topic').item(0)){
					sId   = getNodeValue(getElementsByTagName('ID'));
					sTitle= getNodeValue(getElementsByTagName('Title'));
					sDate = getNodeValue(getElementsByTagName('ShowDate'));
					sType = toUpper(getNodeValue(getElementsByTagName('Type')));
					sPath = getNodeValue(getElementsByTagName('Path'));
	    		}
	    	}
	    	var iCount=0;
	    	for (var i=0;i<req.responseXML.getElementsByTagName('Subject').length;i++){
	    		with(req.responseXML.getElementsByTagName('Subject').item(i)){
	    			if (iCount<iMaxItem && iCount<vItemCount){
		    			var sTemp  = getNodeValue(getElementsByTagName('ID'));
						var sCheck = getNodeValue(getElementsByTagName('CheckShow'));
		    			if (sTemp!='' && displayid(sTemp) && sTemp!=vSubjectID && (vPageCheck==sCheck || sCheck==0)){
			    			arItem[iCount] = new Array(10);
							arItem[iCount][0] = getNodeValue(getElementsByTagName('Type'));
							arItem[iCount][1] = getNodeValue(getElementsByTagName('Title'));
							arItem[iCount][2] = getNodeValue(getElementsByTagName('Path'));							
							arItem[iCount][3] = getNodeValue(getElementsByTagName('Date'));
							iCount++;
						}
					}
	    		}
	    	}
			
			gmobj(vObjectID).innerHTML = GetTopicHTML(sId,sTitle,sDate,sPath,sType,sPath,arItem,vType1,vType2,vCustomTitle,vShowHeader);
	    }
	    ,'onError':function(req){gmobj(vObjectID).innerHTML=req.statusText;}
		}
	)
}

function GetTopicHTML(sId,sTitle,sDate,sPath,sType,sPath,arItem,vType1,vType2,vCustomTitle,vShowHeader){
	var sHTML = '';
	var iCount=0, i=0;
	var sTdBullet='', sTableTopicTitle='';
	var sTopicTitle='Theo d&#242;ng s&#7921; ki&#7879;n'
	
	switch(vType2)
	{
	case 0: // ' 0 Default Title	
		sTableTopicTitle += '<table border="0" cellpadding="0" cellspacing="0" width="100%">';
		sTableTopicTitle += '<tr><td class="OtherTitle" height="40" valign="middle">'+sTopicTitle+':</td></tr>';
		sTableTopicTitle += '</table>';
		sTdBullet='';
		break;
	case 1: // ' 1 User Defined Title
		sTableTopicTitle += '<table border="0" cellpadding="0" cellspacing="0" width="100%">';
		sTableTopicTitle += '<tr><td class="OtherTitle" height="40" valign="middle">'+vCustomTitle+'</td></tr>';
		sTableTopicTitle += '</table>';
		sTdBullet='';
		break;
	case 2: // ' 2 No Title
		sTrTopicTitle='';
		sTdBullet='';
		break;
	case 3: // ' 3 List Item Only
		sTrTopicTitle='';
		sTdBullet='<td width="7" valign="top" class="Normal">&#9642;</td>'
		break;
	}
	
	if (vShowHeader==0) sTableTopicTitle='';

	switch(vType1)		
	{
	case 1: // ' Topic
		sHTML += sTableTopicTitle;
		sHTML += '<table border="0" cellpadding="2" cellspacing="0" width="96%">';
		sHTML += '<tr><td><a href="/Topic/?ID='+sId+'" class="TopicTitle">'+sTitle+'</a><span class="ShowDate">&nbsp;('+sDate+')</span></td></tr>';
		sHTML += '</table>';
		break;
	case 2: // ' Subject
		sHTML += sTableTopicTitle;
		sHTML += '<table border="0" cellpadding="2" cellspacing="0" width="96%">';
		while (i<arItem.length)
		{
			sHTML += '<tr>'+sTdBullet+'<td><a class="Other" href="'+arItem[i][2]+'">'+arItem[i][1]+'</a><span class="ShowDate">&nbsp;('+arItem[i][3]+')</span></td></tr>';
			i++;
		}
		//sHTML += '<tr><td colspan="2" align="right"><a href="/Topic/?ID='+sId+'" class="Other">Xem ti&#7871;p</a></td></tr>';
		sHTML += '</table>';
		break;
	case 3: // ' Topic + Subject
		sHTML += sTableTopicTitle;
		sHTML += '<table border="0" cellpadding="2" cellspacing="0" width="96%">';
		sHTML += '<tr><td><a href="/Topic/?ID='+sId+'" class="TopicTitle">'+sTitle+'</a><span class="ShowDate">&nbsp;('+sDate+')</span></td></tr>';
		while (i<arItem.length)
		{
			sHTML += '<tr>'+sTdBullet+'<td><a class="Other" href="'+arItem[i][2]+'">'+arItem[i][1]+'</a><span class="ShowDate">&nbsp;('+arItem[i][3]+')</span></td></tr>';
			i++;
		}
		sHTML += '</table>';
		break;
	case 4: // ' Subject (before)
		sHTML += sTableTopicTitle;
		sHTML += '<table border="0" cellpadding="2" cellspacing="0" width="96%">';
		while (i<arItem.length)
		{
			sHTML += '<tr>'+sTdBullet+'<td><a class="Other" href="'+arItem[i][2]+'">'+arItem[i][1]+'</a><span class="ShowDate">&nbsp;('+arItem[i][3]+')</span></td></tr>';
			i++;
		}
		sHTML += '<tr><td align="right"><a class="Other" href="/Topic/?ID='+sId+'">Xem ti&#7871;p</a></td></tr>';
		sHTML += '</table>';
		break;
	case 5: // ' Topic + Subject (before)
		sHTML += sTableTopicTitle;
		sHTML += '<table border="0" cellpadding="2" cellspacing="0" width="96%">';
		sHTML += '<tr><td><a href="/Topic/?ID='+sId+'" class="TopicTitle">'+sTitle+'</a><span class="ShowDate">&nbsp;('+sDate+')</span></td></tr>';
		while (i<arItem.length)
		{
			sHTML += '<tr>'+sTdBullet+'<td><a class="Other" href="'+arItem[i][2]+'">'+arItem[i][1]+'</a><span class="ShowDate">&nbsp;('+arItem[i][3]+')</span></td></tr>';
			i++;
		}
		sHTML += '<tr><td align="right"><a class="Other" href="/Topic/?ID='+sId+'">Xem ti&#7871;p</a></td></tr>';
		sHTML += '</table>';
		break;
	}
	//if (sId==4953)	alert(sHTML);
	return sHTML;
}

function openImage(vLink, vHeight, vWidth)
{	
	var sLink = (typeof(vLink.href) == 'undefined') ? vLink : vLink.href;

	if (sLink == '')
	{
		return false;
	}

	winDef = 'status=no,resizable=no,scrollbars=no,toolbar=no,location=no,fullscreen=no,titlebar=yes,height='.concat(vHeight).concat(',').concat('width=').concat(vWidth).concat(',');
	winDef = winDef.concat('top=').concat((screen.height - vHeight)/2).concat(',');
	winDef = winDef.concat('left=').concat((screen.width - vWidth)/2);
	newwin = open('', '_blank', winDef);

	newwin.document.writeln('<body topmargin="0" leftmargin="0" marginheight="0" marginwidth="0">');
	newwin.document.writeln('<a href="" onClick="window.close(); return false;"><img src="', sLink, '" alt="', (fBrw) ? '&#272;&#243;ng l&#7841;i' : 'Dong lai', '" border=0></a>');
	newwin.document.writeln('</body>');

	if (typeof(vLink.href) != 'undefined')
	{
		return false;
	}
}

function PageSet(vPage)
{
	location.replace(SetParameter(location.href, 'p', vPage));
}

function ReverseFolderByDate()
{
	Ryear = document.Reverse.fYear.options[document.Reverse.fYear.selectedIndex].value;
	Rmonth = document.Reverse.fMonth.options[document.Reverse.fMonth.selectedIndex].value;
	Rday = document.Reverse.fDay.options[document.Reverse.fDay.selectedIndex].value;

	for (; Rday > 0; Rday--)
	{
		Rdate = new Date(Ryear, Rmonth - 1, Rday);
		if (Rdate.getDate() == Rday)
		{
			break;
		}
	}

	LastDate = Ryear.concat('/').concat(Rmonth).concat('/').concat(Rday).concat(' 23:59:59');
	location.href = SetParameter(location.href, 'd', escape(LastDate));	
}

function SetSelectValue(Field, iStr)
{
	if (iStr=='')
	{
		iStr=' ';
	}

	for (i=0; i < Field.options.length; i++)
	{
		if (Field.options[i].value==iStr)
		{
			Field.selectedIndex=i;
			return;
		}
	}
}

function ShowAdWordByCate(Field)
{
	location.replace(SetParameter('/User/Rao-vat/Source/List.Asp', 'c', Field.options[Field.selectedIndex].value));
}

function EmailSubject(PageID)
{
	openMeExt('http://vnexpress.net/Service/EmailSubject/?u='.concat(escape(location.href)), 0, 0, 0, 0, 0, 0, 1, 1, 515, 480, 0, 0, '', 0);
	return false;
}

function ShowPopupUnder()
{
	if (RefVal15.length==0) return;	
	var alPopUnderBanner = new adlistshow(RefVal15,'PopUnderBanner',0,6,0,0,0);
}

function PrintSubject()
{	
	w=open(location.href.concat('?q=1'), '_blank', '');
	return false;	
}

function openAdWord(id, c)
{
	var url = 'http://vnexpress.net/Service/Raovat/Counter/?id=' + id + '&c=' + c + '&r=' + Math.random();		
	location.href = url;
	return false;
}

function openHelp(){
	winDef = 'scrollbars=no,status=no,toolbar=no,location=no,menubar=no,resizable=no,height=420,width=500,top='.concat((screen.height - 420)/2).concat(',left=').concat((screen.width - 500)/2);
	window.open('/User/Rao-vat/Source/Help.htm', 'Huongdan', winDef);
}

function CheckEmailAddress(Email)
{
	Email = Trim(Email);

	while (Email != '')
	{
		c = Email.charAt(0);	
		if (c==' ' || c=='<' || c==39 || c==':' || c=='.')
		{
			Email = Email.substr(1);
		}
		else
		{
			break;
		}
	}

	i = Email.indexOf('>');
	if (i==-1)
	{
		while (Email != '')
		{
			c = Email.charAt(Email.length - 1);
			if (c==' ' || c==39 || c=='.')
			{
				Email = Email.substr(0, Email.length - 1);
			}
			else
			{
				break;
			}
		}
	}
	else
	{
		Email = Email.substr(0, i);
	}

	if (Email.length > 96)
		return '';

	i = Email.lastIndexOf('@');
	j = Email.lastIndexOf('.');
	if (i < j)
		i = j;

	switch (Email.length - i - 1)
	{
	case 2:
		break;
	case 3:
		switch (Email.substr(i))
		{
		case '.com':
		case '.net':
		case '.org':
		case '.edu':
		case '.mil':
		case '.gov':
		case '.biz':
		case '.pro':
		case '.int':
			break;
		default:
			return '';
		}
		break;
	default:
		switch (Email.substr(i))
		{
		case '.name':
		case '.info':
			break;
		default:
			return '';
		}
		break;
	}

	Email = Email.toLowerCase();

	if (Email == '')
		return '';

	if (Email.indexOf(' ') != -1)
		return '';

	if (Email.indexOf('..') != -1)
		return '';

	if (Email.indexOf('.@') != -1)
		return '';

	if (Email.indexOf('@.') != -1)
		return '';

	if (Email.indexOf(':') != -1)
		return '';

	for (i=0; i < Email.length; i++)
	{
		c = Email.charAt(i);

		if (c >= '0' && c <= '9')
			continue;
		
		if (c >= 'a' && c <= 'z')
			continue;
		
		if ('`~!#$%^&*-_+=?/\\|@.'.indexOf(c) != -1)
			continue;

		return '';
	}

	if ((i=Email.indexOf('@'))==-1)
		return '';

	if (Email.substr(i + 1).indexOf('@')!=-1)
		return '';

	if (Email.charAt(0)=='.' || Email.charAt(Email.length - 1)=='.')
		return '';

	return Email;
}

function ChangeByEmail()
{
	if ((ChkEmail = CheckEmailAddress(document.frmEmail.txtEmail.value)) == '')
	{
		alert('Hay nhap dia chi [Email]!');
		document.frmEmail.txtEmail.focus();
		return;
	}

	document.frmEmail.txtEmail.value = ChkEmail;
	vWH = 190;
	vWW = 380;
	vWN = 'AwUpdate';
	winDef = 'status=no,resizable=no,scrollbars=yes,toolbar=no,location=no,fullscreen=no,titlebar=yes,height='.concat(vWH).concat(',').concat('width=').concat(vWW).concat(',');
	winDef = winDef.concat('top=').concat((screen.height - vWH)/2).concat(',');
	winDef = winDef.concat('left=').concat((screen.width - vWW)/2);
	newwin = open('http://srv.vnexpress.net/User/Rao-vat/source/Select.Asp?email='.concat(document.frmEmail.txtEmail.value), vWN, winDef);
	newwin.focus();
}

function setAsHomePage(i)
{	
	if (document.all) {
		i.style.behavior='url(#default#homepage)';
		i.setHomePage('http://vnexpress.net');
	}
}

function ContactUs()
{
	open('/ContactUs/Contact.htm','Toasoan','height=340px,width=400px,status=no,toolba=no,location=no');
}

function GetPostVariable(vName, vDef)
{
	var	str=location.href;
	var	pos=str.indexOf('?'.concat(vName).concat('='));

	if (pos==-1)
	{
		pos=str.indexOf('&'.concat(vName).concat('='));
		if (pos==-1) return vDef;
	}
	
	str=str.substring(pos + vName.length + 2);
	pos=str.indexOf('&');

	if (pos==-1)
	{
		pos=str.length;
	}	

	if (pos > 0)
	{
		str=str.substring(0, pos);
	}

	return (typeof(vDef)=='number') ? parseInt(str) : CharReplace(str);
}

function UnicodeSet(iStr)
{
	for (i=0, oStr=''; i < iStr.length; i++)
	{
		switch ((j=iStr.charCodeAt(i)))
		{
		case 34:
			oStr=oStr.concat('&quot;');
			break;
		case 38:
			oStr=oStr.concat('&amp;');
			break;
		case 39:
			oStr = oStr.concat('&#39;');
			break;
		case 60:
			oStr = oStr.concat('&lt;');
			break;
		case 62:
			oStr = oStr.concat('&gt;');
			break;
		default:
			if (j < 32 || j > 127 || j==34 || j==39)
			{
				oStr=oStr.concat('&#').concat(j).concat(';');
			}
			else
			{
				oStr=oStr.concat(iStr.charAt(i)); 
			}
			break;
		}
	}
	
	return oStr;
}

function UnicodeGet(iStr)
{
	for (i=0, oStr=''; i < iStr.length; )
	{
		if (iStr.charCodeAt(i)==38)
		{
			if (iStr.charCodeAt(i + 1)==35)
			{
				p=iStr.indexOf(';', i  + 2);
				if (p!=-1)
				{
					if (p - i <= 7)
					{
						if (isFinite(iStr.substr(i + 2, p - i - 2)))
						{
							oStr = oStr.concat(String.fromCharCode(iStr.substr(i + 2, p - i - 2)));
							i = p + 1;
							continue;
						}
					}
				}
			}
			else
			{
				p=iStr.indexOf(';', i  + 1);
				if (p!=-1)
				{
					switch (iStr.substr(i + 1, p - i - 1))
					{
					case 'amp':
						oStr = oStr.concat('&');
						i = p + 1;
						break;
					case 'quot':
						oStr = oStr.concat('"');
						i = p + 1;
						break;
					case 'lt':
						oStr = oStr.concat('<');
						i = p + 1;
						break;
					case 'gt':
						oStr = oStr.concat('>');
						i = p + 1;
						break;
					}
				}
			}
		}
	
	
		oStr=oStr.concat(iStr.charAt(i));
		i++;
	}
	
	return oStr;
}

function SearchMe(s, a)
{	
	while (s.length > 0 && s.charAt(0) <= ' ')
	{
		s = s.substr(1);
	}

	while ((i=s.length) > 0 && s.charAt(i - 1) <= ' ')
	{
		s = s.substr(0, i - 1);
	}

	if (s=='')
	{
		document.Search.txtSearch.value = s;
		return false;
	}
	
	f = GetPostVariable('r', PAGE_FOLDER);
	s = escape(UnicodeSet(s));
	r = '';
	// if(PAGE_FOLDER==9998){
		// r = 'http://vnexpress.net';
	// }
	// if(PAGE_SITE == 0){
		// r = '/GL/Search/?p=1&r='.concat(f).concat('&a=').concat(a).concat('&s=').concat(s);
	// }
	// else if(PAGE_SITE == 1) {
		// r = '/HN/Search/?p=1&r='.concat(f).concat('&a=').concat(a).concat('&s=').concat(s);
	// }
	// else if(PAGE_SITE == 2) {
		// r = '/SG/Search/?p=1&r='.concat(f).concat('&a=').concat(a).concat('&s=').concat(s);
	// }
	r='http://search.vnexpress.net/news?s='.concat(s);

	if (location.pathname.toLowerCase()=='/search/')
	{
		location.replace(r);
	}
	else
	{
		location.href=r;
	}
	return false;
}

function UrlDecode(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}


function ShowSearch()
{	
	if ((s=GetPostVariable('s', ''))!='')
	{
		s = ReplaceAll(s,'+',' ');
		s = unescape(s);
	}
	
	s = UrlDecode(s);

	document.writeln('<form name="Search" id="Search" action="http://search.vnexpress.net/news" onSubmit="return CheckValue(document.Search.s);">');
	document.writeln('  <img class="fl" src="/Images/Background/vne-search.gif" alt="" />');
	document.writeln('  <input class="txtsearch fl" type="text" name="s" id="s" onblur="SearchOnBlur(this)" onkeyup="initTyper(this)" onkeydown="" onfocus="SearchOnFocus(this)" value="Từ khóa tìm kiếm" />');    		
	document.writeln('  <img class="img-search fl" src="/Images/Background/btn-search.gif" alt="" onClick="return CheckValue(document.Search.s);" />');	
	document.writeln('	<input type="hidden" name="g" value="' + getCookie("VisitorID","") + '" />');
	document.writeln('	<input type="hidden" name="butS" value="yes" />');
	document.writeln('</form>');  

	if (s!='')
	{
		document.Search.s.value = s;
	}

}

function CheckEvt(e){
	var flag=false;
	if(window.event){
		if(e.keyCode==13){
			flag=true;
		}
	}
	else if(e.which){
		if(e.which==13){
			flag=true;
		}
	}
	if(flag){
		CheckValue(document.Search.s);
	}
}

function CheckValue(o){
	if(Trim(o.value)=='Từ khóa tìm kiếm'||Trim(o.value)==''){
		o.value = '';
		o.focus();
		return false;
	}
	else{
		document.Search.submit();
		return true;
	}		
}

function openMeExt(vLink, vStatus, vResizeable, vScrollbars, vToolbar, vLocation, vFullscreen, vTitlebar, vCentered, vHeight, vWidth, vTop, vLeft, vID, vCounter)
{
	var sLink = (typeof(vLink.href) == 'undefined') ? vLink : vLink.href;

	winDef = '';
	winDef = winDef.concat('status=').concat((vStatus) ? 'yes' : 'no').concat(',');
	winDef = winDef.concat('resizable=').concat((vResizeable) ? 'yes' : 'no').concat(',');
	winDef = winDef.concat('scrollbars=').concat((vScrollbars) ? 'yes' : 'no').concat(',');
	winDef = winDef.concat('toolbar=').concat((vToolbar) ? 'yes' : 'no').concat(',');
	winDef = winDef.concat('location=').concat((vLocation) ? 'yes' : 'no').concat(',');
	winDef = winDef.concat('fullscreen=').concat((vFullscreen) ? 'yes' : 'no').concat(',');
	winDef = winDef.concat('titlebar=').concat((vTitlebar) ? 'yes' : 'no').concat(',');
	winDef = winDef.concat('height=').concat(vHeight-140).concat(',');
	winDef = winDef.concat('width=').concat(vWidth).concat(',');

	if (vCentered){
		winDef = winDef.concat('top=').concat((screen.height - vHeight)/2).concat(',');
		winDef = winDef.concat('left=').concat((screen.width - vWidth)/2);
	}
	else{
		winDef = winDef.concat('top=').concat(vTop).concat(',');
		winDef = winDef.concat('left=').concat(vLeft);
	}

	if (typeof(vCounter) == 'undefined'){
		vCounter = 0;
	}

	if (typeof(vID) == 'undefined')	{
		vID = 0;
	}
	
	if (vCounter){
		sLink = buildLink(vID,sLink);
	}

	open(sLink, '_blank', winDef);

	if (typeof(vLink.href) != 'undefined')	{
		return false;
	}
}

function TrimAndRDS(iStr)
{
	function IsHyperLink(iStr)
	{
		var i = 0, c = ' ';

		if (iStr.charAt(0) == '.')
			return false;

		for (i=0; i < iStr.length; i++)
		{
			c = iStr.charAt(i).toLowerCase();
			if (c >= '0' && c <= '9')

				continue;
		
			if (c >= 'a' && c <= 'z')
				continue;
		
			if ('@_-&.?#+-/:'.indexOf(c) != -1)
				continue;

			return false;
		}
	
		return true;
	}

	function GetLastBreak(iStr, s)
	{
		var f = new Array('(', ')', '<', '>', ' ', '\r', '\n', '\t', ',', ';', '!'), p = 0, i = 0, r = -1;
	
		for (i = 0; i < f.length; i++)
			if ((p = iStr.lastIndexOf(f[i], s)) != -1)
				if (r == -1 || p > r)
					r = p;
		return r;
	}

	function GetNextBreak(iStr, s)
	{
		var f = new Array('(', ')', '<', '>', ' ', '\r', '\n', '\t', ',', ';', '!'), p = 0, i = 0, r = -1;
	
		for (i = 0; i < f.length; i++)
			if ((p = iStr.indexOf(f[i], s)) != -1)
				if (r == -1 || p < r)
					r = p;
		return r;
	}

	function CheckDotAfter(iStr)
	{
		var p0 = 0, p1 = 0, p2 = 0, p3 = 0;

		while ((p1 = iStr.indexOf('.', p0)) != -1)
		{
			if (iStr.charAt(p1 - 1) == ' ')
			{
				iStr = iStr.substr(0, p1 - 1).concat(iStr.substr(p1));
				p0 = p1;
			}
			else
			{
				p0 = p1 + 1;
			}

			if (iStr.charAt(p0) != ' ')
			{
				if ((p3 = GetLastBreak(iStr, p0)) == -1)
				{
					p3 = p0;
				}
				else
				{
					p3 = p3 + 1;
				}
		
				if ((p2 = GetNextBreak(iStr, p3)) == -1)
				{
					if (IsHyperLink(iStr.substr(p3)))
					{
						iStr = iStr.substr(0, p3).concat(iStr.substr(p3).toLowerCase())
						break;
					}
					else
					{
						if (iStr.charAt(p0) < '0' || iStr.charAt(p0) > '9')
						{
							iStr = iStr.substr(0, p0).concat(' ').concat(iStr.substr(p0, 1).toUpperCase()).concat(iStr.substr(p0 + 1));
							p0++;
						}
					}
				}
				else
				{
					if (IsHyperLink(iStr.substring(p3, p2)))
					{
						iStr = iStr.substr(0, p3).concat(iStr.substring(p3, p2).toLowerCase()).concat(iStr.substr(p2));
						p0 = p2 + 1;
					}
					else
					{
						if (iStr.charAt(p0) < '0' || iStr.charAt(p0) > '9')
						{
							iStr = iStr.substr(0, p0).concat(' ').concat(iStr.substr(p0, 1).toUpperCase()).concat(iStr.substr(p0 + 1));
							p0++;
						}
					}
				}
			}
			else
			{
				iStr = iStr.substr(0, p0 + 1).concat(iStr.substr(p0 + 1, 1).toUpperCase()).concat(iStr.substr(p0 + 2));
			}
		}	

		return iStr;
	}

	function CheckCharAfter(iStr, iChar, iUp)
	{
		var p0 = 0, p1 = 0;

		while ((p1 = iStr.indexOf(iChar, p0)) != -1)
		{
			if (iStr.charAt(p1 - 1) == ' ')
			{
				iStr = iStr.substr(0, p1 - 1).concat(iStr.substr(p1));
				p0 = p1;
			}
			else
			{
				p0 = p1 + 1;
			}

			if (iStr.charAt(p0) != ' ')
			{
				if (iStr.charAt(p0) < '0' || iStr.charAt(p0) > '9')
				{
					if (iUp)
					{
						iStr = iStr.substr(0, p0).concat(' ').concat(iStr.substr(p0, 1).toUpperCase()).concat(iStr.substr(p0 + 1));
					}
					else
					{
						iStr = iStr.substr(0, p0).concat(' ').concat(iStr.substr(p0));
					}
					p0++;
				}
			}
			else
			{
				if (iUp)
				{
					iStr = iStr.substr(0, p0 + 1).concat(iStr.substr(p0 + 1, 1).toUpperCase()).concat(iStr.substr(p0 + 2));
				}
			}
		}

		return iStr;
	}

	function CheckScope(iStr, s1, s2)
	{
		var p0 = 0, p1 = 0;

		for (p0 = 0; (p1 = iStr.indexOf(s1, p0)) != -1; )
		{
			if (iStr.charAt(p1 + 1) == ' ')
				iStr = iStr.substr(0, p1 + 1).concat(iStr.substr(p1 + 2));

			if (p1 > 0)
				if (iStr.charAt(p1 - 1) != ' ')
				{
					iStr = iStr.substr(0, p1).concat(' ').concat(iStr.substr(p1));
					p1++;
				}
			
			p0 = p1 + 1;
		}

		for (p0 = 0; (p1 = iStr.indexOf(s2, p0)) != -1; )
		{
			var SkipChar = ':,.;!?'.concat(s2);

			if (p1 > 0)
				if (iStr.charAt(p1 - 1) == ' ')
				{
					iStr = iStr.substr(0, p1 - 1).concat(iStr.substr(p1));
					p1--;
				}

			if (iStr.charAt(p1 + 1) != ' ' && SkipChar.indexOf(iStr.charAt(p1 + 1)) == -1)
				iStr = iStr.substr(0, p1 + 1).concat(' ').concat(iStr.substr(p1 + 1));

			p0 = p1 + 1;
		}		

		return iStr;
	}
	
	iStr = ReplaceAll(iStr, '  ', ' ');
	iStr = ReplaceAll(iStr, ' \r\n', '\r\n');
	iStr = ReplaceAll(iStr, '\r\n ', '\r\n');

	iStr = CheckCharAfter(iStr, ',', false);
	iStr = CheckCharAfter(iStr, ':', false);
	iStr = CheckCharAfter(iStr, ';', false);
	iStr = CheckCharAfter(iStr, '?', true);
	iStr = CheckCharAfter(iStr, '!', true);

	iStr = CheckScope(iStr, '(', ')');
	iStr = CheckScope(iStr, '[', ']');

	iStr = ReplaceAll(iStr, 'http: //', 'http://');
	iStr = CheckDotAfter(iStr);

	iStr = ReplaceAll(iStr, ', \r\n', ',\r\n');
	iStr = ReplaceAll(iStr, ': \r\n', ':\r\n');
	iStr = ReplaceAll(iStr, '; \r\n', ';\r\n');
	iStr = ReplaceAll(iStr, '? \r\n', '!\r\n');
	iStr = ReplaceAll(iStr, '! \r\n', '!\r\n');
	iStr = ReplaceAll(iStr, '. \r\n', '.\r\n');


	if (iStr.charAt(0) == ' ')
		iStr = iStr.substr(1);

	if (iStr.charAt(iStr.length - 1) == ' ')
		iStr = iStr.substr(0, iStr.length - 1);

	return iStr.substr(0, 1).toUpperCase().concat(iStr.substr(1));
}

function gmobj(o){
	if(document.getElementById){ m=document.getElementById(o); }
	else if(document.all){ m=document.all[o]; }
	else if(document.layers){ m=document[o]; }
	return m;
}

function dFormat(strDate) {
	var rStr = '';
	if(strDate=='') {
		sDate = rStr;
	}
	else {
		var tDates = strDate.split(" ");
		var tDay = tDates[0].split("/");
		var tTime = tDates[1].split(":");
		var oDay = new Date();		
		oDay.setFullYear(tDay[2],tDay[0]-1,tDay[1]);		
		switch(oDay.getDay()) {
			case 0:
				rStr = 'Ch&#7911; nh&#7853;t'; break;
			case 1:
				rStr = 'Th&#7913; hai'; break;
			case 2:
				rStr = 'Th&#7913; ba'; break;
			case 3:
				rStr = 'Th&#7913; t&#432;'; break;
			case 4:
				rStr = 'Th&#7913; n&#259;m'; break;
			case 5:
				rStr = 'Th&#7913; s&#225;u'; break;
			case 6:
				rStr = 'Th&#7913; b&#7843;y'; break;
			default: 
				rStr = ''; break;
		}
		rStr = rStr.concat(', ').concat(tDay[1]).concat('/').concat(tDay[0]).concat('/').concat(tDay[2]).concat(' | ');
		if(tDates[2] == 'AM') {
			if(tTime[0] < 10) {
				rStr = rStr.concat('0').concat(tTime[0]).concat(':');
			}
			else {
				rStr = rStr.concat(tTime[0]).concat(':');
			}
		}
		else {
			tTime[0] = 12 + parseInt(tTime[0]);
			rStr = rStr.concat(tTime[0]).concat(':');
		}
		
		if(tTime[1] < 10) {
			rStr = rStr.concat('0').concat(tTime[1]);
		}
		else {
			rStr = rStr.concat(tTime[1]);
		}
		
		rStr = rStr.concat(' GMT+7&nbsp;');
		sDate = rStr;
	}
}

function dmy(strDate) {
	var temp = new Array();
	temp = strDate.split('/');
	return temp[1].concat('/').concat(temp[0]).concat('/').concat(temp[2]);
}

function Hexa(input){
	return Right('00000000'.concat(input.toString(16)),8);	
}

function HexToDec(input){		
	var rt = 0;
	var cha = '';
	var temp;
	var len = input.length;
	for(var i=1;i<=len; i++) {
		cha = Left(input,1);
		switch (cha){
			case 'A': case 'a': temp = 10; break;
			case 'B': case 'b': temp = 11; break;
			case 'C': case 'c': temp = 12; break;
			case 'D': case 'd': temp = 13; break;
			case 'E': case 'e': temp = 14; break;
			case 'F': case 'f': temp = 15; break;
			default: temp = parseInt(cha); break;
		}		
		rt = rt + temp * Math.pow(16,len-i);
		input = Right(input,len-i);
	}		
	return rt;
}

function ShowStock(i){
    /*if(i==0){
        gmobj('VnIndex-Left').className = 'activetab-left fl';
        gmobj('VnIndex-Center').className = 'activetab-center fl';
        gmobj('VnIndex-Right').className = 'activetab-right fl';
        gmobj('HaIndex-Left').className = 'deactivetab-left2 fl';
        gmobj('HaIndex-Center').className = 'deactivetab-center fl';
        gmobj('HaIndex-Right').className = 'deactivetab-right2 fl';
        gmobj('HOSE').style.display = '';		
        gmobj('HASTC').style.display = 'none';						
    }
    else{
        gmobj('VnIndex-Left').className = 'deactivetab-left1 fl';
        gmobj('VnIndex-Center').className = 'deactivetab-center fl';
        gmobj('VnIndex-Right').className = 'deactivetab-right1 fl';
        gmobj('HaIndex-Left').className = 'activetab-left fl';
        gmobj('HaIndex-Center').className = 'activetab-center fl';
        gmobj('HaIndex-Right').className = 'activetab-right fl';
        gmobj('HOSE').style.display = 'none';		
        gmobj('HASTC').style.display = '';					
    }*/
	if(i == 0){
		gmobj('HO2').className = 'st-li-ho fl';
		gmobj('HA2').className = 'st-li-ha2 fl';
		gmobj('oHO2').className = 'st-act';
		gmobj('oHA2').className = 'st-deact';							
		gmobj('CONT').innerHTML = gmobj('HOSE').innerHTML;
	}
	else{				
		gmobj('HO2').className = 'st-li-ho2 fl';
		gmobj('HA2').className = 'st-li-ha fl';
		gmobj('oHO2').className = 'st-deact';
		gmobj('oHA2').className = 'st-act';	
		gmobj('CONT').innerHTML = gmobj('HASTC').innerHTML;
	}
}

function ShowTopStock(i){   
	if(i == 0){
		gmobj('top5-hose').className = 'st-act';
		gmobj('top5-hastc').className = 'st-deact';
		gmobj('TOP5CONT').innerHTML = gmobj('TOP5HOSE').innerHTML;
	}
	else{						
		gmobj('top5-hose').className = 'st-deact';
		gmobj('top5-hastc').className = 'st-act';
		gmobj('TOP5CONT').innerHTML = gmobj('TOP5HASTC').innerHTML;
	}
}

function ShowFlashObject(objName, objFileName, objWidth, objHeight) {
	var sHTML = '';
	sHTML = sHTML.concat('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" WIDTH="').concat(objWidth).concat('" HEIGHT="').concat(objHeight).concat('">');	
	sHTML = sHTML.concat('	<PARAM NAME=movie VALUE="').concat('/Images/AdWord/').concat(objFileName).concat('">');
	sHTML = sHTML.concat('	<PARAM NAME=quality VALUE=high>');
	sHTML = sHTML.concat('	<PARAM NAME=bgcolor VALUE=#FFFFFF>');	
	sHTML = sHTML.concat('	<EMBED src="').concat('/Images/AdWord/').concat(objFileName).concat('" quality=high bgcolor=#FFFFFF WIDTH="').concat(objWidth).concat('" HEIGHT="').concat(objHeight).concat('" NAME="').concat(objName).concat('" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
	sHTML = sHTML.concat('</OBJECT>');
	return sHTML;		
}

/*-----------------Banner---------------------------*/
function ShowTopBanner()
{
	if (RefVal1.length>0)
	{
		document.writeln('<div>');		
		var alTopBanner = new adlistshow(RefVal1,'TopBanner',0,10,0,728,90, true, 1);		
		document.writeln('</div>');
	}
	else
	{		
		document.writeln('<div style="float:left;width:728;">');	
		document.writeln(ShowFlashObject('AdTopBanner', 'lhqc_vne_728x90.swf', 728, 90));
		document.writeln('</div>');	
		return;
	}
}

function ShowHalfBaner(vType)
{
	if (typeof(vType) == 'undefined') vType = 2;
	if (vType==2){
		if (RefVal2.length>0)
		{
			document.writeln('<div class="halfbanner fl">');
			var alHalfBanner2 = new adlistshow(RefVal2,'HalfBanner2',0,0,0,364,90);
			document.writeln('</div>');
		}
		else
		{					
			document.writeln('<div class="halfbanner fl">');		
			document.writeln(ShowFlashObject('AdHalfBaner1', 'lhqc_vne_364x60.swf', 364, 90));
			document.writeln('</div>');	
			return;
		}
	}
	else if (vType==3){
		if (RefVal3.length>0)
		{
			document.writeln('<div class="halfbanner fr">');
			var alHalfBanner3 = new adlistshow(RefVal3,'HalfBanner3',0,0,0,364,90);
			document.writeln('</div>');
		}
		else
		{					
			document.writeln('<div class="halfbanner fr">');		
			document.writeln(ShowFlashObject('AdHalfBaner2', 'lhqc_vne_364x60.swf', 364, 90));
			document.writeln('</div>');	
			return;
		}
	}
}

function ShowRightLogo(vType)
{
	if (typeof(vType) == 'undefined') vType = 1;
	
	if (vType==1){
		if (RefVal8.length>0)
		{
			document.writeln('<div class="fl">');
			var alRightLogo1 = new adlistshow(RefVal8,'RightLogo1',0,0,0,120,240);
			document.writeln('</div>');
		}
		else
		{			
			document.writeln('<div class="fl">');		
			document.writeln(ShowFlashObject('AdRightLogo1', 'lhqc_vne_120x240.swf', 120, 240));
			document.writeln('</div>');			
			return;
		}
	}
	else if (vType==2){
		if (RefVal9.length>0)
		{
			document.writeln('<div class="fl">');
			var alRightLogo2 = new adlistshow(RefVal9,'RightLogo2',0,0,0,120,240);
			document.writeln('</div>');
		}
		else
		{				
			document.writeln('<div class="fl">');		
			document.writeln(ShowFlashObject('AdRightLogo2', 'lhqc_vne_120x240.swf', 120, 240));
			document.writeln('</div>');
			return;
		}
	}
}

function ShowLargeLogo(vType)
{
	if (typeof(vType) == 'undefined') vType = 1;
	
	if (vType==1){
		if (RefVal4.length>0)
		{
			document.writeln('<div class="box-item">');			
			var alLargeLogo1 = new adlistshow(RefVal4,'LargeLogo1',0,0,0,300,120);
			document.writeln('</div>');
			return;
		}
		else
		{			
			document.writeln('<div class="box-item">');			
			document.writeln(ShowFlashObject('AdLargeLogo1', 'lhqc_vne_300x120.swf', 300, 120));
			document.writeln('</div>');				
			return;
		}
	}
	else if(vType==2) {
		if (RefVal5.length>0)
		{
			document.writeln('<div class="box-item">');
			var alLargeLogo2 = new adlistshow(RefVal5,'LargeLogo2',0,0,0,300,120);
			document.writeln('</div>');
			return;
		}
		else
		{			
			document.writeln('<div class="box-item">');			
			document.writeln(ShowFlashObject('AdLargeLogo2', 'lhqc_vne_300x120.swf', 300, 120));
			document.writeln('</div>');	
			return;
		}
	}
	else if (vType==3) {
		if (RefVal10.length>0)
		{
			document.writeln('<div class="box-item">');	
			ShowBigAdvHeader();
			var alLargeLogo3 = new adlistshow(RefVal20,'LargeLogo3',0,0,0,300,250);
			document.writeln('</div>');
			return;
		}
		else
		{			
			document.writeln('<div class="box-item">');		
			ShowBigAdvHeader();
			document.writeln(ShowFlashObject('AdLargeLogo3', 'lhqc_vne_300x250.swf', 300, 250));
			document.writeln('</div>');	
			return;
		}
	}
	else if(vType==4) {
		if (RefVal10.length>0)
		{
			document.writeln('<div class="box-item">');	
			ShowBigAdvHeader();
			var alLargeLogo4 = new adlistshow(RefVal10,'LargeLogo4',0,0,0,300,250);
			document.writeln('</div>');
			return;
		}
		else
		{					
			document.writeln('<div class="box-item">');			
			ShowBigAdvHeader();
			document.writeln(ShowFlashObject('AdLargeLogo4', 'lhqc_vne_300x250.swf', 300, 250));
			document.writeln('</div>');	
			return;
		}
	}
	else if(vType==5) {
		if (RefVal11.length>0)
		{
			document.writeln('<div class="box-item">');	
			ShowBigAdvHeader();
			var alLargeLogo4 = new adlistshow(RefVal11,'LargeLogo5',0,0,0,300,250);
			document.writeln('</div>');
			return;
		}
		else
		{					
			document.writeln('<div class="box-item">');			
			ShowBigAdvHeader();
			document.writeln(ShowFlashObject('AdLargeLogo5', 'lhqc_vne_300x250.swf', 300, 250));
			document.writeln('</div>');	
			return;
		}
	}
}

function ShowBigLogo()
{
	document.writeln('<div class="fl">');
	var alBigLogo1 = new adlistshow(RefVal6,'BigLogo1',0,1,0,180,600);
	document.writeln('</div>');	
}

function ShowBigLogo2()
{
	document.writeln('<div class="fl">');
	var alBigLogo1 = new adlistshow(RefVal18,'BigLogo2',0,1,0,180,600);
	document.writeln('</div>');	
}

function ShowBasicLogo(vAd)
{
	if (typeof(vAd) == 'undefined') vAd = 0;	
	document.writeln('<div class="fl">');
	//var alBasicLogo = new adlistshow(RefVal7,'BasicLogo',vAd,1,0,180,150,false);
	var alBasicLogo = new adlistshow(RefVal7,'BasicLogo',vAd,1,0,180,600,false);
	document.writeln('</div>');
}

function ShowBasicLogo2(vAd)
{
	if (typeof(vAd) == 'undefined') vAd = 0;
	document.writeln('<div class="fl">');	
	var alBasicLogo = new adlistshow(RefVal10,'BasicLogo2',vAd,10,0,180,300,false,1);
	document.writeln('</div>');
}

function ShowRightExpand(vAd)
{	
	document.writeln('<div class="fl">');
	if (typeof(vAd) == 'undefined') vAd = 0;
	if(PAGE_FOLDER==1000||PAGE_FOLDER==51){
		var alRightExpand = new adlistshow(RefVal17,'RightExpandLogo',vAd,10,0,180,300,false,1);
	}
	else
	{
		var alRightExpand = new adlistshow(RefVal17,'RightExpandLogo',vAd,0,0,180,300,true);
	}	
	document.writeln('</div>');
}

function ShowSpecialBanner(vAd)
{
	if (typeof(vAd) == 'undefined') vAd = 0;	
	document.writeln('<div class="fl">');	
	var alBasicLogo = new adlistshow(RefVal19,'SpecialLogo',vAd,1,0,180,600,false);
	document.writeln('</div>');
}

function ShowArticlebanner(vAd)
{
	if (typeof(vAd) == 'undefined') vAd = 0;
	document.writeln('<div class="fl txtc" style="width:100%;">');
	var alBasicLogo = new adlistshow(RefVal16,'ArticleBanner',vAd,0,0,468,60);
	document.writeln('</div>');
}

function ShowLogoRight(vAd) {	
	if (RefVal6.length+RefVal7.length+RefVal17.length+RefVal18.length+RefVal19.length==0){		
		document.writeln('<div class="fl">');		
		document.writeln(ShowFlashObject('AdLogoRight', 'lhqc_vne_180x150.swf', 180, 150));
		document.writeln('</div>');
		return;
	}	
	if(RefVal6.length!=0) ShowBigLogo();
	if(RefVal17.length!=0) ShowRightExpand(vAd);
	if(RefVal18.length!=0) ShowBigLogo2(vAd);
	if(RefVal7.length!=0) ShowBasicLogo(vAd);
	if(RefVal19.length!=0) ShowSpecialBanner(vAd);
}

function ShowLogoLeft(vType) {	
	if (RefVal4.length>0)
	{
		document.writeln('<div class="box-item2">');	
		ShowBigAdvHeader();
		var alLargeLogo1 = new adlistshow(RefVal4,'LargeLogo1',0,10,0,300,250,true,3);
		document.writeln('</div>');		
	}	
	/*else
	{
		document.writeln('<div class="box-item">');			
		document.writeln(ShowFlashObject('AdLogoLeft', 'lhqc_vne_300x250.swf', 300, 250));		
		document.writeln('</div>');
		return;
	}*/
}

function ShowFooterBanner() {
	if(RefVal12.length>0){
		document.writeln('<div class="fl">');			
		var alLargeLogo1 = new adlistshow(RefVal12,'FooterBanner',0,10,0,1000,73,true,2);
		document.writeln('</div>');
	}
}

function changeFolder(obj){	
	location.href = obj.value;
}

function checkSite(){
	if (location.href.substr(0, 21) != 'http://vnexpress.net/' && location.href.substr(0, 25) != 'http://www.vnexpress.net/' && location.href.substr(0, 26) != 'http://beta.vnexpress.net/') location.replace('http://vnexpress.net/');
}

function ShowBigAdvHeader(){
	document.write('<div class="adv-header">');
	document.write('<div class="adv-title fl">');
	document.write('<img alt="" src="/Images/Background/adv-title.gif" />');
	document.write('</div>');
	document.write('</div>');
}