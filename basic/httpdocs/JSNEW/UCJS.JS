
//ucBanner
function ShowSupport(flag) {
    if (flag == true) {
        document.getElementById("divSupport1").style.display = "block";
        document.getElementById("divSupport2").style.display = "none";
    }
    else {
        document.getElementById("divSupport2").style.display = "block";
        document.getElementById("divSupport1").style.display = "none";
    }
}
if (document.getElementById("divSupport1") != undefined && document.getElementById("divSupport1") != null
	&& document.getElementById("divSupport2") != undefined && document.getElementById("divSupport2") != null) {
    var DATETIME_ = new Date();
    var hours_ = DATETIME_.getHours();
    var day_ = DATETIME_.getDay();
    if (hours_ >= 8 && hours_ <= 17 && day_ != 0 || (day_ == 6 && hours_ >= 8 && hours_ <= 12)) {
        ShowSupport(true);
    }
    else {
        ShowSupport(false);
    }
}
//end ucBanner
//uc LatestProperty
var timeOutFuncPageVipPiRight = null;
var ListBDSVipRight = {
    spdTimeoutPage: 30000,
    ListPropertyLatestRightAll: function (st, tt, pt) {
        var url = pathClientAjax + "handler/Handler.aspx@act=latestpiall&st=" + st + "&tt=" + tt + "&pt=" + pt;
        $.get(url,
			function (data) {
			    if (data != "0")
			        $('#divVipPiLatestRight_ctrl').html(data);
			}
		);
    },
    ListPropertyLatestRight: function (cat, _page, st, tt, pt) {
        if (timeOutFuncPageVipPiRight != null)
            clearTimeout(timeOutFuncPageVipPiRight);
        for (i = 1; i <= 3; i++)
            document.getElementById("cat_pilatest_" + i).className = '';
        document.getElementById("cat_pilatest_" + cat).className = 'current';
        $('#ListPiLatest').html("<div style='text-align:center'><IMG alt=''src=" + pathClient + "/Images/loading.gif></div>");
        var url = pathClientAjax + "handler/Handler.aspx@act=latestpi&cat=" + cat + "&p=" + _page + "&st=" + st + "&tt=" + tt + "&pt=" + pt;
        $.get(url,
			function (data) {
			    if (data.split('###')[0] != "")
			        $('#ListPiLatest').html(data.split('###')[0]);
			    else {
			        $('#ListPiLatest').html("<li>Không có dữ liệu</li>");
			    }
			    $('#ulPagingPiLatest').html(data.split('###')[1]);
			    $('#ulPagingPiLatest').show();
			}
		);
    },
    
    fadeInData: function (id1, id2, spd, sta) {
        if (sta == true)
            document.getElementById("divImgThumbnails2").style.display = 'none';
        $(id1).html($(id2).html());
        if (sta == true)
            $(id1).fadeIn(spd);
    },
    goNextSlide: function (p, event_) {
        //count for paging
        var _ITEMS_PAGES = parseInt($("#idItemPageSlideBds").val());
        var tps = (parseInt($("#hTotalRowsSlideBds").val()) % _ITEMS_PAGES) != 0 ? (parseInt(parseInt($("#hTotalRowsSlideBds").val()) / (_ITEMS_PAGES)) + 1) : parseInt(parseInt($("#hTotalRowsSlideBds").val()) / (_ITEMS_PAGES));
        //end
        if (p > parseInt(tps)) p = 1;

        if (event_ != "auto") {
            if (timeOutFuncPageVipPiRight != null) clearTimeout(timeOutFuncPageVipPiRight);
            timeOutFuncPageVipPiRight = setTimeout("ListBDSVipRight.goNextSlide(" + (p + 1) + ",'auto')", ListBDSVipRight.spdTimeoutPage);
        }
        else timeOutFuncPageVipPiRight = setTimeout("ListBDSVipRight.goNextSlide(" + (p + 1) + ",'auto')", ListBDSVipRight.spdTimeoutPage);

        $('#ListPiLatest').html($('#divVipPiRight_' + p).html());

        //set paging
        ListBDSVipRight.mjPagingSlideshow(tps, p, "ulPagingPiLatest");
        //end

    },
    mjPagingSlideshow: function (_tongSoTrang, __pIndex, ElementID_) {
        var theme = "";
        var next = parseInt(__pIndex) + 1;
        var pre = parseInt(__pIndex) - 1;
        if (__pIndex < _tongSoTrang && __pIndex > 1) {
            theme = "<li><a href='javascript:ListBDSVipRight.goNextSlide(" + pre + ",\"click\");' >Lùi</a>&nbsp;|&nbsp;&nbsp;</li>";
            theme += "<li><a href='javascript:ListBDSVipRight.goNextSlide(" + next + ",\"click\");'>Tới</a></li>";
        }
        else if (__pIndex == _tongSoTrang && __pIndex != 1) {
            theme = "<li><a href='javascript:ListBDSVipRight.goNextSlide(" + pre + ",\"click\");' >Lùi</a></li>";
        }
        else if (__pIndex == 1 && __pIndex != _tongSoTrang) {
            theme = "<li><a href='javascript:ListBDSVipRight.goNextSlide(" + next + ",\"click\");' >Tới</a></li>";
        }

        theme += "<li class=\"right\"><a href='" + $("#hCurrentPageSqs").val() + "'>Xem tất cả</a></li>";

        $('#' + ElementID_).show();
        $('#' + ElementID_).html(theme);

    },
    startSlideVipPi: function () {
        for (i = 1; i <= 3; i++)
            document.getElementById("cat_pilatest_" + i).className = '';
        document.getElementById("cat_pilatest_3").className = 'current';

        if (document.getElementById('divVipPiRight_1') != null) {
            ListBDSVipRight.goNextSlide(1, 'click');
        }
        else {
            $('#ulPagingPiLatest').hide();
            $('#ListPiLatest').html("");
        }
    }
};

