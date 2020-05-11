
var FSDoanhNghiep = {
    CheckLoadSuburb: function () {
        if ($('#txtDNStateID').val() != "") {
            $('.hideDropdown').hide();
            $('#divListDNSuburb').toggle();
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

			    FSDoanhNghiep.TaoStateList(data.lst, "divDNState", "txtDNStateID", "state");
			}
		, 'json');
    },
    LoadQuanHuyen: function (st, textTinhThanh_) {
        FSDoanhNghiep.ShowTextTopSelect("hrfDNState", "iptDNState", textTinhThanh_, 'txtDNStateID', st, 'divDropDNState');
        FSDoanhNghiep.ShowTextTopSelect("hrfDNSuburb", "iptDNSuburb", '', 'txtDNSuburbID', '', 'divDropDNState');

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqh&d=" + (new Date()).getTime(); ;
        $.post(url, { st: st },
			function (data) {
			    FSDoanhNghiep.TaoListMuti(data.lst, 'divDNSuburb', 'txtDNSuburbID', "suburb");
			}
		, 'json');
    },
    LoadQuanHuyenDef: function (st, textTinhThanh_) {
        FSDoanhNghiep.ShowTextTopSelect("hrfDNState", "iptDNState", textTinhThanh_, 'txtDNStateID', st, 'divDropDNState');

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqh&d=" + (new Date()).getTime(); ;
        $.post(url, { st: st },
			function (data) {
			    FSDoanhNghiep.TaoListMuti(data.lst, 'divDNSuburb', 'txtDNSuburbID', "suburb");

			    $('#divDNSuburb input:checkbox').each(function () {
			        if (nvgUtils.CheckSplitValue(this.value, $('#txtDNSuburbID').val(), ",")) {
			            this.checked = true;
			        }
			    });
			}
		, 'json');
    },
LoadLoaiDN: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadloaidn&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSDoanhNghiep.TaoListMuti(data.lst, "divLoaiDN", "txtLoaiDN", "loaidn");
			    $('#divLoaiDN input:checkbox').each(function () {
			        if (nvgUtils.CheckSplitValue(this.value, $('#txtLoaiDN').val(), ",")) {
			            this.checked = true;
			        }
			    });
			}
		, 'json');
    },

    LoadLoaiBDSDNDef: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadloaibdsda&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    FSDoanhNghiep.TaoListMuti(data.lst, "divDNLoaiBDS", "txtDNLoaiBDS", "loaibdsda");

			    $('#divDNLoaiBDS input:checkbox').each(function () {
			        if (nvgUtils.CheckSplitValue(this.value, $('#txtDNLoaiBDS').val(), ",")) {
			            this.checked = true;
			        }
			    });
			}
		, 'json');
    },


    //gan list l vao divid
    TaoList: function (lll, divid, hdf, key_) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            var tpl__ = "";
            if (key_ == "state") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSDoanhNghiep.LoadQuanHuyen('${eValue}','${eName}');\">${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSDoanhNghiep.SetTinhThanh();\">Chọn tất cả</a></li>");
            }
            if (key_ == "loaidn") {
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSDoanhNghiep.ShowTextTopSelect('hrfLoaiDN','iptLoaiDN','${eName}','txtLoaiDN','${eValue}','divDropLoaiDN');\">${eName}</a></li>");
                $('#' + divid).append("<li ><a href=\"javascript:;\" onclick=\"FSDoanhNghiep.ShowTextTopSelect('hrfLoaiDN','iptLoaiDN','','txtLoaiDN','','divDropLoaiDN');\">Chọn tất cả</a></li>");
            }

            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;

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
            tpl__ = $.template("<li><a href=\"javascript:FSDoanhNghiep.LoadQuanHuyen('${eValue}','${eName}');\">${eName}</a></li>");
            tplS__ = $.template("<li><a href=\"javascript:FSDoanhNghiep.LoadQuanHuyen('${eValue}','${eName}');\"><span>${eName}</span></a></li>");
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
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSDoanhNghiep.SetTextValueMuti('divDNSuburb','txtDNSuburbID','hrfDNSuburb','iptDNSuburb');\"><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"FSDoanhNghiep.SetTextValueMuti('divDNSuburb','txtDNSuburbID','hrfDNSuburb','iptDNSuburb');\"> ${eName}</a></li>");
            if (key_ == "loaidn")
                tpl__ = $.template("<li><a href=\"javascript:;\" onclick=\"FSDoanhNghiep.SetTextValueMuti('divLoaiDN','txtLoaiDN','hrfLoaiDN','iptLoaiDN');\"><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"FSDoanhNghiep.SetTextValueMuti('divLoaiDN','txtLoaiDN','hrfLoaiDN','iptLoaiDN');\"> ${eName}</a></li>");

            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;

                $('#' + divid).append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
            }
        }
    },

    SetTinhThanh: function () {
        $('#txtDNStateID').val("");
        $('#txtDNSuburbID').val("");
        $('#iptDNState').hide();
        $('#hrfDNState').show();
        $('#divDNSuburb').html("");
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
        FSDoanhNghiep.ShowTextTopSelect(hrfID, itpID, str, txtID, val_, null);
    },
    ShowDefaultTopSelect: function (strState, strSuburb, strTuKhoa
		, strLoaiDN) {
        if (strState != "") {
            this.ShowTextTop('hrfDNState', 'iptDNState', strState);
            this.LoadQuanHuyenDef($('#txtDNStateID').val(), strState);
        }
        if (strSuburb != "") {
            this.ShowTextTop('hrfDNSuburb', 'iptDNSuburb', strSuburb);
        }
        if (strTuKhoa != "") {
            $('#txtTenDN').val(strTuKhoa);
        }
        var fl__ = false;
        if (strLoaiDN != "") {
            this.ShowTextTop('hrfLoaiDN', 'iptLoaiDN', strLoaiDN);
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


    },
    SearchDNMain: function () {


        if ($('#txtTenDN').val() == "Tên doanh nghiệp" && $('#txtDNStateID').val() == "" && $('#txtLoaiDN').val() == "") {
            alert("Bạn phải nhập tên doanh nghiệp hoặc chọn một tỉnh thành phố");
            return false;
        }
        if ($('#txtDNSuburbID').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều quận/huyện, vui lòng chọn không quá 5");
            $('#divListDNSuburb').show();
            return false;
        }
        if ($('#txtLoaiDN').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều loại doanh nghiệp, vui lòng chọn không quá 5");
            $('#divDropLoaiDN').show();
            return false;
        }

        window.location = pathClient + "agent.aspx@catid=" + $('#txtLoaiDN').val()
									+ "&st=" + $('#txtDNStateID').val()
									+ "&sb=" + $('#txtDNSuburbID').val()
									+ "&n=" + ($('#txtTenDN').val() == "Tên doanh nghiệp" ? "" : encodeURIComponent($('#txtTenDN').val()))
									+ "&pindex=1&mp=20";
    },
    DefaultDN: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=gdn_default&d=" + (new Date()).getTime();
        $.post(url, {},
		function (data) {
		    FSDoanhNghiep.TaoStateList(data.tt.lst, "divDNState", "txtDNStateID", "state");
		    FSDoanhNghiep.TaoListMuti(data.ldn.lst, "divLoaiDN", "txtLoaiDN", "loaidn");
		    $('#divLoaiDN input:checkbox').each(function () {
		        if (nvgUtils.CheckSplitValue(this.value, $('#txtLoaiDN').val(), ",")) {
		            this.checked = true;
		        }
		    });
		}
	    , 'json');
    }
};
