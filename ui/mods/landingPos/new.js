var land_pos = new(function () {
		var self = this;
		self.landingHandlers = [];
		self.addHandler = function (msg, callback, disappear) {
			self.landingHandlers.push({
				trigger: msg,
				callback: callback,
				disappear: disappear
			});
		};
		var oldHandlers = handlers.chat_message;
		handlers.chat_message = function (d) {
			
			if (d.type === 'server') {
				oldHandlers(d);
				return;
			}
			var handled = false;
			for (var x in self.landingHandlers) {
				var handler = self.landingHandlers[x];
				
				if (d.message.toLowerCase() === handler.trigger.toLowerCase()) {
					if (!handler.disappear) {
						oldHandlers(d);
					}
					handled = true;
					// sometimes it takes time to load the files so asynchronous execution.
					(function (h) {
						setTimeout(function () {
							h.callback(d.message)
						}, 0);
					})(handler)

				}
			}
			if (!handled) {
				oldHandlers(d);
			}

		}

	})();

