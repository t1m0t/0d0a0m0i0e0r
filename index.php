<html>
<head>
	<?php header('Content-type: text/html; charset=utf-8'); ?>
	<!--<script src="http://<?php echo $_SERVER['HTTP_HOST'] ?>/damierProject/js/vendor/jquery.min.js" type="text/javascript"></script>
	<script src="http://<?php echo $_SERVER['HTTP_HOST'] ?>/damierProject/js/mainDamier.js" type="text/javascript"></script>
	<script src="http://<?php echo $_SERVER['HTTP_HOST'] ?>/damierProject/js/damierClasses.js" type="text/javascript"></script>-->
	<link rel="stylesheet" href="http://<?php echo $_SERVER['HTTP_HOST'] ?>/damierProject/css/template.css" type="text/css" />
</head>
<body>
	<h1>Jeu du damier</h1>
	<p>
		Amusez-vous bien !
	</p>
	<div class="damier">

	</div>
	<div class="playerStats">
		<p class="playerTurn"></p>
	</div>
	<div class="messageBox">
		<p id="mouseover"></p>
	</div>
	<input type="hidden" name="playerId" id="playerId" value="87"/>
	<input type="hidden" name="playerToken" id="playerToken" value="ae54erddfs5d54er"/>
	<input type="hidden" name="playerSide" id="playerSide" value="0"/>
	<script data-main="js/main" src="js/vendor/require.js"></script>
</body>
</html>
