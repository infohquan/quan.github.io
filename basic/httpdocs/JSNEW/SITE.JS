var _w = null;
var _nw;
var EMAIL_OK = 0;
var EMAIL_BLANK = 1;
var EMAIL_BAD_SYNTAX = 2;
var chghrid = '';
var _num_friend_emails = 1;
var _max_num_friend_emails = 6;
/** RESOURCES **/
// labels
var NO_SAVED_PROPERTIES = 'You have no saved properties.';
var NO_RECENT_PROPERTIES = 'You have no recently viewed properties.';
var NO_SAVED_SEARCHES = 'You have no saved searches.';
var NO_RECENT_SEARCHES = 'You have no recent searches.';
var SEARCH_SAVED = 'Search saved.';
var SEARCH_DELETED = 'Search deleted.';
var PROPERTY_SAVED = 'Property saved.';
var PROPERTY_DELETED = 'Property deleted.';
var ALERT_UPDATED = 'Email alert updated.';
var SETTING_UPDATED = 'Setting updated.';
var SETTINGS_UPDATED = 'Settings updated.';
var SETTING_ERROR = 'An error occurred. No change was made.';
var SETTING_NO_CHANGE = 'No change was made.';
var SETTING_EMAIL_UNAVAILABLE = 'This email is not available. No change was made.';
var SETTING_BAD_EMAIL = 'Please enter a valid email address, such as name@domain.com.';
var SETTING_BAD_PASSWORD = 'Your password should be between 5 and 15 characters long.';
var SETTING_EASY_PASSWORD = 'Your password is too easy to guess.';




var PROPERTY_ALERT_DELETED = 'Property alert deleted.';
var PROPERTY_ALERT_UPDATED = 'Property alert updated.';
var CLOSE_FEEDBACK = '&nbsp;&nbsp;&nbsp;&nbsp;<span class="pseudolink f10" onclick="kill_feedback(true)">[x]&nbsp;close</span>';
var _QA_ERROR_LABELS = {
  'question'            :'Please enter a question.',
  'profanity'           :'No profanity - please!',
  'question_too_short'  :'Sorry, your question is too short. A minimum of 5 characters is needed.',
  'question_too_long'   :'Sorry, your question is too long. Questions cannot be longer than 110 characters.',
  'body_too_short'      :'Sorry, your question is too short. A minimum of 5 characters is needed.',
  'body_too_long'       :'Sorry, your question is too long. Questions cannot be longer than 1000 characters.',
  'location'            :'No location match found for city & state, or ZIP.',
  'no_location'         :'Please enter a location.',
  'category'            :'Please select a category.',
  'captcha'             :'Please enter the correct text in the input box.',
  'no_captcha'          :'Please enter the correct text in the input box.',
  'default_error'       :'Sorry--an error occurred.',
  'not_allowed'         :'Sorry--you are not allowed to perform this operation.',
  'bad_friend_email'    :'Please enter a valid email address.',
  'error_summary'       :'<span class="error_title"><strong>Sorry!</strong> We found a few errors. Please scroll down for details.</span>'
 
};
var _ANSWER_ERROR_LABELS = {
  'answer'              :'Please enter an answer.',
  'answer_too_short'    :'Sorry, your answer is too short. A minimum of 25 characters is needed.',
  'answer_too_long'     :'Sorry, your answer is too long. Answers cannot be longer than 5000 characters.',
  'captcha'             :'Please enter the correct text in the input box.',
  'no_captcha'          :'Please enter the correct text in the input box.'
}
var _qpn_MESSAGES = { 'saved_property':'Property saved to '  };
var znczdef = 'City, ZIP or Neighborhood';
var zsbdef='City & State, or ZIP';
var zhmsbdef = 'City or county';
var zaldef = 'your email address';
var zefdef = 'Your friend\'s email address';
var _STATES = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','DC':'District Of Columbia','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'};
var NOT_EXIST_MSG = 'Unknown user.';
var EXIST_MSG = 'User already exists.';
/** END RESOURCES **/
// popup div vars
var zevt = null;
//var zlishow = getCookie('show_li_box') != '0' && (getCookie('lgi') == null);
var mutexes = new Array();
var _MENU_MUTEX = 1;
var _SAVE_MUTEX = 2;
var _EDITOR_MUTEX = 3;
var _editor;
var z_link_labels = {'saved':'[+]&nbsp;Saved&nbsp;','save':'[+]&nbsp;Save&nbsp;','saved_graphic':'<img src="../images.trulia.com/images/prop_saved.gif" border="0" />','save_graphic':'<img src="../images.trulia.com/images/prop_save_off.gif" border="0" onmouseover="highlight_save_icon(this,true)" onmouseout="highlight_save_icon(this,false)" />','save_this_search':'Save search'};
//var status_field;
var prompt_login = false;
/*
 * return an expiration date for cookie
 */
function build_cookie_exp_date(days)
{
  if (typeof(days)=='undefined')
  {
    var days = 30;
  }
  // Create a date to expire the cookie
  var expiredays = days;
  var expdate=new Date();
  expdate.setDate(expdate.getDate()+expiredays);
  return expdate;
}


/*
  function that deals with property navigator or carousel
*/

function set_index(index, search_override)
{
  if(index == "")
    return false;

  var expdate = build_cookie_exp_date(1);
  var cookie_search = getCookie('last_search');
  var cookie_ls_index = getCookie('l_carousel');
  if((typeof(search_override) != 'undefined' && search_override != null))
  {
    var expdate2 = build_cookie_exp_date(30);
    setCookie('last_search',search_override,expdate2);
    cookie_search = search_override;
  }
  if(typeof(cookie_search) != 'undefined' && cookie_search != null)
  {
    var new_cookie = ";;" + index + "&s=" + cookie_search;
    //new_cookie = escape(new_cookie);
    //alert("new cookie: " + new_cookie);
    if(typeof(cookie_ls_index) != 'undefined' && cookie_ls_index != null)
    {
      new_cookie = new_cookie + cookie_ls_index;
    }
    //alert("new cookie: " + new_cookie);
    setCookie('l_carousel',new_cookie,expdate);
    //set_csp('plc23k',0,1,new_cookie);
  }
  return false;
}


/*
function set_index(index, search_override)
{
  if(index == "")
    return false;

  var expdate = build_cookie_exp_date(1);
  var cookie_search = getCookie('last_search');
  var cookie_ls_index = getCookie('ls_carousel');
  if((typeof(search_override) != 'undefined' && search_override != null))
  {
    var expdate2 = build_cookie_exp_date(30);
    setCookie('last_search',search_override,expdate2);
    cookie_search = search_override;
  }
  if(typeof(cookie_search) != 'undefined' && cookie_search != null)
  {
    var new_cookie = ";;" + index + ";|;" + escape(cookie_search);
    //alert("new cookie: " + new_cookie);
    if(typeof(cookie_ls_index) != 'undefined' && cookie_ls_index != null)
    {
      new_cookie = new_cookie + cookie_ls_index;
    }
    setCookie('ls_index',new_cookie,expdate);
  }
  return false;
}
*/
// pass it something
// check if is valid element or if it is id to get element
// returns element if found
// sanity check for functions
// and if you use this function 20 times through all your functions calls
// to get the same element you only do 1 DOM traverse by using whatever it returns
function xb_get_element(thing)
{
  if (typeof(thing) == 'undefined' || !thing)
  {
    return null;
  }
  else if (typeof(thing.tagName) == 'undefined' || !thing.tagName)
  {
    if (document.all)
      el = document.getElementById(thing) ? document.getElementById(thing) : document.all[thing];
    else
      el = document.getElementById(thing);

    if (el)
      return el;
    else
      return null;
  }
  else if (thing.tagName)
  {
    return thing;
  }
  else
  {
    return null;
  }
}

// adds a function to the page onload event without overwriting
// other scripts that might already be there
// usage:
// addLoadEvent(function() {
//   more code to run on page load
// });
// OR
// function nameOfSomeFunctionToRunOnPageLoad()
// {
//   more code to run on page load
// }
// addLoadEvent(nameOfSomeFunctionToRunOnPageLoad);
function addLoadEvent(func)
{
  if (typeof(func) != 'function')
    return;

  var oldonload = window.onload;

  if (typeof window.onload != 'function')
    window.onload = func;
  else
  {
    window.onload = function()
    {
      if (oldonload)
        oldonload();

      func();
    }
  }
}

function $$(type,contents,id)
{
  var el = document.createElement(type);

  if (typeof(contents) != 'undefined' && contents != null)
    el.innerHTML = contents;

  if (typeof(id) != 'undefined' && id != null)
    el.id = id;

  return el;
}
function loadMainNavTabs()
{
  var tabs = new Array('search_tab_homes','search_tab_guides','search_tab_voices','search_tab_my_trulia');
  for(var i=0; i<tabs.length; i++)
  {
    if (xb_get_element(tabs[i]))
    {
      var tab = xb_get_element(tabs[i]);
      tab.onclick = function() { MainNavTab_Navigate(this); }
      tab.onmouseover = function() { MainNavTab_Highlight(this,1); }
      tab.onmouseout = function() { MainNavTab_Highlight(this,0); }
    }
  }
  // onclick="set_search_type('{SEARCH_BOX_PREFIX}','m',true);"
}
function MainNavTab_Navigate(obj)
{
  location.href = _MAIN_NAV_URLS[obj.id];
}
function MainNavTab_Highlight(obj, highlight)
{
  var base_class = 'main_nav_tab';
  var active_class = 'main_nav_tab_active';
  var highlight_class = 'main_nav_tab_highlight';
  if (obj)
  {
    if (obj.className != base_class +' '+ active_class)
    {
      if (highlight)
        obj.className = base_class +' '+ highlight_class;
      else
        obj.className = base_class;
    }
  }
}
function MainNavTab_setMyTruliaStatus(status, name)
{
  if (status == 'logged_in')
  {
    if (xb_get_element('navtab_my_trulia_logout'))
    {
      if (xb_get_element('blogtab_my_mbnd_username') && name.length>0)
      {
        if (name.length > 20)
          name = name.substr(0, 20) + '...';
        xb_get_element('blogtab_my_mbnd_username').innerHTML = ' '+ name;
        xb_get_element('blogtab_my_mbnd_username').style.display = 'inline';
      }
      xb_get_element('navtab_my_trulia_logout').style.display = 'block';
    }
    if (xb_get_element('navtab_my_trulia_login'))
      xb_get_element('navtab_my_trulia_login').style.display = 'none';
  }
  else if (status == 'logged_out')
  {
    if (xb_get_element('navtab_my_trulia_logout'))
      xb_get_element('navtab_my_trulia_logout').style.display = 'none';
    if (xb_get_element('navtab_my_trulia_login'))
      xb_get_element('navtab_my_trulia_login').style.display = 'block';

  }
}
/**
  generic tabs
*/
function NavTab_Navigate(obj)
{
  for(var i=0; i<_nav_tabs.length; i++)
  {
    var tab = xb_get_element(_nav_tabs[i]);
    if (tab)
    {
      var current_div = xb_get_element(_nav_tabs[i] +'_content');
      if (current_div)
      {
        if ( (_nav_tabs[i] == obj.id) && (current_div.style.display == 'block') )
        {
          return;
        }
        else if (_nav_tabs[i] == obj.id)
        {
          current_div.style.display = 'block';
          NavTab_Highlight(obj, 2, false);
        }
        else
        {
          current_div.style.display = 'none';
          NavTab_Highlight(tab, 0, true);
        }
      }
    }
  }
}
function NavTab_Highlight(obj, state, force_toggle)
{
  var base_class = 'results_tab';
  var active_class = 'results_tab_active_plain';
  var highlight_class = 'results_tab_highlight';
  if (obj)
  {
    if ((obj.className != base_class +' '+ active_class) || force_toggle )
    {
      if (state == 1)
      {
        // highlight
        obj.className = base_class +' '+ highlight_class;
        var icon_id = obj.id +'_icon';
        if (xb_get_element(icon_id))
          xb_get_element(icon_id).src = _IMAGE_SERVER + 'images/flair/'+ icon_id +'_hover.gif';
      }
      else if (state == 2)
      {
        // active
        obj.className = base_class +' '+ active_class;
        var icon_id = obj.id +'_icon';
        if (xb_get_element(icon_id))
          xb_get_element(icon_id).src = _IMAGE_SERVER + 'images/flair/'+ icon_id +'.gif';
      }
      else
      {
        obj.className = base_class;
        var icon_id = obj.id +'_icon';
        if (xb_get_element(icon_id))
          xb_get_element(icon_id).src = _IMAGE_SERVER + 'images/flair/'+ icon_id +'.gif';
      }
    }
  }
}
// inheritance shortcut
// http://www.kevlindev.com/tutorials/javascript/inheritance/index.htm
OOP = {};
OOP.extend = function(subClass, baseClass)
{
   function inheritance() {}
   inheritance.prototype = baseClass.prototype;

   subClass.prototype = new inheritance();
   subClass.prototype.constructor = subClass;
   subClass.baseConstructor = baseClass;
   subClass.superClass = baseClass.prototype;
}
// sets or resets a box on focus/blur
function handle_edit_box(box, default_value, focused)
{
  var box = xb_get_element(box);
  if (!box)
    return;
  var val = trim(box.value).toLowerCase();
  var def_val = default_value.toLowerCase();

  // if focused and non-default, value and black
  // if non-focused and non-default, value and black
  if (val !== def_val && val !== '')
  {
    remove_class(box, 'disabled_txt');
    box.style.color='#000';
    return;
  }

  // if focused and default value, blank and black
  if (focused && (val === def_val || val === ''))
  {
    box.style.color = '#000';
    remove_class(box, 'disabled_txt');
    box.value = '';
    return;
  }

  // if non-focused and default value, default and gray
  if (!focused)
  {
    if (val === def_val || val === '')
    {
      box.style.color = '#999';
      add_class(box, 'disabled_txt');
      box.value = default_value;
    }
    else
    {
      box.style.color = '#000';
      remove_class(box, 'disabled_txt');
    }
    return;
  }
}
// highlight tab
function highlight_tab(tab,sb_prefix,sb_override,state)
{
  // override if currently selected
  // else highlight
  var search_type = xb_get_element(sb_prefix + 'search_type').value;
  if (search_type == sb_override)
    return;
  if (state)
  {
    tab.className = 'hilite';
  }
  else
  {
    tab.className = '';
  }
}
function validate_sb(boxid)
{
  var t_search = '';
  var t_type = '';
  if (xb_get_element('t_search_type'))
  {
    t_type = xb_get_element('t_search_type').value;
  }
  var zsb = xb_get_element(boxid ? boxid : 't_navsearch');
  if (zsb)
  {
    var tv = trim(zsb.value);
    t_search = zsb.value;
    if (tv=='' || tv==zsbdef)
    {
      alert('Please enter a city, state, ZIP code, or address.');
      zsb.value = zsbdef;
      zsb.focus();
      return false;
    }
    else
    {
      o_track_search(t_type,t_search);
      return true;
    }
  }
  o_track_search(t_type,t_search);
}
// generic toggle
function toggle_element(id, trigger_id, show_text, hide_text)
{
  var el = xb_get_element(id);
  if (!el)
    return false;

  te = xb_get_element(trigger_id);
  if (el.style.display == 'none')
  {
    el.style.display = 'inline';
    if (te)
      te.innerHTML = hide_text;
  }
  else
  {
    el.style.display = 'none';
    if (te)
      te.innerHTML = show_text;
  }
}
// generic toggle
function toggle_element_triangle(id, trigger)
{
  var el = xb_get_element(id);
  if (!el)
    return;
  if (el.style.display == 'none')
  {
    unhide(id);
    toggle_class(trigger, 'srp_filter_open', 'srp_filter_closed');
    // trigger.className = trigger.className.replace(/srp_filter_closed/,'srp_filter_open');
  }
  else
  {
    hide(id);
    toggle_class(trigger, 'srp_filter_closed', 'srp_filter_open');
    // trigger.className = trigger.className.replace(/srp_filter_open/,'srp_filter_closed');
  }
}
function clear(f)
{
  if (xb_get_element(f))
    xb_get_element(f).value = '';
}
function unhide(f, val)
{
  if ( typeof(val) == 'undefined' || (!val && !(val === '')) ) { val = 'inline'; }
  if (xb_get_element(f))
    xb_get_element(f).style.display = val;
}
function hide(f)
{
  if (xb_get_element(f))
    xb_get_element(f).style.display = 'none';
  // unhide selects
  // if (navigator.appName.indexOf("Microsoft")!=-1)
  //  unhide_selects();
}

// clear element and dependencies
function clear_element(element)
{
  if (el = xb_get_element(element))
  {
    el.innerHTML = '';
    if (el.id == 'email_message')
      add_class('login_prompt', 'hidden');
    else if (el.id == 'login_email_message')
      add_class('register_prompt', 'hidden');
  }
}
// function to create an xml request object
function getHTTPObject()
{
  var xmlhttp;
  /*@cc_on
  @if (@_jscript_version >= 5)
    try
    {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e)
    {
      try
      {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (E)
      {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined')
  {
    try
    {
      xmlhttp = new XMLHttpRequest();
    }
    catch (e)
    {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}

function doNothing(e)
{
  if (typeof(e) == 'undefined' || !e)
    var e = window.event;

  if (e && typeof(e) != 'undefined')
  {
    e.cancelBubble = true;

    if (e.stopPropagation)
      e.stopPropagation();
  }
  return false;
}

// misc. text-related functions
function trim(s)
{
  if (!s)
    return '';
  return s.replace(/^\s*|\s*$/g,"");
}
function is_valid_email(e)
{
  e = trim(e).toLowerCase();
  if (e == '')
    return EMAIL_BLANK;
  //regex = /^\s*[a-z0-9-+\_\.]+@[a-z0-9-_\.]+\.[a-z]{2,4}\s*$/;
  regex = /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
  if(!regex.test(e))
    return EMAIL_BAD_SYNTAX;
  return EMAIL_OK;
}
function pull_address(s)
{
  if (s.indexOf('@') == 0)
    return s;
  else
    return s.substring(0, s.indexOf('@'));
}
/*
  @m - email target as in "trulia of trulia@email.com
  @s - subject
  @f optional - the link content
*/
function mel(m,s,f)
{
  var email = m + '@' + qpn_NAMES.email_domain;
  if(typeof(f) == 'undefined')
  {
    var link = email;
  }
  else
  {
    var link = f;
  }
  document.write('<a href=\"mailto:' + email + (s ? '@subject=' + s : '') + '\">' + link + '</a>');
}
function bad_email_alert()
{
  alert("Please enter a valid email address, such as name@domain.com.");
}
// ajax login
var user_email = '';
var field_to_focus = '';
function do_login(frm, suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }

  if (validate_login(frm, suffix))
  {
    var the_email_field = (typeof(frm) != 'undefined' ? 'login_email_field'+suffix : 'login_email'+suffix);
    var the_pass_field = (typeof(frm) != 'undefined' ? 'login_password_field'+suffix : 'login_pass'+suffix);
    lf_em = trim(xb_get_element(the_email_field).value);
    lf_ps = trim(xb_get_element(the_pass_field).value);

    // use POST
    var l_http = getHTTPObject();
    d = new Date();
    var the_url = site_root + 'q_validate_login.php';
    var arg_str = "ts=" + d.valueOf() + "&e=" + encodeURIComponent(lf_em) + "&p=" + encodeURIComponent(lf_ps) + "&sc=1";
    l_http.open("POST", the_url, true);
    l_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    l_http.send(arg_str);
    l_http.onreadystatechange =
      function()
      {
        _u = 0;
        var msg_box_text = xb_get_element('login_box_msg_txt'+suffix);
        if (l_http.readyState == 4)
        {
          var xml = l_http.responseXML;
          var record = xml.documentElement.getElementsByTagName('v')[0];
          var _u = record.getAttribute('u');
          var exists = record.getAttribute('s');
          var name = record.getAttribute('n');
          var saved = xml.documentElement.getElementsByTagName('sp')[0].childNodes[0].nodeValue;
          if (exists == '1')
          {
            user_email = lf_em;
            do_post_login(lf_em, saved, suffix, name);
            //MainNavTab_setMyTruliaStatus('logged_in', name);
          }
          else
          {
            xb_get_element(the_pass_field).value = '';
            xb_get_element('login_box_msg_txt'+suffix).className = 'ErrorMessage';

            if (exists == '-1')
            {
              xb_get_element(the_email_field).focus();
              xb_get_element('login_box_msg_txt'+suffix).innerHTML = 'Unknown user.';
            }
            else if (exists == '0')
            {
              xb_get_element(the_pass_field).focus();
              xb_get_element('login_box_msg_txt'+suffix).innerHTML = 'Wrong password.';
            }

            unhide('login_box_msg_txt'+suffix);
          }
        }
      }
  }

  return false;
}

function do_post_logout(suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
  MainNavTab_setMyTruliaStatus('logged_out');

   // clear all forms
  clear_form_by_id('register_form'+suffix);
  clear_form_by_id('login_form'+suffix);
  clear_form_by_id('password_form'+suffix);

  // redirect as needed
  var lpgv_el = xb_get_element('lpg' + suffix);
  if(lpgv_el)
    var lpgv = lpgv_el.value;
  if(lpgv == 'account/details/' || lpgv == 'account/settings/')
    go_to_page('logout/');
  else if (lpgv == 'account' || lpgv.indexOf('register') >= 0 || lpgv.indexOf('account/') >= 0 || lpgv.indexOf('agents/feature') >= 0 ||
      (lpgv.indexOf('results/') >= 0 && lpgv != 'results/') ||
      lpgv.indexOf('tools/buttons/profile') >= 0 || lpgv.indexOf('agent_login')>=0 || lpgv.indexOf('wizard/voices/') >= 0 || lpgv.indexOf('truliapro') >= 0
     )
    go_to_page(lpgv);
  else if (lpgv.indexOf('beta') >= 0)
    go_to_page('voices/');
  else if(lpgv.indexOf('submit_listings/') >= 0)
    go_to_page('agent_login/');
  else if (lpgv == 'home')
    location.replace(site_root);
  else if (lpgv.indexOf('truliamap') >= 0)
    go_to_page('truliamap');
  else if (lpgv.indexOf('mytrulia') >= 0)
    go_to_page('mytrulia/');
  else
  {
    if(xb_get_element('hlgin'))
      xb_get_element('hlgin').value = 0;
    // clears and enables email alert boxes
    set_email_alert_forms(true);
    // resets all the save/added properties
    set_save_property_links('');
    // reset save search
    reset_save_search();
    // clear login forms
    clear_login_forms();
    zlishow = getCookie('show_li_box') != '0';
    if (xb_get_element('nav_profile_link_id'))
      xb_get_element('nav_profile_link_id').innerHTML = 'Create a Profile';
  }

  if (lpgv.indexOf('newsletter/') >= 0)
    populate_archive_header();

  if (typeof(s) != "undefined")
  {
    s.eVar10="not logged in";
    s.prop9="not logged in";
  }

  unhide_selects();
}
function do_post_login(lf_em, saved, suffix, name)
{
  unhide_selects();

  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }

  //var nreg = /^,\d+,/;
  //var has_saved = nreg.test(saved);
  user_email = lf_em;
  var fpwe = xb_get_element('forgot_password_email_field' + suffix);
  var flag_email = xb_get_element('flag_email');
  var sp_s_email = xb_get_element('sp_s_email');
  var nav_profile_link_id = xb_get_element('nav_profile_link_id');

  if (fpwe)
    fpwe.value = user_email;

  if (flag_email)
    flag_email.value = user_email;

  if (sp_s_email)
    sp_s_email.value = user_email;

  // profile link
  if (nav_profile_link_id)
    nav_profile_link_id.innerHTML = 'My Profile';

  // if have name use that else get first part of email address
  if (typeof(name) != 'undefined' && name)
  {
    MainNavTab_setMyTruliaStatus('logged_in', name);
  }
  else
  {
    MainNavTab_setMyTruliaStatus('logged_in', pull_address(user_email));
  }

  // reg form
  hide('mbnd_qa_answer_regis_blog');
  hide('mbnd_qa_answer_login_blog');
  // not using toggle_menu because of not wanting to clear login_next_step_global var
  // toggle_menu('', 'login_box' + suffix, 0);
  hide('login_box' + suffix);

  show_logout_link();

  // process save queue
  process_save_queue();

  // process sub queue
  process_subscribe_queue();

  // clear all forms
  clear_form_by_id('register_form'+suffix);
  clear_form_by_id('login_form'+suffix);
  clear_form_by_id('password_form'+suffix);

  if (typeof(login_next_step_global) != 'undefined' && login_next_step_global == 'claiming')
  {
    login_next_step_global = '';
  }

  // if logging in from account page, reload
  var lpgv_el  = xb_get_element('lpg' + suffix);

  if (lpgv_el)
    var lpgv = lpgv_el.value;

  if (lpgv == 'account' || lpgv.indexOf('register') >= 0 ||
    lpgv=='agents/feature/profile/' || lpgv.indexOf('account/') >= 0 ||
    lpgv.indexOf('tools/buttons/profile') >= 0 || lpgv.indexOf('wizard/voices/') >= 0 ||
    lpgv.indexOf('feature/') >= 0
    )
  {
    go_to_page(lpgv);
  }
  else if (lpgv == 'truliamap')
  {
    //go_to_page('truliamap');
    hide('step3_login');
    unhide('step3_tos');
  }
  else if (lpgv == 'home')
  {
    go_to_page('');
  }
  else if (lpgv.indexOf('newsletter/') >= 0)
  {
    // load custom content
    populate_archive_header();
  }
  else if (lpgv == 'truliapro_signup' || typeof _TP_redirect_url !== 'undefined')
  {
    // keep track of funnel
    var redir = 'user_credit_card_profile.php@p=1';
    if (typeof _TP_redirect_url !== 'undefined')
      redir += _TP_redirect_url;
    go_to_page(redir);
  }
  else
  {
    // any email alert subscription box should be prepop w/ email and disabled
    set_email_alert_forms(false, lf_em);
    // sets any save/added property links
    // removed for NPS:  set_save_property_links(saved);
  }
}

