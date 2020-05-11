// AjaxProcessing.js
// Xử lý Ajax

//var domain = 'http://localhost:51085/Shoes_Com';    //bên file ReadLanguageXml.js đã khai báo biến toàn cục
var HttpRequest = false;        
if (window.XMLHttpRequest) // Internet Explorer
{
    HttpRequest = new XMLHttpRequest();
}
else  // Other browsers  
{
    HttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
//Lấy DS Size của chủng loại sản phẩm
function GetListSize(CatalogID)
{
    var ddlSize;
    ddlSize = document.getElementById('Search_TopBrand_ddlSize');
    ddlColor = document.getElementById('Search_TopBrand_ddlColor');
    if (!HttpRequest) return;
    if (CatalogID < 1) return;
    var url = "Ajax/GetListSize.aspx?CatalogID=" + CatalogID;
    HttpRequest.open("GET", url);
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {
           var xml = HttpRequest.responseXML;
           var p = xml.getElementsByTagName("size");

           ddlSize.options.length = 0; //Xóa dữ liệu cũ
           for (i = 0; i < p.length; i++)
           {
               var value  = p[i].firstChild.nodeValue;
               var id = p[i].attributes[0].value;
               ddlSize.options[i] = new Option(value, id);
           }
           
           ddlSize.disabled = false;           
           ddlSize.focus();         
           ddlColor.disabled = false;    
        }
   }
   HttpRequest.send(null);       
}

//Hiển thị hình ảnh khi hover chuột vào image slide nhỏ phía dưới (trang chủ)
function HoverImageSlide2(productimageurl)
{
    document.getElementById('imgViewProduct').src = 'Cache/Uploads/ImageFiles/ProductImageSlides/' + productimageurl;
}
//Hiển thị hình ảnh (imageid) khi hover chuột vào image slide nhỏ phía dưới (trang chi tiết product)
function HoverImageSlide(imageid, productimageurl)
{
    document.getElementById(imageid).src = domain + '/Cache/Uploads/ImageFiles/ProductImageSlides/' + productimageurl;
}
//Lấy thông tin chi tiết của SP để hiển thị trên trang chủ (khung ở giữa)
function ViewDetailProduct(ProductID, Lang)
{
    var html = '';
    if (!HttpRequest) return;
    if (ProductID < 1) return;
    var url = "Ajax/GetDetailProduct.aspx?ProductID=" + ProductID;
    HttpRequest.open("GET", url);
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {
            
           var xml = HttpRequest.responseXML;
           var p = xml.getElementsByTagName("product");
           var name  = p[0].firstChild.nodeValue;
           var id = p[0].attributes[0].value;
           var catalogid = p[0].attributes[1].value;
           var productcode = p[0].attributes[2].value;
           var currency = p[0].attributes[3].value;
           var price = p[0].attributes[4].value;
           //var inventory = p[0].attributes[5].value;
           var imageurl = p[0].attributes[6].value;
           var producerimageurl = p[0].attributes[7].value;
           var producerid = p[0].attributes[8].value;
           var colorlist = p[0].attributes[10].value;
                               
           html = html + '<table cellpadding=0 cellspacing=0 class=tblTopProduct>\n';
           html = html + '<tr>\n';
           html = html + '<td align=left>';
           html = html + '<a href=\"Shopping/ProductDetail.aspx?ProductID=' + id + '&CatID=' + catalogid + '&Lang=' + Lang + '\" class=mylink><b>' + name + '</b></a>';
           if (currency == 'USD')
               html = html + '<br /><span class=price1>$' + price + '</span>';
           else if (currency == 'VND')
               html = html + '<br /><span class=price1>VND' + price + '</span>';
               
           html = html + '<br /><a href=\"Shopping/Product.aspx?Show=Producer&ProducerID=' + producerid + '&Lang=' + Lang + '\" class=mylink>' + GetValueNode('Web', 'Text', 'AllStyle') + '</a>';
           html = html + '</td>';
           html = html + '<td style=\"width:122px; height:54px;\">';
           html = html + '<a href=\"Shopping/Product.aspx?Show=Producer&ProducerID=' + producerid + '&Lang=' + Lang + '\">';
           html = html + '<img style=\"width:122px; height:54px;\" src=\"Cache/Uploads/ImageFiles/Producers/' + producerimageurl + '\" /></a></td>';
           html = html + '</tr>';
           html = html + '<tr>';
           html = html + '<td align=center colspan=2>';
           html = html + '<img id=\"imgViewProduct\" src=\"Cache/Uploads/ImageFiles/Products/' + imageurl + '\" class=\"imgLarge\" />';
           html = html + '</td>';
           html = html + '</tr>';
           
           //Image Slide
           var img = xml.getElementsByTagName("image");
           html = html + '<tr>';
           html = html + '<td align=center colspan=2>';
           for (i = 0; i < img.length; i++)
           {
               var productimageurl = img[i].attributes[1].value;
               html = html + '<img id=\"imgSlide' + i + '\" class=\"imgSmall\" onmouseover=javascript:HoverImageSlide2(\'' + productimageurl + '\') src=\"Cache/Uploads/ImageFiles/ProductImageSlides/' + productimageurl + '\" />';
           }
           html = html + '</td>';
           html = html + '</tr>';
           html = html + '</table>';             
           
           html = html + '<table cellpadding=2px cellspacing=2px style=\"width:340px; margin:10px; background-color:#f9f9f8;\">';
           html = html + '<tr>';
           html = html + '<td valign=middle>';
           html = html + '<img alt=Step 1 src=\"images/step1.gif\" />';
           html = html + '<select id=\"ddlProductColor\" style=\"width:160px;\">';
           html = html + '<option value=\"colorlist\" selected=\"selected\">' + colorlist + '</option>';
           html = html + '</select';
           html = html + '</td>';
           html = html + '<td><a href=\"javascript:SendMailProduct(' + id + ', \'ddlProductSizeWidth\')\" class=mylink><img style=\"vertical-align:middle;\" src=\"images/sendmail.jpg\" /><b>' + GetValueNode('Web', 'Text', 'SendMail') + '</b></a></td>';
           html = html + '</tr>';
           //Size product
           html = html + '<tr>';
           html = html + '<td valign=middle>';
           html = html + '<img alt=Step 2 src=\"images/step2.gif\" />';
           html = html + '<select id=\"ddlProductSizeWidth\" style=\"width:160px;\">';
           html = html + '<option value=\"-1\" selected=\"selected\">' + GetValueNode('Web', 'Text', 'SelectYourSize') + '</option>';
           var size = xml.getElementsByTagName("size");
           for (i = 0; i < size.length; i++)
           {
               var sizename  = size[i].firstChild.nodeValue;
               var sizeid = size[i].attributes[0].value;
               html = html + '<option value=\"' + sizeid + '\">' + sizename + '</option>';
           }
           html = html + '</select>';
           html = html + '</td>';
           html = html + '<td><a href=\"javascript:AddToWishList(' + id + ', \'ddlProductSizeWidth\')\" class=mylink><img style=\"vertical-align:middle;\" src=\"images/favorites_new.jpg\" /><b>' + GetValueNode('Web', 'Text', 'AddWishList') + '</b></a></td>';
           html = html + '</tr>';
           html = html + '<tr>';
           html = html + '<td valign=middle>';
           html = html + '<img alt=Step 3 src=\"images/step3.gif\" /><a href=\"javascript:GoToCart(' + id + ', \'ddlProductSizeWidth\')\"><img src=\"images/addtocart.jpg\" class=imgAddToCart />' + GetValueNode('Web', 'DisplayProduct', 'AddToCart') + '</a>';
           html = html + '</td>';
           html = html + '<td><a href=\"javascript:SendYourSize(' + id + ')\" class=mylink><img style=\"vertical-align:middle;\" src=\"images/smile.jpg\" /><b>' + GetValueNode('Web', 'Text', 'YourSize') + '</b></a></td>';
           html = html + '</tr>';
           html = html + '</table>';
           document.getElementById('div_show_product').innerHTML = html; 
        }
   }
   HttpRequest.send(null);   
}

