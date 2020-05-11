
var NvgRefineSearch =
{
    TimeDelay: 100,
    listEstateFolState: [],
    LoadTinhThanh: function () {

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadtt&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    NvgRefineSearch.TaoStateList(data.lst, "divStateRfs", "txtStateIDRfs", "state");
			    if ($('#txtStateIDRfs').val() != "") {
			        NvgRefineSearch.ShowTextTopSelect("hrfStateRfs", "iptStateRfs", $('#txtStateTextRfs').val());
			    }
			}
		, 'json');
    },
    LoadTinhThanhF: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadtt&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    NvgRefineSearch.TaoList(data.lst, "divStateRfsF", "txtStateIDRfs", "state");
			    NvgRefineSearch.SetValueF("divStateRfsF", $('#txtStateIDRfs').val());
			}
		, 'json');
    },
    LoadQuanHuyen: function (st, textTinhThanh_) {
        $('#divDropStateRfs').hide();
        document.getElementById('txtStateTextRfs').value = textTinhThanh_;
        document.getElementById('txtSuburbRfs').value = "";
        $('#txtStateIDRfs').val(st);
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqhrfs&d=" + (new Date()).getTime();
        $.post(url, { st: st },
			function (data) {
			    $('#divSuburbRfs').html(data);
			}
		, 'json');
    },
    LoadQuanHuyenF: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadqh&d=" + (new Date()).getTime();
        $.post(url, { st: $('#txtStateIDRfs').val() },
			function (data) {
			    NvgRefineSearch.TaoListMuti(data.lst, 'divSuburbRfsF', 'txtSuburbRfs', "suburb");
			    NvgRefineSearch.SetValueF("divSuburbRfsF", $('#txtSuburbRfs').val());
			}
		, 'json');
    },
    LoadLoaiBDSFolTranClass: function (val_) {
        document.getElementById('txtProClassRfs').value = "";
        document.getElementById('txtPropertyTypeRfs').value = "";
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadlbdsftc&d=" + (new Date()).getTime();
        $.post(url, { tc: val_ },
			function (data) {
			    $('#divLoaiBDSRfs').html(data);
			    $('#divLoaiKieuBDSRfs input:checkbox').attr("disabled", "true");

			    NvgRefineSearch.ShowTextTopSelect("hrfLoaiBDSRfs", "iptLoaiBDSRfs", "");

			    NvgRefineSearch.listEstateFolState = [];
			}
		);
    },
    LoadLoaiBDSJs: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadlbdsjs&d=" + (new Date()).getTime();
        $.post(url, { tc: document.getElementById('txtTranClassRfs').value },
			function (data) {
			    NvgRefineSearch.TaoList(data.lst, 'divLoaiBDSRfsF', 'txtProClassRfs', "lbds");
			    NvgRefineSearch.SetValueF("divLoaiBDSRfsF", $('#txtProClassRfs').val());
			}
		, 'json');
    },
    LoadKieuBDSJs: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadkbdsjs&d=" + (new Date()).getTime();
        $.post(url, { pt: $('#txtProClassRfs').val() },
			function (data) {
			    NvgRefineSearch.TaoListMuti(data.lst, 'divKieuBDSRfsF', 'txtPropertyTypeRfs', "kbds");
			    NvgRefineSearch.SetValueF("divKieuBDSRfsF", $('#txtPropertyTypeRfs').val());
			}
		, 'json');
    },
    LoadKieuBDSRfs: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadkbdsrfs&d=" + (new Date()).getTime();
        $.post(url, { pt: $('#txtProClassRfs').val(), kbds: $('#txtPropertyTypeRfs').val(), kbdstxt: $('#txtPropertyTypeTextRfs').val() },
			    function (data) {
			        $('#divKieuBDSRfs').html(data);
			        NvgRefineSearch.SetValueF("divKieuBDSRfs", $('#txtPropertyTypeRfs').val());
			    }
		    );
    },
    LoadLoaiBDSFolTranClass2: function (val_) {
        var pc__ = document.getElementById('txtProClassRfs').value;
        var pctxt__ = document.getElementById('txtProClassTextRfs').value;

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadlbdsftc&d=" + (new Date()).getTime();
        $.post(url, { tc: val_ },
			function (data) {
			    $('#divLoaiBDSRfs').html(data);

			    //if (document.getElementById("txtPropertyTypeRfs").value != "") pctxt__ = $("#txtPropertyTypeTextRfs").val();

			    ChonLoaiBDSNew1(pc__, pctxt__);

			    $('#rdoLoaiBds_' + pc__).attr("checked", "true");

			    if ($('#txtTranClassRfs').val() == "sale") $('#rdoBanRfs').attr("checked", "true");
			    else if ($('#txtTranClassRfs').val() == "rent") $('#rdoChoThueRfs').attr("checked", "true");

			    // 			    if (document.getElementById("txtPropertyTypeRfs").value != "") {
			    // 			        $('#ullbds_' + pc__ + ' input:checkbox').each(function () {
			    // 			            if (NvgRefineSearch.CheckStringInListString(this.value, document.getElementById("txtPropertyTypeRfs").value)) {
			    // 			                this.checked = true;
			    // 			            }
			    // 			        });
			    // 			    }
			}
		);
    },
    LoadEstate: function (stateid) {
        if (stateid == "") return;

        var url = pathClientAjax + "handler/FormSearchHandler.aspx@act=loaddarfs&d=" + (new Date()).getTime();
        var pars = {
            eid: $("#txtEstateRfs").val(),
            en: $("#txtEstateTextRfs").val(),
            sb: $("#txtSuburbRfs").val(),
            st: stateid,
            tc: $('#txtTranClassRfs').val(),
            pc: $('#txtProClassRfs').val()
        };
        $.post(url, pars,
			function (data) {
			    $('#divEstateRfs').html(data);
			}
		);
    },
    LoadEstateF: function () {
        var stateid = $('#txtStateIDRfs').val();
        if (stateid == "") return;

        var url = pathClientAjax + "handler/FormSearchHandler.aspx@act=LoadEstate&suburb=" + $("#txtSuburbRfs").val() + "&stateid=" + stateid + "&ttype=" + $('#txtTranClassRfs').val() + "&ptype=" + $('#txtProClassRfs').val() + "&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    NvgRefineSearch.TaoListMuti(data.lst, "divEstateRfsF", "txtEstateRfs", "estate");
			    NvgRefineSearch.SetValueF("divEstateRfsF", $('#txtEstateRfs').val());
			}
		, 'json');
    },
    LoadPx: function () {
        if ($("#txtSuburbRfs").val() == "") {
            $('#divPhuongXaRfs').html("Bạn cần chọn quận/huyện");
            return
        };
        var url = pathClientAjax + "handler/FormSearchHandler.aspx@act=loadpxrfs&d=" + (new Date()).getTime();
        var pars = {
            wid: $("#txtWardIDRfs").val(),
            wn: $("#txtWardTextRfs").val(),
            sb: $("#txtSuburbRfs").val()
        };
        $.post(url, pars,
			function (data) {
			    $('#divPhuongXaRfs').html(data);
			}
		);
    },
    LoadPxF: function () {
        if ($("#txtSuburbRfs").val() == "") {
            $('#divPxRfsF').html("Bạn cần chọn quận/huyện");
            return;
        }
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadpxjs&d=" + (new Date()).getTime();
        $.post(url, { sb: $('#txtSuburbRfs').val() },
			function (data) {
			    NvgRefineSearch.TaoListMuti(data.lst, 'divPxRfsF', 'txtWardIDRfs', "ward");
			    NvgRefineSearch.SetValueF("divPxRfsF", $('#txtWardIDRfs').val());
			}
		, 'json');
    },
    LoadDuong: function () {
        if ($("#txtSuburbRfs").val() == "") {
            $('#divDuongRfs').html("Bạn cần chọn quận/huyện");
            return
        };

        var url = pathClientAjax + "handler/FormSearchHandler.aspx@act=loaddrfs&d=" + (new Date()).getTime();
        var pars = {
            did: $("#txtStreetIDRfs").val(),
            dn: $("#txtStreetTextRfs").val(),
            sb: $("#txtSuburbRfs").val()
        };
        $.post(url, pars,
			function (data) {
			    $('#divDuongRfs').html(data);
			}
		);
    },
    LoadDuongF: function () {
        if ($("#txtSuburbRfs").val() == "") {
            $('#divDuongRfsF').html("Bạn cần chọn quận/huyện");
            return;
        }

        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loaddjs&d=" + (new Date()).getTime();
        $.post(url, { sb: $('#txtSuburbRfs').val() },
			function (data) {
			    NvgRefineSearch.TaoListMuti(data.lst, 'divDuongRfsF', 'txtStreetIDRfs', "street");
			    NvgRefineSearch.SetValueF("divDuongRfsF", $('#txtStreetIDRfs').val());
			}
		, 'json');
    },
    LoadGiaRFS: function () {
        var tc = $('#txtTranClassRfs').val();
        var pc = $('#txtProClassRfs').val();
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadgiarfs&d=" + (new Date()).getTime();
        $.post(url, { tc: tc, pc: pc },
			function (data) {
			    $('#divKhoangGiaRfs').html(data);
			}
		);
    },
    LoadGiaF: function () {
        var tc = $('#txtTranClassRfs').val();
        var pc = $('#txtProClassRfs').val();
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadgia&d=" + (new Date()).getTime();
        $.post(url, { tc: tc, pc: pc },
			function (data) {
			    NvgRefineSearch.TaoList(data.lst, "divGiaRfsF", "txtGiaRfs", "gia");
			    NvgRefineSearch.SetValueGiaF("divGiaRfsF", $('#txtGiaRfs').val(), "gia");
			}
		, 'json');
    },
    LoadDtttF: function () {
        var tc = $('#txtTranClassRfs').val();
        var pc = $('#txtProClassRfs').val();
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loaddt&d=" + (new Date()).getTime();
        $.post(url, { tc: tc, pc: pc },
			    function (data) {
			        NvgRefineSearch.TaoList(data.lst, "divDtRfsF", "txtGiaRfs", "dt");
			        NvgRefineSearch.SetValueGiaF("divDtRfsF", $('#txtDienTichRfs').val(), "dt");
			    }
		    , 'json');
    },
    LoadDtnF: function () {
        var tc = $('#txtTranClassRfs').val();
        var pc = $('#txtProClassRfs').val();
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loaddtn&d=" + (new Date()).getTime();
        $.post(url, { tc: tc, pc: pc },
			    function (data) {
			        NvgRefineSearch.TaoList(data.lst, "divDtnRfsF", "txtGiaRfs", "dtn");
			        NvgRefineSearch.SetValueGiaF("divDtnRfsF", $('#txtDTNRfs').val(), "dtn");
			    }
		    , 'json');
    },
    LoadKtmtF: function () {
        var tc = $('#txtTranClassRfs').val();
        var pc = $('#txtProClassRfs').val();
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadktmt&d=" + (new Date()).getTime();
        $.post(url, { tc: tc, pc: pc },
			    function (data) {
			        NvgRefineSearch.TaoList(data.lst, "divKtmtRfsF", "txtGiaRfs", "ktmt");
			        NvgRefineSearch.SetValueGiaF("divKtmtRfsF", $('#txtKTMTRfs').val(), "ktmt");
			    }
		    , 'json');
    },
    LoadHuongF: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadhuongjs&d=" + (new Date()).getTime();
        $.post(url, { sb: $('#txtSuburbRfs').val() },
			function (data) {
			    NvgRefineSearch.TaoListMuti(data.lst, "divHuongRfsF", "txtHuongIDRfs", "huong");
			    NvgRefineSearch.SetValueF("divHuongRfsF", $('#txtHuongIDRfs').val());
			}
		, 'json');
    },
    LoadPhapLiF: function () {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadpljs&d=" + (new Date()).getTime();
        $.post(url, { sb: $('#txtSuburbRfs').val() },
			function (data) {
			    NvgRefineSearch.TaoListMuti(data.lst, "divPhapLiRfsF", "txtPhapLiIDRfs", "phapli");
			    NvgRefineSearch.SetValueF("divPhapLiRfsF", $('#txtPhapLiIDRfs').val());
			}
		, 'json');
    },
    CheckStringInListString: function (s, sl) {
        var ar = sl.split(',');
        for (var i = 0; i < ar.length; i++) {
            if (s == ar[i]) return true;
        }
        return false;
    },
    TaoStateList: function (lll, divid, hdf, key_) {
        if (lll != null && lll != "") {
            var tpl__ = "";
            var tplS__ = "";
            tpl__ = $.template("<li><a onclick=\"NvgRefineSearch.SetTinhThanh('${eValue}','${eName}');\" href=\"javascript:;\">${eName}</a></li>");
            tplS__ = $.template("<li><a onclick=\"NvgRefineSearch.SetTinhThanh('${eValue}','${eName}');\" href=\"javascript:;\"><span>${eName}</span></a></li>");
            $('#divStateN').append("<li class=\"header\">MIỀN BẮC</li>");
            $('#divStateM').append("<li class=\"header\">MIỀN TRUNG</li>");
            $('#divStateS').append("<li class=\"header\">MIỀN NAM</li>");
            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;
                var eRegion = lll[i].s3;
                if (eRegion == "1") {
                    if (eID == "28" || eID == "17") {
                        $('#divStateN').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divStateN').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
                if (eRegion == "2") {
                    if (eID == "31" || eID == "34" || eID == "26") {
                        $('#divStateM').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divStateM').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
                if (eRegion == "3") {
                    if (eID == "59" || eID == "60" || eID == "43" || eID == "50" || eID == "41" || eID == "44" || eID == "38") {
                        $('#divStateS').append(tplS__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                    else {
                        $('#divStateS').append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                    }
                }
            }
        }
    },
    TaoListEstate: function (lll, divid) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            $('#' + divid).append("<li><a href=\"javascript:;\" onclick=\"$('#divEstateRfs input:checkbox').removeAttr('checked'); getDataEstate();\">Xóa tất cả</li>");
            var tpl__ = $.template("<li><input type=\"checkbox\" value=\"${eID}\" title=\"${eName}\" onclick=\"getDataEstate();\" >${eName} (${eCount})</li>");
            for (var i = 0; i < lll.length; i++) {
                if (lll[i].s4 != "0") {
                    var eID = lll[i].s1;
                    var eName = lll[i].s2;
                    var eSuburb = lll[i].s3;
                    var eCount = lll[i].s4;

                    $('#' + divid).append(tpl__, { inputId: i, eID: eID, eName: eName, eCount: eCount });
                }
            }
        }
    },
    TaoListMuti: function (lll, divid, hdf, key_) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            var tpl__ = "";

            if (key_ == "estate") {
                tpl__ = $.template("<li><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetHdfF('divEstateRfsF','txtEstateRfs','spnDaRfs');\"> ${eName} (${eCount})</li>");

            }
            else if (key_ == "suburb")
                tpl__ = $.template("<li><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetHdfF('divSuburbRfsF','txtSuburbRfs','spnQhRfs');\"> ${eName}</li>");
            else if (key_ == "ward")
                tpl__ = $.template("<li><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetHdfF('divPxRfsF','txtWardIDRfs','spnPxRfs');\"> ${eName}</li>");
            else if (key_ == "street")
                tpl__ = $.template("<li><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetHdfF('divDuongRfsF','txtStreetIDRfs','spnDRfs');\"> ${eName}</li>");
            else if (key_ == "huong")
                tpl__ = $.template("<li><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetHdfF('divHuongRfsF','txtHuongIDRfs','spnHRfs');\"> ${eName}</li>");
            else if (key_ == "phapli")
                tpl__ = $.template("<li><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetHdfF('divPhapLiRfsF','txtPhapLiIDRfs','spnPlRfs');\"> ${eName}</li>");
            else if (key_ == "kbds")
                tpl__ = $.template("<li><input type=\"checkBox\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetHdfF('divKieuBDSRfsF','txtPropertyTypeRfs','spnKbdsRfs');\"> ${eName}</li>");

            if (key_ != "estate") {
                for (var i = 0; i < lll.length; i++) {
                    var eID = lll[i].s1;
                    var eName = lll[i].s2;

                    $('#' + divid).append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
                }
            }
            else if (key_ == "estate") {
                var _suburb = $('#txtSuburbRfs').val();
                for (var i = 0; i < lll.length; i++) {
                    var eID = lll[i].s1;
                    var eName = lll[i].s2;
                    var eQuan = lll[i].s3;
                    var eCount = lll[i].s4;
                    if (NvgRefineSearch.CheckStringInListString(eQuan, _suburb))
                        $('#' + divid).append(tpl__, { eValue: eID, eName: eName, eCount: eCount });
                }
            }
        }
    },
    TaoList: function (lll, divid, hdf, key_) {
        $('#' + divid).html("");
        if (lll != "" && lll != null) {
            var tpl__ = "";
            if (key_ == "state") {
                tpl__ = $.template("<li><input name=\"rdoTTRfsF\" type=\"radio\" value=\"${eValue}\" title=\"${eName}\" onclick=\"NvgRefineSearch.SetTinhThanhF('${eValue}','${eName}');\"> ${eName}</li>");
            }
            else if (key_ == "gia") {
                tpl__ = $.template("<li><input type=\"radio\" name=\"rdoGia\" onclick=\"NvgRefineSearch.BindHdfFreeRdo('${eValue}','gia','${eName}');\"> ${eName}</li>");
            }
            else if (key_ == "lbds")
                tpl__ = $.template("<li><input type=\"radio\" name=\"rdoLoaiBDS\" value=\"${eValue}\" onclick=\"$('#txtProClassRfs').val('${eValue}');$('#txtPropertyTypeRfs').val('');NvgRefineSearch.LoadKieuBDSJs();\"> ${eName}</li>");
            else if (key_ == "dt") {
                tpl__ = $.template("<li><input type=\"radio\" name=\"rdoDt\" onclick=\"NvgRefineSearch.BindHdfFreeRdo('${eValue}','dt','${eName}');\"> ${eName}</li>");
            }
            else if (key_ == "dtn") {
                tpl__ = $.template("<li><input type=\"radio\" name=\"rdoDtn\" onclick=\"NvgRefineSearch.BindHdfFreeRdo('${eValue}','dtn','${eName}');\"> ${eName}</li>");
            }
            else if (key_ == "ktmt") {
                tpl__ = $.template("<li><input type=\"radio\" name=\"rdoKtmt\" onclick=\"NvgRefineSearch.BindHdfFreeRdo('${eValue}','ktmt','${eName}');\"> ${eName}</li>");
            }

            for (var i = 0; i < lll.length; i++) {
                var eID = lll[i].s1;
                var eName = lll[i].s2;

                $('#' + divid).append(tpl__, { eValue: eID, eName: eName, eHdf: hdf });
            }
        }
    },
    ClearAllPT: function () {
        document.getElementById('txtPropertyTypeRfs').value = "";
        $('#divLoaiKieuBDSRfs input:checkbox').removeAttr("checked");
        $('#divLoaiKieuBDSRfs input:radio').removeAttr("checked");
        $('#divLoaiKieuBDSRfs input:checkbox').attr("disabled", "true");
        $('#txtProClassRfs').val("");

        document.getElementById('txtProClassTextRfs').value = "";

        this.ShowTextTopSelect("hrfLoaiBDSRfs", "iptLoaiBDSRfs", "");

    },
    SetTinhThanh: function (stid, stName) {
        NvgRefineSearch.ShowTextTopSelect('hrfStateRfs', 'iptStateRfs', stName);
        //NvgRefineSearch.LoadQuanHuyen('${eValue}','${eName}');
        $('#txtStateIDRfs').val(stid);
        $('#txtStateTextRfs').val(stName);
        $('#txtSuburbRfs').val("");
        $('#divDropStateRfs').hide();
    },
    SetTinhThanhF: function (stid, stName) {
        //NvgRefineSearch.ShowTextTopSelect('hrfStateRfs', 'iptStateRfs', stName);
        $('#txtStateIDRfs').val(stid);
        //$('#txtStateTextRfs').val(stName);
        $('#txtSuburbRfs').val("");
        $('#spnQhRfs').html("");
        $('#spnDaRfs').html("");
        $('#spnPxRfs').html("");
        $('#spnDRfs').html("");
        $('#spnTtRfs').html("(" + stName + ")");
    },
    SelectAllTinhThanh: function () {
        $('#txtStateIDRfs').val("");
        $('#txtSuburbRfs').val("");
        $('#iptStateRfs').hide();
        $('#hrfStateRfs').show();
        $('#divSuburbRfs').html("");
        $('#txtStateTextRfs').val("");
    },
    ShowTextTopSelect: function (hrf, ipt, con) {
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
    },
    ShowPopupTimKiem: function (ahrfID_, _loai) {
        var url = pathClientAjax + "handler/formsearchhandler.aspx@act=loadrfsfull&d=" + (new Date()).getTime();
        $.post(url, {},
			function (data) {
			    $('#login_box').html(data);
			    $('#login_box').centerInClient({ minY: 1 });
			    $('#login_box').width("700px");
			    NvgRefineSearch.CountAllF();
			    NvgRefineSearch.ShowLgdRfs(ahrfID_, _loai);
			    $('#login_box').show();
			    NvgRefineSearch.LuuDieuKien();
			}
		);
    },
    ShowLgdRfs: function (ahrfID_, _loai) {
        $('.ColMenu li').removeClass("current");
        document.getElementById(ahrfID_).className = "current";

        $('.ColContent div').hide();
        switch (_loai) {
            case "lgd":
                $('#divTitleRfsF').html("Loại hình BĐS");
                if ($('#txtTranClassRfs').val() == "sale") $('#rdoBanRfsF').attr("checked", "true");
                else if ($('#txtTranClassRfs').val() == "rent") $('#rdoChoThueRfsF').attr("checked", "true");
                $('#div_lgdrfs').show();

                this.LoadLoaiBDSJs();
                $('#div_lbdsrfs').show();

                this.LoadKieuBDSJs();
                $('#div_kbdsrfs').show();
                break;
            case "lbds":
                $('#divTitleRfsF').html("Loại bất động sản");
                this.LoadLoaiBDSJs();
                $('#div_lbdsrfs').show();
                break;
            case "state":
                $('#divTitleRfsF').html("Tỉnh/Thành Phố");
                this.LoadTinhThanhF();
                $('#div_ttrfs').show();
                break;
            case "suburb":
                $('#divTitleRfsF').html("Quận/Huyện");
                this.LoadQuanHuyenF();
                $('#div_qhrfs').show();
                break;
            case "cbHomeClass":
                $('#divTitleRfsF').html("Kiểu bất động sản");
                this.LoadKieuBDSJs();
                $('#div_kbdsrfs').show();
                break;
            case "cbMinPrice-cbMaxPrice":
                $('#divTitleRfsF').html("Khoảng giá");
                this.LoadGiaF();
                $('#div_grfs div').show();
                $('#div_grfs').show();
                break;
            case "cbEstate":
                $('#divTitleRfsF').html("Dự án ở " + $('#txtStateTextRfs').val());
                this.LoadEstateF();
                $('#div_darfs').show();
                break;
            case "ward":
                $('#divTitleRfsF').html("Phường/Xã ở " + $('#txtStateTextRfs').val());
                this.LoadPxF();
                $('#div_pxrfs').show();
                break;
            case "streetid":
                $('#divTitleRfsF').html("Đường ở " + $('#txtStateTextRfs').val());
                this.LoadDuongF();
                $('#div_drfs').show();
                break;
            case "cbAspect":
                $('#divTitleRfsF').html("Hướng nhà đất");
                this.LoadHuongF();
                $('#div_hrfs').show();
                break;
            case "cbOwnerType":
                $('#divTitleRfsF').html("Tình trạng pháp lý");
                this.LoadPhapLiF();
                $('#div_plrfs').show();
                break;
            case "dttt":
                $('#divTitleRfsF').html("Diện tích đất tối thiểu");
                $('#txtDtttMinRfsf').val($('#txtDtttMinRfs').val());
                $('#txtDtttMaxRfsf').val($('#txtDtttMaxRfs').val());
                this.LoadDtttF();
                $('#div_dtttrfs div').show();
                $('#div_dtttrfs').show();
                break;
            case "dtn":
                $('#divTitleRfsF').html("Đường trước nhà");
                $('#txtDtnMinRfsf').val($('#txtDtnMinRfs').val());
                $('#txtDtnMaxRfsf').val($('#txtDtnMaxRfs').val());
                this.LoadDtnF();
                $('#div_dtnrfs div').show();
                $('#div_dtnrfs').show();
                break;
            case "ktmt":
                $('#divTitleRfsF').html("Kích thước mặt tiền");
                $('#txtKtmtMinRfsf').val($('#txtKtmtMinRfs').val());
                $('#txtKtmtMaxRfsf').val($('#txtKtmtMaxRfs').val());
                this.LoadKtmtF();
                $('#div_ktmtrfs div').show();
                $('#div_ktmtrfs').show();
                break;
            case "dtqc":
                $('#divTitleRfsF').html("Đặc tính");

                if ($('#txtTabRfs').val() == "rv") {
                    $('#rdoDTTatcaF').attr("checked", "true");
                    $('#spnDtRfs').html("(Tất cả BĐS)");
                }
                else if ($('#txtTabRfs').val() == "ag") {
                    $('#rdoDTVipF').attr("checked", "true");
                    $('#spnDtRfs').html("(BĐS nổi bật)");
                }
                else if ($('#txtTabRfs').val() == "cc") {
                    $('#rdoDTChinhChuF').attr("checked", "true");
                    $('#spnDtRfs').html("(Chính chủ)");
                }
                else if ($('#txtTabRfs').val() == "ch") {
                    $('#rdoDTIsImgF').attr("checked", "true");
                    $('#spnDtRfs').html("(BĐS có hình)");
                }

                $('#div_iirfs').show();
                break;
            default:
        }
        $('#divTitleRfsF').show();
    },
    SetToggle: function (_loai) {
        switch (_loai) {
            case "suburb":
                if ($('#txtSuburbRfs').val() == "") {
                    $('#divQuanHuyenRfs').toggle();
                    this.ChangeCssToggle('spnTgQh');
                }
                break;
            case "cbHomeClass":
                if ($('#txtPropertyTypeRfs').val() == "") {
                    $('#divKieuBDSRfs').toggle();
                    this.ChangeCssToggle('spnTgKbds');
                }
                break;
            case "cbMinPrice-cbMaxPrice":
                if ($('#txtGiaTuRfs').val() == "" && $('#txtGiaDenRfs').val() == ""
                     && $('#txtGiaRfs').val() == "") {
                    $('#divListKhoangGiaRfs').toggle();
                    this.ChangeCssToggle('spnTgG');
                }
                break;
            case "cbEstate":
                if ($('#txtEstateRfs').val() == "") {
                    $('#divEstateRfs').toggle();
                    this.ChangeCssToggle('spnTgDa');
                }
                break;
            case "ward":
                if ($('#txtWardIDRfs').val() == "") {
                    $('#divPhuongXaRfs').toggle();
                    this.ChangeCssToggle('spnTgPx');
                }
                break;
            case "streetid":
                if ($('#txtStreetIDRfs').val() == "") {
                    $('#divDuongRfs').toggle();
                    this.ChangeCssToggle('spnTgD');
                }
                break;
            case "cbAspect":
                if ($('#txtHuongIDRfs').val() == "") {
                    $('#divHuongRfs').toggle();
                    this.ChangeCssToggle('spnTgH');
                }
                break;
            case "cbOwnerType":
                if ($('#txtPhapLiIDRfs').val() == "") {
                    $('#divPhapLiRfs').toggle();
                    this.ChangeCssToggle('spnTgPl');
                }
                break;
            case "dttt":
                if ($('#txtDtttMinRfs').val() == "" && $('#txtDtttMaxRfs').val() == "" && $('#txtDienTichRfs').val() == "") {
                    $('#divDtttRfs').toggle();
                    this.ChangeCssToggle('spnTgDttt');
                }
                break;
            case "dtn":
                if ($('#txtDtnMinRfs').val() == "" && $('#txtDtnMaxRfs').val() == "" && $('#txtDTNRfs').val() == "") {
                    $('#divDtnRfs').toggle();
                    this.ChangeCssToggle('spnTgDtn');
                }
                break;
            case "ktmt":
                if ($('#txtKtmtMinRfs').val() == "" && $('#txtKtmtMaxRfs').val() == "" && $('#txtKTMTRfs').val() == "") {
                    $('#divKtmtRfs').toggle();
                    this.ChangeCssToggle('spnTgKtmt');
                }
                break;
            case "dactinh":
                if ($('#txtIsImageIDRfs').val() == "" && $('#txtChinhChuRfs').val() == "") {
                    $('#divDacTinhRfs').toggle();
                    this.ChangeCssToggle('spnTgDt');
                }
                break;
            default:
        }
    },
    ChangeCssToggle: function (this_) {
        var __this = document.getElementById(this_);
        if (__this.className == "rlp-x") {
            __this.className = "rlp-a";
        }
        else if (__this.className == "rlp-a") {
            __this.className = "rlp-x";
        }
    },
    BindHdfFreeRdo: function (_value, _loai, _text) {
        var arr_ = _value.split('-');
        if (_loai == "gia") {
            /*
            $('#txtGiaTuRfsF').val(arr_[0]);
            $('#txtGiaDenRfsF').val(arr_[1]);
            */
            $('#spnKgRfs').html("(" + _text + ")");
            $('#txtGiaRfs').val(arr_[0] + "-" + arr_[1]);

            $('#txtGiaTuRfsF').val('');
            $('#txtGiaDenRfsF').val('');
            $('#txtGiaTuRfs').val('');
            $('#txtGiaDenRfs').val('');

            $('#dtgf').html("");
            $('#dtdf').html("");
        }
        if (_loai == "dt") {
            $('#txtDienTichRfs').val(arr_[0] + "-" + arr_[1]);

            $('#spnDtttRfs').html("(" + _text + ")");

            $('#txtDtttMinRfs').val("");
            $('#txtDtttMaxRfs').val("");
            $('#txtDtttMinRfsf').val("");
            $('#txtDtttMaxRfsf').val("");
        }
        if (_loai == "dtn") {
            $('#txtDTNRfs').val(arr_[0] + "-" + arr_[1]);

            $('#spnDtnRfs').html("(" + _text + ")");

            $('#txtDtnMinRfs').val("");
            $('#txtDtnMaxRfs').val("");
            $('#txtDtnMinRfsf').val("");
            $('#txtDtnMaxRfsf').val("");
        }
        if (_loai == "ktmt") {
            $('#txtKTMTRfs').val(arr_[0] + "-" + arr_[1]);

            $('#spnKtmtRfs').html("(" + _text + ")");

            $('#txtKtmtMinRfs').val("");
            $('#txtKtmtMaxRfs').val("");
            $('#txtKtmtMinRfsf').val("");
            $('#txtKtmtMaxRfsf').val("");
        }
    },
    SetHdfFree: function (id_, value_, divID_) {
        $('#' + divID_ + ' input').removeAttr("checked");
        $('#' + id_).val(value_);

        if (($('#txtGiaTuRfs').val() != "" && $('#txtGiaDenRfs').val() != "") || $('#txtGiaRfs').val() != "") {
            $('#spnKgRfs').html("(" + $('#dtgf').html() + " - " + $('#dtdf').html() + ")");
            $('#txtGiaRfs').val($('#txtGiaTuRfs').val() + "-" + $('#txtGiaDenRfs').val());
        }
        else $('#spnKgRfs').html("");

        if ($('#txtDtttMinRfs').val() != "" && $('#txtDtttMaxRfs').val() != "") {
            $('#spnDtttRfs').html("(" + $('#txtDtttMinRfs').val() + " - " + $('#txtDtttMaxRfs').val() + " m2)");
            $('#txtDienTichRfs').val($('#txtDtttMinRfs').val() + "-" + $('#txtDtttMaxRfs').val());
        }
        else $('#spnDtttRfs').html("");

        if ($('#txtDtnMinRfs').val() != "" && $('#txtDtnMaxRfs').val() != "") {
            $('#spnDtnRfs').html("(" + $('#txtDtnMinRfs').val() + " - " + $('#txtDtnMaxRfs').val() + " m)");
            $('#txtDTNRfs').val($('#txtDtnMinRfs').val() + "-" + $('#txtDtnMaxRfs').val());
        }
        else $('#spnDtnRfs').html("");

        if ($('#txtKtmtMinRfs').val() != "" && $('#txtKtmtMaxRfs').val() != "") {
            $('#spnKtmtRfs').html("(" + $('#txtKtmtMinRfs').val() + " - " + $('#txtKtmtMaxRfs').val() + " m)");
            $('#txtKTMTRfs').val($('#txtKtmtMinRfs').val() + "-" + $('#txtKtmtMaxRfs').val());
        }
        else $('#spnKtmtRfs').html("");
    },
    ChgClsHvr: function (_this) {
        if (_this.className == "asr-v asr-sd") _this.className = "asr-v asr-sh";
        else if (_this.className == "asr-v asr-nd") _this.className = "asr-v asr-nh";
    },
    ChgClsOut: function (_this) {
        if (_this.className == "asr-v asr-sh") _this.className = "asr-v asr-sd";
        else if (_this.className == "asr-v asr-nh") _this.className = "asr-v asr-nd";
    },
    ChgClsClk: function (_this) {
        if (_this.className == "asr-v asr-sh") {
            _this.className = "asr-v asr-nd";
        }
        else if (_this.className == "asr-v asr-nh") _this.className = "asr-v asr-sd";
        else if (_this.className == "asr-v asr-sd") _this.className = "asr-v asr-nd";
        else if (_this.className == "asr-v asr-nd") _this.className = "asr-v asr-sd";
    },
    ChgClsClkO: function (_this, _divid) {
        if (_this.className == "asr-v asr-sh")
            $('#' + _divid + ' .asr-v').attr("class", "asr-v asr-nd");
        else if (_this.className == "asr-v asr-nh") {
            $('#' + _divid + ' .asr-v').attr("class", "asr-v asr-nd");
            _this.className = "asr-v asr-sd";
        }
    },
    ShowButtonGo: function (btnID) {
        $('#' + btnID).show();
    },
    AddElementArr: function (s) {
        var arr = s.split(',');
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != "") {
                arr1.push(arr[i]);
            }
        }
        return arr1;
    },
    RemoveElementArr: function (s, _value) {
        var arr = s.split(',');
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != _value && arr[i] != "") {
                arr1.push(arr[i]);
            }
        }
        return arr1;
    },
    SetValueF: function (divID_, value_) {
        $('#' + divID_ + ' input').each(function () {
            if (NvgRefineSearch.CheckStringInListString(this.value, value_)) this.checked = true;
        }
		);
    },
    SetValueGiaF: function (divID_, value_, loai_) {
        var flag_ = false;
        $('#' + divID_ + ' input').each(function () {
            if (NvgRefineSearch.CheckStringInListString(this.value, value_)) {
                this.checked = true;
                flag_ = true;
            }
        });

        if (!flag_) {
            if (loai_ == "gia") {
                $('#txtGiaTuRfsF').val(value_.split('-')[0]);
                $('#txtGiaDenRfsF').val(value_.split('-')[1]);
            }
            else if (loai_ == "dt") {
                $('#txtDtttMinRfsf').val(value_.split('-')[0]);
                $('#txtDtttMaxRfsf').val(value_.split('-')[1]);
            }
            else if (loai_ == "dtn") {
                $('#txtDtnMinRfsf').val(value_.split('-')[0]);
                $('#txtDtnMaxRfsf').val(value_.split('-')[1]);
            }
            else if (loai_ == "ktmt") {
                $('#txtKtmtMinRfsf').val(value_.split('-')[0]);
                $('#txtKtmtMaxRfsf').val(value_.split('-')[1]);
            }
        }
    },
    SetHdfF: function (divID_, hdfID_, spnDemID_) {
        var dem = 0;
        var bien_ = document.getElementById(hdfID_).value;
        document.getElementById(hdfID_).value = "";
        $('#' + spnDemID_).html("");
        $('#' + divID_ + ' input:checkbox').each(function () {
            if (this.checked == true) {
                document.getElementById(hdfID_).value += this.value + ",";
                dem++;
            }
        });
        if (dem != 0)
            $('#' + spnDemID_).html("(Chọn " + dem + ")");
        // kiem tra ko cho quan huyen qua nhiu 
        if (hdfID_ == "txtSuburbRfs") {
            if ($('#txtSuburbRfs').val().split(',').length > 6) {
                alert("Bạn chọn quá nhiều quận/huyện, vui lòng chọn không quá 5");
                // restore lai uncheck
                dem--;
                $('#' + divID_ + ' input:checkbox').removeAttr("checked");
                $('#' + spnDemID_).html("(Chọn " + dem + ")");
                // check lai tu dau
                $('#' + divID_ + ' input:checkbox').each(function () {
                    if (NvgRefineSearch.CheckStringInListString(this.value, bien_)) {
                        this.checked = true;
                    }
                });
                // gan lai gtri dau
                $('#' + hdfID_).val(bien_);
                return false;
            }
        }

    },
    CountLenghtHdfValue: function (hdfValue) {
        var arr__ = trim(hdfValue, ',').split(',');

        return arr__.length;

    },
    CountAllF: function () {
        var _txt = "Chọn ";
        if ($('#txtStateIDRfs').val() != "") {
            $('#spnTtRfs').html("(" + $('#txtStateTextRfs').val() + ")");
        }
        if ($('#txtSuburbRfs').val() != "") {
            var a = this.CountLenghtHdfValue($('#txtSuburbRfs').val());
            if (a != 0) $('#spnQhRfs').html("(" + _txt + a + ")");
        }
        if ($('#txtEstateRfs').val() != "") {
            var a = this.CountLenghtHdfValue($('#txtEstateRfs').val());
            if (a != 0) $('#spnDaRfs').html("(" + _txt + a + ")");
        }
        if ($('#txtWardIDRfs').val() != "") {
            var a = this.CountLenghtHdfValue($('#txtWardIDRfs').val());
            if (a != 0) $('#spnPxRfs').html("(" + _txt + a + ")");
        }
        if ($('#txtStreetIDRfs').val() != "") {
            var a = this.CountLenghtHdfValue($('#txtStreetIDRfs').val());
            if (a != 0) $('#spnDRfs').html("(" + _txt + a + ")");
        }
        if ($('#txtHuongIDRfs').val() != "") {
            var a = this.CountLenghtHdfValue($('#txtHuongIDRfs').val());
            if (a != 0) $('#spnHRfs').html("(" + _txt + a + ")");
        }
        if ($('#txtPhapLiIDRfs').val() != "") {
            var a = this.CountLenghtHdfValue($('#txtPhapLiIDRfs').val());
            if (a != 0) $('#spnPlRfs').html("(" + _txt + a + ")");
        }
        if ($('#txtPropertyTypeRfs').val() != "") {
            var a = this.CountLenghtHdfValue($('#txtPropertyTypeRfs').val());
            if (a != 0) $('#spnKbdsRfs').html("(" + _txt + a + ")");
        }

        if ($('#txtGiaTuRfs').val() != "" && $('#txtGiaDenRfs').val() != "") {
            $('#spnKgRfs').html("(" + $('#dtg').html() + " - " + $('#dtd').html() + ")");
        }
        else if ($('#txtGiaRfs').val() != "") {
            $('#spnKgRfs').html("(" + this.ShowGiaText($('#txtGiaRfs').val().split('-')[0]) + " - " + this.ShowGiaText($('#txtGiaRfs').val().split('-')[1]) + ")");
        }
        else $('#spnKgRfs').html("");

        if ($('#txtDtttMinRfs').val() != "" && $('#txtDtttMaxRfs').val() != "") {
            $('#spnDtttRfs').html("(" + $('#txtDtttMinRfs').val() + " - " + $('#txtDtttMaxRfs').val() + " m<sup>2</sup>)");
        }
        else if ($('#txtDienTichRfs').val() != "") {
            $('#spnDtttRfs').html("(" + $('#txtDienTichRfs').val().split('-')[0] + " - " + $('#txtDienTichRfs').val().split('-')[1] + " m)");
        }
        else $('#spnDtttRfs').html("");

        if ($('#txtDtnMinRfs').val() != "" && $('#txtDtnMaxRfs').val() != "") {
            $('#spnDtnRfs').html("(" + $('#txtDtnMinRfs').val() + " - " + $('#txtDtnMaxRfs').val() + " m)");
        }
        else if ($('#txtDTNRfs').val() != "") {
            $('#spnDtnRfs').html("(" + $('#txtDTNRfs').val().split('-')[0] + " - " + $('#txtDTNRfs').val().split('-')[1] + " m)");
        }
        else $('#spnDtnRfs').html("");

        if ($('#txtKtmtMinRfs').val() != "" && $('#txtKtmtMaxRfs').val() != "") {
            $('#spnKtmtRfs').html("(" + $('#txtKtmtMinRfs').val() + " - " + $('#txtKtmtMaxRfs').val() + " m)");
        }
        else if ($('#txtKTMTRfs').val() != "") {
            $('#spnKtmtRfs').html("(" + $('#txtKTMTRfs').val().split('-')[0] + " - " + $('#txtKTMTRfs').val().split('-')[1] + " m)");
        }
        else $('#spnKtmtRfs').html("");

        /* dac tinh quang cao*/

        if ($('#txtTabRfs').val() == "rv") {
            $('#rdoDTTatcaF').attr("checked", "true");
            $('#spnDtRfs').html("(Tất cả BĐS)");
        }
        else if ($('#txtTabRfs').val() == "ag") {
            $('#rdoDTVipF').attr("checked", "true");
            $('#spnDtRfs').html("(BĐS nổi bật)");
        }
        else if ($('#txtTabRfs').val() == "cc") {
            $('#rdoChinhChuF').attr("checked", "true");
            $('#spnDtRfs').html("(Chính chủ)");
        }
        else if ($('#txtTabRfs').val() == "ch") {
            $('#rdoDTIsImgF').attr("checked", "true");
            $('#spnDtRfs').html("(BĐS có hình)");
        }

    },
    JsonOldConDition: {
        state: '', suburb: '', estate: '', ward: '', street: '', huong: '', phapli: '', protype: '', giatu: '', giaden: '', gia: '', dtttt: '', dtttd: '', dt: ''
        , dtnt: '', dtnd: '', dtn: '', ktmtt: '', ktmtd: '', ktmt: '', tab: ''
    },
    LuuDieuKien: function () {
        //if ($('#txtStateIDRfs').val() != "") {
        this.JsonOldConDition.state = $('#txtStateIDRfs').val();
        // }
        // if ($('#txtSuburbRfs').val() != "") {
        this.JsonOldConDition.suburb = $('#txtSuburbRfs').val();
        //         }
        //         if ($('#txtEstateRfs').val() != "") {
        this.JsonOldConDition.estate = $('#txtEstateRfs').val();
        //         }
        //         if ($('#txtWardIDRfs').val() != "") {
        this.JsonOldConDition.ward = $('#txtWardIDRfs').val();
        //         }
        //         if ($('#txtStreetIDRfs').val() != "") {
        this.JsonOldConDition.street = $('#txtStreetIDRfs').val();
        //         }
        //         if ($('#txtHuongIDRfs').val() != "") {
        this.JsonOldConDition.huong = $('#txtHuongIDRfs').val();
        //         }
        // 
        //         if ($('#txtPhapLiIDRfs').val() != "") {
        this.JsonOldConDition.phapli = $('#txtPhapLiIDRfs').val();
        //         }
        //         if ($('#txtPropertyTypeRfs').val() != "") {
        this.JsonOldConDition.protype = $('#txtPropertyTypeRfs').val();
        //         }
        // 
        //         if ($('#txtGiaTuRfs').val() != "" && $('#txtGiaDenRfs').val() != "") {
        this.JsonOldConDition.giatu = $('#txtGiaTuRfs').val();
        this.JsonOldConDition.giaden = $('#txtGiaDenRfs').val();
        //         }
        //         else if ($('#txtGiaRfs').val() != "") {
        this.JsonOldConDition.gia = $('#txtGiaRfs').val();
        //         }
        // 
        //         if ($('#txtDtttMinRfs').val() != "" && $('#txtDtttMaxRfs').val() != "") {
        this.JsonOldConDition.dtttt = $('#txtDtttMinRfs').val();
        this.JsonOldConDition.dtttd = $('#txtDtttMaxRfs').val();
        //         }
        //         else if ($('#txtDienTichRfs').val() != "") {
        this.JsonOldConDition.dt = $('#txtDienTichRfs').val();
        //         }
        // 
        //         if ($('#txtDtnMinRfs').val() != "" && $('#txtDtnMaxRfs').val() != "") {
        this.JsonOldConDition.dtnt = $('#txtDtnMinRfs').val();
        this.JsonOldConDition.dtnd = $('#txtDtnMaxRfs').val();
        //         }
        //         else if ($('#txtDTNRfs').val() != "") {
        this.JsonOldConDition.dtn = $('#txtDTNRfs').val();
        //         }
        // 
        //         if ($('#txtKtmtMinRfs').val() != "" && $('#txtKtmtMaxRfs').val() != "") {
        this.JsonOldConDition.ktmtt = $('#txtKtmtMinRfs').val();
        this.JsonOldConDition.ktmtd = $('#txtKtmtMaxRfs').val();
        //         }
        //         else if ($('#txtKTMTRfs').val() != "") {
        this.JsonOldConDition.ktmt = $('#txtKTMTRfs').val();
        //         }
        // 
        //         if ($('#txtTabRfs').val() != "") 
        this.JsonOldConDition.tab = $('#txtTabRfs').val();

        /* dac tinh quang cao
        if ($('#txtIsImageIDRfs').val() != "" && $('#txtChinhChuRfs').val() != "") {
        $('#spnDtRfs').html('(BĐS có hình, Chính chủ)');
        }
        else if ($('#txtIsImageIDRfs').val() != "") {
        $('#spnDtRfs').html('(BĐS có hình)');
        }
        else if ($('#txtChinhChuRfs').val() != "") {
        $('#spnDtRfs').html('(Chính chủ)');
        }*/
    },
    ResDieuKien: function () {
        //if (this.JsonOldConDition.state != "") {
        $('#txtStateIDRfs').val(this.JsonOldConDition.state);
        // }
        //if (this.JsonOldConDition.suburb != "") {
        $('#txtSuburbRfs').val(this.JsonOldConDition.suburb);
        // }
        // if (this.JsonOldConDition.estate != "") {
        $('#txtEstateRfs').val(this.JsonOldConDition.estate);
        // }
        // if (this.JsonOldConDition.ward != "") {
        $('#txtWardIDRfs').val(this.JsonOldConDition.ward);
        // }
        // if (this.JsonOldConDition.street != "") {
        $('#txtStreetIDRfs').val(this.JsonOldConDition.street);
        //}
        // if (this.JsonOldConDition.huong != "") {
        $('#txtHuongIDRfs').val(this.JsonOldConDition.huong);
        // }
        // if (this.JsonOldConDition.phapli != "") {
        $('#txtPhapLiIDRfs').val(this.JsonOldConDition.phapli);
        // }
        // if (this.JsonOldConDition.protype != "") {
        $('#txtPropertyTypeRfs').val(this.JsonOldConDition.protype);
        // }

        // if (this.JsonOldConDition.giatu != "" && this.JsonOldConDition.giaden != "") {
        $('#txtGiaTuRfs').val(this.JsonOldConDition.giatu);
        $('#txtGiaDenRfs').val(this.JsonOldConDition.giaden);
        //}
        //else if (this.JsonOldConDition.gia != "") {
        $('#txtGiaRfs').val(this.JsonOldConDition.gia);
        // }

        // if (this.JsonOldConDition.dtttt != "" && this.JsonOldConDition.dtttd != "") {
        $('#txtDtttMinRfs').val(this.JsonOldConDition.dtttt);
        $('#txtDtttMaxRfs').val(this.JsonOldConDition.dtttd);
        // }
        //else if (this.JsonOldConDition.dt != "") {
        $('#txtDienTichRfs').val(this.JsonOldConDition.dt);
        //}

        // if (this.JsonOldConDition.dtnt != "" && this.JsonOldConDition.dtnd != "") {
        $('#txtDtnMinRfs').val(this.JsonOldConDition.dtnt);
        $('#txtDtnMaxRfs').val(this.JsonOldConDition.dtnd);
        // }
        //else if (this.JsonOldConDition.dtn != "") {
        $('#txtDTNRfs').val(this.JsonOldConDition.dtn);
        // }

        // if (this.JsonOldConDition.ktmtt != "" && this.JsonOldConDition.ktmtd != "") {
        $('#txtKtmtMinRfs').val(this.JsonOldConDition.ktmtt);
        $('#txtKtmtMaxRfs').val(this.JsonOldConDition.ktmtd);
        //}
        //else if (this.JsonOldConDition.ktmt != "") {
        $('#txtKTMTRfs').val(this.JsonOldConDition.ktmt);
        // }

        // if (this.JsonOldConDition.tab != "") 
        $('#txtTabRfs').val(this.JsonOldConDition.tab);

        /* dac tinh quang cao
        if ($('#txtIsImageIDRfs').val() != "" && $('#txtChinhChuRfs').val() != "") {
        $('#spnDtRfs').html('(BĐS có hình, Chính chủ)');
        }
        else if ($('#txtIsImageIDRfs').val() != "") {
        $('#spnDtRfs').html('(BĐS có hình)');
        }
        else if ($('#txtChinhChuRfs').val() != "") {
        $('#spnDtRfs').html('(Chính chủ)');
        }*/
    },
    ResDieuKienPhu: function () {


        $('#txtSuburbRfs').val("");


        $('#txtEstateRfs').val("");

        $('#txtWardIDRfs').val("");

        $('#txtStreetIDRfs').val("");

        $('#txtHuongIDRfs').val("");

        $('#txtPhapLiIDRfs').val("");

        $('#txtPropertyTypeRfs').val("");

        $('#txtGiaTuRfs').val("");
        $('#txtGiaDenRfs').val("");

        $('#txtGiaRfs').val("");

        $('#txtDtttMinRfs').val("");
        $('#txtDtttMaxRfs').val("");

        $('#txtDienTichRfs').val("");

        $('#txtDtnMinRfs').val("");
        $('#txtDtnMaxRfs').val("");

        $('#txtDTNRfs').val("");

        $('#txtKtmtMinRfs').val("");
        $('#txtKtmtMaxRfs').val("");

        $('#txtKTMTRfs').val("");

    },
    ShowGiaText: function (val) {
        if (val < 1000)
            return (val + " Triệu");
        else {
            return (Math.round((val / 1000) * 100) / 100 + " Tỷ");
        }
    },
    SetDacTinhF: function (loai_, text_) {
        $('#txtTabRfs').val(loai_);
        $('#spnDtRfs').html(text_);
    },
    SetValHdf: function (_loai, _value) {
        switch (_loai) {
            case "suburb":
                if (this.CheckStringInListString(_value, $('#txtSuburbRfs').val())) {
                    // remove
                    var arr1 = this.RemoveElementArr($('#txtSuburbRfs').val(), _value);
                    $('#txtSuburbRfs').val(arr1.join(','));
                }
                else {
                    // add	
                    var arr1 = this.AddElementArr($('#txtSuburbRfs').val());
                    arr1.push(_value);
                    $('#txtSuburbRfs').val(arr1.join(','));
                }
                $('#txtEstateRfs').val("");
                $('#txtWardIDRfs').val("");
                $('#txtStreetIDRfs').val("");

                this.LoadEstate($('#txtStateIDRfs').val());
                this.LoadPx();
                this.LoadDuong();
                break;
            case "cbHomeClass":
                if (this.CheckStringInListString(_value, $('#txtPropertyTypeRfs').val())) {
                    // remove
                    var arr1 = this.RemoveElementArr($('#txtPropertyTypeRfs').val(), _value);
                    $('#txtPropertyTypeRfs').val(arr1.join(','));
                }
                else {
                    // add	
                    var arr1 = this.AddElementArr($('#txtPropertyTypeRfs').val());
                    arr1.push(_value);
                    $('#txtPropertyTypeRfs').val(arr1.join(','));
                }
                break;
            case "cbMinPrice-cbMaxPrice":
                if ($('#txtGiaRfs').val() != _value) $('#txtGiaRfs').val(_value);
                else $('#txtGiaRfs').val("");
                $('#txtGiaTuRfs').val("");
                $('#txtGiaDenRfs').val("");
                $('#dtg').html("");
                $('#dtd').html("");
                break;
            case "dt":
                if ($('#txtDienTichRfs').val() != _value) $('#txtDienTichRfs').val(_value);
                else $('#txtDienTichRfs').val("");
                $('#txtDtttMinRfs').val("");
                $('#txtDtttMaxRfs').val("");
                break;
            case "dtn":
                if ($('#txtDTNRfs').val() != _value) $('#txtDTNRfs').val(_value);
                else $('#txtDTNRfs').val("");
                $('#txtDtnMinRfs').val("");
                $('#txtDtnMaxRfs').val("");
                break;
            case "ktmt":
                if ($('#txtKTMTRfs').val() != _value) $('#txtKTMTRfs').val(_value);
                else $('#txtKTMTRfs').val("");
                $('#txtKtmtMinRfs').val("");
                $('#txtKtmtMaxRfs').val("");
                break;
            case "cbEstate":
                if (this.CheckStringInListString(_value, $('#txtEstateRfs').val())) {
                    // remove
                    var arr1 = this.RemoveElementArr($('#txtEstateRfs').val(), _value);
                    $('#txtEstateRfs').val(arr1.join(','));
                }
                else {
                    // add	
                    var arr1 = this.AddElementArr($('#txtEstateRfs').val());
                    arr1.push(_value);
                    $('#txtEstateRfs').val(arr1.join(','));
                }
                break;
            case "ward":
                if (this.CheckStringInListString(_value, $('#txtWardIDRfs').val())) {
                    // remove
                    var arr1 = this.RemoveElementArr($('#txtWardIDRfs').val(), _value);
                    $('#txtWardIDRfs').val(arr1.join(','));
                }
                else {
                    // add	
                    var arr1 = this.AddElementArr($('#txtWardIDRfs').val());
                    arr1.push(_value);
                    $('#txtWardIDRfs').val(arr1.join(','));
                }
                break;
            case "streetid":
                if (this.CheckStringInListString(_value, $('#txtStreetIDRfs').val())) {
                    // remove
                    var arr1 = this.RemoveElementArr($('#txtStreetIDRfs').val(), _value);
                    $('#txtStreetIDRfs').val(arr1.join(','));
                }
                else {
                    // add	
                    var arr1 = this.AddElementArr($('#txtStreetIDRfs').val());
                    arr1.push(_value);
                    $('#txtStreetIDRfs').val(arr1.join(','));
                }
                break;
            case "cbAspect":
                if (this.CheckStringInListString(_value, $('#txtHuongIDRfs').val())) {
                    // remove
                    var arr1 = this.RemoveElementArr($('#txtHuongIDRfs').val(), _value);
                    $('#txtHuongIDRfs').val(arr1.join(','));
                }
                else {
                    // add	
                    var arr1 = this.AddElementArr($('#txtHuongIDRfs').val());
                    arr1.push(_value);
                    $('#txtHuongIDRfs').val(arr1.join(','));
                }
                break;
            case "cbOwnerType":
                if (this.CheckStringInListString(_value, $('#txtPhapLiIDRfs').val())) {
                    // remove
                    var arr1 = this.RemoveElementArr($('#txtPhapLiIDRfs').val(), _value);
                    $('#txtPhapLiIDRfs').val(arr1.join(','));
                }
                else {
                    // add	
                    var arr1 = this.AddElementArr($('#txtPhapLiIDRfs').val());
                    arr1.push(_value);
                    $('#txtPhapLiIDRfs').val(arr1.join(','));
                }
                break;
            case "isimg":
                if ($('#txtIsImageIDRfs').val() != _value) $('#txtIsImageIDRfs').val(_value);
                else $('#txtIsImageIDRfs').val("");
                break;
            case "cchu":
                if ($('#txtChinhChuRfs').val() != _value) $('#txtChinhChuRfs').val(_value);
                else $('#txtChinhChuRfs').val("");
                break;
            default:
        }
        this.PostRefineSearch(1);
    },
    SubmitRefineSearch: function () {
        var proclass = $('#txtProClassRfs').val();
        var transclass = $('#txtTranClassRfs').val();
        var stateid = $('#txtStateIDRfs').val();

        if (proclass == "") {
            alert("Vui lòng chọn loại bất động sản!");
            $('#divLoaiKieuBDSRfs').show();
            return false;
        }
        if (stateid == "") {
            alert("Vui lòng chọn tỉnh thành phố!");
            $('#divDropStateRfs').show();
            return false;
        }

        if ($('#txtSuburbRfs').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều quận/huyện, vui lòng chọn không quá 5");
            return false;
        }
        if ($('#txtEstateRfs').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều dự án, vui lòng chọn không quá 5");
            return false;
        }

        var suburb = "";
        if (document.getElementById("txtSuburbRfs").value != "")
            suburb = "&suburb=" + trim(document.getElementById("txtSuburbRfs").value, ',');
        var propertyType = "";
        if (document.getElementById("txtPropertyTypeRfs").value != "")
            propertyType = "&cbHomeClass=" + trim(document.getElementById("txtPropertyTypeRfs").value, ',');

        // chi lam cho loai vnd
        var sOrder = "";
        var giaString = "";
        // format &cbMinPrice=500&cbMaxPrice=4000
        if (!checkFloat(trim($('#txtGiaTuRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtGiaDenRfs').val(), ' ').replace(',', '.'))) {
            alert("Giá phải là kiểu số");
            $('#txtGiaTuRfs').focus();
            return false;
        }
        if ($('#txtGiaTuRfs').val() != "" && $('#txtGiaDenRfs').val() != "") {
            if (parseFloat(trim($('#txtGiaTuRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtGiaDenRfs').val(), ' ').replace(',', '.'))) {
                alert("Giá từ phải nhỏ hơn giá đến");
                $('#txtGiaTuRfs').focus();
                return false;
            }

            sOrder = "&cbPriceType=VND&orderpricetype=1&orderby=prc";
            giaString = "&cbMinPrice=" + $('#txtGiaTuRfs').val() + "&cbMaxPrice=" + $('#txtGiaDenRfs').val();
        }
        else if ($('#txtGiaRfs').val() != "") {
            sOrder = "&cbPriceType=VND&orderpricetype=1&orderby=prc";
            giaString = "&cbMinPrice=" + $('#txtGiaRfs').val().split('-')[0] + "&cbMaxPrice=" + $('#txtGiaRfs').val().split('-')[1];
        }

        var strDienTich = "";
        if (!checkFloat(trim($('#txtDtttMinRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtDtttMaxRfs').val(), ' ').replace(',', '.'))) {
            alert("Diện tích phải là kiểu số");
            $('#txtDtttMinRfs').focus();
            return false;
        }
        if ($('#txtDtttMinRfs').val() != "" || $('#txtDtttMaxRfs').val() != "") {
            if (parseFloat(trim($('#txtDtttMinRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtDtttMaxRfs').val(), ' ').replace(',', '.'))) {
                alert("Diện tích từ phải nhỏ hơn giá đến");
                $('#txtDtttMinRfs').focus();
                return false;
            }

            strDienTich = "&dtt=" + $('#txtDtttMinRfs').val() + "&dtd=" + $('#txtDtttMaxRfs').val();
        }
        else if ($('#txtDienTichRfs').val() != "") {
            strDienTich = "&dtt=" + $('#txtDienTichRfs').val().split('-')[0] + "&dtd=" + $('#txtDienTichRfs').val().split('-')[1];
        }

        var strDTN = "";
        if (!checkFloat(trim($('#txtDtnMinRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtDtnMaxRfs').val(), ' ').replace(',', '.'))) {
            alert("Đường trước nhà phải là kiểu số");
            $('#txtDtnMinRfs').focus();
            return false;
        }
        if ($('#txtDtnMinRfs').val() != "" || $('#txtDtnMaxRfs').val() != "") {
            if (parseFloat(trim($('#txtDtnMinRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtDtnMaxRfs').val(), ' ').replace(',', '.'))) {
                alert("Đường trước nhà từ phải nhỏ hơn đến");
                $('#txtDtnMinRfs').focus();
                return false;
            }

            strDTN = "&dtnt=" + $('#txtDtnMinRfs').val() + "&dtnd=" + $('#txtDtnMaxRfs').val();
        }
        else if ($('#txtDTNRfs').val() != "") {
            strDTN = "&dtnt=" + $('#txtDTNRfs').val().split('-')[0] + "&dtnd=" + $('#txtDTNRfs').val().split('-')[1];
        }

        var strKTMT = "";
        if (!checkFloat(trim($('#txtKtmtMinRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtKtmtMaxRfs').val(), ' ').replace(',', '.'))) {
            alert("Kích thước mặt tiền phải là kiểu số");
            $('#txtKtmtMinRfs').focus();
            return false;
        }
        if ($('#txtKtmtMinRfs').val() != "" || $('#txtKtmtMaxRfs').val() != "") {
            if (parseFloat(trim($('#txtKtmtMinRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtKtmtMaxRfs').val(), ' ').replace(',', '.'))) {
                alert("Kích thước mặt tiền từ phải nhỏ hơn đến");
                $('#txtKtmtMinRfs').focus();
                return false;
            }
            strKTMT = "&ktmtt=" + $('#txtKtmtMinRfs').val() + "&ktmtd=" + $('#txtKtmtMaxRfs').val();
        }
        else if ($('#txtKTMTRfs').val() != "") {
            strKTMT = "&ktmtt=" + $('#txtKTMTRfs').val().split('-')[0] + "&ktmtd=" + $('#txtKTMTRfs').val().split('-')[1];
        }

        var strDuAn = "";

        strDuAn += "&cbEstate=" + $('#txtEstateRfs').val();

        strDuAn += "&ward=" + $('#txtWardIDRfs').val();
        strDuAn += "&streetid=" + $('#txtStreetIDRfs').val();
        strDuAn += "&cbAspect=" + $('#txtHuongIDRfs').val();
        strDuAn += "&cbOwnerType=" + $('#txtPhapLiIDRfs').val();
        /*strDuAn += "&isimg=" + $('#txtIsImageIDRfs').val();
        strDuAn += "&dtqc=" + $('#txtChinhChuRfs').val();*/

        var sDk = suburb + propertyType + giaString + strDienTich + strDuAn + strDTN + strKTMT + sOrder;

        if (proclass != "") {
            window.location = pathClient + "ressearch.aspx@pindex=1&tab=" + $('#txtTabRfs').val() + "&tck=res-" + transclass + "-" + proclass + "&state=" + stateid + sDk;
        }
        else {
            if (stateid != "") stateid = "&state=" + stateid;
            window.location = pathClient + "ressearch.aspx@pindex=1&tab=rv" + stateid + sDk;
        }
    },
    PostRefineSearch: function (p) {
        var proclass = $('#txtProClassRfs').val();
        var transclass = $('#txtTranClassRfs').val();
        var stateid = $('#txtStateIDRfs').val();

        if (proclass == "") {
            alert("Vui lòng chọn loại bất động sản!");
            $('#divLoaiKieuBDSRfs').show();
            return false;
        }
        if (stateid == "") {
            alert("Vui lòng chọn tỉnh thành phố!");
            $('#divDropStateRfs').show();
            return false;
        }

        if ($('#txtSuburbRfs').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều quận/huyện, vui lòng chọn không quá 5");
            return false;
        }
        if ($('#txtEstateRfs').val().split(',').length > 6) {
            alert("Bạn chọn quá nhiều dự án, vui lòng chọn không quá 5");
            return false;
        }

        var suburb = "";
        if (document.getElementById("txtSuburbRfs").value != "")
            suburb = trim(document.getElementById("txtSuburbRfs").value, ',');
        var propertyType = "";
        if (document.getElementById("txtPropertyTypeRfs").value != "")
            propertyType = trim(document.getElementById("txtPropertyTypeRfs").value, ',');

        /*chi lam cho loai vnd*/

        var __ctlMain = document.getElementById("hdfCtlMst") != undefined ? $("#hdfCtlMst").val() + "_" : "";
        var _sOrder = $('#' + __ctlMain + 'hdOderBy').val() != undefined ? $('#' + __ctlMain + 'hdOderBy').val() : "";
        var _orderpricetype = $('#' + __ctlMain + 'hdPriceType').val() != undefined ? $('#' + __ctlMain + 'hdPriceType').val() : "";
        var _priceType = "";
        /* format &cbMinPrice=500&cbMaxPrice=4000*/
        var _giaTu = "";
        var _giaDen = "";
        /* fix cho cai loi gi k hieu tu nhien co HCM*/
        if (trim($('#txtGiaTuRfs').val()) == "TP. Hồ Chí Minh") $('#txtGiaTuRfs').val("");
        /*end*/
        if (!checkFloat(trim($('#txtGiaTuRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtGiaDenRfs').val(), ' ').replace(',', '.'))) {
            alert("Giá phải là kiểu số");
            $('#txtGiaTuRfs').focus();
            return false;
        }
        if ($('#txtGiaTuRfs').val() != "" && $('#txtGiaDenRfs').val() != "") {
            if (parseFloat(trim($('#txtGiaTuRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtGiaDenRfs').val(), ' ').replace(',', '.'))) {
                alert("Giá từ phải nhỏ hơn giá đến");
                $('#txtGiaTuRfs').focus();
                return false;
            }

            _sOrder = "prc";
            _orderpricetype = "1";
            _priceType = "VND";

            _giaTu = $('#txtGiaTuRfs').val();
            _giaDen = $('#txtGiaDenRfs').val();
        }
        else if ($('#txtGiaRfs').val() != "") {
            _sOrder = "prc";
            _orderpricetype = "1";
            _priceType = "VND";

            _giaTu = $('#txtGiaRfs').val().split('-')[0];
            _giaDen = $('#txtGiaRfs').val().split('-')[1];
        }

        var _dtttt = "";
        var _dtttd = "";
        if (!checkFloat(trim($('#txtDtttMinRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtDtttMaxRfs').val(), ' ').replace(',', '.'))) {
            alert("Diện tích phải là kiểu số");
            $('#txtDtttMinRfs').focus();
            return false;
        }
        if ($('#txtDtttMinRfs').val() != "" && $('#txtDtttMaxRfs').val() != "") {
            if (parseFloat(trim($('#txtDtttMinRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtDtttMaxRfs').val(), ' ').replace(',', '.'))) {
                alert("Diện tích từ phải nhỏ hơn diện tích đến");
                $('#txtDtttMinRfs').focus();
                return false;
            }

            _dtttt = $('#txtDtttMinRfs').val();
            _dtttd = $('#txtDtttMaxRfs').val();
        }
        else if ($('#txtDienTichRfs').val() != "") {

            _dtttt = $('#txtDienTichRfs').val().split('-')[0];
            _dtttd = $('#txtDienTichRfs').val().split('-')[1];
        }

        var _dtnt = "";
        var _dtnd = "";
        if (!checkFloat(trim($('#txtDtnMinRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtDtnMaxRfs').val(), ' ').replace(',', '.'))) {
            alert("Đường trước nhà phải là kiểu số");
            $('#txtDtnMinRfs').focus();
            return false;
        }
        if ($('#txtDtnMinRfs').val() != "" && $('#txtDtnMaxRfs').val() != "") {
            if (parseFloat(trim($('#txtDtnMinRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtDtnMaxRfs').val(), ' ').replace(',', '.'))) {
                alert("Đường trước nhà từ phải nhỏ hơn đến");
                $('#txtDtnMinRfs').focus();
                return false;
            }

            _dtnt = $('#txtDtnMinRfs').val();
            _dtnd = $('#txtDtnMaxRfs').val();
        }
        else if ($('#txtDTNRfs').val() != "") {

            _dtnt = $('#txtDTNRfs').val().split('-')[0];
            _dtnd = $('#txtDTNRfs').val().split('-')[1];
        }

        var _ktmtt = "";
        var _ktmtd = "";
        if (!checkFloat(trim($('#txtKtmtMinRfs').val(), ' ').replace(',', '.')) || !checkFloat(trim($('#txtKtmtMaxRfs').val(), ' ').replace(',', '.'))) {
            alert("Kích thước mặt tiền phải là kiểu số");
            $('#txtKtmtMinRfs').focus();
            return false;
        }
        if ($('#txtKtmtMinRfs').val() != "" && $('#txtKtmtMaxRfs').val() != "") {
            if (parseFloat(trim($('#txtKtmtMinRfs').val(), ' ').replace(',', '.')) >= parseFloat(trim($('#txtKtmtMaxRfs').val(), ' ').replace(',', '.'))) {
                alert("Kích thước mặt tiền từ phải nhỏ hơn đến");
                $('#txtKtmtMinRfs').focus();
                return false;
            }

            _ktmtt = $('#txtKtmtMinRfs').val();
            _ktmtd = $('#txtKtmtMaxRfs').val();
        }
        else if ($('#txtKTMTRfs').val() != "") {

            _ktmtt = $('#txtKTMTRfs').val().split('-')[0];
            _ktmtd = $('#txtKTMTRfs').val().split('-')[1];
        }

        var strDuAn = "";

        var _page = "res";
        if (proclass != "") {
            if (proclass != 'com' && proclass != 'bus' && proclass != 'dev') {
                _page = "res";
            }
            else {
                _page = "res";
            }
        }

        var pars = {
            tab: $('#txtTabRfs').val(),
            pindex: p,
            rcc: $('#cbDisplay').val() != "" ? $('#cbDisplay').val() : "20",
            tck: _page + "-" + transclass + "-" + proclass,
            state: stateid,
            suburb: suburb,
            cbHomeClass: propertyType,
            cbMinPrice: _giaTu,
            cbMaxPrice: _giaDen,
            cbPriceType: _priceType,
            orderpricetype: _orderpricetype,
            orderby: _sOrder,
            dtt: _dtttt,
            dtd: _dtttd,
            dtnt: _dtnt,
            dtnd: _dtnd,
            ktmtt: _ktmtt,
            ktmtd: _ktmtd,
            cbEstate: $('#txtEstateRfs').val(),
            ward: $('#txtWardIDRfs').val(),
            streetid: $('#txtStreetIDRfs').val(),
            cbAspect: $('#txtHuongIDRfs').val(),
            cbOwnerType: $('#txtPhapLiIDRfs').val()
            /*             ,isimg: $('#txtIsImageIDRfs').val(),
            dtqc: $('#txtChinhChuRfs').val()*/
        };


        $('#dvPagingDefault').hide();
        var url = pathClientAjax + "handler/misc.aspx@act=listsearchbds&d=" + (new Date()).getTime();
        $.post(url, pars,
			function (data) {
			    NvgRefineSearch.BuildListPi(data);
			    NvgRefineSearch.LuuDieuKien();
			    NvgRefineSearch.AddHistoryEvent("lstbds", data, NvgRefineSearch.JsonOldConDition, $('#divRfsMain').html());
			}
		);
    },
    PostRefineSearchRsh: function (p) {
        var proclass = $('#txtProClassRfs').val();
        var transclass = $('#txtTranClassRfs').val();
        var __ctlMain = document.getElementById("hdfCtlMst") != undefined ? $("#hdfCtlMst").val() + "_" : "";
        var _sOrder = $('#' + __ctlMain + 'hdOderBy').val() != undefined ? $('#' + __ctlMain + 'hdOderBy').val() : "";
        var _orderpricetype = $('#' + __ctlMain + 'hdPriceType').val() != undefined ? $('#' + __ctlMain + 'hdPriceType').val() : "";
        var _priceType = "VND";

        var _gt = "";
        var _gd = "";
        var _dtt = "";
        var _dtd = "";
        var _dtnt = "";
        var _dtnd = "";
        var _ktmtt = "";
        var _ktmtd = "";

        if (this.JsonOldConDition.giatu != "" && this.JsonOldConDition.giaden != "") {
            _gt = this.JsonOldConDition.giatu;
            _gd = this.JsonOldConDition.giaden;
        }
        else if (this.JsonOldConDition.gia!="") {
            _gt = this.JsonOldConDition.gia.split('-')[0];
            _gd = this.JsonOldConDition.gia.split('-')[1];
        }

        if (this.JsonOldConDition.dtttt != "" && this.JsonOldConDition.dtttd != "") {
            _dtt = this.JsonOldConDition.dtttt;
            _dtd = this.JsonOldConDition.dtttd;
        }
        else if (this.JsonOldConDition.dt != "") {
            _dtt = this.JsonOldConDition.dt.split('-')[0];
            _dtd = this.JsonOldConDition.dt.split('-')[1];
        }

        if (this.JsonOldConDition.dtnt != "" && this.JsonOldConDition.dtnd != "") {
            _dtnt = this.JsonOldConDition.dtnt;
            _dtnd = this.JsonOldConDition.dtnd;
        }
        else if (this.JsonOldConDition.dtn != "") {
            _dtnt = this.JsonOldConDition.dtn.split('-')[0];
            _dtnd = this.JsonOldConDition.dtn.split('-')[1];
        }

        if (this.JsonOldConDition.ktmtt != "" && this.JsonOldConDition.ktmtd != "") {
            _ktmtt = this.JsonOldConDition.ktmtt;
            _ktmtd = this.JsonOldConDition.ktmtd;
        }
        else if (this.JsonOldConDition.ktmt != "") {
            _ktmtt = this.JsonOldConDition.ktmt.split('-')[0];
            _ktmtd = this.JsonOldConDition.ktmt.split('-')[1];
        }

        var pars = {
            tab: this.JsonOldConDition.tab,
            pindex: p,
            rcc: $('#cbDisplay').val() != "" ? $('#cbDisplay').val() : "20",
            tck: "res" + "-" + transclass + "-" + proclass,
            state: this.JsonOldConDition.state,
            suburb: this.JsonOldConDition.suburb,
            cbHomeClass: this.JsonOldConDition.protype,
            cbMinPrice: _gt,
            cbMaxPrice: _gd,
            cbPriceType: _priceType,
            orderpricetype: _orderpricetype,
            orderby: _sOrder,
            dtt: _dtt,
            dtd: _dtd,
            dtnt: _dtnt,
            dtnd: _dtnd,
            ktmtt: _ktmtt,
            ktmtd: _ktmtd,
            cbEstate: this.JsonOldConDition.estate,
            ward: this.JsonOldConDition.ward,
            streetid: this.JsonOldConDition.street,
            cbAspect: this.JsonOldConDition.huong,
            cbOwnerType: this.JsonOldConDition.phapli
            /*             ,isimg: $('#txtIsImageIDRfs').val(),
            dtqc: $('#txtChinhChuRfs').val()*/
        };


        $('#dvPagingDefault').hide();
        var url = pathClientAjax + "handler/misc.aspx@act=listsearchbds&d=" + (new Date()).getTime();
        $.post(url, pars,
			function (data) {
			    NvgRefineSearch.BuildListPiRsh(data, NvgRefineSearch.JsonOldConDition);
			    NvgRefineSearch.LuuDieuKien();
			    NvgRefineSearch.AddHistoryEvent("lstbds", data, NvgRefineSearch.JsonOldConDition, $('#divRfsMain').html());
			}
		);
    },
    gotoPagePostRfs: function (numberpage) {
        NvgRefineSearch.PostRefineSearch(numberpage);
    },
    gotoPagePostRfsRsh: function (numberpage, dieuKien_) {
        NvgRefineSearch.PostRefineSearchRsh(numberpage);
    },
    BuildListPiRsh: function (data, _dieuKien) {
        var _ctlMain = $('#hdfCtlMst').val() + "_";
        $("#" + _ctlMain + "DivPropertyList1").html(data.split("<--->")[0]);
        $("#" + _ctlMain + "divStringCondition").html(data.split("<--->")[1]);
        if ($('#txtTabRfs').val() == "ag")
            $("#" + _ctlMain + "ali1").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");
        else if ($('#txtTabRfs').val() == "rv")
            $("#" + _ctlMain + "ali2").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");
        else if ($('#txtTabRfs').val() == "cc")
            $("#" + _ctlMain + "ali4").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");
        else if ($('#txtTabRfs').val() == "ch") $("#" + _ctlMain + "ali5").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");

        var tps = (parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()) - parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()))) > 0 ? ((parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()))) + 1) : parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()));

        if (tps < $("#hCurrentPageRfs").val())
            $("#hCurrentPageRfs").val(1);

        this.JsonOldConDition = _dieuKien;
        this.ResDieuKien();

        nvgPaging.DrawPageListBdsUsers(tps, $("#hCurrentPageRfs").val(), "dvPagingDefault", "NvgRefineSearch.gotoPagePostRfsRsh");
        /* kiem tra check cho rsh*/
        if (tps == 1) $('#dvPagingDefault').hide();
    },
    BuildListPi: function (data) {
        var _ctlMain = $('#hdfCtlMst').val() + "_";
        $("#" + _ctlMain + "DivPropertyList1").html(data.split("<--->")[0]);
        $("#" + _ctlMain + "divStringCondition").html(data.split("<--->")[1]);
        if ($('#txtTabRfs').val() == "ag")
            $("#" + _ctlMain + "ali1").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");
        else if ($('#txtTabRfs').val() == "rv")
            $("#" + _ctlMain + "ali2").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");
        else if ($('#txtTabRfs').val() == "cc")
            $("#" + _ctlMain + "ali4").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");
        else if ($('#txtTabRfs').val() == "ch") $("#" + _ctlMain + "ali5").html("<span>Có tất cả (" + data.split("<--->")[2] + ")</span>");

        var tps = (parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()) - parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()))) > 0 ? ((parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()))) + 1) : parseInt(parseInt($("#hTotalRowsRfs").val()) / parseInt($("#hdfRecordCountRfs").val()));

        if (tps < $("#hCurrentPageRfs").val())
            $("#hCurrentPageRfs").val(1);

        nvgPaging.DrawPageListBdsUsers(tps, $("#hCurrentPageRfs").val(), "dvPagingDefault", "NvgRefineSearch.gotoPagePostRfs");
        /* kiem tra check cho rsh*/
        if (tps == 1) $('#dvPagingDefault').hide();
    },
    HistoryChange: function (newLocation, historyData) {
        var historyMsg = (typeof historyData == "object" && historyData != null
		    ? historyStorage.toJSON(historyData)
		    : historyData
	    );

        if (historyMsg != null) {
            NvgRefineSearch.BuildListPiRsh(historyData.s1, historyData.s2);
            /*build lai leftsearch cua dieukien*/
            $('#divRfsMain').html(historyData.s3);
        }
    },
    AddHistoryEvent: function (key, data, dieukien, htmlLeftSearch_) {
        var jsonData = { s1: data, s2: dieukien, s3: htmlLeftSearch_ };
       
        dhtmlHistory.add(key, jsonData);
    },
    CheckPerTopAgent: function () {
        if ($('#' + $('#hdfCtlMst').val() + '_hdfCC_agt').val() == "0") {
            $('#rdoDTChinhChuF').removeAttr("checked");
            $('#rdoDTTatcaF').attr("checked", true);
            this.SetDacTinhF('rv', '(Tất cả BĐS)');

            nvgUtils.ShowNoteTopAgent();
        }
    }
};
/*
*	khoi tao rsh
*/
window.dhtmlHistory.create({
    toJSON: function (o) {
        return JSON.stringify(o);
    }, fromJSON: function (s) {
        return JSON.parse(s);
    }
});
window.onload = function () {
    /*initialize our DHTML history*/
    dhtmlHistory.initialize();
    /*subscribe to DHTML history change events*/
    dhtmlHistory.addListener(NvgRefineSearch.HistoryChange);
}
  
