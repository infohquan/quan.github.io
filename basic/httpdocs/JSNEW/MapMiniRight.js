
//danh cho ban do trong danh sach bds

var MapListSearchLL = {
    newOptLabelMar: function (icon, click, text, title, w, h) {
        var opts = {
            "icon": icon,
            "clickable": click,
            "title": title,
            "labelText": text,
            "labelClass": "tip_marker",
            "labelOffset": new GSize(w, h)
        };
        return opts;
    },
    newIconLaleledMar: function (img, shadowImg, iConSizeNha) {
        var icon = new GIcon(G_DEFAULT_ICON);
        icon.image = ""; // img;
        icon.shadow = shadowImg;
        icon.iconSize = iConSizeNha;
        return icon;
    },
    ShowMarInfoHover: function (mkr, j, ar_, loai_) {
        GEvent.addListener(mkr, "mouseover", function () {
            if (loai_ == "da") {
                $('#tooltipdoanhnghiep').removeClass("PopupBusinessInfo");
                $('#tooltipdoanhnghiep').addClass("PopupMinimapright");
            }
            ddrivetipvip("divMiniMap_right_" + ar_[j]);
        });
        GEvent.addListener(mkr, "mouseout", function () {
            if (loai_ == "da") {
                $('#tooltipdoanhnghiep').addClass("PopupBusinessInfo");
                $('#tooltipdoanhnghiep').removeClass("PopupMinimapright");
            }
            hideddrivetip();
        });
    },
    ClickMarInfoHover: function (mkr, j, ar_, arName_, loai_) {
        GEvent.addListener(mkr, "click", function () {
            if (loai_ == "bds")
                window.location.href = pathClient + ar_[j] + ".aspx";
            else if (loai_ == "da")
                window.location.href = pathClient + "duan/" + ar_[j] + "_" + arName_[j] + "/";
            else if (loai_ == "dn")
                window.location.href = pathClient + "cong_ty_moi_gioi_bds/" + arName_[j] + "/" + ar_[j];
        });
    },
    LoadMap: function (listLL, listLLPi, listLLName, type, loai_) {
        if (GBrowserIsCompatible()) {
            var map = new GMap2(document.getElementById('container'));
            map.addControl(new GSmallMapControl());
            map.disableDoubleClickZoom();
            map.disableScrollWheelZoom();

            var icon_ = MapListSearchLL.newIconLaleledMar(pathClient + "/images/minimap/nha.png");

            if (loai_ == "da") {
                icon_ = MapListSearchLL.newIconLaleledMar(pathClient + "/images/minimap/du_an.png");
            }
            else if (loai_ == "dn") {
                icon_ = MapListSearchLL.newIconLaleledMar(pathClient + "/images/minimap/doanh_nghiep.png");
            }

            GEvent.addListener(map, "dragend", function () {
                NvgQuiHoachMap.check4GocChoTile(map);
            });
            GEvent.addListener(map, "zoomend", function () {
                NvgQuiHoachMap.check4GocChoTile(map);
            });
            if (type == 1) {
                var arrLL = listLL.split(",");
                var arrLLPi = listLLPi.split(",");
                var arrLLName = listLLName.split(",");
                var arr_kq = [];

                var leght = arrLL.length;
                i = 1;
                for (var j = 0; j < leght; j += 2) {
                    var s = new GLatLng(parseFloat(arrLL[j]), parseFloat(arrLL[j + 1]));
                    arr_kq.push(s);
                    var w_ = 0;
                    var h_ = -29;
                    if (i > 9) {
                        w_ = -4;
                        h_ = -29;
                    }
                    var opt_ = MapListSearchLL.newOptLabelMar(icon_, true, "<font color=white><b>" + i + "</b></font>", "", w_, h_);
                    if (loai_ == "da") {
                        opt_ = MapListSearchLL.newOptLabelMar(icon_, true, "<font color=white><b>" + i + "</b></font>", "", w_, h_);
                    }
                    else if (loai_ == "dn") {
                        opt_ = MapListSearchLL.newOptLabelMar(icon_, true, "<font color=white><b>" + i + "</b></font>", "", w_, h_);
                    }

                    var marker = new LabeledMarker(s, opt_);
                    map.addOverlay(marker);
                    MapListSearchLL.ShowMarInfoHover(marker, i - 1, arrLLPi, loai_);
                    MapListSearchLL.ClickMarInfoHover(marker, i - 1, arrLLPi, arrLLName, loai_);

                    i++;
                    if (leght == 2) map.setCenter(s, 16);
                }
                if (leght > 2) {
                    var polygon_ = new GPolygon(arr_kq, "white", 1, 0.6, "", 0.5);
                    var zzz = map.getBoundsZoomLevel(polygon_.getBounds());
                    map.setCenter(polygon_.getBounds().getCenter(), zzz);
                }
            }
            else map.setCenter(new GLatLng(parseFloat(listLL.split(",")[0]), parseFloat(listLL.split(",")[1])), 16);

            if (map.isLoaded()) NvgQuiHoachMap.check4GocChoTile(map);
        }
    }
}
