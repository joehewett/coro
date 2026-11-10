# Coro Benavent

The portfolio site for Coro Benavent: https://corobenavent.com

You update this site by asking Claude. Claude edits the files, checks them and publishes. The live site updates about one minute later.

## Coro: first-time setup

You do this once. Allow about 20 minutes. Ask Joe if you get stuck.

1. **Accept the GitHub invite.** Joe invited your GitHub account (`corobenavent`). Open https://github.com/joehewett/coro/invitations and click **Accept**.
2. **Install Claude Code.** Get the Claude desktop app from https://claude.com/download and sign in. Open the **Code** tab.
3. **Let Claude do the rest.** Start a new Code session and paste this message:

   > Set me up to edit my website. Install anything I need (Xcode command line tools, Git, Node.js, pnpm and the GitHub CLI). Log me in to GitHub as corobenavent. Then download https://github.com/joehewett/coro into a folder called "coro" in my home folder, run pnpm install and open the site on my computer so I can see it works.

   Claude asks you to approve some steps. A browser window opens for the GitHub login. Approve it.

4. **Open the project.** From now on, start each Code session in the `coro` folder. Claude then reads the site instructions in `CLAUDE.md` by itself.

## Coro: making changes

Tell Claude what you want, in your own words. Attach photos straight into the chat. Examples:

- "Add these three photos to the Look Around stills."
- "Add a new director project called X. Here is the YouTube link, the description and the credits."
- "Change Tonos from In Pre-Production to In Post-Production."
- "Add the play I did last month to my theatre list."
- "Swap the photo on the Actress tile on the landing page for this one."
- "Replace my CV with this PDF."

Claude publishes the change and gives you a link. Open it and check. If something looks wrong, say so. Claude can fix it or undo it.

## For developers

React, TypeScript, Tailwind and Vite. Vercel deploys every push to `main`.

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm build
```

`CLAUDE.md` has the site map and the editing workflow.
