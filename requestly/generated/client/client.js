
  if (typeof isReactApp === "undefined") {
    var isReactApp = typeof require !== "undefined";
  }

  const configs = {
  "browser": "chrome",
  "storageType": "sync",
  "contextMenuContexts": [
    "browser_action"
  ],
  "collectExtUsageStats": true,
  "env": "prod",
  "WEB_URL": "https://app.requestly.io",
  "firebaseConfig": {
    "apiKey": "AIzaSyC2WOxTtgKH554wCezEJ4plxnMNXaUSFXY",
    "authDomain": "app.requestly.io",
    "databaseURL": "https://requestly.firebaseio.com",
    "projectId": "project-7820168409702389920",
    "storageBucket": "project-7820168409702389920.appspot.com",
    "messagingSenderId": "911299702852"
  },
  "logLevel": "info",
  "stripeConfig": {
    "publishableKey": "pk_live_51KflXlDiNNz2hbmOqdAyoiT6yOwLbz6rqjSHA7tqZc6NII5mJmuCVtUnpAK1A9ZCcBZywXiM3ff41Uln1QXSqqKt00vUoJUf2e"
  }
};
  if (isReactApp) {
    /** For React App */
    module.exports = configs;
  } else {
    /** 
     * For legacy apps- browser extension 
     * Added if-check because desktop app breaks on compilation
     */
    if (window) {
      window.RQ = window.RQ || {};
      window.RQ.configs = configs;  
    }
  }  

/**
 * This module is define as CommonJS Module. We should move it to ES6 Module later on and fix the imports.
 * Right now the imports are defined using require, once changed to ES6 module we can move to import module
 * @TODO: Remove dependency of configs from constants.
 */
if (typeof isReactApp === "undefined") {
  var isReactApp = typeof require !== "undefined";
}
const CONSTANTS = {};
let CONFIGS;

if (isReactApp) {
  CONFIGS = require("../../config");
} else {
  CONFIGS = window.RQ.configs;
}

CONSTANTS.APP_MODES = {
  DESKTOP: "DESKTOP",
  EXTENSION: "EXTENSION",
  WORDPRESS: "WORDPRESS",
  CLOUDFLARE: "CLOUDFLARE",
  REMOTE: "REMOTE",
};

CONSTANTS.COMPANY_INFO = {
  SUPPORT_EMAIL: "contact@requestly.io",
};

CONSTANTS.VERSION = 3;

CONSTANTS.TRACK_ERRORS = true;

//No. of days to show onboarding after signing up
CONSTANTS.ONBOARDING_DAYS_TO_EXPIRE = 7;

//No. of tasks to complete on onboarding
CONSTANTS.ONBOARDING_TASKS = 5;

CONSTANTS.FILE_PICKER_URL = "/library/filepicker";

CONSTANTS.VERSIONS = {
  REPLACE_RULE: 2,
};

CONSTANTS.ENV = CONFIGS.env;

CONSTANTS.PUBLIC_NAMESPACE = "__REQUESTLY__";

// Url which gets opened when User clicks on browserAction (requestly icon) in toolbar
CONSTANTS.RULES_PAGE_URL = CONFIGS.WEB_URL + "/rules/";

CONSTANTS.RULES_PAGE_URL_PATTERN = CONSTANTS.RULES_PAGE_URL + "*";

CONSTANTS.PRICING_PAGE_URL = CONFIGS.WEB_URL + "/pricing/";

CONSTANTS.GOODBYE_PAGE_URL = CONFIGS.WEB_URL + "/goodbye/";

// URL For Delay Request API
CONSTANTS.DELAY_API_URL = CONFIGS.WEB_URL + "/delay/";

// URL for Mock Server
CONSTANTS.MOCK_URL = CONFIGS.WEB_URL + "/mock/";

CONSTANTS.DESKTOP_APP_URL = CONFIGS.WEB_URL + "/desktop/intercept-traffic";

CONSTANTS.CONSOLE_LOGGER_ENABLED = "console-logger-enabled";

/**
 * We are calling them as BLACK_LIST_DOMAINS
 * however the usage is code is as the URL containing these substrings, We don't touch those requests
 */
CONSTANTS.BLACK_LIST_DOMAINS = [
  "requestly.in",
  "requestly.io",
  "rq.in",
  "rq.io",
  "__rq",
];

CONSTANTS.STRING_CONSTANTS = {
  SLASH: "/",
};

CONSTANTS.LIMITS = {
  NUMBER_SHARED_LISTS: 10,
  NUMBER_EXECUTION_LOGS: 25,
};

CONSTANTS.DEFAULTS = {
  APP_INIT_TIMEOUT: 5000,
};

CONSTANTS.OBJECT_TYPES = {
  GROUP: "group",
  RULE: "rule",
};

CONSTANTS.RULE_TYPES = {
  REDIRECT: "Redirect",
  CANCEL: "Cancel",
  REPLACE: "Replace",
  HEADERS: "Headers",
  USERAGENT: "UserAgent",
  SCRIPT: "Script",
  QUERYPARAM: "QueryParam",
  RESPONSE: "Response",
  REQUEST: "Request",
  DELAY: "Delay",
};

CONSTANTS.DELAY_REQUEST_CONSTANTS = {
  DELAY_PARAM_NAME: "delay", // string to add as query paramName
  DELAY_PARAM_VALUE: "true", // string to add as query paramValue
  MIN_DELAY_VALUE: 1,
  MAX_DELAY_VALUE_NON_XHR: 10000,
  MAX_DELAY_VALUE_XHR: 5000,
  DELAY_TYPE: {
    CLIENT_SIDE: "clientSideDelay",
    SERVER_SIDE: "serverSideDelay",
  },
  REQUEST_TYPE: {
    XHR: "xmlhttprequest",
  },
  METHOD_TYPE: {
    GET: "GET",
  },
};

CONSTANTS.OBJECT_FORMAT_KEYS = {
  CREATION_DATE: "creationDate",
  NAME: "name",
  ID: "id",
  RULE_TYPE: "ruleType",
  STATUS: "status",
  OBJECT_TYPE: "objectType",
  GROUP_ID: "groupId",
  IS_FAVOURITE: "isFavourite",
};

CONSTANTS.HEADER_NAMES = {
  USER_AGENT: "User-Agent",
};

CONSTANTS.GROUP_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

CONSTANTS.RULE_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

CONSTANTS.SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  CANCELLED: "cancelled",
};

