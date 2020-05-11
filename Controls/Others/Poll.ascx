<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Poll.ascx.cs" Inherits="Controls_Others_Poll" %>

<div class="poll">
    <div class="title"><span id="lblTextPoll" runat="server" class="title_poll">Thăm dò</span></div>
    <div class="content">
        <%this.LoadPollHtml();%>
        <!--<strong>Bạn thích đọc chuyên mục nào trên website của chúng tôi?</strong>
        <div class="poll-answer-item">
            <span>
    	        <input type="radio" value="1" name="poll_answer_value" />
    	        <label>Có, 100%</label>
            </span>
            <span>
    	        <input type="radio" value="2" name="poll_answer_value" />
    	        <label>Có, 100%</label>
            </span>
            <span>
    	        <input type="radio" value="3" name="poll_answer_value" />
    	        <label>Có, 100%</label>
            </span>
            <span>
    	        <input type="radio" value="4" name="poll_answer_value" />
    	        <label>Có, 100%</label>
            </span>
        </div>
        <div class="poll-answer-action">
            <input type="button" value="Bình chọn" onclick="pollSubmit();" />
            <a href="javascript:openPollResult()">Xem kết quả</a>
        </div>-->
    </div>
</div>
<div class="clear"></div>