$(document).ready(function(){

	$.getJSON("_site/examples.json")

	.done(function(data) {

		var i = 0;
		var node = '';

		var directories = Object.keys(data);

		directories.splice(directories.indexOf('basics'), 1);
		directories.splice(directories.indexOf('games'), 1);
		directories.sort();
		directories.unshift('basics', 'games');

		directories.forEach(function(dir)
		{
			var files = data[dir];
			node = '<h2>' + dir + '</h2>';

			for (var e = 0; e < files.length; e++)
			{
				node += '<a href="_site/view_lite.html?d=' + dir + '&amp;f=' + files[e].file + '&amp;t=' + files[e].title + '" target="viewer">' + files[e].title + '</a>';
				if(typeof files[e].jsbin !== 'undefined')
				{
					node += ' - <a href="'+files[e].jsbin+'" target="_blank">Jsbin</a>';
				}
				node += '<br />';
			}

			$("#examples-list").append(node);

            i += files.length;

		});

		$("#total").append(i);

		//	Re-calc the viewer height
		var height = $(window).height() - 270;
		$("#panel").css('height', height + 'px');

		//	iFrame focus
		$('a').click(function(e) { $('#viewer').focus(); });

		//  Fix for Chrome ignoring iFrame target links (also occurs with Firefox 29)
		//  See this issue: https://code.google.com/p/chromium/issues/detail?id=135498
		function renderInFrame(e) { e.preventDefault(); $('#viewer').prop('src', $(this).attr('href')); }
		$('a[target=viewer]').on('click', renderInFrame);
	})

	.fail(function() {

		var node = '<h1>Error!</h1>';

		node += '<p>Unable to load <u>examples.json</u> data file</p>';
		node += '<p>Did you open this html file locally?</p>';
		node += '<p>It needs to be opened via a web server, or due to browser security permissions<br />it will be unable to load local resources such as images and json data.</p>';
		node += '<p>Please see our <a href="#">Getting Started guide</a> for details.</p>';

		$("#viewer").contents().find('body').append(node);

	});

});