//Chuỗi phân trang HTML bằng JScript
//ShowID = 999: TopViewedMostProduct, = 3: TopHotProduct
function GetHtmlPagingByJScript(ShowID, PageSize, CurrentPage, PagesToOutput, PageCount, Lang)
{
    //Khai báo text: First, Previous, Next, Last
    var arrText = new Array();
    arrText[0] = GetValueNode('Web', 'Paging', 'First');
    arrText[1] = GetValueNode('Web', 'Paging', 'Previous');
    arrText[2] = GetValueNode('Web', 'Paging', 'Next');
    arrText[3] = GetValueNode('Web', 'Paging', 'Last');                                            
    //Nếu Số trang hiển thị là số lẻ thì tăng thêm 1 thành chẵn
    if (PagesToOutput % 2 != 0)
    {
        PagesToOutput++; 
    }
    //Một nửa số trang để đầu ra, đây là số lượng hai bên.
    var PagesToOutputHalfed = PagesToOutput / 2;
    //Trang đầu tiên
    var startPageNumbersFrom = CurrentPage - PagesToOutputHalfed;
    //Trang cuối cùng
    var stopPageNumbersAt = CurrentPage + PagesToOutputHalfed;
    var strHtml = '';
    //Nối chuỗi phân trang
    strHtml = strHtml + '<div class=paging>';
    strHtml = strHtml + '<ul>';
    //Link First(Trang đầu) và Previous(Trang trước)
    if (CurrentPage > 1)
    {
        strHtml = strHtml + '<li class=button><a title=\"' + arrText[0] + '\" href=javascript:AjaxPagingTopProduct(' + ShowID + ',' + PageSize + ',1' + ',' + PagesToOutput + ',' + PageCount + ',\'' + Lang + '\')>' + '&laquo;&laquo;</a></li>';
        strHtml = strHtml + '<li class=button><a title=\"' + arrText[1] + '\" href=javascript:AjaxPagingTopProduct(' + ShowID + ',' + PageSize + ',' + (CurrentPage - 1) + ',' + PagesToOutput + ',' + PageCount + ',\'' + Lang + '\')>' + '&laquo;</a></li>';
    }
    if (startPageNumbersFrom < 1)
    {
        startPageNumbersFrom = 1;
        stopPageNumbersAt = PagesToOutput;
    }
    if (stopPageNumbersAt > PageCount)
    {
        stopPageNumbersAt = PageCount;
    }
    if ((stopPageNumbersAt - startPageNumbersFrom) < PagesToOutput)
    {
        startPageNumbersFrom = stopPageNumbersAt - PagesToOutput;
        if (startPageNumbersFrom < 1)
        {
            startPageNumbersFrom = 1;
        }
    }
    //Duyệt vòng for hiển thị các trang
    for (var i = startPageNumbersFrom; i <= stopPageNumbersAt; i++)
    {
        if (CurrentPage == i)
        {
            strHtml = strHtml + '<li class=selected>' + i + '</li>';
        }
        else
        {
            strHtml = strHtml + '<li><a href=javascript:AjaxPagingTopProduct(' + ShowID + ',' + PageSize + ',' + i + ',' + PagesToOutput + ',' + PageCount + ',\'' + Lang + '\')>' + i + '</a></li>';
        }
    }

    //Link Next(Trang tiếp) và Last(Trang cuối)
    if (CurrentPage != PageCount)
    {
        strHtml = strHtml + '<li class=button><a title=\"' + arrText[2] + '\" href=javascript:AjaxPagingTopProduct(' + ShowID + ',' + PageSize + ',' + (CurrentPage + 1) + ',' + PagesToOutput + ',' + PageCount + ',\'' + Lang + '\')>&raquo;</a></li>';
        strHtml = strHtml + '<li class=button><a title=\"' + arrText[3] + '\" href=javascript:AjaxPagingTopProduct(' + ShowID + ',' + PageSize + ',' + PageCount + ',' + PagesToOutput + ',' + PageCount + ',\'' + Lang + '\')>&raquo;&raquo;</a></li>';
    }
    strHtml = strHtml + '</ul>';
    strHtml = strHtml + '</div>';
    if (ShowID == 999)
        document.getElementById('div_paging_viewedmost').innerHTML = strHtml;
    else
        document.getElementById('div_paging').innerHTML = strHtml;
}

