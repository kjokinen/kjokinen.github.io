sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ui5con/model/models",
	"sap/m/MessageToast"
], function(UIComponent, Device, models, MessageToast) {
	"use strict";

	return UIComponent.extend("ui5con.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.startVoiceCapture();
		},

		startVoiceCapture: function() {
			var that = this;
			if (annyang) {
				// Let's define our first command. First the text we expect, and then the function it should call
				var commands = {
					"Test": function(){
						var msg = "Speech recognition test OK";
						MessageToast.show(msg);
					},
					"Back": function() {
						jQuery.sap.log.info("back command received");
						that.sendVoiceControlEvent("back");
					},
					"Next": function() {
						jQuery.sap.log.info("next command received");
						that.sendVoiceControlEvent("next");
					},
					"Hello": function() {
						jQuery.sap.log.info("hello command received");
						that.sendVoiceControlEvent("hello");
					},
					"Who": function() {
						jQuery.sap.log.info("Who command received");
						that.sendVoiceControlEvent("whoami");
					},
					"Play": function() {
						jQuery.sap.log.info("Play command received");
						that.sendVoiceControlEvent("play");
					},
					"Stop": function() {
						jQuery.sap.log.info("Stop command received");
						that.sendVoiceControlEvent("stop");
					},
					"Script": function() {
						that.sendVoiceControlEvent("script");
					},
					"Example": function() {
						that.sendVoiceControlEvent("example");
					},
					"Splat": function() {
						that.sendVoiceControlEvent("splat");
					}
				};
				// Add our commands to annyang
				annyang.addCommands(commands);
				// Start listening. You can call this here, or attach this call to an event, button, etc.
				annyang.start();
			}
		},

		sendVoiceControlEvent: function(name, value){
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("voicecontrolyourapp", "voiceControl", {
					name: name,
					value: value
				}
			);
		}
	});

});