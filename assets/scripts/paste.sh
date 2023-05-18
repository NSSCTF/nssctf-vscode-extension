#!/bin/sh

# require xclip(see http://stackoverflow.com/questions/592620/check-if-a-program-exists-from-a-bash-script/677212#677212)
command -v xclip >/dev/null 2>&1 || {
	echo >&1 "no xclip"
	exit 1
}

# write image in clipboard to file (see http://unix.stackexchange.com/questions/145131/copy-image-from-clipboard-to-file)
xclip -selection clipboard -target image/png -o >$1
if [ $? -eq 0 ]; then
	echo $1
else
	content=$(xclip -selection c -o)
	echo $content
fi