#!/usr/bin/env bash
sassc -t expanded style.scss ../css/style.css
fswatch -o style.scss | xargs -n1 -I{} sassc -t expanded style.scss ../css/style.css