CONSTANTS.RULE_KEYS = {
  URL: "Url",
  HOST: "host",
  PATH: "path",
  HEADER: "Header",
  OVERWRITE: "Overwrite",
  IGNORE: "Ignore",
  PARAM: "param",
  VALUE: "value",
};

CONSTANTS.PATH_FROM_PAIR = {
  RULE_KEYS: "source.key",
  RULE_OPERATORS: "source.operator",
  SCRIPT_LIBRARIES: "libraries",
  SOURCE_PAGE_URL_OPERATOR: "source.filters.pageUrl.operator",
  SOURCE_PAGE_URL_VALUE: "source.filters.pageUrl.value",
  SOURCE_RESOURCE_TYPE: "source.filters.resourceType",
  SOURCE_REQUEST_METHOD: "source.filters.requestMethod",
  SOURCE_REQUEST_PAYLOAD_KEY: "source.filters.requestPayload.key",
  SOURCE_REQUEST_PAYLOAD_VALUE: "source.filters.requestPayload.value",
};

CONSTANTS.URL_COMPONENTS = {
  PROTOCOL: "Protocol",
  URL: "Url",
  HOST: "host",
  PATH: "path",
  QUERY: "query",
  HASH: "hash",
};

CONSTANTS.RULE_OPERATORS = {
  EQUALS: "Equals",
  CONTAINS: "Contains",
  MATCHES: "Matches",
  WILDCARD_MATCHES: "Wildcard_Matches",
};

CONSTANTS.RULE_SOURCE_FILTER_TYPES = {
  PAGE_URL: "pageUrl",
  RESOURCE_TYPE: "resourceType",
  REQUEST_METHOD: "requestMethod",
  REQUEST_DATA: "requestPayload",
};

CONSTANTS.MODIFICATION_TYPES = {
  ADD: "Add",
  REMOVE: "Remove",
  REMOVE_ALL: "Remove All",
  MODIFY: "Modify",
  REPLACE: "Replace",
};

CONSTANTS.NEED_HELP_QUERY_TYPES = {
  FEEDBACK: "Feedback",
  BUG: "Bug",
  QUESTION: "Question",
  FEATURE_REQUEST: "FeatureRequest",
};

CONSTANTS.CLIENT_MESSAGES = {
  GET_SCRIPT_RULES: "getScriptRules",
  DO_SETUP_RESPONSE_RULE_HANDLER: "doSetupResponseRuleHandler",
  GET_USER_AGENT_RULE_PAIRS: "getUserAgentRulePairs",
  OVERRIDE_RESPONSE: "overrideResponse",
  NOTIFY_RULES_APPLIED: "notifyRulesApplied",
  PRINT_CONSOLE_LOGS: "printConsoleLogs",
  GET_SESSION_RECORDING_CONFIG: "getSessionRecordingConfig",
  NOTIFY_SESSION_RECORDING_STARTED: "notifySessionRecordingStarted",
  IS_RECORDING_SESSION: "isRecordingSession",
  GET_TAB_SESSION: "getTabSession",
};

CONSTANTS.EXTENSION_MESSAGES = {
  FOCUS_TAB: "focusTab",
  GET_FULL_LOGS: "getFullLogs",
  CLEAR_LOGS_FOR_TAB: "clearLogsForTab",
  CLEAR_LOGS_FOR_DOMAIN: "clearLogsForDomain",
  GET_FAVOURITE_RULES: "getFavouriteRules",
  GET_PINNED_GROUPS: "getPinnedGroups",
  GET_ALL_RULES: "getAllRules",
  GET_FLAGS: "getFlags",
  GET_TAB_SESSION: "getTabSession",
};

CONSTANTS.HEADERS_TARGET = {
  REQUEST: "Request",
  RESPONSE: "Response",
};

CONSTANTS.REQUEST_TYPES = {
  MAIN_FRAME: "mainFrame",
  PAGE_REQUEST: "pageRequest",
};

CONSTANTS.SCRIPT_TYPES = {
  URL: "url",
  CODE: "code",
};

CONSTANTS.SCRIPT_CODE_TYPES = {
  JS: "js",
  CSS: "css",
};

CONSTANTS.SCRIPT_LOAD_TIME = {
  BEFORE_PAGE_LOAD: "beforePageLoad",
  AFTER_PAGE_LOAD: "afterPageLoad",
};

CONSTANTS.SCRIPT_LIBRARIES = {
  JQUERY: { name: "jQuery", src: "https://code.jquery.com/jquery-2.2.4.js" },
  UNDERSCORE: {
    name: "Underscore",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
  },
};

CONSTANTS.REQUEST_BODY_TYPES = {
  STATIC: "static",
  CODE: "code",
};

CONSTANTS.RESPONSE_BODY_TYPES = {
  STATIC: "static",
  CODE: "code",
  LOCAL_FILE: "local_file",
};

CONSTANTS.RESPONSE_CODES = {
  NOT_FOUND: 404,
};

CONSTANTS.STORAGE_KEYS = {
  REQUESTLY_SETTINGS: "rq_settings",
  USER_INFO: "user_info",
  LATEST_NOTIFICATION_READ_BY_USER: "latestNotificationReadId",
  SESSION_RECORDING_CONFIG: "sessionRecordingConfig",
};

CONSTANTS.MESSAGES = {
  DELETE_ITEMS_NO_SELECTION_WARNING:
    "Please select one or more rules to delete.",
  DELETE_ITEMS: "Are you sure you want to delete the selected items?",
  DELETE_GROUP_WITH_RULES_WARNING:
    "There are some rules contained in this group. Please delete or ungroup them before deleting the group.",
  DELETE_GROUP: "Are you sure you want to delete the group?",
  UNGROUP_ITEMS_NO_SELECTION_WARNING:
    "Please select one or more rules to ungroup.",
  UNGROUP_ITEMS: "Are you sure you want to ungroup the selected items?",
  SIGN_IN_TO_VIEW_SHARED_LISTS: "Please login to view your Shared Lists.",
  SIGN_IN_TO_CREATE_SHARED_LISTS: "Please login to share the selected rules",
  SIGN_IN_TO_SUBMIT_QUERY: "Please login to contact our support team.",
  ERROR_AUTHENTICATION:
    "Received some error in authentication. Please try again later!!",
  SHARED_LISTS_LIMIT_REACHED:
    "You can not create more than" +
    CONSTANTS.LIMITS.NUMBER_SHARED_LISTS +
    "shared lists",
  ERROR_TAB_FOCUS: "The tab cannot be focused, as it might have been closed.",
  DEACTIVATE_REQUESTLY_MENU_OPTION: "Deactivate Requestly",
};

