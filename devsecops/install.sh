#!/bin/bash

platform='unknown'
uname=`uname -s`
detect_copilot=`which copilot`
if [[ "$uname" == 'Linux' ]]; then
   platform='linux'
elif [[ "$uname" == 'Darwin' ]]; then
   platform='darwin'
fi

if [[ -z '$detect_copilot' ]]; then
    sudo curl -Lo /usr/local/bin/copilot https://github.com/aws/copilot-cli/releases/download/v0.1.0/copilot-${platform}-v0.1.0 # run sudo or root
    sudo chmod +x /usr/local/bin/copilot
fi

