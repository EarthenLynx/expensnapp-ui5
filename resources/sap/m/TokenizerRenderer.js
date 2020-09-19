/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/InvisibleText"],function(e,t){"use strict";var n={apiVersion:2};n.render=function(a,i){if(i.getParent()&&(i.getParent()instanceof sap.m.MultiInput||i.getParent()instanceof sap.m.MultiComboBox)){a.openStart("div",i)}else{a.openStart("div",i).attr("tabindex","0")}a.class("sapMTokenizer");if(!i.getEditable()){a.class("sapMTokenizerReadonly")}if(!i.getEnabled()){a.class("sapMTokenizerDisabled")}var o=i.getTokens();if(!o.length){a.class("sapMTokenizerEmpty")}a.style("max-width",i.getMaxWidth());var r=i.getWidth();if(r){a.style("width",r)}var s={role:"listbox"};s.labelledby={value:t.getStaticId("sap.m","TOKENIZER_ARIA_LABEL"),append:true};a.accessibilityState(i,s);a.openEnd();a.renderControl(i.getAggregation("_tokensInfo"));i._bCopyToClipboardSupport=false;if((e.system.desktop||e.system.combi)&&o.length){a.openStart("div",i.getId()+"-clip").class("sapMTokenizerClip");if(window.clipboardData){a.attr("contenteditable","true");a.attr("tabindex","-1")}a.openEnd();a.unsafeHtml("&nbsp");a.close("div");i._bCopyToClipboardSupport=true}a.openStart("div");a.attr("id",i.getId()+"-scrollContainer");a.class("sapMTokenizerScrollContainer");a.openEnd();n._renderTokens(a,i);a.close("div");n._renderIndicator(a,i);a.close("div")};n._renderTokens=function(e,t){var n=0,a=t.getTokens(),i=a.length;if(t.getReverseTokens()){for(n=i-1;n>-1;n--){e.renderControl(a[n])}}else{for(n=0;n<i;n++){e.renderControl(a[n])}}};n._renderIndicator=function(e,t){e.openStart("span");e.class("sapMTokenizerIndicator");e.class("sapUiHidden");e.openEnd().close("span")};return n},true);