//Phân trang Top sản phẩm ở trang chủ (Khung bên phải)
function AjaxPagingTopProduct(ShowID, PageSize, CurrentPage, PagesToOutput, PageCount, Lang)
{
    var html = '';
    if (!HttpRequest) return;       
    //var url = "Ajax/GetTopProduct.aspx?ShowID=" + ShowID + "&PageSize=" + PageSize + "&CurrentPage=" + CurrentPage;
    var url = domain + '/Ajax/GetTopProduct.aspx?ShowID=' + ShowID + '&PageSize=' + PageSize + '&CurrentPage=' + CurrentPage;
    HttpRequest.open("GET", url);
    
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {
            var xml = HttpRequest.responseXML;
            var p = xml.getElementsByTagName("product");
            var vv = xml.getElementsByTagName("page");           
            var totalproduct = vv[0].attributes[1].value;
            if (totalproduct > PageSize)
                totalproduct = PageSize;
            html = html + '<table cellpadding=\"0px\" cellspacing=\"0px\" style=\"width: 480px;border:0px\">';
            for (i = 0; i < 2; i++)
            {
                html = html + '<tr>\n';
                for (j = 0; j < 2; j++)
                {
                    if (totalproduct > i * 2 + j)
                    {
                    var productname  = p[i * 2 + j].firstChild.nodeValue;
                    var productid = p[i * 2 + j].attributes[0].value;
                    var catalogid = p[i * 2 + j].attributes[1].value;
                    var currency = p[i * 2 + j].attributes[3].value;
                    var price = p[i * 2 + j].attributes[4].value;
                    var priceoffer = p[i * 2 + j].attributes[5].value;
                    var imageurl = p[i * 2 + j].attributes[6].value;
                    var producerid = p[i * 2 + j].attributes[7].value;
                    var producername = p[i * 2 + j].attributes[8].value;
                    var colorlist = p[i * 2 + j].attributes[9].value;
                    
                    html = html + '<td style=\"width:50%\">\n';
                    html = html + '<table cellpadding=\"0px\" cellspacing=\"0px\" class=\"tblTopProduct\">\n';
                    html = html + '<tr>\n';
                    html = html + '<td valign=\"middle\">\n';
                    html = html + '<img style=\"cursor:pointer;\" onclick=javascript:ViewDetailProduct(' + productid + ',\'' + Lang + '\') src=Cache/Uploads/ImageFiles/Products/' + imageurl + ' class=\"imgProduct\" />\n';
                    html = html + '<img alt=\"new\" src=\"images/new.jpg\" class=\"imgIconNew\" />&nbsp;';
                    html = html + '<img alt=\"hot\" src=\"images/hot.jpg\" class=\"imgIconNew\" />\n';
                    html = html + '</td>\n';
                    html = html + '</tr>\n';

                    html = html + '<tr>\n';
                    html = html + '<td><a class=\"mylink\" href=Shopping/Product.aspx?Show=Producer&ProducerID=' + producerid + '&Lang=' + Lang + '>' + producername + '</a></td>\n';
                    html = html + '</tr>\n';
                    html = html + '<tr>\n';
                    html = html + '<td><a class=\"mylink\" href=Shopping/ProductDetail.aspx?ProductID=' + productid + '&CatID=' + catalogid + '&Lang=' + Lang + '>' + productname + '</a></td>\n';
                    html = html + '</tr>\n';
                    
                    html = html + '<tr><td>' + colorlist;
                    html = html + '<a title=' + GetValueNode('Web', 'Text', 'ViewVideo') + ' href=More/ViewVideo.aspx?ProductID=' + productid + '&Lang=' + Lang + '><img style=\"padding-left:5px;vertical-align:middle;\" src=\"images/icon_video.jpg\" /></a>';
                    html = html + '</td></tr>\n';
                    html = html + '<tr><td><a href=\"Shopping/ProductDetail.aspx?ProductID=' + productid + '&CatID=' + catalogid + '&Lang=' + Lang + '#div_list_review' + '\">' + GetValueNode('Web', 'Text', 'ReadReview') + '</a></td></tr>\n';
                    
                    html = html + '<tr><td>';
                    if (currency == 'USD')
                    {
                        if (price != priceoffer)
                        {
                            html = html + '<span class=\"price_block\">' + price + '$' + '</span>&nbsp;&nbsp;';
                            html = html + priceoffer + '$';
                        }
                        else
                            html = html + price + '$';
                    }
                    else if (currency == "VND")
                    {
                        if (price != priceoffer)
                        {
                            html = html + '<span class=\"price_block\">' + price + 'VND</span>&nbsp;&nbsp;';
                            html = html + priceoffer + 'VND';
                        }
                        else
                            html = html + price + 'VND';
                    }
                    
                    //Size
                    var objSizeTag = xml.getElementsByTagName("sizeofproductid" + productid);
                    var idDllSize = 'ddlVSize' + productid;
                    html = html + '&nbsp;&nbsp;<select id=' + idDllSize + '>';
                    
                    for (var k = 0; k < objSizeTag.length; k++)
                    {
                        var sizename  = objSizeTag[k].firstChild.nodeValue;
                        var sizeid = objSizeTag[k].attributes[0].value;
                        html = html + '<option value=' + sizeid + '>' + sizename + '</option>';
                    }
                    html = html + '</select>';                                    
                    html = html + '</td></tr>\n';
                    
                    html = html + '<tr>\n';
                    html = html + '<td><a href=\"javascript:AddToCart(' + productid + ',\'' + idDllSize + '\')\"><img src=\"images/addtocart.jpg\" class=\"imgAddToCart\" />Add to cart</a></td>\n';
                    html = html + '</tr>\n';
                    html = html + '</table>\n';
                    html = html + '</td>\n';
                    }
                }
                html = html + '</tr>\n';
            }
            html += '</table>';
            if (ShowID == 999)  //TopViewedMost
                document.getElementById('divTopViewedMostProduct').innerHTML = html; 
            else if (ShowID == 3)
                document.getElementById('divTopProduct').innerHTML = html; 
            GetHtmlPagingByJScript(ShowID, PageSize, CurrentPage, PagesToOutput, PageCount, Lang);
        }               
    }
    HttpRequest.send(null);   
}

