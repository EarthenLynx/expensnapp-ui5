/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Core"],function(t,e){"use strict";var r=t.Orientation;var i=e.getLibraryResourceBundle("sap.ui.layout");var a={apiVersion:2};a.render=function(t,i){var a=i.getOrientation()===r.Horizontal,o=a?"sapUiLoSplitterH":"sapUiLoSplitterV",n=e.getConfiguration().getAnimation();t.openStart("div",i).class("sapUiLoSplitter").class(o);if(n&&!i._liveResize){t.class("sapUiLoSplitterAnimated")}t.style("width",i.getWidth()).style("height",i.getHeight()).openEnd();this.renderContentAreas(t,i);t.close("div")};a.renderContentAreas=function(t,e){var i=e.getId(),o=e.getOrientation()===r.Horizontal,n=o?"width":"height",s=e._getContentAreas(),p=s.length,l=e.getCalculatedSizes();s.forEach(function(r,s){var c=r.getLayoutData(),d="0";if(l[s]){d=l[s]+"px"}else if(c){d=c.getSize()}t.openStart("section",i+"-content-"+s).style(n,d).class("sapUiLoSplitterContent").openEnd();t.renderControl(r);t.close("section");if(s<p-1){a.renderBar(t,o,e.getId()+"-splitbar-"+s,"sapUiLoSplitterBar")}});t.openStart("div",i+"-overlay").class("sapUiLoSplitterOverlay").openEnd();a.renderBar(t,o,i+"-overlayBar","sapUiLoSplitterOverlayBar");t.close("div")};a.renderBar=function(t,e,r,o){t.openStart("div",r).attr("role","separator").attr("title",i.getText("SPLITTER_MOVE")).attr("aria-orientation",e?"vertical":"horizontal").attr("tabindex",0).class(o).openEnd();a.renderBarGripAndDecorations(t,e);t.close("div")};a.renderBarGripAndDecorations=function(t,e){var r=e?"sap-icon://vertical-grip":"sap-icon://horizontal-grip";t.openStart("div").class("sapUiLoSplitterBarDecorationBefore").openEnd().close("div");t.openStart("div").class("sapUiLoSplitterBarGrip").openEnd().icon(r,["sapUiLoSplitterBarGripIcon"]).close("div");t.openStart("div").class("sapUiLoSplitterBarDecorationAfter").openEnd().close("div")};return a},true);