CONSTANTS.RESOURCES = {
  EXTENSION_ICON: "/resources/images/48x48.png",
  EXTENSION_ICON_GREYSCALE: "/resources/images/48x48_greyscale.png",
  EXTENSION_ICON_GREEN: "/resources/images/48x48_green.png",
};

CONSTANTS.SYNC_CONSTANTS = {
  SYNC_TYPES: {
    UPDATE_RECORDS: "update_records",
    REMOVE_RECORDS: "remove_records",
    SESSION_RECORDING_PAGE_CONFIG: "session_recording_page_config",
  },
};

CONSTANTS.GA_EVENTS = {
  CATEGORIES: {
    RULES: "rules",
    RULE: "rule",
    GROUP: "group",
    USER: "user",
    SHARED_LIST: "shared list",
    TRASH: "trash",
    RULE_LOGS: "rule logs",
    EXTENSION: "extension",
    IN_APP_NOTIFICATION: "InAppNotification",
    NEED_HELP_FEATURE: "need help feature",
    PRICING: "pricing",
    LICENSE: "license",
    LIBRARY: "library",
    UNLOCK: "unlock",
    REMOTE_RULES: "remoteRules",
    SPONSOR_SIDERAIL: "sponsor_siderail",
    LOGIN: "login",
    SIGNUP: "signup",
    REFERRAL: "referral",
    PAGE_VISITS: "page visits",
    REQUEST_UPGRADE: "request upgrade",
    MARKETPLACE: "marketplace",
    CHECKOUT: "checkout page",
    TEAMS: "teams page",
    ONBOARDING: "onboarding page",
    RULE_PAIRS: "rule pairs",
    DESKTOP_APP: "desktop app",
  },
  ACTIONS: {
    MODIFIED: "modified",
    CREATED: "created",
    DELETED: "deleted",
    ACTIVATED: "activated",
    DEACTIVATED: "deactivated",
    IMPORTED: "imported",
    EXPORTED: "exported",
    LIMIT_REACHED: "limit reached",
    AUTHENTICATED: "authenticated",
    VIEWED: "viewed",
    CLICKED: "clicked",
    COPIED: "duplicated",
    MARKED_FAVOURITE: "marked favourite",
    UNMARKED_FAVOURITE: "unmarked favourite",
    WORKFLOW_STARTED: "workflow started",
    ALREADY_LOGIN: "already login",
    LOGIN_REQUESTED: "login requested",
    LOGIN_DONE: "login done",
    LOGIN_REJECTED: "login rejected",
    FORM_SUBMITTED: "form submitted",
    FORM_REJECTED: "form rejected",
    INVALID_SUBMIT: "invalid submit",
    GROUPED: "grouped",
    UNGROUPED: "ungrouped",
    SHARED: "shared",
    ERROR: "error occured",
    TASK_COMPLETED: "task completed",
    BACKUP_CREATED: "backup created",
    BACKUP_USED: "backup used",

    CARD_ERROR: "card error",
    CARD_ACCEPTED: "card accepted",
    CARD_ENTERED: "card num and cv entered",

    CURRENCY_CHANGE: "currency_changed",
    DURATION_CHANGE: "duration_changed",
    APPLIED_SUCCESSFULLY: "applied_successfully",
    APPLIED_UNSUCCESSFULLY: "applied_unsuccessfully",

    REVOKED: "revoked",
    BOUGHT: "bought",
    UPDATED: "updated",
    REQUEST_ADMIN: "enterprise_plan_requested",

    UNINSTALLED: "uninstalled",
    UNINSTALL_RESPONSE: "uninstall_response",

    ROUTE_VIEWED: "route_viewed",
    EMAIL_LOGIN_PERFORMED: "email_login_performed",
    EMAIL_SIGNUP_PERFORMED: "email_signup_performed",
    GMAIL_LOGIN_PERFORMED: "gmail_login_performed",
    GMAIL_SIGNUP_PERFORMED: "gmail_signup_performed",
    MICROSOFT_LOGIN_PERFORMED: "microsoft_login_performed",
    APPLE_LOGIN_PERFORMED: "apple_login_performed",

    REFERRAL_APPLIED: "referral_applied",
    REFERRAL_FAILED: "referral_failed",

    EMAIL_VERIFICATION_RESEND: "resend_email_verification",
    EMAIL_VERIFICATION_SUCCESSFUL: "email_verification_successful",
    EMAIL_VERIFICATION_FAILED: "email_verification_failed",

    TRAFFIC_TABLE_VIEWED: "traffic_table_viewed",
    TRAFFIC_TABLE_MODIFIED: "traffic_table_modified",

    APP_LAUNCHED: "app_launched",
    APP_CLOSED: "app_closed",
    APP_NOT_LAUNCHED: "app_not_launched",
    PROXY_SERVER: "proxy_server_started",
    BG_PROCESS: "bg_process_started",

    MANUAL_SETUP_MAC: "manual_setup_mac",

    DARK_MODE_ENABLED: "dark_mode_enabled",
    DARK_MODE_DISABLED: "dark_mode_disabled",
    UPGRADE_REQUIRED_FOR_DARK_MODE: "upgrade_required_for_dark_mode",

    SIMULATE_RULE: "simulate_rule",
    EXECUTION_LOGS: "execution_logs",

    SOURCE_FILTER_FORMAT_UPGRADED: "source_filter_format_upgraded",
    HEADER_RULES_MIGRATED_TO_V2: "header_rules_migrated_to_v2",
    PROMO_BANNER_CLICKED: "promo_banner_clicked",
  },
  ATTR: {
    PAYMENT_MODE: "payment_mode",
    PLANNAME: "planname",
    PLAN_DURATION: "plan_duration",
    PLAN_ID: "plan_id",
    PLAN_START_DATE: "plan_startDate",
    PLAN_END_DATE: "plan_endDate",
    COUPON: "coupon",
    COUPON_VALUE: "coupon_value",
    LICENSE: "licensekey",
    COMPANY: "company",

    PROFILE: "profile",

    REMOTE_RULES_ENDPOINT: "remoteRulesEndpoint",
    REMOTE_RULES_FREQUENCY: "remoteRulesFrequency",

    NUM_RULES: "NUM_RULES",
    NUM_ACTIVE_RULES: "NUM_ACTIVE_RULES",
    NUM_GROUPS: "NUM_GROUPS",
    NUM_ACTIVE_GROUPS: "NUM_ACTIVE_GROUPS",
    NUM_SHARED_LISTS: "NUM_SHARED_LISTS",

    ONBOARDING_V1_DONE: "ONBOARDING_V1_DONE",

    SIGNUP_DATE: "SIGNUP_DATE",

    EXTENSION_INSTALL_DATE: "install_date",
    DESKTOP_INSTALL_DATE: "desktop_install_date",

    APP_MODE: "APP_MODE",
    EMAIL_TYPE: "EMAIL_TYPE",
    EMAIL_DOMAIN: "EMAIL_DOMAIN",
    IS_PREMIUM: "IS_PREMIUM",

    HAS_AVAILED_TWITTER_TRIAL: "HAS_AVAILED_TWITTER_TRIAL",
    HAS_AVAILED_CHROME_STORE_TRIAL: "HAS_AVAILED_CHROME_STORE_TRIAL",
    HAS_AVAILED_GITHUB_TRIAL: "HAS_AVAILED_GITHUB_TRIAL",
    TRIAL_MODE_ENABLED: "trial_mode_enabled",
  },
  VALUES: {
    PAYPAL: "paypal",
  },
  GA_CUSTOM_DIMENSIONS: {
    USER_ID: "dimension1",
  },
  GA_CUSTOM_METRICS: {
    num_rules: "metric1",
  },
};

