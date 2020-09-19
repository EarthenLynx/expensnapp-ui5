/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ViewSettingsItem","./library","sap/ui/base/ManagedObject"],function(e,t,r){"use strict";var i=e.extend("sap.m.ViewSettingsFilterItem",{metadata:{library:"sap.m",properties:{multiSelect:{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{items:{type:"sap.m.ViewSettingsItem",multiple:true,singularName:"item",bindable:"bindable"}},events:{filterDetailItemsAggregationChange:{}}}});i.prototype._handleNewAggregationEvents=function(e){e.attachEvent("itemPropertyChanged",function(e){this.fireItemPropertyChanged({changedItem:e.getParameter("changedItem"),propertyKey:e.getParameter("propertyKey"),propertyValue:e.getParameter("propertyValue")})}.bind(this));this.fireFilterDetailItemsAggregationChange({item:e})};i.prototype.addAggregation=function(e,t,i){r.prototype.addAggregation.apply(this,arguments);this._handleNewAggregationEvents(t);return this};i.prototype.insertAggregation=function(e,t,i,a){r.prototype.insertAggregation.apply(this,arguments);this._handleNewAggregationEvents(t);return this};i.prototype.removeAggregation=function(e,t,i){r.prototype.removeAggregation.apply(this,arguments);this.fireFilterDetailItemsAggregationChange();return this};i.prototype.removeAllAggregation=function(e,t){r.prototype.removeAllAggregation.apply(this,arguments);this.fireFilterDetailItemsAggregationChange();return this};i.prototype.destroyAggregation=function(e,t){r.prototype.destroyAggregation.apply(this,arguments);this.fireFilterDetailItemsAggregationChange();return this};return i});