if (document.getElementById('ctlLastestPiRight_stateid') != null && document.getElementById('ctlLastestPiRight_stateid') != undefined) {
    ListBDSVipRight.ListPropertyLatestRightAll($('#ctlLastestPiRight_stateid').val(), $('#ctlLastestPiRight_loaigd').val(), $('#ctlLastestPiRight_loaibds').val());
    ListBDSVipRight.startSlideVipPi();
}
//end uc LatestProperty
//uc VipBDS300
var timeOutFuncPageVipBDS300 = null;
var LstVipBDS300 = {
    spdTimeoutPage: 30000,
    ListPropertyLatestRightAll: function (st, tt, pt) {
        var url = pathClientAjax + "handler/Handler.aspx@act=latestpiall&st=" + st + "&tt=" + tt + "&pt=" + pt;
        $.get(url,
			function (data) {
			    if (data != "0")
			        $('#divVipPiLatestRight_ctrl').html(data);
			}
		);
    },
    ListPropertyLatestRight: function (cat, _page, st, tt, pt) {
        if (timeOutFuncPageVipBDS300 != null)
            clearTimeout(timeOutFuncPageVipBDS300);
        for (i = 1; i <= 3; i++)
            document.getElementById("cat_pilatest_" + i).className = '';
        document.getElementById("cat_pilatest_" + cat).className = 'current';
        $('#ListPiLatest').html("<div style='text-align:center'><IMG alt=''src=" + pathClient + "/Images/loading.gif></div>");
        var url = pathClientAjax + "handler/Handler.aspx@act=latestpi&cat=" + cat + "&p=" + _page + "&st=" + st + "&tt=" + tt + "&pt=" + pt;
        $.get(url,
			function (data) {
			    if (data.split('###')[0] != "")
			        $('#ListPiLatest').html(data.split('###')[0]);
			    else {
			        $('#ListPiLatest').html("<li>Không có dữ liệu</li>");
			    }
			    $('#ulPagingPiLatest').html(data.split('###')[1]);
			    $('#ulPagingPiLatest').show();
			}
		);
    },
    fadeInData: function (id1, id2, spd, sta) {
        if (sta == true)
            document.getElementById("divImgThumbnails2").style.display = 'none';
        $(id1).html($(id2).html());
        if (sta == true)
            $(id1).fadeIn(spd);
    },
    goNextSlide: function (p, event_) {
        //$("#vipBds300Total").val()  		

        if (p == 1) {
            document.getElementById("vip300Pre").onclick = function () {
                LstVipBDS300.goNextSlide(parseInt($("#vipBds300Total").val()), 'click');
            };
            document.getElementById("vip300Next").onclick = function () {
                LstVipBDS300.goNextSlide((p + 1), 'click');
            }

        }
        else if (p == $("#vipBds300Total").val()) {
            document.getElementById("vip300Pre").onclick = function () {
                LstVipBDS300.goNextSlide((p - 1), 'click');
            };
            document.getElementById("vip300Next").onclick = function () {
                LstVipBDS300.goNextSlide(1, 'click');
            }

        }
        else {
            document.getElementById("vip300Pre").onclick = function () {
                LstVipBDS300.goNextSlide((p - 1), 'click');
            };
            document.getElementById("vip300Next").onclick = function () {
                LstVipBDS300.goNextSlide((p + 1), 'click');
            };

        }
        if (event_ != "auto") {
            if (timeOutFuncPageVipBDS300 != null) clearTimeout(timeOutFuncPageVipBDS300);
            if (p == $("#vipBds300Total").val()) timeOutFuncPageVipBDS300 = setTimeout("LstVipBDS300.goNextSlide(1,'auto')", LstVipBDS300.spdTimeoutPage);
            else timeOutFuncPageVipBDS300 = setTimeout("LstVipBDS300.goNextSlide(" + (p + 1) + ",'auto')", LstVipBDS300.spdTimeoutPage);
        }
        else {
            if (p == $("#vipBds300Total").val()) timeOutFuncPageVipBDS300 = setTimeout("LstVipBDS300.goNextSlide(1,'auto')", LstVipBDS300.spdTimeoutPage);
            else timeOutFuncPageVipBDS300 = setTimeout("LstVipBDS300.goNextSlide(" + (p + 1) + ",'auto')", LstVipBDS300.spdTimeoutPage);
        }

        $('.BoxInfo').hide();
        $('#divVipBDS300_' + p).show();
    },
    mjPagingSlideshow: function (_tongSoTrang, __pIndex, ElementID_) {
        var theme = "";
        var next = parseInt(__pIndex) + 1;
        var pre = parseInt(__pIndex) - 1;
        if (__pIndex < _tongSoTrang && __pIndex > 1) {
            theme = "<li><a href='javascript:LstVipBDS300.goNextSlide(" + pre + ",\"click\");' >Lùi</a>&nbsp;|&nbsp;&nbsp;</li>";
            theme += "<li><a href='javascript:LstVipBDS300.goNextSlide(" + next + ",\"click\");'>Tới</a></li>";
        }
        else if (__pIndex == _tongSoTrang && __pIndex != 1) {
            theme = "<li><a href='javascript:LstVipBDS300.goNextSlide(" + pre + ",\"click\");' >Lùi</a></li>";
        }
        else if (__pIndex == 1 && __pIndex != _tongSoTrang) {
            theme = "<li><a href='javascript:LstVipBDS300.goNextSlide(" + next + ",\"click\");' >Tới</a></li>";
        }

        theme += "<li class=\"right\"><a href='" + $("#hCurrentPageSqs").val() + "'>Xem tất cả</a></li>";

        $('#' + ElementID_).show();
        $('#' + ElementID_).html(theme);

    },
    startSlideVipPi: function () {
        if (document.getElementById('divVipBDS300_2') != null) {
            LstVipBDS300.goNextSlide(2, 'click');
        }
    },
    LoadData: function () {
        var tt = $('#VipBDS300_stateid').val();
        var qh = $('#VipBDS300_suburbid').val();
        var lbds = $('#VipBDS300_loaibds').val();
        var lgd = $('#VipBDS300_loaigd').val();

        var url = pathClientAjax + "handler/PropertyHandler.aspx@act=topvip300";
        var pars = { tt: tt, qh: qh, lbds: lbds, lgd: lgd };
        $.post(url, pars,
			function (data) {
			    if (data != "") {
			        $('#VipBDS300_result').html(data);
			        $('#VipBDS300_result').show();
			        LstVipBDS300.startSlideVipPi();
			    }
			    else $('#VipBDS300_result').hide();
			}
		);
    }
};

 if (document.getElementById('VipBDS300_stateid') != null && document.getElementById('VipBDS300_stateid') != undefined) {
     LstVipBDS300.LoadData();
 }
//end uc VipBDS300
//uc EstateRight
function ListEstateRight(cat, _page, st) {
    for (i = 0; i < 3; i++)
        document.getElementById("cat" + i).className = '';
    document.getElementById("cat" + cat).className = 'current';
    $('#ListEstate').html("<div style='text-align:center'><IMG alt=''src=" + pathClient + "/Images/loading.gif></div>");
    var url = pathClientAjax + "handler/Handler.aspx@act=EstateRight&cat=" + cat + "&p=" + _page + "&st=" + st;
    $.get(url,
			function (data) {
			    if (data.split('###')[0] != "")
			        $('#ListEstate').html(data.split('###')[0]);
			    else $('#ListEstate').html("<li>Không có dữ liệu</li>");
			    $('#ulPaging').html(data.split('###')[1]);
			}
		);
}
//end uc EstateRight
//Hoat Dong DN
function loadNextNews(div) {

    var j = parseInt(div);
    var total = $('#hdfTotalDiv_hddn').val();
    var divAction = "#div_tinhddn_";

    for (var i = 0; i < total; i++) {
        if ($(divAction + i) != null)
            $(divAction + i).hide();
    }
    if ($(divAction + j) != null)
        $(divAction + j).fadeIn(800);
    j++;
    if (j == total) j = 0;
    if (total > 1)
        setTimeout("loadNextNews(" + j + ")", 20000);
}
loadNextNews(0);
//end Hoat Dong DN
//UcLeftQuickFind

var _quickSreachLeftFlag = false;

