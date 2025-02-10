# Linkedin Filter

I find a lot of really interesting working opportunities on LinkedIn, but these are interspersed between humble brags about (non) achievements, uninformed political takes, so on and so forth.

It's gotten to the point where I figured it's worth my time to build a LinkedIn Filter extension for this purpose.

Built using about half a day's worth of LLM prompts

## Usage:
1. Clone the repository locally, or just download all the files into a folder
2. Load the repo/folder as an unpacked extension in Chrome
    * Click the 3 dots on the top right in Chrome, and choose 'Extensions'
    * Turn on Developer Mode on the top right
    * Click 'Load Unpacked' in top left
3. Click the extension icon to configure which types of opportunities you want to see
    * Posts containing keywords in clickbait will be filtered out
    * Of the remaining posts, only those containing keywords in Jobs/Research/Business will be shown
4. Browse LinkedIn normally - non-opportunity posts will be hidden