CONSTANTS.USER = {
  AUTHORIZED: "authorized-user",
  UNAUTHORIZED: "unauthorized-user",
};

CONSTANTS.FIREBASE_NODES = {
  USERS: "users",
  PUBLIC: "public",
  SHARED_LISTS: "sharedLists",
  FEEDBACK: "feedback",
  FILES: "files",
};

CONSTANTS.DATASTORE = {
  ACTIONS: {
    CHECK_USER_AUTH: "check:userAuthenticated",
    AUTHENTICATE: "authenticate",
    FETCH_USER_DETAILS: "fetchUserDetails",
    GETVALUE: "getValue",
    SETVALUE: "setValue",
  },
};

CONSTANTS.MESSAGE_HANDLER = {
  ACTIONS: {
    SUBMIT_EVENT: "submitEvent",
    SUBMIT_ATTR: "submitAttr",
  },
  MESSAGE_TYPES: {
    EVENT: "event",
    ATTRIBUTE: "attribute",
  },
  SINKS: {
    CUSTOMERLY: "customerly",
  },
};

CONSTANTS.REQUEST_STATE = {
  LOADING: "LOADING",
  COMPLETE: "COMPLETE",
};

CONSTANTS.getSharedListURL = function (shareId, sharedListName) {
  const formattedSharedListName = sharedListName
    .replace(new RegExp(" +|/+", "g"), "-")
    .replace(/-+/g, "-");
  return (
    CONSTANTS.RULES_PAGE_URL +
    "#sharedList/" +
    shareId +
    "-" +
    formattedSharedListName
  );
};

CONSTANTS.getSharedListTimestamp = function (sharedListId) {
  return sharedListId.split("-")[0];
};

CONSTANTS.fireAjax = function (requestURL, async) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", requestURL, async);
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject();
        }
      }
    };
    request.send();
  });
};

if (isReactApp) {
  module.exports = CONSTANTS;
} else {
  /** For legacy apps- browser extension */
  Object.assign(window.RQ, CONSTANTS);
}

RQ.ClientUtils = RQ.ClientUtils || {};

RQ.ClientUtils.executeJS = function (code, shouldRemove) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.className = RQ.ClientUtils.getScriptClassAttribute();

  script.appendChild(document.createTextNode(code));
  const parent = document.head || document.documentElement;
  parent.appendChild(script);

  if (shouldRemove) {
    parent.removeChild(script);
  }
};

RQ.ClientUtils.addRemoteJS = function (src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.className = RQ.ClientUtils.getScriptClassAttribute();

  if (typeof callback === "function") {
    script.onload = callback;
  }

  (document.head || document.documentElement).appendChild(script);
  return script;
};

RQ.ClientUtils.embedCSS = function (css) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  style.className = RQ.ClientUtils.getScriptClassAttribute();

  (document.head || document.documentElement).appendChild(style);
  return style;
};

RQ.ClientUtils.addRemoteCSS = function (src) {
  var link = document.createElement("link");
  link.href = src;
  link.type = "text/css";
  link.rel = "stylesheet";
  link.className = RQ.ClientUtils.getScriptClassAttribute();

  (document.head || document.documentElement).appendChild(link);
  return link;
};

RQ.ClientUtils.onPageLoad = function () {
  return new Promise(function (resolve) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });
};

RQ.ClientUtils.getScriptClassAttribute = function () {
  return RQ.PUBLIC_NAMESPACE + "SCRIPT";
};

RQ.ClientUtils.isHTMLDocument = function () {
  const docType = document.doctype;
  return docType && docType.name === "html";
};

RQ.ScriptRuleHandler = {};

RQ.ScriptRuleHandler.setup = function () {
  const message = {
    action: RQ.CLIENT_MESSAGES.GET_SCRIPT_RULES,
    url: window.location.href,
  };
  chrome.runtime.sendMessage(message, function (rules) {
    if (rules && rules.constructor === Array) {
      RQ.ScriptRuleHandler.handleRules(rules);

      chrome.runtime.sendMessage({
        action: RQ.CLIENT_MESSAGES.NOTIFY_RULES_APPLIED,
        url: window.location.href,
        rules: rules,
        modification: "executed script",
        method: "GET",
        type: "document",
        timeStamp: Date.now(),
      });
    }
  });
};

RQ.ScriptRuleHandler.handleRules = function (rules) {
  return new Promise(function (resolve) {
    var libraries = [],
      scripts = [];

    rules.forEach(function (rule) {
      var pair = rule.pairs[0];

      pair.libraries &&
        pair.libraries.forEach(function (library) {
          if (!libraries.includes(library)) {
            libraries.push(library);
          }
        });

      scripts = scripts.concat(pair.scripts || []);
    });

    var cssScripts = scripts.filter(function (script) {
      return script.codeType === RQ.SCRIPT_CODE_TYPES.CSS;
    });

    var jsScripts = scripts.filter(function (script) {
      return !script.codeType || script.codeType === RQ.SCRIPT_CODE_TYPES.JS;
    });

    RQ.ScriptRuleHandler.handleCSSScripts(cssScripts)
      .then(function () {
        return RQ.ScriptRuleHandler.handleJSLibraries(libraries);
      })
      .then(function () {
        return RQ.ScriptRuleHandler.handleJSScripts(jsScripts);
      })
      .then(resolve);
  });
};

