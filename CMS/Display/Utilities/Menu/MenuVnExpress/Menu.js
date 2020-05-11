var submenu = new Array(menu_pid.length);
var activeid;
var delay_hide=500;
var menuobj;

function Active(){	
	var i,j;
	for (i=0; i<menu_pid.length; i++) {
		if(menu_fid[i]==PAGE_FOLDER&& menu_pid[i]==0) {
			activeid = i;
			break;
		}
		else if(menu_fid[i]==PAGE_FOLDER&& menu_pid[i]!=0) {
			for(j=0; j<menu_pid.length; j++) {
				if(menu_fid[j]==menu_pid[i]) {
					activeid = j;
					break;
				}
			}
			break;
		}
	}
}

/*Thay http://vnexpress.net/Images/Menu/sep-pmenu.gif bằng /CMS/Display/Utilities/Menu/MenuVnExpress/sep-pmenu.gif*/
function writeParentMenu() {
    var sep_pmenu_img = domain + '/CMS/Display/Utilities/Menu/MenuVnExpress/sep-pmenu.gif';	
	var strParent = '';
	var strSep = '<div class="fl" style="width:1px;font-size:1px"><img src="' + sep_pmenu_img + '" alt="" /></div>';
	var i;	
	var url = '';
	for(i=0; i< menu_pid.length; i++) {
		url = (PAGE_FOLDER >= 9998 && PAGE_FOLDER != 10000 && PAGE_FOLDER != 10001) ? 'http://vnexpress.net' + menu_path[i] : menu_path[i];		
		if(menu_pid[i] == 0) {
		    if(menu_fid[i]==1) {
		        strParent = strParent.concat('<div class="fl"><img src="' + sep_pmenu_img + '" alt="" /></div>');
			    strParent = strParent.concat('<div class="pmenu-sep fl">&nbsp;</div>');
		    }
			if(menu_fid[i]==PAGE_FOLDER) {			    
			    strParent = strParent.concat('<div class="fl" onMouseover="activeMenu(').concat(i).concat(');showit(').concat(i).concat(',1);" onMouseout="deactiveMenu(').concat(i).concat(');reWriteMenu();" onClick=goTo("').concat(url).concat('")>');
			    strParent = strParent.concat('<div id="mn').concat(i).concat('_l" class="pmenu-activeleft fl">&nbsp;</div>');
			    strParent = strParent.concat('<div id="mn').concat(i).concat('" class="pmenu-active fl">').concat(menu_name[i]).concat('</div>');
			    strParent = strParent.concat('<div id="mn').concat(i).concat('_r" class="pmenu-activeright fl">&nbsp;</div>');
			    strParent = strParent.concat('</div>');
				strParent = strParent.concat(strSep);
			}			
			else {	
			    strParent = strParent.concat('<div class="fl" onMouseover="activeMenu(').concat(i).concat(');showit(').concat(i).concat(',1);" onMouseout="deactiveMenu(').concat(i).concat(');reWriteMenu();" onClick=goTo("').concat(url).concat('")>');
			    strParent = strParent.concat('<div id="mn').concat(i).concat('_l" class="pmenu-normalleft fl">&nbsp;</div>');
			    strParent = strParent.concat('<div id="mn').concat(i).concat('" class="pmenu-normal fl">').concat(menu_name[i]).concat('</div>');
			    strParent = strParent.concat('<div id="mn').concat(i).concat('_r" class="pmenu-normalright fl">&nbsp;</div>');
			    strParent = strParent.concat('</div>');
			    strParent = strParent.concat(strSep);			
			}			
			writeSubMenu(menu_fid[i], i);
		}
		else {
			break;						
		}
	}
	strParent = strParent.substr(0, strParent.length - strSep.length);	
	gmobj("parent-menu").innerHTML = strParent;
}

