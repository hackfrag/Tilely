SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DOCS_DIR = ${PREFIX}/docs
TEST_DIR = ${PREFIX}/tests
DIST_DIR = ${PREFIX}/dist

TILELY = ${DIST_DIR}/tilely.js

FILES = ${SRC_DIR}/external/* \
		${SRC_DIR}/library/

all: tilely

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

tilely: ${DIST_DIR} ${TILELY}

${TILELY}: ${FILED}
	@@echo "Building" ${JQ}

	@@mkdir -p ${DIST_DIR}
	@@echo "" > ${TILELY}
	@@find src/external/ -name '*.js' -exec cat {} \; > dist/tilely.js
	@@find src/library/ -name '*.js' -exec cat {} \; >> dist/tilely.js
	@@find src/application/models -name '*.js' -exec cat {} \; >> dist/tilely.js
	@@find src/application/views -name '*.js' -exec cat {} \; >> dist/tilely.js
	@@find src/application/controllers -name '*.js' -exec cat {} \; >> dist/tilely.js
	@@cat src/application/Bootstrap.js >> dist/tilely.js
	@@sed 's/jQuery.require\(.*\);//g' dist/tilely.js > dist/tilely_replaced.js
	@@rm dist/tilely.js
	@@mv dist/tilely_replaced.js dist/tilely.js
	@@echo ${TILELY} "Built"
	@@echo


clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}