function ChonLoaiBDSNew(id, textLoaiBDS_)
{
	
	document.getElementById('txtProClassTextRfs').value=textLoaiBDS_;

	document.getElementById('txtProClassRfs').value = id;

 	$('#txtPropertyTypeRfs').val("");
 	$('#txtPropertyTypeTextRfs').val("");
	
	if(id!="") {
		$('#iptLoaiBDSRfs').val(textLoaiBDS_);
		$('#iptLoaiBDSRfs').show();
		$('#hrfLoaiBDSRfs').hide();
	}

    $('#divLoaiKieuBDSRfs').hide();

    NvgRefineSearch.listEstateFolState = [];
    NvgRefineSearch.LoadEstate($('#txtStateIDRfs').val());
	NvgRefineSearch.LoadKieuBDSRfs();
}
function ChonLoaiBDSNew1(id, textLoaiBDS_) {

    document.getElementById('txtProClassTextRfs').value = textLoaiBDS_;

    document.getElementById('txtProClassRfs').value = id;

    if (id != "") {
        $('#iptLoaiBDSRfs').val(textLoaiBDS_);
        $('#iptLoaiBDSRfs').show();
        $('#hrfLoaiBDSRfs').hide();
    }

    $('#divLoaiKieuBDSRfs').hide();

    NvgRefineSearch.listEstateFolState = [];
    /*
     *	neu co rsh thi load ajax default
     */
    if (historyStorage.hasKey("lstbds")) NvgRefineSearch.ResDieuKienPhu();
    NvgRefineSearch.LoadKieuBDSRfs();
}
function SetTextKieuBDS(divID)
{
	var strKieuBds="";
	document.getElementById("txtPropertyTypeRfs").value="";	
	$('#'+divID+' input:checkbox').each(function (){
		if(this.checked==true)	
		{		
			document.getElementById("txtPropertyTypeRfs").value+=this.value+",";
			strKieuBds+=this.title+", ";			
		}
	});		
	strKieuBds=strKieuBds.substring(0, strKieuBds.length-2);		
	
	$('#iptLoaiBDSRfs').val(strKieuBds);
	$('#iptLoaiBDSRfs').show();
	$('#hrfLoaiBDSRfs').hide();
}