var land_pos = new(function () {
		
		this.addHandler = function (msg, callback, disappear) {
			model.chatLog.subscribe(function () {
				
				var k = $('.div_chat_log_feed .chat_message_body');
				k.each(function () {
					var elem = $(this);
					if (elem.html().startsWith(msg)) {
						if (elem.parent().attr('processed') != 'yes') {
							//run callback
							varCopy = elem.html();
							callback(varCopy.replace(msg,''));
							elem.parent().attr('processed', 'yes');
							if (disappear) {
								//remove chat message
								
								elem.parent().css('display', 'none');

								//get rid of thing in feed
								setTimeout(function () {
									$('.div_chat_feed .chat_message_body').each(function () {
										var feed = $(this);
										if (feed.html() == elem.html()) {
											feed.parent().css('display', 'none');
										}
									})
								}, 2);
							}

						}

					}
				});

			})

		}
		
	})();

	