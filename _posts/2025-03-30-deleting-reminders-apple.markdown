---
layout: post
title: "Batch completing all reminders on OSX"
date: 2025-03-30 18:43:00 +1100
categories: apple, osx
tags: reminders, osx, apple script, batch delete, automation
description: "How to mark all reminders as complete on OSX using an AppleScript."

---

## Why is it so hard

I looked at my reminders app today, which had about 650 reminders marked as uncomplete. It only became this bad as instead of marking reminders as complete when they popped up on my phone, I just swiped them away (thinking it effectively did the same thing). Eventually I discovered that they in fact weren't completed, and there didn't seem to be a way to set them all as complete en-masse. So, looking at my 650 reminders and knowing this, I was about to just sweep them under the rug again. Then in a moment of clarity, I decided I should actually do something about it. Here's a little AppleScript you can use to mark all reminders complete in one fell swoop.

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