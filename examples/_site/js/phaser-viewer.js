$(document).ready(function(){

	var dir = $.url().param('d');
	var file = $.url().param('f');
	var title = $.url().param('t');
	var phaser_version = $.url().param('phaser_version');
	var phaser_lib_url = "_site/js/phaser.js"

	document.title = 'phaser - ' + title;

	$("#title").append(title);

	$(".phaser-version span").html("Phaser verison: " + phaser_version)
	// Gets a list of git tags, i.e Phaser.js verisons and creates a dropdown for them. 
	// on selecting the page will reload and load the select verison of github.
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
			for( p in params){
				url += p + "=" + params[p] + "&"
			}
			window.location.href = url;
    		
		})
		$element.append($dropdown);
		$dropdown.append($("<option></option>").text("Select a verison to load"));
		$.each(tags, function(key, value) {
			$dropdown.append($("<option></option>").attr("value",value).text(value));
		});
	});

	if(phaser_version){
		phaser_lib_url = "https://rawgit.com/photonstorm/phaser/" + phaser_version + "/build/phaser.js"
	}
	$.getScript(phaser_lib_url).done(function( script, textStatus ) {
		$.getScript(dir + "/" + file)
		.done(function(script, textStatus) {

			$.ajax({ url: dir + "/" + file, dataType: "text" })
				.done(function(data) {
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

		})
		.fail(function(jqxhr, settings, exception) {

			$("#title").text("Error");

			var node = '<p>Unable to load <u>' + dir + '/' + file + '</u></p>';

			$('#phaser-example').append(node);

		});
	});

});
