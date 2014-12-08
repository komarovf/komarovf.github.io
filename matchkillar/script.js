var getUser;

$('document').ready(function() {

	//Ajax loader animation
	$(document).ajaxStart(function() {
	  $(".loader").show();
	});
	$(document).ajaxStop(function() {
	  $(".loader").hide();
	});

	var api = 'http://api.sudodoki.name:8888';
	var token = '';

	var login_src = $("#login_tmpl").html();
	var signup_src = $("#signup_tmpl").html();
	var login_tmpl = Handlebars.compile(login_src);
	var signup_tmpl = Handlebars.compile(signup_src);
	$('#content').html(login_tmpl);


	function login(e) {
		e.preventDefault();
		$('#login_form small').remove();
	    $('#login_form input').removeClass('error');

	   	$.post(api + '/login', {
	       	login: $('#login_form input[name="login"]').val(),
	       	password: $('#login_form input[name="password"]').val()
	   	}).done(function(result) {
	   		var secret = JSON.parse(result)["token"];
	     	if(typeof(Storage) !== "undefined") {
	    		localStorage.setItem("token", secret);
			} else {
	    		token = secret;
			}
	   	}).fail(function(xhr, textStatus, errorThrown) {
			$('#login_form input[name="login"]')
				.addClass('error')
				.after("<small class='error'>"+JSON.parse(xhr.responseText)["error"]+"</small>");
		});
	}

	function signup(e) {
	    e.preventDefault();
	    $('#signup_form small').remove();
	    $('#signup_form input').removeClass('error');
	    
	    $.post(api + '/signup', {
	        login: $('#signup_form input[name="login"]').val(),
	        password: $('#signup_form input[name="password"]').val(),
	        passwordConfirmation: $('#signup_form input[name="passwordConfirmation"]').val()
	    }).done(function(result) {
	       	var secret = JSON.parse(result)["token"];
	     	if(typeof(Storage) !== "undefined") {
	    		localStorage.setItem("token", secret);
			} else {
	    		token = secret;
			}
	      	$('#login_form input[name="login"]').removeClass('error');
	    }).fail(function(xhr, textStatus, errorThrown) {
			JSON.parse(xhr.responseText).errors.forEach(function(item) {
				for (prop in item) {
					if (item.hasOwnProperty(prop)) {
						$('#signup_form input[name="'+prop+'"]')
							.addClass('error')
							.after("<small class='error'>"+item[prop]+"</small>");
					}
				}
			});
	    });
	}

	function getUsers() {
		$.get(api + '/users').done(function(result) {
			var users_src = $("#user_list").html();
			var users_tmpl = Handlebars.compile(users_src);
			$("#content").html(users_tmpl({users: result}));
		});
	}

	getUser = function(id) {
		if(typeof(Storage) !== "undefined") {
			token = localStorage.getItem("token")
		} 

		$.ajax({
	        type: "GET",
	        url: api + '/user/' +  id,
	        headers:  {"SECRET-TOKEN": token},
	        success: function(result) {
	            var user_src = $("#user_info").html();
	            var user_tmpl = Handlebars.compile(user_src);
				$("#show-full").html(user_tmpl(JSON.parse(result)[0]));
			},
			error: function(xhr, textStatus, errorThrown) {
				alert('Login required!');
			}
	    });
	}


    $('body').on('click', '#a_login, #signup_form a', function() {
    	$('#content').html(login_tmpl);

    	$('#a_list').removeClass("active");
		$('#a_signup').removeClass("active");
		$('#a_login').addClass("active");
    });
    $('body').on('click', '#a_signup, #login_form a', function() {
    	$('#content').html(signup_tmpl);

		$('#a_list').removeClass("active");
		$('#a_login').removeClass("active");
		$('#a_signup').addClass("active");
	});
	$('#a_list').click(function() {
		getUsers();

		$('#a_login').removeClass("active");
		$('#a_signup').removeClass("active");
		$('#a_list').addClass("active");
	});
	$('body').on('submit', '#login_form', function(e) {login(e);})
	$('body').on('submit', '#signup_form', function(e) {signup(e);})
});