// READ THIS: Better to use show_pos_menu() though it will close all opened popups
function position_at_event(box_id, the_w, the_h, e, y_nudge)
{
  if (typeof(y_nudge)=='undefined')
    y_nudge = -10;

  show_pos_menu(e, box_id, 50, y_nudge);

  // var the_box = xb_get_element(box_id);
  //   if (!the_box)
  //     return;
  //
  //   var c = get_eloc(e);
  //   var ww = c.ww;
  //   var wh = c.wh;
  //   var scrollTop = c.scrollTop;
  //   var posx = c.x;
  //   var posy = c.y + y_nudge;
  //   // offset
  //   if (posx + the_w > ww)
  //     posx = ww - the_w;
  //   if (posy + the_h > wh + scrollTop)
  //     posy = wh + scrollTop - the_h + y_nudge;
  //   if (posx < 0)
  //     posx = 0;
  //   if (posy < 0)
  //     posy = 0;
  //   the_box.style.position = 'absolute';
  //   the_box.style.top = posy + 'px';
  //   the_box.style.left = posx + 'px';
  //
  //   // if this is for IE, hide the selects
  //   DOMUtils.hide_selects_by_el(the_box, posx, posy, the_w, the_h);
}
//TODO: Fix this
function position_at_center(box_id, the_w, the_h)
{
  var the_box = xb_get_element(box_id);
  if (!the_box)
    return;

  var posx,posy;

  if (typeof(the_w) == 'undefined' || typeof(the_h) == 'undefined')
  {
    var dim = get_object_dimensions(the_box);
    var the_w = dim.width;
    var the_h = dim.height;
  }

  // take scroll into acct
  var clientSize = f_clientSize();
  var scrtop = clientSize.scrollTop;
  if (is_IE())
  {
    posx = (document.body.clientWidth - the_w) / 2 - 100;
    //posy = document.body.clientHeight / 2 - 200;
    posy = scrtop + the_h / 2;
  }
  else
  {
    posx = (window.innerWidth - the_w) / 2;
    posy = window.innerHeight / 2 - 200 + scrtop;
  }
  if (posy < 20)
    posy = 20;
  the_box.style.left = posx + 'px';
  the_box.style.top = posy + 'px';

  // if this is for IE, hide the selects
  DOMUtils.hide_selects_by_el(the_box, posx, posy, the_w, the_h);
}
function center_div_on_page(obj)
{
  var div_width = parseInt(obj.style.width);
  var div_height = parseInt(obj.style.height);

  var center_x,center_y;
  if (is_IE())
  {
    center_x = (document.body.clientWidth / 2);
    center_y = (document.body.clientHeight / 2);
  }
  else
  {
    center_x = (window.innerWidth / 2);
    center_y = (window.innerHeight / 2);
  }

  // Build obj of heigh/width params
  var clientParams = f_clientSize();
  obj.style.top = (center_y + clientParams.scrollTop) - Math.round(div_height/2) + 'px';
  obj.style.left = center_x - Math.round(div_width/2) + 'px';
}

function show_privacy_box(e, x, y)
{
  var box = xb_get_element('privacy_box')

  if (typeof(x) == 'undefined' || typeof(x) == 'undefined')
    position_at_event(box, 300, 200, e);
  else if (box)
  {
    var cursor = getPosition(e);
    var top = (cursor.y ? cursor.y : 0) + (y ? y : 0);
    var left = (cursor.x ? cursor.x : 0)+ (x ? x : 0);
    box.style.top = top + 'px';
    box.style.left = left + 'px';
  }

  unhide(box);
}

function show_property_indicator_box(e)
{
  position_at_event('property_indicator_box', 300, 200, e);
  unhide('property_indicator_box');
}

// We don't use this on details page anymore
// TODO: Delete if not used
function show_error_box(e)
{
  close_modals_except('error_box');
  // if listings page, hoist the box out of the property details div
  if (typeof(pdtl) != 'undefined')
  {
    var the_box = xb_get_element('error_box');
    the_box.parentNode.removeChild(the_box);
    document.body.appendChild(the_box);
  }
  position_at_event('error_box', 300, 600, e);
  unhide('error_box');
}

/**
@param e        event fired
@param state    can be login or anything else
@param center   position box at center of screen
@param pos      specified position in format { x:? , y:? }
@param suffix   suffix for the id of the login box (ex: id="login_box_2" --> suffix is "_2")
@return nothing
**/
function show_login(e, state, center, pos, suffix, addl)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
  var the_box = xb_get_element('login_box' + suffix);

  // if login_box not found, might be because suffix is wrong
  var i = 0;
  while (the_box == null && i < 5)
  {
    suffix = '_' + i;
    the_box = xb_get_element('login_box' + suffix);
    i++;
  }

  // if login_box still not found, redirect to login/register/password page
  if (the_box == null)
  {
    if (state.indexOf('page') == -1)
    {
      toggle_login_form(state + '_page', '', addl);
    }
    else
    {
      toggle_login_form(state, '', addl);
    }
    return;
  }

  // place the box
  if (typeof(pos) != 'undefined' && pos)
  {
    close_modals_except(the_box);
    // the box has an inside div that hass the content with a -4px margin
    var top = pos.y ? pos.y - 4 : '0';
    var left = pos.x ? pos.x - 4 : '0';

    // Yes, we call set_save_property_links twice, the first prevents page scroll hopping,
    // the second fixes offscreen popup loads
    set_safe_popup_coords(null, the_box, left, top);
    toggle_login_form(state, suffix, addl);
    var coords = set_safe_popup_coords(null, the_box, left, top);

    unhide(the_box, '')
    var dim = get_object_dimensions(the_box)
    var the_w = dim.width;
    var the_h = dim.height;

    DOMUtils.hide_selects_by_el(the_box, coords['left'], coords['top'], the_w, the_h);
  }
  // show box near event
  else
  {
    unhide(the_box, '')
    toggle_login_form(state, suffix, addl);

    if (typeof(e) != 'undefined' && e)
    {
      show_pos_menu(e, the_box, -25, 10);
    }
    else
    {
      if (center == true)
      {
        var dim = get_object_dimensions(the_box)
        var the_w = dim.width;
        var the_h = dim.height;

        position_at_center(the_box, the_w, the_h);
      }
      else
      {
        the_box.style.right = '0px';
        the_box.style.top = '20px';
      }

      close_modals_except(the_box);
    }
  }
}

function show_login_link()
{
  add_class('logout_tg_mbnd_link', 'hidden');
  add_class('top_blog_my_mbnd', 'hidden');
  add_class('top_blog_my_mbnd_name', 'hidden');

  //hide conditional nav items
  add_class('nav_my_homes_srp_link', 'hidden');
  add_class('nav_my_searches_srp_link', 'hidden');
  add_class('nav_view_profile_link', 'hidden');
  add_class('nav_view_QnA_link', 'hidden');

  remove_class('login_tg_mbnd_link', 'hidden');
  remove_class('register_link', 'hidden');
}

// WARNING: if you're going to use this function make sure that the IDs don't have suffixes
function show_logout()
{
  hide('login_box');
}

function show_logout_link()
{
   new_populate_my_trulia();

   remove_class('logout_tg_mbnd_link', 'hidden');
   remove_class('top_blog_my_mbnd', 'hidden');
   remove_class('top_blog_my_mbnd_name', 'hidden');

   //unhide conditional nav items
   var my_homes_link = xb_get_element('nav_my_homes_srp_link');
   if (my_homes_link)
   {
     // parent for both my_xyz_link is the same ul
     var my_homes_link_parent = my_homes_link.parentNode;
     remove_class(my_homes_link_parent, 'hidden');
     remove_class(my_homes_link, 'hidden');
   }
   remove_class('nav_my_searches_srp_link', 'hidden');

   var view_profile_link = xb_get_element('nav_view_profile_link');
   if (view_profile_link)
   {
     // parent for both view_xyz_link is the same ul
     var view_profile_link_parent = view_profile_link.parentNode;
     remove_class(view_profile_link_parent, 'hidden');
     remove_class(view_profile_link, 'hidden');
   }
   remove_class('nav_view_QnA_link', 'hidden');

   add_class('login_tg_mbnd_link', 'hidden');
   add_class('register_link' , 'hidden');
}

// my trulia pulldown - 4/1/08 jake
function new_populate_my_trulia()
{
  var my_trulia = xb_get_element('top_nav_my_trulia_links');
  if (!my_trulia)
    return false;

  var name = xb_get_element('blogtab_my_mbnd_username');
  var top_blog_my_mbnd = xb_get_element('top_blog_my_mbnd');
  var link_array_length = 3;
  var req = getHTTPObject();

  my_trulia.innerHTML = '';

  req.open("GET", site_root + 'q_populate_my_trulia.php@ts=' + new Date().valueOf());
  req.onreadystatechange =
    function()
    {
      if (req.readyState == 4)
      {
        var response = req.responseText;

        if (response)
        {
          eval('var returned_data=' + response);

          if (returned_data['my_trulia_home_link'] && top_blog_my_mbnd)
          {
            var a_tags = top_blog_my_mbnd.getElementsByTagName('A');

            for (var i = 0; i < a_tags.length; i++)
            {
              if (has_class(a_tags[i], 'my_account_link') && has_class(a_tags[i], 'menu_title'))
              {
                a_tags[i].href = returned_data['my_trulia_home_link'];
                break;
              }
            }
          }

          if (returned_data['link_html'])
            my_trulia.innerHTML = returned_data['link_html'];

          if (returned_data['name'] && name)
            name.innerHTML = returned_data['name'];
        }
      }
    }
  req.send(null);
}

function clear_login_form(suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
  clear('login_email' + suffix);
  clear('login_pass' + suffix);
  if ((fpwe = xb_get_element('forgot_password_email_field' + suffix)))
    fpwe.value = '';
  hide('login_box_msg' + suffix);
}

function do_logout(suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
  var l_http = getHTTPObject();
  d = new Date();
  l_http.open("GET", site_root + 'q_logout.php@ts=' + d.valueOf(), true);
  l_http.onreadystatechange =
    function()
    {
      if (l_http.readyState == 4)
      {
        do_post_logout(suffix);
      }
    }
  l_http.send(null);
  hide('login_box' + suffix);
  clear_login_form(suffix);
  show_login_link();
}
// erfld = status element to update
// flipfld = register prompt field
function do_email_password(erfld, suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }

  var fpef;
  if (!(fpef = xb_get_element('forgot_password_email_field' + suffix)))
    return false;

  var erfield = xb_get_element(erfld);
  var fpef_e = trim(fpef.value);
  if (is_valid_email(fpef_e) != EMAIL_OK)
  {
	
    erfield.innerHTML = 'Please enter a valid email address.';
    return false;
  }
  erfield.className = '';
  erfield.innerHTML = 'Please wait...';
  emp_http = getHTTPObject();
  d = new Date();
  emp_http.open("GET", site_root + 'q_email_password.php@ts=' + d.valueOf() + '&e=' + encodeURIComponent(fpef_e));
  emp_http.onreadystatechange =
    function()
    {
      if (emp_http.readyState == 4)
      {
        emp_resp = emp_http.responseText;
        if (emp_resp == '1')
        {
          if(xb_get_element('redirect_url_id'))
          {
            xb_get_element('login_email_field' + suffix).value = fpef_e;
            clear('login_password_field' + suffix);
            erfield.innerHTML = 'Password emailed. <a href="javascript:open_in_login_module(\''+suffix+'\', \'' + fpef_e + '\');">Log in</a>';
          }
          else if (xb_get_element('login_email_field' + suffix))
          {
            xb_get_element('login_email_field' + suffix).value = fpef_e;
            clear('login_password_field' + suffix);
            erfield.innerHTML = 'Password emailed. <a href="javascript:toggle_login_form(\'login\', \'' + suffix + '\');">Log in</a>';
          }
          else
            erfield.innerHTML = 'Password emailed. <a href="' + site_root + 'login/e/' + fpef_e + '">Log in</a>';
        }
        else if (emp_resp == '0')
        {
          erfield.className = 'ErrorMessage';
          erfield.innerHTML = "There was a problem emailing your password.";
        }
        else if (emp_resp == '-1')
        {
          erfield.className = 'ErrorMessage';
          erfield.innerHTML = NOT_EXIST_MSG;
        }
        else
        {
          erfield.innerHTML = '';
        }
      }
    }
  emp_http.send(null);
}

// USED only on SLS login page.
function open_in_login_module(suffix, email)
{
  hide_login_form(suffix);
  xb_get_element('sls_signup_module').style.display='none';
  xb_get_element('sls_login_module').style.display='block';
  xb_get_element('login_email_field_id').value = email;
}

// WARNING: if you're going to use this function make sure that the IDs don't have suffixes
function close_login_box()
{
  toggle_element('login_box');
  hide('login_box_msg');
}

// WARNING: if you're going to use this function make sure that the IDs don't have suffixes
function clear_login_forms(suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
  if (document.register_form)
    clear_form(document.register_form);
  if (document.login_form)
    clear_form(document.login_form);
  if (document.forgot_password_form)
    clear_form(document.forgot_password_form);
  clear('login_password_field' + suffix);
  clear('password_field' + suffix);
  clear('password_verify_field' + suffix);
  clear('forgot_password_email_field' + suffix);
  clear('flag_email' + suffix);
  clear('sp_s_email' + suffix);
}
function clear_form(the_form)
{
  the_form = xb_get_element(the_form);

  var the_type;
  for (var i = 0; i < the_form.elements.length; ++i)
  {
    the_type = the_form.elements[i].type;
    if (the_type == 'text' || the_type == 'password')
      the_form.elements[i].value = '';
  }
}
function clear_form_by_id(id)
{
  if (xb_get_element(id))
    xb_get_element(id).reset();
}
// pre-pops and disables email alerts if user logged in
// clears and enables email alerts if user not logged in
function set_email_alert_forms(active, email)
{
  var eaboxes = document.getElementsByTagName('input');
  if (!active)
  {
    for (var kk = 0; kk < eaboxes.length; ++kk)
    {
      if (eaboxes[kk].id && (eaboxes[kk].id).indexOf('ea_email_field') > -1)
      {
        eaboxes[kk].value = email;
        eaboxes[kk].disabled = true;
        eaboxes[kk].style.color = '#000000';
      }
    }
    hide('qa_email_alert_quick_email');
    if (xb_get_element('qa_email_alert_quick_email_id'))
      xb_get_element('qa_email_alert_quick_email_id').value = '-1';
  }
  else
  {
    for (var kk = 0; kk < eaboxes.length; ++kk)
    {
      if (eaboxes[kk].id && (eaboxes[kk].id).indexOf('ea_email_field') > -1)
      {
        eaboxes[kk].value = zaldef;
        eaboxes[kk].disabled = false;
        eaboxes[kk].style.color = '#999999';
      }
    }
    var qkemb = xb_get_element('qa_email_alert_quick_email_input');
    if (qkemb)
    {
      unhide('qa_email_alert_quick_email');
      qkemb.value = 'your email address';
      handle_edit_box(qkemb,'your email address', false);
    }
  }
  if (xb_get_element('email_alert_subscribe_status_1'))
    xb_get_element('email_alert_subscribe_status_1').innerHTML = '';
  if (xb_get_element('email_alert_subscribe_status_2'))
    xb_get_element('email_alert_subscribe_status_2').innerHTML = '';
}

// inspects and sets any save/added property link
function set_save_property_links(saved)
{
  var links = get_ids_with_prefix('a', 'save_property_link');
  var pid = '';
  var the_link;
  for (var i = 0; i < links.length; ++i)
  {
    the_link = xb_get_element(links[i]);
    pid = links[i].replace(/\D/g, '');
    toggle_link(pid, (saved.indexOf(','+pid+',') >= 0));
  }
}
// resets Save this search

function reset_save_search()
{
   var save_search = xb_get_element('save_search_link');
   if (save_search)
   {
     save_search.innerHTML = z_link_labels.save_this_search;
     save_search.onclick = function(event) {subscribe(-1, event);return false;};
     // save_search.innerHTML = z_link_labels.save_this_search;
     // save_search.onclick = function() {subscribe(-1);};
     // save_search.href = 'javascript:void(0)';
   }
 }

// Is this a sponsored listing on the current page?
function isSponsoredListing(pid, return_index)
{
  if (typeof(return_index) == 'undefined')
    var return_index = false;

  var sponsored_listings = Array();
  if (typeof(zpgprop) != 'undefined')
  {
    var cache_index = (vw == 'pic' ? 'pic' : 'default');
    if (zpgprop.spl[cache_index][cpgn])
    {
      if (zpgprop.spl[cache_index][cpgn].length > 0)
      {
        var sponsored_listings_string = zpgprop.spl[cache_index][cpgn];
        if (sponsored_listings_string.indexOf(',') > -1)
        {
          sponsored_listings = sponsored_listings_string.split(',');
        }
        else
        {
          sponsored_listings.push(sponsored_listings_string);
        }

        if (in_array(pid, sponsored_listings))
        {
          if (return_index)
            return get_array_index(pid, sponsored_listings);
          else
            return true;
        }
      }
    }
  }

  if (return_index)
    return -1;
  else
    return false;
}

// Vars used to keep track of row highlight interaction, used in map.js
// to add a new one, add 'prefix':'base_class'
// AND
// make sure base_class also has base_class_active, base_class_highlight in the CSS
/*
var rowClassNames = {'row':'listing_cell',
                     'spl':'sponsored_listing_cell',
                     's_row_1':'table_layout_row_1',
                     'fs_row_1':'table_layout_row_1',
                     's_row_2':'table_layout_row_2',
                     'fs_row_2':'table_layout_row_2',
                     's_row_0':'table_layout_main_row',
                     'fs_row_0':'table_layout_main_row',
                     'spr':'listing_cell',
                     'rpr':'listing_cell',
                     'spr_cto':'listing_cell',
                     'rpr_cto':'listing_cell_cto_short',
                     'row_cto':'listing_cell_cto',
                     'spl':'sponsored_listing_cell_cto'
                     };
*/

                     //'most_expensive_1':'listing_cell_short_odd',
                     //'least_expensive_1':'listing_cell_short_odd',
                     //'newest_1':'listing_cell_short_odd',
                     //'most_bathrooms_1':'listing_cell_short_odd',
                     //'most_bedrooms_1':'listing_cell_short_odd',
                     //
                     //'most_expensive_2':'listing_cell_short_even',
                     //'least_expensive_2':'listing_cell_short_even',
                     //'newest_2':'listing_cell_short_even',
                     //'most_bathrooms_2':'listing_cell_short_even',
                     //'most_bedrooms_2':'listing_cell_short_even'
                     //};
/*
var currentHighlightedRow;
var currentClickedRowId;
var currentClickedRowType;
*/
/*
function hlr(pid, status, prefix, event_source)
{
  return;
  if (prefix != 'flrow' && prefix != 'row_cto' && prefix != 'spl_cto')
  {
    if (xb_get_element('icon_s_h'))
      var sh = pull_file(xb_get_element('icon_s_h').src);
    if (xb_get_element('icon_s_u'))
      var su = pull_file(xb_get_element('icon_s_u').src);
    if (xb_get_element('icon_u_h'))
      var uh = pull_file(xb_get_element('icon_u_h').src);
    if (xb_get_element('icon_u_u'))
      var uu = pull_file(xb_get_element('icon_u_u').src);
    var di = 'icon_d_h.gif';
    var i = xb_get_element((prefix && prefix == 'spr' ? 'd_icon_' : 'icon_') + pid);
    var ignore = (i && pull_file(i.src) == di);
    var is, is_saved;
    if (i)
    {
      is = pull_file(i.src);
      is_saved = (is == su || is == sh);
    }
    else
    {
      is = null;
      is_saved = false;
    }
    if (status == 'mouseover')
    {
      if (!ignore && i)
      {
        i.src = site_root + 'images/' + (is_saved ? sh : uh);
      }
    }
    else
    {
      if (!ignore && i)
      {
        i.src = site_root + 'images/' + (is_saved ? su : uu);
      }
    }
  }
  return;
}
*/

// ********************************
// misc utility functions
function pull_file(f)
{
  var parts = f.split('/');
  return parts[parts.length-1];
}
// use for highlight/unhighlight
function get_class_info(id, sponsored_listing)
{
  if (typeof(sponsored_listing) == 'undefined')
    var sponsored_listing = false;
  var sponsored_class_prefix = (sponsored_listing) ? 'sponsored_' : '';

  if (id.indexOf('flrow_') > -1)
    var sponsored_class_prefix = 'fl_';

  var class_addon = '';
  if (typeof(top5pids) != 'undefined')
    var class_addon = '_trulia_trends';

  var row_obj = xb_get_element(id);
  if (!row_obj)
    return null;
  var data = new Object;
  data.highlight_class = sponsored_class_prefix +'listing_highlight'+ class_addon;

  if (!row_obj.className)
  {
    data.cell_type = 'default';
    data.active_class = sponsored_class_prefix +'listing_active'+ class_addon;
    data.base_class = 'listing_cell' + class_addon;
  }
  else
  {
    data.cell_type = row_obj.className.indexOf('pic_view') > -1 ? 'picture' : 'default';
    data.active_class = (data.cell_type == 'picture' ? '' : sponsored_class_prefix +'listing_active'+ class_addon);
    data.base_class = row_obj.className.replace(data.highlight_class, '').replace(data.active_class, '');
  }
  return data;
}
// ********************************
// login/register forms
function LoginForm(suffix,addl)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
  this.suffix   = suffix;
  this.box      = xb_get_element('login_box'+suffix);
  this.lt       = xb_get_element('login_form'+suffix);
  this.rt       = xb_get_element('register_form'+suffix);
  this.pt       = xb_get_element('password_form'+suffix);
  this.pw_prompt = xb_get_element('enter_password_prompt'+suffix);
  this.reg_name    = xb_get_element('name_field'+suffix);
  this.reg_e    = xb_get_element('email_field'+suffix);
  this.reg_p    = xb_get_element('password_field'+suffix);
  this.log_e    = xb_get_element('login_email_field'+suffix);
  this.log_p    = xb_get_element('login_password_field'+suffix);
  this.pw_e     = xb_get_element('forgot_password_email_field'+suffix);
  this.pr_login = xb_get_element('login_prompt'+suffix);

  if (this.lt && this.lt.style && this.lt.style.display != 'none' && !has_class(this.lt, 'hidden'))
    this.now_showing = 'login';
  else if (this.pt && this.pt.style && this.pt.style.display != 'none' && !has_class(this.pt, 'hidden'))
    this.now_showing = 'password';
  else
    this.now_showing = 'signup';
  // additional parameters
  if (typeof addl !== 'undefined' && typeof addl.email !== 'undefined')
  {
    DOMUtils.set_value(this.log_e, addl.email);
    DOMUtils.set_value(this.pw_e, addl.email);
  }
}
LoginForm.prototype.show = function(force_state)
{
  unhide_selects();

  clear_element('reg_box_msg_txt' + this.suffix);
  clear_element('login_box_msg_txt' + this.suffix);
  clear_element('password_box_msg_txt' + this.suffix);

  // check or uncheck real estate pro status
  var re_pro = xb_get_element('us_pro' + this.suffix);
  if (re_pro)
  {
    if (typeof(login_next_step_global) != 'undefined' && login_next_step_global == 'claiming')
      re_pro.checked = true;
    else
      re_pro.checked = false;
  }

  add_class(this.pr_login, 'hidden')
  add_class('register_prompt' + this.suffix, 'hidden');

  if (this.box)
    this.box.style.zIndex = '9999';

  if (typeof(force_state) != 'undefined' && force_state != null && force_state != '')
  {
    switch(force_state)
    {
      case 'login':
        this.show_login();
        break;
      case 'password':
        this.show_password();
       break;
      case 'signup':
      default:
        this.show_register();
        break;
    }
  }
  else
  {
    if (this.now_showing != 'login')
      this.show_login();
    else
      this.show_register();
  }
}
LoginForm.prototype.show_login = function()
{
  add_class(this.rt, 'hidden');

  if (this.pt)
    add_class(this.pt, 'hidden');

  if (!remove_class(this.lt, 'hidden'))
    unhide(this.lt, '');

  // pre-fill email address
  if (is_valid_email(this.reg_e.value) == EMAIL_OK)
    this.log_e.value = this.reg_e.value;

  if (!remove_class(this.box, 'hidden') || this.box.style.display == 'none')
    unhide(this.box);

  if (this.log_e.value != '')
    this.log_p.focus();
  else
    this.log_e.focus();

  if (is_IE() && !is_IE7())
    DOMUtils.hide_selects_by_el(this.box, this.box.style.left, this.box.style.top);
}
LoginForm.prototype.show_register = function()
{
  add_class(this.lt, 'hidden');
  hide(this.pw_prompt);

  if(this.pt)
    add_class(this.pt, 'hidden');

  if (!remove_class(this.rt, 'hidden'))
    unhide(this.rt, '');

  // pre-fill email address if valid
  if (is_valid_email(this.log_e.value) == EMAIL_OK)
    this.reg_e.value = this.log_e.value;

  if (!remove_class(this.box, 'hidden') && this.box.style.display == 'none')
    unhide(this.box);

  if (this.reg_name.value != '')
  {
    if (this.reg_e.value != '')
      this.reg_p.focus();
    else
      this.reg_e.focus();
  }
  else
    this.reg_name.focus();

  if (is_IE() && !is_IE7())
    DOMUtils.hide_selects_by_el(this.box, this.box.style.left, this.box.style.top);
}
LoginForm.prototype.show_password = function()
{
  if (!this.pt)
    return;

  add_class(this.lt, 'hidden');
  add_class(this.rt, 'hidden');
  hide(this.pw_prompt);

  if (!remove_class(this.pt, 'hidden'))
    unhide(this.pt, '');

  // pre-fill email address if valid
  if (is_valid_email(this.reg_e.value) == EMAIL_OK)
    this.pw_e.value = this.reg_e.value;

  if (is_valid_email(this.log_e.value) == EMAIL_OK)
    this.pw_e.value = this.log_e.value;

  if (!remove_class(this.box, 'hidden') && this.box.style.display == 'none')
    unhide(this.box);

  this.pw_e.focus();

  if (is_IE() && !is_IE7())
    DOMUtils.hide_selects_by_el(this.box, this.box.style.left, this.box.style.top);
}

