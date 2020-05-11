
var FSEstate = {
    CheckLoadSuburb: function () {
        if ($('#txtEstStateID').val() != "") {
            $('.hidDialog').hide();
            $('#divListEstSuburb').toggle();
        }
        else {
            alert("Bạn phải chọn tỉnh/thành phố!");
            return false;
        }
    },
    LoadTinhThanh: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadtt&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    //  FSEstate.TaoList(data.lst, "divEstState", "txtEstStateID", "state");
			    FSEstate.TaoStateList(data.lst, "divEstState", "txtEstStateID", "state");
			}
		, 'json');
    },
    LoadQuanHuyen: function (st, textTinhThanh_) {
        FSEstate.ShowTextTopSelect("hrfEstState", "iptEstState", textTinhThanh_, 'txtEstStateID', st, 'divDropEstState');
        FSEstate.ShowTextTopSelect("hrfEstSuburb", "iptEstSuburb", '', 'txtEstSuburbID', '', 'divDropEstState');

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqh&d=" + (new Date()).getTime(); ;
        $.post(url, { st: st },
			function (data) {
			    FSEstate.TaoListMuti(data.lst, 'divEstSuburb', 'txtEstSuburbID', "suburb");
			}
		, 'json');
    },
    LoadQuanHuyenDef: function (st, textTinhThanh_) {
        FSEstate.ShowTextTopSelect("hrfEstState", "iptEstState", textTinhThanh_, 'txtEstStateID', st, 'divDropEstState');

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqh&d=" + (new Date()).getTime(); ;
        $.post(url, { st: st },
			function (data) {
			    FSEstate.TaoListMuti(data.lst, 'divEstSuburb', 'txtEstSuburbID', "suburb");

			    $('#divEstSuburb input:checkbox').each(function () {
			        if (nvgUtils.CheckSplitValue(this.value, $('#txtEstSuburbID').val(), ",")) {
			            this.checked = true;
			        }
			    });
			}
		, 'json');
    },
    LoadLoaiEst: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadloaida&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstate.TaoList(data.lst, "divLoaiDuAn", "txtEstLoaiDuAn", "loaida");
			}
		, 'json');
    },
    LoadLoaiBDSEst: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadloaibdsda&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstate.TaoListMuti(data.lst, "divEstLoaiBDS", "txtEstLoaiBDS", "loaibdsda");
			}
		, 'json');
    },
    LoadLoaiBDSEstDef: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadloaibdsda&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstate.TaoListMuti(data.lst, "divEstLoaiBDS", "txtEstLoaiBDS", "loaibdsda");

			    $('#divEstLoaiBDS input:checkbox').each(function () {
			        if (nvgUtils.CheckSplitValue(this.value, $('#txtEstLoaiBDS').val(), ",")) {
			            this.checked = true;
			        }
			    });
			}
		, 'json');
    },
    LoadGiaFormSearchEst: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadgiaest&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstate.TaoList(data.lst, "divGiaDuAn", "txtEstGiaDuAn", "giaest");
			}
		, 'json');
    },
    LoadTienDoEst: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=tiendoda&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstate.TaoList(data.lst, "divTienDoEst", "txtEstTienDo", "tiendoest");
			}
		, 'json');
    },
    //gan list l vao divid
    TaoList: function (lll, divid, hdf, key_) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            var tpl__ = "";
            if (key_ == "state") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstate.LoadQuanHuyen('${eValue}','${eName}');\">${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSEstate.SetTinhThanh();\">Chọn tất cả</a></li>");
            }
            if (key_ == "loaida") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstate.ShowTextTopSelect('hrfEstLoaiDuAn','iptEstLoaiDuAn','${eName}','txtEstLoaiDuAn','${eValue}','divDropLoaiDuAn');\">${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSEstate.ShowTextTopSelect('hrfEstLoaiDuAn','iptEstLoaiDuAn','','txtEstLoaiDuAn','','divDropLoaiDuAn');\">Chọn tất cả</a></li>");
            }
            else if (key_ == "giaest") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstate.SetGia();FSEstate.ShowTextTopSelect('hrfEstGiaDuAn','iptEstGiaDuAn','${eName}','txtEstGiaDuAn','${eValue}','divListGiaDuAn');\"\"> ${eName}</a></li>");
                $('#' + divid).append("<li><href=\"javascript:;\" onclick=\"FSEstate.SetGia();FSEstate.ShowTextTopSelect('hrfEstGiaDuAn','iptEstGiaDuAn','','txtEstGiaDuAn','','divListGiaDuAn');\"\">Chọn tất cả</a></li>");
                /*tpl__ = $.template("<li><input type=\"radio\" name=\"rdoGia\" onclick=\"FSEstate.SetGia();FSEstate.ShowTextTopSelect('hrfEstGiaDuAn','iptEstGiaDuAn','${eName}','txtEstGiaDuAn','${eValue}','divListGiaDuAn');\"\"> ${eName}</li>");
                $('#' + divid).append("<li><input type=\"radio\" name=\"rdoGia\" onclick=\"FSEstate.SetGia();FSEstate.ShowTextTopSelect('hrfEstGiaDuAn','iptEstGiaDuAn','','txtEstGiaDuAn','','divListGiaDuAn');\"\">Chọn tất cả</li>");*/
            }
            else if (key_ == "tiendoest") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstate.ShowTextTopSelect('hrfEstTienDo','iptEstTienDo','${eName}','txtEstTienDo','${eValue}','divDropTienDoEst');\"> ${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSEstate.ShowTextTopSelect('hrfEstTienDo','iptEstTienDo','','txtEstTienDo','','divDropTienDoEst');\">Chọn tất cả</a></li>");
            }

            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;
                if (key_ == "loaida" && (i + 1) % 3 == 0)
                    $('#' + divid).append("<li style=\"width:550px;\"></li>");
                $('#' + divid).append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
            }
        }
    },
    //gan list state vao divid
    TaoStateList: function (lll, divid, hdf, key_) {
        // $('#' + divid).html("");
        if (lll != null && lll != "") {
            var tpl__ = "";
            var tplS__ = "";
            tpl__ = $.template("<li><a href=\"javascript:FSEstate.LoadQuanHuyen('${eValue}','${eName}');\">${eName}</a></li>");
            tplS__ = $.template("<li><a href=\"javascript:FSEstate.LoadQuanHuyen('${eValue}','${eName}');\"><span>${eName}</span></a></li>");
            $('#divStateN').append("<li class=\"header\">MIỀN BẮC</li>");
            $('#divStateM').append("<li class=\"header\">MIỀN TRUNG</li>");
            $('#divStateS').append("<li class=\"header\">MIỀN NAM</li>");
            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;
                var eRegion = lll[i].s3;
                if (eRegion == "1") {
                    if (nvgUtils.CheckSplitValue(eID, BigProvinces, ",")) {
                        $('#divStateN').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divStateN').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
                if (eRegion == "2") {
                    if (nvgUtils.CheckSplitValue(eID, BigProvinces, ",")) {
                        $('#divStateM').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divStateM').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
                if (eRegion == "3") {
                    if (nvgUtils.CheckSplitValue(eID, BigProvinces, ",")) {
                        $('#divStateS').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divStateS').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
            }
        }
    },
    TaoListMuti: function (lll, divid, hdf, key_) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            var tpl__ = "";
            if (key_ == "suburb")
                tpl__ = $.template("<li><a><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"FSEstate.SetTextValueMuti('divEstSuburb','txtEstSuburbID','hrfEstSuburb','iptEstSuburb');\"> ${eName}</a></li>");
            if (key_ == "loaibdsda")
                tpl__ = $.template("<li><a><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\"onclick=\"FSEstate.SetTextValueMuti('divEstLoaiBDS','txtEstLoaiBDS','hrfEstLoaiBDS','iptEstLoaiBDS');\"> ${eName}</a></li>");

            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;

                $('#' + divid).append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
            }
        }
    },
    SetGia: function () {
        $('#txtEstGiaTu').val("");
        $('#txtEstGiaDen').val("");
        $('#esttg').html("");
        $('#esttd').html("");
    },
    SetGia2: function () {
        $('#iptEstGiaDuAn').val($('#esttg').html() + " - " + $('#esttd').html());
        $('#divGiaDuAn input:radio').removeAttr('checked');
    },
    SetTinhThanh: function () {
        $('#txtEstStateID').val("");
        $('#txtEstSuburbID').val("");
        $('#iptEstState').hide();
        $('#hrfEstState').show();
        $('#divEstSuburb').html("");
    },
    SetTextValueMuti: function (divID, txtID, hrfID, itpID) {
        var str = "";
        var val_ = "";
        // tao text quan huyen
        $('#' + divID + ' input:checkbox').each(function () {
            if (this.checked == true) {
                val_ += this.value + ",";
                str += this.title + ", ";
            }
        });
        str = str.substring(0, str.length - 2);
        FSEstate.ShowTextTopSelect(hrfID, itpID, str, txtID, val_, null);
    },
    ShowDefaultTopSelect: function (strState, strSuburb, strTuKhoa
		, strLoaiDuAn, strLoaiBDS, strTienDo, strGia) {
        if (strState != "") {
            this.ShowTextTop('hrfEstState', 'iptEstState', strState);
            this.LoadQuanHuyenDef($('#txtEstStateID').val(), strState);
        }
        if (strSuburb != "") {
            /*this.LoadQuanHuyenDef($('#txtEstStateID').val(), strState);*/
            this.ShowTextTop('hrfEstSuburb', 'iptEstSuburb', strSuburb);
        }
        if (strTuKhoa != "") {
            $('#txtTenDuAn').val(strTuKhoa);
        }
        var fl__ = false;
        if (strLoaiDuAn != "") {
            this.ShowTextTop('hrfEstLoaiDuAn', 'iptEstLoaiDuAn', strLoaiDuAn);
            fl__ = true;
        }
        if (strLoaiBDS != "") {
            this.LoadLoaiBDSEstDef();
            this.ShowTextTop('hrfEstLoaiBDS', 'iptEstLoaiBDS', strLoaiBDS);
            fl__ = true;
        }
        if (strTienDo != "") {
            this.ShowTextTop('hrfEstTienDo', 'iptEstTienDo', strTienDo);
            fl__ = true;
        }
        if (strGia != "") {
            $('#esttg').html(nvgUtils.GetPriceText(strGia.split('-')[0], 'esttg', 'm2', '1'));
            $('#esttd').html(nvgUtils.GetPriceText(strGia.split('-')[1], 'esttd', 'm2', '1'));

            this.ShowTextTop('hrfEstGiaDuAn', 'iptEstGiaDuAn', $('#esttg').html() + " - " + $('#esttd').html());
            fl__ = true;
        }
        if (fl__) this.Collapes();
    },
    ShowTextTop: function (hrf, ipt, con) {
        $('#' + ipt).show();
        $('#' + hrf).hide();
        $('#' + ipt).val(con);
    }
	,
    ShowTextTopSelect: function (hrf, ipt, con, hdfID, value_, divID) {
        if (con == "") {
            $('#' + ipt).hide();
            $('#' + hrf).show();
            $('#' + ipt).val("");
        }
        else {
            $('#' + hrf).hide();
            $('#' + ipt).show();
            $('#' + ipt).val(con);
        }
        $('#' + hdfID).val(value_);
        if (divID != null)
            $('#' + divID).hide();
    },
    Collapes: function () {
        if (document.getElementById('divBlockEst2').style.display == 'none') {
            $('#liMoRong').hide();
            $('#liRutGon').show();
            document.getElementById('divBlockEst2').style.display = '';
        }
        else {
            $('#liMoRong').show();
            $('#liRutGon').hide();
            document.getElementById('divBlockEst2').style.display = 'none';
        }

    },
    SearchDuAnMain: function () {
        if ($('#txtEstSuburbID').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều quận/huyện, vui lòng chọn không quá 5");
            $('#divListEstSuburb').show();
            return false;
        }
        if ($('#txtEstLoaiBDS').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều loại BĐS của dự án, vui lòng chọn không quá 5");
            $('#divLstLoaiBDSDuAn').show();
            return false;
        }

        var giaString = "";
        // format &cbMinPrice=500&cbMaxPrice=4000		
        if (!checkFloat(trim($('#txtEstGiaTu').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtEstGiaDen').val(), ' ').replace(',', '.'))) {
            alert("Giá phải là kiểu số");
            $('#divListGiaDuAn').show();
            $('#txtEstGiaTu').focus();
            return false;
        }
        if ($('#txtEstGiaTu').val() != "" && $('#txtEstGiaDen').val() != "") {
            if (parseFloat(trim($('#txtEstGiaTu').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtEstGiaDen').val(), ' ').replace(',', '.'))) {
                alert("Giá từ phải nhỏ hơn giá đến");
                $('#divListGiaDuAn').show();
                $('#txtEstGiaTu').focus();
                return false;
            }

            giaString = "&gt=" + $('#txtEstGiaTu').val() + "&gd=" + $('#txtEstGiaDen').val();
        }
        else if ($('#txtEstGiaDuAn').val() != "") {
            giaString = "&gt=" + $('#txtEstGiaDuAn').val().split('-')[0] + "&gd=" + $('#txtEstGiaDuAn').val().split('-')[1];
        }
        window.location = pathClient + "estatelist.aspx@typeid=" + $('#txtEstLoaiBDS').val()
									+ "&sstate=" + $('#txtEstStateID').val()
									+ "&ssuburb=" + $('#txtEstSuburbID').val()
									+ "&catid=" + $('#txtEstLoaiDuAn').val()
									+ "&td=" + $('#txtEstTienDo').val()
									+ giaString
									+ "&name=" + ($('#txtTenDuAn').val() == "Tên dự án" ? "" : $('#txtTenDuAn').val())
									+ "&pindex=1&mp=20";
    },
    DefaultFSEstTop: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=gest_default&d=" + (new Date()).getTime();
        $.post(url, {},
		function (data) {
		    FSEstate.TaoStateList(data.tt.lst, "divEstState", "txtEstStateID", "state");
		    FSEstate.TaoList(data.lest.lst, "divLoaiDuAn", "txtEstLoaiDuAn", "loaida");
		    FSEstate.TaoListMuti(data.lbdsest.lst, "divEstLoaiBDS", "txtEstLoaiBDS", "loaibdsda");
		    FSEstate.TaoList(data.gia.lst, "divGiaDuAn", "txtEstGiaDuAn", "giaest");
		    FSEstate.TaoList(data.tdest.lst, "divTienDoEst", "txtEstTienDo", "tiendoest");
		}
	    , 'json');
    }
};
