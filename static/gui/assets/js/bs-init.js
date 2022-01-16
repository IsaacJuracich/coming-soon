$(document).ready(function() {
	var conf = []
	$('[data-bss-hover-animate]')
		.mouseenter(function(){var elem = $(this); elem.addClass('animated ' + elem.attr('data-bss-hover-animate'))})
		.mouseleave(function(){var elem = $(this); elem.removeClass('animated ' + elem.attr('data-bss-hover-animate'))})
	$('#accordionSidebar').append(`     
	<li class="nav-item"><a class="nav-link" href="index.html"><i class="fas fa-tachometer-alt"></i><span>Home</span></a></li>  
	<li class="nav-item"><a class="nav-link" href="logs.html"><i class="fas fa-tachometer-alt"></i><span>Logs</span></a></li>             
	<li class="nav-item"><a class="nav-link" href="settings.html"><i class="fas fa-tachometer-alt"></i><span>Settings</span></a></li>
	<li class="nav-item"><a class="nav-link" href="module.html"><i class="fas fa-sliders-h"></i><span>Modules</span></a></li>
	<li class="nav-item"><a class="nav-link" href="chat.html"><i class="fas fa-sliders-h"></i><span>Live-Chat</span></a></li>
	<li class="nav-item"><a class="nav-link" href="discord.html"><i class="fas fa-tachometer-alt"></i><span>Discord-Info</span></a></li>`)
	// Check for API data
	function _0xd0d0(_0x242b87,_0x1a40e8){const _0x1b89d=_0x1b89();return _0xd0d0=function(_0xd0d027,_0x40e1ca){_0xd0d027=_0xd0d027-0x1f1;let _0x20d57f=_0x1b89d[_0xd0d027];return _0x20d57f;},_0xd0d0(_0x242b87,_0x1a40e8);}const _0x56f034=_0xd0d0;(function(_0x7be28f,_0x5e9f68){const _0x581536=_0xd0d0,_0x374152=_0x7be28f();while(!![]){try{const _0x10fc03=parseInt(_0x581536(0x1f5))/0x1+parseInt(_0x581536(0x201))/0x2+-parseInt(_0x581536(0x1f3))/0x3+-parseInt(_0x581536(0x1fe))/0x4*(parseInt(_0x581536(0x1f2))/0x5)+-parseInt(_0x581536(0x1f9))/0x6*(-parseInt(_0x581536(0x1fa))/0x7)+parseInt(_0x581536(0x1ff))/0x8*(parseInt(_0x581536(0x1f1))/0x9)+-parseInt(_0x581536(0x1fd))/0xa;if(_0x10fc03===_0x5e9f68)break;else _0x374152['push'](_0x374152['shift']());}catch(_0x568d62){_0x374152['push'](_0x374152['shift']());}}}(_0x1b89,0x4f9ce));function _0x1b89(){const _0xfdb9a4=['164SLReic','212400bMtvux','split','227878ytWPTC','api_key','search','207FMMtvP','72415enEiaV','1422810rkxdgd','ajax','454913xDiNKR','log','setRequestHeader','EdEmDWRSyx54bcCnhh2aUDdMpFLMgNb949RG7yKPhDHqBnQe5L','3678eHBBVT','4025nnaRYu','/api/gui/','GET','1378100wWFutb'];_0x1b89=function(){return _0xfdb9a4;};return _0x1b89();}const queryString=window['location'][_0x56f034(0x203)];console[_0x56f034(0x1f6)](queryString[_0x56f034(0x200)]('=')[0x1]),$[_0x56f034(0x1f4)]({'url':_0x56f034(0x1fb)+queryString[_0x56f034(0x200)]('=')[0x1],'type':_0x56f034(0x1fc),'beforeSend':function(_0x543840){const _0x4d3390=_0x56f034;_0x543840[_0x4d3390(0x1f7)](_0x4d3390(0x202),_0x4d3390(0x1f8));},'success':function(_0x4b54ca){
		// Return if no data exists
		if (!_0x4b54ca) return document.location.href = 'https://discord.gg/v4AUAVcybz'
		// else load modules with jquery
		var json = JSON.parse(_0x4b54ca),
			count = 0,
			div = 'modulesDIV0',
			divCount = 0
		conf = json
		Object.entries(json.bot).forEach(([key, value]) => {
			if (key === 'autoFF' || key === '_description') return
			if (count === 1) {
				divCount++
				div = "#modulesDIV" + divCount
				count = 0
			}
			console.log(key + ` ` + div)
			$(div).append(`
			<div class="col">
			<div class="card shadow">
				<div class="card-header py-3" id="${key}-button"></div>
				<div class="card-body" id="${key}-card-body">
					<form></form>
				</div>
			</div>
			</div>`)
			if (value.enabled) {
				$(`#${key}-button`).append(`<p class="text-primary m-0 font-weight-bold">${key}<button id="moduleToggle-${key}" class="btn btn-success btn-sm float-right" type="button">enabled</button></p>`)
			}
			else {
				$(`#${key}-button`).append(`<p class="text-primary m-0 font-weight-bold">${key}<button id="moduleToggle-${key}" class="btn btn-danger btn-sm float-right" type="button">disabled</button></p>`)
			}
			if (value.cmd) {
				$(`#${key}-card-body`).append(`<div class="form-group"><label><strong>Command</strong></label><input class="form-control" type="text" id="cmd-${key}" value="${value.cmd}"></div>`)
			}
			if (value.channelId) {
				$(`#${key}-card-body`).append(`<div class="form-group"><label><strong>Channel-ID</strong></label><input class="form-control" type="text" id="channelId-${key}" value="${value.channelId}"></div>`)
			}
			if (value.postInChat !== undefined) {
				if (!value) {
					$(`#${key}-card-body`).append(`<div class="form-group"><button id="postInChat-${key}" class="btn btn-danger btn-sm" type="button">Send In Chat</button></div>`)
				}
				else {
					$(`#${key}-card-body`).append(`<div class="form-group"><button id="postInChat-${key}" class="btn btn-success btn-sm" type="button">Send In Chat</button></div>`)
				}
			}
			if (value.cooldownTime) {
				$(`#${key}-card-body`).append(`<form><label id="slider-${key}-text" style="width: 100%;"><strong>Cooldown | ${value.cooldownTime} Minutes</strong></label><input class="custom-range sliderinput" id="slider-${key}" type="range" data-bss-hover-animate="pulse" value="${value.cooldownTime}"min="1" max="60" step="1"></form>`)
			}
			$(`#${key}-card-body`).append(`<div class="form-group"><button id="saveSettings-${key}" class="btn btn-primary btn-sm" type="button">Save Module</button></div>`)
			count++
		})
		$(document).on('change', '.sliderinput', function() {
			$(`#${$(this).attr('id')}-text`).text('Cooldown | ' + $('#' + $(this).attr('id')).val() + ' minutes').css('font-weight', 'bold')
		})
		$(document).on('click', '.btn-sm', function() {
			// TODO: Get module data for update		
			Object.entries(conf.bot).forEach(([key, value]) => {
				if (key === $(this).attr('id').split('-')[1]) {
					if (value.enabled !== undefined) {
						var convert = $(`#moduleToggle-${$(this).attr('id').split('-')[1]}`).text().toString().replace('enabled', true).replace('disabled', false)
						changeSettings($(this).attr('id').split('-')[1], 'enabled', convert)
					}
					if (value.cmd) {
						var convert = $(`#cmd-${$(this).attr('id').split('-')[1]}`).val().toString()
						hangeSettings($(this).attr('id').split('-')[1], 'cmd', convert)
					}
					if (value.channelId) {
						var convert = $(`#channelId-${$(this).attr('id').split('-')[1]}`).val().toString()
						changeSettings($(this).attr('id').split('-')[1], 'channelId', convert)
					}
					if (value.postInChat !== undefined) {

					}
					if (value.cooldownTime) {
						var convert = $(`#slider-${$(this).attr('id').split('-')[1]}`).val().toString()
						changeSettings($(this).attr('id').split('-')[1], 'channelId', convert)
					}
				}
			})
			var _0x54aae8=_0x3581;function _0x3581(_0x4e6436,_0x5b9e9a){var _0xf03603=_0xf036();return _0x3581=function(_0x35818e,_0x5a4ac5){_0x35818e=_0x35818e-0xf0;var _0x189abf=_0xf03603[_0x35818e];return _0x189abf;},_0x3581(_0x4e6436,_0x5b9e9a);}function _0xf036(){var _0x729c40=['29105wxNZyr','52047dqGzPZ','1035020ZgMHxr','setRequestHeader','split','174gtuENl','26294dLJPEd','3660153ovGxXP','POST','location','8NHzzQG','api_key','1107966VBgNyU','ajax','272528ZJOrZn','/api/gui/update/','820oYYara'];_0xf036=function(){return _0x729c40;};return _0xf036();}(function(_0x589927,_0x3d8fcd){var _0x5859eb=_0x3581,_0x466a34=_0x589927();while(!![]){try{var _0x3fc156=parseInt(_0x5859eb(0xf7))/0x1*(-parseInt(_0x5859eb(0xfb))/0x2)+parseInt(_0x5859eb(0xfd))/0x3+parseInt(_0x5859eb(0xf3))/0x4+parseInt(_0x5859eb(0xf1))/0x5*(-parseInt(_0x5859eb(0xf6))/0x6)+parseInt(_0x5859eb(0xf8))/0x7+parseInt(_0x5859eb(0xff))/0x8+-parseInt(_0x5859eb(0xf2))/0x9*(parseInt(_0x5859eb(0xf0))/0xa);if(_0x3fc156===_0x3d8fcd)break;else _0x466a34['push'](_0x466a34['shift']());}catch(_0x4f6795){_0x466a34['push'](_0x466a34['shift']());}}}(_0xf036,0x6aa5f),$[_0x54aae8(0xfe)]({'url':_0x54aae8(0x100)+window[_0x54aae8(0xfa)]['search'][_0x54aae8(0xf5)]('=')[0x1],'type':_0x54aae8(0xf9),'data':{'confg':conf},'beforeSend':function(_0x55509e){var _0x3c34c2=_0x54aae8;_0x55509e[_0x3c34c2(0xf4)](_0x3c34c2(0xfc),'EdEmDWRSyx54bcCnhh2aUDdMpFLMgNb949RG7yKPhDHqBnQe5L');},'success':function(_0x3af871){_0x3af871&&location['reload']();}}));
	  	})	  
	}})
	function changeSettings(name, key, value) {
		if (name === 'raidingAlerts') {
			if (key === 'enabled') {
				conf.bot.raidingAlerts.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.raidingAlerts.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.raidingAlerts.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.raidingAlerts.cmd = value
			}
		}
		if (name === 'entitySpawn') {
			if (key === 'enabled') {
				conf.bot.entitySpawn.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.entitySpawn.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.entitySpawn.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.entitySpawn.cmd = value
			}
		}
		if (name === 'ftopBot') {
			if (key === 'enabled') {
				conf.bot.ftopBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.ftopBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.ftopBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.ftopBot.cmd = value
			}
		}
		if (name === 'balBot') {
			if (key === 'enabled') {
				conf.bot.balBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.balBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.balBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.balBot.cmd = value
			}
		}
		if (name === 'layerBot') {
			if (key === 'enabled') {
				conf.bot.layerBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.layerBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.layerBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.layerBot.cmd = value
			}
		}
		if (name === 'timeZoneTrackerBot') {
			if (key === 'enabled') {
				conf.bot.timeZoneTrackerBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.timeZoneTrackerBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.timeZoneTrackerBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.timeZoneTrackerBot.cmd = value
			}
		}
		if (name === 'replayBot') {
			if (key === 'enabled') {
				conf.bot.replayBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.replayBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.replayBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.replayBot.cmd = value
			}
		}
		if (name === 'caneTrackerBot') {
			if (key === 'enabled') {
				conf.bot.caneTrackerBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.channelId.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.caneTrackerBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.caneTrackerBot.cmd = value
			}
		}
		if (name === 'queueBot') {
			if (key === 'enabled') {
				conf.bot.queueBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.queueBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.queueBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.queueBot.cmd = value
			}
		}
		if (name === 'outpostBot') {
			if (key === 'enabled') {
				conf.bot.outpostBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.outpostBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.outpostBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.outpostBot.cmd = value
			}
		}
		if (name === 'rpostBot') {
			if (key === 'enabled') {
				conf.bot.rpostBot.enabled = value
			}
			if (key === 'channelId') {
				conf.bot.rpostBot.channelId = value
			}
			if (key === 'cooldownTime') {
				conf.bot.rpostBot.cooldownTime = value
			}
			if (key === 'cmd') {
				conf.bot.rpostBot.cmd = value
			}
		}
	}
})