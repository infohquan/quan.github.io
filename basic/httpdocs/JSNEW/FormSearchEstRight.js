
var FSEstateRight = {
    CheckLoadSuburb: function () {
        if ($('#txtEstStateIDER').val() != "") {
            $('.hideEstDropbox').hide();
            $('#divListEstSuburbER').toggle();
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
			    //FSEstateRight.TaoList(data.lst, "divEstStateER", "txtEstStateIDER", "state");
			    FSEstateRight.TaoStateList(data.lst, "divEstStateER", "txtEstStateIDER", "state");
			}
		, 'json');
    },
    LoadQuanHuyen: function (st, textTinhThanh_) {
        FSEstateRight.ShowTextTopSelect("hrfEstStateER", "iptEstStateER", textTinhThanh_, 'txtEstStateIDER', st, 'divDropEstStateER');
        FSEstateRight.ShowTextTopSelect("hrfEstSuburbER", "iptEstSuburbER", '', 'txtEstSuburbIDER', '', 'divDropEstStateER');

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqh&d=" + (new Date()).getTime(); ;
        $.post(url, { st: st },
			function (data) {
			    FSEstateRight.TaoListMuti(data.lst, 'divEstSuburbER', 'txtEstSuburbIDER', "suburb");
			}
		, 'json');
    },
    LoadQuanHuyenDef: function (st, textTinhThanh_) {
        //FSEstateRight.ShowTextTopSelect("hrfEstState", "iptEstState", textTinhThanh_, 'txtEstStateID', st, 'divDropEstState');

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqh&d=" + (new Date()).getTime();
        $.post(url, { st: st },
			function (data) {
			    FSEstateRight.TaoListMuti(data.lst, 'divEstSuburbER', 'txtEstSuburbIDER', "suburb");

			    $('#divEstSuburbER input:checkbox').each(function () {
			        if (nvgUtils.CheckSplitValue(this.value, $('#txtEstSuburbIDER').val(), ",")) {
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
			    FSEstateRight.TaoList(data.lst, "divLoaiDuAnER", "txtEstLoaiDuAnER", "loaida");
			}
		, 'json');
    },
    LoadLoaiBDSEst: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadloaibdsda&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstateRight.TaoListMuti(data.lst, "divEstLoaiBDSER", "txtEstLoaiBDSER", "loaibdsda");

			    if ($('#txtEstLoaiBDSER').val() != "") {
			        $('#divEstLoaiBDSER input:checkbox').each(function () {
			            if (nvgUtils.CheckSplitValue(this.value, $('#txtEstLoaiBDSER').val(), ",")) {
			                this.checked = true;
			            }
			        });
			    }
			}
		, 'json');
    },
    LoadGiaFormSearchEst: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadgiaest&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstateRight.TaoList(data.lst, "divGiaDuAnER", "txtEstGiaDuAnER", "giaest");
			}
		, 'json');
    },
    LoadTienDoEst: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=tiendoda&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSEstateRight.TaoList(data.lst, "divTienDoEstER", "txtEstTienDoER", "tiendoest");
			}
		, 'json');
    },
    TaoStateList: function (lll, divid, hdf, key_) {
        if (lll != null && lll != "") {
            var tpl__ = "";
            var tplS__ = "";
            tpl__ = $.template("<li><a onclick=\"FSEstateRight.LoadQuanHuyen('${eValue}','${eName}');\" href=\"javascript:;\">${eName}</a></li>");
            tplS__ = $.template("<li><a onclick=\"FSEstateRight.LoadQuanHuyen('${eValue}','${eName}');\" href=\"javascript:;\"><span>${eName}</span></a></li>");
            $('#divLestStateN').append("<li class=\"header\">MIỀN BẮC</li>");
            $('#divLestStateM').append("<li class=\"header\">MIỀN TRUNG</li>");
            $('#divLestStateS').append("<li class=\"header\">MIỀN NAM</li>");
            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;
                var eRegion = lll[i].s3;
                if (eRegion == "1") {
                    if (nvgUtils.CheckSplitValue(eID, BigProvinces, ",")) {
                        $('#divLestStateN').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divLestStateN').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
                if (eRegion == "2") {
                    if (nvgUtils.CheckSplitValue(eID, BigProvinces, ",")) {
                        $('#divLestStateM').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divLestStateM').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
                if (eRegion == "3") {
                    if (nvgUtils.CheckSplitValue(eID, BigProvinces, ",")) {
                        $('#divLestStateS').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divLestStateS').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
            }
        }
    },
    //gan list l vao divid
    TaoList: function (lll, divid, hdf, key_) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            var tpl__ = "";
            if (key_ == "state") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstateRight.LoadQuanHuyen('${eValue}','${eName}');\">${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSEstateRight.SetTinhThanh();\">Chọn tất cả</a></li>");
            }
            if (key_ == "loaida") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstateRight.ShowTextTopSelect('hrfEstLoaiDuAnER','iptEstLoaiDuAnER','${eName}','txtEstLoaiDuAnER','${eValue}','divDropLoaiDuAnER');\">${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSEstateRight.ShowTextTopSelect('hrfEstLoaiDuAnER','iptEstLoaiDuAnER','','txtEstLoaiDuAnER','','divDropLoaiDuAnER');\">Chọn tất cả</a></li>");
            }
            else if (key_ == "giaest") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstateRight.SetGia();FSEstateRight.ShowTextTopSelect('hrfEstGiaDuAnER','iptEstGiaDuAnER','${eName}','txtEstGiaDuAnER','${eValue}','divListGiaDuAnER');\"> ${eName}</a></li>");
                $('#' + divid).append("<li><a href=\"javascript:;\" onclick=\"FSEstateRight.SetGia();FSEstateRight.ShowTextTopSelect('hrfEstGiaDuAnER','iptEstGiaDuAnER','','txtEstGiaDuAnER','','divListGiaDuAnER');\">Chọn tất cả</a></li>");
            }
            else if (key_ == "tiendoest") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSEstateRight.ShowTextTopSelect('hrfEstTienDoER','iptEstTienDoER','${eName}','txtEstTienDoER','${eValue}','divDropTienDoEstER');\"> ${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSEstateRight.ShowTextTopSelect('hrfEstTienDoER','iptEstTienDoER','','txtEstTienDoER','','divDropTienDoEstER');\">Chọn tất cả</a></li>");
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
    TaoListMuti: function (lll, divid, hdf, key_) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            var tpl__ = "";
            if (key_ == "suburb")
                tpl__ = $.template("<li><a><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"FSEstateRight.SetTextValueMuti('divEstSuburbER','txtEstSuburbIDER','hrfEstSuburbER','iptEstSuburbER');\"> ${eName}</a></li>");
            if (key_ == "loaibdsda")
                tpl__ = $.template("<li><a><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\"onclick=\"FSEstateRight.SetTextValueMuti('divEstLoaiBDSER','txtEstLoaiBDSER','hrfEstLoaiBDSDER','iptEstLoaiBDSER');\"> ${eName}</a></li>");

            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;

                $('#' + divid).append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
            }
        }
    },
    SetGia: function () {
        $('#txtEstGiaTuER').val("");
        $('#txtEstGiaDenER').val("");
        $('#esttgER').html("");
        $('#estdER').html("");
    },
    SetGia2: function () {
        $('#iptEstGiaDuAnER').val($('#esttgER').html() + " - " + $('#esttdER').html());
        $('#hrfEstGiaDuAnER').hide();
        $('#iptEstGiaDuAnER').show();
    },
    SetTinhThanh: function () {
        $('#txtEstStateIDER').val("");
        $('#txtEstSuburbIDER').val("");
        $('#iptEstStateER').hide();
        $('#hrfEstStateER').show();
        $('#divEstSuburbER').html("");
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
        FSEstateRight.ShowTextTopSelect(hrfID, itpID, str, txtID, val_, null);
    },
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
    ShowDefaultTopSelect: function (strState, strSuburb, strTuKhoa
		, strLoaiDuAn, strLoaiBDS, strTienDo, strGia) {
        if (strState != "") {
            this.ShowTextTop('hrfEstStateER', 'iptEstStateER', strState);
            this.LoadQuanHuyenDef($('#txtEstStateIDER').val(), strState);
        }
        if (strSuburb != "") {
            /*this.LoadQuanHuyenDef($('#txtEstStateID').val(), strState);*/
            this.ShowTextTop('hrfEstSuburbER', 'iptEstSuburbER', strSuburb);
        }
        if (strTuKhoa != "") {
            $('#txtTenDuAnER').val(strTuKhoa);
        }
        var fl__ = false;
        if (strLoaiDuAn != "") {
            this.ShowTextTop('hrfEstLoaiDuAnER', 'iptEstLoaiDuAnER', strLoaiDuAn);
            fl__ = true;
        }
        if (strLoaiBDS != "") {
            //this.LoadLoaiBDSEst();
            this.ShowTextTop('hrfEstLoaiBDSER', 'iptEstLoaiBDSER', strLoaiBDS);
            fl__ = true;
        }
        if (strTienDo != "") {
            this.ShowTextTop('hrfEstTienDoER', 'iptEstTienDoER', strTienDo);
            fl__ = true;
        }
        if (strGia != "") {
            $('#esttgER').html(nvgUtils.GetPriceText(strGia.split('-')[0], 'esttgER', 'm2', '1'));
            $('#esttdER').html(nvgUtils.GetPriceText(strGia.split('-')[1], 'esttdER', 'm2', '1'));

            this.ShowTextTop('hrfEstGiaDuAnER', 'iptEstGiaDuAnER', $('#esttgER').html() + " - " + $('#esttdER').html());
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
    Collapes: function () {
        if (document.getElementById('divBlockEst2ER').style.display == 'none') {
            $('#liMoRongER').hide();
            $('#liRutGonER').show();
            document.getElementById('divBlockEst2ER').style.display = '';
        }
        else {
            $('#liMoRongER').show();
            $('#liRutGonER').hide();
            document.getElementById('divBlockEst2ER').style.display = 'none';
        }
    },
    SearchDuAnMain: function () {
        var giaString = "";
        // format &cbMinPrice=500&cbMaxPrice=4000
        if ($('#txtEstSuburbIDER').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều quận/huyện, vui lòng chọn không quá 5");
            $('#divListEstSuburbER').show();
            return false;
        }
        if ($('#txtEstLoaiBDSER').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều loại BĐS của dự án, vui lòng chọn không quá 5");
            $('#divLstLoaiBDSDuAnER').show();
            return false;
        }
        if (!checkFloat(trim($('#txtEstGiaTuER').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtEstGiaDenER').val(), ' ').replace(',', '.'))) {
            alert("Giá phải là kiểu số");
            $('#divListGiaDuAnER').show();
            $('#txtEstGiaTuER').focus();
            return false;
        }
        if ($('#txtEstGiaTuER').val() != "" && $('#txtEstGiaDenER').val() != "") {
            if (parseFloat(trim($('#txtEstGiaTuER').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtEstGiaDenER').val(), ' ').replace(',', '.'))) {
                alert("Giá từ phải nhỏ hơn giá đến");
                $('#divListGiaDuAnER').show();
                $('#txtEstGiaTuER').focus();
                return false;
            }

            giaString = "&gt=" + $('#txtEstGiaTuER').val() + "&gd=" + $('#txtEstGiaDenER').val();
        }
        else if ($('#txtEstGiaDuAnER').val() != "") {
            giaString = "&gt=" + $('#txtEstGiaDuAnER').val().split('-')[0] + "&gd=" + $('#txtEstGiaDuAnER').val().split('-')[1];
        }
        window.location = pathClient + "estatelist.aspx@typeid=" + $('#txtEstLoaiBDSER').val()
									+ "&sstate=" + $('#txtEstStateIDER').val()
									+ "&ssuburb=" + $('#txtEstSuburbIDER').val()
									+ "&catid=" + $('#txtEstLoaiDuAnER').val()
									+ "&td=" + $('#txtEstTienDoER').val()
									+ giaString
									+ "&name=" + ($('#txtTenDuAnER').val() == "Tên dự án" ? "" : $('#txtTenDuAnER').val())
									+ "&pindex=1&mp=20";
    },
    DefaultFSEstRight: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=gest_default&d=" + (new Date()).getTime();
        $.post(url, {},
		function (data) {
		    FSEstateRight.TaoStateList(data.tt.lst, "divEstStateER", "txtEstStateIDER", "state");
		    FSEstateRight.TaoList(data.lest.lst, "divLoaiDuAnER", "txtEstLoaiDuAnER", "loaida");
		    FSEstateRight.TaoListMuti(data.lbdsest.lst, "divEstLoaiBDSER", "txtEstLoaiBDSER", "loaibdsda");
		    if ($('#txtEstLoaiBDSER').val() != "") {
		        $('#divEstLoaiBDSER input:checkbox').each(function () {
		            if (nvgUtils.CheckSplitValue(this.value, $('#txtEstLoaiBDSER').val(), ",")) {
		                this.checked = true;
		            }
		        });
		    }

		    FSEstateRight.TaoList(data.gia.lst, "divGiaDuAnER", "txtEstGiaDuAnER", "giaest");
		    FSEstateRight.TaoList(data.tdest.lst, "divTienDoEstER", "txtEstTienDoER", "tiendoest");
		}
	    , 'json');
    }
};
