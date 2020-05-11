
// xu ly thao tac giao dien

function SetSelectGioiTinh(value, text) {
    $('#divslcGioiTinh').hide();    
    $('#txtGioiTinh').val(text);
    $('#hdfGioiTinhValue').val(value);
    if (value != " ") {   // co chon 
        $('#txtGioiTinh').show();
        $('#txtTieuDeGioiTinh').hide();
    }
    else {   // ko chon 
        $('#txtGioiTinh').hide();
        $('#txtTieuDeGioiTinh').show();
    }
}

function SetSelectHuong(value,text) {
    $('#divSclHuongNha').hide();
    $('#txtHuongNhaChon').val(text);
    $('#hdfHuongNhaValue').val(value);
    if (value != " ") {   // co chon 
        $('#txtHuongNhaChon').show();
        $('#txtHuongNhaMatDinh').hide();
    }
    else {   // ko chon 
        $('#txtHuongNhaChon').hide();
        $('#txtHuongNhaMatDinh').show();
    }    
}

//function XoaText(ctl) {
//    $('#'+ctl).val('');
//}


/////  end xu ly giao dien 


////////////// HAM XU LY PHONG THUY AJAX mới 

function TimPhongThuy() {
    var tuKhoa = $('#txtTuKhoa').val();
    if (tuKhoa == "" || tuKhoa == "Nhập từ khóa") /// Load tra cuu phong thuy  
    {
        $('#divSubMenu').hide();
        View();
    }
    else // Load kien thuc phong thuy
    {
        $('#divSubMenu').show();
        GetListTinTucPhongThuy('0', '1');
    }
}


function GetListTinTucPhongThuy(type, PageIndex) {
    // type : 0: moi nhat , 1:xem nhieu nhat 2: chon loc
    var tukhoa = "&tukhoa=" + $('#txtTuKhoa').val();
    var type1 = "&type=" + type;
    var pIndex = "&pIndex=" + PageIndex;
    var rcc = "&rcc=20";
    $('#divKetQua').html("<div style='text-align:center'><IMG alt=''src=" + pathClientAjax + "images/loading.gif></div>");
    var url = pathClientAjax + "handler/ViewDirectionHomeHandler.aspx@act=GetListTinTucPhongThuy" + pIndex + rcc + tukhoa + type1 + "&d=" + (new Date()).getTime();
    $.get(url, {},
		function (data) {
		    $('#divKetQua').html(data);
		    var tps = (parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()) - parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()))) > 0 ? ((parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()))) + 1) : parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()));
		    if (tps < $("#hCurrentPageRfs").val())
		        $("#hCurrentPageRfs").val(1);
		    nvgPaging.DrawPageListBdsUsers(tps, $("#hCurrentPageRfs").val(), "dvPaging", "gotoPagePostpaging");
		});
}

function gotoPagePostpaging(numberpage) {
    GetListTinTucPhongThuy(0, numberpage);
}


/////////////// End HAM XU LY PHONG THUY AJAX mới

function View() {
    var namsinh = $('#txtNamsinh').val();
    var gioitinh = $('#hdfGioiTinhValue').val();
    var huongnha = $('#hdfHuongNhaValue').val();

    if (namsinh == "") {
        alert("Bạn phải nhập năm sinh!");       
        return false;
    }
    if (!isAllDigit(trim(namsinh, ' '))) {
        alert("Bạn nhập năm sinh chưa đúng!");       
        return false;
    }    
    if (gioitinh == "") {
        alert("Bạn phải chọn giới tính!");        
        return false;
    }

    var namsinh1 = "&namsinh=" + namsinh;
    var huong1 = "&huong=" + huongnha;
    var gioitinh1 = "&gioitinh=" + gioitinh;
    $('#divKetQua').html("<div style='text-align:center'><IMG alt=''src=" + pathClientAjax + "images/loading.gif></div>");    
    var url = pathClientAjax + "handler/ViewDirectionHomeHandler.aspx@act=View" + namsinh1 + huong1 + gioitinh1 + "&d=" + (new Date()).getTime();
    $.get(url, {},
		function (data) {
		    $('#divBaoKetQua').show();
		    $('#divKetQua').html(data);

		});
}