// show/hide login, register, forgot password forms
function toggle_login_form(force_state, suffix, addl)
{
  if (typeof(force_state) == 'undefined')
    force_state = null;
  var return_url = '';
  if (typeof addl !== 'undefined' && typeof addl.return_url !== 'undefined' && addl.return_url != '')
    return_url = 'r/'+addl.return_url;
  switch(force_state)
  {
    case 'login_page':
      go_to_page('login/'+return_url);
      break;
    case 'signup_page':
      go_to_page('signup/'+return_url);
      break;
    case 'password_page':
      go_to_page('forgot_password/'+return_url);
      break;
    default:
      if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
      var lf = new LoginForm(suffix,addl);
      lf.show(force_state);
  }
}

function hide_login_form(suffix)
{
   remove_class('register_form' + suffix, 'hidden');
   add_class('login_form' + suffix, 'hidden');
   add_class('password_form' + suffix, 'hidden');
   add_class('login_box' + suffix, 'hidden');
   unhide_selects();
}

function check_pw_match(suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }
  var p1 = xb_get_element('password_field'+suffix).value;
  var p2 = xb_get_element('password_verify_field'+suffix).value;
  var reg_box_msg_txt = xb_get_element('reg_box_msg_txt'+suffix);
  var error_msg = "The passwords don't match.";

  if (p1 != p2 && p1 != '' && p2 != '')
  {
    add_class(reg_box_msg_txt, 'ErrorMessage');
    reg_box_msg_txt.innerHTML = error_msg;
  }
  else if(reg_box_msg_txt.innerHTML == error_msg)
  {
    reg_box_msg_txt.innerHTML = '';
  }
}
// does user exist?
function check_exist(the_form, status_field, prompt_login)
{
  var pretty_email = trim(the_form.email.value).toLowerCase();
  if (pretty_email == '')
    return false;

  var exists = '';
  if (is_valid_email(pretty_email) == EMAIL_BAD_SYNTAX)
  {
    var stf = xb_get_element(status_field);
    if (stf)
    {
      stf.innerHTML = 'Please enter a valid email address.';
      stf.className = 'ErrorMessage';
    }

    return false;
  }

  var email_http = getHTTPObject();
  email_http.open("GET", site_root + "q_user_exist.php@e=" + encodeURIComponent(pretty_email), true);

  email_http.onreadystatechange =
    function()
    {
      if (email_http.readyState == 4)
      {
        var exists = email_http.responseText;
        update_email_status_field(exists, status_field, prompt_login);
      }
    }
  email_http.send(null);
}
// update feedback element
function update_email_status_field(user_exists, status_field, prompt_login)
{
  var pattern = /_[0-9]+$/;
  var match = status_field.match(pattern);
  var suffix = match ? match : '';

  var status_field_element = xb_get_element(status_field);
  var register_type = (status_field.indexOf('reg_box_msg_txt') > -1);
  var login_register_link_id = (register_type ? 'login_prompt' : 'register_prompt');
  var login_register_link = xb_get_element(login_register_link_id + suffix);
  var msg = '';

  // user does not exist
  if (user_exists == '-1' || user_exists == -999)
  {
    if (prompt_login)
    {
      // in register? show nothing
      if (register_type)
        msg = '';
      // in login? show error
      else
        msg = NOT_EXIST_MSG;
    }
    else
      msg = NOT_EXIST_MSG;
  }
  // user exists
  else if (user_exists == '0')
  {
    if (prompt_login)
    {
      // in register? show error
      if (register_type)
        msg = EXIST_MSG;
      // in login? show nothing
      else
        msg = '';
    }
  }
  else
    msg = '';

  // update the relevant element w/ message
  if (msg == '')
  {
    status_field_element.innerHTML = '';
    remove_class(status_field_element, 'ErrorMessage')
  }
  else
  {
    status_field_element.innerHTML = msg;
    add_class(status_field_element, 'ErrorMessage')
  }

  if (prompt_login)
  {
    // register form
    if (register_type)
    {
      // user exists
      if (user_exists == '0')
      {
        //if (!remove_class(login_register_link, 'hidden'))
          //unhide(login_register_link);

        // pre-fill email on the flip side
        var login_email_field = xb_get_element('login_email_field' + suffix);
        var email_field = xb_get_element('email_field' + suffix);
        if (login_email_field && email_field )
        {
          login_email_field.value = email_field.value;
        }
      }
      // user doesn't exist
      else
      {
        add_class(login_register_link, 'hidden');

        // clear email on the flip side (no logging in a user that we know doesn't exist)
        clear('login_email_field' + suffix);
      }
    }
    // login form
    else
    {
      var ddd = xb_get_element('email_field' + suffix);
      // user doesn't exist
      if (user_exists == '-1')
      {
        if (!remove_class(login_register_link, 'hidden'))
          unhide(login_register_link);

        // pre-fill email on the flip side
        if (ddd)
          ddd.value = xb_get_element('login_email_field' + suffix).value;
      }
      // user exists
      else
      {
        add_class(login_register_link, 'hidden');

        // clear email on the flip side (no creating a user that we know exists)
        if (ddd)
          ddd.value = '';
      }
    }
  }
}
// gets the value of a radiobutton group
function get_radio_value(btn)
{
  var val = null;
  for (var i = 0; i < btn.length; ++i)
  {
    if (btn[i].checked)
    {
      val = btn[i].value;
      break;
    }
  }
  return val;
}

function submit_register_form(frm, suffix, is_post)
{
  var frm = xb_get_element(frm);

  if (frm)
  {
    if(is_post === true)
    {
      // nested if so that doesn't run the else if validate_register return false
      if (validate_register(frm, suffix))
      {
        eval('document.forms.' + frm.name + '.submit();');
        // alert(frm.phone.value); jsdfhg@sjfgh.cds
      }

    }
    else
      do_register(frm, suffix);
  }
  if(frm.contact_me_field.checked)
  {
    o_track_email_signup('newsletter');
  }
  return false;
}

function submit_login_form(frm, suffix, is_post)
{
  var frm = xb_get_element(frm);

  if (frm)
  {
    if(is_post === true)
    {
      // nested if so that doesn't run the else if validate_login return false
      if(validate_login(frm, suffix))
      {
        eval('document.forms.' + frm.name + '.submit();');
      }
    }
    else
      do_login(frm, suffix);
  }

  return false;
}

// validates new account form
function validate_register(frm, suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }

  var reg_email, reg_password, reg_password_verify, reg_name, reg_location,  reg_auto_location ,reg_status;
  if (typeof(frm) != 'undefined' && frm != null)
  {
    reg_email             = trim(frm.email.value).toLowerCase();
    reg_password          = frm.password.value;
    reg_password_verify   = frm.password_verify.value;
    reg_name              = trim(frm.name_field.value);
    reg_location          = trim(frm.location.value);
    reg_auto_location     = frm.autocomplete_location.value;
    reg_status            = get_radio_value(frm.user_status);
  }
  else
  {
    reg_email             = trim(xb_get_element('email_field' + suffix).value).toLowerCase();
    reg_password          = xb_get_element('password_field' + suffix).value;
    reg_password_verify   = xb_get_element('password_verify_field' + suffix).value;
    reg_name              = trim(xb_get_element('name_field' + suffix).value);
    reg_location          = trim(xb_get_element('location_field' + suffix).value);
    reg_auto_location     = xb_get_element('autocomplete_location' + suffix).value;
    reg_status            = 'radio_other';
  }

  // on error these are the fields you can put focus on
  var focus_field_ids = {
    email:       'email_field'+suffix,
    pass:        'password_field'+suffix,
    pass_verify: 'password_verify_field'+suffix,
    name:        'name_field'+suffix,
    location:    'location_field'+suffix
  };

  // validate
  var validate_error_message = '';
  var reg_errors = new Array();
  var field_to_focus = '';

  if (is_valid_email(reg_email) == EMAIL_BAD_SYNTAX)
  {
    reg_errors.push('Please enter a valid email address, such as name@domain.com.');
    field_to_focus = focus_field_ids.email;
  }
  else
  {
    if (reg_email == '')
    {
      reg_errors.push('Please enter an email address.');
      field_to_focus = focus_field_ids.email;
    }
  }
  if (reg_password == '')
  {
    reg_errors.push('Please enter a password.');
    if (field_to_focus == '')
      field_to_focus = focus_field_ids.pass;
  }
  if (reg_password_verify == '')
  {
    reg_errors.push('Please enter your password again for verification.');
    if (field_to_focus == '')
      field_to_focus = focus_field_ids.pass_verify;
  }
  if (reg_name == '')
  {
    reg_errors.push('Please enter a name or nickname.');
    if (field_to_focus == '')
      field_to_focus = focus_field_ids.name_field;
  }
  if (!reg_auto_location || reg_auto_location == '0')
  {
    reg_errors.push('Please enter a valid location.');
    if (field_to_focus == '')
      field_to_focus = focus_field_ids.location;

    unhide('outside_us_error'+suffix, '');

  }
/* no error on autocompelte field - only about validation is needed
  if (reg_location == '')
  {
    reg_errors.push('Please enter a location.');
    if (field_to_focus == '')
      field_to_focus = focus_field_ids.location;
  }
*/
  if (!reg_status)
  {
    reg_errors.push('Please pick a description for yourself.');
  }
  rgl = reg_password.length;
  rglv = reg_password_verify.length;
  if (reg_password != '' && reg_password_verify != '' && reg_password != reg_password_verify)
  {
    reg_errors.push('The passwords you entered do not match.');
    if (field_to_focus == '')
      field_to_focus = focus_field_ids.pass;
  }
  else
  {
    if (rgl > 0 && (rgl < 5 || rgl > 15) || (rglv > 0 && (rglv < 5 || rglv > 15)))
    {
      reg_errors.push('Your password should be between 5 and 15 characters.');
      if (field_to_focus == '')
        field_to_focus = focus_field_ids.pass;
    }
  }
  if (  reg_password != '' && reg_password_verify != '' &&
        (reg_password.toLowerCase() == reg_email.toLowerCase() ||
        reg_password.toLowerCase() == reg_email.toLowerCase().substring(0, reg_email.indexOf('@'))) )
  {
    reg_errors.push('Your password is too easy to guess. Please try a different one.');
    if (field_to_focus == '')
      field_to_focus = focus_field_ids.pass;
  }
  if (reg_errors.length > 0)
  {
    for (i = 0; i < reg_errors.length; ++i)
      validate_error_message += reg_errors[i] + '\n';
    alert(validate_error_message);

    var ff = xb_get_element(field_to_focus);
    if (field_to_focus != '' && ff)
      ff.focus();
    return false;
  }
  else
    return true;
}

// international user: select Outside US option

function outside_US_reg_form(suffix)
{
  var loc = xb_get_element('location_field'+suffix);
  var auto_loc = xb_get_element('autocomplete_location'+suffix);
  if (loc && auto_loc)
  {
    if (loc.disabled)
    {
      loc.value = '';
      loc.disabled=false;
      auto_loc.value='';
    }
    else
    {
      loc.value = 'Outside U.S.';
      loc.disabled=true;
      auto_loc.value='-1';
    }
  }
}

// validates login form
function validate_login(frm, suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }

  var email_field, password_field;
  if (typeof(frm) != 'undefined')
  {
    email_field = frm.email;
    password_field = frm.password;
  }
  else
  {
    email_field = xb_get_element('login_email_field' + suffix);
    if (!email_field)
      email_field = xb_get_element('login_email' + suffix);

    password_field = xb_get_element('login_password_field' + suffix);
    if (!password_field)
      password_field = xb_get_element('login_pass' + suffix);
  }
  var email = trim(email_field.value).toLowerCase();
  var password = password_field.value;

  var validate_error_message = '';
  var errors = new Array();

  // blank or malformed fields
  if (is_valid_email(email) == EMAIL_BAD_SYNTAX)
  {
    errors.push('Please enter a valid email address, such as name@domain.com.');
    field_to_focus = email_field;
  }
  else
  {
    if (email == '')
    {
      errors.push('Please enter an email address.');
      field_to_focus = email_field;
    }
  }

  if (password == '')
  {
    errors.push('Please enter a password.');
    if (field_to_focus == '')
      field_to_focus = password_field;
  }

  if (errors.length > 0)
  {
    for (i = 0; i < errors.length; ++i)
      validate_error_message += errors[i] + '\n';
    alert(validate_error_message);
    field_to_focus.focus();
    return false;
  }
  else
    return true;
}
// signs user up

function do_register(frm, suffix)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }

  if (!xb_get_element('email_field'+suffix) ||
      !xb_get_element('password_field'+suffix) ||
      !xb_get_element('password_verify_field'+suffix) ||
      !xb_get_element('contact_me_field'+suffix) ||
      !xb_get_element('name_field'+suffix) ||
      !xb_get_element('location_field'+suffix))
    return false;

  if (!validate_register(frm, suffix))
    return false;

  // turn off the button
  var the_btn_c = xb_get_element('reg_btn'+suffix);
  if (the_btn_c)
    the_btn_c.disabled = true;

  var tstf = xb_get_element('reg_box_msg_txt'+suffix);
  if (tstf)
  {
    tstf.innerHTML = 'Please wait...';
    unhide(tstf);
  }

  var e = trim(xb_get_element('email_field'+suffix).value);
  var p = xb_get_element('password_field'+suffix).value;
  var pv = xb_get_element('password_verify_field'+suffix).value;
  var newsletter_cb = xb_get_element('contact_me_field'+suffix);
  var c = 0;

  if (newsletter_cb.type == 'checkbox')
    c = newsletter_cb.checked ? 1 : 0;
  else
    c = newsletter_cb.value;

  var n = trim(xb_get_element('name_field'+suffix).value);
  var l = trim(xb_get_element('location_field'+suffix).value);

  // auto complete location_id
  var location_auto =  xb_get_element('autocomplete_location'+suffix);
  var la = (location_auto && location_auto.value)?  location_auto.value : '';
  var us = '';// INSERT USER STATUS HERE

  if (typeof(frm.user_status) != 'undefined')
    us = get_radio_value(frm.user_status);
  else
    us = 'radio_other';

  if (typeof(login_next_step_global) == 'undefined')
    login_next_step_global = '';

  var rv = false;
  var http = getHTTPObject();
  var the_url = site_root + 'q_register.php';
  var arg_str = 'tp=ur' +
                '&e=' + encodeURIComponent(e) +
                '&p=' + encodeURIComponent(p) +
                '&pv=' + encodeURIComponent(pv) +
                '&c=' + c +
                '&n=' + encodeURIComponent(n) +
                '&l=' + encodeURIComponent(l) +
                '&us=' + encodeURIComponent(us) +
                '&la=' + encodeURIComponent(la) +
                '&ns=' + encodeURIComponent(login_next_step_global) +
                '&ph=' + encodeURIComponent(frm.phone);

  if (typeof(_DETAILS_PROPERTY_ADDRESS) != 'undefined')
    arg_str += '&pa=' +  _DETAILS_PROPERTY_ADDRESS;

  http.open("POST", the_url, true);
  http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  http.send(arg_str);
  http.onreadystatechange =
    function()
    {
      if (http.readyState == 4)
      {
        var r = http.responseText;
        if (the_btn_c)
          the_btn_c.disabled = false;

        if (r)
        {
          if (trim(r) == '1')
          {
            rv = true;
            if (tstf)
            {
              tstf.innerHTML = '&nbsp;';
              hide(tstf.id);
            }
            // clear the form
            clear_form(xb_get_element('register_form'+suffix));

            if (xb_get_element('contact_me_field'+suffix) && typeof('contact_me_field'+suffix) == 'checkbox')
              xb_get_element('contact_me_field'+suffix).checked = true;

            do_post_login(e, '', suffix);
            hide('reg_box_msg_txt' + suffix);

            // track login event
            o_track_login_event();
          }
          else if (trim(r) == '0')
          {
            add_class('login_prompt'+suffix, 'hidden');
            xb_get_element('password_field'+suffix).value = '';
            xb_get_element('password_verify_field'+suffix).value = '';
            xb_get_element('password_field'+suffix).focus();
            xb_get_element('reg_box_msg_txt'+suffix).innerHTML = 'Wrong password.<span style="background-color:white;"> <a href="javascript:toggle_login_form(\'password\',\'' + suffix + '\');">Forgot your password?</a></span>';
            unhide('reg_box_msg_txt' + suffix);
            unhide('login_box_msg'+suffix);
          }
        }
        else
        {
          hide('reg_box_msg_txt' + suffix);
          alert('An error occurred during the sign-up process.');
        }
      }
    }
  return rv;
}

// misc utility functions
function go_to_page(page)
{
  if (typeof(page) != 'undefined')
    window.location.href = site_root + page;
}

// Used for property row onclick redirects
function redirect(url)
{
  if (typeof(url) != 'undefined')
    window.location.href = url;
}
function resetif(id, resetval, ifval)
{
  var e = xb_get_element(id);
  if (e && (e.value == ifval || trim(e.value) == ''))
    e.value = resetval;
}
function clearif(id,val)
{
  var e = xb_get_element(id);
  if (e && e.value == val)
    e.value = '';
}
// todo xxx only used by old advanched search
function pull_select_value(sid, type)
{
  var s = xb_get_element(sid);
  if (!s)
    return '';
  var e = s.options[s.selectedIndex];
  if (type == 'text')
    return e.text;
  else
    return e.value;
}

// not used as of April 08
// unhides the selects inside an element for ie
// @param   el      required  the element's whose selects you want to unhide
// @param   display optional  the display you want for the unhidden selects
// @return  nothing
// function unhide_el_selects(el, display)
// {
//   if (!is_IE() || is_IE7())
//     return;
//
//   // check valid parameter
//   el = xb_get_element(el);
//   if (!el)
//     return;
//
//   if (typeof(display) == 'undefined' || !display)
//   {
//     display = '';
//   }
//
//   var selects = el.getElementsByTagName('select');
//
//   if (selects)
//   {
//     for (var i = 0; i < selects.length; i++)
//     {
//       selects[i].style.display = display;
//     }
//   }
// }

function unhide_selects()
{
  if (!is_IE() || is_IE7())
    return;

  var iframe = xb_get_element('ie_iframe');

  if (iframe)
    iframe.parentNode.removeChild(iframe);
  else
  {
    var s = document.getElementsByTagName('select');
    for (var i = 0; i < s.length; ++i)
      s[i].style.display = '';
  }
}

function findPosX(el)
{
  var curleft = 0;

  // check valid parameter
  el = xb_get_element(el);
  if (!el)
    return;

  if (el.offsetParent)
  {
    while (el.offsetParent)
    {
      curleft += el.offsetLeft
      el = el.offsetParent;
    }
  }
  else if (el.x)
    curleft += el.x;
  return curleft;
}
function findPosY(el)
{
  var curtop = 0;

  // check valid parameter
  el = xb_get_element(el);
  if (!el)
    return;

  if (el.offsetParent)
  {
    while (el.offsetParent)
    {
      curtop += el.offsetTop
      el = el.offsetParent;
    }
  }
  else if (el.y)
    curtop += el.y;
  return curtop;
}

/**
from: http://hartshorne.ca/2006/01/23/javascript_cursor_position/ with permission
If the event position is wrong it might be because a parent element is relatively positioned
@param    e   event fired
@return       array cursor --> cursor.x, cursor.y
**/
function getPosition(e)
{
  e = e || window.event;

  var cursor = { x:0, y:0 };

  if (e.pageX || e.pageY)
  {
      cursor.x = e.pageX;
      cursor.y = e.pageY;
  }
  else
  {
    var de = document.documentElement;
    var b = document.body;
    // alert('cx: '+e.clientX+' cy: '+e.clientY+' sl: '+(de.scrollLeft || b.scrollLeft)+ ' cl: '+(de.clientLeft || 0)+' st: '+(de.scrollTop || b.scrollTop)+ ' ct: '+(de.clientTop || 0));
    cursor.x = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
    cursor.y = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
  }

  return cursor;
}

/**
READ THIS: use getPosition() instead
TODO: delete from site
@param    e   event fired
@return       array c --> c.x, c.y
**/
function get_eloc(e)
{
  var c = new Object;
  var clientSize = f_clientSize();

  c.ww = clientSize.width;
  c.wh = clientSize.height;
  c.scrollTop = clientSize.scrollTop;
  c.scrollLeft = clientSize.scrollLeft;

  var cursor = getPosition(e);
  c.x = cursor.x;
  c.y = cursor.y;

  return c;
}
// captures event coords into global var zevt
function capture_coords(e)
{
  // zevt = get_eloc(e);
  zevt = getPosition(e);
}
// show login invite box
function show_li(pid, force)
{
  if (!zlishow && force != 1)
    return;
  var the_box = xb_get_element('li_box');
  if (!the_box)
    return;

  // login to save a search
  if (pid == 'search')
  {
    var a = xb_get_element('pad_' + pid) ? xb_get_element('pad_' + pid).innerHTML.replace(/&nbsp;/g, ' ') : 'This property';
    xb_get_element('li_text').innerHTML = 'You need a ' +  qpn_NAMES.mytrulia + ' account to save searches.';
    unhide('li_dont_show');
  }
  // login when saving a property
  else
  {
    var a = xb_get_element('pad_' + pid) ? xb_get_element('pad_' + pid).innerHTML.replace(/&nbsp;/g, ' ') : 'This property';
    xb_get_element('li_text').innerHTML = '<strong>' + a + '</strong> has been saved to <a href="' + site_root + 'account/properties/">'  + '</a>.';
    unhide('li_dont_show');
  }
  var the_w = 300;
  var the_h = 250;
  // fallback to center
  if (!zevt)
  {
    zevt = new Object;
    var cs = f_clientSize();
    zevt.x = (cs.width - the_w) / 2;
    zevt.y = (cs.height - the_h) / 2;
    zevt.ww = cs.width;
  }
  var posx = zevt.x;
  var posy = zevt.y;
  var ww = zevt.ww;
  if (posx + the_w > ww)
    posx = ww - the_w;
  the_box.style.position = 'absolute';
  the_box.style.top = posy + 'px';
  the_box.style.left = posx + 'px';
  unhide(the_box.id);
}
// sets whether or not to show a box
function set_show_prefs(box_id,cb_id)
{
  var box = xb_get_element(box_id);
  var cb = xb_get_element(cb_id);
  if (!box || !cb)
    return;
  else
    setCookie('show_' + box_id, cb.checked ? '0' : '1');
  if (box_id == 'li_box')
    zlishow = !cb.checked;
}

function error_type_change(error_checkbox)
{
  var selected_index = error_checkbox.selectedIndex;
  var property_detail_fields_avail = xb_get_element('property_detail_fields');
  var property_remove_this_listing_avail = xb_get_element('property_remove_this_listing');
  var flag_property_avail = xb_get_element('flag_remove')
  if(selected_index == 1 || selected_index == 3)
  {
    if(property_detail_fields_avail)
      hide('property_detail_fields');
    if(property_remove_this_listing_avail)
      unhide('property_remove_this_listing', 'block');
    if(flag_property_avail)
      flag_property_avail.checked = false;
  }
  else if(selected_index == 2 || selected_index == 6)
  {
    if(property_detail_fields_avail)
      unhide('property_detail_fields', 'block');
    if(property_remove_this_listing_avail)
      hide('property_remove_this_listing');
    if(flag_property_avail)
      flag_property_avail.checked = false;
  }
  else
  {
    if(property_detail_fields_avail)
      hide('property_detail_fields');
    if(property_remove_this_listing_avail)
      hide('property_remove_this_listing');
    if(flag_property_avail)
      flag_property_avail.checked = false;
  }
}

