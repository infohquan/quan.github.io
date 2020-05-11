function checkValue() {
    var __ctrl = document.getElementById("hdfCtrl").value;
    if (isEmpty(document.getElementById(__ctrl + "_txtFullName").value)) {
        alert("Vui lòng nhập vào họ tên.");
        document.getElementById(__ctrl + "_txtFullName").focus();
        return false;
    }
    if (document.getElementById(__ctrl + "_txtEmail").value == "") {
        alert("Nhập vào địa chỉ email của bạn!");
        document.getElementById(__ctrl + "_txtEmail").focus();
        return false;
    }
    if ((document.getElementById(__ctrl + "_txtEmail").value != "") && !isEmail(document.getElementById(__ctrl + "_txtEmail").value)) {
        alert("Địa chỉ email không hợp lệ. Vui lòng nhập lại!");
        document.getElementById(__ctrl + "_txtEmail").focus();
        return false;
    }
    if ((document.getElementById(__ctrl + "_select_InfoType").selectedIndex == "")) {
        alert("Vui lòng chọn loại thông tin!");
        return false;
    }
    if ((document.getElementById(__ctrl + "_txtPhone").value != "") && !isPhone(document.getElementById(__ctrl + "_txtPhone").value)) {
        alert("Số điện thoại không hợp lệ. Vui lòng nhập lại!");
        document.getElementById(__ctrl + "_txtPhone").focus();
        return false;
    }
    if (document.getElementById(__ctrl + "_select_InfoType").value == "0") {
        if ((document.getElementById(__ctrl + "_select_Browser").value == "")) {
            alert("Vui lòng chọn loại trình duyệt!");
            document.getElementById(__ctrl + "_select_Browser").focus();
            return false;
        }
        if ((document.getElementById(__ctrl + "_select_OS").value == "")) {
            alert("Vui lòng chọn hệ điều hành!");
            document.getElementById(__ctrl + "_select_OS").focus();
            return false;
        }
    }
    if ((document.getElementById(__ctrl + "_txtContent").value == "")) {
        alert("Vui lòng nhập nội dung!");
        document.getElementById(__ctrl + "_txtContent").focus();
        return false;
    }

    // 	document.getElementById(__ctrl+"_hd_send.value='1';
    // 	document.getElementById(__ctrl+"_submit();
}
function ShowBrowser_Os(vl) {
    if (vl == "0") {
        document.getElementById("browser").style.display = "";
        document.getElementById("os").style.display = "";
    }
    else {
        document.getElementById("browser").style.display = "none";
        document.getElementById("os").style.display = "none";
    }
}
function ResetContactUs() {
    var __ctrl = document.getElementById("hdfCtrl").value;
    document.getElementById(__ctrl + '_txtFullName').value = "";
    document.getElementById(__ctrl + '_txtPhone').value = "";
    document.getElementById(__ctrl + '_txtEmail').value = "";
    document.getElementById(__ctrl + '_select_InfoType').value = "";
    document.getElementById(__ctrl + '_txtContent').value = "";
}