//Thêm sản phẩm vào giỏ hàng và chuyển đến trang Cart.aspx (dùng cho khung ở giữa Trang chủ)
function GoToCart(ProductID, IDdllSize)
{
    var Lang = GetURLParam('Lang');
    if (Lang == '') Lang = 'EN';
    var SizeID = GetObjectById(IDdllSize).value;
    if (SizeID == -1)
    {
        alert(GetValueNode('Web', 'Text', 'SelectYourSize2'));
        GetObjectById(IDdllSize).focus();
    }
    else if (SizeID != -1)
        //window.location.href = domain + '/Shopping/Cart.aspx?Action=Add&ProductID=' + ProductID;
    //sau này trang Cart.aspx xử lý thêm và response đến trang Cart.aspx để tránh Refresh
    {
        if (!HttpRequest) return;
        if (ProductID < 1) return;
        var url = domain + '/Ajax/AddToCart.aspx?GoToCartPage=True&ProductID=' + ProductID + '&SizeID=' + SizeID;
        HttpRequest.open("GET", url);
        HttpRequest.onreadystatechange = function()
        {
            if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
            {                
                window.location.href = domain + '/Shopping/Cart.aspx?VType=Cart&Lang=' + Lang;
            }
        }
        HttpRequest.send(null);  
    }
}

