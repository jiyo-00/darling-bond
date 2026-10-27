# HTML Design Guide

This guide covers how to design clear, accessible, and maintainable web pages with HTML. HTML describes a page's content and structure; use CSS for presentation and JavaScript for behavior.

## 1. Start with the page's purpose

Before writing markup, identify:

- The page's primary goal and audience.
- The main task a visitor should be able to complete.
- The information that must appear, and its order of importance.
- Any interactive elements, such as links, forms, or buttons.

Organize content so that the most important information is easy to find. Prefer a simple, consistent layout over decoration that competes with the content.

## 2. Use semantic structure

Choose elements for what they mean, not just how they look. Semantic HTML gives browsers, assistive technologies, and search engines useful information about the page.

```html
<body>
  <header>
    <a href="/" aria-label="Example home">Example</a>
    <nav aria-label="Main navigation">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Page title</h1>
      <p>Introduce the page and its purpose.</p>
    </article>
  </main>

  <footer>
    <p>&copy; Example</p>
  </footer>
</body>
```

Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>` where they fit the content. Use `<div>` and `<span>` when no more meaningful element applies. A page should generally have one visible `<main>` region and one clear top-level `<h1>`.

## 3. Build a clear heading hierarchy

Headings communicate the outline of a page:

- Use `<h1>` for the page's main title.
- Use `<h2>` for major sections and `<h3>` for subsections within them.
- Choose heading levels based on the content hierarchy, not their default font size.
- Do not skip levels just to get a particular visual style; style headings with CSS.

Break up long content with descriptive headings, short paragraphs, and lists where appropriate.

## 4. Make links and controls understandable

- Use `<a>` for navigation to another page or location.
- Use `<button>` for an action on the current page.
- Write link text that makes sense out of context. Prefer “Read the installation guide” over “Click here.”
- Give buttons concise labels that describe their action.
- Ensure every interactive control can be reached and used with a keyboard.

Do not use a clickable `<div>` or `<span>` in place of a link or button.

## 5. Design accessible forms

Associate every form control with a visible label. Group related controls with `<fieldset>` and `<legend>` when useful.

```html
<form action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">Subscribe</button>
</form>
```

- Use the appropriate input type, such as `email`, `search`, or `tel`.
- Explain required fields and input formats before submission.
- Keep error messages specific and associate them with the relevant field.
- Do not rely on placeholder text as the only label.
- Preserve entered values when showing validation errors.

## 6. Use images and media thoughtfully

- Add concise, meaningful `alt` text to informative images.
- Use `alt=""` for decorative images so assistive technologies can skip them.
- Provide captions or transcripts for media when needed.
- Include width and height attributes on images to help prevent layout shifts.
- Use responsive image techniques when pages serve images at different sizes.

```html
<img src="/images/team.jpg" alt="The team meeting around a table" width="960" height="640">
```

## 7. Plan for different screens

HTML should remain useful at narrow and wide viewport sizes. Keep content in a sensible reading order in the document, and use CSS for responsive layout rather than inserting separate copies of the same content for different devices.

Include a viewport declaration in the document `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Test pages at different widths and with zoom enabled. Check that text remains readable, controls are usable, and content does not require horizontal scrolling except where the content itself needs it.

## 8. Write a complete document

A typical page starts with a doctype, a language, and useful metadata:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page title | Example</title>
    <meta name="description" content="A concise summary of this page.">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <main>
      <h1>Page title</h1>
      <p>Page content goes here.</p>
    </main>
  </body>
</html>
```

Set `lang` to the primary language of the page. Give each page a specific title and a useful description. Keep styles in CSS files and scripts in JavaScript files unless a project has a deliberate reason to do otherwise.

## 9. Keep markup maintainable

- Indent nested elements consistently.
- Use lowercase element names and quote attribute values.
- Use meaningful, consistent class names for styling hooks.
- Avoid unnecessary wrapper elements and obsolete presentational elements.
- Keep content, styling, and behavior separate.
- Follow the conventions already established by the project.

## 10. Review before publishing

Use this checklist for each page:

- [ ] The page has a clear purpose and descriptive title.
- [ ] The document language is declared.
- [ ] Semantic landmarks and a logical heading hierarchy are present.
- [ ] Links, buttons, and form fields have clear names or labels.
- [ ] Keyboard focus is visible and interactive controls work without a mouse.
- [ ] Images have appropriate alternative text.
- [ ] Text and controls remain usable at narrow widths and browser zoom.
- [ ] HTML validation and the project's existing checks pass.
- [ ] The page has been checked with at least one screen reader or accessibility inspection tool when practical.
