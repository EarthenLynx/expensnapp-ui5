/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SemanticControl","sap/m/Button","sap/m/semantic/SemanticOverflowToolbarButton","sap/ui/thirdparty/jquery"],function(t,e,n,i){"use strict";var r=t.extend("sap.m.semantic.SemanticButton",{metadata:{library:"sap.m",abstract:true,properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true}},events:{press:{}}}});r.prototype._getControl=function(){var t=this.getAggregation("_control");if(!t){var i=this._getConfiguration()&&this._getConfiguration().constraints==="IconOnly"?n:e;var r=this._createInstance(i);r.applySettings(this._getConfiguration().getSettings());if(typeof this._getConfiguration().getEventDelegates==="function"){r.addEventDelegate(this._getConfiguration().getEventDelegates(r))}this.setAggregation("_control",r,true);t=this.getAggregation("_control")}return t};r.prototype._createInstance=function(t){return new t({id:this.getId()+"-button",press:i.proxy(this.firePress,this)})};return r});