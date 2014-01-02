var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('map_grey.jpg');
ASSET_MANAGER.queueDownload('names.png');

ASSET_MANAGER.downloadAll(function() {
	Mall.init();
	$("#overlay").fadeOut('slow');
});