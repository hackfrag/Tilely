SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DOCS_DIR = ${PREFIX}/docs
TEST_DIR = ${PREFIX}/tests
DIST_DIR = ${PREFIX}/dist

TILED = ${DIST_DIR}/tiled.js

FILES = ${SRC_DIR}/external/* \
		${SRC_DIR}/library/

all: tiled

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

tiled: ${DIST_DIR} ${TILED}

${TILED}: ${FILED}
	@@echo "Building" ${JQ}

	@@mkdir -p ${DIST_DIR}
	@@echo "" > ${TILED}
	@@find src/external/ -name '*.js' -exec cat {} \; > dist/tiled.js
	@@find src/library/ -name '*.js' -exec cat {} \; >> dist/tiled.js
	@@find src/application/models -name '*.js' -exec cat {} \; >> dist/tiled.js
	@@find src/application/views -name '*.js' -exec cat {} \; >> dist/tiled.js
	@@find src/application/controllers -name '*.js' -exec cat {} \; >> dist/tiled.js
	@@cat src/application/Bootstrap.js >> dist/tiled.js
	@@sed 's/jQuery.require\(.*\);//g' dist/tiled.js > dist/tiled_replaced.js
	@@rm dist/tiled.js
	@@mv dist/tiled_replaced.js dist/tiled.js
	@@echo ${TILED} "Built"
	@@echo


clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}