
var NvgHelpToolTipDesc=[
	{desc:'Tiền không là gì nhưng không có tiền thì chả làm được gì'},
	{desc:'Tin này sẽ được gia hạn thêm 1, Tin này sẽ được gia hạn thêm 1, Tin này sẽ được gia hạn thêm 1'	},
	{desc:'Cái đẹp đánh xẹp cái nết!'	},
	{desc:'Bốc xăm trúng thưởng'}
];
var NvgPayEvenTipDesc={
	giahantin:'Gia hạn tin',
	lammoitin:'(-15 điểm) Tin được làm mới ngày đăng và gia hạn 30 ngày, tính từ ngày kích hoạt. ',
	kichhoattin:'(-15 điểm) Tin sẽ thay đổi trạng thái từ “Chưa kích hoạt” thành “Đang giao dịch” và hiển thị 30 ngày, tính từ ngày kích hoạt.',
	hieuchinhtin:'(Không trừ điểm) Được phép thay đổi thông tin về BĐS ngoại trừ: Tiêu đề, Loại BĐS, Loại giao dịch, Tỉnh/TP, Quận/Huyện. ',
	todamtin:'Tin sẽ được tô màu, nổi bật hơn các tin khác trong kết quả tìm kiếm trong vòng 30 ngày, tính từ ngày kích hoạt. ',
	suatieude:'(-5 điểm) Tiêu đề sẽ được thay đổi sau khi hiệu chỉnh. ',
	ngungdang:'Tin sẽ ngừng giao dịch',
	xoa:'Tin sẽ bị xóa khỏi danh sách',
	doilienhe:'Cho phép thay đổi phần liên hệ của tin.',
	diemdadung:'Xem số điểm đã dùng của BĐS này',
	dangtinvip:'Tin được xuất hiện ở cột bên phải trên trang chủ, trang tìm kiếm cùng khu vực và trang chi tiết BĐS cùng khu vực trong vòng 7 ngày.',
	topagentvip: 'Đăng BĐS này thành VIP, chỉ được 1 tin duy nhất',
	ngungdangtopagent: 'Ngừng đăng VIP BĐS này',
	notetopagent: "Muốn đăng VIP, cần mua gói TOP AGENT",
	note1topagent: "Muốn đăng VIP, cần kích hoạt BĐS này"
};

var NvgUsrVariable={
	TimeOutShowSpeed:20000,
	TimeOutHideSpeed:7000	
};

