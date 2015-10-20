function tablePopups()
{
	var howmanylinks = $('table#popup').find('a').length;
	for(var i = 1; i <= howmanylinks; i++)
	{
		$('#link' + i).addClass("hidden");
		$('.link' + i).click(function(){
			
			// Close any that are currently open on click, then open the one that has been clicked.
			$('table#popup').find('a').each(function() {
				var curr_id = $(this).attr("class");
				$("#"+curr_id).addClass("hidden");
			});
			
			// Get the class of the clicked anchor
			var id = $(this).attr('class');
			// If the class is hidden, toggle it to none
			$('#' + id).toggleClass("hidden");		
			// Set the h3 tag as the title of the anchor
			$('#' + id + " h3").text($(this).attr('title' + ':'));
		});
	}	
}

(function($){ 

  jQuery.fn.wait = function (MiliSeconds) {
	    $(this).animate({ opacity: '+=0' }, MiliSeconds);
	    return this;
	}
})(jQuery);

$(document).ready(function() {

	if($.cookie('petplan_cookie') === null){
		$('.cookiemessage').show();
		$.cookie('petplan_cookie', 'accepts', { expires: 30, path: '/' });
	
	} else {
		$('.cookiemessage').hide();
	}

	$('.cookieprivacy').bind('click', function(e){
		
	});

	$('.closecookie').bind('click', function(e){
		e.preventDefault();
	
		$('.cookiemessage').hide();
	});

	$("#dobquestion").click(function(){
		$("#centre").find("#dateofbirth").css("display","block");
	});
	$("#dateofbirth .close").click(function(){
		$("#centre").find("#dateofbirth").css("display","none");
	});
	
	$("#dobquestion2").click(function(){
		$("#centre").find("#dateofbirth2").css("display","block");
	});
	$("#dateofbirth2 .close").click(function(){
		$("#centre").find("#dateofbirth2").css("display","none");
	});
	
	$(".policy_number").click(function(){
		$("#centre").find("#help_policy").closest("div").toggleClass("hidden");
	});

	// Make all http:// links open in a new window
	$("a[href^='http://']").attr('target','_Blank');
	$("a[href^='/exoticdirect_']").attr('target','_Blank');
	$("a[class~='cookie_button']").attr('target','_Blank');
	$("a.new_window").attr('target','_Blank');
	$("a.parent_window").attr('target','_parent');
	
	
	// PDF LINKS
	// Set all links ending .pdf with a class of pdf to display the icon
	$("#centre a[href$='.pdf']").addClass("pdf");
	// Remove the class from all Buttons
	$("#centre a.button[href$='.pdf']").removeClass("pdf");
	
	// EMAIL LINKS
	// Set all links starting with mailto: with a class of email to display the icon
	$("a[href^='mailto:']").addClass("email");
	// Remove the class from all Buttons
	$("a.button[href^='mailto:']").removeClass("email");
	
	// PRINT LINKS
	// Set all links starting with mailto: with a class of email to display the icon
	$("a[href$='print();']").addClass("printer");
	// Remove the class from all Buttons
	$("a.button[href$='print();']").removeClass("printer");
	
	$('.hidden_content').hover(function(){
		$(this).children('div').stop().animate({
			top: '-250px',
			'font-size' : '1.9em',
			left: '-250px'							   
		}, 500);
	},
	function(){
		$(this).children('div').stop().animate({
			top: '0',
			left: '0'
		}, 500);
	});
	
	tablePopups();
});

function answerYesorNo(bAnswer, strElement, strCheckElement)
	{
		if(bAnswer == true)
		{
			$(strElement).fadeIn('fast');
		} else {
			$(strElement).fadeOut('fast');
		}
	}
//$(document).ready(function() { $("a[rel^='prettyPhoto']").prettyPhoto(); });

$(function(){
	/*///////////////////////////////////////////////////////////////
	// WEBSITE NAVIGATION
	///////////////////////////////////////////////////////////////*/

	var old_class = "";
	var old_touch_class = "";	
	var $old_this = null;



	$(".menuHolder li.liTop").hover(function(){
		var tallestHeight = 0;
		$(this).find("div.sub").stop(true, true).slideDown(300);
		old_class = $(this).attr("class");
		$(this).attr("class", old_class + " selected");

		var subNav = $('div.sub',this).length;
		var subNavItems = $('div.sub > ul', this).length;
		var subNavIndex = $(this).index();
		
		if(subNavIndex > 3){
			$('div.sub', this).addClass('fright');
		}

		if(subNav > 0 && subNavItems < 4){
			var navWidth = $('div.sub > ul:first-child', this).outerWidth(true);
			var containerWidth = navWidth * subNavItems;
			$('div.sub', this).width(containerWidth);
		}

		//set $this ref for touched event clear up
		$old_this = $(this);

	}, function(){
		$(this).find("div.sub").stop(true, true).fadeOut(100);
		$(this).attr("class", old_class).blur();
	});

	//touch handling
	var override = false;
	$(".menuHolder li.liTop").live('touchstart click', function(e){
		//menu touched
		override = true;
		//if the same menu item is touched again
		if(old_touch_class.indexOf($(this).attr("class")) >= 0) 
		{
			e.preventDefault();
			$(this).trigger("mouseout");
			$(this).trigger("mouseover");
		}
		old_touch_class = $(this).attr("class");
		old_touch_class = old_touch_class.replace('select','')
	});

	$(document).live('touchstart click', function(e){
		//somewhere touched
	    if(!override) {
	    	//somewhere touched that's not the menu
	    	//unfocus old menu selection - if one exists
			if($old_this!=null)
			{
				$old_this.trigger('mouseout');				
			}
	    }
	    override = false;

	});

	/*$(document).bind('touchstart', function(){
		alert($(this).attr('class'));
	});*/

});

// THIS IS WHAT DOES THE BROWSER CLASSES
/* Javascript to get the browser version and create the subsequent clases */
function css_browser_selector(u){var ua = u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1;},g='gecko',w='webkit',s='safari',h=document.getElementsByTagName('html')[0],b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3')?g+' ff3':is('gecko/')?g:/opera(\s|\/)(\d+)/.test(ua)?'opera opera'+RegExp.$2:is('konqueror')?'konqueror':is('chrome')?w+' chrome':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?'mobile':is('iphone')?'iphone':is('ipod')?'ipod':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win':is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);