this["RQ"] = this["RQ"] || {};
this["RQ"]["Templates"] = this["RQ"]["Templates"] || {};

Handlebars.registerPartial("GroupRuleStatusToggle", this["RQ"]["Templates"]["GroupRuleStatusToggle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<a class=\"switch square\">\n  <label>\n    Off\n    <input type=\"checkbox\" class=\"group-rule-status-toggle\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.status : depth0),"Active",{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " />\n    <span class=\"lever\"></span>\n    On\n  </label>\n</a>\n";
},"useData":true}));

Handlebars.registerPartial("GroupStatusToggle", this["RQ"]["Templates"]["GroupStatusToggle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<a class=\"switch square\">\n  <label>\n    Off\n    <input type=\"checkbox\" class=\"group-status-toggle\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.status : depth0),"Active",{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " />\n    <span class=\"lever\"></span>\n    On\n  </label>\n</a>\n";
},"useData":true}));

Handlebars.registerPartial("PremiumBadge", this["RQ"]["Templates"]["PremiumBadge"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "title=\""
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<a class=\"premium-badge\"\n   href=\"https://www.requestly.io/blog/2019/02/18/introducing-premium-plans-free-plan-limits\" target=\"_blank\">\n  <span class=\"badge badge-success\" "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n    <i class=\"fa fa-star\"></i>\n    <span>Premium</span>\n  </span>\n</a>\n";
},"useData":true}));

Handlebars.registerPartial("StatusToggle", this["RQ"]["Templates"]["StatusToggle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<a class=\"switch square\">\n  <label>\n    Off\n    <input type=\"checkbox\" class=\"status-toggle\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.status : depth0),"Active",{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " />\n    <span class=\"lever\"></span>\n    On\n  </label>\n</a>\n";
},"useData":true}));