RQ.ScriptRuleHandler.handleCSSScripts = function (cssScripts) {
  return new Promise(function (resolve) {
    cssScripts.forEach(RQ.ScriptRuleHandler.includeCSS);
    resolve();
  });
};

RQ.ScriptRuleHandler.handleJSLibraries = function (libraries) {
  return new Promise(function (resolve) {
    RQ.ScriptRuleHandler.addLibraries(libraries, resolve);
  });
};

RQ.ScriptRuleHandler.handleJSScripts = function (jsScripts) {
  return new Promise(function (resolve) {
    var prePageLoadScripts = [],
      postPageLoadScripts = [];

    jsScripts.forEach(function (script) {
      if (script.loadTime === RQ.SCRIPT_LOAD_TIME.BEFORE_PAGE_LOAD) {
        prePageLoadScripts.push(script);
      } else {
        postPageLoadScripts.push(script);
      }
    });

    RQ.ScriptRuleHandler.includeJSScriptsInOrder(
      prePageLoadScripts,
      function () {
        RQ.ClientUtils.onPageLoad().then(function () {
          RQ.ScriptRuleHandler.includeJSScriptsInOrder(
            postPageLoadScripts,
            resolve
          );
        });
      }
    );
  });
};

RQ.ScriptRuleHandler.addLibraries = function (libraries, callback, index) {
  index = index || 0;

  if (index >= libraries.length) {
    typeof callback === "function" && callback();
    return;
  }

  var libraryKey = libraries[index],
    library = RQ.SCRIPT_LIBRARIES[libraryKey],
    addNextLibraries = function () {
      RQ.ScriptRuleHandler.addLibraries(libraries, callback, index + 1);
    };

  if (library) {
    RQ.ClientUtils.addRemoteJS(library.src, addNextLibraries);
  } else {
    addNextLibraries();
  }
};

RQ.ScriptRuleHandler.includeJSScriptsInOrder = function (
  scripts,
  callback,
  index
) {
  index = index || 0;

  if (index >= scripts.length) {
    typeof callback === "function" && callback();
    return;
  }

  RQ.ScriptRuleHandler.includeJS(scripts[index], function () {
    RQ.ScriptRuleHandler.includeJSScriptsInOrder(scripts, callback, index + 1);
  });
};

RQ.ScriptRuleHandler.includeJS = function (script, callback) {
  if (script.type === RQ.SCRIPT_TYPES.URL) {
    RQ.ClientUtils.addRemoteJS(script.value, callback);
    return;
  }

  if (script.type === RQ.SCRIPT_TYPES.CODE) {
    RQ.ClientUtils.executeJS(script.value);
  }

  typeof callback === "function" && callback();
};

RQ.ScriptRuleHandler.includeCSS = function (script, callback) {
  if (script.type === RQ.SCRIPT_TYPES.URL) {
    RQ.ClientUtils.addRemoteCSS(script.value);
  } else if (script.type === RQ.SCRIPT_TYPES.CODE) {
    RQ.ClientUtils.embedCSS(script.value);
  }

  typeof callback === "function" && callback();
};

RQ.UserAgentRuleHandler = {};

RQ.UserAgentRuleHandler.setup = function () {
  const message = {
    action: RQ.CLIENT_MESSAGES.GET_USER_AGENT_RULE_PAIRS,
    url: window.location.href,
  };
  chrome.runtime.sendMessage(message, function (rulePairs) {
    if (rulePairs && rulePairs.constructor === Array && rulePairs.length > 0) {
      RQ.UserAgentRuleHandler.handleRulePairs(rulePairs);
    }
  });
};

RQ.UserAgentRuleHandler.handleRulePairs = function (rulePairs) {
  var finalUserAgentRulePair = rulePairs[rulePairs.length - 1], // only last user agent will finally be applied
    userAgent = finalUserAgentRulePair.userAgent,
    platform = RQ.UserAgentRuleHandler.getPlatformFromUserAgent(userAgent),
    vendor = RQ.UserAgentRuleHandler.getVendorFromUserAgent(userAgent);

  RQ.ClientUtils.executeJS(
    `Object.defineProperty(window.navigator, 'userAgent', { get: function() { return '${userAgent}'; } });`
  );
  RQ.ClientUtils.executeJS(
    `Object.defineProperty(window.navigator, 'vendor', { get: function() { return '${vendor}'; } });`
  );

  if (platform) {
    // override platform only if it could be derived from userAgent
    RQ.ClientUtils.executeJS(
      `Object.defineProperty(window.navigator, 'platform', { get: function() { return '${platform}'; } });`
    );
  }
};

RQ.UserAgentRuleHandler.getPlatformFromUserAgent = function (userAgent) {
  var PLATFORMS = {
    Macintosh: "MacIntel",
    Android: "Android",
    Linux: "Linux",
    iPhone: "iPhone",
    iPad: "iPad",
    Windows: "Win32",
  };

  for (var key in PLATFORMS) {
    if (userAgent.includes(key)) {
      return PLATFORMS[key];
    }
  }
};

RQ.UserAgentRuleHandler.getVendorFromUserAgent = function (userAgent) {
  var VENDORS = {
    iPhone: "Apple Computer, Inc.",
    iPad: "Apple Computer, Inc.",
    Chrome: "Google Inc.",
  };

  for (var key in VENDORS) {
    if (userAgent.includes(key)) {
      return VENDORS[key];
    }
  }

  return ""; // vendor is empty string for others
};

RQ.ResponseRuleHandler = {};

RQ.ResponseRuleHandler.setup = function () {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.action === RQ.CLIENT_MESSAGES.OVERRIDE_RESPONSE) {
      RQ.ResponseRuleHandler.handleOverrideResponseMessage(message);
      sendResponse();
      return true;
    }
  });

  window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source !== window || event.data.from !== "requestly") {
      return;
    }

    if (event.data.type === "response_rule_applied") {
      chrome.runtime.sendMessage({
        action: RQ.CLIENT_MESSAGES.NOTIFY_RULES_APPLIED,
        ruleIds: [event.data.id],
        modification: "modified response",
        ...event.data.requestDetails,
      });
    }
  });

  RQ.ClientUtils.executeJS(
    `(${this.interceptAJAXRequests.toString()})('${RQ.PUBLIC_NAMESPACE}')`
  );
};