// report error
function do_report_error()
{
  var status_box = xb_get_element('error_box_status_msg');
  // must select error type
  var the_sel = xb_get_element('flag_type');

  if (!the_sel)
    return;
  var invalid_values_non_numeric = new Array('property_detail_type', 'property_detail_listing_type');
  // array of possible invalid property data values submitted via this form
  var invalid_values_numeric = new Array('property_detail_price','property_detail_beds','property_detail_baths','property_detail_sqft',
                                         'property_detail_lot_size','property_detail_year_built');
  if (the_sel.selectedIndex == 0)
  {
    alert('Please select an error type.');
    xb_get_element('flag_type').focus();
    return false;
  }

  // if email, make sure it's ok
  var email = trim(xb_get_element('flag_email').value);
  if (email != '' && is_valid_email(email) != EMAIL_OK)
  {
    bad_email_alert();
    xb_get_element('flag_email').focus();
    return false;
  }
  var not_valid_user_inputs = new Array();
  var istp = 0;
  if(xb_get_element('istp'))
    istp = xb_get_element('istp').value;

  var d = new Date();
  var the_url = site_root + 'flag_incorrect_property.php';
  var arg_str = 's=' + d.valueOf() +
                '&flag_type=' + encodeURIComponent(xb_get_element('flag_type').options[xb_get_element('flag_type').selectedIndex].value) + '&email=' + encodeURIComponent(trim(xb_get_element('flag_email').value)) + '&message=' + encodeURIComponent(trim(xb_get_element('flag_details').value)) + '&propertyId=' + encodeURIComponent(xb_get_element('flag_property_id').value) + '&siteId=' + encodeURIComponent(xb_get_element('flag_site_id').value) + (xb_get_element('flag_remove').checked ? '&remove=1' : '');

  var selected_flag_type = xb_get_element('flag_type').selectedIndex;
  // if select 'Other' as error type, make sure user enters the details
  if(selected_flag_type == 8)
  {
    if(xb_get_element('flag_details') && xb_get_element('flag_details').value == '')
    {
      alert('Please enter the details');
      xb_get_element('flag_details').focus();
      return false;
    }
  }
  else if(selected_flag_type == 2 || selected_flag_type == 6)
  {
     // Check for non-numeric first
     for(var index = 0; index < invalid_values_non_numeric.length; index++)
     {
       var is_valid_param = true;
       var new_value = invalid_values_non_numeric[index];
       var org_value = invalid_values_non_numeric[index]+'_org';
       if(xb_get_element(new_value) && xb_get_element(org_value))
       {
         new_value_value = trim(xb_get_element(new_value).value);
         org_value_value = trim(xb_get_element(org_value).value);
         if(org_value_value != new_value_value)
           arg_str += "&"+org_value+"="+encodeURIComponent(org_value_value)+"&"+new_value+"="+encodeURIComponent(new_value_value);
       }
     }
     for(var index = 0; index < invalid_values_numeric.length; index++)
    {
      var is_valid_param = true;
      var new_value = invalid_values_numeric[index];
      var org_value = invalid_values_numeric[index]+'_org';
      if(xb_get_element(new_value) && xb_get_element(org_value))
      {
        new_value_value = trim(xb_get_element(new_value).value);
        if(new_value_value != '' && isNaN(parseFloat(new_value_value)))
        {
          is_valid_param = false;
          var this_input_error_msg = '';
          if(new_value == 'property_detail_price')
            this_input_error_msg = 'Property Price';
          else if(new_value == 'property_detail_beds')
            this_input_error_msg = 'Property Number of Bedrooms';
          else if(new_value == 'property_detail_baths')
            this_input_error_msg = 'Property Number of Bathrooms';
          else if(new_value == 'property_detail_sqft')
            this_input_error_msg = 'Property Square Feet Size';
          else if(new_value == 'property_detail_lot_size')
            this_input_error_msg = 'Property Lot Size';
          else if(new_value == 'property_detail_year_built')
            this_input_error_msg = 'Property Year Built';
          this_input_error_msg += ' Must be a Number';
          not_valid_user_inputs.push(this_input_error_msg);
        }
        else
        {
          org_value_value = trim(xb_get_element(org_value).value);
          if(org_value == 'property_detail_lot_size')
            org_value_value.replace(/acres/g, '');
          // Remove the , since pp might enter 2000000 instead of 2,000,000
          org_value_value = org_value_value.replace(/[,]/g, '');
          new_value_value = new_value_value.replace(/[,]/g, '');
          // Convert . to _ to prevent URL issue
          org_value_value = org_value_value.replace(/[.]/g, '_');
          new_value_value = new_value_value.replace(/[.]/g, '_');
          // Convert / to __ to prevent URL issue
          org_value_value = org_value_value.replace(/[\/]/g, '__');
          new_value_value = new_value_value.replace(/[\/]/g, '__');
          if(org_value_value != new_value_value)
            arg_str += "&"+org_value+"="+encodeURIComponent(org_value_value)+"&"+new_value+"="+encodeURIComponent(new_value_value);
        }
      }
    }
  }
  if(not_valid_user_inputs.length > 0)
  {
    var flag_report_error_msg = "Please correct these errors and try again.\n";
    flag_report_error_msg += not_valid_user_inputs.join("\n");
    alert(flag_report_error_msg);
    return false;
  }

  arg_str += '&istp='+istp;
  if(xb_get_element('user_type'))
  {
    var user_type = xb_get_element('user_type').value;
    if(user_type != '')
      arg_str += '&utype='+user_type;
  }
  hide('error_box_content');
  status_box.innerHTML = 'Please wait...';
  unhide('error_box_status');

  var http = getHTTPObject();
  http.open("POST", the_url, true);
  http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  http.send(arg_str);
  http.onreadystatechange =
    function()
    {
      if (http.readyState == 4)
      {
        var rt = parseInt(http.responseText.replace(/\D+/,""));
        var msg;
        switch(rt)
        {
          case 1:
            msg = 'Thank you for bringing this error to ' + qpn_NAMES.site_possessive + " attention.<br />A member of the Trulia Team of support professionals will review your submission within <strong>24-48 hours</strong>.";
            break;
          case -1:
          default:
            msg = 'Thank you.';
            break;
        }
        /** Re-init the form Start **/
        var property_detail_fields_avail = xb_get_element('property_detail_fields');
        var property_remove_this_listing_avail = xb_get_element('property_remove_this_listing');
        var flag_property_avail = xb_get_element('flag_remove')
        var error_box_status_msg = xb_get_element('error_box_status_msg');
        var flag_type = xb_get_element('flag_type');
        var flag_details = xb_get_element('flag_details');
        var flag_remove =  xb_get_element('flag_remove');
        if(property_detail_fields_avail)
          hide('property_detail_fields');
        if(property_remove_this_listing_avail)
          hide('property_remove_this_listing');
        if(flag_property_avail)
          flag_property_avail.checked = false;
        if(error_box_status_msg)
          error_box_status_msg.innerHTML = msg;
        if(flag_type)
          flag_type.selectedIndex = 0;
        if(flag_details)
          flag_details.value = '';
        if(flag_remove)
          flag_remove.checked = false;
        for(var index = 0; index < invalid_values_numeric.length; index++)
        {
          var new_value = invalid_values_numeric[index];
          if(xb_get_element(new_value))
            xb_get_element(new_value).value = '';
        }
        for(var index = 0; index < invalid_values_non_numeric.length; index++)
        {
          var new_value = invalid_values_non_numeric[index];
          if(xb_get_element(new_value))
            xb_get_element(new_value).value = '';
        }
      }
    }
  DOMUtils.hide_selects_by_el('error_box');
}

function textCounter(elem,cntfield,maxlimit)
{
  if (elem.value.length > maxlimit) // if too long...trim it!
    elem.value = elem.value.substring(0, maxlimit);
// otherwise, update 'characters left' counter
  else
  {
    if(xb_get_element(cntfield))
      xb_get_element(cntfield).innerHTML = maxlimit - elem.value.length
  }
}

/**
  will display was this useful popup box
  @e - event
  @useful - either 'y' or 'n' - which button they selected
  @module - module near which these buttons are
*/
function show_useful_box(e, useful, module)
{
  var us_sub_module = xb_get_element('us_sub_module');
  var us_thanks = xb_get_element('us_thanks');
  var useful_form_box = xb_get_element('useful_form_box');

  //if already submitted for this module - show the thanks
  if(us_sub_module)
  {
    if(us_sub_module.value == module)
    {
      if(us_thanks)
        remove_class(us_thanks, 'hidden');
      if(useful_form_box)
        add_class(useful_form_box, 'hidden');
    }
    else
    {
      if(us_thanks)
        add_class(us_thanks, 'hidden');
      if(useful_form_box)
        remove_class(useful_form_box, 'hidden');

      var us_useful = xb_get_element('us_useful');
      var us_module = xb_get_element('us_module');
      if(us_useful)
        us_useful.value = (useful == 'y' ? 1 : 0);
      if(us_module)
        us_module.value = module;
    }
  }
  //customize where the popup appears
  var x = -140;
  var y = 10;
  if(module == 'above_map' || module == 'below_map' || module == 'guides' || module == 'homes_search')
    x = -330;

  show_pos_menu(e, 'useful_box', x, y);
  doNothing(e);
  return false;
}
/**
  used for handling comments form for was this useful
  @elem - form element
  @toggle - 0=hide box, 1=hide box and show thanks
  @e - event
*/
function submit_useful_box(elem, toggle, e)
{
  var us_sub_module = xb_get_element('us_sub_module');
  var us_module = xb_get_element('us_module');
  if(us_sub_module && us_module)
    us_sub_module.value = us_module.value;

  var city = xb_get_element('us_city').value;
  var state = xb_get_element('us_state_code').value;
  var module = xb_get_element('us_module').value;
  var useful = xb_get_element('us_useful').value;
  var comments = xb_get_element('us_message').value;
  var name = xb_get_element('us_name').value;
  var email = xb_get_element('us_email').value;

  //check email
  var valid_email = is_valid_email(email); //1=blank 2=incorrect 0=valid

  if(valid_email > 1)
  {
    if(toggle != 0) //if they're trying to close the form don't get caught on the email validity
    {
      if(xb_get_element('us_error'))
          remove_class('us_error', 'hidden');
      return false;
    }
    else
      email = '';
  }
  comments = comments.substr(0,200);
  var page = xb_get_element('us_page').value;
  var param = 'c='+city+'&s='+state+'&m='+module+'&u='+useful+'&co='+comments+'&p='+page+'&e='+email+'&n='+name;
  var url = site_root+'q_useful.php?'+param;
  var http = getHTTPObject();
  http.open("GET", url, true);
  http.send(null);

  //clear comment box
  var us_message = xb_get_element('us_message');
  if(us_message)
    us_message.value = '';

  if(toggle == '0')
  {
    toggle_menu(e, 'useful_box', 0);
  }
  else
  {
    var us_thanks = xb_get_element('us_thanks');
    if(us_thanks)
      remove_class(us_thanks, 'hidden');

    var useful_form_box = xb_get_element('useful_form_box');
    if(useful_form_box)
      add_class(useful_form_box, 'hidden');

    DOMUtils.hide_selects_by_el('useful_box');
  }
  return false;
}
/**
  will display need trulia pro help popup box
  @e - event
*/
function show_trulia_pro_help_box(e, useful, module)
{
  var sub_module = xb_get_element('trulia_pro_help_sub_module');
  var message_thanks = xb_get_element('trulia_pro_help_thanks');
  var form_box = xb_get_element('trulia_pro_help_form_box');

  //if already submitted for this module - show the thanks
  if(sub_module)
  {
    if(sub_module.value == module)
    {
      if(message_thanks)
        remove_class(message_thanks, 'hidden');
      if(form_box)
        add_class(form_box, 'hidden');
    }
    else
    {
      if(message_thanks)
        add_class(message_thanks, 'hidden');
      if(form_box)
        remove_class(form_box, 'hidden');

      var popup_module = xb_get_element('us_module');
      if(popup_module)
        popup_module.value = module;
    }
  }
  //customize where the popup appears
  var x = -140;
  var y = 10;

  show_pos_menu(e, 'pro_help_popup', x, y);
  doNothing(e);
  return false;
}
/**
  used for handling pro_help_popup form
  @elem - form element
  @toggle - 0=hide box, 1=hide box and show thanks
  @e - event
*/
function submit_pro_help_popup(elem, toggle, e)
{
  var sub_module = xb_get_element('trulia_pro_help_sub_module');
  var popup_module = xb_get_element('trulia_pro_help_module');
  if(sub_module && popup_module)
    sub_module.value = popup_module.value;

  var city = xb_get_element('trulia_pro_help_city').value;
  var state = xb_get_element('trulia_pro_help_state_code').value;
  var page = xb_get_element('trulia_pro_help_page').value;
  var comments = xb_get_element('trulia_pro_help_message').value;
  var name = xb_get_element('trulia_pro_help_name').value;
  var email = xb_get_element('trulia_pro_help_email').value;

  //alert(elem.value);

  //check email
  var valid_email = is_valid_email(email); //1=blank 2=incorrect 0=valid

  if(valid_email > 1)
  {
    if(toggle != 0) //if they're trying to close the form don't get caught on the email validity
    {
      if(xb_get_element('trulia_pro_help_error'))
          remove_class('trulia_pro_help_error', 'hidden');
      return false;
    }
    else
      email = '';
  }
  comments = comments.substr(0,200);
  var param = 'page='+page+'&comments='+comments+'&e='+email;
  var url = site_root+'q_email_customer_service.php?'+param;

  //clear comment box
  var form_message = xb_get_element('trulia_pro_help_message');
  if(form_message)
    form_message.value = '';

  if(toggle == '0')
  {
    // toggle is zero, implies cancel message
    toggle_menu(e, 'pro_help_popup', 0);
  }
  else
  {
    // submit form
    var http = getHTTPObject();
    http.open("GET", url, true);
    http.send(null);

    var pro_help_thanks = xb_get_element('trulia_pro_help_thanks');
    if(pro_help_thanks)
      remove_class(pro_help_thanks, 'hidden');
    var form_box = xb_get_element('trulia_pro_help_form_box');
    if(form_box)
    {
      add_class(form_box, 'hidden');
    }
    DOMUtils.hide_selects_by_el('pro_help_popup');
  }
  return false;
}
// email property page
function do_email_content(type,frm)
{
  // validate
  var s_name = frm.sp_s_name ? trim(frm.sp_s_name.value) : '';
  var s_email = frm.sp_s_email ? trim(frm.sp_s_email.value) : '';
  var r_emails = new Array();
  var tmp_email = '';

  // if we have multiple recipients
  if (typeof(frm.elements["sp_r_email[]"]) != 'undefined')
  {
    var els = frm.elements["sp_r_email[]"];
    var email_ct = 0;
    if (els.length)
    {
      for (var i = 0; i < els.length; i++)
      {
        tmp_email = trim(els[i].value);
        if (is_valid_email(tmp_email) == EMAIL_OK)
        {
          r_emails[email_ct] = tmp_email;
          ++email_ct;
        }
      }
    }
    else
    {
      tmp_email = trim(els.value);
      if (is_valid_email(tmp_email) == EMAIL_OK)
      {
        r_emails[email_ct] = tmp_email;
        ++email_ct;
      }
    }
  }
  else if (frm.elements["sp_r_email"])
  {
    tmp_email = trim(frm.elements["sp_r_email"].value);
    if (is_valid_email(tmp_email) == EMAIL_OK)
      r_emails[0] = tmp_email;
  }

  var message = trim(frm.sp_message.value);
  var ruid = typeof(frm.ruid)!='undefined' ? frm.ruid.value : 0;
  var title = typeof(frm.email_subject)!='undefined' ? trim(frm.email_subject.value) : 0;
  var copy_me = frm.sp_copy_me.checked ? 'Y' : '';

  if (type == 'property')
  {
    var propertyId = frm.sp_propertyId.value;
    var city = frm.sp_city.value;
    var state = frm.sp_state.value;
    var listing_type = frm.sp_listingtype.value;
  }
  else if (type == 'contact_agent')
    var propertyId = frm.sp_propertyId.value;
  else if (type == 'url')
    var url = frm.sp_url.value;

  // contact user has different validation criteria
  if (type == 'contact_user')
  {
    if (message == '')
    {
      alert('Please enter a message.');
      if(frm.sp_message)
        frm.sp_message.focus();
      return false;
    }
  }
  else
  {
    // recipient emails
    var num_rec_emails = 0;
    for (var i = 0; i < r_emails.length; ++i)
    {
      var r_email = r_emails[i];

      if (r_email != '' && is_valid_email(r_email) != EMAIL_OK)
      {
        bad_email_alert();
        if (typeof(frm['sp_r_email[]']) != 'undefined' && !frm['sp_r_email[]'].length)
          frm['sp_r_email[]'].focus();
        else if (typeof(frm.sp_r_email) != 'undefined')
          frm.sp_r_email.focus();
        return false;
      }
      else
      {
        if (r_email != '')
          ++num_rec_emails;
      }
    }
    if (num_rec_emails < 1)
    {
      bad_email_alert();
      if (typeof(frm['sp_r_email[]']) != 'undefined' && !frm['sp_r_email[]'].length)
        frm['sp_r_email[]'].focus();
      else if (typeof(frm.sp_r_email) != 'undefined')
        frm.sp_r_email.focus();

      return false;
    }
    // sender email
    if (s_email != '' && is_valid_email(s_email) != EMAIL_OK)
    {
      bad_email_alert();
      frm.sp_s_email.focus();
      return false;
    }
    // emails bad or missing
    if (s_email == '' || r_emails.length < 1)
    {
      bad_email_alert();
      if (r_emails.length < 1)
      {
        if (typeof(frm['sp_r_email[]']) != 'undefined' && !frm['sp_r_email[]'].length)
          frm['sp_r_email[]'].focus();
        else if (typeof(frm.sp_r_email) != 'undefined')
          frm.sp_r_email.focus();
      }
      else
        frm.sp_s_email.focus();
      return false;
    }
  }

  // submit
  var d = new Date();
  var the_url;
  var arg_str = 's=' + d.valueOf() + '&copyme=' + copy_me + '&s_email=' + encodeURIComponent(s_email) + '&s_name=' + encodeURIComponent(s_name) + '&message=' + encodeURIComponent(message);
  if (xb_get_element('sp_optin'))
    arg_str += xb_get_element('sp_optin').checked ? '&optin=Y' : '&optin=N';
  // '&r_email=' + encodeURIComponent(r_email) +
  for (var i = 0; i < r_emails.length; ++i)
    arg_str += '&r_email['+i+']='+encodeURIComponent(r_emails[i].toLowerCase());
  switch(type)
  {
    case 'property':
      the_url = site_root + 'email_page_property.php';
      arg_str += '&propertyId=' + encodeURIComponent(propertyId) + '&lt=' + encodeURIComponent(listing_type);
      if(listing_type != 'For Sale')
        arg_str += '&city=' + encodeURIComponent(city) + '&state=' + encodeURIComponent(state);
      break;
    case 'url':
      the_url = site_root + 'email_page_url.php';
      if (typeof(frm.qid) != 'undefined' && parseInt(frm.qid.value) > 0)
      {
        arg_str += '&qid=' + encodeURIComponent(frm.qid.value);
      }
      arg_str += '&u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(document.title);
      break;
    case 'property_list':
      the_url = site_root + 'email_list.php';
      arg_str += '&s=1';
      break;
    case 'contact_user':
      the_url = site_root + 'q_email_user.php';
      arg_str += '&s=1&ruid=' + encodeURIComponent(ruid) + '&t=' + encodeURIComponent(title);
      break;
    case 'contact_agent':
      the_url = site_root + 'q_email_agent.php';
      arg_str += '&propertyId=' + encodeURIComponent(propertyId);
      var phone = frm.sp_s_phone ? trim(frm.sp_s_phone.value) : '';
      if(phone !='')
        arg_str += '&phone=' + encodeURIComponent(phone);
      break;
    default:
      return;
  }

  var http = getHTTPObject();
  http.open("POST", the_url, true);
  http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  http.send(arg_str);
  http.onreadystatechange =
    function()
    {
      if (http.readyState == 4)
      {
        var status = http.responseText;
        var msg;
        switch(status)
        {
          case '1':
            msg = 'Success! Your email was sent.';
            break;
          case '-1':
            msg = 'Sorry&#8212An error occurred while sending your email.';
            break;
          default:
            msg = 'Thank you.';
            break;
        }
        _num_friend_emails = 1;
        xb_get_element('email_box_status_msg').innerHTML = msg;
        hide('email_box_form');
        unhide('email_box_status');

        var email_box = xb_get_element('email_box');
        if (email_box)
        {
          DOMUtils.hide_selects_by_el(email_box);
          email_box.style.height = '';
        }

        //clear('sp_message');
        //clear('sp_r_email');
        clear_form(frm);
        xb_get_element('sp_copy_me').checked = false;
      }
    }
}

// builds email property page div
function build_email_property_div(ev,pid, x, y,type, city, state)
{
  if(typeof(type) == 'undefined')
    type = 'For Sale';

  var email_property_url = xb_get_element('email_property_url');
  var the_url;

  if (!email_property_url && typeof(pid) == 'undefined')
    return;

  if (typeof(pid) != 'undefined')
  {
    the_url = site_root + 'email_page_property.php@type=' + encodeURIComponent(type) + '&propertyId=' + encodeURIComponent(pid);
    if(typeof(city) != 'undefined' && typeof(state) != 'undefined')
      the_url += '&city=' + encodeURIComponent(city)+ '&state=' + encodeURIComponent(state);
  }
  else
    the_url = site_root + 'email_page_property.php?' + email_property_url.value;

  if(x != '-1' && y != '-1')
    build_email_div(ev,'property',the_url, x, y);
  else
    build_email_div(ev,'property',the_url);
}

// builds email page url div
function build_email_page_url(e,url,t,qid, x, y)
{
  var the_url = site_root + 'email_page_url.php@u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(t);
  if (typeof(qid) != 'undefined' && qid)
    the_url += '&qid='+qid;
  build_email_div(e,'page_url',the_url, x, y);
}

// builds email div (general)
function build_email_div(ev,type,the_url, x, y)
{
  close_modals_except('email_box');
  var cloned_event = clone_obj(ev);
  doNothing(ev);

  var the_box = xb_get_element('email_box');
  if (the_box)
    the_box.parentNode.removeChild(the_box);

  var box = document.createElement('div');
  document.body.appendChild(box);

  var the_width, the_height;

  switch(type)
  {
    case 'page_url':
      the_width = 283;
      // the_height = 300;
      break;
    case 'property':
      the_width = 432;
      // the_height = 345;
      break;
    case 'property_list':
      the_width = 335;
      // the_height = 500;
      break;
    default:
      return;
  }

  box.id = 'email_box';
  box.style.display = 'inline';
  //box.innerHTML = 'Please wait...';
  var http = getHTTPObject();
  http.open("GET", the_url, true);
  http.onreadystatechange =
    function()
    {
      if (http.readyState == 4)
      {
        box.innerHTML = http.responseText;
        box.className ="drop_shadow";
        //box.style.display = 'none';
        box.style.position = 'absolute';
        box.style.zIndex = '1600';
        box.style.width = the_width+'px';
        // box.style.height = the_height+'px';

        if (typeof(x) != 'undefined' || typeof(y) != 'undefined')
        {
          show_pos_menu(cloned_event, 'email_box', x, y);
        }
        else if (type == 'page_url')
        {
          show_pos_menu(cloned_event, 'email_box', -the_width, 10);
        }
        else if(type == 'property')
        {
          show_pos_menu(cloned_event, 'email_box', -50, -241);
        }
        else if(type == 'property_list')
        {
          show_pos_menu(cloned_event, 'email_box', 0, 0);
        }
        else
        {
          show_pos_menu(cloned_event, 'email_box', -50, -341);
        }
      }
    }
  http.send(null);

  // position_at_event('email_box', the_width + 50, the_height, ev);
  // unhide(box);
}
// adds field to email page to friend
function add_friend_edit(cont_id,frm_id,type)
{
  var cont = xb_get_element(cont_id);
  if (!cont)
    return false;
  if (typeof(type) == 'undefined')
    type = 'popup';
  // only add if the previous one is filled and valid
  var frm = xb_get_element(frm_id);
  var els = frm.elements["sp_r_email[]"]; // get last email entry
  if (els.length)
  {
    el = els[els.length-1];
    var nflength = els.length;
  }
  else
  {
    el = els;
    var nflength = 1;
  }

  if (is_valid_email(el.value) != EMAIL_OK)
  {
    alert("Please enter a valid email address before adding another one.");
    return false;
  }
  // don't add too many
  if (nflength >= _max_num_friend_emails)
    return false;
  ++_num_friend_emails; // use as unique identifier for removing row
  var id = 'friend_email_' + _num_friend_emails;
  var contents = build_friend_edit(_num_friend_emails,id,type);
  var the_div = $$('div',contents,id);
  cont.appendChild(the_div);
  xb_get_element(id).focus();
}
// returns an edit box to add an email
function build_friend_edit(index,id,type)
{
  var edit = '';
  switch(type)
  {
    case 'qa':
      edit = '<span style="float:left;width:300px"><input type="text" size="25" style="width:265px;" id="'+id+'" name="sp_r_email[]" />';
      break;
    case 'popup':
    default:
      edit = '<span style="float:left;width:70px;">Friend\'s email:</span><span style="float:left;width:180px;"><input id="sp_r_email" name="sp_r_email[]" style="width:150px;" type="text" size="20" value="" />';
  }
  return edit + '<a class="delete_link" href="javascript:remove_friend_edit(\''+id+'\')">[x]</a></span>';
}
// remove friend edit
function remove_friend_edit(f_cont_id)
{
  var fff = xb_get_element(f_cont_id);
  if (fff)
    fff.parentNode.removeChild(fff);
  // we want this to keep increasing for use as a unique row identifier
  //--_num_friend_emails;
}
// cleans up email property window
function close_email_property_window()
{
  var el = xb_get_element('email_box');
  if (el)
  {
    hide('email_box_status');
    unhide('email_box_form');
    toggle_menu(null, el, 0)
  }
}

// // cleans up email page url window
// function close_email_page_window()
// {
//   var the_box = xb_get_element('email_box');
//   if (!the_box)
//     return;
//   the_box.parentNode.removeChild(the_box);
// }

// // cleans up report error window
 function close_error_window()
 {
   clear_element('error_box_status_msg');
   hide('error_box_status');
   toggle_menu('', 'error_box', 0);
   unhide('error_box_content');
   unhide('nomap');
 }
