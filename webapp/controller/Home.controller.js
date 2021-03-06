sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/core/Fragment"
], function (Controller, formatter, Fragment) {
	"use strict";

	return Controller.extend("ui5.demo.camera.controller.App", {

		formatter: formatter,


		onInit() {
			const self = this;

			// Get the config and video contraints
			const config = self.getOwnerComponent().getModel('config')
			const videoContraints = config.getProperty('/videoContraints');

			// Initially get and set the video media devices
			navigator.mediaDevices
				.enumerateDevices()
				.then((devices) =>
					devices.filter((device) => device.kind === 'videoinput')
				)
				.then((videoDevices) => {
					// Set the config model accordingly to the media devices that have been found
					config.setProperty('/videoDevices', videoDevices);
				})
				.then(
					() =>
						(videoContraints.video.deviceId.exact =
							config.getProperty('/videoDevices')[1].deviceId)
				)
				// After contraints are set, initially ask for stream permission
				.then(() => self.onChangeStream());
		},

		onChangeStream() {
			const self = this;

			// Get the video contrains
			const videoContraints = self.getOwnerComponent().getModel('config').getProperty('/videoContraints');
			const video = document.getElementById('video-stream');

			console.log(videoContraints);
			navigator.mediaDevices.getUserMedia(videoContraints).then((stream) => {
				video.srcObject = stream;
				video.play();
			});
		},

		handleTakeScreenshot() {
			const canvas = document.getElementById('video-canvas');
			const video = document.getElementById('video-stream');

			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			canvas.getContext('2d').drawImage(video, 0, 0);

			// Convert the canvas content to data Url and assign to model
			this.getOwnerComponent().getModel('config').setProperty('/cameraSnapUrl', canvas.toDataURL('image/jpg'))

			// Open the dialog
			this.onOpenImagePreview();
		},

		onOpenImagePreview() {
			const oView = this.getView();

			// create dialog lazily
			if (!this.byId("preview")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "ui5.demo.camera.view.Preview",
					controller: this
				}).then((oDialog) => {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("preview").open();
			}
		},

		onOpenTextPreview() {
			const oView = this.getView();

			// create dialog lazily
			if (!this.byId("text-preview")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "ui5.demo.camera.view.Textpreview",
					controller: this
				}).then((oDialog) => {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("text-preview").open();
			}
		},

		onOpenBusyDialog() {
			const oView = this.getView();

			// create dialog lazily
			if (!this.byId("busy-dialog")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "ui5.demo.camera.view.Busydialog",
					controller: this
				}).then((oDialog) => {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("busy-dialog").open();
			}
		},

		handleSendImage() {
			const self = this;
			const server = 'http://localhost:3000/upload';
			const snapUrl = this.getOwnerComponent().getModel('config').getProperty('/cameraSnapUrl');

			// Close the preview window
			self.onCloseImagePreview(); 
			self.onOpenBusyDialog();

			fetch(snapUrl)
				.then((img) => img.blob())
				.then((blob) => {
					fetch(server, {
						method: 'POST',
						body: blob,
						responseType: 'stream',
						headers: {
							'content-type': blob.type,
						},
					})
						.then((res) => res.json())
						.then((data) => {
							self.getOwnerComponent().getModel("textpreview").setProperty('/value', data.value)
							self.onCloseBusyDialog();
							self.onOpenTextPreview()
						});
				});
		},

		handleSetDeviceId() {
			const oId = this.byId('cam-select').getSelectedKey()
			this.getOwnerComponent().getModel('config').setProperty('/videoContraints/video/deviceId/exact', oId);
			this.onChangeStream();
		},

		onCloseImagePreview() { this.byId("preview").close(); },

		onCloseTextPreview() { this.byId("text-preview").close(); },

		onCloseBusyDialog() { this.byId("busy-dialog").close(); },

	});
});