function writeSubMenu(p, k) {
	var strSubMenu = '';
	//var strSep = '&nbsp;&nbsp;<img src="http://vnexpress.net/Images/Menu/square.gif" alt=""/>&nbsp;&nbsp;';
	var strSep = '&nbsp;&nbsp;&nbsp;<img src="/CMS/Display/Utilities/Menu/MenuVnExpress/bullet.gif" alt=""/>&nbsp;&nbsp;';
	var i;
	var j = 0;
	var url = '';
	for(i=0; i < menu_pid.length; i++) {
		url = (PAGE_FOLDER >= 9998 && PAGE_FOLDER != 10000 && PAGE_FOLDER != 10001) ? 'http://vnexpress.net' + menu_path[i] : menu_path[i];
		if(menu_pid[i]==p&&menu_show[i]==0) {			
			if(j==0) {				
			    strSubMenu = strSubMenu.concat('<img src="/CMS/Display/Utilities/Menu/MenuVnExpress/bullet.gif" border="0"/>&nbsp;&nbsp;');				
				if(menu_fid[i] < 1000) {
				    strSubMenu = strSubMenu.concat('<a class="link-submenu" href="').concat(url).concat('">').concat(menu_name[i]).concat('</a>');					
				}
				else {
				    strSubMenu = strSubMenu.concat('<a class="link-submenu" href="').concat(url).concat('" target="_blank"').concat(menu_name[i]).concat('</a>');					
				}
				strSubMenu = strSubMenu.concat(strSep);
			}
			else {
				if(menu_fid[i] < 1000 && menu_fid[i] != 106 && menu_fid[i] != 148)
				{
				    strSubMenu = strSubMenu.concat('<a class="link-submenu" href="').concat(url).concat('">').concat(menu_name[i]).concat('</a>');					
					strSubMenu = strSubMenu.concat(strSep);
				}
				else if(menu_fid[i] >= 1000)
				{					
					strSubMenu = strSubMenu.concat('<a class="link-submenu" href="').concat(url).concat('" target="_blank">').concat(menu_name[i]).concat('</a>');
					strSubMenu = strSubMenu.concat(strSep);
				}				
			}
			j += 1;
		}
	}
	strSubMenu = strSubMenu.substr(0, strSubMenu.length - strSep.length);
	if(strSubMenu=='') {submenu[k]='&nbsp;'}
	else {submenu[k] = strSubMenu;}					
}

function writeCurrentMenu() {
	var strSubMenu = '';
	var i, j;
	for(i=0; i < menu_pid.length; i++) {
		if(menu_fid[i]==PAGE_FOLDER && menu_pid[i]==0) {				
			activeMenu(i);
			//gmobj('submenu').innerHTML = submenu[i];
			showit(i,0);
			break;
		}
		else if(menu_fid[i]==PAGE_FOLDER && menu_pid[i]!=0) {			
			var flag = false;
			for(j=0; j<menu_pid.length; j++) {
				if(menu_fid[j]==menu_pid[i]) {						
					activeMenu(j);
					//gmobj('submenu').innerHTML = submenu[j];
					showit(j,0);
					flag = true;
					break;
				}
			}
			if(flag==true) break;			
		}	
		else {
			deactiveMenu(activeid);
			menuobj.innerHTML = '';
		}
	}	
}

function writeFooterMenu() {
	var sHTML = '';
	var strSep = '&nbsp;&nbsp;|&nbsp;&nbsp;';
	var i;	
	for(i=0; i<menu_pid.length; i++) {
		if(menu_pid[i]==0 && menu_fid[i]!=1) {
		    sHTML=sHTML.concat('<a class="link-footermenu" href="').concat(menu_path[i]).concat('">').concat(menu_name[i]).concat('</a>');
		    sHTML=sHTML.concat(strSep);			 
		}
		else {
			continue;
		}
	}	
	sHTML = sHTML.substr(0, sHTML.length - strSep.length);	
	document.write(sHTML);
}

function activeMenu(i) {	
	if(i>=0 && !isNaN(i)) {
		if(i != activeid && activeid != -1) {
			deactiveMenu(activeid);
			activeid = i;
		}		
		gmobj('mn' + i).className = 'pmenu-active fl';
		gmobj('mn' + i + '_l').className = 'pmenu-activeleft fl';
		gmobj('mn' + i + '_r').className = 'pmenu-activeright fl';		
	}		
}

function deactiveMenu(i) {	
	if(i >= 0 && !isNaN(i)) {		
		gmobj('mn' + i).className = 'pmenu-normal fl';
		gmobj('mn' + i + '_l').className = 'pmenu-normalleft fl';
		gmobj('mn' + i + '_r').className = 'pmenu-normalright fl';				
	}	
}

function activeMenuParent() {
	activeMenu(activeid);
}