// cleans up email search window
function close_email_search_window()
{
  if (!xb_get_element('email_search_box'))
    return;
  hide('email_search_box_status');
  unhide('email_search_box_form');
  hide('email_search_box');
}
// closes all div popups except for one
function close_modals_except(id)
{
  switch(id)
  {
    case 'email_box':
      close_error_window();
      set_show_prefs('li_box', 'li_show');
      hide('li_box');
      break;
    case 'error_box':
      set_show_prefs('li_box', 'li_show');
      hide('li_box');
      close_email_property_window();
      break;
    case 'login_box':
      close_error_window();
      close_email_property_window();
      close_email_search_window();
      break;
    case 'email_search_box':
      hide('login_box');
      hide('ea_form_top');
    default:
      break;
  }
}
function cloneObject(what)
{
  // usage: var object2 = new cloneObject(object1);
  for (i in what)
  {
    this[i] = what[i];
  }
}
function in_array(v, a)
{
  var found = false;
  for (var i = 0; i < a.length; ++i)
  {
    if (a[i] == v)
    {
      found = true;
      break;
    }
  }
  return found;
}
function array_unique(a)
{
  var tmp = new Array();
  var al = a.length;
  for (var i = 0; i < al; ++i)
  {
    if (!in_array(a[i], tmp))
      tmp.push(a[i]);
  }
  return tmp;
}
function get_array_index(v, a)
{
  var found = -1;
  for (var i = 0; i < a.length; ++i)
  {
    if (a[i] == v)
    {
      found = i;
      break;
    }
  }
  return found;
}
function f_clientSize()
{
  var c = new Object;
  c.width = f_clientWidth();
  c.height = f_clientHeight();
  c.scrollLeft = f_scrollLeft();
  c.scrollTop =  f_scrollTop();
  return c;
}
function f_clientWidth()
{
  return f_filterResults
  (
    window.innerWidth ? window.innerWidth : 0,
    document.documentElement ? document.documentElement.clientWidth : 0,
    document.body ? document.body.clientWidth : 0
  );
}
function f_clientHeight()
{
  return f_filterResults
  (
    window.innerHeight ? window.innerHeight : 0,
    document.documentElement ? document.documentElement.clientHeight : 0,
    document.body ? document.body.clientHeight : 0
  );
}
function f_scrollLeft()
{
  return f_filterResults
  (
    window.pageXOffset ? window.pageXOffset : 0,
    document.documentElement ? document.documentElement.scrollLeft : 0,
    document.body ? document.body.scrollLeft : 0
  );
}
function f_scrollTop()
{
  return f_filterResults
  (
    window.pageYOffset ? window.pageYOffset : 0,
    document.documentElement ? document.documentElement.scrollTop : 0,
    document.body ? document.body.scrollTop : 0
  );
}
function f_filterResults(n_win, n_docel, n_body)
{
  var n_result = n_win ? n_win : 0;
  if (n_docel && (!n_result || (n_result > n_docel)))
    n_result = n_docel;
  return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}
// returns array of IDs for tags of type tag whose IDs begin with prefix
function get_ids_with_prefix(tag,prefix)
{
  var s = new Array();
  var e = document.getElementsByTagName(tag);
  for (var i = 0; i < e.length; ++i)
  {
    if (e[i].id && e[i].id.indexOf(prefix) == 0)
      s.push(e[i].id);
  }
  return s;
}
// hide filter menus
function close_all_menus(e)
{
  if(typeof(e) == 'undefined')
    var e = window.event;

  if (e)
    doNothing(e);

  toggle_menu(e,mutexes[_MENU_MUTEX],0);
  release_mutex(_MENU_MUTEX);
}
/*
Open or close popup based on whether it's closed or opened.
It can also registers the popup as a MENU_MUTEX on openeing (if you clcik anywhere the popup closes), unless state is 3 (when openning)
@param e      event
@param mid    id of the popup to toggle
@param state  optional. 0 to hide, 1 to show, 3 to show and not register as a MENU_MUTEX. It'll figure out to hide or show if this isn't specified
@return nothing
*/
function toggle_menu(e, mid, state)
{
  var menu = xb_get_element(mid);

  if (!menu)
    return;

  if (typeof(e) != 'undefined' && e)
    doNothing(e);

  if (menu.id.indexOf('login_box') > -1)
  {
    // clear global var if login box was closed
    login_next_step_global = '';
  }

  // open
  if ((menu.style.display == 'none' || has_class(menu, 'hidden')) && state != 0 || state == 1 || state == 3)
  {
    // if you can't set the mutex, clear that one mutex
    if (state != 3 && !set_mutex(_MENU_MUTEX, mid))
    {
      hlt_menu(e, xb_get_element(mutexes[_MENU_MUTEX]),0);
      hide(mutexes[_MENU_MUTEX]);
      release_mutex(_MENU_MUTEX);
    }
    unhide(mid);
    hlt_menu(e,menu,2);
    if (state != 3)
      set_mutex(_MENU_MUTEX, mid);

    DOMUtils.hide_selects_by_el(menu);
    return;
  }
  // close
  else if (menu.style.display != 'none' && !has_class(menu, 'hidden') && state != 1 || state == 0)
  {
    hide(mid);
    hlt_menu(e,menu,0);
    release_mutex(_MENU_MUTEX);
    unhide_selects();
  }
}

/**
 * set_safe_popup_coords
 * Positions an element (good for popup divs), making sure it does not go off-screen
 * @param e event for obtaining cursor position (may be null to use provided x/y coords only)
 * @param el element object to position
 * @param x x-coord without event, otherwise horizontal offset from cursor
 * @param y y-coord without event, otherwise vertical offset from cursor
 * @return coords object containing element's 'top' and 'left' position
 */
function set_safe_popup_coords(e, el, x, y, force)
{
  var coords = {'top':0,'left':0};
  // get page width/offsets before showing element
  var pageWidth  = f_clientWidth();
  var scrollLeft = f_scrollLeft();
  var pageHeight = f_clientHeight();
  var scrollTop  = f_scrollTop();
  var buffer     = 40; // for scrollbar, etc.

  var cursor = {x:0,y:0};
  if (e!=null)
  {
    var cursor = getPosition(e);
  }
  var dim  = get_object_dimensions(el);

  // you need to have the popup appear not under the cursor so that you don't end up with your popup going spastic,
  // hence the min 5px displacement
  var top = (cursor.y ? cursor.y : 0) + (typeof(y) != 'undefined' && y > 0 ? y : 5);
  var height  = dim['height'];

  // alert('top: '+top+ ' height: '+height+ ' pageHeight: '+pageHeight+ ' scrollTop: '+scrollTop+ ' buffer: '+buffer);
  top = get_safe_coord(top, height, pageHeight, scrollTop, buffer);

  coords['top'] = top;
  el.style.top = top + 'px';

  // make sure popup element does not show off screen (where possible)
  // modifies x/left coord only; does not take y/top into consideration
  var left   = (cursor.x ? cursor.x : 0)+ (typeof(x) != 'undefined'  && (force || x > 0) ? x : 5);
  var width  = dim['width'];

  // alert('left: '+left+ ' width: '+width+ ' pageWidth: '+pageWidth+ ' scrollLeft: '+scrollLeft+ ' buffer: '+buffer);
  left = get_safe_coord(left, width, pageWidth, scrollLeft, buffer);

  coords['left'] = left;
  el.style.left  = left + 'px';

  return coords;
}

/**
 * get_safe_coord
 * Helper for set_safe_popup_coords
 * @param coord top/left of element
 * @param dimension height/width of element
 * @param pageDimension height/width of page (view port)
 * @param pageScrollOffset top/left page scroll offset
 * @param buffer amount to push from page edge
 * @return coord new top/left coordinate for element
 */
function get_safe_coord(coord, dimension, pageDimension, pageScrollOffset, buffer)
{
  if ((coord + dimension + buffer) > pageDimension + pageScrollOffset)
  {
    coord = pageDimension + pageScrollOffset - (dimension + buffer); // don't go off the right/bottom of the page
    if (coord < pageScrollOffset) // take scroll/left/top of page into account
    {
      coord = pageScrollOffset + 10;
    }
  }

  return coord;
}

/*
Place element relative to the event that was fired and hide selects behind it
If the event position is wrong it might be because a parent element is relatively positioned
@param e  event
@param id popup or id of the popup to show
@param x  horizontal offset from the event
@param y  vertical offset from the event
@return nothing
*/
function show_pos_menu(e, id, x, y, force)
{
  toggle_menu(e, id, 1);
  var el = xb_get_element(id);

  if (el && el.style.display != 'none')
  {
    var coords = set_safe_popup_coords(e, el, x, y, force);

    // makes sure the element will be positioned
    if (el.style.position.toLowerCase() != 'relative')
    {
      el.style.position = 'absolute';
    }

    if (is_IE() && !is_IE7())
    {
      var dim = get_object_dimensions(el);

      // unhide from the hiding done in toggle menu since we repositioned it
      unhide_selects();
      DOMUtils.hide_selects_by_el(el);//, coords['left'], coords['top'], dim.width, dim.height);
      // if (el.getElementsByTagName('select'))
      // {
      //   unhide_el_selects(el);
      // }
    }
  }
}

// hlt menu title
function hlt_menu(e,menu,state)
{
  // get title
  var menut = menu.previousSibling;

  if (typeof(menut) == 'undefined' || !menut || typeof(menut.className) == 'undefined' || menut.className.indexOf('menu_title') < 0)
    return;

  switch(state)
  {
    case 1:
      menut.className = 'menu_title_h';
      break;
    case 2:
      menut.className = 'menu_title_active';
      break;
    case 0:
    default:
      menut.className = 'menu_title';
      break;
  }
}
// check and uncheck checkbox graphic
function gcb_set_status(id,status)
{
  if (xb_get_element(id))
    xb_get_element(id).src = xb_get_element('icon_cb_' + (status ? 'c' : 'u')).src;
}
// toggle properties, school and neighborhood plots
function toggle_plots(type, trigger)
{
  if (typeof(zp_on_map) == 'undefined')
    return;
  if (type != 'forsale' && type != 'sold' && type != 'neighborhood_icon' && type != 'school')
    return;
  var status = (zp_on_map[type] ? 'off' : 'on');
  if (type == 'school' && typeof(zp_sdid) != 'undefined' && zp_sdid.length > 0)
  {
    for (var i = 0; i < zp_sdid.length; i++)
    {
      //T_MAP.toggleMarkers('school',status,zp_sdid[i]);
      toggleMarkers('school',status,zp_sdid[i]);
    }
  }
  else
  {
    //T_MAP.toggleMarkers(type,status);
    toggleMarkers(type,status);
    if(xb_get_element('location_info'))
    {
      var str = 'Showing <strong>homes for sale</strong> in ' + the_location_name;
      xb_get_element('location_info').innerHTML = str;
    }
  }
  zp_on_map[type] = !zp_on_map[type];
  // update link text and/or checkboxes
  if (xb_get_element('plot_' + type))
  {
    if (zp_on_map[type])
    {
      xb_get_element('plot_' + type).innerHTML = 'Hide';
      gcb_set_status('cb_p_' + type, true);
    }
    else
    {
      xb_get_element('plot_' + type).innerHTML = 'See';
      gcb_set_status('cb_p_' + type, false);
    }
  }
  if (trigger)
    gcb_set_status(trigger, zp_on_map[type]);
  if (typeof(ztop5active) != 'undefined' && type == 'forsale')
  {
    reset_top5_menus();
    ztop5active = null;
  }
}
// sets search type
function set_search_type(pref,t,style)
{
  xb_get_element(pref+'search_type').value = t;
  var tabs = Array('h','g','m');
  for(var i = 0; i < 3; ++i)
  {
    // active tab
    if (t == tabs[i])
    {
      if (!style)
        xb_get_element(pref+'srch_' + tabs[i]).className = 'search_tab search_tab_highlight';
      else
        xb_get_element(pref+'srch_' + tabs[i]).className = 'active';
    }
    // inactive tab
    else
    {
      if (!style)
        xb_get_element(pref+'srch_' + tabs[i]).className = 'search_tab';
      else
        xb_get_element(pref+'srch_' + tabs[i]).className = '';
    }
  }
}

// dstruct.js
// data manipulation things

// ***********
// Queue class
// ***********
function Queue(s)
{
  this.elements = new Array();
  this.size = (typeof(s) != 'undefined' && parseInt(s) > 0 ? parseInt(s) : 5);
  this.allow_dupes = false;
  // used by iterator
  this.cursor = 0;
}
Queue.prototype.set_allow_dupes = function(n)
{
  this.allow_dupes = n;
}
Queue.prototype.set_size = function(s)
{
  this.size = parseInt(s);
}
// deletes all elements
Queue.prototype.clear = function()
{
  this.elements = new Array();
}
// returns true if we've hit capacity
Queue.prototype.is_full = function()
{
  return (this.get_size() >= this.size);
}
// returns true if the queue is empty
Queue.prototype.is_empty = function()
{
  return (this.get_size() < 1);
}
// adds an element to the queue
Queue.prototype.add = function(el)
{
  if (!this.is_full() && (this.allow_dupes || !this.contains(el)))
    this.elements.push(el);
}
// elements contains a given value
Queue.prototype.contains = function(el)
{
  return is_in_array(el,this.elements);
}
// returns how many elements are in the queue
Queue.prototype.get_size = function()
{
  return this.elements.length;
}
// removes an element from the queue
Queue.prototype.remove = function(el)
{
  var sz = this.get_size();
  if (sz < 1)
    return;
  var tmp = new Array();
  var found = false;
  for (var i = 0; i < sz; ++i)
  {
    if (this.elements[i] == el)
    {
      found = true;
      continue;
    }
    else
      tmp.push(this.elements[i]);
  }
  this.elements = tmp;
  tmp = null;
  return found;
}
// walks the elements
Queue.prototype.it_next_element = function()
{
  if (this.cursor >= this.get_size())
    return false;
  else
    return this.elements[this.cursor++];
}
// starts iterator
Queue.prototype.it_start = function()
{
  this.cursor = 0;
}
var save_queue = new Queue();
var sub_queue = new Queue();

// ******************************
// **** mutex management fns ****
// ******************************
// mutex release
function release_mutex(type)
{
  set_mutex(type, null);
}
// check on the mutex
function is_mutex_free(type)
{
  return (typeof(mutexes[type]) == 'undefined' || mutexes[type] == null);
}
// set a mutex
function set_mutex(type, value)
{
  // can't set mutex if already exists
  if (!is_mutex_free(type) && value != null)
  {
    return false;
  }
  else
  {
    mutexes[type] = value;
    return true;
  }
}

// **********************
// misc utility functions
// **********************
function is_in_array(v, a)
{
  var found = false;
  for (var i = 0; i < a.length; ++i)
  {
    if (a[i] == v)
    {
      found = true;
      break;
    }
  }
  return found;
}
// my trulia pulldown
function populate_my_trulia()
{
  var mt = xb_get_element('flist_my_trulia');
  mt.innerHTML = '';
  var li = newli('<strong><a href="'+site_root+'account/settings/">'  + ' Home</a></strong>');
  mt.appendChild(li);
  li = newli('<div id="pop_mt_wait" class="wait"><br />Loading...<br /></div>');
  mt.appendChild(li);
  var req = getHTTPObject();
  req.open("GET", site_root +'q_pop_mytrulia.php@ts=' + new Date().valueOf());
  req.onreadystatechange =
    function()
    {
      if (req.readyState == 4)
      {
        var xml = req.responseXML;
        if (xml && xml.documentElement)
        {
          var links = new Array();
          links['rp'] = xml.getElementsByTagName('rp');
          links['sp'] = xml.getElementsByTagName('sp');
          links['rs'] = xml.getElementsByTagName('rs');
          links['ss'] = xml.getElementsByTagName('ss');
          var labels = {'rp':'Recently&nbsp;Viewed&nbsp;Homes','sp':'Saved&nbsp;Homes','rs':'Recent&nbsp;Searches','ss':'Saved&nbsp;Searches'};
          var link_types = new Array('rp', 'sp', 'rs', 'ss');
          for (var i = 0; i < link_types.length; ++i)
          {
            var the_type = link_types[i];
            if (links[the_type].length > 0)
            {
              var li = newli('<br /><strong>'+labels[the_type]+'</strong>');
              mt.appendChild(li);
              for(var j = 0; j < links[the_type].length; ++j)
              {
                var lli = newli(links[the_type][j].getAttribute('link'));
                mt.appendChild(lli);
              }
            }
          }
        }
        var wait = xb_get_element('pop_mt_wait');
        if (wait)
          wait.parentNode.removeChild(wait);
      }
    }
  req.send(null);
}


// creates new li element with a link
function newli(i)
{
  var li = document.createElement('li');
  li.className = 'small';
  li.innerHTML = i;
  return li;
}
// see if a heat map is available
function query_available_heat_maps(state_code,location)
{
  if (typeof(location) == 'undefined')
    var location = '';
  //zhmsbdef this is default string in search box
  if (location == zhmsbdef)
    location = '';
  if (!location)
    xb_get_element('hm_location').value = '';
  if (typeof(state_code) == 'undefined')
    var state_code = '';
  // no location = we have a heat map, no need to check
  if (location == '' && state_code == '')
  {
    xb_get_element('hm_search_form').submit();
    return true;
  }
  var the_url = site_root + 'q_available_heat_maps.php@s=' + encodeURIComponent(state_code) + '&l=' + encodeURIComponent(location);
  var http = getHTTPObject();
  http.open("GET", the_url, true);
  http.onreadystatechange =
    function()
    {
      if (http.readyState == 4)
      {
        var rtn = http.responseText;
        var a_rtn = rtn.split('|');
        var t = a_rtn[0];

        if (t == '1')
        {
          //if the county was found but the user didn't type county then add county
          //example returned from ajax 1|County else just 1 or 0
          if(xb_get_element('hm_location') && a_rtn.length > 1)
            xb_get_element('hm_location').value = location + ' County';
          xb_get_element('hm_search_form').submit();
          return true;
        }
        else
        {
          unhide('hm_search_error');
          return false;
        }
      }
    }
  http.send(null);
  return false;
}
// refreshes ad iframe
function refresh_ad_iframe(i, zip_list, nh_list, city_list, rand)
{
  switch(i)
  {
    case 'ad_bottom_content' :
      var position = 'srp2';
      break;
    case 'ad_lside_content' :
      var position = 'srp3';
      break;
    case 'ad_rside_content' :
      var position = 'srp1';
      break;
  }

  var fr = xb_get_element(i);
  if (!fr)
    return;
  fr.src = site_root + 'trulia_ad.php@city=' + _CITY + '&state=' + _STATE + '&sc=' + position + '&zips=' + zip_list + '&nhs=' + nh_list + '&city_list=' + city_list + '&beds=' + RFilters.beds_string + '&baths=' + RFilters.baths_string + '&adr=' + rand;
}

// removes an element from the dom
function kill(id)
{
  var el = xb_get_element(id);
  if (el)
    el.parentNode.removeChild(el);
}

// ***************************************************************************
/*
  EDITOR FOR NOTES
*/
// ***********************
// constructor
function EditBox(topic_id, parent_id, exists)
{
  this.id = topic_id;
  this.saved_contents = '';
  this.max_length = 1500;

  // container
  this.container = document.createElement('div');
  this.container.id = 'eb_container_'+this.id;
  this.container.className = 'editor';

  // edit box
  var t = document.createElement('textarea');
  t.className = 'editor_textarea';
  t.cols = 90;
  t.rows = 3;
  t.value = 'new editor';
  this.container.appendChild(t);

  // block
  var p = document.createElement('p');
  this.container.appendChild(p);

  // save link
  var sl = document.createElement('a');
  sl.className = 'editor_link';
  sl.href = "javascript:_editor.save()";
  sl.innerHTML = '[+]&nbsp;Save';
  p.appendChild(sl);

  // cancel link
  var cl = document.createElement('a');
  cl.className = 'editor_link';
  cl.href = "javascript:_editor.cancel()";
  cl.innerHTML = '[x]&nbsp;Cancel';
  p.appendChild(cl);

  // delete link -- only for existing notes
  if (exists)
  {
    var dl = document.createElement('a');
    dl.className = 'delete_link editor_link';
    dl.href = "javascript:_editor.delete_note()";
    dl.innerHTML = '[-]&nbsp;Clear';
    p.appendChild(dl);
  }

  // sets editor
  this.editor = this.get_editor();

  // hidden editor
  if (parent_id!=null)
  {
    // add to parent
    this.add_to_parent(parent_id);
    // focus edit box
    this.focus_editor();
  }
}
// destructor
EditBox.prototype.destroy = function()
{
  kill(this.container.id);
  release_mutex(_EDITOR_MUTEX);
  _editor = null;
}
// returns the textarea
EditBox.prototype.get_editor = function()
{
  return this.container.firstChild;
}
// returns true if size is ok
EditBox.prototype.check_size = function()
{
  return (trim(this.get_editor().value).length <= this.max_length);
}
// focuses the edit box
EditBox.prototype.focus_editor = function()
{
  this.editor.focus();
}
// returns true if the element needs to be saved
EditBox.prototype.is_dirty = function()
{
  return (this.saved_contents != this.get_contents());
}
// save action (default)
EditBox.prototype.save = function()
{
  if (this.get_length() > this.max_length)
    alert('Your note is a bit long. We\'ll have to truncate it.');
  this.save_action(this);
}
// delete action (default)
EditBox.prototype.delete_note = function()
{
  this.delete_action(this);
}
// cancel action (default)
EditBox.prototype.cancel = function()
{
  this.cancel_action(this);
}
// sets the save action to be performed on save
EditBox.prototype.set_save_action = function(f)
{
  this.save_action = f;
}
// sets the cancel action
EditBox.prototype.set_cancel_action = function(f)
{
  this.cancel_action = f;
}
// sets the delete action
EditBox.prototype.set_delete_action = function(f)
{
  this.delete_action = f;
}
// returns the text in the edit box
EditBox.prototype.get_contents = function()
{
  return trim(this.editor.value);
}
// length of note
EditBox.prototype.get_length = function()
{
  return trim(this.editor.value).length;
}
// returns the editor's topic id (propertyid, etc--the id of what the edited text is about)
EditBox.prototype.get_id = function()
{
  return this.id;
}
// adds the editor to its parent
EditBox.prototype.add_to_parent = function(parent_id)
{
  if (xb_get_element(parent_id))
    xb_get_element(parent_id).appendChild(this.container);
}
// sets contents of edit box
EditBox.prototype.set_contents = function(c)
{
  this.editor.value = c;
}
// sets saved contents for undo
EditBox.prototype.set_undo_contents = function(c)
{
  this.saved_contents = c;
}
// reverts contents to undo
EditBox.prototype.undo = function(c)
{
  this.set_contents(this.saved_contents);
}
// inserts arbitrary text at caret position
EditBox.prototype.insert_at_caret = function(insert_text)
{
  // ie
  if (document.selection)
  {
    this.focus_editor();
    var sel = document.selection.createRange();
    sel.text = insert_text;
  }
  // moz
  else if (this.editor.selectionStart || this.editor.selectionStart == '0')
    this.editor.value = this.editor.value.substring(0, this.editor.selectionStart) + insert_text + this.editor.value.substring(this.editor.selectionEnd);
  // fallback: insert at the end
  else
    this.editor.value += insert_text;
  this.focus_editor();
}
// ***********************
// called if editor is dirty and not saved
function check_editor()
{
  // if there's no editor, do nothing
  if (is_mutex_free(_EDITOR_MUTEX))
    return true;
  // if the editor isn't dirty, do nothing
  if (!(_editor.is_dirty()))
    return true;
  // autosave
  save_property_note(_editor);
  return true;
}
// creates an editor
function edit_property_note(propertyId)
{
  // only one editor allowed
  if (set_mutex(_EDITOR_MUTEX, propertyId))
  {
    // sets content of edit box
    var edit_box_text = xb_get_element('note_c_'+propertyId).innerHTML;
    var note_exists = (edit_box_text != '');
    // hide existing note
    hide('note_c_'+propertyId);
    _editor = new EditBox(propertyId, 'note_container_'+propertyId, note_exists);
    _editor.set_contents(html_to_txt_br(edit_box_text));
    _editor.set_undo_contents(edit_box_text);
    // sets save and cancel actions
    _editor.set_save_action(function(ed){save_property_note(ed,'save');});
    _editor.set_delete_action(function(ed){save_property_note(ed,'delete');});
    _editor.set_cancel_action(function(ed){cancel_property_note(ed);});
    // remove edit link
    hide('note_edit_link_container_'+propertyId);
  }
  // decide what to do with the other open editor
  else
  {
    // no change to current note? cancel out of it and edit the next one
    if (!_editor.is_dirty() || _editor.get_contents() == '')
    {
      cancel_property_note(_editor);
      edit_property_note(propertyId);
    }
    // current note has been modified
    // autosave
    else
    {
      save_property_note(_editor,'save',function(){edit_property_note(propertyId);});
    }
  }
}
// save a property note and close editor
function save_property_note(editor,action,post_save_fn)
{
  var pid = editor.get_id();
  var text = editor.get_contents();
  if (text == '' && action != 'delete')
  {
    editor.focus_editor();
    return false;
  }
  // do the saving
  var l_http = getHTTPObject();
  var the_url = site_root + 'q_save_property_note.php';
  var arg_str = "pid=" + encodeURIComponent(pid) + "&utkn=" + encodeURIComponent(utkn);
  if (action == 'delete')
    arg_str += '&action=delete';
  else
    arg_str += "&n=" + encodeURIComponent(text);
  l_http.open("POST", the_url, true);
  l_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  l_http.send(arg_str);
  l_http.onreadystatechange =
    function()
    {
      if (l_http.readyState == 4)
      {
        var xml = l_http.responseXML;
        if (xml && xml.documentElement)
        {
          var the_note = xml.documentElement.getElementsByTagName('note')[0];
          var status = the_note.getAttribute('s');
          var the_note_note = the_note.getAttribute('n');
          var tsc = the_note.getAttribute('tsc');
          var tse = the_note.getAttribute('tse');

          // success?
          if (status == '1')
          {
            // close edit box (also releases mutex)
            editor.destroy();
            // restores non-edit note display
            xb_get_element('note_c_'+pid).innerHTML = txt_to_html_br(the_note_note);
            // restores non-edit version
            unhide('note_c_'+pid);
            // change link text if necessary
            if (action == 'delete')
            {
              // hide header
              hide('note_header_'+pid);
              xb_get_element('note_c_'+pid).innerHTML = '';
              xb_get_element('note_edit_link_'+pid).innerHTML = 'My notes';
              // hides delete link
              hide('note_delete_link_'+pid);
            }
            else
            {
              // hide header
              unhide('note_header_'+pid);
              xb_get_element('note_edit_link_'+pid).innerHTML = 'Edit';
              // shows delete link
              unhide('note_delete_link_'+pid);
            }
            // restores edit link
            unhide('note_edit_link_container_'+pid);
            // perform the post save function
            if (post_save_fn)
              post_save_fn();
          }
          else
          {
            alert('Sorry--we were unable to save your note.');
          }
        }
        else
        {
          alert('Sorry--we were unable to save your note.');
        }
      }
    }
}
// cancel a property note
function cancel_property_note(editor)
{
  var pid = editor.get_id();
  // close edit box (also releases mutex)
  editor.destroy();
  // restores non-edit version
  unhide('note_c_'+pid);
  // restores edit link
  unhide('note_edit_link_container_'+pid);
}
// delete a property note
function delete_property_note(pid)
{
  var eb = new EditBox(pid,null,true);
  save_property_note(eb,'delete');
  eb = null;
}
// toggles property note
function toggle_property_note(pid, force_state)
{
  var edid = 'note_c_'+pid;
  var ed = xb_get_element(edid);
  if (ed)
  {
    var action = 'hide';
    if (typeof(force_state) != 'undefined')
    {
      if (force_state == true)
        action = 'show';
      else
        action = 'hide';
    }
    else
    {
      if (ed.style.display == '' || ed.style.display == 'inline')
        action = 'hide';
      else
        action = 'show';
    }
    if (action == 'show')
    {
      unhide(edid);
    }
    else
    {
      hide(edid);
    }
  }
}
// replaces \n with <br />
function txt_to_html_br(t)
{
  return trim(t).replace(/\n/g,'<br />');
}
// replaces <br /> with \n
function html_to_txt_br(t)
{
  return t.replace(/<br(\s*\/?)?>/ig,"\n");
}
// returns today's date without all the fluff of UTC date
function format_date()
{
  var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
  var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
  var d = new Date();
  return days[d.getUTCDay()]+', '+months[d.getUTCMonth()]+' '+d.getDate()+' '+d.getFullYear();
}
/**
 @nStr - str to format with commas
*/
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

