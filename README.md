# StatVerse Studios Website

Premium static one-page website for StatVerse Studios.

## Included
- Supplied StatVerse Studios logo integrated into the header, hero and footer.
- Dark / light mode toggle with saved preference.
- Responsive mobile navigation.
- Premium service, pricing, workflow and demo showcase sections.
- Contact brief that prepares a Gmail compose window for `statverse45@gmail.com`.
- Copy-enquiry fallback for visitors who prefer another messaging/email app.
- Legal starter pages in `/legal/`.

## Email behaviour
This is a static site, so it does not silently send email from the server. The enquiry form opens Gmail in the browser with the recipient, subject and message already filled. The visitor reviews the details and presses **Send**. When pop-ups are blocked, the site falls back to the visitor's default email app. A copy button is also included.

## Deploy to Vercel
Upload/import the `statverse-studios` folder into Vercel as a static project. No build command is required.

## Before launch
- Replace `og:url` in `index.html` with the final production URL if needed.
- Review the starter legal pages against the actual business practices.
- Add a real WhatsApp link/number once one is available.
- For true server-side or automatic email delivery, connect a form backend/service later; the current browser-based flow requires no backend and no database.
