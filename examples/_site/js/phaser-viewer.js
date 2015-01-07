$(document).ready(function(){

	var dir = $.url().param('d');
	var file = $.url().param('f');
	var title = $.url().param('t');

	document.title = 'phaser - ' + title;
	$("#title").append(title);

	// Gets a list of git tags, i.e Phaser.js versions and creates a dropdown for them. 
	// on selecting the page will reload and load the select version of github.

	var phaser_version = $.url().param('phaser_version');

	if (!phaser_version)
	{
		phaser_version = '2.2.2';
	}

	var local_copy_of_phaser = "_site/phaser/phaser.2.2.2.min.js";
	var local_copy_of_phaser_version = "2.2.2";

	var phaser_version_update = function(phaser_version) {
		$(".phaser-version span").html("Phaser version: " + phaser_version)
	};

	$.get( "https://api.github.com/repos/photonstorm/phaser/git/refs/tags", function( data ) {

		var tags = ['dev'];

		for (var i = data.length - 1; i >= 0; i--) {
			tags.push(data[i]['ref'].replace('refs/tags/',''))
		};

		var $element = $('.phaser-version');
		var $dropdown = $("<select></select>").on('change', function() {

			var params = $.url().param();
			params['phaser_version'] = this.value;

			var url = "http://" + window.location.host + window.location.pathname + '?'

			for (p in params)
			{
				url += p + "=" + params[p] + "&";
			}

			window.location.href = url;
		});

		$element.append($dropdown);
		$dropdown.append($("<option></option>").text("Select a version"));

		$.each(tags, function(key, value) {
			$dropdown.append($("<option></option>").attr("value",value).text(value));
		});
	});

	var phaser_lib_url = "https://cdn.rawgit.com/photonstorm/phaser/" + phaser_version + "/build/phaser.js";

	$.getScript(phaser_lib_url).done(function( script, textStatus ) {
		load_example_code();
		phaser_version_update(phaser_version);
	}).fail(function(jqxhr, settings, exception) {
		$.getScript(local_copy_of_phaser).done(function( script, textStatus ) {
			console.log("Failed to load Phaser.js from github, falling back to local copy")
			load_example_code();
			phaser_version_update(local_copy_of_phaser_version);
		})
	});

	var load_example_code = function () {		
		$.getScript(dir + "/" + file).done(function(script, textStatus) {
			$.ajax({ url: dir + "/" + file, dataType: "text" }).done(function(data) {
				$("#sourcecode").text(data);
				$.getScript("_site/js/run_prettify.js");
			});

			//	Hook up the control panel
			$(".pause-button").click(function() {
				if (game.paused)
				{
					game.paused = false;
				}
				else
				{
					game.paused = true;
				}
			});

			$(".mute-button").click(function() {
				if (game.sound.mute)
				{
					game.sound.mute = false;
				}
				else
				{
					game.sound.mute = true;
				}
			});

			$(".reset-button").click(function() {
				document.location.reload(true);
			});

		}).fail(function(jqxhr, settings, exception) {
			$("#title").text("Error");
			var node = '<p>Unable to load <u>' + dir + '/' + file + '</u></p>';
			$('#phaser-example').append(node);
		});
	}

});
