#!/bin/sh

/Library/Application\ Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper \
-windowType fs \
-title "This is the title" \
-heading "This is the heading" \
-description "Completing Step 1 of 4" \
-icon /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/com.apple.cinema-display.icns &

sleep 2

/Library/Application\ Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper \
-windowType fs \
-title "This is the title" \
-heading "This is the heading" \
-description "Completing Step 2 of 4" \
-icon /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/com.apple.cinema-display.icns &

sleep 2

/Library/Application\ Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper \
-windowType fs \
-title "This is the title" \
-heading "This is the heading" \
-description "Completing Step 3 of 4" \
-icon /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/com.apple.cinema-display.icns &

sleep 2

/Library/Application\ Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper \
-windowType fs \
-title "This is the title" \
-heading "This is the heading" \
-description "Completing Step 4 of 4" \
-icon /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/com.apple.cinema-display.icns &

sleep 2

/Library/Application\ Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper \
-windowType fs \
-title "This is the title" \
-heading "This is the heading" \
-description "Setup is complete." \
-icon /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/com.apple.cinema-display.icns &

sleep 2

exit 0
