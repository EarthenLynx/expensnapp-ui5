sap.ui.define(["sap/ui/core/mvc/Controller","../model/formatter","sap/ui/core/Fragment"],function(e,t,o){"use strict";return e.extend("ui5.demo.camera.controller.App",{formatter:t,onInit(){const e=this;const t=e.getOwnerComponent().getModel("config");const o=t.getProperty("/videoContraints");navigator.mediaDevices.enumerateDevices().then(e=>e.filter(e=>e.kind==="videoinput")).then(e=>{t.setProperty("/videoDevices",e)}).then(()=>o.video.deviceId.exact=t.getProperty("/videoDevices")[1].deviceId).then(()=>e.onChangeStream())},onChangeStream(){const e=this;const t=e.getOwnerComponent().getModel("config").getProperty("/videoContraints");const o=document.getElementById("video-stream");console.log(t);navigator.mediaDevices.getUserMedia(t).then(e=>{o.srcObject=e;o.play()})},handleTakeScreenshot(){const e=document.getElementById("video-canvas");const t=document.getElementById("video-stream");e.width=t.videoWidth;e.height=t.videoHeight;e.getContext("2d").drawImage(t,0,0);this.getOwnerComponent().getModel("config").setProperty("/cameraSnapUrl",e.toDataURL("image/jpg"));this.onOpenImagePreview()},onOpenImagePreview(){const e=this.getView();if(!this.byId("preview")){o.load({id:e.getId(),name:"ui5.demo.camera.view.Preview",controller:this}).then(t=>{e.addDependent(t);t.open()})}else{this.byId("preview").open()}},onOpenTextPreview(){const e=this.getView();if(!this.byId("text-preview")){o.load({id:e.getId(),name:"ui5.demo.camera.view.Textpreview",controller:this}).then(t=>{e.addDependent(t);t.open()})}else{this.byId("text-preview").open()}},onOpenBusyDialog(){const e=this.getView();if(!this.byId("busy-dialog")){o.load({id:e.getId(),name:"ui5.demo.camera.view.Busydialog",controller:this}).then(t=>{e.addDependent(t);t.open()})}else{this.byId("busy-dialog").open()}},handleSendImage(){const e=this;const t="http://localhost:3000/upload";const o=this.getOwnerComponent().getModel("config").getProperty("/cameraSnapUrl");e.onCloseImagePreview();e.onOpenBusyDialog();fetch(o).then(e=>e.blob()).then(o=>{fetch(t,{method:"POST",body:o,responseType:"stream",headers:{"content-type":o.type}}).then(e=>e.json()).then(t=>{e.getOwnerComponent().getModel("textpreview").setProperty("/value",t.value);e.onCloseBusyDialog();e.onOpenTextPreview()})})},handleSetDeviceId(){const e=this.byId("cam-select").getSelectedKey();this.getOwnerComponent().getModel("config").setProperty("/videoContraints/video/deviceId/exact",e);this.onChangeStream()},onCloseImagePreview(){this.byId("preview").close()},onCloseTextPreview(){this.byId("text-preview").close()},onCloseBusyDialog(){this.byId("busy-dialog").close()}})});