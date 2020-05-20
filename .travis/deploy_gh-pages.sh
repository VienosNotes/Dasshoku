#!/bin/bash

set -e

if [[ "${TRAVIS_OS_NAME}" == "linux" && "${TRAVIS_BRANCH}" == "master" && "${TRAVIS_PULL_REQUEST}" == "false" ]]; then
  echo -e "Host github.com\n\tStrictHostKeyChecking no\nIdentityFile ~/.ssh/deploy.key\n" >> ~/.ssh/config
  openssl aes-256-cbc -pass "pass:$SERVER_KEY" -pbkdf2 -in ./.travis/deploy_key.enc -d -a -out deploy.key
  cp deploy.key ~/.ssh/
  chmod 600 ~/.ssh/deploy.key
  git config --global user.email "vienosnotes@gmail.com"
  git config --global user.name "VienosNotes"
  git fetch origin gh-pages:gh-pages
  sudo git stash -u
  sudo git checkout gh-pages
  sudo git stash pop
  sudo git add .
  sudo git commit -a -m "auto commit on travis $TRAVIS_JOB_NUMBER $TRAVIS_COMMIT"
  git push git@github.com:VienosNotes/Dasshoku.git gh-pages:gh-pages
fi

