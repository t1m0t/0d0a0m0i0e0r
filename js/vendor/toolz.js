define([], 
	function () {

	//pour load des fichiers css
	return {
		function loadCss(url) {
		    var link = document.createElement("link");
		    link.type = "text/css";
		    link.rel = "stylesheet";
		    link.href = url;
		    document.getElementsByTagName("head")[0].appendChild(link);
		}
	}
}