/* END EDITOR FOR NOTES */
// ***************************************************************************

// sets a cookie and session var
function set_csp(key,c,s,val)
{
  if (c != 1 && c != 0)
    c = 0;
  if (s != 1 && s != 0)
    s = 0;
  var req = getHTTPObject();
  var the_url = site_root + 'q_set_csp.php@ts=' + (new Date().valueOf())+'&c='+c+'&s='+s+'&key='+key;
  if(typeof(val) != 'undefined')
  {
    the_url += '&val=' + val;
  }
  req.open("GET", the_url, true);
  req.onreadystatechange = function() {};
  req.send(null);
}
// asks if the user wants to create an account
function alert_login(type)
{
  var msg = 'You must be logged in to save ' + type + '.\nClick OK to log in or sign up for an account--it only takes a minute!';
  return confirm(msg);
}
// if any properties have been mutexed into a queue
// process them now
function process_save_queue()
{
  if (save_queue.is_empty())
  {
    release_mutex(_SAVE_MUTEX);
    return;
  }
  var next;
  save_queue.it_start();
  while((next = save_queue.it_next_element()))
  {
    save_property(next);
  }
}
// if any subscription was pending, do it now
function process_subscribe_queue()
{
  if (sub_queue.is_empty())
    return;
  subscribe(-1);
}

// pulls and displays the ads from google search
// @param q             google_kw aka the keywords, can be comma delimited
// @param ads           google_ad_fmt is ignored
// @param page          google_pg is an int
// @param parent_id     the div id that the google ads will be written into
// @param channel       whatever channel for that ad, can be comma delimited list
// @param ad_template   an int
// @param state_format  an int
function display_adsense(q,topic,ads,page,parent_id,channel,ad_template,state_format)
{
  if (typeof(ad_template)=='undefined')
    var ad_template = 1;

  if (typeof(topic)=='undefined')
    var topic = "Real Estate";

  if (typeof(state_format)=='undefined')
    var state_format = 2;

  var ch = (typeof(channel) != 'undefined') ? channel : '';
  var http = getHTTPObject();

  http.open("GET", site_root+"q_adsense.php@state_format="+encodeURIComponent(state_format)+"&template="+encodeURIComponent(ad_template)+"&q="+encodeURIComponent(q)+'&topic='+encodeURIComponent(topic)+'&ads='+encodeURIComponent(ads)+'&p='+encodeURIComponent(page)+'&ch='+encodeURIComponent(ch)+'&city='+encodeURIComponent(_AD_CITY)+'&returntype=html');
  http.onreadystatechange =
    function()
    {
      if (http.readyState == 4)
      {
        var ad_div = xb_get_element(parent_id);
        if(ad_div)
          ad_div.innerHTML=http.responseText
        // php google proxy is doing the xml parsing for us now.
      }
    }
  http.send(null);
}
/* loads spotlight ads, pulled out of SRP */
function load_spotlight_ads(city, state, zips, nhs)
{
  var ad_div = xb_get_element('spotlight_container');
  if (!ad_div)
    return false;
  var http = getHTTPObject();
  var random = Math.floor(Math.random()*99999999);
  http.open("GET", site_root+"slp/q_sl.php@city="+encodeURIComponent(city)+"&state="+encodeURIComponent(state)+"&zips="+encodeURIComponent(zips)+"&nhs="+encodeURIComponent(nhs)+"&r="+random);
  http.onreadystatechange =
    function()
    {
      if (http.readyState == 4)
      {
        eval('var response = '+http.responseText);
        if (response.length > 0)
        {
          // show sponsored results if we have ads
          var spons_label = (http.responseText.toLowerCase().indexOf('want your brand') >= 0) ? '' : '<div class="grey bold f10">Sponsored results</div>';
          var outputHTML = '<div class="lau_blog_mbnd_box mbnd_launch_box_sub_blog"><div class="mbnd_section_header_blog imgsheet"><div>Local Spotlight</div><div class="floatright" style="margin-top:-14px;margin-right:10px;"><a href="'+site_root+'truliapro/@src=000007" style="font-weight:normal;font-size:10px;">Your ad here&nbsp;&nbsp;<img src="'+_IMAGE_SERVER+'/images/pro_badge_mini.gif" alt="trulia pro" border="0" align="top" /></a></div></div><div class="mbnd_inner_laupad_box_blog">'+spons_label+'<div>';
          for (var i = 0; i < response.length; i++)
          {
            outputHTML += response[i];
            if (i < response.length - 1)
            {
              outputHTML += '<div style="line-height:1px;font-size:1px; border: 0; border-top: 1px dotted #ccc; height: 1px; margin: 0; padding: 0;" />&nbsp;</div>';
            }
          }
          outputHTML += '<div style="clear: both; height: 1px; line-height:1px; font-size: 1px;">&nbsp;</div></div></div></div>';
          ad_div.innerHTML = outputHTML;
        }
      }
    }
  http.send(null);
}

// sorts ints stored as strings
function sortint(a,b)
{
  return parseInt(a)-parseInt(b);
}
var _EMAIL_SIGNUP = new Object();

// shows the email property alert form (to sign up for email alerts)
// @param e             event
// @param propertyId    property id for the email alerts
// @param propertyHash  property hash for the email alerts
// @param stateCode     state code of the property for the email alerts
// @param price         price of the property for the email alerts
// @param status        status of the property for the email alerts
// @param layerId       for placement
function show_email_property_alert_box(e, propertyId, propertyHash, stateCode, price, status, layerId)
{
  if (typeof(layerId)=='undefined')
    var layerId = 1;

  for (i in _EMAIL_SIGNUP)
    delete _EMAIL_SIGNUP[i];
  _EMAIL_SIGNUP['property_id'] = propertyId;
  _EMAIL_SIGNUP['property_hash'] = propertyHash;
  _EMAIL_SIGNUP['state_code'] = stateCode;
  _EMAIL_SIGNUP['price'] = price;
  _EMAIL_SIGNUP['status'] = status;

  var status_str = (status == 'For Sale' ? 'sold' : 'listed for sale');
  if(xb_get_element('email_status_display'))
	xb_get_element('email_status_display').innerHTML = status_str;

  switch (status)
  {
  	case 'For Sale':
  	  str = 'sold';
  	  break;
  }

  switch (layerId)
  {
    case 1:
      show_pos_menu(e, 'email_property_alert_form', 38, -223);
      break;
    case 2:
      show_pos_menu(e, 'email_property_alert_form', -330, -100);
      break;
    default:
      show_pos_menu(e, 'email_property_alert_form', -140, 10);
  }
  hide('email_property_subscribe_status');
  //unhide('email_property_alert_form');
}
function email_property_subscribe()
{
  hide('email_property_subscribe_status');
  var pageURL = site_root + "q_property_email_subscribe.php?";
  var propertyId = _EMAIL_SIGNUP['property_id'];
  var propertyHash = _EMAIL_SIGNUP['property_hash'];
  var propertyStateCode = _EMAIL_SIGNUP['state_code'];
  var propertyPrice = _EMAIL_SIGNUP['price'];
  var propertyStatus = _EMAIL_SIGNUP['status'];
  var alertPropStatus = xb_get_element('alertPropertyStatus').checked;
  var alertComps = xb_get_element('alertPropertyComps').checked;

  if(alertPropStatus)
  {
    alertPropStatus=1;
    frequencyPropStatus = xb_get_element('propertyStatusFrequency').value;
  }
  else
  {
    alertPropStatus=0;
    frequencyPropStatus = 'none';
  }

  if(alertComps)
  {
    alertComps=1;
    frequencyComps = xb_get_element('propertyCompsFrequency').value;
  }
  else
  {
    alertComps=0;
    frequencyComps = 'none';
  }
  if(!alertComps && !alertPropStatus)
  {
    var status = xb_get_element('email_property_subscribe_status');
    status.innerHTML = 'Please select an email alert option to subscribe to.';
    unhide('email_property_subscribe_status');
    return;
  }
  var paramString='';
  paramString+="ps="+alertPropStatus+"&pf="+frequencyPropStatus+"&cs="+alertComps+"&cf="+frequencyComps+"&pid="+propertyId+"&ph="+propertyHash+
    "&st="+propertyStateCode+"&pr="+propertyPrice+"&pst="+propertyStatus;
  var httpObj = getHTTPObject();

  httpObj.open("GET", pageURL+paramString, true);
  httpObj.onreadystatechange =
    function()
    {
      if(httpObj.readyState==4)
      {
        var xml = httpObj.responseXML;
        if (!xml)
          return;
        var xml_values = xml.documentElement.getElementsByTagName('o')[0];
        var propStatus = xml_values.getAttribute('ps');
        var compsStatus = xml_values.getAttribute('cs');

        var status = xb_get_element('email_property_subscribe_status');
        if(propStatus==4)
          status.innerHTML = 'Please <span class="pseudolink" onclick="show_login(event, \'login\');">log in</span> to subscribe.';
        else if(propStatus>0 || compsStatus>0)
        {
          status.innerHTML = 'Success! Your email alert settings have been saved.';
          if(typeof(sp_page_name) != 'undefined' && sp_page_name == 'homepage')
          {
            add_class('email_sp_' + propertyId, 'hidden');
            remove_class('emailed_sp_' + propertyId, 'hidden');
          }
          if(alertPropStatus)
          {
            o_track_email_signup('status');
          }
          if(alertComps)
          {
            o_track_email_signup('comps');
          }
        }
        else if(propStatus==0 && compsStatus==0)
        {
          status.innerHTML = 'You already have alerts saved for this property.';
        }
        else
          status.innerHTML = 'ERROR';

        unhide('email_property_subscribe_status');
      }
    }
  httpObj.send(null);
}
/**
  promotional banner at the top of the results page
*/
function TopPromo(city,state)
{
  if (typeof(city)=='undefined' || !city)
    var city = 'San Francisco';
  if (typeof(state)=='undefined' || !state)
    var state = 'CA';
  this.city = city;
  this.state = state;
  this.html = new Array();
  this.cur = 0;
  this.to = null;
  this.frequency = 5;
  this.url = site_root + 'q_promo_content.php@client=results&city='+encodeURIComponent(this.city)+'&state='+encodeURIComponent(this.state);
  this.cycles = 0;
  this.reload_after = 1;
  this.running = false;
  this.container_id = 'promo_text';
  this.loaded = false;
}
TopPromo.prototype.set_frequency = function(sec)
{
  this.frequency = sec;
}
TopPromo.prototype.set_reload_after = function(rot)
{
  this.reload_after = rot;
}
TopPromo.prototype.load = function(rotate)
{
  this.loaded = true;
  var http = getHTTPObject();
  var _me = this;
  http.open("GET", this.url + '&ts=' + new Date().valueOf());
  http.onreadystatechange =
  function()
  {
    if (http.readyState == 4)
    {
      var xml = http.responseXML;
      if (xml && xml.documentElement)
      {
        var cells = xml.getElementsByTagName('cell');
        for (var i = 0; i < cells.length; ++i)
        {
          _me.html[i] = cells[i].getAttribute('html');
        }
        this.cycles = 0;
        if (_me.html.length > 0 && rotate)
          _me.rotate();
      }
    }
  }
  http.send(null);
}
TopPromo.prototype.load_from_cache = function(rotate)
{
  var cells = get_ids_with_prefix('div', 'vcpc_')
  if (cells.length < 1)
  {
    this.stop(true);
    this.loaded = false;
  }
  else
  {
    for (var i = 0; i < cells.length; ++i)
    {
      this.html[i] = xb_get_element(cells[i]).innerHTML;
    }
    this.loaded = true;
    this.cycles = 0;
    if (this.html.length > 0 && rotate)
      this.rotate();
  }
}
TopPromo.prototype.stop = function(closed)
{
  if (this.to)
    clearTimeout(this.to);
  this.running = false;
  // remember
  if (closed)
  {
    // remove element
    var pt = xb_get_element(this.container_id);
    if (pt)
      pt.parentNode.removeChild(pt);
    set_csp('9a5401',1,1);
  }
}
TopPromo.prototype.start = function()
{
  this.running = true;
  var _me = this;
  this.to = setTimeout(function(){_me.rotate();}, this.frequency * 1000);
}
TopPromo.prototype.rotate = function()
{
  if (!this.loaded)
    return;
  var pt = xb_get_element(this.container_id);
  if (!pt)
  {
    return;
  }
  var size = this.html.length;
  if (size <= 0)
  {
    return;
  }
  if (this.cur == size - 1)
  {
    this.cur = 0;
    ++this.cycles;
    if (this.reload_after > 0 && this.cycles >= this.reload_after)
    {
      this.load(false);
    }
  }
  pt.innerHTML = this.html[this.cur];
  if (this.cur < size - 1)
    ++this.cur;
  this.start();
}
TopPromo.prototype.next = function()
{
  if (!this.loaded)
    return;
  var pt = xb_get_element(this.container_id);
  if (!pt)
    return;
  if (this.cur == this.html.length - 1)
    this.cur = 0;
  else
    ++this.cur;
  pt.innerHTML = this.html[this.cur];
}
TopPromo.prototype.previous = function()
{
  if (!this.loaded)
    return;
  var pt = xb_get_element(this.container_id);
  if (!pt)
    return;
  if (this.cur == 0)
    this.cur = this.html.length - 1;
  else
    --this.cur;
  pt.innerHTML = this.html[this.cur];
}
TopPromo.prototype.pause = function(trigger)
{
  if (this.running)
  {
    this.stop();
  }
  else
  {
    this.next();
    this.start();
  }
  if (trigger)
    this.update_pause_btn(trigger);
}
TopPromo.prototype.update_pause_btn = function(btn)
{
  // if this is a graphical button
  if (typeof(btn) != 'undefined' && typeof(btn.src) != 'undefined')
  {
    var play = xb_get_element('_img_play').src;
    var play_hl = xb_get_element('_img_play_hl').src;
    var pause = xb_get_element('_img_pause').src;
    var pause_hl = xb_get_element('_img_pause_hl').src;
    if (this.running)
    {
      btn.src = pause;
      btn.onmouseover = function() { this.src = pause_hl; };
      btn.onmouseout = function() { this.src = pause; };
      btn.alt = "Pause";
    }
    else
    {
      btn.src = play;
      btn.onmouseover = function() { this.src = play_hl; };
      btn.onmouseout = function() { this.src = play; };
      btn.alt = "Play";
    }
  }
  // if this is a text button
  else
  {
    if (this.running)
    {
      btn.innerHTML = '|&nbsp;|';
      btn.title = 'Pause';
    }
    else
    {
      btn.innerHTML = '&gt;';
      btn.title = 'Play';
    }
  }
}
// QATopPromo
function QATopPromo(locationId, categoryId, container_id)
{
  this.html = new Array();
  this.cur = 0;
  this.to = null;
  this.url = site_root + 'q_promo_content.php@client=qalanding&locationId='+encodeURIComponent(locationId);
  this.container_id = typeof(container_id) != 'undefined' && xb_get_element(container_id) ? container_id : 'promo_text';
}
OOP.extend(QATopPromo, TopPromo);
var used = new Array();

/**
Finds computed width and heigth of an element
@param  el      required, element. Can be id or actual element
@return array   {height: x, width:y}
**/
function get_object_dimensions(el)
{
  // check valid parameter
  el = xb_get_element(el);
  if (!el)
    return { 'height': null, 'width': null };

  var changed_display = false;

  // element can't be display none if we want to get the dims
  if (el.style.display == 'none')
  {
    el.style.display = '';
    changed_display = true;
  }

  var objWidth = 0;
  var objHeight = 0;
  if (el.offsetWidth || el.offsetWidth === 0)
  {
    objWidth = el.offsetWidth;
    objHeight = el.offsetHeight;
  }
  else if (document.defaultView.getComputedStyle)
  {
    objHeight = document.defaultView.getComputedStyle(el, "").getPropertyValue("height");
    objWidth = document.defaultView.getComputedStyle(el, "").getPropertyValue("width");
  }
  else if (el.clip)
   {
     objWidth = el.clip.width;
     objHeight = el.clip.height;
   }

  if (changed_display)
    el.style.display = 'none';

  return { 'height':objHeight, 'width':objWidth };
}

/**
Makes an element appear/fade onscreen
Only first param is required
Default behavior is to fade
@param  el      required, element to fade in/out. Can be id or actual element
@param  start   optional, opacity to begin with. Should be between 0 and 100
@param  end     optional, opacity to end with. Should be between 0 and 100
@param  dis     optional, style.display settings wanted, can be "block", "inline", or "". Not used for fade
@param  speed   optional, duration of the transition in milliseconds, 500 means 0.5 seconds for a transition that requires
                          100 changes. If you change from 50 to 100 it will only take 250 milliseconds. Default is 700.
@return nothing
**/
function fade_effect(el, start, end, dis, speed)
{
  // check valid parameter
  var el = xb_get_element(el);
  if (!el)
      return;

  var timer = 0;

  // check that speed is defined and valid
    if (typeof(speed) == 'undefined')
      var speed = 700;
    else if (speed > 1000)
      speed = 1000;
    else if (speed < 10)
      speed = 10;

  speed = Math.round(speed / 100);

  // check that start defined
  if (typeof(start) == 'undefined')
  {
    if (end >= 50)
      var start = 0;
    else
      var start = 100;
  }

  // check that end defined
  if (typeof(end) == 'undefined')
  {
    if (start >= 50)
      var end = 0;
    else
      var end = 100;
  }

  // check that start valid
  if (start > 100)
    start = 100;
  else if (start < 0)
    start = 0;

  // check that end valid
  if (end > 100)
    end = 100;
  else if (end < 0)
    end = 0;

   // appear
  if (end > start)
    var eff = 1;
  // fade
  else
  {
    var eff = -1;
    dis = 'none'
  }

  // do effect
  while (eff * start <= eff * end)
  {
    setTimeout('set_opac("' + el.id + '",' + start + ',"' + dis + '")', timer * speed);
    // Math.round used to fix js binary num representation of fraction issues + '")', timer);
    start = Math.round((start + eff) * 100) / 100 ;
    timer++;
  }

}

/**
Sets the opacity of an element
@param  el        element to appear. Can be the id or teh actual element
@param  opac      opacity level to be set. Can be between 0 and 100
@param  dis       style.display settings wanted, can be "block", "inline", or ""
@param  dim_to_set   the dimensions you want to set if necessary for IE. Default is 'height' but can be 'width'

@return nothing
**/
function set_opac(el, opac, dis, dim_to_set)
{
  // check valid parameter
  var el = xb_get_element(el);
  if (!el)
    return false;
    
  // element in ie6 needs to have specified width and/or height for opacity to work (ie7 is ok)
  if (is_IE6() && (typeof(el.style.width) == 'undefined' || !el.style.width) && (typeof(el.style.height) == 'undefined' || !el.style.height))
  {
    var dim = get_object_dimensions(el);
    var dim_set = false;

    if (dim_to_set == 'height' && dim.height)
    {
      el.style.height = dim.height;
      dim_set = true;
    }
    else if (dim_to_set == 'width' && dim.width)
    {
      el.style.width = dim.width;
      dim_set = true;
    }
    
    if (!dim_set)
    {
      // don't set height if it's 0
      if (dim.height === 0)
      {
        if (dim.width === 0)
          el.style.height = '';
        else
          el.style.width = dim.width;
      }
      else
        el.style.height = dim.height;
    }
  }

  // check that opacity specified and valid. If it's 100 take out filter
  if (typeof(opac) == 'undefined' || opac >= 100)
  {
    moz_opac = '';
    ie_opac = '';
  }
  else if (opac <= 0)
  {
    moz_opac = 0;
    ie_opac = 0;
  }
  else
  {
    moz_opac = opac / 100;
    ie_opac = 'alpha(opacity=' + opac + ')';
  }

  // set opacity
  el.style.opacity = moz_opac;
  el.style.MozOpacity = moz_opac;
  el.style.KhtmlOpacity = moz_opac;
  el.style.filter = ie_opac;

  // if opac is at 0 or less, set the style.display
  if (opac <= 0)
  {
    if (typeof(dis) == 'undefined' || (dis != 'none' && dis != 'block' && dis != 'inline'))
      el.style.display = '';
    else
      el.style.display = dis;
  }

  return true;
}

/**
Checks if an element has a class
@param  el              element to check. Can be the id or the actual element
@param  searched_class  class to checked

@return boolean
**/
function has_class(el, searched_class)
{
  if (typeof(searched_class) == 'undefined' || !searched_class)
    return false;

  // check valid parameter
 el = xb_get_element(el);

  if (!el)
    return false;

  var class_array = el.className.split(' ');

  for(var i in class_array)
  {
    if (class_array[i] == searched_class)
      return true;
  }
  return false;
}

/**
Adds a class to an element
@param  el            element whose class to add. Can be the id or the actual element
@param  add_class     class to be added

@return boolean
**/
function add_class(el, added_class)
{
  if (typeof(added_class) == 'undefined')
    return false;

  // check valid parameter
  el = xb_get_element(el);

  // if element doesn't exist, or class already there, or no class to add
  if (!el || has_class(el, added_class))
      return false;

  el.className = el.className + ' ' + added_class;

  return true;
}

/**
Removes a class from an element
@param  el            element whose class to remove. Can be the id or the actual element
@param  remove_class  class to be removed

@return boolean
**/
function remove_class(el, removed_class)
{
  if (typeof(removed_class) == 'undefined')
    return false;

  // check valid parameter
  el = xb_get_element(el);

  // if element doesn't exist, or class not there, or no class to remove
  if (!el)
    return false;

  var class_array = el.className.split(' ');
  var class_changed = false;

  for (var i in class_array)
  {
    if (class_array[i] == removed_class)
    {
      // delete removed_class
      class_array.splice(i, 1);
      class_changed = true;
    }
  }

  if (class_changed)
    el.className = class_array.join(' ');

  return class_changed;
}

/**
Changes class of element
@param  el            element whose class to toggle. Can be the id or the actual element
@param  add_class     class to be added
@param  remove_class  clas to be removed

@return boolean
**/
function toggle_class(el, added_class, removed_class)
{
  // check if adding
  add = false;
  if (typeof(added_class) != 'undefined' && added_class)
    add = true;

  // check if removing
  remove = false;
  if (typeof(removed_class) != 'undefined' && removed_class)
    remove = true;

  // if not adding or removing return
  if (!add && !remove )
    return false;

  el = xb_get_element(el);

  // if element doesn't exist
  if (!el)
    return false;

  var class_array = el.className.split(' ');
  var class_changed = false;

  for (var i in class_array)
  {
    if (remove && class_array[i] == removed_class)
    {
      // delete removed_class
      class_array.splice(i, 1);
      class_changed = (true || class_changed);
    }

    if (add && class_array[i] == added_class)
      add = (false || class_changed);
  }

  if (add)
  {
    class_array[class_array.length] = added_class;
    class_changed = (true || class_changed);
  }

  if (class_changed)
    el.className = class_array.join(' ');

  return class_changed;
}
// old way (redundant)
// function toggle_class(el, added_class, removed_class)
// {
//   if (added_class)
//     add_class(el, added_class);
//
//   if (removed_class)
//     remove_class(el, removed_class);
// }

function is_IE()
{
  return (navigator.appName.indexOf("Microsoft Internet Explorer") > -1);
};

function is_IE6()
{
  return (navigator.appName.indexOf("Microsoft Internet Explorer") > -1 && !window.XMLHttpRequest)
}

function is_IE7()
{
  return (navigator.appName.indexOf("Microsoft Internet Explorer") > -1 && window.XMLHttpRequest)
}

