#!/bin/sh

################################################################################
# Commands executed in this script are for user 'node', i.e., the user as which
# VS Code connects to the dev container. When this script is executed, the dev
# container is already running and all volumes are mounted.
# [Manfred, 22aug 2022]


################################################################################
# Set get pull mode to rebase. Do the same for branches that may exist. However
# this is a repo designed for trunk-based development, so there shouldn't be any
# branches other than 'main' [Manfred, 22aug2022]
# For more details, see https://stackoverflow.com/a/13974638/411428
git config pull.rebase true
git config branch.autosetuprebase always