this["RQ"]["Templates"]["Favourites"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0,(helpers.isArrayEmpty || (depth0 && depth0.isArrayEmpty) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.pinnedData : depth0)) != null ? stack1.rules : stack1),{"name":"isArrayEmpty","hash":{},"data":data}),{"name":"unless","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    return "    <div class=\"no-rules-message\">\n      <h6>\n        <a class=\"manage-favourites-link\" href=\""
    + this.escapeExpression((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || helpers.helperMissing).call(depth0,"RQ.RULES_PAGE_URL",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\" target=\"_blank\">Open the app</a>\n        <span>to pin rules and groups</span>\n        <i class=\"fa fa-thumb-tack\"></i>\n      </h6>\n      <p>You can quickly toggle your pinned rules and groups directly from here</p>\n    </div>\n";
},"4":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "  <div class=\"secondary-text\">Pinned Groups:</div>\n  <div id=\"favourites-rules-list\" class=\"list\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.pinnedData : depth0)) != null ? stack1.groups : stack1),{"name":"each","hash":{},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n";
},"5":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "      <div class=\"list-item pinned-group rule-theme-"
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n        <span class=\"fav-icon-holder "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.isFavourite : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n          <i class=\"fa fa-thumb-tack group-pin-icon fav-icon-favourite\" title=\"Unpin Group\"></i>\n          <i class=\"fa fa-thumb-tack group-pin-icon fav-icon-not-favourite\" title=\"Pin Group\"></i>\n        </span>\n\n        <a id=\"group\" class=\""
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.isFavourite : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" href=\"#\">\n          <span class=\"group-name\">\n          "
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "&nbsp;&nbsp;\n          </span>\n\n          <span class=\"toggle-group-visibility-icons\">\n            <i class=\"fa fa-plus expand-icon\" title=\"Expand Group\"></i>\n            <i class=\"fa fa-minus collapse-icon hidden-icons\" title=\"Collapse Group\"></i>\n          </span>\n        </a>\n\n"
    + ((stack1 = this.invokePartial(partials.GroupStatusToggle,depth0,{"name":"GroupStatusToggle","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n        <div class=\"group-rules-list hidden-rules-list\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n      </div>\n";
},"6":function(depth0,helpers,partials,data) {
    return "is-favourite";
},"8":function(depth0,helpers,partials,data) {
    return "text-favourite";
},"10":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <div class=\"pinned-group-rules\" data-rule-index="
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + " data-rule-id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + " data-group-index="
    + alias3(this.lambda((this.data(data, 1) && this.data(data, 1).index), depth0))
    + ">\n              <a class=\"rule-name\" href=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULES_PAGE_URL",{"name":"readGlobalVar","hash":{},"data":data}))
    + "#edit/"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n              \n"
    + ((stack1 = this.invokePartial(partials.GroupRuleStatusToggle,depth0,{"name":"GroupRuleStatusToggle","data":data,"indent":"              ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "            </div>\n";
},"12":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.showPinnedRulesText : depth0),{"name":"if","hash":{},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <div id=\"favourites-rules-list\" class=\"list\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.pinnedData : depth0)) != null ? stack1.rules : stack1),{"name":"each","hash":{},"fn":this.program(15, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n";
},"13":function(depth0,helpers,partials,data) {
    return "    <div class=\"secondary-text\">Pinned rules:</div>\n";
},"15":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0,(helpers.isGroupUnpinned || (depth0 && depth0.isGroupUnpinned) || helpers.helperMissing).call(depth0,depth0,(depths[1] != null ? depths[1].pinnedData : depths[1]),{"name":"isGroupUnpinned","hash":{},"data":data}),{"name":"if","hash":{},"fn":this.program(16, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"16":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "        <div class=\"list-item favourite-rule rule-theme-"
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n          <span class=\"fav-icon-holder "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.isFavourite : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <i class=\"fa fa-thumb-tack fav-icon fav-icon-favourite\" title=\"Unpin Rule\"></i>\n            <i class=\"fa fa-thumb-tack fav-icon fav-icon-not-favourite\" title=\"Pin Rule\"></i>\n          </span>\n          <a class=\"rule-name\" href=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULES_PAGE_URL",{"name":"readGlobalVar","hash":{},"data":data}))
    + "#edit/"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n"
    + ((stack1 = this.invokePartial(partials.StatusToggle,depth0,{"name":"StatusToggle","data":data,"indent":"          ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = helpers.unless.call(depth0,(helpers.isArrayEmpty || (depth0 && depth0.isArrayEmpty) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.pinnedData : depth0)) != null ? stack1.groups : stack1),{"name":"isArrayEmpty","hash":{},"data":data}),{"name":"unless","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,(helpers.isArrayEmpty || (depth0 && depth0.isArrayEmpty) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.pinnedData : depth0)) != null ? stack1.groups : stack1),{"name":"isArrayEmpty","hash":{},"data":data}),{"name":"if","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,(helpers.isArrayEmpty || (depth0 && depth0.isArrayEmpty) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.pinnedData : depth0)) != null ? stack1.rules : stack1),{"name":"isArrayEmpty","hash":{},"data":data}),{"name":"if","hash":{},"fn":this.program(12, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});

this["RQ"]["Templates"]["PopupContainer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"popup-header\">\n  <div class=\"product-logo\">\n    <img src=\"/resources/images/extended_logo-96.png\" class=\"product-image\" />\n  </div>\n  <a id=\"app-link\" class=\"btn btn-sm btn-primary\" href=\""
    + this.escapeExpression((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || helpers.helperMissing).call(depth0,"RQ.RULES_PAGE_URL",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\" target=\"_blank\">\n    <span>Open app</span>\n    <i class=\"fa fa-external-link\"></i>\n  </a>\n</div>\n<div id=\"popup-content\">\n  <div id=\"session-view\"></div>\n  <div id=\"favourites\"></div>\n</div>\n<div class=\"popup-footer\">\n  <p class=\"secondary-text\">To see logs for all rules applied on this page, Right click on page &gt; Inspect &gt; Requestly tab.</p>\n</div>";
},"useData":true});

this["RQ"]["Templates"]["SessionView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"session-view-content\">\n  <p>Session is being recorded on this page.</p>\n  <a href=\"#\" class=\"view-session\">View recording <i class=\"fa fa-external-link\"></i></a>\n</div>\n";
},"useData":true});