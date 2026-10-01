# Setting up your content editor (one-time)

This turns on a private editing page at `/admin` where you can:

- **Add, edit or remove blog posts** from a simple form (no HTML).
- **Add, edit or remove testimonials** the same way.
- **Replace or add photos** through a drag-and-drop media library.

It's built on two free tools — **GitHub** (stores the website's files) and
**Netlify** (hosts the site and runs the editor). Nothing here costs money on
normal usage. This only needs to be done **once**; after that you just log in
and edit.

If you get stuck on any step, tell me exactly what you see and I'll walk you
through it.

---

## Step 1 — Put the website on GitHub

1. Go to [github.com](https://github.com) and create a free account (if you
   don't already have one).
2. Click the **+** in the top right → **New repository**.
   - Name it e.g. `your-property-valencia-website`.
   - Leave it **Public** or set it **Private** — either works.
   - Don't tick "Add a README" — leave everything else default.
   - Click **Create repository**.
3. On the new (empty) repository page, click **uploading an existing file**.
4. Open the `your-property-valencia-website` folder on your Mac, select
   **everything inside it** (all files and folders — `index.html`, `css`,
   `images`, `admin`, `content`, etc.) and drag them into the browser window.
5. Wait for the upload to finish, then scroll down and click
   **Commit changes**.

You now have the whole site on GitHub. You will not need to touch GitHub
again after this.

---

## Step 2 — Connect it to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign up (you can use
   your GitHub account to sign in — one click).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub**, authorise Netlify if asked, and pick the
   `your-property-valencia-website` repository.
4. On the deploy settings screen, leave everything as default (**no** build
   command needed, publish directory can stay blank or `.`) and click
   **Deploy site**.
5. In a minute or two you'll get a working URL like
   `random-name-12345.netlify.app` — open it and check the site looks right.

(Your real domain, `yourpropertyvalencia.com`, gets connected separately —
see the note at the end.)

---

## Step 3 — Turn on the login system (Identity)

1. In your new Netlify site, go to **Site configuration → Identity**.
2. Click **Enable Identity**.
3. Scroll to **Registration** → set it to **Invite only** (so no one else can
   sign up).
4. Scroll to **Services → Git Gateway** → click **Enable Git Gateway**.
   This is what lets the editor save your changes back to the site.

---

## Step 4 — Invite yourself as the editor

1. Still under **Identity**, click the **Invite users** button.
2. Enter your own email address and send the invite.
3. Check your email for a message from Netlify, click the link, and set a
   password.

---

## Step 5 — Start editing

Go to `your-site-name.netlify.app/admin` (or, once your domain is connected,
`yourpropertyvalencia.com/admin`) and log in with the email and password from
Step 4.

You'll see:

- **Site content → Blog posts** — a list you can add to, edit or reorder.
  Click **New Blog Posts**, fill in the fields, click **Publish**.
- **Site content → Testimonials** — same idea, for client quotes.
- A **picture icon** in the top bar — this opens the **media library**, where
  you can upload new photos or replace existing ones.

Every time you click **Publish**, the live site rebuilds automatically —
changes usually appear within a minute.

### Replacing an existing photo

The fastest way: on your computer, **rename your new photo to exactly match
the file it's replacing** (e.g. `sara-portrait.jpg`), then upload it through
the media library. Because the page already points at that exact filename,
your new photo appears in that exact spot automatically.

Not sure which filename goes where? Check the "Photos" table in
`README.md`, or just ask me.

### Adding a photo somewhere new

Uploading a photo with a brand-new filename puts it in the media library, but
it won't appear on a page by itself — a page only shows an image if something
in the HTML points at it. For a new spot on the page (not just replacing an
existing photo), send me the photo and where you'd like it, and I'll wire it
in — that part still needs a quick code change.

---

## What this does *not* cover (yet)

Headlines, the "About Sara" story, case-study numbers, the FAQ, pricing
sections, and similar page text are **not** editable through `/admin` — they
still need to be changed directly in the `.html` files (by you or by me). I
scoped this first version to blog posts, testimonials and photos since those
are what you'll change most often. If you'd like more of the page text made
editable this way, tell me which parts and I can extend it.