function ViewDetail() {
    var ctrlID_ = document.getElementById("hdfCtrlXPT").value;
    if (document.getElementById(ctrlID_ + "_txt_Namsinh").value == "") {
        alert("Bạn phải nhập năm sinh!");
        document.getElementById(ctrlID_ + "_txt_Namsinh").focus();
        return false;
    }
    if (!isAllDigit(trim(document.getElementById(ctrlID_ + "_txt_Namsinh").value, ' '))) {
        alert("Bạn nhập năm sinh chưa đúng!");
        document.getElementById(ctrlID_ + "_txt_Namsinh").focus();
        return false;
    }

    if (document.getElementById(ctrlID_ + "_select_Gioitinh").value == "") {
        alert("Bạn phải chọn giới tính!");
        document.getElementById(ctrlID_ + "_select_Gioitinh").focus();
        return false;
    }
    var namsinh = "&namsinh=" + document.getElementById(ctrlID_ + "_txt_Namsinh").value;
    var huong = "&huong=" + document.getElementById(ctrlID_ + "_select_huong").value;
    var gioitinh = "&gioitinh=" + document.getElementById(ctrlID_ + "_select_Gioitinh").value;
    path = document.getElementById('hdpathImage').value;
    document.getElementById('txtHint').innerHTML = "<div align='center' style='padding-top:10px;'><IMG alt=''src=" + pathClientAjax + "images/loading6.gif></div>";
    var url = pathClientAjax + "handler/ViewDirectionHomeHandler.aspx@act=ViewDetail" + namsinh + huong + gioitinh + "&d=" + (new Date()).getTime();
    new Ajax.Request(url, {
        method: 'get',
        onSuccess: function (transport) {
            document.getElementById('txtHint').style.display = 'block';
            document.getElementById('txtHint').innerHTML = transport.responseText;
            document.getElementById('outerPhongThuyContainer').style.height = '1050px';
            document.getElementById('overlayPhongThuy').style.height = '2500px';
        },
        onFailure: function (e) {
            return false;
        } 
    }
	)

}
function isDigit(c) {
    return ((c >= "0") && (c <= "9"))
}

function isAllDigit(s) {
    var i;
    if (isEmpty(s))
        if (isAllDigit.arguments.length == 1) return false;
        else return (isDigital.arguments[1] == true);
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (isDigit(c) == false)
            return false;
    }
    return true;
}
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

/*--------------------Detail--------------------*/
function ShowformXemHuong() {
    var ctrlID_ = document.getElementById("hdfCtrlXPT").value;
    document.getElementById('phongthuypopups').style.top = '68%';
    document.getElementById('txtHint').style.display = 'none';
    document.getElementById('phongthuypopups').style.height = '160px';
    document.getElementById('phongthuypopups').style.display = 'block';
    document.getElementById(ctrlID_ + "_txt_Namsinh").focus();
}

//function ShowPhongThuy() {
//    var ctrlID_ = document.getElementById("hdfCtrlXPT").value;
//    var act = "act=ShowPhongThuy";
//    var url = pathClientAjax + "handler/ViewDirectionHomeHandler.aspx?" + act + "&d=" + (new Date()).getTime();
//    new Ajax.Request(url, {
//        method: 'get',
//        onSuccess: function (transport) {
//            if (transport.responseText != "") {
//                Element.setInnerHTML("divNoiDungPhongPhuy", transport.responseText);
//                Element.show('boxPhongThuy');
//                document.getElementById(ctrlID_ + "_txt_Namsinh").focus();
//            }
//            else
//                Element.hide('boxPhongThuy');
//        },
//        onFailure: function (e) {
//            return false;
//        }
//    }
//	);
//}   duoc dung trong PropertyDetail de show Popup Phong thuy => dem ham nay qua file js propertydetail



function KeyPressPhongThuy(e, type) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode == 13) {
        switch (type) {
            case "ViewDetail":
                ViewDetail();
                break;
            case "View":
                View();
                break;
        }
    }
}




/////// Send mail Trả lời Tư Vấn ConsultingReply

function ShowFormSendMailFriendTuVan(id) {
    var act = "act=ShowFormSendMailFriendTuVan";
    act += "&id=" + id; 
    var url = pathClientAjax + "handler/ViewDirectionHomeHandler.aspx?" + act;
    $.get(url,
			function (data) {
			    $('#login_box').html(data);
			    $("#login_box").centerInClient();
			    $('#login_box').show();
			}
		);

}

function SendConsultingToFriend(IdTuVan) {
    var act = "act=SendMailFriendTuVan";
    act += "&id=" + IdTuVan;
    act += "&from=" + $("#From").val();
    act += "&to=" + $("#To").val();   
    var url = pathClientAjax + "handler/ViewDirectionHomeHandler.aspx?" + act;
    $.post(url,{content:$("#Content").val()},
			function (data) {
                if(data!="")
                    alert("Email đã được gởi.");
                else
                    alert("Email chưa thể gởi đi. Bạn vui lòng thử lại.");
                $('#login_box').hide();

			}
		);       
}