/*********************Thêm sản phẩm vào Giỏ hàng: Start*******************************/
function showDaddy(){
    document.getElementById('daddy').style.visibility='visible';        
}
function hideDaddy(){
    document.getElementById('daddy').style.visibility='hidden';
}   
function AddToCart(ProductID, IDdllSize)
{
    var SizeID = GetObjectById(IDdllSize).value;
    if (SizeID == -1)
    {
        alert(GetValueNode('Web', 'Text', 'SelectYourSize2'));
        GetObjectById(IDdllSize).focus();
    }
    else
    {
        var html = '';
        if (!HttpRequest) return;
        if (ProductID < 1) return;
        var url = domain + '/Ajax/AddToCart.aspx?ProductID=' + ProductID + '&SizeID=' + SizeID;
        HttpRequest.open("GET", url);
        HttpRequest.onreadystatechange = function()
        {
            if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
            {                
               var xml = HttpRequest.responseXML;
               var p = xml.getElementsByTagName("productinfo");
               var name  = p[0].firstChild.nodeValue;
               var id = p[0].attributes[0].value;
               var catalogid = p[0].attributes[1].value;
               var productcode = p[0].attributes[2].value;
               var currency = p[0].attributes[3].value;
               var price = p[0].attributes[4].value;
               //var inventory = p[0].attributes[5].value;
               var imageurl = p[0].attributes[6].value;
               var producerimageurl = p[0].attributes[7].value;
               var producerid = p[0].attributes[8].value;
               var producername = p[0].attributes[9].value;
               var colorlist = p[0].attributes[10].value;
               //Mô tả ngắn gọn
               var exp = xml.getElementsByTagName("briefdescription");
               var briefdescription  = exp[0].firstChild.nodeValue;
               
                html = html + '<table cellpadding=\"0px\" cellspacing=\"0px\" style=\"width:100%;font-size:11px;color:#878787\">\n';
                html = html + '<tr><td style=\"height:30px;font-weight:bold;font-size:12px;background-color:Aqua;color:Black;\">' + GetValueNode('Web', 'Text', 'AddToCartOK') + '</td></tr>';
                html = html + '<tr>\n';
                html = html + '<td valign=\"middle\">\n';
                html = html + '<a href=Shopping/ProductDetail.aspx?ProductID=' + id + '>';
                html = html + '<img src=Cache/Uploads/ImageFiles/Products/' + imageurl + ' style=\"width:120px;height:120px;border:0px;vertical-align:middle\" /></a>\n';
                html = html + '<img alt=\"new\" src=\"images/new.jpg\" class=\"imgIconNew\" />&nbsp;';
                html = html + '<img alt=\"hot\" src=\"images/hot.jpg\" class=\"imgIconNew\" />\n';
                html = html + '</td>\n';
                html = html + '</tr>\n';

                html = html + '<tr>\n';
                html = html + '<td><a class=\"mylink\" href=Shopping/ProductDetail.aspx?ProductID=' + id + '>' + name + '</a></td>\n';
                html = html + '</tr>\n';
                html = html + '<tr>\n';
                html = html + '<td><a class=\"mylink\" href=Shopping/Product.aspx?ProducerID=' + producerid + '>' + producername + '</a></td>\n';
                html = html + '</tr>\n';
                
                html = html + '<tr><td>' + colorlist + '</td></tr>\n';
                html = html + '<tr><td>Read Review</td></tr>\n';
                
                if (currency == 'USD')
                    html = html + '<tr><td>$ ' + price + '</td></tr>\n';
                else if (currency == "VND")
                    html = html + '<tr><td>VND ' + price + '</td></tr>\n';
                html = html + '<tr>\n';
                html = html + '<td>' + briefdescription + '</td>';
                html = html + '</tr>\n';
                html = html + '</table>\n';
                
               var objQuan = xml.getElementsByTagName("total");
               var totalquantity = objQuan[0].attributes[0].value;  //tổng số item trong giỏ hàng
               //Tô đậm chữ MyCart trên Header, cho biết có mấy SP trong Giỏ hàng
               var cartHtml = GetValueNode('Web', 'Header', 'MyCart') + ' <b>(' + totalquantity + ')</b>'
               document.getElementById('Header_lblMyCart').innerHTML = cartHtml;
               
               timerID=setTimeout('showDaddy()',0);
               setTimeout('hideDaddy()',5000);
               document.getElementById('daddy').innerHTML = html;
            }
        }
        HttpRequest.send(null);   
    }
}   
/*Cập nhật giỏ hàng*/
/*
    i: chỉ số (tăng dần khi thêm 1 sp vào cart, bắt đầu từ 0)
    ProductID: id sản phẩm
    PriceAfterSaleOff: giá trị đơn giá sau khi giảm giá (nếu có)
    CurrencyCode: mã tiền tệ
*/
function UpdateCart(i, ProductID, SizeID, PriceAfterSaleOff, CurrencyCode)
{
    var newquantity = document.getElementById('txtQuantity' + i).value;
    var newmoney = newquantity * PriceAfterSaleOff;
    document.getElementById('money' + i).innerHTML = '<strong>' +  newmoney + ' ' + CurrencyCode + '</strong>';
    
    if (!HttpRequest) return;
    var url = domain + '/Ajax/UpdateCart.aspx?ProductID=' + ProductID + '&SizeID=' + SizeID + '&NewQuantity=' + newquantity;
    HttpRequest.open("GET", url);
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {
           var xml = HttpRequest.responseXML;
           var total = xml.getElementsByTagName("total");  //đọc tag total
           var totalpriceUSD  = total[0].firstChild.nodeValue;     //tổng giá tiền phải trả USD
           document.getElementById('ctl00_ProductContentPlaceHolder_lblTotalValue').innerHTML = totalpriceUSD;
           //document.getElementById('ctl00_ProductContentPlaceHolder_lblTotalValue').innerHTML = totalpriceVND + ' (' + totalpriceUSD + ' USD)';
        }
    }
    HttpRequest.send(null); 
}
function RemoveItemInCart(Position)
{
    var html = '';
    if (!HttpRequest) return;
    if (Position < 0) return;
    var url = domain + '/Ajax/RemoveItemInCart.aspx?Position=' + Position;
    HttpRequest.open("GET", url);
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {
           var xml = HttpRequest.responseXML;
           var cart = xml.getElementsByTagName("product");  //đọc tag product
           html = html + '<table cellspacing=0px cellpadding=0px class=table_sc>';
           html = html + '<tr class=table_sc_tr_header>';
           html = html + '<td class=table_sc_td1>' + GetValueNode('Web', 'CompareProduct', 'ProductImage') + '</td>';
           html = html + '<td class=table_sc_td2>' + GetValueNode('Web', 'CompareProduct', 'ProductName') + '</td>';
           html = html + '<td class=table_sc_td3>' + GetValueNode('Web', 'CompareProduct', 'ProductPrice') + '</td>';
           html = html + '<td class=table_sc_td4>' + GetValueNode('Web', 'CompareProduct', 'Quantity') + '</td>';
           html = html + '<td class=table_sc_td5>' + GetValueNode('Web', 'DisplayProduct', 'Money') + '</td>';
           html = html + '<td class=table_sc_td6>' + GetValueNode('Web', 'DisplayProduct', 'Remove') + '</td>';
           html = html + '</tr>';
           
           for(var i = 0; i < cart.length; i++)
           {
                var name  = cart[i].firstChild.nodeValue;  //tên sp
                var id = cart[i].attributes[0].value;      //id sp
                var quantity = cart[i].attributes[1].value;      //số lượng sp
                var retailprice = cart[i].attributes[2].value;      //đơn giá sp
                var priceaftersaleoff = cart[i].attributes[3].value;      //giá bán sau khi tính saleoff(nếu có) sp
                var imageurl = cart[i].attributes[4].value;    //image sp
                var catalogid = cart[i].attributes[5].value;    //ProductCatalogID
                var money = cart[i].attributes[6].value;    //money = priceaftersaleoff * quantity
                var sizeid = cart[i].attributes[7].value;
                var currency = cart[i].attributes[8].value;
                var giabanchinhthuc = cart[i].attributes[9].value;
                var colorlist = cart[i].attributes[10].value;
                var sizename = cart[i].attributes[11].value;
                
                //Load HTML
                html = html + '<tr>';
                
                html = html + '<td><a href=' + domain + '/Shopping/ProductDetail.aspx?ProductID=' + id + '&CatID=' + catalogid + '&Lang=' + GetURLParam('Lang') + '>';
                html = html + '<img src=' + domain + '/Cache/Uploads/ImageFiles/Products/' + imageurl + ' width=80 height=80 />';
                html = html + '</a></td>';
                
                html = html + '<td><a class=td_product_name href=' + domain + '/Shopping/ProductDetail.aspx?ProductID=' + id + '&CatID=' + catalogid + '&Lang=' + GetURLParam('Lang') + '>';
                html = html + '<b>' + name + '</b></a>';
                html = html + '<br />' + colorlist + '<br />' + sizename + '</td>';

                html = html + '<td>';
                if (retailprice != priceaftersaleoff)
                {
                    html = html + '<b class=price_block>' + retailprice + '</b><br />';
                    html = html + '<span class=text_red><strong>' + priceaftersaleoff + '</strong></span>';
                }
                else
                    html = html + '<b class=text_red>' + retailprice + '</b>';

                html = html + '</td>';
                html = html + '<td><input size=5 id=\"txtQuantity' + i + '\" onchange=javascript:UpdateCart(\'' + i + '\',\'' + id + '\',\'' + sizeid + '\',\'' + giabanchinhthuc + '\',\'' + currency + '\') type=text value=' + quantity + ' /></td>';

                html = html + '<td><span id=\"money' + i + '\" class=text_red><strong>' + money + '</strong></span></td>';
                html = html + '<td><a href=javascript:RemoveItemInCart(' + i + ')' + '>';
                html = html + '<img src=' + domain + '/Images/delete.gif width=32px height=32px /></a></td>';
                
                html = html + '</tr>';
           }    //end for cart
           
           var total = xml.getElementsByTagName("total");       //đọc tag total    
           var totalpriceUSD  = total[0].firstChild.nodeValue;     //tổng giá tiền phải trả USD
           
           html = html + '<tr>';
           html = html + '<td colspan=2>';
           html = html + '<div class=sc_button>';
		   html = html + '<a href=' + domain + '/Default.aspx?Lang=' + GetURLParam('Lang') + ' class=sc_gray_button><span>' + GetValueNode('Web', 'DisplayProduct', 'ContinueBuying') + '</span></a>';
           html = html + '<a href='+ domain + '/Shopping/Cart.aspx?VType=Payment&Lang=' + GetURLParam('Lang') + ' class=sc_green_button><span>' + GetValueNode('Web', 'DisplayProduct', 'Payment') + '</span></a>';
           html = html + '</div>';
           html = html + '</td>';
           html = html + '<td align=right>';
           html = html + '<b class=text_black>' + GetValueNode('Web', 'DisplayProduct', 'Total') + '</b>';
           html = html + '</td>';
		   html = html + '<td align=left colspan=3>';
		   //html = html + '<b class=text_red>' + totalprice + ' (' + totalpriceUSD + ')' + '</b>';
		   html = html + '<b><span id=\"ctl00_ProductContentPlaceHolder_lblTotalValue\" class=text_red>' + totalpriceUSD + '</span></b>';
           html = html + '</td>';
           html = html + '</tr>';                            
           html = html + '</table>';  
           
           document.getElementById('list_cart_detail').innerHTML = html;
        }
   }
   HttpRequest.send(null);    
}
/*********************Thêm sản phẩm vào Giỏ hàng: End*******************************/