function showit(which, type){			
	clear_delayhide()
	thecontent=(which==-1)? "" : submenu[which];
	
	switch (parseInt(which)){		
		case 5: menuobj.className = 'smenu-content fl'; thecontent = writeBlank(62).concat(thecontent); break;
		case 6: menuobj.className = 'smenu-content fl'; thecontent = writeBlank(88).concat(thecontent); break;
		case 7: menuobj.className = 'smenu-content fl'; thecontent = writeBlank(76).concat(thecontent); break;
		case 8: menuobj.className = 'smenu-content fl'; thecontent = writeBlank(108).concat(thecontent); break;
		case 9: menuobj.className = 'smenu-content fl'; thecontent = writeBlank(110).concat(thecontent); break;		
		case 10: menuobj.className = 'smenu-content fl'; thecontent = writeBlank(188).concat(thecontent); break;		
		case 11: case 14:
			if(type==1) {menuobj.className = 'smenu-content2 fl txtr';}
			else {menuobj.className = 'smenu-content fl txtr';}
			break;
		default:						
			menuobj.className = 'smenu-content fl';
			break;
	}	
	if (document.getElementById||document.all)
		menuobj.innerHTML=thecontent
	else if (document.layers){
		menuobj.document.write(thecontent)
		menuobj.document.close()
	}		
}

function resetit(){
	delayhide=setTimeout("writeCurrentMenu()",delay_hide);
}

function clear_delayhide(){
	if (window.delayhide)
		clearTimeout(delayhide)
}

function reWriteMenu() {	
	delayhide=setTimeout("writeCurrentMenu()",delay_hide);	
}

function writeTabMenu(i,f) {
	var child = false;
	var j;
	var strTabMenu = '';
	var cname = '';
	var cpath = '';	
	for(j=0; j < menu_pid.length; j++) {
		if(menu_pid[j] == i) {
			child = true;
			break;
		}
	}	
	for(j=0; j < menu_pid.length; j++) {
		if(menu_fid[j] == i) {
			cname = menu_name[j];
			cpath = menu_path[j];
			break;
		}
	}
	if(f==0) {	    
	    if(child) {
		    if(i!=105) {
		        strTabMenu = strTabMenu.concat('<div class="folder-title">');
		        strTabMenu = strTabMenu.concat('    <div class="fl"><img src="http://vnexpress.net/Images/Background/folder-activeleft.gif" alt="" /></div>');
		        strTabMenu = strTabMenu.concat('    <div class="folder-active fl"><a href="').concat(cpath).concat('" class="link-folder">').concat(cname).concat('</a></div>');
		        strTabMenu = strTabMenu.concat('    <div class="fl"><img src="http://vnexpress.net/Images/Background/folder-activeright.gif" alt="" /></div>');
		        strTabMenu = strTabMenu.concat('    <div class="subfolder fl"><a href="#" class="link-subfolder">').concat(writeTabSubMenu(i)).concat('</a></div>');
		        strTabMenu = strTabMenu.concat('    <div class="fr"><img src="http://vnexpress.net/Images/Background/folder-titleright.gif" alt="" /></div>');
		        strTabMenu = strTabMenu.concat('</div>');			        		    
		    }
		    else{
		        strTabMenu = strTabMenu.concat('<div class="folder-title2">');
		        strTabMenu = strTabMenu.concat('    <div class="fl"><img src="http://vnexpress.net/Images/Background/folder-activeleft2.gif" alt="" /></div>');
		        strTabMenu = strTabMenu.concat('    <div class="folder-active2 fl"><a href="').concat(cpath).concat('" class="link-folder">').concat(cname).concat('</a></div>');
		        strTabMenu = strTabMenu.concat('    <div class="fl"><img src="http://vnexpress.net/Images/Background/folder-activeright2.gif" alt="" /></div>');		        
		        strTabMenu = strTabMenu.concat('    <div class="fr"><img src="http://vnexpress.net/Images/Background/folder-topright.gif" alt="" /></div>');
		        strTabMenu = strTabMenu.concat('</div>');
		    }		
	    }
	    else {
		    if(i!=117)
		    {
		        strTabMenu = strTabMenu.concat('<div class="folder-title2">');
		        strTabMenu = strTabMenu.concat('    <div class="fl"><img src="http://vnexpress.net/Images/Background/folder-activeleft2.gif" alt="" /></div>');
		        strTabMenu = strTabMenu.concat('    <div class="folder-active2 fl"><a href="').concat(cpath).concat('" class="link-folder">').concat(cname).concat('</a></div>');
		        strTabMenu = strTabMenu.concat('    <div class="fl"><img src="http://vnexpress.net/Images/Background/folder-activeright2.gif" alt="" /></div>');		        
		        strTabMenu = strTabMenu.concat('    <div class="fr"><img src="http://vnexpress.net/Images/Background/folder-topright.gif" alt="" /></div>');
		        strTabMenu = strTabMenu.concat('</div>');
		    }		    
	    }
	}		
	return strTabMenu;
}

