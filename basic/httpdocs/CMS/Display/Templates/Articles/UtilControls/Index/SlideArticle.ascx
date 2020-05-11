<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SlideArticle.ascx.cs" Inherits="CMS_Display_Templates_Articles_UtilControls_Index_SlideArticle" %>
<%@ Import Namespace="Khavi.Web.Assistant" %>
<%@ Import Namespace="Khavi.Provider" %>

<script type="text/javascript" src="Cache/Resources/easynewsplus/jquery-1.2.3.pack.js"></script>
<script type="text/javascript" src="Cache/Resources/easynewsplus/jquery.easynews.plus.js"></script>
    
<style type="text/css">
    
    a { text-decoration: none; font-weight: bold; }

    .news_style{
    display:none;
    }
    .news_show
    {
    position:absolute; /*position:relative;*/
    background-color: white;
    color:black;
    font: normal 100% "Arial", "Lucida Grande",Verdana,  Sans-Serif;
    clip:rect(0px 482px 250px 0px);
    }
    .news_show1
    {
    position:absolute;
    background-color: white;
    color:black;
    font: normal 100% "Arial", "Lucida Grande",Verdana,  Sans-Serif;
    clip:rect(0px 482px 250px 0px);
    }
    .news_border
    {
    background-color: #ceddcf;
    /*width:352px;*/
    height:250px;
    font: normal 100% "Arial", "Lucida Grande",Verdana,  Sans-Serif;
    border: 1px solid gray;
    padding: 5px 5px 5px 5px;

    /*overflow: auto;*/	

    }
    .news_mark{
    background-color:#c6f79e;
    font: normal 70% "Arial", "Lucida Grande",Verdana,  Sans-Serif;
    border: 0px solid gray;
    /*width:363px;*/
    height:35px;
    color:black;
    text-align:center;
    }
    .news_title{
    font: bold 120% "Arial", "Lucida Grande",Verdana,  Sans-Serif;
    border: 0px solid gray;
    padding: 5px 0px 9px 5px;
    color:black;
    }
    .news_show img{

    margin-left: 5px;
    margin-right: 5px;

    }
    .buttondiv
    {
    position: absolute;
    /*float: left;*/
    /*top: 169px;*/
    padding: 5px 5px 5px 5px;
    background-color:white ;
    border: 1px solid gray;
    /*border-top-color: white;*/
    border-top:none;
    height:20px;
    }
    .imgButton { border:none; float:none; margin-left:0px; width:auto; height:auto; }
      .news_move {
     position: relative;

      }
    .mytable
    {
    width:490px;
    height:250px;
    vertical-align: top; background-color:#ceddcf;
    }
    .mytable td { vertical-align: top; }
    .mytable .title { font-weight:bold; font-size:18px; color:Red; }
    .imageSpecial { width:250px; height:245px; }
    </style>
    <script type="text/javascript">
    $(document).ready(function(){
    var newsoption = {
      firstname: "mynews",
      secondname: "showhere",
      thirdname:"news_display",
      fourthname:"news_button" 
    }
    $.init_plus(newsoption);

    var newsoption1 = {
      firstname: "mynews2",
      secondname: "showhere1",
      thirdname:"news_display1",
      fourthname:"news_button1",
      playingtitle:"",
        nexttitle:"",
        prevtitle:"",
        newsspeed:'8000'
    	
    }
    $.init_plus(newsoption1);


    var myoffset=$('#news_button').offset();
    var myoffset1=$('#news_button1').offset();
    var mytop=myoffset.top-1;
    var mytop1=myoffset1.top-1;

    $('#news_button').css({top:mytop});
    $('#news_button1').css({top:mytop1});


    });
</script>
        
<div class="vbox <%=ControlCssClass%> <%=this.ID%>">
    <div class="vbox-top">
        <div class="vbox-top-left">
            <div class="vbox-top-right">
                <div class="vbox-top-center"><h3><%=Subject%></h3></div>
            </div>
        </div>
    </div>
    <div class="vbox-middle">
        <div align='left' id='mynewsdis'>
            <div class='news_border'>
                <div id='showhere' class='news_show'></div>
            </div>
            <div class='buttondiv' id='news_button'>
                <img class="imgButton" src="Cache/Resources/easynewsplus/prev.gif" align="absmiddle" id='news_prev'>
                <img class="imgButton" src="Cache/Resources/easynewsplus/pause.gif" align="absmiddle" id='news_pause'>
                <img class="imgButton" src="Cache/Resources/easynewsplus/next.gif" align="absmiddle" id='news_next' >
            </div>
            <div class='news_mark'>
                <div id='news_display' class='news_title'></div>
            </div>
        </div>
        <div id="mynews">
            <div id="divListNews" runat="server"></div>
                                                       
        </div>        
    </div>
    <div class="vbox-bottom">
        <div class="vbox-bottom-left">
            <div class="vbox-bottom-right">
                <div class="vbox-bottom-center"></div>
            </div>
        </div>
    </div>
</div>