/*************************SendMailToFriend, AddToWishList, SendYourSize: Start***********************************/
function SendMailProduct(ProductID, IDdllSize)
{
    var SizeID = GetObjectById(IDdllSize).value;
    if (SizeID == -1)
    {
        alert(GetValueNode('Web', 'Text', 'SelectYourSize2'));
        GetObjectById(IDdllSize).focus();
    }
    else
    {
        var url = domain + '/Popup/EmailProductToFriend.aspx?ProductID=' + ProductID + '&SizeID=' + SizeID;
        window.open(url,"SendMailToFriend","width=420,height=500,menubar=no,scrollbars=yes");
    }
}
function AddToWishList(ProductID, IDdllSize)
{
    var SizeID = GetObjectById(IDdllSize).value;
    if (SizeID == -1)
    {
        alert(GetValueNode('Web', 'Text', 'SelectYourSize2'));
        GetObjectById(IDdllSize).focus();
    }
    else
    {
        //xử lý Ajax add SP vào wish list cho khách hàng (có yêu cầu khách login)
        var Username = GetObjectById('lblCustomerUsername').innerHTML;
        if (Username == '')
            window.location.href = domain + '/Profiles/Login-Register.aspx?Action=AddWishList&ProductID=' + ProductID + '&SizeID=' + SizeID + '&Lang=EN';
        else
            window.location.href = domain + '/Profiles/WishList.aspx?Action=Add&ProductID=' + ProductID + '&SizeID=' + SizeID + '&Lang=EN';
        //alert('Added to your wish list successfully!');
    }
}
function SendYourSize(ProductID)
{
    var url = domain + '/Popup/SendYourSize.aspx?ProductID=' + ProductID;
    window.open(url,"SendYourSize","width=420,height=500,menubar=no,scrollbars=yes");
}
/*************************SendMailToFriend, AddToWishList, SendYourSize: End***********************************/

/*xem VD: xemlich.com*/
function CheckToWriteReview(Lang)
{
    var val = GetObjectById('ctl00_DefaultContentPlaceHolder_hidSessionCustomer').value;
    if (val == '') 
    {
        GetObjectById('HrefWriteReview').href = domain + '/Popup/CustomerLogin.aspx?Lang=' + Lang;
    }
    else if (val != '') 
    {
        document.getElementById('div_write_review').style.display = "";
        window.location.href = '#div_write_review';
    }
}
function WriteReviews(Lang)
{
    var nVoteType = 4; //có 4 tiêu chuẩn đánh giá SP
    if (!HttpRequest) return;
    var ProductID = GetURLParam('ProductID');
    var Title = GetObjectById('txtTitle').value;
    var Comment = GetObjectById('txtComment').value;
    var CustomerUsername = GetObjectById('ctl00_DefaultContentPlaceHolder_hidSessionCustomer').value;    
    var arr = new Array();
    for(var i = 1; i <= nVoteType; i++)
    {
        for(var j = 1; j <= 5; j++)
        {
            var rblId = 'rbl' + i + '_' + j;
            if (GetObjectById(rblId).checked == true)
                arr[i] = GetObjectById(rblId).value;
        }
    }
    var strMarks = '';
    for(var m = 1; m <= nVoteType; m++)
        strMarks += '&mark' + m + '=' + arr[m];
    
    var url = domain + '/Ajax/WriteProductReviews.aspx?Lang=' + Lang + '&ProductID=' + ProductID + '&Title=' + Title + '&Comment=' + Comment + '&CustomerUsername=' + CustomerUsername + '&nVoteType=' + nVoteType + strMarks;    
    HttpRequest.open("GET", url);
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {   
            GetObjectById('div_write_review').style.display = "none";
            alert('Added your previews sucessfully! Thanks!');
            var strText = HttpRequest.responseText;
            GetObjectById('div_list_review').innerHTML = strText;
        }
    }
    HttpRequest.send(null);
}

