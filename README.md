# رحلة عبر مظاهر سطح مصر - درس إلكتروني تفاعلي (الصف الخامس الابتدائي)

Built from the storyboard (السيناريو) in the Word document "ساره عوني محمد.docx": 46 screens, 4 modules, pre/post tests, activities, final test.
Every screen shows its storyboard number (شاشة N / 46). Vite + vanilla JS.

## Run
    npm install
    npm run dev       # or: npm run build  (output in dist/)
No install: open `standalone/index.html` in a browser.

## Structure
- src/data.js    all content, activities, questions, navigation flow
- src/main.js    screens, router, quiz engine, drag/tap activities, sounds
- src/art.js     SVG pictures + scout character
- src/content.js textbook text (lesson sections)
Flow: login -> welcome (student name) -> screens 1-4 (opening, guide, goals, main menu) -> per module: menu(5 buttons), pre-test, goals, content, activities, post-test (80% to pass) -> final test (43) -> result/certificate (44) -> help (45) -> exit (46).
Source: MOE textbook, Social Studies grade 5, term 1, lesson 2 (pp 14-21).
