// JScript File

function querySt(ji) 
{
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i=0;i<gy.length;i++) 
    {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }
}

function getLang()
{
    var Lang = querySt("Lang");
    if (Lang == null) Lang = "VI";
    return Lang;
}
/*************************Jscript Change Image: Start************************/
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
/*************************Jscript Change Image: End************************/

function loadActiveTopMenu()
{
    var t = querySt("t");
    var lang = querySt("Lang");
    if (lang == null) lang = "VI";
    if (t == null)
        document.getElementById('imgHome').src = 'images/menu_home_' + lang + '_on.gif';
    if (t == "about")
        document.getElementById('imgAbout').src = 'images/menu_about_' + lang + '_on.gif';
    else if (t == "news")
        document.getElementById('imgNews').src = 'images/menu_news_' + lang + '_on.gif';
    else if (t == "design")
        document.getElementById('imgDesign').src = 'images/menu_design_' + lang + '_on.gif';
    else if (t == "hosting")
        document.getElementById('imgHosting').src = 'images/menu_hosting_' + lang + '_on.gif';
    else if (t == "demo")
        document.getElementById('imgWebDemo').src = 'images/menu_web_' + lang + '_on.gif';
    else if (t == "contact")
        document.getElementById('imgContact').src = 'images/menu_contact_' + lang + '_on.gif';
}
function loadSubMenuOfSidebar()
{
    var CatID = querySt("CatID");
    document.getElementById('child' + CatID).style.display = 'block';
}

function loadFaqDetails(ID, Lang)
{
    $('#lblAnswer' + ID).load('FAQDetail.aspx?ID=' + ID + '&Lang=' + Lang);
    $('#lblAnswer' + ID).toggle();
}
function loadPage(id, pageUrl)
{
    $('#' + id).load(pageUrl);
}
function loadTabContent(spectype, lang)
{
    var pageUrl = 'DynamicContent.aspx?SpecType=' + spectype + '&Lang=' + lang;
    $('#dynamic-content').load(pageUrl);
    document.getElementById('img' + spectype).src = 'images/img' + spectype + 'Active' + lang + '.gif';
    if (spectype == 'design')
    {
        document.getElementById('imgweb').src = 'images/imgweb' + lang + '.gif';
        document.getElementById('imgseo').src = 'images/imgseo' + lang + '.gif';
        document.getElementById('imgpr').src = 'images/imgpr' + lang + '.gif';
    }
    else if (spectype == 'web')
    {
        document.getElementById('imgdesign').src = 'images/imgdesign' + lang + '.gif';
        document.getElementById('imgseo').src = 'images/imgseo' + lang + '.gif';
        document.getElementById('imgpr').src = 'images/imgpr' + lang + '.gif';
    }
    else if (spectype == 'seo')
    {
        document.getElementById('imgdesign').src = 'images/imgweb' + lang + '.gif';
        document.getElementById('imgweb').src = 'images/imgweb' + lang + '.gif';
        document.getElementById('imgpr').src = 'images/imgpr' + lang + '.gif';
    }
    else if (spectype == 'pr')
    {
        document.getElementById('imgdesign').src = 'images/imgweb' + lang + '.gif';
        document.getElementById('imgseo').src = 'images/imgseo' + lang + '.gif';
        document.getElementById('imgweb').src = 'images/imgweb' + lang + '.gif';
    }
}

function showMakeQuestion()
{
    $('#tr_make_question').toggle();
}
function search()
{
    var text = document.getElementById('textSearch').value;
    var searchby = document.getElementsByName('searchby');
    var type;
    for(var i = 0; i < searchby.length; i++)
    {
        var obj = document.getElementsByName('searchby').item(i);
        if (document.getElementById(obj.id).checked)
            //alert(obj.id + " =  " + obj.value);
            type = obj.value;
    }
    window.location.href = "Search.aspx?type=" + type + "&text=" + text;
}
//Hiển thị các tab nội dung trong trang ProductDetail.aspx
function showInfo(id)
{
    var content = $('#' + id).html();
    $("#product_detail_content").html(content);
}

function changeTabContent(obj)
{
    objClass = $(obj).attr("class");
    $("#div_tech").removeClass("vtab_active");
    $("#div_comfort").removeClass("vtab_active");
    $("#div_image").removeClass("vtab_active");

    $("#div_tech").addClass("vtab_inactive");
    $("#div_comfort").addClass("vtab_inactive");
    $("#div_gallery").addClass("vtab_inactive");
    $(obj).removeClass("vtab_inactive");
    $(obj).addClass("vtab_active");
    contentId = $(obj).attr("id") + "_content";
    content = $("#"+contentId).html();
    $("#product_detail_content").html(content);
}
function goToCart(ProductID, Lang)
{
    window.location.href = "Cart.aspx?Action=Add&ProductID=" + ProductID + "&Lang=" + Lang;
}


