---
layout: post
title: "Batch deleting all reminders on OSX"
date: 2025-03-30 18:43:00 +1100
categories: apple, osx
tags: reminders, osx, apple script, batch delete, automation
description: "How to mark all reminders as complete on OSX using an AppleScript."

---

## Why is it so hard

I looked at my reminders app today, which had about 650 reminders marked as uncomplete, and knowing there was no way in the app to mark them all complete en-masse, I was about to sweep them under the rug again. Then in a moment of clarity, I decided I should do something about it. So here's a little AppleScript you can use to mark all reminders complete in one fell swoop.

## The script

Let's make a file called complete_reminders.scpt.

``` 
#!/usr/bin/osascript

tell application "Reminders"
    repeat with aList in lists
        set theReminders to (every reminder in aList whose completed is false)
        repeat with aReminder in theReminders
            set completed of aReminder to true
        end repeat
    end repeat
end tell
```

Now just make it executable and run! It was surprisingly slow to run, but it will get there eventually.

``` 
chmod +x complete_reminders.scpt
./complete_reminders.scpt
```
Enjoy!

---