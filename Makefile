STASH_MESSAGE="Build process"


switch:
ifneq "$(shell git --no-pager diff --name-only)" ""
	# Stash uncommitted changes
	git stash save ${STASH_MESSAGE}
endif
	git checkout gh-pages


backwards:
	git checkout -
ifneq "$(shell git stash list | grep -i ${STASH_MESSAGE})" ""
	git stash pop
endif
	git stash list