function timNhanh() {
    _quickSreachLeftFlag = true;
    if (document.getElementById(_prefixSearchLeft + '_sltQuan').value == "" && document.getElementById(_prefixSearchLeft + '_txtDienTich').value == "Diện tích tối thiểu (m2)"
  			&& document.getElementById(_prefixSearchLeft + '_txtGiaTu').value == "Giá thấp nhất" && document.getElementById(_prefixSearchLeft + '_txtGiaDen').value == "Giá cao nhất"
  			&& document.getElementById(_prefixSearchLeft + '_sltLoaiNha').value == "" && document.getElementById(_prefixSearchLeft + '_sltPhongNgu').value == ""
  			&& document.getElementById(_prefixSearchLeft + '_sltDuAn').value == "" && document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value == "Kích thước đường tối thiểu (m)"
  			&& document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value == "Kích thước mặt tiền tối thiểu (m)"
  			&& document.getElementById(_prefixSearchLeft + '_txtKeyword').value == "Từ khóa"
  		) {
        _quickSreachLeftFlag = false;
        return false;
    }
    if (document.getElementById(_prefixSearchLeft + '_txtDienTich').value != "Diện tích tối thiểu (m2)") {
        if (KiemTraChuoiSo(document.getElementById(_prefixSearchLeft + '_txtDienTich').value) == false) {
            alert("Diện tích nhập sai!");
            document.getElementById(_prefixSearchLeft + '_txtDienTich').focus();
            return false;
        }
    }
    if (document.getElementById(_prefixSearchLeft + '_txtGiaTu').value != "Giá thấp nhất") {
        if (KiemTraChuoiSo(document.getElementById(_prefixSearchLeft + '_txtGiaTu').value) == false) {
            alert("Giá từ nhập sai!");
            document.getElementById(_prefixSearchLeft + '_txtGiaTu').focus();
            return false;
        }
    }
    if (document.getElementById(_prefixSearchLeft + '_txtGiaDen').value != "Giá cao nhất") {
        if (KiemTraChuoiSo(document.getElementById(_prefixSearchLeft + '_txtGiaDen').value) == false) {
            alert("Giá đến nhập sai!");
            document.getElementById(_prefixSearchLeft + '_txtGiaDen').focus();
            return false;
        }
    }
    if (document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value != "Kích thước đường tối thiểu (m)") {
        if (KiemTraChuoiSo(document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value) == false) {
            alert("Vui lòng nhập số!");
            document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').focus();
            return false;
        }
    }
    if (document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value != "Kích thước mặt tiền tối thiểu (m)") {
        if (KiemTraChuoiSo(document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value) == false) {
            alert("Vui lòng nhập số!");
            document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').focus();
            return false;
        }
    }

    var _sRegis = "";
    var fSuburb = "";
    var fLoaiNha = ""; var fDuAn = ""; var fGiaTu = ""; var fGiaDen = ""; var fDienTich = ""; var fPhong = ""; var fPriceType = "";
    var fdtn = ""; var fph = ""; var fdg = ""; var fmttt = ""; var ftck = ""; var fkw = "";
    var _searchString = document.getElementById(_prefixSearchLeft + '_hdfCookieUrl').value;
    var _sArraySearchString = _searchString.split('&');

    for (var i = 0; i < _sArraySearchString.length; i++) {
        _sTextFirst = _sArraySearchString[i].split('=')[0];
        if (_sTextFirst.indexOf("Suburb") != -1 || _sTextFirst.indexOf("suburbID") != -1 || _sTextFirst.indexOf("suburb") != -1)
            fSuburb = _sArraySearchString[i];
        if (_sTextFirst.indexOf("cbHomeClass") != -1)
            fLoaiNha = _sArraySearchString[i];
        if (_sTextFirst.indexOf("cbEstate") != -1)
            fDuAn = _sArraySearchString[i];
        if (_sTextFirst.indexOf("cbMinPrice") != -1)
            fGiaTu = _sArraySearchString[i];
        if (_sTextFirst.indexOf("cbMaxPrice") != -1)
            fGiaDen = _sArraySearchString[i];
        if (_sTextFirst.indexOf("txtArea") != -1)
            fDienTich = _sArraySearchString[i];
        if (_sTextFirst.indexOf("cbRoomMin") != -1)
            fPhong = _sArraySearchString[i];
        if (_sTextFirst.indexOf("cbPriceType") != -1)
            fPriceType = encodeURI(_sArraySearchString[i]);
        //bien moi
        if (_sTextFirst.indexOf("ph") != -1)
            fph = _sArraySearchString[i];
        if (_sTextFirst.indexOf("dg") != -1)
            fdg = _sArraySearchString[i];
        if (_sTextFirst.indexOf("dtn") != -1)
            fdtn = _sArraySearchString[i];
        if (_sTextFirst.indexOf("mttt") != -1)
            fmttt = _sArraySearchString[i];
        if (_sTextFirst.indexOf("tck") != -1)
            ftck = _sArraySearchString[i];
        if (_sTextFirst.indexOf("kw") != -1)
            fkw = _sArraySearchString[i];
    }
    //kiem tra gia thap nhat
    if (document.getElementById(_prefixSearchLeft + '_txtGiaTu').value == "Giá thấp nhất" && document.getElementById(_prefixSearchLeft + '_txtGiaDen').value != "Giá cao nhất") {
        document.getElementById(_prefixSearchLeft + '_txtGiaTu').value = "0";
    }
    //neu co thi thay the chuoi		
    //chuoi cho loai nha
    var _sChuoiLoaiNha = "";
    for (var i = 0; i < document.getElementById(_prefixSearchLeft + '_sltLoaiNha').length; i++) {
        if (document.getElementById(_prefixSearchLeft + '_sltLoaiNha').options[i].selected == true) {
            _sChuoiLoaiNha += document.getElementById(_prefixSearchLeft + '_sltLoaiNha').options[i].value + ",";
        }
    }
    _sChuoiLoaiNha = _sChuoiLoaiNha.substring(0, _sChuoiLoaiNha.length - 1);
    if (document.getElementById(_prefixSearchLeft + '_sltQuan').value != "" && fSuburb != "") {
        if (fSuburb.indexOf("suburbID") != -1)
            _searchString = _searchString.replace(fSuburb, "suburbID=" + document.getElementById(_prefixSearchLeft + '_sltQuan').value);
        else
            _searchString = _searchString.replace(fSuburb, "Suburb=" + document.getElementById(_prefixSearchLeft + '_sltQuan').value);
    }
    if (fLoaiNha != "")
        _searchString = _searchString.replace(fLoaiNha, "cbHomeClass=" + _sChuoiLoaiNha);
    if (fDuAn != "")
        _searchString = _searchString.replace(fDuAn, "cbEstate=" + document.getElementById(_prefixSearchLeft + '_sltDuAn').value);

    if (document.getElementById(_prefixSearchLeft + '_txtGiaTu').value != "" && fGiaTu != "") {
        if (document.getElementById(_prefixSearchLeft + '_txtGiaTu').value == "Giá thấp nhất")
            _searchString = _searchString.replace("&" + fGiaTu, "");
        else
            _searchString = _searchString.replace(fGiaTu, "cbMinPrice=" + document.getElementById(_prefixSearchLeft + '_txtGiaTu').value);
    }

    if (document.getElementById(_prefixSearchLeft + '_txtGiaDen').value != "" && fGiaDen != "") {
        if (document.getElementById(_prefixSearchLeft + '_txtGiaDen').value == "Giá cao nhất")
            _searchString = _searchString.replace("&" + fGiaDen, "");
        else
            _searchString = _searchString.replace(fGiaDen, "cbMaxPrice=" + document.getElementById(_prefixSearchLeft + '_txtGiaDen').value);
    }
    if (document.getElementById(_prefixSearchLeft + '_txtDienTich').value != "" && fDienTich != "") {
        if (document.getElementById(_prefixSearchLeft + '_txtDienTich').value == "Diện tích tối thiểu (m2)")
            _searchString = _searchString.replace("&" + fDienTich, "");
        else
            _searchString = _searchString.replace(fDienTich, "txtArea=" + document.getElementById(_prefixSearchLeft + '_txtDienTich').value);
    }
    if (fPhong != "")
        _searchString = _searchString.replace(fPhong, "cbRoomMin=" + document.getElementById(_prefixSearchLeft + '_sltPhongNgu').value);

    if (fPriceType != "")
        _searchString = _searchString.replace(fPriceType, "cbPriceType=" + encodeURI("VND"));
    if (_searchString.lastIndexOf('_') == _searchString.length)
        _searchString = _searchString.substring(0, _searchString.length - 1);
    //replace nhung bien moi
    if ((fph != ""))
        _searchString = _searchString.replace(fph, "ph=" + document.getElementById(_prefixSearchLeft + '_sltPhuong').value);
    if ((fdg != ""))
        _searchString = _searchString.replace(fdg, "dg=" + document.getElementById(_prefixSearchLeft + '_sltDuong').value);
    if (document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value != "" && fdtn != "") {
        if (document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value == "Kích thước đường tối thiểu (m)")
            _searchString = _searchString.replace("&" + fdtn, "");
        else
            _searchString = _searchString.replace(fdtn, "dtn=" + document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value);
    }
    if (document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value != "" && fmttt != "") {
        if (document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value == "Kích thước mặt tiền tối thiểu (m)")
            _searchString = _searchString.replace("&" + fmttt, "");
        else
            _searchString = _searchString.replace(fmttt, "mttt=" + document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value);
    }
    if (document.getElementById(_prefixSearchLeft + '_txtKeyword').value != "" && fkw != "") {
        if (document.getElementById(_prefixSearchLeft + '_txtKeyword').value == "Từ khóa")
            _searchString = _searchString.replace("&" + fkw, "");
        else
            _searchString = _searchString.replace(fkw, "kw=" + document.getElementById(_prefixSearchLeft + '_txtKeyword').value);
    }
    //end replace bien moi

    //khong co thi add them vao chuoi		
    if (document.getElementById(_prefixSearchLeft + '_sltQuan').value != "" && fSuburb == "")
        _searchString += "&Suburb=" + document.getElementById(_prefixSearchLeft + '_sltQuan').value;
    if (document.getElementById(_prefixSearchLeft + '_sltLoaiNha').value != "" && fLoaiNha == "")
        _searchString += "&cbHomeClass=" + _sChuoiLoaiNha;
    if (document.getElementById(_prefixSearchLeft + '_sltDuAn').value != "" && fDuAn == "")
        _searchString += "&cbEstate=" + document.getElementById(_prefixSearchLeft + '_sltDuAn').value;
    if (document.getElementById(_prefixSearchLeft + '_txtGiaTu').value != "" && document.getElementById(_prefixSearchLeft + '_txtGiaTu').value != "Giá thấp nhất" && fGiaTu == "")
        _searchString += "&cbMinPrice=" + document.getElementById(_prefixSearchLeft + '_txtGiaTu').value;
    if (document.getElementById(_prefixSearchLeft + '_txtGiaDen').value != "" && document.getElementById(_prefixSearchLeft + '_txtGiaDen').value != "Giá cao nhất" && fGiaDen == "")
        _searchString += "&cbMaxPrice=" + document.getElementById(_prefixSearchLeft + '_txtGiaDen').value;
    if (document.getElementById(_prefixSearchLeft + '_txtDienTich').value != "" && document.getElementById(_prefixSearchLeft + '_txtDienTich').value != "Diện tích tối thiểu (m2)" && fDienTich == "")
        _searchString += "&txtArea=" + document.getElementById(_prefixSearchLeft + '_txtDienTich').value;
    if (document.getElementById(_prefixSearchLeft + '_sltPhongNgu').value != "" && fPhong == "")
        _searchString += "&cbRoomMin=" + document.getElementById(_prefixSearchLeft + '_sltPhongNgu').value;
    if (fPriceType == "")
        _searchString += "&cbPriceType=" + encodeURI("VND");
    if (document.getElementById(_prefixSearchLeft + '_txtKeyword').value != "" && document.getElementById(_prefixSearchLeft + '_txtKeyword').value != "Từ khóa" && fkw == "")
        _searchString += "&kw=" + document.getElementById(_prefixSearchLeft + '_txtKeyword').value;
    //dinh nghia nhung bien moi					
    if ((document.getElementById(_prefixSearchLeft + '_sltPhuong').value != "" && fph == ""))
        _sRegis += "&ph=" + document.getElementById(_prefixSearchLeft + '_sltPhuong').value;
    if ((document.getElementById(_prefixSearchLeft + '_sltDuong').value != "" && fdg == ""))
        _sRegis += "&dg=" + document.getElementById(_prefixSearchLeft + '_sltDuong').value;
    if (document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value != "" && document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value != "Kích thước đường tối thiểu (m)" && fdtn == "")
        _sRegis += "&dtn=" + document.getElementById(_prefixSearchLeft + '_txtKickThuocDuong').value;
    if (document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value != "" && document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value != "Kích thước mặt tiền tối thiểu (m)" && fmttt == "")
        _sRegis += "&mttt=" + document.getElementById(_prefixSearchLeft + '_txtMatTienToiThieu').value;


    sChangeType = "agent";
    firstTime = "true";

    var tab__ = "tab=ag";
    if (keyActiveTabInSearchModule == "OFF")
        tab__ = "tab=rv";
    var sPrefix = document.getElementById(_prefixSearchLeft + '_hdfType').value + "search.aspx";
    var loc__ = "";
    var sTemp = "";
    if (_searchString.indexOf("&tn=1") != -1) {
        loc__ = pathClientAjax + document.getElementById(_prefixSearchLeft + '_hdfType').value + "search.aspx?" + tab__ + "&" + _searchString.substring(0, _searchString.length) + _sRegis;
        sTemp = tab__ + "&" + _searchString.substring(0, _searchString.length) + _sRegis;
    }
    else {
        loc__ = pathClientAjax + document.getElementById(_prefixSearchLeft + '_hdfType').value + "search.aspx?" + tab__ + "&" + _searchString.substring(0, _searchString.length) + _sRegis + "&tn=1";
        sTemp = tab__ + "&" + _searchString.substring(0, _searchString.length) + _sRegis + "&tn=1";
    }
    var sKq_ = "";
    var ar_ = new Array();
    ar_ = sTemp.split('&');
    // & thay bang ~, = thay bang _
    for (var i = 0; i < ar_.length; i++) {
        if (i != (ar_.length - 1))
            sKq_ += ar_[i].replace('=', '_') + "~";
        else sKq_ += ar_[i].replace('=', '_');
    }
    nvgUtils.setCookie("url-SrchPrefix", "value=" + sPrefix, 100);
    nvgUtils.setCookie("url-SrchHis", "value=" + sKq_, 100);
    nvgUtils.setCookie("url-SrchHis-status", "value=0", 100);
    window.location = loc__;
}
var _prefixSearchLeft = "";
function initCombo() {
    if (document.getElementById('hdfCtlLeftQuickFind') == undefined || document.getElementById('hdfCtlLeftQuickFind') == null) return;
    else _prefixSearchLeft = $('#hdfCtlLeftQuickFind').val();
    if (_prefixSearchLeft != "") {
        //quan huyen
        if (document.getElementById(_prefixSearchLeft + '_hdfQh').value.split(',').length == 1) {
            document.getElementById(_prefixSearchLeft + '_sltQuan').value = document.getElementById(_prefixSearchLeft + '_hdfQh').value;
            Change_State_Suburb_selected('suburb', document.getElementById(_prefixSearchLeft + '_sltQuan').value, _prefixSearchLeft + '_sltPhuong', document.getElementById(_prefixSearchLeft + '_hdfWard').value);
            Change_State_Suburb_selected('suburb_street', document.getElementById(_prefixSearchLeft + '_sltQuan').value, _prefixSearchLeft + '_sltDuong', document.getElementById(_prefixSearchLeft + '_hdfDuong').value);
            LayDuAnTheoQuanHuyen_selected(document.getElementById(_prefixSearchLeft + '_sltQuan').value, _prefixSearchLeft + '_sltDuAn', document.getElementById(_prefixSearchLeft + '_hdfDa').value);
        }
    }
}
initCombo();
// end uc Left Quick Find