RQ.ResponseRuleHandler.handleOverrideResponseMessage = function (message) {
  RQ.ClientUtils.executeJS(
    `window.${RQ.PUBLIC_NAMESPACE}.responseRules['${
      message.url
    }'] = ${JSON.stringify(message.rule)};`,
    true
  );

  // Set evaluator function in global scope when user selects code(or function)
  // We don't need this in case when user selects JSON response directly
  if (message.rule.response.type === "code") {
    RQ.ClientUtils.executeJS(
      `window.${RQ.PUBLIC_NAMESPACE}.responseRules['${message.url}'].evaluator = ${message.rule.response.value};`
    );
  }
};

/**
 * @param {*} namespace __REQUESTLY__
 * Do not refer other function/variables from this function.
 * This function will be injected in website and will run in different JS context.
 */

RQ.ResponseRuleHandler.interceptAJAXRequests = function (namespace) {
  window[namespace] = window[namespace] || {};
  window[namespace].responseRules = {};
  let isDebugMode = false;

  // Some frames are sandboxes and throw DOMException when accessing localStorage
  try {
    isDebugMode = window && window.localStorage && localStorage.isDebugMode;
  } catch (e) {}

  /**
   * ******************************** Within conext functions go here ********************************
   */
  const __get_key_to_check = (url) => {
    /**
     * In some cases, developers call APIs using relative path (e.g. Airbnb graphQL APIs directly hit /api/v3/..)
     * So It is not entirely sufficient to just match with the url obtained from fetch resouce, so append the origin with relative URLs
     * We always have absolute URL as key in the key-value pair of ${namespace}.responseRules object
     */
    let keyToCheck = url;
    if (url && url.startsWith("/")) {
      keyToCheck = window.origin + url;
    }
    return keyToCheck;
  };

  const isApplicableOnUrl = (url) => {
    return window[namespace].responseRules.hasOwnProperty(
      __get_key_to_check(url)
    );
  };

  /**
   * @param {Object} json
   * @param {String} path -> "a", "a.b", "a.0.b (If a is an array containing list of objects"
   * Also copied in shared/utils.js for the sake of testing
   */
  const traverseJsonByPath = (jsonObject, path) => {
    if (!path) return;

    const pathParts = path.split(".");

    try {
      // Reach the last node but not the leaf node.
      for (i = 0; i < pathParts.length - 1; i++) {
        jsonObject = jsonObject[pathParts[i]];
      }

      return jsonObject[pathParts[pathParts.length - 1]];
    } catch (e) {
      /* Do nothing */
    }
  };

  /**
   * We can add UTs for this but doesn't make sense to copy this to Utils
   * So skipping for now
   */
  const isRequestPayloadFilterApplicable = (requestData, sourceFilters) => {
    // if (JSON.stringify(requestPayloadFilter).indexOf('q') >= 0) {
    //   debugger;
    // }
    const sourceFiltersArray = Array.isArray(sourceFilters)
      ? sourceFilters
      : [sourceFilters];

    return (
      !sourceFiltersArray.length ||
      sourceFiltersArray.some((sourceFilter) => {
        let requestPayloadFilter = sourceFilter?.requestPayload;

        if (!requestPayloadFilter) return true;
        if (
          typeof requestPayloadFilter === "object" &&
          Object.keys(requestPayloadFilter).length === 0
        )
          return true;

        // We only allow request payload targeting when requestData is JSON
        if (!requestData || typeof requestData !== "object") return false;
        if (Object.keys(requestData).length === 0) return false;

        requestPayloadFilter = requestPayloadFilter || {};
        const targettedKey = requestPayloadFilter?.key;

        // tagettedKey is the json path e.g. a.b.0.c
        if (targettedKey) {
          const valueInRequestData = traverseJsonByPath(
            requestData,
            targettedKey
          );
          return valueInRequestData == requestPayloadFilter?.value;
        }

        return false;
      })
    );
  };

  const getResponseRule = (url) => {
    return window[namespace].responseRules[__get_key_to_check(url)];
  };

  /**
   * @param A string which might be JSON String or normal String
   * This code is also copied in components/browser-extension/src/Shared/utils.js so that we can write UTs for this
   * Not copied to common/components/utils.js for now
   */
  const jsonifyValidJSONString = (mightBeJSONString) => {
    if (typeof mightBeJSONString !== "string") return mightBeJSONString;

    try {
      return JSON.parse(mightBeJSONString);
    } catch (e) {
      /* Do Nothing. Unable to parse the param value */
    }

    return mightBeJSONString;
  };

  /**
   * @param  url
   * Does not handle duplicate query params for now
   * This code is also copied in components/browser-extension/src/Shared/utils.js so that we can write UTs for this
   * Not copied to common/components/utils.js for now
   */
  const convertSearchParamsToJSON = (url) => {
    const result = {};

    if (!url || url === "?" || url.indexOf("?") === -1) {
      return result;
    }

    // https://stackoverflow.com/a/50147341/816213
    // (URL decoding is already handled in URLSearchParams)
    const searchParamsString = url.split("?")[1];
    const paramsObject = Object.fromEntries(
      new URLSearchParams(searchParamsString)
    );

    // Traverse paramsObject to convert JSON strings into JSON object
    for (paramName in paramsObject) {
      const paramValue = paramsObject[paramName];
      paramsObject[paramName] = jsonifyValidJSONString(paramValue);
    }

    return paramsObject;
  };

  const notifyRuleApplied = (message) => {
    window.postMessage(
      {
        from: "requestly",
        type: "response_rule_applied",
        id: message.ruleDetails.id,
        requestDetails: message["requestDetails"],
      },
      window.location.href
    );
  };

  const isPromise = (obj) =>
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function";

  /**
   * ********** Within Context Functions end here *************
   */
  // Intercept XMLHttpRequest
  const onReadyStateChange = async function () {
    if (this.readyState === 4 && isApplicableOnUrl(this.responseURL)) {
      const responseRuleData = getResponseRule(this.responseURL);
      const { response: responseModification, source } = responseRuleData;
      const responseType = this.responseType;

      isDebugMode &&
        console.log("RQ", "Inside the XHR onReadyStateChange block for url", {
          url: this.responseURL,
          xhr: this,
        });

      // If requestPayloadTargeting is defined and doesn't match then don't override the response getter
      if (
        !isRequestPayloadFilterApplicable(
          jsonifyValidJSONString(this.requestData),
          source?.filters
        )
      ) {
        return;
      }

      let customResponse =
        responseModification.type === "code"
          ? responseRuleData.evaluator({
              method: this.method,
              url: this.responseURL,
              requestHeaders: this.requestHeaders,
              requestData: jsonifyValidJSONString(this.requestData),
              responseType: this.responseType,
              response: this.response,
              responseJSON: jsonifyValidJSONString(this.response),
            })
          : responseModification.value;

      // Convert customResponse back to rawText
      // response.value is String and evaluator method might return string/object
      if (isPromise(customResponse)) {
        customResponse = await customResponse;
      }
      if (typeof customResponse === "object" && responseType === "json") {
        customResponse = JSON.stringify(customResponse);
      }

      Object.defineProperty(this, "response", {
        get: function () {
          if (
            responseModification.type === "static" &&
            responseType === "json"
          ) {
            if (typeof customResponse === "object") {
              return customResponse;
            }

            return jsonifyValidJSONString(customResponse);
          }

          return customResponse;
        },
      });

      if (responseType === "" || responseType === "text") {
        Object.defineProperty(this, "responseText", {
          get: function () {
            return customResponse;
          },
        });
      }

      const requestDetails = {
        url: this.responseURL,
        method: this.method,
        type: "xmlhttprequest",
        timeStamp: Date.now(),
      };

      notifyRuleApplied({ ruleDetails: responseRuleData, requestDetails });
    }
  };

  const XHR = XMLHttpRequest;
  XMLHttpRequest = function () {
    const xhr = new XHR();
    xhr.addEventListener(
      "readystatechange",
      onReadyStateChange.bind(xhr),
      false
    );
    return xhr;
  };
  XMLHttpRequest.prototype = XHR.prototype;
  Object.entries(XHR).map(([key, val]) => {
    XMLHttpRequest[key] = val;
  });

  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method) {
    this.method = method;
    open.apply(this, arguments);
  };

  const send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (data) {
    this.requestData = data;
    send.apply(this, arguments);
  };

  let setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
    this.requestHeaders = this.requestHeaders || {};
    this.requestHeaders[header] = value;
    setRequestHeader.apply(this, arguments);
  };

  // Intercept fetch API
  const _fetch = fetch;
  fetch = async (resource, initOptions = {}) => {
    const getOriginalResponse = () => _fetch(resource, initOptions);

    let request;

    if (resource instanceof Request) {
      request = resource.clone();
    } else {
      request = new Request(resource.toString(), initOptions);
    }

    const fetchedResponse = await getOriginalResponse();
    const url = fetchedResponse.url; // final URL obtained after any redirects

    if (!isApplicableOnUrl(url) || fetchedResponse.status === 204) {
      // Return the same response when status is 204. fetch doesn't allow to create new response with empty body
      return fetchedResponse;
    }

    isDebugMode &&
      console.log("RQ", "Inside the fetch block for url", {
        url,
        resource,
        initOptions,
        fetchedResponse,
      });

    const method = request.method;
    const requestHeaders =
      request.headers &&
      Array.from(request.headers).reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {});

    let requestData;

    if (method === "POST") {
      requestData = jsonifyValidJSONString(await request.text());
    } else {
      requestData = convertSearchParamsToJSON(url);
    }

    const responseRuleData = getResponseRule(url);

    if (
      !isRequestPayloadFilterApplicable(
        requestData,
        responseRuleData.source?.filters
      )
    ) {
      return fetchedResponse;
    }

    const fetchedResponseData = await fetchedResponse.text();
    const responseType = fetchedResponse.headers.get("content-type");
    const isResponseJSON =
      responseType && responseType.indexOf("application/json") !== -1;
    const fetchedResponseDataAsJson = jsonifyValidJSONString(
      fetchedResponseData
    );

    let customResponse =
      responseRuleData.response.type === "code"
        ? responseRuleData.evaluator({
            method,
            url,
            requestHeaders,
            requestData,
            responseType,
            response: fetchedResponseData,
            responseJSON: fetchedResponseDataAsJson,
          })
        : responseRuleData.response.value;

    const requestDetails = {
      url,
      method,
      type: "fetch",
      timeStamp: Date.now(),
    };

    notifyRuleApplied({ ruleDetails: responseRuleData, requestDetails });

    // evaluator might return us Object but response.value is string
    // So make the response consistent by converting to JSON String and then create the Response object
    if (isPromise(customResponse)) {
      customResponse = await customResponse;
    }
    if (typeof customResponse === "object" && isResponseJSON) {
      customResponse = JSON.stringify(customResponse);
    }

    return new Response(new Blob([customResponse]), {
      status: fetchedResponse.status,
      statusText: fetchedResponse.statusText,
      headers: fetchedResponse.headers,
    });
  };
};

