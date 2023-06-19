#!/usr/bin/env bash
sassc -t compressed style.scss ../css/style.css
fswatch -o style.scss | xargs -n1 -I{} sassc -t compressed style.scss ../css/style.css