//start uc DoanhNghiepCenter
var DoanhNghiepCenterFunc = {
    speedTimeOut: 60000,
    timeOutVar: null,
    LoadNextMemCenter: function (div) {
        var count = parseInt($('#hdfCountRecord_gtdncenter').val());
        var j = parseInt(div);
        if (j != 0 && j != count) {
            $('#div_gtdn_center_' + (j + 1)).hide();
            $('#div_gtdn_center_' + (j - 1)).hide();
        }
        else {
            if (j == count) {
                $('#div_gtdn_center_0').hide();
                $('#div_gtdn_center_' + (count - 1)).hide();
            }
            if (j == 0) {
                $('#div_gtdn_center_1').hide();
                $('#div_gtdn_center_' + count).hide();
            }
        }

        $('#div_gtdn_center_' + div).fadeIn(800);

        document.getElementById('BtAlsoViewPrivious_Center').onclick = function () {
            if (j != 0)
                DoanhNghiepCenterFunc.LoadNextMemCenter(j - 1);
            else DoanhNghiepCenterFunc.LoadNextMemCenter(parseInt(count));
        }
        document.getElementById('BtAlsoViewNext_Center').onclick = function () {
            if (j != count)
                DoanhNghiepCenterFunc.LoadNextMemCenter(j + 1);
            else DoanhNghiepCenterFunc.LoadNextMemCenter(parseInt(0));
        }
    },
    ActiveTab: function (id, evnt) {
        if (DoanhNghiepCenterFunc.timeOutVar != null) {
            clearTimeout(DoanhNghiepCenterFunc.timeOutVar);
        }
        if (id == "1") {
            $('#hrfDoanhNghiepCenter1').addClass('current');
            $('#hrfDoanhNghiepCenter2').removeClass('current');

            $('#divDoanhNghiepCenter1').show();
            $('#divDoanhNghiepCenter2').hide();

            DoanhNghiepCenterFunc.timeOutVar = setTimeout("DoanhNghiepCenterFunc.ActiveTab('2')", DoanhNghiepCenterFunc.speedTimeOut);
        }
        else if (id == "2") {
            $('#hrfDoanhNghiepCenter1').removeClass('current');
            $('#hrfDoanhNghiepCenter2').addClass('current');

            $('#divDoanhNghiepCenter2').show();
            $('#divDoanhNghiepCenter1').hide();

            DoanhNghiepCenterFunc.timeOutVar = setTimeout("DoanhNghiepCenterFunc.ActiveTab('1')", DoanhNghiepCenterFunc.speedTimeOut);
        }
    }
};
DoanhNghiepCenterFunc.timeOutVar = setTimeout("DoanhNghiepCenterFunc.ActiveTab('2')", DoanhNghiepCenterFunc.speedTimeOut);
//end uc Doanh NghiepCenter
//start uc GTDoanhNghiep
function loadNextMem(div) {
    var count = parseInt($('#hdfCountRecord_gtdn').val());
    var j = parseInt(div);
    if (j != 0 && j != count) {
        $('#div_gtdn_' + (j + 1)).hide();
        $('#div_gtdn_' + (j - 1)).hide();
    }
    else {
        if (j == count) {
            $('#div_gtdn_0').hide();
            $('#div_gtdn_' + (count - 1)).hide();
        }
        if (j == 0) {
            $('#div_gtdn_1').hide();
            $('#div_gtdn_' + count).hide();
        }
    }

    $('#div_gtdn_' + div).fadeIn(800);

    document.getElementById('BtAlsoViewPrivious').onclick = function () {
        if (j != 0)
            loadNextMem(j - 1);
        else loadNextMem(parseInt(count));
    }
    document.getElementById('BtAlsoViewNext').onclick = function () {
        if (j != count)
            loadNextMem(j + 1);
        else loadNextMem(parseInt(0));
    }
}
//end uc GTDoanhNghiep
//start uc UcRelateNewsOfMainTab
var NewsRelateTabMainAjx = {
    LoadTab: function (cat, st) {
        $("#nrtmajx_news_0,#nrtmajx_news_2,#nrtmajx_news_4,#nrtmajx_news_1,#nrtmajx_news_5,#nrtmajx_news_12,#nrtmajx_news_13").removeClass("current");
        $('#nrtmajx_news_' + cat).addClass("current");

        var url = pathClientAjax + "handler/handler.aspx@act=nrtmajx_news";
        $.post(url, { c: cat, st: st },
					function (data) {
					    $('#divNewsTabBig').html(data.split("<===>")[0]);
					    $('#divNewsTabList').html(data.split("<===>")[1]);
					}
				);
    }
};
//end uc UcRelateNewsOfMainTab
//start uc EmailBDS
var trans = "";
function ChangeTrans() {
    if (document.getElementById("RadioGroup1_0_right").checked == true)
        trans = "1";
    else trans = "0";   
}