var NvgUsrFunction={
	GetRndTt:function ()
	{
		var _length=NvgHelpToolTipDesc.length;
		var _rnd		= Math.floor(Math.random()*_length);
		$('#divShowTipContent').html(NvgHelpToolTipDesc[_rnd].desc);		
		$('#divShowTipHelp').attr("style","bottom:0px; right:0px;position:fixed");
		setTimeout("NvgUsrFunction.GetRndTt()",NvgUsrVariable.TimeOutShowSpeed);
		setTimeout("NvgUsrFunction.CloseTips()",NvgUsrVariable.TimeOutHideSpeed);
	},
	CloseTips:function()	
	{
		$('#divShowTipHelp').hide();
	},
	SetToggleMenu: function(val_)
	{
		$('#ulMenu'+val_).toggle();
		// xai cookie ToggleMenu
		var cko_=nvgUtils.getCookie("ToggleMenu");
		if(!this.CheckValueInString(val_, cko_)){
			cko_+=val_+",";
		}
		else{
			cko_=this.RemoveValueInString(val_,cko_);
		}
		nvgUtils.setCookie("ToggleMenu",cko_,10);
	},
	CheckValueInString: function(val_, string_)
	{
		var arr_ = string_.split(',');
		for(var i =0;i <arr_.length;i++)
		{
			if(arr_[i]!=""&&arr_[i]==val_)	return true;
		}
		return false;
	},
	RemoveValueInString: function(val_, string_)
	{
		var res_="";
		var arr_ = string_.split(',');
		for(var i =0;i <arr_.length;i++)
		{
			if(arr_[i]!=""&&arr_[i]!=val_) res_+=arr_[i]+",";
		}
		return res_;
	},
	CheckValueInArr: function(val_,arr_)
	{		
		for(var i =0;i <arr_.length;i++)
		{
			if(arr_[i]!=""&&arr_[i]==val_)	return true;
		}
		return false;
	},
	RemoveValueInArr: function(val_, arr_)
	{
		var res_="";		
		for(var i =0;i <arr_.length;i++)
		{
			if(arr_[i]!=""&&arr_[i]!=val_) res_+=arr_[i]+",";
		}
		return res_;
	},
	ShowUti: function(pid, lut,tgo)
	{			
		var act = "act=getutis"; 			
		$('#divWating').show();
		$.post(pathClientAjax+"Users/UsrHandler.aspx?"+act+"&d="+(new Date()).getTime(),
			{pid:pid, lut:lut, tgo:tgo },   // post , de dấu values
 				function(data){
 					$('#login_box').html(data);
 					$('#login_box').show();
 					$('#divWating').hide();
 			}); 
	},
	ShowTotalUti: function(lstuti)
	{			
		var act = "act=getttutis"; 			
		$('#divWating').show();
		$.post(pathClientAjax+"Users/UsrHandler.aspx?"+act+"&d="+(new Date()).getTime(),
			{lut:lstuti },   // post , de dấu values
 				function(data){
 					$('#login_box').html(data);
 					$('#login_box').show();
 					$('#divWating').hide();
 			}); 
	},
	CloseLoginBox: function()
	{
		$('#login_box').hide();
	},
	TongHopDiemTK: function()
	{
		var act = "act=thdtk";
		var pars ={
			pid:$('#txtBDS').val(),
			df:$('#txtTuNgay').val(),
			dt:$('#txtDenNgay').val(),
			stt:$('#sltTrangThai').val()
		};
		$('#kqRes').html("Đang tải dữ liệu ... "); 
		$.post(pathClientAjax+"Users/UsrHandler.aspx?"+act+"&d="+(new Date()).getTime(),
			pars,   // post , de dấu values
 			function(data){
 				if(data!="0")
 					$('#kqRes').html(data);
 				else $('#kqRes').html("Chưa có dữ liệu");
 		}); 
	},
	ThongKeBDSChung: function()
	{
		var act = "act=tkbdsc";
		var pars ={
			st:$('#'+$('#hdfCtl').val()+'_sltState').val(),
			sb:$('#sltSuburb').val(),
			df:$('#txtTuNgay').val(),
			dt:$('#txtDenNgay').val()
		};
		$('#divTkBds').html("Đang tải dữ liệu ... "); 
		$.post(pathClientAjax+"Users/UsrHandler.aspx?"+act+"&d="+(new Date()).getTime(),
			pars,   // post , de dấu values
 			function(data){
 				if(data!="0")
 				{
 					var s1=data.split('<-->')[0];
 					var s2=data.split('<-->')[1];
 					
 					$('#divGhiDieuKien').html(s1);
 					$('#divTkBds').html(s2);
 				}
 				else {
 					$('#divGhiDieuKien').html("");
 					$('#divTkBds').html("Chưa có dữ liệu");
 				}
 		}); 
	},
	ThongKeDuAnCuaMem: function()
	{
		var act = "act=tkdacm";
		var pars ={
			df:$('#txtTuNgay').val(),
			dt:$('#txtDenNgay').val()
		};
		$('#divThongKeDa').html("Đang tải dữ liệu ... "); 
		$.post(pathClientAjax+"Users/UsrHandler.aspx?"+act+"&d="+(new Date()).getTime(),
			pars,   // post , de dấu values
 			function(data){
 				if(data!="0")
 					$('#divThongKeDa').html(data);
 				else $('#divThongKeDa').html("Chưa có dữ liệu");
 		}); 
	},
	ThongKeLoadListBDS: function(strLoaiNha, strLoaiGD, strTong, pt, pc, tc, stt)
	{
		var act = "act=tkllbds";
		var pars ={
			st:$('#'+$('#hdfCtl').val()+'_sltState').val(),
			sb:$('#sltSuburb').val(),
			df:$('#txtTuNgay').val(),
			dt:$('#txtDenNgay').val(),
			ln:strLoaiNha,
			lgd:strLoaiGD,
			total:strTong,
			pt:pt,
			pc:pc,
			tc:tc,
			stt:stt
		};
		$('#divDesStaResult').html("Đang tải dữ liệu ... "); 
		$.post(pathClientAjax+"Users/UsrHandler.aspx?"+act+"&d="+(new Date()).getTime(),
			pars,   // post , de dấu values
 			function(data){
 				if(data!="0")
 					$('#divDesStaResult').html(data);
 				else $('#divDesStaResult').html("Chưa có dữ liệu");
 		}); 
	},
	ChangeState: function (_objSelectName, _id)
	{
		if(_id!="")
		{
			$.post(pathClient+"handler/StateGet.aspx@suburb=json&stateid="+_id,{},
			function(data){
				var obj = data.lst;
				var obj_select = document.getElementById(_objSelectName);
				
				if(obj.length > 0){
					var tpl__=$.template('<li><input type="checkbox" value="${eID}"> <span>${eName}</span></li>');
					$('#'+_objSelectName).html("");
					for(var k = 0; k < obj.length; k++){
						var options_length = obj_select.length;
						var option_value = obj[k].s1;
						var option_text  = obj[k].s2;

						$('#'+_objSelectName).append(tpl__,{eID:option_value,eName:option_text});
					}
				}
			},'json');
		}
		else 		$('#'+_objSelectName).html("Chưa có dữ liệu");	
	},
	ChangeStateSetEstate: function (_objSelectName, _id)
	{
		if(_id!="")
		{
			$.post(pathClient+"handler/StateGet.aspx@suburb=json&stateid="+_id,{},
			function(data){
				var obj = data.lst;
				var obj_select = document.getElementById(_objSelectName);
				
				if(obj.length > 0){
					var tpl__=$.template('<li><input type="checkbox" value="${eID}" onclick="ChangeSuburbGetEst(this);"> <span>${eName}</span></li>');
					$('#'+_objSelectName).html("");
					for(var k = 0; k < obj.length; k++){
						var options_length = obj_select.length;
						var option_value = obj[k].s1;
						var option_text  = obj[k].s2;

						$('#'+_objSelectName).append(tpl__,{eID:option_value,eName:option_text});
					}
				}
			},'json');
		}
		else 		$('#'+_objSelectName).html("Chưa có dữ liệu");	
	},
	ChangeStateSetEstateAndSuburb: function (_objSelectName, _id, _listSrb)
	{
		if(_id!="")
		{
			$.post(pathClient+"handler/StateGet.aspx@suburb=json&stateid="+_id,{},
			function(data){
				var obj = data.lst;
				var obj_select = document.getElementById(_objSelectName);
				
				if(obj.length > 0){
					var tpl__=$.template('<li><input type="checkbox" value="${eID}" onclick="ChangeSuburbGetEst(this);"> <span>${eName}</span></li>');
					$('#'+_objSelectName).html("");
					for(var k = 0; k < obj.length; k++){
						var options_length = obj_select.length;
						var option_value = obj[k].s1;
						var option_text  = obj[k].s2;

						$('#'+_objSelectName).append(tpl__,{eID:option_value,eName:option_text});
					}
					
					if(_listSrb!="")
					{
					    $('#lstSuburb input:checkbox').each(function () {
					        if (nvgUtils.CheckSplitValue(this.value, _listSrb, ','))
					            this.checked = true;

					    });
					}
				}
			},'json');
		}
		else 		$('#'+_objSelectName).html("Chưa có dữ liệu");	
	},
	InsSrbDBHD: function ()
	{
		var act = "act=inssrbdbhd";
		var lstSrb="";
		var flag=false;
		//alert($('#hdfTotalSrb').val())
		var srbDef= ($('#hdfTotalSrb')!=null && $('#hdfTotalSrb').val()!=undefined) ?$('#hdfTotalSrb').val():"";
		$(':checkbox').each(function ()
		{
			if(this.checked && !NvgUsrFunction.CheckValueInString(this.value,srbDef)) {
				lstSrb+=this.value+",";
				flag=true;
			}
		});
		if(!flag)
		{
			alert("Bạn chưa chọn địa bàn hoạt động hoặc nơi này đã có rồi!");
			$('#ulLstSuburb input:checkbox').removeAttr('checked');
			
			return ;
		}
		
		var pars ={
			srb: $('#'+$('#hdfCtlDbhd').val()+'_sltState').val() + "_" +lstSrb
		};
		
		$('#divDongY').html("Đang xử lý..."); 
		$('#hrfDongY').click = function() {;};
		
		$.post(pathClientAjax+"Users/UsrHandler.aspx?"+act+"&d="+(new Date()).getTime(),
			pars,   // post , de dấu values
 			function(data){
 				if(data!="0")
 					$('#ulLstKhuVucDK').html(data);
 				else $('#ulLstKhuVucDK').html("Chưa có dữ liệu");
 				$('#divDongY').html("Đồng ý"); 
				$('#hrfDongY').click =function() {
					this.LstDBHD();
				};
			$('#ulLstSuburb input:checkbox').removeAttr('checked');	
 		}); 
	},
	LstDBHD: function ()
	{
		$.post(pathClientAjax+"Users/UsrHandler.aspx@act=lstdbhd&d="+(new Date()).getTime(),
			{},   // post , de dấu values
 			function(data){
 				if(data!="0")
 					$('#ulLstKhuVucDK').html(data);
 				else $('#ulLstKhuVucDK').html("Chưa có dữ liệu");
 		}); 
	},
	DeleteDBHD: function (id_)
	{
		if(confirm("Bạn có chắc xóa ko?"))
		{
			$.post(pathClientAjax+"Users/UsrHandler.aspx@act=dltdbhd&d="+(new Date()).getTime(),
				{id:id_},   // post , de dấu values
 				function(data){
 					if(data!="0")
 						$('#ulLstKhuVucDK').html(data);
 					else $('#ulLstKhuVucDK').html("Chưa có dữ liệu");
 			}); 
		}		
	}
};


