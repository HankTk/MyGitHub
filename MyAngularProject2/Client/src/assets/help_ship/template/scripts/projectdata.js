// Publish project specific data
(function() {
rh = window.rh;
model = rh.model;

rh.consts('DEFAULT_TOPIC', encodeURI("#Overview.htm".substring(1)));
rh.consts('START_FILEPATH', encodeURI('index.htm'));
rh.consts('HELP_ID', '86F197FB-55E9-4334-9644-A310E024EDEF' || 'preview');
rh.consts('LNG_STOP_WORDS', ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "after", "all", "along", "already", "also", "am", "among", "an", "and", "another", "any", "are", "at", "be", "because", "been", "between", "but", "by", "can", "do", "does", "doesn", "done", "each", "either", "for", "from", "get", "has", "have", "here", "how", "i", "if", "in", "into", "is", "isn", "it", "like", "may", "maybe", "more", "must", "need", "non", "not", "of", "ok", "okay", "on", "or", "other", "rather", "re", "s", "same", "see", "so", "some", "such", "t", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "those", "to", "too", "unless", "use", "used", "using", "ve", "want", "was", "way", "were", "what", "when", "when", "whenever", "where", "whether", "which", "will", "with", "within", "without", "yet", "you", "your"]);
rh.consts('LNG_SUBSTR_SEARCH', 0);

model.publish(rh.consts('KEY_DIR'), "ltr");
model.publish(rh.consts('KEY_LNG'), {"SearchResultsPerScreen":"Search results per page","Reset":"Reset","SyncToc":"SyncToc","HomeButton":"Home","WebSearchButton":"WebSearch","GlossaryFilterTerms":"Filter Terms","HighlightSearchResults":"Highlight Search Results","ApplyTip":"Apply","WebSearch":"WebSearch","Show":"Show","ShowAll":"All","EnableAndSearch":"Display results with all search words","Next":"Next","PreviousLabel":"Previous","NoScriptErrorMsg":"Enable JavaScript support in the browser to view this page.","Print":"Print","Contents":"Contents","Search":"-Search-","Hide":"Hide","Canceled":"Canceled","ShowHide":"Show/Hide","Loading":"Loading...","EndOfResults":"End of search results.","Logo":"Logo","ContentFilterChanged":"Content filter is changed, search again","SidebarToggleTip":"Expand/Collapse","Logo/Author":"Powered By","JS_alert_LoadXmlFailed":"Failed to load XML file","Searching":"Searching...","SearchTitle":"Search","Disabled Next":">>","JS_alert_InitDatabaseFailed":"Failed to initialize database","Cancel":"Cancel","UnknownError":"Unknown error","ResultsFoundText":"%1 result(s) found for %2","Index":"Index","Seperate":"|","SearchPageTitle":"Search Results","TopicsNotFound":"No results found","Glossary":"Glossary","Filter":"Filter","NextLabel":"Next","TableOfContents":"Table of Contents","HideAll":"Hide All","Disabled Prev":"<<","SearchOptions":"Search Options","Back":"Back","Prev":"Previous","OpenLinkInNewTab":"Open in new tab","JS_alert_InvalidExpression_1":"The search string you typed is not valid.","IndexFilterKewords":"Filter Keywords","IeCompatibilityErrorMsg":"This page cannot be viewed in Internet Explorer 8 or earlier version.","NavTip":"Menu","ToTopTip":"Go to top"});
})();