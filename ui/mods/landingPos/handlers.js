	land_pos.addHandler('landingPosMod:', function (msg) {
	
		api.Panel.message(api.Panel.parentId, 'spawnPlayerPuppet',msg)
	}, true);
	land_pos.addHandler('landingZoneMod:', function (msg) {
	
		setTimeout(function() {api.Panel.message(api.Panel.parentId, 'makeAlliedZones',msg)}, 1000);
	}, true);
	