//Ẩn hiện 2 tab xem QuickView Product
function ShowHidePanelViewProduct(objClicked)
{
    var o = document.getElementById('QuickView');
    var o1 = document.getElementById('Description');
    
    if (objClicked.id == o.id){
        o.className="tdActive";
        o1.className="tdNone";
        o1.style.background="#E5E5E5";
        o.style.width = "110"; o1.style.width = "110";
        document.getElementById('SelectTab1').style.display='block';
        document.getElementById('SelectTab2').style.display='none';
    }
    else{
        o1.className="tdActive";
        o.className="tdNone";
        o.style.background="#E5E5E5";
        o.style.width = "110"; o1.style.width = "110";
        document.getElementById('SelectTab2').style.display='block';
        document.getElementById('SelectTab1').style.display='none';
    }
    //objClicked.style.background="url(Images/subbgMenu.gif)";
    objClicked.style.background="#ff8c00";
}

function QuickViewProduct(ProductID, Lang)
{
    var html = '';
    if (!HttpRequest) return;
    if (ProductID < 1) return;
    var url = domain + '/Ajax/GetDetailProduct.aspx?ProductID=' + ProductID + '&Lang=' + Lang;
    HttpRequest.open("GET", url);
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {                
           var xml = HttpRequest.responseXML;
           var p = xml.getElementsByTagName("product");
           var name  = p[0].firstChild.nodeValue;
           var id = p[0].attributes[0].value;
           var catalogid = p[0].attributes[1].value;
           var productcode = p[0].attributes[2].value;
           var currency = p[0].attributes[3].value;
           var price = p[0].attributes[4].value;
           //var inventory = p[0].attributes[5].value;
           var imageurl = p[0].attributes[6].value;
           var producerimageurl = p[0].attributes[7].value;
           var producerid = p[0].attributes[8].value;
           var producername = p[0].attributes[9].value;
           var colorlist = p[0].attributes[10].value;
           html = html + '<table cellpadding=\"0px\" cellspacing=\"0px\" class=\"tableContent\">';
           html = html + '<tr>';
           html = html + '<td id=\"QuickView\" align=\"left\" class=\"tdActive\" onclick=\"ShowHidePanelViewProduct(this);\" title=' + GetValueNode('Web', 'Text', 'ClickToQuickView') + '>';
           html = html + '<span>' + GetValueNode('Web', 'Text', 'QuickView') + '</span>';
           html = html + '</td>';
           html = html + '<td id=\"Description\" align=\"left\" class=\"tdNone\" onclick=\"ShowHidePanelViewProduct(this);\" title=' + GetValueNode('Web', 'Text', 'ClickToViewDesc') + '>';
           html = html + '<span>' + GetValueNode('Web', 'Text', 'Description') + '</span>';
           html = html + '</td>';
           html = html + '<td style="width:220px;"></td>';
           html = html + '</tr>';
           
           html = html + '<tr>';
           html = html + '<td align=\"left\" colspan=\"3\">';
           html = html + '<table id=\"containerQuickView\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"display: block\" width=\"100%\">';
           html = html + '<tr>';
           html = html + '<td align=\"left\" style=\"padding-left:10px;\">';
           var img = xml.getElementsByTagName("image");
           for (i = 0; i < img.length; i++)
           {
               var productimageurl = img[i].attributes[1].value;
               html = html + '<img id=\"imgVSlide' + i + '\" class=\"imgSmall\" onmouseover=javascript:HoverImageSlide(\'imgProductQuickView\',\'' + productimageurl + '\') src=\"' + domain + '/Cache/Uploads/ImageFiles/ProductImageSlides/' + productimageurl + '\" /><br />';
           }
           
           html = html + '</td>';
           html = html + '<td align=\"left\" style=\"padding-left:10px; vertical-align:top;\">';
           html = html + '<div><img class=\"imgBrand2\" src=\"' + domain + '/Cache/Uploads/ImageFiles/Producers/' + producerimageurl + '\" /></div>';
           html = html + '<div>';
           html = html + '<img id=imgProductQuickView class=imgProductQuickView src=' + domain + '/Cache/Uploads/ImageFiles/Products/' + imageurl + ' /></a>\n';
           html = html + '</div>';
           html = html + '</td>';
           html = html + '<td align=\"left\" style=\"padding-left:10px; vertical-align:top;\">';
           html = html + '<div class=productname>' + name + '</div>';
           html = html + '<div id=\"SelectTab1\" style=\"display: block\">';
           html = html + '<div><img src=\"' + domain + '/images/new.jpg\" /></div>';
           if (currency == 'USD')
               html = html + '<div>$' + price + '</div>';
           else
               html = html + '<div>' + price + 'VND</div>';
           html = html + '<div>' + GetValueNode('Web', 'Text', 'SelectColor') + '</div>'
           html = html + '<div><select id=\"ddlVColor\"><option value=\"1\">' + colorlist + '</option></select></div>';
           
           html = html + '<p class=productname><a href=' + domain + '/Shopping/ProductDetail.aspx?ProductID=' + id + '&CatID=' + catalogid + '&Lang=' + Lang + '>' + GetValueNode('Web', 'Text', 'MoreDetail') + '</a></p>';
           html = html + '</div>'; //end_SelectTab1
           
           var bdTag = xml.getElementsByTagName("briefdescription"); //mô tả vắn tắt
           var bdContent  = bdTag[0].firstChild.nodeValue;
           html = html + '<div id=\"SelectTab2\" style=\"display:none;\">';
           html = html + bdContent;                      
           html = html + '</div>';  //end_SelectTab2           
           
           html = html + '<div>' + GetValueNode('Web', 'Text', 'SelectYourSize') + '</div>';
           html = html + '<div><select id=\"ddlVSize\">';
           html = html + '<option value=\"-1\" selected=\"selected\">' + GetValueNode('Web', 'Text', 'SelectYourSize') + '</option>';
           var size = xml.getElementsByTagName("size");
           for (i = 0; i < size.length; i++)
           {
               var sizename  = size[i].firstChild.nodeValue;
               var sizeid = size[i].attributes[0].value;
               html = html + '<option value=\"' + sizeid + '\">' + sizename + '</option>';
           }
           html = html + '</select></div>';
           html = html + '<div><a href=\"javascript:GoToCart(' + id + ', \'ddlVSize\')\"><img alt=\"Add to cart\" style=\"vertical-align:middle\" src=\"' + domain + '/images/addtocart.jpg\" /><b>' + GetValueNode('Web', 'DisplayProduct', 'AddToCart') + '<b></a></div>';
           html = html + '</td>';
           html = html + '</tr>';
           html = html + '</table>';
           html = html + '</td>';
           html = html + '</tr>';
           html = html + '</table>';
            Shadowbox.open({
                content:    html,
                player:     "html",                        
                /*title:      "Welcome",*/
                height:     355,
                width:      421
            });
        }
    }
    HttpRequest.send(null);   
}   

