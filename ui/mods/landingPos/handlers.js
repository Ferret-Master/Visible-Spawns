	land_pos.addHandler('landingPosMod:', function (msg) {
	
		api.Panel.message(api.Panel.parentId, 'spawnPuppet',msg)
	}, true);