function writeTabSubMenu(i) {
	var j;
	var strTabSubMenu = '';
	var strSep = '&nbsp;|&nbsp;';
	for(j=0; j < menu_pid.length; j++) {
		if(menu_pid[j] == i) {			
			if(menu_fid[j] < 10000 && menu_fid[j] != 106 && menu_fid[j] != 148) {
				if(i==9){						
					if(strTabSubMenu==''){
						strTabSubMenu = strTabSubMenu.concat('<a class="link-subfolder" href="').concat(menu_path[6]).concat('" >').concat(menu_name[6]).concat('</a>');
						strTabSubMenu = strTabSubMenu.concat(strSep);
					}
					strTabSubMenu = strTabSubMenu.concat('<a class="link-subfolder" href="').concat(menu_path[j]).concat('" >').concat(menu_name[j]).concat('</a>');
					strTabSubMenu = strTabSubMenu.concat(strSep);
				}
				else {
					strTabSubMenu = strTabSubMenu.concat('<a class="link-subfolder" href="').concat(menu_path[j]).concat('" >').concat(menu_name[j]).concat('</a>');
					strTabSubMenu = strTabSubMenu.concat(strSep);
				}
			}
			else if(menu_fid[j] >= 10000) {
				strTabSubMenu = strTabSubMenu.concat('<a class="link-subfolder" href="').concat(menu_path[j]).concat('"  target="_blank">').concat(menu_name[j]).concat('</a>');
				strTabSubMenu = strTabSubMenu.concat(strSep);				
			}					
		}
	}
	strTabSubMenu = strTabSubMenu.substr(0, strTabSubMenu.length - strSep.length);
	return strTabSubMenu;
}

function writeListItemTitle(i) {	
	var j;
	var strListItemTitle = '';
	for(j=0; j < menu_pid.length; j++) {
		if(menu_fid[j] == i) {
			strListItemTitle = strListItemTitle.concat('<a class="link-folder" href="').concat(menu_path[j]).concat('" >').concat(menu_name[j]).concat('</a>');									
			break;
		}
	}
	document.write(strListItemTitle);
}

function writeFolderTitle(i) {		
	var j;
	var strTitle = '';	
	for(j=0; j<menu_pid.length; j++) {
		if(menu_fid[j]==i && menu_pid[j]==0) {
			strTitle = strTitle.concat('<div class="parentfolder-title fl">');
			strTitle = strTitle.concat('<a href="').concat(menu_path[j]).concat('">').concat(menu_uname[j]).concat('</a>');	
			strTitle = strTitle.concat('</div>');			
			break;
		}
		else if(menu_fid[j]==i && menu_pid[j]!=0) {
			var k;
			for(k=0; k<menu_pid.length; k++) {
				if(menu_fid[k] == menu_pid[j]) {
					strTitle = strTitle.concat('<div class="parentfolder-title fl">');
					strTitle = strTitle.concat('<a href="').concat(menu_path[k]).concat('">').concat(menu_uname[k]).concat('</a>');
					strTitle = strTitle.concat('</div>');					
					break;
				}
			}			
			strTitle = strTitle.concat('<div class="subfolder-title fl">');
			strTitle = strTitle.concat('>&nbsp;<a href="').concat(menu_path[j]).concat('">').concat(menu_uname[j]).concat('</a>');
			strTitle = strTitle.concat('</div>');
			break;
		}
	}	
	document.write(strTitle);	
}

function writeBlank(i) {
	var strHTML = '';
	for(var j=1; j<=i; j++){
		strHTML = strHTML.concat('&nbsp;');
	}
	return strHTML;
}

function goTo(i){
	document.location.href = i;
}


