all: sidebar.html # apps

.PHONY: sidebar.html api/core

APPSMD = quickstart/apps.md
TMP = /tmp/.tmp.mos.yml
apps:
	curl -s https://api.github.com/orgs/mongoose-os-apps/repos?per_page=200 |\
		perl -nle 'print $$1 if /"full_name": "(.*)"/' > /tmp/repos.txt
	echo '# Example apps' > $(APPSMD)
	echo '|  GitHub repo  | Description | Author |' >> $(APPSMD)
	echo '|  ----  | ----------- | --- |' >> $(APPSMD)
	sort /tmp/repos.txt | while read REPO ; do \
		curl -s https://raw.githubusercontent.com/$$REPO/master/mos.yml > $(TMP); \
		echo $$REPO ; \
		echo "| [$${REPO#*/}](https://github.com/$$REPO) | $$(cat $(TMP) | perl -nle 'print $$1 if /^description: (.*)/') | $$(cat $(TMP) | perl -nle 'print $$1 if /^author: (.*)/') | " >> $(APPSMD) ;\
		done

INC ?= ../cesanta.com/fw/include
api/core:
	@rm -rf $@
	@mkdir -p $@
	@touch $@/index.md
	@(cd $(INC) && ls *.h) | while read F; do node tools/genapi.js $(INC)/$$F $@/$$F.md >> $@/index.md; done

sidebar.html: api/core
	node tools/gensidebar.js > $@
