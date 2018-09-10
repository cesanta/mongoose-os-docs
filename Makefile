all: sidebar.html # apps

.PHONY: sidebar.html

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


userguide/api.md:
	curl -s https://api.github.com/orgs/mongoose-os-libs/repos?per_page=200 |\
		perl -nle 'print $$1 if /"full_name": "(.*)"/' > /tmp/repos.txt
	echo '# API Reference' > $@
	echo '|  Repo  | Description | Author |' >> $@
	echo '|  ----  | ----------- | --- |' >> $@
	sort /tmp/repos.txt | while read REPO ; do \
		curl -s https://raw.githubusercontent.com/$$REPO/master/mos.yml > $(TMP); \
		echo $$REPO ; \
		echo "| [$${REPO#*/}](https://github.com/$$REPO) | $$(cat $(TMP) | perl -nle 'print $$1 if /^description: (.*)/') | $$(cat $(TMP) | perl -nle 'print $$1 if /^author: (.*)/') | " >> $@ ;\
		done

# process = echo '<div class="tree-toggler"><i class="fa fa-caret-down"></i>&nbsp;$(1)</div>'
define gensidebar
	perl -nle 'print "<div class=\"tree-toggler\"><i class=\"fa fa-caret-down\"></i>&nbsp;$$1</div>" if /\[(.+?)\]\((.+?)\)/' $2/index.md
endef

sidebar.html:
	node gensidebar.js > $@