function GotoFormAlert() {

    var page_ = "users/main.aspx?ctl=6<===>itm=1";
    var CtlMst = document.getElementById('hdfCtlMst').value
    var url1 = page_ + "<===>trans=" + trans + "<===>proclass=" + document.getElementById("cbProClassRight").value + "<===>state=" + document.getElementById(CtlMst + "_EmailBDS1_select_Tinh_Thanhpho").value + "<===>suburb=" + document.getElementById(CtlMst + "_EmailBDS1_sltQuan").value + "<===>pricemin=" + document.getElementById("cbMinPrice1").value + "<===>pricemax=" + document.getElementById("cbMaxPrice1").value;
    var url = pathClientAjax + "handler/FormSearchHandler.aspx@act=checklogin&url=" + url1 + "&d=" + (new Date()).getTime();

    $.get(url,
			function (data) {
			    if (data == "") {
			        window.location = pathClientAjax + "users/main.aspx@ctl=6&itm=1&trans=" + trans + "&proclass=" + document.getElementById("cbProClassRight").value + "&state=" + document.getElementById(CtlMst + "_EmailBDS1_select_Tinh_Thanhpho").value + "&suburb=" + document.getElementById(CtlMst + "_EmailBDS1_sltQuan").value + "&pricemin=" + document.getElementById("cbMinPrice1").value + "&pricemax=" + document.getElementById("cbMaxPrice1").value;
			    }
			    else // chua dang nhập => show popup Email alert();
			    {
			        //$("#login_box_popup_header").html("Đăng nhập");
			        //$("#contentlogin").html(data);
			        //$('#login_box').show();
			        //document.getElementById("txtnamelogin").focus();	
                    	        
			        chuoiJson = { lst: [{ s1: trans,
			            s2: document.getElementById("cbProClassRight").value,
			            s3: '',
			            s4: document.getElementById(CtlMst+"_EmailBDS1_select_Tinh_Thanhpho").value,
			            s5: document.getElementById(CtlMst+"_EmailBDS1_sltQuan").value,
			            s6: document.getElementById("cbMinPrice1").value,
			            s7: document.getElementById("cbMaxPrice1").value,
			            s8: '',
			            s9: '',
			            s10: '',
			            s11: '',
			            s12: '',
			            s13: '',
			            s14: '',
			            s15: '',
			            s16: '',
			            s17: '',
			            s18: ''
			        }]
			        };

			        showPopupEmailAlert(); // ham o file EmailAlertClient.js
			    }
			}
		);

}
function GetPriceAlertRight(tt) { // cho UC EmailBDS và uc usrMyAlertClient dùng 
    var url = pathClientAjax + "handler/FormSearchHandler.aspx@act=LoadPriceAlert&t=" + tt + "&d=" + (new Date()).getTime();
    removeSelectbox('cbMinPrice1');
    removeSelectbox('cbMaxPrice1');

    $.get(url,
			function (data) {
			    var lcObjXmlDoc = data;
			    var lcNodes = lcObjXmlDoc.getElementsByTagName("*")[0].childNodes;
			    if (lcNodes.length > 0) {
			        try {
			            var cbMin = document.getElementById("cbMinPrice1");
			            var cbMax = document.getElementById("cbMaxPrice1");
			            for (var k = 0; k < lcNodes.length - 1; k++) {
			                var option_value = lcNodes[k].childNodes[0];
			                var option_text = lcNodes[k].childNodes[1];
			                var optionsMax_length = cbMax.length;
			                var optionsMin_length = cbMin.length;
			                cbMin.options[optionsMin_length] = new Option(option_text.childNodes[0].nodeValue, option_value.childNodes[0].nodeValue);
			                cbMax.options[optionsMax_length] = new Option(option_text.childNodes[0].nodeValue, option_value.childNodes[0].nodeValue);
			            }
			            cbMin.disabled = false;
			            cbMax.disabled = false;

			        } catch (exp) { }
			    }
			}
		);

}
if (document.getElementById("RadioGroup1_0_right") != undefined && document.getElementById("RadioGroup1_0_right") != null) {
    if (document.getElementById("RadioGroup1_0_right").checked == true) {
        GetPriceAlertRight("sale");
        trans = "1";
    }
    else {
        GetPriceAlertRight("rent");
        trans = "0";
    }
}

function changeLoaiEmailBDS(loai_, obj_id) {

    var url = pathClientAjax + "handler/Alert.aspx@act=changeLoaiEmailBDS&id=" + loai_;

    for (var k = document.getElementById(obj_id).options.length - 1; k >= 0; k--)
        document.getElementById(obj_id).options[k] = null;

    $.get(url, {},
		function (data) {
		    var lcNodes = data.getElementsByTagName("*")[0].childNodes;
		    if (lcNodes.length > 0) {
		        try {
		            removeSelectbox(obj_id, "Loại BĐS");
		            for (var k = document.getElementById(obj_id).options.length - 1; k >= 0; k--) {
		                document.getElementById(obj_id).options[k] = null;
		            }
		            var i = 0;
		            document.getElementById(obj_id).options[i] = new Option("Loại BĐS", "");

		            for (var k = i; k < lcNodes.length + i; k++) {
		                var option_value = lcNodes[k - i].childNodes[0];
		                var option_text = lcNodes[k - i].childNodes[1];
		                document.getElementById(obj_id).options[k] = new Option(option_text.childNodes[0].nodeValue, option_value.childNodes[0].nodeValue);
		            }
		            document.getElementById(obj_id).disabled = false;	            

		        } catch (exp) { }
		    }
		});
}
if (document.getElementById("cbProClassRight") != undefined && document.getElementById("cbProClassRight") != null) {  
    changeLoaiEmailBDS(11, 'cbProClassRight', '');  // tu load LoaiBDS trong box EmailBDS.
}



//end uc EmailBDS
//start ucCountMemFollowSuburb
function ShowTTQTMem() {
    $('#lightbox-imageContainer').html($('#divSearchDefaultMem').html());
    $('#lightbox-imageContainer,#lightbox,#lightbox-overlay').show();
    $('#lightbox-infoBox').hide();

    $('#lightbox-overlay-text-close,#lightbox-close-button,#lightbox-overlay').click(function () { $.Lightbox.finish(); });
    return false;
}
//end ucCountMemFollowSuburb
//start UcEstateQuickLinks
function ShowTTQTEstate() {
 /*   $.Lightbox.domReady();
    $('#lightbox-imageContainer').html($('#divSearchDefaultEstate').html());
    $('#lightbox-imageContainer,#lightbox,#lightbox-overlay').show();
    $('#lightbox-infoBox').hide();

    $('#lightbox-overlay-text-close,#lightbox-close-button,#lightbox-overlay').click(function () { $.Lightbox.finish(); });
    return false;*/
    $("#divSearchDefaultEstate").centerInClient({ minY: 1 });
    $('#divSearchDefaultEstate').show();
}
//end UcEstateQuickLinks
//start PropertyDetails
function resetformSendmail() {
    $("#ctrContactAgentID_txtName").val("");
    $("#ctrContactAgentID_txtPhone").val("");
    $("#ctrContactAgentID_txtEmail").val("");
    $("#ctrContactAgentID_txtMessage").val("");
}

//end PropertyDetails


/////////////// XU LY POPUP EmailAlert

