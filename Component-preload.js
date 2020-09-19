//@ui5-bundle ui5/demo/camera/Component-preload.js
sap.ui.require.preload({
	"ui5/demo/camera/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(e,i,t){"use strict";return e.extend("ui5.demo.camera.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.setModel(t.createDeviceModel(),"device");this.setModel(t.createConfigModel(),"config");this.getRouter().initialize()}})});
},
	"ui5/demo/camera/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/demo/basicTemplate/model/formatter"],function(e,t){"use strict";return e.extend("ui5.demo.camera.controller.App",{formatter:t,onInit:function(){}})});
},
	"ui5/demo/camera/controller/Home.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","../model/formatter","sap/ui/core/Fragment"],function(e,t,o){"use strict";return e.extend("ui5.demo.camera.controller.App",{formatter:t,onInit(){const e=this;const t=e.getOwnerComponent().getModel("config");const o=t.getProperty("/videoContraints");navigator.mediaDevices.enumerateDevices().then(e=>e.filter(e=>e.kind==="videoinput")).then(e=>{t.setProperty("/videoDevices",e)}).then(()=>o.video.deviceId.exact=t.getProperty("/videoDevices")[1].deviceId).then(()=>e.onChangeStream())},onChangeStream(){const e=this;const t=e.getOwnerComponent().getModel("config").getProperty("/videoContraints");const o=document.getElementById("video-stream");console.log(t);navigator.mediaDevices.getUserMedia(t).then(e=>{o.srcObject=e;o.play()})},handleTakeScreenshot(){const e=document.getElementById("video-canvas");const t=document.getElementById("video-stream");e.width=t.videoWidth;e.height=t.videoHeight;e.getContext("2d").drawImage(t,0,0);this.getOwnerComponent().getModel("config").setProperty("/cameraSnapUrl",e.toDataURL("image/jpg"));this.onOpenPreview()},onOpenPreview(){const e=this.getView();if(!this.byId("preview")){o.load({id:e.getId(),name:"ui5.demo.camera.view.Preview",controller:this}).then(t=>{e.addDependent(t);t.open()})}else{this.byId("preview").open()}},handleSendImage(){const e="http://localhost:3000/upload";const t=this.getOwnerComponent().getModel("config").getProperty("/cameraSnapUrl");fetch(t).then(e=>e.blob()).then(t=>{fetch(e,{method:"POST",body:t,responseType:"stream",headers:{"content-type":t.type}}).then(e=>e.json()).then(e=>console.log(e))})},onClosePreview(){this.byId("preview").close()},handleSetDeviceId(){const e=this.byId("cam-select").getSelectedKey();this.getOwnerComponent().getModel("config").setProperty("/videoContraints/video/deviceId/exact",e);this.onChangeStream()}})});
},
	"ui5/demo/camera/i18n/i18n.properties":'# General translations\ntitle=Basic Camera Template\nappTitle=Basic Camera Template\nappDescription=Blank cam app as starting point for your app development\n\n# Fragment translations\nfragmentPreviewDialogTitle=Preview\n\n# Buttons\nbuttonCloseText=Close\nbuttonActionText=Send\nbuttonCameraText=Snap\nbuttonCameraTooltip=Take picture\n',
	"ui5/demo/camera/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"ui5.demo.camera","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","ach":"ach"},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"ui5.demo.camera.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui5.demo.camera.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"ui5.demo.camera.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"home","target":["home"]}],"targets":{"home":{"viewName":"Home","viewId":"home","viewLevel":1,"title":"{i18n>title}"}}}}}',
	"ui5/demo/camera/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{}});
},
	"ui5/demo/camera/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,i){"use strict";return{createDeviceModel(){var n=new e(i);n.setDefaultBindingMode("OneWay");return n},createConfigModel(){const i=new e({cameraSelection:"",cameraSnapUrl:"",videoDevices:[],videoContraints:{video:{height:{min:640,ideal:736,max:736},width:{min:326,ideal:538,max:1920},deviceId:{exact:""}}}});return i}}});
},
	"ui5/demo/camera/view/App.view.xml":'<mvc:View\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Shell><App id="app"/></Shell></mvc:View>',
	"ui5/demo/camera/view/Home.view.xml":'<mvc:View controllerName="ui5.demo.camera.controller.Home" displayBlock="true"\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"\n\txmlns:mvc="sap.ui.core.mvc"><Page id="page" title="{i18n>title}"><headerContent><Select id="cam-select" change="handleSetDeviceId" selectedKey="config>/videoContraints/video/deviceId/exact" items="{config>/videoDevices}"><core:ListItem key="{config>deviceId}" text="{config>label}" icon="sap-icon://video"/></Select></headerContent><content><core:HTML content=\'&lt;video id=&quot;video-stream&quot; style=&quot;width: 100%; height: 100%; margin: auto; display: block;&quot; autoplay /&gt;\'></core:HTML><core:HTML content=\'&lt;canvas id=&quot;video-canvas&quot; style=&quot;display: none;&quot; /&gt;\'></core:HTML></content><footer><OverflowToolbar><ToolbarSpacer/><Button text="{i18n>buttonCameraText}" tooltip="{i18n>buttonCameraTooltip}" icon="sap-icon://camera" type="Emphasized" press="handleTakeScreenshot" /><ToolbarSpacer/></OverflowToolbar></footer></Page></mvc:View>',
	"ui5/demo/camera/view/Preview.fragment.xml":'<core:FragmentDefinition xmlns="sap.m"\n  xmlns:core="sap.ui.core"><Dialog id="preview" title="{i18n>fragmentPreviewDialogTitle}" icon="sap-icon://background"><Image ariaDetails="camera snap" src="{config>/cameraSnapUrl}" width="100%" decorative="false" /><OverflowToolbar><ToolbarSpacer/><Button press="onClosePreview" text="{i18n>buttonCloseText}" icon="sap-icon://decline" type="Reject"/><Button press="handleSendImage" text="{i18n>buttonActionText}" icon="sap-icon://paper-plane" type="Accept" /></OverflowToolbar></Dialog></core:FragmentDefinition>'
});