RQ.ConsoleLogger = {
  loggingStarted: false,
};

RQ.ConsoleLogger.setup = () => {
  window.addEventListener("message", function (event) {
    if (
      event.source !== window ||
      event.data.source !== "requestly:consoleLogger"
    ) {
      return;
    }

    if (event.data.action === "showInitialMessage") {
      RQ.ConsoleLogger.showInitialMessage(
        event.data.payload?.isConsoleLoggerEnabled
      );
    }
  });

  chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === RQ.PRINT_CONSOLE_LOGS) {
      RQ.ConsoleLogger.handleMessage(message);
    }
  });
};

RQ.ConsoleLogger.showInitialMessage = (isConsoleLoggerEnabled) => {
  if (RQ.ConsoleLogger.loggingStarted) {
    return;
  }

  if (isConsoleLoggerEnabled) {
    RQ.ConsoleLogger.log(
      `Applied rules will be logged in console. You may disable the feature from: ${RQ.ConsoleLogger.getSettingsUrl()}`
    );
  } else {
    RQ.ConsoleLogger.log(
      `Applied some rules on this page. You may enable logging in console from: ${RQ.ConsoleLogger.getSettingsUrl()}`
    );
  }

  RQ.ConsoleLogger.loggingStarted = true;
};

RQ.ConsoleLogger.handleMessage = (message) => {
  if (!RQ.ConsoleLogger.loggingStarted) {
    if (window === window.top) {
      RQ.ConsoleLogger.showInitialMessage(message.isConsoleLoggerEnabled);
    } else {
      window.top.postMessage(
        {
          source: "requestly:consoleLogger",
          action: "showInitialMessage",
          payload: { isConsoleLoggerEnabled: message.isConsoleLoggerEnabled },
        },
        "*"
      );
      RQ.ConsoleLogger.loggingStarted = true;
    }
  }

  if (message.isConsoleLoggerEnabled) {
    RQ.ConsoleLogger.log(
      `Applied rule %c${message.rule.name}%c on request URL: ${message.requestDetails.url}`,
      "color: green; font-weight: bold; font-style: italic",
      null,
      RQ.ConsoleLogger.buildRequestDetailsObject(message.requestDetails)
    );
  }
};