function addToCartRidirect(ProductID)
{
    //var Lang = querySt("Lang");
    //if (Lang == null) Lang = "VI";
    var Lang = getLang();
    window.location.href = "Cart.aspx?Action=Add&ProductID=" + ProductID + "&Lang=" + Lang;
}
function updateCartRidirect(ProductID, i)
{
    var newquantity = document.getElementById('txtQuantity' + i).value;
    window.location.href = "Cart.aspx?Action=Update&ProductID=" + ProductID + "&NewQuantity=" + newquantity;
}
function deleteFromCartRidirect(i)
{
    var Lang = getLang();
    var textConfirm = GetValueNode('Web', 'Text', 'ConfirmDelete');
    
    //if(confirm('Bạn muốn xóa sản phẩm này khỏi giỏ hàng?'))
    if(confirm(textConfirm))
    {
        window.location.href = "Cart.aspx?Action=Remove&Position=" + i + "&Lang=" + Lang;
    }
}

//Hàm tìm kiếm tin tức chung toàn site
function toolSearch(type)
{
    var text = document.getElementById('text_search').value;
    window.location.href = "ArticleList.aspx?t=" + type + "&Text=" + text;
}
//khi đưa dấu nháy vào ô search thì mất dòng text
function focusTextBox(idTextbox)
{
    document.getElementById(idTextbox).value = "";
}
//khi đưa dấu nháy ra ngoài thì xuất hiện text
function blurTextBox(idTextbox, text)
{
    document.getElementById(idTextbox).value = text;
}

// return the value of the radio button that is checked
// return an empty string if none are checked, or
// there are no radio buttons
function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

// set the radio button with the given value as being checked
// do nothing if there are no radio buttons
// if the given value does not exist, all the radio buttons
// are reset to unchecked
function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}

function isValidPoll()
{
	var blnValid = false;
	var objPollAnswer = document.getElementsByName('poll_answer_value');
	for(i=0; i<objPollAnswer.length; i++)
		blnValid = blnValid || objPollAnswer[i].checked;
	//if (!blnValid)
		//window.alert("Xin vui lòng chọn câu trả lời!");
	return blnValid;
}

//Bỏ phiếu bình chọn
function pollSubmit(PollID)
{
    var blnValid = isValidPoll();
    if (blnValid)
    {
        var objPollAnswer = document.getElementsByName('poll_answer_value');
        var PollAnswerID = getCheckedValue(objPollAnswer);
        $.ajax({
          url: domain + '/Ajax/PollSubmit.aspx?PollAnswerID=' + PollAnswerID,
          success: function(data) {
            //$('.result').html(data);
            //call openPollResult function
            //alert('Vote sucessfull!');
            openPollResult(PollID);
          }
        });
    }
    else //alert("Xin vui lòng chọn câu trả lời!");
        alert(GetValueNode('Web', 'Text', 'PleaseSelectAnswer'));
}
//Xem kết quả cuộc bình chọn
function openPollResult(PollID)
{
    window.open(domain + '/Polls/PollResults.aspx?PollID=' + PollID + '&Lang=' + getLang(),'AGoodWeb Polls','width=450,height=440,scrollbars=yes,toolbar=no,menubar=no,status=no,resizable=no'); 
}

//Tìm kiếm sản phẩm theo text
function searchProductByText()
{
    var text = document.getElementById('text-search-product').value;
    window.location.href = "ProductList.aspx?Text=" + text + "&Lang=" + getLang();
}

function khaviActiveMenuTop()
{
    var url=self.location.href;
    var isFound=false;

    for(i=0;i<document.getElementsByTagName('a').length;i++){
	    var aObj=document.getElementsByTagName('a')[i];
	    if(aObj.id!='' && aObj.id.indexOf('left-menu-')>-1)
	    {
		    var currentID=',' + aObj.id.replace('left-menu-', '');
		    if(url.indexOf(currentID)>-1)
		    {
			    aObj.setAttribute('className', 'active');
			    aObj.setAttribute('class', 'active');
			    isFound=true;
			    break;
		    }
	    }
    }

    if(!isFound){
	    document.getElementById('left-menu-home').setAttribute('className', 'active');
	    document.getElementById('left-menu-home').setAttribute('class', 'active');
    }
}

function loadActiveTopMenuAndBottomMenu()
{
    var t = querySt("t");
    if (t == null)
    {
        $("#top-menu-home").addClass("active");
    }
    else
    {
        $("#top-menu-" + t).addClass("active");
    }
}