function showPopupEmailAlertList(_dataJson) {
    var obj = _dataJson.lst[0];
    var param = {
        act: "showPopupEmailAlert"
		, state: obj.s4
		, suburb: obj.s5
		, pclass: obj.s2
		, tran: obj.s1
		, min: obj.s6
		, max: obj.s7
		, kieubds: obj.s3
		, huong: obj.s12
		, duan: obj.s8
		, phaply: obj.s13
		, dientich: obj.s9
		, mattien: obj.s10
		, ktdtt: obj.s11
		, tenthubao: obj.s16
		, phuongthuc: obj.s18
		, email: obj.s17
		, dtqc: obj.s14
		, himg: obj.s15
    };
    
    if (obj.s4 == "" || obj.s2 == "")  // cho chuyen toi trang Edit lai tieu chi       
        GotoEmailAlertClientParam(obj.s1, obj.s2, obj.s4, obj.s5, obj.s6, obj.s7, obj.s9, obj.s8, obj.s12, obj.s3, obj.s13);
    else if (getQuerystring() == "MyAlertClient")
    {
        GotoEmailAlertClientParam(obj.s1, obj.s2, obj.s4, obj.s5, obj.s6, obj.s7, obj.s9, obj.s8, obj.s12, obj.s3, obj.s13);
    }
    else {
        $.post(pathClientAjax + "handler/Post.aspx?", param,
 		    function (data) {
 		        if (data != "") {
 		            $('#EmailAlert_box_popup_header').html("Nhận BĐS tương tự qua email");
 		            $('#EmailAlert_content').html(data);
 		            $("#EmailAlert_box").centerInClient({ minY: 1 });
 		            $('#EmailAlert_box').show();
 		        }
 		        else {
 		            $('#EmailAlert_box').hide();
 		        }
 		    });
    }
}
function showPopupEmailAlert() {    
    var obj = chuoiJson.lst[0];   
    var param = {
        act: "showPopupEmailAlert"
		, state: obj.s4
		, suburb: obj.s5
		, pclass: obj.s2
		, tran: obj.s1
		, min: obj.s6
		, max: obj.s7
		, kieubds: obj.s3
		, huong: obj.s12
		, duan: obj.s8
		, phaply: obj.s13
		, dientich: obj.s9
		, mattien: obj.s10
		, ktdtt: obj.s11
		, tenthubao: obj.s16
		, phuongthuc: obj.s18
		, email: obj.s17
		, dtqc: obj.s14
		, himg: obj.s15
    };       
    if (obj.s4 == "" || obj.s2 == "")  // cho chuyen toi trang Edit lai tieu chi 
        GotoEmailAlertClientParam(obj.s1, obj.s2, obj.s4, obj.s5, obj.s6, obj.s7, obj.s9, obj.s8, obj.s12, obj.s3, obj.s13); // link tới trang Edit nhung va co kem theo tham số truyền di
    else if (getQuerystring() == "MyAlertClient") {
        GotoEmailAlertClientParam(obj.s1, obj.s2, obj.s4, obj.s5, obj.s6, obj.s7, obj.s9, obj.s8, obj.s12, obj.s3, obj.s13);
    }
    else {
        $.post(pathClientAjax + "handler/Post.aspx?", param,
 		    function (data) {
 		        if (data != "") {
 		            $('#EmailAlert_box_popup_header').html("Nhận BĐS tương tự qua email");
 		            $('#EmailAlert_content').html(data);
 		            $("#EmailAlert_box").centerInClient({ minY: 1 });
 		            $('#EmailAlert_box').show();
 		        }
 		        else {
 		            $('#EmailAlert_box').hide();
 		        }
 		    });
 		}
 		//trackPageview('../../muabannhadat.com.vn/thubao-bds-open');
}

function LuuEmailAlertPopup(chuoiJsonInput) {

    var Email = $('#txtEmailNhanThuBao').val();
    if (Email == "") {
        alert("Bạn chưa nhập Email ");
        return false;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(Email) == false) {
        alert("Định dạng Email : " + Email + "  không đúng");
        return false
    }

    var phuongthuc = "";
    if (document.getElementById("phuongthuc_0").checked == true)
        _phuongthuc = "0";
    else if (document.getElementById("phuongthuc_1").checked == true) _phuongthuc = "1";
    else if (document.getElementById("phuongthuc_2").checked == true) _phuongthuc = "2";
    
    var obj = chuoiJsonInput.lst[0];
    var param = {
        act: "PopupEmailAlertInsert"
		, state: obj.s4
		, suburb: obj.s5
		, pclass: obj.s2
		, tran: obj.s1
		, min: obj.s6
		, max: obj.s7
		, kieubds: obj.s3
		, huong: obj.s12
		, duan: obj.s8
		, phaply: obj.s13
		, dientich: obj.s9
		, mattien: obj.s10
		, ktdtt: obj.s11
		, tenthubao: $('#txtTenThuBao').val()
		, phuongthuc: _phuongthuc
		, email: $('#txtEmailNhanThuBao').val()
		, dtqc: obj.s14
		, himg: obj.s15
    };    
    $.post(pathClientAjax + "handler/Post.aspx?", param,
 		function (data) {
 		    $('#login_box').hide();
 		    if (data != "") {
 		        alert("Đăng ký thành công");
 		        $('#EmailAlert_box').hide();
 		    }
 		    else {
 		        alert("Đăng ký không thành công");
 		        $('#EmailAlert_box').hide();
 		    }
 		});
    
}
function GotoEmailAlertClientParam(trans, proclass, state, suburb, pricemin, pricemax, dientich, duan,huong,kieuBDS,phaply) {
    window.location = pathClientAjax + "MyAlertClient.aspx@trans=" + trans + "&proclass=" + proclass + "&state=" + state + "&suburb=" + suburb + "&pricemin=" + pricemin + "&pricemax=" + pricemax + "&dientich=" + dientich + "&duan=" + duan + "&huong=" + huong + "&kieuBDS=" + kieuBDS + "&phaply=" + phaply;
}


/////////////// End XU LY POPUP EmailAlert


// xu ly popup EmailAlert FormSearchTop
function ChangeTransFromSearch() {
    if (document.getElementById("rdoBan").checked == true)
        trans = "1";
    else trans = "0";
}
function ShowPopupMailAlertFormSearchTop() {
    var loaiBDS = nvgUtils.getLoaiBDS__(document.getElementById("txtProClass").value);
    var price = $('#txtGia').val();
    var min=''; var max='';
    if (price != "") {
        var arr = price.split('-');
        min  = arr[0];
        max = arr[1];
    }    
    
    chuoiJson = { lst: [{
        s1: trans,
        s2: loaiBDS,
        s3: '',
        s4: document.getElementById("txtStateID").value,
        s5: document.getElementById("txtSuburb").value,//document.getElementById("txtSuburb").value.split(',')[0],
        s6: min,
        s7: max,
        s8: document.getElementById("txtEstate").value,
        s9: document.getElementById("txtDienTich").value,
        s10: '',
        s11: '',
        s12: '',
        s13: '',
        s14: '',
        s15: '',
        s16: '',
        s17: '',
        s18: ''
    }]
};    
    showPopupEmailAlert(); 
}


/// Ham Email Alert cho tat ca cac noi ma ko cần dk dua vao chuoiJson
function EmailAlertNoJson() {
    chuoiJson = { lst: [{
        s1: '',
        s2: '',
        s3: '',
        s4: '',
        s5: '',
        s6: '',
        s7: '',
        s8: '',
        s9: '',
        s10: '',
        s11: '',
        s12: '',
        s13: '',
        s14: '',
        s15: '',
        s16: '',
        s17: '',
        s18: ''
    }]
    };
    showPopupEmailAlert(); 
}

/// xu li estatecenter.ascx
function DemEstTinhThanhOEst() {  
    var act = "act=demestttvaloai";
    var url = pathClientAjax + "handler/handler.aspx?" + act;
    $.post(url, { cid: $('#hdfEStCenter').val() },
	function (data) {
	    $('.demBdsEstCenter').html(data+"...");
	});
}
//if (document.getElementById('hdfEStCenter')!=undefined)
//    DemEstTinhThanhOEst();
/// end


//// xu ly load gia min, max trong UC EmailBDS
function GetPriceAlertNew(tt) {
    var url = pathClientAjax + "handler/FormSearchHandler.aspx@act=LoadPriceAlert&t=" + tt + "&d=" + (new Date()).getTime();
    removeSelectbox('cbMinPrice1');
    removeSelectbox('cbMaxPrice1');

    $.get(url,
			function (data) {
			    var lcObjXmlDoc = data;
			    var lcNodes = lcObjXmlDoc.getElementsByTagName("*")[0].childNodes;
			    if (lcNodes.length > 0) {
			        try {
			            var cbMin = document.getElementById("cbMinPrice1");
			            var cbMax = document.getElementById("cbMaxPrice1");
			            cbMin.options[0] = new Option('Giá từ', 'NA');
			            cbMax.options[0] = new Option('Giá đến', 'NA');
			            for (var k = 1; k < lcNodes.length - 1; k++) {
			                var option_value = lcNodes[k].childNodes[0];
			                var option_text = lcNodes[k].childNodes[1];
			                var optionsMax_length = cbMax.length;
			                var optionsMin_length = cbMin.length;
			                cbMin.options[optionsMin_length] = new Option(option_text.childNodes[0].nodeValue, option_value.childNodes[0].nodeValue);
			                cbMax.options[optionsMax_length] = new Option(option_text.childNodes[0].nodeValue, option_value.childNodes[0].nodeValue);

			            }
			            cbMin.disabled = false;
			            cbMax.disabled = false;

			        } catch (exp) { }
			    }
			}
		);

}

