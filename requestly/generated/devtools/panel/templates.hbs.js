this["RQ"] = this["RQ"] || {};
this["RQ"]["Templates"] = this["RQ"]["Templates"] || {};

this["RQ"]["Templates"]["DevtoolsPage"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"toolbar\">\n  <div class=\"toolbar-item\">\n    <button type=\"button\" class=\"clear-logs\">&#128683; Clear</button>\n  </div>\n\n  <div class=\"toolbar-item\">\n    <label for=\"url-filter\">Request URL:</label>\n    <input type=\"text\" id=\"url-filter\" placeholder=\"Filter\">\n  </div>\n\n  <div class=\"toolbar-item\">\n    <label for=\"rule-filter\">Rule:</label>\n    <input type=\"text\" id=\"rule-filter\" placeholder=\"Filter\">\n  </div>\n</div>\n<table>\n  <thead>\n    <tr>\n      <th class=\"time\">Time</th>\n      <th class=\"url\">Request URL</th>\n      <th class=\"method\">Method</th>\n      <th class=\"type\">Type</th>\n      <th class=\"rule-name\">Rule</th>\n      <th class=\"modification\">Modification</th>\n    </tr>\n  </thead>\n  <tbody id=\"rows\" />\n</table>";
},"useData":true});

this["RQ"]["Templates"]["Row"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.requestMethod || (depth0 != null ? depth0.requestMethod : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"requestMethod","hash":{},"data":data}) : helper)));
},"3":function(depth0,helpers,partials,data) {
    return "-";
},"5":function(depth0,helpers,partials,data) {
    return this.escapeExpression((helpers.parseRequestType || (depth0 && depth0.parseRequestType) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.requestType : depth0),{"name":"parseRequestType","hash":{},"data":data}));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr>\n  <td class=\"time\">"
    + alias3(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + "s</td>\n  <td class=\"url\">"
    + alias3(((helper = (helper = helpers.requestURL || (depth0 != null ? depth0.requestURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"requestURL","hash":{},"data":data}) : helper)))
    + "</td>\n  <td class=\"method\">"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.requestMethod : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n  <td class=\"type\">"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.requestType : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n  <td class=\"rule-name\"><a href=\""
    + alias3(((helper = (helper = helpers.ruleLink || (depth0 != null ? depth0.ruleLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ruleLink","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" title=\"Open in new tab\">"
    + alias3(this.lambda(((stack1 = (depth0 != null ? depth0.rule : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></td>\n  <td class=\"modification\">"
    + alias3(((helper = (helper = helpers.modification || (depth0 != null ? depth0.modification : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"modification","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});