/***********************Khách hàng đăng nhập tại trang Thanh toán********************************************
Còn nếu đăng nhập tại Popup/CustomerLogin.aspx thì javascript tại trang đó luôn*/
function CustomerLogin()
{
    var username = document.getElementById('ctl00_ProductContentPlaceHolder_txtCustomerUsername').value;
    var password = document.getElementById('ctl00_ProductContentPlaceHolder_txtCustomerPassword').value;
    if (!HttpRequest) return;
    var url = domain + '/Ajax/CustomerLogin.aspx?Username=' + username + '&Password=' + password + '&GetInfo=True';
    HttpRequest.open("GET", url);
    HttpRequest.onreadystatechange = function()
    {
        if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
        {
           var xml = HttpRequest.responseXML;
           var tag = xml.getElementsByTagName("result");    
           var r  = tag[0].firstChild.nodeValue;               
           if (r == 'True')
           {
                document.getElementById('customer_login').style.display = "none";
                document.getElementById('ctl00_ProductContentPlaceHolder_div_paymentinfo').style.display = "";
                //Lấy thông tin khách hàng
                var objInfo = xml.getElementsByTagName("customerinfo");    
                var customerid = objInfo[0].attributes[0].value;
                var customeremail = objInfo[0].attributes[1].value;
                var customerfullname = objInfo[0].attributes[3].value;
                var customeraddress = objInfo[0].attributes[4].value;                
                var customermobi = objInfo[0].attributes[5].value;
                var customertel = objInfo[0].attributes[6].value;
                var customerfax = objInfo[0].attributes[7].value;
                var customergender = objInfo[0].attributes[8].value;
                
                GetObjectById('ctl00_ProductContentPlaceHolder_txtBuyingPersonName').value = customerfullname;
                GetObjectById('ctl00_ProductContentPlaceHolder_txtBuyingPersonAddress').value = customeraddress;
                if (customergender == 0)//Nam
                {
                    GetObjectById('ctl00_ProductContentPlaceHolder_rblBuyingPersonGender_0').checked = true;    //Nam
                    GetObjectById('ctl00_ProductContentPlaceHolder_rblBuyingPersonGender_1').checked = false;   //Nữ
                }
                else if (customergender == 1)//Nữ
                {
                    GetObjectById('ctl00_ProductContentPlaceHolder_rblBuyingPersonGender_1').checked = true;     //Nữ
                    GetObjectById('ctl00_ProductContentPlaceHolder_rblBuyingPersonGender_0').checked = false;    //Nam
                }
                GetObjectById('ctl00_ProductContentPlaceHolder_txtBuyingPersonMobile').value = customermobi;
                GetObjectById('ctl00_ProductContentPlaceHolder_txtBuyingPersonTel').value = customertel;
                GetObjectById('ctl00_ProductContentPlaceHolder_txtBuyingPersonEmail').value = customeremail;
                GetObjectById('ctl00_ProductContentPlaceHolder_txtBuyingPersonFax').value = customerfax;
           }
           else if (r == 'False')
                document.getElementById('ctl00_ProductContentPlaceHolder_lblMessageLogin').style.display = "";
        }
        else
        {
            document.getElementById('ctl00_ProductContentPlaceHolder_lblMessageLogin').style.display = "";
            document.getElementById('ctl00_ProductContentPlaceHolder_lblMessageLogin').innerHTML = 'Processing...!';
        }
    }
    HttpRequest.send(null);   
}

//Click tìm SP tại Trang chủ
function ClickSearchProduct(Lang)
{
    var cat = GetObjectById('ddlGenderCategory').value;
    if (cat != 'GenderCategory')
    {
        var size = GetObjectById('Search_TopBrand_ddlSize').value;
        var color = GetObjectById('Search_TopBrand_ddlColor').value;
        if (size == 'AnySize')
            alert(GetValueNode('Web', 'Text', 'PleaseChooseSize'));
        else 
        {
            if (color == '0')
                alert(GetValueNode('Web', 'Text', 'PleaseChooseColor'));
            else
                window.location.href = domain + '/Shopping/Product.aspx?Show=Cat&CatID=' + cat + '&SizeID=' + size + '&ColorID=' + color + '&Lang=' + Lang;
        }
    }
    else if (cat == 'GenderCategory')
        alert(GetValueNode('Web', 'Text', 'PleaseChooseCategory'));
}
//Click vào Màu sắc để tìm kiếm
function SearchByColor(Host, ID, ColorID, Lang, Show)
{
    var strID = '';
    if (Show == 'Cat')
        strID = '&CatID=' + ID;
    else if (Show == 'Producer')
        strID = '&ProducerID=' + ID;
    window.location.href = Host + '/Shopping/Product.aspx?Show=' + Show + strID + '&ColorID=' + ColorID + '&Lang=' + Lang;
}