// clones an event and positioning attributes
// @param   obj   the object to clone
// @return  the cloned object
function clone_obj(obj)
{
  if (typeof(obj) != 'object')
    return null;

  try
  {
    var new_obj = new Object;

    if (typeof(obj.pageX) != 'undefined')
      new_obj['pageX'] = obj.pageX;

    if (typeof(obj.pageY) != 'undefined')
      new_obj['pageY'] = obj.pageY;

    if (typeof(obj.clientX) != 'undefined')
      new_obj['clientX'] = obj.clientX;

    if (typeof(obj.clientY) != 'undefined')
      new_obj['clientY'] = obj.clientY;

    return new_obj;
  }
  catch (e)
  {
    return null;
  }
}
// DOMUtils namespace
function DOMUtils() {};

// assigns inner HTML to element by id, and does error checking
DOMUtils.fill_element = function(id, html)
{
  var el = xb_get_element(id);
  if (el && typeof(html) != 'undefined' && html != null)
    el.innerHTML = html;
}
// returns inner html of an element
DOMUtils.get_inner_html = function(id)
{
  var el = xb_get_element(id);
  if (el && typeof(el.innerHTML) != 'undefined')
    return el.innerHTML;
  return '';
}
// removes from dom
DOMUtils.remove_element = function(id)
{
  var el = xb_get_element(id);
  if (el && el.parentNode)
    el.parentNode.removeChild(el);
}
// disables a button
DOMUtils.disable_button = function(btn, dis)
{
  if (typeof(btn) != 'undefined' && btn.disabled)
    btn.disabled = dis;
}
// sets the value of an element
DOMUtils.set_value = function(elm, val)
{
  var element = xb_get_element(elm);
  if (element && typeof element.value !== 'undefined')
  {
    element.value = val;
    return true;
  }
  return false;
}
// focuses an element
DOMUtils.focus = function(elm)
{
  var element = xb_get_element(elm);
  if (typeof(element.focus) === 'function')
    element.focus();
}
// hides selects under element for ie
// @param el  the element under which to hide the selects
// @param left    optional. the left position of the element
// @param top     optional. the top position of the element
// @param width   optional. the width of the element
// @param height  optional. the height of the element
DOMUtils.hide_selects_by_el = function(el, left, top, width, height)
{
  if (!is_IE() || is_IE7())
    return;

  var iframe_id = 'ie_iframe';
  var el = xb_get_element(el);

  if (el)
  {
    // No voices iframe
    if (el.parentNode.id=='voices_location_auto')
      return;

    var iframe = xb_get_element(iframe_id);

    if (iframe)
    {
      iframe.parentNode.removeChild(iframe);
      // We are moving the iframe, and the autocomplete_panel may be open - so hide that now
      if (el.id!='autocomplete_panel' && xb_get_element('autocomplete_panel'))
        hide(xb_get_element('autocomplete_panel'));
    }

    if (typeof(left) == 'undefined' || !left)
    {
      var displacement = 0;

      // the inside of the popups are left -3px so we need to move the
      // iframe by that much so that it doesn't peep through the shadow
      // but we don't want that for the top nav iframe or pulldown menu classes (f_rss)
      if (el.parentNode.id.indexOf('nav_') < 0 && el.id.indexOf('f_')!=0)
        var displacement = -3;

      if (el.id == 'autocomplete_panel') // autocomplete popup
        var displacement = 1;

      var left = el.style.left;

      if (typeof(left) == 'undefined' || !left)
        left = findPosX(el) + displacement + 'px';
      else
        left = parseInt(left) + displacement + 'px';//Number(left.substring(0, left.length - 2)) - 3 + 'px';
    }

    if (typeof(top) == 'undefined' || !top)
    {
      var displacement = 0;

      if (el.parentNode.id.indexOf('nav_') < 0 && el.id.indexOf('f_')!=0)
        var displacement = -3;

      if (el.id == 'autocomplete_panel') // autocomplete popup
        var displacement = 1;

      var top = el.style.top;

      if (typeof(top) == 'undefined' || !top)
        top = findPosY(el) + displacement + 'px';
      else
        top = parseInt(top) + displacement + 'px';//Number(left.substring(0, left.length - 2)) - 3 + 'px';
    }

    if (typeof(width) == 'undefined' || !width || typeof(height) == 'undefined' || !height)
    {
      var dim = get_object_dimensions(el);

      if (el.id == 'autocomplete_panel') // autocomplete popup
      {
        var width = dim.width - 1 + 'px';
        var height = dim.height - 1 + 'px';
      }
      else
      {
        var displacement = 0;
        if (el.parentNode.id.indexOf('nav_') < 0 && el.id.indexOf('f_')!=0)
          var displacement = 2;

        var width = dim.width + displacement + 'px';
        var height = dim.height + displacement + 'px';
      }
    }

    var top_z_index = el.style.zIndex;
    if (typeof(top_z_index) == 'undefined' || !top_z_index)
      top_z_index = 995;

    // alert(el.parentNode.tagName);
    iframe = document.createElement('iframe');

    iframe.id = iframe_id;
    iframe.style.position = 'absolute';
    iframe.style.left = left;
    iframe.style.top = top;
    iframe.style.height = height;
    iframe.style.width = width;
    iframe.style.zIndex = top_z_index - 1;
    el.style.zIndex = top_z_index;
    //alert(left + ',' + top + ',' + width + ',' + height);
    // iframe.style.display = 'block';
    // iframe.style.filter = 'mask()';

    var parent = el.parentNode;

    if (el.id == 'autocomplete_panel') // autocomplete popup
    {
      nav = xb_get_element('nav_newsfeed');
      if (nav)
        parent = nav;
    }
    else if (el.id=='claim_learn_more_popup')
    {
      parent = parent.parentNode;
    }

    if (typeof(parent) == 'undefined' || !parent || !parent.tagName)
    {
      document.body.appendChild(iframe);
    }
    else if (parent.tagName == 'LI')
    {
      parent = parent.parentNode;

      if (typeof(parent) == 'undefined' || !parent)
        document.body.appendChild(iframe);
      else
        parent.appendChild(iframe);
    }
    else
    {
      parent.appendChild(iframe);
    }
  }
}

// simpl object to attach and stop events
DOMUtils.Event = {
  add: function()
  {
    if (window.addEventListener) {
      return function(el, type, fn) {
        el = (typeof(el) !== 'object')? xb_get_element(el) : el;
        if (el) {
          el.addEventListener(type, fn, false);
        }
      };
    } else if (window.attachEvent) {
      return function(el, type, fn) {
        var f = function() {
          el = (typeof(el) !== 'object')? xb_get_element(el) : el;
          if (el) {
            fn.call(el, window.event);
          }
        };
        el = (typeof(el) !== 'object')? xb_get_element(el) : el;
        if (el) {
          el.attachEvent('on' + type, f);
        }
      };
    }
  }(),
  stop: function(e) {
    if (e && typeof(e) != 'undefined')
    {
      if (e.preventDefault)
      {
        e.preventDefault();
      }
      else
      {
        e.returnValue = false;
      }

      if (e.stopPropagation)
      {
         e.stopPropagation();
      }
      else
      {
        e.cancelBubble = true;
      }
    }
    return false;
  }
};

// ****************************
// ajax wrapper
// ****************************
function QAjax(aj_field,add_values)
{
  this.values = new Object();
  this.script = '';
  this.method = 'get';
  this.output = 'text';
  this.callback = this.default_callback;
  // if you have an _aj_scripts object with script information
  // you can use it here
  if (typeof(aj_field) != 'undefined' && aj_field != null && typeof(_aj_scripts[aj_field]) != 'undefined')
    this.set_script_info(_aj_scripts[aj_field]);
  if (typeof(add_values) != 'undefined')
  {
    for (var i in add_values)
    {
      this.set_value(i, add_values[i]);
    }
  }
}
// sets callback function on ready state
QAjax.prototype.set_callback = function(f)
{
  this.callback = f;
}
// default callback on ready state
QAjax.prototype.default_callback = function(output)
{
  //alert('default callback ' + output);
}
// sets a value to update
QAjax.prototype.set_value = function(n,v)
{
  this.values[n] = v;
}
// forces cache break
QAjax.prototype.break_cache = function()
{
  this.set_value('nocache', new Date().valueOf());
}
// sets values from form
QAjax.prototype.set_from_form = function(frm)
{
  for (var i = 0; i < frm.length; ++i)
  {
    var frmel = frm.elements[i];
    if ((frmel.type == 'checkbox' || frmel.type == 'radio') && !frmel.checked)
      continue;
    this.set_value(frmel.name, frmel.value);
  }
  if (frm.method)
    this.method = frm.method;
  if (frm.action)
    this.script = frm.action;
}
// sets the script, method and output type
// stored in global var _aj_scripts, but could be elsewhere
QAjax.prototype.set_script_info = function(si)
{
  this.script = si.script;
  this.method = si.method;
  this.output = si.output;
}
// function to perform the ajax call
QAjax.prototype.go = function()
{
  // build argument string
  var arg_str = '';
  for (var i in this.values)
    arg_str += (i+'='+encodeURIComponent(this.values[i])+'&');
  if (typeof(_qa_remct_tkn) != 'undefined')
    arg_str += 'tkn='+encodeURIComponent(_qa_remct_tkn)+'&';
  if (this.method == 'get')
    this.do_get(arg_str);
  else
    this.do_post(arg_str);
}
// post
QAjax.prototype.do_post = function(arg_str)
{
  var http = getHTTPObject();
  http.open("POST", site_root + this.script, true);
  http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  http.send(arg_str);
  var _callback = this.callback;
  var _output = this.output;
  http.onreadystatechange = function()
  {
    if (http.readyState == 4)
    {
      if (_output == 'xml')
        _callback(http.responseXML);
      else
        _callback(http.responseText);
    }
  }
}
// get
QAjax.prototype.do_get = function(arg_str)
{
  var http = getHTTPObject();
  http.open("GET", site_root + this.script + '?' + arg_str);
  var _callback = this.callback;
  var _output = this.output;
  http.onreadystatechange = function()
  {
    if (http.readyState == 4)
    {
      if (_output == 'xml')
        _callback(http.responseXML);
      else
        _callback(http.responseText);
    }
  }
  http.send(null);
}
// ****** end ajax wrapper *****

// ****** start Autocomplete Object *****
// autocomplete.js
// roger 2008-02-05
// BEGIN SUPPORTING FUNCTIONS
// view port as well
var Client = {
viewportWidth: function() {
  return self.innerWidth || (document.documentElement.clientWidth || document.body.clientWidth);
},

viewportHeight: function() {
  return self.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight);
},

viewportSize: function() {
  return { width: this.viewportWidth(), height: this.viewportHeight() };
}
};

var _KEY_CODES = {'arrow_down':40,'arrow_up':38,'arrow_left':37,'arrow_right':39,'home':36,'enter':13,'space':32,'tab':9};

function get_key_code(evt)
{
  var k;
  if(!evt)
  {
    var evt;
    //if the browser did not pass the event information to the
    //function, we will have to obtain it from the event register
    if(window.event)
      evt = window.event;
    else
      return null;
  }
  if(typeof(evt.keyCode) == 'number')
    k = evt.keyCode;
  else if(typeof(evt.which) == 'number')
    k = evt.which;
  else if (typeof(evt.charCode) == 'number')
    k = evt.charCode;
  else
    return null;
  return {'code':k,'character':String.fromCharCode(k) };
}
// http://www.quirksmode.org/js/findpos.html
function findPos(obj)
{
  var curleft = curtop = 0;
  if (obj.offsetParent)
  {
    do
    {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    }
    while (obj = obj.offsetParent);
  }
  return {'x':curleft,'y':curtop};
}
// find page height
// http://codylindley.com/Webdev/295/javascript-get-page-height-with-scroll
function get_page_dimensions()
{
  var pageWidth = 0;
  var pageHeight = 0;
  if( window.innerHeight && window.scrollMaxY )
  // Firefox
  {
    pageWidth = window.innerWidth + window.scrollMaxX;
    pageHeight = window.innerHeight + window.scrollMaxY;
  }
  else if(document.body.scrollHeight > document.body.offsetHeight ) // all but Explorer Mac
  {
    pageWidth = document.body.scrollWidth;
    pageHeight = document.body.scrollHeight;
 }
  else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
  {
    pageWidth = document.body.offsetWidth + document.body.offsetLeft;
    pageHeight = document.body.offsetHeight + document.body.offsetTop;
  }
  return {'width':pageWidth,'height':pageHeight};
}
// END SUPPORTING FUNCTIONS

// Autocomplete object
function Autocomplete(query_type, parent_id, form, field, value_field, default_value, location_type, exclude_type)
{
  if( document.captureEvents && Event.KEYUP )
  {
    document.captureEvents( Event.KEYUP );
  }
  // the autocomplete panel holding suggestions
  this.panel = null;
  // list inside panel
  this.list = null;
  // the dom element to attach panel to
  this.parent = xb_get_element(parent_id);
  // the id prefix
  this.id_prefix = parent_id + "_";
  // index of preselected item (-1 if none)
  this.preselected = -1;
  // form the field attached to the autocomplete belongs to
  this.form = form;
  // the autocomplete field used to query
  this.field = form[field];
  this.old_value = this.field.value;
  // the field you set after selection
  this.value_field = form[value_field];
  // flag to trigger (or not trigger) a reload
  this.can_load = false;
  // id of timeout
  this.timeout = null;
  // default timeout duration
  this.timeout_duration = 350;
  // throbber
  this.wait_url = '../images.trulia.com/images/qa/loading_white_sml.gif';
  // number of links
  this.size = 0;
  // max number of links
  this.max_size = 30;
  // items
  this.items = null;
  // last string that triggered a load; don't reload if it hasn't changed
  this.last_trigger_value = '';
  // query type
  this.query_type = query_type;
  // reverse--testing
  this.reverse = false;
  // min query length to trigger a lookup
  this.min_query_length = 3;

  // if no valid results
  this.errored = 0;
  // are we pressing enter? might want to revisit key press events
  this.enter_pressed = false;

  // allow limiting by location_type
  this.locationType = location_type;
  // exclude location types
  this.excludeType = typeof(exclude_type) != 'undefined' ? exclude_type : null;
  // submit the form on enter key
  this.submit_form = false;
  // add event handling to the field
  // invalidates whenever the value changes
  var _me = this;
  // trigger handle_edit_box if this is set
  var default_value = default_value;
  this.field.onfocus = function() { _me.invalidate(false); handle_edit_box(this, default_value, true); }

  DOMUtils.Event.add(this.field, 'keyup',  function(event) { return _me.handle_keyup(event); });
  DOMUtils.Event.add(this.field, 'keydown', function(event) { return _me.handle_keydown(event);});
  DOMUtils.Event.add(this.field, 'keypress', function(event) { _me.handle_keypress(event)} );
}
// sets submit on enter
Autocomplete.prototype.submit_on_enter = function(sub)
{
  if (typeof sub !== 'undefined' && (sub === true || sub === false))
    this.submit_form = sub;
  else
    this.submit_form = true;
}
// sets size
Autocomplete.prototype.set_max_size = function(size)
{
  this.max_size = size;
}
// sets min query length before lookup
Autocomplete.prototype.set_min_query_length = function(l)
{
  this.min_query_length = parseInt(l);
  if (this.min_query_length < 1)
    this.min_query_length = 3;
}
// sets a different value for the timeout
Autocomplete.prototype.set_timeout_duration = function(dur)
{
  this.timeout_duration = parseInt(dur);
}
// returns the field's value
Autocomplete.prototype.get_value = function()
{
  return trim(this.field.value);
}
// queries suggestions
Autocomplete.prototype.look_up = function()
{
  this.value_field.value = ''; // clear hidden value on ajax lookup
  if (!this.can_load)
    return;
  var query = this.get_value();
  if (query.length < this.min_query_length)
    return;
  if (query == this.last_trigger_value)
  {
    this.show_panel();
    return;
  }
  this.last_trigger_value = query;
  if (this.panel == null)
    this.create_panel(true);
  // look up the suggestions
  var _me = this;
  var ajax = new QAjax();
  ajax.set_script_info( {'script':'q_suggestion.php','method':'get','output':'text'} );
  ajax.set_value('q', query);
  ajax.set_value('query_type', this.query_type);
  ajax.set_value('max', this.max_size);
  if (this.locationType)
  {
    ajax.set_value('location_type', this.locationType);
  }
  if (this.excludeType)
  {
    ajax.set_value('exclude_type', this.excludeType);
  }
  ajax.set_callback(
    function(text)
    {
      eval('_me.items='+text);
      _me.load_panel();
    }
  );
  ajax.go();
}
// cancels the lookup
Autocomplete.prototype.cancel_timeout = function()
{
  if (this.timeout)
  {
    window.clearTimeout(this.timeout);
    this.timeout = null;
    this.can_load = false;
  }
}
// handles key down events
Autocomplete.prototype.handle_keydown = function(event)
{
  var key = get_key_code(event);
  if (key)
  {
    switch(key.code)
    {
      case _KEY_CODES.enter:
        DOMUtils.Event.stop(event);
        if (this.preselected!=-1)
        {
          this.enter_pressed = true;
          this.select_item(this.preselected);
          this.can_load = false;
          this.cancel_timeout();
        }
        return false;
        break;
      case _KEY_CODES.tab:
        return;
        break;
    }
  }
  this.cancel_timeout();
  return;
}

// handles key press events
// this one is is fired when you press Enter from inside a input field in a form
Autocomplete.prototype.handle_keypress = function(event)
{
  var key = get_key_code(event);
  if (key)
  {
    if (key.code == _KEY_CODES.enter)
    {
        DOMUtils.Event.stop(event);
        if (this.submit_form)
          this.form.submit();
        return false;
    }
  }
  return;
}
// handles key up (key release) events
Autocomplete.prototype.handle_keyup = function(event)
{
  var key = get_key_code(event);

  // Trim whitespace from front and more than one space to a single space only
  if (key.code!=_KEY_CODES.home && key.code!=_KEY_CODES.arrow_left && key.code!=_KEY_CODES.arrow_right)
    this.field.value = this.field.value.replace(/^\s+/, '').replace(/\s+/g, ' ');

  var value = this.field.value;
  this.can_load = true;
  if (key)
  {
    switch(key.code)
    {
      case _KEY_CODES.arrow_down:
        this.move_preselected('down');
        this.can_load = false;
        break;
      case _KEY_CODES.arrow_up:
        this.move_preselected('up');
        this.can_load = false;
        break;
      case _KEY_CODES.space:
        if (this.preselected!=-1)
        {
          this.select_item(this.preselected);
          this.can_load = false;
        }
        break;
      case _KEY_CODES.enter:
        if (this.preselected!=-1)
        {
          if (!this.enter_pressed)
          {
            this.select_item(this.preselected);
          }
          this.enter_pressed = false;
          this.can_load = false;
        }
        if (this.submit_form)
        {
          this.can_load = false;
          this.form.submit();
        }
        break;
      default:
        // Clear hidden field if typing
        // Only clear the location id field if user is modifying printable characters, including space
        if (this.old_value!=value)
          this.value_field.value = '';
        break;
    }
  }

  // Only perform lookup if printable text has changed and there is something there
  if (this.old_value!=value && this.get_value().length>0)
  {
    if (this.can_load)
    {
      var _me = this;
      this.timeout = setTimeout(function(){_me.look_up();}, this.timeout_duration);
    }
  }
  this.old_value = value; // Save new display field value for next keypress
  if (this.get_value() == '') // If no printable display; spaces are removed
  {
    this.hide_panel();
    this.value_field.value = '';
  }

  return;
}
// creates the panel with the suggestions
Autocomplete.prototype.create_panel = function(wait)
{
  this.panel = $$('div');
  this.panel.className = 'autocomplete_panel';
  this.panel.id = 'autocomplete_panel';
  if (typeof(wait) != 'undefined' && wait)
    this.show_wait();
  this.parent.appendChild(this.panel);
}
// loads data into the panel
Autocomplete.prototype.load_panel = function()
{
  this.errored = 0;
  if (this.panel == null)
    this.create_panel();
  this.clear_panel();
  if (this.items != null)
  {
    // make a list
    this.list = $$('ul');
    this.list.className = 'flist';
    for (var i in this.items)
    {
      this.load_item(i);
      ++this.size;
    }
    this.panel.appendChild(this.list);
    if (this.should_inverse())
      this.inverse_panel();
    else
      this.deinverse_panel();
  }
  else
  {
    this.errored = 1;
    this.value_field.value = 0;
    this.show_error();

    /* HACK: Need to set size to 1
     * This will allow inverse location to be calculated
     * correctly where there is no results.
     */
    this.size = 1;
    if (this.should_inverse())
      this.inverse_panel();
    else
      this.deinverse_panel();
    this.size = 0;
  }
  this.show_panel();

  // Only set hidden value if one result and text fields are the same
  if (this.size == 1 && this.field.value.length==this.items[0].display.length)
  {
    this.exact_match_found();
  }
}

// Exact match found.  Populate field and close panel.
Autocomplete.prototype.exact_match_found = function()
{
  this.select_item('0', false);
}

// goes down the list
Autocomplete.prototype.move_preselected = function(direction)
{
  // unselect previous
  this.unpreselect();
  if (direction == 'up')
    this.preselected -= 1;
  else
    this.preselected += 1;
  // wrap around
  if (this.preselected < 0)
    this.preselected = this.size - 1;
  // wrap around
  if (this.preselected >= this.size)
    this.preselected = 0;
  this.preselect(this.preselected);
}
// selects a value (i.e. sets it in the hidden form field)
Autocomplete.prototype.select = function(val,display)
{
  this.value_field.value = val;
  this.field.value = display;
  this.hide_panel();
}
var srp_previous_value = 0;
// selects an item by index
Autocomplete.prototype.select_item = function(index, dont_change_display)
{
  if (typeof(this.items) == 'undefined' || index < 0 || index >= this.size || typeof(this.items[index]) == 'undefined')
    return;
  var item = this.items[index];
  // homepage newsfeed/srp wants alternate/neighborhood ids for neighborhoods
  if (this.value_field.id=='hp_autocomplete_value')
  {
    if (item.type=='neighborhood')
      this.value_field.value = item.altValue;
    else // homepage newsfeed not currently needing id for cities, etc.
      this.value_field.value = '';
  }
  else if(this.value_field.id=='srp_autocomplete_value')
  {
    if (item.type=='neighborhood')
    {
      this.value_field.value = item.altValue;
      val = item.altValue;
    }
    else
    {
      this.value_field.value = item.value;
      val = item.value;
    }
  }
  else
  {
    this.value_field.value = item.value;
  }
  if (typeof(dont_change_display)=='undefined' || !dont_change_display)
    this.field.value = item.display;
  this.hide_panel();
  if(this.value_field.id=='srp_autocomplete_value')
  {
    if(val != 0 && val != srp_previous_value)
    {
      this.field.blur();
      if (document.body && document.body.focus)
        document.body.focus();
      this.field.value = item.display;
      srp_previous_val = val;
      srp_add_location();
    }
  }
}
// selects an item by index

// preselects a link in the panel (mouseover)
Autocomplete.prototype.preselect = function(index)
{
  // select new one
  if (index >= this.size)
    index = this.size - 1;
  else if (index < 0)
    index = 0;
//  alert(index);
  var el = xb_get_element(this.id_prefix + index);
  if (!el)
    return;
  el.className = "autocomplete_link autocomplete_link_hover";
}
// clears the preselected item
Autocomplete.prototype.unpreselect = function(index)
{
  if (this.preselected < 0)
    return;
  var el = xb_get_element(this.id_prefix + this.preselected);
  if (!el)
    return;
  el.className = "autocomplete_link";
}
// highlights keyword
Autocomplete.prototype.highlight = function(text)
{
  if (this.last_trigger_value == '')
    return text;
  var re = new RegExp('('+this.last_trigger_value+')','ig');
  return text.replace(re, "<b>$1</b>");
}
// adds a single item to the panel
//Autocomplete.prototype.load_item = function(item,id,index)
Autocomplete.prototype.load_item = function(index)
{
  var _me = this;
  var item = this.items[index];
  var li = $$('li', this.highlight(item.display), this.id_prefix + index);
  li.className = 'autocomplete_link';
  li.onclick = function() { _me.select_item(index); }
  this.list.appendChild(li);
}
// show error
Autocomplete.prototype.show_error = function()
{
  this.clear_panel();
  var div = $$('div', 'Sorry&#8212;no matches found.');
  div.className = 'error';
  this.panel.appendChild(div);
}
// show throbber
Autocomplete.prototype.show_wait = function()
{
  var img = $$('img');
  img.src = this.wait_url;
  this.clear_panel();
  this.panel.appendChild(img);
}
// clears the panel
Autocomplete.prototype.clear_panel = function()
{
  this.size = 0;
  this.preselected = -1;
  if (!this.panel)
    return;
  this.panel.innerHTML = '';
}
// hides the panel
Autocomplete.prototype.hide_panel = function()
{
  if (!this.panel)
    return;
  if (this.form.id != 'register_form')
    unhide_selects();
  hide(this.panel);
}
// shows the panel
Autocomplete.prototype.show_panel = function()
{
  if (!this.panel)
    return;
  if (this.form.id != 'register_form')
    DOMUtils.hide_selects_by_el('autocomplete_panel');
  unhide(this.panel);
}
// invalidates (cancels selection)
Autocomplete.prototype.invalidate = function(clear)
{
  if (clear)
    this.select('','');
  this.clear_panel();
  this.hide_panel();
  this.value_field.value = 0;
}
// decides whether the panel should be shown on top
Autocomplete.prototype.should_inverse = function()
{
  var pos = findPos(this.field);
  var ht = this.get_height();
  var c = f_clientSize();
  var formPosY = pos.y - c.scrollTop; // take into account viewable area
  // show on top IF
  // 1) it would be too tall at the bottom
  // 2) there's room at the top
  // if you have no room either way, show at the bottom by default
  var r = false;
  // no room at the top? fuggetabout it
  // room at the top AND too tall?
  if (ht <= formPosY && ht > (c.height - formPosY))
    r = true;
  //alert(ht + ' - ' + c.height + ' - ' + formPosY + ' - ' + r.toString());
  return r;
}
// returns height
Autocomplete.prototype.get_height = function()
{
  return offset = 16 * this.size;
}
// moves panel up above the input box
Autocomplete.prototype.inverse_panel = function()
{
  var offset = -1 * this.get_height() - 18; // allow for edit box itself
  this.panel.style.marginTop = offset + 'px';
  this.panel.className = 'autocomplete_panel autocomplete_panel_inverted';
}
// moves panel down below the input box
Autocomplete.prototype.deinverse_panel = function()
{
  //var offset = -1 * this.get_height() - 18; // allow for edit box itself
  this.panel.style.marginTop = '0px';
  this.panel.className = 'autocomplete_panel';
}

