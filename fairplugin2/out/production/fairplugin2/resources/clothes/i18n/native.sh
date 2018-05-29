#!/bin/sh
native2ascii -encoding GB2312 Language-ext_zh_CN.properties.native Language-ext_zh_CN.properties
native2ascii -encoding GB2312 message_zh_CN.properties.native message_zh_CN.properties
native2ascii -encoding GB2312 /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_portalcontrol_zh_CN.native.js /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_portalcontrol_zh_CN.js
native2ascii -encoding GB2312 /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_portletcontrol_zh_CN.native.js /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_portletcontrol_zh_CN.js
native2ascii -encoding GB2312 /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_objcontrol_zh_CN.native.js /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_objcontrol_zh_CN.js
native2ascii -encoding GB2312 /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_ahca_zh_CN.native.js /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_ahca_zh_CN.js
native2ascii -encoding GB2312 /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_optioncontrol_zh_CN.native.js /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_optioncontrol_zh_CN.js
native2ascii -encoding GB2312 /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_object_query_zh_CN.native.js /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_object_query_zh_CN.js
native2ascii -encoding GB2312 /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_querydef_zh_CN.native.js /opt/portal5/jboss/server/default/deploy/ROOT.war/nea/core/js/init_querydef_zh_CN.js