RQ.ConsoleLogger.log = (text, ...args) => {
  console.log(
    `%cRequestly%c ${text}`,
    "color:#1990ff; font-weight: bold; padding: 1px 5px; background-color: #fad408; border-radius: 4px; border: 1px solid #888;",
    null,
    ...args
  );
};

RQ.ConsoleLogger.buildRequestDetailsObject = (requestDetails) => {
  const requestDetailsObject = {
    method: requestDetails.method,
    timestamp: new Date(requestDetails.timeStamp).toLocaleString(),
  };

  if (requestDetails.type) {
    requestDetailsObject["type"] = requestDetails.type;
  }

  return requestDetailsObject;
};

RQ.ConsoleLogger.getSettingsUrl = () => {
  return RQ.configs.WEB_URL + "/settings";
};

RQ.ConsoleLogger.getRuleEditorUrl = (ruleId) => {
  return RQ.RULES_PAGE_URL + "#edit/" + ruleId;
};

RQ.SessionRecorder = {
  isRecording: false,
  sendResponseCallbacks: {},
};

RQ.SessionRecorder.setup = () => {
  chrome.runtime.sendMessage(
    {
      action: RQ.CLIENT_MESSAGES.GET_SESSION_RECORDING_CONFIG,
    },
    (sessionRecordingConfig) => {
      if (sessionRecordingConfig) {
        const isIFrame = RQ.SessionRecorder.isIframe();

        if (!isIFrame) {
          RQ.SessionRecorder.addListeners();
        }

        RQ.ClientUtils.addRemoteJS(
          chrome.runtime.getURL("libs/requestly-web-sdk.js"),
          () => {
            RQ.ClientUtils.executeJS(
              `(${RQ.SessionRecorder.bootstrapClient.toString()})('${
                RQ.PUBLIC_NAMESPACE
              }')`
            );
            RQ.SessionRecorder.sendMessageToClient("startRecording", {
              relayEventsToTop: isIFrame,
              console: true,
              network: true,
              maxDuration:
                (sessionRecordingConfig.maxDuration || 5) * 60 * 1000, // minutes -> milliseconds
            });
          }
        );
      }
    }
  );
};

RQ.SessionRecorder.isIframe = () => {
  return window.top !== window;
};

RQ.SessionRecorder.addListeners = () => {
  chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    switch (message.action) {
      case RQ.CLIENT_MESSAGES.IS_RECORDING_SESSION:
        sendResponse(RQ.SessionRecorder.isRecording);
        break;

      case RQ.CLIENT_MESSAGES.GET_TAB_SESSION:
        if (RQ.SessionRecorder.isRecording) {
          RQ.SessionRecorder.sendMessageToClient(
            "getSessionData",
            null,
            sendResponse
          );
        }
        return true; // notify sender to wait for response and not resolve request immediately
    }
  });

  window.addEventListener("message", function (event) {
    if (event.source !== window || event.data.source !== "requestly:client") {
      return;
    }

    if (event.data.response) {
      RQ.SessionRecorder.sendResponseToRuntime(
        event.data.action,
        event.data.payload
      );
    } else if (event.data.action === "sessionRecordingStarted") {
      RQ.SessionRecorder.isRecording = true;
      chrome.runtime.sendMessage({
        action: RQ.CLIENT_MESSAGES.NOTIFY_SESSION_RECORDING_STARTED,
      });
    }
  });
};

RQ.SessionRecorder.sendResponseToRuntime = (action, payload) => {
  RQ.SessionRecorder.sendResponseCallbacks[action]?.(payload);
  delete RQ.SessionRecorder.sendResponseCallbacks[action];
};

RQ.SessionRecorder.sendMessageToClient = (
  action,
  payload,
  sendResponseCallback
) => {
  window.postMessage(
    { source: "requestly:extension", action, payload },
    window.location.href
  );
  if (sendResponseCallback) {
    RQ.SessionRecorder.sendResponseCallbacks[action] = sendResponseCallback;
  }
};

/**
 * Do not refer other function/variables from this function.
 * This function will be injected in website and will run in a different JS context.
 */
RQ.SessionRecorder.bootstrapClient = (namespace) => {
  window[namespace] = window[namespace] || {};

  const sendMessageToExtension = (action, payload) => {
    window.postMessage(
      { source: "requestly:client", action, payload },
      window.location.href
    );
  };

  const sendResponseToExtension = (action, payload) => {
    window.postMessage(
      { source: "requestly:client", response: true, action, payload },
      window.location.href
    );
  };

  window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (
      event.source !== window ||
      event.data.source !== "requestly:extension"
    ) {
      return;
    }

    if (event.data.action === "startRecording") {
      window[namespace].sessionRecorder = new Requestly.SessionRecorder(
        event.data.payload
      );
      window[namespace].sessionRecorder.start();
      sendMessageToExtension("sessionRecordingStarted");
    } else if (event.data.action === "getSessionData") {
      sendResponseToExtension(
        event.data.action,
        window[namespace].sessionRecorder.getSession()
      );
    }
  });
};

(function () {
  if (!RQ.ClientUtils.isHTMLDocument()) {
    return;
  }
  RQ.ConsoleLogger.setup();

  RQ.ScriptRuleHandler.setup();
  RQ.UserAgentRuleHandler.setup();
  RQ.SessionRecorder.setup();

  // https://github.com/requestly/requestly-master/issues/469
  const message = {
    action: RQ.CLIENT_MESSAGES.DO_SETUP_RESPONSE_RULE_HANDLER,
  };
  chrome.runtime.sendMessage(message, function (doSetupResponseRuleHandler) {
    if (doSetupResponseRuleHandler) {
      RQ.ResponseRuleHandler.setup();
    }
  });
})();
