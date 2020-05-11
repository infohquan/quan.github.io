
/*
			*	form lien he 
			*/
			var ContactEstate={
				grp_1:[],
				grp_2:[],
				grp_3:[],
				grp_4:[],
				grp_5:[],
				Validate:function (val_,arr_)
				{
					var arrKq=[];
					var flg=false;
					for(var i=0;i<arr_.length;i++)
					{
						if(arr_[i]==val_) 
						{
							flg=true;
							arr_[i]="";
						}
					}
					if(flg==false)
					{
						arrKq=arr_;
						arrKq.push(val_)
					}
					else
					{
						for(var j=0;j<arr_.length;j++)
						{
							if(arr_[j]!="")
								arrKq.push(arr_[j])
						}
					}
					return arrKq;
				},
				CheckValue:function(val_,grp_)
				{						
					switch (grp_)
					{
						case "1":
							ContactEstate.grp_1=ContactEstate.Validate(val_,ContactEstate.grp_1);
							break;
						case "2":
							ContactEstate.grp_2=ContactEstate.Validate(val_,ContactEstate.grp_2);
							break;
						case "3":
							ContactEstate.grp_3=ContactEstate.Validate(val_,ContactEstate.grp_3);
							break;
						case "4":
							ContactEstate.grp_4=ContactEstate.Validate(val_,ContactEstate.grp_4);
							break;
						case "5":
							ContactEstate.grp_5=ContactEstate.Validate(val_,ContactEstate.grp_5);
							break;
					}
				},
				SendContact:function ()
				{
					if($('#txtHoTen').val()==""||$('#txtEmail').val()==""||$('#txtPhone').val()=="")
					{
						alert("Vui lòng điền thông tin: Tên/Email/Phone!!!");
						$('#txtPhone').focus();
						return false;
		            }
		            if ($('#txtEmail').val()!="")
                    {
                         var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                         if (reg.test($('#txtEmail').val()) == false) {
                            alert("Định dạng email không đúng");
                            $('#txtEmail').focus();
                            return false;
                        }
                    }
					if(ContactEstate.grp_1.toString()==""&&ContactEstate.grp_2.toString()==""&&ContactEstate.grp_3.toString()==""
						&&ContactEstate.grp_4.toString()==""&&ContactEstate.grp_5.toString()==""
					)
					{
						alert("Vui lòng điền thông tin bạn quan tâm về dự án!");						
						$('#txtKhuVucQuanTam').focus();						
						return false;
					}
					
					var ttt=$('#txtThongTinThem').val();
					var kvqt=$('#txtKhuVucQuanTam').val();
					if(ttt=="vị trí tầng, vị trí lô đất.v.v...") ttt="";
					if(kvqt=="Quận 1, Quận Thủ Đức,...") kvqt="";
					
					var pars={
						en:$('#hdfEstateName').val(),
						ht:$('#txtHoTen').val(),
						em:$('#txtEmail').val(),
						ph:$('#txtPhone').val(),
						lbds:ContactEstate.grp_1.toString(),
						//lbdsall:$('#hdf_chkLoaiBds').val(),
						dt:ContactEstate.grp_2.toString(),
						kvqt:kvqt,
						md:ContactEstate.grp_3.toString(),
						ns:ContactEstate.grp_4.toString(),
						kg:ContactEstate.grp_5.toString(),
						ttt:ttt,
						agm:$('#hdfEmailMemLocal').val(),
						eid:$('#hdfEstateID').val()
					}
					var url = pathClientAjax+"handler/Handler.aspx@act=smlhctda";	
					$.post(url, pars,
						function(data){							
							alert("Bạn đã gửi mail thành công!");
						//	$('.Summary').html(data);
					});
				},
				RemoveColorText:function(id)
				{
					$('#'+id).removeAttr("style");
				}
			}
	
			var timeoutIfrResize=null;
 			$(document).ready(function(){
 				$(".lightbox-2").lightbox({
 					fitToScreen: true
 				}); 
 				TabEstateHtml.ifrResize();
 				//TabEstateHtml.main_detail_show();
 			});
 			 			
 			var TabEstateHtml={
 				ifrResize: function()
 				{
 					if((navigator.appName=="Netscape" && navigator.appVersion.indexOf("Chrome/")!=-1))
 					{
 						if(document.getElementById('ifrEstateHtml')!=null)
 						{
 							document.getElementById('ifrEstateHtml').style.height="6000px";
 							document.getElementById('ifrEstateHtml').style.width="822px";
 						}
 					}
 					else{
 						timeoutIfrResize=setTimeout("TabEstateHtml.ifrResize()",2000); 					 					
 						if(document.getElementById('ifrEstateHtml')!=null )
 						{				
 							var options = {width: '822px',height: 'auto',autoUpdate : true};
							$(".ColRightFull").iframeResize(options);
						}
						else clearTimeout(timeoutIfrResize);					
					}
 				},
 				main_detail_show: function (){            
					var iframe = window.parent.document.getElementById("ifrEstateHtml"); 
					if(iframe!=null)
					{
						iframe.height =document.body.offsetHeight + 300+'px'; 
						iframe.width =822+'px';            
					}
				},
 				ActiveTab: function (id)
 				{
 					if(id=="1")
 					{
 						$("#eleft").hide();
						$("#eright").hide();
						$("#hrfEstateHtml_1").addClass("current");
						$("#hrfEstateHtml_2").removeClass("current");
						$("#divEstateHtml").show();
						$("#divEstateMbnd").hide();
 					}
 					else if (id=="2")
 					{
 						$("#eleft").show();
						$("#eright").show();
						$("#hrfEstateHtml_2").addClass("current");
						$("#hrfEstateHtml_1").removeClass("current");
						$("#divEstateHtml").hide();
						$("#divEstateMbnd").show();
 					}
 				}
 			}
 function sendLH()
	{	
		
		var tieude=	$('lhTieuDe');
		var hoten=	$('lbHoTen');
		var emails=	$('lhEmail');
		var sdt=	$('lhDienThoai');
		var noidung=	$('lnNoiDung');
		
		if(tieude.value=="")
		{
			alert("Tiêu đề không được rỗng!");
			tieude.focus();
			return false;
		}
		if(hoten.value=="")
		{
			alert("Tên không được rỗng!");
			hoten.focus();
			return false;
		}
		if(emails.value==""||isEmail(emails.value)==false)
		{
			alert("Email không được rỗng hoặc sai định dạng!");
			emails.focus();
			return false;
		}		
		if(noidung.value=="")
		{
			alert("Nội dung không được rỗng!");
			noidung.focus();
			return false;
		}
		
		var url=pathClient+"/handler/misc.aspx?act=smteo";
		var pars="&t="+tieude.value;
			pars+="&e="+emails.value;
			pars+="&s="+sdt.value;
			pars+="&n="+noidung.value;
			pars+="&h="+hoten.value;
			pars+="&to="+$('to').value;
			pars+="&ten="+$('tenduan').value;
			pars+="&ma="+$('maduan').value;
			pars+="&l="+$('link').value;
			pars+="&on="+$('oname').value;
			
		$('LoadingEsc').style.display='block';
		new Ajax.Request(url, { 
			method: 'post',		
			parameters: pars,			
			onSuccess: function(transport) {						
					$('LoadingEsc').style.display='none';
					alert("Bạn đã gửi thành công!");
					resetLH();
				},
			onFailure: function(e){ alert(e.responseText);
			}
			}
		)
	}
	
	function resetLH()
	{
		$('lhTieuDe').value="";
		$('lbHoTen').value="";
		$('lhEmail').value="";
		$('lhDienThoai').value="";
		$('lnNoiDung').value="";
		return false;
	}