// ****** end Autocomplete Object *****

//****************************************
// START CLAIM LISTING (for details page)
//****************************************
function show_claim_listing_popup(event,branded)
{
  if (branded == 2)
    toggle_menu(event, 'claim_broker_colisting_popup', 1);
  else if (branded > 0)
    toggle_menu(event, 'claim_colisting_popup', 1);
  else
    toggle_menu(event, 'claim_learn_more_popup', 1);
}

/**
  @param  pid             ID of property to be featured
  @param  property_hash   hash of property to be featured. Not used for the moment. For future support of other prop type.
  @param  action          what the user just clicked. Can be: accepted_tos, or changed_account
*/
function do_claim_listing(pid, property_hash, action, branding_agent_id)
{
  if (typeof(suffix) == 'undefined' || !suffix) { suffix = ''; }

  if ((typeof(pid) == 'undefined' || !pid) && _DETAILS_PROPERTY_ID)
    var pid = _DETAILS_PROPERTY_ID;

  if ((typeof(property_hash) == 'undefined' || !property_hash) && _DETAILS_PROPERTY_HASH)
    var property_hash = _DETAILS_PROPERTY_HASH;

  var ajax = new QAjax();
  ajax.set_value('pid', pid);
  // ajax.set_value('property_hash', property_hash);
  ajax.set_value('pa', _DETAILS_PROPERTY_ADDRESS);
  ajax.set_value('ac', action);
  ajax.set_value('ba_id', branding_agent_id);
  ajax.set_script_info( {'script':'q_claim_listing.php','method':'get','output':'text'} );
  ajax.set_callback(
    function(output)
    {
      eval('var results = ' + output);

      switch (results.claim_status)
      {
        case 'not_logged_in':
          login_next_step_global = 'claiming'; // global on purpose
          show_login('', 'signup', '', {'x' : 300, 'y' : 300});
          break;

        case 'already_claimed':
          toggle_menu('', 'claim_already_claimed_popup', 1);
          login_next_step_global  = ''; // this is a global on purpose
          break;

        case 'show_tos':
          toggle_menu('', 'claim_terms_of_service_popup', 1);
          login_next_step_global  = ''; // this is a global on purpose
          break;

        case 'change_account':
          toggle_menu('', 'claim_change_account_type_popup', 1);
          login_next_step_global  = ''; // this is a global on purpose
          break;

        case 'confirm_account':
          var preview = xb_get_element('claim_confirm_account_preview');

          if (preview && typeof(results.html_text) != 'undefined' && results.html_text)
             preview.innerHTML = results.html_text;

          toggle_menu('', 'claim_confirm_account_popup', 1);
          login_next_step_global  = ''; // this is a global on purpose
          break;

        case 'success':
          var preview = xb_get_element('claim_success_preview');

          if (preview && typeof(results.html_text) != 'undefined' && results.html_text)
             preview.innerHTML = results.html_text;

          toggle_menu('', 'claim_success_popup', 1);
          login_next_step_global  = ''; // this is a global on purpose
          break;

        case 'over':
        case 'error':
        case 'failed':
        default:
          show_claimed_failed_popup(output);
          login_next_step_global  = ''; // this is a global on purpose
      }
    }
  );
  ajax.go();
}

// ERROR CODES:
// CML_11: this function errored (it's default text in tpl showing), usually q_claim_listing.php crashed
// CML_12: no pid passed on ajax to q_claim_listing.php or $MyListingsData->claim_or_feature_agent_listing() errored out (returned error code) or didn't return anything
// CML_13: $MyListingsData->claim_or_feature_agent_listing() returned failed code
// CML_14: q_claim_listing.php returned garbage or didn't return anything
function show_claimed_failed_popup(reason)
{
  var reason_text = '';

  switch (reason)
  {
    // from agree to TOS popup
    case 'tos':
      reason_text = "Sorry! Unfortunately, you cannot brand a listing on Trulia " +
      "with your name and photo without accepting our Terms of Service.";
      break;
    // from change your account type popup
    case 'account_type':
      reason_text = "Sorry! Unfortunately, you cannot brand a listing on Trulia " +
      "with your name and photo unless your Trulia account says that you're a real " +
      "estate professional.";
      break;
    case 'over':
      reason_text = "Sorry! Unfortunately, you have reached the maximum number of  " +
      "properties you can claim and we could not process your request."
      break;
    case 'error':
      reason_text = "Sorry! Unfortunately, we weren't able to brand this listing. " +
      "An error occurred (Error code: CML_12). Please try again later or contact us at <a " +
      "href=\"mailto:customerservice@trulia.com?subject=Claiming my listings on the " +
      "property details page (Error code: CML_12)\">customerservice@trulia.com</a>."
      break;
    case 'failed':
      reason_text = "Sorry! Unfortunately, we weren't able to brand this listing. " +
      "An error occurred (Error code: CML_13). Please try again later or contact us at <a " +
      "href=\"mailto:customerservice@trulia.com?subject=Claiming my listings on the " +
      "property details page (Error code: CML_13)\">customerservice@trulia.com</a>."
      break;
    default:
      reason_text = "Sorry! Unfortunately, we weren't able to brand this listing. " +
      "An error might have occurred (Error code: CML_14). Please contact us at <a " +
      "href=\"mailto:customerservice@trulia.com?subject=Claiming my listings on the " +
      "property details page (Error code: CML_14)\">customerservice@trulia.com</a> if " +
      "you have any questions.";
  }

  var claim_failed_reason = xb_get_element('claim_failed_reason');

  if (claim_failed_reason)
     claim_failed_reason.innerHTML = reason_text;

  toggle_menu('', 'claim_failed_popup', 1);
}

//****************************************
// END CLAIM LISTING (for details page)
//****************************************


//****************************************
// START EMAIL LISTING AGENT
//****************************************
function send_email_to_agent(frm)
{
  var agent_email = trim(frm.ae.value);
  if (!agent_email || is_valid_email(agent_email) != EMAIL_OK)
  {
    var error_container = xb_get_element('contact_agent_form_error_msg');
    if(error_container)
    {
      remove_class(error_container, 'hidden');
      error_container.innerHTML = 'Sorry &#8212 An error occurred while sending your email.';

      setTimeout(
              function()
              {
                close_contact_agent_form_popup();
              }, 3000);
    }

    return false;
  }

  var user_email = trim(frm.u_email.value);
  if (!user_email || is_valid_email(user_email) != EMAIL_OK)
  {
    bad_email_alert();
    return false;
  }

  var property_id = frm.pid.value;
  var user_name = frm.u_name.value;
  var user_phone = frm.u_phone.value;
  var message = frm.msg.value;

  var date = new Date();
  var ajax = new QAjax();

  ajax.set_value('s', date.valueOf());
  ajax.set_value('r_email', agent_email);
  ajax.set_value('propertyId', property_id);
  ajax.set_value('s_email', user_email);
  ajax.set_value('s_name', user_name);
  ajax.set_value('phone', user_phone);
  ajax.set_value('message', message);
  ajax.set_script_info( {'script':'q_email_agent.php','method':'post','output':'text'} );
  ajax.set_callback(
    function(status)
    {
      var error_container = xb_get_element('contact_agent_form_error_msg');
      var msg;
      switch(status)
      {
        case '1':
          msg = 'Success! Your email was sent.';
          setTimeout(
                  function()
                  {
                    close_contact_agent_form_popup();
                  }, 3000);
          break;

        case '-1':
        default:
          msg = 'Sorry&#8212An error occurred while sending your email.';
          setTimeout(
                  function()
                  {
                    close_contact_agent_form_popup();
                  }, 3000);
          break;
      }

      _num_friend_emails = 1;

      if(error_container)
      {
        error_container.innerHTML = msg;
        remove_class(error_container, 'hidden');
      }
    }
  );
  ajax.go();
}

function close_contact_agent_form_popup()
{
  var error_container = xb_get_element('contact_agent_form_error_msg');

  if(error_container)
  {
    clear_element(error_container);
    add_class(error_container, 'hidden');
  }

  clear_form('contact_agent_form');
  toggle_menu('', 'contact_agent_form_popup', 0);
}

//****************************************
// END EMAIL LISTING AGENT
//****************************************

function details_open_home_submit() {}

details_open_home_submit.submission_dates = null;
details_open_home_submit.user_id = null;
details_open_home_submit.property_id = null;

details_open_home_submit.validate = function()
{
  var date_val;
  var start_time_val;
  var end_time_val;
  var has_error = false;

  if(xb_get_element('details_open_homes_property_id'))
    this.property_id = xb_get_element('details_open_homes_property_id').value;
  if(xb_get_element('details_open_homes_user_id'))
    this.user_id = xb_get_element('details_open_homes_user_id').value;

  this.submission_dates = new Array();
  for(var i = 1; i <= 4; i++)
  {
    if(xb_get_element('open_home_date_'+i))
    {
      date_val = xb_get_element('open_home_date_'+i);
    }
    if(xb_get_element('open_home_start_time_'+i))
    {
      start_time_val = xb_get_element('open_home_start_time_'+i);
    }
    if(xb_get_element('open_home_end_time_'+i))
    {
      end_time_val = xb_get_element('open_home_end_time_'+i);
    }
    var submission_date = new Object;
    submission_date.the_date = date_val.value;
    submission_date.start_time_non_human = start_time_val[start_time_val.selectedIndex].value;
    submission_date.start_time_human = start_time_val[start_time_val.selectedIndex].text;
    submission_date.end_time_non_human  =  end_time_val[end_time_val.selectedIndex].value;
    submission_date.end_time_human  =  end_time_val[end_time_val.selectedIndex].text;
    this.submission_dates.push(submission_date);
  }
  var is_valid_submission = this.validate_if_date_entered();
  if(is_valid_submission)
  {
    is_valid_submission = !this.validate_time_conflicts();
  }
  if(is_valid_submission)
  {
    this.add_open_home_submission();
  }
}

details_open_home_submit.validate_if_date_entered = function()
{
  var date_entered = false;
  var valid_dates = true;
  for(index in this.submission_dates)
  {
    var submission_date = this.submission_dates[index];
    if(submission_date.the_date == '' && submission_date.start_time_non_human == '' && submission_date.end_time_non_human == '')
      continue;
    else
    {
      var div_index = parseFloat(index) + 1;
      date_entered = true;
      if(submission_date.the_date == '')
      {
        valid_dates = false;
        this.switch_error(div_index, true, 'Please enter the date');
      }
      else if(submission_date.start_time_non_human == '')
      {
        valid_dates = false;
        this.switch_error(div_index, true, 'Please enter the start time');
      }
      else if(submission_date.end_time_non_human == '')
      {
        valid_dates = false;
        this.switch_error(div_index, true, 'Please enter the end time');
      }
      else if(submission_date.start_time_non_human >= submission_date.end_time_non_human)
      {
        valid_dates = false;
        this.switch_error(div_index, true, 'The end time must be later than start time');
      }
      else
      {
        this.switch_error(div_index, false, '');
      }
    }
  }
  if(!date_entered)
    this.switch_error(0, true, 'Please enter at least one date and times');
  else
    this.switch_error(0, false, '');
  return date_entered && valid_dates;
}

details_open_home_submit.validate_time_conflicts = function()
{
  var size = this.submission_dates.length;
  var has_time_conflict = false;
  var times_that_conflict = new Array();
  for(var i = 0; i < size; i++)
  {
    times_that_conflict[i] = false;
  }
  for(var i = 0; i < size; i++)
  {
    for(var j = i + 1; j < size; j++)
    {
      var submission_date_1 = this.submission_dates[i].the_date;
      var submission_date_2 = this.submission_dates[j].the_date;
      var start_time_1 = this.submission_dates[i].start_time_non_human;
      var end_time_1 = this.submission_dates[i].end_time_non_human;
      var start_time_2 = this.submission_dates[j].start_time_non_human;
      var end_time_2 = this.submission_dates[j].end_time_non_human;

      if(submission_date_1 != '' && submission_date_2 != '' && start_time_1 != '' && end_time_1 != '' && start_time_2 != '' && end_time_2 != '')
      {
         if(this.has_time_conflict(submission_date_1, submission_date_2, start_time_1, end_time_1, start_time_2, end_time_2))
         {
           times_that_conflict[i] = true;
           times_that_conflict[j] = true;
           has_time_conflict = true;
           this.switch_error(i + 1, true, 'There is a time confict between date '+(i + 1)+' and date '+(j + 1));
           this.switch_error(j + 1, true, 'There is a time confict between date '+(i + 1)+' and date '+(j + 1));
        }
      }
    }
  }
  for(var i = 0; i < size; i++)
  {
    if(!times_that_conflict[i])
      this.switch_error(i + 1, false, '');
  }
  return has_time_conflict;
}

details_open_home_submit.has_time_conflict = function(submission_date_1, submission_date_2, start_time_1, end_time_1, start_time_2, end_time_2)
{
  if((submission_date_1 == submission_date_2) && ((start_time_1 >= start_time_2 && start_time_1 <= end_time_2) ||
                                                (end_time_1 >= start_time_2 && end_time_1 <= end_time_2) ||
                                                (start_time_2 >= start_time_1 && start_time_2 <= end_time_1) ||
                                                (end_time_2 >= start_time_1 && end_time_2 <= end_time_1)))
    return true;
  else
    return false;
}

details_open_home_submit.add_open_home_submission = function()
{
  var status_box = xb_get_element('details_open_homes_status_msg');

  hide('details_open_homes_input');
  status_box.innerHTML = 'Please wait...';
  unhide('details_open_homes_status', 'block');

  var msg = '';

  date = new Date();
  var ajax = new QAjax();

  ajax.set_value('s', date.valueOf());
  ajax.set_value('user_id', this.user_id);
  ajax.set_value('property_id', this.property_id);
  for(submission_date in this.submission_dates)
  {
    ajax.set_value('date_'+submission_date,  this.submission_dates[submission_date].the_date);
    ajax.set_value('start_time_'+submission_date,  this.submission_dates[submission_date].start_time_human);
    ajax.set_value('end_time_'+submission_date,  this.submission_dates[submission_date].end_time_human);
  }
  ajax.set_script_info( {'script':'q_add_open_homes_submission.php','method':'post','output':'text'} );
  ajax.set_callback(
    function(status)
    {
      if(status == 1)
      {
        msg = '<span class="f12">Thank for submitting your Open Home to Trulia. It will appear on Trulia in <span class="bold">within 36 hours</span></span>.<br /><br /><span class="bold">Tip: </span>To make sure your Open Home appears on Trulia, always submit it at least 36 hours before it occurs.';
      }
      else
      {
         msg = '<span class="f12">Thank for submitting your Open Home to Trulia.</span>';
      }
      status_box.innerHTML = msg;
    }
  );
  ajax.go();
}

details_open_home_submit.switch_error = function(date_index, on_or_off, error_msg)
{
  var error_div = xb_get_element('open_home_error_'+date_index);
  var date_label = xb_get_element('open_home_'+date_index);
  if(error_div)
  {
    //alert('try to switch '+date_index+' to '+on_or_off);
    error_div.innerHTML = error_msg;
    if(on_or_off)
    {
      unhide(error_div, 'block');
      if(date_label)
        add_class(date_label, 'error');
    }
    else
    {
      hide(error_div);
      if(date_label)
        remove_class(date_label, 'error');
    }
  }
}

details_open_home_submit.close_window = function()
{
  // Clear general error msg
  var general_error_msg = xb_get_element('open_home_error_0');
  if(general_error_msg)
  {
    clear_element(general_error_msg);
    hide(general_error_msg);
  }
  // Clear date-specific error msg and the date selection
  for(var i = 1; i <= 4; i++)
  {
    var open_home_date = xb_get_element('open_home_date_'+i);
    var open_home_start_time = xb_get_element('open_home_start_time_'+i);
    var open_home_end_time = xb_get_element('open_home_end_time_'+i);
    var error_msg = xb_get_element('open_home_error_'+i);
    var date_label = xb_get_element('open_home_'+i);
    if(open_home_date)
      open_home_date.selectedIndex = 0;
    if(open_home_start_time)
      open_home_start_time.selectedIndex = 0;
    if(open_home_end_time)
      open_home_end_time.selectedIndex = 0;
    if(error_msg)
    {
      clear_element(error_msg);
      hide(error_msg);
    }
    if(date_label)
      remove_class(date_label, 'error');
  }
  // and finally close the popup
  toggle_menu('', 'open_homes_submit', 0);
}

details_open_home_submit.close_status_window = function()
{
  clear_element('details_open_homes_status_msg');
  hide('details_open_homes_status');
  this.close_window();
  toggle_menu('', 'open_homes_submit', 0);
  unhide('details_open_homes_input');
}


/*******************************
USER PROPERTY NOTES - DETAILS PAGE
*******************************/
function user_property_note() {}
user_property_note.default_property_note = "e.g. great neighborhood, highly rated schools, nearby pool, walking distance to parks, coffee shops, and transit";
user_property_note.max_note_length = 1500;


user_property_note.toggle_display_note = function ()
{
  var upn_link  = xb_get_element('user_property_note_link');
  var upn       = xb_get_element('user_property_note');
  var editable_note = xb_get_element('editable_note');

  if (upn)
  {
    if (has_class(upn, 'hidden' ))
    {

      if (this.is_default_text())
        editable_note.style.color = "#666";

      upn_link.innerHTML = 'Hide Notes';
      upn_link.title = 'Hide Notes';
      remove_class(upn, 'hidden');
      add_class(upn, 'block');
    }
    else
    {
      upn_link.innerHTML = 'View Notes';
      upn_link.title     = 'View Notes';
      add_class(upn, 'hidden');
      add_class('edit_success_message', 'hidden');
      add_class('delete_success_message', 'hidden');

    }
  }
}

user_property_note.clear_note = function ()
{
  var editable_note = xb_get_element('editable_note');
  var delete_success_message  = xb_get_element('delete_success_message');
  var counter_element = xb_get_element('note_length');

  if (editable_note)
  {
    if (counter_element)
      counter_element.innerHTML = user_property_note.max_note_length;

    user_property_note.reset_messages();

    editable_note.value = '';
  }
}

user_property_note.is_default_text = function ()
{
  var editable_note = xb_get_element('editable_note');

  if (editable_note && (trim(editable_note.value) == user_property_note.default_property_note))
    return true;
  else
    return false;
}

user_property_note.reset_messages = function ()
{
  var edit_success_message  = xb_get_element('edit_success_message');
  var delete_success_message  = xb_get_element('delete_success_message');
  var editable_note = xb_get_element('editable_note');

  if (this.is_default_text())
  {
    editable_note.value = '';
    editable_note.style.color = '#000';
  }

  if (delete_success_message && edit_success_message)
  {
    add_class(edit_success_message, 'hidden');
    add_class(delete_success_message, 'hidden');
  }
}
user_property_note.update_character_count = function(display_id, input_id)
{
  var counter_element = xb_get_element(display_id);
  var input_element = xb_get_element(input_id);

  if (counter_element && input_element)
  {
    if (input_element.value.length > user_property_note.max_note_length)
      add_class(counter_element, 'red');

    var chars_left = user_property_note.max_note_length - input_element.value.length;
    counter_element.innerHTML = chars_left;//input_element.value.length;
  }
}
function q_user_property_note(action, note_text_element, property_id)
{
  if (!action || !note_text_element || !property_id)
    return false;

  var note_text = note_text_element.value;

  if (note_text.length > user_property_note.max_note_length)
  {
    alert('Your note is longer than the allowed limit of ' + user_property_note.max_note_length + ' characters.  Please reduce the length of your note.')
    return false;
  }

  if (note_text.length < 1)
    action = 'delete';

  var result;

  //get, save, delete
  var ajax = new QAjax();
  ajax.set_script_info( {'script':'q_details_property_note.php','method':'post','output':'text'} );
  ajax.set_value('action', action);
  ajax.set_value('pid', property_id);
  ajax.set_value('note', note_text);

  ajax.set_callback(
    function(text)
    {
      //show promo html
      var not_logged_in = xb_get_element('user_property_note_not_logged_in');
      var logged_in     = xb_get_element('user_property_note_logged_in');

      eval("result=" + text);

      if (result.code)
      {
        if (result.code == -1)
        {
          if (alert_login('a note for this property'))
          {
            show_login(null, 'login', true);
          }
        }
        else if (result.code == 1)
        {

          var edit_success_message  = xb_get_element('edit_success_message');
          var delete_success_message  = xb_get_element('delete_success_message');

          if (action == 'delete')
          {
            if (delete_success_message)
              remove_class(delete_success_message, 'hidden');

            note_text_element.value = '';

          }
          else if (action == 'save')
          {
           //show something to indicate success
            note_text_element.value = result.note;

            if (edit_success_message)
              remove_class(edit_success_message, 'hidden');
          }
        }
        else
        {
          var error_message = xb_get_element('error_message');
          remove_class(error_message, 'hidden');
        }
      }
    }
  );
  ajax.go();

}

/**
fetches the new items for a carousel after paging
@param    el          the id of the or element carousel window
@param    dir         1 (next) or -1 (previous)
@param    prop_type   property type requested (for sale, sold)
@param    search_url  the search url that got them there
@param    blocked_pid property id that is blocked for this carousel
*/
function q_update_carousel(el, dir, prop_type, search_url, blocked_pid, track_code)
{
  if (typeof(search_url) == 'undefined' || !search_url || typeof(prop_type) == 'undefined' || !prop_type)
    return false;

  var carousel_window = xb_get_element(el);

  if (!carousel_window)
    return false;

  var previous_page_num_el = xb_get_element(carousel_window.id + '_previous_page_num'),
      next_page_num_el = xb_get_element(carousel_window.id + '_next_page_num');

  if (!previous_page_num_el || !next_page_num_el)
    return false;

  var previous_btn = xb_get_element(carousel_window.id + '_previous'),
      next_btn = xb_get_element(carousel_window.id + '_next');

  // luc page requested
  // if no luc prev or next then disable button
  if (dir == -1)
  {
    var page_requested = previous_page_num_el.innerHTML;

    if (!page_requested)
    {
      if (previous_btn)
        add_class(previous_btn, 'yui-carousel-first-button-disabled');

      return false;
    }
  }
  else
  {
    var page_requested = next_page_num_el.innerHTML;

    if (!page_requested)
    {
      if (next_btn)
        add_class(next_btn, 'yui-carousel-button-disabled');

      return false;
    }
  }

  set_opac(carousel_window, 30);
  var ajax = new QAjax();

  ajax.set_value('lpr', page_requested);
  ajax.set_value('surl', search_url);
  ajax.set_value('bpid', blocked_pid);
  ajax.set_value('ppid', (typeof(_DETAILS_PROPERTY_ID) != 'undefined') ? _DETAILS_PROPERTY_ID : -1);
  ajax.set_value('propt', prop_type);
  ajax.set_value('track_code', track_code);
  ajax.set_script_info( {'script':'q_get_carousel_items.php','method':'get','output':'text'} );

  ajax.set_callback(function(response)
                    {
                      if (typeof(response) == 'undefined' || !response)
                        return false;

                      eval('var data = ' + response);

                      if (
                          typeof(data.new_html_items) == 'undefined' || !data.new_html_items ||
                          typeof(data.l_previous_page_num) == 'undefined' || typeof(data.l_next_page_num) == 'undefined'
                         )
                         return false;

                      carousel_window.innerHTML = data.new_html_items;
                      previous_page_num_el.innerHTML = data.l_previous_page_num;
                      next_page_num_el.innerHTML = data.l_next_page_num;

                      if (previous_btn)
                      {
                        if (!data.l_previous_page_num)
                          add_class(previous_btn, 'yui-carousel-first-button-disabled');
                        else
                          remove_class(previous_btn, 'yui-carousel-first-button-disabled');
                      }

                      if (next_btn)
                      {
                        if (!data.l_next_page_num)
                          add_class(next_btn, 'yui-carousel-button-disabled');
                        else
                          remove_class(next_btn, 'yui-carousel-button-disabled');
                      }

                      var paging_string_el = xb_get_element(carousel_window.id + '_carousel_header_right');

                      if (paging_string_el)
                      {
                        paging_string_el.innerHTML = data.paging_string;
                      }
                      else
                      {
                        paging_string_el.innerHTML = '';
                      }

                      set_opac(carousel_window, 100);
                    });

  ajax.go();

}

//details page has the following vars available _ADDRESS_FOR_URL and _DETAILS_PROPERTY_ID
function build_property_map_url(link, property_id, property_address_for_url, no_streetview)
{
  if (typeof(T_MAP) == "undefined" || typeof(T_MAP.utils) == "undefined")
    return;

  var map_view = T_MAP.utils.getMapType();

  //if no_streetview is set we don't want our url to ever include it.. default to standard map view
  if (typeof(no_streetview) != "undefined" && map_view == "G_STREET_TYPE")
    map_view = "G_MAP_TYPE";

  var url = site_root + "nearby/";

  //ensures our object has relevant local vars up to date
  T_MAP.setMapSizing();

  url += "z-" + T_MAP.map.getZoom() + "/";
  url += "t-" + map_view + "/";
  url += T_MAP.map.getCenter().toUrlValue() + "/" + property_id + "-" + property_address_for_url;

  link.href = url;
  return url;
}

/* swfobject */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