function getPrice() {
    var cbMin = document.getElementById("cbMinPrice1");
    var cbMax = document.getElementById("cbMaxPrice1");
    if (cbMin != undefined && cbMin != null && cbMax != undefined && cbMax != null) {
        removeSelectbox("cbMinPrice1", "Giá từ");
        removeSelectbox("cbMaxPrice1", "Giá đến");       
    }
         
}
if (document.getElementById("cbMinPrice1") != undefined && document.getElementById("cbMaxPrice1") != undefined)
    getPrice();


var NvgUcs = {
    /*
    *	uc_user_boxes_update.ascx
    */
    ShowPopupUpdateEstInfo: function (st_, sb_, eid_, ename_) {
        
        var act = "act=loadpopupuptestinf";
        var url = pathClientAjax + "handler/handler.aspx?" + act;
        $.post(url, { stid: st_, sbid: sb_, eid: eid_, ename: ename_ },
	        function (data) {
	            $('#login_box').html(data);
	            $('#login_box').width("620px");
	            $("#login_box").centerInClient({ minY: 1 });
	            $('#login_box').show();
	        });
	     //   trackPageview('../../muabannhadat.com.vn/thubao-duan-open');
    },
    QuanTheoTThanh: function (ttId) {
        var act = "act=loadqtheottppest";
        var url = pathClientAjax + "handler/handler.aspx?" + act;
        $.post(url, { stid: ttId },
	    function (data) {
	        $('#sltPopUpEst_suburb').html(data);
	    });
    },
    DuAnTheoQuan: function (quanId) {
        if (quanId != "") $('#sltPopUpEst_estate').html("");
        var act = "act=loaddatquanjs";
        var url = pathClientAjax + "handler/handler.aspx?" + act;
        $.post(url, { sbid: quanId },
	        function (data) {
	            var lcNodes = data.lst;
	            if (lcNodes.length > 0) {
	                $('#sltPopUpEst_estate').html("");
	                var tpl__ = $.template("<option value=\"${eValue}\">${eName}</option>");
	                $('#sltPopUpEst_estate').append(tpl__, { eName: 'Chọn dự án', eValue: '' });

	                for (var k = 0; k < lcNodes.length; k++) {
	                    var _value = lcNodes[k].s1;
	                    var _text = lcNodes[k].s2;
	                    $('#sltPopUpEst_estate').append(tpl__, { eName: _text, eValue: _value });
	                }
	            }
	        }, 'json');
    },
    TimNhanhDuAn: function (txtID, defaultTxt, divID, ulID, fieldID, fieldName, event) {
        var code = event.keyCode;
        if ((code >= 48 && code <= 57) // 0-9
        || (code >= 65 && code <= 90) // a-z
        || code == 8 // backspace
        || code == 46) // delete
        {
            if ($('#' + txtID).val() == defaultTxt || $('#' + txtID).val() == "") return;

            var act = "act=timnhanhduanjs";
            var url = pathClientAjax + "handler/handler.aspx?" + act;
            $.post(url, { txt: $('#' + txtID).val() },
	            function (data) {
	                var lst_ = data.lst;
	                if (lst_.length > 0) {
	                    $('#' + ulID).html("");
	                    var tpl__ = $.template("<li style=\"cursor:pointer;\" onclick=\"NvgUcs.SetValueEst1('${eValue}','${eName}','${divID}', '${fieldID}', '${fieldName}')\" ><a href=\"javascript:;\" onclick=\"NvgUcs.SetValueEst1('${eValue}','${eName}','${divID}', '${fieldID}', '${fieldName}')\">${eName}</a></li>");

	                    for (var i = 0; i < lst_.length; i++) {
	                        var _value = lst_[i].s1;
	                        var _text = lst_[i].s2;
	                        $('#' + ulID).append(tpl__, { eValue: _value, eName: _text, divID: divID, fieldID: fieldID, fieldName: fieldName });
	                    }
	                    $('#' + divID).show(500);
	                }
	                else $('#' + divID).hide();
	            }, 'json');
        }
    },
    SetValueEst: function (this_) {
        $('#hdfEidUptEst').val(this_.value);
        //alert(this_.options[this_.selectedIndex].text)
        $('#txtTimNhanhDaUptEst').val(this_.options[this_.selectedIndex].text);
    },
    SetValueEst1: function (value_, text_, divID, fieldID, fieldName) {
        $('#' + fieldID).val(value_);
        $('#' + fieldName).val(text_);
        $('#' + divID).hide();
    },
    DKNhanThongTinDuAn: function () {
        if ($('#txtEmailNgNhanUptEst').val() == "" || $('#txtEmailNgNhanUptEst').val() == "Email người nhận") {
            alert("Vui lòng nhập email của bạn!");
            $('#txtEmailNgNhanUptEst').focus();
            return false;
        }
        else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test($('#txtEmailNgNhanUptEst').val()) == false) {
                alert("Định dạng email không đúng");
                $('#txtEmailNgNhanUptEst').focus();
                return false;
            }
        }

        if ($('#hdfEidUptEst').val() == "" || !isAllDigit($('#hdfEidUptEst').val())) {
            alert("Vui lòng chọn dự án!");
            return false;
        }

        var act = "act=dknhanttduan";

        var bds_ = $('#chkBDSThuocDaUptEst').is(":checked") ? "1" : "2";
        var ttuc_ = $('#chkTinTucThuocDaUptEst').is(":checked") ? "1" : "2";

        if (bds_ == "2" && ttuc_=="2") {
            alert("Vui lòng chọn thông tin về BĐS/tin tức của dự án !");
            return false;
        }

        var nameEst_ = "";
        if ($('#txtTimNhanhDaUptEst').val() != "" && $('#txtTimNhanhDaUptEst').val() != "Nhập tên dự án")
            nameEst_ = $('#txtTimNhanhDaUptEst').val();

        var url = pathClientAjax + "handler/handler.aspx?" + act;
        $.post(url, { eid: $('#hdfEidUptEst').val(), ename: nameEst_, bds: bds_, ttuc: ttuc_, name: $('#txtTenNgNhanUptEst').val(), email: $('#txtEmailNgNhanUptEst').val() },
	        function (data) {
	            if (data == "1") alert("Đăng ký thành công.");
	            else alert("Có lỗi xày ra, vui lòng thử lại.");
	        });
    },
    ResetDKNhanTTDuAn: function () {
        $('#sltPopUpEst_state').val("");

        var tpl__ = $.template("<option value=\"${eValue}\">${eName}</option>");
        $('#sltPopUpEst_suburb').html("");
        $('#sltPopUpEst_suburb').append(tpl__, { eName: 'Chọn quận/huyện', eValue: '' });

        $('#sltPopUpEst_estate').html("");
        $('#sltPopUpEst_estate').append(tpl__, { eName: 'Chọn dự án', eValue: '' });

        $('#txtTimNhanhDaUptEst').val("Nhập tên dự án");
        $('#txtTenNgNhanUptEst').val("Tên người nhận");
        $('#txtEmailNgNhanUptEst').val("Email người nhận");
        $('#chkBDSThuocDaUptEst').removeAttr("checked");
        $('#chkTinTucThuocDaUptEst').removeAttr("checked");
    },
    /* end uc_user_boxes_update.asxcx */
    /*
    *	TopEstate.ascx
    */
    TopEstateTabClick: function (ulid_, class_, hrfID_) {
        $('#aHrfDuAnNhiuBDS, #aHrfDuAnCapNhat, #aHrfDuAnQuanTam').removeClass(class_);
        $('#ulEst_nhieubds, #ulEst_moicapnhat, #ulEst_quantam').hide();
        $('#' + ulid_).show();
        $('#' + hrfID_).addClass(class_);
    }
    /* end*/
}

// -----------------  Box tu van : Phong thuy , luat , .....

function XoaText(ctl) {
    $('#' + ctl).val('');
}

