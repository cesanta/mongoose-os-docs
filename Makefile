API = mongoose-os/api
CATEGORIES ?= core cloud net drivers arduino rpc misc
DEV ?= ../cesanta.com
INC ?= ../mongoose-os/include
HTMLDIR ?= ../websites/front/docs

.PHONY: sidebar.html $(API)/core $(API)


all: sync sidebar.html # apps

LIBREPOS ?= https://api.github.com/orgs/mongoose-os-libs/repos
list.txt:
	P=0; rm -rf /tmp/xx ; while true; do \
		curl -s "$(LIBREPOS)?page=$$P" | perl -nle 'print $$1 if /"full_name": "(.*)"/' > /tmp/x ; \
		test -s /tmp/x || break; echo "got page $$P"; cat /tmp/x >> /tmp/xx ; P=$$(($$P+1)); done ; \
		cat /tmp/xx | sort > $@

sync: list.txt
	@for REPO in $$(cat list.txt) ; do test -d $$REPO && (cd $$REPO && git pull) || (mkdir -p $$(dirname $$REPO) ; cd $$(dirname $$REPO); git clone git@github.com:$$REPO.git); done

clean-generated:
	@for C in $(CATEGORIES) ; do rm -rf $(API)/$$C; mkdir $(API)/$$C; touch $(API)/$$C/index.md ; done


$(API)/core: clean-generated
	@echo '[]' > symbols.json
	@(cd $(INC) && ls *.h) | while read F; do node tools/genapi.js $@/$$F.md cesanta/mongoose-os $(INC)/$$F >> $@/index.md; done
	@node tools/genapi.js $@/frozen.h.md cesanta/frozen $(DEV)/frozen/frozen.h >> $@/index.md
	@node tools/genapi.js $@/cs_dbg.h.md cesanta/mongoose-os $(DEV)/common/cs_dbg.h >> $@/index.md
	@node tools/genapi.js $@/mbuf.h.md cesanta/mongoose-os $(DEV)/common/mbuf.h >> $@/index.md
	@node tools/genapi.js $@/mg_str.h.md cesanta/mongoose-os $(DEV)/common/mg_str.h >> $@/index.md

$(API):
	@for REPO in mongoose-os-libs/* ; do \
		echo $$REPO; BR=$$(basename $$REPO); R=$$REPO; \
		CATEGORY=$$(perl -ne 'print $$1 if /docs:(.+?):(.+?)/' $$R/mos.yml); \
		test -z "$$CATEGORY" && CATEGORY=misc && echo "  github.com/$$REPO is missing docs:tag!"; \
		TITLE=$$(perl -ne 'print $$2 if /docs:(.+?):(.+?)\s*$$/' $$R/mos.yml); \
		test -z "$$TITLE" && TITLE=$$BR; \
		test -d $@/$$CATEGORY/index.md || mkdir -p $@/$$CATEGORY ; touch $@/$$CATEGORY/index.md; \
		node tools/genapi.js $@/$$CATEGORY/$$BR.md $$REPO \
			"$$(ls $$R/include/*.h 2>/dev/null | head -1)" \
			"$$(ls $$R/mjs_fs/*.js 2>/dev/null | head -1)" \
			"$$TITLE" "$$R/README.md" >> $@/$$CATEGORY/index.md; \
	done


sidebar.html: $(API)/core $(API)
	@for C in $(CATEGORIES) ; do sort -o $(API)/$$C/index.md $(API)/$$C/index.md ; done
	@node tools/gensidebar.js > $@


html:
	rm -rf $(HTMLDIR)/*
	@node tools/genhtml.js "$(HTMLDIR)" $$(find . -name \*.md)
	cp sidebar.html $(HTMLDIR)/
