sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("ui5con.controller.Main", {
		onInit: function(){
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("voicecontrolyourapp", "voiceControl", this.handleVoiceControlEvent, this);
		},

		handleVoiceControlEvent: function(channel, event, data){
			var view = this.getView();
			var app = view.byId("app");
			var currentPageId = app.getCurrentPage().getId();
			switch (data.name) {
				case "hello":
					view.byId("helloContent").setVisible(true);
					this.showVoiceInfo('Hello');
					break;
				case "whoami":
					this.navToPage2();
					break;
				case "back":
					this.showVoiceInfo('Back');
					this.navBack();
					break;
				case "next":
					this.showVoiceInfo('Next');
					this.navNext();
					break;
				case "play":
					if(currentPageId === view.createId("page4")){
						this.showVoiceInfo('Play');
						this.playVideo();
					}
					break;
				case "stop":
					if(currentPageId === view.createId("page4")){
						this.showVoiceInfo('Stop');
						this.stopVideo();
					}
					break;
			}
		},

		showVoiceInfo: function(msg){
			MessageToast.show(msg);
		},

		playPressed: function(){
			this.playVideo();
		},

		stopPressed: function(){
			this.stopVideo();
		},

		playVideo: function(){
			var view = this.getView();
			view.byId("video").$()[0].play();
		},

		stopVideo: function(){
			var view = this.getView();
			view.byId("video").$()[0].pause();
		},

		navBack: function(){
			var view = this.getView();
			var app = view.byId("app");
			app.back();
		},

		navNext: function(){
			var view = this.getView();
			var app = view.byId("app");
			var currentPageId = app.getCurrentPage().getId();
			switch (currentPageId) {
				case view.createId("page"):
					this.navToPage(view.createId("page2"));
					break;
				case view.createId("page2"):
					this.navToPage(view.createId("page3"));
					break;
				case view.createId("page3"):
					this.navToPage(view.createId("page4"));
					break;
			}
		},

		navToPage: function(pageId){
			var view = this.getView();
			var app = view.byId("app");
			app.to(pageId, "slide");
		},

		navToPage2: function(){
			var view = this.getView();
			this.navToPage(view.createId("page2"));
		}
	});

});