function SendMailTuVan() {
    var tieude = $('#txtTieuDe').val();
    var noidung = $('#txtNoiDung').val();
    var ten = $('#txtTenNguoiGoi').val();
    var email = $('#txtEmail').val();
    var dienthoai = $('#txtDienThoai').val();

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (tieude == "" || tieude == "Tiêu đề câu hỏi") {
        alert("Vui lòng nhập Tiêu Đề");
        return false;
    }
    if (noidung == "") {
        alert("Vui lòng nhập Nội Dung");
        return false;
    }
    if (ten == "" || ten == "Tên người gửi") {
        alert("Vui lòng nhập Tên Người Gởi");
        return false;
    }
    if (email == "") {
        alert("Vui lòng nhập Email");
        return false;
    }
    if (reg.test(email) == false) {
        alert("Định dạng Email : " + email + "  không đúng");
        return false
    }
    if (dienthoai == "") {
        alert("Vui lòng nhập Điện Thoại");
        return false;
    }
    if (!isAllDigit(trim(dienthoai, ' '))) {
        alert("Vui lòng kiểm tra lại điện thoại");
        return false;
    }

    tieude = "&tieude=" + tieude;
    noidung = "&noidung=" + noidung;
    ten = "&ten=" + ten;
    email = "&email=" + email;
    dienthoai = "&dienthoai=" + dienthoai;
    var catetype = "&catetype=" + $('#hdfCateTuVanType').val();
    var tt = tieude + noidung + ten + email + dienthoai + catetype;
    var url = pathClientAjax + "handler/ViewDirectionHomeHandler.aspx@act=SendMailTuVanPT" + tt + "&d=" + (new Date()).getTime();
    $.get(url, {},
		function (data) {
		    if (data != "")
		        alert("Bạn gởi mail thành công");
		    else
		        alert("Email của bạn sẽ được gời lại sau");
		});

}

// ------------ End Box tu van 


// ---------- Box Nhung con so noi bat

function LoadConSoNoiBat(vitris) {
    var vitri = "&vitri=" + vitris;
    var url = pathClientAjax + "handler/Handler.aspx@act=ConSoNoiBat" + vitri + "&d=" + (new Date()).getTime();
    $.get(url, {},
		function (data) {
		    if (data != "")
		        $('#divConSoNoiBat').html(data);
            else
                $('#divConSoNoiBat').html("Hiện chưa có dữ liệu");
		});
}

if (document.getElementById("divConSoNoiBat") != undefined)
    LoadConSoNoiBat(0);

//--- End Con so noi bat


//---------- Popup Tinh Toan Tai Chinh cua PropertyDetail
function showPopupTinhToanTaiChinh() {
    var gianha = "&gianha=" + $('#hdnPopupTaiChinh').val();
    var url = pathClientAjax + "handler/Handler.aspx@act=showPopupTinhToanTaiChinh" + gianha + "&d=" + (new Date()).getTime();
    $.get(url, {},
		function (data) {
		    if (data != "") {
		        $('#calHeader').html("Tính toán tài chính ");
		        $('#calContentBox').html(data);
		        $("#boxCalculator").centerInClient();
		        $('#boxCalculator').show();
		    }
		    else {
		        alert("Chức năng đang được nâng cấp, vui lòng quay lại sau. Cảm ơn");
		    }
		});
}



function getQuerystring() {   
    var qs = window.location.href; //lay link hien tai
    var patt1 = /MyAlertClient/; // Mẫu chuỗi xác định một chữ thu
    var result = qs.match(patt1);  // lay doan text trong chuoi dia chi
    return result;
}


function InsertAdsStatic(adsId,adsName,companyName) {

    adsId = "&adsId=" + adsId;
    adsName = "&adsName=" + adsName;
    companyName = "&companyName=" + companyName;
    var par = adsId + adsName + companyName;
    var url = pathClientAjax + "handler/AdsHandler.aspx@act=InsertAdsStatic" + par + "&d=" + (new Date()).getTime();
    $.get(url, {},
		function (data) {
		    if (data != "") {
		        alert("Thêm mới thành công");
		    }
		    else {
		        alert("Thêm mới không thành công.AdsID không được trống và phải là số.");
		    }
		});
}


/*
 *	uc topagent
 */
var nvgTopAgentHeader = {
    /* topagent header*/
    ContactTopAgent: function () {
        var txEmail = document.getElementById("txtEmailTA").value;

        if (txEmail == "") {
            alert("Vui lòng nhập email!");
            document.getElementById("txtEmailTA").focus();
            return;
        }
        if (txEmail != "" && !isEmail(txEmail)) {
            alert("Email không hợp lệ!");
            document.getElementById("txtEmailTA").focus();
            return;
        }

        var txAgent = document.getElementById("txtEmailToTA").value;
        var txName = document.getElementById("txtTenTA").value;
        var txPhone = document.getElementById("txtPhoneTA").value;

        if (txPhone == "") {
            alert("Vui lòng nhập số điện thoại!");
            document.getElementById("txtPhoneTA").focus();
            return;
        }

        var txMessage = document.getElementById("txtContentTA").value;
        if (txMessage == "") {
            alert("Vui lòng nhập nội dung!");
            document.getElementById("txtContentTA").focus();
            return;
        }

        var act = "act=smttag";
        var url = pathClientAjax + "handler/handler.aspx?" + act + "&d=" + _d;

        $('#btSendMailTA').html("<span style=\"color:#ffffff\">Đang gửi ....</span>");
        $.post(url, { fr: encodeURI(txEmail), to: encodeURI(txAgent), f: encodeURI(txPhone), tt: txMessage, n: encodeURI(txName) },
		    function (data) {
		        if (data == "Failed") {
		            alert("Hệ thống không cho phép gửi mail tới nhà môi giới!");
		            $('#btSendMailTA').html("<a href=\"javascript:;\" onclick=\"javascript:nvgTopAgentHeader.ContactTopAgent();\" >Liên hệ</a>");
		        }
		        else {
		            alert("Cám ơn! Mail của bạn đã được gửi!");
		            $('#btSendMailTA').html("<a href=\"javascript:;\" onclick=\"javascript:nvgTopAgentHeader.ContactTopAgent();\" >Liên hệ</a>");
		        }
		    }
	    );
    },
    /* topagent uc topagentkhuvucright*/
    KhuVucRight: function () {
        var act = "act=takhuvucright";
        var url = pathClientAjax + "handler/handler.aspx?" + act;
        var stid = $('#TopAgentKhuVucRightAjx_stid').val();
        var stn = $('#TopAgentKhuVucRightAjx_stn').val();
        var sbid = $('#TopAgentKhuVucRightAjx_sbid').val();
        var sbn = $('#TopAgentKhuVucRightAjx_sbn').val();
        $.post(url, { stid: stid, stn: stn, sbid: sbid, sbn: sbn },
		    function (data) {
		        if (data != "0") {
		            $('#divTopAgentKVRight').html(data);
		            $('#divTopAgentKVRight').show();
		        }
		        else {
		            $('#divTopAgentKVRight').hide();
		        }
		    }
	    );
    },
    /* topagent uc topagentbdsright*/
    BDSRight: function () {
        var act = "act=tabdsright";
        var url = pathClientAjax + "handler/handler.aspx?" + act;
        var stid = $('#TopAgentAndBDSRightAjx_stid').val();
        var stn = $('#TopAgentAndBDSRightAjx_stn').val();
        var sbid = $('#TopAgentAndBDSRightAjx_sbid').val();
        var sbn = $('#TopAgentAndBDSRightAjx_sbn').val();
        $.post(url, { stid: stid, stn: stn, sbid: sbid, sbn: sbn },
		    function (data) {
		        if (data != "") {
		            $('#divTopAgentBdsRight').html(data);
		            $('#divTopAgentBdsRight').show();

		            var sldTopAgAndBDSRightAjx = {
		                Block: 0,
		                TotalDiv: parseInt($('#hdfCTopAgRightAjx').val()),
		                ClassDiv: 'mainTopAgentBdsRgtAjx',
		                PrefixDiv: 'divTopAgInfoRAjx_',
		                IdLiNext: 'liNextTopAgBDSRgtAjx',
		                IdLiPrevious: 'liPreTopAgBDSRgtAjx',
		                ClassLiName: 'current',
		                Speed: 1000,
		                TimeAuto: 10000,
		                KeyAuto: 'up',
		                TimeoutKey: null
		            };
		            NvgSliderAuto.SetUp(sldTopAgAndBDSRightAjx); 
		        }
		        else {
		            $('#divTopAgentBdsRight').hide();
		        }
		    }
	    );
    }
}

if (document.getElementById('TopAgentKhuVucRightAjx_stid') != null && document.getElementById('TopAgentKhuVucRightAjx_stid') != undefined) {
    nvgTopAgentHeader.KhuVucRight();
}
if (document.getElementById('TopAgentAndBDSRightAjx_stid') != null && document.getElementById('TopAgentAndBDSRightAjx_stid') != undefined) {
    nvgTopAgentHeader.BDSRight();
}
/*
*	end
*/

		






